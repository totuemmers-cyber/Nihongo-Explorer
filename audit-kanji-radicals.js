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
  .concat(ctx.KANJI_N1 || []);

const missingPrimary = [];
const noCanonical = [];
const explicitPrimary = [];

allKanji.forEach(function (item) {
  const radicals = ctx.getCanonicalRadicalsForKanji ? ctx.getCanonicalRadicalsForKanji(item) : [];
  const primary = ctx.getPrimaryKanjiRadical ? ctx.getPrimaryKanjiRadical(item) : null;

  if (item.primaryRadical || (ctx.KANJI_PRIMARY_RADICAL_OVERRIDES || {})[item.kanji]) {
    explicitPrimary.push({
      kanji: item.kanji,
      primaryRadical: primary ? primary.radical : null
    });
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

console.log(JSON.stringify({
  counts: {
    kanji: allKanji.length,
    canonicalRadicalPool: (ctx.KANGXI_RADICALS || []).length,
    explicitPrimary: explicitPrimary.length,
    noCanonical: noCanonical.length,
    missingPrimary: missingPrimary.length
  },
  missingPrimarySample: missingPrimary.slice(0, 100),
  noCanonicalSample: noCanonical.slice(0, 50)
}, null, 2));
