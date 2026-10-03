const {hash}=require('./vocabulary-correction-pipeline.cjs');
function coverageDocument(plan) {
  const ledger=JSON.parse(plan.files['scripts/vocabulary-completion/ledger.json']);
  const r=require('./import-vocabulary-completion.cjs').report(plan);
  const phases=require('./vocabulary-phase-report.cjs').phaseReports(plan);
  return '# Current vocabulary review coverage\n\n'+
    'Generated from the resulting review ledger. Historical checkpoint prose is retained in README.md.\n\n'+
    '| Measure | Count |\n| --- | ---: |\n'+[
      ['Entries',r.total],['Accepted editorial reviews',r.reviewed],['Pending entry reviews',r.unreviewedEntries],
      ['Unresolved candidate groups',r.unresolvedCandidates],['Unresolved candidate references',r.unresolvedCandidateReferences],
      ['Missing usage notes',r.missingNotes],['Missing second example',r.fewerThanTwo],['Missing two reviewed contexts',r.lackingReviewedDistinctContexts],
      ['Verified pitch',r.pitchVerified],['Investigated unknown pitch',r.pitchUnknown],['Uninvestigated pitch',r.pitchUninvestigated],
      ['Optional missing notes among accepted reviews',r.optionalEnrichmentMissingNotes],
      ['Optional missing second context among accepted reviews',r.optionalEnrichmentFewerThanTwo],
      ['Open sample defects',r.openSampleDefects]
    ].map(([label,count])=>`| ${label} | ${count} |`).join('\n')+
    '\n\nReview completion: **'+(r.complete?'complete':'open')+'**. Strict enrichment: **'+(r.strictComplete?'complete':'open')+'**.\n\n'+
    'Ledger SHA256: `'+hash(ledger)+'`.\n\n'+
    '## Level phases\n\n| Level | Entries | Missing notes | Missing second example | Pending reviews | Unresolved references | Complete |\n| --- | ---: | ---: | ---: | ---: | ---: | --- |\n'+
    Object.values(phases).map(p=>`| ${p.level} | ${p.total} | ${p.missingNotes} | ${p.fewerThanTwo} | ${p.unreviewedEntries} | ${p.unresolvedCandidateReferences} | ${p.complete?'yes':'no'} |`).join('\n')+'\n\n'+
    'Shared candidate groups belong to the earliest level among their reference levels and current target-entry levels, including targets allocated by later decisions (historical target levels are used only when no current entry exists). Every reference in such a group must be resolved before that phase completes. Open review defects block all phase gates.\n';
}
module.exports={coverageDocument};
