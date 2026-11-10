// Checks that every vocabulary card's level matches the calibration evidence
// (scripts/vocabulary-levels/evidence.json) and that the evidence obeys its own rules.
// Works without the research cache; `node scripts/build-vocabulary-levels.cjs --check`
// additionally rebuilds the evidence from the cached sources.
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const RANK = { N5: 5, N4: 4, N3: 3, N2: 2, N1: 1 };
const BASES = ['textbook', 'list', 'suru', 'compound', 'frequency', 'estimate'];

function load(file, key) {
  const ctx = { window: {} }; ctx.window.window = ctx.window; vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), ctx);
  return ctx.window[key];
}

function audit() {
  const runtime = load('vocab-runtime.js', 'VOCAB_RUNTIME');
  const details = load('vocab-runtime-details.js', 'VOCAB_RUNTIME_DETAILS');
  const evidence = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/vocabulary-levels/evidence.json'), 'utf8'));
  const cards = new Map(evidence.cards.map(c => [c.id, c]));
  assert.equal(cards.size, evidence.cards.length, 'Repeated card in level evidence');
  const problems = [];
  const fail = (id, message) => problems.push(id + ': ' + message);

  for (const c of evidence.cards) {
    if (!BASES.includes(c.basis)) { fail(c.id, 'unknown basis ' + c.basis); continue; }
    if (!RANK[c.from] || !RANK[c.to]) { fail(c.id, 'invalid level'); continue; }
    const step = RANK[c.to] - RANK[c.from];
    if (c.basis === 'estimate' && step !== 0) fail(c.id, 'an estimate cannot change the level');
    if (['compound', 'frequency'].includes(c.basis) && step > 0) fail(c.id, c.basis + ' may only move a card harder');
    const agreed = c.basis === 'textbook' && c.list && RANK[c.list.level] >= 4;
    if (Math.abs(step) > 2 && !agreed) fail(c.id, 'moves ' + Math.abs(step) + ' levels without agreeing sources');
    if (c.basis === 'textbook' && !(c.textbook && c.textbook.book && Number.isInteger(c.textbook.lesson))) fail(c.id, 'textbook basis without lesson');
    if (c.basis === 'list' && !(c.list && (c.list.stephenmk || c.list.jamsinclair))) fail(c.id, 'list basis without a list row');
    if (['suru', 'compound'].includes(c.basis)) {
      if (!Array.isArray(c.parts) || !c.parts.length) fail(c.id, c.basis + ' basis without component cards');
      else for (const p of c.parts) {
        const part = cards.get(p.id);
        if (!part || part.to !== p.level || part.basis === 'estimate') fail(c.id, 'component ' + p.id + ' is not a source-backed card at ' + p.level);
      }
    }
    if (c.basis === 'frequency' && !(c.frequency && c.frequency.zipf < c.frequency.threshold)) fail(c.id, 'frequency basis above threshold');
  }

  const live = new Set();
  runtime.items.forEach((item, i) => {
    live.add(item.id);
    const c = cards.get(item.id);
    if (!c) {
      // Cards added after the calibration are estimates until the evidence is rebuilt.
      if (item.levelBasis !== 'estimate') fail(item.id, 'runtime claims basis ' + item.levelBasis + ' without evidence');
      return;
    }
    if (item.level !== c.to) fail(item.id, 'runtime level ' + item.level + ' differs from evidence ' + c.to);
    if (item.levelBasis !== c.basis) fail(item.id, 'runtime basis ' + item.levelBasis + ' differs from evidence ' + c.basis);
    if (!details[i] || typeof details[i].levelNote !== 'string' || !details[i].levelNote.trim()) fail(item.id, 'missing level note');
  });
  const redirects = runtime.completionRedirects || {};
  for (const c of evidence.cards) if (!live.has(c.id) && !redirects[c.id]) fail(c.id, 'evidence for a card that is neither live nor redirected');

  const counts = {};
  for (const item of runtime.items) counts[item.level] = (counts[item.level] || 0) + 1;
  return { problems, counts, moved: evidence.cards.filter(c => c.to !== c.from).length,
    estimates: runtime.items.filter(v => v.levelBasis === 'estimate').length };
}

if (require.main === module) {
  const result = audit();
  if (result.problems.length) {
    console.error(result.problems.length + ' level evidence problems:\n' + result.problems.slice(0, 40).join('\n'));
    process.exit(1);
  }
  console.log('Vocabulary levels match their evidence: ' + JSON.stringify(result.counts) +
    '; ' + result.moved + ' calibrated moves; ' + result.estimates + ' estimates.');
}
module.exports = { audit };
