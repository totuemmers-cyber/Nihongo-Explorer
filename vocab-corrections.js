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

  function cloneExamples(examples) {
    if (!examples || !examples.length) return [];
    var next = [];
    for (var i = 0; i < examples.length; i++) {
      next.push(cloneItem(examples[i]));
    }
    return next;
  }

  function countOccurrences(text, needle) {
    if (!text || !needle) return 0;
    var count = 0;
    var fromIndex = 0;
    while (true) {
      var idx = text.indexOf(needle, fromIndex);
      if (idx === -1) break;
      count++;
      fromIndex = idx + needle.length;
    }
    return count;
  }

  function getExampleOverride(sourceName, item) {
    var overrides = window.VOCAB_EXAMPLE_OVERRIDES;
    var sourceOverrides = overrides && overrides[sourceName];
    return sourceOverrides ? sourceOverrides[itemKey(item)] : null;
  }

  function getExampleKindOrder(kind) {
    if (kind === 'teaching') return 0;
    if (kind === 'natural') return 1;
    return 2;
  }

  function sortExamplesForUse(examples) {
    if (!examples || examples.length < 2) return examples || [];
    var decorated = [];
    for (var i = 0; i < examples.length; i++) {
      decorated.push({ example: examples[i], index: i });
    }
    decorated.sort(function (a, b) {
      var orderA = getExampleKindOrder(a.example.kind);
      var orderB = getExampleKindOrder(b.example.kind);
      if (orderA !== orderB) return orderA - orderB;
      return a.index - b.index;
    });
    var sorted = [];
    for (var j = 0; j < decorated.length; j++) sorted.push(decorated[j].example);
    return sorted;
  }

  function normalizeExamples(examples) {
    return sortExamplesForUse(cloneExamples(examples));
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

    var exampleOverride = getExampleOverride(sourceName, item);
    if (exampleOverride && exampleOverride.examples) {
      normalized.__rawExamples = cloneExamples(item.examples || []);
      normalized.examples = normalizeExamples(exampleOverride.examples);
      normalized.__exampleOverrideApplied = true;
    }

    normalized.__normalized =
      normalized.word !== normalized.__rawWord ||
      normalized.reading !== normalized.__rawReading ||
      normalized.level !== normalized.__rawLevel ||
      normalized.type !== normalized.__rawType ||
      !!normalized.__exampleOverrideApplied;

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

  window.getOrderedVocabExamples = function (item) {
    if (!item || !item.examples) return [];
    return sortExamplesForUse(item.examples.slice());
  };

  window.getVocabExampleOverrideAudit = function (sources) {
    var rawSources = sources || buildDefaultSources();
    var normalizedSources = window.getNormalizedVocabSources(rawSources);
    var levels = { N5: 1, N4: 1, N3: 1, N2: 1, N1: 1 };
    var summaryByLevel = {};
    var malformed = [];
    var invalidTeaching = [];

    for (var level in levels) {
      if (levels.hasOwnProperty(level)) {
        summaryByLevel[level] = {
          total: 0,
          curated: 0,
          withTeaching: 0,
          withNatural: 0,
          withTeachingAndNatural: 0,
          teachingContextReady: 0
        };
      }
    }

    for (var i = 0; i < rawSources.length; i++) {
      var sourceName = rawSources[i].name;
      var sourceOverrides = window.VOCAB_EXAMPLE_OVERRIDES && window.VOCAB_EXAMPLE_OVERRIDES[sourceName];
      if (sourceOverrides) {
        for (var entryKey in sourceOverrides) {
          if (!sourceOverrides.hasOwnProperty(entryKey)) continue;
          var override = sourceOverrides[entryKey];
          if (!override || !override.examples || !override.examples.length) {
            malformed.push({ source: sourceName, key: entryKey, issue: 'missing-examples' });
            continue;
          }

          var teachingCount = 0;
          for (var j = 0; j < override.examples.length; j++) {
            var ex = override.examples[j];
            if (!ex || !ex.kind || !ex.japanese || !ex.romaji || !ex.german) {
              malformed.push({ source: sourceName, key: entryKey, issue: 'missing-fields', index: j });
              continue;
            }
            if (ex.kind !== 'teaching' && ex.kind !== 'natural') {
              malformed.push({ source: sourceName, key: entryKey, issue: 'unknown-kind', index: j, kind: ex.kind });
            }
            if (ex.kind === 'teaching') teachingCount++;
          }
          if (teachingCount !== 1) {
            malformed.push({ source: sourceName, key: entryKey, issue: 'invalid-teaching-count', count: teachingCount });
          }
        }
      }

      var items = normalizedSources[i].items || [];
      for (var k = 0; k < items.length; k++) {
        var item = items[k];
        var levelSummary = summaryByLevel[item.level];
        if (!levelSummary) continue;
        levelSummary.total++;
        if (!item.__exampleOverrideApplied) continue;

        levelSummary.curated++;
        var orderedExamples = window.getOrderedVocabExamples(item);
        var hasTeaching = false;
        var hasNatural = false;
        var teachingReady = false;
        for (var m = 0; m < orderedExamples.length; m++) {
          var example = orderedExamples[m];
          if (example.kind === 'teaching') {
            hasTeaching = true;
            if (countOccurrences(example.japanese || '', item.word || '') === 1) teachingReady = true;
          }
          if (example.kind === 'natural') hasNatural = true;
        }

        if (hasTeaching) levelSummary.withTeaching++;
        if (hasNatural) levelSummary.withNatural++;
        if (hasTeaching && hasNatural) levelSummary.withTeachingAndNatural++;
        if (teachingReady) levelSummary.teachingContextReady++;
        else if (hasTeaching) {
          invalidTeaching.push({
            source: item.__sourceName || sourceName,
            word: item.word,
            reading: item.reading,
            level: item.level
          });
        }
      }
    }

    return {
      byLevel: summaryByLevel,
      malformed: malformed,
      invalidTeaching: invalidTeaching
    };
  };

  window.getVocabNormalizationChanges = function (sources) {
    var rawSources = sources || buildDefaultSources();
    var normalizedSources = window.getNormalizedVocabSources(rawSources);
    var changes = {
      levelChanged: [],
      typeChanged: [],
      excluded: [],
      exampleChanged: []
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
        if (normalized.__exampleOverrideApplied) {
          changes.exampleChanged.push({
            source: rawSources[i].name,
            word: normalized.word,
            reading: normalized.reading,
            level: normalized.level
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
