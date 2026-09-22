// Validate the complete source-bound review before changing any teaching data.
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const files = ['grammar-data.js', 'grammar-n2.js', 'grammar-n1.js', 'keigo-data.js'];
const normalize = text => String(text).normalize('NFKC').trim().replace(/\s+/g, ' ').toLocaleLowerCase('de');
function loadGroups() {
  return files.map(file => {
    const c = { GRAMMAR_DATA: [] }; c.window = c;
    vm.runInNewContext(fs.readFileSync(path.join(root, file), 'utf8'), c);
    return { file, items: c.GRAMMAR_DATA };
  });
}
function applyReview(groups, records = JSON.parse(fs.readFileSync(path.join(root, 'scripts/grammar-quiz-review.json'), 'utf8')).records) {
  const byId = new Map(groups.flatMap(g => g.items).map(g => [g.id, g]));
  assert.equal(byId.size, groups.reduce((n,g) => n + g.items.length, 0), 'Duplicate grammar source id');
  const seen = new Set(), covered = new Set(), pending = [];
  for (const r of records) {
    const key = r.grammarId + ':' + r.exampleIndex;
    assert(Number.isInteger(r.exampleIndex) && r.exampleIndex >= 0, 'Invalid example index: ' + key);
    assert(!seen.has(key), 'Duplicate review: ' + key); seen.add(key);
    const g = byId.get(r.grammarId), ex = g && g.examples[r.exampleIndex];
    assert(ex && ex.cloze && !g.clozeExcludedReason, 'Missing/excluded source: ' + key);
    assert.equal(r.level, g.level, 'Stale level: ' + key);
    for (const field of ['japanese', 'german']) assert.equal(r[field], ex[field], 'Stale ' + field + ': ' + key);
    for (const field of ['start', 'answer']) assert.equal(r[field], ex.cloze[field], 'Stale span: ' + key);
    assert(Number.isInteger(r.start) && r.start >= 0 && typeof r.answer === 'string' && r.answer.trim(), 'Invalid source span: ' + key);
    assert.equal(ex.japanese.slice(r.start, r.start + r.answer.length), r.answer, 'Invalid source span: ' + key);
    assert(Array.isArray(r.acceptedAnswers) && r.acceptedAnswers.includes(r.answer), 'Missing accepted answer: ' + key);
    assert(r.acceptedAnswers.every(a => typeof a === 'string' && a.trim()), 'Invalid accepted answer: ' + key);
    assert(Array.isArray(r.distractors) && r.distractors.length === 3, 'Three reviewed alternatives required: ' + key);
    const accepted = new Set(r.acceptedAnswers.map(normalize));
    const wrong = new Set();
    for (const d of r.distractors) {
      assert(d && typeof d.text === 'string' && d.text.trim() && typeof d.reason === 'string' && d.reason.trim(), 'Missing alternative/rationale: ' + key);
      const n = normalize(d.text);
      assert(!accepted.has(n) && !wrong.has(n), 'Accepted or duplicate alternative: ' + key); wrong.add(n);
    }
    if (/^N[45]$/.test(g.level)) {
      assert(typeof r.promptKana === 'string' && !/[\u3400-\u9fff]/.test(r.promptKana) && r.promptKana.split('＿＿＿').length === 2, 'Reviewed beginner kana required: ' + key);
    }
    covered.add(g.id); pending.push([ex, r]);
  }
  for (const g of byId.values()) {
    if (g.examples.some(e => e.cloze) && !g.clozeExcludedReason) assert(covered.has(g.id), 'Missing grammar review: ' + g.id);
  }
  // No mutations occur until every record and all coverage requirements pass.
  for (const g of byId.values()) for (const ex of g.examples) if (ex.cloze) delete ex.cloze.quiz;
  for (const [ex, r] of pending) {
    const { grammarId, exampleIndex, ...quiz } = r;
    ex.cloze.quiz = structuredClone(quiz);
  }
  return { records: records.length, patterns: covered.size };
}
function build() {
  const groups = loadGroups(), report = applyReview(groups);
  for (const { file, items } of groups) {
    const prefix = file === 'grammar-data.js' ? 'window.GRAMMAR_DATA = ' : 'window.GRAMMAR_DATA.push.apply(window.GRAMMAR_DATA, ';
    const suffix = file === 'grammar-data.js' ? ';\n' : ');\n';
    fs.writeFileSync(path.join(root, file), '// Teaching data; editorial sources in scripts/.\n' + prefix + JSON.stringify(items, null, 2) + suffix);
  }
  console.log('Quiz review compiled: ' + JSON.stringify(report));
}
if (require.main === module) build();
module.exports = { applyReview, loadGroups, normalize };
