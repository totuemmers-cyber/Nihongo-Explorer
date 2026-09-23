// Idempotent import of authored grammar points from scripts/grammar-additions/*.json.
// Each file: { batch, entries: [grammar entry without cloze.quiz], reviews: [grammar-quiz-review records] }.
// Entries already present (by id) are left untouched, so reruns change nothing.
// --check validates everything in memory and writes nothing.
const fs = require('fs');
const path = require('path');
const assert = require('assert/strict');
const { applyReview, loadGroups } = require('./build-quiz-review.cjs');

const root = path.resolve(__dirname, '..');
const dir = path.join(__dirname, 'grammar-additions');
const reviewPath = path.join(__dirname, 'grammar-quiz-review.json');
const checkOnly = process.argv.includes('--check');
const FILE_BY_LEVEL = { N5: 'grammar-data.js', N4: 'grammar-data.js', N3: 'grammar-data.js', N2: 'grammar-n2.js', N1: 'grammar-n1.js' };
const CATEGORIES = new Set(['Partikel', 'Verben', 'Adjektive', 'Satzstrukturen']);
const norm = s => String(s).normalize('NFKC');
// Same key as scripts/audit-content.cjs: one entry per pattern and level.
const patternKey = g => g.level + '|' + norm(g.pattern).replace(/[～〜~\s]/g, '').split(/[/／]/).sort().join('/');

const groups = loadGroups();
const review = JSON.parse(fs.readFileSync(reviewPath, 'utf8'));
const all = () => groups.flatMap(g => g.items);
const byId = new Map(all().map(g => [g.id, g]));
const legacy = new Set(all().flatMap(g => g.legacyIds || []));
const patternOwners = new Map(all().map(g => [patternKey(g), g.id]));
// Any single variant already taught at any level also blocks an addition (e.g. an N2 copy of an N3 point).
const variants = g => norm(g.pattern).replace(/[～〜~\s]/g, '').split(/[/／]/).filter(Boolean);
const variantOwners = new Map(all().flatMap(g => variants(g).map(v => [v, g.id])));
const reviewKeys = new Set(review.records.map(r => r.grammarId + ':' + r.exampleIndex));

const batches = fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort() : [];
let added = 0, addedReviews = 0, backlinks = 0;
for (const name of batches) {
  const batch = JSON.parse(fs.readFileSync(path.join(dir, name), 'utf8'));
  assert(typeof batch.batch === 'string' && Array.isArray(batch.entries) && Array.isArray(batch.reviews), name + ': expected {batch, entries, reviews}');
  const reviewsById = new Map();
  for (const r of batch.reviews) {
    if (!reviewsById.has(r.grammarId)) reviewsById.set(r.grammarId, []);
    reviewsById.get(r.grammarId).push(r);
  }
  for (const entry of batch.entries) {
    const where = name + ' ' + entry.id;
    if (byId.has(entry.id)) continue;
    assert(/^[a-z0-9-]+$/.test(entry.id), where + ': id must be lowercase ascii with hyphens');
    assert(!legacy.has(entry.id), where + ': id is a retired legacy id');
    assert(FILE_BY_LEVEL[entry.level], where + ': unknown level');
    assert(CATEGORIES.has(entry.category), where + ': unknown category ' + entry.category);
    for (const field of ['pattern', 'meaning', 'explanation', 'formation', 'notes']) {
      assert(typeof entry[field] === 'string' && entry[field].trim(), where + ': missing ' + field);
    }
    assert(Array.isArray(entry.examples) && entry.examples.length >= 2, where + ': needs at least two examples');
    const sentences = new Set();
    for (const ex of entry.examples) {
      for (const field of ['japanese', 'romaji', 'german']) assert(typeof ex[field] === 'string' && ex[field].trim(), where + ': example missing ' + field);
      assert(!sentences.has(ex.japanese), where + ': repeated example');
      sentences.add(ex.japanese);
      if (ex.cloze) {
        assert(!ex.cloze.quiz, where + ': quiz data belongs in reviews');
        assert.equal(ex.japanese.slice(ex.cloze.start, ex.cloze.start + ex.cloze.answer.length), ex.cloze.answer, where + ': bad cloze span');
      }
    }
    assert(entry.examples[0].cloze, where + ': first example needs a cloze');
    const owner = patternOwners.get(patternKey(entry));
    assert(!owner, where + ': pattern already taught by ' + owner);
    for (const v of variants(entry)) assert(!variantOwners.has(v), where + ': ' + v + ' already taught by ' + variantOwners.get(v));
    for (const id of entry.related || []) assert(id !== entry.id, where + ': self-link');
    const records = reviewsById.get(entry.id) || [];
    assert(records.length, where + ': missing quiz review record');
    const file = groups.find(g => g.file === FILE_BY_LEVEL[entry.level]);
    file.items.push(entry);
    byId.set(entry.id, entry);
    patternOwners.set(patternKey(entry), entry.id);
    for (const v of variants(entry)) variantOwners.set(v, entry.id);
    added++;
    for (const r of records) {
      const key = r.grammarId + ':' + r.exampleIndex;
      if (reviewKeys.has(key)) continue;
      review.records.push(r);
      reviewKeys.add(key);
      addedReviews++;
    }
  }
}

// Related ids may point at existing entries or at other new entries; link both directions.
// Only authored entries are touched, so existing one-way links stay as they are.
const authoredIds = new Set(batches.flatMap(name => JSON.parse(fs.readFileSync(path.join(dir, name), 'utf8')).entries.map(e => e.id)));
for (const g of all().filter(g => authoredIds.has(g.id))) {
  for (const id of g.related || []) {
    const target = byId.get(id);
    assert(target, g.id + ' has unresolved related id ' + id);
    target.related = target.related || [];
    if (!target.related.includes(g.id)) { target.related.push(g.id); backlinks++; }
  }
}

applyReview(groups, review.records);
if (checkOnly) {
  console.log('Checked ' + batches.length + ' batch file(s): ' + added + ' new entries, ' + addedReviews + ' new reviews, ' + backlinks + ' back-links. Nothing written.');
} else {
  for (const { file, items } of groups) {
    const prefix = file === 'grammar-data.js' ? 'window.GRAMMAR_DATA = ' : 'window.GRAMMAR_DATA.push.apply(window.GRAMMAR_DATA, ';
    const suffix = file === 'grammar-data.js' ? ';\n' : ');\n';
    fs.writeFileSync(path.join(root, file), '// Teaching data; editorial sources in scripts/.\n' + prefix + JSON.stringify(items, null, 2) + suffix);
  }
  fs.writeFileSync(reviewPath, JSON.stringify(review, null, 2) + '\n');
  console.log('Added ' + added + ' grammar entries, ' + addedReviews + ' reviews, ' + backlinks + ' back-links.');
}
