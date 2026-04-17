const fs = require('fs');
const vm = require('vm');
const https = require('https');

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

const SOURCE_URLS = {
  N5: [
    'https://jlptsensei.com/jlpt-n5-vocabulary-list/',
    'https://japanesetest4you.com/jlpt-n5-vocabulary-list/'
  ],
  N4: [
    'https://jlptsensei.com/jlpt-n4-vocabulary-list/',
    'https://japanesetest4you.com/jlpt-n4-vocabulary-list/'
  ]
};

function loadContext() {
  const ctx = { window: {}, console };
  ctx.window = ctx;
  ctx.document = {
    readyState: 'loading',
    addEventListener: function () {},
    createElement: function () {
      return {
        appendChild: function () {},
        addEventListener: function () {},
        querySelectorAll: function () { return []; },
        classList: { add: function () {}, toggle: function () {} },
        style: {},
        innerHTML: '',
        textContent: '',
        className: '',
        disabled: false
      };
    },
    getElementById: function () { return null; }
  };
  ctx.window.document = ctx.document;
  ctx.GRAMMAR_DATA = [];
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

  var rawVocabSources = [
    { name: 'vocab-n5', items: ctx.VOCAB_N5 || [] },
    { name: 'vocab-n4', items: ctx.VOCAB_N4 || [] },
    { name: 'vocab-n3', items: ctx.VOCAB_N3 || [] },
    { name: 'vocab-n2', items: ctx.VOCAB_N2 || [] },
    { name: 'vocab-n1', items: ctx.VOCAB_N1 || [] },
    { name: 'yojijukugo', items: ctx.YOJIJUKUGO_DATA || [] },
    { name: 'idioms', items: ctx.IDIOMS_DATA || [] }
  ];
  var normalizedVocabSources = ctx.getNormalizedVocabSources
    ? ctx.getNormalizedVocabSources(rawVocabSources)
    : rawVocabSources;

  ctx.app.sections.vocab.allItems = normalizedVocabSources.reduce(function (all, source) {
    return all.concat(source.items || []);
  }, []);
  ctx.app.sections.kanji.allItems = []
    .concat(ctx.KANJI_DATA || [])
    .concat(ctx.KANJI_N1 || []);
  ctx.app.sections.grammar.allItems = ctx.GRAMMAR_DATA || [];
  return ctx;
}

function normalizeJapanese(text) {
  return (text || '')
    .normalize('NFKC')
    .replace(/\s+/g, '')
    .trim();
}

function fetchText(url) {
  if (typeof fetch === 'function') {
    return fetch(url, {
      headers: {
        'user-agent': 'Nihongo-Explorer-Audit/1.0'
      }
    }).then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status + ' for ' + url);
      return res.text();
    });
  }

  return new Promise(function (resolve, reject) {
    https.get(url, {
      headers: {
        'user-agent': 'Nihongo-Explorer-Audit/1.0'
      }
    }, function (res) {
      if (res.statusCode < 200 || res.statusCode >= 300) {
        reject(new Error('HTTP ' + res.statusCode + ' for ' + url));
        return;
      }
      var body = '';
      res.setEncoding('utf8');
      res.on('data', function (chunk) { body += chunk; });
      res.on('end', function () { resolve(body); });
    }).on('error', reject);
  });
}

function stripPreservedTokens(text, preserveTokens) {
  var next = text;
  (preserveTokens || []).forEach(function (token) {
    if (!token) return;
    next = next.split(token).join('');
  });
  return next;
}

function auditQuestionGeneration(ctx) {
  const audit = ctx.QuizModule && ctx.QuizModule.audit;
  if (!audit) throw new Error('Quiz audit hooks are not available.');

  const kanjiRe = /[\u3400-\u9faf]/;
  const questionTypes = [
    'vocabMeaning',
    'vocabReading',
    'vocabContext',
    'kanjiReading',
    'grammarMeaning',
    'grammarCloze',
    'grammarFormation'
  ];

  const report = [];
  ['N5', 'N4'].forEach(function (level) {
    questionTypes.forEach(function (typeId) {
      var generated = 0;
      var leakingKanji = 0;
      var missingMeta = 0;

      for (var i = 0; i < 120; i++) {
        var q = audit.generateQuestion(typeId, level);
        if (!q) continue;
        generated++;
        if (!q.auditMeta) missingMeta++;
        var text = [q.promptMain, q.promptSub, q.explanation].filter(Boolean).join(' ');
        text = stripPreservedTokens(text, q.auditMeta && q.auditMeta.preserveTokens);
        if (kanjiRe.test(text)) leakingKanji++;
      }

      report.push({
        level: level,
        type: typeId,
        generated: generated,
        leakingKanji: leakingKanji,
        missingMeta: missingMeta
      });
    });
  });

  return report;
}

function auditExternalCoverage(ctx, level, pageTexts) {
  const vocab = ctx.app.sections.vocab.allItems.filter(function (item) {
    return item.level === level;
  });
  const normalizedPages = pageTexts.map(normalizeJapanese);
  const missing = [];
  const matched = [];

  vocab.forEach(function (item) {
    const word = normalizeJapanese(item.word);
    const reading = normalizeJapanese(item.reading);
    const isMatched = normalizedPages.every(function (page) {
      return (word && page.indexOf(word) !== -1) || (reading && page.indexOf(reading) !== -1);
    });

    if (isMatched) {
      matched.push(item);
    } else {
      missing.push(item);
    }
  });

  return {
    level: level,
    total: vocab.length,
    matchedByBothSources: matched.length,
    missingFromEitherSource: missing.length,
    sampleMissing: missing.slice(0, 25).map(function (item) {
      return {
        word: item.word,
        reading: item.reading,
        meaning: item.meaning
      };
    })
  };
}

function rawVocabSourcesFromContext(ctx) {
  return [
    { name: 'vocab-n5', items: ctx.VOCAB_N5 || [] },
    { name: 'vocab-n4', items: ctx.VOCAB_N4 || [] },
    { name: 'vocab-n3', items: ctx.VOCAB_N3 || [] },
    { name: 'vocab-n2', items: ctx.VOCAB_N2 || [] },
    { name: 'vocab-n1', items: ctx.VOCAB_N1 || [] },
    { name: 'yojijukugo', items: ctx.YOJIJUKUGO_DATA || [] },
    { name: 'idioms', items: ctx.IDIOMS_DATA || [] }
  ];
}

async function main() {
  const ctx = loadContext();
  const external = {};
  const sourceErrors = [];

  for (const level of ['N5', 'N4']) {
    external[level] = await Promise.all(SOURCE_URLS[level].map(function (url) {
      return fetchText(url).catch(function (err) {
        sourceErrors.push({ level: level, url: url, error: err.message });
        return '';
      });
    }));
  }

  const beginnerQuestions = auditQuestionGeneration(ctx);
  const coverage = [
    auditExternalCoverage(ctx, 'N5', external.N5),
    auditExternalCoverage(ctx, 'N4', external.N4)
  ];
  const curatedExamples = ctx.getVocabExampleOverrideAudit
    ? ctx.getVocabExampleOverrideAudit(rawVocabSourcesFromContext(ctx))
    : { byLevel: {}, malformed: [], invalidTeaching: [] };

  console.log(JSON.stringify({
    sources: SOURCE_URLS,
    sourceErrors: sourceErrors,
    beginnerQuestions: beginnerQuestions,
    coverage: coverage,
    curatedExamples: {
      byLevel: curatedExamples.byLevel,
      malformed: curatedExamples.malformed,
      invalidTeaching: curatedExamples.invalidTeaching
    }
  }, null, 2));
}

main().catch(function (err) {
  console.error(err && err.stack ? err.stack : String(err));
  process.exit(1);
});
