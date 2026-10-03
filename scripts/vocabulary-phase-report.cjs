// A phase is complete only after content, evidence and candidate references agree.
const assert = require('assert');
const {levels} = require('./vocabulary-tools.cjs');
const sentenceKey = s => (s || '').normalize('NFKC').replace(/[\s。、！？!?.,]/g, '');
const text = s => typeof s === 'string' && s.trim().length > 0;
function ownershipPlan(plan) {
  const itemsById=new Map(plan.items.map(item=>[item.id,item]));
  const candidateTargetLevels=new Map();
  for(const [referenceKey,head] of plan.candidateHeads||[]){
    const key=head.record.key||referenceKey.slice(0,referenceKey.lastIndexOf('#'));
    const touched=candidateTargetLevels.get(key)||new Set();
    for(const id of head.record.targets||[]){
      const level=itemsById.get(id)?.level||plan.workingItems?.get(id)?.level;
      if(level)touched.add(level);
    }
    candidateTargetLevels.set(key,touched);
  }
  return {...plan,itemsById,candidateTargetLevels};
}
function candidateLevel(candidate, plan) {
  if(plan&&!plan.candidateTargetLevels)plan=ownershipPlan(plan);
  const currentItems = plan?.itemsById || (plan ? new Map(plan.items.map(item => [item.id, item])) : undefined);
  const targets = (candidate.possibleTargets || []).map(target =>
    currentItems?.get(target.id)?.level || plan?.workingItems?.get(target.id)?.level || target.level);
  const touched = [...(candidate.references || []).map(reference => reference.level), ...targets,
    ...(plan?.candidateTargetLevels?.get(candidate.key)||[])];
  return levels.find(level => touched.includes(level)) || 'N1';
}
function needsEnrichment(plan, item, ledgerById) {
  const ledger = ledgerById ? ledgerById.get(item.id) : plan.ledger.find(row => row.id === item.id);
  const contexts = plan.reviewedDistinctContextIds
    ? plan.reviewedDistinctContextIds.has(item.id)
    : new Set(plan.correctionReviews?.get(item.id)?.review?.contexts || []).size >= 2;
  return ledger?.editorial !== 'reviewed' || !['verified', 'unknown'].includes(ledger?.pitch) || !text(item.notes)
    || new Set((item.examples || []).map(e => sentenceKey(e.japanese))).size < 2 || !contexts
    || (item.examples || []).some(e => !text(e.japanese) || !text(e.romaji) || !text(e.german));
}
function phaseReport(plan, level) {
  assert(levels.includes(level), 'Unknown vocabulary level: ' + level);
  const items = plan.items.filter(item => item.level === level);
  const ids = new Set(items.map(item => item.id));
  const ledger = plan.ledger.filter(row => ids.has(row.id));
  const ledgerById = new Map(ledger.map(row => [row.id, row]));
  const allIds = new Set(plan.items.map(item => item.id));
  const ownership = ownershipPlan(plan);
  const candidates = new Map(plan.manifest.candidates.filter(c => candidateLevel(c, ownership) === level).map(c => [c.key, c]));
  const candidateRows = (plan.candidateLedger || []).filter(row => candidates.has(row.key));
  const rowsByKey=new Map(candidateRows.map(row=>[row.key,row]));
  const r = {
    level, total: items.length, reviewed: ledger.filter(row => row.editorial === 'reviewed').length,
    missingNotes: items.filter(item => !text(item.notes)).length,
    fewerThanTwo: items.filter(item => new Set((item.examples || []).map(e => sentenceKey(e.japanese))).size < 2).length,
    incompleteExamples: items.reduce((n, item) => n + (item.examples || []).filter(e => !text(e.japanese) || !text(e.romaji) || !text(e.german)).length, 0),
    unreviewedEntries: items.filter(item => ledgerById.get(item.id)?.editorial !== 'reviewed').length,
    pitchUninvestigated: items.filter(item => !['verified', 'unknown'].includes(ledgerById.get(item.id)?.pitch)).length,
    lackingReviewedDistinctContexts: items.filter(item => plan.reviewedDistinctContextIds
      ? !plan.reviewedDistinctContextIds.has(item.id)
      : new Set(plan.correctionReviews?.get(item.id)?.review?.contexts || []).size < 2).length,
    unresolvedCandidates: candidateRows.filter(row => row.references.some(ref => ref.state !== 'accepted')).length,
    unresolvedCandidateReferences: candidateRows.reduce((n, row) => n + row.references.filter(ref => ref.state !== 'accepted').length, 0),
    missingCandidateReferences: [...candidates].reduce((n,[key,candidate])=>n+
      Math.max(0,(candidate.references||[]).length-(rowsByKey.get(key)?.references.length||0)),0),
    pendingAdditions: [...(plan.workHeads || [])].filter(([id, head]) => !allIds.has(id)
      && (head.record.entry || plan.workingItems?.get(id))?.level === level && head.state !== 'accepted').length,
    // An open review defect blocks certification; it must not disappear through a level filter.
    openSampleDefects: (plan.sampleDefects || []).filter(defect => defect.state === 'open').length
  };
  r.complete = items.length > 0 && ['missingNotes', 'fewerThanTwo', 'incompleteExamples', 'unreviewedEntries',
    'pitchUninvestigated', 'lackingReviewedDistinctContexts', 'unresolvedCandidates', 'unresolvedCandidateReferences', 'missingCandidateReferences',
    'pendingAdditions', 'openSampleDefects'].every(field => r[field] === 0);
  return r;
}
function phaseReports(plan) { return Object.fromEntries(levels.map(level => [level, phaseReport(plan, level)])); }
module.exports = {candidateLevel, ownershipPlan, needsEnrichment, phaseReport, phaseReports};
