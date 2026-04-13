(function () {
  'use strict';

  var SURU_SUFFIX = '\u3059\u308b';
  var O_PARTICLE = '\u3092';
  var GA_PARTICLE = '\u304c';
  var NI_PARTICLE = '\u306b';
  var SURU_INFLECTIONS = [
    '\u3059\u308b', '\u3057\u305f', '\u3057\u3066', '\u3057\u307e\u3059', '\u3057\u307e\u3057\u305f',
    '\u3057\u306a\u3044', '\u3057\u307e\u305b\u3093', '\u3057\u3066\u3044\u308b', '\u3057\u3066\u3044\u305f',
    '\u3055\u308c\u308b', '\u3055\u308c\u305f', '\u3055\u308c\u3066', '\u3055\u308c\u307e\u3059',
    '\u3055\u308c\u307e\u3057\u305f', '\u3055\u305b\u308b', '\u3055\u305b\u3089\u308c\u308b',
    '\u3059\u308c\u3070', '\u3057\u305f\u3089', '\u3057\u3088\u3046', '\u3057\u305f\u3044', '\u3057\u308d'
  ];

  var ADVERB_CATEGORIES = {
    'Art und Weise': 1,
    'Zeit': 1,
    'Ort': 1
  };

  var ADJECTIVE_CATEGORIES = {
    'Eigenschaften': 1
  };

  var FORCED_TYPE_OVERRIDES = {
    '\u5225\u306b|\u3079\u3064\u306b': 'Adverb',
    '\u7c98\u3005|\u306d\u3070\u306d\u3070': 'Adjektiv'
  };

  var ADVERB_MEANINGS = [
    'mit voller kraft', 'ziemlich', 'zuerst', 'zunaechst', 'auf einmal',
    'hauptsaechlich', 'im ganzen', 'ganz', 'seit alters her', 'bis jetzt',
    'bisher', 'danach', 'bald', 'zum teufel', 'nacheinander', 'unwillkuerlich',
    'nicht besonders', 'woertlich', 'kurz davor', 'erstens', 'ueberhaupt nicht',
    'staendig', 'von herzen', 'fliessend', 'wie erwartet', 'still', 'ueber',
    'tatsaechlich', 'ploetzlich', 'allmaehlich', 'durchaus', 'vorerst', 'schnell'
  ];

  var ADJECTIVE_MEANINGS = [
    'unhoeflich', 'neu', 'am schlechtesten', 'richtig', 'offensichtlich',
    'weit entfernt', 'mutig', 'starke aehnlichkeit', 'lebhaft dargestellt',
    'klebrig'
  ];

  function normalizeText(text) {
    return String(text || '')
      .toLowerCase()
      .replace(/\u00e4/g, 'ae')
      .replace(/\u00f6/g, 'oe')
      .replace(/\u00fc/g, 'ue')
      .replace(/\u00df/g, 'ss');
  }

  function itemKey(item) {
    return (item.word || '') + '|' + (item.reading || '');
  }

  function textContainsAny(text, parts) {
    for (var i = 0; i < parts.length; i++) {
      if (text.indexOf(parts[i]) !== -1) return true;
    }
    return false;
  }

  function getExamplesText(item) {
    if (!item.examples || !item.examples.length) return '';
    return item.examples.map(function (ex) {
      return ex && ex.japanese ? ex.japanese : '';
    }).join('\n');
  }

  function hasSuruUsageEvidence(item) {
    var text = getExamplesText(item);
    var word = item.word || '';
    if (!text || !word) return false;

    for (var i = 0; i < SURU_INFLECTIONS.length; i++) {
      var suffix = SURU_INFLECTIONS[i];
      if (text.indexOf(word + suffix) !== -1) return true;
      if (text.indexOf(word + O_PARTICLE + suffix) !== -1) return true;
      if (text.indexOf(word + GA_PARTICLE + suffix) !== -1) return true;
      if (text.indexOf(word + NI_PARTICLE + suffix) !== -1) return true;
    }

    return false;
  }

  function chooseReplacementType(item) {
    var forcedType = FORCED_TYPE_OVERRIDES[itemKey(item)];
    if (forcedType) return forcedType;

    var normalizedMeaning = normalizeText(item.meaning);
    if (ADJECTIVE_CATEGORIES[item.category] || textContainsAny(normalizedMeaning, ADJECTIVE_MEANINGS)) {
      return 'Adjektiv';
    }
    if (ADVERB_CATEGORIES[item.category] || textContainsAny(normalizedMeaning, ADVERB_MEANINGS)) {
      return 'Adverb';
    }
    return 'Nomen';
  }

  function applyCorrections(list) {
    if (!list || !list.length) return;

    for (var i = 0; i < list.length; i++) {
      var item = list[i];
      if (!item || item.type !== 'Verb' || !item.reading) continue;
      if (item.__vocabCorrectionApplied) continue;
      if (window.resolveVocabVerbConjugation(item)) {
        item.__vocabCorrectionApplied = true;
        continue;
      }

      if (!FORCED_TYPE_OVERRIDES[itemKey(item)] && hasSuruUsageEvidence(item)) {
        item.conjugationReading = item.reading + SURU_SUFFIX;
      } else {
        item.type = chooseReplacementType(item);
      }

      item.__vocabCorrectionApplied = true;
    }
  }

  window.applyVocabCorrections = function () {
    var sources = [
      window.VOCAB_N5,
      window.VOCAB_N4,
      window.VOCAB_N3,
      window.VOCAB_N2,
      window.VOCAB_N1,
      window.YOJIJUKUGO_DATA,
      window.IDIOMS_DATA
    ];

    for (var i = 0; i < sources.length; i++) {
      applyCorrections(sources[i]);
    }
  };

  window.applyVocabCorrections();
})();
