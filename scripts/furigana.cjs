// Furigana for example sentences, derived from their authored romaji.
//
// The romaji fixes which kana a sentence is read with; the open question is where each kanji run
// begins and ends inside that kana. Kana in the sentence anchor the alignment, and every kanji run
// takes the kana between its anchors. Where several splits fit, or romaji leaves a spelling open
// (ō as おう or おお, zu as ず or づ, "kinyōbi" with or without the apostrophe it lacks), readings
// attested for the same characters decide: a run whose reading the vocabulary or kanji data attest
// scores higher than one they do not, and only a single best alignment is accepted. Spellings that
// sound the same and that nothing tells apart (じ/ぢ, ず/づ, おう/おお) take the standard modern
// spelling (じ, ず, おう, えい).
//
// A run whose reading attested pieces do not fully explain gets no furigana of its own (null): that
// is where typos in the romaji ("kaishasha" for 会社側) would otherwise turn into wrong furigana.
// Sentences without a single best alignment get none at all.
//
// Output per sentence: one hiragana reading (or null) per kanji run, in order (see KANJI_RUN_RE). The
// browser pairs the same runs with these readings (renderJapaneseExample in section-configs.js).

// Kanji runs as the browser splits them; keep identical to FURIGANA_RUN_RE in section-configs.js.
const KANJI_RUN_RE = /[㐀-䶿一-鿿豈-﫿々〆〇ヶ]+/g;
const KANJI_CHAR_RE = /[㐀-䶿一-鿿豈-﫿々〆〇ヶ]/;
const KANA_CHAR_RE = /[ぁ-ゖァ-ヺー]/;
const DIGIT_RE = /[0-9０-９]/;
const LATIN_RE = /[A-Za-zＡ-Ｚａ-ｚ]/;
const LONG_VOWEL = '̄';
const LATIN_UNIT = '\u0000';

const ROMAJI_SYLLABLES = (() => {
  const table = {};
  const rows = {
    '': 'あいうえお', k: 'かきくけこ', g: 'がぎぐげご', s: 'さしすせそ', z: 'ざじずぜぞ',
    t: 'たちつてと', d: 'だぢづでど', n: 'なにぬねの', h: 'はひふへほ', b: 'ばびぶべぼ',
    p: 'ぱぴぷぺぽ', m: 'まみむめも', r: 'らりるれろ'
  };
  for (const consonant of Object.keys(rows)) for (let i = 0; i < 5; i++) table[consonant + 'aiueo'[i]] = rows[consonant][i];
  for (const consonant of ['k', 'g', 'n', 'h', 'b', 'p', 'm', 'r']) {
    const stem = table[consonant + 'i'];
    table[consonant + 'ya'] = stem + 'ゃ'; table[consonant + 'yu'] = stem + 'ゅ'; table[consonant + 'yo'] = stem + 'ょ';
  }
  for (const [head, kana] of [['sh', 'し'], ['ch', 'ち'], ['j', 'じ']]) {
    table[head + 'i'] = kana; table[head + 'a'] = kana + 'ゃ'; table[head + 'u'] = kana + 'ゅ';
    table[head + 'o'] = kana + 'ょ'; table[head + 'e'] = kana + 'ぇ';
  }
  Object.assign(table, {
    tsu: 'つ', fu: 'ふ', ti: 'てぃ', di: 'でぃ', tu: 'とぅ', du: 'どぅ', tsa: 'つぁ', tsi: 'つぃ', tse: 'つぇ', tso: 'つぉ',
    fa: 'ふぁ', fi: 'ふぃ', fe: 'ふぇ', fo: 'ふぉ', ya: 'や', yu: 'ゆ', yo: 'よ', ye: 'いぇ',
    wa: 'わ', wo: 'を', wi: 'うぃ', we: 'うぇ', vu: 'ゔ', va: 'ゔぁ', vi: 'ゔぃ', ve: 'ゔぇ', vo: 'ゔぉ'
  });
  return table;
})();
const KANA_VOWELS = (() => {
  const vowels = {};
  const rows = ['あかがさざただなはばぱまやらわゃぁ', 'いきぎしじちぢにひびぴみりぃ', 'うくぐすずつづぬふぶぷむゆるゔゅぅ',
    'えけげせぜてでねへべぺめれぇ', 'おこごそぞとどのほぼぽもよろをょぉ'];
  rows.forEach((row, v) => { for (const ch of row) vowels[ch] = 'aiueo'[v]; });
  return vowels;
})();
const VOWEL_KANA = { a: 'あ', i: 'い', u: 'う', e: 'え', o: 'お' };
// Second kana of a long vowel spelled with a macron (ō = おう or おお); the first is the standard.
const LONG_VOWEL_KANA = { a: ['あ'], i: ['い'], u: ['う'], e: ['い', 'え'], o: ['う', 'お'] };
// Kana whose romaji is spelled like another kana (particles, ず/づ, small vowels).
const KANA_SPELLING_VARIANTS = { 'は': 'わ', 'を': 'お', 'へ': 'え', 'づ': 'ず', 'ぢ': 'じ',
  'ぁ': 'あ', 'ぃ': 'い', 'ぅ': 'う', 'ぇ': 'え', 'ぉ': 'お', 'ゎ': 'わ' };
// Inside a kanji reading, a romaji unit can stand for these spellings; the first is the standard.
const UNIT_SPELLINGS = { 'ず': ['ず', 'づ'], 'じ': ['じ', 'ぢ'], 'を': ['を', 'お'] };
const NO_READING_START = /^[ゃゅょぁぃぅぇぉっんゎ]$/;
const VOICED = { か: 'が', き: 'ぎ', く: 'ぐ', け: 'げ', こ: 'ご', さ: 'ざ', し: 'じ', す: 'ず', せ: 'ぜ', そ: 'ぞ',
  た: 'だ', ち: 'ぢ', つ: 'づ', て: 'で', と: 'ど', は: 'ば', ひ: 'び', ふ: 'ぶ', へ: 'べ', ほ: 'ぼ' };
const SEMI_VOICED = { は: 'ぱ', ひ: 'ぴ', ふ: 'ぷ', へ: 'ぺ', ほ: 'ぽ' };
const MAX_KANA_PER_KANJI = 6;
const MAX_KANA_PER_DIGIT = 7; // 1995 = せんきゅうひゃくきゅうじゅうご
const MAX_SPELLINGS = 64;

// Scores for one kanji run read with one spelling:
const TIER_WHOLE = 3;     // the whole run with this reading occurs in a dictionary word
const TIER_PARTS = 2;     // it splits into attested pieces; up to +0.5 for the share covered by multi-kanji words
const PARTS_WORD_BONUS = 0.5;
// Below TIER_PARTS: the share of its kanji that attested readings cover (0 to <1), the rest read freely.
// Such runs still anchor the alignment but get no furigana.

function toHiragana(text) {
  return String(text).replace(/[ァ-ヶ]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0x60));
}

// --- Romaji as kana units ----------------------------------------------------------------------
// One unit per kana, LONG_VOWEL for a macron, LATIN_UNIT + word for Latin letters the sentence
// itself contains (SNS). Authored romaji often drops the apostrophe after a syllable-final n
// ("honyaku" for hon'yaku, "kinyōbi"): such a syllable records nSplit, the kana it stands for when
// its n is ん (ん + や). Only kanji readings may use that split; it is never the first choice.

function romajiToUnits(romaji, latinWords) {
  const units = [], nSplit = [];
  const words = String(romaji || '').toLowerCase().normalize('NFD').replace(/̂/g, LONG_VOWEL)
    .split(/[^a-z̄']+/).filter(Boolean);
  for (const raw of words) {
    const plain = raw.replace(/'/g, '');
    if (latinWords.has(plain)) { units.push(LATIN_UNIT + plain); continue; }
    const hardN = new Set(); // n before an apostrophe is ん
    let word = '';
    for (const ch of raw) { if (ch === "'") { if (word.endsWith('n')) hardN.add(word.length - 1); } else word += ch; }
    let i = 0;
    while (i < word.length) {
      const ch = word[i], next = word[i + 1] || '';
      if (ch === LONG_VOWEL) { units.push(LONG_VOWEL); i++; continue; }
      if (ch === 'n' && (hardN.has(i) || !/[aiueoy]/.test(next))) { units.push('ん'); i++; continue; }
      if (ch === 'm' && /[bmp]/.test(next)) { units.push('ん'); i++; continue; }
      if ((ch === next && /[bcdfghjkpqrstvwz]/.test(ch)) || (ch === 't' && word.substr(i + 1, 2) === 'ch')) {
        units.push('っ'); i++; continue;
      }
      let matched = false;
      for (let len = Math.min(3, word.length - i); len >= 1 && !matched; len--) {
        const syllable = word.substr(i, len), kana = ROMAJI_SYLLABLES[syllable];
        if (!kana) continue;
        if (ch === 'n' && i > 0 && /[aiueō]/.test(word[i - 1])) {
          const rest = ROMAJI_SYLLABLES[syllable.slice(1)];
          if (rest) nSplit[units.length] = { length: kana.length, kana: 'ん' + rest };
        }
        for (const k of kana) units.push(k);
        i += len; matched = true;
      }
      if (!matched) return null;
    }
  }
  return { units, nSplit };
}

function vowelBefore(units, index) {
  for (let i = index - 1; i >= 0; i--) if (units[i] !== LONG_VOWEL) return units[i][0] === LATIN_UNIT ? '' : (KANA_VOWELS[units[i]] || '');
  return '';
}

function kanaMatchesUnit(kana, unit, vowel) {
  if (unit[0] === LATIN_UNIT) return false;
  if (kana === unit || KANA_SPELLING_VARIANTS[kana] === unit) return true;
  const plain = /[ぁぃぅぇぉ]/.test(kana) ? KANA_SPELLING_VARIANTS[kana] : kana; // なぁ, romaji nā
  if (unit === LONG_VOWEL) return kana === 'ー' || (!!vowel && LONG_VOWEL_KANA[vowel].includes(plain));
  // A katakana ー is spelled by repeating the vowel, or the way kana spell long vowels (ホーム, houmu).
  return kana === 'ー' && !!vowel && (VOWEL_KANA[vowel] === unit || LONG_VOWEL_KANA[vowel].includes(unit));
}

function tokenize(text) {
  const tokens = [];
  let i = 0;
  while (i < text.length) {
    const ch = text[i];
    const run = cls => { let end = i; while (end < text.length && cls.test(text[end])) end++; const s = text.slice(i, end); i = end; return s; };
    if (KANJI_CHAR_RE.test(ch)) tokens.push({ kind: 'kanji', source: run(KANJI_CHAR_RE) });
    else if (KANA_CHAR_RE.test(ch)) { tokens.push({ kind: 'kana', kana: toHiragana(ch) }); i++; }
    else if (DIGIT_RE.test(ch)) tokens.push({ kind: 'digits', source: run(DIGIT_RE) });
    else if (LATIN_RE.test(ch)) tokens.push({ kind: 'latin', word: run(LATIN_RE).normalize('NFKC').toLowerCase() });
    else { tokens.push({ kind: 'skip', wave: ch === '〜' || ch === '～' }); i++; }
  }
  return tokens;
}

// --- Attested readings -------------------------------------------------------------------------

function addReading(map, key, reading) {
  if (!key || !reading) return;
  let set = map.get(key);
  if (!set) map.set(key, set = new Set());
  set.add(reading);
}

// Splits a dictionary word into its kanji runs and their readings (取り消す/とりけす → 取:と, 消:け).
// Only a unique split counts.
function splitWordReading(word, reading) {
  const tokens = [];
  for (let i = 0; i < word.length;) {
    if (KANJI_CHAR_RE.test(word[i])) {
      let end = i; while (end < word.length && KANJI_CHAR_RE.test(word[end])) end++;
      tokens.push({ run: word.slice(i, end) }); i = end;
    } else if (KANA_CHAR_RE.test(word[i])) { tokens.push({ kana: toHiragana(word[i]) }); i++; }
    else return null;
  }
  const kana = toHiragana(reading);
  if (!/^[ぁ-ゖー]+$/.test(kana)) return null;
  const memo = new Map();
  const ways = (t, p) => {
    const key = t * 1000 + p;
    if (memo.has(key)) return memo.get(key);
    let total = 0;
    const token = tokens[t];
    if (!token) total = p === kana.length ? 1 : 0;
    else if (token.kana) total = kana[p] === token.kana || (token.kana === 'ー' && p > 0) ? ways(t + 1, p + 1) : 0;
    else for (let q = p + 1; q <= kana.length && total < 2 && q - p <= token.run.length * MAX_KANA_PER_KANJI; q++) total += ways(t + 1, q);
    memo.set(key, Math.min(total, 2));
    return memo.get(key);
  };
  if (ways(0, 0) !== 1) return null;
  const runs = [];
  let p = 0;
  tokens.forEach((token, t) => {
    if (token.kana) { p++; return; }
    let q = p + 1;
    while (ways(t + 1, q) === 0) q++;
    runs.push([token.run, kana.slice(p, q)]);
    p = q;
  });
  return runs;
}

// The i-row kana of a godan verb ending: its continuative stem (組む → 組み, 浮く → 浮き).
const I_ROW = { う: 'い', く: 'き', ぐ: 'ぎ', す: 'し', つ: 'ち', ぬ: 'に', ぶ: 'び', む: 'み', る: 'り' };
// Irregular stems no kanji reading lists (来ない, 来ます).
const EXTRA_CHAR_READINGS = { 来: ['こ', 'き'] };

function kanjiReadingForms(raw) {
  const [stem, okurigana] = toHiragana(String(raw || '').replace(/[-－‐]/g, '')).split('.');
  const base = stem;
  if (!/^[ぁ-ゖ]+$/.test(base)) return [];
  const forms = new Set([base]);
  // Nouns from verb stems keep the stem's kana under the kanji (組 くみ in 乗組員, 浮 うき in 浮雲).
  if (okurigana && okurigana.length === 1 && I_ROW[okurigana]) forms.add(base + I_ROW[okurigana]);
  if (VOICED[base[0]]) forms.add(VOICED[base[0]] + base.slice(1));
  if (SEMI_VOICED[base[0]]) forms.add(SEMI_VOICED[base[0]] + base.slice(1));
  if (base[0] === 'ち') forms.add('じ' + base.slice(1));
  for (const form of [...forms]) if (form.length > 1 && /[きくちつ]$/.test(form)) forms.add(form.slice(0, -1) + 'っ');
  if (base === 'じゅう') forms.add('じゅっ'); // 十 before a counter: じゅっさい, じゅっぷん
  return [...forms];
}

// pairs: [{ word, reading }] from vocabulary cards and kanji example words; kanji: kanji data entries.
function buildReadingIndex({ pairs = [], kanji = [] }) {
  const runs = new Map(), chars = new Map();
  for (const { word, reading } of pairs) {
    if (!word || !reading || !KANJI_CHAR_RE.test(word)) continue;
    const split = splitWordReading(word, reading);
    if (split) for (const [run, runReading] of split) addReading(runs, run, runReading);
  }
  for (const entry of kanji) {
    for (const r of [].concat(entry.on || [], entry.kun || [])) {
      for (const form of kanjiReadingForms(r && r.kana)) addReading(chars, entry.kanji, form);
    }
  }
  for (const [ch, readings] of Object.entries(EXTRA_CHAR_READINGS)) for (const r of readings) addReading(chars, ch, r);
  return { runs, chars };
}

// --- Sentence alignment ------------------------------------------------------------------------

function createAligner(index) {
  const scoreMemo = new Map();

  // Attested readings of run.slice(c, c + len); a single 々 repeats the kanji before it.
  function pieceReadings(run, c, len) {
    const piece = run.slice(c, c + len);
    const readings = new Set(index.runs.get(piece) || []);
    if (len === 1) {
      const ch = piece === '々' && c > 0 ? run[c - 1] : piece;
      for (const r of index.chars.get(ch) || []) readings.add(r);
      for (const r of index.runs.get(ch) || []) readings.add(r);
    }
    return readings;
  }

  // How well attested readings explain run (a kanji string) read as kana; see the TIER constants.
  function scoreOf(run, kana) {
    const key = run + '\u0001' + kana;
    if (scoreMemo.has(key)) return scoreMemo.get(key);
    let score;
    const whole = index.runs.get(run);
    if (whole && whole.has(kana)) score = TIER_WHOLE;
    else {
      // Complete splits into attested pieces: the most kanji covered by multi-kanji words, or -1.
      const fullMemo = new Map();
      const full = (c, p) => {
        if (c === run.length) return p === kana.length ? 0 : -1;
        const k = c * 1000 + p;
        if (fullMemo.has(k)) return fullMemo.get(k);
        let best = -1;
        for (let len = Math.min(run.length - c, 8); len >= 1; len--) {
          for (const r of pieceReadings(run, c, len)) {
            if (!kana.startsWith(r, p)) continue;
            const rest = full(c + len, p + r.length);
            if (rest >= 0) best = Math.max(best, rest + (len > 1 ? len : 0));
          }
        }
        fullMemo.set(k, best);
        return best;
      };
      const words = full(0, 0);
      if (words >= 0) score = TIER_PARTS + PARTS_WORD_BONUS * words / run.length;
      else {
        // Partial: kanji without an attested reading here take 1–6 kana freely.
        const partMemo = new Map();
        const part = (c, p) => {
          if (c === run.length) return p === kana.length ? 0 : -Infinity;
          const k = c * 1000 + p;
          if (partMemo.has(k)) return partMemo.get(k);
          let best = -Infinity;
          for (let len = Math.min(run.length - c, 8); len >= 1; len--) {
            for (const r of pieceReadings(run, c, len)) if (kana.startsWith(r, p)) best = Math.max(best, part(c + len, p + r.length) + len);
          }
          for (let n = 1; n <= MAX_KANA_PER_KANJI && p + n <= kana.length; n++) best = Math.max(best, part(c + 1, p + n));
          partMemo.set(k, best);
          return best;
        };
        const covered = part(0, 0);
        score = covered > 0 ? 0.99 * covered / run.length : 0;
      }
    }
    scoreMemo.set(key, score);
    return score;
  }

  function align(japanese, romaji) {
    const text = String(japanese || '');
    if (!KANJI_CHAR_RE.test(text)) return { readings: [] };
    const tokens = tokenize(text);
    const latinWords = new Set(tokens.filter(t => t.kind === 'latin').map(t => t.word));
    const parsed = romajiToUnits(romaji, latinWords);
    if (!parsed || !parsed.units.length) return { error: 'romaji' };
    const { units, nSplit } = parsed;
    const U = units.length;

    // All kana spellings units [p, q) can stand for inside a kanji reading, each counting how many
    // non-standard choices it makes (ぢ, づ, お/え for a macron, ん for an apostrophe-less n).
    function spellings(p, q) {
      if (NO_READING_START.test(units[p]) || units[p] === LONG_VOWEL) return [];
      const out = [];
      const extend = (i, kana, marked) => {
        if (out.length > MAX_SPELLINGS) return;
        if (i === q) { out.push({ kana, marked }); return; }
        const unit = units[i];
        if (unit[0] === LATIN_UNIT) return;
        let options;
        if (unit === LONG_VOWEL) {
          const vowel = vowelBefore(units, i);
          if (!vowel) return;
          options = LONG_VOWEL_KANA[vowel];
        } else options = UNIT_SPELLINGS[unit] || [unit];
        options.forEach((o, n) => extend(i + 1, kana + o, marked + (n > 0 ? 1 : 0)));
        const split = nSplit[i];
        if (split && i + split.length <= q) extend(i + split.length, kana + split.kana, marked + 1);
      };
      extend(p, '', 0);
      return out.length > MAX_SPELLINGS ? [] : out;
    }

    // Best reading of a kanji run spanning units [p, q). Attestation decides first; between equally
    // attested spellings the standard one (fewest marked) wins, and a tie that remains leaves the
    // reading unsettled.
    function spanReading(source, p, q) {
      let best = null, tied = false;
      for (const option of spellings(p, q)) {
        const score = scoreOf(source, option.kana);
        if (!best || score > best.score || (score === best.score && option.marked < best.marked)) {
          best = { score, marked: option.marked, reading: option.kana }; tied = false;
        } else if (score === best.score && option.marked === best.marked && option.kana !== best.reading) tied = true;
      }
      return best && { score: best.score, reading: best.reading, unsettled: tied };
    }

    // solve(t, p): highest total score aligning tokens t.. with units p.., the number of ways
    // reaching it (capped at 2), and whether one of them passes an unsettled reading.
    const memo = new Map();
    const NONE = { score: -Infinity, ways: 0, unsettled: false };
    const merge = (acc, cand) => {
      if (cand.score === -Infinity) return acc;
      if (cand.score > acc.score) return cand;
      if (cand.score === acc.score) return { ...acc, ways: Math.min(2, acc.ways + cand.ways), unsettled: acc.unsettled || cand.unsettled };
      return acc;
    };
    const step = (t, q, gain, span) => {
      const rest = solve(t + 1, q);
      if (rest.score === -Infinity) return NONE;
      return { score: rest.score + gain, ways: rest.ways, unsettled: rest.unsettled || !!(span && span.unsettled), to: q, span };
    };
    const solve = (t, p) => {
      const key = t * 4096 + p;
      if (memo.has(key)) return memo.get(key);
      let acc = NONE;
      const token = tokens[t];
      if (!token) acc = p === U ? { score: 0, ways: 1, unsettled: false } : NONE;
      else if (token.kind === 'skip') {
        acc = merge(acc, step(t, p, 0));
        // A wave dash can stretch the vowel before it (あま〜い, romaji amāi).
        if (token.wave && units[p] === LONG_VOWEL) acc = merge(acc, step(t, p + 1, 0));
      } else if (token.kind === 'kana') {
        if (p < U && kanaMatchesUnit(token.kana, units[p], vowelBefore(units, p))) acc = merge(acc, step(t, p + 1, 0));
      } else if (token.kind === 'latin') {
        if (units[p] === LATIN_UNIT + token.word) acc = merge(acc, step(t, p + 1, 0));
        // Or the romaji spells the letters out (GPU, romaji jī pī yū).
        else for (let q = p + 1; q <= U && q - p <= 4 * token.word.length && units[q - 1][0] !== LATIN_UNIT; q++) acc = merge(acc, step(t, q, 0));
      } else if (token.kind === 'digits') {
        // Romaji either spells the number out or keeps the digits, which leave no units.
        for (let q = p; q <= U && q - p <= token.source.length * MAX_KANA_PER_DIGIT; q++) acc = merge(acc, step(t, q, 0));
      } else {
        const limit = Math.min(U, p + token.source.length * MAX_KANA_PER_KANJI);
        for (let q = p + 1; q <= limit; q++) {
          if (solve(t + 1, q).score === -Infinity) continue;
          const span = spanReading(token.source, p, q);
          if (span) acc = merge(acc, step(t, q, span.score, span));
        }
      }
      memo.set(key, acc);
      return acc;
    };
    const result = solve(0, 0);
    if (result.score === -Infinity) return { error: 'no-alignment' };
    if (result.ways > 1) return { error: 'ambiguous' };
    if (result.unsettled) return { error: 'unsettled' };
    // readings: what the browser shows; aligned: every run's reading, for reports.
    const readings = [], aligned = [], scores = [];
    let p = 0;
    for (let t = 0; t < tokens.length; t++) {
      const state = solve(t, p);
      if (tokens[t].kind === 'kanji') {
        readings.push(state.span.score >= TIER_PARTS ? state.span.reading : null);
        aligned.push(state.span.reading);
        scores.push(state.span.score);
      }
      p = state.to;
    }
    return { readings, aligned, scores };
  }

  return { align };
}

// Pairs every kanji run of the sentence with its reading; null when they do not line up.
function rubySegments(japanese, readings) {
  const text = String(japanese);
  const runs = text.match(KANJI_RUN_RE) || [];
  if (!Array.isArray(readings) || runs.length !== readings.length) return null;
  const segments = [];
  let last = 0, i = 0;
  text.replace(KANJI_RUN_RE, (run, offset) => {
    if (offset > last) segments.push({ text: text.slice(last, offset) });
    segments.push({ text: run, reading: readings[i++] });
    last = offset + run.length;
    return run;
  });
  if (last < text.length) segments.push({ text: text.slice(last) });
  return segments;
}

module.exports = { KANJI_RUN_RE, buildReadingIndex, createAligner, splitWordReading, rubySegments, toHiragana, TIER_PARTS };
