// ============================================================
// romaji-kana — minimal Hepburn romaji -> hiragana converter
// ------------------------------------------------------------
// Lets learners type readings in romaji during typed reviews (like WaniKani's
// IME). Pure + dependency-free; characters that are already kana (or anything
// unmapped) pass through unchanged. Exposed as window.RomajiKana and, under
// Node, module.exports — so audit-answer.js can require it directly.
// ============================================================
(function (root) {
  'use strict';

  // Base syllables (longest keys are matched first). Hepburn with common variants.
  var MAP = {
    a: 'あ', i: 'い', u: 'う', e: 'え', o: 'お',
    ka: 'か', ki: 'き', ku: 'く', ke: 'け', ko: 'こ',
    ga: 'が', gi: 'ぎ', gu: 'ぐ', ge: 'げ', go: 'ご',
    sa: 'さ', shi: 'し', si: 'し', su: 'す', se: 'せ', so: 'そ',
    za: 'ざ', ji: 'じ', zi: 'じ', zu: 'ず', ze: 'ぜ', zo: 'ぞ',
    ta: 'た', chi: 'ち', ti: 'ち', tsu: 'つ', tu: 'つ', te: 'て', to: 'と',
    da: 'だ', di: 'ぢ', du: 'づ', de: 'で', 'do': 'ど',
    na: 'な', ni: 'に', nu: 'ぬ', ne: 'ね', no: 'の',
    ha: 'は', hi: 'ひ', fu: 'ふ', hu: 'ふ', he: 'へ', ho: 'ほ',
    ba: 'ば', bi: 'び', bu: 'ぶ', be: 'べ', bo: 'ぼ',
    pa: 'ぱ', pi: 'ぴ', pu: 'ぷ', pe: 'ぺ', po: 'ぽ',
    ma: 'ま', mi: 'み', mu: 'む', me: 'め', mo: 'も',
    ya: 'や', yu: 'ゆ', yo: 'よ',
    ra: 'ら', ri: 'り', ru: 'る', re: 'れ', ro: 'ろ',
    wa: 'わ', wi: 'ゐ', we: 'ゑ', wo: 'を', n: 'ん',
    // youon (contracted)
    kya: 'きゃ', kyu: 'きゅ', kyo: 'きょ',
    gya: 'ぎゃ', gyu: 'ぎゅ', gyo: 'ぎょ',
    sha: 'しゃ', shu: 'しゅ', sho: 'しょ', sya: 'しゃ', syu: 'しゅ', syo: 'しょ',
    ja: 'じゃ', ju: 'じゅ', jo: 'じょ', jya: 'じゃ', jyu: 'じゅ', jyo: 'じょ',
    cha: 'ちゃ', chu: 'ちゅ', cho: 'ちょ', cya: 'ちゃ', tya: 'ちゃ', tyu: 'ちゅ', tyo: 'ちょ',
    nya: 'にゃ', nyu: 'にゅ', nyo: 'にょ',
    hya: 'ひゃ', hyu: 'ひゅ', hyo: 'ひょ',
    bya: 'びゃ', byu: 'びゅ', byo: 'びょ',
    pya: 'ぴゃ', pyu: 'ぴゅ', pyo: 'ぴょ',
    mya: 'みゃ', myu: 'みゅ', myo: 'みょ',
    rya: 'りゃ', ryu: 'りゅ', ryo: 'りょ',
    // small kana via x/l prefix
    xa: 'ぁ', xi: 'ぃ', xu: 'ぅ', xe: 'ぇ', xo: 'ぉ',
    la: 'ぁ', li: 'ぃ', lu: 'ぅ', le: 'ぇ', lo: 'ぉ',
    xtsu: 'っ', xtu: 'っ', ltu: 'っ', xya: 'ゃ', xyu: 'ゅ', xyo: 'ょ',
    // standalone long-vowel mark + punctuation
    '-': 'ー'
  };

  var VOWELS = { a: 1, i: 1, u: 1, e: 1, o: 1 };

  function isConsonant(ch) { return /[a-z]/.test(ch) && !VOWELS[ch]; }

  // Convert a romaji string to hiragana. Already-kana / unmapped chars pass through.
  function romajiToKana(input) {
    var src = String(input == null ? '' : input);
    var out = '';
    var i = 0;
    var n = src.length;
    while (i < n) {
      var ch = src[i];
      var lower = ch.toLowerCase();

      // Not a romaji letter -> emit verbatim (kana, spaces, punctuation, …).
      if (!/[a-z'-]/.test(lower)) { out += ch; i++; continue; }

      // Sokuon: doubled consonant (kk, tt, ssh …) -> っ + rest. "nn" is handled below.
      if (isConsonant(lower) && lower !== 'n' && i + 1 < n && src[i + 1].toLowerCase() === lower) {
        out += 'っ';
        i++;
        continue;
      }

      // Syllabic n: "n" before a consonant (not y) or at end, and "n'" -> ん.
      if (lower === 'n') {
        var nxt = i + 1 < n ? src[i + 1].toLowerCase() : '';
        if (nxt === "'") { out += 'ん'; i += 2; continue; }
        if (nxt === '' || (isConsonant(nxt) && nxt !== 'y' && nxt !== 'n')) { out += 'ん'; i++; continue; }
      }

      // Greedy longest match: try 4, 3, 2, 1 chars.
      var matched = false;
      for (var len = 4; len >= 1; len--) {
        if (i + len > n) continue;
        var token = src.substr(i, len).toLowerCase();
        if (MAP[token]) { out += MAP[token]; i += len; matched = true; break; }
      }
      if (!matched) { out += ch; i++; }
    }
    return out;
  }

  root.RomajiKana = { romajiToKana: romajiToKana, toKana: romajiToKana };
  if (typeof module !== 'undefined' && module.exports) module.exports = root.RomajiKana;
})(typeof window !== 'undefined' ? window : this);
