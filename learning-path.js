// ============================================================
// Lernpfad (Learning Path) — dynamic progression engine for Nihongo Explorer
// ------------------------------------------------------------
// Recommends what to study next based on already-completed content. All learning
// state is derived from the existing SRS store (no separate progress DB); only a
// tiny pathState (target level, daily-new counter, skipped items) is persisted.
// ============================================================
(function () {
  'use strict';

  // --- Configuration ---
  var LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'];
  var SECTIONS = ['kanji', 'vocab', 'grammar'];
  var LEVEL_ADVANCE_RATIO = 0.9; // familiar-or-better ratio to move past a level
  // Weighted round-robin mix when assembling a batch of new items.
  var MIX_WEIGHTS = { kanji: 1, vocab: 1.3, grammar: 0.6 };
  // Grammar lessons taught per session (kept light).
  var MAX_NEW_GRAMMAR_LESSONS = 2;
  // A brand-new grammar pattern may only be QUIZZED on the day it is TAUGHT, so we
  // never introduce more new patterns than we teach: the new-pattern intro cap is the
  // lesson cap. This does NOT limit grammar question volume overall — already-learned
  // patterns (their due reviews and additional card types) flow without limit, so
  // grammar practice still grows over time; only *untaught* new patterns are blocked.
  var MAX_NEW_GRAMMAR = MAX_NEW_GRAMMAR_LESSONS;
  // Size of the low-friction "Aufholen" session offered when a review backlog has
  // suppressed new content — a digestible bite instead of the full daily wall.
  var CATCHUP_CHUNK = 30;
  // Adaptive pacing nudge: only judge once there is a real sample, suggest lowering
  // the daily-new pace when the trailing week goes badly (or the weak set bloats),
  // and suggest raising it only when everything is green. The dead band between the
  // two accuracy thresholds plus a one-week snooze keep the nudge from nagging.
  var PACE_MIN_SAMPLE = 30;
  var PACE_LOWER_ACC = 0.75;
  var PACE_WEAK_RATIO = 0.25;
  var PACE_RAISE_ACC = 0.92;
  var PACE_SNOOZE_MS = 7 * 24 * 60 * 60 * 1000;

  var initialized = false;
  var panel = null;

  // --- Small DOM helper (mirrors srs-ui.js) ---
  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  function isJp(text) {
    return /[　-龯぀-ヿ＀-ﾟ]/.test(text || '');
  }

  function statCard(label, value) {
    var card = el('div', 'review-stat');
    card.appendChild(el('span', 'review-stat-value', value));
    card.appendChild(el('span', 'review-stat-label', label));
    return card;
  }

  // A stat that doubles as a goal gauge: "8 / 20" plus a slim fill bar.
  function progressStatCard(label, done, total) {
    var card = el('div', 'review-stat');
    card.appendChild(el('span', 'review-stat-value', done + ' / ' + total));
    card.appendChild(el('span', 'review-stat-label', label));
    var bar = el('div', 'path-stat-bar');
    var fill = el('div', 'path-stat-bar-fill');
    fill.style.width = (total > 0 ? Math.min(100, Math.round(done / total * 100)) : 0) + '%';
    bar.appendChild(fill);
    card.appendChild(bar);
    return card;
  }

  // Rough session-length estimate. New cards take longer than reviews (each one
  // now starts with an intro step to read); these per-card seconds are
  // deliberately coarse — it only sets expectations.
  function estimateMinutes(newCount, dueCount) {
    return Math.max(1, Math.round((newCount * 18 + dueCount * 7) / 60));
  }

  // --- Data loading ---
  function ensureData() {
    if (!window.app || !window.app.ensureSectionLoaded) return Promise.resolve();
    return Promise.all([
      window.app.ensureSectionLoaded('kanji'),
      window.app.ensureSectionLoaded('vocab'),
      window.app.ensureSectionLoaded('grammar')
    ]);
  }

  function init() {
    if (initialized) return Promise.resolve();
    initialized = true;
    return window.SRSStore.init().catch(function () {});
  }

  // --- pathState helpers ---
  function dayStr(d) {
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  }
  function todayStr() { return dayStr(new Date()); }
  function yesterdayStr() {
    var d = new Date();
    d.setDate(d.getDate() - 1);
    return dayStr(d);
  }
  function dayBeforeYesterdayStr() {
    var d = new Date();
    d.setDate(d.getDate() - 2);
    return dayStr(d);
  }

  // Parse a dayStr() value ("YYYY-M-D") into a comparable integer (YYYYMMDD), or
  // null if it isn't a valid day string (legacy/garbage values like "old").
  function parseDay(s) {
    var m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(String(s || ''));
    if (!m) return null;
    return (+m[1]) * 10000 + (+m[2]) * 100 + (+m[3]);
  }

  // True if calendar day `a` is strictly earlier than `b`. An unparseable `a`
  // counts as "earlier" so a stale/garbage stored date still triggers a reset;
  // a future `a` (device clock moved backward) counts as NOT earlier, so callers
  // can refuse to zero a counter or lapse a streak on a backward clock change.
  function dayBefore(a, b) {
    var pa = parseDay(a), pb = parseDay(b);
    if (pa === null) return true;
    if (pb === null) return false;
    return pa < pb;
  }

  function normalizePath(p) {
    p = p || {};
    // Daily-new counter. Reset to 0 only when the stored day is strictly in the
    // PAST — a genuine new day. If the device clock moved backward (stored day now
    // reads as today or the future), carry the counter forward under today's date
    // instead of zeroing it, so the daily limit can't be bypassed by time travel.
    var daily;
    if (p.newDaily && p.newDaily.date === todayStr()) {
      daily = p.newDaily;
    } else if (p.newDaily && !dayBefore(p.newDaily.date, todayStr())) {
      daily = { date: todayStr(), count: (typeof p.newDaily.count === 'number' ? p.newDaily.count : 0) };
    } else {
      daily = { date: todayStr(), count: 0 };
    }
    return {
      schemaV: 1,
      kanaDone: !!p.kanaDone,
      targetLevel: LEVELS.indexOf(p.targetLevel) !== -1 ? p.targetLevel : 'N1',
      startLevel: LEVELS.indexOf(p.startLevel) !== -1 ? p.startLevel : 'N5',
      skippedItems: Array.isArray(p.skippedItems) ? p.skippedItems : [],
      readLessons: Array.isArray(p.readLessons) ? p.readLessons : [],
      newDaily: daily,
      lastSessionAt: p.lastSessionAt || null,
      // Motivation tracking: a daily streak and the highest level already announced.
      streakCount: typeof p.streakCount === 'number' ? p.streakCount : 0,
      streakLastDay: p.streakLastDay || null,
      // Streak shields: earned every full week of consecutive study (max 2 banked),
      // each one bridges exactly one missed day instead of resetting the streak.
      streakShields: typeof p.streakShields === 'number' ? Math.max(0, Math.min(2, p.streakShields)) : 0,
      seenLevel: LEVELS.indexOf(p.seenLevel) !== -1 ? p.seenLevel : null,
      // Pacing nudge snooze (ms epoch, 0 = never snoozed): set on apply AND dismiss
      // so the suggestion stays quiet for a week either way.
      paceSnoozeUntil: typeof p.paceSnoozeUntil === 'number' ? p.paceSnoozeUntil : 0
    };
  }

  // The streak the learner can currently see. Alive if they studied today or
  // yesterday (yesterday = not yet extended today); otherwise it has lapsed to 0.
  function currentStreak(path) {
    var last = path.streakLastDay;
    if (!last) return 0;
    // Alive if the last study day is yesterday, today, or — after a backward clock
    // change — a day that now reads as the future. Only a genuine gap (last day
    // strictly before yesterday) lapses the streak to 0.
    if (last === yesterdayStr() || !dayBefore(last, todayStr())) return path.streakCount || 0;
    return 0;
  }

  // Streak plus whether TODAY already counts toward it — so the UI can say
  // "heute gesichert" vs "heute noch offen" instead of leaving the learner to
  // guess if their streak is safe. Clock-back safe via the same dayBefore idiom
  // as markStudyDay: a last-study day reading as today/future counts as secured.
  // With a banked shield, a streak that missed exactly yesterday is still shown
  // as rescuable (shieldPending) — studying today bridges the gap.
  function streakInfo(path) {
    var count = currentStreak(path);
    var shields = (path && path.streakShields) || 0;
    var shieldPending = false;
    if (count === 0 && shields > 0 && path && path.streakLastDay === dayBeforeYesterdayStr()) {
      count = path.streakCount || 0;
      shieldPending = count > 0;
    }
    return {
      count: count,
      securedToday: !!(path && path.streakLastDay && !dayBefore(path.streakLastDay, todayStr())),
      shields: shields,
      shieldPending: shieldPending
    };
  }

  // Record that the learner studied today, extending or restarting the streak.
  // Mutates path; caller persists. No-op if today was already counted.
  function markStudyDay(path) {
    var today = todayStr();
    // Already counted today, or the clock moved back and the last study day now
    // reads as today/future — leave the streak untouched rather than restarting it.
    if (path.streakLastDay && !dayBefore(path.streakLastDay, today)) return;
    if (path.streakLastDay === yesterdayStr()) {
      path.streakCount = (path.streakCount || 0) + 1;
    } else if (path.streakLastDay === dayBeforeYesterdayStr() && (path.streakShields || 0) > 0) {
      // A banked shield bridges exactly one missed day: the streak continues.
      path.streakShields -= 1;
      path.streakCount = (path.streakCount || 0) + 1;
    } else {
      path.streakCount = 1;
    }
    // Every full week of consecutive study banks a shield (capped).
    if (path.streakCount > 0 && path.streakCount % 7 === 0) {
      path.streakShields = Math.min(2, (path.streakShields || 0) + 1);
    }
    path.streakLastDay = today;
  }

  // Sticky flag: a pathState write has failed since the last successful save. The
  // next render surfaces a banner so a silent storage failure (e.g. quota, evicted
  // IndexedDB) can't quietly drop a skip, a streak, or the daily counter.
  var pathSaveFailed = false;

  // Persist pathState without ever rejecting: on failure it warns to the console and
  // sets pathSaveFailed so render() can show the banner. Returns a promise that always
  // resolves, so callers can chain `.then(render)` for both the success and failure path.
  function savePathStateSafe(path) {
    if (!window.SRSStore || !window.SRSStore.savePathState) return Promise.resolve();
    return window.SRSStore.savePathState(path).then(function () {
      pathSaveFailed = false;
    }, function (err) {
      pathSaveFailed = true;
      if (window.console && console.warn) {
        console.warn('Lernpfad: Fortschritt konnte nicht gespeichert werden.', err);
      }
    });
  }

  // Mark + persist a study day for review/practice launches that bypass startToday.
  function recordStudyStart(path) {
    markStudyDay(path);
    path.lastSessionAt = new Date().toISOString();
    savePathStateSafe(path);
  }

  // Count one new card toward today's Tagesziel — the moment it is actually
  // introduced (first reviewed), not when the session was assembled. srs-ui calls
  // this on a card's New->* transition, so launching "Heute lernen" and aborting
  // before reviewing never inflates the daily counter. Reads the freshest pathState
  // straight from the store (normalizePath resets the counter on a new day) and is
  // serialized so a burst of new-card grades can't lose increments through
  // overlapping get-modify-save cycles.
  var newCountChain = Promise.resolve();
  function noteNewCardIntroduced() {
    newCountChain = newCountChain.then(function () {
      if (!window.SRSStore || !window.SRSStore.getPathState) return;
      return window.SRSStore.getPathState().then(function (raw) {
        var path = normalizePath(raw);
        path.newDaily.count += 1;
        return savePathStateSafe(path);
      });
    }).catch(function () {});
    return newCountChain;
  }

  // Counterpart to noteNewCardIntroduced for the session runner's undo: taking
  // back the grade that introduced a new card frees its Tagesziel slot again.
  function noteNewCardUndone() {
    newCountChain = newCountChain.then(function () {
      if (!window.SRSStore || !window.SRSStore.getPathState) return;
      return window.SRSStore.getPathState().then(function (raw) {
        var path = normalizePath(raw);
        path.newDaily.count = Math.max(0, path.newDaily.count - 1);
        return savePathStateSafe(path);
      });
    }).catch(function () {});
    return newCountChain;
  }

  // Mark a lesson read from inside a running session (the lesson-first step in
  // "Heute lernen"). Mirrors noteNewCardIntroduced: a serialized, fresh
  // get-modify-save so it can't lose writes, and it keeps the streak alive. srs-ui
  // calls this when the learner advances past an in-session lesson card.
  var lessonReadChain = Promise.resolve();
  function noteLessonReadById(id) {
    lessonReadChain = lessonReadChain.then(function () {
      if (!window.SRSStore || !window.SRSStore.getPathState) return;
      return window.SRSStore.getPathState().then(function (raw) {
        var path = normalizePath(raw);
        if (path.readLessons.indexOf(id) === -1) {
          path.readLessons.push(id);
          recordLessonActivity(path, id);
        }
        return savePathStateSafe(path);
      });
    }).catch(function () {});
    return lessonReadChain;
  }

  // --- Mastery derivation ---
  function ladderFromClassName(className) {
    if (className === 'mastered') return 'mastered';
    if (className === 'familiar') return 'familiar';
    if (className === 'not-in-review') return 'new';
    // 'suspended' falls through to 'learning' so suspended items count as in-progress
    // and are NOT re-recommended as new by pickNewItems (which selects status 'new').
    return 'learning'; // due | weak | learning | suspended
  }

  function mapFromCards(cards, path) {
    var byItem = {};
    cards.forEach(function (c) {
      if (!c || !c.itemKey) return;
      (byItem[c.itemKey] = byItem[c.itemKey] || []).push(c);
    });
    var map = {};
    Object.keys(byItem).forEach(function (key) {
      var status = window.SRSScheduler.getStatus(byItem[key]);
      map[key] = ladderFromClassName(status.className);
    });
    // Items the user explicitly marked as already-known count as familiar.
    (path.skippedItems || []).forEach(function (key) {
      if (map[key] !== 'mastered') map[key] = 'familiar';
    });
    // Everything below the chosen starting level counts as already known, so the
    // path skips those levels and their kanji don't gate higher-level vocab.
    var startIdx = LEVELS.indexOf(path.startLevel || 'N5');
    if (startIdx > 0 && window.app && window.app.sections) {
      SECTIONS.forEach(function (s) {
        var items = (window.app.sections[s] && window.app.sections[s].allItems) || [];
        items.forEach(function (it) {
          if (LEVELS.indexOf(levelOf(s, it)) < startIdx) {
            var key = itemKeyOf(s, it);
            if (map[key] !== 'mastered') map[key] = 'familiar';
          }
        });
      });
    }
    return map;
  }

  function levelOf(section, item) {
    return section === 'kanji' ? item.jlpt : item.level;
  }

  function itemKeyOf(section, item) {
    if (item && item.__lpKey) return item.__lpKey;
    var key = window.SRSUI.getItemKey(section, item);
    if (item) item.__lpKey = key;
    return key;
  }

  function itemStatus(section, item, map) {
    return map[itemKeyOf(section, item)] || 'new';
  }

  // itemKey -> {section, item} across the learnable sections. Used to map an
  // already-created backlog card (a ready New sibling) back to a displayable item.
  function buildItemIndex() {
    var idx = {};
    SECTIONS.forEach(function (s) {
      var sec = window.app.sections[s];
      var items = (sec && sec.allItems) || [];
      for (var i = 0; i < items.length; i++) idx[itemKeyOf(s, items[i])] = { section: s, item: items[i] };
    });
    return idx;
  }

  // Resolve skipped itemKeys back to displayable items for the un-skip panel.
  // Stale keys (item no longer in the dataset) resolve with item: null so they
  // can still be listed and removed (data hygiene).
  function resolveSkippedItems(path) {
    var keys = (path && path.skippedItems) || [];
    if (!keys.length) return [];
    var idx = buildItemIndex();
    return keys.map(function (key) {
      var hit = idx[key];
      return { key: key, section: hit ? hit.section : null, item: hit ? hit.item : null };
    });
  }

  // The items already queued to be learned today: ready New sibling cards (the
  // backlog consumed before brand-new picks), deduped per item and mapped back to
  // their dataset item. Capped at the daily budget so the preview matches the
  // session "Heute lernen" will actually run.
  function readyToLearn(newReady, budget) {
    var out = [], seen = {}, cap = Math.max(0, budget || 0);
    if (!newReady || !newReady.length || cap === 0) return out;
    var idx = buildItemIndex();
    for (var i = 0; i < newReady.length && out.length < cap; i++) {
      var c = newReady[i];
      if (seen[c.itemKey]) continue;
      seen[c.itemKey] = true;
      var hit = idx[c.itemKey];
      if (hit) out.push(hit);
    }
    return out;
  }

  // --- Progress per level (single pass over all items) ---
  function computeProgress(map, path) {
    var byLevel = {};
    LEVELS.forEach(function (L) {
      byLevel[L] = { level: L, total: 0, mastered: 0, familiar: 0, learning: 0 };
    });
    SECTIONS.forEach(function (s) {
      var sec = window.app.sections[s];
      var items = (sec && sec.allItems) || [];
      for (var i = 0; i < items.length; i++) {
        var b = byLevel[levelOf(s, items[i])];
        if (!b) continue;
        b.total++;
        var st = itemStatus(s, items[i], map);
        if (st === 'mastered') b.mastered++;
        else if (st === 'familiar') b.familiar++;
        else if (st === 'learning') b.learning++;
      }
    });
    var levels = LEVELS.map(function (L) {
      var b = byLevel[L];
      b.done = b.mastered + b.familiar;
      // A level with no items is vacuously complete (ratio 1), not 0% done. Treating
      // an empty level as incomplete would pin currentLevel on it forever — and since
      // frontierQueues for an empty level yields nothing, the learner would be shown
      // no new content and could never advance (e.g. if a section failed to load).
      b.ratio = b.total ? b.done / b.total : 1;
      return b;
    });

    var target = path.targetLevel || 'N1';
    var targetIdx = LEVELS.indexOf(target);
    if (targetIdx < 0) targetIdx = LEVELS.length - 1;
    var current = LEVELS[targetIdx];
    for (var i = 0; i <= targetIdx; i++) {
      if (levels[i].ratio < LEVEL_ADVANCE_RATIO) { current = LEVELS[i]; break; }
    }
    return { levels: levels, currentLevel: current, targetLevel: target };
  }

  // Decide whether a level-up is worth celebrating. Only a rise ABOVE a stored
  // baseline counts; a null baseline (first run, or after a Startniveau change that
  // resets it) is adopted silently, so settings tweaks never trigger a false banner.
  function decideLevelUp(prevSeenLevel, currentLevel) {
    var seenIdx = LEVELS.indexOf(prevSeenLevel);
    var curIdx = LEVELS.indexOf(currentLevel);
    return {
      leveledUp: (seenIdx >= 0 && curIdx > seenIdx) ? currentLevel : null,
      seenLevel: currentLevel
    };
  }

  // --- Kanji -> vocab prerequisite gate ---
  // The kanji (still 'new') inside a word that keep it gated. Empty => unlocked.
  function blockingKanji(v, kanjiIndex, map) {
    var w = v.word || '', out = [];
    // Iterate by code point (not UTF-16 unit) so rare kanji in the supplementary
    // planes (CJK Ext-B+, stored as surrogate pairs) are gated too, not skipped.
    for (var i = 0; i < w.length;) {
      var cp = w.codePointAt(i);
      var ch = String.fromCodePoint(cp);
      i += ch.length; // 2 for a surrogate pair, 1 otherwise
      var isCjk = (cp >= 0x3400 && cp <= 0x9FFF) ||   // CJK Unified + Ext-A (BMP)
        (cp >= 0x20000 && cp <= 0x2FA1F);             // Ext-B..F + Compat Ideographs Supplement
      if (!isCjk) continue;
      var k = kanjiIndex[ch];
      if (!k) continue; // kanji absent from dataset -> can't gate on it
      if (itemStatus('kanji', k, map) === 'new') out.push(ch);
    }
    return out;
  }

  function vocabUnlocked(v, kanjiIndex, map) {
    return blockingKanji(v, kanjiIndex, map).length === 0;
  }

  // The kanji blocking the most waiting vocab, so the path can answer "which
  // kanji should I learn to unlock the most words?". Computed over the FULL
  // waiting queue (not the 4-item preview). -> [{ char, item, count }]
  function topBlockingKanji(waitVocab, kanjiIndex, map, topK) {
    var counts = {};
    (waitVocab || []).forEach(function (p) {
      blockingKanji(p.item, kanjiIndex, map).forEach(function (ch) {
        counts[ch] = (counts[ch] || 0) + 1;
      });
    });
    return Object.keys(counts).map(function (ch) {
      return { char: ch, item: kanjiIndex[ch], count: counts[ch] };
    }).sort(function (a, b) {
      return b.count - a.count || a.char.localeCompare(b.char, 'ja');
    }).slice(0, topK || 3);
  }

  function grammarCompare(a, b) {
    var order = { 'Partikel': 0, 'Verben': 1, 'Adjektive': 2, 'Satzstrukturen': 3, 'Keigo': 4 };
    var ca = order[a.category] !== undefined ? order[a.category] : 9;
    var cb = order[b.category] !== undefined ? order[b.category] : 9;
    if (ca !== cb) return ca - cb;
    return String(a.pattern).localeCompare(String(b.pattern), 'ja');
  }

  // Ordered queues of not-yet-started items for a level, wrapped as {section,item}.
  function frontierQueues(level, map) {
    var sec = window.app.sections;
    var wrap = function (s) { return function (it) { return { section: s, item: it }; }; };

    var kanji = ((sec.kanji && sec.kanji.allItems) || []).filter(function (k) { return k.jlpt === level; });
    kanji.sort(function (a, b) {
      return (a.strokes || 99) - (b.strokes || 99) || String(a.kanji).localeCompare(String(b.kanji), 'ja');
    });
    var newKanji = kanji.filter(function (k) { return itemStatus('kanji', k, map) === 'new'; }).map(wrap('kanji'));

    var grammar = ((sec.grammar && sec.grammar.allItems) || []).filter(function (g) { return g.level === level; });
    grammar.sort(grammarCompare);
    var newGrammar = grammar.filter(function (g) { return itemStatus('grammar', g, map) === 'new'; }).map(wrap('grammar'));

    var kanjiIndex = (typeof getKanjiByChar === 'function') ? getKanjiByChar() : {};
    var vocab = ((sec.vocab && sec.vocab.allItems) || []).filter(function (v) { return v.level === level; });
    var gatedVocab = [], waitVocab = [];
    vocab.forEach(function (v) {
      if (itemStatus('vocab', v, map) !== 'new') return;
      (vocabUnlocked(v, kanjiIndex, map) ? gatedVocab : waitVocab).push({ section: 'vocab', item: v });
    });

    return { newKanji: newKanji, newGrammar: newGrammar, gatedVocab: gatedVocab, waitVocab: waitVocab, kanjiIndex: kanjiIndex };
  }

  // Weighted round-robin: pull up to `budget` items across queues by weight.
  // Smooth weighted round-robin (the nginx scheme): each round every non-empty
  // queue accumulates its weight, the highest-accumulator queue is picked, and the
  // picked queue is debited by the *total* weight in play this round. Debiting by the
  // total (not a flat 1) is what keeps the distribution proportional — debiting by 1
  // let the accumulators drift upward unbounded and starved the lowest-weight queue
  // entirely (e.g. grammar at weight 0.6 never got picked while kanji/vocab remained,
  // so grammar was only ever introduced after every kanji and vocab ran out). Summing
  // the total over only the non-empty queues keeps it correct as queues deplete.
  function interleave(queues, weights, budget) {
    var result = [];
    var acc = weights.map(function () { return 0; });
    while (result.length < budget) {
      var total = 0, pick = -1, best = -Infinity;
      for (var i = 0; i < queues.length; i++) {
        if (!queues[i].length) continue;
        total += weights[i];
        acc[i] += weights[i];
        if (acc[i] > best) { best = acc[i]; pick = i; }
      }
      if (pick === -1) break;
      result.push(queues[pick].shift());
      acc[pick] -= total;
    }
    return result;
  }

  // `queues` is optional: pass a pre-computed frontierQueues(level, map) to avoid
  // recomputing it (loadModel already needs the queues for the waiting preview).
  function pickNewItems(level, map, budget, queues) {
    if (budget <= 0) return [];
    var q = queues || frontierQueues(level, map);
    var items = interleave(
      [q.newKanji.slice(), q.gatedVocab.slice(), q.newGrammar.slice(0, MAX_NEW_GRAMMAR)],
      [MIX_WEIGHTS.kanji, MIX_WEIGHTS.vocab, MIX_WEIGHTS.grammar],
      budget
    );
    // Relax the gate only once there are no more new kanji to introduce at this
    // level. Grammar is already fully consumed in the first pass (interleave only
    // stops early when every queue is empty), so re-adding it here would duplicate
    // picks — only the kanji-gated vocab (waitVocab) remains to offer.
    if (items.length < budget && !q.newKanji.length) {
      items = items.concat(interleave(
        [q.waitVocab.slice()],
        [MIX_WEIGHTS.vocab],
        budget - items.length
      ));
    }
    return items;
  }

  function newBudget(model, dueCount) {
    if (dueCount >= model.settings.dailyReviewLimit) return 0;
    return Math.max(0, model.settings.dailyNewLimit - model.path.newDaily.count);
  }

  // Sibling burying: only ONE card per item per session (the highest-priority
  // one, so the input must already be sortQueue-ordered) — a second card of the
  // same item would leak the answer the first one just revealed. Buried siblings
  // stay due and surface in the next session.
  function burySiblings(sortedDue) {
    var seen = {};
    return (sortedDue || []).filter(function (c) {
      if (!c || !c.itemKey || seen[c.itemKey]) return false;
      seen[c.itemKey] = true;
      return true;
    });
  }

  // Recovery plan for a review backlog: how many days of capped sessions until
  // it is cleared (a floor — tomorrow's newly-due cards add more, hence "mind."
  // in the UI copy), plus the size of the low-friction catch-up bite.
  function catchUpPlan(dueTotal, dailyReviewLimit) {
    var total = Math.max(0, dueTotal || 0);
    var limit = Math.max(1, dailyReviewLimit || 1);
    return {
      days: Math.max(1, Math.ceil(total / limit)),
      chunk: Math.min(CATCHUP_CHUNK, total)
    };
  }

  // Suggest adjusting the daily-new pace based on the trailing week. acc is the
  // Stats.accuracy shape ({ total, correct }) over 7 days; goalHit means today's
  // Tagesziel was reached. Returns { action: 'lower'|'raise', from, to } or null.
  // Hysteresis: the 75–92% dead band, a 30-review minimum sample, and a one-week
  // snooze (written on both apply and dismiss) keep this from firing daily.
  function pacingSuggestion(acc, weakCount, activeCount, dueTotal, goalHit, settings, path, nowMs) {
    if (((path && path.paceSnoozeUntil) || 0) > nowMs) return null;
    if (!acc || acc.total < PACE_MIN_SAMPLE) return null;
    var rate = acc.correct / acc.total;
    var weakRatio = activeCount ? weakCount / activeCount : 0;
    var cur = settings.dailyNewLimit;
    var i = NEW_PER_DAY_OPTIONS.indexOf(cur);
    if (rate < PACE_LOWER_ACC || weakRatio > PACE_WEAK_RATIO) {
      if (i > 0) return { action: 'lower', from: cur, to: NEW_PER_DAY_OPTIONS[i - 1] };
      return null; // already at the floor
    }
    if (rate > PACE_RAISE_ACC && dueTotal === 0 && goalHit) {
      if (i !== -1 && i < NEW_PER_DAY_OPTIONS.length - 1) {
        return { action: 'raise', from: cur, to: NEW_PER_DAY_OPTIONS[i + 1] };
      }
    }
    return null;
  }

  // Assemble today's session from the due queue plus the available new-card supply
  // (ready backlog + freshly-introduced primaries), capped by the daily-new budget.
  // Side-effect-free so the budget accounting can be unit-tested without the store.
  // Returns { session, newCount } where newCount is how many NEW cards the session
  // contains — exactly the amount the daily counter should advance by (so the same
  // card is never counted twice, and the cap is never exceeded).
  function assembleSession(due, newReady, newlyReady, budget) {
    var cap = Math.max(0, budget || 0);
    var newCardsToday = (newReady || []).concat(newlyReady || []).slice(0, cap);
    return { session: (due || []).concat(newCardsToday), newCount: newCardsToday.length };
  }

  // --- Model assembly ---
  function loadModel() {
    return ensureData().then(function () {
      return Promise.all([
        window.SRSStore.getAllCards(),
        window.SRSStore.getSettings(),
        window.SRSStore.getPathState(),
        window.SRSStore.getBackupStatus().catch(function () { return null; }),
        // Review events feed the pacing nudge; guarded because the audit VM's
        // store stub doesn't implement getAllEvents.
        (window.SRSStore.getAllEvents ? window.SRSStore.getAllEvents() : Promise.resolve([]))
          .catch(function () { return []; })
      ]);
    }).then(function (parts) {
      var cards = parts[0] || [];
      var settings = parts[1];
      var path = normalizePath(parts[2]);
      var backup = parts[3];
      var events = parts[4] || [];
      var map = mapFromCards(cards, path);
      var progress = computeProgress(map, path);
      // Level-up detection. Persist the re-based seenLevel only when a baseline
      // already existed or a real level-up fired — never write a phantom pathState
      // just because a brand-new user opened the tab (a null baseline adopts the
      // current level in memory and gets persisted on their first real action).
      var prevSeen = parts[2] ? parts[2].seenLevel : null;
      var lv = decideLevelUp(path.seenLevel, progress.currentLevel);
      var leveledUp = lv.leveledUp;
      path.seenLevel = lv.seenLevel;
      if (path.seenLevel !== prevSeen && (prevSeen != null || leveledUp)) {
        savePathStateSafe(path);
      }
      // Due queue: session-capped at the daily review limit, but keep the uncapped
      // total so the catch-up plan can tell the learner the true backlog size.
      var dueAll = cards.filter(function (c) { return window.SRSScheduler.isDue(c); });
      var due = burySiblings(window.SRSScheduler.sortQueue(dueAll)).slice(0, settings.dailyReviewLimit);
      // The daily "new" budget is measured in cards: each introduction is a single
      // card (a primary, or a sibling unlocked on a later day). Already-created New
      // cards that are ready (staggered siblings whose day has come, or manually
      // added items) form a backlog that is consumed before brand-new items start.
      var budget = newBudget({ settings: settings, path: path }, due.length);
      var newReady = window.SRSScheduler.sortQueue(
        cards.filter(function (c) { return window.SRSScheduler.isNewReady(c); })
      );
      var itemsToStart = Math.max(0, budget - newReady.length);
      // Compute the frontier once and reuse it for both picks and the waiting preview
      // (pickNewItems only reads slices of the queues, so they stay intact here).
      var queues = frontierQueues(progress.currentLevel, map);
      var picks = pickNewItems(progress.currentLevel, map, itemsToStart, queues);
      // A short preview of vocab still gated by not-yet-learned kanji, so the path
      // explains *why* it isn't suggesting these yet instead of silently hiding them.
      var suppressedNew = due.length >= settings.dailyReviewLimit;
      var waiting = suppressedNew ? [] : queues.waitVocab.slice(0, 4).map(function (p) {
        return { section: 'vocab', item: p.item, blocking: blockingKanji(p.item, queues.kanjiIndex, map) };
      });
      // Items already queued for today (ready New backlog), shown alongside the
      // brand-new picks so the pensum reflects the full set "Heute lernen" runs —
      // not just the few brand-new items left after the backlog eats the budget.
      var readyItems = suppressedNew ? [] : readyToLearn(newReady, budget);
      // Active rotation + weak subset (shared by the focus stats, the drills panel
      // and the pacing nudge). Staggered New siblings whose day hasn't come yet are
      // upcoming, not active, so they don't inflate the count.
      var nowMs = Date.now();
      var activeCards = cards.filter(function (c) {
        if (!c || c.suspended) return false;
        if (c.state === 'New' && new Date(c.dueAt || 0).getTime() > nowMs) return false;
        return true;
      });
      var weakCards = activeCards.filter(function (c) { return window.SRSScheduler.isWeak(c); });
      var acc7 = (window.Stats && window.Stats.accuracy) ? window.Stats.accuracy(events, 7) : null;
      var paceSuggestion = pacingSuggestion(
        acc7, weakCards.length, activeCards.length, dueAll.length,
        path.newDaily.count >= settings.dailyNewLimit, settings, path, nowMs
      );
      return {
        cards: cards, settings: settings, path: path, map: map,
        progress: progress, due: due, dueTotal: dueAll.length, picks: picks,
        waiting: waiting, waitTotal: suppressedNew ? 0 : queues.waitVocab.length,
        topBlockers: suppressedNew ? [] : topBlockingKanji(queues.waitVocab, queues.kanjiIndex, map, 3),
        kanjiIndex: queues.kanjiIndex,
        activeCards: activeCards, weakCards: weakCards, paceSuggestion: paceSuggestion,
        readyItems: readyItems, newReady: newReady, budget: budget, backup: backup,
        suppressedNew: suppressedNew, leveledUp: leveledUp
      };
    });
  }

  // --- Session launch ("Heute lernen") ---
  var launching = false;
  function startToday(model, btn) {
    if (launching) return Promise.resolve(); // guard against double-clicks
    launching = true;
    if (btn) btn.disabled = true;
    var picks = model.picks;
    return Promise.all(picks.map(function (p) { return window.SRSUI.addItem(p.section, p.item); }))
      .then(function (cardLists) {
        // Of the freshly created cards, only the ready-now ones (primaries) join
        // today's session; staggered siblings wait for their day.
        var newlyReady = [];
        cardLists.forEach(function (cs) {
          (cs || []).forEach(function (c) {
            if (window.SRSScheduler.isNewReady(c)) newlyReady.push(c);
          });
        });
        // Today's new cards = ready backlog + new primaries, capped by the budget.
        var asm = assembleSession(model.due, model.newReady, newlyReady, model.budget);
        var session = asm.session;
        // Only count the day toward the streak once there is a real session to run —
        // an empty/stale launch must not pad the streak.
        if (!session.length) { render(); return null; }
        // NB: the daily-new counter is NOT advanced here. New cards are only counted
        // toward the Tagesziel as they are actually reviewed for the first time (see
        // noteNewCardIntroduced, called from srs-ui on the New->* transition), so
        // launching "Heute lernen" and aborting before reviewing never inflates it.
        model.path.lastSessionAt = new Date().toISOString();
        markStudyDay(model.path);
        return savePathStateSafe(model.path).then(function () {
          // Teach before testing: weave an unread lesson in front of each new
          // grammar pattern, and an intro card in front of each never-seen vocab/
          // kanji item. The runner re-orders by SRS priority but keeps each step
          // directly before its item's first card.
          return ensureLessonsLoaded().then(function () {
            var steps = lessonStepsForSession(model, session)
              .concat(introStepsForSession(model, session));
            return steps.length ? steps.concat(session) : session;
          });
        });
      })
      .then(function (session) {
        if (session) window.SRSUI.startSession(session, true);
      })
      .catch(function () {
        if (btn) { btn.disabled = false; btn.textContent = 'Fehler — bitte erneut versuchen'; }
      })
      .then(function () { launching = false; });
  }

  // Mark a single suggested item as already known. The granular, low-stakes
  // counterpart to skipPicks — no dialog, just remove this one and re-render.
  function skipOne(model, section, item) {
    var key = itemKeyOf(section, item);
    if (model.path.skippedItems.indexOf(key) === -1) model.path.skippedItems.push(key);
    savePathStateSafe(model.path).then(render);
    if (window.app) window.app.playTick();
  }

  // Mark every current suggestion as already known. This is the broad stroke, so
  // it keeps a confirmation; the per-item ✓ is the safe default for "I know this
  // one". Recoverable via the "Übersprungen" panel in "So lerne ich".
  function skipPicks(model) {
    if (!model.picks.length) return;
    if (!window.confirm('Alle ' + model.picks.length + ' Vorschläge als „kenne ich schon“ markieren?')) return;
    model.picks.forEach(function (p) {
      var key = itemKeyOf(p.section, p.item);
      if (model.path.skippedItems.indexOf(key) === -1) model.path.skippedItems.push(key);
    });
    savePathStateSafe(model.path).then(render);
    if (window.app) window.app.playTick();
  }

  // Open a to-learn item's detail overlay IN PLACE (no tab switch). The overlays are
  // top-level, so they render over the Lernpfad and closing them returns here directly.
  function openItemDetail(section, item) {
    var sec = window.app.sections[section];
    if (!sec) return;
    window.app.ensureSectionLoaded(section).then(function () {
      sec.showItem(item);
    }).catch(function () {});
  }

  // --- Rendering ---
  function ensurePanel() {
    panel = document.getElementById('path-content');
    return panel;
  }

  function onTabActivate() {
    if (!ensurePanel()) return;
    renderLoading();
    init().then(render);
  }

  function renderLoading() {
    panel.innerHTML = '';
    var shell = el('div', 'review-shell');
    shell.appendChild(el('div', 'review-title', 'Lernpfad'));
    shell.appendChild(el('div', 'review-subtitle', 'Dein Fortschritt wird berechnet…'));
    panel.appendChild(shell);
  }

  // Collapsible Statistik dashboard, folded in at the bottom so it doesn't need
  // its own menu entry. Rendered lazily (and refreshed) only when expanded, so
  // opening the Lernpfad — the default landing tab — stays cheap.
  // Static stats dashboard at the bottom of the Lernpfad (used to be a
  // collapsible above the pensum; now always rendered, no toggle).
  function buildStatsSection() {
    var box = el('div', 'path-stats');
    var header = el('div', 'path-stats-header is-static');
    header.appendChild(el('span', 'path-section-title', 'Statistik'));
    var body = el('div', 'path-stats-body');
    if (window.Stats && window.Stats.renderInto) window.Stats.renderInto(body);
    box.appendChild(header);
    box.appendChild(body);
    return box;
  }

  function render() {
    if (!ensurePanel()) return;
    loadModel().then(function (model) {
      panel.innerHTML = '';
      var shell = el('div', 'review-shell');

      var header = el('div', 'review-header');
      header.appendChild(el('div', 'review-title', 'Lernpfad'));
      header.appendChild(el('div', 'review-subtitle', 'Dein nächster Schritt — dynamisch aus deinem Fortschritt berechnet.'));
      shell.appendChild(header);

      if (pathSaveFailed) shell.appendChild(buildSaveErrorBanner());

      var warning = buildBackupWarning(model);
      if (warning) shell.appendChild(warning);

      if (model.leveledUp) {
        shell.appendChild(buildLevelUp(model));
        if (window.app && window.app.playPop) window.app.playPop();
      }

      shell.appendChild(buildFocus(model));

      if (model.paceSuggestion) shell.appendChild(buildPaceNudge(model));

      shell.appendChild(buildNextUp(model));

      // Progress (incl. the slim lesson-reading strip) and target level share one
      // flush, equal-height row.
      var overview = el('div', 'path-overview');
      overview.appendChild(buildProgress(model));
      overview.appendChild(buildAdjust(model));
      shell.appendChild(overview);

      // Backup & maintenance live in their own full-width row BELOW the overview:
      // expanding a collapsed panel inside the equal-height grid would stretch the
      // Fortschritt box next to it, so they grow here without moving anything else.
      var settingsRow = el('div', 'path-settings-row');
      settingsRow.appendChild(buildBackupPanel(model));
      settingsRow.appendChild(buildMaintenancePanel(model));
      shell.appendChild(settingsRow);

      // Statistik closes the page as a static section (no longer collapsible).
      shell.appendChild(buildStatsSection());

      panel.appendChild(shell);
    }).catch(function () {
      panel.innerHTML = '';
      var shell = el('div', 'review-shell');
      shell.appendChild(el('div', 'review-title', 'Lernpfad'));
      shell.appendChild(el('div', 'review-subtitle', 'Lernpfad konnte nicht geladen werden.'));
      panel.appendChild(shell);
    });
  }

  // Dismissible pacing suggestion (see pacingSuggestion for the trigger logic).
  // Both buttons write a one-week snooze so the card stays quiet either way.
  function buildPaceNudge(model) {
    var s = model.paceSuggestion;
    var box = el('div', 'path-pace-nudge');
    box.appendChild(el('div', 'path-pace-nudge-head',
      s.action === 'lower' ? 'Gerade anspruchsvoll?' : 'Läuft rund!'));
    box.appendChild(el('div', 'path-pace-nudge-text',
      s.action === 'lower'
        ? 'Deine Trefferquote der letzten 7 Tage liegt unter ' + Math.round(PACE_LOWER_ACC * 100)
          + ' % oder viele Karten sind schwach. Weniger neue Karten pro Tag schaffen Luft zum Festigen.'
        : 'Über ' + Math.round(PACE_RAISE_ACC * 100)
          + ' % Trefferquote, kein Rückstand, Tagesziel erreicht — du könntest das Tempo erhöhen.'));

    function snooze() { model.path.paceSnoozeUntil = Date.now() + PACE_SNOOZE_MS; }

    var actions = el('div', 'review-actions');
    var applyBtn = el('button', 'quiz-btn quiz-btn-next',
      'Neue Karten/Tag auf ' + s.to + (s.action === 'lower' ? ' senken' : ' erhöhen'));
    applyBtn.addEventListener('click', function () {
      if (window.app) window.app.playPop();
      model.settings.dailyNewLimit = s.to;
      snooze();
      Promise.all([
        window.SRSStore.saveSettings(model.settings).catch(function () {}),
        savePathStateSafe(model.path)
      ]).then(render);
    });
    actions.appendChild(applyBtn);

    var laterBtn = el('button', 'srs-small-btn', 'Später');
    laterBtn.addEventListener('click', function () {
      if (window.app) window.app.playTick();
      snooze();
      savePathStateSafe(model.path).then(render);
    });
    actions.appendChild(laterBtn);
    box.appendChild(actions);
    return box;
  }

  // Banner shown after a pathState write failed (quota, evicted IndexedDB, …). The
  // change survived in memory for this session but was not persisted — make that
  // visible instead of letting the next reload silently lose it.
  function buildSaveErrorBanner() {
    var box = el('div', 'path-backup-warning is-error');
    box.appendChild(el('div', 'path-backup-warning-head', '⚠️ Fortschritt konnte nicht gespeichert werden'));
    box.appendChild(el('div', 'path-backup-warning-text',
      'Eine Änderung wurde nur im Arbeitsspeicher gehalten und ging beim letzten Speichern verloren. '
      + 'Prüfe den Speicherplatz des Browsers und exportiere zur Sicherheit eine Sicherung.'));
    return box;
  }

  // Prominent banner when there is progress worth protecting but it is not
  // safely backed up. IndexedDB can be wiped by "clear site data" (and is
  // auto-evicted on iOS/Safari), so a connected backup file is the only thing
  // that survives — nudge for it here instead of hiding it in settings.
  function buildBackupWarning(model) {
    var backup = model.backup || {};
    var hasProgress = !!(model.cards && model.cards.length);
    if (!hasProgress) return null;                          // nothing to lose yet
    if (backup.mode === 'file' && !backup.lastError) return null; // connected & healthy

    var box = el('div', 'path-backup-warning');
    var head = el('div', 'path-backup-warning-head');

    if (backup.mode === 'file' && backup.lastError) {
      box.className += ' is-error';
      head.textContent = '⚠️ Automatische Sicherung fehlgeschlagen';
      box.appendChild(head);
      box.appendChild(el('div', 'path-backup-warning-text',
        'Die letzte Sicherung schlug fehl (' + backup.lastError + '). Dein Fortschritt liegt nur im Browser — bitte erneut verbinden oder exportieren.'));
    } else if (backup.mode === 'manual') {
      head.textContent = '⚠️ Kein automatisches Backup möglich';
      box.appendChild(head);
      box.appendChild(el('div', 'path-backup-warning-text',
        'Dieser Browser unterstützt keine automatische Sicherungsdatei. Exportiere regelmäßig eine Sicherung — sonst geht dein Fortschritt beim Löschen der Websitedaten verloren.'));
    } else {
      head.textContent = '⚠️ Kein Backup verbunden';
      box.appendChild(head);
      box.appendChild(el('div', 'path-backup-warning-text',
        'Dein Fortschritt liegt nur im Browser und geht beim Löschen der Websitedaten (oder automatisch auf iOS/Safari) verloren. Verbinde eine Sicherungsdatei — danach wird automatisch gesichert.'));
    }

    var actions = el('div', 'path-backup-warning-actions');
    if (backup.mode !== 'manual' && window.SRSStore.canUseFileBackup && window.SRSStore.canUseFileBackup()) {
      var connectBtn = el('button', 'quiz-btn quiz-btn-next', 'Sicherung verbinden');
      connectBtn.addEventListener('click', function () {
        connectBtn.disabled = true;
        window.SRSStore.connectBackupFile().then(function () {
          if (window.app) window.app.playPop();
          render();
        }).catch(function (err) {
          connectBtn.disabled = false;
          head.textContent = '⚠️ ' + ((err && err.message) || 'Verbinden fehlgeschlagen');
        });
      });
      actions.appendChild(connectBtn);
    }
    var exportBtn = el('button', 'quiz-btn quiz-btn-reveal', 'Jetzt exportieren');
    exportBtn.addEventListener('click', function () {
      window.SRSStore.downloadBackup();
      if (window.app) window.app.playTick();
    });
    actions.appendChild(exportBtn);
    box.appendChild(actions);
    return box;
  }

  function buildLevelUp(model) {
    var box = el('div', 'path-levelup');
    box.appendChild(el('div', 'path-levelup-head', '🎉 Stufe ' + model.leveledUp + ' erreicht!'));
    box.appendChild(el('div', 'path-levelup-text',
      'Du hast genug der vorherigen Stufe gemeistert — neue Inhalte auf ' + model.leveledUp + ' sind jetzt freigeschaltet.'));
    return box;
  }

  function buildDoneCard(model) {
    var box = el('div', 'path-done');
    box.appendChild(el('div', 'path-done-head', '✓ Tagesziel erreicht'));
    var streak = currentStreak(model.path);
    box.appendChild(el('div', 'path-done-text', streak > 1
      ? 'Stark — ' + streak + ' Tage in Folge. Komm morgen wieder, um die Serie zu halten.'
      : 'Für heute ist alles erledigt. Morgen geht es weiter.'));
    return box;
  }

  function buildFocus(model) {
    var box = el('div', 'path-focus');
    box.appendChild(el('div', 'path-focus-label', 'Aktuelle Stufe'));
    box.appendChild(el('div', 'path-focus-level', model.progress.currentLevel));

    var streak = streakInfo(model.path);
    if (streak.count > 0) {
      var streakText;
      if (streak.shieldPending) {
        streakText = '🔥 ' + streak.count + (streak.count === 1 ? ' Tag' : ' Tage')
          + ' — 🛡 lerne heute, um die Serie zu retten';
      } else {
        streakText = '🔥 ' + streak.count + (streak.count === 1 ? ' Tag' : ' Tage') + ' in Folge'
          + (streak.securedToday ? ' · heute gesichert ✓' : ' — heute noch offen');
        if (streak.shields > 0) streakText += ' · 🛡×' + streak.shields;
      }
      box.appendChild(el('div', 'path-streak ' + (streak.securedToday ? 'is-secured' : 'is-open'), streakText));
    }

    var dueCount = model.due.length;
    // New cards introduced today = ready backlog + freshly started items, capped
    // by the daily card budget. This is what the session will actually contain,
    // so the label matches reality (no more "20 Einträge" turning into 61 cards).
    var newToday = Math.min(Math.max(0, model.budget), (model.newReady || []).length + model.picks.length);

    // Review status, folded in from the former Wiederholen home screen.
    // "Active" = cards actually in your rotation (computed in loadModel, shared
    // with the drills panel and the pacing nudge).
    var activeCards = model.activeCards || [];
    var weakCards = model.weakCards || [];

    var stats = el('div', 'review-stats');
    stats.appendChild(statCard('Fällig', dueCount));
    // Daily goal gauge: new cards introduced today vs. the daily target. Labelled
    // "Tagesziel" (not "Neu heute") so it doesn't clash with the button's
    // this-session new-card count.
    stats.appendChild(progressStatCard('Tagesziel', model.path.newDaily.count, model.settings.dailyNewLimit));
    stats.appendChild(statCard('Aktive Karten', activeCards.length));
    stats.appendChild(statCard('Schwach', weakCards.length));
    box.appendChild(stats);

    // 7-day review forecast (WaniKani/Bunpro-style dashboard strip). Guarded:
    // the audit VM doesn't load stats.js.
    if (window.Stats && window.Stats.forecast) {
      box.appendChild(buildForecastStrip(window.Stats.forecast(model.cards, Date.now(), 7)));
    }

    // Primary action stands alone: on a normal day "Heute lernen" is the whole
    // routine (new cards + due reviews + woven-in lessons), so it gets the focus
    // block to itself.
    var actions = el('div', 'review-actions');
    // In catch-up mode "Heute lernen — 0 neue Karten" reads like a bug; name the
    // session what it actually is.
    var learnLabel = model.suppressedNew
      ? 'Wiederholungen aufholen — ' + dueCount + ' Karten'
      : 'Heute lernen — ' + newToday + ' neue Karten · ' + dueCount + ' Wiederholungen';
    if (newToday + dueCount > 0) learnLabel += ' · ~' + estimateMinutes(newToday, dueCount) + ' Min';
    var learnBtn = el('button', 'quiz-btn quiz-btn-next', learnLabel);
    learnBtn.disabled = (newToday + dueCount) === 0;
    learnBtn.addEventListener('click', function () {
      if (window.app) window.app.playPop();
      startToday(model, learnBtn);
    });
    actions.appendChild(learnBtn);
    box.appendChild(actions);

    // Everything else is situational — reviews-only maintenance days and
    // off-schedule drills — so it's folded into a collapsed "Weitere Übungen"
    // panel instead of competing with the primary CTA. Only shown once there are
    // cards in rotation to practise.
    if (activeCards.length) {
      box.appendChild(buildMoreDrills(model, activeCards, weakCards, dueCount));
    }

    if (model.suppressedNew) {
      box.appendChild(buildCatchUp(model, dueCount));
    } else if (dueCount === 0 && newToday === 0 && model.path.newDaily.count > 0) {
      // Nothing left for today and work was done — celebrate instead of a flat line.
      box.appendChild(buildDoneCard(model));
    } else if (newToday === 0 && model.path.newDaily.count > 0) {
      box.appendChild(el('div', 'review-empty-hint',
        'Tagesziel für neue Karten erreicht (' + model.path.newDaily.count + '). Es bleiben noch Wiederholungen.'));
    }
    return box;
  }

  // Compact 7-day review forecast strip (data from Stats.forecast: bucket 0 =
  // today incl. overdue shown via the Fällig stat, 1 = tomorrow, …).
  function buildForecastStrip(fc) {
    var box = el('div', 'path-forecast');
    box.appendChild(el('div', 'path-forecast-title', 'Wiederholungen der nächsten 7 Tage'));
    var row = el('div', 'path-forecast-row');
    var buckets = (fc && fc.buckets) || [];
    var max = 1;
    buckets.forEach(function (n) { if (n > max) max = n; });
    var labels = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
    for (var i = 0; i < buckets.length; i++) {
      var d = new Date();
      d.setDate(d.getDate() + i);
      var col = el('div', 'path-forecast-col');
      col.appendChild(el('span', 'path-forecast-count', buckets[i] ? String(buckets[i]) : ''));
      var bar = el('div', 'path-forecast-bar');
      var fill = el('div', 'path-forecast-fill');
      fill.style.height = Math.max(buckets[i] ? 8 : 2, Math.round(buckets[i] / max * 100)) + '%';
      bar.appendChild(fill);
      col.appendChild(bar);
      col.appendChild(el('span', 'path-forecast-day', i === 0 ? 'Heute' : labels[d.getDay()]));
      row.appendChild(col);
    }
    box.appendChild(row);
    return box;
  }

  // Catch-up plan shown instead of the flat "viele Karten fällig" hint when a
  // review backlog has suppressed new content: the true backlog size, a floor
  // estimate of the recovery time, and a digestible chunk session so the full
  // daily wall isn't the only entry point.
  function buildCatchUp(model, dueCount) {
    var box = el('div', 'path-catchup');
    var plan = catchUpPlan(model.dueTotal, model.settings.dailyReviewLimit);
    box.appendChild(el('div', 'review-empty-hint',
      'Viele Karten fällig — insgesamt ' + model.dueTotal + '. Bei max. '
      + model.settings.dailyReviewLimit + ' Wiederholungen pro Tag bist du in mind. '
      + plan.days + (plan.days === 1 ? ' Tag' : ' Tagen')
      + ' aufgeholt, dann gibt es wieder neue Inhalte.'));
    // Only offer the bite-sized session when it's actually smaller than the
    // primary CTA — otherwise it would just duplicate it.
    if (plan.chunk > 0 && plan.chunk < dueCount) {
      var chunkBtn = el('button', 'quiz-btn quiz-btn-reveal', 'Aufholen: ' + plan.chunk + ' Karten');
      chunkBtn.addEventListener('click', function () {
        if (window.app) window.app.playPop();
        recordStudyStart(model.path);
        // model.due is already priority-sorted, so the first slice is the right one.
        window.SRSUI.startSession(model.due.slice(0, plan.chunk), true);
      });
      var actions = el('div', 'review-actions');
      actions.appendChild(chunkBtn);
      box.appendChild(actions);
    }
    return box;
  }

  // Collapsible panel of secondary study modes, folded in below the primary
  // "Heute lernen" CTA so they don't distract from it. Collapsed by default.
  function buildMoreDrills(model, activeCards, weakCards, dueCount) {
    var box = el('div', 'path-drills');
    var header = el('div', 'path-drills-header');
    header.innerHTML = '<span class="path-section-title">Weitere Übungen</span>' +
      '<svg class="toggle-icon collapsed" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>';
    var body = el('div', 'path-drills-body collapsed');
    header.addEventListener('click', function () {
      if (window.app && window.app.playTick) window.app.playTick();
      var icon = header.querySelector('.toggle-icon');
      body.classList.toggle('collapsed');
      if (icon) icon.classList.toggle('collapsed');
    });

    var inner = el('div', 'path-drills-inner');

    // Reviews only — the "maintenance day" option (skip new material).
    var reviewBtn = el('button', 'quiz-btn quiz-btn-reveal', 'Nur Wiederholen (' + dueCount + ')');
    reviewBtn.disabled = dueCount === 0;
    reviewBtn.addEventListener('click', function () {
      recordStudyStart(model.path);
      window.SRSUI.startSession(model.due, true);
    });
    inner.appendChild(reviewBtn);

    // Off-schedule drills run as CRAM: free practice that never moves SRS
    // schedules or logs events (like Bunpro's Cram / WaniKani's Extra Study).
    // Only "Nur Wiederholen" above grades for real, since those cards are due.
    var practiceBtn = el('button', 'quiz-btn quiz-btn-back', 'Alle aktiven Karten üben (' + activeCards.length + ')');
    practiceBtn.disabled = activeCards.length === 0;
    practiceBtn.addEventListener('click', function () {
      recordStudyStart(model.path);
      window.SRSUI.startSession(activeCards, true, { cram: true });
    });
    inner.appendChild(practiceBtn);
    inner.appendChild(el('div', 'path-drills-hint',
      'Freies Üben — verändert keine SRS-Termine. Falsche Karten kommen sofort wieder dran.'));

    // Focused drill over the weak cards (lapsed or relearning) — the items most at
    // risk of becoming leeches.
    if (weakCards.length) {
      var weakBtn = el('button', 'quiz-btn quiz-btn-back', 'Schwache Karten üben (' + weakCards.length + ')');
      weakBtn.addEventListener('click', function () {
        recordStudyStart(model.path);
        window.SRSUI.startSession(weakCards, true, { cram: true });
      });
      inner.appendChild(weakBtn);
    }

    body.appendChild(inner);
    box.appendChild(header);
    box.appendChild(body);
    return box;
  }

  function buildProgress(model) {
    var box = el('div', 'path-progress');
    box.appendChild(el('div', 'path-section-title', 'Fortschritt nach JLPT-Stufe'));

    var legend = el('div', 'path-legend');
    [['seg-mastered', 'Gemeistert'], ['seg-familiar', 'Vertraut'], ['seg-learning', 'Lernen']].forEach(function (pair) {
      var item = el('div', 'path-legend-item');
      item.appendChild(el('span', 'path-legend-dot ' + pair[0]));
      item.appendChild(el('span', null, pair[1]));
      legend.appendChild(item);
    });
    box.appendChild(legend);

    model.progress.levels.forEach(function (lv) {
      var row = el('div', 'path-level-row');
      var head = el('div', 'path-level-head');
      head.appendChild(el('span', 'path-level-badge ' + lv.level, lv.level));
      // Count items that are at least in progress (matches the filled bar), so the
      // number moves the moment you start learning — even before an item's
      // staggered sibling cards are all introduced and it counts as "familiar".
      var started = lv.mastered + lv.familiar + lv.learning;
      head.appendChild(el('span', 'path-level-count', started + ' / ' + lv.total));
      row.appendChild(head);

      var bar = el('div', 'path-bar');
      function seg(cls, n) {
        if (!lv.total || !n) return;
        var s = el('div', 'path-bar-seg ' + cls);
        s.style.width = (n / lv.total * 100) + '%';
        bar.appendChild(s);
      }
      seg('seg-mastered', lv.mastered);
      seg('seg-familiar', lv.familiar);
      seg('seg-learning', lv.learning);
      row.appendChild(bar);
      box.appendChild(row);
    });

    box.appendChild(buildLessonStrip(model));
    return box;
  }

  // Compact lesson-reading progress, folded into the Fortschritt card. The full
  // lesson list used to live in its own "Grammatiklektionen" box, but the lessons
  // are now pushed contextually (the 💡 hint on each grammar item in the daily
  // pensum), so all that remains worth surfacing here is the reading progress for
  // the current level plus a link into the full Lektionen view.
  function buildLessonStrip(model) {
    var strip = el('div', 'path-lesson-strip');
    var head = el('div', 'path-lesson-strip-head');
    head.appendChild(el('span', 'path-section-title', 'Grammatiklektionen'));
    var link = el('button', 'path-lessons-more-link', 'Alle ansehen');
    link.addEventListener('click', openAllLessons);
    head.appendChild(link);
    strip.appendChild(head);

    var body = el('div', 'path-lesson-strip-body');
    strip.appendChild(body);

    if (!window.app || !window.app.ensureGrammarLessonsLoaded) {
      body.appendChild(el('div', 'review-empty-hint', 'Lektionen nicht verfügbar.'));
      return strip;
    }
    body.appendChild(el('div', 'review-empty-hint', 'Lektionen werden geladen…'));
    window.app.ensureGrammarLessonsLoaded().then(function () {
      populateLessonStrip(body, model);
    }).catch(function () {
      body.innerHTML = '';
      body.appendChild(el('div', 'review-empty-hint', 'Lektionen konnten nicht geladen werden.'));
    });
    return strip;
  }

  function populateLessonStrip(body, model) {
    body.innerHTML = '';
    if (!window.GrammarLessons || !window.GrammarLessons.getLessons) {
      body.appendChild(el('div', 'review-empty-hint', 'Lektionen nicht verfügbar.'));
      return;
    }
    var level = model.progress.currentLevel;
    var read = model.path.readLessons || [];
    var lessons = window.GrammarLessons.getLessons().filter(function (l) {
      return lessonMatchesLevel(l, level);
    });
    if (!lessons.length) {
      body.appendChild(el('div', 'review-empty-hint', 'Keine Lektionen für ' + level + '.'));
      return;
    }
    var readCount = lessons.filter(function (l) { return read.indexOf(l.id) !== -1; }).length;

    // Same row style as the JLPT progress bars so lesson reading reads as a
    // first-class metric, not a side count.
    var row = el('div', 'path-level-row');
    var head = el('div', 'path-level-head');
    head.appendChild(el('span', 'path-level-badge ' + level, level));
    head.appendChild(el('span', 'path-level-count', readCount + ' / ' + lessons.length + ' gelesen'));
    row.appendChild(head);

    var bar = el('div', 'path-bar');
    if (lessons.length && readCount) {
      var seg = el('div', 'path-bar-seg seg-mastered');
      seg.style.width = (readCount / lessons.length * 100) + '%';
      bar.appendChild(seg);
    }
    row.appendChild(bar);
    body.appendChild(row);
  }

  var TYPE_LABEL = { kanji: 'Kanji', vocab: 'Vokabel', grammar: 'Grammatik' };

  // One card in the "Tägliches Lernpensum" grid. opts.lockedNote (string) renders a
  // greyed-out, non-skippable preview that explains why the item is still waiting;
  // opts.blocking (array of kanji chars) additionally renders the blocking kanji as
  // clickable chips so the learner can jump straight to what unlocks the word.
  function nextItemCard(p, model, opts) {
    opts = opts || {};
    var it = p.item;
    var locked = !!(opts.lockedNote || (opts.blocking && opts.blocking.length));
    var card = el('div', 'path-next-item' + (locked ? ' is-locked' : ''));

    var open = el('button', 'path-next-open');
    open.appendChild(el('span', 'path-chip path-chip-' + p.section, TYPE_LABEL[p.section] || p.section));
    var main = p.section === 'kanji' ? it.kanji : (it.word || it.pattern || '');
    open.appendChild(el('span', 'path-next-main' + (isJp(main) ? ' jp' : ''), main));
    var sub = p.section === 'kanji' ? (it.meanings || []).join(', ') : (it.meaning || '');
    if (sub) open.appendChild(el('span', 'path-next-sub', sub));
    if (opts.lockedNote) open.appendChild(el('span', 'path-next-wait', opts.lockedNote));
    open.addEventListener('click', function () { openItemDetail(p.section, it); });
    card.appendChild(open);

    // Blocking kanji as chips (a button can't nest inside the open <button>, so
    // they live as their own row — same placement as the lesson hint).
    if (opts.blocking && opts.blocking.length) {
      var blockRow = el('div', 'path-next-blockers');
      blockRow.appendChild(el('span', 'path-next-wait', 'Wartet auf Kanji:'));
      opts.blocking.forEach(function (ch) {
        var k = model.kanjiIndex && model.kanjiIndex[ch];
        if (!k) { blockRow.appendChild(el('span', 'path-next-main jp', ch)); return; }
        var chip = el('button', 'path-blocker-chip jp', ch);
        chip.title = 'Kanji ' + ch + ' ansehen';
        chip.addEventListener('click', function (e) {
          e.stopPropagation();
          openItemDetail('kanji', k);
        });
        blockRow.appendChild(chip);
      });
      card.appendChild(blockRow);
    }

    if (!locked) {
      // opts.noSkip: an already-started item (a ready backlog card) — no "kenne ich
      // schon" affordance, since a card for it already exists in the SRS rotation.
      if (!opts.noSkip) {
        var known = el('button', 'path-next-known', '✓');
        known.title = 'Kenne ich schon';
        known.setAttribute('aria-label', 'Kenne ich schon');
        known.addEventListener('click', function (e) {
          e.stopPropagation();
          skipOne(model, p.section, it);
        });
        card.appendChild(known);
      }

      // For a grammar item with an explaining lesson the learner hasn't read yet,
      // offer a non-blocking nudge to read it first (a button can't nest inside the
      // open <button>, so it lives as its own row at the bottom of the card).
      if (p.section === 'grammar') {
        var lesson = lessonForGrammar(it);
        if (lesson && (model.path.readLessons || []).indexOf(lesson.id) === -1) {
          var hint = el('button', 'path-next-lesson-hint', '💡 Lektion: ' + lesson.title);
          hint.title = 'Erklärende Lektion lesen';
          hint.addEventListener('click', function (e) {
            e.stopPropagation();
            openLessonFromPath(lesson.id, model);
          });
          card.appendChild(hint);
        }
      }
    }
    return card;
  }

  function buildNextUp(model) {
    var box = el('div', 'path-next');
    box.appendChild(el('div', 'path-section-title', 'Tägliches Lernpensum'));

    var waiting = model.waiting || [];
    var ready = model.readyItems || [];

    if (!ready.length && !model.picks.length && !waiting.length) {
      box.appendChild(el('div', 'review-empty-hint',
        model.suppressedNew ? 'Neue Inhalte pausiert, bis die Wiederholungen aufgeholt sind.'
          : 'Aktuell keine neuen Inhalte vorgeschlagen.'));
      return box;
    }

    // Items already queued for today (ready backlog) come first — they are learned
    // before brand-new items — followed by the brand-new suggestions. Without this
    // the pensum collapses to the few brand-new picks while a large ready backlog
    // (staggered sibling cards that came due) stays hidden.
    if (ready.length) {
      var rlist = el('div', 'path-next-list');
      ready.forEach(function (p) { rlist.appendChild(nextItemCard(p, model, { noSkip: true })); });
      box.appendChild(rlist);
    }

    if (model.picks.length) {
      if (ready.length) box.appendChild(el('div', 'path-next-subtitle', 'Neu vorgeschlagen'));
      var list = el('div', 'path-next-list');
      model.picks.forEach(function (p) { list.appendChild(nextItemCard(p, model)); });
      box.appendChild(list);

      var skip = el('button', 'srs-small-btn', 'Alle als bekannt');
      skip.addEventListener('click', function () { skipPicks(model); });
      box.appendChild(skip);
    }

    // "Bald verfügbar" — vocab whose kanji you still need to learn first.
    if (waiting.length) {
      box.appendChild(el('div', 'path-next-subtitle', 'Bald verfügbar'));

      // Which kanji unlock the most waiting words — the actionable answer to
      // "what should I learn to get at these?", computed over the FULL queue.
      var blockers = model.topBlockers || [];
      if (blockers.length) {
        var topRow = el('div', 'path-next-top-blockers');
        topRow.appendChild(el('span', 'path-next-wait', 'Schaltet am meisten frei:'));
        blockers.forEach(function (b) {
          var chip = el('button', 'path-blocker-chip jp',
            b.char + ' (' + b.count + (b.count === 1 ? ' Wort' : ' Wörter') + ')');
          chip.title = 'Kanji ' + b.char + ' ansehen';
          chip.addEventListener('click', function () {
            if (b.item) openItemDetail('kanji', b.item);
          });
          topRow.appendChild(chip);
        });
        box.appendChild(topRow);
      }

      var wlist = el('div', 'path-next-list');
      waiting.forEach(function (w) {
        var hasBlocking = !!(w.blocking && w.blocking.length);
        wlist.appendChild(nextItemCard({ section: w.section, item: w.item }, model, {
          blocking: hasBlocking ? w.blocking : null,
          lockedNote: hasBlocking ? null : 'Wartet auf Voraussetzungen'
        }));
      });
      box.appendChild(wlist);

      if ((model.waitTotal || 0) > waiting.length) {
        box.appendChild(el('div', 'path-next-more',
          '+' + (model.waitTotal - waiting.length) + ' weitere warten auf Kanji'));
      }
    }
    return box;
  }

  function lessonMatchesLevel(lesson, level) {
    return String(lesson.level || '').split('/').indexOf(level) !== -1;
  }

  // Index of grammar-item -> teaching lesson, built from each lesson's optional
  // `grammarIds` (grammar item ids) and `patterns` (exact pattern strings). Memoized
  // and rebuilt only when getLessons() returns a different array, so the per-render
  // grammar-card lookup is cheap.
  var _lessonGrammarIndex = null;
  var _lessonGrammarSource = null;
  function lessonGrammarIndex() {
    if (!window.GrammarLessons || !window.GrammarLessons.getLessons) return null;
    var lessons = window.GrammarLessons.getLessons();
    if (_lessonGrammarIndex && _lessonGrammarSource === lessons) return _lessonGrammarIndex;
    var byId = {}, byPattern = {};
    (lessons || []).forEach(function (l) {
      (l.grammarIds || []).forEach(function (gid) { if (!byId[gid]) byId[gid] = l; });
      (l.patterns || []).forEach(function (pt) { if (!byPattern[pt]) byPattern[pt] = l; });
    });
    _lessonGrammarSource = lessons;
    _lessonGrammarIndex = { byId: byId, byPattern: byPattern };
    return _lessonGrammarIndex;
  }

  // The grammar lesson (if any) that teaches a given grammar item — matched by
  // explicit grammar id first, then exact pattern. Returns null when nothing links,
  // so the path stays silent rather than guessing a wrong lesson.
  function lessonForGrammar(item) {
    if (!item) return null;
    var idx = lessonGrammarIndex();
    if (!idx) return null;
    return (item.id && idx.byId[item.id]) || (item.pattern && idx.byPattern[item.pattern]) || null;
  }

  function lessonStepObj(lesson, precedesKey) {
    return {
      kind: 'lesson',
      lessonId: lesson.id,
      title: lesson.title,
      subtitle: lesson.subtitle || '',
      level: lesson.level || '',
      precedesItemKey: precedesKey || null,
      itemKey: 'lesson:' + lesson.id
    };
  }

  function introStepObj(section, item, precedesKey) {
    return {
      kind: 'intro',
      section: section,
      item: item,
      level: levelOf(section, item) || '',
      precedesItemKey: precedesKey,
      itemKey: 'intro:' + precedesKey
    };
  }

  // Teach-before-test for vocab and kanji: a presentation step woven in directly
  // before the first question of an item the learner has NEVER reviewed. The
  // grammar counterpart is the lesson step; vocab/kanji get a compact intro card
  // instead (word/kanji, readings, meaning, example). An item counts as unseen
  // when none of its cards has ever been reviewed — so a staggered sibling on a
  // later day gets no second intro, but a never-reviewed primary (aborted
  // session) does. Pure (no I/O) so it's unit-testable.
  function introStepsForSession(model, session) {
    var reviewedItems = {};
    ((model && model.cards) || []).forEach(function (c) {
      if (c && c.itemKey && ((c.reps || 0) > 0 || c.lastReviewedAt)) reviewedItems[c.itemKey] = true;
    });
    var idx = null;
    var seen = {};
    var steps = [];
    (session || []).forEach(function (c) {
      if (!c || c.kind || c.state !== 'New') return;
      if (c.section !== 'vocab' && c.section !== 'kanji') return;
      if (!c.itemKey || seen[c.itemKey] || reviewedItems[c.itemKey]) return;
      seen[c.itemKey] = true;
      if (!idx) idx = buildItemIndex();
      var hit = idx[c.itemKey];
      if (!hit) return; // item no longer in the dataset -> nothing to present
      steps.push(introStepObj(hit.section, hit.item, c.itemKey));
    });
    return steps;
  }

  // Unread lessons for a level in didactic (number) order, skipping any already
  // chosen this session. Used as the fallback when a new grammar pattern has no
  // explicit lesson link (most levels above N5 link no patterns yet).
  function unreadLevelLessons(level, read, seen) {
    if (!window.GrammarLessons || !window.GrammarLessons.getLessons) return [];
    return (window.GrammarLessons.getLessons() || []).filter(function (l) {
      return lessonMatchesLevel(l, level) && read.indexOf(l.id) === -1 && !seen[l.id];
    }).sort(function (a, b) { return (a.number || 0) - (b.number || 0); });
  }

  // Lesson-first steps for a freshly assembled session. Every new grammar pattern in
  // the session is taught right before its OWN question (just-in-time), never at the
  // session start — each lesson step carries the grammar card it precedes. The lesson
  // is the one explicitly linked to the pattern, or — where no link exists (most
  // levels above N5) — the next unread lesson for the current level. Capped at
  // MAX_NEW_GRAMMAR_LESSONS, deduped. Pure (no I/O) so it's unit-testable.
  function lessonStepsForSession(model, session) {
    var inSession = {};
    (session || []).forEach(function (c) {
      if (c && c.section === 'grammar' && c.itemKey) inSession[c.itemKey] = true;
    });
    // New grammar patterns actually present in this session, in pick order.
    var newGrammar = ((model.picks) || []).filter(function (p) {
      return p.section === 'grammar' && inSession[itemKeyOf('grammar', p.item)];
    });
    if (!newGrammar.length) return [];
    var maxLessons = Math.min(newGrammar.length, MAX_NEW_GRAMMAR_LESSONS);

    var read = (model.path && model.path.readLessons) || [];
    var level = model.progress && model.progress.currentLevel;
    var used = {};
    var fill = null;
    var steps = [];

    // Assign one lesson per new grammar pattern, always placed before that pattern's
    // own card. Prefer the pattern's linked lesson; otherwise fall back to the next
    // unread level lesson — but still glued to a grammar question, not front-loaded.
    for (var i = 0; i < newGrammar.length && steps.length < maxLessons; i++) {
      var key = itemKeyOf('grammar', newGrammar[i].item);
      var lesson = lessonForGrammar(newGrammar[i].item);
      if (lesson && (read.indexOf(lesson.id) !== -1 || used[lesson.id])) lesson = null;
      if (!lesson && level) {
        if (!fill) fill = unreadLevelLessons(level, read, used);
        while (fill.length && used[fill[0].id]) fill.shift();
        lesson = fill.length ? fill.shift() : null;
      }
      if (!lesson) continue;
      used[lesson.id] = true;
      steps.push(lessonStepObj(lesson, key));
    }
    return steps;
  }

  function ensureLessonsLoaded() {
    if (window.app && window.app.ensureGrammarLessonsLoaded) {
      return window.app.ensureGrammarLessonsLoaded().catch(function () {});
    }
    return Promise.resolve();
  }

  // Reading a lesson is genuine study: keep the daily streak alive and log a
  // lightweight activity event. The event carries no `grade`, so it counts in
  // the activity heatmap but is excluded from the accuracy stats.
  function recordLessonActivity(path, id) {
    markStudyDay(path);
    if (window.SRSStore && window.SRSStore.addEvent) {
      window.SRSStore.addEvent({
        eventId: 'lesson-' + Date.now() + '-' + Math.random().toString(36).slice(2),
        type: 'lesson',
        lessonId: id,
        reviewedAt: Date.now()
      }).catch(function (err) {
        if (window.console && console.warn) {
          console.warn('Lernpfad: Lektionsereignis konnte nicht gespeichert werden.', err);
        }
      });
    }
  }

  function markLessonRead(model, id) {
    if (model.path.readLessons.indexOf(id) === -1) {
      model.path.readLessons.push(id);
      recordLessonActivity(model.path, id);
      savePathStateSafe(model.path);
    }
  }

  function openLessonFromPath(id, model) {
    markLessonRead(model, id);
    if (window.app) window.app.switchTab('grammar');
    if (window.app && window.app.ensureGrammarLessonsLoaded) {
      window.app.ensureGrammarLessonsLoaded().then(function () {
        if (window.GrammarLessons) window.GrammarLessons.openLesson(id);
      }).catch(function () {});
    }
  }

  function openAllLessons() {
    if (window.app) window.app.switchTab('grammar');
    if (window.app && window.app.ensureGrammarLessonsLoaded) {
      window.app.ensureGrammarLessonsLoaded().then(function () {
        if (window.GrammarLessons && window.GrammarLessons.openLessonsView) window.GrammarLessons.openLessonsView();
      }).catch(function () {});
    }
  }

  var NEW_PER_DAY_OPTIONS = [5, 10, 15, 20, 30, 40, 50];
  var REVIEWS_PER_DAY_OPTIONS = [50, 100, 120, 150, 200, 300, 9999];

  function makeSelectRow(labelText, id, options, currentValue, formatOption, onChange) {
    var row = el('div', 'path-adjust-row');
    var label = el('label', 'path-adjust-label', labelText);
    label.setAttribute('for', id);
    row.appendChild(label);
    var select = el('select', 'path-target-select');
    select.id = id;
    options.forEach(function (val) {
      var opt = el('option', null, formatOption ? formatOption(val) : String(val));
      opt.value = String(val);
      if (String(val) === String(currentValue)) opt.selected = true;
      select.appendChild(opt);
    });
    select.addEventListener('change', function () { onChange(select.value); });
    row.appendChild(select);
    return row;
  }

  // Shared collapsed-by-default panel (same look as "Weitere Übungen" /
  // "Übersprungen"). Returns { box, inner } — append rows to inner.
  function collapsiblePanel(title) {
    var box = el('div', 'path-drills');
    var header = el('div', 'path-drills-header');
    var titleSpan = el('span', 'path-section-title', title);
    header.appendChild(titleSpan);
    header.insertAdjacentHTML('beforeend',
      '<svg class="toggle-icon collapsed" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>');
    var body = el('div', 'path-drills-body collapsed');
    header.addEventListener('click', function () {
      if (window.app && window.app.playTick) window.app.playTick();
      var icon = header.querySelector('.toggle-icon');
      body.classList.toggle('collapsed');
      if (icon) icon.classList.toggle('collapsed');
    });
    var inner = el('div', 'path-drills-inner');
    body.appendChild(inner);
    box.appendChild(header);
    box.appendChild(body);
    return { box: box, inner: inner };
  }

  function formatBackupLabel(b) {
    if (b.lastError) return b.label + ' — Sicherung fehlgeschlagen: ' + b.lastError;
    if (b.lastBackupAt) return b.label + ' — letzte Sicherung: ' + new Date(b.lastBackupAt).toLocaleString();
    return b.label;
  }

  // Backup controls, folded into "So lerne ich" (migrated from the former
  // standalone "Sicherung & Einstellungen" screen on the nav-less review tab).
  function buildBackupPanel(model) {
    var panel = collapsiblePanel('Sicherung');
    var inner = panel.inner;

    // Why backups matter here: there is no server — everything lives in this
    // browser's storage, which can be wiped (or auto-evicted on iOS).
    inner.appendChild(el('div', 'path-drills-hint',
      'Dein Fortschritt liegt nur in diesem Browser — er kann durch das Löschen der '
      + 'Browserdaten oder (auf iOS) automatisch verloren gehen. Exportiere darum regelmäßig '
      + 'eine Sicherung oder verbinde eine automatische Sicherungsdatei (Chromium-Browser wie '
      + 'Chrome oder Edge, nur Desktop). '
      + 'Mit „Importieren" stellst du eine Sicherung wieder her oder ziehst auf ein neues Gerät um.'));

    var status = el('div', 'path-settings-status', 'Sicherungsstatus wird geprüft...');
    inner.appendChild(status);

    var connect = el('button', 'quiz-btn quiz-btn-next', 'Automatische Sicherungsdatei verbinden');
    connect.addEventListener('click', function () {
      status.textContent = 'Verbindung wird hergestellt...';
      window.SRSStore.connectBackupFile().then(function () {
        status.textContent = 'Automatische Sicherungsdatei verbunden und gespeichert.';
      }).catch(function (err) {
        // Cancelling the file picker is not an error — quietly restore the status.
        if (err && err.name === 'AbortError') {
          window.SRSStore.getBackupStatus().then(function (b) {
            status.textContent = formatBackupLabel(b);
          }).catch(function () { status.textContent = ''; });
          return;
        }
        status.textContent = (err && err.message) || 'Automatische Sicherung konnte nicht verbunden werden.';
      });
    });
    inner.appendChild(connect);

    var exportBtn = el('button', 'quiz-btn quiz-btn-reveal', 'Sicherung jetzt exportieren');
    exportBtn.addEventListener('click', function () { window.SRSStore.downloadBackup(); });
    inner.appendChild(exportBtn);

    var importLabel = el('label', 'quiz-btn quiz-btn-back', 'Sicherung importieren');
    var importInput = document.createElement('input');
    importInput.type = 'file';
    importInput.accept = 'application/json,.json';
    importInput.className = 'hidden';
    importInput.addEventListener('change', function () {
      var file = importInput.files && importInput.files[0];
      if (!file) return;
      status.textContent = 'Import wird ausgeführt...';
      window.SRSStore.readBackupFile(file).then(function (data) {
        return window.SRSStore.importData(data, 'merge');
      }).then(function () {
        if (window.SRSUI && window.SRSUI.updateReviewBadge) window.SRSUI.updateReviewBadge();
        render();
      }).catch(function (err) {
        status.textContent = (err && err.message) || 'Import fehlgeschlagen.';
      });
    });
    importLabel.appendChild(importInput);
    inner.appendChild(importLabel);

    window.SRSStore.getBackupStatus().then(function (backup) {
      status.textContent = formatBackupLabel(backup);
      connect.disabled = backup.mode === 'manual';
    }).catch(function () { status.textContent = 'Sicherungsstatus nicht verfügbar.'; });

    return panel.box;
  }

  // Maintenance & advanced controls, folded into "So lerne ich": leech
  // auto-suspend, the progress diagnostics, and the full-reset danger zone.
  function buildMaintenancePanel(model) {
    var panel = collapsiblePanel('Wartung');
    var inner = panel.inner;

    // Leech auto-suspend (advanced review behavior).
    var leechRow = el('div', 'path-adjust-row');
    var leechLabel = el('label', 'path-adjust-label', 'Hartnäckige Karten automatisch aussetzen');
    leechLabel.setAttribute('for', 'path-leech-toggle');
    var leechToggle = document.createElement('input');
    leechToggle.type = 'checkbox';
    leechToggle.id = 'path-leech-toggle';
    leechToggle.checked = !!model.settings.autoSuspendLeeches;
    leechToggle.addEventListener('change', function () {
      model.settings.autoSuspendLeeches = leechToggle.checked;
      window.SRSStore.saveSettings(model.settings).catch(function () {});
    });
    leechRow.appendChild(leechLabel);
    leechRow.appendChild(leechToggle);
    inner.appendChild(leechRow);

    // Diagnostics: orphaned-card check + prune.
    var diagStatus = el('div', 'path-settings-status', '');
    var diagBtn = el('button', 'quiz-btn quiz-btn-reveal', 'Fortschritt prüfen');
    var pruneBtn = el('button', 'quiz-btn quiz-btn-back hidden', 'Verwaiste Karten entfernen');
    diagBtn.addEventListener('click', function () {
      diagBtn.disabled = true;
      diagStatus.textContent = 'Prüfe...';
      runDiagnostics().then(function (d) {
        diagBtn.disabled = false;
        diagStatus.textContent = 'Aktive Karten: ' + d.active + ' · Ausgesetzt: ' + d.suspended +
          ' · Gemeistert: ' + d.mastered + ' · Verwaist: ' + d.orphaned;
        if (d.orphaned > 0) {
          pruneBtn.classList.remove('hidden');
          pruneBtn.textContent = 'Verwaiste Karten entfernen (' + d.orphaned + ')';
        } else {
          pruneBtn.classList.add('hidden');
        }
      }).catch(function () {
        diagBtn.disabled = false;
        diagStatus.textContent = 'Diagnose fehlgeschlagen.';
      });
    });
    pruneBtn.addEventListener('click', function () {
      pruneBtn.disabled = true;
      pruneOrphans().then(function (n) {
        if (window.SRSUI && window.SRSUI.updateReviewBadge) window.SRSUI.updateReviewBadge();
        diagStatus.textContent = n + ' verwaiste Karten entfernt.';
        pruneBtn.disabled = false;
        pruneBtn.classList.add('hidden');
      }).catch(function () {
        pruneBtn.disabled = false;
        diagStatus.textContent = 'Entfernen fehlgeschlagen.';
      });
    });
    inner.appendChild(diagBtn);
    inner.appendChild(pruneBtn);
    inner.appendChild(diagStatus);

    // Danger zone: full reset.
    inner.appendChild(el('div', 'path-settings-status path-danger-hint',
      'Tipp: Exportiere zuerst eine Sicherung. Das Zurücksetzen löscht deinen gesamten Lernfortschritt unwiderruflich.'));
    var resetBtn = el('button', 'quiz-btn quiz-btn-danger', 'Gesamten Fortschritt zurücksetzen');
    var resetStatus = el('div', 'path-settings-status');
    resetBtn.addEventListener('click', function () {
      if (!window.confirm('Gesamten Lernfortschritt zurücksetzen?\n\nAlle Wiederholungs-Karten, der Verlauf und der Lernpfad-Status (Tageszähler, gelesene Lektionen, übersprungene Einträge) werden gelöscht. Lesezeichen und Einstellungen bleiben erhalten.\n\nDies kann nicht rückgängig gemacht werden.')) {
        return;
      }
      resetBtn.disabled = true;
      resetStatus.textContent = 'Fortschritt wird zurückgesetzt...';
      window.SRSStore.resetProgress()
        .then(function () { return window.SRSStore.getBackupStatus(); })
        .then(function (backup) {
          // Flush the wipe to the connected backup file so it can't silently restore.
          if (backup.mode === 'file') return window.SRSStore.writeBackupNow().catch(function () {});
        })
        .then(function () {
          if (window.SRSUI && window.SRSUI.updateReviewBadge) window.SRSUI.updateReviewBadge();
          if (window.app) window.app.playPop();
          render(); // fresh, empty Lernpfad is the feedback
        })
        .catch(function (err) {
          resetBtn.disabled = false;
          resetStatus.textContent = (err && err.message) || 'Zurücksetzen fehlgeschlagen.';
        });
    });
    inner.appendChild(resetBtn);
    inner.appendChild(resetStatus);

    return panel.box;
  }

  function buildAdjust(model) {
    var box = el('div', 'path-adjust');
    box.appendChild(el('div', 'path-section-title', 'So lerne ich'));

    // Pace: how many new cards to introduce per day (the daily new-card budget).
    box.appendChild(makeSelectRow('Neue Karten pro Tag', 'path-new-per-day',
      NEW_PER_DAY_OPTIONS, model.settings.dailyNewLimit, null, function (value) {
        model.settings.dailyNewLimit = parseInt(value, 10) || 20;
        window.SRSStore.saveSettings(model.settings).then(render).catch(render);
      }));

    // Pace: cap on reviews per day; above it, new cards pause until you catch up.
    box.appendChild(makeSelectRow('Wiederholungen pro Tag (max.)', 'path-reviews-per-day',
      REVIEWS_PER_DAY_OPTIONS, model.settings.dailyReviewLimit,
      function (v) { return v >= 9999 ? 'Unbegrenzt' : String(v); },
      function (value) {
        model.settings.dailyReviewLimit = parseInt(value, 10) || 120;
        window.SRSStore.saveSettings(model.settings).then(render).catch(render);
      }));

    // How answers are checked in review sessions (loadQueue re-reads this on
    // every session start, so no further sync is needed).
    box.appendChild(makeSelectRow('Antwortmodus', 'path-answer-mode',
      ['reveal', 'type'], model.settings.answerMode || 'reveal',
      function (v) { return v === 'type' ? 'Tippen & prüfen' : 'Selbstkontrolle (aufdecken)'; },
      function (value) {
        model.settings.answerMode = value;
        window.SRSStore.saveSettings(model.settings).catch(function () {});
      }));

    // Starting level: treat everything below as already known and begin here.
    // Confirm first — it reclassifies every lower level as "vertraut" and visibly
    // shifts the progress bars, and there is no per-item undo for that sweep.
    box.appendChild(makeSelectRow('Startniveau', 'path-start-level',
      LEVELS, model.path.startLevel || 'N5', null, function (value) {
        var prev = model.path.startLevel || 'N5';
        if (value === prev) return;
        var raising = LEVELS.indexOf(value) > LEVELS.indexOf(prev);
        var msg = raising
          ? 'Startniveau auf ' + value + ' setzen?\n\nAlle Stufen unter ' + value
            + ' gelten dann als „vertraut“ und die Fortschrittsanzeige ändert sich entsprechend. '
            + 'Höhere Stufen folgen automatisch.'
          : 'Startniveau auf ' + value + ' senken?\n\nStufen ab ' + value
            + ' werden wieder als Lernstoff behandelt.';
        if (!window.confirm(msg)) { render(); return; } // re-render restores the saved value
        model.path.startLevel = value;
        // Reset the level-up baseline: the resulting currentLevel jump is a settings
        // effect, not learning, so the next render adopts it silently (no false banner).
        model.path.seenLevel = null;
        savePathStateSafe(model.path).then(render);
      }));
    box.appendChild(el('div', 'path-adjust-hint',
      'Stufen unter dem Startniveau gelten als bekannt — neue Inhalte starten ab hier. Höhere Stufen folgen automatisch.'));

    if ((model.path.skippedItems || []).length) {
      box.appendChild(buildSkippedPanel(model));
    }
    return box;
  }

  // Collapsible recovery list for "kenne ich schon" marks (same pattern as the
  // drills panel). Restoring an item removes it from skippedItems so it counts as
  // new again and re-enters the suggestions. Note: items below the Startniveau
  // stay "vertraut" via the start-level sweep even after restoring — expected.
  function buildSkippedPanel(model) {
    var entries = resolveSkippedItems(model.path);
    var box = el('div', 'path-drills path-skipped');
    var header = el('div', 'path-drills-header');
    header.innerHTML = '<span class="path-section-title">Übersprungen (' + entries.length + ')</span>' +
      '<svg class="toggle-icon collapsed" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>';
    var body = el('div', 'path-drills-body collapsed');
    header.addEventListener('click', function () {
      if (window.app && window.app.playTick) window.app.playTick();
      var icon = header.querySelector('.toggle-icon');
      body.classList.toggle('collapsed');
      if (icon) icon.classList.toggle('collapsed');
    });

    var inner = el('div', 'path-drills-inner');
    inner.appendChild(el('div', 'path-drills-hint',
      'Als „kenne ich schon" markierte Einträge. Sie zählen als vertraut — hier kannst du sie zurückholen.'));

    function unskip(key) {
      var i = model.path.skippedItems.indexOf(key);
      if (i !== -1) model.path.skippedItems.splice(i, 1);
      savePathStateSafe(model.path).then(render);
      if (window.app) window.app.playTick();
    }

    entries.forEach(function (entry) {
      var row = el('div', 'path-skipped-row' + (entry.item ? '' : ' is-stale'));
      if (entry.item) {
        var it = entry.item;
        var open = el('button', 'path-skipped-open');
        open.appendChild(el('span', 'path-chip path-chip-' + entry.section, TYPE_LABEL[entry.section] || entry.section));
        var main = entry.section === 'kanji' ? it.kanji : (it.word || it.pattern || '');
        open.appendChild(el('span', 'path-next-main' + (isJp(main) ? ' jp' : ''), main));
        var sub = entry.section === 'kanji' ? (it.meanings || []).join(', ') : (it.meaning || '');
        if (sub) open.appendChild(el('span', 'path-next-sub', sub));
        open.addEventListener('click', function () { openItemDetail(entry.section, it); });
        row.appendChild(open);
        var restore = el('button', 'srs-small-btn', 'Wieder lernen');
        restore.addEventListener('click', function () { unskip(entry.key); });
        row.appendChild(restore);
      } else {
        // No longer in the dataset — still removable for hygiene.
        row.appendChild(el('span', 'path-skipped-stale-key', entry.key + ' — nicht mehr im Datensatz'));
        var remove = el('button', 'srs-small-btn', 'Entfernen');
        remove.addEventListener('click', function () { unskip(entry.key); });
        row.appendChild(remove);
      }
      inner.appendChild(row);
    });

    body.appendChild(inner);
    box.appendChild(header);
    box.appendChild(body);
    return box;
  }

  // --- First-run onboarding (2C) ---
  var onboardingShown = false;

  // Show a one-time setup modal for brand-new users (no cards, no pathState):
  // pick a start level + daily pace and explain the learn -> review -> progress loop.
  function maybeShowOnboarding() {
    if (onboardingShown || !window.SRSStore) return Promise.resolve();
    return init().then(function () {
      return Promise.all([
        window.SRSStore.getAllCards().catch(function () { return []; }),
        window.SRSStore.getPathState().catch(function () { return null; })
      ]);
    }).then(function (parts) {
      var cards = parts[0] || [];
      if ((cards && cards.length) || parts[1]) return; // returning user -> skip
      onboardingShown = true;
      showOnboarding();
    }).catch(function () {});
  }

  function showOnboarding() {
    var overlay = el('div', 'onboarding-overlay');
    var box = el('div', 'onboarding-panel');
    box.appendChild(el('div', 'onboarding-title', 'Willkommen bei Nihongo Explorer'));
    box.appendChild(el('div', 'onboarding-text',
      'So funktioniert dein Lernpfad: Jeden Tag schlägt er dir neue Karten vor (Kanji, Vokabeln, '
      + 'Grammatik). Du lernst sie, wiederholst sie im optimalen Abstand (SRS) und verfolgst deinen '
      + 'Fortschritt. Du kannst alles jederzeit in „So lerne ich“ anpassen.'));

    var form = el('div', 'onboarding-form');
    var levelSel = el('select', 'path-target-select');
    LEVELS.forEach(function (lv) {
      var o = el('option', null, lv);
      o.value = lv;
      if (lv === 'N5') o.selected = true;
      levelSel.appendChild(o);
    });
    var levelRow = el('div', 'path-adjust-row');
    var levelLabel = el('label', 'path-adjust-label', 'Startniveau');
    levelRow.appendChild(levelLabel);
    levelRow.appendChild(levelSel);
    form.appendChild(levelRow);

    var paceSel = el('select', 'path-target-select');
    NEW_PER_DAY_OPTIONS.forEach(function (val) {
      var o = el('option', null, String(val));
      o.value = String(val);
      if (val === 20) o.selected = true;
      paceSel.appendChild(o);
    });
    var paceRow = el('div', 'path-adjust-row');
    paceRow.appendChild(el('label', 'path-adjust-label', 'Neue Karten pro Tag'));
    paceRow.appendChild(paceSel);
    form.appendChild(paceRow);
    box.appendChild(form);

    box.appendChild(el('div', 'path-adjust-hint',
      'Stufen unter dem Startniveau gelten als bekannt. Alles lässt sich später ändern.'));

    function finish() {
      var path = normalizePath(null);
      path.startLevel = levelSel.value;
      path.seenLevel = null; // baseline adopted silently on first render
      var pace = parseInt(paceSel.value, 10) || 20;
      var savePath = savePathStateSafe(path);
      var saveSettings = window.SRSStore.getSettings().then(function (s) {
        s.dailyNewLimit = pace;
        return window.SRSStore.saveSettings(s);
      });
      Promise.all([savePath, saveSettings]).then(function () {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        render();
      }).catch(function () {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        render();
      });
      if (window.app) window.app.playPop();
    }

    var actions = el('div', 'review-actions');
    var startBtn = el('button', 'quiz-btn quiz-btn-next', 'Lernpfad starten');
    startBtn.addEventListener('click', finish);
    actions.appendChild(startBtn);
    box.appendChild(actions);

    overlay.appendChild(box);
    document.body.appendChild(overlay);
    setTimeout(function () { startBtn.focus(); }, 0);
  }

  // True if the learner has any history -> the app should land on the Lernpfad.
  function shouldLandHere() {
    if (!window.SRSStore) return Promise.resolve(false);
    return Promise.all([window.SRSStore.getAllCards(), window.SRSStore.getPathState()])
      .then(function (parts) {
        return ((parts[0] && parts[0].length > 0) || !!parts[1]);
      })
      .catch(function () { return false; });
  }

  // --- Data-hygiene self-check ---
  var SRS_SECTIONS = ['vocab', 'kanji', 'grammar', 'counters', 'onomatopoeia'];

  function ensureAllSrsSections() {
    if (!window.app || !window.app.ensureSectionLoaded) return Promise.resolve();
    return Promise.all(SRS_SECTIONS.map(function (s) {
      return window.app.ensureSectionLoaded(s).catch(function () {});
    }));
  }

  // Set of all currently-valid itemKeys, only for sections that are actually loaded.
  function validItemKeySet() {
    var set = {};
    SRS_SECTIONS.forEach(function (s) {
      var sec = window.app && window.app.sections[s];
      if (!sec || !sec.allItems || !sec.allItems.length) return;
      sec.allItems.forEach(function (it) { set[itemKeyOf(s, it)] = true; });
    });
    return set;
  }

  function runDiagnostics() {
    return ensureAllSrsSections().then(function () {
      return window.SRSStore.getAllCards();
    }).then(function (cards) {
      var valid = validItemKeySet();
      var loaded = {};
      SRS_SECTIONS.forEach(function (s) {
        var sec = window.app && window.app.sections[s];
        loaded[s] = !!(sec && sec.allItems && sec.allItems.length);
      });
      var active = 0, suspended = 0, mastered = 0, orphanSet = {};
      (cards || []).forEach(function (c) {
        if (!c) return;
        if (c.suspended) suspended++; else active++;
        if (c.state === 'Mastered') mastered++;
        // Only flag as orphan if its section is loaded (so the universe is known).
        if (loaded[c.section] && !valid[c.itemKey]) orphanSet[c.itemKey] = true;
      });
      return {
        active: active, suspended: suspended, mastered: mastered,
        orphaned: Object.keys(orphanSet).length, orphanKeys: Object.keys(orphanSet)
      };
    });
  }

  function pruneOrphans() {
    return runDiagnostics().then(function (diag) {
      if (!diag.orphanKeys.length) return 0;
      return Promise.all(diag.orphanKeys.map(function (key) {
        return window.SRSStore.deleteCardsByItem(key);
      })).then(function () { return diag.orphanKeys.length; });
    });
  }

  window.LearningPath = {
    onTabActivate: onTabActivate,
    shouldLandHere: shouldLandHere,
    maybeShowOnboarding: maybeShowOnboarding,
    runDiagnostics: runDiagnostics,
    pruneOrphans: pruneOrphans,
    noteNewCardIntroduced: noteNewCardIntroduced,
    noteNewCardUndone: noteNewCardUndone,
    noteLessonReadById: noteLessonReadById,
    // exposed for audit/testing
    _engine: {
      LEVELS: LEVELS,
      normalizePath: normalizePath,
      mapFromCards: mapFromCards,
      computeProgress: computeProgress,
      frontierQueues: frontierQueues,
      pickNewItems: pickNewItems,
      newBudget: newBudget,
      assembleSession: assembleSession,
      readyToLearn: readyToLearn,
      vocabUnlocked: vocabUnlocked,
      blockingKanji: blockingKanji,
      interleave: interleave,
      itemKeyOf: itemKeyOf,
      itemStatus: itemStatus,
      lessonMatchesLevel: lessonMatchesLevel,
      lessonForGrammar: lessonForGrammar,
      lessonStepsForSession: lessonStepsForSession,
      introStepsForSession: introStepsForSession,
      dayBefore: dayBefore,
      currentStreak: currentStreak,
      streakInfo: streakInfo,
      markStudyDay: markStudyDay,
      decideLevelUp: decideLevelUp,
      catchUpPlan: catchUpPlan,
      burySiblings: burySiblings,
      pacingSuggestion: pacingSuggestion,
      resolveSkippedItems: resolveSkippedItems,
      topBlockingKanji: topBlockingKanji
    }
  };
})();
