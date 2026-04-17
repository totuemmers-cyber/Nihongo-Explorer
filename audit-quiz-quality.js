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
ctx.window = ctx;
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

ctx.app.sections.vocab.allItems = normalizedVocabSources.reduce(function (all, source) {
  return all.concat(source.items || []);
}, []);
ctx.app.sections.kanji.allItems = []
  .concat(ctx.KANJI_DATA || [])
  .concat(ctx.KANJI_N1 || []);
ctx.app.sections.grammar.allItems = (ctx.GRAMMAR_DATA || []);

const audit = ctx.QuizModule && ctx.QuizModule.audit;
if (!audit) {
  throw new Error('Quiz audit hooks are not available.');
}

const report = [];
const levels = audit.levels || [];
const types = Object.keys(audit.questionTypes || {});

types.forEach(function (typeId) {
  levels.forEach(function (level) {
    const stats = {
      type: typeId,
      level: level,
      generated: 0,
      nulls: 0,
      placeholders: 0,
      duplicateChoiceSets: 0
    };

    for (let i = 0; i < 100; i++) {
      const question = audit.generateQuestion(typeId, level);
      if (!question) {
        stats.nulls++;
        continue;
      }
      stats.generated++;
      if (question.choices.indexOf('\u2014') !== -1) stats.placeholders++;
      if ((new Set(question.choices)).size !== question.choices.length) stats.duplicateChoiceSets++;
    }

    report.push(stats);
  });
});

console.log(JSON.stringify({
  counts: {
    combinations: report.length,
    failingCombinations: report.filter(function (entry) {
      return entry.nulls || entry.placeholders || entry.duplicateChoiceSets;
    }).length
  },
  report: report
}, null, 2));
