// ============================================================
// SRS Scheduler for Nihongo Explorer
// ============================================================
(function () {
  'use strict';

  var root = typeof window !== 'undefined' ? window : globalThis;
  var DAY_MS = 24 * 60 * 60 * 1000;
  var MINUTE_MS = 60 * 1000;
  var DEFAULT_EASE = 2.4;
  var MIN_EASE = 1.3;
  var MASTERED_INTERVAL_DAYS = 180;
  var MATURE_INTERVAL_DAYS = 30;
  var LEECH_LAPSES = 8;
  // An item only counts as "familiar" (toward level-up) once each of its cards has
  // survived at least one real review — i.e. been answered correctly twice, not
  // just introduced once. A Review card with fewer reps is still "young".
  var FAMILIAR_MIN_REPS = 2;

  function nowIso(now) {
    return new Date(now || Date.now()).toISOString();
  }

  function addMs(now, ms) {
    return new Date((now || Date.now()) + ms).toISOString();
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function getDefaultSettings() {
    return {
      dailyNewLimit: 20,
      dailyReviewLimit: 120,
      answerMode: 'reveal', // 'reveal' = self-grade; 'type' = typed answer with checking
      autoSuspendLeeches: false // auto-suspend cards that lapse >= LEECH_LAPSES times
    };
  }

  function createCard(spec, now) {
    var timestamp = nowIso(now);
    return {
      cardKey: spec.cardKey,
      itemKey: spec.itemKey,
      section: spec.section,
      promptType: spec.promptType,
      label: spec.label,
      level: spec.level || '',
      itemLabel: spec.itemLabel || '',
      question: spec.question,
      state: 'New',
      ease: DEFAULT_EASE,
      intervalDays: 0,
      reps: 0,
      lapses: 0,
      dueAt: timestamp,
      suspended: false,
      orphaned: false,
      createdAt: timestamp,
      updatedAt: timestamp,
      lastReviewedAt: null
    };
  }

  // rng is injectable so tests can pin the interval fuzz (rng of 0.5 = no offset).
  function applyGrade(card, grade, now, rng) {
    var next = {};
    for (var key in card) {
      if (Object.prototype.hasOwnProperty.call(card, key)) next[key] = card[key];
    }

    var timestamp = nowIso(now);
    var baseNow = now || Date.now();
    var ease = typeof next.ease === 'number' ? next.ease : DEFAULT_EASE;
    var interval = typeof next.intervalDays === 'number' ? next.intervalDays : 0;
    var reps = (next.reps || 0) + 1;
    var lapses = next.lapses || 0;

    next.reps = reps;
    next.lastReviewedAt = timestamp;
    next.updatedAt = timestamp;

    if (grade === 'Again') {
      // A lapse is only a lapse once the card has actually been learned. Failing a card
      // that has graduated to spaced review (Review/Mature/Mastered) — or one already
      // in the relearning cycle — is a genuine lapse: it goes to Relearning and the
      // lapse counter rises. But failing a card that is still in the introductory phase
      // (New on first sight, or Learning) is NOT a lapse — not knowing brand-new
      // material the first time is the expected case. Counting it would inflate the
      // "Schwach" set and, because Mastered requires lapses === 0, would permanently bar
      // an item from ever being "Gemeistert". Such a card simply stays in Learning with
      // its lapse counter and ease untouched.
      var inLearningPhase = (card.state === 'New' || card.state === 'Learning');
      next.intervalDays = 0;
      next.dueAt = addMs(baseNow, 10 * MINUTE_MS);
      if (inLearningPhase) {
        next.state = 'Learning';
        // ease and lapses left unchanged — a learning-phase miss carries no penalty.
      } else {
        next.state = 'Relearning';
        next.ease = clamp(ease - 0.2, MIN_EASE, 3.0);
        next.lapses = lapses + 1;
        // Soft lapse: remember half the lost interval. When the card clears the
        // relearning step it resumes there instead of restarting from one day —
        // a mature card that slips once shouldn't repeat months of climbing
        // (WaniKani drops stages, Anki keeps a configurable fraction; full reset
        // was the harshest policy of all the major systems).
        next.resumeIntervalDays = Math.max(1, Math.round(interval * 0.5));
      }
      next.leech = (next.lapses || 0) >= LEECH_LAPSES;
      return next;
    }

    // Teach-then-confirm: passing a brand-new card once does NOT schedule it for
    // tomorrow — it enters a short same-day learning step (the session runner
    // re-queues it), and only the second pass graduates it to a real interval.
    // "Easy" skips the step (the learner explicitly said it's trivial).
    if (card.state === 'New' && grade !== 'Easy') {
      if (grade === 'Hard') next.ease = clamp(ease - 0.1, MIN_EASE, 3.0);
      next.state = 'Learning';
      next.intervalDays = 0;
      next.dueAt = addMs(baseNow, 10 * MINUTE_MS);
      return next;
    }

    // A card coming out of Relearning resumes at the remembered fraction of its
    // pre-lapse interval instead of starting over.
    var resume = (card.state === 'Relearning' && typeof next.resumeIntervalDays === 'number')
      ? next.resumeIntervalDays : null;
    delete next.resumeIntervalDays;

    if (grade === 'Hard') {
      next.ease = clamp(ease - 0.1, MIN_EASE, 3.0);
      if (resume) next.intervalDays = Math.max(1, Math.round(resume * 0.8));
      else next.intervalDays = Math.max(1, Math.round(interval > 0 ? interval * 1.2 : 1));
    } else if (grade === 'Easy') {
      next.ease = clamp(ease + 0.12, MIN_EASE, 3.0);
      if (resume) next.intervalDays = Math.max(3, resume);
      else next.intervalDays = Math.max(3, Math.round(interval > 0 ? interval * (ease + 0.45) : 4));
    } else {
      next.ease = ease;
      if (resume) next.intervalDays = resume;
      else if (interval <= 0) next.intervalDays = 1;
      else if (interval === 1) next.intervalDays = 3;
      else next.intervalDays = Math.max(2, Math.round(interval * ease));
    }

    // Fuzz: spread intervals of 3+ days by ±5% (at least ±1 day) so cards learned
    // together don't stay clumped on the same future days forever.
    if (next.intervalDays >= 3) {
      var r = (typeof rng === 'function' ? rng : Math.random)();
      var spread = Math.max(1, Math.round(next.intervalDays * 0.05));
      next.intervalDays = Math.max(1, next.intervalDays + Math.round((r * 2 - 1) * spread));
    }

    if (next.intervalDays >= MASTERED_INTERVAL_DAYS && next.lapses === 0) {
      next.state = 'Mastered';
    } else if (next.intervalDays >= MATURE_INTERVAL_DAYS) {
      next.state = 'Mature';
    } else {
      next.state = 'Review';
    }

    next.dueAt = addMs(baseNow, next.intervalDays * DAY_MS);
    return next;
  }

  // A leech is a card that has lapsed too many times — a chronic problem worth
  // surfacing or auto-suspending so it stops dragging down the daily queue.
  function isLeech(card) {
    return !!card && (card.lapses || 0) >= LEECH_LAPSES;
  }

  // "Weak" = the card is *currently* struggling, not that it ever lapsed. `lapses`
  // is a lifetime counter that never resets, so a card that lapsed once but has
  // since climbed back to a mature interval is no longer weak. `state` is the
  // canonical maturity signal (applyGrade promotes to Mature only at
  // MATURE_INTERVAL_DAYS), so a lapsed card counts as weak only while it has not yet
  // recovered to Mature/Mastered. Keep this the single source of truth for weakness
  // (getStatus + the Lernpfad/Wiederholen stats) so the displayed "Schwach" count
  // and the level-advance classification can't drift apart.
  function isWeak(card) {
    if (!card) return false;
    if (card.state === 'Relearning') return true;
    return (card.lapses || 0) > 0 && card.state !== 'Mature' && card.state !== 'Mastered';
  }

  function isDue(card, now) {
    if (!card || card.suspended || card.orphaned) return false;
    // New cards are *introduced* (via the daily new-card budget), not "due" for
    // review. Keeping them out of the due set means the badge/stats reflect real
    // review debt instead of jumping by every freshly added card.
    if (card.state === 'New') return false;
    return new Date(card.dueAt || 0).getTime() <= (now || Date.now());
  }

  // A New card that is ready to be introduced now. Sibling cards of an item are
  // created with a staggered dueAt, so they only become ready on later days.
  function isNewReady(card, now) {
    if (!card || card.suspended || card.orphaned) return false;
    if (card.state !== 'New') return false;
    return new Date(card.dueAt || 0).getTime() <= (now || Date.now());
  }

  function getStatus(cards, now) {
    if (!cards || cards.length === 0) return { label: 'Nicht in Wiederholung', className: 'not-in-review', due: 0 };
    var due = 0;
    var weak = 0;
    var learning = 0;
    var mastered = 0;
    var active = 0;
    var young = 0; // introduced but reviewed only once (reps < 2) — not yet "familiar"

    for (var i = 0; i < cards.length; i++) {
      var c = cards[i];
      if (!c || c.suspended) continue;
      active++;
      if (isDue(c, now)) due++;
      // Weakness is *current* difficulty (see isWeak), not a lifetime-lapse brand —
      // otherwise a single post-graduation slip would bar the item from "familiar"
      // and freeze level advancement forever.
      if (isWeak(c)) weak++;
      if (c.state === 'New' || c.state === 'Learning' || c.state === 'Relearning') learning++;
      // "Young" = graduated but not yet past a real spaced review: too few reps, or
      // still on the freshly-graduated one-day interval (the same-day learning step
      // gives reps 2 within one session, so reps alone no longer proves spacing).
      else if ((c.reps || 0) < FAMILIAR_MIN_REPS || (c.intervalDays || 0) <= 1) young++;
      if (c.state === 'Mastered') mastered++;
    }

    if (active === 0) return { label: 'Ausgesetzt', className: 'suspended', due: 0 };
    if (due > 0) return { label: due + ' fällig', className: 'due', due: due };
    if (weak > 0) return { label: 'Schwach', className: 'weak', due: 0 };
    // An item is only "familiar" once every card has survived at least one spaced
    // repetition (reps >= 2). A card reviewed just once is still being learned, so
    // it must not count toward the level-advance ratio.
    if (learning > 0 || young > 0) return { label: 'Lernen', className: 'learning', due: 0 };
    if (mastered === active) return { label: 'Gemeistert', className: 'mastered', due: 0 };
    return { label: 'Vertraut', className: 'familiar', due: 0 };
  }

  function sortQueue(cards, now) {
    var time = now || Date.now();
    return cards.slice().sort(function (a, b) {
      var priorityA = getQueuePriority(a, time);
      var priorityB = getQueuePriority(b, time);
      if (priorityA !== priorityB) return priorityA - priorityB;
      return new Date(a.dueAt || 0).getTime() - new Date(b.dueAt || 0).getTime();
    });
  }

  function getQueuePriority(card, now) {
    if (card.state === 'Relearning') return 0;
    if ((card.lapses || 0) > 0 && isDue(card, now)) return 1;
    if (card.state === 'Review' || card.state === 'Mature' || card.state === 'Mastered') return 2;
    if (card.state === 'New') return 3;
    return 4;
  }

  function makeReviewEvent(card, previousCard, grade, now) {
    var timestamp = nowIso(now);
    return {
      eventId: 'srs-' + timestamp + '-' + Math.random().toString(36).slice(2),
      cardKey: card.cardKey,
      itemKey: card.itemKey,
      section: card.section,
      promptType: card.promptType,
      grade: grade,
      previousState: previousCard ? previousCard.state : null,
      nextState: card.state,
      previousIntervalDays: previousCard ? previousCard.intervalDays : null,
      nextIntervalDays: card.intervalDays,
      reviewedAt: timestamp
    };
  }

  root.SRSScheduler = {
    getDefaultSettings: getDefaultSettings,
    createCard: createCard,
    applyGrade: applyGrade,
    makeReviewEvent: makeReviewEvent,
    isDue: isDue,
    isNewReady: isNewReady,
    isLeech: isLeech,
    isWeak: isWeak,
    getStatus: getStatus,
    sortQueue: sortQueue,
    constants: {
      DAY_MS: DAY_MS,
      DEFAULT_EASE: DEFAULT_EASE,
      MASTERED_INTERVAL_DAYS: MASTERED_INTERVAL_DAYS,
      MATURE_INTERVAL_DAYS: MATURE_INTERVAL_DAYS,
      LEECH_LAPSES: LEECH_LAPSES
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = root.SRSScheduler;
  }
})();
