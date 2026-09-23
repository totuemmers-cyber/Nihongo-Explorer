# Vocabulary correction and completion — exhaustive campaign superseded

The exhaustive campaign was frozen on 22 September 2026 and replaced by one
60-minute quality sweep. See [campaign status](campaign-status.json) and the
[bounded sweep report](QUALITY-SWEEP.md). Its historical instructions below are
retained for provenance, not authorization to start another wave. The 378 accepted
reviews, imported corrections, research and sealed batches remain preserved.
Default maintenance covers reported defects and future changes. Resuming
exhaustive certification requires a new explicit user scope.

## Maintenance batches 021–022 — reported defects and additions (23 September 2026)

Reported-defect maintenance under `risk-based-v2`; every record has an editorial
first pass and an exact-hash independent second pass (three review rounds; all
rejections were fixed and re-reviewed). The sealed batch files are the record; their
cited research is kept in
[maintenance-021/research-supplement.json](maintenance-021/research-supplement.json)
and [maintenance-022/research-supplement.json](maintenance-022/research-supplement.json).
Packets, assemblies, decisions, helper scripts and import journals were working
files and were removed on 23 September 2026. Keep such files in `.content-cache/`
(gitignored), as the `--journal=.content-cache/...` workflow examples below do.

- **021a–c (75 corrections):** the 59 remaining exact duplicate examples each got a
  new, distinct second example (0 remain corpus-wide); 王子, 投手, 〜病, 〜県 moved up
  from N5; part of speech fixed for 王子/投手 (Nomen), しかし, それとも, 何故なら, でも,
  及び, 故に (Ausdruck, the app's conjunction convention), つまり (Adverb), 〜症
  (Partikel, affix convention); headwords エントロピー and ラーメン (alias 拉麺); DNA
  kept (Latin letters are the Japanese orthography) with note and pitch 5; 礼金
  typo. Pitch was re-verified per entry: contradicted values were corrected, and
  values without an exact UniDic row became unknown.
- **021d–g (46 additions):** 27 candidate-backed entries closing 55 candidate
  references (e.g. 嫌う, しまう, 頃, 生き物, 億, 紫, 行ってらっしゃい,
  おめでとうございます, コンピューター, スーパー, ワイン, ドラマ …) and 19
  correction-driven entries (三月, 七月, 八月, 九月, 十一月, 十二月, 何人, 何時,
  バナナ, メール, インターネット, スマホ, 余り, 兆, ぎこちない, もたつく,
  しゃちほこばる, たどたどしい, ぶっきらぼう).
- **022a–c (63 reviews, 15 merges/retirements):** idioms and yojijukugo cleanup.
  Duplicates and variants were retired through redirects (気を付ける, 弘法も筆の誤り,
  実るほど頭が下がる稲穂, 馬の耳に風, 知らぬが花, the idioms copies of 一石二鳥,
  一期一会, 自業自得 and 以心伝心, and 正正堂堂). Invented compounds were retired into
  their closest real entries (起立礼着→お辞儀, 大切気持→気持ち, 右左右左→左右,
  家族全員→家族, 得意技を持て→特技). Non-yojijukugo and non-four-character entries
  were re-typed, 13 literal N5 collocations became Ausdruck, 失敗は成功のもと replaced
  the 母 headword, 鳥肌が立つ moved to N2 and 腰を据える to N1, and three Cyrillic
  letters in romaji were fixed.

- **023a–c (56 corrections, research in [maintenance-023](maintenance-023/research-supplement.json)):** entries whose
  two examples repeated the same Japanese sentence (after NFKC and whitespace removal)
  with only a reworded German translation. Each got a new, distinct second example; where
  the translations showed two senses (首 Hals/Nacken, ぺこぺこ, なかなか, あっさり, 占い,
  繋がる), the new sentence shows the second sense. Pitch was re-checked: 聞こえる 3→0,
  急須 2→0 and 肺 1→0; 13 entries had no row for the exact form and became unknown. 0
  repeated-Japanese example pairs remain.

Runtime: **13,137 entries** (N5 1,616, N4 1,571, N3 3,401, N2 2,531, N1 4,018),
with 15 retired IDs redirected. See [generated coverage](COVERAGE.md) for the
ledger counts. Deferred work: the near-duplicate category merge (163 entries). Every
category-only edit is a consequential full review with a pitch disposition, and 70
of those entries have a pitch that no exact UniDic row supports. The levels of 〜症 and
及び are also deferred: two publishers list both at N1.

The full-corpus request is **not complete**. The risk-based completion gate must fail
until every entry, candidate and pitch investigation meets the acceptance rules.
Mechanical dictionary matches are research leads, not editorial approvals.

## Active review policy — risk-based-v2

New batches use `risk-based-v2`. Existing strict and `risk-based-v1` batches retain
their original rules and hashes. In addition to unchanged entries, the routine
pool permits meaning-preserving German spelling, punctuation, formatting and
wording changes to existing meanings, notes and example translations. Each edit
needs `policy.germanEdit: {preservesMeaning: true, reviewer, finding, beforeHash,
afterHash}` bound to the exact projected before/after content. New notes, new
senses, uncertain equivalence, Japanese, romanization, example count/order,
lexical metadata, aliases and pitch changes still need independent review.
Hydrating provenance for unchanged pitch remains evidence bookkeeping.

The deterministic sample covers accepted unchanged and eligible German edits together,
rounded up to 10% within each fixed packet of at most 25 entries. Substantive
sample defects reopen the entire batch and documented related entries. Teaching
enrichment and pitch investigation requirements remain in force.

Use [generated current coverage](COVERAGE.md) for current ledger counts and
[rollout measurements](ROLLOUT.md) for observed throughput and forecast limits. The
checkpoints below are historical snapshots.

### Reusable batch workflow

`npm run review:vocabulary-batch -- prepare --out=.content-cache/packets.json`
allocates three disjoint 25-entry packets from one queue snapshot. Preserve each
packet verbatim, including its roster, evidence, source hashes and revision heads.
Every allocated entry must have either a final proposal or saved unresolved work;
dropping difficult entries cannot shrink the roster. Unresolved records receive
no coverage and cannot substitute for an independently checked accepted sample.

`assemble --packet=... --proposal=... --out=...` creates the exact final snapshot
before approval. Alternatively `--findings=...` hydrates explicit dictionary
sequence/sense selections and pitch locators using `vocabulary-editorial-record.cjs`.
This helper does not choose senses, certify equivalence, or approve records.

`targets --assembly=...` exports the hashes reviewers must bind. Reviewers inspect
the assembled final content and evidence, then supply explicit per-target
`decision`, `reviewer`, `finding`, `pass`, `assemblyHash`, `contentHash` and
`approvalHash` values to `approve --assembly=... --decisions=... --out=...`.
The tool never generates an acceptance decision. New entry approvals also bind the
entry ID, revision ID, original hash and both predecessor hashes through
`policy.approvalBinding: "entry-identity-v1"`. The three initially sealed v2 batches
013a–013c retain their original hashes through a frozen hash allowlist; it cannot
be extended through authoring data. Changes require reassembly and
fresh affected approvals; no evidence is hydrated after approval.

`import --assemblies=a.json,b.json,c.json --names=scripts/vocabulary-completion/name-a.json,scripts/vocabulary-completion/name-b.json,scripts/vocabulary-completion/name-c.json --journal=.content-cache/wave-journal.json`
validates the complete proposed runtime before writes, retains separate sampling
and history for each batch, and generates coverage from the resulting ledger.
Import one, two or three ready packets without waiting for another worker.
If interrupted, use `import --resume=.content-cache/wave-journal.json`; resume is
idempotent and rejects unexpected external edits. An exclusive writer lock prevents
concurrent imports/recovery; dead owners are recovered automatically. Changes
during validation are rejected before a journal or runtime writes are produced.
Keep the journal until completion.

`prepare --additions=ids.json` allocates a fixed roster of at most 25 new
`vocab-nX:correction:slug` IDs for correction-driven additions (reported missing
words without a historical candidate reference). Each addition still needs a
reason, level basis, German note, two distinct contexts, pitch disposition and
two exact approvals; candidate-backed additions keep using `prepare --candidates`.

An `--ids` proposal may also carry `merges`. The retired entry must be reviewed
in the same packet; the survivor must be accepted there or already. Assembly binds
`fromHash`/`toHash`, and each merge gets its own approval target `merge:<fromId>`
bound by `mergeHash`. A merge normally requires equal readings. An invalid or
variant entry may instead be retired into its closest surviving entry with a
different reading only through an explicit `retirement: {reason, relationship}`,
which is part of the merge hash. Retired IDs redirect bookmarks and deep links.

`prepare --candidates` creates fixed candidate-reference packets with full source
references and cached research. Use `--references=...` with explicit `{key,index}`
records to resume saved research, and `prepare --ids=...` with an ID array for
targeted corrections to already reviewed entries. Candidate references retain
separate editorial decisions and always require independent acceptance.

### Historical risk-based-v1 policy

New work uses the versioned `risk-based-v1` policy. Every entry receives one
content-bound editorial pass. Additions, corrections, ambiguity, changed teaching
content, and a deterministic 10% sample of otherwise routine reviews require an
independent reviewer. The sample uses the fixed seed recorded in the workflow
manifest, so reruns cannot quietly choose easier records. A substantive sampled
error sends the affected batch or shared rule back for review.

Existing adequate teaching material may be retained with one reviewed example and
without a usage note. Additions and entries that need a sense, form, register,
transitivity, or reading distinction still require a German note and two distinct
contexts. Missing optional enrichment is reported separately and does not block
the risk-based gate. `npm run audit:vocabulary-enrichment` retains the former full
note/two-context gate. Historical approvals remain under `strict-full-v1`; their
records, hashes, and requirements are not rewritten.

## Current checkpoint — risk-based follow-up

Batch [010](010-pilot-candidates.json) adds five documented search aliases and
accepts seven individual source references. Four broader-sense references remain
researching. Batch [011](011-n5-124-149.json) accepts another 25 entries, including
six independently reviewed corrections and two routine samples. Current coverage
is **159 accepted / 12,947 pending**, with **3,917 candidate groups / 6,552 source
references unresolved**. Pitch is 158 verified and one investigated unknown.
Batch [012](012-n5-99-123.json) adds 25 accepted reviews, including five corrections
and two routine samples. 大変 gains a separately evidenced adverbial sense with a
German note and two explicitly reviewed distinct contexts. Fourteen related
candidate references retain saved research for later decisions. Total open
references with saved research: 70.
No level is complete and neither completion gate passes.

The importer/correction/workflow suite passed after policy hardening, including
offline replay and 22 rejection-before-write cases. Vocabulary, content, data,
verb and quiz audits, lint, storage, smoke, UI behavior and declared-color contrast
checks passed. UI behavior tests do not claim rendered desktop/mobile acceptance.

## Earlier checkpoint — risk-based pilot

The three 25-entry pilot batches [008a](008a-risk-pilot.json),
[008b](008b-risk-pilot.json), and [008c](008c-risk-pilot.json) accepted 68 entries
and saved seven explicit rejections. [009](009-pilot-corrections.json) resolves
those seven through exact authored corrections and a separate critical review.
All 75 pilot entries are now accepted: 109 accepted entries in total, with 12,997
remaining. Candidate findings for 53 references were saved as research, not final
decisions. The candidate queue remains open. No level is complete.

The final routine sample was selected after removing consequential records:
2 of 17 in shard 1, 3 of 23 in shard 2, and 2 of 19 in shard 3. All seven routine
samples passed. All 16 consequential records received separate review; rejection
and correction remain in the append-only history. The pilot corrected translations
such as 寝る (going to bed) and 遠い (far away), retained attested accent alternatives,
and added four notes where sense or spelling distinctions required explanation.

Queue sample flags are preliminary until editorial risk classification is done.
Allocate every worker from the same queue snapshot; importing one worker's output
before allocating another changes the pending queue positions. Missing cached
forms are explicit research gaps; cached results for a different spelling/reading
are withheld as stale evidence.

## Earlier checkpoint — revision workflow, 22 September 2026

The full requested review remains **unfinished**. One 25-entry checkpoint was
processed: 23 previously unreviewed existing entries, one new entry, and a revision
to the already reviewed 宥す note. There are now **34 accepted entries out of
13,106**, with **13,072 entry reviews** and **3,922 candidate groups / 6,559 source
references** still open. A checkpoint is not a completion milestone.

| Measure | Current count |
| --- | ---: |
| Accepted entries | 34 |
| Pending entry reviews / distinct-context reviews | 13,072 |
| Missing usage notes | 12,415 |
| Fewer than two different Japanese examples | 9,799 |
| Incomplete example fields | 0 |
| Verified / investigated unknown pitch | 33 / 1 |
| Uninvestigated pitch dispositions | 13,072 |
| Unresolved candidate groups / individual references | 3,922 / 6,559 |
| Open candidate references with saved research | 10 |
| Unaccepted proposed additions | 0 |

Current level counts: N5 1,612; N4 1,567; N3 3,388; N2 2,527; N1 4,012.
The level boundaries have not been completed.

The [version 3 manifest](../vocabulary-review-workflow.json) extends, without
rewriting, the historical correction manifest and batches. It pins the previous
manifest and every authoring batch by hash. [003](003-drafts.json) preserves all
25 drafts. [004](004-second-pass.json) records 23 acceptances and two explicit
rejections; [005](005-revisions.json) corrects those rejections;
[006](006-accepted.json) records the further critical pass and three individual
candidate-reference decisions. [007](007-research.json) saves unresolved findings
for ten references across eight related candidate groups. Those findings include
unfiltered dictionary/accent leads and are explicitly **not approvals**.

宥す retains its ID, reading and two examples; the note's plain negative is corrected
from 宥せない to 宥さない. 宥める remains separate. The 22 beginner entries 人 through 読む
retain useful teaching material while receiving full review and exact accent
evidence. The second pass also corrects 会社員 from an overly narrow office-worker
translation to “Angestellter in einer Firma.”

The mixed いくら group is closed reference by reference: the two amount-question
rows point to reviewed 幾ら (`vocab-n3:2932`), while the food row points to new
イクラ (`vocab-n5:correction:ikura-roe`). Their lexical senses and IDs remain
separate, with accent alternatives 0 and 1 documented individually. The food
entry's N5 estimate has only one publisher's support; the uncertainty is recorded,
and the price entry's existing N3 estimate is retained. A kana match is not a
reason to transfer the level or sense from one entry to the other.

## Version 3 authoring and resumption

Run `npm run review:vocabulary-queue` for the next 25 entries, ordered by recorded
confirmed errors, then N5–N1. Within a level, resume existing work before untouched
source positions. Related candidate references include saved research when present.
When entry work is exhausted, the command returns the remaining candidate queue.
Use `node scripts/vocabulary-review-queue.cjs --shard=1/3 --evidence` (and shards
`2/3` and `3/3`) for three non-overlapping worker queues with compact cached
JMdict/UniDic packets. `--limit=N` changes the checkpoint size. These packets are
research leads; the authored record still needs an explicit editorial finding.

Append a new authoring JSON and its hash to the version 3 manifest. Do not edit a
sealed batch, the version 2 manifest, or the baseline. The importer still supports
version 2 in isolation and validates the frozen history before replaying revisions.

Entry revisions in `reviews` contain `id`, unique `revisionId`, `state`,
`predecessorHash` (the previous working content), `predecessorRevisionHash` (the
previous full authoring record, or null for a first review), `originalHash`, exact
`original` values for every changed field, `replacement`, and a rationale.
`additions` introduce an explicit stable ID with `entry` and null predecessor
hashes. Later batches review additions through `reviews`, just like older entries.
New source positions are allocated in first-acceptance order, so accepting an older
draft cannot move a newer entry already imported.

States are `pending`, `researching`, `drafted`, `needs revision`, and `accepted`.
Researching and rejected work must retain traceable `research` records and
`openQuestions`. A later revision must explicitly close those questions before
acceptance. A draft cannot carry an accepted first or second pass. Complete fields
and dictionary matches alone never establish acceptance.

New accepted records include `policy: {id: "risk-based-v1", risk, reasons,
enrichmentRequired, sampled}` and a `firstPass` acceptance with a specific finding,
`contentHash`, and `approvalHash`. Any changed runtime field is consequential.
Consequential and deterministically sampled records also require an accepted
`secondPass` from a reviewer other than `review.reviewer`. Additions use the
`addition` reason and always require enrichment. Use the exported
`entryApprovalHash(record, finalContent)` to bind acceptance to final content,
evidence, review, pitch, and policy. Calculating a hash is bookkeeping, not an
editorial judgment. Older records keep their original second-pass form.
Adding exact provenance for an unchanged pitch value is evidence bookkeeping and
may remain routine. Changing a primary or alternative pitch pattern is
consequential and requires the independent pass.

Only the last accepted snapshot enters runtime patches. A later draft leaves that
runtime snapshot available, but invalidates current review coverage in the ledger
and reopens dependent candidate approvals. An unaccepted addition stays out of the
runtime entirely. Approval checks, source identity checks and complete proposed
runtime validation all happen before writes.

Candidate decisions identify `key`, `referenceIndex`, and the exact `referenceHash`.
Each has its own state, revision chain, disposition, targets, rationale and evidence.
Accepted targets require exact `targetHashes`; decision acceptance uses
`decisionHash(record)` for both second-pass hashes. A group closes only when every
source reference has a current acceptance. Changed target content reopens the
affected reference; missing or retired targets are rejected. Historical group
decisions remain preserved and are represented as their original references.

New merges bind `fromHash` and `toHash` with `mergeHash(record)` and an explicit
second-pass acceptance. Re-reviewing a surviving target requires an appended merge
revision with `predecessorMergeHash`, keeping the same surviving ID and freshly
checking equivalent senses and preserved content. Retired entries cannot receive
new lexical revisions. No merges were made in this checkpoint.

Verification previously passed: vocabulary/content/data/verb/quiz audits; offline and historical
import replay, idempotency, stable identities, 22 rejection-before-write cases;
correction/workflow regressions; lint; storage/smoke/UI/contrast checks. Browser
review covered 30 detail states at 1440/390/320px in both themes, including long
content and verified/alternative/unknown pitch. The **completion gates fail**
with the open counts above, as required. These checks do not certify unreviewed
lexical material or mark a level complete.

## Historical checkpoint — batch 002, 22 September 2026

| Measure | Count |
| --- | ---: |
| Visible entries / ledger rows | 13,105 |
| Fully reviewed under the correction format | 10 |
| Entries awaiting full review, including previously enriched entries | 13,095 |
| Historical completion additions (batch 001) | 6 |
| New additions / merges in batch 002 | 0 / 0 |
| Corrected or enriched entries in batch 002 | 10 |
| Individually resolved spelling candidates in batch 002 | 7 |
| Unresolved candidate forms | 3,923 |
| Missing usage notes | 12,431 |
| Fewer than two examples with different normalized Japanese text | 9,800 |
| Examples missing Japanese, romanization or German | 0 |
| Entries lacking reviewed distinct contexts | 13,095 |
| Verified pitch / investigated unknown pitch | 9 / 1 |
| Pitch awaiting a final investigated disposition | 13,095 |

Level estimates: N5 1,611; N4 1,567; N3 3,388; N2 2,527; N1 4,012.
Different sentence text alone does not prove different situations or uses.

[Batch 002](002.json) corrects 宥す to ゆるす, forgiving/pardoning, godan -す,
and pitch 2. Its ID `vocab-n1:2987` survives. 宥める/なだめる retains its separate
ID `vocab-n1:2461`, ichidan conjugation and verified pitch 3. The batch also repairs
the 明後日 example reading and 幾つ example, records 明るい accents 0 and 3 as
alternatives, and enriches 朝ご飯, 椅子, 浴びる and 如何. 如何 and 幾つ move from N3
to estimated N5 with recorded Tanos/JLPT Sensei evidence. 私 receives a full review
and matched accent provenance while preserving its existing teaching material.

Seven candidate decisions cover 明い, 朝御飯, あさって, あびる, いかが, いくつ and
いす. Each names an individually checked JMdict entry and surviving target. 明い is
explicitly a search-only form, not the recommended spelling. No candidates were
excluded and no homophones were merged. The mixed いくら/イクラ reference group
remains open: its price interrogative and salmon-roe senses cannot be collapsed.

## Immutable history and full coverage

[The original manifest](../vocabulary-completion.json) freezes 13,099 earlier
identities, raw source prefixes and 3,936 candidates. Batch 001 added six entries
and resolved six candidates. These files and the historical review are unchanged.
Seven historically deferred legacy-technology forms remain outside that queue.

[The correction manifest](../vocabulary-correction-review.json) references the
hashed [13,105-entry baseline](baseline-v2.json) and version 2 authoring batches.
The generated [ledger](ledger.json) covers every current entry, including idioms,
four-character expressions and future additions. Complete fields or a version 1
enrichment do not automatically establish review coverage under the expanded scope.

## Version 2 authoring

Each `reviews` record identifies an existing ID and `originalHash`. Its
`replacement` contains changed fields, with exact prior values in `original`
(`null` denotes a previously absent field). An empty replacement is allowed for
a no-change review. An editorial rationale must explain changes. Existing notes
may be replaced when wrong; preservation of good content is an editorial duty,
not a rule that forces incorrect text to survive.

Supported fields include spelling, reading, romanization, meaning, part of speech,
category, level estimate, examples, notes, aliases, conjugation metadata, pitch,
verified variants/provenance, and an explicit `senseKey` for separate homonymous
senses. Level changes require `levelBasis` plus evidence. Nested and effective
conjugation metadata must agree.

Evidence records source, version, locator and finding. Reviews record lexical,
register, transitivity, conjugation, level, German meaning, Japanese examples,
romanization and translation checks. `review.contexts` identifies the situation
or use of every example, with at least two distinct contexts. `secondPass` names
the reviewer, findings and a hash of the final teaching content; stale approvals
are rejected. These are editorial attestations, not an automated accuracy claim.

Each pitch disposition is `verified` or `unknown`, with research rationale,
source/version, locator and attribution. Verified primary and alternative values
must all be attested; provenance must match the exact headword and reading and
explain grammatical form and sense. Unknown pitch must be null; its old value
survives in the correction history. No component accents are combined.

New `additions` carry explicit stable IDs such as
`vocab-n5:correction:descriptive-slug`, full content/review/pitch evidence, a level
basis and reason. A correction-driven addition need not be in the historical
candidate queue. Candidate `decisions` use `added`, `verified-spelling-variant`,
`additional-sense`, `additional-reading`, or `excluded`; they require individual
evidence, rationale, second-pass findings, and reviewed surviving IDs when relevant.

Collisions are rejected before writes. An explicit `merges` record must document
equivalent reading and sense, preserved content, evidence and a second pass.
Both entries require full review. Retired IDs redirect to surviving IDs for
bookmarks, deep links and restored sessions. Cyclic/missing redirects fail.
An independent sense can instead use `senseKey`; shared pronunciation is never
sufficient evidence for a merge.

## Offline import and validation

### Risk-based verification cadence

Every import still validates the entire proposed runtime before any writes.
For ordinary editorial batches, run that validation and check the generated
coverage report. Run focused regressions when importer or policy code changes;
run offline replay, idempotency, historical compatibility and stable-ID checks
at level boundaries. Run the full audits, lint, storage, smoke and UI suite after
pipeline changes and at final completion. Repeating the entire UI suite for each
25-entry content batch is not required.

A failed routine sample escalates the entire originating batch. Persist a
`sampleDefects` record with the affected revision IDs and any named shared-rule
entries. The defect remains open across imports and reopens affected coverage.
Only a later append with newer, exact independent approvals for every affected
entry can clear it. Shared-rule membership is an editorial assertion; validation
checks the listed entries, but cannot discover omitted linguistic relationships.

The strict enrichment report credits historical strict reviews and explicit
`review.reviewedDistinctContexts: true` attestations on enrichment-required risk
reviews. Different context labels alone do not establish distinct teaching uses.

Run `npm run import:vocabulary-completion -- --dry-run`, then the same command
without `--dry-run`. The importer validates the entire proposed runtime before
writing. Corrections apply after historical normalization, conjugation metadata
and example overrides; raw source spelling/order remain intact. Imports need no
network or research cache. Both historical importers retain corrections on replay.

`npm run report:vocabulary-completion` verifies committed runtime and ledger and
reports open work. `npm run audit:vocabulary-completion` additionally requires
zero unreviewed entries, unresolved candidate references, incomplete retained
examples, missing policy-required enrichment and uninvestigated pitch. Investigated
unknown pitch and optional enrichment gaps are counted separately. Run
`npm run audit:vocabulary-enrichment` for the historical all-notes/two-context rule.

`npm run test:vocabulary-completion` exercises dry run, idempotency, offline and
historical replay, rejection before writes, stable IDs, collisions, redirects,
independent senses, correction-driven additions, replaced notes, pitch, and
no-change reviews. Production is the intentionally incomplete fixture; a small
completed fixture also passes the same gate. Vocabulary, content, data, verb and
quiz audits are regressions, not substitutes for the gate or editorial review.

## Research reproduction

Export `loadVocabulary().items` to `.content-cache/correction-inventory.json`.
With cached `JMdict_e.gz`, run `python scripts/research-vocabulary-dictionary.py`.
The parser respects reading restrictions, sense spelling/reading restrictions,
and inherited parts of speech. Dictionary findings are separate from approvals.

Download the exact archive linked in batch 002 to
`.content-cache/unidic-cwj-202512.zip`, then run
`python scripts/research-vocabulary-pitch.py`. It validates the binary header and
feature schema, extracts actual written-form/kana rows and retains grammatical
forms, accent types and byte locators. It performs no speech synthesis or phrase
accent prediction. The archive is research input, not an application dependency.

The initial scan of all 13,105 pre-correction entries found 11,915 restricted
JMdict matches and 9,415 exact UniDic rows. Of all 3,936 historical candidates,
3,744 had JMdict matches and 3,356 had UniDic rows. These include already resolved
candidates and are **not** completion counts. Gaps/conflicts and every entry's
German teaching content still require individual investigation/review.

UniDic 2025.12 is attributed to the National Institute for Japanese Language and
Linguistics under its [modified BSD license](UNIDIC-LICENSE.txt). JMdict is
attributed to EDRDG; see [source documentation](../../CONTENT-SOURCES.md).

## Verification at this checkpoint

Vocabulary, content, data, verb and quiz audits; completion importer/correction
tests; lint; storage, smoke, UI and contrast tests passed. The completion audits
failed intentionally with the open counts above; the progress audit passed.
Browser checks covered 18 detail states at 1440/390/320px in both themes with no
horizontal overflow. Representative long notes/examples and pitch states were
visually inspected; see [UI verification](../../UI-VERIFICATION.md).
