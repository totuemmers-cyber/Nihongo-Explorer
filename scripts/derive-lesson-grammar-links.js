// ============================================================
// Derive lesson -> grammar-item links for ALL JLPT levels.
//
// The Lernpfad teaches a grammar lesson just before it first quizzes a new grammar
// pattern ("teach before test"). That only works when a grammar item is LINKED to
// the lesson that teaches it (LESSON_GRAMMAR in grammar-lessons.js). N5 was curated
// by hand; N4-N1 were almost entirely unlinked, so above N5 the path fell back to
// "the next unread lesson for the level" — unrelated to the pattern being quizzed.
//
// This script matches each grammar item to a same-level lesson by looking for the
// item's pattern in the lesson's TITLE / SUBTITLE / section HEADINGS — the places a
// lesson names the patterns it is about (high precision). Example sentences are NOT
// used as a match signal (a pattern can appear incidentally in any example).
//
// Output: a merged LESSON_GRAMMAR object (curated N5 entries preserved) printed as a
// JS literal, plus a per-level coverage report. Run:
//   node scripts/derive-lesson-grammar-links.js            # report + check
//   node scripts/derive-lesson-grammar-links.js --print    # emit the JS map literal
// ============================================================
const fs = require('fs');
const vm = require('vm');
const path = require('path');

function load() {
  const ctx = {
    window: {}, console, Math, JSON, setTimeout,
    document: { createElement: () => ({ style: {}, appendChild() {}, setAttribute() {} }), getElementById: () => null, addEventListener() {} },
    navigator: {}
  };
  vm.createContext(ctx);
  // All grammar levels (N5-N3 live in grammar-data.js; N2/N1 are separate files).
  ['grammar-data.js', 'grammar-n2.js', 'grammar-n1.js', 'grammar-lessons.js'].forEach(function (f) {
    vm.runInContext(fs.readFileSync(path.join(__dirname, '..', f), 'utf8'), ctx, { filename: f });
  });
  const grammar = [].concat(ctx.window.GRAMMAR_DATA || [], ctx.window.GRAMMAR_N2 || [], ctx.window.GRAMMAR_N1 || []);
  const GL = ctx.window.GrammarLessons;
  return { grammar: grammar, lessons: GL.getLessons(), getById: GL.getLessonById };
}

// The existing curated map (kept authoritative; we only ADD to it).
function curatedMap(grammarLessonsSrc) {
  const m = /var LESSON_GRAMMAR = (\{[\s\S]*?\n  \});/.exec(grammarLessonsSrc);
  // eslint-disable-next-line no-eval
  return m ? eval('(' + m[1] + ')') : {};
}

// Split a label (a grammar pattern OR a lesson title/heading) into its component
// pattern tokens: cut on every alternative/list separator, drop the ～ marker,
// brackets, quotes and punctuation, keep tokens of length >= 2. Single kana like は/を
// are N5-only (already curated) and too short to match safely.
function tokenize(label) {
  return String(label || '')
    .split(/[\/／・&＆、，,:：（）()「」『』\[\]\s]+/)
    .map(function (v) { return v.replace(/[～~。、，,]/g, '').trim(); })
    // Length >= 2 AND must contain kana/kanji: a pure-ASCII fragment (a level tag like
    // "N3", or a German word like "es"/"Respektsprache") is never a grammar pattern and
    // would cause false matches against German lesson titles/subtitles.
    .filter(function (v) { return v.length >= 2 && /[぀-ヿ一-鿿]/.test(v); });
}
// Grammar patterns are matched by EXACT token equality against lesson tokens (not
// substring), so e.g. にする does not falsely match ことにする.
var tokensOf = tokenize;

function levelsOf(lesson) { return String(lesson.level || '').split('/'); }

function headingsOf(rec) {
  return (rec && rec.sections || []).map(function (s) { return s.heading || ''; }).join(' 　 ');
}
// A Set-like membership test over a token list.
function tokenSet(text) {
  var set = {};
  tokenize(text).forEach(function (t) { set[t] = true; });
  return set;
}

function derive() {
  const { grammar, lessons, getById } = load();
  const src = fs.readFileSync(path.join(__dirname, '..', 'grammar-lessons.js'), 'utf8');
  const curated = curatedMap(src);

  // Grammar ids already linked anywhere in the curated map — never relink these.
  const alreadyLinked = {};
  Object.keys(curated).forEach(function (lid) { (curated[lid] || []).forEach(function (gid) { alreadyLinked[gid] = lid; }); });

  // Pre-compute searchable text per lesson, split into match tiers.
  const lessonText = {};
  lessons.forEach(function (l) {
    const rec = getById(l.id) || {};
    lessonText[l.id] = {
      number: l.number || 0,
      levels: levelsOf(l),
      titleSet: tokenSet(String(l.title || '') + ' 　 ' + String(l.subtitle || '')),
      headingSet: tokenSet(headingsOf(rec))
    };
  });

  // For each grammar item, find the best same-level lesson whose TITLE (tier 1) or a
  // section HEADING (tier 2) names the pattern — by exact token equality. Best = lowest
  // tier, then the longest matched token (most specific), then earliest lesson number.
  const additions = {}; // lessonId -> [grammarId]
  const report = { matched: [], unmatched: [] };
  grammar.forEach(function (g) {
    if (!g || !g.id || alreadyLinked[g.id]) return;
    const toks = tokensOf(g.pattern);
    if (!toks.length) { report.unmatched.push(g); return; }
    let best = null; // { lid, tier, number, tok }
    lessons.forEach(function (l) {
      const t = lessonText[l.id];
      if (t.levels.indexOf(g.level) === -1) return; // same JLPT level only
      let tier = 0;
      let hit = null;
      for (let i = 0; i < toks.length; i++) {
        if (t.titleSet[toks[i]]) { if (!hit || toks[i].length > hit.length) { tier = 1; hit = toks[i]; } }
      }
      if (!tier) {
        for (let i = 0; i < toks.length; i++) {
          if (t.headingSet[toks[i]]) { if (!hit || toks[i].length > hit.length) { tier = 2; hit = toks[i]; } }
        }
      }
      if (!tier) return;
      if (!best || tier < best.tier ||
        (tier === best.tier && hit.length > best.tok.length) ||
        (tier === best.tier && hit.length === best.tok.length && t.number < best.number)) {
        best = { lid: l.id, tier: tier, number: t.number, tok: hit };
      }
    });
    if (best) {
      (additions[best.lid] = additions[best.lid] || []).push(g.id);
      report.matched.push({ gid: g.id, level: g.level, pattern: g.pattern, lid: best.lid, title: lessons.filter(function (x) { return x.id === best.lid; })[0].title, tier: best.tier, tok: best.tok });
    } else {
      report.unmatched.push(g);
    }
  });

  // Merge curated + additions.
  const merged = {};
  Object.keys(curated).forEach(function (lid) { merged[lid] = curated[lid].slice(); });
  Object.keys(additions).forEach(function (lid) {
    merged[lid] = (merged[lid] || []).concat(additions[lid]);
  });

  return { grammar: grammar, merged: merged, additions: additions, report: report, lessons: lessons };
}

function printJsLiteral(merged, lessons) {
  const lessonNumber = {};
  lessons.forEach(function (l) { lessonNumber[l.id] = l.number || 0; });
  const ids = Object.keys(merged).sort(function (a, b) {
    return (lessonNumber[a] || 0) - (lessonNumber[b] || 0) || a.localeCompare(b);
  });
  const lines = ids.map(function (lid) {
    const arr = merged[lid].map(function (g) { return "'" + g + "'"; }).join(', ');
    return "    '" + lid + "': [" + arr + "],";
  });
  // Trim the trailing comma on the last entry.
  if (lines.length) lines[lines.length - 1] = lines[lines.length - 1].replace(/,$/, '');
  process.stdout.write('  var LESSON_GRAMMAR = {\n' + lines.join('\n') + '\n  };\n');
}

const out = derive();
if (process.argv.indexOf('--print') !== -1) {
  printJsLiteral(out.merged, out.lessons);
} else {
  // Coverage report by level.
  const byLevel = {};
  out.grammar.forEach(function (g) { (byLevel[g.level] = byLevel[g.level] || { total: 0, linked: 0 }).total++; });
  const linkedSet = {};
  Object.keys(out.merged).forEach(function (lid) { out.merged[lid].forEach(function (gid) { linkedSet[gid] = true; }); });
  out.grammar.forEach(function (g) { if (linkedSet[g.id]) byLevel[g.level].linked++; });
  console.log('Coverage after derivation (curated + auto):');
  ['N5', 'N4', 'N3', 'N2', 'N1'].forEach(function (L) {
    const b = byLevel[L] || { total: 0, linked: 0 };
    console.log('  ' + L + ': ' + b.linked + '/' + b.total + ' (' + (b.total ? Math.round(b.linked / b.total * 100) : 0) + '%)');
  });
  console.log('\nNewly auto-linked: ' + out.report.matched.length + ' items');
  // Show a sample of matches per level for eyeballing precision.
  ['N4', 'N3', 'N2', 'N1'].forEach(function (L) {
    const rows = out.report.matched.filter(function (r) { return r.level === L; });
    console.log('\n=== ' + L + ' matches (' + rows.length + ') ===');
    rows.slice(0, 200).forEach(function (r) {
      console.log('  [t' + r.tier + '] ' + r.pattern + '  ->  ' + r.lid + ' "' + r.title + '"  (tok ' + r.tok + ')');
    });
  });
}
