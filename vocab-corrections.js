(function () {
  'use strict';

  function cloneItem(item) {
    var next = {};
    for (var key in item) {
      if (item.hasOwnProperty(key)) next[key] = item[key];
    }
    return next;
  }

  function itemKey(item) {
    return (item.word || '') + '|' + (item.reading || '');
  }

  function getGlobalRule(item) {
    var rules = window.VOCAB_CORRECTION_RULES && window.VOCAB_CORRECTION_RULES.explicit;
    return rules ? rules[itemKey(item)] : null;
  }

  function getSourceRule(sourceName, item) {
    var bySource = window.VOCAB_CORRECTION_RULES && window.VOCAB_CORRECTION_RULES.bySource;
    var sourceRules = bySource && bySource[sourceName];
    return sourceRules ? sourceRules[itemKey(item)] : null;
  }

  function applyRule(target, rule) {
    if (!rule) return;
    for (var key in rule) {
      if (rule.hasOwnProperty(key)) {
        if (key === 'exclude') continue;
        target[key] = rule[key];
      }
    }
  }

  function normalizeItem(sourceName, item, index) {
    if (!item) return null;

    var normalized = cloneItem(item);
    normalized.__sourceName = sourceName;
    normalized.__sourceIndex = index;
    normalized.__rawWord = item.word;
    normalized.__rawReading = item.reading;
    normalized.__rawLevel = item.level;
    normalized.__rawType = item.type;

    applyRule(normalized, getGlobalRule(item));
    var sourceRule = getSourceRule(sourceName, item);
    if (sourceRule && sourceRule.exclude) return null;
    applyRule(normalized, sourceRule);

    normalized.__normalized =
      normalized.word !== normalized.__rawWord ||
      normalized.reading !== normalized.__rawReading ||
      normalized.level !== normalized.__rawLevel ||
      normalized.type !== normalized.__rawType;

    return normalized;
  }

  function normalizeList(sourceName, list) {
    if (!list || !list.length) return [];

    var normalized = [];
    for (var i = 0; i < list.length; i++) {
      var item = normalizeItem(sourceName, list[i], i);
      if (item) normalized.push(item);
    }
    return normalized;
  }

  function flattenSources(sources) {
    var all = [];
    for (var i = 0; i < sources.length; i++) {
      all = all.concat(sources[i].items || []);
    }
    return all;
  }

  function buildDefaultSources() {
    return [
      { name: 'vocab-n5', items: window.VOCAB_N5 || [] },
      { name: 'vocab-n4', items: window.VOCAB_N4 || [] },
      { name: 'vocab-n3', items: window.VOCAB_N3 || [] },
      { name: 'vocab-n2', items: window.VOCAB_N2 || [] },
      { name: 'vocab-n1', items: window.VOCAB_N1 || [] },
      { name: 'yojijukugo', items: window.YOJIJUKUGO_DATA || [] },
      { name: 'idioms', items: window.IDIOMS_DATA || [] }
    ];
  }

  window.getNormalizedVocabSource = function (sourceName, list) {
    return normalizeList(sourceName, list);
  };

  window.getNormalizedVocabSources = function (sources) {
    var sourceList = sources || buildDefaultSources();
    var normalized = [];
    for (var i = 0; i < sourceList.length; i++) {
      normalized.push({
        name: sourceList[i].name,
        items: normalizeList(sourceList[i].name, sourceList[i].items || [])
      });
    }
    return normalized;
  };

  window.getNormalizedAllVocab = function (sources) {
    return flattenSources(window.getNormalizedVocabSources(sources));
  };

  window.getVocabNormalizationChanges = function (sources) {
    var rawSources = sources || buildDefaultSources();
    var normalizedSources = window.getNormalizedVocabSources(rawSources);
    var changes = {
      levelChanged: [],
      typeChanged: [],
      excluded: []
    };

    for (var i = 0; i < rawSources.length; i++) {
      var rawItems = rawSources[i].items || [];
      var normalizedItems = {};
      for (var j = 0; j < normalizedSources[i].items.length; j++) {
        var item = normalizedSources[i].items[j];
        normalizedItems[item.__sourceIndex] = item;
      }

      for (var k = 0; k < rawItems.length; k++) {
        var raw = rawItems[k];
        var normalized = normalizedItems[k];
        if (!normalized) {
          changes.excluded.push({
            source: rawSources[i].name,
            word: raw.word,
            reading: raw.reading,
            level: raw.level,
            type: raw.type
          });
          continue;
        }
        if (normalized.level !== normalized.__rawLevel) {
          changes.levelChanged.push({
            source: rawSources[i].name,
            word: normalized.word,
            reading: normalized.reading,
            from: normalized.__rawLevel,
            to: normalized.level
          });
        }
        if (normalized.type !== normalized.__rawType) {
          changes.typeChanged.push({
            source: rawSources[i].name,
            word: normalized.word,
            reading: normalized.reading,
            from: normalized.__rawType,
            to: normalized.type
          });
        }
      }
    }

    return changes;
  };

  window.applyVocabCorrections = function () {
    return window.getNormalizedVocabSources();
  };

  window.applyVocabCorrections();
})();
