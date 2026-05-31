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

const good = scheduler.applyGrade(card, 'Good', now);
assert(good.state === 'Review', 'Good grade should move card to Review');
assert(good.intervalDays === 1, 'First Good should schedule one day');
assert(good.reps === 1, 'Good grade should increment reps');

// FAMILIAR_MIN_REPS: an item is only "familiar" once each card has survived a
// real review (reps >= 2). One Good (reps 1, Review) keeps it "learning".
// Evaluate with an explicit `now` so the not-yet-due cards aren't seen as due.
assert(scheduler.getStatus([good], now).className === 'learning',
  'A card reviewed only once should keep the item in learning, not familiar');
const twiceGood = scheduler.applyGrade(good, 'Good', now + scheduler.constants.DAY_MS);
assert(twiceGood.reps === 2, 'precondition: second Good gives reps 2');
assert(scheduler.getStatus([twiceGood], now + scheduler.constants.DAY_MS).className === 'familiar',
  'A card reviewed twice should make the item familiar');

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
  mature = scheduler.applyGrade(mature, 'Easy', now + i * scheduler.constants.DAY_MS);
}
assert(['Mature', 'Mastered'].includes(mature.state), 'Repeated Easy grades should mature the card');

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
