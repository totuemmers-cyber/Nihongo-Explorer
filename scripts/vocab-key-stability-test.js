// Verifies the vocab SRS-key change (Suggestion 1):
//  (a) For all CURRENT data the new raw-based key is byte-identical to the
//      legacy corrected-word|reading key, i.e. switching schemes orphans no
//      existing progress card.
//  (b) The key is pinned to the pre-correction word/reading, so a FUTURE
//      correction rule that rewrites a word/reading cannot change the key.
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DATA_FILES = [
  'vocab-n5.js', 'vocab-n4.js', 'vocab-n3.js', 'vocab-n2.js', 'vocab-n1.js',
  'yojijukugo-data.js', 'idioms-data.js',
  'app-constants.js', 'vocab-correction-rules.js', 'vocab-example-overrides.js',
  'vocab-corrections.js'
];

const ctx = { window: {}, console };
ctx.window = ctx;
DATA_FILES.forEach(function (file) {
  vm.runInNewContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), ctx, { filename: file });
});

const sourceNames = ['vocab-n5', 'vocab-n4', 'vocab-n3', 'vocab-n2', 'vocab-n1', 'yojijukugo', 'idioms'];
const globalsByName = {
  'vocab-n5': ctx.VOCAB_N5, 'vocab-n4': ctx.VOCAB_N4, 'vocab-n3': ctx.VOCAB_N3,
  'vocab-n2': ctx.VOCAB_N2, 'vocab-n1': ctx.VOCAB_N1,
  yojijukugo: ctx.YOJIJUKUGO_DATA, idioms: ctx.IDIOMS_DATA
};
const rawSources = sourceNames.map(function (name) {
  return { name: name, items: globalsByName[name] || [] };
});
const normalizedSources = ctx.getNormalizedVocabSources(rawSources);
// Mirror createSourceScopedItems: each merged item carries source + __rawWord/__rawReading.
const allVocab = normalizedSources.reduce(function (all, src) {
  (src.items || []).forEach(function (it) {
    var scoped = {};
    for (var k in it) if (it.hasOwnProperty(k)) scoped[k] = it[k];
    scoped.source = src.name;
    all.push(scoped);
  });
  return all;
}, []);

function normalizeKeyText(v) { return String(v || '').trim().replace(/\s+/g, ' '); }
function legacyKey(item) {
  return 'vocab:' + (item.source || 'vocab') + ':' + normalizeKeyText(item.word) + '|' + normalizeKeyText(item.reading);
}
function newKey(item) {
  var w = (item.__rawWord != null) ? item.__rawWord : item.word;
  var r = (item.__rawReading != null) ? item.__rawReading : item.reading;
  return 'vocab:' + (item.source || 'vocab') + ':' + normalizeKeyText(w) + '|' + normalizeKeyText(r);
}

var mismatches = [];
allVocab.forEach(function (item) {
  if (legacyKey(item) !== newKey(item)) {
    mismatches.push({ legacy: legacyKey(item), updated: newKey(item) });
  }
});

if (mismatches.length) {
  console.error('FAIL: ' + mismatches.length + ' current vocab items would change SRS key (orphaning progress):');
  console.error(JSON.stringify(mismatches.slice(0, 10), null, 2));
  process.exit(1);
}

// (b) Simulate a future correction that rewrites a word + reading.
var sample = allVocab.find(function (it) { return it.word && it.reading; });
if (!sample) { console.error('FAIL: no vocab sample found'); process.exit(1); }
var keyBefore = newKey(sample);
var corrected = {};
for (var k in sample) if (sample.hasOwnProperty(k)) corrected[k] = sample[k];
corrected.word = sample.word + '（修正）';      // correction rewrites the surface word
corrected.reading = sample.reading + 'しゅうせい'; // ...and the reading
var keyAfter = newKey(corrected);
if (keyBefore !== keyAfter) {
  console.error('FAIL: key changed after a simulated word/reading correction.');
  console.error('  before: ' + keyBefore);
  console.error('  after:  ' + keyAfter);
  process.exit(1);
}
if (legacyKey(corrected) === keyAfter) {
  console.error('FAIL: legacy key did not change under correction — test is not exercising the fix.');
  process.exit(1);
}

console.log('Vocab key-stability test passed (' + allVocab.length + ' items: 0 key changes; pinned to pre-correction word/reading).');
