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
console.log('Romaji checks passed: ' + cases.length + ' Hepburn cases.');
