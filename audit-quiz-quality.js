const fs = require('fs');
const vm = require('vm');

const DATA_FILES = [
  'grammar-data.js',
  'grammar-n2.js',
  'grammar-n1.js',
  'keigo-data.js',
  'vocab-n5.js',
  'vocab-n4.js',
  'vocab-n3.js',
  'vocab-n2.js',
  'vocab-n1.js',
  'yojijukugo-data.js',
  'idioms-data.js',
  'kana-data.js',
  'counters-data.js',
  'kangxi-radicals-data.js',
  'kanji-data.js',
  'kanji-n1.js',
  'onomatopoeia-data.js',
  'app-constants.js',
  'conjugation.js',
  'vocab-correction-rules.js',
  'vocab-example-overrides.js',
  'vocab-corrections.js',
  'grammar-lessons.js',
  'quiz.js'
];

const ctx = { window: {}, console };
// A reproducible sample makes a failing audit debuggable.
let randomSeed = 20260904;
ctx.Math = Object.create(Math);
ctx.Math.random = function () {
  randomSeed = (Math.imul(1664525, randomSeed) + 1013904223) >>> 0;
  return randomSeed / 4294967296;
};
ctx.window = ctx;
ctx.addEventListener = function () {};
ctx.document = {
  readyState: 'loading',
  addEventListener: function () {}
};
ctx.window.document = ctx.document;
ctx.GRAMMAR_DATA = [];
ctx.window.GRAMMAR_DATA = ctx.GRAMMAR_DATA;
ctx.app = {
  sections: {
    vocab: { allItems: [] },
    kanji: { allItems: [] },
    grammar: { allItems: [] }
  }
};
ctx.window.app = ctx.app;

DATA_FILES.forEach(function (file) {
  vm.runInNewContext(fs.readFileSync(file, 'utf8'), ctx, { filename: file });
});

const rawVocabSources = [
  { name: 'vocab-n5', items: ctx.VOCAB_N5 || [] },
  { name: 'vocab-n4', items: ctx.VOCAB_N4 || [] },
  { name: 'vocab-n3', items: ctx.VOCAB_N3 || [] },
  { name: 'vocab-n2', items: ctx.VOCAB_N2 || [] },
  { name: 'vocab-n1', items: ctx.VOCAB_N1 || [] },
  { name: 'yojijukugo', items: ctx.YOJIJUKUGO_DATA || [] },
  { name: 'idioms', items: ctx.IDIOMS_DATA || [] }
];
const normalizedVocabSources = ctx.getNormalizedVocabSources
  ? ctx.getNormalizedVocabSources(rawVocabSources)
  : rawVocabSources;

// Use the same merged inventory that learners can actually see.
const appSource = fs.readFileSync('app.js', 'utf8');
vm.runInNewContext(appSource.slice(appSource.indexOf('  var INTENTIONAL_VOCAB_OVERLAP_KEYS'), appSource.indexOf('  var sectionLoaders')), ctx);
ctx.app.sections.vocab.allItems = ctx.mergeVocabSources(normalizedVocabSources);
ctx.app.sections.kanji.allItems = []
  .concat(ctx.KANJI_DATA || [])
  .concat(ctx.KANJI_N1_DATA || []);
ctx.app.sections.grammar.allItems = (ctx.GRAMMAR_DATA || []);

const audit = ctx.QuizModule && ctx.QuizModule.audit;
if (!audit) {
  throw new Error('Quiz audit hooks are not available.');
}

const report = [];
const exhaustiveReview = require('./scripts/audit-quiz-review.cjs')(ctx, audit);
const levels = audit.levels || [];
const types = Object.keys(audit.questionTypes || {});
const invalidSpans = [];
const ambiguousVocabulary = [];
const clozeExamplesByLevel = {};
ctx.GRAMMAR_DATA.forEach(function (item) {
  (item.examples || []).forEach(function (example, index) {
    if (!example.cloze) return;
    clozeExamplesByLevel[item.level] = (clozeExamplesByLevel[item.level] || 0) + 1;
    const span = example.cloze;
    if (!Number.isInteger(span.start) || span.start < 0 || !span.answer ||
        example.japanese.slice(span.start, span.start + span.answer.length) !== span.answer) {
      invalidSpans.push({ id: item.id, example: index });
    }
  });
});

function normalizeReading(reading) {
  return reading.replace(/[.\-・\s]/g, '').replace(/[ァ-ヶ]/g, function (ch) {
    return String.fromCharCode(ch.charCodeAt(0) - 0x60);
  });
}
const fallbackExplanation = 'Erklärung mit unbekanntem Zeichen: 鬱';
if (audit.finalizeQuestion({ promptMain: 'かな', explanation: fallbackExplanation }, 'N5').explanation !== fallbackExplanation) throw Error('Feedback fallback lost original text');
if (audit.finalizeQuestion({ promptMain: '鬱', explanation: fallbackExplanation }, 'N5') !== null) throw Error('Scored prompt restrictions were relaxed');

function checkVocabularyAnswers(question, inventory) {
  let valid;
  if (question.type === 'vocabReading') {
    valid = inventory.filter(v => v.word === question.promptMain).map(v => normalizeReading(v.reading));
  } else if (question.type === 'vocabMeaning') {
    valid = inventory.filter(v => v.word === question.promptMain && normalizeReading(v.reading) === normalizeReading(question.promptSub)).map(v => v.meaning);
  } else if (question.type === 'vocabReverse') {
    valid = inventory.filter(v => v.meaning === question.promptMain).map(v => v.word);
  } else return;
  if (question.choices.some((choice, index) => index !== question.correctIndex &&
      valid.includes(question.type === 'vocabReading' ? normalizeReading(choice) : choice))) {
    ambiguousVocabulary.push({ type: question.type, prompt: question.promptMain, choices: question.choices });
  }
}

types.forEach(function (typeId) {
  levels.forEach(function (level) {
    const stats = {
      type: typeId,
      level: level,
      generated: 0,
      nulls: 0,
      placeholders: 0,
      duplicateChoiceSets: 0,
      ambiguousReadings: 0,
      invalidClozeAnswers: 0,
      invalidAnswerKeys: 0
    };

    for (let i = 0; i < 100; i++) {
      const question = audit.generateQuestion(typeId, level);
      if (!question) {
        stats.nulls++;
        continue;
      }
      stats.generated++;
      if (!question.explanation || !question.explanation.trim()) throw Error('Empty explanation: ' + typeId + '/' + level);
      if (typeId === 'conjugation') {
        const m = question.auditMeta;
        const item = ctx.app.sections.vocab.allItems.find(v => v.id === m.sourceEntryId);
        if (!item || item.__sourceName !== m.sourceName || item.__sourceIndex !== m.sourceIndex) throw Error('Missing source identity');
        const forms = ctx.resolveVocabVerbConjugation(item).result.forms;
        const target = forms[m.targetForm];
        if (!target || question.choices[question.correctIndex] !== target.japanese) throw Error('Unavailable or incorrect target');
        question.choices.forEach((choice, i) => {
          if (forms[m.choiceForms[i]]?.japanese !== choice) throw Error('Choice form audit mismatch');
          if (i !== question.correctIndex && (target.acceptedVariants || []).includes(choice)) throw Error('Accepted variant used as distractor');
        });
        if (level === 'N5') {
          if (!['polite','negative','past','te'].includes(m.targetForm)) throw Error('Advanced N5 target');
          if (m.choiceForms.some(k => !['dictionary','polite','negative','negPolite','past','pastPolite','pastNeg','pastNegPolite','te','volPolite'].includes(k))) throw Error('Advanced N5 distractor');
          if (/[\u3400-\u9faf]/.test(question.prompt + question.explanation)) throw Error('Non-German N5 conjugation label');
        }
      }
      checkVocabularyAnswers(question, ctx.app.sections.vocab.allItems);
      if (question.choices.indexOf('\u2014') !== -1) stats.placeholders++;
      if ((new Set(question.choices)).size !== question.choices.length) stats.duplicateChoiceSets++;
      if (question.choices.length !== 4 || !Number.isInteger(question.correctIndex) ||
          question.correctIndex < 0 || question.correctIndex >= question.choices.length) stats.invalidAnswerKeys++;
      if (typeId === 'kanjiReading') {
        const item = ctx.app.sections.kanji.allItems.find(function (k) { return k.kanji === question.promptMain; });
        const valid = (item.kun || []).concat(item.on || []).map(function (r) { return normalizeReading(r.kana); });
        if (question.choices.some(function (choice, index) {
          return index !== question.correctIndex && valid.includes(normalizeReading(choice));
        })) stats.ambiguousReadings++;
      }
      if (typeId === 'grammarCloze') {
        const answer = question.choices[question.correctIndex];
        if (answer !== question.auditMeta.clozeAnswer || /[～〜~\/／]/.test(answer) ||
            !question.promptMain.includes('＿＿＿')) stats.invalidClozeAnswers++;
        if ((level === 'N1' || level === 'N2' || level === 'N3') &&
            question.promptMain.replace('＿＿＿', answer) !== question.auditMeta.originalSentence) stats.invalidClozeAnswers++;
      }
    }

    report.push(stats);
  });
});

// Exercise the real new homophones and alternate readings in a concentrated pool.
const fullInventory = ctx.app.sections.vocab.allItems;
const focusedInventory = fullInventory.filter(v => ['四','七','九','一日','零','ゼロ','手','木','目','川','生','白','城'].includes(v.word));
ctx.app.sections.vocab.allItems = focusedInventory;
const focusedPrompts = new Set();
for (const type of ['vocabReading','vocabMeaning','vocabReverse']) {
  for (let i = 0; i < 200; i++) {
    const question = audit.generateQuestion(type, 'N5');
    if (!question) throw new Error('Focused vocabulary question could not be generated');
    focusedPrompts.add(question.promptMain);
    checkVocabularyAnswers(question, focusedInventory);
  }
}
for (const word of ['四','七','九','一日']) {
  if (!focusedPrompts.has(word)) throw new Error('Alternate-reading fixture not exercised: ' + word);
}
ctx.app.sections.vocab.allItems = fullInventory;

// Corrected readings/senses flow into the actual generators with the old IDs.
const correctionPool = fullInventory.filter(v=>v.level==='N1').slice(0,16)
  .concat(fullInventory.filter(v=>['vocab-n1:2987','vocab-n1:2461'].includes(v.id)));
ctx.app.sections.vocab.allItems = correctionPool;
const correctedSeen = new Set();
for (const type of ['vocabReading','vocabMeaning']) for(let i=0;i<250;i++) {
  const question=audit.generateQuestion(type,'N1');
  if(!question) throw Error('Corrected vocabulary question could not be generated');
  if(question.promptMain==='宥す' || question.promptMain==='宥める') {
    const item=correctionPool.find(v=>v.word===question.promptMain);
    const expected=type==='vocabReading'?item.reading:item.meaning;
    if(question.choices[question.correctIndex]!==expected) throw Error('Old correction leaked into quiz');
    correctedSeen.add(type+'/'+item.word);
  }
}
if(correctedSeen.size!==4) throw Error('Corrected lexical fixtures not exercised');
ctx.app.sections.vocab.allItems = fullInventory;

// Deliberately collide a target's accepted variant with another form's canonical
// answer. This must be filtered even though the strings differ from the target.
const variantFixture = JSON.parse(JSON.stringify(fullInventory.find(v => v.word === '食べる')));
variantFixture.level = 'N5';
variantFixture.conjugation.conjugationVariants = { negative: ['たべます'] };
ctx.app.sections.vocab.allItems = [variantFixture];
ctx.Math = Object.create(Math);
ctx.Math.random = () => 0.3;
const variantQuestion = audit.generateQuestion('conjugation', 'N5');
if (!variantQuestion || variantQuestion.auditMeta.targetForm !== 'negative' || variantQuestion.choices.includes('たべます')) throw Error('Variant collision was not excluded');
delete ctx.Math;
ctx.app.sections.vocab.allItems = fullInventory;

const failing = report.filter(function (entry) {
  return entry.nulls || entry.placeholders || entry.duplicateChoiceSets || entry.ambiguousReadings ||
    entry.invalidClozeAnswers || entry.invalidAnswerKeys;
});
console.log(JSON.stringify({
  counts: {
    combinations: report.length,
    exhaustiveReview: exhaustiveReview,
    failingCombinations: failing.length,
    invalidSpans: invalidSpans.length,
    ambiguousVocabulary: ambiguousVocabulary.length,
    focusedVocabularyQuestions: 600,
    kanji: ctx.app.sections.kanji.allItems.length,
    clozeExamplesByLevel: clozeExamplesByLevel
  },
  report: report,
  invalidSpans: invalidSpans,
  ambiguousVocabulary: ambiguousVocabulary
}, null, 2));
process.exitCode = failing.length || invalidSpans.length || ambiguousVocabulary.length ? 1 : 0;
