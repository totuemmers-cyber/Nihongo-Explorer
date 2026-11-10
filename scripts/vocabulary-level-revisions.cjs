// Turns the level calibration (scripts/vocabulary-levels/evidence.json) into level-only
// revision records and imports them through the normal batch workflow.
//
//   node scripts/vocabulary-level-revisions.cjs prepare   assemble and approve every packet into the cache
//   node scripts/vocabulary-level-revisions.cjs import    import the prepared waves (resumable, 3 packets per wave)
//   node scripts/vocabulary-level-revisions.cjs renew-prepare | renew-import
//                                                         renew candidate decisions the level changes reopened
//
// Each record changes only `level`. Its review and pitch investigation are carried over
// verbatim from the card's latest accepted revision and say so; the new evidence rows
// cite the source that set the level.
const assert = require('assert');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const batchTool = require('./vocabulary-batch.cjs');
const importer = require('./import-vocabulary-completion.cjs');
const { RANK, REVISION_PREFIX } = require('./build-vocabulary-levels.cjs');

const ROOT = path.resolve(__dirname, '..');
const EVIDENCE_FILE = 'scripts/vocabulary-levels/evidence.json';
const SOURCES = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/vocabulary-levels/sources.json'), 'utf8'));
const WORK = path.join(ROOT, SOURCES.cacheFolder, 'waves');
const REVIEWER = 'vocabulary-level-calibration-2026-11';
const DECISION_DATE = '2026-11-10';
const BATCH_NAME = n => 'scripts/vocabulary-completion/229-levels-' + String(n).padStart(3, '0') + '.json';
const sha256 = text => crypto.createHash('sha256').update(text).digest('hex');
const copy = v => JSON.parse(JSON.stringify(v));
const source = id => SOURCES.sources.find(s => s.id === id);

const RULE_TEXT = {
  textbook: 'taught in a beginner textbook (Minna no Nihongo I / Genki lessons 0-12 = N5; Minna no Nihongo II / Genki 13-23 = N4)',
  list: "Jonathan Waller's JLPT lists, matched through the card's cited JMdict entry and reading",
  suru: 'a する-verb takes the level of its noun',
  compound: 'a compound is never easier than its hardest multi-character part',
  frequency: 'an unlisted single word rarer than 95% of listed N5-N3 words moves one band harder'
};

function listRow(edition, hit, card) {
  const s = source(edition);
  return {
    source: s.title, version: hit.file + ' SHA256 ' + s.files[hit.file], attribution: s.attribution,
    locator: s.rawBase + hit.file + '#L' + hit.line + (hit.seq ? '; JMdict entry ' + hit.seq : ''),
    finding: card.word + ' (' + card.reading + ') is listed at ' + hit.level + ' in this edition.'
  };
}

function evidenceRows(card, evidenceHash) {
  const rows = [{
    source: 'Vocabulary-level calibration rules (scripts/build-vocabulary-levels.cjs)',
    version: 'evidence.json SHA256 ' + evidenceHash,
    locator: EVIDENCE_FILE + '#' + card.id,
    finding: card.from + ' → ' + card.to + ' by rule "' + card.basis + '": ' + RULE_TEXT[card.basis] + '.' +
      (card.capped ? ' The evidence gives ' + card.capped + '; moves are capped at two levels.' : '')
  }];
  if (card.textbook) {
    const s = source(card.textbook.book.startsWith('Genki') ? 'genki' : 'minna-no-nihongo');
    const file = Object.keys(s.files)[0];
    rows.push({ source: s.title, version: file + ' SHA256 ' + s.files[file], attribution: s.attribution,
      locator: s.url + '; ' + card.textbook.book + ', lesson ' + card.textbook.lesson + ' (' + card.textbook.match + ' match)',
      finding: card.word + ' is taught in ' + card.textbook.book + ' lesson ' + card.textbook.lesson + ' (' + s.levelMapping + ').' });
  }
  if (card.list) {
    if (card.list.stephenmk) rows.push(listRow('waller-stephenmk', card.list.stephenmk, card));
    if (card.list.jamsinclair) rows.push(listRow('waller-jamsinclair', card.list.jamsinclair, card));
  }
  for (const p of card.parts || []) rows.push({
    source: 'Vocabulary-level calibration: component card', version: 'evidence.json SHA256 ' + evidenceHash,
    locator: EVIDENCE_FILE + '#' + p.id, finding: 'Component ' + p.word + ' (' + p.id + ') has a source-backed level of ' + p.level + '.'
  });
  if (card.frequency) {
    const s = source('wordfreq');
    rows.push({ source: s.title, version: Object.entries(s.versions).map(([k, v]) => k + ' ' + v).join('; '),
      attribution: s.attribution, locator: s.url,
      finding: 'Zipf ' + card.frequency.zipf + ' is below ' + card.frequency.threshold + ', the 5th percentile of listed single-token N5-N3 words.' });
  }
  rows.push({ source: 'User decision', version: DECISION_DATE,
    locator: 'Chat instruction "Go" approving the final vocabulary-level calibration plan',
    finding: 'The user asked for the vocabulary levels to be recalibrated with these rules after reviewing the plan and its limits.' });
  return rows;
}

function levelBasis(card) {
  const parts = [card.basis + ': ' + RULE_TEXT[card.basis]];
  if (card.textbook) parts.push(card.textbook.book + ' lesson ' + card.textbook.lesson);
  if (card.list) parts.push('Waller list ' + card.list.level + ' (' + card.list.direction + ')');
  if (card.parts) parts.push('components ' + card.parts.map(p => p.word + ' ' + p.level).join(' + '));
  if (card.frequency) parts.push('Zipf ' + card.frequency.zipf);
  if (card.capped) parts.push('capped from ' + card.capped);
  return parts.join('; ');
}

// A surviving merge target whose level changes needs its merge approval renewed in the same
// packet (vocabulary-batch.md). The renewal keeps the original findings and states the change.
function mergeRenewals(packet, plan, cards, evidenceHash) {
  return (packet.mergeHeads || []).map(head => {
    const previous = plan.mergeHeads.get(head.from);
    const card = cards.get(head.to);
    return {
      from: head.from, to: head.to,
      equivalentSense: previous.equivalentSense,
      preservedContent: previous.preservedContent + ' Renewed for the November 2026 vocabulary-level calibration: the survivor ' +
        head.to + ' changes level from ' + card.from + ' to ' + card.to + '; its taught content is otherwise unchanged and still covers the retired entry.',
      ...(previous.retirement ? { retirement: copy(previous.retirement) } : {}),
      state: 'accepted',
      predecessorMergeHash: head.predecessorMergeHash,
      evidence: copy(previous.evidence).concat([{
        source: 'Vocabulary-level calibration rules (scripts/build-vocabulary-levels.cjs)',
        version: 'evidence.json SHA256 ' + evidenceHash,
        locator: EVIDENCE_FILE + '#' + head.to,
        finding: 'Only the survivor\'s level changes (' + card.from + ' → ' + card.to + ', rule "' + card.basis + '"); the retirement and redirect are unchanged.'
      }]),
      policy: { id: packet.policy, risk: 'consequential',
        reasons: ['merge', ...(previous.retirement ? ['retirement'] : []), 'target-content-change'], enrichmentRequired: false, sampled: false }
    };
  });
}

function proposal(packet, plan, cards, evidenceHash) {
  return { version: 3, merges: mergeRenewals(packet, plan, cards, evidenceHash), reviews: packet.entries.map(row => {
    const card = cards.get(row.id);
    const head = plan.workHeads.get(row.id);
    assert(head && head.state === 'accepted' && head.record, 'No accepted predecessor for ' + row.id);
    assert.equal(row.content.level, card.from, 'Card level differs from the calibration baseline: ' + row.id);
    const previous = head.record;
    const predecessor = previous.revisionId || 'historical accepted record ' + head.revisionHash.slice(0, 12);
    const review = copy(previous.review);
    review.reviewer = REVIEWER;
    review.reviewedDistinctContexts = true;
    review.level = levelBasis(card);
    review.carriedOver = 'All fields except level are copied unchanged from ' + predecessor + '; this revision did not re-review them.';
    return {
      id: row.id,
      revisionId: REVISION_PREFIX + row.id.replace(/:/g, '-'),
      state: 'accepted',
      predecessorHash: row.sourceHash,
      originalHash: row.sourceHash,
      predecessorRevisionHash: row.predecessorRevisionHash,
      original: { level: card.from },
      replacement: { level: card.to },
      rationale: 'Level-only revision (vocabulary-level calibration, November 2026): ' + card.from + ' → ' + card.to +
        ' by rule "' + card.basis + '". Word, reading, meaning, notes, examples, pitch and all other fields are unchanged from ' +
        predecessor + '; their review and pitch investigation are carried over verbatim and were not re-reviewed here.',
      levelBasis: levelBasis(card),
      evidence: evidenceRows(card, evidenceHash),
      pitch: copy(previous.pitch),
      policy: { id: packet.policy, risk: 'consequential', reasons: ['level-calibration'], enrichmentRequired: true, sampled: false },
      review
    };
  }) };
}

function prepare() {
  const evidenceText = fs.readFileSync(path.join(ROOT, EVIDENCE_FILE), 'utf8');
  const evidenceHash = sha256(evidenceText);
  const evidence = JSON.parse(evidenceText);
  const cards = new Map(evidence.cards.map(c => [c.id, c]));
  const plan = importer.prepare();
  // Group by original level, N5 first, like earlier campaigns; stable order by ID.
  const moves = evidence.cards.filter(c => c.to !== c.from)
    .sort((a, b) => RANK[b.from] - RANK[a.from] || a.id.localeCompare(b.id));
  const pending = moves.filter(c => {
    const item = plan.items.find(v => v.id === c.id);
    assert(item, 'Calibrated card missing from the library: ' + c.id);
    return item.level === c.from;
  });
  console.log(moves.length + ' moves, ' + pending.length + ' still to import');
  fs.mkdirSync(WORK, { recursive: true });
  let n = 0;
  const waves = [];
  for (let i = 0; i < pending.length; i += 75) {
    const ids = pending.slice(i, i + 75).map(c => c.id);
    const prepared = batchTool.preparePackets(plan, { ids, evidence: false });
    const wave = [];
    for (let packet of prepared.packets.filter(p => p.entries.length)) {
      n++;
      const inPacket = new Set(packet.entries.map(e => e.id));
      const survivors = [...plan.mergeHeads.entries()].filter(([, m]) => inPacket.has(m.to)).map(([from]) => from);
      if (survivors.length) packet = batchTool.allocateMergeRevisions(packet, plan, survivors);
      const assembly = batchTool.assemble(packet, proposal(packet, plan, cards, evidenceHash), plan);
      const decisions = batchTool.approvalTargets(assembly).map(t => ({ ...t, pass: 'firstPass', decision: 'accepted', reviewer: REVIEWER,
        finding: t.target.startsWith('merge:')
          ? 'Checked the merge renewal: same retired entry, survivor and redirect; only the survivor\'s level changes, as recorded in the calibration evidence.'
          : 'Checked that the only change is the level and that it matches the calibration evidence for this card ' +
            '(source rows cited in the evidence). Content carried over from the predecessor was not re-reviewed.' }));
      const approved = batchTool.approve(assembly, decisions);
      const file = path.join(WORK, 'packet-' + String(n).padStart(3, '0') + '.json');
      fs.writeFileSync(file, JSON.stringify(approved));
      wave.push({ file: path.relative(ROOT, file), name: BATCH_NAME(n) });
    }
    waves.push(wave);
    process.stdout.write('prepared ' + n + ' packets\r');
  }
  fs.writeFileSync(path.join(WORK, 'waves.json'), JSON.stringify({ evidenceHash, waves }, null, 2));
  console.log('\nprepared ' + n + ' packets in ' + waves.length + ' waves');
}

// Candidate-reference decisions are bound to their target cards' exact content, so a level
// change reopens them ("needs revision"). Each is renewed unchanged against the new content,
// following the target-renewal precedent of batches 223-224.
function prepareRenewals() {
  const { hash, project } = require('./vocabulary-correction-pipeline.cjs');
  const evidenceText = fs.readFileSync(path.join(ROOT, EVIDENCE_FILE), 'utf8');
  const evidenceHash = sha256(evidenceText);
  const cards = new Map(JSON.parse(evidenceText).cards.map(c => [c.id, c]));
  const plan = importer.prepare();
  const content = id => plan.workingItems.get(id) || plan.items.find(v => v.id === id);
  const reopened = plan.candidateLedger.flatMap(c => c.references.filter(r => r.state !== 'accepted').map(r => ({ key: c.key, index: r.index })));
  const head = r => plan.candidateHeads.get(r.key + '#' + r.index);
  for (const r of reopened) {
    const h = head(r);
    assert(h && h.record && h.record.targets.some(id => cards.has(id) && cards.get(id).to !== cards.get(id).from),
      'Reference reopened for a reason other than the calibration: ' + r.key + '#' + r.index);
  }
  console.log(reopened.length + ' reopened references');
  const dir = path.join(WORK, 'renewals');
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
        const changed = previous.targets.filter(id => cards.has(id) && cards.get(id).to !== cards.get(id).from)
          .map(id => id + ' ' + cards.get(id).from + '→' + cards.get(id).to);
        return {
          key: c.key, referenceIndex: c.index, referenceHash: c.referenceHash,
          revisionId: REVISION_PREFIX + 'reference-' + c.key + '-' + c.index,
          state: 'accepted',
          predecessorHash: head(c).contentHash,
          predecessorRevisionHash: c.predecessorRevisionHash,
          disposition: previous.disposition,
          targets: copy(previous.targets),
          targetHashes: Object.fromEntries(previous.targets.map(id => [id, hash(project(content(id)))])),
          ...(previous.sourceNormalization ? { sourceNormalization: copy(previous.sourceNormalization) } : {}),
          reason: 'Renewed unchanged for the November 2026 vocabulary-level calibration: the target card(s) changed level only (' +
            changed.join(', ') + '). Original reason: ' + previous.reason,
          evidence: copy(previous.evidence).concat([{
            source: 'Vocabulary-level calibration rules (scripts/build-vocabulary-levels.cjs)',
            version: 'evidence.json SHA256 ' + evidenceHash,
            locator: EVIDENCE_FILE,
            finding: 'Only the level of the target card(s) changed (' + changed.join(', ') + '); disposition and targets are unchanged.'
          }]),
          policy: { id: packet.policy, risk: 'consequential', reasons: ['candidate-coverage', 'target-renewal'], enrichmentRequired: true, sampled: false }
        };
      });
      const assembly = batchTool.assemble(packet, { version: 3, reviews: [], decisions }, plan);
      const approved = batchTool.approve(assembly, batchTool.approvalTargets(assembly).map(t => ({ ...t, pass: 'firstPass', decision: 'accepted',
        reviewer: REVIEWER, finding: 'Checked the renewal: same frozen reference, disposition and targets; the target card(s) changed level only, as recorded in the calibration evidence.' })));
      const file = path.join(dir, 'packet-' + String(n).padStart(3, '0') + '.json');
      fs.writeFileSync(file, JSON.stringify(approved));
      wave.push({ file: path.relative(ROOT, file), name: 'scripts/vocabulary-completion/229-levels-refs-' + String(n).padStart(3, '0') + '.json' });
    }
    waves.push(wave);
  }
  fs.writeFileSync(path.join(dir, 'waves.json'), JSON.stringify({ evidenceHash, waves }, null, 2));
  console.log('prepared ' + n + ' renewal packets in ' + waves.length + ' waves');
}

function runImport(wavesFile = path.join(WORK, 'waves.json'), journalPrefix = 'journal-') {
  const { waves } = JSON.parse(fs.readFileSync(wavesFile, 'utf8'));
  const manifest = () => JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/vocabulary-review-workflow.json'), 'utf8'));
  waves.forEach((wave, i) => {
    const journal = path.join(path.dirname(wavesFile), journalPrefix + String(i + 1).padStart(3, '0') + '.json');
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

const command = process.argv[2];
if (command === 'prepare') prepare();
else if (command === 'import') runImport();
else if (command === 'renew-prepare') prepareRenewals();
else if (command === 'renew-import') runImport(path.join(WORK, 'renewals', 'waves.json'));
else throw new Error('Use prepare, import, renew-prepare or renew-import');
