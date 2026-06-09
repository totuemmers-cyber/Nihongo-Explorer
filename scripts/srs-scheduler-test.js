const scheduler = require('../srs-scheduler.js');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const now = Date.parse('2026-05-24T12:00:00.000Z');
const spec = {
  cardKey: 'vocab:vocab-n5:test|test#meaning',
  itemKey: 'vocab:vocab-n5:test|test',
  section: 'vocab',
  promptType: 'meaning',
  label: 'Bedeutung',
  level: 'N5',
  itemLabel: 'test',
  question: {
    prompt: 'Was bedeutet dieses Wort?',
    promptMain: 'test',
    answer: 'Test'
  }
};

const card = scheduler.createCard(spec, now);
assert(card.state === 'New', 'New card should start in New state');
assert(card.dueAt === new Date(now).toISOString(), 'New card should be due immediately');

// Teach-then-confirm: the first pass on a brand-new card is a same-day learning
// step (the runner re-queues it within the session); only the second pass
// graduates the card to a real day interval.
const step = scheduler.applyGrade(card, 'Good', now);
assert(step.state === 'Learning', 'First Good on a New card enters the learning step');
assert(step.intervalDays === 0, 'Learning step has no day interval yet');
assert(new Date(step.dueAt).getTime() === now + 10 * 60 * 1000, 'Learning step is due ten minutes later');
assert(step.reps === 1, 'First pass increments reps');

const good = scheduler.applyGrade(step, 'Good', now + 10 * 60 * 1000);
assert(good.state === 'Review', 'Second Good graduates the card');
assert(good.intervalDays === 1, 'Graduation schedules one day');
assert(good.reps === 2, 'Second pass increments reps');

// Easy skips the learning step (the learner explicitly said it's trivial).
const easyNew = scheduler.applyGrade(card, 'Easy', now, () => 0.5);
assert(easyNew.state === 'Review' && easyNew.intervalDays === 4, 'Easy on a New card graduates directly');

// "Familiar" needs a survived spaced review. The same-day step already gives
// reps 2, so reps alone no longer proves spacing: a freshly graduated one-day
// card is still "learning"; the first real follow-up review makes it familiar.
assert(scheduler.getStatus([good], now).className === 'learning',
  'A freshly graduated one-day card keeps the item in learning, not familiar');
const reviewed = scheduler.applyGrade(good, 'Good', now + scheduler.constants.DAY_MS, () => 0.5);
assert(reviewed.intervalDays === 3, 'precondition: follow-up Good gives three days');
assert(scheduler.getStatus([reviewed], now + scheduler.constants.DAY_MS).className === 'familiar',
  'A card past a real spaced review makes the item familiar');

const hard = scheduler.applyGrade(good, 'Hard', now);
assert(hard.intervalDays >= 1, 'Hard should preserve at least a one-day interval');
assert(hard.ease < good.ease, 'Hard should reduce ease');

const again = scheduler.applyGrade(good, 'Again', now);
assert(again.state === 'Relearning', 'Again should move card to Relearning');
assert(again.lapses === 1, 'Again should increment lapses');
assert(new Date(again.dueAt).getTime() > now, 'Again should schedule a short relearning delay');
assert(again.leech === false, 'A single lapse is not a leech');
assert(scheduler.isLeech(again) === false, 'isLeech is false below the threshold');

// Leech detection: repeated failures cross the LEECH_LAPSES threshold.
let lapsing = good;
for (let i = 0; i < scheduler.constants.LEECH_LAPSES; i++) {
  lapsing = scheduler.applyGrade(lapsing, 'Again', now + i * scheduler.constants.DAY_MS);
}
assert(lapsing.lapses >= scheduler.constants.LEECH_LAPSES, 'Repeated Again should accumulate lapses');
assert(scheduler.isLeech(lapsing) === true, 'A card past the lapse threshold is a leech');
assert(lapsing.leech === true, 'applyGrade flags a leech on the Again branch');

let mature = good;
for (let i = 0; i < 10; i++) {
  mature = scheduler.applyGrade(mature, 'Easy', now + i * scheduler.constants.DAY_MS, () => 0.5);
}
assert(['Mature', 'Mastered'].includes(mature.state), 'Repeated Easy grades should mature the card');

// Soft lapse: a mature card that slips resumes at half its old interval after
// clearing the relearning step, instead of restarting from one day.
const big = Object.assign({}, reviewed, { state: 'Mature', intervalDays: 100, lapses: 0 });
const slipped = scheduler.applyGrade(big, 'Again', now);
assert(slipped.state === 'Relearning' && slipped.resumeIntervalDays === 50,
  'A lapse remembers half the lost interval');
const resumed = scheduler.applyGrade(slipped, 'Good', now, () => 0.5);
assert(resumed.intervalDays === 50, 'Clearing relearning resumes at the remembered interval');
assert(resumed.resumeIntervalDays === undefined, 'The resume marker is consumed');
const resumedHard = scheduler.applyGrade(slipped, 'Hard', now, () => 0.5);
assert(resumedHard.intervalDays === 40, 'Hard out of relearning resumes at a reduced fraction');

// Fuzz: intervals of 3+ days spread by up to ±5% (at least ±1 day) so cards
// learned together drift apart; an rng of 0.5 means no offset.
const fuzzBase = scheduler.applyGrade(reviewed, 'Good', now + 4 * scheduler.constants.DAY_MS, () => 0.5);
const fuzzLo = scheduler.applyGrade(reviewed, 'Good', now + 4 * scheduler.constants.DAY_MS, () => 0);
const fuzzHi = scheduler.applyGrade(reviewed, 'Good', now + 4 * scheduler.constants.DAY_MS, () => 1);
assert(fuzzLo.intervalDays < fuzzBase.intervalDays && fuzzHi.intervalDays > fuzzBase.intervalDays,
  'Fuzz spreads intervals around the base');
assert(fuzzHi.intervalDays - fuzzBase.intervalDays <= Math.max(1, Math.round(fuzzBase.intervalDays * 0.05)),
  'Fuzz stays within five percent (at least one day)');

// Weakness is current difficulty, not a lifetime-lapse brand. A card that lapsed
// once but has since climbed back to a mature interval must NOT count as weak —
// otherwise a single post-graduation slip would permanently bar the item from
// "familiar" and freeze level advancement.
const recovered = {
  state: 'Mature', reps: 5, lapses: 1,
  intervalDays: scheduler.constants.MATURE_INTERVAL_DAYS + 10,
  dueAt: new Date(now + 40 * scheduler.constants.DAY_MS).toISOString(),
  suspended: false
};
assert(scheduler.isWeak(recovered) === false, 'A recovered mature card is not weak despite a past lapse');
assert(scheduler.getStatus([recovered], now).className === 'familiar',
  'A lapsed-but-recovered mature card counts as familiar (so it counts toward level advance)');
// But a card still relearning, or lapsed and still on a short interval, IS weak.
assert(scheduler.isWeak({ state: 'Relearning', lapses: 1, intervalDays: 0 }) === true,
  'A relearning card is weak');
assert(scheduler.isWeak({ state: 'Review', lapses: 1, intervalDays: 3 }) === true,
  'A lapsed card still on a short interval is weak');
assert(scheduler.getStatus([{ state: 'Review', reps: 3, lapses: 1, intervalDays: 3,
  dueAt: new Date(now + scheduler.constants.DAY_MS).toISOString(), suspended: false }], now)
  .className === 'weak', 'A recently-lapsed short-interval card reports the item as weak');

const queue = scheduler.sortQueue([good, again], now + scheduler.constants.DAY_MS);
assert(queue[0].cardKey === again.cardKey, 'Relearning cards should be prioritized first');

const storage = new Map();
global.localStorage = {
  getItem(key) {
    return storage.has(key) ? storage.get(key) : null;
  },
  setItem(key, value) {
    storage.set(String(key), String(value));
  },
  removeItem(key) {
    storage.delete(key);
  },
  clear() {
    storage.clear();
  }
};
global.window = { SRSScheduler: scheduler };
require('../srs-store.js');

const secondCard = scheduler.createCard(Object.assign({}, spec, {
  cardKey: spec.itemKey + '#reverse',
  promptType: 'reverse',
  label: 'Aktive Erinnerung'
}), now);

window.SRSStore.putCards([card, secondCard], { skipBackup: true })
  .then(function () {
    return window.SRSStore.setItemSuspended(spec.itemKey, true, { skipBackup: true });
  })
  .then(function (cards) {
    assert(cards.length === 2, 'Suspending an item should update all item cards');
    assert(cards.every(function (c) { return c.suspended === true; }), 'All item cards should be suspended');
    assert(scheduler.getStatus(cards).label === 'Ausgesetzt', 'Suspended cards should report Ausgesetzt status');
    return window.SRSStore.setItemSuspended(spec.itemKey, false, { skipBackup: true });
  })
  .then(function (cards) {
    assert(cards.every(function (c) { return c.suspended === false; }), 'Reactivated cards should not be suspended');
    return window.SRSStore.deleteCardsByItem(spec.itemKey, { skipBackup: true });
  })
  .then(function (deleted) {
    assert(deleted.length === 2, 'Deleting an item should delete all item cards');
    return window.SRSStore.getCardsByItem(spec.itemKey);
  })
  .then(function (cards) {
    assert(cards.length === 0, 'Deleted item should no longer have SRS cards');
    console.log('SRS scheduler test passed.');
  })
  .catch(function (error) {
    console.error(error.stack || String(error));
    process.exit(1);
  });
