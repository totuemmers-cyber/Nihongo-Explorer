// Validate the complete proposal in the app's normalization/merge before any write.
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const crypto = require('crypto');
const {root, read, levels, key, loadVocabulary} = require('./vocabulary-tools.cjs');
const hash = value => crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex');
const plain = value => JSON.parse(JSON.stringify(value));
const nonempty = value => typeof value === 'string' && value.trim().length > 0;
const sentenceKey = s => s.normalize('NFKC').replace(/[\s。、！？!?.,]/g, '');
const manifest = () => JSON.parse(read('scripts/vocabulary-completion.json'));
function authoring(m = manifest()) {
  return m.authoringFiles.map(file => {
    assert(/^scripts\/vocabulary-completion\/[\w-]+\.json$/.test(file), 'Invalid authoring path');
    return JSON.parse(read(file));
  });
}
function validateContent(item, options = {}) {
  const enrichmentRequired=options.enrichmentRequired!==false;
  for (const f of ['word','reading','romaji','meaning','type','category']) assert(nonempty(item[f]), 'Missing ' + f + ': ' + item.word);
  assert(levels.includes(item.level), 'Invalid level');
  assert(['Nomen','Verb','Adjektiv','Adverb','Ausdruck','Partikel','Yojijukugo','Redewendung','Sprichwort'].includes(item.type), 'Invalid part of speech');
  if (enrichmentRequired) assert(nonempty(item.notes) && /[A-Za-zÄÖÜäöüß]/.test(item.notes), 'German usage note required');
  else if (item.notes !== undefined && item.notes !== null) assert(typeof item.notes==='string', 'Invalid usage note');
  assert(Array.isArray(item.examples) && item.examples.length >= (enrichmentRequired?2:1), enrichmentRequired?'Two contexts required':'One reviewed example required');
  assert.equal(new Set(item.examples.map(e => sentenceKey(e.japanese || ''))).size, item.examples.length, 'Repeated Japanese example');
  for (const e of item.examples) {
    for (const f of ['japanese','romaji','german']) assert(nonempty(e[f]), 'Incomplete example ' + item.word);
    assert(/[ぁ-ヿ一-龯]/.test(e.japanese), 'Japanese sentence required');
    assert(!/[ぁ-ヿ一-龯]/.test(e.romaji), 'Japanese in romanization');
  }
  if (item.aliases !== undefined) {
    assert(Array.isArray(item.aliases) && item.aliases.every(nonempty), 'Invalid aliases');
    assert.equal(new Set(item.aliases).size, item.aliases.length, 'Duplicate aliases');
    assert(!item.aliases.includes(item.word), 'Alias repeats headword');
  }
}
function validateReview(record) {
  assert(record.review && nonempty(record.review.reviewer), 'Missing editorial reviewer');
  for (const f of ['meaning','japanese','romanization','translation','contexts']) assert(nonempty(record.review[f]), 'Missing editorial check: ' + f);
  assert(Array.isArray(record.evidence) && record.evidence.length, 'Missing evidence');
  for (const e of record.evidence) assert(nonempty(e.source) && nonempty(e.locator) && nonempty(e.finding), 'Incomplete evidence');
}
function prepareLegacy(batches = authoring(), m = manifest()) {
  const historical = JSON.parse(read('scripts/vocabulary-review.json'));
  assert.equal(hash(historical), m.historicalReviewHash, 'Historical review changed');
  const historicalPending = historical.decisions.filter(d => ['deferred-sense-review','deferred-further-expansion','deferred-single-reference'].includes(d.disposition)).map(d=>d.key).sort();
  assert.deepStrictEqual(m.candidates.map(c=>c.key).sort(),historicalPending,'Completion candidate scope changed');
  // Replay historical authoring without the later correction layer. Its immutable
  // spelling/reading assertions describe history, not the corrected vocabulary.
  const committed = loadVocabulary();
  const existingRules = plain(committed.c.VOCAB_CORRECTION_RULES);
  delete existingRules.correctionsBySource;
  delete existingRules.completionRedirects;
  delete existingRules.stableIdsBySource;
  const historicalFiles = {'vocab-correction-rules.js':'window.VOCAB_CORRECTION_RULES = '+JSON.stringify(existingRules)+';'};
  for (const l of levels) historicalFiles['vocab-'+l.toLowerCase()+'.js'] = 'window.VOCAB_'+l+' = '+JSON.stringify(committed.c['VOCAB_'+l].filter(v=>!v.correctionId))+';';
  const before = loadVocabulary(historicalFiles);
  for (const b of m.baseline.sources) {
    const source = before.sources.find(s => s.name === b.name);
    assert(source && hash(source.items.slice(0,b.count).map(key)) === b.keysHash, 'Source positions changed: ' + b.name);
  }
  const baseline = new Map(m.baseline.identities.map(v => [v.id,v]));
  const current = new Map(before.items.map(v => [v.id,v]));
  const patches = new Map(), additions = [], decisions = new Map();
  const knownCandidates = new Map(m.candidates.map(c => [c.key,c]));
  const rules = plain(before.c.VOCAB_CORRECTION_RULES);
  rules.completionBySource = {};
  const sourceArrays = Object.fromEntries(levels.map(l => [l,plain(before.c['VOCAB_'+l])]));
  for (const b of batches) {
    assert.equal(b.version, 1, 'Unsupported batch version');
    for (const edit of b.updates || []) {
      validateReview(edit);
      assert(!patches.has(edit.id), 'Repeated update ' + edit.id);
      const original = baseline.get(edit.id), actual = current.get(edit.id);
      assert(original && actual && actual.word === original.word && actual.reading === original.reading, 'Unknown or changed target ' + edit.id);
      assert.equal(edit.word, original.word, 'Update spelling mismatch');
      assert.equal(edit.reading, original.reading, 'Update reading mismatch');
      assert.equal(edit.originalMeaning, original.meaning, 'Update sense mismatch');
      assert(Object.keys(edit.patch).every(f => ['meaning','notes','examples','aliases'].includes(f)), 'Protected update field');
      const result = {...actual,...edit.patch};
      if (original.originalNotes) assert(result.notes.includes(original.originalNotes), 'Existing useful note must be preserved: '+edit.id);
      validateContent(result);
      const patch = {...edit.patch, vocabularyCompletion:m.batch};
      (rules.completionBySource[original.source] ||= {})[original.index] = patch;
      patches.set(edit.id, patch);
    }
    for (const addition of b.additions || []) {
      validateReview(addition);
      validateContent(addition.entry);
      assert(nonempty(addition.levelBasis), 'Missing estimated level basis');
      assert(addition.entry.pitch === null, 'New pitch must remain unknown');
      assert(Object.keys(addition.entry).every(f => ['word','reading','romaji','meaning','type','category','notes','examples','aliases','level','pitch','verbGroup'].includes(f)), 'Unsupported addition field');
      assert(!additions.some(a => key(a.entry) === key(addition.entry)), 'Repeated addition');
      assert(!m.baseline.identities.some(v => key(v) === key(addition.entry)), 'Existing spelling/reading requires a sense update');
      const entry = {...addition.entry,vocabularyCompletion:m.batch};
      const array = sourceArrays[entry.level];
      const index = array.findIndex(v => key(v) === key(entry));
      if (index >= 0) {
        assert.equal(array[index].vocabularyCompletion, m.batch, 'Addition collides with unrelated source record');
        array[index] = entry;
      } else array.push(entry);
      additions.push(addition);
    }
    for (const d of b.decisions || []) {
      assert(knownCandidates.has(d.key) && !decisions.has(d.key), 'Unknown or repeated candidate decision');
      validateReview(d);
      assert(['added','verified-spelling-variant','additional-sense','additional-reading','excluded'].includes(d.disposition), 'Invalid disposition');
      assert(nonempty(d.reason), 'Missing decision reason');
      assert(Array.isArray(d.targets) && (d.disposition === 'excluded' ? d.targets.length === 0 : d.targets.length > 0), 'Invalid decision targets');
      decisions.set(d.key,d);
    }
  }
  const files = {};
  for (const l of levels) files['vocab-'+l.toLowerCase()+'.js'] = '// Teaching data; historical and completion authoring are documented in scripts.\nwindow.VOCAB_'+l+' = '+JSON.stringify(sourceArrays[l],null,2)+';\n';
  files['vocab-correction-rules.js'] = '// Reviewed normalization and completion rules; see scripts/vocabulary-completion.json.\nwindow.VOCAB_CORRECTION_RULES = '+JSON.stringify(rules,null,2)+';\n';
  const after = loadVocabulary(files).items;
  const byId = new Map(after.map(v => [v.id,v]));
  assert.equal(byId.size, after.length, 'Duplicate runtime identities');
  for (const old of m.baseline.identities) {
    const now = byId.get(old.id);
    assert(now && now.word === old.word && now.reading === old.reading && now.level === old.level, 'Existing identity/level lost: ' + old.id);
  }
  for (const [id,patch] of patches) for (const [f,value] of Object.entries(patch)) assert.deepStrictEqual(plain(byId.get(id)[f]), value, 'Update lost during normalization: '+id+'/'+f);
  for (const addition of additions) {
    const found = after.filter(v => key(v) === key(addition.entry));
    assert.equal(found.length,1,'Addition lost or duplicated');
    for (const [f,value] of Object.entries(addition.entry)) assert.deepStrictEqual(plain(found[0][f]),value,'Addition changed by normalization: '+f);
    assert([...decisions.values()].some(d => ['added','additional-reading'].includes(d.disposition) && d.targets.includes(key(addition.entry))), 'Addition lacks candidate decision');
  }
  assert.equal(after.length,m.baseline.identities.length+additions.length,'Unexpected runtime entry count');
  for (const d of decisions.values()) for (const target of d.targets) {
    const v = byId.get(target) || after.find(v => key(v) === target);
    assert(v, 'Decision target missing');
    if (['added','additional-reading'].includes(d.disposition)) assert(additions.some(a => key(a.entry) === key(v)), 'Claimed addition not authored');
    if (d.disposition === 'additional-sense') assert(patches.has(v.id) && patches.get(v.id).meaning, 'Sense decision requires authored meaning');
    if (d.disposition === 'verified-spelling-variant') {
      const candidate = knownCandidates.get(d.key);
      assert(candidate.reading.normalize('NFKC') === v.reading.normalize('NFKC'), 'Variant has a distinct reading');
      assert((v.aliases || []).includes(candidate.word), 'Verified spelling missing from aliases');
    }
  }
  return {files, items:after, patches, additions, decisions, manifest:m};
}
function legacyReport(plan) {
  const {items,patches,additions,decisions,manifest:m} = plan;
  const missingNotes = items.filter(v => !nonempty(v.notes)).length;
  const fewerThanTwo = items.filter(v => new Set((v.examples || []).map(e => sentenceKey(e.japanese || ''))).size < 2).length;
  const incompleteExamples = items.reduce((n,v) => n+(v.examples || []).filter(e=>!nonempty(e.japanese)||!nonempty(e.romaji)||!nonempty(e.german)).length,0);
  const unreviewedEntries = m.work.filter(w => !patches.has(w.id)).length;
  const unresolvedCandidates = m.candidates.length-decisions.size;
  return {complete:!missingNotes&&!fewerThanTwo&&!incompleteExamples&&!unreviewedEntries&&!unresolvedCandidates,
    total:items.length, counts:Object.fromEntries(levels.map(l=>[l,items.filter(v=>v.level===l).length])),
    updated:patches.size,added:additions.length,missingNotes,fewerThanTwo,incompleteExamples,unreviewedEntries,unresolvedCandidates,
    dispositions:Object.fromEntries([...new Set([...decisions.values()].map(d=>d.disposition))].map(s=>[s,[...decisions.values()].filter(d=>d.disposition===s).length]))};
}
function prepare(batches = authoring(), m = manifest(), corrections) {
  return require('./vocabulary-correction-pipeline.cjs').prepareCorrections(prepareLegacy(batches,m),corrections);
}
function report(plan) {
  return require('./vocabulary-correction-pipeline.cjs').correctionReport(plan,legacyReport(plan));
}
function importCompletion(options = {}) {
  const plan = prepare(options.batches);
  if (!options.dryRun) for (const [file,text] of Object.entries(plan.files)) {
    if (!fs.existsSync(path.join(root,file)) || read(file) !== text) fs.writeFileSync(path.join(root,file),text);
  }
  return report(plan);
}
module.exports = {manifest,authoring,prepare,prepareLegacy,report,importCompletion,validateContent,validateReview};
if (require.main === module) console.log(JSON.stringify(importCompletion({dryRun:process.argv.includes('--dry-run')}),null,2));
