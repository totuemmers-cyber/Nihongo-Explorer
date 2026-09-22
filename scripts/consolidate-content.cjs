// Idempotent editorial consolidation of duplicate grammar points and a misspelled onomatopoeia headword.
// Retired IDs stay reachable through `legacyIds` (bookmarks, deep links, restored sessions).
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { applyReview } = require('./build-quiz-review.cjs');

const root = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const pendingWrites = new Map();

function load(name, key) {
  const c = { GRAMMAR_DATA: [] };
  c.window = c;
  vm.runInNewContext(read(name), c);
  return c[key];
}
function save(name, key, items, header, push) {
  pendingWrites.set(name, header + (push ? 'window.' + key + '.push.apply(window.' + key + ', ' : 'window.' + key + ' = ') +
    JSON.stringify(items, null, 2) + (push ? ');' : ';') + '\n');
}

const grammarFiles = ['grammar-data.js', 'grammar-n2.js', 'grammar-n1.js', 'keigo-data.js'];
const grammar = grammarFiles.map(file => ({ file, items: load(file, 'GRAMMAR_DATA') }));
const all = () => grammar.flatMap(f => f.items);
const byId = id => all().find(g => g.id === id);
const reviewPath = 'scripts/grammar-quiz-review.json';
const review = JSON.parse(read(reviewPath));

// Two N1 entries taught 極まりない. The kept entry has the correct formation (na-adjective/noun only);
// the retired one listed い-adjective stems. Its distinct example sentences move to the kept entry.
const MERGES = [{ keep: 'n1-kiwamarinai', retire: 'n1-kiwamari-nai' }];
for (const { keep, retire } of MERGES) {
  const target = byId(keep);
  if (!target) throw new Error('Missing surviving grammar entry ' + keep);
  const source = byId(retire);
  if (source) {
    for (const ex of source.examples) {
      if (target.examples.some(e => e.japanese === ex.japanese)) continue;
      // The retired first example restates the kept one; reviewed quiz data is tied to its old position.
      if (ex.cloze && ex.cloze.quiz) continue;
      // Match the surviving entry's romanization of the pattern.
      ex.romaji = ex.romaji.replace(/kiwamari nai/g, 'kiwamarinai');
      target.examples.push(ex);
    }
    target.related = [...new Set([...(target.related || []), ...(source.related || [])])].filter(id => id !== keep && id !== retire);
    target.legacyIds = [...new Set([...(target.legacyIds || []), retire])];
    for (const f of grammar) f.items = f.items.filter(g => g.id !== retire);
    review.records = review.records.filter(r => r.grammarId !== retire);
  }
  for (const g of all()) if (g.related) g.related = [...new Set(g.related.map(id => id === retire ? keep : id))].filter(id => id !== g.id);
}

// The keigo lens teaches the same request form; link both so neither is a dead end.
const LINKS = [['keigo-teinei-itadakemasenka', 'n4-te-itadakemasenka']];
for (const [a, b] of LINKS) {
  for (const [from, to] of [[a, b], [b, a]]) {
    const g = byId(from);
    if (!g) throw new Error('Missing grammar entry ' + from);
    g.related = g.related || [];
    if (!g.related.includes(to)) g.related.push(to);
  }
}

// Validate reviewed quiz data against the edited sources before anything is written.
applyReview(grammar, review.records);
for (const f of grammar) {
  save(f.file, 'GRAMMAR_DATA', f.items, '// Teaching data; editorial sources in scripts/.\n', f.file !== 'grammar-data.js');
}
pendingWrites.set(reviewPath, JSON.stringify(review, null, 2) + '\n');

const ono = load('onomatopoeia-data.js', 'ONOMATOPOEIA_DATA');
const HEADWORDS = [{ id: 'onomatopoeia:305', from: 'ちゃほや', word: 'ちやほや', romaji: 'chiyahoya',
  notes: 'Fast immer als ちやほやする verwendet; auch in Katakana (チヤホヤ) geschrieben.' }];
for (const fix of HEADWORDS) {
  const o = ono.find(x => x.id === fix.id);
  if (!o) throw new Error('Missing onomatopoeia entry ' + fix.id);
  if (o.word === fix.from) {
    o.word = fix.word;
    o.reading = fix.word;
    o.romaji = fix.romaji;
    o.notes = fix.notes;
    // The stored accent belonged to the misspelled form and was never sourced.
    o.pitch = null;
  }
}
save('onomatopoeia-data.js', 'ONOMATOPOEIA_DATA', ono, '// Teaching data; editorial additions tracked in scripts/*.tsv.\n', false);

for (const [name, contents] of pendingWrites) fs.writeFileSync(path.join(root, name), contents);
console.log(JSON.stringify({ merged: MERGES.length, linked: LINKS.length, headwords: HEADWORDS.length }));
