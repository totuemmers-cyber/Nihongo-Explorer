// Deterministic kana-only romanization for authored headwords. Example readings are authored separately.
const { norm } = require('./vocabulary-tools.cjs');
const rows = [
  ['あいうえお','a i u e o'],['かきくけこ','ka ki ku ke ko'],['がぎぐげご','ga gi gu ge go'],
  ['さしすせそ','sa shi su se so'],['ざじずぜぞ','za ji zu ze zo'],['たちつてと','ta chi tsu te to'],
  ['だぢづでど','da ji zu de do'],['なにぬねの','na ni nu ne no'],['はひふへほ','ha hi fu he ho'],
  ['ばびぶべぼ','ba bi bu be bo'],['ぱぴぷぺぽ','pa pi pu pe po'],['まみむめも','ma mi mu me mo'],
  ['やゆよ','ya yu yo'],['らりるれろ','ra ri ru re ro'],['わをん','wa o n'],['ぁぃぅぇぉ','a i u e o'],['ゔ','vu']
];
const kana = Object.fromEntries(rows.flatMap(([jp,en]) => [...jp].map((c,i) => [c,en.split(' ')[i]])));
const pairs = { 'しゃ':'sha','しゅ':'shu','しょ':'sho','ちゃ':'cha','ちゅ':'chu','ちょ':'cho',
  'じゃ':'ja','じゅ':'ju','じょ':'jo','ぢゃ':'ja','ぢゅ':'ju','ぢょ':'jo','てぃ':'ti','でぃ':'di','とぅ':'tu','どぅ':'du',
  'ふぁ':'fa','ふぃ':'fi','ふぇ':'fe','ふぉ':'fo','うぃ':'wi','うぇ':'we','うぉ':'wo','しぇ':'she','ちぇ':'che','じぇ':'je','でゅ':'dyu' };
for (const k of ['き','ぎ','に','ひ','び','ぴ','み','り']) for (const [small,ending] of [['ゃ','ya'],['ゅ','yu'],['ょ','yo']]) pairs[k+small] = kana[k].slice(0,-1)+ending;
// Modified Hepburn for newly authored headwords: long vowels get macrons (ō ū ā ē, and ī for ー after i),
// while えい stays ei and native いい stays ii. Vowel length is lexical, so pass UniDic's pronunciation
// (katakana with ー, e.g. トーキョー) whenever one exists. Without it, おう/おお/うう/ああ/ええ count as long
// except a verb's final う (思う omou); compounds across a boundary (湖 みずうみ) need pron.
const LONG_MARK = '̄';
const SMALL = 'ゃゅょぁぃぅぇぉ';
const VOWEL_OF = kana => { const r = romanize(kana); return r[r.length - 1]; };
function morae(text) {
  const out = [];
  for (const c of norm(text)) {
    if (SMALL.includes(c) && out.length && !/[っんー]/.test(out[out.length - 1])) out[out.length - 1] += c;
    else out.push(c);
  }
  return out;
}
function hepburn(reading, { pron = null, verb = false } = {}) {
  const km = morae(reading), pm = pron ? morae(pron) : [];
  const usePron = pron && pm.length === km.length;
  const SECOND = { a: 'あ', u: 'う', e: 'え', o: 'おう' };
  let marked = '';
  for (let i = 0; i < km.length; i++) {
    const m = km[i], next = km[i + 1];
    marked += m;
    if (!next || /[っんー]/.test(m)) continue;
    const v = VOWEL_OF(m);
    let long = false;
    if (next === 'ー') long = true;
    else if (SECOND[v] && SECOND[v].includes(next)) long = usePron ? pm[i + 1] === 'ー' : !(verb && i + 1 === km.length - 1 && next === 'う');
    if (long) { marked += LONG_MARK; i++; }
  }
  return romanize(marked).normalize('NFC');
}

module.exports = romanize;
module.exports.hepburn = hepburn;
function romanize(reading) {
  const text = norm(reading); let out = '', geminate = false;
  for (let i=0;i<text.length;i++) {
    const c = text[i];
    if (c === LONG_MARK) { out += LONG_MARK; continue; }
    if (c === 'っ') { geminate = true; continue; }
    if (c === 'ー') { const vowel = out.match(/[aeiou](?=[^aeiou]*$)/); if (!vowel) throw new Error('Long vowel without vowel: '+reading); out += vowel[0]; continue; }
    let chunk = pairs[text.slice(i,i+2)];
    if (chunk) i++; else chunk = kana[c];
    if (!chunk) throw new Error('Unknown kana in '+reading+': '+c);
    if (geminate) { out += chunk.startsWith('ch') ? 't' : chunk[0]; geminate=false; }
    if (out.endsWith('n') && /^[aeiouy]/.test(chunk)) out += "'";
    out += chunk;
  }
  return out;
}
