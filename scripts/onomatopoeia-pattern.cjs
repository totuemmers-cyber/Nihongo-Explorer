// Shape labels used by the onomatopoeia data: ABAB (doubled, any length), ABり (e.g. ゆっくり,
// しょんぼり), ABっと (sudden-onset forms ending in と, e.g. ホッと, ドスンと), otherwise Sonstige.
module.exports = function derivePattern(word) {
  const half = word.length / 2;
  if (word.length >= 4 && Number.isInteger(half) && word.slice(0, half) === word.slice(half)) return 'ABAB';
  if (/^.[ゃゅょャュョ]?[っんッン].[ゃゅょャュョ]?[りリ]$/.test(word)) return 'ABり';
  if (word.length >= 2 && /[とト]$/.test(word)) return 'ABっと';
  return 'Sonstige';
};
