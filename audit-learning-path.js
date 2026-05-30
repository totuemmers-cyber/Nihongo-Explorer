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

function finish() {
  console.log(JSON.stringify({ passed: failures.length === 0, failures: failures }, null, 2));
  process.exit(failures.length > 0 ? 1 : 0);
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
    .then(function () { finish(); })
    .catch(function (e) { failures.push('store-tests-threw: ' + (e && e.message)); finish(); });
})();
