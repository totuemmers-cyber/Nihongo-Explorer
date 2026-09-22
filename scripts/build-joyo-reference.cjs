// Extracts the Jōyō kanji reference from KANJIDIC2 (grades 1–6 and 8).
// Input: .content-cache/kanjidic2.xml.gz from http://www.edrdg.org/kanjidic/kanjidic2.xml.gz
// Output: scripts/joyo-kanji.json, used by audit-content.cjs and the kanji completion work.
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const root = path.resolve(__dirname, '..');
const xml = zlib.gunzipSync(fs.readFileSync(path.join(root, '.content-cache/kanjidic2.xml.gz'))).toString('utf8');
const field = (block, tag) => { const m = new RegExp('<' + tag + '>([^<]*)</' + tag + '>').exec(block); return m ? m[1] : null; };
const all = (block, pattern) => Array.from(block.matchAll(pattern), m => m[1]);

const kanji = [];
for (const [block] of xml.matchAll(/<character>[\s\S]*?<\/character>/g)) {
  const grade = Number(field(block, 'grade'));
  if (!(grade >= 1 && grade <= 6) && grade !== 8) continue;
  kanji.push({
    kanji: field(block, 'literal'),
    grade,
    // The first count is KANJIDIC2's standard; later ones are attested variant or common counts.
    strokeCounts: all(block, /<stroke_count>(\d+)<\/stroke_count>/g).map(Number)
  });
}
kanji.sort((a, b) => a.kanji.codePointAt(0) - b.kanji.codePointAt(0));

const reference = {
  source: {
    name: 'KANJIDIC2',
    url: 'http://www.edrdg.org/kanjidic/kanjidic2.xml.gz',
    license: 'CC BY-SA 4.0, Electronic Dictionary Research and Development Group',
    databaseVersion: field(xml, 'database_version'),
    dateOfCreation: field(xml, 'date_of_creation'),
    selection: 'grade 1–6 (Kyōiku) and grade 8 (remaining Jōyō)'
  },
  count: kanji.length,
  kanji
};
// One kanji per line keeps the reference small and its diffs readable.
const json = JSON.stringify(Object.assign({}, reference, { kanji: [] }), null, 2)
  .replace('"kanji": []', '"kanji": [\n' + kanji.map(k => '    ' + JSON.stringify(k)).join(',\n') + '\n  ]');
fs.writeFileSync(path.join(root, 'scripts/joyo-kanji.json'), json + '\n');
console.log(JSON.stringify({ joyo: kanji.length, databaseVersion: reference.source.databaseVersion }));
