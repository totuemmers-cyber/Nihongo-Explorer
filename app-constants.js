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

  // === PRIMARY RADICAL OVERRIDES (for traditional dictionary accuracy) ===
  // Populated only for kanji where the "first canonical component" heuristic
  // produces a result that differs from the conventional main radical used in
  // Japanese dictionaries (e.g. 百 is traditionally indexed under 白, not 一).
  //
  // Format: { "百": "白", "時": "日", ... }
  // Keep this set small. Most multi-radical kanji are correctly handled by
  // the first-listed-component rule (see getPrimaryKanjiRadical).
  var primaryRadicalOverrides = window.KANJI_PRIMARY_RADICAL_OVERRIDES || {
    // Example (commented — add real entries only after verifying against a
    // trusted source such as a Kanji dictionary or the KANJIDIC project):
    // "百": "白"
  };
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

  /**
   * Returns the designated primary (main) Kangxi radical for a kanji item.
   * Selection order:
   *   1. Explicit item.primaryRadical or entry in KANJI_PRIMARY_RADICAL_OVERRIDES
   *   2. First canonical radical appearing in the item's components[] array
   *      (in the order the data author listed them). This covers all kanji
   *      that have 2+ radical components.
   *   3. null only for kanji that have no Kangxi radical components at all.
   *
   * The "first component" rule was chosen because it matches author intent in
   * the existing data files and requires zero per-kanji data changes.
   */
  function getPrimaryKanjiRadical(item) {
    if (!item) return null;

    var radicalMap = getCanonicalRadicalMap();
    var override = item.primaryRadical || primaryRadicalOverrides[item.kanji];
    if (override && radicalMap[override]) return radicalMap[override];

    // Heuristic: first canonical radical in the order the data lists the components.
    // This automatically covers the 635+ kanji that have 2–4 radical components.
    if (item.components && item.components.length) {
      for (var i = 0; i < item.components.length; i++) {
        var r = item.components[i] && item.components[i].radical;
        if (r && radicalMap[r]) {
          return radicalMap[r];
        }
      }
    }
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
