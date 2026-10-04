Reusable vocabulary batch workflow
==================================

The current policy is `author-only-v1`, authorized by the user on 4 October
2026 to speed completion. New entries, additions, source decisions and merges
need an explicit author first-pass approval of the exact final assembly.
An independent second pass is optional. Evidence, specific notes, at least two
reviewed distinct contexts, pitch investigation, fixed packets, immutable
identities and full validation before writes remain required. Historical
records keep their original risk-based policy and independent approvals.
Use the prepared packet's `policy` when authoring; packets allocated before a
policy change must be prepared again.

For the active full-enrichment campaign, CLI preparation selects that campaign's
level and includes accepted entries still lacking notes, two distinct examples,
two reviewed contexts or investigated pitch. `--level=N5 --enrichment` makes this
selection explicit. The reusable module keeps its maintenance defaults unless
these options are supplied. Candidate groups are allocated separately; a phase
requires all references in groups owned by that level to resolve.
Retired merge sources stay in working history but are excluded from both queue
modes. Explicit entry rosters and previously allocated packets also reject them;
pending additions remain eligible.
Enrichment eligibility uses each working map's ID key, including projected
addition content without an embedded ID. Fully reviewed additions do not
re-enter the queue solely because their content snapshot omits that field.

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
below. Existing merge approvals use the explicit renewal allocation described below.

`node scripts/vocabulary-batch.cjs assemble --packet=packet.json --proposal=proposal.json --out=assembly.json`
binds the exact proposal. `author-only-v1` uses no independent sample; historical
risk-based policies retain their deterministic routine sample.
`node scripts/vocabulary-batch.cjs targets --assembly=assembly.json`
prints target, assembly, content, and evidence approval hashes for resolved
records. Reviewers must inspect `assembly.json`, including `finalContent`, and
supply their own decisions JSON array. Each decision contains those four target
and hash fields, `pass` (`firstPass` or `secondPass`), `decision` (`accepted` or
`rejected`), `reviewer`, and a substantive `finding`.

`node scripts/vocabulary-batch.cjs approve --assembly=assembly.json --decisions=decisions.json --out=approved.json`
records only the supplied decisions. When an optional second review is supplied,
its reviewer must differ from the first. Historical risk-based records retain
their required second pass. Assemble again after any content, evidence, policy, or metadata change;
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

For an inflected adjective taught as an adverb, a UniDic surface row alone does
not establish the realized accent. Its `aType` can describe the basic form;
inflection changes are described separately by `aModType`. Inspect the actual
realized-form evidence, such as the complete OJAD adjective `〜く形` cell, and
bind the supported contours to the selected reading and role. Keep pitch
investigated unknown when the whole form remains unsupported. Preserve the
historical record and append an author-reviewed revision when replacing
lemma-only evidence or adding directly attested variants.

When editing a surviving merge target, allocate its approval renewal before
assembly with the module function
`allocateMergeRevisions(packet, plan, [retiredSourceId])`. The returned packet
binds the exact historical merge predecessor and both current content snapshots.
Append a merge proposal with that predecessor hash, the unchanged surviving ID,
current evidence and preservation findings, and a consequential merge policy.
Omit `fromHash`, `toHash` and old approvals; assembly binds the unchanged retired
content and the final survivor content. Every allocated merge renewal must be
present, and each requires fresh author approval against the same complete
assembly under the current policy. Import it in the same wave as the survivor edit. The
retired source receives no new teaching review and its redirect is preserved.

Candidate additions are allocated before authoring: use `prepare --candidates --references=refs.json`, where each explicit reference may include `additionIds`, for example `[{"key":"candidate-key","index":0,"additionIds":["vocab-n5:correction:new-sense"]}]`. Every allocated ID must appear in `proposal.additions`, alongside its candidate decision, and reviews plus additions remain limited to 25 entries per packet. The addition supplies its complete `entry`, reason, level basis, evidence, pitch investigation and consequential enrichment policy. Its accepted candidate decision targets the exact entry hash. Both addition and decision need explicit author first-pass approvals under the current policy. The allocated candidate identity is included in the addition's approval-bound policy. Reuse neither existing IDs nor a newly prepared packet after its source changes.

For an explicit historical sample defect, use `prepare --defects=defects.json --out=packet.json` and then assemble a version-3 proposal containing the same `sampleDefects` roster. Supply the full affected batch revision IDs and documented shared-rule entries when opening a defect. Clearance supplies every affected entry's later approved revision/content hashes; author-only corrections satisfy the current policy. The packet binds the current defect predecessor; assembly binds the exact finding and scope. Defect notices do not invent entry acceptance decisions: the existing workflow validates escalation scope and clearance approvals immediately before import. An open defect must be appended after its affected batch. Identity merges continue through the dedicated authoring workflow.
# Romaji display overrides

The importer reconciles `vocab-romaji-hepburn.js` with the final reviewed runtime.
An unchanged authored string keeps its vowel spans. When approved authoring
replaces a string with reviewed Hepburn, its obsolete display spans are removed
within the same serialized import. An unreviewed mismatch fails validation.
