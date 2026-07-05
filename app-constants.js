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

  // === RADICAL VARIANT FORMS ===
  // Positional/simplified forms of Kangxi radicals as they appear in the
  // kanji component data, mapped to the canonical character used in
  // KANGXI_RADICALS. This lets 氵 resolve to 水 (radical 85), 亻 to 人
  // (radical 9), ⻏ to 邑 (163, right side) vs. ⻖ to 阜 (170, left side) etc.
  var RADICAL_VARIANTS = {
    '亻': '人', '𠆢': '人',
    '刂': '刀',
    '㔾': '卩',
    '⺌': '小', '⺍': '小',
    '巛': '川',
    '忄': '心',
    '戶': '戸',
    '扌': '手',
    '攵': '攴',
    '氵': '水', '氺': '水',
    '灬': '火',
    '爫': '爪', '⺤': '爪',
    '犭': '犬',
    '玉': '王',
    '母': '毋',
    '礻': '示',
    '罒': '网',
    '⺹': '老', '耂': '老',
    '艹': '艸', '⺾': '艸', '⺿': '艸',
    '衤': '衣',
    '西': '襾', '覀': '襾',
    '訁': '言',
    '⻌': '辶', '辵': '辶',
    '⻏': '邑',
    '⻖': '阜', '阝': '阜',
    '釒': '金',
    '飠': '食',
    'ヨ': '彐', '⺕': '彐',
    '⺮': '竹',
    '⺼': '肉',
    '巳': '己', '已': '己',
    '竜': '龍',
    '齊': '斉', '齒': '歯', '龜': '亀', '麥': '麦', '黃': '黄', '黑': '黒'
  };

  // === PRIMARY RADICAL OVERRIDES (for traditional dictionary accuracy) ===
  // Populated only for kanji where the "first canonical component" heuristic
  // (and the self-radical rule) produces a result that differs from the
  // conventional main radical used in Japanese dictionaries.
  //
  // Format: { "百": "白", ... } — values are canonical KANGXI_RADICALS chars
  // (variant forms are also accepted). Every entry must be verified against a
  // trusted source (Kanji dictionary / KANJIDIC) before adding.
  var primaryRadicalOverrides = window.KANJI_PRIMARY_RADICAL_OVERRIDES || {
    // Numerals & basic kanji whose components carry no canonical radical
    '五': '二', '七': '一', '九': '乙', '万': '一', '千': '十', '午': '十',
    '世': '一', '且': '一', '丑': '一', '丘': '一',
    '了': '亅', '予': '亅', '乃': '丿', '之': '丿', '丸': '丶',
    '井': '二', '以': '人', '民': '氏', '幸': '干', '才': '手',
    '冊': '冂', '兆': '儿', '弁': '廾', '廿': '廾', '帝': '巾',
    '執': '土', '垂': '土', '尽': '尸', '舗': '舌', '彙': '彐',
    '就': '尢', '升': '十', '叛': '又', '叢': '又', '嘉': '口',
    '卯': '卩', '恭': '心', '焉': '火', '甫': '用', '歪': '止', '既': '无',
    // Dictionary radical differs from the first-listed component
    '百': '白', '辺': '辶', '票': '示', '粟': '米',
    '初': '刀', '化': '匕', '酒': '酉', '染': '木', '塗': '土',
    '視': '見', '愛': '心', '乳': '乙', '妥': '女', '堕': '土',
    '勲': '力', '粛': '聿', '孝': '子', '那': '邑', '剤': '刀',
    '帰': '巾', '頼': '頁',
    // Shinjitai ⺌-top kanji indexed under their lower component
    '光': '儿', '党': '儿', '常': '巾', '栄': '木', '蛍': '虫'
  };
  var radicalMapCache = null;
  var radicalMapSourceCount = -1;

  function getCanonicalRadicalMap() {
    var radicals = window.KANGXI_RADICALS || [];
    // Rebuild when the source data (lazy-loaded) appears or changes size, so
    // an early call before kangxi-radicals-data.js loads doesn't pin an
    // empty cache.
    if (!radicalMapCache || radicalMapSourceCount !== radicals.length) {
      radicalMapCache = {};
      for (var i = 0; i < radicals.length; i++) {
        radicalMapCache[radicals[i].radical] = radicals[i];
      }
      for (var variant in RADICAL_VARIANTS) {
        var canonical = radicalMapCache[RADICAL_VARIANTS[variant]];
        if (canonical && !radicalMapCache[variant]) {
          radicalMapCache[variant] = canonical;
        }
      }
      radicalMapSourceCount = radicals.length;
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
   *   2. Self-radical rule: a kanji that is itself one of the 214 Kangxi
   *      radicals (or a variant form of one, e.g. 竜 → 龍) is its own
   *      primary radical, as in traditional dictionaries (見, 貝, 赤, …).
   *   3. First canonical radical appearing in the item's components[] array
   *      (in the order the data author listed them). This covers all kanji
   *      that have 2+ radical components.
   *   4. null only for kanji that have no Kangxi radical components at all.
   *
   * The "first component" rule was chosen because it matches author intent in
   * the existing data files and requires zero per-kanji data changes.
   */
  function getPrimaryKanjiRadical(item) {
    if (!item) return null;

    var radicalMap = getCanonicalRadicalMap();
    var override = item.primaryRadical || primaryRadicalOverrides[item.kanji];
    if (override && radicalMap[override]) return radicalMap[override];

    // Self-radical rule: the kanji is itself a Kangxi radical (or variant).
    if (radicalMap[item.kanji]) return radicalMap[item.kanji];

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
  window.KANJI_RADICAL_VARIANTS = RADICAL_VARIANTS;
  window.getCanonicalRadicalMap = getCanonicalRadicalMap;
  window.getCanonicalRadicalsForKanji = getCanonicalRadicalsForKanji;
  window.getPrimaryKanjiRadical = getPrimaryKanjiRadical;
})();
