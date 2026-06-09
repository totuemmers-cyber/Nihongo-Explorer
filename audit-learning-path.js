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

function makeCard(section, item, state, dueOffsetMs, lapses, reps) {
  return {
    itemKey: getItemKey(section, item),
    section: section,
    state: state,
    // Cards past the learning phase default to reps=2 so "Review" represents a
    // genuinely familiar item (survived a real review), matching FAMILIAR_MIN_REPS.
    reps: (typeof reps === 'number') ? reps
      : (state === 'Review' || state === 'Mature' || state === 'Mastered') ? 2 : 0,
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
    savePathState: function () { return Promise.resolve(); },
    deleteCardsByItem: function (key) {
      for (var i = cards.length - 1; i >= 0; i--) { if (cards[i].itemKey === key) cards.splice(i, 1); }
      return Promise.resolve();
    }
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

// Build a context that loads the REAL srs-store.js (localStorage-fallback mode, no
// indexedDB) so reset / export / import are exercised for real.
function fakeLocalStorage() {
  var s = {};
  return {
    getItem: function (k) { return Object.prototype.hasOwnProperty.call(s, k) ? s[k] : null; },
    setItem: function (k, v) { s[k] = String(v); },
    removeItem: function (k) { delete s[k]; },
    clear: function () { s = {}; }
  };
}

// A localStorage whose writes always fail (simulates quota exhaustion).
function throwingLocalStorage() {
  var s = {};
  return {
    getItem: function (k) { return Object.prototype.hasOwnProperty.call(s, k) ? s[k] : null; },
    setItem: function () { throw new Error('QuotaExceededError'); },
    removeItem: function (k) { delete s[k]; },
    clear: function () { s = {}; }
  };
}

function makeStoreContext(storage) {
  const window = {};
  const context = {
    window, console, Promise, Date, Math, JSON, setTimeout, clearTimeout,
    localStorage: storage || fakeLocalStorage(), navigator: {}
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(__dirname, 'srs-scheduler.js'), 'utf8'), context, { filename: 'srs-scheduler.js' });
  vm.runInContext(fs.readFileSync(path.join(__dirname, 'srs-store.js'), 'utf8'), context, { filename: 'srs-store.js' });
  return window.SRSStore;
}

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

// === T3c: a past lapse must NOT bar an item from familiar / level advancement ===
(function () {
  // Every N5 item is Mature and not due, but each carries a single past lapse
  // (lifetime `lapses` never resets). A recovered mature card must still count as
  // familiar — otherwise one post-graduation slip would freeze the level forever.
  const cards = [];
  KANJI.filter(function (k) { return k.jlpt === 'N5'; }).forEach(function (k) { cards.push(makeCard('kanji', k, 'Mature', DAY * 40, 1)); });
  VOCAB.filter(function (v) { return v.level === 'N5'; }).forEach(function (v) { cards.push(makeCard('vocab', v, 'Mature', DAY * 40, 1)); });
  GRAMMAR.filter(function (g) { return g.level === 'N5'; }).forEach(function (g) { cards.push(makeCard('grammar', g, 'Mature', DAY * 40, 1)); });
  const { eng } = makeContext(cards, defaultSettings, null);
  const map = eng.mapFromCards(cards, eng.normalizePath(null));
  check('T3c lapsed-but-mature item still counts as familiar', eng.itemStatus('kanji', KANJI[0], map) === 'familiar');
  const progress = eng.computeProgress(map, eng.normalizePath(null));
  check('T3c lapsed-but-mature N5 still reaches the advance ratio', progress.levels[0].ratio >= 0.9);
  check('T3c level advances past a level whose items lapsed once', progress.currentLevel === 'N4');
})();

// === T3d: an isolated post-graduation lapse must not demote a completed level ===
(function () {
  // N5 fully mature (advanced to N4); one N5 kanji lapsed once but stayed mature.
  // The current level must NOT drop back to N5 — a demotion would halt new N4
  // content (frontierQueues only draws from currentLevel) and re-fire the banner.
  const cards = [];
  KANJI.filter(function (k) { return k.jlpt === 'N5'; }).forEach(function (k, i) {
    cards.push(makeCard('kanji', k, 'Mature', DAY * 40, i === 0 ? 1 : 0));
  });
  VOCAB.filter(function (v) { return v.level === 'N5'; }).forEach(function (v) { cards.push(makeCard('vocab', v, 'Mature', DAY * 40, 0)); });
  GRAMMAR.filter(function (g) { return g.level === 'N5'; }).forEach(function (g) { cards.push(makeCard('grammar', g, 'Mature', DAY * 40, 0)); });
  const { eng } = makeContext(cards, defaultSettings, null);
  const map = eng.mapFromCards(cards, eng.normalizePath(null));
  const progress = eng.computeProgress(map, eng.normalizePath(null));
  check('T3d a single past lapse does not demote the completed level', progress.currentLevel === 'N4');
})();

// === T3b: an empty level is vacuously complete and never pins currentLevel ===
(function () {
  // N5 fully familiar; N4 has zero items in every section (e.g. a section that did
  // not load). The empty N4 must count as complete (ratio 1) so currentLevel moves
  // on instead of stalling on a level that can offer nothing.
  const cards = [];
  KANJI.filter(function (k) { return k.jlpt === 'N5'; }).forEach(function (k) { cards.push(makeCard('kanji', k, 'Review', DAY * 5)); });
  VOCAB.filter(function (v) { return v.level === 'N5'; }).forEach(function (v) { cards.push(makeCard('vocab', v, 'Review', DAY * 5)); });
  GRAMMAR.filter(function (g) { return g.level === 'N5'; }).forEach(function (g) { cards.push(makeCard('grammar', g, 'Review', DAY * 5)); });
  // Drop every N4 item so N4 is empty; the next non-empty incomplete level is N4's
  // own dataset (the synthetic set has N4 items), so build a custom empty-N4 context.
  const emptyN4 = {
    kanji: { allItems: KANJI.filter(function (k) { return k.jlpt !== 'N4'; }) },
    vocab: { allItems: VOCAB.filter(function (v) { return v.level !== 'N4'; }) },
    grammar: { allItems: GRAMMAR.filter(function (g) { return g.level !== 'N4'; }) }
  };
  const window = {};
  const context = {
    window, console, Promise, Date, Math, JSON, setTimeout, module: undefined,
    getKanjiByChar: function () { const idx = {}; emptyN4.kanji.allItems.forEach(function (k) { idx[k.kanji] = k; }); return idx; }
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(__dirname, 'srs-scheduler.js'), 'utf8'), context, { filename: 'srs-scheduler.js' });
  window.SRSUI = { getItemKey: getItemKey, addItem: function () { return Promise.resolve([]); }, startSession: function () {} };
  window.SRSStore = { init: function () { return Promise.resolve(); }, getAllCards: function () { return Promise.resolve(cards.slice()); }, getSettings: function () { return Promise.resolve(defaultSettings); }, getPathState: function () { return Promise.resolve(null); }, savePathState: function () { return Promise.resolve(); } };
  window.app = { sections: emptyN4, ensureSectionLoaded: function () { return Promise.resolve(); }, playTick: function () {}, playPop: function () {}, switchTab: function () {} };
  vm.runInContext(fs.readFileSync(path.join(__dirname, 'learning-path.js'), 'utf8'), context, { filename: 'learning-path.js' });
  const eng = window.LearningPath._engine;
  const map = eng.mapFromCards(cards, eng.normalizePath(null));
  const progress = eng.computeProgress(map, eng.normalizePath(null));
  const n4 = progress.levels[eng.LEVELS.indexOf('N4')];
  check('T3b empty level counts as complete (ratio 1)', n4.total === 0 && n4.ratio === 1);
  check('T3b currentLevel does not stall on the empty level', progress.currentLevel !== 'N4');
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

  // Regression: the lowest-weight queue must NOT be starved when three queues
  // compete. With the real mix weights (kanji 1, vocab 1.3, grammar 0.6) over a full
  // budget, grammar used to get 0 picks — debiting the picked queue by a flat 1 (not
  // the total weight) let kanji/vocab dominate, so grammar was only ever introduced
  // after every kanji and vocab in the level had run out.
  const kq = []; const vq = []; const gq = [];
  for (let i = 0; i < 40; i++) { kq.push('k' + i); vq.push('v' + i); gq.push('g' + i); }
  const mix = eng.interleave([kq.slice(), vq.slice(), gq.slice()], [1, 1.3, 0.6], 20);
  const gPicks = mix.filter(function (x) { return String(x).charAt(0) === 'g'; }).length;
  const vPicks = mix.filter(function (x) { return String(x).charAt(0) === 'v'; }).length;
  const kPicks = mix.length - gPicks - vPicks;
  check('T5 mix fills the whole budget', mix.length === 20);
  check('T5 lowest-weight queue (grammar) is not starved', gPicks >= 2);
  check('T5 mix stays ordered by weight (vocab >= kanji >= grammar)', vPicks >= kPicks && kPicks >= gPicks);
})();

// === T6: grammar-lesson level matching (incl. combined levels like "N5/N4") ===
(function () {
  const { eng } = makeContext([], defaultSettings, null);
  check('T6 single-level lesson matches its level', eng.lessonMatchesLevel({ level: 'N5' }, 'N5'));
  check('T6 single-level lesson does not match other level', !eng.lessonMatchesLevel({ level: 'N5' }, 'N4'));
  check('T6 combined lesson matches first level', eng.lessonMatchesLevel({ level: 'N5/N4' }, 'N5'));
  check('T6 combined lesson matches second level', eng.lessonMatchesLevel({ level: 'N5/N4' }, 'N4'));
  check('T6 combined lesson does not match unrelated level', !eng.lessonMatchesLevel({ level: 'N5/N4' }, 'N3'));
})();

// === T9: a fully-suspended item is in-progress (not 'new') and not re-picked ===
(function () {
  const { eng } = makeContext([], defaultSettings, null);
  const suspended = makeCard('kanji', KANJI[2], 'Review', DAY * 5, 0); // 人, not due
  suspended.suspended = true;
  const map = eng.mapFromCards([suspended], eng.normalizePath(null));
  check('T9 suspended item is not counted as new', eng.itemStatus('kanji', KANJI[2], map) !== 'new');
  const q = eng.frontierQueues('N5', map);
  const newKanji = q.newKanji.map(function (p) { return p.item.kanji; });
  check('T9 suspended kanji is not offered as a new pick', newKanji.indexOf('人') === -1);
})();

// === T13: startLevel treats lower levels as known and starts the path there ===
(function () {
  const { eng } = makeContext([], defaultSettings, null);
  const path = eng.normalizePath({ startLevel: 'N4' });
  const map = eng.mapFromCards([], path);
  check('T13 below-start item is treated as familiar', eng.itemStatus('kanji', KANJI[0], map) === 'familiar'); // 一 (N5)
  check('T13 at-start item stays new', eng.itemStatus('kanji', KANJI[3], map) === 'new'); // 会 (N4)
  const progress = eng.computeProgress(map, path);
  check('T13 current level starts at the chosen start level', progress.currentLevel === 'N4');
})();

// === T14: daily streak — extend, lapse, and stay idempotent within a day ===
(function () {
  const { eng } = makeContext([], defaultSettings, null);
  const dayStr = function (d) { return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); };
  const yesterday = (function () { const d = new Date(); d.setDate(d.getDate() - 1); return dayStr(d); })();

  // Fresh learner: first study day starts the streak at 1.
  const fresh = eng.normalizePath(null);
  eng.markStudyDay(fresh);
  check('T14 first study day starts streak at 1', fresh.streakCount === 1);
  check('T14 fresh streak is visible today', eng.currentStreak(fresh) === 1);

  // Studying again the same day must not double-count.
  eng.markStudyDay(fresh);
  check('T14 same-day study is idempotent', fresh.streakCount === 1);

  // Continuing from yesterday extends the streak.
  const cont = eng.normalizePath({ streakLastDay: yesterday, streakCount: 5 });
  check('T14 yesterday streak is still alive', eng.currentStreak(cont) === 5);
  eng.markStudyDay(cont);
  check('T14 continuing from yesterday extends the streak', cont.streakCount === 6);

  // A gap of several days lapses the visible streak to 0.
  const lapsed = eng.normalizePath({ streakLastDay: '2000-1-1', streakCount: 9 });
  check('T14 a multi-day gap lapses the streak', eng.currentStreak(lapsed) === 0);
})();

// === T15: blockingKanji reports exactly the not-yet-learned kanji of a word ===
(function () {
  const { eng } = makeContext([], defaultSettings, null);
  const idx = {};
  KANJI.forEach(function (k) { idx[k.kanji] = k; });

  const coldMap = eng.mapFromCards([], eng.normalizePath(null));
  check('T15 kana-only word has no blockers', eng.blockingKanji(VOCAB[0], idx, coldMap).length === 0); // かばん
  const blockers = eng.blockingKanji(VOCAB[1], idx, coldMap); // 人
  check('T15 kanji-bearing word is blocked by its kanji', blockers.length === 1 && blockers[0] === '人');

  // Once the kanji is introduced, the word is no longer blocked.
  const warm = makeContext([makeCard('kanji', KANJI[2], 'New', 0)], defaultSettings, null);
  const warmMap = warm.eng.mapFromCards([makeCard('kanji', KANJI[2], 'New', 0)], warm.eng.normalizePath(null));
  check('T15 word unblocks once its kanji is introduced', warm.eng.blockingKanji(VOCAB[1], idx, warmMap).length === 0);
})();

// === T16: level-up only fires above a stored baseline (no settings-driven banners) ===
(function () {
  const { eng } = makeContext([], defaultSettings, null);

  // No baseline yet (fresh user / after a Startniveau reset): adopt silently.
  const fresh = eng.decideLevelUp(null, 'N4');
  check('T16 null baseline adopts current level silently', fresh.leveledUp === null && fresh.seenLevel === 'N4');

  // Genuine rise above a stored baseline celebrates and re-bases.
  const up = eng.decideLevelUp('N5', 'N4');
  check('T16 rising above the baseline fires the banner', up.leveledUp === 'N4' && up.seenLevel === 'N4');

  // Same level: nothing to celebrate.
  const same = eng.decideLevelUp('N4', 'N4');
  check('T16 same level does not fire', same.leveledUp === null && same.seenLevel === 'N4');

  // Moving down (e.g. start level lowered) re-bases without a banner.
  const down = eng.decideLevelUp('N3', 'N4');
  check('T16 moving down re-bases without a banner', down.leveledUp === null && down.seenLevel === 'N4');
})();

// === T17: a level does not advance when its items have only been reviewed once ===
(function () {
  // Every N5 item as a single Review card with reps=1 (introduced once, not yet
  // survived a real review). With FAMILIAR_MIN_REPS=2 these are "learning", so the
  // level must NOT reach the 0.9 familiar-or-better advance ratio.
  function young(section, item) { return makeCard(section, item, 'Review', DAY, 0, 1); }
  const cards = [];
  KANJI.filter(function (k) { return k.jlpt === 'N5'; }).forEach(function (k) { cards.push(young('kanji', k)); });
  VOCAB.filter(function (v) { return v.level === 'N5'; }).forEach(function (v) { cards.push(young('vocab', v)); });
  GRAMMAR.filter(function (g) { return g.level === 'N5'; }).forEach(function (g) { cards.push(young('grammar', g)); });
  const { eng } = makeContext(cards, defaultSettings, null);
  const map = eng.mapFromCards(cards, eng.normalizePath(null));
  const progress = eng.computeProgress(map, eng.normalizePath(null));
  check('T17 reps=1 items are not familiar', eng.itemStatus('kanji', KANJI[0], map) === 'learning');
  check('T17 ratio stays below advance threshold', progress.levels[0].ratio < 0.9);
  check('T17 level does not advance on once-reviewed items', progress.currentLevel === 'N5');
})();

// === T18: assembleSession spends the daily budget correctly (startToday core) ===
(function () {
  const { eng } = makeContext([], defaultSettings, null);
  const due = ['d1', 'd2'];
  // Budget covers the whole new supply: every new card is included and counted once.
  const a1 = eng.assembleSession(due, ['n1'], ['n2', 'n3'], 5);
  check('T18 session = due + all new when budget allows', a1.session.length === 5);
  check('T18 newCount equals the new cards added (no double-count)', a1.newCount === 3);
  // Budget caps the supply: surplus new cards are dropped and the counter never
  // exceeds the budget (staggered siblings can't inflate the daily count).
  const a2 = eng.assembleSession(due, ['n1'], ['n2', 'n3'], 2);
  check('T18 budget caps the new cards introduced', a2.newCount === 2);
  check('T18 capped session keeps all due + only the capped new', a2.session.length === 4);
  // Suppressed (budget 0): due still run, but no new cards are counted.
  const a3 = eng.assembleSession(due, ['n1'], [], 0);
  check('T18 budget 0 runs due only and counts no new', a3.newCount === 0 && a3.session.length === 2);
  // No due and no supply -> empty session (startToday guards on this so the streak
  // and daily counter are never padded by an empty launch).
  const a4 = eng.assembleSession([], [], [], 5);
  check('T18 empty session has zero length and zero new', a4.session.length === 0 && a4.newCount === 0);
})();

// === T19: the kanji gate covers supplementary-plane (surrogate-pair) kanji ===
(function () {
  const { eng } = makeContext([], defaultSettings, null);
  const astral = String.fromCodePoint(0x20BB7); // 𠮷 — CJK Ext-B, stored as a surrogate pair
  const idx = {};
  idx[astral] = { kanji: astral, jlpt: 'N5', strokes: 6 };
  const coldMap = eng.mapFromCards([], eng.normalizePath(null));
  const blockers = eng.blockingKanji({ word: astral }, idx, coldMap);
  check('T19 supplementary-plane kanji gates its word (not skipped)', blockers.indexOf(astral) !== -1);
})();

// === T20: daily counter + streak survive a backward clock change ===
(function () {
  const { eng } = makeContext([], defaultSettings, null);
  const dayStr = function (d) { return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); };
  const tomorrow = (function () { const d = new Date(); d.setDate(d.getDate() + 1); return dayStr(d); })();

  // Stored day reads as the FUTURE (device clock moved back): carry the counter
  // forward instead of zeroing it, so the daily new limit can't be bypassed.
  const carried = eng.normalizePath({ newDaily: { date: tomorrow, count: 7 } });
  check('T20 a future daily date keeps the counter (no bypass)', carried.newDaily.count === 7);
  check('T20 a future daily date is re-stamped to today', carried.newDaily.date === (function () { return dayStr(new Date()); })());

  // The streak must not lapse or reset on a backward clock change.
  const streak = eng.normalizePath({ streakLastDay: tomorrow, streakCount: 4 });
  check('T20 a future streak day is still alive', eng.currentStreak(streak) === 4);
  eng.markStudyDay(streak);
  check('T20 studying after a backward clock change does not reset the streak', streak.streakCount === 4);

  // Regression guard: a genuine past day still resets the daily counter (T4 path).
  const reset = eng.normalizePath({ newDaily: { date: '2000-1-1', count: 7 } });
  check('T20 a genuine past day still resets the daily counter', reset.newDaily.count === 0);
})();

// === T21: grammar items resolve to the lesson that teaches them ===
(function () {
  const { window, eng } = makeContext([], defaultSettings, null);
  window.GrammarLessons = {
    getLessons: function () {
      return [
        { id: 'lesson-1', title: 'は vs が', level: 'N5', grammarIds: ['wa', 'ga'] },
        { id: 'lesson-x', title: 'Muster', level: 'N5', patterns: ['を'] }
      ];
    }
  };
  const byId = eng.lessonForGrammar({ id: 'wa', pattern: 'は' });
  check('T21 grammar item maps to its lesson by id', !!byId && byId.id === 'lesson-1');
  const byPattern = eng.lessonForGrammar({ id: 'unmapped', pattern: 'を' });
  check('T21 grammar item maps to its lesson by pattern fallback', !!byPattern && byPattern.id === 'lesson-x');
  const none = eng.lessonForGrammar({ id: 'nope', pattern: 'ない' });
  check('T21 an unlinked grammar item yields no lesson (no wrong guess)', none === null);
})();

// === T22: the ready New backlog surfaces in the pensum (deduped, budget-capped) ===
(function () {
  // Two ready New sibling cards for 人 (same item) + one for 一. The pensum must
  // show each item once so a ready backlog no longer hides behind the brand-new picks.
  const cards = [
    makeCard('kanji', KANJI[2], 'New', 0), // 人 ready
    makeCard('kanji', KANJI[2], 'New', 0), // 人 sibling — same itemKey, deduped
    makeCard('kanji', KANJI[0], 'New', 0)  // 一 ready
  ];
  const { eng } = makeContext(cards, defaultSettings, null);
  const ready = eng.readyToLearn(cards, 20);
  const keys = ready.map(function (p) { return eng.itemKeyOf(p.section, p.item); });
  check('T22 ready backlog dedupes siblings to one item per key',
    keys.filter(function (k) { return k === 'kanji:人'; }).length === 1);
  check('T22 ready backlog maps cards back to their dataset item', keys.indexOf('kanji:一') !== -1);
  check('T22 ready backlog respects the budget cap', eng.readyToLearn(cards, 1).length === 1);
  check('T22 ready backlog is empty when the budget is 0', eng.readyToLearn(cards, 0).length === 0);
})();

function finish() {
  console.log(JSON.stringify({ passed: failures.length === 0, failures: failures }, null, 2));
  process.exit(failures.length > 0 ? 1 : 0);
}

// === T23: a new card counts toward the Tagesziel when reviewed, not at launch ===
// noteNewCardIntroduced reads the freshest pathState, bumps today's counter by one
// and persists. This is what srs-ui calls on a card's New->* transition, so an
// aborted session can never inflate the counter (which would happen if it were
// advanced up-front at session assembly). Uses a stateful store so the persisted
// increment is observable, and fires several in a burst to prove no lost updates.
function noteNewCardTest() {
  const today = (function () { const d = new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); })();
  let stored = { schemaV: 1, newDaily: { date: today, count: 5 }, streakCount: 3, streakLastDay: today };
  const sections = { kanji: { allItems: KANJI.slice() }, vocab: { allItems: VOCAB.slice() }, grammar: { allItems: GRAMMAR.slice() } };
  const window = {};
  const context = { window, console, Promise, Date, Math, JSON, setTimeout, module: undefined, getKanjiByChar: function () { return {}; } };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(__dirname, 'srs-scheduler.js'), 'utf8'), context, { filename: 'srs-scheduler.js' });
  window.SRSUI = { getItemKey: getItemKey, addItem: function () { return Promise.resolve([]); }, startSession: function () {} };
  window.SRSStore = {
    init: function () { return Promise.resolve(); },
    getAllCards: function () { return Promise.resolve([]); },
    getSettings: function () { return Promise.resolve(defaultSettings); },
    getPathState: function () { return Promise.resolve(stored); },
    savePathState: function (p) { stored = p; return Promise.resolve(); }
  };
  window.app = { sections: sections, ensureSectionLoaded: function () { return Promise.resolve(); }, playTick: function () {}, playPop: function () {}, switchTab: function () {} };
  vm.runInContext(fs.readFileSync(path.join(__dirname, 'learning-path.js'), 'utf8'), context, { filename: 'learning-path.js' });
  const LP = window.LearningPath;
  return LP.noteNewCardIntroduced().then(function () {
    check('T23 reviewing a new card bumps the daily counter', stored.newDaily.count === 6);
    // Burst of grades: the serialized chain must not lose updates.
    return Promise.all([LP.noteNewCardIntroduced(), LP.noteNewCardIntroduced(), LP.noteNewCardIntroduced()]);
  }).then(function () {
    check('T23 a burst of new-card reviews counts each one (no lost updates)', stored.newDaily.count === 9);
    check('T23 counting a new card leaves the streak untouched', stored.streakCount === 3);
  });
}

// === T24: foundational grammar points exist, drill cleanly and link to lessons ===
// Loads the REAL grammar-data.js + grammar-lessons.js. Guards that the promoted
// foundational concepts (こそあど, Fragewörter, をください, ませんか, Adjektiv-て-Form,
// formelle Verneinung, Plain-Forms, N4-場合/見える聞こえる/自他動詞) stay present, that
// every lesson->grammar link resolves (no typos), and that the concept-only entries
// produce no degenerate cloze (no examples => getGrammarSpecs builds no cloze card).
function foundationalGrammarTest() {
  const ctx = {
    window: {}, console, Math, JSON, setTimeout,
    document: { createElement: function () { return { style: {}, appendChild: function () {} }; }, getElementById: function () { return null; }, addEventListener: function () {} },
    navigator: {}
  };
  vm.createContext(ctx);
  // Load every grammar level: lesson->grammar links now span N5-N1 (the Lernpfad
  // teaches the linked lesson before a new pattern at every level), so the link-resolves
  // check below must see the full id universe, not just the N5-N3 set in grammar-data.js.
  vm.runInContext(fs.readFileSync(path.join(__dirname, 'grammar-data.js'), 'utf8'), ctx, { filename: 'grammar-data.js' });
  vm.runInContext(fs.readFileSync(path.join(__dirname, 'grammar-n2.js'), 'utf8'), ctx, { filename: 'grammar-n2.js' });
  vm.runInContext(fs.readFileSync(path.join(__dirname, 'grammar-n1.js'), 'utf8'), ctx, { filename: 'grammar-n1.js' });
  vm.runInContext(fs.readFileSync(path.join(__dirname, 'grammar-lessons.js'), 'utf8'), ctx, { filename: 'grammar-lessons.js' });

  const data = [].concat(ctx.window.GRAMMAR_DATA || [], ctx.window.GRAMMAR_N2 || [], ctx.window.GRAMMAR_N1 || []);
  const byId = {};
  data.forEach(function (g) { byId[g.id] = g; });

  const required = ['kosoado-pronoun', 'kosoado-adnominal', 'kosoado-place', 'question-words',
    'wo-kudasai', 'masenka', 'adj-te-form', 'dewa-arimasen', 'plain-form', 'da-copula',
    'baai', 'mieru-kikoeru', 'jidoushi-tadoushi'];
  const missing = required.filter(function (id) { return !byId[id]; });
  check('T24 foundational grammar points are present', missing.length === 0);

  // Concept-only entries must carry no examples, so getGrammarSpecs makes no cloze card.
  const conceptOnly = ['plain-form', 'da-copula', 'jidoushi-tadoushi'];
  const withExamples = conceptOnly.filter(function (id) { return byId[id] && byId[id].examples && byId[id].examples.length; });
  check('T24 concept-only entries have no cloze examples', withExamples.length === 0);

  // Example-bearing new entries must contain a cloze-matchable pattern variant.
  function clozes(g) {
    var ex = g.examples && g.examples[0];
    if (!ex) return true; // concept entry, fine
    var variants = String(g.pattern || '').split(/[\/／]/).map(function (v) { return v.replace(/[～~]/g, '').replace(/\s+/g, '').trim(); }).filter(Boolean);
    return variants.some(function (v) { return ex.japanese.indexOf(v) !== -1; });
  }
  const degenerate = required.filter(function (id) { return byId[id] && !clozes(byId[id]); });
  check('T24 example-bearing entries cloze cleanly (no degenerate blanks)', degenerate.length === 0);

  // Every lesson->grammar link must resolve to a real grammar id (catch typos).
  const GL = ctx.window.GrammarLessons;
  const lessons = (GL && GL.getLessons) ? GL.getLessons() : [];
  check('T24 grammar lessons loaded', lessons.length > 0);
  const broken = [];
  lessons.forEach(function (l) {
    (l.grammarIds || []).forEach(function (gid) { if (!byId[gid]) broken.push(l.id + '->' + gid); });
  });
  check('T24 all lesson->grammar links resolve', broken.length === 0);

  // The foundational lessons actually carry the new links (read-before-quiz nudge).
  function linked(lessonId, grammarId) {
    var l = lessons.filter(function (x) { return x.id === lessonId; })[0];
    return !!l && (l.grammarIds || []).indexOf(grammarId) !== -1;
  }
  check('T24 こそあど lesson links its demonstratives', linked('lesson-154', 'kosoado-pronoun'));
  check('T24 Fragewörter lesson links question-words', linked('lesson-81', 'question-words'));
  check('T24 場合 lesson links baai', linked('lesson-156', 'baai'));

  // Lesson-first now reaches every level: grammar above N5 must be linked to the lesson
  // that teaches it, not left to the "next unread lesson" fallback. Spot-check one
  // representative pattern per level lands on a lesson whose title names it.
  check('T24 N4 ～てしまう links its lesson', linked('lesson-124', 'te-shimau'));
  check('T24 N4 passive links the Passiv lesson', linked('lesson-11', 'n4-rareru'));
  check('T24 N3 ～うちに links its time-pattern lesson', linked('lesson-111', 'n3-uchi-ni'));
  check('T24 N2 ～を通じて links its lesson', linked('lesson-68', 'n2-wo-tsujite'));
  check('T24 N1 ～や否や links its lesson', linked('lesson-55', 'n1-ya-inaya'));

  // Coverage guard: each level N4-N1 must have a substantial share of its grammar linked
  // to a teaching lesson (regression tripwire if the derivation or a data move breaks it).
  var linkedSet = {};
  lessons.forEach(function (l) { (l.grammarIds || []).forEach(function (gid) { linkedSet[gid] = true; }); });
  ['N4', 'N3', 'N2', 'N1'].forEach(function (L) {
    var items = data.filter(function (g) { return g.level === L; });
    var linkedCount = items.filter(function (g) { return linkedSet[g.id]; }).length;
    check('T24 ' + L + ' grammar is linked to lessons (>=15%)',
      items.length > 0 && (linkedCount / items.length) >= 0.15);
  });
  return Promise.resolve();
}

// === T25: vocab JLPT re-leveling anchors (corroborated reference + kanji) hold ===
// Locks in the one-time re-level (scripts/relevel-vocab.js): a few high-confidence
// promotions/demotions stay put, and core beginner words are NOT wrongly promoted
// (guards against re-introducing the naive-reference error こんにちは/ジュース -> N3).
function vocabRelevelTest() {
  const ctx = { window: {}, console };
  vm.createContext(ctx);
  ['vocab-n5', 'vocab-n4', 'vocab-n3', 'vocab-n2', 'vocab-n1'].forEach(function (f) {
    vm.runInContext(fs.readFileSync(path.join(__dirname, f + '.js'), 'utf8'), ctx, { filename: f + '.js' });
  });
  const V = [].concat(ctx.window.VOCAB_N5, ctx.window.VOCAB_N4, ctx.window.VOCAB_N3, ctx.window.VOCAB_N2, ctx.window.VOCAB_N1);
  const lvl = {};
  V.forEach(function (v) { if (lvl[v.word] === undefined) lvl[v.word] = v.level; });
  // promotions away from N5 (genuinely harder words)
  check('T25 地球 promoted to N3', lvl['地球'] === 'N3');
  check('T25 黒板 promoted to N3', lvl['黒板'] === 'N3');
  // demotions of over-leveled everyday loanwords back to beginner
  check('T25 ラジオ demoted to N5', lvl['ラジオ'] === 'N5');
  check('T25 ニュース demoted to N5', lvl['ニュース'] === 'N5');
  // core beginner words must stay N5 (the naive reference wrongly pushed these up)
  check('T25 こんにちは stays N5', lvl['こんにちは'] === 'N5');
  check('T25 ジュース stays N5', lvl['ジュース'] === 'N5');
  return Promise.resolve();
}

// === T10: runDiagnostics detects orphans; pruneOrphans removes them ===
function diagnosticsTest() {
  const valid = makeCard('kanji', KANJI[0], 'New', 0); // 一 — in dataset
  const orphan = { cardKey: 'kanji:絶#meaning', itemKey: 'kanji:絶', section: 'kanji', state: 'New', dueAt: new Date().toISOString(), lapses: 0, suspended: false };
  const { window } = makeContext([valid, orphan], defaultSettings, null);
  const LP = window.LearningPath;
  return LP.runDiagnostics().then(function (d) {
    check('T10 diagnostics counts active cards', d.active === 2);
    check('T10 diagnostics flags the orphan', d.orphaned === 1 && d.orphanKeys.indexOf('kanji:絶') !== -1);
    check('T10 diagnostics does not flag a valid card', d.orphanKeys.indexOf('kanji:一') === -1);
    return LP.pruneOrphans();
  }).then(function (n) {
    check('T10 pruneOrphans removes the orphan', n === 1);
    return LP.runDiagnostics();
  }).then(function (d2) {
    check('T10 no orphans remain after prune', d2.orphaned === 0);
  });
}

// === T11: pruneEvents keeps only the most recent events ===
function pruneTest() {
  const store = makeStoreContext();
  const mk = function (id, daysAgo) {
    return { eventId: id, cardKey: 'k#m', itemKey: 'k', reviewedAt: new Date(Date.now() - daysAgo * DAY).toISOString() };
  };
  // e0 is newest (0 days ago) ... e4 is oldest (4 days ago)
  return Promise.all([0, 1, 2, 3, 4].map(function (i) { return store.addEvent(mk('e' + i, i)); }))
    .then(function () { return store.pruneEvents(3); })
    .then(function (deleted) {
      check('T11 pruneEvents deletes the overflow', deleted === 2);
      return store.getAllEvents();
    })
    .then(function (events) {
      check('T11 pruneEvents keeps exactly the cap', events.length === 3);
      const ids = events.map(function (e) { return e.eventId; });
      check('T11 pruneEvents keeps the newest events',
        ids.indexOf('e0') !== -1 && ids.indexOf('e1') !== -1 && ids.indexOf('e2') !== -1);
      check('T11 pruneEvents drops the oldest events',
        ids.indexOf('e3') === -1 && ids.indexOf('e4') === -1);
    });
}

// === T12: a failed fallback write rejects (surfaces) instead of being swallowed ===
function fallbackErrorTest() {
  const store = makeStoreContext(throwingLocalStorage());
  const card = {
    cardKey: 'kanji:一#meaning', itemKey: 'kanji:一', section: 'kanji',
    state: 'New', dueAt: new Date().toISOString(), updatedAt: new Date().toISOString()
  };
  return store.putCards([card]).then(function () {
    check('T12 putCards rejects when the fallback write fails', false);
  }, function () {
    check('T12 putCards rejects when the fallback write fails', true);
  });
}

// === T14: the gate-relaxation branch must not duplicate grammar picks ===
(function () {
  // Mark every N5 kanji non-new so newKanji is empty -> relaxation path is taken.
  const cards = KANJI.filter(function (k) { return k.jlpt === 'N5'; })
    .map(function (k) { return makeCard('kanji', k, 'Review', DAY * 5); });
  const { eng } = makeContext(cards, defaultSettings, null);
  const map = eng.mapFromCards(cards, eng.normalizePath(null));
  const picks = eng.pickNewItems('N5', map, 20); // budget far exceeds available -> relax
  const keys = picks.map(function (p) { return eng.itemKeyOf(p.section, p.item); });
  const seen = {};
  const dup = keys.filter(function (k) { return seen[k] ? true : (seen[k] = 1, false); });
  check('T14 relaxation does not duplicate picks', dup.length === 0);
})();

// Build a fresh engine context with a custom grammar set + optional GrammarLessons.
function makeGrammarContext(grammarItems, lessons) {
  const sections = { kanji: { allItems: [] }, vocab: { allItems: [] }, grammar: { allItems: grammarItems.slice() } };
  const window = {};
  const context = { window, console, Promise, Date, Math, JSON, setTimeout, module: undefined, getKanjiByChar: function () { return {}; } };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(__dirname, 'srs-scheduler.js'), 'utf8'), context, { filename: 'srs-scheduler.js' });
  window.SRSUI = { getItemKey: getItemKey, addItem: function () { return Promise.resolve([]); }, startSession: function () {} };
  window.SRSStore = { init: function () { return Promise.resolve(); }, getAllCards: function () { return Promise.resolve([]); }, getSettings: function () { return Promise.resolve(defaultSettings); }, getPathState: function () { return Promise.resolve(null); }, savePathState: function () { return Promise.resolve(); } };
  window.app = { sections: sections, ensureSectionLoaded: function () { return Promise.resolve(); }, playTick: function () {}, playPop: function () {}, switchTab: function () {} };
  if (lessons) window.GrammarLessons = { getLessons: function () { return lessons.slice(); } };
  vm.runInContext(fs.readFileSync(path.join(__dirname, 'learning-path.js'), 'utf8'), context, { filename: 'learning-path.js' });
  return { window: window, eng: window.LearningPath._engine };
}

// === T26: new grammar patterns are only introduced as fast as they're taught ===
// A brand-new pattern may only be quizzed on the day it's taught, so the number of
// NEW patterns introduced per batch is bounded by the lesson cap (2). Question
// volume still grows via reviews + extra card types of already-taught patterns,
// which are NOT limited here.
(function () {
  const GRAM = [];
  for (let i = 0; i < 10; i++) GRAM.push({ id: 'g' + i, pattern: 'p' + i, level: 'N5', category: 'Partikel', meaning: 'm' + i });
  const { eng } = makeGrammarContext(GRAM, null);
  const map = eng.mapFromCards([], eng.normalizePath(null));
  const picks = eng.pickNewItems('N5', map, 20); // budget far exceeds the grammar supply
  const grammarPicks = picks.filter(function (p) { return p.section === 'grammar'; });
  check('T26 new grammar patterns are capped to the lesson cap (no untaught intros)', grammarPicks.length === 2);
})();

// === T27: lesson-first steps are emitted for unread lessons of in-session grammar ===
(function () {
  const GRAM = [
    { id: 'wa', pattern: 'は', level: 'N5', category: 'Partikel', meaning: 'Thema' },
    { id: 'wo', pattern: 'を', level: 'N5', category: 'Partikel', meaning: 'Objekt' },
    { id: 'ga', pattern: 'が', level: 'N5', category: 'Partikel', meaning: 'Subjekt' }
  ];
  const lessons = [
    { id: 'lesson-1', title: 'は vs が', subtitle: '', level: 'N5', grammarIds: ['wa', 'ga'] },
    { id: 'lesson-2', title: 'を', subtitle: '', level: 'N5', grammarIds: ['wo'] }
  ];
  const { eng } = makeGrammarContext(GRAM, lessons);
  const k = function (id) { return 'grammar:' + id; };
  const picks = [
    { section: 'grammar', item: GRAM[0] }, // wa
    { section: 'grammar', item: GRAM[1] }, // wo
    { section: 'grammar', item: GRAM[2] }  // ga
  ];
  // Session has wa + ga (not wo); lesson-2 (を) already read.
  const session = [
    { section: 'grammar', itemKey: k('wa') },
    { section: 'grammar', itemKey: k('ga') },
    { section: 'kanji', itemKey: 'kanji:x' }
  ];
  const steps = eng.lessonStepsForSession({ picks: picks, path: { readLessons: ['lesson-2'] } }, session);
  check('T27 one step per unread lesson, deduped across shared patterns', steps.length === 1);
  check('T27 the step targets the shared lesson', steps[0].lessonId === 'lesson-1');
  check('T27 the step is woven before one of its grammar cards', steps[0].precedesItemKey === k('wa') || steps[0].precedesItemKey === k('ga'));
  check('T27 the step is tagged as a lesson (so the runner teaches, not grades)', steps[0].kind === 'lesson');
  // A grammar pattern not present in the session contributes no step.
  check('T27 grammar absent from the session contributes no step',
    steps.filter(function (s) { return s.precedesItemKey === k('wo'); }).length === 0);
  // When every linked lesson is already read, no steps are emitted.
  const allRead = eng.lessonStepsForSession({ picks: picks, path: { readLessons: ['lesson-1', 'lesson-2'] } }, session);
  check('T27 fully-read lessons yield no steps', allRead.length === 0);
})();

// === T28: unlinked new grammar still teaches a lesson via level fallback ===
(function () {
  // N3 grammar with NO lesson link (the real state above N5). The next unread
  // lesson for the level must be taught anyway, so "Heute lernen" never tests a
  // pattern with no lesson shown first.
  const GRAM = [{ id: 'n3a', pattern: 'P1', level: 'N3', category: 'Satzstrukturen', meaning: 'm' }];
  const lessons = [
    { id: 'lx', number: 5, title: 'N3 Lektion A', subtitle: '', level: 'N3', grammarIds: [] },
    { id: 'ly', number: 6, title: 'N3 Lektion B', subtitle: '', level: 'N3', grammarIds: [] }
  ];
  const { eng } = makeGrammarContext(GRAM, lessons);
  const k = 'grammar:n3a';
  const session = [{ section: 'grammar', itemKey: k }];
  const model = { picks: [{ section: 'grammar', item: GRAM[0] }], path: { readLessons: [] }, progress: { currentLevel: 'N3' } };
  const steps = eng.lessonStepsForSession(model, session);
  check('T28 unlinked new grammar still teaches a lesson (level fallback)', steps.length === 1);
  check('T28 fallback uses the next unread level lesson by number', steps[0].lessonId === 'lx');
  check('T28 fallback lesson is glued to the grammar question (not front-loaded)', steps[0].precedesItemKey === k);
  const steps2 = eng.lessonStepsForSession({ picks: model.picks, path: { readLessons: ['lx'] }, progress: { currentLevel: 'N3' } }, session);
  check('T28 a read fallback lesson advances to the next one', steps2.length === 1 && steps2[0].lessonId === 'ly');
  const noNew = eng.lessonStepsForSession({ picks: [], path: { readLessons: [] }, progress: { currentLevel: 'N3' } }, []);
  check('T28 no new grammar -> no lesson steps', noNew.length === 0);
})();

// === T29: many new grammar questions still cap lessons at 1-2 per session ===
(function () {
  const GRAM = [];
  for (let i = 0; i < 5; i++) GRAM.push({ id: 'n3-' + i, pattern: 'P' + i, level: 'N3', category: 'Satzstrukturen', meaning: 'm' + i });
  const lessons = [];
  for (let i = 0; i < 5; i++) lessons.push({ id: 'L' + i, number: i + 1, title: 'N3 ' + i, subtitle: '', level: 'N3', grammarIds: [] });
  const { eng } = makeGrammarContext(GRAM, lessons);
  const picks = GRAM.map(function (g) { return { section: 'grammar', item: g }; });
  const session = GRAM.map(function (g) { return { section: 'grammar', itemKey: 'grammar:' + g.id }; });
  const steps = eng.lessonStepsForSession({ picks: picks, path: { readLessons: [] }, progress: { currentLevel: 'N3' } }, session);
  check('T29 five new grammar questions still yield at most 2 lessons', steps.length === 2);
})();

// === T7/T8: resetProgress + export/import round-trip on the real SRSStore ===
(function () {
  const store = makeStoreContext();
  const card = {
    cardKey: 'kanji:一#meaning', itemKey: 'kanji:一', section: 'kanji',
    state: 'New', dueAt: new Date().toISOString(), lapses: 0, suspended: false,
    updatedAt: new Date().toISOString()
  };
  let backup = null;
  store.putCards([card])
    .then(function () { return store.savePathState({ schemaV: 1, readLessons: ['lesson-1'], skippedItems: [], newDaily: { date: 'seed', count: 5 } }); })
    .then(function () { return Promise.all([store.getAllCards(), store.getPathState()]); })
    .then(function (p) {
      check('T7 seeded card present', p[0].length === 1);
      check('T7 seeded pathState present', !!p[1] && p[1].readLessons.length === 1 && p[1].newDaily.count === 5);
      return store.exportData();
    })
    .then(function (data) {
      backup = data;
      check('T8 export includes the card', Array.isArray(data.cards) && data.cards.length === 1);
      check('T8 export includes pathState', !!data.pathState && data.pathState.newDaily.count === 5);
      return store.resetProgress();
    })
    .then(function () { return Promise.all([store.getAllCards(), store.getPathState(), store.getSettings()]); })
    .then(function (p) {
      check('T7 reset clears cards', p[0].length === 0);
      check('T7 reset clears pathState', p[1] === null);
      check('T7 reset keeps settings', !!p[2] && typeof p[2].dailyNewLimit === 'number');
      return store.importData(backup, 'merge');
    })
    .then(function () { return Promise.all([store.getAllCards(), store.getPathState()]); })
    .then(function (p) {
      check('T8 import restores the card', p[0].length === 1);
      check('T8 import restores pathState', !!p[1] && p[1].newDaily.count === 5 && p[1].readLessons.length === 1);
      return diagnosticsTest();
    })
    .then(function () { return pruneTest(); })
    .then(function () { return fallbackErrorTest(); })
    .then(function () { return noteNewCardTest(); })
    .then(function () { return foundationalGrammarTest(); })
    .then(function () { return vocabRelevelTest(); })
    .then(function () { finish(); })
    .catch(function (e) { failures.push('store-tests-threw: ' + (e && e.message)); finish(); });
})();
