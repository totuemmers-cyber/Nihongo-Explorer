// Check authored additions after the exact normalization/merge used by the app.
const assert = require('assert');
const crypto = require('crypto');
const { read, key, levels, loadVocabulary } = require('./vocabulary-tools.cjs');
const { authoredEntries, batch } = require('./import-vocabulary-additions.cjs');
const review = JSON.parse(read('scripts/vocabulary-review.json'));
const { items, sources } = loadVocabulary();
const additions = authoredEntries();
const completion = require('./import-vocabulary-completion.cjs').prepare();
const completionKeys = new Set(completion.additions.map(a => key(a.entry)));
const expectedCounts = { ...review.baseline.counts };
const index = new Map(items.map(v => [key(v), v]));
const ids = new Map(items.map(v => [v.id, v]));
assert.equal(ids.size, items.length, 'Runtime IDs must be unique');
assert.equal(items.filter(v => v.vocabularyBatch === batch).length, additions.length);

for (const source of sources) {
  const prior = review.baseline.sources.find(s => s.name === source.name);
  const hash = crypto.createHash('sha256').update(JSON.stringify(source.items.slice(0, prior.count).map(key))).digest('hex');
  assert.equal(hash, prior.keysHash, 'Existing source positions changed: ' + source.name);
}
for (const entry of additions) {
  const actual = index.get(key(entry));
  assert(actual, 'New vocabulary lost during merging: ' + key(entry));
  for (const field of ['level','word','reading','romaji','meaning','type','category','notes','pitch','examples']) {
    const patch = completion.patches.get(actual.id);
    const expected = patch && Object.hasOwn(patch, field) ? patch[field] : entry[field];
    assert.equal(JSON.stringify(actual[field]), JSON.stringify(expected), 'Normalized content changed: ' + key(entry) + ' / ' + field);
  }
  assert(/[A-Za-zÄÖÜäöüß]/.test(entry.notes), 'Usage note needs German explanation: ' + key(entry));
  assert.equal(entry.pitch, null, 'Unverified pitch should remain unknown');
  expectedCounts[entry.level]++;
}
for (const fix of review.levelCorrections) {
  const item = ids.get(fix.id);
  assert(item && key(item) === fix.key, 'Correction changed entry identity: ' + fix.id);
  assert.equal(item.level, fix.to, 'Level correction missing: ' + fix.key);
  const publishers = new Set(fix.referenceIds.map(id => review.referencePages[id]).filter(r => r.level === fix.to).map(r => r.publisher));
  assert(publishers.size >= 2, 'Level correction lacks corroboration: ' + fix.key);
  expectedCounts[fix.from]--; expectedCounts[fix.to]++;
}
const restoredIds = new Set(review.restoredEntries.map(v => v.id));
for (const restored of review.restoredEntries) {
  assert(ids.has(restored.id) && key(ids.get(restored.id)) === restored.key, 'Merge dropped an existing word: ' + restored.key);
  expectedCounts[restored.level]++;
}
const priorIdentities = items.filter(i => i.vocabularyBatch !== batch && !restoredIds.has(i.id) && !completionKeys.has(key(i)))
  .map(i => [i.id,i.word,i.reading]).sort((a,b) => a[0].localeCompare(b[0],'en'));
assert.equal(crypto.createHash('sha256').update(JSON.stringify(priorIdentities)).digest('hex'), review.baseline.runtimeIdentityHash, 'Existing saved vocabulary identity changed');
assert.equal(new Set(review.decisions.map(d => d.key)).size, review.decisions.length);
for (const record of [...review.decisions, ...review.additions, ...review.levelCorrections]) {
  assert(record.referenceIds.length && record.referenceIds.every(id => review.referencePages[id]), 'Missing reference: ' + record.key);
}
for (const decision of review.decisions.filter(d => d.disposition === 'added')) {
  assert(decision.targets.every(k => index.has(k)), 'Claimed addition is missing: ' + decision.key);
}
// These distinctions previously caused false matches in the coverage comparison.
for (const [added, unrelated] of [['そう|そう','僧|そう'], ['さん|さん','三|さん'], ['三|さん','さん|さん'], ['五日|いつか','いつか|いつか'], ['後|あと','あと|あと']]) {
  assert(!review.additions.find(a => a.key === added).matchedReferenceKeys.includes(unrelated), 'Homophone incorrectly treated as covered: ' + unrelated);
}
for (const k of ['一日|ついたち','一日|いちにち','白|しろ','城|しろ','側|そば','そば|そば']) {
  assert(index.has(k), 'Distinct reading/sense missing: ' + k);
}
const counts = Object.fromEntries(levels.map(level => [level, items.filter(v => v.level === level).length]));
for (const addition of completion.additions) expectedCounts[addition.entry.level]++;
assert.deepStrictEqual(counts, expectedCounts, 'Unexpected entry loss or level movement');
console.log(JSON.stringify({ additions: additions.length, examples: additions.reduce((n,v) => n + v.examples.length, 0), levelCorrections: review.levelCorrections.length, restoredEntries: review.restoredEntries.length, preservedSourcePrefixes: sources.length, counts, total: items.length }, null, 2));
