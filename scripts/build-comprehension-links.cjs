// Links the words of the Lesen/Hören passages to vocabulary cards.
//
//   node scripts/build-comprehension-links.cjs           rebuild comprehension-links.js (needs MeCab + UniDic)
//   node scripts/build-comprehension-links.cjs --check   verify the committed file against the current
//                                                        passages and vocabulary (no MeCab needed)
//
// The build tokenizes every passage with MeCab/UniDic (scripts/tokenize-comprehension.py, run with the
// venv in .content-cache/romaji) and matches tokens and token runs against the vocabulary headwords.
// Spans never cut through a {漢字|かな} ruby group. Run it again after editing passages or vocabulary.
'use strict';
const cp = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const OUTPUT = path.join(ROOT, 'comprehension-links.js');
const CACHE = path.join(ROOT, '.content-cache', 'comprehension-links');
const ROMAJI = path.join(ROOT, '.content-cache', 'romaji');
const LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'];
const SKIP_SINGLE = new Set(['助詞', '助動詞', '補助記号', '記号', '空白', '接頭辞', '接尾辞']);
const NO_COMPOUND = new Set(['補助記号', '記号', '空白']);
// Grammatical kana words: linking them on every line adds noise, not help.
const STOP_KANA = new Set(['する', 'いる', 'ある', 'なる', 'くる', 'いく', 'ゆく', 'おく', 'みる', 'しまう', 'もらう', 'くれる',
  'あげる', 'いただく', 'くださる', 'こと', 'もの', 'ところ', 'よう', 'ため', 'はず', 'わけ', 'つもり', 'の', 'ん', 'そう', 'これ', 'それ',
  'あれ', 'この', 'その', 'あの', 'ここ', 'そこ', 'あそこ', 'どこ', 'なに', 'なん', 'いう', 'おる', 'ござる', 'です', 'ます', 'みたい',
  'ほう', 'とき', 'うち', 'まま', 'ほか', 'ほど', 'など', 'くらい', 'ぐらい', 'ない', 'よる', 'ちゃ', 'じゃ', 'ちゃう', 'じゃう']);

function load(file, name) {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), context, { filename: file });
  return context.window[name];
}
const hira = text => String(text || '').replace(/[ァ-ヶ]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0x60));
const isKana = text => /^[ぁ-ゟ゠-ヿー]+$/.test(text);
const hash = text => crypto.createHash('sha1').update(text).digest('hex').slice(0, 12);

// Plain text plus the ruby ranges of a passage written as 本の{交換|こうかん}棚.
function parse(markup) {
  let plain = '';
  const rubies = [];
  markup.split(/(\{[^{}]+\|[^{}]+\})/g).forEach(part => {
    const m = /^\{([^|]+)\|([^}]+)\}$/.exec(part);
    if (m) { rubies.push([plain.length, plain.length + m[1].length, m[2]]); plain += m[1]; } else plain += part;
  });
  if (/[\ud800-\udfff]/.test(plain)) throw new Error('Astral characters are not supported in passages: ' + plain);
  return { plain, rubies };
}
function passages() {
  const out = [];
  load('comprehension-data.js', 'COMPREHENSION_UNITS').forEach(unit => unit.passages.forEach(block => {
    out.push(Object.assign({ id: block.id, markup: block.text }, parse(block.text)));
  }));
  return out;
}
function vocabulary() {
  const items = load('vocab-runtime.js', 'VOCAB_RUNTIME').items;
  const byId = new Map(items.map(item => [item.id, item]));
  const byWord = new Map(), byReading = new Map();
  const add = (word, item) => { if (!byWord.has(word)) byWord.set(word, []); byWord.get(word).push(item); };
  items.slice().sort((a, b) => LEVELS.indexOf(a.level) - LEVELS.indexOf(b.level)).forEach(item => {
    add(item.word, item);
    (item.aliases || []).forEach(alias => add(alias, item));
    const reading = hira(item.reading);
    if (!byReading.has(reading)) byReading.set(reading, new Set());
    byReading.get(reading).add(item.word);
  });
  return { byId, byWord, byReading };
}
const entryOf = item => [item.id, item.word, item.reading || '', item.meaning, item.level];
const cutsRuby = (start, end, rubies) => rubies.some(([a, b]) => start < b && end > a && (start > a || end < b));

function lookups(vocab) {
  const exact = (word, reading) => (vocab.byWord.get(word) || []).find(item => hira(item.reading) === reading) || null;
  // Without a matching reading, only accept a word that has a single reading and contains kana
  // (気に入る: UniDic reads 入る as はいる). Pure-kanji words like 方 (ほう/かた) or 一日 need the reading.
  const loose = word => {
    const found = vocab.byWord.get(word) || [];
    if (!/[ぁ-ゟ゠-ヿ]/.test(word) || new Set(found.map(item => hira(item.reading))).size !== 1) return null;
    if (process.env.LINKS_DEBUG) console.log('loose', word, found[0].reading);
    return found[0];
  };
  // Kana text (あめ, はな) maps to a kanji card only when no other card shares the reading (雨/飴, 花/鼻).
  const viaKana = (surface, item) => !item || !isKana(surface) || isKana(item.word) ||
    ((vocab.byReading.get(hira(item.reading)) || new Set()).size === 1) ? item : null;
  return { exact, loose, viaKana };
}
function match(tokens, vocab) {
  const { exact, loose, viaKana } = lookups(vocab);
  const spans = [];
  for (let i = 0; i < tokens.length;) {
    let hit = null;
    // Longest token run first: 喫茶+店, お+金, 気+に+入っ(た) → 気に入る.
    for (let n = Math.min(6, tokens.length - i); n >= 2 && !hit; n--) {
      const run = tokens.slice(i, i + n);
      const first = run[0], last = run[n - 1];
      if (run.some(t => NO_COMPOUND.has(t.pos1)) || ['助詞', '助動詞', '接尾辞'].includes(first.pos1) || last.pos1 === '助詞') continue;
      if (run.some((t, k) => k && t.start !== run[k - 1].start + run[k - 1].surface.length)) continue;
      if (run.some(t => t.pos3 === '人名')) continue;
      const head = run.slice(0, -1);
      const surface = run.map(t => t.surface).join('');
      const reading = hira(run.map(t => t.kana).join(''));
      const baseReading = hira(head.map(t => t.kana).join('') + last.kanaBase);
      let item = exact(surface, reading) || loose(surface);
      if (!item && (last.pos1 === '動詞' || last.pos1 === '形容詞')) {
        const base = head.map(t => t.surface).join('') + last.orthBase;
        item = exact(base, baseReading) || loose(base);
      }
      // Kana-written compounds by lemma: じてん+しゃ → 自転車.
      if (!item && isKana(surface)) item = viaKana(surface, exact(run.map(t => t.lemma).join(''), reading) || exact(head.map(t => t.lemma).join('') + last.lemma, baseReading));
      if (item) hit = { n, item };
    }
    if (!hit) {
      const t = tokens[i];
      const kana = isKana(t.surface);
      const skip = SKIP_SINGLE.has(t.pos1) || t.pos2 === '数詞' || t.pos3 === '人名' ||
        (kana && (STOP_KANA.has(t.orthBase) || STOP_KANA.has(hira(t.orthBase)) || t.surface.length < 2)) ||
        (kana && t.pos2 === '非自立可能' && i && ['て', 'で'].includes(tokens[i - 1].surface));
      if (!skip) {
        const item = exact(t.orthBase, hira(t.kanaBase)) || exact(t.surface, hira(t.kana)) ||
          viaKana(t.surface, exact(t.lemma, hira(t.lemmaKana))) || loose(t.orthBase) || loose(t.surface);
        if (item) hit = { n: 1, item };
      }
    }
    if (hit) {
      const start = tokens[i].start, end = tokens[i + hit.n - 1].start + tokens[i + hit.n - 1].surface.length;
      spans.push({ start, end, item: hit.item });
      i += hit.n;
    } else i++;
  }
  return spans;
}

function build() {
  const python = path.join(ROMAJI, 'venv', process.platform === 'win32' ? 'Scripts/python.exe' : 'bin/python');
  if (!fs.existsSync(python)) throw new Error('MeCab venv missing: ' + python + ' (see .content-cache/romaji)');
  fs.mkdirSync(CACHE, { recursive: true });
  const blocks = passages(), vocab = vocabulary();
  const textsFile = path.join(CACHE, 'texts.json'), tokensFile = path.join(CACHE, 'tokens.json');
  fs.writeFileSync(textsFile, JSON.stringify(Object.fromEntries(blocks.map(b => [b.id, b.plain]))));
  cp.execFileSync(python, ['-I', path.join(__dirname, 'tokenize-comprehension.py'), path.join(ROMAJI, 'unidic').replace(/\\/g, '/'),
    textsFile, tokensFile], { stdio: 'inherit' });
  const tokenized = JSON.parse(fs.readFileSync(tokensFile, 'utf8'));
  const entries = [], index = new Map(), out = {}, report = [];
  let dropped = 0;
  blocks.forEach(block => {
    const tokens = tokenized[block.id].map(([start, surface, pos1, pos2, pos3, orthBase, lemma, lemmaKana, kana, kanaBase]) =>
      ({ start, surface, pos1, pos2, pos3, orthBase, lemma, lemmaKana, kana, kanaBase }));
    const spans = [];
    const found = match(tokens, vocab).filter(span => !cutsRuby(span.start, span.end, block.rubies) || (dropped++, false));
    // A ruby group the tokenizer split (一+日 under {一日|いちにち}) can still be a card on its own.
    const { exact, loose } = lookups(vocab);
    block.rubies.forEach(([start, end, reading]) => {
      if (found.some(span => span.start < end && span.end > start)) return;
      const base = block.plain.slice(start, end), item = exact(base, hira(reading)) || loose(base);
      if (item) found.push({ start, end, item });
    });
    found.sort((a, b) => a.start - b.start).forEach(span => {
      if (!index.has(span.item.id)) { index.set(span.item.id, entries.length); entries.push(entryOf(span.item)); }
      spans.push([span.start, span.end, index.get(span.item.id)]);
      report.push(block.plain.slice(span.start, span.end) + '\t' + span.item.word + '|' + span.item.reading + '\t' + span.item.meaning);
    });
    out[block.id] = { length: block.plain.length, hash: hash(block.markup), spans };
  });
  fs.writeFileSync(path.join(CACHE, 'report.tsv'), report.join('\n') + '\n');
  fs.writeFileSync(OUTPUT, '// Generated by scripts/build-comprehension-links.cjs from comprehension-data.js and vocab-runtime.js. Do not edit.\n' +
    'window.COMPREHENSION_LINKS = ' + JSON.stringify({ entries, passages: out }) + ';\n');
  const total = Object.values(out).reduce((sum, p) => sum + p.spans.length, 0);
  console.log('Linked ' + total + ' words to ' + entries.length + ' vocabulary cards in ' + blocks.length + ' passages (' +
    dropped + ' dropped at ruby boundaries). Review list: .content-cache/comprehension-links/report.tsv');
}

function check() {
  const errors = [];
  if (!fs.existsSync(OUTPUT)) throw new Error('comprehension-links.js is missing; run npm run build:comprehension-links');
  const links = load('comprehension-links.js', 'COMPREHENSION_LINKS');
  const vocab = vocabulary(), blocks = passages();
  links.entries.forEach((entry, i) => {
    const item = vocab.byId.get(entry[0]);
    if (!item) errors.push('Entry ' + i + ' ' + entry[0] + ' (' + entry[1] + ') is no longer a vocabulary card');
    else if (JSON.stringify(entryOf(item)) !== JSON.stringify(entry)) errors.push('Entry ' + entry[0] + ' is stale: ' + JSON.stringify(entry) + ' vs ' + JSON.stringify(entryOf(item)));
  });
  const known = new Set(blocks.map(b => b.id));
  Object.keys(links.passages).forEach(id => { if (!known.has(id)) errors.push('Links for removed passage ' + id); });
  blocks.forEach(block => {
    const p = links.passages[block.id];
    if (!p) { errors.push('No links for passage ' + block.id); return; }
    if (p.hash !== hash(block.markup) || p.length !== block.plain.length) { errors.push('Passage ' + block.id + ' changed since the links were built'); return; }
    let end = 0;
    p.spans.forEach(([s, e, i]) => {
      if (!(Number.isInteger(s) && Number.isInteger(e) && s >= end && e > s && e <= p.length)) errors.push('Bad span ' + [s, e] + ' in ' + block.id);
      if (!links.entries[i]) errors.push('Unknown entry ' + i + ' in ' + block.id);
      if (cutsRuby(s, e, block.rubies)) errors.push('Span ' + [s, e] + ' cuts a ruby group in ' + block.id);
      end = e;
    });
  });
  if (errors.length) {
    console.error(errors.slice(0, 20).join('\n') + (errors.length > 20 ? '\n… ' + (errors.length - 20) + ' more' : ''));
    console.error('Run npm run build:comprehension-links to rebuild comprehension-links.js.');
    process.exit(1);
  }
  console.log('comprehension-links.js is current: ' + links.entries.length + ' cards over ' + blocks.length + ' passages.');
}

if (require.main === module) {
  if (process.argv.includes('--check')) check(); else build();
}
module.exports = { parse, cutsRuby };
