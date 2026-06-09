// ============================================================
// Audit: typed-answer checking (romaji-kana.js + answer-check.js)
// Loads both pure modules into a shared context and asserts romaji->kana
// conversion plus answer grading (correct / near / wrong, by card type).
// Run: node audit-answer.js   (exit 0 = pass)
// ============================================================
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const failures = [];
function check(name, cond) { if (!cond) failures.push(name); }

function load() {
  const window = {};
  const context = { window, console, Math };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(__dirname, 'romaji-kana.js'), 'utf8'), context, { filename: 'romaji-kana.js' });
  vm.runInContext(fs.readFileSync(path.join(__dirname, 'answer-check.js'), 'utf8'), context, { filename: 'answer-check.js' });
  return { RK: window.RomajiKana, AC: window.AnswerCheck };
}

const { RK, AC } = load();

// === A1: romaji -> hiragana ===
(function () {
  const k = RK.romajiToKana;
  check('A1 basic syllables', k('gakusei') === 'がくせい');
  check('A1 syllabic n before consonant', k('shinbun') === 'しんぶん');
  check('A1 sokuon (double consonant)', k('gakkou') === 'がっこう');
  check('A1 small tsu + p', k('kippu') === 'きっぷ');
  check('A1 youon', k('kyapan'.slice(0, 3)) === 'きゃ');
  check('A1 konnichiwa keeps に', k('konnichiwa') === 'こんにちわ');
  check('A1 kana passes through', k('たべる') === 'たべる');
  check('A1 wo / shi variants', k('wo') === 'を' && k('shi') === 'し' && k('si') === 'し');
})();

// === A2: reading cards accept typed romaji, with a typo tolerance ===
(function () {
  const card = { promptType: 'reading', question: { answer: 'たべる' } };
  check('A2 romaji reading is correct', AC.checkAnswer('taberu', card).correct === true);
  check('A2 kana reading is correct', AC.checkAnswer('たべる', card).correct === true);
  const near = AC.checkAnswer('tabero', card); // たべろ vs たべる -> 1 edit
  check('A2 one-off reading is near, not correct', near.correct === false && near.near === true);
  const wrong = AC.checkAnswer('inu', card);
  check('A2 unrelated reading is wrong', wrong.correct === false && wrong.near === false);
  check('A2 empty input is not correct', AC.checkAnswer('', card).correct === false);
})();

// === A3: meaning cards split synonyms and tolerate a typo ===
(function () {
  const card = { promptType: 'meaning', question: { answer: 'essen, fressen' } };
  check('A3 first synonym correct', AC.checkAnswer('essen', card).correct === true);
  check('A3 second synonym correct', AC.checkAnswer('fressen', card).correct === true);
  check('A3 case-insensitive', AC.checkAnswer('Essen', card).correct === true);
  check('A3 parenthetical stripped', AC.checkAnswer('essen', { promptType: 'meaning', question: { answer: 'essen (Verb)' } }).correct === true);
  const near = AC.checkAnswer('esen', card); // typo of essen
  check('A3 typo is near', near.correct === false && near.near === true);
  check('A3 unrelated is wrong', AC.checkAnswer('trinken', card).near === false);
})();

// === A4: grammar cloze accepts any pattern variant in kana ===
(function () {
  const card = { promptType: 'cloze', question: { answer: '～から／〜ので' } };
  check('A4 first variant via romaji', AC.checkAnswer('kara', card).correct === true);
  check('A4 second variant via kana', AC.checkAnswer('ので', card).correct === true);
})();

// === A6: kanji reading cards accept any single kun/on reading ===
(function () {
  const card = { promptType: 'reading', section: 'kanji', question: { answer: 'Kun: ひと-, ひと.つ\nOn: イチ, イツ' } };
  check('A6 kun stem via romaji', AC.checkAnswer('hito', card).correct === true);
  check('A6 kun full form (okurigana)', AC.checkAnswer('hitotsu', card).correct === true);
  check('A6 on reading via romaji', AC.checkAnswer('ichi', card).correct === true);
  check('A6 on reading via katakana', AC.checkAnswer('イツ', card).correct === true);
  check('A6 unrelated reading is wrong', AC.checkAnswer('sora', card).correct === false);
  const noKun = { promptType: 'reading', section: 'kanji', question: { answer: 'Kun: -\nOn: ゴ' } };
  check('A6 "-" placeholder is not an answer', AC.checkAnswer('-', noKun).correct === false);
  check('A6 on-only card accepts reading', AC.checkAnswer('go', noKun).correct === true);
})();

// === A7: long-vowel mark ー matches doubled-vowel typing ===
(function () {
  const card = { promptType: 'reading', section: 'vocab', question: { answer: 'コーヒー' } };
  check('A7 doubled vowels match choon', AC.checkAnswer('koohii', card).correct === true);
  check('A7 hyphen choon still matches', AC.checkAnswer('ko-hi-', card).correct === true);
  check('A7 katakana input matches', AC.checkAnswer('コーヒー', card).correct === true);
  check('A7 unrelated is wrong', AC.checkAnswer('ocha', card).correct === false);
})();

// === A5: non-checkable cards return null (caller falls back to self-grading) ===
(function () {
  check('A5 reverse not checkable', AC.checkAnswer('x', { promptType: 'reverse', question: { answer: 'a (b)' } }) === null);
  check('A5 isCheckable flags', AC.isCheckable({ promptType: 'reading' }) === true && AC.isCheckable({ promptType: 'formation' }) === false);
})();

console.log(JSON.stringify({ passed: failures.length === 0, failures: failures }, null, 2));
process.exit(failures.length > 0 ? 1 : 0);
