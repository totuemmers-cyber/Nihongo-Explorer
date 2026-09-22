const {hash}=require('./vocabulary-correction-pipeline.cjs');
function coverageDocument(plan) {
  const ledger=JSON.parse(plan.files['scripts/vocabulary-completion/ledger.json']);
  const r=require('./import-vocabulary-completion.cjs').report(plan);
  return '# Current vocabulary review coverage\n\n'+
    'Generated from the resulting review ledger. Historical checkpoint prose is retained in README.md.\n\n'+
    '| Measure | Count |\n| --- | ---: |\n'+[
      ['Entries',r.total],['Accepted editorial reviews',r.reviewed],['Pending entry reviews',r.unreviewedEntries],
      ['Unresolved candidate groups',r.unresolvedCandidates],['Unresolved candidate references',r.unresolvedCandidateReferences],
      ['Verified pitch',r.pitchVerified],['Investigated unknown pitch',r.pitchUnknown],['Uninvestigated pitch',r.pitchUninvestigated],
      ['Optional missing notes among accepted reviews',r.optionalEnrichmentMissingNotes],
      ['Optional missing second context among accepted reviews',r.optionalEnrichmentFewerThanTwo],
      ['Open sample defects',r.openSampleDefects]
    ].map(([label,count])=>`| ${label} | ${count} |`).join('\n')+
    '\n\nReview completion: **'+(r.complete?'complete':'open')+'**. Strict enrichment: **'+(r.strictComplete?'complete':'open')+'**.\n\n'+
    'Ledger SHA256: `'+hash(ledger)+'`.\n';
}
module.exports={coverageDocument};
