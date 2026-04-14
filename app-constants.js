(function () {
  'use strict';

  var VOCAB_TYPES = [
    'Nomen',
    'Verb',
    'Adjektiv',
    'Adverb',
    'Ausdruck',
    'Partikel',
    'Yojijukugo',
    'Redewendung',
    'Sprichwort'
  ];

  var COUNTER_CATEGORIES = [
    'Menschen',
    'Objekte',
    'Tiere',
    'Zeit',
    'Essen & Trinken',
    'Gebäude & Räume',
    'Transport',
    'Sprache & Schrift',
    'Gruppen & Mengen',
    'Ereignisse',
    'Natur',
    'Medizin'
  ];

  var CANONICAL_RADICAL_COUNT = 214;
  var primaryRadicalOverrides = window.KANJI_PRIMARY_RADICAL_OVERRIDES || {};
  var radicalMapCache = null;

  function getCanonicalRadicalMap() {
    if (!radicalMapCache) {
      radicalMapCache = {};
      var radicals = window.KANGXI_RADICALS || [];
      for (var i = 0; i < radicals.length; i++) {
        radicalMapCache[radicals[i].radical] = radicals[i];
      }
    }
    return radicalMapCache;
  }

  function getCanonicalRadicalsForKanji(item) {
    if (!item || !item.components || !item.components.length) return [];
    var radicalMap = getCanonicalRadicalMap();
    var seen = {};
    var matches = [];

    for (var i = 0; i < item.components.length; i++) {
      var radical = item.components[i] && item.components[i].radical;
      if (!radical || !radicalMap[radical] || seen[radical]) continue;
      seen[radical] = true;
      matches.push(radicalMap[radical]);
    }

    return matches;
  }

  function getPrimaryKanjiRadical(item) {
    if (!item) return null;

    var radicalMap = getCanonicalRadicalMap();
    var override = item.primaryRadical || primaryRadicalOverrides[item.kanji];
    if (override && radicalMap[override]) return radicalMap[override];

    var radicals = getCanonicalRadicalsForKanji(item);
    if (radicals.length === 1) return radicals[0];
    return null;
  }

  window.NIHONGO_CONSTANTS = {
    VOCAB_TYPES: VOCAB_TYPES,
    COUNTER_CATEGORIES: COUNTER_CATEGORIES,
    CANONICAL_RADICAL_COUNT: CANONICAL_RADICAL_COUNT
  };
  window.KANJI_PRIMARY_RADICAL_OVERRIDES = primaryRadicalOverrides;
  window.getCanonicalRadicalMap = getCanonicalRadicalMap;
  window.getCanonicalRadicalsForKanji = getCanonicalRadicalsForKanji;
  window.getPrimaryKanjiRadical = getPrimaryKanjiRadical;
})();
