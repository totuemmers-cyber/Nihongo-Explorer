// Cross-checks kanji-data.js / kanji-n1.js against external reference data:
//  - readings (on/kun) and JLPT levels against a KANJIDIC-derived dataset
//  - stroke counts (informational; the authoritative stroke check is the
//    offline scripts/stroke-count-test.js against the bundled SVGs)
//
// Requires network on first run; reference files are cached in
// scripts/.external-cache/ (gitignored). Run manually via:
//   npm run audit:kanji-external
//
// KANJIDIC is © EDRDG, licensed CC BY-SA 4.0 (https://www.edrdg.org/).
// The data is downloaded at runtime for validation only and is not
// redistributed with this repository.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const CACHE = path.join(__dirname, '.external-cache');
const KANJIDIC_URL = 'https://raw.githubusercontent.com/davidluzgouveia/kanji-data/master/kanji.json';

// Accepted deviations from KANJIDIC, each verified against Japanese
// dictionaries (Kanjipedia, Daijisen) or common real-world usage.
const ACCEPTED = {
  // Stroke counts follow the official print form drawn by the bundled
  // stroke-order SVGs; KANJIDIC counts the simplified variant glyph here
  // (or, for 瀕/牙, a variant counting).
  strokes: {
    '葛': 12, '賭': 16, '餅': 15, '餌': 15, '襖': 18, '噌': 15, '謎': 17,
    '薯': 17, '遜': 14, '僅': 13, '晦': 11, '槌': 14, '歎': 15, '灘': 22,
    '蝕': 15, '辿': 7, '迂': 7, '遡': 14, '榊': 14, '櫛': 19, '煉': 13,
    '禰': 19, '辻': 6, '逗': 11, '鑓': 22, '漣': 14,
    '瀕': 19, '牙': 4
  },
  // Readings attested in dictionaries/usage that KANJIDIC does not list.
  on: {
    '呆': ['ボウ'],   // 呆然 ぼうぜん
    '丼': ['ドン'],   // 牛丼 ぎゅうどん
    '曽': ['ゾ']      // 未曽有 みぞう
  },
  kun: {
    '肯': ['うなず.く'],       // 肯く (literarisch)
    '葛': ['かずら'],          // 葛 かずら (Ranke)
    '椅': ['いす'],            // 椅子
    '繋': ['つな.がる'],       // 繋がる
    '振': ['ふ.れる'],         // 針が振れる
    '透': ['とお.る'],         // 透る (moderne Schreibung)
    '累': ['かさ.ねる'],       // 累ねる (selten)
    '棺': ['ひつぎ'],          // 棺 ひつぎ
    '歎': ['なげ.かわしい'],   // 歎かわしい
    '環': ['たまき'],          // 環 たまき (archaisch)
    '鳳': ['おおとり'],
    '捏': ['でっち.あげる'],   // 捏ち上げる
    '碧': ['あお'],            // 碧い
    '荏': ['え'],              // 荏胡麻 えごま
    '頁': ['ページ']           // Gairaigo-Lesung
  }
};

function kataToHira(s) {
  return s.replace(/[ァ-ヶ]/g, function (c) {
    return String.fromCharCode(c.charCodeAt(0) - 0x60);
  });
}
function norm(s) { return kataToHira(s).replace(/[-.]/g, ''); }

async function loadReference() {
  const cached = path.join(CACHE, 'kanjidic.json');
  if (!fs.existsSync(cached)) {
    if (!fs.existsSync(CACHE)) fs.mkdirSync(CACHE, { recursive: true });
    console.log('Downloading KANJIDIC reference data...');
    const res = await fetch(KANJIDIC_URL);
    if (!res.ok) throw new Error('Download failed: HTTP ' + res.status);
    fs.writeFileSync(cached, await res.text());
  }
  return JSON.parse(fs.readFileSync(cached, 'utf8'));
}

async function main() {
  const ctx = { window: {} };
  ctx.window = ctx;
  ['kanji-data.js', 'kanji-n1.js'].forEach(function (file) {
    vm.runInNewContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), ctx, { filename: file });
  });
  const allKanji = [].concat(ctx.KANJI_DATA || [], ctx.KANJI_N1_DATA || []);
  const ref = await loadReference();

  const problems = [];
  let missing = 0;

  allKanji.forEach(function (k) {
    const r = ref[k.kanji];
    if (!r) { missing++; problems.push(k.kanji + ': not found in KANJIDIC (non-Japanese form?)'); return; }

    if (r.strokes && k.strokes !== r.strokes && ACCEPTED.strokes[k.kanji] !== k.strokes) {
      problems.push(k.kanji + ': strokes ' + k.strokes + ' (KANJIDIC: ' + r.strokes + ')');
    }

    const refOn = new Set((r.readings_on || []).map(norm));
    const refKun = new Set((r.readings_kun || []).map(norm));
    (k.on || []).forEach(function (o) {
      if (refOn.has(norm(o.kana)) || refKun.has(norm(o.kana))) return;
      if ((ACCEPTED.on[k.kanji] || []).indexOf(o.kana) !== -1) return;
      problems.push(k.kanji + ": on '" + o.kana + "' not in KANJIDIC [" + (r.readings_on || []).join(',') + ']');
    });
    (k.kun || []).forEach(function (u) {
      if (refKun.has(norm(u.kana)) || refOn.has(norm(u.kana))) return;
      if ((ACCEPTED.kun[k.kanji] || []).indexOf(u.kana) !== -1) return;
      problems.push(k.kanji + ": kun '" + u.kana + "' not in KANJIDIC [" + (r.readings_kun || []).join(',') + ']');
    });

    const lvl = k.jlpt ? parseInt(k.jlpt.replace('N', ''), 10) : null;
    if (lvl && r.jlpt_new && lvl !== r.jlpt_new) {
      problems.push(k.kanji + ': JLPT N' + lvl + ' (KANJIDIC: N' + r.jlpt_new + ')');
    }
  });

  if (problems.length) {
    console.error('External validation found ' + problems.length + ' discrepancies:');
    problems.forEach(function (p) { console.error('  ' + p); });
    process.exit(1);
  }
  console.log('External validation passed (' + allKanji.length + ' kanji, ' + missing + ' missing in reference).');
}

main().catch(function (err) {
  console.error('External validation could not run: ' + err.message);
  process.exit(2);
});
