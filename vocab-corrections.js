(function () {
  'use strict';

  function itemKey(item) {
    return (item.word || '') + '|' + (item.reading || '');
  }

  function getRule(item) {
    var rules = window.VOCAB_CORRECTION_RULES && window.VOCAB_CORRECTION_RULES.explicit;
    return rules ? rules[itemKey(item)] : null;
  }

  function applyCorrections(list) {
    if (!list || !list.length) return;

    for (var i = 0; i < list.length; i++) {
      var item = list[i];
      if (!item || item.__vocabCorrectionApplied) continue;

      var rule = getRule(item);
      if (rule) {
        item.type = rule.type;
        if (rule.conjugationReading) item.conjugationReading = rule.conjugationReading;
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
