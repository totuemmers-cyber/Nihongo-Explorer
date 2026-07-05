const fs = require('fs');
const vm = require('vm');

const DATA_FILES = [
  'kangxi-radicals-data.js',
  'kanji-data.js',
  'kanji-n1.js',
  'app-constants.js'
];

const ctx = { window: {}, console };
ctx.window = ctx;

DATA_FILES.forEach(function (file) {
  vm.runInNewContext(fs.readFileSync(file, 'utf8'), ctx, { filename: file });
});

const allKanji = []
  .concat(ctx.KANJI_DATA || [])
  .concat(ctx.KANJI_N1_DATA || []);

const THRESHOLDS = {
  minCanonicalRadicalPool: 214,
  // Since the radical variant mapping (氵→水 etc.) only kanji whose components
  // carry no Kangxi radical at all remain unlinked (numerals like 五, and
  // self-referential single-component entries). All of them still get a
  // primary radical via KANJI_PRIMARY_RADICAL_OVERRIDES.
  maxNoCanonical: 45,
  maxMissingPrimary: 0,  // Every kanji with ≥1 canonical radical must have a primary
  maxNoPrimary: 0        // Every kanji must resolve to a primary radical (heuristic, self-radical rule or override)
};

const missingPrimary = [];
const noCanonical = [];
const explicitPrimary = [];
const noPrimary = [];

allKanji.forEach(function (item) {
  const radicals = ctx.getCanonicalRadicalsForKanji ? ctx.getCanonicalRadicalsForKanji(item) : [];
  const primary = ctx.getPrimaryKanjiRadical ? ctx.getPrimaryKanjiRadical(item) : null;

  if (item.primaryRadical || (ctx.KANJI_PRIMARY_RADICAL_OVERRIDES || {})[item.kanji]) {
    explicitPrimary.push({
      kanji: item.kanji,
      primaryRadical: primary ? primary.radical : null
    });
  }

  if (!primary) {
    noPrimary.push({ kanji: item.kanji, meaning: item.meanings && item.meanings[0] });
  }

  if (!radicals.length) {
    noCanonical.push({ kanji: item.kanji, meaning: item.meanings && item.meanings[0] });
    return;
  }

  if (!primary) {
    missingPrimary.push({
      kanji: item.kanji,
      meaning: item.meanings && item.meanings[0],
      radicals: radicals.map(function (radical) { return radical.radical; })
    });
  }
});

const report = {
  counts: {
    kanji: allKanji.length,
    canonicalRadicalPool: (ctx.KANGXI_RADICALS || []).length,
    explicitPrimary: explicitPrimary.length,
    noCanonical: noCanonical.length,
    missingPrimary: missingPrimary.length,
    noPrimary: noPrimary.length,
    assignedPrimary: allKanji.length - noPrimary.length
  },
  thresholds: THRESHOLDS,
  missingPrimarySample: missingPrimary.slice(0, 50),
  noCanonicalSample: noCanonical.slice(0, 30),
  noPrimarySample: noPrimary.slice(0, 30),
  note: "noCanonical counts kanji whose components contain no Kangxi radical (incl. variant forms); these still get a primary via override. noPrimary counts kanji with no primary at all and must stay 0."
};

console.log(JSON.stringify(report, null, 2));

const hasRegression =
  report.counts.canonicalRadicalPool < THRESHOLDS.minCanonicalRadicalPool ||
  report.counts.noCanonical > THRESHOLDS.maxNoCanonical ||
  report.counts.missingPrimary > THRESHOLDS.maxMissingPrimary ||
  report.counts.noPrimary > THRESHOLDS.maxNoPrimary;

process.exit(hasRegression ? 1 : 0);
