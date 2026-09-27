// Romanization: Modified Hepburn generator for authored headwords (long vowels with macrons).
const assert = require('node:assert/strict');
const romanize = require('./vocabulary-romaji.cjs');

const cases = [
  ['とうきょう', {}, 'tōkyō'],
  ['おおきい', {}, 'ōkii'],
  ['がっこう', {}, 'gakkō'],
  ['りょうり', {}, 'ryōri'],
  ['ちゅうもん', {}, 'chūmon'],
  ['おかあさん', {}, 'okāsan'],
  ['おねえさん', {}, 'onēsan'],
  ['せんせい', {}, 'sensei'],          // えい stays ei
  ['おいしい', {}, 'oishii'],          // native いい stays ii
  ['コーヒー', {}, 'kōhī'],            // katakana ー after i is ī
  ['スーパー', {}, 'sūpā'],
  ['こんや', {}, "kon'ya"],
  ['おもう', { verb: true }, 'omou'],  // a verb's final う is not a long vowel
  ['いう', { verb: true }, 'iu'],
  ['みずうみ', { pron: 'ミズウミ' }, 'mizuumi'],  // UniDic pronunciation settles boundaries
  ['とうきょう', { pron: 'トーキョー' }, 'tōkyō']
];
for (const [reading, options, expected] of cases) assert.equal(romanize.hepburn(reading, options), expected, reading);
// The legacy kana-faithful output used by scripts/import-vocabulary-additions.cjs is unchanged.
assert.equal(romanize('とうきょう'), 'toukyou');

// vocab-romaji-hepburn.js: every span must still match the reviewed vocabulary string and change only
// vowel length. A failure means an entry's romaji was edited after the layer was generated: regenerate
// the layer (.content-cache/romaji) or author the entry in Hepburn directly.
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { loadVocabulary } = require('./vocabulary-tools.cjs');
const root = path.resolve(__dirname, '..');
const { items, c } = loadVocabulary();
vm.runInNewContext(fs.readFileSync(path.join(root, 'vocab-romaji-hepburn.js'), 'utf8'), c);
const layer = c.VOCAB_ROMAJI_HEPBURN;
const bySource = new Map(items.map(v => [v.source + ':' + v.__sourceIndex, v]));
const fold = s => s.toLowerCase().normalize('NFD').replace(/[̄̂]/g, '').normalize('NFC')
  .replace(/o[ou]/g, 'o').replace(/([aeiu])\1/g, '$1');
const LONG = /^(?:[\u0101\u012b\u016b\u0113\u014d]|ii|ei)$/i;
let strings = 0;
const stale = [];
for (const [source, entries] of Object.entries(layer)) {
  for (const [index, fields] of Object.entries(entries)) {
    const v = bySource.get(source + ':' + index);
    assert(v, 'Layer entry without vocabulary item: ' + source + ':' + index);
    for (const [field, hash, spans] of fields) {
      const text = field === 'r' ? v.romaji : v.examples[field] && v.examples[field].romaji;
      if (typeof text !== 'string' || c.getVocabRomajiHash(text) !== hash) { stale.push(v.id + '#' + field); continue; }
      let last = -1;
      for (const [start, length, replacement] of spans) {
        assert(start > last && start + length <= text.length, 'Overlapping or out-of-range span: ' + v.id + '#' + field);
        const original = text.slice(start, start + length);
        assert(LONG.test(replacement) && /^[aeiou\u0101\u012b\u016b\u0113\u014d\u00e2\u00ee\u00fb\u00ea\u00f4]{1,2}h?$/i.test(original) && fold(original) === fold(replacement),
          'Span changes more than vowel length: ' + v.id + '#' + field + ' ' + original + '→' + replacement);
        last = start + length - 1;
      }
      strings++;
    }
  }
}
assert.deepEqual(stale, [], 'Stale romaji layer entries (romaji changed after generation)');
console.log('Romaji checks passed: ' + cases.length + ' Hepburn cases, ' + strings + ' layer strings.');
