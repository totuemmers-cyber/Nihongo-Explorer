/* Lookup of Japanese text as it is written in the wild: inflected forms and whole sentences.
   - deinflect(text): rule-based reduction of an inflected form to dictionary-form candidates
     (食べられなかった → 食べる: potential or passive · negative · past). Each rule replaces an
     ending; a candidate counts only when a vocabulary entry of the right kind (ichidan, godan,
     する, 来る, い-adjective, な-adjective, other) carries that form.
   - inflection(item, query, items): the vocabulary search's view of the same (search ranking).
   - segment(text, sources): splits a pasted sentence into vocabulary words, particles and
     auxiliaries (linked to their grammar points) and single kanji, longest match first.
   The vocabulary list (VOCAB_RUNTIME items) is enough; the details file is not needed. */
(function () {
  'use strict';

  // --- Reasons: what a rule undid, in German (translated through tr) or as a Japanese pattern ---
  var REASONS = {
    past: 'Vergangenheit',
    negative: 'Verneinung',
    polite: 'Höflich',
    te: 'て-Form',
    potential: 'Potenzial',
    passive: 'Passiv',
    potentialPassive: 'Potenzial oder Passiv',
    causative: 'Kausativ',
    causativePassive: 'Kausativ-Passiv',
    conditionalBa: 'Konditional (ば)',
    conditionalTara: 'Konditional (たら)',
    volitional: 'Volitional',
    imperative: 'Imperativ',
    prohibitive: 'Verbot',
    adverb: 'Adverb (く)',
    noun: 'Substantiv (さ)'
  };
  function reasonLabel(key) {
    if (!Object.prototype.hasOwnProperty.call(REASONS, key)) return key;
    return typeof window.tr === 'function' ? window.tr(REASONS[key]) : REASONS[key];
  }
  function describe(reasons) { return (reasons || []).map(reasonLabel).join(' · '); }

  // --- Rules ---
  // A form's type says how it can be reduced further. Dictionary kinds: v1 (ichidan), v5
  // (godan), vk (来る), vs (する), adj-i, na (な-adjective), plain (any other non-verb).
  // Intermediate types: te (て/で form), ta (past before ら/り), stem (連用形), neg (未然形).
  // 'raw' is the text as typed. Reasons are listed from the dictionary form outwards.
  var RULES = [];
  function rule(from, to, inTypes, outTypes, reasons, silentFor) {
    RULES.push({ from: from, to: to, inTypes: inTypes.split(' '), outTypes: outTypes.split(' '),
      reasons: reasons ? reasons.split(' ') : [], silentFor: silentFor || null });
  }
  var VERB_KINDS = 'v1 v5 vk vs vz';

  // Godan rows: dictionary ending, a-, i-, e-, o-row, て-form, past.
  var GODAN = [
    ['う', 'わ', 'い', 'え', 'お', 'って', 'った'],
    ['く', 'か', 'き', 'け', 'こ', 'いて', 'いた'],
    ['ぐ', 'が', 'ぎ', 'げ', 'ご', 'いで', 'いだ'],
    ['す', 'さ', 'し', 'せ', 'そ', 'して', 'した'],
    ['つ', 'た', 'ち', 'て', 'と', 'って', 'った'],
    ['ぬ', 'な', 'に', 'ね', 'の', 'んで', 'んだ'],
    ['ぶ', 'ば', 'び', 'べ', 'ぼ', 'んで', 'んだ'],
    ['む', 'ま', 'み', 'め', 'も', 'んで', 'んだ'],
    ['る', 'ら', 'り', 'れ', 'ろ', 'って', 'った']
  ];

  // て-form and past share their shapes; ta is the past before たら and たり, whose own rule
  // already names the form, so the past rule stays silent for it.
  [['te', 5, 'て', 'で', 'te', 'くて'], ['ta', 6, 'た', 'だ', 'past', 'かった']].forEach(function (f) {
    var type = f[0], column = f[1], plainEnd = f[2], reason = f[4], inTypes = 'raw ' + type;
    var seen = {};
    GODAN.forEach(function (row) {
      var key = row[column] + '>' + row[0];
      if (seen[key]) return;
      seen[key] = true;
      rule(row[column], row[0], inTypes, 'v5', reason, type);
    });
    rule(plainEnd, 'る', inTypes, 'v1', reason, type);
    rule('行っ' + plainEnd, '行く', inTypes, 'v5', reason, type);
    rule('いっ' + plainEnd, 'いく', inTypes, 'v5', reason, type);
    rule('し' + plainEnd, 'する', inTypes, 'vs', reason, type);
    rule('き' + plainEnd, 'くる', inTypes, 'vk', reason, type);
    rule(f[5], 'い', inTypes, 'adj-i', reason, type);
  });
  rule('たら', 'た', 'raw', 'ta', 'conditionalTara');
  rule('だら', 'だ', 'raw', 'ta', 'conditionalTara');
  rule('たり', 'た', 'raw', 'ta', '～たり');
  rule('だり', 'だ', 'raw', 'ta', '～たり');

  // Polite forms leave the stem.
  rule('ます', '', 'raw', 'stem', 'polite');
  rule('ました', '', 'raw', 'stem', 'polite past');
  rule('ません', '', 'raw', 'stem', 'polite negative');
  rule('ませんでした', '', 'raw', 'stem', 'polite negative past');
  rule('ましょう', '', 'raw', 'stem', 'polite volitional');
  rule('まして', '', 'raw', 'stem', 'polite te');
  rule('ませ', '', 'raw', 'stem', 'polite imperative');
  // Auxiliaries on the stem.
  rule('たい', '', 'raw adj-i', 'stem', '～たい');
  rule('たがる', '', 'raw v5', 'stem', '～たがる');
  rule('ながら', '', 'raw', 'stem', '～ながら');
  rule('そう', '', 'raw na', 'stem', '～そう');
  rule('すぎる', '', 'raw v1', 'stem', '～すぎる');
  rule('やすい', '', 'raw adj-i', 'stem', '～やすい');
  rule('にくい', '', 'raw adj-i', 'stem', '～にくい');
  rule('なさい', '', 'raw', 'stem', '～なさい');
  rule('方', '', 'raw', 'stem', '～方');
  rule('かた', '', 'raw', 'stem', '～方');
  // Stem → dictionary form. A bare stem is a form too: 食べ、… or 取りに行く.
  rule('', 'る', 'raw stem', 'v1');
  GODAN.forEach(function (row) { rule(row[2], row[0], 'raw stem', 'v5'); });
  rule('し', 'する', 'raw stem', 'vs');
  rule('き', 'くる', 'raw stem', 'vk');
  // Honorific verbs: なさいます, いらっしゃいます, くださいます, ございます.
  rule('さい', 'さる', 'raw stem', 'v5');
  rule('ゃい', 'ゃる', 'raw stem', 'v5');
  rule('ざい', 'ざる', 'raw stem', 'v5');
  rule('仰い', '仰る', 'raw stem', 'v5');
  // ずる verbs conjugate through their じる form: 演じます → 演じる → 演ずる.
  rule('じる', 'ずる', 'raw v1', 'vz');
  rule('ずれば', 'ずる', 'raw', 'vz', 'conditionalBa');

  // Negative forms leave the 未然形.
  rule('ない', '', 'raw adj-i', 'neg', 'negative');
  rule('ず', '', 'raw', 'neg', '～ず');
  rule('ずに', '', 'raw', 'neg', '～ずに');
  rule('ないで', '', 'raw', 'neg', '～ないで');
  rule('なきゃ', '', 'raw', 'neg', '～なきゃ');
  rule('なくちゃ', '', 'raw', 'neg', '～なくちゃ');
  rule('ぬ', '', 'raw', 'neg', 'negative');
  rule('らん', 'ら', 'raw', 'neg', 'negative');
  rule('かん', 'か', 'raw', 'neg', 'negative');
  rule('', 'る', 'neg', 'v1');
  GODAN.forEach(function (row) { rule(row[1], row[0], 'neg', 'v5'); });
  rule('し', 'する', 'neg', 'vs');
  rule('せ', 'する', 'neg', 'vs');
  rule('こ', 'くる', 'neg', 'vk');

  // Potential, passive and causative forms are ichidan verbs themselves (in: raw or v1).
  GODAN.forEach(function (row) {
    rule(row[3] + 'る', row[0], 'raw v1', 'v5', 'potential');
    rule(row[1] + 'れる', row[0], 'raw v1', 'v5', 'passive');
    rule(row[1] + 'せる', row[0], 'raw v1', 'v5', 'causative');
    rule(row[1] + 'せられる', row[0], 'raw v1', 'v5', 'causativePassive');
    if (row[0] !== 'す') rule(row[1] + 'される', row[0], 'raw v1', 'v5', 'causativePassive');
    rule(row[3] + 'ば', row[0], 'raw', 'v5', 'conditionalBa');
    rule(row[3], row[0], 'raw', 'v5', 'imperative');
    rule(row[4] + 'う', row[0], 'raw', 'v5', 'volitional');
  });
  rule('られる', 'る', 'raw v1', 'v1', 'potentialPassive');
  rule('れる', 'る', 'raw v1', 'v1', 'potential');
  rule('させる', 'る', 'raw v1', 'v1', 'causative');
  rule('させられる', 'る', 'raw v1', 'v1', 'causativePassive');
  rule('れば', 'る', 'raw', 'v1', 'conditionalBa');
  rule('よう', 'る', 'raw', 'v1', 'volitional');
  rule('ろ', 'る', 'raw', 'v1', 'imperative');
  rule('よ', 'る', 'raw', 'v1', 'imperative');
  rule('できる', 'する', 'raw v1', 'vs', 'potential');
  rule('される', 'する', 'raw v1', 'vs', 'passive');
  rule('させる', 'する', 'raw v1', 'vs', 'causative');
  rule('させられる', 'する', 'raw v1', 'vs', 'causativePassive');
  rule('すれば', 'する', 'raw', 'vs', 'conditionalBa');
  rule('しよう', 'する', 'raw', 'vs', 'volitional');
  rule('しろ', 'する', 'raw', 'vs', 'imperative');
  rule('せよ', 'する', 'raw', 'vs', 'imperative');
  rule('こられる', 'くる', 'raw v1', 'vk', 'potentialPassive');
  rule('これる', 'くる', 'raw v1', 'vk', 'potential');
  rule('こさせる', 'くる', 'raw v1', 'vk', 'causative');
  rule('くれば', 'くる', 'raw', 'vk', 'conditionalBa');
  rule('こよう', 'くる', 'raw', 'vk', 'volitional');
  rule('こい', 'くる', 'raw', 'vk', 'imperative');
  rule('な', '', 'raw', VERB_KINDS, 'prohibitive');

  // Auxiliaries after the て-form. Contractions: てる, とく, ちゃう.
  [['いる', 'v1', '～ている'], ['ある', 'v5', '～てある'], ['おく', 'v5', '～ておく'], ['しまう', 'v5', '～てしまう'],
    ['みる', 'v1', '～てみる'], ['いく', 'v5', '～ていく'], ['行く', 'v5', '～ていく'], ['くる', 'vk', '～てくる'],
    ['来る', 'v1', '～てくる'], ['あげる', 'v1', '～てあげる'], ['くれる', 'v1', '～てくれる'], ['もらう', 'v5', '～てもらう'],
    ['いただく', 'v5', '～ていただく'], ['ほしい', 'adj-i', '～てほしい'], ['ください', '', '～てください'],
    ['下さい', '', '～てください'], ['も', '', '～ても'], ['から', '', '～てから'], ['は', '', '～ては']
  ].forEach(function (aux) { rule(aux[0], '', ('raw ' + aux[1]).trim(), 'te', aux[2]); });
  rule('てる', 'て', 'raw v1', 'te', '～ている');
  rule('でる', 'で', 'raw v1', 'te', '～ている');
  rule('とく', 'て', 'raw v5', 'te', '～ておく');
  rule('どく', 'で', 'raw v5', 'te', '～ておく');
  rule('ちゃう', 'て', 'raw v5', 'te', '～ちゃう');
  rule('じゃう', 'で', 'raw v5', 'te', '～ちゃう');

  // い-adjectives (their て-form and past come from the table above).
  rule('くない', 'い', 'raw adj-i', 'adj-i', 'negative');
  rule('くありません', 'い', 'raw', 'adj-i', 'polite negative');
  rule('くありませんでした', 'い', 'raw', 'adj-i', 'polite negative past');
  rule('ければ', 'い', 'raw', 'adj-i', 'conditionalBa');
  rule('く', 'い', 'raw', 'adj-i', 'adverb');
  rule('さ', 'い', 'raw', 'adj-i', 'noun');
  rule('そう', 'い', 'raw na', 'adj-i', '～そう');
  rule('すぎる', 'い', 'raw v1', 'adj-i', '～すぎる');
  rule('くなる', 'い', 'raw v5', 'adj-i', '～くなる');
  rule('くする', 'い', 'raw vs', 'adj-i', '～くする');
  rule('がる', 'い', 'raw v5', 'adj-i', '～がる');

  // Copula and particles after な-adjectives and nouns. Single kana only for な-adjectives:
  // さかな is not 坂 + な.
  rule('な', '', 'raw', 'na', '＋な');
  rule('に', '', 'raw', 'na', '＋に');
  rule('で', '', 'raw', 'na', '＋で');
  rule('だ', '', 'raw', 'na', '＋だ');
  rule('です', '', 'raw', 'plain na adj-i', '＋です');
  rule('でした', '', 'raw', 'plain na', '＋でした');
  rule('だった', '', 'raw', 'plain na', '＋だった');
  rule('じゃない', '', 'raw adj-i', 'plain na', '＋じゃない');
  rule('ではない', '', 'raw adj-i', 'plain na', '＋ではない');
  rule('じゃありません', '', 'raw', 'plain na', '＋じゃありません');
  rule('ではありません', '', 'raw', 'plain na', '＋ではありません');
  rule('でしょう', '', 'raw', 'plain na adj-i ' + VERB_KINDS, '＋でしょう');
  rule('だろう', '', 'raw', 'plain na adj-i ' + VERB_KINDS, '＋だろう');
  rule('んです', '', 'raw', 'plain na adj-i ' + VERB_KINDS, '＋んです');
  rule('のです', '', 'raw', 'plain na adj-i ' + VERB_KINDS, '＋のです');
  rule('かったです', 'い', 'raw', 'adj-i', 'past ＋です');
  rule('なら', '', 'raw', 'plain na adj-i ' + VERB_KINDS, '～なら');
  rule('べき', '', 'raw na plain', VERB_KINDS, '～べき');

  // Rules by the last character of their ending; rules with an empty ending apply to any form.
  var BY_LAST = {}, EMPTY = [];
  RULES.forEach(function (r) {
    if (!r.from) { EMPTY.push(r); return; }
    var last = r.from.charAt(r.from.length - 1);
    (BY_LAST[last] = BY_LAST[last] || []).push(r);
  });
  var FINAL = { v1: 1, v5: 1, vk: 1, vs: 1, vz: 1, 'adj-i': 1, na: 1, plain: 1 };
  var MAX_STEPS = 7, MAX_FORMS = 400;

  // All reductions of text: [{ term, type, reasons }], the text itself excluded.
  function deinflect(text) {
    text = String(text || '');
    var results = [{ term: text, type: 'raw', reasons: [] }];
    var seen = Object.create(null);
    for (var i = 0; i < results.length && results.length < MAX_FORMS; i++) {
      var source = results[i];
      if (source.reasons.length >= MAX_STEPS || !source.term) continue;
      var last = source.term.charAt(source.term.length - 1);
      var candidates = (BY_LAST[last] || []).concat(EMPTY);
      for (var j = 0; j < candidates.length; j++) {
        var r = candidates[j];
        if (r.inTypes.indexOf(source.type) === -1) continue;
        var term = source.term;
        if (r.from && term.slice(-r.from.length) !== r.from) continue;
        var next = term.slice(0, term.length - r.from.length) + r.to;
        if (!next) continue;
        var reasons = r.silentFor === source.type ? source.reasons : r.reasons.concat(source.reasons);
        for (var k = 0; k < r.outTypes.length; k++) {
          var key = next + '|' + r.outTypes[k];
          if (seen[key]) continue;
          seen[key] = true;
          results.push({ term: next, type: r.outTypes[k], reasons: reasons });
        }
      }
    }
    return results.slice(1);
  }

  // --- Vocabulary index ---
  var GROUP_KIND = { godan: 'v5', ichidan: 'v1', suru: 'vs', kuru: 'vk', aru: 'v5', zuru: 'vz' };
  var JAPANESE = /[぀-ヿ㐀-䶿一-鿿豈-﫿々〆ヵヶー]/;
  var KANJI = /[㐀-䶿一-鿿豈-﫿々〆]/;
  var KANA_ONLY = /^[぀-ヿー]+$/;
  var KATAKANA = /[゠-ヿー]/;
  var U_ROW = 'うくぐすつぬぶむる';
  function hasJapanese(text) { return JAPANESE.test(String(text || '')); }

  // Dictionary kinds of an entry: its conjugation group, or inferred from the ending for
  // expressions without one (気に入る). Every non-verb is also 'plain'.
  function kindsOf(item) {
    var kinds = {};
    var group = item.verbGroup || (item.conjugation && item.conjugation.verbGroup);
    var word = String(item.word || ''), reading = String(item.reading || '');
    if (group && GROUP_KIND[group]) kinds[GROUP_KIND[group]] = 1;
    // 来る in kanji writes 来ない, 来ます, 来た like an ichidan verb.
    if (group === 'kuru' && /来る$/.test(word)) kinds.v1 = 1;
    if (!group && (item.type === 'Verb' || /^(Ausdruck|Redewendung|Sprichwort)$/.test(item.type))) {
      if (/する$/.test(reading)) kinds.vs = 1;
      else if (/(来る|くる)$/.test(word) && /くる$/.test(reading)) kinds.vk = 1;
      else if (/る$/.test(reading)) { kinds.v1 = 1; kinds.v5 = 1; }
      else if (U_ROW.indexOf(reading.slice(-1)) !== -1) kinds.v5 = 1;
    }
    if (item.type !== 'Verb') kinds.plain = 1;
    if (item.type === 'Adjektiv') {
      kinds.na = 1;
      if (/い$/.test(reading) && /い$/.test(word)) kinds['adj-i'] = 1;
    }
    return kinds;
  }

  function bareWord(word) { return String(word || '').replace(/[〜～~]/g, ''); }

  var indexCache = null;
  function vocabularyIndex(items) {
    if (indexCache && indexCache.items === items) return indexCache;
    var byWord = new Map(), byReading = new Map(), kinds = new Map(), order = new Map();
    function add(map, key, item) {
      if (!key) return;
      var list = map.get(key);
      if (!list) map.set(key, list = []);
      if (list.indexOf(item) === -1) list.push(item);
    }
    (items || []).forEach(function (item, index) {
      order.set(item, index);
      var k = kindsOf(item);
      kinds.set(item, k);
      var words = [item.word].concat(item.aliases || []);
      words.forEach(function (w) {
        add(byWord, w, item);
        // Prefixes and suffixes (〜円, お〜) also match without their tilde.
        if (/[〜～~]/.test(w)) add(byWord, bareWord(w), item);
      });
      add(byReading, bareWord(item.reading), item);
      // する nouns (不足 with the group suru) also carry their verb: 不足する.
      if (k.vs && !/する$/.test(item.word)) {
        words.forEach(function (w) { add(byWord, bareWord(w) + 'する', item); });
        add(byReading, bareWord(item.reading) + 'する', item);
      }
    });
    indexCache = { items: items, byWord: byWord, byReading: byReading, kinds: kinds, order: order };
    return indexCache;
  }

  function levelRank(item) {
    var order = { N5: 0, N4: 1, N3: 2, N2: 3, N1: 4 };
    var level = String(item.level || '').split('/')[0];
    return order[level] !== undefined ? order[level] : 9;
  }

  // Matches of a whole text against the vocabulary, best first: [{ item, reasons, tier }].
  // Tiers: 1 headword or alias, 2 inflected headword, 3 reading, 4 inflected reading.
  function vocabularyMatches(text, items, options) {
    options = options || {};
    var idx = vocabularyIndex(items), found = new Map();
    function take(list, tier, reasons, type) {
      (list || []).forEach(function (item) {
        if (type && !idx.kinds.get(item)[type]) return;
        var prior = found.get(item);
        if (prior && (prior.tier < tier || (prior.tier === tier && prior.reasons.length <= reasons.length))) return;
        found.set(item, { item: item, reasons: reasons, tier: tier });
      });
    }
    var kana = KANA_ONLY.test(text), readings = kana && !options.noReadings;
    take(idx.byWord.get(text), 1, [], null);
    if (readings) take(idx.byReading.get(text), 3, [], null);
    if (!options.rawOnly && /[぀-ヿ]$/.test(text)) {
      deinflect(text).forEach(function (form) {
        if (!FINAL[form.type]) return;
        take(idx.byWord.get(form.term), 2, form.reasons, form.type);
        if (readings && form.term.length >= 2) take(idx.byReading.get(form.term), 4, form.reasons, form.type);
      });
    }
    var list = Array.from(found.values());
    list.sort(function (a, b) {
      return (a.tier - b.tier) || (a.reasons.length - b.reasons.length) ||
        (/[〜～~]/.test(a.item.word) - /[〜～~]/.test(b.item.word)) ||
        (levelRank(a.item) - levelRank(b.item)) || (idx.order.get(a.item) - idx.order.get(b.item));
    });
    return list;
  }

  // The vocabulary search: does query reach item only as an inflected form? Computed once per
  // query and item list. The score sits just below an exact reading; when the query is itself
  // a word, its inflected readings rank below the prefix matches of that word.
  var inflectionCache = { query: null, items: null, map: null, score: 0 };
  function inflection(item, query, items) {
    if (inflectionCache.query !== query || inflectionCache.items !== items) {
      var map = new Map(), exact = false;
      if (query && hasJapanese(query) && query.length <= 40) {
        vocabularyMatches(query, items).forEach(function (match) {
          if (match.tier === 1 || match.tier === 3) { exact = true; return; }
          map.set(match.item, match);
        });
      }
      inflectionCache = { query: query, items: items, map: map, score: exact ? 790 : 940 };
    }
    var match = inflectionCache.map.get(item);
    return match ? { reasons: match.reasons, score: inflectionCache.score } : null;
  }

  // --- Sentences ---
  var MAX_TEXT = 300, MAX_TOKEN = 12;
  // Particles, the copula and other function words: linked to their grammar point when one
  // has exactly this pattern.
  var FUNCTION_WORDS = ['は', 'が', 'を', 'に', 'で', 'へ', 'と', 'も', 'の', 'や', 'か', 'ね', 'よ', 'わ', 'から', 'まで',
    'より', 'ので', 'のに', 'けど', 'けれど', 'けれども', 'です', 'でした', 'でしょう', 'だ', 'だった', 'だろう', 'ます',
    'って', 'だけ', 'しか', 'ばかり', 'など', 'くらい', 'ぐらい', 'ほど', 'ながら', 'さん'];
  // After a word written in kanji or katakana, one of these starts a particle, never a word
  // read in kana: 私はしごと is 私 + は + しごと, not 私 + はしご + と.
  var PARTICLE_START = 'はがをにでへとものやか';

  var grammarCache = { items: null, map: null };
  function grammarByPattern(items) {
    if (grammarCache.items === items) return grammarCache.map;
    var map = Object.create(null);
    (items || []).forEach(function (g, index) {
      var whole = bareWord(g.pattern).trim();
      whole.split(/\s*[;,/、・]\s*/).forEach(function (part) {
        if (FUNCTION_WORDS.indexOf(part) === -1) return;
        var exact = part === whole ? 0 : 1, prior = map[part];
        var rank = [exact, levelRank(g), index];
        if (!prior || rank[0] < prior.rank[0] || (rank[0] === prior.rank[0] && (rank[1] < prior.rank[1] || (rank[1] === prior.rank[1] && rank[2] < prior.rank[2])))) {
          map[part] = { item: g, rank: rank };
        }
      });
    });
    grammarCache = { items: items, map: map };
    return map;
  }

  var kanjiCache = { items: null, map: null };
  function kanjiByChar(items) {
    if (kanjiCache.items === items) return kanjiCache.map;
    var map = Object.create(null);
    (items || []).forEach(function (k) { map[k.kanji] = k; });
    kanjiCache = { items: items, map: map };
    return map;
  }

  // Splitting is a cheapest path through the text: every token has a cost, so a reading of
  // the sentence with fewer and better-attested words wins. A headword costs 1, an inflected
  // headword 1.1, a word found by its kana reading 1.5 (inflected 1.7); rarer levels, prefix
  // and suffix entries cost a little more. A single kanji without a word costs 2 (it links to
  // its kanji card), any other character 3.
  var TIER_COST = { 1: 1, 2: 1.1, 3: 1.5, 4: 1.7 };
  // Prefix and suffix entries (〜円, お〜) cost more, except a suffix right after a number.
  var NUMBER = /[0-9０-９一二三四五六七八九十百千万億何数]/;
  function matchCost(match, afterNumber) {
    var affix = /[〜～~]/.test(match.item.word) ? (afterNumber && /^[〜～~]/.test(match.item.word) ? -0.3 : 0.6) : 0;
    return TIER_COST[match.tier] + affix + 0.1 * Math.min(levelRank(match.item), 5) + 0.02 * match.reasons.length;
  }

  // Splits text into tokens: { text, kind: 'vocab' | 'grammar' | 'kanji' | 'text', matches,
  // item }. A vocabulary token carries its best match and up to two near alternatives.
  function segment(text, sources) {
    sources = sources || {};
    text = String(text || '').slice(0, MAX_TEXT);
    var vocab = sources.vocab || [], grammar = grammarByPattern(sources.grammar), kanji = kanjiByChar(sources.kanji);
    var n = text.length, best = new Array(n + 1);
    best[0] = { cost: 0 };
    function relax(end, cost, token, start) {
      if (!best[end] || cost < best[end].cost - 1e-9) best[end] = { cost: cost, token: token, start: start };
    }
    function candidate(s, particleNext, afterNumber) {
      var fn = FUNCTION_WORDS.indexOf(s) !== -1 && grammar[s] ? grammar[s].item : null;
      var matches = vocabularyMatches(s, vocab, { noReadings: s.length < 2 });
      // After a word in kanji or katakana, は, が, に … start a particle, not a word in kana.
      if (particleNext && s.length > 1 && KANA_ONLY.test(s)) matches = [];
      matches = matches.map(function (m) { return { match: m, cost: matchCost(m, afterNumber) }; })
        .sort(function (a, b) { return a.cost - b.cost; });
      if (fn && (!matches.length || matches[0].cost >= 1 || matches[0].match.item.type === 'Partikel')) {
        return { cost: 1, token: { text: s, kind: 'grammar', item: fn } };
      }
      if (!matches.length) return null;
      var top = matches[0].cost;
      return { cost: top, token: { text: s, kind: 'vocab', matches: matches.filter(function (m) { return m.cost <= top + 0.15; })
        .slice(0, 3).map(function (m) { return m.match; }) } };
    }
    for (var i = 0; i < n; i++) {
      if (!best[i]) continue;
      var base = best[i].cost, ch = text.charAt(i);
      if (!JAPANESE.test(ch)) { relax(i + 1, base, null, i); continue; }
      var before = i > 0 ? text.charAt(i - 1) : '';
      var particleNext = (KANJI.test(before) || KATAKANA.test(before)) && PARTICLE_START.indexOf(ch) !== -1;
      var afterNumber = NUMBER.test(before);
      for (var length = 1; length <= MAX_TOKEN && i + length <= n; length++) {
        if (!JAPANESE.test(text.charAt(i + length - 1))) break;
        var found = candidate(text.substr(i, length), particleNext, afterNumber);
        if (found) relax(i + length, base + found.cost, found.token, i);
      }
      if (KATAKANA.test(ch)) {
        // An unknown loanword stays one piece.
        var end = i;
        while (end < n && KATAKANA.test(text.charAt(end))) end++;
        relax(end, base + 2, null, i);
      }
      if (KANJI.test(ch) && kanji[ch]) relax(i + 1, base + 2, { text: ch, kind: 'kanji', item: kanji[ch] }, i);
      relax(i + 1, base + 3, null, i);
    }
    var tokens = [];
    for (var at = n; at > 0; at = best[at].start) {
      var step = best[at], piece = step.token || { text: text.slice(step.start, at), kind: 'text' };
      var first = tokens[0];
      if (piece.kind === 'text' && first && first.kind === 'text') first.text = piece.text + first.text;
      else tokens.unshift(piece);
    }
    return tokens;
  }

  window.NIHONGO_LOOKUP = {
    deinflect: deinflect,
    vocabularyMatches: vocabularyMatches,
    inflection: inflection,
    segment: segment,
    describe: describe,
    reasonLabel: reasonLabel,
    hasJapanese: hasJapanese,
    kindsOf: kindsOf,
    MAX_TEXT: MAX_TEXT
  };
})();
