/* Furigana for example sentences: aligner rules (scripts/furigana.cjs) and the generated data. */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('node:assert/strict');
const furigana = require('./furigana.cjs');
const ROOT = path.resolve(__dirname, '..');

// --- Aligner rules on a small, fixed dictionary --------------------------------------------------
const pairs = [
  ['荷物', 'にもつ'], ['届く', 'とどく'], ['英語', 'えいご'], ['翻訳', 'ほんやく'], ['世界', 'せかい'],
  ['会社', 'かいしゃ'], ['弟', 'おとうと'], ['一緒', 'いっしょ'], ['年', 'ねん'], ['取り消す', 'とりけす']
].map(([word, reading]) => ({ word, reading }));
const kanji = [
  { kanji: '中', on: [{ kana: 'チュウ' }], kun: [{ kana: 'なか' }] },
  { kanji: '側', on: [{ kana: 'ソク' }], kun: [{ kana: 'がわ' }] },
  { kanji: '組', on: [{ kana: 'ソ' }], kun: [{ kana: 'く.む' }] }
];
const { align } = furigana.createAligner(furigana.buildReadingIndex({ pairs, kanji }));
const readings = (japanese, romaji) => align(japanese, romaji).readings;

assert.deepEqual(readings('荷物が届きました。', 'Nimotsu ga todokimashita.'), ['にもつ', 'とど']);
// Kana anchor the split even where two runs could trade kana (弟=おとう, 一緒=といっしょ fits too).
// 行 has no reading in this fixture, so it alone stays bare.
assert.deepEqual(readings('弟と一緒に行く。', 'Otōto to issho ni iku.'), ['おとうと', 'いっしょ', null]);
// Romaji without the apostrophe of hon'yaku: the attested ほんやく beats the literal ほにゃく.
assert.deepEqual(readings('英語に翻訳して。', 'Eigo ni honyaku shite.'), ['えいご', 'ほんやく']);
// Same sound, two spellings, nothing attests either: the standard じゅう wins over ぢゅう.
assert.deepEqual(readings('世界中で', 'Sekaijū de'), ['せかいじゅう']);
// A romaji typo inside a run cannot be confirmed: that run gets no furigana, the others keep theirs.
const typo = align('会社側の荷物', 'Kaishasha no nimotsu');
assert.deepEqual(typo.readings, [null, 'にもつ']);
assert.equal(typo.aligned[0], 'かいしゃしゃ');
// Digits take the spelled-out number, not the kanji after them.
assert.deepEqual(readings('1995年に', 'Sen kyūhyaku kyūjūgo-nen ni'), ['ねん']);
assert.deepEqual(readings('1995年に', '1995-nen ni'), ['ねん']);
// Verb stems as noun readings (組 くみ from く.む).
assert.deepEqual(readings('組の会社', 'Kumi no kaisha'), ['くみ', 'かいしゃ']);
// Two equally good splits and nothing to prefer one: no furigana at all.
assert.equal(align('甲の乙', 'Kononoko').error, 'ambiguous');
// Kana that contradict the romaji: no alignment.
assert.equal(align('荷物が届きました。', 'Nimotsu o todokimashita.').error, 'no-alignment');
assert.deepEqual(readings('ありがとう。', 'Arigatō.'), []);
assert.deepEqual(furigana.splitWordReading('取り消す', 'とりけす'), [['取', 'と'], ['消', 'け']]);

// --- The browser splits runs exactly like the build ------------------------------------------------
const configs = fs.readFileSync(path.join(ROOT, 'section-configs.js'), 'utf8');
const browserRe = /var FURIGANA_RUN_RE = (\/[^\n]+\/g);/.exec(configs);
assert(browserRe, 'FURIGANA_RUN_RE not found in section-configs.js');
assert.equal(browserRe[1], String(furigana.KANJI_RUN_RE), 'Browser and build split kanji runs differently');

// --- Generated data ---------------------------------------------------------------------------------
const c = { console }; c.window = c;
for (const file of ['vocab-runtime-details.js', 'example-furigana.js']) vm.runInNewContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), c, { filename: file });
const HAS_KANJI = new RegExp(furigana.KANJI_RUN_RE.source);
function checkEntry(japanese, text, where) {
  const runs = japanese.match(furigana.KANJI_RUN_RE) || [];
  const parts = text.split('|');
  assert.equal(parts.length, runs.length, where + ': furigana do not line up with ' + japanese);
  assert(parts.some(Boolean), where + ': empty furigana for ' + japanese);
  for (const part of parts) assert(/^[ぁ-ゖー]*$/.test(part), where + ': not hiragana: ' + part);
}
let sentences = 0, withFurigana = 0;
for (const details of c.VOCAB_RUNTIME_DETAILS) {
  for (const ex of details.examples || []) {
    if (!HAS_KANJI.test(ex.japanese)) { assert.equal(ex.furigana, undefined, 'Furigana on a kana sentence'); continue; }
    sentences++;
    if (ex.furigana === undefined) continue;
    withFurigana++;
    checkEntry(ex.japanese, ex.furigana, 'vocabulary');
  }
}
for (const [japanese, text] of Object.entries(c.EXAMPLE_FURIGANA)) checkEntry(japanese, text, 'example-furigana.js');
// Most sentences have furigana; a drop means the aligner or its readings regressed.
assert(withFurigana / sentences > 0.99, 'Only ' + withFurigana + ' of ' + sentences + ' vocabulary sentences have furigana');
assert(Object.keys(c.EXAMPLE_FURIGANA).length > 3500, 'example-furigana.js lost entries');

console.log('Furigana: aligner rules pass; ' + withFurigana + ' of ' + sentences + ' vocabulary sentences with kanji and ' +
  Object.keys(c.EXAMPLE_FURIGANA).length + ' other sentences carry furigana.');
