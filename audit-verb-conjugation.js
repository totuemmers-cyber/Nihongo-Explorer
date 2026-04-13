const fs = require('fs');
const vm = require('vm');

const DATA_FILES = [
  'vocab-n5.js',
  'vocab-n4.js',
  'vocab-n3.js',
  'vocab-n2.js',
  'vocab-n1.js',
  'yojijukugo-data.js',
  'idioms-data.js',
  'conjugation.js'
];

const ctx = { window: {}, console };
ctx.window = ctx;

DATA_FILES.forEach(function (file) {
  vm.runInNewContext(fs.readFileSync(file, 'utf8'), ctx, { filename: file });
});

const allVocab = []
  .concat(ctx.VOCAB_N5 || [])
  .concat(ctx.VOCAB_N4 || [])
  .concat(ctx.VOCAB_N3 || [])
  .concat(ctx.VOCAB_N2 || [])
  .concat(ctx.VOCAB_N1 || [])
  .concat(ctx.YOJIJUKUGO_DATA || [])
  .concat(ctx.IDIOMS_DATA || []);

const verbs = allVocab.filter(function (item) {
  return item.type === 'Verb' && item.reading;
});

const direct = [];
const normalized = [];
const unresolved = [];

verbs.forEach(function (item) {
  const directResult = ctx.conjugateVerb(item.reading);
  const resolved = ctx.resolveVocabVerbConjugation(item);
  if (directResult) {
    direct.push(item);
  } else if (resolved) {
    normalized.push({
      word: item.word,
      reading: item.reading,
      normalizedReading: resolved.reading,
      level: item.level,
      category: item.category,
      meaning: item.meaning
    });
  } else {
    unresolved.push({
      word: item.word,
      reading: item.reading,
      level: item.level,
      category: item.category,
      meaning: item.meaning
    });
  }
});

console.log(JSON.stringify({
  counts: {
    verbs: verbs.length,
    direct: direct.length,
    normalized: normalized.length,
    unresolved: unresolved.length
  },
  normalizedSample: normalized.slice(0, 25),
  unresolvedSample: unresolved.slice(0, 50)
}, null, 2));
