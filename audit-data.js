const fs = require('fs');
const vm = require('vm');

const FILES = [
  'kanji-data.js',
  'kanji-n1.js',
  'grammar-data.js',
  'grammar-n2.js',
  'grammar-n1.js',
  'vocab-n5.js',
  'vocab-n4.js',
  'vocab-n3.js',
  'vocab-n2.js',
  'vocab-n1.js',
  'yojijukugo-data.js',
  'idioms-data.js',
  'keigo-data.js',
  'onomatopoeia-data.js',
  'counters-data.js',
  'kangxi-radicals-data.js',
  'conjugation.js',
  'vocab-corrections.js'
];

const ctx = { window: {}, console };
ctx.window = ctx;

FILES.forEach(function (file) {
  vm.runInNewContext(fs.readFileSync(file, 'utf8'), ctx, { filename: file });
});

function findDuplicates(items, keyFn) {
  const seen = new Map();
  const duplicates = [];

  items.forEach(function (item) {
    const key = keyFn(item);
    if (!key) return;
    if (seen.has(key)) {
      duplicates.push(key);
      return;
    }
    seen.set(key, true);
  });

  return duplicates;
}

function collectMalformed(items, label, checks) {
  const malformed = [];
  items.forEach(function (item, index) {
    for (let i = 0; i < checks.length; i++) {
      if (!checks[i].test(item)) {
        malformed.push({
          label: label,
          index: index,
          key: checks[i].key(item),
          issue: checks[i].issue
        });
        break;
      }
    }
  });
  return malformed;
}

const kanji = []
  .concat(ctx.KANJI_DATA || [])
  .concat(ctx.KANJI_N1_DATA || []);
const grammar = ctx.GRAMMAR_DATA || [];
const vocab = []
  .concat(ctx.VOCAB_N5 || [])
  .concat(ctx.VOCAB_N4 || [])
  .concat(ctx.VOCAB_N3 || [])
  .concat(ctx.VOCAB_N2 || [])
  .concat(ctx.VOCAB_N1 || [])
  .concat(ctx.YOJIJUKUGO_DATA || [])
  .concat(ctx.IDIOMS_DATA || []);
const radicals = ctx.KANGXI_RADICALS || [];
const onomatopoeia = ctx.ONOMATOPOEIA_DATA || [];
const counters = ctx.COUNTERS_DATA && ctx.COUNTERS_DATA.counters ? ctx.COUNTERS_DATA.counters : [];

const verbs = vocab.filter(function (item) {
  return item.type === 'Verb' && item.reading;
});
const unresolvedVerbs = verbs.filter(function (item) {
  return !ctx.resolveVocabVerbConjugation(item);
}).map(function (item) {
  return {
    word: item.word,
    reading: item.reading,
    level: item.level,
    meaning: item.meaning
  };
});

const malformed = []
  .concat(collectMalformed(kanji, 'kanji', [
    { issue: 'missing-kanji', test: function (item) { return !!item.kanji; }, key: function () { return ''; } },
    { issue: 'missing-meanings', test: function (item) { return Array.isArray(item.meanings) && item.meanings.length > 0; }, key: function (item) { return item.kanji; } },
    { issue: 'missing-jlpt', test: function (item) { return !!item.jlpt; }, key: function (item) { return item.kanji; } }
  ]))
  .concat(collectMalformed(grammar, 'grammar', [
    { issue: 'missing-id', test: function (item) { return !!item.id; }, key: function () { return ''; } },
    { issue: 'missing-pattern', test: function (item) { return !!item.pattern; }, key: function (item) { return item.id; } },
    { issue: 'missing-level', test: function (item) { return !!item.level; }, key: function (item) { return item.id; } }
  ]))
  .concat(collectMalformed(vocab, 'vocab', [
    { issue: 'missing-word', test: function (item) { return !!item.word; }, key: function () { return ''; } },
    { issue: 'missing-meaning', test: function (item) { return !!item.meaning; }, key: function (item) { return item.word + '|' + (item.reading || ''); } },
    { issue: 'missing-level', test: function (item) { return !!item.level; }, key: function (item) { return item.word + '|' + (item.reading || ''); } }
  ]))
  .concat(collectMalformed(radicals, 'radicals', [
    { issue: 'missing-number', test: function (item) { return typeof item.number === 'number'; }, key: function () { return ''; } },
    { issue: 'missing-radical', test: function (item) { return !!item.radical; }, key: function (item) { return '' + item.number; } }
  ]))
  .concat(collectMalformed(onomatopoeia, 'onomatopoeia', [
    { issue: 'missing-word', test: function (item) { return !!item.word; }, key: function () { return ''; } },
    { issue: 'missing-category', test: function (item) { return !!item.category; }, key: function (item) { return item.word; } }
  ]))
  .concat(collectMalformed(counters, 'counters', [
    { issue: 'missing-id', test: function (item) { return !!item.id; }, key: function () { return ''; } },
    { issue: 'missing-kanji', test: function (item) { return !!item.kanji; }, key: function (item) { return item.id; } }
  ]));

const report = {
  totals: {
    kanji: kanji.length,
    grammar: grammar.length,
    vocab: vocab.length,
    radicals: radicals.length,
    onomatopoeia: onomatopoeia.length,
    counters: counters.length,
    verbs: verbs.length
  },
  duplicates: {
    kanji: findDuplicates(kanji, function (item) { return item.kanji; }),
    grammar: findDuplicates(grammar, function (item) { return item.id; }),
    vocab: findDuplicates(vocab, function (item) { return item.word + '|' + (item.reading || ''); }),
    radicals: findDuplicates(radicals, function (item) { return '' + item.number; }),
    onomatopoeia: findDuplicates(onomatopoeia, function (item) { return item.word; }),
    counters: findDuplicates(counters, function (item) { return item.id; })
  },
  malformed: malformed,
  unresolvedVerbs: unresolvedVerbs
};

console.log(JSON.stringify(report, null, 2));

const hasErrors =
  report.malformed.length > 0 ||
  report.unresolvedVerbs.length > 0 ||
  Object.keys(report.duplicates).some(function (key) {
    return report.duplicates[key].length > 0;
  });

process.exit(hasErrors ? 1 : 0);
