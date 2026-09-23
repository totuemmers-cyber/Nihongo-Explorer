// ============================================================
// Quiz & Test System for Nihongo Explorer
// ============================================================
(function () {
  'use strict';

  // ==========================================================
  // A: CONSTANTS
  // ==========================================================

  var QUESTION_TYPES = {
    onomatopoeiaContext: { id: 'onomatopoeiaContext', group: 'Lautmalerei', label: 'Bedeutung im Kontext', icon: '声' },
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

  var TEST_CONFIGS = {
    N5: { sections: [
      { name: 'Sprachwissen (Wortschatz)', count: 45, time: 20, types: ['vocabMeaning','vocabReading','kanjiReading','vocabContext'] },
      { name: 'Sprachwissen (Grammatik)・Leseverständnis', count: 35, time: 40, types: ['grammarMeaning','grammarCloze','grammarFormation','vocabContext'] }
    ]},
    N4: { sections: [
      { name: 'Sprachwissen (Wortschatz)', count: 50, time: 25, types: ['vocabMeaning','vocabReading','kanjiReading','vocabContext'] },
      { name: 'Sprachwissen (Grammatik)・Leseverständnis', count: 40, time: 55, types: ['grammarMeaning','grammarCloze','grammarFormation','vocabContext'] }
    ]},
    N3: { sections: [
      { name: 'Sprachwissen (Wortschatz)', count: 55, time: 30, types: ['vocabMeaning','vocabReading','kanjiReading','vocabContext'] },
      { name: 'Sprachwissen (Grammatik)・Leseverständnis', count: 50, time: 70, types: ['grammarMeaning','grammarCloze','grammarFormation','vocabContext'] }
    ]},
    N2: { sections: [
      { name: 'Sprachwissen (Wortschatz/Grammatik)・Leseverständnis', count: 60, time: 105, types: ['vocabMeaning','vocabReading','kanjiReading','vocabContext','grammarMeaning','grammarCloze','grammarFormation'] }
    ]},
    N1: { sections: [
      { name: 'Sprachwissen (Wortschatz/Grammatik)・Leseverständnis', count: 65, time: 110, types: ['vocabMeaning','vocabReading','kanjiReading','vocabContext','grammarMeaning','grammarCloze','grammarFormation'] }
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

  // Example sentences carry authored romaji, so beginner prompts take kanji readings from it.
  // Substituting vocabulary readings misreads compounds and inflections (九時 as きゅうとき,
  // 行きます as ゆきます). Kana in the sentence anchor an alignment against the spelled-out
  // romaji; each kanji run receives the kana between its anchors. Ambiguous alignments and
  // readings romaji cannot settle (macron vowels, ず/づ) are resolved from vocabulary or rejected.
  var LONG_VOWEL = '̄';
  var KANJI_RUN_CHAR_RE = /[㐀-龯々〆ヶ]/;
  var ROMAJI_SYLLABLES = (function () {
    var table = {};
    var rows = {
      '': 'あいうえお', k: 'かきくけこ', g: 'がぎぐげご', s: 'さしすせそ', z: 'ざじずぜぞ',
      t: 'たちつてと', d: 'だぢづでど', n: 'なにぬねの', h: 'はひふへほ', b: 'ばびぶべぼ',
      p: 'ぱぴぷぺぽ', m: 'まみむめも', r: 'らりるれろ'
    };
    Object.keys(rows).forEach(function (consonant) {
      for (var i = 0; i < 5; i++) table[consonant + 'aiueo'[i]] = rows[consonant][i];
    });
    ['k', 'g', 'n', 'h', 'b', 'p', 'm', 'r'].forEach(function (consonant) {
      var stem = table[consonant + 'i'];
      table[consonant + 'ya'] = stem + 'ゃ';
      table[consonant + 'yu'] = stem + 'ゅ';
      table[consonant + 'yo'] = stem + 'ょ';
    });
    [['sh', 'し'], ['ch', 'ち'], ['j', 'じ']].forEach(function (pair) {
      table[pair[0] + 'i'] = pair[1];
      table[pair[0] + 'a'] = pair[1] + 'ゃ';
      table[pair[0] + 'u'] = pair[1] + 'ゅ';
      table[pair[0] + 'o'] = pair[1] + 'ょ';
      table[pair[0] + 'e'] = pair[1] + 'ぇ';
    });
    var extra = {
      tsu: 'つ', fu: 'ふ', ti: 'てぃ', di: 'でぃ', tu: 'とぅ', du: 'どぅ', tsa: 'つぁ',
      fa: 'ふぁ', fi: 'ふぃ', fe: 'ふぇ', fo: 'ふぉ', ya: 'や', yu: 'ゆ', yo: 'よ', ye: 'いぇ',
      wa: 'わ', wo: 'を', wi: 'うぃ', we: 'うぇ', vu: 'ゔ', va: 'ゔぁ', vi: 'ゔぃ', ve: 'ゔぇ', vo: 'ゔぉ'
    };
    Object.keys(extra).forEach(function (key) { table[key] = extra[key]; });
    return table;
  })();
  var KANA_VOWELS = (function () {
    var vowels = {};
    var rows = ['あかがさざただなはばぱまやらわゃぁ', 'いきぎしじちぢにひびぴみりぃ', 'うくぐすずつづぬふぶぷむゆるゔゅぅ',
      'えけげせぜてでねへべぺめれぇ', 'おこごそぞとどのほぼぽもよろをょぉ'];
    for (var v = 0; v < rows.length; v++) {
      for (var i = 0; i < rows[v].length; i++) vowels[rows[v][i]] = 'aiueo'[v];
    }
    return vowels;
  })();
  var VOWEL_KANA = { a: 'あ', i: 'い', u: 'う', e: 'え', o: 'お' };
  // Second kana of a long vowel spelled with a macron: ō is おう or おお, ē is えい or ええ.
  var LONG_VOWEL_KANA = { a: 'あ', i: 'い', u: 'う', e: 'いえ', o: 'うお' };
  var KANA_SPELLING_VARIANTS = { 'は': 'わ', 'を': 'お', 'へ': 'え', 'づ': 'ず', 'ぢ': 'じ',
    'ぁ': 'あ', 'ぃ': 'い', 'ぅ': 'う', 'ぇ': 'え', 'ぉ': 'お' };
  var romajiKanaCache = {};
  var vocabReadingIndex = null;
  var vocabReadingIndexSize = -1;

  function toHiragana(text) {
    return text.replace(/[ァ-ヶ]/g, function (ch) {
      return String.fromCharCode(ch.charCodeAt(0) - 0x60);
    });
  }

  function romajiToKanaUnits(romaji) {
    var words = String(romaji || '').toLowerCase().normalize('NFD').replace(/̂/g, LONG_VOWEL)
      .split(/[^a-z̄']+/);
    var units = [];
    for (var w = 0; w < words.length; w++) {
      var word = words[w];
      var i = 0;
      while (i < word.length) {
        var ch = word[i];
        var next = word[i + 1] || '';
        if (ch === LONG_VOWEL) { units.push(LONG_VOWEL); i++; continue; }
        if (ch === "'") { i++; continue; }
        if (ch === 'n' && !/[aiueoy]/.test(next)) { units.push('ん'); i++; continue; }
        if (ch === 'm' && /[bmp]/.test(next)) { units.push('ん'); i++; continue; }
        if ((ch === next && /[bcdfghjkpqrstvwz]/.test(ch)) || (ch === 't' && word.substr(i + 1, 2) === 'ch')) {
          units.push('っ'); i++; continue;
        }
        var matched = false;
        for (var len = 3; len >= 1 && !matched; len--) {
          var kana = ROMAJI_SYLLABLES[word.substr(i, len)];
          if (!kana) continue;
          for (var k = 0; k < kana.length; k++) units.push(kana[k]);
          i += len;
          matched = true;
        }
        if (!matched) return null;
      }
    }
    return units;
  }

  function vowelBefore(units, index) {
    for (var i = index - 1; i >= 0; i--) {
      if (units[i] !== LONG_VOWEL) return KANA_VOWELS[units[i]] || '';
    }
    return '';
  }

  function kanaMatchesUnit(kana, units, index) {
    var unit = units[index];
    if (kana === unit || KANA_SPELLING_VARIANTS[kana] === unit) return true;
    var vowel = vowelBefore(units, index);
    if (unit === LONG_VOWEL) return kana === 'ー' || (!!vowel && LONG_VOWEL_KANA[vowel].indexOf(kana) !== -1);
    return kana === 'ー' && !!vowel && VOWEL_KANA[vowel] === unit;
  }

  function tokenizeForRomaji(text, keepTokens) {
    var tokens = [];
    var i = 0;
    while (i < text.length) {
      var keep = null;
      for (var t = 0; t < keepTokens.length && !keep; t++) {
        if (keepTokens[t] && text.indexOf(keepTokens[t], i) === i) keep = keepTokens[t];
      }
      if (keep) { tokens.push({ wild: true, out: keep }); i += keep.length; continue; }
      var ch = text[i];
      if (KANJI_RUN_CHAR_RE.test(ch)) {
        var end = i;
        while (end < text.length && KANJI_RUN_CHAR_RE.test(text[end])) end++;
        tokens.push({ wild: true, source: text.slice(i, end), following: text.slice(end) });
        i = end;
        continue;
      }
      if (/[ぁ-ゖァ-ヺー]/.test(ch)) { tokens.push({ kana: toHiragana(ch), out: ch }); i++; continue; }
      // Digits and Latin letters have no dependable kana counterpart in the romaji.
      if (/[0-9A-Za-z０-９Ａ-Ｚａ-ｚ]/.test(ch)) return null;
      tokens.push({ out: ch });
      i++;
    }
    return tokens;
  }

  function getVocabReadingIndex() {
    var vocab = getAllVocab();
    if (vocabReadingIndex && vocabReadingIndexSize === vocab.length) return vocabReadingIndex;
    vocabReadingIndex = {};
    vocabReadingIndexSize = vocab.length;
    vocab.forEach(function (item) {
      if (!item.word || !item.reading || !hasKanji(item.word)) return;
      var readings = vocabReadingIndex[item.word] || (vocabReadingIndex[item.word] = []);
      if (readings.indexOf(item.reading) === -1) readings.push(item.reading);
    });
    return vocabReadingIndex;
  }

  function readingMatchesUnits(reading, units, start, end) {
    if (reading.length !== end - start) return false;
    for (var i = 0; i < reading.length; i++) {
      if (!kanaMatchesUnit(reading[i], units, start + i)) return false;
    }
    return true;
  }

  // The vocabulary spelling decides what romaji leaves open; otherwise only plain readings are used.
  function resolveKanjiReading(token, units, start, end) {
    var index = getVocabReadingIndex();
    for (var suffixLength = 0; suffixLength <= 4 && suffixLength <= token.following.length; suffixLength++) {
      var suffix = token.following.slice(0, suffixLength);
      if (hasKanji(suffix)) break;
      var readings = index[token.source + suffix] || [];
      for (var r = 0; r < readings.length; r++) {
        var reading = toHiragana(readings[r]);
        var okurigana = toHiragana(suffix);
        if (reading.slice(reading.length - okurigana.length) !== okurigana) continue;
        var stem = reading.slice(0, reading.length - okurigana.length);
        if (stem && readingMatchesUnits(stem, units, start, end)) return stem;
      }
    }
    var plain = units.slice(start, end).join('');
    return plain.indexOf(LONG_VOWEL) === -1 && plain.indexOf('ず') === -1 ? plain : null;
  }

  function kanaFromRomaji(text, romaji, keepTokens) {
    var keep = uniqueStrings(keepTokens || []).sort(function (a, b) { return b.length - a.length; });
    var cacheKey = text + '\u0001' + romaji + '\u0001' + keep.join('\u0002');
    if (Object.prototype.hasOwnProperty.call(romajiKanaCache, cacheKey)) return romajiKanaCache[cacheKey];
    var result = null;
    var tokens = tokenizeForRomaji(text, keep);
    var units = tokens && romajiToKanaUnits(romaji);
    if (tokens && units) {
      var memo = {};
      // Number of complete alignments from (token, unit), capped at 2; only a unique one is used.
      var countFrom = function (t, p) {
        var key = t + ':' + p;
        if (Object.prototype.hasOwnProperty.call(memo, key)) return memo[key];
        var total = 0;
        var token = tokens[t];
        if (!token) total = p === units.length ? 1 : 0;
        else if (!token.wild) {
          if (token.kana === undefined) total = countFrom(t + 1, p);
          else if (p < units.length && kanaMatchesUnit(token.kana, units, p)) total = countFrom(t + 1, p + 1);
        } else if (p < units.length && !/[ゃゅょぁぃぅぇぉっん]/.test(units[p]) && units[p] !== LONG_VOWEL) {
          for (var q = p + 1; q <= units.length && total < 2; q++) total += countFrom(t + 1, q);
        }
        memo[key] = Math.min(total, 2);
        return memo[key];
      };
      if (countFrom(0, 0) === 1) {
        var out = '';
        var p = 0;
        for (var t = 0; t < tokens.length && out !== null; t++) {
          var token = tokens[t];
          if (!token.wild) {
            out += token.out;
            if (token.kana !== undefined) p++;
            continue;
          }
          var q = p + 1;
          while (q <= units.length && countFrom(t + 1, q) === 0) q++;
          if (q > units.length) { out = null; break; }
          var reading = token.source ? resolveKanjiReading(token, units, p, q) : token.out;
          out = reading === null ? null : out + reading;
          p = q;
        }
        result = out;
      }
    }
    romajiKanaCache[cacheKey] = result;
    return result;
  }

  // Beginner levels need a kana rendering; other levels keep the original sentence.
  function beginnerSentence(text, romaji, level, keepTokens) {
    if (!isStrictBeginnerLevel(level) || !hasKanji(text)) return text;
    return romaji ? kanaFromRomaji(text, romaji, keepTokens) : null;
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
      // explanationReady marks explanations already rendered for beginners; guessing readings again would corrupt them.
      if (next.explanation && hasJapaneseText(next.explanation) && !auditMeta.explanationReady) {
        next.explanation = sanitizeJapaneseForBeginnerLevel(next.explanation, level, preserveTokens) || next.explanation;
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

  function normalizeAnswer(text) {
    return String(text || '').normalize('NFKC').trim().replace(/\s+/g, ' ').toLocaleLowerCase('de');
  }

  function buildChoices(correctAnswer, distractors) {
    var seen = new Set([normalizeAnswer(correctAnswer)]);
    var wrong = distractors.filter(function (answer) {
      var key = normalizeAnswer(answer);
      if (!key || seen.has(key)) return false;
      seen.add(key); return true;
    });
    if (!normalizeAnswer(correctAnswer) || wrong.length < 3) return null;
    var all = [correctAnswer].concat(wrong.slice(0, 3));
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

  function getOnomatopoeiaByLevel(level) {
    return (window.ONOMATOPOEIA_DATA || []).filter(function (o) { return o.level === level; });
  }

  function getGrammarCloze(example) {
    var span = example && example.cloze;
    var text = example && example.japanese;
    if (!span || !text || !Number.isInteger(span.start) || span.start < 0 ||
        typeof span.answer !== 'string' || !span.answer ||
        text.slice(span.start, span.start + span.answer.length) !== span.answer) return null;
    return {
      answer: span.answer,
      sentence: text.slice(0, span.start) + '＿＿＿' + text.slice(span.start + span.answer.length)
    };
  }

  function normalizeReading(reading) {
    return reading.replace(/[.\-・\s]/g, '').replace(/[ァ-ヶ]/g, function (ch) {
      return String.fromCharCode(ch.charCodeAt(0) - 0x60);
    });
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
      zuru: 'ずるどうし',
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
    var validMeanings = getAllVocab().filter(function (v) {
      return v.word === item.word && normalizeReading(v.reading) === normalizeReading(item.reading);
    }).map(function (v) { return v.meaning; });
    var distractorPool = pool.filter(function (v) { return validMeanings.indexOf(v.meaning) === -1; });
    var distractors = generateDistractors(item, distractorPool, 3, function (v) { return v.meaning; });
    if (distractors.length < 3) return null;
    var c = buildChoices(item.meaning, distractors);
    if (!c) return null;
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
    // Another accepted reading of the same written word is not a wrong answer.
    // This matters for 一日, 四, 七, 九 and readings stored at different levels.
    var validReadings = getAllVocab().filter(function (v) { return v.word === item.word; })
      .map(function (v) { return normalizeReading(v.reading); });
    var distractorPool = pool.filter(function (v) { return validReadings.indexOf(normalizeReading(v.reading)) === -1; });
    var distractors = generateDistractors(item, distractorPool, 3, function (v) { return v.reading; });
    if (distractors.length < 3) return null;
    var c = buildChoices(item.reading, distractors);
    if (!c) return null;
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
    var validWords = getAllVocab().filter(function (v) { return v.meaning === item.meaning; })
      .map(function (v) { return v.word; });
    var distractorPool = pool.filter(function (v) { return validWords.indexOf(v.word) === -1; });
    var distractors = generateDistractors(item, distractorPool, 3, function (v) { return v.word; });
    if (distractors.length < 3) return null;
    var c = buildChoices(item.word, distractors);
    if (!c) return null;
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
    var BLANK = '＿＿＿';
    function blankPrompt(example, word) {
      var sentence = buildSingleBlankSentence(example.japanese, word);
      return sentence && beginnerSentence(sentence, example.romaji, level, [BLANK]);
    }
    var pool = getLevelPool(getVocabByLevel, level).filter(function (v) {
      if (!v.examples || v.examples.length === 0) return false;
      return getOrderedExamples(v).some(function (example) { return !!blankPrompt(example, v.word); });
    });
    if (pool.length < 4) return null;
    var item = pickRandom(pool);
    var ex = null;
    var sentence = null;
    var orderedExamples = getOrderedExamples(item);
    for (var i = 0; i < orderedExamples.length && !ex; i++) {
      sentence = blankPrompt(orderedExamples[i], item.word);
      if (sentence) ex = orderedExamples[i];
    }
    if (!ex) return null;
    var distractors = generateDistractors(item, pool, 3, function (v) { return v.word; });
    if (distractors.length < 3) return null;
    var c = buildChoices(item.word, distractors);
    if (!c) return null;
    // Without a unique full-sentence alignment, the entry's reading fills the kana prompt's gap.
    var solved = beginnerSentence(ex.japanese, ex.romaji, level, []) || sentence.replace(BLANK, item.reading);
    return finalizeQuestion({
      type: 'vocabContext', level: level,
      prompt: 'Welches Wort passt in die Lücke?',
      promptMain: sentence,
      promptSub: ex.german,
      choices: c.choices, correctIndex: c.correctIndex,
      explanation: item.word + ' (' + item.reading + ') — ' + solved
    }, level, {
      sourceLevel: item.level,
      explanationReady: true
    });
  }

  // 5. Kanji Meaning: kanji → meaning
  function genKanjiMeaning(level, sourceId) {
    var pool = getLevelPool(getKanjiByLevel, level);
    if (pool.length < 4) return null;
    var item = sourceId ? pool.find(function (k) { return k.kanji === sourceId; }) : pickRandom(pool);
    if (!item) return null;
    var correctMeaning = item.meanings[0];
    var accepted = new Set(item.meanings.map(normalizeAnswer));
    var wrongPool = pool.filter(function (k) { return !accepted.has(normalizeAnswer(k.meanings[0])); });
    var distractors = generateDistractors(item, wrongPool, wrongPool.length, function (k) { return k.meanings[0]; });
    if (distractors.length < 3) return null;
    var c = buildChoices(correctMeaning, distractors);
    if (!c) return null;
    return finalizeQuestion({
      type: 'kanjiMeaning', level: level,
      prompt: 'Was bedeutet dieses Kanji?',
      promptMain: item.kanji,
      promptSub: '',
      choices: c.choices, correctIndex: c.correctIndex,
      explanation: item.kanji + ' = ' + item.meanings.join(', ')
    }, level, {
      sourceLevel: item.jlpt,
      sourceEntryId: item.kanji,
      preserveTokens: [item.kanji]
    });
  }

  // 6. Kanji Reading: kanji → reading
  // Kanji data uses dictionary notation: "た.べる" marks okurigana, "ひと-"/"-じ" mark prefix/suffix use.
  function getKanjiReadings(k, key) {
    var all = (k[key] || []).map(function (r) { return r.kana; });
    var full = all.filter(function (kana) { return !/^-|-$/.test(kana); });
    return (full.length ? full : all).map(function (kana) {
      return kana.replace(/\./g, '').replace(/^-|-$/g, '');
    });
  }

  function genKanjiReading(level) {
    var pool = getLevelPool(getKanjiByLevel, level).filter(function (k) {
      return (k.kun && k.kun.length > 0) || (k.on && k.on.length > 0);
    });
    if (pool.length < 4) return null;
    var item = pickRandom(pool);
    // Wrong answers use the same reading type (kun: hiragana, on: katakana), so the script never gives the answer away.
    var key = pickRandom(['kun', 'on'].filter(function (k) { return item[k] && item[k].length; }));
    var correctReading = getKanjiReadings(item, key)[0];
    var katakana = /[ァ-ヶ]/;
    var acceptedReadings = (item.kun || []).concat(item.on || []).map(function (r) { return normalizeReading(r.kana); });
    var distractorPool = pool.filter(function (k) {
      var first = getKanjiReadings(k, key)[0];
      // A few kun readings are loanwords in katakana (釦 ボタン).
      return first && katakana.test(first) === katakana.test(correctReading) &&
        acceptedReadings.indexOf(normalizeReading(first)) === -1;
    });
    var distractors = generateDistractors(item, distractorPool, 3, function (k) {
      return getKanjiReadings(k, key)[0] || '';
    });
    if (distractors.length < 3) return null;
    var c = buildChoices(correctReading, distractors);
    if (!c) return null;
    return finalizeQuestion({
      type: 'kanjiReading', level: level,
      prompt: 'Wie kann man dieses Kanji lesen?',
      promptMain: item.kanji,
      promptSub: item.meanings[0],
      choices: c.choices, correctIndex: c.correctIndex,
      explanation: item.kanji + ': ' + getKanjiReadings(item, 'kun').concat(getKanjiReadings(item, 'on')).join(', ')
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
    if (!c) return null;
    return finalizeQuestion({
      type: 'kanjiRadical', level: level,
      prompt: 'Welches ist das Primärradikal dieses Kanji?',
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
    if (!c) return null;
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

  // 9. Only sentence-bound, editorially reviewed choices may be graded.
  function reviewedGrammarExample(example, level, sourceLevel) {
    var span = getGrammarCloze(example), review = example && example.cloze && example.cloze.quiz;
    if (!span || !review || review.level !== sourceLevel || review.japanese !== example.japanese || review.german !== example.german ||
        review.start !== example.cloze.start || review.answer !== span.answer ||
        !Array.isArray(review.acceptedAnswers) || !review.acceptedAnswers.includes(span.answer) ||
        !review.acceptedAnswers.every(function (a) { return typeof a === 'string' && a.trim(); }) ||
        !Array.isArray(review.distractors) || review.distractors.length !== 3) return null;
    var accepted = new Set(review.acceptedAnswers.map(normalizeAnswer));
    if (review.distractors.some(function (d) { return !d || typeof d.text !== 'string' ||
        !d.text.trim() || typeof d.reason !== 'string' || !d.reason.trim() || accepted.has(normalizeAnswer(d.text)); })) return null;
    var wrong = review.distractors.map(function (d) { return d.text; });
    if (new Set(wrong.map(normalizeAnswer)).size !== 3) return null;
    var sentence = isStrictBeginnerLevel(level) ? review.promptKana : span.sentence;
    if (typeof sentence !== 'string' || countOccurrences(sentence, '＿＿＿') !== 1 ||
        (isStrictBeginnerLevel(level) && hasKanji(sentence))) return null;
    return { span: span, review: review, sentence: sentence, wrong: wrong };
  }

  function genGrammarCloze(level, sourceId, exampleIndex) {
    var pool = getLevelPool(getGrammarByLevel, level);
    if (sourceId) pool = pool.filter(function (g) { return g.id === sourceId; });
    var candidates = [];
    pool.forEach(function (g) {
      if (g.clozeExcludedReason) return;
      (g.examples || []).forEach(function (example, index) {
        if (exampleIndex !== undefined && index !== exampleIndex) return;
        var reviewed = reviewedGrammarExample(example, level, g.level);
        if (reviewed) candidates.push({ item: g, example: example, index: index, reviewed: reviewed });
      });
    });
    if (!candidates.length) return null;
    var selected = pickRandom(candidates), item = selected.item, ex = selected.example, r = selected.reviewed;
    var c = buildChoices(r.span.answer, r.wrong);
    if (!c) return null;
    return finalizeQuestion({
      type: 'grammarCloze', level: level,
      prompt: 'Welches Grammatikmuster passt in die Lücke?',
      promptMain: r.sentence,
      promptSub: ex.german,
      choices: c.choices, correctIndex: c.correctIndex,
      explanation: item.pattern + ' — ' + ex.japanese
    }, level, {
      sourceLevel: item.level,
      sourceEntryId: item.id,
      sourceExampleIndex: selected.index,
      originalSentence: ex.japanese,
      clozeAnswer: r.span.answer
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
    if (!c) return null;
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
    var targetKeys = level === 'N5' ? ['polite', 'negative', 'past', 'te'] : CONJ_FORM_KEYS;
    var allowedKeys = level === 'N5'
      ? ['dictionary', 'polite', 'negative', 'negPolite', 'past', 'pastPolite', 'pastNeg', 'pastNegPolite', 'te', 'volPolite']
      : Object.keys(result.forms);
    function distractorsFor(targetKey) {
      var target = result.forms[targetKey];
      if (!target) return [];
      var accepted = [target.japanese].concat(target.acceptedVariants || []);
      var seen = {};
      return allowedKeys.filter(function (key) {
        var form = result.forms[key];
        if (!form || key === targetKey || accepted.indexOf(form.japanese) !== -1 || seen[form.japanese]) return false;
        seen[form.japanese] = true;
        return true;
      });
    }
    var viableFormKeys = targetKeys.filter(function (key) { return distractorsFor(key).length >= 3; });
    if (!viableFormKeys.length) return null;
    var formKey = pickRandom(viableFormKeys);
    var targetForm = result.forms[formKey];
    var distractorKeys = shuffle(distractorsFor(formKey)).slice(0, 3);
    var c = buildChoices(targetForm.japanese, distractorKeys.map(function (key) { return result.forms[key].japanese; }));
    if (!c) return null;
    var label = isStrictBeginnerLevel(level) ? targetForm.label.replace(/ ?\([^)]*\)/g, '') : targetForm.label;
    return finalizeQuestion({
      type: 'conjugation', level: level,
      prompt: label + ' von:',
      promptMain: item.word || item.reading,
      promptSub: item.meaning + ' (' + getConjugationGroupLabel(result, level) + ')',
      choices: c.choices, correctIndex: c.correctIndex,
      explanation: resolved.reading + ' → ' + label + ': ' + targetForm.japanese
    }, level, {
      sourceLevel: item.level,
      sourceEntryId: item.id,
      sourceName: item.__sourceName,
      sourceIndex: item.__sourceIndex,
      targetForm: formKey,
      choiceForms: c.choices.map(function (value) {
        return value === targetForm.japanese ? formKey : distractorKeys.find(function (key) { return result.forms[key].japanese === value; });
      }),
      preserveTokens: [item.word || item.reading]
    });
  }

  function genOnomatopoeiaContext(level) {
    var pool = getOnomatopoeiaByLevel(level);
    var candidates = pool.filter(function (o) {
      return o.examples && o.examples.some(function (ex) {
        return !!beginnerSentence(ex.japanese, ex.romaji, level, []);
      });
    });
    if (candidates.length < 4) return null;
    var item = pickRandom(candidates);
    var ex = pickRandom(item.examples.filter(function (example) {
      return !!beginnerSentence(example.japanese, example.romaji, level, []);
    }));
    var distractors = generateDistractors(item, candidates, 3, function (o) { return o.meaning; });
    if (distractors.length < 3) return null;
    var choices = buildChoices(item.meaning, distractors);
    if (!choices) return null;
    return finalizeQuestion({
      type: 'onomatopoeiaContext', level: level,
      prompt: 'Was bedeutet die Lautmalerei in diesem Satz?',
      promptMain: beginnerSentence(ex.japanese, ex.romaji, level, []),
      promptSub: item.word,
      choices: choices.choices, correctIndex: choices.correctIndex,
      explanation: ex.german + ' — ' + item.meaning
    }, level, { sourceLevel: item.level, preserveTokens: [item.word] });
  }

  var GENERATORS = {
    onomatopoeiaContext: genOnomatopoeiaContext,
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
    var feedback = el('p', 'quiz-feedback', (selectedIdx === correctIdx ? 'Richtig.' : selectedIdx < 0 ? 'Antwort aufgelöst.' : 'Nicht richtig.') + ' Richtige Antwort: ' + btns[correctIdx].querySelector('.quiz-choice-text').textContent);
    feedback.setAttribute('role', 'status');
    container.appendChild(feedback);
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

    var prompt = el('h3', 'quiz-prompt', question.prompt);
    prompt.tabIndex = -1;
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
    setTimeout(function () { if (prompt.isConnected) prompt.focus({ preventScroll: true }); }, 0);
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
    typeSelect.id = 'quiz-type-select';
    var typeLabel = el('label', 'select-field');
    typeLabel.appendChild(el('span', '', 'Fragetyp'));
    typeLabel.appendChild(typeSelect);
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
    controls.appendChild(typeLabel);

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
      if (browseState.revealed) return;
      browseState.answered = true;
      browseState.selectedIdx = idx;
      // Highlight selected
      var btns = parts.choicesDiv.querySelectorAll('.quiz-choice-btn');
      btns.forEach(function (btn, i) { btn.classList.toggle('selected', i === idx); btn.setAttribute('aria-pressed', String(i === idx)); });
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
    if (nextBtn) { nextBtn.classList.remove('hidden'); nextBtn.focus({ preventScroll: true }); }
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
    var title = el('h2', 'quiz-setup-title', 'JLPT-Training mit Zeitlimit');
    setup.appendChild(title);
    var desc = el('p', 'quiz-setup-desc', 'Wähle ein Level für ein Training mit Zeitlimit. Du erhältst die Anzahl richtiger Antworten und deine Trefferquote je Abschnitt. Hörverstehen ist nicht enthalten; das Ergebnis ist keine JLPT-Bestehensprognose.');
    setup.appendChild(desc);

    var selectedLevel = 'N5';
    var levelGrid = el('div', 'quiz-test-level-grid');
    levelGrid.setAttribute('role', 'group');
    levelGrid.setAttribute('aria-label', 'JLPT-Level für das Training');
    LEVELS.forEach(function (lv) {
      var cfg = TEST_CONFIGS[lv];
      var total = 0, totalTime = 0;
      cfg.sections.forEach(function (s) { total += s.count; totalTime += s.time; });

      var card = el('button', 'quiz-test-level-card');
      card.setAttribute('aria-pressed', 'false');
      var badge = el('div', 'quiz-test-level-badge ' + lv.toLowerCase(), lv);
      card.appendChild(badge);
      var info = el('div', 'quiz-test-level-info');
      info.innerHTML = '<span>' + total + ' Fragen</span><span>' + totalTime + ' Minuten</span><span>' + (cfg.sections.length === 1 ? '1 sichtbarer Abschnitt' : cfg.sections.length + ' sichtbare Abschnitte') + '</span>';
      card.appendChild(info);
      card.setAttribute('aria-pressed', String(lv === selectedLevel));
      card.addEventListener('click', function () {
        selectedLevel = lv;
        levelGrid.querySelectorAll('button').forEach(function (btn) { btn.setAttribute('aria-pressed', String(btn === card)); });
        startBtn.textContent = lv + '-Training starten';
      });
      levelGrid.appendChild(card);
    });
    setup.appendChild(levelGrid);
    var startBtn = el('button', 'quiz-btn quiz-btn-start', 'N5-Training starten');
    startBtn.id = 'quiz-start-test';
    startBtn.addEventListener('click', function () { startTest(selectedLevel); });
    setup.appendChild(startBtn);

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

    // Pre-generate all questions; a test asks each question at most once while the pools allow it.
    var askedQuestions = {};
    function questionKey(question) {
      return [question.type, question.promptMain, question.promptSub, (question.choices || [])[question.correctIndex]].join('\u0001');
    }
    function generateTestQuestion(typeId, types) {
      var repeat = null;
      for (var attempt = 0; attempt < 12; attempt++) {
        var question = generateQuestion(typeId, level);
        // Fallback: try other types
        for (var t = 0; !question && t < types.length; t++) question = generateQuestion(types[t], level);
        if (!question) return repeat;
        if (!askedQuestions[questionKey(question)]) return question;
        repeat = repeat || question;
      }
      return repeat;
    }
    for (var s = 0; s < cfg.sections.length; s++) {
      var sec = cfg.sections[s];
      var questions = [];
      for (var q = 0; q < sec.count; q++) {
        var question = generateTestQuestion(sec.types[q % sec.types.length], sec.types);
        if (question) {
          askedQuestions[questionKey(question)] = true;
          questions.push(question);
        }
      }
      testState.sections.push({
        name: sec.name,
        time: sec.time,
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
    timer.setAttribute('role', 'timer');
    timer.setAttribute('aria-label', 'Verbleibende Zeit');
    header.appendChild(timer);
    var exitBtn = el('button', 'quiz-exit', 'Training beenden');
    exitBtn.addEventListener('click', requestExit);
    header.appendChild(exitBtn);
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
      if (secData.answers.some(function (answer) { return answer.questionIdx === qIdx; })) return;
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
      nextBtn.focus({ preventScroll: true });
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
    inter.appendChild(el('button', 'quiz-exit', 'Training beenden'));
    inter.querySelector('.quiz-exit').addEventListener('click', requestExit);
    title.tabIndex = -1; title.focus({ preventScroll: true });
  }

  function showTestResults() {
    stopTimer();
    testState.active = false;

    var panel = dom.quizContent;
    panel.innerHTML = '';

    var results = el('div', 'quiz-results');
    var title = el('h2', 'quiz-results-title', 'Übungsergebnis — ' + testState.level);
    results.appendChild(title);

    var totalCorrect = 0;
    var totalQuestions = 0;
    var breakdown = el('div', 'quiz-results-breakdown');
    testState.sections.forEach(function (section) {
      var count = section.questions.length;
      totalCorrect += section.score;
      totalQuestions += count;
      var row = el('div', 'quiz-result-row');
      row.appendChild(el('span', 'result-section-name', section.name));
      row.appendChild(el('span', 'result-score', section.score + ' / ' + count + ' richtig'));
      row.appendChild(el('span', 'result-pct', (count ? Math.round(section.score / count * 100) : 0) + '%'));
      breakdown.appendChild(row);
    });
    results.appendChild(breakdown);

    var overall = el('div', 'quiz-results-overall');
    var accuracy = totalQuestions ? Math.round(totalCorrect / totalQuestions * 100) : 0;
    overall.appendChild(el('div', 'overall-score', accuracy + '% richtig'));
    overall.appendChild(el('div', 'overall-status', totalCorrect + ' von ' + totalQuestions + ' Fragen richtig beantwortet'));
    overall.appendChild(el('div', 'overall-note', 'Übungsergebnis für diese Fragen. Keine JLPT-Punktzahl oder Bestehensprognose; Hörverstehen wird nicht geprüft.'));
    results.appendChild(overall);

    // Detail review toggle
    var detailBtn = el('button', 'quiz-btn quiz-btn-reveal', 'Details ansehen');
    var detailDiv = el('div', 'quiz-review-detail hidden');
    detailDiv.id = 'quiz-review-detail';
    detailBtn.setAttribute('aria-controls', detailDiv.id);
    detailBtn.setAttribute('aria-expanded', 'false');
    detailBtn.addEventListener('click', function () {
      detailDiv.classList.toggle('hidden');
      detailBtn.setAttribute('aria-expanded', String(!detailDiv.classList.contains('hidden')));
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
    title.tabIndex = -1; title.focus({ preventScroll: true });
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
    var browseCard = el('button', 'quiz-home-card browse');
    browseCard.innerHTML =
      '<div class="quiz-card-icon">\u7DF4</div>' +
      '<h3>Übungsmodus</h3>' +
      '<p>Frei üben nach Fragetyp und Level. Kein Timer, kein Scoring.</p>';
    browseCard.addEventListener('click', initBrowseMode);
    cards.appendChild(browseCard);

    // Test card
    var testCard = el('button', 'quiz-home-card test');
    testCard.innerHTML =
      '<div class="quiz-card-icon">\u8A66</div>' +
      '<h3>Pr\u00fcfungsmodus</h3>' +
      '<p>Training mit Zeitlimit und Trefferquote je Abschnitt. Ohne Hörverstehen und ohne JLPT-Bestehensprognose.</p>';
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
    if (e.isComposing || e.keyCode === 229 || e.ctrlKey || e.altKey || e.metaKey) return false;
    var focused = document.activeElement;
    if (focused && (focused.matches('input, select, textarea') || focused.isContentEditable)) return false;
    if (e.key === 'Enter' && focused && focused.matches('button, a, summary')) return false;

    // Number keys 1-4 select choices
    var num = parseInt(e.key);
    if (num >= 1 && num <= 4) {
      var btns = dom.quizContent.querySelectorAll('.quiz-choice-btn:not([disabled])');
      if (btns.length >= num) {
        btns[num - 1].click();
        e.preventDefault();
        return true;
      }
      // While a question is on screen, digits belong to its choices, not to tab switching.
      if (dom.quizContent.querySelector('.quiz-choice-btn')) {
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
        requestExit();
        e.preventDefault();
        return true;
      }
    }

    return false;
  }

  // ==========================================================
  // J: INIT & EXPORT
  // ==========================================================

  function requestExit() {
    if (!testState.active) return true;
    if (!confirm('Aktives Training beenden? Dein bisheriges Ergebnis wird verworfen.')) return false;
    stopTimer();
    testState.active = false;
    showHomeScreen();
    return true;
  }

  window.addEventListener('beforeunload', function (event) {
    if (!testState.active) return;
    event.preventDefault();
    event.returnValue = '';
  });
  window.addEventListener('pagehide', stopTimer);

  function onTabActivate() {
    if (!dom.quizContent) {
      dom.quizPanel = document.getElementById('quiz-tab');
      dom.quizContent = document.getElementById('quiz-content');
    }
    if (!dom.quizContent) return;
    // Show home screen if not in active test
    if (!testState.active && !dom.quizContent.children.length) {
      showHomeScreen();
    }
  }

  window.QuizModule = {
    onTabActivate: onTabActivate,
    handleKey: handleQuizKey,
    requestExit: requestExit,
    isTestActive: function () { return testState.active; },
    audit: {
      finalizeQuestion: finalizeQuestion,
      kanaFromRomaji: kanaFromRomaji,
      generateQuestion: generateQuestion,
      buildChoices: buildChoices,
      generateQuestionForSource: function (type, level, sourceId, exampleIndex) {
        if (type === 'kanjiMeaning') return genKanjiMeaning(level, sourceId);
        if (type === 'grammarCloze') return genGrammarCloze(level, sourceId, exampleIndex);
        return null;
      },
      questionTypes: QUESTION_TYPES,
      levels: LEVELS
    }
  };
})();
