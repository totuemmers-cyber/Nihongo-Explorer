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
  ctx.addEventListener = function () {};
  ctx.removeEventListener = function () {};
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

// Beginner sentences are read from their authored romaji. These inputs were misread when
// readings were substituted from vocabulary entries; null marks inputs that must be rejected.
const ROMAJI_READING_FIXTURES = [
  ['上げてください。', 'Agete kudasai.', 'あげてください。'],
  ['日本人です。', 'Nihonjin desu.', 'にほんじんです。'],
  ['どこに行きますか。', 'Doko ni ikimasu ka.', 'どこにいきますか。'],
  ['バスは九時に出発します。', 'Basu wa kuji ni shuppatsu shimasu.', 'バスはくじにしゅっぱつします。'],
  ['今日は暑いです。', 'Kyou wa atsui desu.', 'きょうはあついです。'],
  ['教室に学生が二十人います。', 'Kyoushitsu ni gakusei ga nijuunin imasu.', 'きょうしつにがくせいがにじゅうにんいます。'],
  ['東京に行きます。', 'Tōkyō ni ikimasu.', 'とうきょうにいきます。'],
  ['コーヒーを飲みます。', 'Koohii o nomimasu.', 'コーヒーをのみます。'],
  ['猫がいます。', 'Neko wa imasu.', null],
  ['9時に出ます。', 'Kuji ni demasu.', null]
];

function auditRomajiReadings(ctx) {
  return ROMAJI_READING_FIXTURES.map(function (fixture) {
    const actual = ctx.QuizModule.audit.kanaFromRomaji(fixture[0], fixture[1], []);
    return { japanese: fixture[0], expected: fixture[2], actual: actual };
  }).filter(function (row) { return row.actual !== row.expected; });
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
      var leakingPromptKanji = 0;
      var missingMeta = 0;

      for (var i = 0; i < 120; i++) {
        var q = audit.generateQuestion(typeId, level);
        if (!q) continue;
        generated++;
        if (!q.auditMeta) missingMeta++;
        var preserve = q.auditMeta && q.auditMeta.preserveTokens;
        // The explanation deliberately reveals the original sentence after answering.
        var prompt = stripPreservedTokens([q.promptMain, q.promptSub].filter(Boolean).join(' '), preserve);
        var text = stripPreservedTokens([q.promptMain, q.promptSub, q.explanation].filter(Boolean).join(' '), preserve);
        if (kanjiRe.test(prompt)) leakingPromptKanji++;
        if (kanjiRe.test(text)) leakingKanji++;
      }

      report.push({
        level: level,
        type: typeId,
        generated: generated,
        leakingKanji: leakingKanji,
        leakingPromptKanji: leakingPromptKanji,
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
  const offline = process.argv.includes('--offline');
  const external = {};
  const sourceErrors = [];

  for (const level of ['N5', 'N4']) {
    external[level] = offline ? [] : await Promise.all(SOURCE_URLS[level].map(function (url) {
      return fetchText(url).catch(function (err) {
        sourceErrors.push({ level: level, url: url, error: err.message });
        return '';
      });
    }));
  }

  const beginnerQuestions = auditQuestionGeneration(ctx);
  // A missing source page would report every entry as missing, so skip that level instead.
  const coverage = ['N5', 'N4'].map(function (level) {
    const pages = external[level];
    if (!pages.length || pages.some(function (page) { return !page; })) {
      return { level: level, skipped: offline ? 'offline' : 'source unavailable' };
    }
    return auditExternalCoverage(ctx, level, pages);
  });
  const curatedExamples = ctx.getVocabExampleOverrideAudit
    ? ctx.getVocabExampleOverrideAudit(rawVocabSourcesFromContext(ctx))
    : { byLevel: {}, malformed: [], invalidTeaching: [] };

  const romajiReadingFailures = auditRomajiReadings(ctx);

  console.log(JSON.stringify({
    sources: SOURCE_URLS,
    sourceErrors: sourceErrors,
    beginnerQuestions: beginnerQuestions,
    romajiReadingFailures: romajiReadingFailures,
    coverage: coverage,
    curatedExamples: {
      byLevel: curatedExamples.byLevel,
      malformed: curatedExamples.malformed,
      invalidTeaching: curatedExamples.invalidTeaching
    }
  }, null, 2));

  const failures = beginnerQuestions.filter(function (row) {
    return row.generated === 0 || row.leakingPromptKanji > 0 || row.missingMeta > 0;
  });
  if (failures.length || romajiReadingFailures.length || curatedExamples.malformed.length || curatedExamples.invalidTeaching.length) {
    console.error('Beginner adequacy audit failed: ' + JSON.stringify(failures.concat(romajiReadingFailures)));
    process.exit(1);
  }
}

main().catch(function (err) {
  console.error(err && err.stack ? err.stack : String(err));
  process.exit(1);
});
