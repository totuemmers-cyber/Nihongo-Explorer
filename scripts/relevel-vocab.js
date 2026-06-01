// Corroborated JLPT re-leveling of the vocab data.
//
// Source of truth: an authoritative new-JLPT word list (jamsinclair/open-anki-jlpt-decks,
// derived from Jonathan Waller's lists), cached as /tmp/ref_n5..n1.csv — the file a word
// lives in IS its level. We change a word's `level` ONLY when that reference AND the
// (already-verified) kanji JLPT levels agree, and only by >= 2 levels. This deliberately
// filters out the two big false-positive sources of a naive re-level:
//   1) the reference lists basic greetings/expressions (こんにちは, ジュース) at high levels
//      because they are absent from the formal N5 word list — excluded here, since a kana
//      word has no kanji to corroborate a promotion;
//   2) common words written with one rare kanji (一緒に, 晩ご飯) — excluded, since the
//      reference does not also place them higher.
//
//   PROMOTE: reference is >= 2 levels higher AND a component kanji sits at/above that level.
//   DEMOTE : reference is >= 2 levels lower  AND no component kanji forces a higher level.
//
// Only the `level` field is rewritten, in place — itemKeys (word|reading), entry order and
// file formatting are preserved, so existing SRS progress and the kanji->vocab gate are
// untouched; only the Lernpfad's per-level buckets shift. Run with --apply to write.
//
// One-time tool (run record): fetch the reference CSVs first, then run --apply:
//   for L in n5 n4 n3 n2 n1; do curl -sL -o /tmp/ref_$L.csv \
//     https://raw.githubusercontent.com/jamsinclair/open-anki-jlpt-decks/master/src/$L.csv; done
//   node scripts/relevel-vocab.js          # dry-run summary
//   node scripts/relevel-vocab.js --apply  # write the data files
const fs = require('fs'), path = require('path');
const DIR = path.join(__dirname, '..');
const APPLY = process.argv.includes('--apply');
const rank = { N5: 1, N4: 2, N3: 3, N2: 4, N1: 5 };

// --- reference: file name = authoritative new-JLPT level ---
function parseCSV(t) {
  const rows = []; const L = t.split(/\r?\n/);
  for (let i = 1; i < L.length; i++) {
    const ln = L[i]; if (!ln.trim()) continue;
    const o = []; let c = '', q = false;
    for (const ch of ln) { if (ch === '"') { q = !q; continue; } if (ch === ',' && !q) { o.push(c); c = ''; continue; } c += ch; }
    o.push(c); rows.push(o);
  }
  return rows;
}
const refByWR = {}, refByW = {};
[['n5', 'N5'], ['n4', 'N4'], ['n3', 'N3'], ['n2', 'N2'], ['n1', 'N1']].forEach(function (pair) {
  parseCSV(fs.readFileSync('/tmp/ref_' + pair[0] + '.csv', 'utf8')).forEach(function (r) {
    const e = (r[0] || '').trim(), rd = (r[1] || '').trim();
    if (!e) return;
    if (!(e in refByW)) refByW[e] = pair[1];
    const k = e + '|' + rd; if (!(k in refByWR)) refByWR[k] = pair[1];
  });
});

// --- verified kanji JLPT levels (already match the Waller list 1:1) ---
global.window = {}; require(DIR + '/kanji-data.js'); try { require(DIR + '/kanji-n1.js'); } catch (e) {}
const kw = global.window; let K = [];
for (const k of Object.keys(kw)) { if (Array.isArray(kw[k]) && kw[k][0] && kw[k][0].kanji && kw[k][0].jlpt) K = K.concat(kw[k]); }
const kl = {}; K.forEach(function (k) { kl[k.kanji] = k.jlpt; });
function maxKanjiRank(word) { let m = 0; for (const ch of word) { if (kl[ch]) m = Math.max(m, rank[kl[ch]]); } return m; }

function decide(v) {
  const cur = rank[v.level];
  const refLv = refByWR[v.word + '|' + v.reading] || refByW[v.word];
  if (!refLv) return null;
  const r = rank[refLv], mk = maxKanjiRank(v.word);
  if (r - cur >= 2 && mk >= r) return { to: refLv, why: 'promote' };
  if (cur - r >= 2 && (mk === 0 || mk <= r)) return { to: refLv, why: 'demote' };
  return null;
}

const files = [['vocab-n5', 'VOCAB_N5'], ['vocab-n4', 'VOCAB_N4'], ['vocab-n3', 'VOCAB_N3'], ['vocab-n2', 'VOCAB_N2'], ['vocab-n1', 'VOCAB_N1']];
let total = 0; const byReason = { promote: 0, demote: 0 }; const moveHist = {};
const before = { N5: 0, N4: 0, N3: 0, N2: 0, N1: 0 }, after = { N5: 0, N4: 0, N3: 0, N2: 0, N1: 0 };
const ex = { promote: [], demote: [] };
files.forEach(function (pair) {
  const f = pair[0], vn = pair[1];
  global.window = {}; delete require.cache[require.resolve(DIR + '/' + f + '.js')]; require(DIR + '/' + f + '.js');
  const arr = global.window[vn];
  arr.forEach(function (v) {
    before[v.level]++;
    const d = decide(v);
    if (d) {
      total++; byReason[d.why]++;
      moveHist[v.level + '->' + d.to] = (moveHist[v.level + '->' + d.to] || 0) + 1;
      if (ex[d.why].length < 14) ex[d.why].push(v.word + '(' + v.reading + ') ' + v.level + '->' + d.to);
      v.level = d.to;
    }
    after[v.level]++;
  });
  if (APPLY) fs.writeFileSync(DIR + '/' + f + '.js', 'window.' + vn + ' = ' + JSON.stringify(arr, null, 2) + ';\n');
});
console.log((APPLY ? 'APPLIED' : 'DRY-RUN') + ' — total re-leveled: ' + total + '  (promote:' + byReason.promote + ', demote:' + byReason.demote + ')');
console.log('\nmoves:'); Object.entries(moveHist).sort(function (a, b) { return b[1] - a[1]; }).forEach(function (e) { console.log('  ' + e[0] + ' : ' + e[1]); });
console.log('\nBEFORE:', JSON.stringify(before));
console.log('AFTER :', JSON.stringify(after));
console.log('\npromote examples:', ex.promote.join(', '));
console.log('\ndemote examples:', ex.demote.join(', '));
