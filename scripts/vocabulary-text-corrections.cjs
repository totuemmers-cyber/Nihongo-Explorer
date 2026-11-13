// Applies a list of German text corrections (usage notes and examples) to vocabulary cards
// through the normal batch workflow, so every change is a reviewed, sealed revision.
//
//   node scripts/vocabulary-text-corrections.cjs preview         print every change, write nothing
//   node scripts/vocabulary-text-corrections.cjs prepare         assemble and approve the packets into the cache
//   node scripts/vocabulary-text-corrections.cjs import          import the prepared wave (resumable)
//   node scripts/vocabulary-text-corrections.cjs renew-prepare | renew-import
//                                                                renew candidate decisions the edits reopened
//   Add --spec=<file> for another list (default: scripts/vocabulary-text-corrections/2026-11.json).
//
// A correction names its card and gives exact edits: `noteEdits` ([find, replace] pairs, each
// `find` must occur exactly once), `removeExamples` (Japanese sentences) and `replaceExamples`.
// Each record changes only those fields. The rest of its review and its pitch investigation are
// carried over verbatim from the card's latest accepted revision and say so.
const assert = require('assert');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const batchTool = require('./vocabulary-batch.cjs');
const importer = require('./import-vocabulary-completion.cjs');
const { hash, project } = require('./vocabulary-correction-pipeline.cjs');

const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const option = name => args.find(a => a.startsWith('--' + name + '='))?.slice(name.length + 3);
const SPEC_FILE = (option('spec') || 'scripts/vocabulary-text-corrections/2026-11.json').replace(/\\/g, '/');
const sha256 = text => crypto.createHash('sha256').update(text).digest('hex');
const copy = v => JSON.parse(JSON.stringify(v));
const CARD_ID = /(?:vocab-n\d|idioms|yojijukugo):(?:correction:)?[\w-]+/;

function loadSpec() {
  const text = fs.readFileSync(path.join(ROOT, SPEC_FILE), 'utf8');
  const spec = JSON.parse(text);
  assert.equal(spec.version, 1, 'Unsupported correction list');
  for (const f of ['id', 'title', 'reviewer', 'revisionPrefix', 'batchPrefix']) assert(typeof spec[f] === 'string' && spec[f], 'Correction list needs ' + f);
  assert(/^scripts\/vocabulary-completion\/[\w-]+-$/.test(spec.batchPrefix), 'Invalid batch prefix');
  assert.equal(new Set(spec.corrections.map(c => c.id)).size, spec.corrections.length, 'A card is listed twice');
  for (const c of spec.corrections) {
    assert(c.noteEdits || c.removeExamples || c.replaceExamples, 'Correction changes nothing: ' + c.id);
    assert(spec.checks[c.kind], 'Unknown correction kind: ' + c.kind);
    assert(c.rationale && Array.isArray(c.evidence) && c.evidence.length, 'Correction needs a rationale and evidence: ' + c.id);
  }
  return { ...spec, hash: sha256(text), work: path.join(ROOT, '.content-cache', 'vocabulary-text-corrections', spec.id) };
}
const revisionId = (spec, id) => spec.revisionPrefix + id.replace(/:/g, '-');
const batchName = (spec, kind, n) => spec.batchPrefix + kind + String(n).padStart(3, '0') + '.json';

// Returns the changed fields and, for example changes, what happened at each position.
function change(card, c) {
  assert.equal(card.word, c.word, 'Correction names a different word: ' + c.id);
  const replacement = {};
  if (c.noteEdits) {
    let notes = card.notes;
    for (const [find, replace] of c.noteEdits) {
      assert.equal(notes.split(find).length, 2, 'Note edit must match exactly once in ' + c.id + ': ' + find);
      notes = notes.replace(find, () => replace);
    }
    const untidy = text => (text.match(/ {2}| [.,;)]|\( /g) || []).length;
    assert(notes.trim() && notes !== card.notes && untidy(notes) <= untidy(card.notes), 'Note edit leaves a broken note: ' + c.id);
    if (c.kind === 'internal-card-id') assert(!CARD_ID.test(notes), 'A card ID is left in ' + c.id);
    replacement.notes = notes;
  }
  const exampleChanges = [];
  if (c.removeExamples || c.replaceExamples) {
    const examples = copy(card.examples);
    const index = japanese => {
      const i = examples.findIndex(e => e && e.japanese === japanese);
      assert(i >= 0, 'Example not found in ' + c.id + ': ' + japanese);
      return i;
    };
    for (const r of c.replaceExamples || []) {
      const i = index(r.japanese);
      exampleChanges.push({ index: i, old: card.examples[i], next: r.with, context: r.context });
      examples[i] = { ...(examples[i].kind ? { kind: examples[i].kind } : {}), ...copy(r.with) };
    }
    for (const japanese of c.removeExamples || []) {
      const i = index(japanese);
      exampleChanges.push({ index: i, old: card.examples[i], next: null });
      examples[i] = null;
    }
    replacement.examples = examples.filter(Boolean);
    replacement.keptIndexes = examples.map((e, i) => e ? i : -1).filter(i => i >= 0);
  }
  return { replacement, exampleChanges };
}

// The review's per-example fields list the sentences; keep them in step with the examples.
function swapText(reviewText, oldText, nextText, field, id) {
  assert(reviewText.includes(oldText), 'Review field "' + field + '" does not quote the changed example of ' + id);
  if (nextText !== null) return reviewText.replace(oldText, () => nextText);
  const withSeparator = [oldText + ' / ', ' / ' + oldText].find(s => reviewText.includes(s));
  assert(withSeparator, 'Cannot remove the example from review field "' + field + '" of ' + id);
  return reviewText.replace(withSeparator, () => '');
}

function proposal(packet, plan, spec, corrections) {
  return { version: 3, merges: [], reviews: packet.entries.map(row => {
    const c = corrections.get(row.id);
    const head = plan.workHeads.get(row.id);
    assert(head && head.state === 'accepted' && head.record, 'No accepted predecessor for ' + row.id);
    const previous = head.record;
    const predecessor = previous.revisionId || 'historical accepted record ' + head.revisionHash.slice(0, 12);
    const { replacement, exampleChanges } = change(row.content, c);
    const keptIndexes = replacement.keptIndexes;
    delete replacement.keptIndexes;
    const review = copy(previous.review);
    if (replacement.notes) for (const [field, value] of Object.entries(review)) {
      if (typeof value === 'string' && value.includes(row.content.notes)) review[field] = value.replace(row.content.notes, () => replacement.notes);
    }
    for (const x of exampleChanges) {
      review.japanese = swapText(review.japanese, x.old.japanese, x.next && x.next.japanese, 'japanese', row.id);
      review.romanization = swapText(review.romanization, x.old.romaji, x.next && x.next.romaji, 'romanization', row.id);
      review.translation = swapText(review.translation, x.old.german, x.next && x.next.german, 'translation', row.id);
      if (x.next) review.contexts[x.index] = x.context;
    }
    if (keptIndexes) review.contexts = keptIndexes.map(i => review.contexts[i]);
    const changed = Object.keys(replacement).map(f => f === 'notes' ? 'the usage note' : 'the examples').join(' and ');
    review.reviewer = spec.reviewer;
    review.reviewedDistinctContexts = true;
    review.carriedOver = 'Everything except ' + changed + ' is copied unchanged from ' + predecessor +
      '; this revision checked only the corrected text and did not re-review the rest.';
    return {
      id: row.id,
      revisionId: revisionId(spec, row.id),
      state: 'accepted',
      predecessorHash: row.sourceHash,
      originalHash: row.sourceHash,
      predecessorRevisionHash: row.predecessorRevisionHash,
      original: Object.fromEntries(Object.keys(replacement).map(f => [f, copy(row.content[f])])),
      replacement,
      rationale: spec.title + ' (' + c.kind + '): ' + c.rationale + ' Word, reading, meaning, level, pitch and all other fields are unchanged from ' +
        predecessor + '; their review and pitch investigation are carried over verbatim and were not re-reviewed here.',
      evidence: copy(c.evidence).concat([copy(spec.decision)]),
      pitch: copy(previous.pitch),
      policy: { id: packet.policy, risk: 'consequential', reasons: ['german-text-correction'], enrichmentRequired: true, sampled: false },
      review
    };
  }) };
}

function pendingCorrections(plan, spec) {
  return spec.corrections.filter(c => {
    const head = plan.workHeads.get(c.id);
    assert(head && plan.workingItems.get(c.id), 'Corrected card missing from the library: ' + c.id);
    return head.record.revisionId !== revisionId(spec, c.id);
  });
}

function preview() {
  const spec = loadSpec();
  const plan = importer.prepare();
  const pending = pendingCorrections(plan, spec);
  console.log(spec.corrections.length + ' corrections, ' + pending.length + ' still to import');
  for (const c of pending) {
    const card = plan.workingItems.get(c.id);
    const { replacement, exampleChanges } = change(card, c);
    console.log('\n' + c.id + ' ' + card.word + ' (' + card.reading + ') [' + c.kind + ']');
    for (const [find, replace] of c.noteEdits || []) console.log('  - ' + JSON.stringify(find) + '\n  + ' + JSON.stringify(replace));
    if (replacement.notes) console.log('  NOTE: ' + replacement.notes);
    for (const x of exampleChanges) console.log('  EXAMPLE ' + (x.index + 1) + ': ' + x.old.japanese + '\n       => ' + (x.next ? x.next.japanese + ' | ' + x.next.romaji + ' | ' + x.next.german : '(removed)'));
  }
}

function prepare() {
  const spec = loadSpec();
  const plan = importer.prepare();
  const corrections = new Map(spec.corrections.map(c => [c.id, c]));
  const pending = pendingCorrections(plan, spec);
  console.log(spec.corrections.length + ' corrections, ' + pending.length + ' still to import');
  assert(pending.length <= 75, 'Split the list: one wave holds 75 cards');
  // A merge survivor would need its merge approval renewed in the same packet; none is expected here.
  for (const c of pending) assert(![...plan.mergeHeads.values()].some(m => m.to === c.id || m.from === c.id), 'Card is part of a merge: ' + c.id);
  fs.mkdirSync(spec.work, { recursive: true });
  const wave = [];
  if (pending.length) {
    const prepared = batchTool.preparePackets(plan, { ids: pending.map(c => c.id), evidence: false });
    for (const packet of prepared.packets.filter(p => p.entries.length)) {
      const n = wave.length + 1;
      const assembly = batchTool.assemble(packet, proposal(packet, plan, spec, corrections), plan);
      const approved = batchTool.approve(assembly, batchTool.approvalTargets(assembly).map(t => ({ ...t, pass: 'firstPass', decision: 'accepted',
        reviewer: spec.reviewer, finding: spec.checks[corrections.get(t.target).kind] })));
      const file = path.join(spec.work, 'packet-' + String(n).padStart(3, '0') + '.json');
      fs.writeFileSync(file, JSON.stringify(approved));
      wave.push({ file: path.relative(ROOT, file), name: batchName(spec, '', n) });
    }
  }
  fs.writeFileSync(path.join(spec.work, 'waves.json'), JSON.stringify({ specHash: spec.hash, waves: wave.length ? [wave] : [] }, null, 2));
  console.log('prepared ' + wave.length + ' packets');
}

// Candidate-reference decisions are bound to their target cards' exact content, so a text
// correction reopens them ("needs revision"). Each is renewed unchanged against the new
// content, following the target-renewal precedent of batches 223-224 and 229-levels-refs.
function prepareRenewals() {
  const spec = loadSpec();
  const edited = new Set(spec.corrections.map(c => c.id));
  const plan = importer.prepare();
  const content = id => plan.workingItems.get(id) || plan.items.find(v => v.id === id);
  const reopened = plan.candidateLedger.flatMap(c => c.references.filter(r => r.state !== 'accepted').map(r => ({ key: c.key, index: r.index })));
  const head = r => plan.candidateHeads.get(r.key + '#' + r.index);
  for (const r of reopened) {
    const h = head(r);
    assert(h && h.record && h.record.targets.some(id => edited.has(id)), 'Reference reopened for a reason other than these corrections: ' + r.key + '#' + r.index);
  }
  console.log(reopened.length + ' reopened references');
  const dir = path.join(spec.work, 'renewals');
  fs.mkdirSync(dir, { recursive: true });
  let n = 0;
  const waves = [];
  for (let i = 0; i < reopened.length; i += 75) {
    const prepared = batchTool.prepareCandidatePackets(plan, reopened.slice(i, i + 75), { evidence: false });
    const wave = [];
    for (const packet of prepared.packets.filter(p => p.candidates.length)) {
      n++;
      const decisions = packet.candidates.map(c => {
        const previous = head(c).record;
        const changed = previous.targets.filter(id => edited.has(id));
        return {
          key: c.key, referenceIndex: c.index, referenceHash: c.referenceHash,
          revisionId: spec.revisionPrefix + 'reference-' + c.key + '-' + c.index,
          state: 'accepted',
          predecessorHash: head(c).contentHash,
          predecessorRevisionHash: c.predecessorRevisionHash,
          disposition: previous.disposition,
          targets: copy(previous.targets),
          targetHashes: Object.fromEntries(previous.targets.map(id => [id, hash(project(content(id)))])),
          ...(previous.sourceNormalization ? { sourceNormalization: copy(previous.sourceNormalization) } : {}),
          reason: 'Renewed unchanged for ' + spec.title + ': only the German usage note or examples of the target card(s) changed (' +
            changed.join(', ') + '). Original reason: ' + previous.reason,
          evidence: copy(previous.evidence).concat([{
            source: spec.title + ' (' + SPEC_FILE + ')',
            version: 'correction list SHA256 ' + spec.hash,
            locator: SPEC_FILE + '#' + changed.join(', '),
            finding: 'Only the German usage note or examples of the target card(s) changed (' + changed.join(', ') +
              '); word, reading, meaning, aliases, disposition and targets are unchanged.'
          }]),
          policy: { id: packet.policy, risk: 'consequential', reasons: ['candidate-coverage', 'target-renewal'], enrichmentRequired: true, sampled: false }
        };
      });
      const assembly = batchTool.assemble(packet, { version: 3, reviews: [], decisions }, plan);
      const approved = batchTool.approve(assembly, batchTool.approvalTargets(assembly).map(t => ({ ...t, pass: 'firstPass', decision: 'accepted',
        reviewer: spec.reviewer, finding: 'Checked the renewal: same frozen reference, disposition and targets; the target card(s) changed only in their German usage note or examples, as recorded in the correction list.' })));
      const file = path.join(dir, 'packet-' + String(n).padStart(3, '0') + '.json');
      fs.writeFileSync(file, JSON.stringify(approved));
      wave.push({ file: path.relative(ROOT, file), name: batchName(spec, 'refs-', n) });
    }
    waves.push(wave);
  }
  fs.writeFileSync(path.join(dir, 'waves.json'), JSON.stringify({ specHash: spec.hash, waves }, null, 2));
  console.log('prepared ' + n + ' renewal packets in ' + waves.length + ' waves');
}

function runImport(wavesFile) {
  const spec = loadSpec();
  const { specHash, waves } = JSON.parse(fs.readFileSync(wavesFile, 'utf8'));
  assert.equal(specHash, spec.hash, 'The correction list changed after the packets were prepared; prepare again');
  const manifest = () => JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/vocabulary-review-workflow.json'), 'utf8'));
  waves.forEach((wave, i) => {
    const journal = path.join(path.dirname(wavesFile), 'journal-' + String(i + 1).padStart(3, '0') + '.json');
    if (fs.existsSync(journal) && !JSON.parse(fs.readFileSync(journal, 'utf8')).complete) batchTool.resumeJournal(journal);
    const imported = manifest().authoringFiles;
    const todo = wave.filter(p => !imported.includes(p.name));
    if (!todo.length) return;
    assert.equal(todo.length, wave.length, 'Wave ' + (i + 1) + ' is partially imported');
    const started = Date.now();
    batchTool.importWave(todo.map(p => JSON.parse(fs.readFileSync(path.join(ROOT, p.file), 'utf8'))), todo.map(p => p.name), journal);
    console.log('wave ' + (i + 1) + '/' + waves.length + ' imported in ' + Math.round((Date.now() - started) / 1000) + 's');
  });
  console.log('all waves imported');
}

const command = args.find(a => !a.startsWith('--'));
if (command === 'preview') preview();
else if (command === 'prepare') prepare();
else if (command === 'import') runImport(path.join(loadSpec().work, 'waves.json'));
else if (command === 'renew-prepare') prepareRenewals();
else if (command === 'renew-import') runImport(path.join(loadSpec().work, 'renewals', 'waves.json'));
else throw new Error('Use preview, prepare, import, renew-prepare or renew-import');
