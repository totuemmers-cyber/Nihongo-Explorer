// ============================================================
// Verb Conjugation Engine for Nihongo Explorer
// ============================================================
(function () {
  'use strict';

  // --- Godan exceptions: -iru/-eru readings that are godan, not ichidan ---
  var GODAN_EXCEPTIONS = {
    // -iru godan
    'いる': 1,     // 要る (to need)
    'きる': 1,     // 切る (to cut)
    'しる': 1,     // 知る (to know)
    'はいる': 1,   // 入る (to enter)
    'はしる': 1,   // 走る (to run)
    'まいる': 1,   // 参る (to go/come humble)
    'ちる': 1,     // 散る (to scatter)
    'かぎる': 1,   // 限る (to limit)
    'にぎる': 1,   // 握る (to grip)
    'まじる': 1,   // 混じる (to mix)
    'いじる': 1,   // 弄る (to fiddle)
    'きしる': 1,   // 軋る (to creak)
    'よじる': 1,   // 捩る (to twist)
    'しびれきる': 1,
    // -eru godan
    'かえる': 1,   // 帰る (to return)
    'しゃべる': 1, // 喋る (to chat)
    'すべる': 1,   // 滑る (to slip)
    'ける': 1,     // 蹴る (to kick)
    'へる': 1,     // 減る (to decrease)
    'てる': 1,     // 照る (to shine)
    'ねる': 1,     // 練る (to knead)
    'せる': 1,     // 競る (to compete)
    'あせる': 1,   // 焦る (to be impatient)
    'ひねる': 1,   // 捻る (to twist)
    'かじる': 1,   // 齧る (to gnaw)
    'まぜる': 1,   // — note: 混ぜる is ichidan, but keeping for safety
    'ちぎる': 1,   // 千切る (to tear off)
  };

  // i-column and e-column kana (preceding る in potential ichidan verbs)
  var I_COLUMN = 'いきぎしじちぢにひびぴみり';
  var E_COLUMN = 'えけげせぜてでねへべぺめれ';

  // Godan kana row mapping: final kana → shifted forms
  var GODAN_MAP = {
    'う': { a: 'わ', i: 'い', e: 'え', o: 'お', te: 'って', ta: 'った' },
    'く': { a: 'か', i: 'き', e: 'け', o: 'こ', te: 'いて', ta: 'いた' },
    'ぐ': { a: 'が', i: 'ぎ', e: 'げ', o: 'ご', te: 'いで', ta: 'いだ' },
    'す': { a: 'さ', i: 'し', e: 'せ', o: 'そ', te: 'して', ta: 'した' },
    'つ': { a: 'た', i: 'ち', e: 'て', o: 'と', te: 'って', ta: 'った' },
    'ぬ': { a: 'な', i: 'に', e: 'ね', o: 'の', te: 'んで', ta: 'んだ' },
    'ぶ': { a: 'ば', i: 'び', e: 'べ', o: 'ぼ', te: 'んで', ta: 'んだ' },
    'む': { a: 'ま', i: 'み', e: 'め', o: 'も', te: 'んで', ta: 'んだ' },
    'る': { a: 'ら', i: 'り', e: 'れ', o: 'ろ', te: 'って', ta: 'った' }
  };

  function detectVerbGroup(reading) {
    if (!reading) return null;
    // Irregular: する and compounds
    if (reading === 'する' || reading.length >= 3 && reading.slice(-2) === 'する') return 'suru';
    // Irregular: くる and compounds
    if (reading === 'くる' || reading.length >= 3 && reading.slice(-2) === 'くる') return 'kuru';
    // Special: ある
    if (reading === 'ある') return 'aru';

    var last = reading.charAt(reading.length - 1);
    // Must end in an u-column kana to be a valid dictionary-form verb
    if ('うくぐすつぬぶむる'.indexOf(last) === -1) return null;

    // Check for ichidan: ends in る with preceding i/e-column kana
    if (last === 'る' && reading.length >= 2) {
      var prev = reading.charAt(reading.length - 2);
      if ((I_COLUMN.indexOf(prev) !== -1 || E_COLUMN.indexOf(prev) !== -1) &&
          !GODAN_EXCEPTIONS[reading]) {
        return 'ichidan';
      }
    }

    return 'godan';
  }

  function conjugateGodan(reading) {
    var stem = reading.slice(0, -1);
    var last = reading.charAt(reading.length - 1);
    var row = GODAN_MAP[last];
    if (!row) return null;

    // Special case: 行く → 行って (not 行いて)
    var te = stem + row.te;
    var ta = stem + row.ta;
    if (reading === 'いく') {
      te = 'いって';
      ta = 'いった';
    }

    return {
      dictionary:    { japanese: reading,                    label: 'Wörterbuchform (辞書形)' },
      polite:        { japanese: stem + row.i + 'ます',       label: 'Höflich (ます形)' },
      negative:      { japanese: stem + row.a + 'ない',       label: 'Negativ (ない形)' },
      negPolite:     { japanese: stem + row.i + 'ません',      label: 'Negativ höflich' },
      past:          { japanese: ta,                          label: 'Vergangenheit (た形)' },
      pastPolite:    { japanese: stem + row.i + 'ました',      label: 'Vergangenheit höflich' },
      pastNeg:       { japanese: stem + row.a + 'なかった',    label: 'Vergangenheit negativ' },
      pastNegPolite: { japanese: stem + row.i + 'ませんでした', label: 'Vergangen. neg. höfl.' },
      te:            { japanese: te,                          label: 'て-Form' },
      potential:     { japanese: stem + row.e + 'る',         label: 'Potenzial (können)' },
      passive:       { japanese: stem + row.a + 'れる',       label: 'Passiv (受身形)' },
      causative:     { japanese: stem + row.a + 'せる',       label: 'Kausativ (使役形)' },
      causPas:       { japanese: stem + row.a + 'せられる',    label: 'Kausativ-Passiv' },
      conditional:   { japanese: stem + row.e + 'ば',         label: 'Konditional (ば形)' },
      conditionalTara: { japanese: ta + 'ら',                 label: 'Konditional (たら形)' },
      volitional:    { japanese: stem + row.o + 'う',         label: 'Volitional (意志形)' },
      volPolite:     { japanese: stem + row.i + 'ましょう',    label: 'Volitional höflich' },
      imperative:    { japanese: stem + row.e,                label: 'Imperativ (命令形)' },
      prohibitive:   { japanese: reading + 'な',              label: 'Verbot (禁止形)' }
    };
  }

  function conjugateIchidan(reading) {
    var stem = reading.slice(0, -1);
    return {
      dictionary:    { japanese: reading,                 label: 'Wörterbuchform (辞書形)' },
      polite:        { japanese: stem + 'ます',            label: 'Höflich (ます形)' },
      negative:      { japanese: stem + 'ない',            label: 'Negativ (ない形)' },
      negPolite:     { japanese: stem + 'ません',           label: 'Negativ höflich' },
      past:          { japanese: stem + 'た',              label: 'Vergangenheit (た形)' },
      pastPolite:    { japanese: stem + 'ました',           label: 'Vergangenheit höflich' },
      pastNeg:       { japanese: stem + 'なかった',         label: 'Vergangenheit negativ' },
      pastNegPolite: { japanese: stem + 'ませんでした',      label: 'Vergangen. neg. höfl.' },
      te:            { japanese: stem + 'て',              label: 'て-Form' },
      potential:     { japanese: stem + 'られる',          label: 'Potenzial (können)' },
      passive:       { japanese: stem + 'られる',          label: 'Passiv (受身形)' },
      causative:     { japanese: stem + 'させる',          label: 'Kausativ (使役形)' },
      causPas:       { japanese: stem + 'させられる',       label: 'Kausativ-Passiv' },
      conditional:   { japanese: stem + 'れば',            label: 'Konditional (ば形)' },
      conditionalTara: { japanese: stem + 'たら',          label: 'Konditional (たら形)' },
      volitional:    { japanese: stem + 'よう',            label: 'Volitional (意志形)' },
      volPolite:     { japanese: stem + 'ましょう',         label: 'Volitional höflich' },
      imperative:    { japanese: stem + 'ろ',              label: 'Imperativ (命令形)' },
      prohibitive:   { japanese: reading + 'な',           label: 'Verbot (禁止形)' }
    };
  }

  function conjugateSuru(reading) {
    var prefix = reading.slice(0, -2);
    return {
      dictionary:    { japanese: reading,                      label: 'Wörterbuchform (辞書形)' },
      polite:        { japanese: prefix + 'します',              label: 'Höflich (ます形)' },
      negative:      { japanese: prefix + 'しない',              label: 'Negativ (ない形)' },
      negPolite:     { japanese: prefix + 'しません',             label: 'Negativ höflich' },
      past:          { japanese: prefix + 'した',                label: 'Vergangenheit (た形)' },
      pastPolite:    { japanese: prefix + 'しました',             label: 'Vergangenheit höflich' },
      pastNeg:       { japanese: prefix + 'しなかった',           label: 'Vergangenheit negativ' },
      pastNegPolite: { japanese: prefix + 'しませんでした',        label: 'Vergangen. neg. höfl.' },
      te:            { japanese: prefix + 'して',                label: 'て-Form' },
      potential:     { japanese: prefix + 'できる',              label: 'Potenzial (können)' },
      passive:       { japanese: prefix + 'される',              label: 'Passiv (受身形)' },
      causative:     { japanese: prefix + 'させる',              label: 'Kausativ (使役形)' },
      causPas:       { japanese: prefix + 'させられる',           label: 'Kausativ-Passiv' },
      conditional:   { japanese: prefix + 'すれば',              label: 'Konditional (ば形)' },
      conditionalTara: { japanese: prefix + 'したら',            label: 'Konditional (たら形)' },
      volitional:    { japanese: prefix + 'しよう',              label: 'Volitional (意志形)' },
      volPolite:     { japanese: prefix + 'しましょう',           label: 'Volitional höflich' },
      imperative:    { japanese: prefix + 'しろ',                label: 'Imperativ (命令形)' },
      prohibitive:   { japanese: reading + 'な',                label: 'Verbot (禁止形)' }
    };
  }

  function conjugateKuru(reading) {
    var prefix = reading.slice(0, -2);
    return {
      dictionary:    { japanese: reading,                      label: 'Wörterbuchform (辞書形)' },
      polite:        { japanese: prefix + 'きます',              label: 'Höflich (ます形)' },
      negative:      { japanese: prefix + 'こない',              label: 'Negativ (ない形)' },
      negPolite:     { japanese: prefix + 'きません',             label: 'Negativ höflich' },
      past:          { japanese: prefix + 'きた',                label: 'Vergangenheit (た形)' },
      pastPolite:    { japanese: prefix + 'きました',             label: 'Vergangenheit höflich' },
      pastNeg:       { japanese: prefix + 'こなかった',           label: 'Vergangenheit negativ' },
      pastNegPolite: { japanese: prefix + 'きませんでした',        label: 'Vergangen. neg. höfl.' },
      te:            { japanese: prefix + 'きて',                label: 'て-Form' },
      potential:     { japanese: prefix + 'こられる',             label: 'Potenzial (können)' },
      passive:       { japanese: prefix + 'こられる',             label: 'Passiv (受身形)' },
      causative:     { japanese: prefix + 'こさせる',             label: 'Kausativ (使役形)' },
      causPas:       { japanese: prefix + 'こさせられる',          label: 'Kausativ-Passiv' },
      conditional:   { japanese: prefix + 'くれば',              label: 'Konditional (ば形)' },
      conditionalTara: { japanese: prefix + 'きたら',            label: 'Konditional (たら形)' },
      volitional:    { japanese: prefix + 'こよう',              label: 'Volitional (意志形)' },
      volPolite:     { japanese: prefix + 'きましょう',           label: 'Volitional höflich' },
      imperative:    { japanese: prefix + 'こい',                label: 'Imperativ (命令形)' },
      prohibitive:   { japanese: reading + 'な',                label: 'Verbot (禁止形)' }
    };
  }

  var GROUP_LABELS = {
    godan: '五段動詞',
    ichidan: '一段動詞',
    suru: '変格 (する)',
    kuru: '変格 (くる)',
    aru: '五段動詞'
  };

  var SURU_SUFFIX = 'する';
  var SURU_INFLECTIONS = [
    'する', 'した', 'して', 'します', 'しました',
    'しない', 'しません', 'している', 'しています',
    'していた', 'される', 'された', 'させる',
    'させられる', 'すれば', 'したら', 'しよう',
    'したい', 'しろ'
  ];
  var NON_VERB_CATEGORIES = {
    'Art und Weise': 1,
    'Zeit': 1,
    'Eigenschaften': 1,
    'Ort': 1
  };

  function isLikelyGermanVerbMeaning(meaning) {
    if (!meaning || typeof meaning !== 'string') return false;
    var first = meaning.split(/[,\s/()]+/)[0] || '';
    first = first.toLowerCase();
    if (!first) return false;
    return /(en|eln|ern|ieren|igen|ßen|hen|ten)$/.test(first);
  }

  function hasSuruExample(word, examples) {
    if (!word || !examples || !examples.length) return false;
    var text = examples.map(function (ex) {
      return ex && ex.japanese ? ex.japanese : '';
    }).join('\n');
    for (var i = 0; i < SURU_INFLECTIONS.length; i++) {
      if (text.indexOf(word + SURU_INFLECTIONS[i]) !== -1) return true;
    }
    return false;
  }

  function endsWithSuru(text) {
    return typeof text === 'string' && text.slice(-2) === SURU_SUFFIX;
  }

  window.conjugateVerb = function (reading) {
    var group = detectVerbGroup(reading);
    if (!group) return null;

    var forms;
    switch (group) {
      case 'godan':   forms = conjugateGodan(reading); break;
      case 'ichidan': forms = conjugateIchidan(reading); break;
      case 'suru':    forms = conjugateSuru(reading); break;
      case 'kuru':    forms = conjugateKuru(reading); break;
      case 'aru':
        forms = conjugateGodan(reading);
        // Special: ある negative is ない, not あらない
        forms.negative =      { japanese: 'ない',           label: 'Negativ (ない形)' };
        forms.negPolite =     { japanese: 'ありません',       label: 'Negativ höflich' };
        forms.pastNeg =       { japanese: 'なかった',        label: 'Vergangenheit negativ' };
        forms.pastNegPolite = { japanese: 'ありませんでした',  label: 'Vergangen. neg. höfl.' };
        break;
    }

    return {
      group: group,
      groupLabel: GROUP_LABELS[group] || group,
      forms: forms
    };
  };

  window.resolveVocabVerbConjugation = function (item) {
    if (!item || item.type !== 'Verb' || !item.reading) return null;

    var direct = window.conjugateVerb(item.reading);
    if (direct) {
      return {
        reading: item.reading,
        result: direct,
        normalized: false
      };
    }

    if (item.conjugationReading) {
      var explicit = window.conjugateVerb(item.conjugationReading);
      if (explicit) {
        return {
          reading: item.conjugationReading,
          result: explicit,
          normalized: item.conjugationReading !== item.reading
        };
      }
    }

    if (endsWithSuru(item.reading) || endsWithSuru(item.word)) return null;

    var candidateReading = item.reading + SURU_SUFFIX;
    var candidate = window.conjugateVerb(candidateReading);
    if (!candidate) return null;

    var hasExampleEvidence = hasSuruExample(item.word, item.examples);
    var hasMeaningEvidence = isLikelyGermanVerbMeaning(item.meaning);
    if (!hasExampleEvidence && !hasMeaningEvidence) {
      return null;
    }

    if (!hasMeaningEvidence && item.category && NON_VERB_CATEGORIES[item.category]) {
      return null;
    }

    return {
      reading: candidateReading,
      result: candidate,
      normalized: true
    };
  };
})();
