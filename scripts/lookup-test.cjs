/* Lookup of inflected forms and sentences (japanese-lookup.js) against the real vocabulary,
   grammar and kanji data: fixed examples, false-match guards, the search score, every form the
   conjugation tables show on a card, sentence splitting and its speed. The dialog itself is
   covered by search-test.cjs. */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('node:assert/strict');
const ROOT = path.resolve(__dirname, '..');

const context = { console };
context.window = context;
for (const file of ['conjugation.js', 'vocab-runtime.js', 'grammar-data.js', 'grammar-n2.js', 'grammar-n1.js', 'keigo-data.js',
  'kanji-data.js', 'kanji-n1.js', 'japanese-lookup.js']) {
  vm.runInNewContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), context, { filename: file });
}
const lookup = context.NIHONGO_LOOKUP;
const vocab = context.VOCAB_RUNTIME.items;
const sources = { vocab, grammar: context.GRAMMAR_DATA, kanji: [...context.KANJI_DATA, ...context.KANJI_N1_DATA] };
// Arrays from the data context belong to another realm: copy them for deepEqual.
const words = form => Array.from(lookup.vocabularyMatches(form, vocab), m => m.item.word);
const best = form => {
  const [m] = lookup.vocabularyMatches(form, vocab);
  return m ? [m.item.word, lookup.describe(m.reasons)] : null;
};

// --- Inflected forms find their dictionary form, with what was undone --------------------------
assert.deepEqual(best('食べられなかった'), ['食べる', 'Potenzial oder Passiv · Verneinung · Vergangenheit']);
assert.deepEqual(best('高くない'), ['高い', 'Verneinung']);
assert.deepEqual(best('読んでいる'), ['読む', '～ている']);
assert.deepEqual(best('見せて'), ['見せる', 'て-Form']);
assert.deepEqual(best('待たされた'), ['待つ', 'Kausativ-Passiv · Vergangenheit']);
assert.deepEqual(best('書かせられた'), ['書く', 'Kausativ-Passiv · Vergangenheit']);
assert.deepEqual(best('来なかった'), ['来る', 'Verneinung · Vergangenheit']);
assert.deepEqual(best('帰っちゃった'), ['帰る', '～ちゃう · Vergangenheit']);
assert.deepEqual(best('食べてる'), ['食べる', '～ている']);
assert.deepEqual(best('気に入った'), ['気に入る', 'Vergangenheit']);
assert.deepEqual(best('静かな'), ['静か', '＋な']);
assert.deepEqual(best('よかった'), ['良い', 'Vergangenheit']);
assert.deepEqual(best('勉強しています'), ['勉強する', '～ている · Höflich']);
// Kana input reaches kanji headwords through their reading.
assert.deepEqual(best('たべた'), ['食べる', 'Vergangenheit']);
assert.deepEqual(best('こなかった'), ['来る', 'Verneinung · Vergangenheit']);
// 行った is the past of both 行く (いく, ゆく) and 行う; all three are offered.
assert.deepEqual(words('行った').sort(), ['行う', '行く', '行く'].sort());
// A する noun is found through its verb: 不足している → 不足 (group suru).
assert(words('不足している').includes('不足'));
// ずる verbs through their じる forms; honorific stems in い.
assert(words('演じました').includes('演ずる'));
assert(words('仰いました').includes('仰る'));
assert(words('いらっしゃいます').includes('いらっしゃる'));

// --- No false matches through the kind checks ------------------------------------------------
assert(!words('さかな').includes('坂'), 'さかな is not 坂 + な (坂 is no な-adjective)');
assert(!words('なに').some(w => w !== '何'), 'なに finds only 何');
assert(!words('おいしそう').some(w => /^(甥|老い)$/.test(w)), 'おいしそう is not 甥 + する + そう');
assert(!words('かった').includes('い'), 'かった does not reduce to a noun い');
assert.deepEqual(lookup.deinflect('').length, 0);

// --- The vocabulary search score ----------------------------------------------------------------
const taberu = vocab.find(v => v.word === '食べる');
assert.deepEqual(JSON.parse(JSON.stringify(lookup.inflection(taberu, '食べた', vocab))), { reasons: ['past'], score: 940 });
assert.equal(lookup.inflection(taberu, '食べる', vocab), null, 'The dictionary form itself is no inflection');
assert.equal(lookup.inflection(taberu, 'eat', vocab), null, 'Latin queries are left to the other matching');
// When the query is itself a word (まえ = 前), its inflected readings rank lower (舞え → 舞う).
const mau = vocab.find(v => v.word === '舞う');
assert.equal(lookup.inflection(mau, 'まえ', vocab).score, 790);

// --- Every form the conjugation tables show on a card leads back to the card ----------------------
let forms = 0, found = 0;
const misses = [];
for (const v of vocab) {
  if (v.type !== 'Verb') continue;
  const conjugation = context.resolveVocabVerbConjugation(v);
  if (!conjugation) continue;
  const reading = conjugation.reading;
  for (const form of Object.values(conjugation.result.forms)) {
    for (const kana of [form.japanese, ...(form.acceptedVariants || [])]) {
      // The same form written with the headword's kanji: 食べる + たべた → 食べた.
      let p = 0;
      while (p < reading.length && p < kana.length && reading[p] === kana[p]) p++;
      const tail = reading.slice(p);
      const written = v.word.endsWith(tail) ? v.word.slice(0, v.word.length - tail.length) + kana.slice(p) : null;
      for (const text of [kana, written]) {
        if (!text || text === v.word || text === v.reading) continue;
        forms++;
        if (lookup.vocabularyMatches(text, vocab).some(m => m.item === v)) found++;
        else misses.push(text + ' ← ' + v.word);
      }
    }
  }
}
assert(forms > 90000, 'Conjugated forms checked: ' + forms);
// Known gaps: ない/なかった belong to their own entry (not ある), 問うた, 察せる, 行く read ゆく.
assert(found / forms >= 0.998, 'Conjugated forms found: ' + found + '/' + forms + '; e.g. ' + misses.slice(0, 10).join(', '));

// --- Sentences ------------------------------------------------------------------------------------
const show = text => Array.from(lookup.segment(text, sources), t =>
  t.kind === 'vocab' ? t.text + '=' + t.matches[0].item.word : t.kind === 'grammar' ? '[' + t.text + ']' : t.kind === 'kanji' ? '{' + t.text + '}' : '"' + t.text + '"');
assert.deepEqual(show('昨日は雨が降っていました。'), ['昨日=昨日', '[は]', '雨=雨', '[が]', '降っていました=降る', '"。"']);
// After a word in kanji, は/が/を … are particles: not 私 + はし (箸) + ごと.
assert.deepEqual(show('私はしごとが好きです'), ['私=私', '[は]', 'しごと=仕事', '[が]', '好きです=好き']);
assert.deepEqual(show('わたしはがくせいです'), ['わたし=私', '[は]', 'がくせいです=学生']);
// Kana-only text: the cheapest reading wins over a long false word (の + が + すき, not 逃す).
assert.deepEqual(show('本をよむのがすきです'), ['本=本', '[を]', 'よむ=読む', '[の]', '[が]', 'すきです=好き']);
assert.deepEqual(show('コーヒーを飲みながら新聞を読んでいます'),
  ['コーヒー=コーヒー', '[を]', '飲みながら=飲む', '新聞=新聞', '[を]', '読んでいます=読む']);
// A suffix right after a number: 円 is yen there.
assert.deepEqual(show('五百円です'), ['五=五', '百=百', '円です=〜円']);
// Kanji without a word link to their kanji card; an unknown loanword stays one piece.
assert.deepEqual(show('持待'), ['{持}', '{待}']);
assert.deepEqual(show('ズィギリスに行く'), ['"ズィギリス"', '[に]', '行く=行く']);
// Latin text and punctuation pass through untouched.
assert.deepEqual(show('JLPT N3の本'), ['"JLPT N3"', '[の]', '本=本']);

// A whole passage: at most MAX_TEXT characters, fast enough to run on every keystroke.
const passage = '共同作業室の利用案内。一般会員は月額四千円で平日の九時から十八時まで利用できます。'.repeat(10);
const started = process.hrtime.bigint();
const tokens = lookup.segment(passage, sources);
const ms = Number(process.hrtime.bigint() - started) / 1e6;
assert.equal(tokens.map(t => t.text).join(''), passage.slice(0, lookup.MAX_TEXT), 'Tokens cover the text exactly');
assert(ms < 1500, 'Splitting ' + lookup.MAX_TEXT + ' characters took ' + ms.toFixed(0) + ' ms');

console.log('Lookup test passed: ' + found + '/' + forms + ' conjugated forms, sentences, guards, ' +
  lookup.MAX_TEXT + ' characters in ' + ms.toFixed(0) + ' ms.');
