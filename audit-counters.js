const fs = require('fs');
const vm = require('vm');

const DATA_FILES = [
  'counters-data.js',
  'app-constants.js'
];

const ctx = { window: {}, console };
ctx.window = ctx;

DATA_FILES.forEach(function (file) {
  vm.runInNewContext(fs.readFileSync(file, 'utf8'), ctx, { filename: file });
});

const constants = ctx.NIHONGO_CONSTANTS || {};
const counters = (ctx.COUNTERS_DATA && ctx.COUNTERS_DATA.counters) || [];
const allowedCategories = {};
(constants.COUNTER_CATEGORIES || []).forEach(function (category) {
  allowedCategories[category] = true;
});

const requiredSequence = [1,2,3,4,5,6,7,8,9,10];
const findings = [];

function pushFinding(counterId, issue, details) {
  findings.push({ counterId, issue, details });
}

counters.forEach(function (counter) {
  if (!counter.id) pushFinding('(missing)', 'missing-id', '');
  if (!counter.category || !allowedCategories[counter.category]) {
    pushFinding(counter.id || '(missing)', 'invalid-category', counter.category || '(empty)');
  }
  if (!counter.questionWord || !counter.questionWord.kanji || !counter.questionWord.reading) {
    pushFinding(counter.id || '(missing)', 'missing-question-word', '');
  }
  if (!counter.examples || !counter.examples.length) {
    pushFinding(counter.id || '(missing)', 'missing-examples', '');
  }
  if (!counter.counts || counter.counts.length !== requiredSequence.length) {
    pushFinding(counter.id || '(missing)', 'invalid-count-length', String(counter.counts ? counter.counts.length : 0));
    return;
  }

  for (var i = 0; i < requiredSequence.length; i++) {
    var entry = counter.counts[i];
    if (!entry || entry.num !== requiredSequence[i]) {
      pushFinding(counter.id || '(missing)', 'broken-count-sequence', JSON.stringify(counter.counts.map(function (item) {
        return item ? item.num : null;
      })));
      break;
    }
    if (!entry.kanji || !entry.reading || !entry.romaji) {
      pushFinding(counter.id || '(missing)', 'missing-count-fields', 'num=' + entry.num);
    }
  }

  if (counter.specialCounts) {
    counter.specialCounts.forEach(function (entry) {
      if (!entry.kanji || !entry.reading || !entry.romaji) {
        pushFinding(counter.id || '(missing)', 'missing-special-count-fields', 'num=' + entry.num);
      }
    });
  }
});

console.log(JSON.stringify({
  counts: {
    counters: counters.length,
    findings: findings.length
  },
  findings: findings.slice(0, 200)
}, null, 2));
