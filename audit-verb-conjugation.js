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
  'app-constants.js',
  'conjugation.js',
  'vocab-correction-rules.js',
  'vocab-example-overrides.js',
  'vocab-corrections.js'
];

const ctx = { window: {}, console };
ctx.window = ctx;

DATA_FILES.forEach(function (file) {
  vm.runInNewContext(fs.readFileSync(file, 'utf8'), ctx, { filename: file });
});

const rawSources = [
  { name: 'vocab-n5', items: ctx.VOCAB_N5 || [] },
  { name: 'vocab-n4', items: ctx.VOCAB_N4 || [] },
  { name: 'vocab-n3', items: ctx.VOCAB_N3 || [] },
  { name: 'vocab-n2', items: ctx.VOCAB_N2 || [] },
  { name: 'vocab-n1', items: ctx.VOCAB_N1 || [] },
  { name: 'yojijukugo', items: ctx.YOJIJUKUGO_DATA || [] },
  { name: 'idioms', items: ctx.IDIOMS_DATA || [] }
];
const normalizedSources = ctx.getNormalizedVocabSources
  ? ctx.getNormalizedVocabSources(rawSources)
  : rawSources;
const allVocab = normalizedSources.reduce(function (all, source) {
  return all.concat(source.items || []);
}, []);

const verbs = allVocab.filter(function (item) {
  return item.type === 'Verb' && item.reading;
});

const direct = [];
const normalized = [];
const unresolved = [];

verbs.forEach(function (item) {
  const resolved = ctx.resolveVocabVerbConjugation(item);
  if (resolved && !resolved.normalized) {
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

// Expected forms are independent of the engine's classification rules.
const expectedForms = [
  ['なさる', 'なさる', 'godan', 'なさいます', 'なさって', 'なさらない'],
  ['おっしゃる', 'おっしゃる', 'godan', 'おっしゃいます', 'おっしゃって', 'おっしゃらない'],
  ['下さる', 'くださる', 'godan', 'くださいます', 'くださって', 'くださらない'],
  ['いらっしゃる', 'いらっしゃる', 'godan', 'いらっしゃいます', 'いらっしゃって', 'いらっしゃらない'],
  ['強いる', 'しいる', 'ichidan', 'しいます', 'しいて', 'しいない'],
  ['居る', 'おる', 'godan', 'おります', 'おって', 'おらない'],
  ['作る', 'つくる', 'godan', 'つくります', 'つくって', 'つくらない'],
  ['送る', 'おくる', 'godan', 'おくります', 'おくって', 'おくらない'],
  ['寝る', 'ねる', 'ichidan', 'ねます', 'ねて', 'ねない'],
  ['着る', 'きる', 'ichidan', 'きます', 'きて', 'きない'],
  ['切る', 'きる', 'godan', 'きります', 'きって', 'きらない'],
  ['居る', 'いる', 'ichidan', 'います', 'いて', 'いない'],
  ['いる', 'いる', 'ichidan', 'います', 'いて', 'いない'],
  ['要る', 'いる', 'godan', 'いります', 'いって', 'いらない'],
  ['変える', 'かえる', 'ichidan', 'かえます', 'かえて', 'かえない'],
  ['帰る', 'かえる', 'godan', 'かえります', 'かえって', 'かえらない'],
  ['混ぜる', 'まぜる', 'ichidan', 'まぜます', 'まぜて', 'まぜない'],
  ['来る', 'くる', 'kuru', 'きます', 'きて', 'こない'],
  ['繰る', 'くる', 'godan', 'くります', 'くって', 'くらない'],
  ['刷る', 'する', 'godan', 'すります', 'すって', 'すらない'],
  ['啜る', 'すする', 'godan', 'すすります', 'すすって', 'すすらない'],
  ['食べる', 'たべる', 'ichidan', 'たべます', 'たべて', 'たべない'],
  ['行く', 'いく', 'godan', 'いきます', 'いって', 'いかない'],
  ['勉強する', 'べんきょうする', 'suru', 'べんきょうします', 'べんきょうして', 'べんきょうしない']
];
const incorrectForms = [];
const assert = require('node:assert/strict');
const review = require('./scripts/verb-review.json');
const correctionPlan = require('./scripts/import-vocabulary-completion.cjs').prepare();
const baseline = require('./scripts/verb-baseline.json');
assert.equal(baseline.length, 2389);
assert.equal(review.entries.length, baseline.length);
assert.equal(new Set(review.entries.map(e => e.source + ':' + e.index)).size, baseline.length);
baseline.forEach((b, i) => {
  const e = review.entries[i];
  assert.equal(e.source, b.__sourceName); assert.equal(e.index, b.__sourceIndex);
  assert.equal(e.word, b.word); assert.equal(e.reading, b.reading);
  assert(e.reason && ['verified','excluded','nonverb'].includes(e.disposition));
  const item = allVocab.find(v => v.__sourceName === e.source && v.__sourceIndex === e.index);
  assert(item, 'Reviewed entry disappeared: ' + e.word);
  const correction = ctx.VOCAB_CORRECTION_RULES.correctionsBySource?.[e.source]?.[e.index] || {};
  const metadata = correction.conjugation || e.metadata;
  assert.equal(item.__rawWord, e.word, 'Raw source position changed');
  assert.equal(item.word, correction.word || e.word, 'Undocumented spelling change');
  assert.equal(item.reading, correction.reading || e.reading, 'Undocumented reading change');
  if (correction.type) assert.equal(item.type, correction.type, 'Reviewed grammatical role drift: ' + e.word);
  assert.equal(JSON.stringify(item.conjugation), JSON.stringify(metadata), 'Metadata drift: ' + e.word);
  const resolved = ctx.resolveVocabVerbConjugation(item);
  // An explicit reviewed noun role can retain historical nominal-suru metadata
  // without exposing conjugations for the bare noun.
  const correctedNonverb = correction.type && correction.type !== 'Verb';
  const eligible = !correctedNonverb && (correction.conjugation ? metadata.conjugationKind === 'verb' : e.disposition === 'verified');
  assert.equal(!!resolved, eligible, 'Unexpected eligibility: ' + e.word);
  if (resolved) {
    const correctionEntry = correctionPlan.items.find(v=>v.source===e.source && v.__sourceIndex===e.index);
    const evidence = correctionPlan.correctionReviews.get(correctionEntry?.id)?.evidence || e.evidence;
    assert(evidence.length && metadata.verbGroup && metadata.conjugationReading);
    for (const f of Object.values(resolved.result.forms)) assert(f.japanese && f.label);
  }
});
const signalNoun = allVocab.find(v => v.__sourceName === 'vocab-n4' && v.__sourceIndex === 980);
assert.equal(signalNoun.type, 'Nomen', 'Bare 合図 has a reviewed nominal role');
assert.equal(signalNoun.conjugation.conjugationKind, 'nominal-suru');
assert.equal(ctx.resolveVocabVerbConjugation(signalNoun), null, 'Bare 合図 must not expose verb conjugations');
const signalVerb = ctx.resolveVocabVerbConjugation({type:'Verb',word:'合図する',reading:'あいずする',
  conjugation:{verbGroup:'suru',conjugationReading:'あいずする',conjugationKind:'verb'}});
assert(signalVerb, 'Complete 合図する remains conjugatable');
for (const [key, value] of Object.entries({polite:'あいずします',negative:'あいずしない',te:'あいずして',past:'あいずした'})) {
  assert.equal(signalVerb.result.forms[key].japanese, value, '合図する/' + key);
}
for (const v of verbs) assert(v.conjugation, 'Unreviewed verb: ' + v.word);
assert.equal(ctx.resolveVocabVerbConjugation({type:'Verb',word:'発表',reading:'はっぴょう',meaning:'veröffentlichen'}), null);
const extraFixtures = require('./scripts/verb-expected-forms.json');
for (const f of extraFixtures) {
  const item = f.metadata ? {type:'Verb',word:f.word,reading:f.reading,...f.metadata} : verbs.find(v => v.word===f.word && v.reading===f.reading);
  const resolved=ctx.resolveVocabVerbConjugation(item);
  assert(resolved, 'Missing fixture: '+f.word);
  for (const [key, expected] of Object.entries(f.forms)) assert.equal(resolved.result.forms[key]?.japanese ?? null, expected, f.word+'/'+key);
  for (const [key, expected] of Object.entries(f.variants || {})) for(const variant of expected) assert(resolved.result.forms[key].acceptedVariants.includes(variant));
}
expectedForms.forEach(function (fixture) {
  const item = verbs.find(function (v) { return v.word === fixture[0] && v.reading === fixture[1]; });
  const resolved = ctx.resolveVocabVerbConjugation(item);
  const result = resolved && resolved.result;
  const actual = result && [result.group, result.forms.polite.japanese, result.forms.te.japanese, result.forms.negative.japanese];
  if (JSON.stringify(actual) !== JSON.stringify(fixture.slice(2))) {
    incorrectForms.push({ word: fixture[0], expected: fixture.slice(2), actual: actual || null });
  }
});
const explicit = ctx.resolveVocabVerbConjugation({
  word: '運動', reading: 'うんどう', type: 'Verb', conjugationReading: 'うんどうする', verbGroup: 'suru'
});
if (!explicit || explicit.result.forms.polite.japanese !== 'うんどうします' || !explicit.normalized) {
  incorrectForms.push({ issue: 'Explicit conjugation metadata must take precedence over reading heuristics' });
}
const compound = ctx.resolveVocabVerbConjugation({
  word: '持って来る', reading: 'もってくる', type: 'Verb', verbGroup: 'kuru'
});
if (!compound || compound.result.forms.negative.japanese !== 'もってこない') {
  incorrectForms.push({ issue: 'Explicit compounds of 来る must remain irregular' });
}

console.log(JSON.stringify({
  counts: {
    verbs: verbs.length,
    direct: direct.length,
    normalized: normalized.length,
    unresolved: unresolved.length,
    expectedFormChecks: expectedForms.length + 2,
    incorrectForms: incorrectForms.length
  },
  normalizedSample: normalized.slice(0, 25),
  unresolvedSample: unresolved.slice(0, 50),
  incorrectForms: incorrectForms
}, null, 2));
console.log('Full baseline review and additional lexical fixtures passed. Current explicit exclusions: ' + review.entries.filter(e => e.disposition === 'excluded' && !ctx.VOCAB_CORRECTION_RULES.correctionsBySource?.[e.source]?.[e.index]?.conjugation).map(e => e.word).join(', '));
process.exitCode = incorrectForms.length ? 1 : 0;
