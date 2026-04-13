const fs = require('fs');
const vm = require('vm');

const FILES = [
  'kanji-data.js',
  'kanji-n1.js',
  'grammar-data.js',
  'grammar-n2.js',
  'grammar-n1.js',
  'vocab-n5.js',
  'vocab-n4.js',
  'vocab-n3.js',
  'vocab-n2.js',
  'vocab-n1.js',
  'yojijukugo-data.js',
  'idioms-data.js',
  'keigo-data.js',
  'onomatopoeia-data.js',
  'counters-data.js',
  'kangxi-radicals-data.js',
  'conjugation.js',
  'vocab-corrections.js'
];

const INTENTIONAL_VOCAB_OVERLAP_KEYS = {
  '一期一会|いちごいちえ': true,
  '一石二鳥|いっせきにちょう': true,
  '自業自得|じごうじとく': true,
  '以心伝心|いしんでんしん': true
};

const CORE_VOCAB_PREFERRED_KEYS = {
  '大丈夫|だいじょうぶ': true,
  '自己紹介|じこしょうかい': true,
  '一人暮らし|ひとりぐらし': true,
  '役に立つ|やくにたつ': true,
  '間に合う|まにあう': true,
  '我慢する|がまんする': true,
  '気にする|きにする': true,
  '寝坊する|ねぼうする': true,
  '道に迷う|みちにまよう': true,
  '首になる|くびになる': true,
  '口にする|くちにする': true,
  'お世話になる|おせわになる': true
};

const ctx = { window: {}, console };
ctx.window = ctx;

FILES.forEach(function (file) {
  vm.runInNewContext(fs.readFileSync(file, 'utf8'), ctx, { filename: file });
});

function keyOrEmpty(parts) {
  return parts.map(function (part) { return part || ''; }).join('|');
}

function getEntryKey(item) {
  return keyOrEmpty([item.word, item.reading]);
}

function getSourcePriority(item) {
  const key = item.mergeKey || getEntryKey(item);
  const source = item.source || '';
  const isCore = source.indexOf('vocab-') === 0;

  if (CORE_VOCAB_PREFERRED_KEYS[key]) {
    if (isCore) return 40;
    if (source === 'idioms') return 20;
    if (source === 'yojijukugo') return 10;
    return 0;
  }
  if (source === 'idioms') return 40;
  if (source === 'yojijukugo') return 30;
  if (isCore) return 20;
  return 10;
}

function getEntryRichness(item) {
  let score = 0;
  if (item.meaning) score += item.meaning.length;
  if (item.notes) score += item.notes.length;
  if (item.explanation) score += item.explanation.length;
  if (item.examples && item.examples.length) score += item.examples.length * 25;
  if (item.type === 'Redewendung' || item.type === 'Sprichwort' || item.type === 'Yojijukugo') score += 20;
  return score;
}

function createSourceScopedItems(source, items) {
  return (items || []).map(function (item, index) {
    const next = Object.assign({}, item);
    next.id = source + ':' + index;
    next.source = source;
    next.mergeKey = getEntryKey(next);
    return next;
  });
}

function collectMalformed(items, label, checks) {
  const malformed = [];
  items.forEach(function (item, index) {
    for (let i = 0; i < checks.length; i++) {
      if (!checks[i].test(item)) {
        malformed.push({
          label: label,
          index: index,
          key: checks[i].key(item),
          issue: checks[i].issue
        });
        break;
      }
    }
  });
  return malformed;
}

function findSameSourceDuplicates(items, keyFn) {
  const seen = new Map();
  const duplicates = [];

  items.forEach(function (item, index) {
    const key = keyFn(item);
    if (!key) return;
    if (seen.has(key)) {
      duplicates.push({
        key: key,
        firstIndex: seen.get(key),
        duplicateIndex: index
      });
      return;
    }
    seen.set(key, index);
  });

  return duplicates;
}

function auditMergedVocab(sources) {
  const groups = new Map();

  sources.forEach(function (source) {
    createSourceScopedItems(source.name, source.items).forEach(function (item) {
      if (!groups.has(item.mergeKey)) groups.set(item.mergeKey, []);
      groups.get(item.mergeKey).push(item);
    });
  });

  const intentionalOverlaps = [];
  const resolvedByPolicy = [];
  const actionableDuplicates = [];

  groups.forEach(function (items, key) {
    if (items.length < 2) return;

    const sourceNames = items.map(function (item) { return item.source; });
    if (INTENTIONAL_VOCAB_OVERLAP_KEYS[key]) {
      intentionalOverlaps.push({ key: key, sources: sourceNames });
      return;
    }

    const sorted = items.slice().sort(function (a, b) {
      const priorityDiff = getSourcePriority(b) - getSourcePriority(a);
      if (priorityDiff !== 0) return priorityDiff;
      return getEntryRichness(b) - getEntryRichness(a);
    });

    const winner = sorted[0];
    const winnerPriority = getSourcePriority(winner);
    const winnerRichness = getEntryRichness(winner);
    const unresolved = sorted.slice(1).filter(function (item) {
      return getSourcePriority(item) === winnerPriority &&
        getEntryRichness(item) === winnerRichness &&
        item.source !== winner.source;
    });

    if (unresolved.length > 0) {
      actionableDuplicates.push({
        key: key,
        sources: sourceNames
      });
      return;
    }

    resolvedByPolicy.push({
      key: key,
      keptSource: winner.source,
      droppedSources: sorted.slice(1).map(function (item) { return item.source; })
    });
  });

  return {
    intentionalOverlaps: intentionalOverlaps.sort(function (a, b) { return a.key.localeCompare(b.key); }),
    resolvedByPolicy: resolvedByPolicy.sort(function (a, b) { return a.key.localeCompare(b.key); }),
    actionableDuplicates: actionableDuplicates.sort(function (a, b) { return a.key.localeCompare(b.key); })
  };
}

const kanji = []
  .concat(ctx.KANJI_DATA || [])
  .concat(ctx.KANJI_N1_DATA || []);
const grammar = []
  .concat(ctx.GRAMMAR_DATA || [])
  .concat(ctx.GRAMMAR_N2 || [])
  .concat(ctx.GRAMMAR_N1 || []);
const coreVocab = []
  .concat(ctx.VOCAB_N5 || [])
  .concat(ctx.VOCAB_N4 || [])
  .concat(ctx.VOCAB_N3 || [])
  .concat(ctx.VOCAB_N2 || [])
  .concat(ctx.VOCAB_N1 || []);
const yojijukugo = ctx.YOJIJUKUGO_DATA || [];
const idioms = ctx.IDIOMS_DATA || [];
const vocab = coreVocab.concat(yojijukugo).concat(idioms);
const radicals = ctx.KANGXI_RADICALS || [];
const onomatopoeia = ctx.ONOMATOPOEIA_DATA || [];
const counters = ctx.COUNTERS_DATA && ctx.COUNTERS_DATA.counters ? ctx.COUNTERS_DATA.counters : [];

const verbs = vocab.filter(function (item) {
  return item.type === 'Verb' && item.reading;
});

const unresolvedVerbs = verbs.filter(function (item) {
  return !ctx.resolveVocabVerbConjugation(item);
}).map(function (item) {
  return {
    word: item.word,
    reading: item.reading,
    level: item.level,
    meaning: item.meaning
  };
});

const malformed = []
  .concat(collectMalformed(kanji, 'kanji', [
    { issue: 'missing-kanji', test: function (item) { return !!item.kanji; }, key: function () { return ''; } },
    { issue: 'missing-meanings', test: function (item) { return Array.isArray(item.meanings) && item.meanings.length > 0; }, key: function (item) { return item.kanji; } },
    { issue: 'missing-jlpt', test: function (item) { return !!item.jlpt; }, key: function (item) { return item.kanji; } }
  ]))
  .concat(collectMalformed(grammar, 'grammar', [
    { issue: 'missing-id', test: function (item) { return !!item.id; }, key: function () { return ''; } },
    { issue: 'missing-pattern', test: function (item) { return !!item.pattern; }, key: function (item) { return item.id; } },
    { issue: 'missing-level', test: function (item) { return !!item.level; }, key: function (item) { return item.id; } }
  ]))
  .concat(collectMalformed(vocab, 'vocab', [
    { issue: 'missing-word', test: function (item) { return !!item.word; }, key: function () { return ''; } },
    { issue: 'missing-meaning', test: function (item) { return !!item.meaning; }, key: function (item) { return getEntryKey(item); } },
    { issue: 'missing-level', test: function (item) { return !!item.level; }, key: function (item) { return getEntryKey(item); } }
  ]))
  .concat(collectMalformed(radicals, 'radicals', [
    { issue: 'missing-number', test: function (item) { return typeof item.number === 'number'; }, key: function () { return ''; } },
    { issue: 'missing-radical', test: function (item) { return !!item.radical; }, key: function (item) { return '' + item.number; } }
  ]))
  .concat(collectMalformed(onomatopoeia, 'onomatopoeia', [
    { issue: 'missing-word', test: function (item) { return !!item.word; }, key: function () { return ''; } },
    { issue: 'missing-category', test: function (item) { return !!item.category; }, key: function (item) { return item.word; } }
  ]))
  .concat(collectMalformed(counters, 'counters', [
    { issue: 'missing-id', test: function (item) { return !!item.id; }, key: function () { return ''; } },
    { issue: 'missing-kanji', test: function (item) { return !!item.kanji; }, key: function (item) { return item.id; } }
  ]));

const vocabMergeAudit = auditMergedVocab([
  { name: 'vocab-n5', items: ctx.VOCAB_N5 || [] },
  { name: 'vocab-n4', items: ctx.VOCAB_N4 || [] },
  { name: 'vocab-n3', items: ctx.VOCAB_N3 || [] },
  { name: 'vocab-n2', items: ctx.VOCAB_N2 || [] },
  { name: 'vocab-n1', items: ctx.VOCAB_N1 || [] },
  { name: 'yojijukugo', items: yojijukugo },
  { name: 'idioms', items: idioms }
]);

const report = {
  totals: {
    kanji: kanji.length,
    grammar: grammar.length,
    vocab: vocab.length,
    radicals: radicals.length,
    onomatopoeia: onomatopoeia.length,
    counters: counters.length,
    verbs: verbs.length
  },
  duplicates: {
    kanji: findSameSourceDuplicates(kanji, function (item) { return item.kanji; }),
    grammar: findSameSourceDuplicates(grammar, function (item) { return item.id; }),
    radicals: findSameSourceDuplicates(radicals, function (item) { return '' + item.number; }),
    counters: findSameSourceDuplicates(counters, function (item) { return item.id; }),
    onomatopoeia: findSameSourceDuplicates(onomatopoeia, function (item) { return item.word; }),
    yojijukugo: findSameSourceDuplicates(yojijukugo, getEntryKey),
    idioms: findSameSourceDuplicates(idioms, getEntryKey),
    vocabMerge: vocabMergeAudit
  },
  malformed: malformed,
  unresolvedVerbs: unresolvedVerbs
};

console.log(JSON.stringify(report, null, 2));

const hasErrors =
  report.malformed.length > 0 ||
  report.unresolvedVerbs.length > 0 ||
  report.duplicates.kanji.length > 0 ||
  report.duplicates.grammar.length > 0 ||
  report.duplicates.radicals.length > 0 ||
  report.duplicates.counters.length > 0 ||
  report.duplicates.onomatopoeia.length > 0 ||
  report.duplicates.yojijukugo.length > 0 ||
  report.duplicates.idioms.length > 0 ||
  report.duplicates.vocabMerge.actionableDuplicates.length > 0;

process.exit(hasErrors ? 1 : 0);
