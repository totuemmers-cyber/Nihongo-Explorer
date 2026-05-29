// ============================================================
// Audit: Lernpfad progression engine
// Loads srs-scheduler.js + learning-path.js into a stubbed runtime and asserts
// the recommendation engine behaves: kanji->vocab gate, due-first ordering,
// level advancement, daily-new budget, and weighted interleave.
// Run: node audit-learning-path.js   (exit 0 = pass)
// ============================================================
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const DAY = 24 * 60 * 60 * 1000;
const failures = [];
function check(name, cond) {
  if (!cond) failures.push(name);
}

// --- Synthetic dataset ---
const KANJI = [
  { kanji: '一', jlpt: 'N5', strokes: 1, meanings: ['eins'] },
  { kanji: '二', jlpt: 'N5', strokes: 2, meanings: ['zwei'] },
  { kanji: '人', jlpt: 'N5', strokes: 2, meanings: ['Mensch'] },
  { kanji: '会', jlpt: 'N4', strokes: 6, meanings: ['treffen'] }
];
const VOCAB = [
  { word: 'かばん', reading: 'かばん', level: 'N5', meaning: 'Tasche' },      // kana only
  { word: '人', reading: 'ひと', level: 'N5', meaning: 'Person' },           // needs 人
  { word: '一', reading: 'いち', level: 'N5', meaning: 'eins' },             // needs 一
  { word: '会社', reading: 'かいしゃ', level: 'N4', meaning: 'Firma' }        // needs 会
];
const GRAMMAR = [
  { id: 'wa', pattern: 'は', level: 'N5', category: 'Partikel', meaning: 'Themenpartikel' },
  { id: 'wo', pattern: 'を', level: 'N5', category: 'Partikel', meaning: 'Objektpartikel' },
  { id: 'kara', pattern: 'から', level: 'N4', category: 'Partikel', meaning: 'weil/von' }
];

// --- getItemKey mirrored from srs-ui.js (kept consistent for both mint + lookup) ---
function normalizeKeyText(v) { return String(v || '').trim().replace(/\s+/g, ' '); }
function getItemKey(section, item) {
  if (section === 'kanji') return 'kanji:' + item.kanji;
  if (section === 'vocab') return 'vocab:' + (item.source || 'vocab') + ':' + normalizeKeyText(item.word) + '|' + normalizeKeyText(item.reading);
  if (section === 'grammar') return 'grammar:' + (item.id || (item.level + '|' + item.pattern));
  return section + ':' + normalizeKeyText(item.id || item.word || item.kanji);
}

function makeCard(section, item, state, dueOffsetMs, lapses) {
  return {
    itemKey: getItemKey(section, item),
    section: section,
    state: state,
    dueAt: new Date(Date.now() + (dueOffsetMs || 0)).toISOString(),
    lapses: lapses || 0,
    suspended: false
  };
}

// --- Runtime stubs ---
function makeContext(cards, settings, pathState) {
  const sections = {
    kanji: { allItems: KANJI.slice() },
    vocab: { allItems: VOCAB.slice() },
    grammar: { allItems: GRAMMAR.slice() }
  };
  const window = {};
  const context = {
    window, console, Promise, Date, Math, JSON, setTimeout,
    module: undefined,
    getKanjiByChar: function () {
      const idx = {};
      sections.kanji.allItems.forEach(function (k) { idx[k.kanji] = k; });
      return idx;
    }
  };
  vm.createContext(context);

  // Load the real scheduler (sets window.SRSScheduler)
  vm.runInContext(fs.readFileSync(path.join(__dirname, 'srs-scheduler.js'), 'utf8'), context, { filename: 'srs-scheduler.js' });

  window.SRSUI = {
    getItemKey: getItemKey,
    addItem: function () { return Promise.resolve([]); },
    startSession: function () {}
  };
  window.SRSStore = {
    init: function () { return Promise.resolve(); },
    getAllCards: function () { return Promise.resolve(cards.slice()); },
    getSettings: function () { return Promise.resolve(settings); },
    getPathState: function () { return Promise.resolve(pathState); },
    savePathState: function () { return Promise.resolve(); }
  };
  window.app = {
    sections: sections,
    ensureSectionLoaded: function () { return Promise.resolve(); },
    playTick: function () {}, playPop: function () {},
    switchTab: function () {}
  };

  // Load the engine
  vm.runInContext(fs.readFileSync(path.join(__dirname, 'learning-path.js'), 'utf8'), context, { filename: 'learning-path.js' });
  return { window: window, eng: window.LearningPath._engine };
}

const defaultSettings = { dailyNewLimit: 20, dailyReviewLimit: 120 };

// === T1: cold start — gate blocks kanji-bearing vocab while their kanji are new ===
(function () {
  const { eng } = makeContext([], defaultSettings, null);
  const map = eng.mapFromCards([], eng.normalizePath(null));
  const q = eng.frontierQueues('N5', map);
  const gatedWords = q.gatedVocab.map(function (p) { return p.item.word; });
  const waitWords = q.waitVocab.map(function (p) { return p.item.word; });
  check('T1 kana-only vocab unlocked at cold start', gatedWords.indexOf('かばん') !== -1);
  check('T1 人 vocab gated (kanji new)', waitWords.indexOf('人') !== -1);
  check('T1 一 vocab gated (kanji new)', waitWords.indexOf('一') !== -1);
  check('T1 kanji ordered by strokes', q.newKanji[0].item.kanji === '一');

  const picks = eng.pickNewItems('N5', map, 5);
  const pickWords = picks.filter(function (p) { return p.section === 'vocab'; }).map(function (p) { return p.item.word; });
  check('T1 picks exclude gated vocab while new kanji remain', pickWords.indexOf('人') === -1 && pickWords.indexOf('一') === -1);
  check('T1 picks respect budget', picks.length <= 5);
})();

// === T2: introducing a kanji unlocks vocab that uses it ===
(function () {
  const cards = [makeCard('kanji', KANJI[2], 'New', 0)]; // 人 introduced (due now -> learning)
  const { eng } = makeContext(cards, defaultSettings, null);
  const map = eng.mapFromCards(cards, eng.normalizePath(null));
  check('T2 introduced kanji is not "new"', eng.itemStatus('kanji', KANJI[2], map) !== 'new');
  const q = eng.frontierQueues('N5', map);
  const gatedWords = q.gatedVocab.map(function (p) { return p.item.word; });
  check('T2 人 vocab unlocked after kanji introduced', gatedWords.indexOf('人') !== -1);
})();

// === T3: level advancement when a level is sufficiently familiar ===
(function () {
  // Mark every N5 item familiar (Review, not due) so N5 ratio = 1.0 >= 0.9
  const cards = [];
  KANJI.filter(function (k) { return k.jlpt === 'N5'; }).forEach(function (k) { cards.push(makeCard('kanji', k, 'Review', DAY * 5)); });
  VOCAB.filter(function (v) { return v.level === 'N5'; }).forEach(function (v) { cards.push(makeCard('vocab', v, 'Review', DAY * 5)); });
  GRAMMAR.filter(function (g) { return g.level === 'N5'; }).forEach(function (g) { cards.push(makeCard('grammar', g, 'Review', DAY * 5)); });
  const { eng } = makeContext(cards, defaultSettings, null);
  const map = eng.mapFromCards(cards, eng.normalizePath(null));
  const progress = eng.computeProgress(map, eng.normalizePath(null));
  check('T3 N5 ratio >= advance threshold', progress.levels[0].ratio >= 0.9);
  check('T3 current level advances to N4', progress.currentLevel === 'N4');
})();

// === T4: daily-new budget + review suppression ===
(function () {
  const { eng } = makeContext([], defaultSettings, null);
  const path1 = eng.normalizePath({ newDaily: { date: 'old', count: 99 } }); // stale date -> reset
  check('T4 stale daily counter resets', path1.newDaily.count === 0);
  const path2 = { newDaily: { count: 5 } };
  check('T4 budget = limit - done when reviews light',
    eng.newBudget({ settings: defaultSettings, path: { newDaily: { count: 5 } } }, 0) === 15);
  check('T4 new items suppressed when due >= review limit',
    eng.newBudget({ settings: defaultSettings, path: { newDaily: { count: 0 } } }, 120) === 0);
})();

// === T5: weighted interleave favours higher-weight queue ===
(function () {
  const { eng } = makeContext([], defaultSettings, null);
  const out = eng.interleave([['a1', 'a2', 'a3'], ['b1', 'b2', 'b3']], [1, 2], 4);
  const bCount = out.filter(function (x) { return String(x).charAt(0) === 'b'; }).length;
  const aCount = out.length - bCount;
  check('T5 interleave respects budget', out.length === 4);
  check('T5 interleave favours higher weight', bCount >= aCount);
})();

console.log(JSON.stringify({ passed: failures.length === 0, failures: failures }, null, 2));
process.exit(failures.length > 0 ? 1 : 0);
