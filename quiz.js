// ============================================================
// Quiz & Test System for Nihongo Explorer
// ============================================================
(function () {
  'use strict';

  // ==========================================================
  // A: CONSTANTS
  // ==========================================================

  var QUESTION_TYPES = {
    vocabMeaning:    { id: 'vocabMeaning',    group: 'Vokabeln',    label: 'Bedeutung erkennen',   icon: '意' },
    vocabReading:    { id: 'vocabReading',    group: 'Vokabeln',    label: 'Lesung erkennen',      icon: '読' },
    vocabReverse:    { id: 'vocabReverse',    group: 'Vokabeln',    label: 'Wort erkennen',        icon: '語' },
    vocabContext:    { id: 'vocabContext',    group: 'Vokabeln',    label: 'Kontextfrage',         icon: '文' },
    kanjiMeaning:    { id: 'kanjiMeaning',    group: 'Kanji',       label: 'Kanji-Bedeutung',     icon: '字' },
    kanjiReading:    { id: 'kanjiReading',    group: 'Kanji',       label: 'Kanji-Lesung',        icon: '音' },
    kanjiRadical:    { id: 'kanjiRadical',    group: 'Kanji',       label: 'Radikal erkennen',    icon: '部' },
    grammarMeaning:  { id: 'grammarMeaning',  group: 'Grammatik',   label: 'Grammatik-Bedeutung', icon: '文' },
    grammarCloze:    { id: 'grammarCloze',    group: 'Grammatik',   label: 'Lückentext',          icon: '穴' },
    grammarFormation:{ id: 'grammarFormation', group: 'Grammatik',  label: 'Satzbildung',         icon: '形' },
    conjugation:     { id: 'conjugation',     group: 'Konjugation', label: 'Konjugation',         icon: '動' }
  };

  var TYPE_IDS = Object.keys(QUESTION_TYPES);

  var JLPT_PASS_MARKS = {
    N1: 100,
    N2: 90,
    N3: 95,
    N4: 90,
    N5: 80
  };

  var JLPT_SCORING_SECTIONS = {
    N1: [
      { key: 'languageKnowledgeReading', label: 'Sprachwissen (Wortschatz/Grammatik)・Leseverständnis', max: 60, passMark: 19 }
    ],
    N2: [
      { key: 'languageKnowledgeReading', label: 'Sprachwissen (Wortschatz/Grammatik)・Leseverständnis', max: 60, passMark: 19 }
    ],
    N3: [
      { key: 'vocabulary', label: 'Sprachwissen (Wortschatz)', max: 60, passMark: 19 },
      { key: 'grammarReading', label: 'Sprachwissen (Grammatik)・Leseverständnis', max: 60, passMark: 19 }
    ],
    N4: [
      { key: 'languageKnowledgeReading', label: 'Sprachwissen (Wortschatz/Grammatik)・Leseverständnis', max: 120, passMark: 38 }
    ],
    N5: [
      { key: 'languageKnowledgeReading', label: 'Sprachwissen (Wortschatz/Grammatik)・Leseverständnis', max: 120, passMark: 38 }
    ]
  };

  var TEST_CONFIGS = {
    N5: { sections: [
      { name: 'Sprachwissen (Wortschatz)', count: 45, time: 20, scoringKey: 'languageKnowledgeReading', types: ['vocabMeaning','vocabReading','kanjiReading','vocabContext'] },
      { name: 'Sprachwissen (Grammatik)・Leseverständnis', count: 35, time: 40, scoringKey: 'languageKnowledgeReading', types: ['grammarMeaning','grammarCloze','grammarFormation','vocabContext'] }
    ]},
    N4: { sections: [
      { name: 'Sprachwissen (Wortschatz)', count: 50, time: 25, scoringKey: 'languageKnowledgeReading', types: ['vocabMeaning','vocabReading','kanjiReading','vocabContext'] },
      { name: 'Sprachwissen (Grammatik)・Leseverständnis', count: 40, time: 55, scoringKey: 'languageKnowledgeReading', types: ['grammarMeaning','grammarCloze','grammarFormation','vocabContext'] }
    ]},
    N3: { sections: [
      { name: 'Sprachwissen (Wortschatz)', count: 55, time: 30, scoringKey: 'vocabulary', types: ['vocabMeaning','vocabReading','kanjiReading','vocabContext'] },
      { name: 'Sprachwissen (Grammatik)・Leseverständnis', count: 50, time: 70, scoringKey: 'grammarReading', types: ['grammarMeaning','grammarCloze','grammarFormation','vocabContext'] }
    ]},
    N2: { sections: [
      { name: 'Sprachwissen (Wortschatz/Grammatik)・Leseverständnis', count: 60, time: 105, scoringKey: 'languageKnowledgeReading', types: ['vocabMeaning','vocabReading','kanjiReading','vocabContext','grammarMeaning','grammarCloze','grammarFormation'] }
    ]},
    N1: { sections: [
      { name: 'Sprachwissen (Wortschatz/Grammatik)・Leseverständnis', count: 65, time: 110, scoringKey: 'languageKnowledgeReading', types: ['vocabMeaning','vocabReading','kanjiReading','vocabContext','grammarMeaning','grammarCloze','grammarFormation'] }
    ]}
  };

  var LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'];

  var CONJ_FORM_KEYS = ['polite','negative','past','te','potential','passive','causative','conditional','volitional','imperative'];
  var STRICT_BEGINNER_LEVELS = { N5: true, N4: true };
  var STRICT_ALLOWED_LEVELS = {
    N5: ['N5'],
    N4: ['N4', 'N5']
  };
  var JAPANESE_CHAR_RE = /[\u3000-\u30ff\u3400-\u9faf\uff00-\uff9f]/;
  var KANJI_RE = /[\u3400-\u9faf]/;
  var beginnerReplacementCache = {};
  var beginnerSanitizationCache = {};

  function isStrictBeginnerLevel(level) {
    return !!STRICT_BEGINNER_LEVELS[level];
  }

  function hasJapaneseText(text) {
    return !!(text && JAPANESE_CHAR_RE.test(text));
  }

  function hasKanji(text) {
    return !!(text && KANJI_RE.test(text));
  }

  function getAllowedLevels(level) {
    return STRICT_ALLOWED_LEVELS[level] ? STRICT_ALLOWED_LEVELS[level].slice() : [level];
  }

  function dedupePoolByKey(pool, keyFn) {
    var seen = {};
    var unique = [];
    for (var i = 0; i < pool.length; i++) {
      var key = keyFn(pool[i]);
      if (!key || seen[key]) continue;
      seen[key] = true;
      unique.push(pool[i]);
    }
    return unique;
  }

  function getStrictLevelPool(getByLevel, level, keyFn) {
    var allowed = getAllowedLevels(level);
    var pool = [];
    for (var i = 0; i < allowed.length; i++) {
      pool = pool.concat(getByLevel(allowed[i]));
    }
    return keyFn ? dedupePoolByKey(pool, keyFn) : pool;
  }

  function buildBeginnerReplacementEntries(level) {
    if (beginnerReplacementCache[level]) return beginnerReplacementCache[level];

    var vocabPool = getStrictLevelPool(getVocabByLevel, level, function (item) {
      return (item.word || '') + '|' + (item.reading || '');
    });
    var replacementMap = {};
    var entries = [];

    for (var i = 0; i < vocabPool.length; i++) {
      var item = vocabPool[i];
      if (!item.word || !item.reading || item.word === item.reading || !hasKanji(item.word)) continue;
      if (!replacementMap[item.word]) replacementMap[item.word] = item.reading;
    }

    for (var source in replacementMap) {
      if (!Object.prototype.hasOwnProperty.call(replacementMap, source)) continue;
      entries.push({ source: source, target: replacementMap[source] });
    }

    entries.sort(function (a, b) {
      return b.source.length - a.source.length;
    });
    beginnerReplacementCache[level] = entries;
    return entries;
  }

  function replaceAllPlain(text, search, replacement) {
    return text.split(search).join(replacement);
  }

  function uniqueStrings(values) {
    var seen = {};
    var out = [];
    for (var i = 0; i < values.length; i++) {
      var value = values[i];
      if (!value || seen[value]) continue;
      seen[value] = true;
      out.push(value);
    }
    return out;
  }

  function sanitizeJapaneseForBeginnerLevel(text, level, preserveTokens) {
    if (!isStrictBeginnerLevel(level) || !hasJapaneseText(text)) return text;

    var tokens = uniqueStrings(preserveTokens || []).sort(function (a, b) {
      return b.length - a.length;
    });
    var cacheKey = level + '|' + text + '|' + tokens.join('\u0001');
    if (Object.prototype.hasOwnProperty.call(beginnerSanitizationCache, cacheKey)) {
      return beginnerSanitizationCache[cacheKey];
    }

    var quickValidationText = text;
    for (var q = 0; q < tokens.length; q++) {
      quickValidationText = replaceAllPlain(quickValidationText, tokens[q], '');
    }
    if (!hasKanji(quickValidationText)) {
      beginnerSanitizationCache[cacheKey] = text;
      return text;
    }

    var sanitized = text;
    var placeholders = [];
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (sanitized.indexOf(token) === -1) continue;
      var placeholder = '<<Q' + i + '>>';
      sanitized = replaceAllPlain(sanitized, token, placeholder);
      placeholders.push({ placeholder: placeholder, value: token });
    }

    var replacements = buildBeginnerReplacementEntries(level);
    for (var j = 0; j < replacements.length; j++) {
      if (sanitized.indexOf(replacements[j].source) !== -1) {
        sanitized = replaceAllPlain(sanitized, replacements[j].source, replacements[j].target);
      }
    }

    for (var k = 0; k < placeholders.length; k++) {
      sanitized = replaceAllPlain(sanitized, placeholders[k].placeholder, placeholders[k].value);
    }

    var validationText = sanitized;
    for (var m = 0; m < tokens.length; m++) {
      validationText = replaceAllPlain(validationText, tokens[m], '');
    }

    var result = hasKanji(validationText) ? null : sanitized;
    beginnerSanitizationCache[cacheKey] = result;
    return result;
  }

  function finalizeQuestion(question, level, meta) {
    if (!question) return null;

    var next = Object.assign({}, question);
    var auditMeta = Object.assign({}, meta || {});
    var preserveTokens = auditMeta.preserveTokens || [];

    if (isStrictBeginnerLevel(level)) {
      if (next.promptMain && hasJapaneseText(next.promptMain)) {
        next.promptMain = sanitizeJapaneseForBeginnerLevel(next.promptMain, level, preserveTokens);
        if (!next.promptMain) return null;
      }
      if (next.promptSub && hasJapaneseText(next.promptSub)) {
        next.promptSub = sanitizeJapaneseForBeginnerLevel(next.promptSub, level, preserveTokens);
        if (!next.promptSub) return null;
      }
      if (next.explanation && hasJapaneseText(next.explanation)) {
        next.explanation = sanitizeJapaneseForBeginnerLevel(next.explanation, level, preserveTokens) || '';
      }
    }

    next.auditMeta = auditMeta;
    return next;
  }

  // ==========================================================
  // B: DATA ACCESSORS
  // ==========================================================

  function getVocabByLevel(level) {
    var sec = window.app && window.app.sections.vocab;
    if (!sec) return [];
    return sec.allItems.filter(function (v) { return v.level === level; });
  }

  function getAllVocab() {
    var sec = window.app && window.app.sections.vocab;
    return sec ? sec.allItems : [];
  }

  function getKanjiByLevel(level) {
    var sec = window.app && window.app.sections.kanji;
    if (!sec) return [];
    return sec.allItems.filter(function (k) { return k.jlpt === level; });
  }

  function getAllKanji() {
    var sec = window.app && window.app.sections.kanji;
    return sec ? sec.allItems : [];
  }

  function getGrammarByLevel(level) {
    var sec = window.app && window.app.sections.grammar;
    if (!sec) return [];
    return sec.allItems.filter(function (g) { return g.level === level; });
  }

  function getAllGrammar() {
    var sec = window.app && window.app.sections.grammar;
    return sec ? sec.allItems : [];
  }

  function getTestConfig(level) {
    return TEST_CONFIGS[level] || null;
  }

  function getScoringSections(level) {
    return JLPT_SCORING_SECTIONS[level] || [];
  }

  function getSectionTotals(level) {
    var scoring = getScoringSections(level);
    var total = 0;
    scoring.forEach(function (s) {
      total += s.max;
    });
    var overallPassMark = JLPT_PASS_MARKS[level] || 0;
    return {
      overallPassMark: overallPassMark,
      simulatedOfficialMax: total,
      scoringSections: scoring
    };
  }

  function resolveVerbConjugation(item) {
    if (!window.resolveVocabVerbConjugation) return null;
    return window.resolveVocabVerbConjugation(item);
  }

  function getVerbsForConjugation(level) {
    var vocab = level ? getVocabByLevel(level) : getAllVocab();
    return vocab.filter(function (v) {
      return !!resolveVerbConjugation(v);
    });
  }

  // ==========================================================
  // C: DISTRACTOR GENERATOR
  // ==========================================================

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function generateDistractors(correct, pool, count, keyFn) {
    var correctKey = keyFn(correct);
    var candidates = [];
    for (var i = 0; i < pool.length; i++) {
      var k = keyFn(pool[i]);
      if (k && k !== correctKey) {
        candidates.push(k);
      }
    }
    // Deduplicate
    var seen = {};
    var unique = [];
    for (var j = 0; j < candidates.length; j++) {
      if (!seen[candidates[j]]) {
        seen[candidates[j]] = true;
        unique.push(candidates[j]);
      }
    }
    return shuffle(unique).slice(0, count);
  }

  function buildChoices(correctAnswer, distractors) {
    var all = [correctAnswer].concat(distractors.slice(0, 3));
    // Pad if not enough distractors
    while (all.length < 4) {
      all.push('\u2014');
    }
    var shuffled = shuffle(all);
    return {
      choices: shuffled,
      correctIndex: shuffled.indexOf(correctAnswer)
    };
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

  function buildSingleBlankSentence(text, needle) {
    if (countOccurrences(text, needle) !== 1) return null;
    return text.replace(needle, '\uFF3F\uFF3F\uFF3F');
  }

  function getGrammarPatternVariants(pattern) {
    var raw = String(pattern || '').split(/[\/／]/);
    var variants = [];
    var seen = {};
    for (var i = 0; i < raw.length; i++) {
      var value = raw[i]
        .replace(/[～~]/g, '')
        .replace(/\s+/g, '')
        .trim();
      if (!value || seen[value]) continue;
      seen[value] = true;
      variants.push(value);
    }
    return variants;
  }

  function buildGrammarBlankSentence(text, pattern) {
    var variants = getGrammarPatternVariants(pattern);
    var match = null;
    for (var i = 0; i < variants.length; i++) {
      var variant = variants[i];
      if (countOccurrences(text, variant) !== 1) continue;
      if (match) return null;
      match = variant;
    }
    return match ? text.replace(match, '\uFF3F\uFF3F\uFF3F') : null;
  }

  function getOrderedExamples(item) {
    if (window.getOrderedVocabExamples) return window.getOrderedVocabExamples(item);
    return item && item.examples ? item.examples.slice() : [];
  }

  function getConjugationGroupLabel(result, level) {
    if (!result) return '';
    if (!isStrictBeginnerLevel(level)) return result.groupLabel || '';
    var kanaLabels = {
      godan: 'ごだんどうし',
      ichidan: 'いちだんどうし',
      suru: 'するどうし',
      kuru: 'くるどうし',
      aru: 'ある'
    };
    return kanaLabels[result.group] || result.groupLabel || '';
  }

  // ==========================================================
  // D: QUESTION GENERATORS
  // ==========================================================

  function getLevelPool(getByLevel, level) {
    if (isStrictBeginnerLevel(level)) {
      return getStrictLevelPool(getByLevel, level, function (item) {
        return (item.id || item.kanji || item.word || item.pattern || '') + '|' + (item.reading || item.jlpt || item.level || '');
      });
    }
    var pool = getByLevel(level);
    if (pool.length < 10) {
      // Expand to adjacent levels
      var idx = LEVELS.indexOf(level);
      if (idx > 0) pool = pool.concat(getByLevel(LEVELS[idx - 1]));
      if (idx < LEVELS.length - 1) pool = pool.concat(getByLevel(LEVELS[idx + 1]));
    }
    return pool;
  }

  // 1. Vocab Meaning: word → meaning
  function genVocabMeaning(level) {
    var pool = getLevelPool(getVocabByLevel, level);
    if (pool.length < 4) return null;
    var item = pickRandom(pool);
    var distractors = generateDistractors(item, pool, 3, function (v) { return v.meaning; });
    if (distractors.length < 3) return null;
    var c = buildChoices(item.meaning, distractors);
    return finalizeQuestion({
      type: 'vocabMeaning', level: level,
      prompt: 'Was bedeutet dieses Wort?',
      promptMain: item.word,
      promptSub: item.reading,
      choices: c.choices, correctIndex: c.correctIndex,
      explanation: item.word + ' (' + item.reading + ') = ' + item.meaning
    }, level, {
      sourceLevel: item.level,
      preserveTokens: [item.word]
    });
  }

  // 2. Vocab Reading: kanji word → reading
  function genVocabReading(level) {
    var pool = getLevelPool(getVocabByLevel, level).filter(function (v) { return v.word !== v.reading; });
    if (pool.length < 4) return null;
    var item = pickRandom(pool);
    var distractors = generateDistractors(item, pool, 3, function (v) { return v.reading; });
    if (distractors.length < 3) return null;
    var c = buildChoices(item.reading, distractors);
    return finalizeQuestion({
      type: 'vocabReading', level: level,
      prompt: 'Wie liest man dieses Wort?',
      promptMain: item.word,
      promptSub: item.meaning,
      choices: c.choices, correctIndex: c.correctIndex,
      explanation: item.word + ' wird ' + item.reading + ' gelesen'
    }, level, {
      sourceLevel: item.level,
      preserveTokens: [item.word]
    });
  }

  // 3. Vocab Reverse: meaning → word
  function genVocabReverse(level) {
    var pool = getLevelPool(getVocabByLevel, level);
    if (pool.length < 4) return null;
    var item = pickRandom(pool);
    var distractors = generateDistractors(item, pool, 3, function (v) { return v.word; });
    if (distractors.length < 3) return null;
    var c = buildChoices(item.word, distractors);
    return finalizeQuestion({
      type: 'vocabReverse', level: level,
      prompt: 'Welches Wort bedeutet:',
      promptMain: item.meaning,
      promptSub: '',
      choices: c.choices, correctIndex: c.correctIndex,
      explanation: item.meaning + ' = ' + item.word + ' (' + item.reading + ')'
    }, level, {
      sourceLevel: item.level,
      preserveTokens: [item.word]
    });
  }

  // 4. Vocab Context: sentence with blank → word
  function genVocabContext(level) {
    var pool = getLevelPool(getVocabByLevel, level).filter(function (v) {
      if (!v.examples || v.examples.length === 0) return false;
      var examples = getOrderedExamples(v);
      for (var i = 0; i < examples.length; i++) {
        var sentence = buildSingleBlankSentence(examples[i].japanese, v.word);
        if (!sentence) continue;
        if (!isStrictBeginnerLevel(level)) return true;
        if (sanitizeJapaneseForBeginnerLevel(sentence, level, [])) return true;
      }
      return false;
    });
    if (pool.length < 4) return null;
    var item = pickRandom(pool);
    var ex = null;
    var orderedExamples = getOrderedExamples(item);
    for (var i = 0; i < orderedExamples.length; i++) {
      var candidate = buildSingleBlankSentence(orderedExamples[i].japanese, item.word);
      if (!candidate) continue;
      if (isStrictBeginnerLevel(level) && !sanitizeJapaneseForBeginnerLevel(candidate, level, [])) continue;
      ex = orderedExamples[i];
      break;
    }
    if (!ex) return null;
    var sentence = buildSingleBlankSentence(ex.japanese, item.word);
    if (!sentence) return null;
    var distractors = generateDistractors(item, pool, 3, function (v) { return v.word; });
    if (distractors.length < 3) return null;
    var c = buildChoices(item.word, distractors);
    return finalizeQuestion({
      type: 'vocabContext', level: level,
      prompt: 'Welches Wort passt in die Lücke?',
      promptMain: sentence,
      promptSub: ex.german,
      choices: c.choices, correctIndex: c.correctIndex,
      explanation: item.word + ' (' + item.reading + ') — ' + ex.japanese
    }, level, {
      sourceLevel: item.level
    });
  }

  // 5. Kanji Meaning: kanji → meaning
  function genKanjiMeaning(level) {
    var pool = getLevelPool(getKanjiByLevel, level);
    if (pool.length < 4) return null;
    var item = pickRandom(pool);
    var correctMeaning = item.meanings[0];
    var distractors = generateDistractors(item, pool, 3, function (k) { return k.meanings[0]; });
    if (distractors.length < 3) return null;
    var c = buildChoices(correctMeaning, distractors);
    return finalizeQuestion({
      type: 'kanjiMeaning', level: level,
      prompt: 'Was bedeutet dieses Kanji?',
      promptMain: item.kanji,
      promptSub: '',
      choices: c.choices, correctIndex: c.correctIndex,
      explanation: item.kanji + ' = ' + item.meanings.join(', ')
    }, level, {
      sourceLevel: item.jlpt,
      preserveTokens: [item.kanji]
    });
  }

  // 6. Kanji Reading: kanji → reading
  function genKanjiReading(level) {
    var pool = getLevelPool(getKanjiByLevel, level).filter(function (k) {
      return (k.kun && k.kun.length > 0) || (k.on && k.on.length > 0);
    });
    if (pool.length < 4) return null;
    var item = pickRandom(pool);
    var readings = [];
    if (item.kun) item.kun.forEach(function (r) { readings.push(r.kana); });
    if (item.on) item.on.forEach(function (r) { readings.push(r.kana); });
    if (readings.length === 0) return null;
    var correctReading = readings[0];
    var distractors = generateDistractors(item, pool, 3, function (k) {
      var r = [];
      if (k.kun && k.kun.length) r.push(k.kun[0].kana);
      else if (k.on && k.on.length) r.push(k.on[0].kana);
      return r[0] || '';
    });
    if (distractors.length < 3) return null;
    var c = buildChoices(correctReading, distractors);
    return finalizeQuestion({
      type: 'kanjiReading', level: level,
      prompt: 'Wie kann man dieses Kanji lesen?',
      promptMain: item.kanji,
      promptSub: item.meanings[0],
      choices: c.choices, correctIndex: c.correctIndex,
      explanation: item.kanji + ': ' + readings.join(', ')
    }, level, {
      sourceLevel: item.jlpt,
      preserveTokens: [item.kanji]
    });
  }

  // 7. Kanji Radical: kanji → radical
  function genKanjiRadical(level) {
    var radicals = window.KANGXI_RADICALS || [];
    var pool = getLevelPool(getKanjiByLevel, level).filter(function (k) {
      return !!(window.getPrimaryKanjiRadical && window.getPrimaryKanjiRadical(k));
    });
    if (pool.length < 4) return null;
    var item = pickRandom(pool);
    var radicalInfo = window.getPrimaryKanjiRadical ? window.getPrimaryKanjiRadical(item) : null;
    if (!radicalInfo) return null;

    var correctAnswer = radicalInfo.radical + ' (' + radicalInfo.meaning + ')';
    var distractorPool = radicals.filter(function (r) { return r.radical !== radicalInfo.radical; });
    var distrs = shuffle(distractorPool).slice(0, 3).map(function (r) {
      return r.radical + ' (' + r.meaning + ')';
    });
    if (distrs.length < 3) return null;
    var c = buildChoices(correctAnswer, distrs);
    return finalizeQuestion({
      type: 'kanjiRadical', level: level,
      prompt: 'Welches Radikal ist in diesem Kanji enthalten?',
      promptMain: item.kanji,
      promptSub: item.meanings[0],
      choices: c.choices, correctIndex: c.correctIndex,
      explanation: item.kanji + ' hat als Prim\u00e4rradikal ' + correctAnswer
    }, level, {
      sourceLevel: item.jlpt,
      preserveTokens: [item.kanji]
    });
  }

  // 8. Grammar Meaning: pattern → meaning
  function genGrammarMeaning(level) {
    var pool = getLevelPool(getGrammarByLevel, level);
    if (pool.length < 4) return null;
    var item = pickRandom(pool);
    var distractors = generateDistractors(item, pool, 3, function (g) { return g.meaning; });
    if (distractors.length < 3) return null;
    var c = buildChoices(item.meaning, distractors);
    return finalizeQuestion({
      type: 'grammarMeaning', level: level,
      prompt: 'Was bedeutet dieses Grammatikmuster?',
      promptMain: item.pattern,
      promptSub: item.formation || '',
      choices: c.choices, correctIndex: c.correctIndex,
      explanation: item.pattern + ' = ' + item.meaning
    }, level, {
      sourceLevel: item.level,
      preserveTokens: [item.pattern]
    });
  }

  // 9. Grammar Cloze: sentence blank → pattern
  function genGrammarCloze(level) {
    var pool = getLevelPool(getGrammarByLevel, level).filter(function (g) {
      if (!g.examples || g.examples.length === 0) return false;
      for (var i = 0; i < g.examples.length; i++) {
        var sentence = buildGrammarBlankSentence(g.examples[i].japanese, g.pattern);
        if (!sentence) continue;
        if (!isStrictBeginnerLevel(level)) return true;
        if (sanitizeJapaneseForBeginnerLevel(sentence, level, [])) return true;
      }
      return false;
    });
    if (pool.length < 4) return null;
    var item = pickRandom(pool);
    var ex = null;
    for (var i = 0; i < item.examples.length; i++) {
      var candidate = buildGrammarBlankSentence(item.examples[i].japanese, item.pattern);
      if (!candidate) continue;
      if (isStrictBeginnerLevel(level) && !sanitizeJapaneseForBeginnerLevel(candidate, level, [])) continue;
      ex = item.examples[i];
      break;
    }
    if (!ex) return null;
    var sentence = buildGrammarBlankSentence(ex.japanese, item.pattern);
    if (!sentence) return null;
    var distractors = generateDistractors(item, pool, 3, function (g) { return g.pattern; });
    if (distractors.length < 3) return null;
    var c = buildChoices(item.pattern, distractors);
    return finalizeQuestion({
      type: 'grammarCloze', level: level,
      prompt: 'Welches Grammatikmuster passt in die Lücke?',
      promptMain: sentence,
      promptSub: ex.german,
      choices: c.choices, correctIndex: c.correctIndex,
      explanation: item.pattern + ' — ' + ex.japanese
    }, level, {
      sourceLevel: item.level
    });
  }

  // 10. Grammar Formation: meaning → formation
  function genGrammarFormation(level) {
    var pool = getLevelPool(getGrammarByLevel, level).filter(function (g) { return g.formation; });
    if (pool.length < 4) return null;
    var item = pickRandom(pool);
    var distractors = generateDistractors(item, pool, 3, function (g) { return g.formation; });
    if (distractors.length < 3) return null;
    var c = buildChoices(item.formation, distractors);
    return finalizeQuestion({
      type: 'grammarFormation', level: level,
      prompt: 'Wie wird dieses Muster gebildet?',
      promptMain: item.pattern,
      promptSub: item.meaning,
      choices: c.choices, correctIndex: c.correctIndex,
      explanation: item.pattern + ': ' + item.formation
    }, level, {
      sourceLevel: item.level,
      preserveTokens: [item.pattern]
    });
  }

  // 11. Conjugation: verb + target form → conjugated
  function genConjugation(level) {
    var verbs = getVerbsForConjugation(level);
    if (verbs.length < 1) return null;
    var item = pickRandom(verbs);
    var resolved = resolveVerbConjugation(item);
    if (!resolved || !resolved.result || !resolved.result.forms) return null;
    var result = resolved.result;
    var viableFormKeys = CONJ_FORM_KEYS.filter(function (key) {
      if (!result.forms[key]) return false;
      var seen = {};
      var uniqueCount = 0;
      for (var formName in result.forms) {
        if (!result.forms[formName]) continue;
        var japanese = result.forms[formName].japanese;
        if (seen[japanese]) continue;
        seen[japanese] = true;
        uniqueCount++;
      }
      return uniqueCount >= 4;
    });
    if (!viableFormKeys.length) return null;
    var formKey = pickRandom(viableFormKeys);
    var targetForm = result.forms[formKey];
    if (!targetForm) return null;
    var distractorValues = [];
    var seenValues = {};

    for (var key in result.forms) {
      if (!result.forms[key] || key === formKey) continue;
      var value = result.forms[key].japanese;
      if (!value || value === targetForm.japanese || seenValues[value]) continue;
      seenValues[value] = true;
      distractorValues.push(value);
    }

    distractorValues = shuffle(distractorValues);
    if (distractorValues.length < 3) return null;
    var c = buildChoices(targetForm.japanese, distractorValues.slice(0, 3));
    return finalizeQuestion({
      type: 'conjugation', level: level,
      prompt: targetForm.label + ' von:',
      promptMain: item.word || item.reading,
      promptSub: item.meaning + ' (' + getConjugationGroupLabel(result, level) + ')',
      choices: c.choices, correctIndex: c.correctIndex,
      explanation: resolved.reading + ' → ' + targetForm.label + ': ' + targetForm.japanese
    }, level, {
      sourceLevel: item.level,
      preserveTokens: [item.word || item.reading]
    });
  }

  var GENERATORS = {
    vocabMeaning: genVocabMeaning,
    vocabReading: genVocabReading,
    vocabReverse: genVocabReverse,
    vocabContext: genVocabContext,
    kanjiMeaning: genKanjiMeaning,
    kanjiReading: genKanjiReading,
    kanjiRadical: genKanjiRadical,
    grammarMeaning: genGrammarMeaning,
    grammarCloze: genGrammarCloze,
    grammarFormation: genGrammarFormation,
    conjugation: genConjugation
  };

  function generateQuestion(typeId, level) {
    var gen = GENERATORS[typeId];
    if (!gen) return null;
    // Try up to 5 times for valid question
    for (var i = 0; i < 5; i++) {
      var q = gen(level);
      if (q) return q;
    }
    return null;
  }

  // ==========================================================
  // E: SHARED UI BUILDERS
  // ==========================================================

  var dom = {};

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  function formatTime(seconds) {
    var m = Math.floor(seconds / 60);
    var s = seconds % 60;
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }

  function renderChoiceButtons(question, container, onSelect) {
    container.innerHTML = '';
    var grid = el('div', 'quiz-choices-grid');
    for (var i = 0; i < question.choices.length; i++) {
      (function (idx) {
        var btn = el('button', 'quiz-choice-btn');
        var numSpan = el('span', 'quiz-choice-num', String(idx + 1));
        var textSpan = el('span', 'quiz-choice-text', question.choices[idx]);
        btn.appendChild(numSpan);
        btn.appendChild(textSpan);
        btn.addEventListener('click', function () { onSelect(idx); });
        grid.appendChild(btn);
      })(i);
    }
    container.appendChild(grid);
  }

  function showFeedback(container, selectedIdx, correctIdx) {
    var btns = container.querySelectorAll('.quiz-choice-btn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].disabled = true;
      if (i === correctIdx) btns[i].classList.add('correct');
      if (i === selectedIdx && selectedIdx !== correctIdx) btns[i].classList.add('wrong');
    }
  }

  function renderQuestionCard(question, container) {
    container.innerHTML = '';
    var card = el('div', 'quiz-question-card');

    var typeBadge = el('span', 'quiz-type-badge', QUESTION_TYPES[question.type].label);
    var levelBadge = el('span', 'quiz-level-badge ' + question.level.toLowerCase(), question.level);
    var badges = el('div', 'quiz-badges');
    badges.appendChild(typeBadge);
    badges.appendChild(levelBadge);
    card.appendChild(badges);

    var prompt = el('p', 'quiz-prompt', question.prompt);
    card.appendChild(prompt);

    if (question.promptMain) {
      var isJapanese = /[\u3000-\u9faf\u3040-\u30ff\uff00-\uff9f]/.test(question.promptMain);
      var mainEl = el('div', 'quiz-prompt-main' + (isJapanese ? ' jp' : ''), question.promptMain);
      card.appendChild(mainEl);
    }

    if (question.promptSub) {
      var sub = el('p', 'quiz-prompt-sub', question.promptSub);
      card.appendChild(sub);
    }

    var choicesDiv = el('div', 'quiz-choices');
    card.appendChild(choicesDiv);

    var explDiv = el('div', 'quiz-explanation hidden');
    card.appendChild(explDiv);

    container.appendChild(card);
    return { choicesDiv: choicesDiv, explDiv: explDiv, card: card };
  }

  // ==========================================================
  // F: BROWSE MODE CONTROLLER
  // ==========================================================

  var browseState = {
    currentType: 'vocabMeaning',
    currentLevel: 'N5',
    question: null,
    answered: false,
    revealed: false
  };

  function initBrowseMode() {
    var panel = dom.quizContent;
    panel.innerHTML = '';

    var controls = el('div', 'quiz-browse-controls');

    // Type selector (grouped)
    var typeSelect = document.createElement('select');
    typeSelect.className = 'quiz-type-select';
    var groups = {};
    TYPE_IDS.forEach(function (id) {
      var t = QUESTION_TYPES[id];
      if (!groups[t.group]) groups[t.group] = [];
      groups[t.group].push(t);
    });
    Object.keys(groups).forEach(function (grp) {
      var optgroup = document.createElement('optgroup');
      optgroup.label = grp;
      groups[grp].forEach(function (t) {
        var opt = document.createElement('option');
        opt.value = t.id;
        opt.textContent = t.icon + ' ' + t.label;
        if (t.id === browseState.currentType) opt.selected = true;
        optgroup.appendChild(opt);
      });
      typeSelect.appendChild(optgroup);
    });
    typeSelect.addEventListener('change', function () {
      browseState.currentType = this.value;
      loadBrowseQuestion();
    });
    controls.appendChild(typeSelect);

    // Level pills
    var levelBar = el('div', 'quiz-level-bar');
    LEVELS.forEach(function (lv) {
      var pill = el('button', 'quiz-level-pill' + (lv === browseState.currentLevel ? ' active' : '') + ' ' + lv.toLowerCase(), lv);
      pill.addEventListener('click', function () {
        browseState.currentLevel = lv;
        levelBar.querySelectorAll('.quiz-level-pill').forEach(function (p) {
          p.classList.toggle('active', p.textContent === lv);
        });
        loadBrowseQuestion();
      });
      levelBar.appendChild(pill);
    });
    controls.appendChild(levelBar);

    panel.appendChild(controls);

    // Question area
    var questionArea = el('div', 'quiz-question-area');
    questionArea.id = 'quiz-question-area';
    panel.appendChild(questionArea);

    // Action buttons
    var actions = el('div', 'quiz-browse-actions');
    var revealBtn = el('button', 'quiz-btn quiz-btn-reveal', 'Auflösen');
    revealBtn.id = 'quiz-reveal-btn';
    revealBtn.addEventListener('click', revealBrowseAnswer);
    actions.appendChild(revealBtn);

    var nextBtn = el('button', 'quiz-btn quiz-btn-next hidden', 'Nächste Frage');
    nextBtn.id = 'quiz-next-btn';
    nextBtn.addEventListener('click', loadBrowseQuestion);
    actions.appendChild(nextBtn);

    var backBtn = el('button', 'quiz-btn quiz-btn-back', 'Zurück');
    backBtn.addEventListener('click', showHomeScreen);
    actions.appendChild(backBtn);

    panel.appendChild(actions);

    loadBrowseQuestion();
  }

  function loadBrowseQuestion() {
    browseState.answered = false;
    browseState.revealed = false;
    var area = document.getElementById('quiz-question-area');
    if (!area) return;

    var q = generateQuestion(browseState.currentType, browseState.currentLevel);
    browseState.question = q;

    if (!q) {
      area.innerHTML = '<div class="quiz-no-data">Nicht genügend Daten für diesen Fragetyp und dieses Level verfügbar.</div>';
      return;
    }

    var parts = renderQuestionCard(q, area);

    renderChoiceButtons(q, parts.choicesDiv, function (idx) {
      if (browseState.answered) return;
      browseState.answered = true;
      browseState.selectedIdx = idx;
      // Highlight selected
      var btns = parts.choicesDiv.querySelectorAll('.quiz-choice-btn');
      btns[idx].classList.add('selected');
      if (window.app) window.app.playTick();
    });

    // Reset buttons
    var revealBtn = document.getElementById('quiz-reveal-btn');
    var nextBtn = document.getElementById('quiz-next-btn');
    if (revealBtn) { revealBtn.classList.remove('hidden'); revealBtn.disabled = false; }
    if (nextBtn) nextBtn.classList.add('hidden');
  }

  function revealBrowseAnswer() {
    if (!browseState.question || browseState.revealed) return;
    browseState.revealed = true;

    var area = document.getElementById('quiz-question-area');
    if (!area) return;
    var choicesDiv = area.querySelector('.quiz-choices');
    var explDiv = area.querySelector('.quiz-explanation');
    var selectedIdx = browseState.answered ? browseState.selectedIdx : -1;

    showFeedback(choicesDiv, selectedIdx, browseState.question.correctIndex);

    if (explDiv) {
      explDiv.textContent = browseState.question.explanation;
      explDiv.classList.remove('hidden');
    }

    if (selectedIdx === browseState.question.correctIndex) {
      if (window.app) window.app.playPop();
    }

    var revealBtn = document.getElementById('quiz-reveal-btn');
    var nextBtn = document.getElementById('quiz-next-btn');
    if (revealBtn) revealBtn.classList.add('hidden');
    if (nextBtn) nextBtn.classList.remove('hidden');
  }

  // ==========================================================
  // G: TEST MODE CONTROLLER
  // ==========================================================

  var testState = {
    active: false,
    level: null,
    config: null,
    sections: [],
    currentSection: 0,
    currentQuestion: 0,
    answers: [],
    timerInterval: null,
    sectionEndTime: 0
  };

  function showTestSetup() {
    var panel = dom.quizContent;
    panel.innerHTML = '';

    var setup = el('div', 'quiz-test-setup');
    var title = el('h2', 'quiz-setup-title', 'JLPT Prüfungsmodus');
    setup.appendChild(title);
    var desc = el('p', 'quiz-setup-desc', 'Wähle ein Level für die JLPT-nahe Prüfung ohne Hörverstehen. Die Auswertung nutzt die offiziellen Abschnittsnamen, Zeitbudgets und JLPT-Passmarken, hochgerechnet auf die sichtbaren Testabschnitte.');
    setup.appendChild(desc);

    var levelGrid = el('div', 'quiz-test-level-grid');
    LEVELS.forEach(function (lv) {
      var cfg = TEST_CONFIGS[lv];
      var total = 0, totalTime = 0;
      cfg.sections.forEach(function (s) { total += s.count; totalTime += s.time; });

      var card = el('div', 'quiz-test-level-card');
      var badge = el('div', 'quiz-test-level-badge ' + lv.toLowerCase(), lv);
      card.appendChild(badge);
      var info = el('div', 'quiz-test-level-info');
      info.innerHTML = '<span>' + total + ' Fragen</span><span>' + totalTime + ' Minuten</span><span>' + (cfg.sections.length === 1 ? '1 sichtbarer Abschnitt' : cfg.sections.length + ' sichtbare Abschnitte') + '</span>';
      card.appendChild(info);
      card.addEventListener('click', function () { startTest(lv); });
      levelGrid.appendChild(card);
    });
    setup.appendChild(levelGrid);

    var backBtn = el('button', 'quiz-btn quiz-btn-back', 'Zurück');
    backBtn.addEventListener('click', showHomeScreen);
    setup.appendChild(backBtn);

    panel.appendChild(setup);
  }

  function startTest(level) {
    var cfg = getTestConfig(level);
    if (!cfg) return;

    testState.active = true;
    testState.level = level;
    testState.config = cfg;
    testState.currentSection = 0;
    testState.currentQuestion = 0;
    testState.answers = [];
    testState.sections = [];

    // Pre-generate all questions
    for (var s = 0; s < cfg.sections.length; s++) {
      var sec = cfg.sections[s];
      var questions = [];
      for (var q = 0; q < sec.count; q++) {
        var typeId = sec.types[q % sec.types.length];
        var question = generateQuestion(typeId, level);
        // Fallback: try other types
        if (!question) {
          for (var t = 0; t < sec.types.length; t++) {
            question = generateQuestion(sec.types[t], level);
            if (question) break;
          }
        }
        if (question) {
          questions.push(question);
        }
      }
      testState.sections.push({
        name: sec.name,
        time: sec.time,
        scoringKey: sec.scoringKey,
        questions: questions,
        answers: [],
        score: 0
      });
    }

    startTestSection(0);
  }

  function startTestSection(sectionIdx) {
    testState.currentSection = sectionIdx;
    testState.currentQuestion = 0;

    var sec = testState.sections[sectionIdx];
    testState.sectionEndTime = Date.now() + sec.time * 60 * 1000;

    startTimer();
    renderTestQuestion();
  }

  function startTimer() {
    stopTimer();
    testState.timerInterval = setInterval(function () {
      var remaining = Math.max(0, Math.ceil((testState.sectionEndTime - Date.now()) / 1000));
      var timerEl = document.getElementById('quiz-timer');
      if (timerEl) {
        timerEl.textContent = formatTime(remaining);
        timerEl.classList.toggle('warning', remaining <= 60);
        timerEl.classList.toggle('critical', remaining <= 10);
      }
      // Update progress bar time
      var sec = testState.sections[testState.currentSection];
      if (sec) {
        var totalSec = sec.time * 60;
        var elapsed = totalSec - remaining;
        var timeBar = document.getElementById('quiz-time-bar');
        if (timeBar) timeBar.style.width = Math.min(100, (elapsed / totalSec) * 100) + '%';
      }
      if (remaining <= 0) {
        // Time's up — auto-finish remaining questions as unanswered
        finishCurrentSection();
      }
    }, 250);
  }

  function stopTimer() {
    if (testState.timerInterval) {
      clearInterval(testState.timerInterval);
      testState.timerInterval = null;
    }
  }

  function renderTestQuestion() {
    var panel = dom.quizContent;
    panel.innerHTML = '';

    var secData = testState.sections[testState.currentSection];
    var qIdx = testState.currentQuestion;

    if (qIdx >= secData.questions.length) {
      finishCurrentSection();
      return;
    }

    var question = secData.questions[qIdx];

    // Header bar
    var header = el('div', 'quiz-test-header');
    var secLabel = el('span', 'quiz-test-section-label', 'Abschnitt ' + (testState.currentSection + 1) + ': ' + secData.name);
    header.appendChild(secLabel);
    var progress = el('span', 'quiz-test-progress', (qIdx + 1) + ' / ' + secData.questions.length);
    header.appendChild(progress);
    var timer = el('span', 'quiz-timer');
    timer.id = 'quiz-timer';
    var remaining = Math.max(0, Math.ceil((testState.sectionEndTime - Date.now()) / 1000));
    timer.textContent = formatTime(remaining);
    header.appendChild(timer);
    panel.appendChild(header);

    // Progress bars
    var progressBars = el('div', 'quiz-progress-bars');
    var qBar = el('div', 'quiz-progress-bar');
    var qFill = el('div', 'quiz-progress-fill');
    qFill.style.width = ((qIdx + 1) / secData.questions.length * 100) + '%';
    qBar.appendChild(qFill);
    progressBars.appendChild(qBar);
    var tBar = el('div', 'quiz-progress-bar time');
    var tFill = el('div', 'quiz-progress-fill time');
    tFill.id = 'quiz-time-bar';
    tBar.appendChild(tFill);
    progressBars.appendChild(tBar);
    panel.appendChild(progressBars);

    // Question card
    var questionArea = el('div', 'quiz-question-area');
    var parts = renderQuestionCard(question, questionArea);
    panel.appendChild(questionArea);

    // Action buttons
    var actions = el('div', 'quiz-browse-actions');
    var nextBtn = el('button', 'quiz-btn quiz-btn-next hidden', 'Nächste Frage');
    nextBtn.id = 'quiz-test-next-btn';
    nextBtn.addEventListener('click', function () {
      testState.currentQuestion++;
      renderTestQuestion();
    });
    actions.appendChild(nextBtn);
    panel.appendChild(actions);

    renderChoiceButtons(question, parts.choicesDiv, function (idx) {
      // Lock answer
      showFeedback(parts.choicesDiv, idx, question.correctIndex);
      var correct = idx === question.correctIndex;
      secData.answers.push({ questionIdx: qIdx, selected: idx, correct: correct });
      if (correct) secData.score++;

      if (correct && window.app) window.app.playPop();
      else if (window.app) window.app.playTick();

      // Show explanation briefly
      if (parts.explDiv) {
        parts.explDiv.textContent = question.explanation;
        parts.explDiv.classList.remove('hidden');
      }

      // Reveal the manual advance action after the answer is shown.
      nextBtn.classList.remove('hidden');
    });
  }

  function finishCurrentSection() {
    stopTimer();

    var secData = testState.sections[testState.currentSection];
    // Mark unanswered questions
    while (secData.answers.length < secData.questions.length) {
      secData.answers.push({ questionIdx: secData.answers.length, selected: -1, correct: false });
    }

    // Show section interstitial
    var panel = dom.quizContent;
    panel.innerHTML = '';

    var inter = el('div', 'quiz-interstitial');
    var title = el('h2', 'quiz-inter-title', 'Abschnitt ' + (testState.currentSection + 1) + ' abgeschlossen');
    inter.appendChild(title);
    var secName = el('p', 'quiz-inter-name', secData.name);
    inter.appendChild(secName);

    var scoreEl = el('div', 'quiz-inter-score');
    scoreEl.textContent = 'Dieser Abschnitt ist abgeschlossen. Die Auswertung erfolgt am Ende der Prüfung.';
    inter.appendChild(scoreEl);

    var statusEl = el('div', 'quiz-inter-status', 'Weiter zum nächsten Abschnitt');
    inter.appendChild(statusEl);

    if (testState.currentSection < testState.sections.length - 1) {
      var nextBtn = el('button', 'quiz-btn quiz-btn-next', 'Weiter zum nächsten Abschnitt');
      nextBtn.addEventListener('click', function () {
        startTestSection(testState.currentSection + 1);
      });
      inter.appendChild(nextBtn);
    } else {
      var resultBtn = el('button', 'quiz-btn quiz-btn-next', 'Ergebnisse anzeigen');
      resultBtn.addEventListener('click', showTestResults);
      inter.appendChild(resultBtn);
    }

    panel.appendChild(inter);
  }

  function showTestResults() {
    stopTimer();
    testState.active = false;

    var panel = dom.quizContent;
    panel.innerHTML = '';

    var results = el('div', 'quiz-results');
    var title = el('h2', 'quiz-results-title', 'Prüfungsergebnis — ' + testState.level);
    results.appendChild(title);

    var config = getSectionTotals(testState.level);
    var scoringSections = config.scoringSections;
    var groups = {};
    testState.sections.forEach(function (sec) {
      var key = sec.scoringKey || sec.name;
      if (!groups[key]) {
        groups[key] = {
          key: key,
          label: '',
          max: 0,
          passMark: 0,
          correct: 0,
          rawQuestions: 0,
          sections: []
        };
      }
      groups[key].correct += sec.score;
      groups[key].rawQuestions += sec.questions.length;
      groups[key].sections.push(sec);
    });

    scoringSections.forEach(function (section) {
      if (!groups[section.key]) {
        groups[section.key] = {
          key: section.key,
          label: section.label,
          max: section.max,
          passMark: section.passMark,
          correct: 0,
          rawQuestions: 0,
          sections: []
        };
      }
      groups[section.key].label = section.label;
      groups[section.key].max = section.max;
      groups[section.key].passMark = section.passMark;
    });

    var scoringKeys = scoringSections.map(function (s) { return s.key; });
    var scoringTotal = 0;
    var scaledTotal = 0;
    var allPassed = true;

    // Per-section breakdown
    var breakdown = el('div', 'quiz-results-breakdown');
    scoringKeys.forEach(function (key, idx) {
      var section = scoringSections[idx];
      var group = groups[key];
      var score = group ? group.correct : 0;
      var rawMax = group ? group.rawQuestions : 0;
      var officialScore = rawMax > 0 ? Math.round(score / rawMax * section.max) : 0;
      var passed = officialScore >= section.passMark;
      if (!passed) allPassed = false;
      scoringTotal += officialScore;

      var row = el('div', 'quiz-result-row');
      row.innerHTML =
        '<span class="result-section-name">' + section.label + '</span>' +
        '<span class="result-score">' + officialScore + '/' + section.max + '</span>' +
        '<span class="result-pct">' + (rawMax > 0 ? Math.round(score / rawMax * 100) : 0) + '%</span>' +
        '<span class="result-status ' + (passed ? 'passed' : 'failed') + '">' + (passed ? 'Bestanden' : 'Nicht best.') + '</span>';
      breakdown.appendChild(row);
    });
    results.appendChild(breakdown);

    var simulatedMax = config.simulatedOfficialMax || 0;
    if (simulatedMax > 0) {
      scaledTotal = Math.round(scoringTotal / simulatedMax * 180);
    }
    var totalPct = Math.round(scaledTotal / 180 * 100);
    var overallPassMark = config.overallPassMark || 0;
    var overallPassed = allPassed && scaledTotal >= overallPassMark;

    // Overall
    var overall = el('div', 'quiz-results-overall' + (overallPassed ? ' passed' : ' failed'));
    overall.innerHTML =
      '<div class="overall-score">' + scaledTotal + ' / 180 (' + totalPct + '%)</div>' +
      '<div class="overall-status">' + (overallPassed ? 'BESTANDEN' : 'NICHT BESTANDEN') + '</div>' +
      '<div class="overall-note">Hörverstehen ist aus technischen Gründen nicht simuliert; die Punktzahl wird auf die JLPT-Skala hochgerechnet.</div>' +
      (!overallPassed ? '<div class="overall-note">Erforderlich: mindestens ' + overallPassMark + ' Punkte und keine unter dem Sectional Pass Mark liegenden Teilbereiche.</div>' : '');
    results.appendChild(overall);

    // Detail review toggle
    var detailBtn = el('button', 'quiz-btn quiz-btn-reveal', 'Details ansehen');
    var detailDiv = el('div', 'quiz-review-detail hidden');
    detailBtn.addEventListener('click', function () {
      detailDiv.classList.toggle('hidden');
      detailBtn.textContent = detailDiv.classList.contains('hidden') ? 'Details ansehen' : 'Details ausblenden';
    });
    results.appendChild(detailBtn);

    // Build review
    testState.sections.forEach(function (sec, sIdx) {
      var secHeader = el('h3', 'quiz-review-section-header', 'Abschnitt ' + (sIdx + 1) + ': ' + sec.name);
      detailDiv.appendChild(secHeader);

      sec.questions.forEach(function (q, qIdx) {
        var ans = sec.answers[qIdx];
        var correct = ans && ans.correct;
        var item = el('div', 'quiz-review-item ' + (correct ? 'correct' : 'wrong'));
        item.innerHTML =
          '<span class="review-num">' + (qIdx + 1) + '.</span>' +
          '<span class="review-prompt">' + q.promptMain + '</span>' +
          '<span class="review-answer">' + (ans && ans.selected >= 0 ? q.choices[ans.selected] : '—') + '</span>' +
          (correct ? '' : '<span class="review-correct">' + q.choices[q.correctIndex] + '</span>');
        detailDiv.appendChild(item);
      });
    });
    results.appendChild(detailDiv);

    // Actions
    var actions = el('div', 'quiz-results-actions');
    var newBtn = el('button', 'quiz-btn quiz-btn-next', 'Neue Prüfung');
    newBtn.addEventListener('click', showTestSetup);
    actions.appendChild(newBtn);
    var homeBtn = el('button', 'quiz-btn quiz-btn-back', 'Zurück');
    homeBtn.addEventListener('click', showHomeScreen);
    actions.appendChild(homeBtn);
    results.appendChild(actions);

    panel.appendChild(results);
  }


  // ==========================================================
  // H: HOME SCREEN
  // ==========================================================

  function showHomeScreen() {
    stopTimer();
    testState.active = false;

    var panel = dom.quizContent;
    panel.innerHTML = '';

    var home = el('div', 'quiz-home');

    var title = el('h2', 'quiz-home-title', 'Quiz & Test');
    home.appendChild(title);
    var desc = el('p', 'quiz-home-desc', 'Teste dein Wissen mit über 20.000 möglichen Fragen aus allen Bereichen.');
    home.appendChild(desc);

    var cards = el('div', 'quiz-home-cards');

    // Browse card
    var browseCard = el('div', 'quiz-home-card browse');
    browseCard.innerHTML =
      '<div class="quiz-card-icon">\u7DF4</div>' +
      '<h3>Übungsmodus</h3>' +
      '<p>Frei üben nach Fragetyp und Level. Kein Timer, kein Scoring.</p>';
    browseCard.addEventListener('click', initBrowseMode);
    cards.appendChild(browseCard);

    // Test card
    var testCard = el('div', 'quiz-home-card test');
    testCard.innerHTML =
      '<div class="quiz-card-icon">\u8A66</div>' +
      '<h3>Pr\u00fcfungsmodus</h3>' +
      '<p>JLPT-nahe Prüfung ohne Hörverstehen mit offiziellen Abschnittsnamen, Zeitbudgets und hochgerechneter Bewertung.</p>';
    testCard.addEventListener('click', showTestSetup);
    cards.appendChild(testCard);

    home.appendChild(cards);
    panel.appendChild(home);
  }

  // ==========================================================
  // I: KEYBOARD HANDLER
  // ==========================================================

  function handleQuizKey(e) {
    if (!dom.quizPanel || dom.quizPanel.classList.contains('hidden')) return false;

    // Number keys 1-4 select choices
    var num = parseInt(e.key);
    if (num >= 1 && num <= 4) {
      var btns = dom.quizContent.querySelectorAll('.quiz-choice-btn:not([disabled])');
      if (btns.length >= num) {
        btns[num - 1].click();
        e.preventDefault();
        return true;
      }
    }

    // Enter to reveal/advance in browse mode
    if (e.key === 'Enter') {
      if (testState.active) {
        var testNextBtn = document.getElementById('quiz-test-next-btn');
        if (testNextBtn && !testNextBtn.classList.contains('hidden')) {
          testNextBtn.click();
          e.preventDefault();
          return true;
        }
      } else {
        var revealBtn = document.getElementById('quiz-reveal-btn');
        var nextBtn = document.getElementById('quiz-next-btn');
        if (revealBtn && !revealBtn.classList.contains('hidden')) {
          revealBtn.click();
          e.preventDefault();
          return true;
        }
        if (nextBtn && !nextBtn.classList.contains('hidden')) {
          nextBtn.click();
          e.preventDefault();
          return true;
        }
      }
    }

    // Escape to go back
    if (e.key === 'Escape') {
      if (testState.active) {
        if (confirm('Pr\u00fcfung wirklich abbrechen?')) {
          stopTimer();
          testState.active = false;
          showHomeScreen();
        }
        e.preventDefault();
        return true;
      }
    }

    return false;
  }

  // ==========================================================
  // J: INIT & EXPORT
  // ==========================================================

  function onTabActivate() {
    if (!dom.quizContent) {
      dom.quizPanel = document.getElementById('quiz-tab');
      dom.quizContent = document.getElementById('quiz-content');
    }
    if (!dom.quizContent) return;
    // Show home screen if not in active test
    if (!testState.active) {
      showHomeScreen();
    }
  }

  window.QuizModule = {
    onTabActivate: onTabActivate,
    handleKey: handleQuizKey,
    isTestActive: function () { return testState.active; },
    audit: {
      generateQuestion: generateQuestion,
      questionTypes: QUESTION_TYPES,
      levels: LEVELS
    }
  };
})();
