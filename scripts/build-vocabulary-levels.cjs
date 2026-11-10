// Vocabulary-level calibration (November 2026): derives every card's JLPT level from
// recorded evidence and writes scripts/vocabulary-levels/evidence.json.
//
//   node scripts/build-vocabulary-levels.cjs --words   write the word list for the frequency step
//   python3 -I scripts/research-vocabulary-frequency.py .content-cache/vocabulary-levels
//   node scripts/build-vocabulary-levels.cjs           write the evidence file
//   node scripts/build-vocabulary-levels.cjs --check   recompute and compare with the committed file
//
// Inputs live in the git-ignored cache listed in scripts/vocabulary-levels/sources.json.
// Rules, first match decides (see CONTENT-SOURCES.md):
//   1 textbook   Minna no Nihongo I / Genki 0-12 = N5, Minna II / Genki 13-23 = N4
//   2 list       Waller's JLPT lists, joined through each card's cited JMdict entry and reading
//   3 suru       a する-verb takes its noun's level
//   4 compound   a compound is never easier than its hardest multi-character part
//   5 frequency  unlisted single words rarer than 95% of listed N5-N3 words move one band
//   6 estimate   no evidence: level unchanged and marked as an estimate
// No card moves more than two levels unless a textbook and the list agree.
const assert = require('assert');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'scripts/vocabulary-levels/evidence.json');
const SOURCES = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/vocabulary-levels/sources.json'), 'utf8'));
const CACHE = path.join(ROOT, SOURCES.cacheFolder);
// Revisions written by this calibration; their evidence must not feed back into the join.
const REVISION_PREFIX = 'levels-2026-11-';
const LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'];
const RANK = { N5: 5, N4: 4, N3: 3, N2: 2, N1: 1 };
const FREQUENCY_THRESHOLD = 3.1; // 5th percentile of listed single-token N5-N3 words
const PHRASE_TYPES = new Set(['Ausdruck', 'Redewendung', 'Sprichwort', 'Yojijukugo']);

const sha256 = text => crypto.createHash('sha256').update(text).digest('hex');
const harder = (a, b) => RANK[a] < RANK[b] ? a : b;
const easier = (a, b) => RANK[a] > RANK[b] ? a : b;
const easiest = list => list.filter(Boolean).reduce((best, l) => best && RANK[best] >= RANK[l] ? best : l, null);
const hira = s => String(s || '').replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60));
const cleanKana = s => hira(s).replace(/[〜～~・\s（）()]/g, '');
const cleanWord = s => String(s || '').replace(/[〜～~・\s（）()]/g, '');
const hasKanji = s => /[一-龯々]/.test(s);
const isAffix = word => /[〜～~]/.test(word);
// No card moves more than two levels on a single kind of evidence.
function cap(from, to) {
  const d = RANK[to] - RANK[from];
  if (Math.abs(d) <= 2) return to;
  return LEVELS.find(l => RANK[l] === RANK[from] + 2 * Math.sign(d));
}

function cached(sourceId, file) {
  const source = SOURCES.sources.find(s => s.id === sourceId);
  const full = path.join(CACHE, sourceId, file);
  assert(fs.existsSync(full), 'Missing cached source ' + path.relative(ROOT, full) + '; see scripts/vocabulary-levels/sources.json');
  const text = fs.readFileSync(full, 'utf8');
  assert.equal(sha256(text), source.files[file], 'Cached source differs from recorded hash: ' + sourceId + '/' + file);
  return text;
}

function parseCsv(text) {
  const rows = []; let row = [], field = '', quoted = false, line = 1, rowLine = 1;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') { field += '"'; i++; } else if (ch === '"') quoted = false; else { if (ch === '\n') line++; field += ch; }
    } else if (ch === '"') quoted = true;
    else if (ch === ',') { row.push(field); field = ''; }
    else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i++;
      row.push(field); field = '';
      if (row.some(Boolean)) rows.push({ line: rowLine, fields: row });
      row = []; line++; rowLine = line;
    } else field += ch;
  }
  if (field || row.length) { row.push(field); rows.push({ line: rowLine, fields: row }); }
  return rows;
}

// --- Waller's lists ------------------------------------------------------------
function loadEdition(sourceId, cols) {
  const index = { byWordKana: new Map(), byKana: new Map(), bySeqKana: new Map() };
  const add = (map, key, hit) => { if (!map.has(key)) map.set(key, []); map.get(key).push(hit); };
  for (const level of LEVELS) {
    const rows = parseCsv(cached(sourceId, level.toLowerCase() + '.csv'));
    const header = rows.shift().fields;
    for (const { line, fields } of rows) {
      const rec = Object.fromEntries(header.map((h, i) => [h, (fields[i] || '').trim()]));
      const kana = cleanKana(rec[cols.kana]);
      if (!kana) continue;
      const words = String(rec[cols.word] || '').split(/[;；、,]\s*/).map(cleanWord).filter(Boolean);
      const hit = { level, file: level.toLowerCase() + '.csv', line, ...(cols.seq ? { seq: rec[cols.seq] } : {}) };
      for (const w of words) add(index.byWordKana, w + '|' + kana, hit);
      // Kana-only rows keep their script: イクラ (roe) is not いくら (how much).
      if (!words.length || words.every(w => cleanKana(w) === kana)) add(index.byKana, cleanWord(rec[cols.kana]), hit);
      if (cols.seq && /^\d+$/.test(rec[cols.seq])) add(index.bySeqKana, rec[cols.seq] + '|' + kana, hit);
    }
  }
  return index;
}

function easiestHit(hits) {
  let best = null;
  for (const h of hits) if (!best || RANK[h.level] > RANK[best.level]) best = h;
  return best;
}

// --- Textbooks -----------------------------------------------------------------
function loadTextbooks() {
  const byKey = new Map();
  const add = (word, kana, ref) => {
    const k = cleanKana(kana); if (!k) return;
    // Kana-only entries keep their script (イクラ is not いくら).
    const key = word && hasKanji(word) ? cleanWord(word) + '|' + k : '|' + cleanWord(kana);
    const prev = byKey.get(key);
    if (!prev || RANK[ref.level] > RANK[prev.level]) byKey.set(key, ref);
  };
  const yaml = cached('minna-no-nihongo', 'minna-no-ds.yaml');
  for (const block of yaml.split(/\n\s*- id: /).slice(1)) {
    const id = /^\[(\d+),\s*(\d+)\]/.exec(block); if (!id) continue;
    const lesson = Number(id[1]);
    const kanji = (/kanji: "([^"]*)"/.exec(block) || [])[1] || null;
    const kana = (/kana: "([^"]*)"/.exec(block) || [])[1];
    add(kanji, kana, { book: 'Minna no Nihongo ' + (lesson <= 25 ? 'I' : 'II'), lesson, level: lesson <= 25 ? 'N5' : 'N4' });
  }
  for (const { fields } of parseCsv(cached('genki', 'genki1vocab.csv'))) {
    if (fields.length < 4) continue;
    const lesson = Number(fields[fields.length - 1]);
    if (!Number.isInteger(lesson)) continue;
    add(fields[1], fields[0], { book: lesson <= 12 ? 'Genki I' : 'Genki II', lesson, level: lesson <= 12 ? 'N5' : 'N4' });
  }
  return byKey;
}

// --- Repository data -----------------------------------------------------------
function loadRuntime() {
  const ctx = { window: {} }; ctx.window.window = ctx.window; vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'vocab-runtime.js'), 'utf8'), ctx);
  return ctx.window.VOCAB_RUNTIME.items;
}

// JMdict entries cited by each card's latest editorial review (calibration revisions excluded).
function loadJmdictCitations() {
  const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/vocabulary-review-workflow.json'), 'utf8'));
  const latest = new Map();
  for (const file of manifest.authoringFiles) {
    const batch = JSON.parse(fs.readFileSync(path.join(ROOT, file), 'utf8'));
    for (const record of [...(batch.reviews || []), ...(batch.additions || [])]) {
      if (!record.id || String(record.revisionId || '').startsWith(REVISION_PREFIX)) continue;
      const found = new Map();
      for (const e of record.evidence || []) {
        if (e.selected && e.selected.sequence) found.set(String(e.selected.sequence), 'selected');
        const text = (e.locator || '') + ' ' + (e.finding || '');
        if (!/JMdict/i.test((e.source || '') + text)) continue;
        for (const m of text.matchAll(/ent_seq=(\d{7})/g)) if (!found.has(m[1])) found.set(m[1], 'cited');
      }
      if (found.size) latest.set(record.id, [...found].map(([seq, how]) => ({ seq, how })));
    }
  }
  return latest;
}

function textbookMatch(textbooks, item, level) {
  const kana = cleanKana(item.reading);
  if (item.type === 'Partikel' || isAffix(item.word)) return null;
  if (hasKanji(item.word)) {
    const exact = textbooks.get(cleanWord(item.word) + '|' + kana);
    if (exact) return { ...exact, match: 'exact' };
    // A kana-only textbook entry may keep a beginner card where it is, never move it.
    const loose = kana.length >= 4 && RANK[level] >= 4 ? textbooks.get('|' + kana) : null;
    return loose ? { ...loose, match: 'kana', protectOnly: true } : null;
  }
  const written = cleanWord(item.word);
  const hit = written.length >= 2 ? textbooks.get('|' + written) : null;
  return hit ? { ...hit, match: 'kana' } : null;
}

function listEvidence(S, J, item, citations, level) {
  const kana = cleanKana(item.reading);
  const forms = [item.word].concat((item.aliases || []).map(a => typeof a === 'string' ? a : a && a.word)).filter(Boolean).map(cleanWord);
  const kanaOnly = !hasKanji(item.word);
  const cited = citations.get(item.id) || [];
  const selected = cited.filter(c => c.how === 'selected');
  const seqs = (selected.length ? selected : cited).map(c => c.seq);
  const precise = easiestHit([].concat(...seqs.map(s => S.bySeqKana.get(s + '|' + kana) || [])));
  // Affixes (〜的) collide with free words of the same spelling; only the precise join counts.
  const loose = idx => isAffix(item.word) ? [] : [].concat(...forms.map(w => idx.byWordKana.get(w + '|' + kana) || []),
    kanaOnly ? (idx.byKana.get(cleanWord(item.word)) || []) : []);
  const smk = easiestHit([precise, ...loose(S)].filter(Boolean));
  const jam = easiestHit(loose(J));
  const any = easiest([smk && smk.level, jam && jam.level]);
  if (!any) return null;
  let level2 = level, direction = 'confirms';
  if (RANK[any] < RANK[level]) { level2 = any; direction = 'harder'; }
  else if (precise && RANK[precise.level] > RANK[level]) {
    // Easier only on the precise join, and never past the other edition.
    const limit = jam ? (RANK[jam.level] > RANK[level] ? jam.level : null) : precise.level;
    if (limit) { level2 = harder(limit, precise.level); direction = 'easier'; }
  }
  const strip = h => h && { level: h.level, file: h.file, line: h.line, ...(h.seq ? { seq: h.seq } : {}) };
  return { level: level2, direction, precise: strip(precise), stephenmk: strip(smk), jamsinclair: strip(jam) };
}

function build({ baseline }) {
  const items = loadRuntime();
  const S = loadEdition('waller-stephenmk', { seq: 'jmdict_seq', word: 'kanji', kana: 'kana' });
  const J = loadEdition('waller-jamsinclair', { word: 'expression', kana: 'reading' });
  const textbooks = loadTextbooks();
  const citations = loadJmdictCitations();
  const frequencyFile = path.join(CACHE, 'frequency.json');
  assert(fs.existsSync(frequencyFile), 'Missing frequency.json; run the --words step and the Python research script first');
  const frequency = JSON.parse(fs.readFileSync(frequencyFile, 'utf8'));
  const from = id => baseline ? baseline.get(id) : null;

  const cards = items.map(item => {
    const level = from(item.id) || item.level;
    const list = listEvidence(S, J, item, citations, level);
    const t = textbookMatch(textbooks, item, level);
    const card = { id: item.id, word: item.word, reading: item.reading, type: item.type, from: level };
    if (t) {
      let to;
      if (t.protectOnly) to = list && RANK[list.level] > RANK[level] ? list.level : level;
      else {
        const proposed = list ? easier(list.level, t.level) : t.level;
        // A textbook and the list agreeing on a beginner level may move further than two levels.
        to = list && RANK[list.level] >= 4 ? proposed : cap(level, proposed);
        if (to !== proposed) card.capped = proposed;
      }
      return Object.assign(card, { to, basis: 'textbook', textbook: { book: t.book, lesson: t.lesson, match: t.match },
        ...(list ? { list } : {}) });
    }
    if (list) {
      const to = cap(level, list.level);
      if (to !== list.level) card.capped = list.level;
      return Object.assign(card, { to, basis: 'list', list });
    }
    return card;
  });

  // Levels backed by a source, by exact written form, for する-verbs and compounds.
  const backed = new Map();
  for (const c of cards) if (c.basis) {
    const k = cleanWord(c.word);
    const prev = backed.get(k);
    if (!prev || RANK[c.to] > RANK[prev.level]) backed.set(k, { level: c.to, id: c.id });
  }
  const part = w => ({ word: w, id: backed.get(w).id, level: backed.get(w).level });

  for (const c of cards) {
    if (c.basis) continue;
    const w = cleanWord(c.word);
    const base = /をする$/.test(w) ? w.slice(0, -3) : /する$/.test(w) ? w.slice(0, -2) : null;
    if (base && backed.has(base)) {
      const target = backed.get(base).level;
      Object.assign(c, { to: cap(c.from, target), basis: 'suru', parts: [part(base)] });
      if (c.to !== target) c.capped = target;
      continue;
    }
    // Number + counter (一歩, 二時半 is not matched): never easier than the counter word.
    const counted = /^[一二三四五六七八九十百千万何半毎数両]+(.+)$/.exec(w);
    if (counted && backed.has(counted[1])) {
      const floor = backed.get(counted[1]).level;
      Object.assign(c, { to: harder(c.from, cap(c.from, floor)), basis: 'compound', parts: [part(counted[1])], floor });
      continue;
    }
    if (/^[一-龯々]{3,}$/.test(w)) {
      let matched = false;
      for (let i = w.length - 1; i >= 1 && !matched; i--) {
        const a = w.slice(0, i), b = w.slice(i);
        if (!backed.has(a) || !backed.has(b)) continue;
        // Single-character affixes (街, 所) carry noisy list levels; they do not set the floor.
        const floor = [a, b].filter(x => x.length >= 2).map(x => backed.get(x).level).reduce(harder);
        Object.assign(c, { to: harder(c.from, cap(c.from, floor)), basis: 'compound', parts: [part(a), part(b)], floor });
        matched = true;
      }
      if (matched) continue;
    }
    const f = frequency.values[c.word];
    if (f && f.tokens === 1 && !PHRASE_TYPES.has(c.type) && !isAffix(c.word) && f.zipf < FREQUENCY_THRESHOLD && RANK[c.from] >= 3) {
      Object.assign(c, { to: RANK[c.from] >= 4 ? 'N3' : 'N2', basis: 'frequency', frequency: { zipf: f.zipf, threshold: FREQUENCY_THRESHOLD } });
      continue;
    }
    Object.assign(c, { to: c.from, basis: 'estimate' });
  }

  const counts = { from: {}, to: {}, basis: {}, moved: 0 };
  for (const c of cards) {
    counts.from[c.from] = (counts.from[c.from] || 0) + 1;
    counts.to[c.to] = (counts.to[c.to] || 0) + 1;
    counts.basis[c.basis] = (counts.basis[c.basis] || 0) + 1;
    if (c.to !== c.from) counts.moved++;
  }
  return {
    version: 1,
    calibration: 'vocabulary-levels-2026-11',
    revisionPrefix: REVISION_PREFIX,
    rules: ['textbook', 'list', 'suru', 'compound', 'frequency', 'estimate'],
    frequencyThreshold: FREQUENCY_THRESHOLD,
    sourcesHash: sha256(fs.readFileSync(path.join(ROOT, 'scripts/vocabulary-levels/sources.json'), 'utf8')),
    frequencyVersions: frequency.versions,
    counts,
    cards
  };
}

function serialize(evidence) {
  // One card per line keeps diffs reviewable.
  const head = { ...evidence }; delete head.cards;
  const body = JSON.stringify(head, null, 2).replace(/\n}$/, ',\n  "cards": [\n');
  return body + evidence.cards.map(c => '    ' + JSON.stringify(c)).join(',\n') + '\n  ]\n}\n';
}

function loadBaseline() {
  if (!fs.existsSync(OUT)) return null;
  const previous = JSON.parse(fs.readFileSync(OUT, 'utf8'));
  return new Map(previous.cards.map(c => [c.id, c.from]));
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.includes('--words')) {
    const words = [...new Set(loadRuntime().map(v => v.word))].sort();
    fs.mkdirSync(CACHE, { recursive: true });
    fs.writeFileSync(path.join(CACHE, 'words.json'), JSON.stringify(words));
    console.log('wrote', words.length, 'words to', path.relative(ROOT, path.join(CACHE, 'words.json')));
  } else {
    const evidence = build({ baseline: loadBaseline() });
    const text = serialize(evidence);
    if (args.includes('--check')) {
      assert(fs.existsSync(OUT), 'No committed evidence file');
      assert.equal(sha256(fs.readFileSync(OUT, 'utf8')), sha256(text), 'Evidence differs from a fresh build from the cached sources');
      console.log('Evidence matches a fresh build:', evidence.counts.moved, 'moves');
    } else {
      fs.writeFileSync(OUT, text);
      console.log(JSON.stringify(evidence.counts, null, 2));
    }
  }
}

module.exports = { build, LEVELS, RANK, REVISION_PREFIX, serialize };
