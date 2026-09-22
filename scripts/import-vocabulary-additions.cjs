// Idempotent append-only import. Source positions are part of bookmark identity.
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const crypto = require('crypto');
const { root, levels, read, key, loadVocabulary } = require('./vocabulary-tools.cjs');
const romanize = require('./vocabulary-romaji.cjs');
const batch = '2026-09-jlpt-vocabulary';
function authoredEntries() {
  const entries = ['scripts/vocabulary-additions.tsv','scripts/vocabulary-everyday-additions.tsv'].flatMap(file => read(file).split(/\r?\n/)).filter(s => s.trim() && !s.startsWith('#')).map((line,i) => {
    const row = line.split('|');
    assert(row.length === 13 || row.length === 14, 'Invalid TSV row '+(i+1));
    const [level,word,reading,meaning,type,category,notes,jp,r,de,jp2,r2,de2,verbGroup] = row;
    const item = { level,word,reading,romaji:romanize(reading),meaning,type,category,notes,
      examples:[{kind:'teaching',japanese:jp,romaji:r,german:de},{kind:'natural',japanese:jp2,romaji:r2,german:de2}] };
    if (verbGroup) item.verbGroup = verbGroup;
    return item;
  }).concat(require('./vocabulary-number-additions.cjs')());
  const keys = new Set();
  for (const item of entries) {
    assert(!keys.has(key(item)), 'Repeated authored entry '+key(item)); keys.add(key(item));
    assert(levels.includes(item.level), 'Invalid level '+key(item));
    assert(item.examples.length >= 2 && item.examples[0].japanese !== item.examples[1].japanese, 'Distinct contexts required '+key(item));
    for (const e of item.examples) {
      assert(e.japanese && e.romaji && e.german, 'Missing example field '+key(item));
      assert(!/[ぁ-ヿ一-龯]/.test(e.romaji), 'Japanese in romaji '+key(item));
    }
    item.pitch = null;
    item.vocabularyBatch = batch;
  }
  return entries;
}
function importEntries() {
  const review = JSON.parse(read('scripts/vocabulary-review.json'));
  const before = loadVocabulary();
  // Validate the historical import against its own normalized view. A later
  // documented merge may have retired an authored ID or changed its spelling.
  // Keep the full correction rules and appended records when writing below.
  const historicalRules = JSON.parse(JSON.stringify(before.c.VOCAB_CORRECTION_RULES));
  for (const field of ['correctionsBySource','completionRedirects','stableIdsBySource']) delete historicalRules[field];
  const historicalFiles = {'vocab-correction-rules.js':'window.VOCAB_CORRECTION_RULES = '+JSON.stringify(historicalRules)+';'};
  for (const level of levels) historicalFiles['vocab-'+level.toLowerCase()+'.js'] = 'window.VOCAB_'+level+' = '+JSON.stringify(before.c['VOCAB_'+level].filter(v=>!v.correctionId))+';';
  const historicalItems = loadVocabulary(historicalFiles).items;
  const entries = authoredEntries();
  assert.deepStrictEqual(entries.map(key).sort(), review.additions.map(x=>x.key).sort(), 'Authored content and reviewed selections differ');
  for (const source of before.sources) {
    const baseline = review.baseline.sources.find(b => b.name === source.name);
    const hash = crypto.createHash('sha256').update(JSON.stringify(source.items.slice(0,baseline.count).map(key))).digest('hex');
    assert.equal(hash, baseline.keysHash, 'Existing source positions changed: '+source.name);
  }
  let added = 0;
  for (const entry of entries) {
    const existing = historicalItems.find(v => key(v) === key(entry));
    assert(!existing || existing.vocabularyBatch === batch, 'Attempt to duplicate an existing sense: '+key(entry));
    const items = before.c['VOCAB_'+entry.level];
    const index = items.findIndex(v => key(v) === key(entry));
    // Keep later lexical metadata (especially reviewed conjugation) on replay.
    if (index < 0) { items.push(entry); added++; } else items[index] = Object.assign({}, items[index], entry);
  }
  for (const level of levels) {
    const file = path.join(root,'vocab-'+level.toLowerCase()+'.js');
    const text = '// Teaching data; additions documented in scripts/vocabulary-review.json.\nwindow.VOCAB_'+level+' = '+JSON.stringify(before.c['VOCAB_'+level],null,2)+';\n';
    if (fs.readFileSync(file,'utf8') !== text) fs.writeFileSync(file,text);
  }
  // Patch the existing source-specific normalization layer rather than moving records.
  for (const fix of review.levelCorrections) {
    const rules = before.c.VOCAB_CORRECTION_RULES.bySource;
    const source = rules[fix.source] || (rules[fix.source] = {});
    source[fix.rawKey] = Object.assign({},source[fix.rawKey],{level:fix.to});
  }
  const rulesFile = path.join(root,'vocab-correction-rules.js');
  const rulesText = '// Reviewed normalization rules; JLPT changes documented in scripts/vocabulary-review.json.\nwindow.VOCAB_CORRECTION_RULES = '+JSON.stringify(before.c.VOCAB_CORRECTION_RULES,null,2)+';\n';
  if (fs.readFileSync(rulesFile,'utf8') !== rulesText) fs.writeFileSync(rulesFile,rulesText);
  console.log(JSON.stringify({added,reviewedAdditions:entries.length,levelCorrections:review.levelCorrections.length}));
}
module.exports = { authoredEntries, batch };
if (require.main === module) importEntries();
