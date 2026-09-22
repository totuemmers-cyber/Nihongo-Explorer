// Idempotent kanji inventory corrections against the Jōyō reference (scripts/joyo-kanji.json).
// 1. Stroke counts follow the bundled stroke-order diagram when KANJIDIC2 attests that count.
// 2. Missing Jōyō kanji are added with original German teaching text; stroke diagrams and primary
//    radicals come from KanjiVG exactly as in import-kanjivg.py (general radical, else traditional).
// Inputs: .content-cache/kanjidic2.xml.gz, .content-cache/kanjivg.zip (see CONTENT-SOURCES.md).
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const zlib = require('zlib');
const cp = require('child_process');

const root = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const KANJI_FILES = [['kanji-data.js', 'KANJI_DATA'], ['kanji-n1.js', 'KANJI_N1_DATA']];
const BATCH = '2026-09-joyo';

// Original German teaching text. Readings follow KANJIDIC2; examples are common JMdict words.
const NEW_KANJI = [
  { kanji: '乞', meanings: ['erbitten', 'betteln'], kun: [['こ.う', 'ko.u']], on: [['コツ', 'kotsu']],
    components: [['𠂉', 'Person (abgewandelt)'], ['乙', 'Haken']],
    examples: [['乞う', 'こう', 'erbitten, inständig bitten'], ['命乞い', 'いのちごい', 'Flehen um das eigene Leben'], ['雨乞い', 'あまごい', 'Bitte um Regen (Ritual)']] },
  { kanji: '唾', meanings: ['Speichel', 'Spucke'], kun: [['つば', 'tsuba']], on: [['ダ', 'da']],
    components: [['口', 'Mund'], ['垂', 'herabhängen']],
    examples: [['唾', 'つば', 'Spucke'], ['唾液', 'だえき', 'Speichel'], ['固唾', 'かたず', 'angehaltener Atem (固唾を呑む: gebannt zusehen)']] },
  { kanji: '嚇', meanings: ['drohen', 'einschüchtern'], kun: [['おど.す', 'odo.su']], on: [['カク', 'kaku']],
    components: [['口', 'Mund'], ['赫', 'glühend rot']],
    examples: [['威嚇', 'いかく', 'Drohung, Einschüchterung'], ['威嚇射撃', 'いかくしゃげき', 'Warnschuss']] },
  { kanji: '堆', meanings: ['aufhäufen', 'aufgetürmt'], kun: [['うずたか.い', 'uzutaka.i']], on: [['タイ', 'tai']],
    components: [['土', 'Erde'], ['隹', 'Vogel']],
    examples: [['堆積', 'たいせき', 'Anhäufung, Ablagerung'], ['堆肥', 'たいひ', 'Kompost']] },
  { kanji: '塑', meanings: ['formen', 'modellieren'], kun: [], on: [['ソ', 'so']],
    components: [['朔', 'Neumond'], ['土', 'Erde']],
    examples: [['彫塑', 'ちょうそ', 'Bildhauerei, Plastik'], ['塑像', 'そぞう', 'Tonfigur, Gipsfigur'], ['可塑性', 'かそせい', 'Plastizität, Formbarkeit']] },
  { kanji: '塞', meanings: ['versperren', 'verstopfen', 'Festung'], kun: [['ふさ.ぐ', 'fusa.gu'], ['ふさ.がる', 'fusa.garu']], on: [['ソク', 'soku'], ['サイ', 'sai']],
    components: [['宀', 'Dach'], ['土', 'Erde']],
    examples: [['塞ぐ', 'ふさぐ', 'versperren, verstopfen'], ['要塞', 'ようさい', 'Festung'], ['閉塞', 'へいそく', 'Verschluss, Blockade'], ['脳梗塞', 'のうこうそく', 'Hirninfarkt']] },
  { kanji: '妖', meanings: ['übernatürlich', 'unheimlich', 'betörend'], kun: [['あや.しい', 'aya.shii']], on: [['ヨウ', 'you']],
    components: [['女', 'Frau'], ['夭', 'jung']],
    examples: [['妖怪', 'ようかい', 'Yōkai, Geisterwesen'], ['妖精', 'ようせい', 'Fee, Elfe'], ['妖艶', 'ようえん', 'betörend, verführerisch']] },
  { kanji: '妬', meanings: ['Eifersucht', 'beneiden'], kun: [['ねた.む', 'neta.mu'], ['そね.む', 'sone.mu']], on: [['ト', 'to']],
    components: [['女', 'Frau'], ['石', 'Stein']],
    examples: [['嫉妬', 'しっと', 'Eifersucht, Neid'], ['妬む', 'ねたむ', 'beneiden, neidisch sein']] },
  { kanji: '憬', meanings: ['sich sehnen', 'bewundern'], kun: [], on: [['ケイ', 'kei']],
    components: [['忄', 'Herz'], ['景', 'Landschaft']],
    examples: [['憧憬', 'どうけい', 'Sehnsucht, schwärmerische Bewunderung (traditionell auch しょうけい)']] },
  { kanji: '摯', meanings: ['ernsthaft', 'aufrichtig'], kun: [], on: [['シ', 'shi']],
    components: [['執', 'ausführen'], ['手', 'Hand']],
    examples: [['真摯', 'しんし', 'aufrichtig, ernsthaft'], ['真摯さ', 'しんしさ', 'Aufrichtigkeit, Ernsthaftigkeit']] },
  { kanji: '斑', meanings: ['Fleck', 'gesprenkelt'], kun: [['まだら', 'madara']], on: [['ハン', 'han']],
    components: [['王', 'Edelstein'], ['文', 'Schrift'], ['王', 'Edelstein']],
    examples: [['斑点', 'はんてん', 'Fleck, Tupfen'], ['斑', 'まだら', 'gefleckt, scheckig']] },
  { kanji: '曽', meanings: ['einst', 'Ur- (Generation)'], kun: [['かつ.て', 'katsu.te']], on: [['ソウ', 'sou'], ['ゾ', 'zo']],
    components: [['八', 'acht'], ['田', 'Feld'], ['日', 'Sonne']],
    examples: [['曽祖父', 'そうそふ', 'Urgroßvater'], ['曽祖母', 'そうそぼ', 'Urgroßmutter'], ['未曽有', 'みぞう', 'beispiellos, noch nie dagewesen']] },
  { kanji: '楼', meanings: ['Turm', 'mehrstöckiges Gebäude'], kun: [['たかどの', 'takadono']], on: [['ロウ', 'rou']],
    components: [['木', 'Baum'], ['米', 'Reis'], ['女', 'Frau']],
    examples: [['摩天楼', 'まてんろう', 'Wolkenkratzer'], ['鐘楼', 'しょうろう', 'Glockenturm'], ['蜃気楼', 'しんきろう', 'Fata Morgana']] },
  { kanji: '潰', meanings: ['zerdrücken', 'zerquetschen', 'zusammenbrechen'], kun: [['つぶ.す', 'tsubu.su'], ['つぶ.れる', 'tsubu.reru'], ['つい.える', 'tsui.eru']], on: [['カイ', 'kai']],
    components: [['氵', 'Wasser'], ['貴', 'wertvoll']],
    examples: [['潰す', 'つぶす', 'zerdrücken, kaputtmachen'], ['潰れる', 'つぶれる', 'zerquetscht werden; pleitegehen'], ['暇潰し', 'ひまつぶし', 'Zeitvertreib'], ['胃潰瘍', 'いかいよう', 'Magengeschwür']] },
  { kanji: '濫', meanings: ['übermäßig', 'überfluten', 'missbrauchen'], kun: [['みだ.りに', 'mida.rini']], on: [['ラン', 'ran']],
    components: [['氵', 'Wasser'], ['監', 'überwachen']],
    examples: [['氾濫', 'はんらん', 'Überschwemmung; Überflutung'], ['濫用', 'らんよう', 'Missbrauch'], ['濫伐', 'らんばつ', 'übermäßiges Abholzen, Raubbau am Wald']] },
  { kanji: '玩', meanings: ['spielen', 'genießen'], kun: [['もてあそ.ぶ', 'moteaso.bu']], on: [['ガン', 'gan']],
    components: [['王', 'Edelstein'], ['元', 'Ursprung']],
    examples: [['玩具', 'がんぐ', 'Spielzeug (auch おもちゃ gelesen)'], ['愛玩動物', 'あいがんどうぶつ', 'Haustier']] },
  { kanji: '稽', meanings: ['nachdenken', 'üben'], kun: [], on: [['ケイ', 'kei']],
    components: [['禾', 'Getreide'], ['尤', 'besonders'], ['旨', 'Absicht']],
    examples: [['稽古', 'けいこ', 'Übung, Training'], ['滑稽', 'こっけい', 'komisch, lächerlich'], ['荒唐無稽', 'こうとうむけい', 'völlig absurd']] },
  { kanji: '股', meanings: ['Oberschenkel', 'Schritt', 'Gabelung'], kun: [['また', 'mata'], ['もも', 'momo']], on: [['コ', 'ko']],
    components: [['月', 'Fleisch'], ['殳', 'schlagen']],
    examples: [['股', 'また', 'Schritt; Gabelung'], ['股関節', 'こかんせつ', 'Hüftgelenk'], ['太股', 'ふともも', 'Oberschenkel']] },
  { kanji: '臼', meanings: ['Mörser'], kun: [['うす', 'usu']], on: [['キュウ', 'kyuu']],
    components: [['臼', 'Mörser']],
    examples: [['臼', 'うす', 'Mörser (z. B. für Mochi)'], ['臼歯', 'きゅうし', 'Backenzahn'], ['脱臼', 'だっきゅう', 'Ausrenkung, Verrenkung']] },
  { kanji: '艶', meanings: ['Glanz', 'Anmut', 'Charme'], kun: [['つや', 'tsuya'], ['あで.やか', 'ade.yaka']], on: [['エン', 'en']],
    components: [['豊', 'reich'], ['色', 'Farbe']],
    examples: [['艶', 'つや', 'Glanz'], ['艶やか', 'つややか', 'glänzend, schimmernd'], ['妖艶', 'ようえん', 'betörend, verführerisch']] },
  { kanji: '苛', meanings: ['quälen', 'streng', 'gereizt'], kun: [['いじ.める', 'iji.meru'], ['さいな.む', 'saina.mu'], ['いらだ.つ', 'irada.tsu']], on: [['カ', 'ka']],
    components: [['艹', 'Gras'], ['可', 'möglich']],
    examples: [['苛酷', 'かこく', 'hart, grausam'], ['苛立つ', 'いらだつ', 'gereizt werden'], ['苛烈', 'かれつ', 'erbarmungslos, heftig']] },
  { kanji: '虞', meanings: ['Befürchtung', 'Gefahr'], kun: [['おそれ', 'osore']], on: [['グ', 'gu']],
    components: [['虍', 'Tiger'], ['呉', 'geben']],
    examples: [['虞', 'おそれ', 'Befürchtung, Gefahr (Amts- und Rechtssprache)'], ['虞犯少年', 'ぐはんしょうねん', 'gefährdeter Jugendlicher (Jugendstrafrecht)']] },
  { kanji: '諧', meanings: ['Harmonie', 'Scherz'], kun: [], on: [['カイ', 'kai']],
    components: [['言', 'Wort'], ['皆', 'alle']],
    examples: [['俳諧', 'はいかい', 'Haikai (humorvolle Kettendichtung)'], ['諧謔', 'かいぎゃく', 'Humor, Witz']] },
  { kanji: '貌', meanings: ['Aussehen', 'Gestalt'], kun: [], on: [['ボウ', 'bou']],
    components: [['豸', 'Tier'], ['皃', 'Gesicht']],
    examples: [['風貌', 'ふうぼう', 'Erscheinung, Aussehen'], ['全貌', 'ぜんぼう', 'Gesamtbild'], ['変貌', 'へんぼう', 'Verwandlung, Wandel']] },
  { kanji: '采', meanings: ['Kommandostab', 'Erscheinung', 'Würfel'], kun: [], on: [['サイ', 'sai']],
    components: [['爫', 'Klaue'], ['木', 'Baum']],
    examples: [['喝采', 'かっさい', 'Beifall, Applaus'], ['采配', 'さいはい', 'Leitung, Kommando'], ['風采', 'ふうさい', 'äußere Erscheinung']] },
  { kanji: '釜', meanings: ['Kessel', 'Topf'], kun: [['かま', 'kama']], on: [['フ', 'fu']],
    components: [['父', 'Vater'], ['金', 'Metall']],
    examples: [['釜', 'かま', 'Kessel, Reistopf'], ['釜飯', 'かまめし', 'im Topf gegartes Reisgericht'], ['電気釜', 'でんきがま', 'elektrischer Reiskocher']] },
  { kanji: '錮', meanings: ['einsperren'], kun: [], on: [['コ', 'ko']],
    components: [['金', 'Metall'], ['固', 'fest']],
    examples: [['禁錮', 'きんこ', 'Haftstrafe ohne Arbeitspflicht (bis 2025; seither 拘禁刑)']] }
];

// Mirrors import-kanjivg.py: KanjiVG element names that stand for a Kangxi radical.
const RADICAL_ALIASES = Object.assign(
  Object.fromEntries(Array.from('亻氵忄扌灬犭礻衤罒艹辶釒飠糹訁阝').map((ch, i) => [ch, '人水心手火犬示衣网艸辵金食糸言阜'[i]])),
  { '王': '玉', '耂': '老', '⺮': '竹', '爫': '爪', '丬': '爿', '龸': '小', '龹': '八', '⺌': '小', '⺍': '小' },
  { '彑': '彐', '⺕': '彐', '戸': '戶', '靑': '青', '黃': '黄', '巛': '川', '麥': '麦', '黑': '黒', '龜': '亀' }
);

function loadKanjiFile(file, key) {
  const c = {}; c.window = c;
  vm.runInNewContext(read(file), c);
  return c[key];
}
// Python json.dumps style used by the data files: ", " and ": " separators, raw Unicode.
function pyJson(value) {
  if (Array.isArray(value)) return '[' + value.map(pyJson).join(', ') + ']';
  if (value && typeof value === 'object') return '{' + Object.keys(value).map(k => JSON.stringify(k) + ': ' + pyJson(value[k])).join(', ') + '}';
  return JSON.stringify(value);
}
function svgStrokeCount(svg) {
  if (svg.includes('kvg:')) return new Set(Array.from(svg.matchAll(/id="kvg:[0-9a-f]+-s(\d+)"/g), m => m[1])).size;
  return new Set(Array.from(svg.matchAll(/id="z\d+d(\d+)[a-z]?"/g), m => m[1])).size;
}
function kanjiVgSource(ch) {
  const name = 'kanjivg-master/kanji/' + ch.codePointAt(0).toString(16).padStart(5, '0') + '.svg';
  return cp.execFileSync('unzip', ['-p', path.join(root, '.content-cache/kanjivg.zip'), name], { encoding: 'utf8' });
}
// Same animation as import-kanjivg.py: each stroke path draws in 0.35 s, 0.4 s apart.
function animateKanjiVg(raw) {
  const comments = (raw.match(/<!--[\s\S]*?-->/g) || []).join('\n');
  const body = raw.slice(raw.indexOf('<g id="kvg:StrokePaths'), raw.lastIndexOf('</svg>'));
  let index = 0;
  const animated = body.replace(/<path ([^>]*?)\s*\/>/g, (match, attrs) => {
    const begin = (index++ * 0.4).toFixed(2);
    return '<path ' + attrs + ' pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"><animate attributeName="stroke-dashoffset" from="1" to="0" dur="0.35s" begin="' + begin + 's" fill="freeze" /></path>';
  });
  return comments + '\n<!-- Animation added by Nihongo Explorer; CC BY-SA 3.0. -->\n' +
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:kvg="http://kanjivg.tagaini.net" width="109" height="109" viewBox="0 0 109 109">\n' +
    animated + '</svg>';
}
function kanjiVgPrimaryRadical(raw, canonical) {
  const groups = Array.from(raw.matchAll(/<g ([^>]*)>/g), m => m[1]);
  const standard = groups.some(attrs => /kvg:radical="general"/.test(attrs)) ? 'general' : 'tradit';
  const candidates = new Set();
  for (const attrs of groups) {
    if (!new RegExp('kvg:radical="' + standard + '"').test(attrs)) continue;
    for (const re of [/kvg:original="([^"]+)"/, /kvg:element="([^"]+)"/]) {
      const m = re.exec(attrs);
      const element = m && (RADICAL_ALIASES[m[1]] || m[1]);
      if (element && canonical.has(element)) { candidates.add(element); break; }
    }
  }
  if (candidates.size !== 1) throw new Error('Unresolved KanjiVG radical: ' + Array.from(candidates).join(','));
  return { primaryRadical: Array.from(candidates)[0], primaryRadicalSource: 'KanjiVG ' + standard };
}

const joyo = JSON.parse(read('scripts/joyo-kanji.json'));
const joyoByKanji = new Map(joyo.kanji.map(k => [k.kanji, k]));
const xml = zlib.gunzipSync(fs.readFileSync(path.join(root, '.content-cache/kanjidic2.xml.gz'))).toString('utf8');
const attested = new Map();
for (const [block] of xml.matchAll(/<character>[\s\S]*?<\/character>/g)) {
  attested.set(/<literal>([^<]*)</.exec(block)[1], Array.from(block.matchAll(/<stroke_count>(\d+)</g), m => Number(m[1])));
}
const rc = {}; rc.window = rc;
vm.runInNewContext(read('kangxi-radicals-data.js'), rc);
const canonical = new Set(rc.KANGXI_RADICALS.map(r => r.radical));

const report = { strokeFixes: [], unattestedDiagrams: [], added: [] };
const present = new Set();
const pending = new Map();
const eols = new Map();
for (const [file, key] of KANJI_FILES) {
  const items = loadKanjiFile(file, key);
  const byKanji = new Map(items.map(k => [k.kanji, k]));
  items.forEach(k => present.add(k.kanji));
  // Keep the checkout's line endings (Git may convert them on Windows).
  const text = read(file);
  eols.set(file, text.includes('\r\n') ? '\r\n' : '\n');
  const lines = text.split(/\r?\n/).map(line => {
    const m = /^  \{"kanji": "([^"]+)"/.exec(line);
    if (!m) return line;
    const item = byKanji.get(m[1]);
    const drawn = svgStrokeCount(read('stroke-order/' + item.kanji.codePointAt(0) + '.svg'));
    if (drawn === item.strokes) return line;
    if (!(attested.get(item.kanji) || []).includes(drawn)) {
      report.unattestedDiagrams.push(item.kanji + ' ' + item.strokes + '/' + drawn);
      return line;
    }
    report.strokeFixes.push(item.kanji + ' ' + item.strokes + '→' + drawn);
    return line.replace('"strokes": ' + item.strokes + ',', '"strokes": ' + drawn + ',');
  });
  pending.set(file, lines);
}

const n1Lines = pending.get('kanji-n1.js');
const additions = [];
for (const entry of NEW_KANJI) {
  if (present.has(entry.kanji)) continue;
  if (!joyoByKanji.has(entry.kanji)) throw new Error('Not a Jōyō kanji: ' + entry.kanji);
  const raw = kanjiVgSource(entry.kanji);
  const target = path.join(root, 'stroke-order', entry.kanji.codePointAt(0) + '.svg');
  const svg = fs.existsSync(target) ? fs.readFileSync(target, 'utf8') : animateKanjiVg(raw);
  const strokes = svgStrokeCount(svg);
  if (!(attested.get(entry.kanji) || []).includes(strokes)) throw new Error('Unattested stroke count for ' + entry.kanji + ': ' + strokes);
  const radical = kanjiVgPrimaryRadical(raw, canonical);
  if (!fs.existsSync(target)) fs.writeFileSync(target, svg);
  const item = Object.assign({
    kanji: entry.kanji,
    meanings: entry.meanings,
    kun: entry.kun.map(([kana, romaji]) => ({ kana, romaji })),
    on: entry.on.map(([kana, romaji]) => ({ kana, romaji })),
    components: entry.components.map(([radical, meaning]) => ({ radical, meaning })),
    jlpt: 'N1',
    strokes,
    examples: entry.examples.map(([word, reading, meaning]) => ({ word, reading, meaning }))
  }, radical, { editorialBatch: BATCH });
  additions.push('  ' + pyJson(item));
  report.added.push(entry.kanji);
}
if (additions.length) {
  const close = n1Lines.lastIndexOf('];');
  let last = close - 1;
  while (!n1Lines[last].trim()) last--;
  n1Lines[last] = n1Lines[last].replace(/,?$/, ',');
  n1Lines.splice(last + 1, 0, ...additions.map((line, i) => i < additions.length - 1 ? line + ',' : line));
}
for (const [file, lines] of pending) fs.writeFileSync(path.join(root, file), lines.join(eols.get(file)));
console.log(JSON.stringify({ strokeFixes: report.strokeFixes.length, added: report.added.length, unattestedDiagrams: report.unattestedDiagrams }, null, 0));
console.log('stroke fixes: ' + report.strokeFixes.join(', '));
console.log('added: ' + report.added.join(''));
