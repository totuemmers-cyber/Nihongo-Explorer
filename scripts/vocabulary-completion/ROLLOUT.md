# Streamlined review rollout

**Campaign superseded, 22 September 2026:** exhaustive processing is frozen in
favor of one [60-minute quality sweep](QUALITY-SWEEP.md). The results below are
historical. The completion gate remains unchanged and open; another exhaustive
wave requires a new explicit scope.

Policy: `risk-based-v2`. The completion gate remains open until all required entry reviews and candidate references are accepted. Unknown pitch and optional enrichment are reported separately in [COVERAGE.md](COVERAGE.md).

## Two initial waves, 22 September 2026

| Measure | Wave 1 | Wave 2 |
| --- | ---: | ---: |
| Fixed review slots | 75 | 75 |
| Newly accepted entries | 74 | 75 |
| Independent checks performed | 24 | 30 |
| Rejected evidence proposals, subsequently corrected | 0 | 6 |
| Substantive sample defects | 0 | 0 |
| Entries left researching | 1 | 0 |
| Accepted entries with investigated unknown pitch | 6 | 0 |
| Packet creation to completed import | 505.210 s | 1020.007 s |

Wave 2 revisited the one unresolved entry from wave 1; the two waves therefore accepted 149 distinct entries. Wave 2 performed one additional independent check beyond its 29 required checks. Six initial evidence proposals were rejected before import and revised with whole-form pitch evidence. The initial rejection artifact and correction note documented the review, including correction of an independent reviewer's initial misreading; they were working files and were removed on 23 September 2026.

Wave 1 packet creation: `2026-09-22T16:14:25.427Z`; completed import journal: `2026-09-22T16:22:50.637Z`. Wave 2 packet creation: `2026-09-22T16:23:16.501Z`; completed import journal: `2026-09-22T16:40:16.508Z`. Import timestamps are journal filesystem timestamps captured during rollout, not independently timestamped external records.

Separate preparation duration and wave 1 editorial labor were not instrumented; they cannot be reconstructed honestly. Later packet preparation records include `preparationMs`, which measures queue/packet construction rather than the preceding runtime replay. Wave 2 initial editorial intervals were 235.082, 200.799, and 153.388 seconds for the three 25-entry packets. These overlap across workers and exclude later independent review, evidence revisions, and approval rebinding. One measured independent-review interval was 60.492 seconds for nine decisions. The third worker's 393.456-second overall span included coordination and reviewing another packet, so it is not pure editorial labor.

The waves overlapped implementation and security hardening. Their end-to-end rates were approximately 527 and 265 newly accepted entries per wall-clock hour. At those rates, the 12,798 entries remaining immediately after wave 2 would take approximately 24–48 hours of comparable active processing. This is an entry-only arithmetic scenario, not a completion forecast: the sample consists of N5 entries, later levels can need more research, and all 6,552 candidate-reference decisions remained unresolved. Candidate research was saved for 37 references, but research is not acceptance. There is no measured candidate-acceptance rate from these waves and therefore no defensible full-queue completion date.

Neither pilot wave exercised a German-edit exemption in production; no saved independent-review time is claimed from them. Each candidate reference continues to need its own decision.

## Continued processing

Wave 3 proceeded without a new approval checkpoint: 70 accepted entries, five unresolved investigations, 35 independent checks, and one newly investigated unknown pitch. Two German spelling/capitalization edits used explicit meaning-preservation findings: one remained outside the deterministic sample, and the other was sampled and independently checked. Packet construction took 891 ms, excluding the preceding runtime replay. One consequential example proposal was rejected for lacking a distinct second context and corrected. Full proposed-runtime validation also rejected missing required notes and incomplete research citation metadata before writes; both were repaired before the final import at `2026-09-22T16:53:49.961Z`.

Three spelling-alias revisions and their three individual candidate-reference decisions were independently reviewed and imported. Two additional references contain uncovered senses and remain research work. Across this rollout, 219 distinct entry reviews and three candidate references were newly accepted. The current ledger contains 378 accepted entries; 12,728 entry reviews and 6,549 candidate references remain unresolved. Thirty-nine references received saved research during this rollout, including the three subsequently accepted references. The full-corpus task is still incomplete.

The reusable tool also supports explicitly allocated candidate additions and sample-defect opening/clearance. Integration tests exercise actual validator/import paths, including rejection before writes. Identity merges retain the existing dedicated authoring path. Assembly itself is not a complete content-schema validator: import validation remains the final guard against malformed evidence or missing required enrichment.

## Validation and historical compatibility

The complete importer/workflow suite passed after the final policy and import-race hardening. Focused regressions cover German eligibility and prohibited changes, identity/content/evidence binding, historical replay, accepted-only deterministic sampling, defect escalation, fixed allocation, stale snapshots, validation-time edits, concurrent imports, interruption recovery and repeated import rejection. Existing vocabulary, content, verb, quiz, lint, storage, smoke, UI and contrast checks also passed during rollout.

The first wave was sealed before identity-bound approvals were strengthened. Its three exact immutable batch hashes are frozen in the validator and manifest as a narrow historical compatibility exception. New batches require `entry-identity-v1`; the exception cannot be expanded through manifest edits. Historical v1 and strict policies retain their validation rules.

Every ordinary import validates the entire proposed runtime and ledger immediately before writes and regenerates coverage from that result. Full completion remains unachieved.
