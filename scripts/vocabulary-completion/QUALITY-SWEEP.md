# Bounded vocabulary quality sweep — completed with deferred findings

**100 entries inspected; 25 confirmed defective entries; 21 corrected; 11 uncertain;
64 with no issue observed.** The single sweep finished in **17.8 minutes**
across three workers, within the shared 60-minute budget. No further wave started.
All 378 prior accepted reviews survive unchanged; actual corrections add 21
accepted reviews, for **399 / 13,106**. Triage observations themselves add no
coverage. Exhaustive certification remains incomplete and superseded.

Start: 2026-09-22T17:03:41Z. Finish: 2026-09-22T17:21:31.418Z. No inspections or required
verification remain unfinished. Counts describe this deliberately risk-weighted
sample, not an estimated corpus error rate.

## Fixed scope and bindings

| Level | Inspected | Mechanical selection | Confirmed defects | Uncertain | No issue observed |
| --- | ---: | ---: | ---: | ---: | ---: |
| N5 | 20 | 10 | 12 | 2 | 6 |
| N4 | 20 | 10 | 11 | 0 | 9 |
| N3 | 20 | 0 | 1 | 2 | 17 |
| N2 | 20 | 4 | 1 | 2 | 17 |
| N1 | 20 | 3 | 0 | 5 | 15 |

Worker allocations: 34 / 33 / 33, with no repeated IDs. Selection took up to ten
strongest mechanical leads per level, then filled by deterministic SHA256 rank
using seed `bounded-quality-sweep-2026-09-22-v1` and the runtime snapshot hash.
The fixed [roster](quality-sweep/sample-roster.tsv) includes every ID, content hash,
allocation and observation. Full inspected content/evidence and observations are
in [triage.json](quality-sweep/triage.json).

- Inspected runtime SHA256: `5d23570e885c0353362816861789e19a6071c874547aaf6b52a69baeb7787240`.
- Fixed triage snapshot SHA256: `0a98d20520d426bfa207b8197977467e894c6feb8cd002c75d2fdc8ce4ae0477`.
- Final runtime SHA256: `1c4534c6abbf40c36b63a529a94b368545a764de5e4466f673214a791880c112`.

A preliminary audit draft incorrectly flagged valid null nonverb metadata and
intentional overlaps. It was superseded before locking the final roster; the draft
is retained separately, and is not counted as a second sample or review wave.

## Findings and fixes

The complete-runtime scan found **74 exact duplicate examples**, **8 excluded-verb
metadata leads**, **0 malformed fields**, **0 unintended identity collisions**, and
**0 impossible pitch values**. Existing exclusion reasons live in historical verb
review records; a missing runtime reason was a research lead, not automatically a
defect. See the compact [mechanical list](quality-sweep/mechanical-findings.json).
No prior unresolved confirmed defect was found; the five saved unresolved review
heads concern pitch/pragmatic uncertainty and remain preserved.

Six substantive corrections repaired 羊毛 and 獣医 noun labels, 即〜's adverb label
and example transcription, 何千's example transcriptions/translation, 取り替える's
example transcription, and the unsupported 文句する construction (now 文句を言う,
same stable ID, repaired examples and godan metadata). The latter uses a necessary
grammar note, not optional enrichment. Publisher evidence includes
[Daijisen's 即 adverb sense](https://kotobank.jp/word/%E5%8D%B3-89830) and
[Shogakukan's 文句を言う complaint phrase](https://kotobank.jp/jeword/%E6%96%87%E5%8F%A5).

Fifteen corrections removed only a second identical example, retaining the first.
All 21 entries used existing risk-based-v2 rules and independent, exact
content/evidence-bound approvals. Pitch was checked only as required for selected
corrections: one primary value changed (何千, 1→3); two unsupported values became
unknown (即〜 and the corrected complaint phrase). No candidate addition, extra
sense, optional example or general pitch campaign was introduced.

Imported batches: [020a](020a-quality-sweep.json), [020b](020b-quality-sweep.json),
[020c](020c-quality-sweep.json), [020d](020d-quality-sweep.json). Two transactions
were needed because the unchanged importer accepts at most three batch files per
transaction; both belong to this one fixed sweep. Complete proposed runtime
validation preceded each write. Journals and independent decisions are retained
under quality-sweep/.

## Deferred work

> Update 23 September 2026: maintenance batch 021 replaced the duplicate second
> example of all 59 remaining entries, including the four deferred ones below, with new
> distinct contexts after pitch/sense adjudication. The sweep record itself is unchanged.

Four sampled duplicate defects remain: 止める (vocab-n5:477), おにぎり
(vocab-n5:595), 従兄弟 (vocab-n5:698), and こどもの日 (vocab-n4:571). Their required
acceptance checks need further pitch or sense adjudication. There are **59 exact
duplicates remaining corpus-wide**, including these four and 55 outside the sample.

No confirmed high-priority sampled defect remains unfixed. Eleven uncertain
observations are saved without acceptance; higher-priority research leads include
時間がかかる's awkward 三十分時間 example, 求刑's German Strafantrag gloss,
政治資金's narrowing to donations, and 実感's nuance. The other leads concern
taxonomy, rare forms, and intentional conjugation exclusions. These are not
established corrections. Repeated duplicate, noun-label and transcription patterns
are explicitly scoped in [clusters.json](quality-sweep/clusters.json); no broad
shared correction was applied without independent checks.

Candidate decisions, uncovered senses, optional notes/examples, stylistic polishing
and general pitch investigation are deferred. **12,707 entry reviews and 6,549
candidate references remain unresolved**; the original freeze counts are retained
in [campaign-status.json](campaign-status.json).

## Verification and maintenance

Deterministic allocation, content bindings, 100 observations, the correction cap,
unchanged prior accepted ledger rows, sealed historical batches, and exact final
runtime/ledger consistency passed. The full importer/workflow suite ran once and
passed; focused triage tests passed. Post-import vocabulary, content, conjugation,
quiz and lint checks passed. The **unchanged exhaustive completion audit failed as
expected**, while the bounded-sweep check passed. See [verification logs](quality-sweep/verification.json).

Recheck this completed sweep with:

`npm run review:vocabulary-triage -- verify --file=scripts/vocabulary-completion/quality-sweep/triage.json`

The same command's prepare subcommand creates a fixed artifact and refuses to
overwrite it. It never accepts reviews or imports content. The exhaustive queue
CLI now reports superseded. Default maintenance is reported defects and reviews
of future changes; resuming exhaustive certification requires a new explicit scope.
