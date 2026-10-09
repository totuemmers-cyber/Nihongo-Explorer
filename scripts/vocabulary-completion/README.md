# Vocabulary correction and completion

## Full enrichment campaign (3 October 2026)

The user explicitly requested full coverage and enrichment, delivered in N5 → N4 →
N3 → N2 → N1 phases with parallel authors and an independent reviewer. The new
campaign is recorded in [campaign status](campaign-status.json); its immutable
[baseline](campaign-baseline-20261003.json) contains 15,558 existing identities and
1,944 unresolved candidate references. The old freeze and quality sweep remain
historical records.

Each entry needs a specific German usage note and at least two semantically
distinct Japanese example contexts, with Modified Hepburn and complete German
translations. Previously accepted entries missing this enrichment re-enter the
queue. The user removed mandatory independent review on 4 October 2026.
New work uses `author-only-v1`: each teaching change, addition, source decision
and merge requires exact-content author approval; an independent second pass
is optional. Every note, example, selected sense, role and pitch claim still
needs source-backed author review and validation. No dictionary hit or generated
template constitutes acceptance. The policy change is recorded in campaign
status; sealed historical records keep their original independent approvals.

From batches 066–067 through checkpoint 166a, each parallel author performed
and recorded the first editorial inspection under their own reviewer identity. This included
reading every assembled final entry and checking its selected source evidence;
the first pass was an author self-review. A separate reviewer independently
inspected every entry and supplied the second pass. Future authors supply the
single required approval themselves. The root agent binds actual decisions,
resolves findings, and owns serialized imports and verification.

Use `npm run report:vocabulary-completion -- --level=N5` for current counts and
`npm run audit:vocabulary-enrichment -- --level=N5` to gate that phase. The normal
global audit commands continue to gate the entire library. Shared candidate groups
belong to the earliest reference level or current target-entry level, including
targets allocated by later decisions; historical
target levels are used only when no current entry exists. For shared groups,
all their references must resolve before that phase passes. Investigated unknown
pitch is allowed; uninvestigated pitch is not.

The CLI queue and packet preparation default to the active campaign's level and
include accepted entries still needing enrichment. Use explicit `--level=N4
--enrichment` for a scoped inspection. Imports remain serialized and recovery-safe.
See [current coverage](COVERAGE.md) and [batch workflow](../vocabulary-batch.md).

The [priority N5 research findings](research-n5-priority-20261004.json) preserve
the six difficult source cases researched on 4 October: exact frozen references,
original publisher and primary dictionary locators, inspected-source hashes,
positive lexical findings and the evidence still needed. These are dated research
snapshots; current acceptance and coverage come from the review ledger. Inaccessible
historical material is recorded explicitly so a search-index lead cannot become
an asserted source inspection.

The [remaining N5 research snapshot](research-n5-remaining-20261004.json)
records all 14 references still open after batch 158, including the whole
publisher meaning, positive partial evidence and the specific proof gap for
each reading and role. It also identifies fetched articles that resolved to a
different headword. The [N4 quality findings](research-n4-quality-20261004.json)
retain targeted follow-ups discovered while correcting queue selection, and
record the independently reviewed club/crab scope repair in batch 156.
The [renewed 上／じょう investigation](research-jou-governmental-20261004.json)
adds the original university-hosted Hepburn scans and distinguishes their
しょう ruler-title evidence from the selected じょう reading and the still-open
governmental scope. Research findings describe discovery-time content;
explicit later resolutions supersede them.

The [resolved inflected-adverb investigation](research-adverb-inflection-20261004.json)
records four accepted cards whose UniDic lexical accent evidence needed a check
against the realized adjective form. Exact OJAD く-form cells support all retained
primary accents and variant 1. Appended batch 149d replaces the misleading proof,
adds three missing variants and supplies whole-expression conjugation metadata
for お世話になる, with fresh author and independent reviews. Historical approvals
and good existing teaching remain preserved.

After a passing level gate and full test suite, run
`node scripts/vocabulary-campaign.cjs advance` to advance the campaign. It validates
the actual runtime, ledger and immutable baseline, rechecks every earlier phase,
and refuses to advance with open content or research. The last phase additionally
requires global strict completion. `advance --dry-run` performs the same gates
without writing. Enrichment changes may reopen historical candidate approvals
because their target hashes include teaching content; refresh those references
against the final reviewed entries before certifying the affected phase.

The first verified checkpoint, batches 055–059, enriches 227 existing N5 entries,
adds 字引 with two examples, and resolves six candidate references. It is a partial
checkpoint: no level is certified complete. Live remaining counts are in
`COVERAGE.md`; sealed earlier batches retain their original evidence and approvals.

The second verified checkpoint, batches 060–065, enriches 300 further existing
N5 entries, bringing this campaign to 527 original entries plus 字引. It resolves
ten more baseline candidate references (16 in total) and refreshes ten historical
spelling approvals after their target teaching content changed. Re-reviews are
not counted as new entries. All 21 full checks pass; the second generated replay
is identical, all 15,558 original identities remain, and comprehension/audio
payloads are unchanged. Browser inspection covers 390/1440 widths in both themes,
verified and investigated unknown pitch, nine alias searches and addition
deep-link refresh. N5 remains active and incomplete; N4–N1 are pending.

The third verified checkpoint, batches 066–072 and 082, enriches 300 further
N5 entries and reviews targeted spelling/note updates for five more original
entries (one N5 and four existing higher-level lexemes needed for N5-owned
references). This campaign now covers 832 unique original entries plus 字引;
repeat revisions are counted once. It closes 88 more baseline references,
104 in total, and renews four historical merge approvals while preserving all
16 existing redirects. All 21 full checks pass, generated replay is identical,
and all original IDs, headwords, readings and levels remain. Comprehension/audio
payloads are unchanged. Browser inspection covers 390/1440 widths, both themes,
verified/variant/unknown pitch, 14 spelling searches, note display and card
deep-link refresh. N5 remains active: 593 missing notes, 700 pending reviews,
749 entries lacking two reviewed contexts, and 458 unresolved references.
N4–N1 remain pending; this checkpoint does not certify a level.

The fourth verified checkpoint, batches 073–074, 076a and 085–088, enriches
175 further original N5 entries. The campaign now covers 1,007 unique original
entries and three additions; repeat revisions are counted once. The two new
entries distinguish an older geographical meaning of 州・しゅう from the modern
administrative sense, and 節倹・せっけん (thrift) from 石鹸 (soap). Their placement
and usage qualifications are explicit editorial estimates. Spelling aliases
and notes close 22 more frozen references, 126 in total. All 21 full checks
pass, generated replay is identical, and all 15,558 original IDs, headwords,
readings and levels remain. Comprehension/audio payloads are unchanged. Browser
inspection covers 28 detail states and their notes at 390/1440 widths in both
themes, verified/variant/unknown pitch, 18 spelling searches and new-card
deep-link refresh. N5 remains active: 418 missing notes, 537 pending reviews,
574 entries lacking two reviewed contexts, and 436 unresolved references.
N4–N1 remain pending; this checkpoint does not certify a level.

The fifth verified checkpoint, batches 075ab, 076bc, 078a and 089–091,
enriches 125 further N5 cards and 11 original higher-level cards needed for
N5-owned affix and suru-verb references. The campaign covers 1,143 unique
original entries and three additions; repeated spelling/note revisions count
once. It resolves 23 further frozen references, 149 in total. Five narrowly
validated publisher-notation formats preserve the frozen references and bind
the exact normalized spelling/reading to both reviews. Existing strict spelling
checks remain unchanged. Infrastructure and individual teaching/source reviews
passed independent review. All 21 full checks pass, generated replay is identical,
and all original 15,558 IDs, headwords, readings and levels remain. Reading/audio
payloads are unchanged. Browser inspection covers 32 detail states with notes
at 390/1440 widths in both themes, 13 spelling searches, three attested pitch
variants, unknown affix pitch, an adverb classification and deep-link refresh.
N5 remains active: 293 missing notes, 418 pending reviews, 449 entries lacking
two reviewed contexts, and 413 unresolved references. N4–N1 remain pending;
this checkpoint does not certify a level.

The sixth verified checkpoint, batches 075c, 077ab, 078bc, 080a and 092–095,
enriches 150 further N5 cards and four original higher-level verb cards needed
for N5-owned references. This campaign now covers 1,297 unique original entries
and five additions. Two new complete suru verbs, 運動する and 食事する, retain
the existing nominal cards and use explicit estimated N4 placement. Repeated
spelling and note revisions count once. It closes 27 further frozen references,
176 in total. Exact source reading separators, canonical suffix searches,
qualified spelling variants, part-of-speech labels and a complete-verb accent
were independently reviewed. All 21 full checks pass after updating the Tokyo
UI assertion for the reviewed proper-name capitalization; search also checks
uppercase macrons. Generated replay is identical and all 15,558 original IDs,
headwords, readings and levels remain. Reading/audio payloads are unchanged.
Browser inspection covers 36 detail states with notes at 390/1440 widths in both
themes, 15 searches, verified and investigated unknown pitch, suffix labels,
new-verb conjugation controls and new-card deep-link refresh. N5 remains active:
168 missing notes, 276 pending reviews, 299 entries lacking two reviewed
contexts, and 386 unresolved references. N4–N1 remain pending; this checkpoint
does not certify a level.

The seventh verified checkpoint, batches 077c, 079ab, 080bc and 096–098,
enriches 125 further N5 cards and the original N2 tasty adjective 旨い needed
for two N5-owned references. The campaign now covers 1,423 unique original
entries and five additions. Repeated alias and usage revisions count once.
Ten further frozen references are resolved, 186 in total. 度 now explicitly
teaches both degrees and occurrence counting with a separate third example;
後 covers spatial behind as well as temporal after/later. Qualified searches
include the canonical suffix spellings, subtraction without written okurigana,
the rare demonstrative 彼の/あの and delicious うまい. The tasty adjective keeps
its distinct meaning from skilled 上手い and explains its retained Kansai
invitation. All 21 full checks pass. Generated replay is identical; all 15,558
original IDs, headwords, readings and levels remain, with reading/audio files
unchanged. Browser checks cover 36 detail states with notes at 390/1440 widths
in both themes, six searches and enriched-card deep-link refresh; representative
meaning and usage screens were visually inspected. N5 remains active: 113
missing notes, 154 pending reviews, 174 entries lacking two reviewed contexts,
and 376 unresolved references. N4–N1 remain pending; this checkpoint does not
certify a level.

The eighth verified checkpoint enriches the remaining 174 original N5 cards
plus four further original entries needed for N5-owned source references. The
campaign now covers 1,601 unique original entries and 35 additions; repeat
revisions count once. It resolves 59 further frozen references, 245 in total.
Alternate readings receive separate cards with their own meanings, examples
and investigated pitch; counter and particle entries retain unknown pitch
where whole-form evidence does not support a contour. Qualified spelling
searches distinguish material hardness, reliability, animal taming and
empty/free space. Shared final okurigana and alternative-reading source
notation bind every actual form to a separately reviewed current target.
The historical duplicate redirect remains, with its approval renewed against
the updated survivor. Three appended canonical verb metadata renewals retain
the reviewed teaching and exact irregular overrides; packaging now rejects
missing or conflicting canonical metadata before editorial approval.
All 21 full checks pass. Generated replay is identical, all 15,558 original
IDs/headwords/readings/levels are preserved and reading/audio files are
unchanged. Browser checks cover 84 detail and 84 note states at 390/1440
widths in both themes, 21 searches and refreshed card/duplicate deep links;
representative screens were visually inspected. N5 now has no missing notes,
pending entry reviews, missing second reviewed contexts or uninvestigated
pitch. Its 317 unresolved source references still keep the phase active;
N4–N1 remain pending and this checkpoint does not certify a level.

The ninth verified checkpoint adds 46 fully reviewed reading and grammatical-role
cards and resolves 64 further frozen references. Campaign totals are 1,603 unique
original entries enriched, 81 additions and 309 frozen references resolved.
Distinct readings and noun, prefix, suffix, counter and particle uses retain
separate teaching, IDs and investigated pitch. The verb-forming がる and the
acceleration unit ガル remain separate despite their matching normalized sound.
Qualified pronoun spellings and hanging/time/cost contexts extend existing cards.
The frozen source notation 見る 観る preserves its literal space and binds both
complete spellings to their separately reviewed cards.
All 21 full checks pass. A repeated build leaves all eight generated files
identical; all 15,558 original IDs/headwords/readings/levels and the four
comprehension/audio payloads remain intact. No campaign source approval reopens.
Browser verification covers 55 cards in 220 detail and note states across
390/1440 widths and both themes, all their current examples and notes, 55
searches, refreshed deep links and the historical duplicate redirect. Eight
representative cards have 32 detail and 32 note screenshots; representative
mobile/desktop screens in both themes were personally inspected.
All 1,665 current N5 cards have complete reviewed teaching and investigated
pitch. The remaining 253 source references across 182 groups keep N5 active;
N4–N1 remain pending. This checkpoint does not certify a level.

The tenth verified checkpoint adds 20 fully reviewed reading and grammatical-role
cards and resolves 59 further frozen references. Campaign totals are 1,605 unique
original entries enriched, 101 additions and 368 frozen references resolved.
Counters, honorific and nationality affixes, particles, alternate readings and
radio vocabulary receive their own teaching and investigated pitch. Separate
calendar-day and Sunday uses, and the metre unit and measuring-device use, retain
distinct cards. Original headwords, readings, levels and progress IDs remain.
Parallel complete kana alternatives now bind their exact separate reviewed
targets. A second bounded format recognizes two or three complete readings
separated by one literal ASCII space; malformed lists continue to fail. The
frozen truncated radio reference is excluded with positive original-PDF evidence,
while both genuine whole radio forms are independently reviewed additions.
All 21 full checks pass. A repeated build leaves all eight generated files
identical; all 15,558 original identities and the four comprehension/audio
payloads remain intact. No campaign source approval reopens.
Browser verification covers 44 cards in 176 detail and note states across
390/1440 widths and both themes, their exact current teaching, 44 searches,
refreshed deep links and the historical duplicate redirect. Eight representative
cards have 32 detail and 32 note screenshots; eight varied mobile/desktop screens
in both themes were personally inspected.
All 1,683 current N5 cards have complete reviewed teaching and investigated pitch.
The remaining 194 source references across 140 groups keep N5 active; N4–N1 remain
pending. This checkpoint does not certify a level.

The eleventh verified checkpoint adds 27 fully reviewed reading and grammatical-role
cards and resolves 47 further frozen references. Campaign totals are 1,606 unique
original entries enriched, 128 additions and 415 frozen references resolved.
Formal date readings, counters, affixes and qualified alternate spellings receive
complete German teaching, distinct contexts and investigated pitch. Separate
noun and affix uses retain their own evidence; an unknown affix accent does not
inherit the corresponding noun's contour. The spoken reading ゆう uses standard
いう conjugations, verified in the browser as いいます, いわない, いって and いった.
Original headwords, readings, levels and progress IDs remain intact.
A bounded kana-orthography format recognizes only full same-pronunciation
じ/ぢ and ず/づ spelling pairs with unchanged source word and exact reviewed target.
It cannot repair missing voicing or change a reading. Original publisher PDFs,
official spelling guidance and primary lexical evidence document source errors,
including a wrapped verb ending incorrectly parsed as a separate す reference.
All 21 full checks pass. A repeated build leaves all eight generated files
identical; all 15,558 original identities and the four comprehension/audio
payloads remain intact. No campaign source approval reopens.
Browser verification covers 41 cards in 164 detail and note states across
390/1440 widths and both themes, exact current teaching, 41 searches,
refreshed deep links and the historical duplicate redirect. Eight representative
cards have 32 detail and 32 note screenshots; eight varied mobile/desktop screens
in both themes were personally inspected.
All 1,686 current N5 cards have complete reviewed teaching and investigated pitch.
The remaining 148 source references across 102 groups keep N5 active; N4–N1 remain
pending. This checkpoint does not certify a level.

The twelfth verified checkpoint adds 25 fully reviewed reading and grammatical-role
cards and resolves 43 further frozen references. Campaign totals are 1,609 unique
original entries enriched, 153 additions and 458 frozen references resolved.
Independent garden, appearance and undiluted-product nouns remain distinct from
their bound affix uses. Literary verb readings receive their own source-backed
conjugations: 入るいる, 来るきたる, 剃るする and 出切るできる use their correct
Godan paradigms rather than the familiar verbs with similar spellings or readings.
The historically restricted 得るうる reading has explicit German teaching and is
excluded from generic conjugation drills. Source-linked alternate spellings and
gloss corrections preserve the immutable publisher metadata and original cards.
All 21 full checks pass. A repeated build leaves all eight generated files
identical; all 15,558 original identities and the four comprehension/audio
payloads remain intact. No campaign source approval reopens.
Browser verification covers 33 cards in 132 detail and note states across
390/1440 widths and both themes, exact current teaching, 33 searches,
refreshed deep links and the historical duplicate redirect. Eight representative
cards have 32 detail and 32 note screenshots; eight varied mobile/desktop screens
in both themes were personally inspected. Independent expected-form checks also
verify the four alternate verb paradigms and the restricted 得るうる drill behavior.
All 1,686 current N5 cards have complete reviewed teaching and investigated pitch.
The remaining 105 source references across 75 groups keep N5 active; N4–N1 remain
pending. This checkpoint does not certify a level.

The thirteenth verified checkpoint adds 19 fully reviewed reading and grammatical-role
cards and resolves 29 further frozen references. Campaign totals are 1,610 unique
original entries enriched, 172 additions and 487 frozen references resolved.
The original sibling card gains a qualified 姉妹 spelling, and 憎い receives complete
German usage teaching, distinct dislike and admiration contexts and a qualified
悪い spelling. Both original identities and levels remain intact. New reading cards
distinguish technical colour, vacant rooms, literary descriptions, proximity,
empty contents, drinking cups, comparative superiority and bound suffixes.
Every selected lexical role has its own pitch evidence or an investigated unknown;
compound accents and another reading's grammatical role are not transferred.
All 21 full checks pass. A repeated build leaves all eight generated files
identical; all 15,558 original identities and the four comprehension/audio
payloads remain intact. No campaign source approval reopens.
Browser verification covers 26 cards in 104 detail and note states across
390/1440 widths and both themes, exact current teaching, 26 head searches and
five qualified spelling searches, refreshed deep links and the historical duplicate
redirect. Eight representative cards have 32 detail and 32 note screenshots;
eight varied mobile/desktop screens in both themes were personally inspected.
Independent expected-form checks verify 弾くはじく as はじきます, はじかない,
はじいて and はじいた.
All 1,686 current N5 cards have complete reviewed teaching and investigated pitch.
The remaining 76 source references across 54 groups keep N5 active; N4–N1 remain
pending. Ambiguous source scopes remain open for further primary research.
This checkpoint does not certify a level.

The fourteenth verified checkpoint imports independently reviewed batch 139a:
12 reading and grammatical-role cards, 26 examples and 14 more resolved frozen
references. Campaign totals are 1,610 unique original entries enriched, 184
additions and 501 of the 1,944 frozen references resolved. The library has 15,742
entries. Existing cards are unchanged. The independent grade/volume noun and
bound standpoint suffix for 上・じょう have separate sense keys; the unresolved
governmental meaning in the TANOS reference remains open. 道・どう also remains
open until natural road contexts for that exact selected reading are established.
Six additions have verified pitch and six have explicitly investigated unknown
pitch; 17 original UniDic byte rows were checked for head, reading and role.
All 21 full checks pass. Repeated generation is identical, all 15,558 original
identities and levels survive, and the four comprehension/audio payloads remain
unchanged. Browser verification covers 38 cards in 152 detail and note states at
390/1440 widths in both themes, 38 head searches, five qualified aliases,
pronunciation-button reading selection, conjugations, refreshed new-card and
existing-card deep links, and the historical redirect. Eight representative cards
have 32 detail and 32 note captures; eight varied captures were visually inspected.
N5 teaching is complete for all 1,686 current cards, but 62 references across 44
groups keep N5 active. No earlier accepted reference reopens. N4–N1 enrichment
remains open; live counts are in COVERAGE.md. This checkpoint certifies no level.

The next verified checkpoint (164a) reviews 223
further unique original N4 entries, adds 45 justified cards and closes
67 frozen references.
The library has 15,787 entries. Campaign totals
are 1,833 original entries reviewed,
229 additions and 568 of 1,944 frozen
references resolved. Original-entry totals count unique campaign reviews,
including improvements to previously complete teaching; repeats count once.
This checkpoint closes 183 missing usage-note requirements
and 187 missing requirements for two reviewed contexts.
The exact 23-batch roster is recorded in campaign status.

Every teaching change and source decision has exact author and independent
approval. 36 earlier accepted references and
one historical merge approval were
renewed against their final targets; no accepted reference reopened. Good
existing examples and all original identities, headwords, readings and levels are preserved.
The retired-card queue defect is fixed in both modes without changing redirects.
Survivor edits now allocate an exact merge-renewal roster through the batch tool;
stale snapshots, changed predecessors and retargeting are rejected.
The verb audit now honors explicitly reviewed noun roles while checking retained
metadata, runtime role equality and correct conjugations for complete verbs.

All 21 full checks pass. A second generation leaves eight generated files
identical; all 15,558 original identities survive, and comprehension/audio
payloads remain unchanged. Edge verifies 312 cards in
1248 detail and note states at 390/1440 widths in both
themes, with all qualified aliases, verified/variant/unknown pitch,
pronunciation reading selection, conjugations, distinct same-reading sense
refreshes, historical redirects and saved bookmarks. Eight representative
cards have 32 detail and 32 note captures; eight varied captures were personally
inspected. Completion audits and phase gates remain open with the counts below.
N5 remains the active level; this checkpoint certifies no level.

| Level | Missing notes | Missing two reviewed contexts | Open references |
| --- | ---: | ---: | ---: |
| N5 | 0 | 0 | 14 |
| N4 | 1270 | 1361 | 296 |
| N3 | 3225 | 3379 | 438 |
| N2 | 2389 | 2513 | 276 |
| N1 | 3869 | 4013 | 352 |

The next verified checkpoint (166a) reviews 75
further unique original N4 entries, adds 4 justified cards and closes
5 frozen references.
The library has 15,791 entries. Campaign totals
are 1,908 original entries reviewed,
233 additions and 573 of 1,944 frozen
references resolved. Original-entry totals count unique campaign reviews,
including improvements to previously complete teaching; repeats count once.
This checkpoint closes 75 missing usage-note requirements
and 75 missing requirements for two reviewed contexts.
The exact 5-batch roster is recorded in campaign status.

Every teaching change and source decision has exact author and independent
approval. No accepted reference reopened. These five packets have no affected
earlier accepted source or merge targets requiring renewal. Good existing examples
and all original identities, headwords, readings and levels are preserved.
The four-case inflected-adverb research finding is resolved through appended,
independently reviewed corrections using exact realized OJAD forms. Supported
primary accents remain unchanged; attested variants and truthful provenance
are included. The complete expression お世話になる now has canonical Verb
metadata and whole-reading conjugations. Existing teaching is preserved.

All 21 full checks pass. A second generation leaves eight generated files
identical; all 15,558 original identities survive, and comprehension/audio
payloads remain unchanged. Edge verifies 133 cards in
532 detail and note states at 390/1440 widths in both
themes, with all qualified aliases, verified/variant/unknown pitch,
pronunciation reading selection, conjugations, distinct same-reading sense
refreshes, historical redirects and saved bookmarks. Eight representative
cards have 32 detail and 32 note captures; eight varied captures were personally
inspected. Completion audits and phase gates remain open with the counts below.
N5 remains the active level; this checkpoint certifies no level.

| Level | Missing notes | Missing two reviewed contexts | Open references |
| --- | ---: | ---: | ---: |
| N5 | 0 | 0 | 14 |
| N4 | 1195 | 1286 | 291 |
| N3 | 3225 | 3379 | 438 |
| N2 | 2389 | 2513 | 276 |
| N1 | 3869 | 4013 | 352 |

**N5 certified (5 October 2026).** Batch [167a](167a-full-n5.json) closes the last
14 N5-owned references under the new kanji-reading-row rule (see "Kanji-reading
rows" below): twelve exclusions and two `additional-sense` mappings to the
existing 上/じょう and 佚/いつ cards. All 22 full checks passed, `advance --dry-run`
passed, and the campaign advanced from N5 to N4.

**First N4 checkpoint after the advance (5 October 2026).** Batches 168a–168k
(`author-only-v1`, author first pass only) enrich 250 existing N4 entries
(vocab-n4:160–445 in queue order). Each entry has a German usage note and 2–3
examples covering distinct situations; 368 new example sentences are written in
Modified Hepburn. The pitch of 221 entries is verified, 194 from exact UniDic rows
filtered by part of speech and 27 from exact OJAD dictionary-form cells. Eighteen
stored primary accents were wrong and are corrected, e.g. 花見 0→3 and 嫌がる 0→3.
The remaining 29 entries are investigated unknowns with their UniDic and OJAD
queries recorded; a direct sys.dic rescan confirmed that UniDic has no whole-word row
for these compounds. Batch 168k corrects 退屈 and 贅沢: their な-adjective rows
(サ変形状詞可能) had first been rejected, and they are now verified (0; 3/4). Twenty-five German meanings were corrected, e.g. 幼稚園
„Vorschule“→„Kindergarten“ and 保育園 „Kindergarten“→„Kita“. No source references
were resolved in this checkpoint. N4 now has 1,036 pending reviews and 291 open
references.

**Second N4 checkpoint (5 October 2026).** Batches 169a–169j (`author-only-v1`, author
first pass only) enrich the next 250 N4 entries (vocab-n4:446–747 in queue order), each
with a German usage note and 2–3 examples in distinct situations; 388 new example
sentences are written in Modified Hepburn, and 49 entries get corrected original examples.
The pitch of 220 entries is verified, 211 from exact UniDic rows and 9 from exact OJAD
dictionary-form cells; 40 stored primary accents are corrected, e.g. 握る 2→0, 運命 3→1
and 頬 0→1. UniDic rows of a homographic other lemma are no longer accepted: 一位 has
only a yew-tree row (lemma いちい) with an accent, so it stays an investigated unknown
with 29 other compounds and set phrases. Six nouns typed as Adjektiv (売り切れ, 本物, 一位,
首位, 初級, 中級) are corrected to Nomen, the card romaji of ぼんやり and 片付く to bon'yari
and katazuku, and 39 German meanings are corrected, e.g. 啜る „schlüpfen“→„schlürfen“ and
改札 „Schranke“→„Fahrkartensperre“. No source references were resolved in this checkpoint.
N4 now has 786 pending reviews and 291 open references.

**N4 enrichment completed (5 October 2026).** Batches 170a–170j, 171a–171j and
172a–172l (`author-only-v1`, author first pass only) enrich the remaining 786 N4-level
entries from one queue snapshot: vocab-n4:748–1469 plus the N4-levelled vocab-n3 (47),
vocab-n2 (43) and vocab-n1 (1) cards, 40 idioms and 8 yojijukugo. Each entry has a
German usage note and 2–3 examples in distinct situations; 1,105 new sentences are
written in Modified Hepburn and 295 entries get corrected original examples. The pitch
of 572 entries is verified (532 from exact UniDic rows, 40 from exact OJAD cells),
correcting 76 stored primary accents and filling 72 previously unset ones; 214 entries,
mostly compounds, set phrases and idioms, are investigated unknowns. Two role rules were
tightened: Partikel cards accept only particle or suffix rows (程 no longer takes the
noun accent), and だから/ちゃん are recorded unknowns because their only accented rows
belong to other words (the rendaku form of 宝, the adverb ちゃん). Seventy-one cards
get a part-of-speech correction, mostly nouns typed as Adjektiv (母親, 学期, 商人, the
pronouns 彼ら/俺/俺ら) to Nomen, following the N5 precedent; 立入禁止 becomes Ausdruck.
Suru nouns typed Verb (e.g. 安売り, 急行) keep the project convention. 140 German
meanings are corrected, e.g. 目を閉じる „etwas ignorieren“→„(verhüllend) sterben“
(the ignoring sense is 目をつぶる). 新宿 has no JMdict_e entry and records that scan
instead of a sense. No source references were resolved. N4 now has 0 pending reviews;
its 291 open references remain before the level can be certified.

**N4 certified (5 October 2026).** Batches 173a–174p (`author-only-v1`) close all 291
N4-owned source references. Six parallel triage passes decided each row from JMdict and
the current cards; the decisions are 137 `verified-spelling-variant`, 18
`verified-source-notation` (15 nominal-verb, plus misplaced-reading and
parallel-alternatives rows), 4 `additional-sense`, 32 `additional-reading`, 67 `added`
and 29 `excluded`. Wave A (173a–173h) reviews 108 existing target cards first: 91 gain
reviewed spelling aliases only (110 aliases, e.g. うそ on 嘘, 起す on 起こす), and 17 are
rewritten: 12 never-reviewed targets (e.g. 駄目, 暫く, 是非, 準備する) get full enrichment,
邪魔 gets the note and examples its earlier review lacked,
and 4 gain a sense (舐める „unterschätzen“, 喧嘩 as a verb, なんとか „Soundso“, 弁 „Rede“).
Wave B (174a–174p) adds 70 new cards (22 N4, 17 N3, 10 N2, 21 N1). They include
missing suru verbs such as 計画する, 支度する and 承知する, alternative readings such as
工場/こうば, 頬/ほほ and 十分/じっぷん, affixes such as 〜料, 〜員 and 不〜, and words like
菓子, 礼, ばかり and まま. Their pitch is verified for 47 of them; 23 are investigated
unknowns. The 29 exclusions are 19 source errors (garbled readings such as 途中/つちゅう,
glosses of another word such as 重なる/おもなる „main“ = 主な), 3 kanji-reading rows and
7 archaic, dated or rare readings that JMdict tags as such or lists without any
priority (末/うら, 悪口/あっこう, 商人/あきうど). Changing a target card makes earlier
decisions that point at it stale, so 41 accepted decisions at every level (N5 2, N4 8,
N3 16, N2 5, N1 10) were renewed unchanged against the current targets. Pitch research now
uses only rows of the card's own lemma (its headword or an alias): when that lemma exists
in UniDic without an accented row in the card's role, rows of homographic other lemmas are
not used (よう: 八/用 rows; 一位: yew tree). All 22 full checks pass; `advance --dry-run`
passed and the campaign advanced from N4 to N3.

**First N3 checkpoint (5 October 2026).** Batches 175a–175j, 176a–176j and 177a–177j
(`author-only-v1`, author first pass only) enrich 750 N3-level entries from one queue
snapshot (mostly vocab-n3:1–641, plus N3-levelled cards from other lists, a few idioms
and yojijukugo). Each has a German usage note and 2–3 examples in distinct situations;
1,492 new sentences are written in Modified Hepburn and 101 entries get corrected original
examples. The pitch of 608 entries is verified (530 UniDic, 78 OJAD), correcting 61 stored
primary accents; 142 are investigated unknowns. Pitch research uses the own-lemma rule from
batch 174, with aliases counted as the card's own forms. 101 German meanings are corrected
(e.g. 被害 „Opfer“ removed — that is 被害者; 申請 „Bewerbung“ → „Beantragung“; 発想 „Einfalt“
→ „Einfall“), and 紫色 and 我 are retyped from Adjektiv to Nomen. Four survivors of historical
duplicate merges (特技, 一石二鳥, 自業自得, 実るほど頭を垂れる稲穂かな) were re-reviewed, so their
merge approvals were renewed after checking that the preserved coverage still holds.
No source references were resolved. N3 now has 2,621 pending reviews and 422 open references.

**Second N3 checkpoint (5 October 2026).** Batches 178a–178j, 179a–179j and 180a–180j enrich
the next 750 N3 entries (vocab-n3:642–1422 in queue order) with German usage notes and 2–3
examples in distinct situations: 1,538 new sentences, 127 entries with corrected original
examples. The pitch of 648 entries is verified (639 UniDic, 9 OJAD), correcting 94 stored
primary accents; 102 are investigated unknowns. 71 German meanings are corrected (e.g. 羨望
no longer „Eifersucht“ — that is 嫉妬; 甘酒 „Amazake, süßes Reisgetränk“; 教壇 „Podium“), 大幅
is retyped Adverb → Adjektiv and 洗練 Adjektiv → Nomen. No source references were resolved.
N3 now has 1,871 pending reviews and 422 open references.

**Third N3 checkpoint (6 October 2026).** Batches 181a–181j, 182a–182j and 183a–183j enrich
the next 750 N3 entries (vocab-n3:1423–2217 in queue order) with German usage notes and 2–3
examples in distinct situations: 1,521 new sentences, 120 entries with corrected original
examples. The pitch of 551 entries is verified from exact UniDic rows, correcting 110 stored
primary accents; 199 are investigated unknowns, mostly multi-part compounds and set phrases
(e.g. 生活習慣病, 確定申告, 猫の手も借りたい). 112 German meanings are corrected (e.g. 債権 no
longer „Anleihe“ — that is 債券; 震源 „Erdbebenherd“, the epicentre being 震央; 着払い „unfrei“,
Nachnahme being 代引き; 芒 „Chinaschilf“ instead of „Pampasgras“). 憂鬱 is retyped Nomen →
Adjektiv, and four card romanizations are corrected (urazuke, en'yasu, oodougu, kodougu).
No source references were resolved. N3 now has 1,121 pending reviews and 422 open references.

**Fourth N3 checkpoint (6 October 2026).** Batches 184a–184j, 185a–185j and 186a–186j enrich
the next 750 N3 entries (vocab-n3:2218–3081 in queue order) with German usage notes and 2–3
examples in distinct situations: 1,575 new sentences, 305 entries with corrected original
examples (mostly mis-segmented or misread romaji such as „okonatta“ for 行った). The pitch of
565 entries is verified (516 from exact UniDic rows, 49 from OJAD dictionary-form cells),
correcting 112 stored primary accents; 185 are investigated unknowns, mostly compounds and
set phrases (e.g. 各駅停車, 飲酒運転, いい加減にしろ). 236 German meanings are corrected (e.g.
更衣室 „Umkleideraum“ — a fitting booth is 試着室; 警視庁 „Polizeipräsidium Tokio“ against
警察庁 „Nationale Polizeibehörde“; 賀状 „Neujahrskarte“; 背後 no longer „Hintergrund“). 83
cards are retyped: plain nouns typed Adjektiv, Partikel or Adverb become Nomen (e.g. 祝日,
教師, 主義, 違い, 位置), and 再び and 再度 become Adverb. Cards without their own JMdict entry
(アメリカ製, 二巻, 岡山城, 第一段, 徳川) record the complete scan instead of a sequence.
No source references were resolved. N3 now has 371 pending reviews and 422 open references.

**Fifth N3 checkpoint (7 October 2026).** Batches 187a–187j and 188a–188e enrich the last 371
N3 entries (vocab-n3:3082–3360 plus 106 yojijukugo and idiom cards), so every N3 entry now has
a German usage note and 2–3 examples in distinct situations: 636 new sentences and 99 entries
with corrected original examples. The pitch of 224 entries is verified (209 from exact UniDic
rows, 15 from OJAD dictionary-form cells): 23 stored primary accents are corrected, 109 cards
that had no pitch get one, and 29 stored values without an exact attestation become
investigated unknowns. Including the idioms and four-character compounds, 147 entries are
investigated unknowns. 65 German meanings are corrected. Examples: 三日坊主 „Strohfeuer“, no
longer „Dreitagemond“, which is 三日月; 誤用 „falscher Gebrauch“ against deliberate 乱用;
賃貸 „Vermietung“, while the rent you pay is 家賃; 鼻が高い „stolz sein“, while „sich brüsten“
is 鼻にかける. 11 nouns typed Adjektiv or Adverb become Nomen (e.g. 裏口, 沿岸, 沿線, 己, 自己,
長寿, 遅滞). 山中湖 records the complete JMdict scan instead of a sequence. Re-enriching the
cards 板, 丘 and 画家, which earlier decisions had added, makes those 6 accepted references
stale; they will be renewed when the N3 references are closed. N3 now has 0 pending reviews
and 428 open references (422 pending, 6 needing renewal).

**N3 certified (7 October 2026).** Batches 189a–190t (`author-only-v1`) close all 422 pending
N3-owned source references with the two-wave method used for N4. Nine parallel triage
passes decided each row from JMdict and the current cards: 127 `verified-spelling-variant`,
2 `verified-source-notation` (misplaced-reading rows 釣 and 番), 6 `additional-sense`,
69 `additional-reading`, 164 `added` and 54 `excluded`. Wave A (189a–189h) reviews 96
existing target cards first: 80 gain reviewed spelling aliases only (102 aliases in total,
e.g. 益々, 見掛ける, 取り引き, 傷付く), and 16 are rewritten. Of these, 9 never-reviewed
targets at N2/N1 (悪戯, 可哀想, 然も, 支払い, 勤め, 測る, もっとも, 宜しく, ほぼ) get full
enrichment, and 6 cards gain a sense (ダイヤ „Diamant“, 元 „ehemalig, Ex-“, 霰 „Arare“,
いずれ „welche(r/s)“, 兆 „Anzeichen“, もっとも „berechtigt“). Wave B (190a–190t) adds 136
new cards (2 N5, 5 N4, 82 N3, 28 N2, 19 N1), for example:
- bare nouns next to an existing Xする card, following the 招待 and 設置 precedent: 支配,
  修正, 進歩, 注目, 確立, 蓄積
- weekday short forms: 月曜 … 日曜
- single-kanji words: 大, 小, 性, 損, 列, 技
- affixes and counters: お〜, 不〜, 旧〜, 〜圏, 〜権, 〜羽, 〜艘
- alternative readings: 市場/いちば, 抱く/いだく, 注ぐ/つぐ, 退く/どく, 後/のち
- basic expressions: いけない, かもしれない, いつか, どうか

Their pitch is verified for 118 of the new cards; 18 (mostly affixes and expressions) are
investigated unknowns. The 54 exclusions are:
- 36 source errors: truncated rows such as したがっ and 立ち上が, a garbled reading of 賛成,
  and glosses that belong to another word, such as 額/がく „forehead“ = 額/ひたい
- 15 rare or archaic readings that the existing card already teaches with its usual
  reading, such as 梯子/ていし and 雷/いかずち
- 3 kanji-reading rows

Re-reviewed targets made 19 accepted decisions stale (N4 3, N3 14, N2 2), and all were
renewed. Six of them are the 板/丘/画家 decisions. They were recorded as `added`, but those
cards came from the older additions importer and have no correction-pipeline addition seed,
so they were renewed as exact-form matches (`verified-spelling-variant`). All 22 full checks
pass; `advance --dry-run` passed and the campaign advanced from N3 to N2.
**First N2 checkpoint (8 October 2026).** Batches 191a–191j, 192a–192j and 193a–193j
(`author-only-v1`) enrich 750 N2 entries, from vocab-n5:1044 to vocab-n2:671, including idiom and
yojijukugo cards. Each now has a German usage note and 2–3 examples in distinct situations: 1,485
new sentences, and 71 entries had original examples corrected (wrong German, unnatural Japanese,
受賞式 → 授賞式). The pitch of 610 entries is verified: 506 from exact UniDic rows and 104 from
OJAD dictionary-form cells. 82 stored primary accents are corrected and 3 cards that had no pitch
get one; 107 stored values without an exact attestation become investigated unknowns, so 140
entries in all are investigated unknowns. 98 German meanings are corrected. Examples: 供述
„Aussage“ is no longer „Geständnis“, which is 自白; 嘆く now reads „beklagen, betrauern“; 研ぐ
now includes „(Reis) waschen“. 虹色 and 水溶性 are retyped from Adjektiv to Nomen and 粘々 becomes
Adverb. 第一弾 records the complete JMdict scan instead of a sequence. Five merge survivors
(idioms:122, idioms:47, yojijukugo:0, yojijukugo:24, yojijukugo:101) renew their merge records.
Re-reviewing 唯一, 但し and 勧め made 7 accepted spelling-variant decisions stale (N3 3, N2 4).
Batches 194a–194b renew them unchanged, so N3 stays complete. N2 now has 1,750 pending reviews
and 271 open references.
**Second N2 checkpoint (8 October 2026).** Batches 195a–195j, 196a–196j and 197a–197j enrich
750 more N2 entries (vocab-n2:672–1461): 1,513 new sentences, and 103 entries had original examples
corrected (wrong German, inconsistent romaji such as を written "wo", a typo like satorte). Pitch is
verified for 487 entries: 456 from exact UniDic rows and 31 from OJAD. For na-adjective cards headed
with the attributive な (丈夫な, 派手な), pitch research now reads the exact UniDic rows of the stem
(丈夫/じょうぶ, 派手/はで), since な carries no accent of its own; this verifies 67 of them, where
earlier batches had left such cards as investigated unknowns. 71 stored primary accents are
corrected, and 263 stored values without an exact attestation become investigated unknowns. 62
German meanings are corrected, e.g. 〜にかかわらず „unabhängig von“ (not „trotz“, which is
にもかかわらず) and 一般道 „mautfreie Straße“. 12 nouns typed Adjektiv or Adverb become Nomen
(e.g. 漁師, 台湾, 医療, 兆候, 以降, 各自). 後進的な, 娯楽費, 顕在的な, 周辺部 and 市境 record the
complete JMdict scan instead of a sequence. The frames 前提とする and 有効にする, whose
conjugation is excluded, now state why. No accepted decision became stale. N2 now has 1,000
pending reviews and 271 open references.
**Third N2 checkpoint (8 October 2026).** Batches 198a–198j, 199a–199j, 200a–200j and 201a–201j
enrich the last 1,000 N2 entries (vocab-n2:1462–2394 plus 169 idiom and yojijukugo cards), so
every N2 entry now has a German usage note and 2–3 examples in distinct situations: 2,030 new sentences,
and 419 entries had original examples corrected (ungrammatical Japanese such as 眠れることすらできない,
unnatural sentences, wrong German). Pitch is verified for 623 entries: 593 from exact UniDic rows and
30 from OJAD. 107 stored primary accents are corrected and 82 cards that had no pitch get one; 201
stored values without an exact attestation become investigated unknowns, so 377 entries in all are
investigated unknowns (176 of them idioms and four-character compounds). 229 German meanings are
corrected, e.g. 拳銃 „Pistole“ (not „Revolver“), 軍艦 „Kriegsschiff“ (not „Schlachtschiff“),
風の便りに聞く „gerüchteweise hören“ (not „durch die Blume“) and 三つ子の魂百まで, which is about
character, not learning. 73 cards change type, mostly nouns typed Adjektiv (e.g. 破片, 炭素, 芝生,
金髪, 宮廷, 陛下); 大概 becomes Adverb. 募集中, 軍艦島, 淀川, 言外之意, 才能開花, 一蹴両断 and
胸に手を当てる record the complete JMdict scan instead of a sequence. The literary godan verb 翔る
keeps its conjugation drill excluded because its kana form かける coincides with the ichidan verbs
掛ける and 駆ける; the reason is now recorded. Two cards are flagged but kept: 一蹴両断 is no real
idiom (its note says so and teaches 一蹴 and 一刀両断), and 塊魂 is a video game title. Batch 202a
renews 4 decisions that the re-reviewed 危うい and 衣食住 made stale. N2 now has 0 pending reviews;
its 271 open source references remain before the level can be certified.
**N2 certified (8 October 2026).** Batches 203a–204k (`author-only-v1`) close all 271 N2-owned
source references with the same two-wave method. Six parallel triage passes decided 69
`verified-spelling-variant`, 5 `verified-source-notation` (misplaced-reading rows such as 炒る, 棄てる,
茶色い), 1 `additional-sense` (非 „Fehler, Unrecht“), 25 `additional-reading`, 152 `added` and 19
`excluded`. Wave A (203a–203f) reviews 56 existing target cards: 44 gain reviewed spelling aliases
only (56 aliases, e.g. あわてる, 嘘つき, 頷く, 面倒くさい), and 12 are rewritten. Eleven never-reviewed N1 targets
(拵える, 堪える, 躊躇う, 箪笥, 凭れる, 尊い, 膨張, 瓶詰 …) get full enrichment. Wave B (204a–204k) adds
114 new cards (6 N4, 8 N3, 76 N2, 24 N1), for example:
- bare nouns next to an existing Xする card: 移転, 接近, 到達, 突破, 保管, 改良, 参照
- the literary ずる verbs 応ずる, 感ずる, 生ずる, 信ずる, 存ずる and 通ずる, with the `zuru`
  conjugation group used by 論ずる and 命ずる
- affixes and counters: 〜科, 〜校, 〜ごと, 第〜, 〜だらけ, 〜年生, 御〜/おん, 〜力
- alternative readings: 擦る/こする, 擦る/かする, 敵/かたき, 国境/くにざかい, 大分/だいぶん
- words such as しいんと, しみじみ, せっせと, 水曜, お帰り and なんて

Two triage passes had created しいんと in different ways. Both rows now close onto the card for
JMdict 1631970 しいんと (variant しーんと), because the lengthened form has its own entry. Pitch is
verified for 75 of the new cards, and 39 are investigated unknowns. The 19 exclusions are:
- 13 source errors: truncated rows such as おまたせしまし, a reading column holding （カーペット）, and
  副 (the adverb marker) read as とりわけ
- 6 rare or obsolete readings, such as 他人/あだびと and 問屋/といや

Two accepted decisions made stale by the alias reviews (日日/ひにち, 非) were renewed. All 22 full
checks pass; `advance --dry-run` passed and the campaign advanced from N2 to N1.
**First N1 checkpoint (9 October 2026).** Batches 205a–205j, 206a–206j, 207a–207j and 208a–208j
enrich the first 1,000 N1 entries (vocab-n1:18–857 plus 170 earlier-level and idiom cards whose
reviews lacked enrichment), mostly legal, political, financial, trade and science vocabulary. Each
now has a German usage note and 2–3 examples in distinct situations: 2,007 new sentences, and 141
entries had original examples corrected, e.g. entropy rising in a 孤立系 (not 閉鎖系), 書類送検
(only the files go to the prosecutor), 拘留 vs. 勾留, the law name 金融商品取引法 and abolished
par-value shares. Pitch is verified for 528 entries: 524 from exact UniDic rows and 4 from OJAD. 68
stored primary accents are corrected; 393 stored values without an exact attestation become
investigated unknowns, so 472 entries in all are investigated unknowns (mostly multi-word
compounds). 147 German meanings are corrected, e.g. 仲裁 „Schiedsverfahren“ (not „Arbitrage“),
派閥 „Faktion; Parteiflügel“ (not „Fraktion“), 金融工学 „Finanzmathematik“ (not
„Finanzwissenschaft“), 監査役 „Rechnungsprüfer“ (not „Aufsichtsrat“), and missing everyday senses
are added (保守 „Wartung“, 刑事 „Kriminalbeamter“). 未曾有, 恒常, 仮想 and キャッシュレス become
Nomen; 絶縁体 gets the romaji zetsuentai. 66 compounds without their own JMdict entry (住民訴訟,
立件送致, 早出料, 那智の滝 …) record the complete JMdict scan instead of a sequence; 恤む keeps its
drill excluded because JMdict does not attest it with the reading あわれむ. The merge survivor
idioms:229 is renewed. Flagged but kept: 改閣 and 立件送致 are no established words, 早出料 is
read はやでりょう in shipping, 懺悔 is usually ざんげ, 拘引/勾引 and 保持/保持する are duplicates.
No accepted decision became stale. N1 now has 2,999 pending reviews and 342 open references.
**Second N1 checkpoint (9 October 2026).** Batches 209a–209j, 210a–210j, 211a–211j and 212a–212j
enrich the next 1,000 N1 entries (vocab-n1:858–1917): engineering, medicine, science, education,
publishing, linguistics, literature, religion and the arts. Each now has a German usage note and
2–3 examples in distinct situations: 2,007 new sentences, and 70 entries had original examples
corrected, e.g. 結核菌 called a disease, 書院 as Edo-period schools (those were 藩校, 私塾 and
寺子屋), 祝詞 called a ritual, 口語体 glossed as slang, plus romaji such as 百八つ hyakuyattsu
and 現世利益 genze riyaku. Pitch is verified for 712 entries, all from exact UniDic rows; 116
stored primary accents are corrected and 288 stored values without an exact attestation become
investigated unknowns. 103 German meanings are corrected, e.g. 清音 „Silbe ohne Dakuten“ (not
„stimmloser Laut“, since な and ま count as 清音), 学力 „schulisches Leistungsniveau“ (not
„Lernfähigkeit“), 口語体 „moderner Schriftstil“, 宗派 „Konfession“ (not „Sekte“) and 舞踏 with its
main sense „Tanz“. 良性, 悪性, 先天性, 後天性, 抗炎症 and 即身成仏 become Nomen; 絶縁 and 浸潤 get
the romaji zetsuen and shinjun. 19 compounds without their own JMdict entry (膠質浸透圧, 光電効果,
意志形 …) record the complete JMdict scan instead of a sequence. Flagged but kept: 醗酵 is a dated
spelling of 発酵, 三次元印刷 and 陽電子断層撮影 are rare or shortened terms, 啓く survives only in
蒙を啓く, 窮める is a rare spelling, and 緩和ケア stores its reading in hiragana. No accepted
decision became stale. N1 now has 1,999 pending reviews and 342 open references.
**Third N1 checkpoint (9 October 2026).** Batches 213a–213j, 214a–214j, 215a–215j and 216a–216j
enrich the next 1,000 N1 entries (vocab-n1:1918–2962): ecology, geography and climate, everyday
life, character and emotion words, literary verbs, adverbs, grammar patterns and idioms. Each now
has a German usage note and 2–3 examples in distinct situations: 2,016 new sentences, and 234
entries had original examples corrected, e.g. salmon going up a river (遡上, not 回遊), 萎える for
numb legs after seiza (足がしびれる), 嘯く with a を-object, an umbrella sentence that contradicted
itself, plus many romaji fixes (V字谷 buijikoku, 海面下 kaimenka). Pitch is verified for 594
entries: 584 from exact UniDic rows (including stem rows for な-adjective headwords) and 10 from
OJAD. 100 stored primary accents are corrected and 406 stored values without an exact attestation
become investigated unknowns. 124 German meanings are corrected, e.g. 外来種 „gebietsfremde Art“
(invasive species are 侵略的外来種), 砂嘴 „Sandhaken“ (not „Nehrung“), 環太平洋 „Pazifikraum“,
奢る „einladen, spendieren“ (the „arrogant“ sense is written 驕る), 艶やか „glänzend“ and
一石を投じる „Denkanstoß geben“. 侘びる (vocab-n1:2558) had the meaning of 詫びる „sich
entschuldigen“, which has its own card; it now teaches the real 侘びる (待ち侘びる, 住み侘びる).
専任 gets the romaji sennin. 70 compounds and particle-prefixed patterns without their own JMdict
entry (生態系保全, 沈み込み帯, に即して, を皮切りに …) record the complete JMdict scan instead of a
sequence. 躍起になる and 慣行する record why their conjugation drill stays excluded. Flagged but
kept: 寂寥な and 精鋭な are non-standard な-headwords, 款項 is rare and not in JMdict, 慣行する
and 汎用する are rare as verbs, 填める/纏める/齎す are usually written in kana, and に即して/に即する
and に他ならない/他ならない are duplicates. No accepted decision became stale.
N1 now has 999 pending reviews and 342 open references.
**Fourth N1 checkpoint (9 October 2026).** Batches 217a–217j, 218a–218j, 219a–219j and 220a–220j
enrich the last 999 N1 entries (vocab-n1:2963–3894 plus 130 remaining idiom and yojijukugo
cards), so every N1 entry now has a German usage note and 2–3 examples in distinct situations:
1,964 new sentences, and 313 entries had original examples corrected, e.g. 酌む used for
scooping water (汲む), 擬装 for food fraud (偽装), 銀杏/いちょう for the edible nuts (ぎんなん),
ヒトラー総帥 (his title was 総統), 東北大震災 (東日本大震災), 九死一生を得て (九死に一生を得て),
an unverifiable racehorse claim and a quote from a juvenile murderer on 愉快, plus many romaji
fixes (粗塩 arajio, 犬小屋 inugoya, 桜島 Sakurajima). Pitch is verified for 647 entries: 628 from
exact UniDic rows and 19 from OJAD. 123 stored primary accents are corrected and 108 idiom cards
that had no pitch get one; 218 stored values without an exact attestation become investigated
unknowns. 231 German meanings are corrected, e.g. 錦鯉 „Koi“ (not „Buntbarsch“, a cichlid),
起訴猶予 „Absehen von der Anklage“ (not „Strafaussetzung“, which is 執行猶予), 灯台下暗し (the
灯台 is an old lamp stand, not a lighthouse), 虎の威を借る狐 (not „sich mit fremden Federn
schmücken“) and 一貫, which now teaches „Konsequenz“ besides the sushi counter. 50 nouns typed
Adjektiv, Adverb or Partikel become Nomen (e.g. 孤児, 恒久, 脊椎, 捕虜, 瞠目, 某/なにがし, 郡), and
然るべき becomes Adjektiv like the prenominal 我が〜. 15 cards without their own JMdict entry
record the complete JMdict scan instead of a sequence. Batch 221a renews 2 decisions that the
re-reviewed あやふや made stale. Flagged but kept as removal candidates: the given names 亮平, 綾乃,
大輔, 諒一郎, 莉子, 瑛斗, 遼太 and 拓哉, the place name 梓川, 鰐蟹 (WaniKani in joke kanji), the
Chinese chengyu 一望無際 (Japanese: 一望千里) and the rare 苛々しい; 据え膳食わぬは男の恥 is
marked as crude, 平壌 keeps the historical reading へいじょう (today ピョンヤン), and 縫目 is a rare
spelling of 縫い目. N1 now has 0 pending reviews; its 342 open source references remain before
the level can be certified.
**Maintenance batch 222 (9 October 2026).** By user decision, 18 cards that the N1 enrichment authors
flagged as non-vocabulary are retired through redirects into their closest real cards (the
existing merge/retirement mechanism of batch 022; old IDs keep working for bookmarks and deep
links):
- the given names 亮平, 綾乃, 大輔, 諒一郎, 莉子, 瑛斗, 遼太 and 拓哉 → 名前
- the place name 梓川 → 川, and the game title 塊魂 → 塊
- 鰐蟹 (WaniKani in joke kanji) → 鰐
- invented or foreign compounds: 一望無際 (a Chinese chengyu; Japanese 一望千里) → 見渡す,
  一蹴両断 → 一刀両断, 改閣 → 内閣, 立件送致 → 立件, 款項 → 規定, the dated 苛々しい → いらいら
- the crude proverb 据え膳食わぬは男の恥 → 機会

Three readings are corrected: 早出料 そうしゅつりょう → はやでりょう (the shipping-trade reading the
examples already used), 懺悔 さんげ → ざんげ (the common reading; the note keeps さんげ as the
Buddhist one) and 平壌 へいじょう → ピョンヤン (the historical example keeps Heijou). The romaji
layer rows of the retired cards are removed. The runtime now has 16,093 entries (N2 3,320,
N1 5,476), all with accepted full reviews; no accepted decision became stale.

## Historical campaign freeze

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
- **024a–b (44 reviews, 1 merge):** reported defects from the 23 September full review.
  Readings 唯一 ゆいいつ, 荷送人 におくりにん, 傍目に はために; mismatched romaji (町内会,
  即座に, 貸し渋り, 埋立地, コレステロール, エッフェル塔, 恐れ入る, もの寂しい, 直接/間接民主制,
  初七日); examples that never used their headword replaced (遷移, 貿易障壁, 確定判決,
  市場開放, 市場参入, 引渡条件, 焼き物, ご覧になる, だからといって, 駆け出す); stray
  tabs/spaces and a U+FEFF removed from 19 examples; 相図 (rare kanji form) retired into 合図.

- **025a–e (102 additions, research in [maintenance-025](maintenance-025/research-supplement.json)):**
  everyday vocabulary that the JLPT-list comparison had never covered. Country and
  continent names (ドイツ, フランス, アメリカ, ヨーロッパ …), language and nationality words
  (ドイツ語, 韓国語, 日本人 …), online and phone vocabulary (ダウンロード, パスワード,
  ログイン, 既読, SNS …), animals (豚, 羊, 猿, パンダ, ペンギン …) and daily-life words
  (マスク, レジ袋, 宅配便, テレワーク …). 025e is candidate-backed and closes 18 publisher
  references (アメリカ, アジア, アフリカ, ヨーロッパ, 通知, コピー, 猿, 鼠, マスク). Pitch: 76
  verified from exact UniDic rows, 26 unknown. Two independent review rounds; three
  round-1 rejections (オランダ note, 豚 example, 山羊 note) were fixed and re-reviewed.

- **026a (25 additions, research in [maintenance-026](maintenance-026/research-supplement.json)):**
  22 common idioms (猫をかぶる, 犬猿の仲, 雀の涙, 足を洗う, 目がない, 歯が立たない, 揚げ足を取る,
  顔から火が出る …), the noun 蛇足, the adverb 根掘り葉掘り and the yojijukugo 千差万別 and
  羊頭狗肉. Added as vocabulary entries of type Redewendung/Sprichwort because the pipeline
  cannot create idiom-source IDs. 井の中の蛙 was dropped in review as a short form of the
  existing 井の中の蛙大海を知らず.

- **027a–e (46 candidate-backed additions, research in [maintenance-027](maintenance-027/research-supplement.json)):**
  N5/N4 JLPT-list gaps: greetings and set phrases (さよなら, ごめんください, お待たせしました …),
  adverbs (それほど, ちっとも, とうとう), basic nouns (糸, 雲, 気, 市, 字, 区, 会, 式 …), loanwords
  (ソフト, ファックス, ハンバーグ, チェック …) and the suffixes 〜代 and 〜製. Closes 98 publisher
  references; one Nihongo Master row (ケレド, "credo") excluded as a source error.

- **028–031 (N3 JLPT-list gaps, research in maintenance-028 … maintenance-031):** four chunks of about
  70 N3 words each (285 in total) from the open candidate groups (e.g. 影, 宝, 袖, 神経, 財産, 途端, 翼, 騒ぎ, 付き合い,
  身長, 恋, 意思 …), authored in parallel and each checked by an independent reviewer over two rounds.
  Rare kanji/ateji spellings (何時でも, 其の儘, 屡々 …) are decided as the same lexeme as the kana entry.

- **032–037 (N2 JLPT-list gaps, research in maintenance-032 … maintenance-037):** six chunks of about
  100 N2 words each, curated from the open candidate groups by level and reading (spelling variants merged,
  already-taught forms, affixes and garbage rows left open), each checked by an independent reviewer.

- **038– (N1 JLPT-list gaps, research in maintenance-038 …):** the N1 backlog in twelve chunks by reading,
  curated the same way as the N2 chunks and each checked by an independent reviewer.

- **050 (follow-ups, research in maintenance-050):** spelling aliases (勧め, 掬う, 先先月, 先先週, 久し振り,
  但し), headwords 繁盛 and 捕らえる with the old spellings as aliases, romaji and German fixes, and
  the additions よほど, 本格的 and 浸ける.

- **051 (owner override for everyday words):** 韓国 → N5, 定食 → N4, デザイン, 徒歩, 待ち合わせ(る),
  メーカー and マッサージ → N3, although the source lists place them higher.

- **052 (romaji review, research in .content-cache/m052):** 377 entries whose romaji was misread or
  garbled (一人 ichinin, 豚骨 butabone, hyphen length marks) rewritten in Modified Hepburn, with German
  fixes where clearly wrong and pitch re-checked against exact UniDic rows. Long vowels elsewhere
  come from the generated layer vocab-romaji-hepburn.js.

- **053 (content fixes flagged in the 052 review, .content-cache/m053):** 34 entries: German meanings
  (平日 Werktag, 自決 Selbstbestimmung, typos), nouns mistyped as adjectives, unnatural or off-headword
  examples replaced (越す, 殖える, 膠着する, 錦, 可分), 縦書き and 憂う as headwords, and a usage warning
  for the discriminatory 気違い.

- **054 (.content-cache/m054):** usage-based relevels (メニュー N5, ランチ N4; 一本気, 可分, 気違い N1)
  and double quotes for 「」 in romaji; these entries' romaji is written out in Hepburn.

Runtime: **15,558 entries** (N5 1,644, N4 1,638, N3 3,757, N2 3,169, N1 5,350),
with 16 retired IDs redirected. See [generated coverage](COVERAGE.md) for the
ledger counts. Deferred work: the near-duplicate category merge (163 entries). Every
category-only edit is a consequential full review with a pitch disposition, and 70
of those entries have a pitch that no exact UniDic row supports. The levels of 〜症 and
及び are also deferred: two publishers list both at N1.

The full-corpus request is **not complete**. The risk-based completion gate must fail
until every entry, candidate and pitch investigation meets the acceptance rules.
Mechanical dictionary matches are research leads, not editorial approvals.

## Historical review policy — risk-based-v2

Superseded on 4 October 2026 by `author-only-v1` (see the campaign section above).
Batches 013–166 used `risk-based-v2`. Existing strict and `risk-based-v1` batches retain
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

## Earlier checkpoint — risk-based follow-up

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
`additional-sense`, `additional-reading`, `verified-source-notation`, or `excluded`; they require individual
evidence, rationale, second-pass findings, and reviewed surviving IDs when relevant.

**Kanji-reading rows** (user-approved rule, 5 October 2026). Some publisher rows,
mostly in the TANOS lists, give a bare kanji with one of its character readings
and the meanings from a kanji dictionary, e.g. 幹/かん "(tree) trunk" or 働/どう
"work, labor". Such a row is not a vocabulary word. It is `excluded` when JMdict
has no word for that spelling, reading and sense. Rare abbreviations and unrelated
senses don't count as such a word. The reason names the actual words for the
meanings (e.g. 幹/みき) and, where the kanji is in the Kanji section, cites its
reading there. If the spelling and reading do form a real word, the row maps to
that word's card with `additional-sense`. Any remaining gloss branches that are
only character meanings are named in the reason and need no separate card. Rows
whose gloss belongs to a different word (e.g. 灰/あく for 灰汁, 誰/たれ for the
suffix 〜たれ) are `excluded` as source mix-ups. Policy reasons are
`kanji-reading-row` or `source-error`. Batch 167a applied the rule to the last 14
N5-owned references.

`verified-source-notation` handles eleven explicit publisher formats: a nominal
heading with a complete suru-verb reading, a parenthesized reading ending, a
reading misplaced into the gloss column, a kana-script variant, or combined
spellings, alternative readings, shared final okurigana, complete spellings
separated by one literal space, parallel complete kana alternatives, or complete
readings separated by one literal space, or matching ji/zu kana orthography.
Its `sourceNormalization` contains `kind`, `word` and `reading`;
all three are bound to both approvals. A single separator `・` immediately
before `する` is allowed in that format; other punctuation is preserved.
Mechanical checks require the exact
indicated spelling and pronunciation and coverage of every combined spelling.
The five original single-target formats and `kana-orthography` retain one target.
`kana-orthography` preserves the complete source word and recognizes only the
same-pronunciation hiragana pairs じ/ぢ and ず/づ. Positive spelling evidence
and both exact approvals are required; the source reading remains frozen.
Missing dakuten, truncated readings, other pronunciation differences, script
changes, whitespace and a normalization without a spelling difference fail.
`alternative-readings` preserves the
literal slash-separated source reading and binds a distinct accepted card for
each of its two or three readings. `shared-okurigana` expands the final kana
ending in a source such as `堅/硬/固い` to `堅い/硬い/固い` and binds each
full spelling at the same reading to its own accepted card.
`spaced-spellings` separates two or three complete Han-plus-kana forms with the
same written ending, such as the frozen `見る 観る`, into explicit `見る/観る`
coverage. Repeated forms, incomplete stems, differing endings and arbitrary
whitespace fail. Each spelling requires its own current accepted target.
`parallel-alternatives` preserves both literal slash-separated source lists,
such as `キロ/キログラム` in both columns. It pairs two or three complete kana
spellings and readings by position, requiring matching pronunciations and one
distinct current accepted card per pair. Repeated, truncated, crossed or
unequal lists fail. It cannot reconstruct a missing source alternative.
`spaced-readings` preserves a literal reading such as `じゅう とお`. Two or
three complete kana readings separated by single ASCII spaces require their
own current accepted cards at the unchanged source spelling. Empty, repeated,
concatenated or non-kana forms and other whitespace fail.
Missing, unrelated, overlapping or extra targets fail; every target hash and both source approvals
remain mandatory. These formats do not establish interchangeable usage.
Lexical evidence and independent review are still required. This action cannot
resolve an arbitrary reading, homophone or additional sense; the original
publisher reference remains frozen. Exact spelling-variant checks remain strict.

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
