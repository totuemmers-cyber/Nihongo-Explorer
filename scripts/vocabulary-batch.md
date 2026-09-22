Reusable vocabulary batch workflow
==================================

`node scripts/vocabulary-batch.cjs prepare --out=.content-cache/wave.json`
allocates three fixed packets of up to 25 entries from one queue snapshot, in
queue order. Save each element of `packets` to a separate packet JSON file.
Packets contain current content, source and predecessor hashes, and cached
research including competing matches and restrictions. Cached research is
evidence for editorial judgment, never an acceptance decision.

Author a version 3 proposal with the packet's entire entry roster. Use accepted
for resolved proposals and researching/drafted/needs revision for unresolved
ones; preserve their findings and open questions. Supply all final content,
provenance, policy classification, and editorial checks before assembly.
Candidate additions and sample defects use explicitly allocated packets described
below. Identity merges retain the existing dedicated revision authoring path.

`node scripts/vocabulary-batch.cjs assemble --packet=packet.json --proposal=proposal.json --out=assembly.json`
binds the exact proposal and computes the per-batch deterministic routine sample.
`node scripts/vocabulary-batch.cjs targets --assembly=assembly.json`
prints target, assembly, content, and evidence approval hashes for resolved
records. Reviewers must inspect `assembly.json`, including `finalContent`, and
supply their own decisions JSON array. Each decision contains those four target
and hash fields, `pass` (`firstPass` or `secondPass`), `decision` (`accepted` or
`rejected`), `reviewer`, and a substantive `finding`.

`node scripts/vocabulary-batch.cjs approve --assembly=assembly.json --decisions=decisions.json --out=approved.json`
records only the supplied decisions. A second reviewer must differ from the
first. Assemble again after any content, evidence, policy, or metadata change;
old approvals cannot be reused. Rejected proposals require a new assembly.

`node scripts/vocabulary-batch.cjs import --assemblies=a.json,b.json,c.json --names=scripts/vocabulary-completion/013a.json,scripts/vocabulary-completion/013b.json,scripts/vocabulary-completion/013c.json --journal=.content-cache/import-013.json`
checks snapshots and validates the complete proposed runtime and ledger once
before writing anything. Import one to three approved batches independently of
other packets' progress. Each imported packet retains its 25-entry history and
sample. The journal records every validated output and its previous file hash.

After an interrupted import, run
`node scripts/vocabulary-batch.cjs import --resume=.content-cache/import-013.json`.
Recovery is idempotent and refuses files altered outside the recorded import.
An exclusive process lock rejects concurrent imports and recovery. A terminated
owner's lock is recovered automatically. Inputs and expected outputs are hashed
before validation and checked again before journal creation; an external edit
during validation rejects the import without overwriting that edit. Temporary
files use unique names. Use a new journal filename for each new wave.

Focused verification: `node scripts/vocabulary-batch-test.cjs`.

Candidate additions are allocated before authoring: use `prepare --candidates --references=refs.json`, where each explicit reference may include `additionIds`, for example `[{"key":"candidate-key","index":0,"additionIds":["vocab-n5:correction:new-sense"]}]`. Every allocated ID must appear in `proposal.additions`, alongside its candidate decision, and reviews plus additions remain limited to 25 entries per packet. The addition supplies its complete `entry`, reason, level basis, evidence, pitch investigation and consequential enrichment policy. Its accepted candidate decision targets the exact entry hash. Both addition and decision need explicit first and independent second approvals. The allocated candidate identity is included in the addition's approval-bound policy. Reuse neither existing IDs nor a newly prepared packet after its source changes.

For an explicit sample defect, use `prepare --defects=defects.json --out=packet.json` and then assemble a version-3 proposal containing the same `sampleDefects` roster. Supply the full affected batch revision IDs and documented shared-rule entries when opening a defect. Clearance supplies every affected entry's later independent revision/content hashes. The packet binds the current defect predecessor; assembly binds the exact finding and scope. Defect notices do not invent entry acceptance decisions: the existing workflow validates escalation scope and clearance approvals immediately before import. An open defect must be appended after its affected batch. Identity merges continue through the dedicated authoring workflow.
