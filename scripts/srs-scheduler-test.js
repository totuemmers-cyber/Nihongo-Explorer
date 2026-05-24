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

const hard = scheduler.applyGrade(good, 'Hard', now);
assert(hard.intervalDays >= 1, 'Hard should preserve at least a one-day interval');
assert(hard.ease < good.ease, 'Hard should reduce ease');

const again = scheduler.applyGrade(good, 'Again', now);
assert(again.state === 'Relearning', 'Again should move card to Relearning');
assert(again.lapses === 1, 'Again should increment lapses');
assert(new Date(again.dueAt).getTime() > now, 'Again should schedule a short relearning delay');

let mature = good;
for (let i = 0; i < 10; i++) {
  mature = scheduler.applyGrade(mature, 'Easy', now + i * scheduler.constants.DAY_MS);
}
assert(['Mature', 'Mastered'].includes(mature.state), 'Repeated Easy grades should mature the card');

const queue = scheduler.sortQueue([good, again], now + scheduler.constants.DAY_MS);
assert(queue[0].cardKey === again.cardKey, 'Relearning cards should be prioritized first');

console.log('SRS scheduler test passed.');
