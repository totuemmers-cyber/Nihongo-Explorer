// ============================================================
// Audit: Statistik aggregation engine (stats.js)
// Loads srs-scheduler.js + stats.js into a stubbed runtime and asserts the pure
// aggregation functions: activity-by-day, longest streak, accuracy, forecast,
// and the deck status breakdown.
// Run: node audit-stats.js   (exit 0 = pass)
// ============================================================
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const DAY = 24 * 60 * 60 * 1000;
const failures = [];
function check(name, cond) { if (!cond) failures.push(name); }

// Mirror stats.js dayStr so we can build heatmap-style count keys for tests.
function dkey(ms) { var d = new Date(ms); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); }

function loadEngine() {
  const window = {};
  const context = { window, console, Date, Math, JSON, setTimeout };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(__dirname, 'srs-scheduler.js'), 'utf8'), context, { filename: 'srs-scheduler.js' });
  vm.runInContext(fs.readFileSync(path.join(__dirname, 'stats.js'), 'utf8'), context, { filename: 'stats.js' });
  return window.Stats._engine;
}

const eng = loadEngine();
const now = Date.now();

// === S1: activityByDay groups events per calendar day ===
(function () {
  const ev = [
    { reviewedAt: new Date(now).toISOString(), grade: 'Good', section: 'vocab' },
    { reviewedAt: new Date(now).toISOString(), grade: 'Again', section: 'vocab' },
    { reviewedAt: new Date(now - DAY).toISOString(), grade: 'Good', section: 'kanji' },
    { reviewedAt: 'not-a-date', grade: 'Good' } // ignored
  ];
  const act = eng.activityByDay(ev);
  check('S1 counts all valid events', act.total === 3);
  check('S1 groups into two distinct days', Object.keys(act.counts).length === 2);
})();

// === S2: accuracy treats anything but "Again" as correct, honours the window ===
(function () {
  const ev = [
    { reviewedAt: new Date(now).toISOString(), grade: 'Good', section: 'vocab' },
    { reviewedAt: new Date(now).toISOString(), grade: 'Again', section: 'vocab' },
    { reviewedAt: new Date(now - DAY).toISOString(), grade: 'Easy', section: 'kanji' },
    { reviewedAt: new Date(now - 40 * DAY).toISOString(), grade: 'Good', section: 'grammar' }
  ];
  const all = eng.accuracy(ev, 0, now);
  check('S2 total counts every event', all.total === 4);
  check('S2 correct excludes Again', all.correct === 3);
  check('S2 rate is correct/total', Math.abs(all.rate - 3 / 4) < 1e-9);
  check('S2 per-section split', all.bySection.vocab.total === 2 && all.bySection.vocab.correct === 1);
  const win = eng.accuracy(ev, 30, now);
  check('S2 trailing window drops the 40-day-old event', win.total === 3);
})();

// === S3: longestStreak finds the longest consecutive-day run ===
(function () {
  const counts = {};
  [0, 1, 2, 5].forEach(function (off) { counts[dkey(now - off * DAY)] = 1; }); // 3-day run + isolated day
  check('S3 finds the 3-day run', eng.longestStreak(counts) === 3);
  check('S3 empty -> 0', eng.longestStreak({}) === 0);
  check('S3 single day -> 1', eng.longestStreak({ '2024-1-1': 2 }) === 1);
})();

// === S4: forecast buckets upcoming reviews; excludes New/suspended ===
(function () {
  function card(state, dueOffsetDays, suspended) {
    return { itemKey: state + dueOffsetDays + (suspended ? 's' : ''), state: state, dueAt: new Date(now + dueOffsetDays * DAY).toISOString(), suspended: !!suspended };
  }
  const cards = [
    card('Review', -1),     // overdue
    card('Review', 0),      // today -> bucket[0]
    card('Review', 1),      // tomorrow -> bucket[1]
    card('Mature', 3),      // bucket[3]
    card('New', 0),         // excluded (not yet in rotation)
    card('Review', 1, true) // excluded (suspended)
  ];
  const fc = eng.forecast(cards, now, 7);
  check('S4 overdue = strictly-before-today', fc.overdue === 1);
  check('S4 today bucket', fc.buckets[0] === 1);
  check('S4 tomorrow bucket', fc.buckets[1] === 1);
  check('S4 +3 bucket', fc.buckets[3] === 1);
  check('S4 excludes New + suspended', fc.buckets[0] + fc.buckets[1] + fc.buckets[3] === 3);
})();

// === S5: statusBreakdown groups cards per item via the scheduler's getStatus ===
(function () {
  // Two cards for one item (siblings) collapse to a single item in the breakdown.
  function mk(itemKey, state, dueOffsetDays, lapses, suspended) {
    return {
      cardKey: itemKey + '#' + state, itemKey: itemKey, section: 'vocab', state: state,
      intervalDays: state === 'Review' ? 5 : 0, ease: 2.4, reps: 1, lapses: lapses || 0,
      dueAt: new Date(now + (dueOffsetDays || 0) * DAY).toISOString(), suspended: !!suspended
    };
  }
  const cards = [
    mk('a', 'New', 0),
    mk('a', 'New', 1),            // sibling of a -> still one item
    mk('b', 'Review', 5),         // future review -> familiar/learning bucket
    mk('c', 'Review', 5, 0, true) // suspended
  ];
  const s = eng.statusBreakdown(cards);
  const sum = s.new + s.learning + s.familiar + s.mastered + s.suspended;
  check('S5 collapses siblings to items (3 items)', sum === 3);
  check('S5 suspended item counted as suspended', s.suspended === 1);

  // Injected classifier keeps the function unit-testable without the scheduler.
  const stub = function () { return { className: 'mastered' }; };
  const s2 = eng.statusBreakdown([mk('x', 'Review', 200)], stub);
  check('S5 honours injected statusOf', s2.mastered === 1);
})();

console.log(JSON.stringify({ passed: failures.length === 0, failures: failures }, null, 2));
process.exit(failures.length > 0 ? 1 : 0);
