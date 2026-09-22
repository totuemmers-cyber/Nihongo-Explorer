# JLPT vocabulary coverage update

The exhaustive campaign is **superseded**, not completed. The current task is one
[bounded quality sweep](scripts/vocabulary-completion/QUALITY-SWEEP.md); sample
observations do not count as accepted reviews. Default maintenance afterward covers
reported defects and future changes, with no automatic review waves.

Current ledger-backed counts are generated in
[current review coverage](scripts/vocabulary-completion/COVERAGE.md).
New batches use `risk-based-v2`; the checkpoint descriptions below are retained
as historical records. The full review remains open.

Completion work is **still open**. The current runtime contains **13,106 entries**:
N5 **1,612**, N4 **1,567**, N3 **3,388**, N2 **2,527**, N1 **4,012**.
The historical expansion below remains unchanged as a record of that work.
See [completion authoring and current gaps](scripts/vocabulary-completion/README.md).

Current risk-based follow-up: **159 entries accepted; 12,947 await review**.
Batch 010 resolved seven candidate references with five documented aliases;
batches 011 and 012 accepted 50 further reviews. **3,917 candidate groups / 6,552
source references remain open**. Pitch: 158 verified and one investigated unknown.
Seventy unresolved references have saved research. The completion gates remain open.

Earlier risk-based pilot: **109 entries accepted; 12,997 awaited review**. Three
25-entry batches and the follow-up correction batch completed 75 new reviews.
Seven routine samples passed independent review; all 16 consequential records
were independently checked, including seven returned for correction. Findings
for 53 candidate references are saved for follow-up; they are not closed decisions.
The corpus remains unfinished under both completion policies.

Earlier 22 September checkpoint: **34 entries accepted; 13,072 await review**.
**3,922 candidate groups / 6,559 individual references remain unresolved**.
The completed 25-entry checkpoint comprises 23 new reviews of existing entries,
one new イクラ food entry and one revision to the earlier 宥す note. The three
references in the mixed いくら group now have separate price-question and food
targets. There are 12,415 missing notes, 9,799 entries with fewer than two different
Japanese examples, and 13,072 entries lacking reviewed distinct contexts. Pitch:
33 verified, one investigated unknown, 13,072 without a final investigation.
Ten unresolved candidate references have persistent research findings. The new
food entry retains the source's N5 estimate with explicitly limited single-publisher
support. New work now uses the documented `risk-based-v1` policy: every entry gets
one evidence-backed pass, while consequential work and a fixed 10% routine sample
get an independent pass. Missing optional notes and second examples are reported
as enrichment coverage instead of blocking review completion. Additions and entries
needing a lexical distinction still require both. The risk-based and full-enrichment
gates remain failing; no level is complete.

Earlier 22 September checkpoint: version 2 tracked all 13,105 entries. Ten entries
have full correction/pitch reviews; 13,095 await review. Seven candidate forms
were individually verified as search aliases; 3,923 remain unresolved. No new
entries or merges were introduced in this checkpoint. There are 12,431 missing
usage notes and 9,800 entries with fewer than two different normalized Japanese
examples; semantic context review remains open for 13,095 entries. Pitch totals
are nine verified, one investigated unknown and 13,095 awaiting final investigation.
宥す is now ゆるす with forgiving/pardoning meaning and godan conjugation; 宥める
remains separate. The strict completion audit still fails intentionally.

5 September 2026. Added **559 words** and **1,118 examples**, corrected **175 level
assignments**, and restored **57 existing entries** hidden by a merge defect.
The vocabulary section now contains **13,099 visible entries** across its core
vocabulary, idiom and four-character-expression sources.

## Changes by level

These are app entries assigned to each level, not cumulative JLPT requirements.
Alternate readings and intentional study perspectives can have separate entries.

| Level | Before | New entries | Net level changes | Restored | After |
| --- | ---: | ---: | ---: | ---: | ---: |
| N5 | 1,372 | 154 | +82 | 1 | 1,609 |
| N4 | 1,423 | 92 | +49 | 3 | 1,567 |
| N3 | 3,329 | 114 | −70 | 14 | 3,387 |
| N2 | 2,471 | 88 | −58 | 24 | 2,525 |
| N1 | 3,888 | 111 | −3 | 15 | 4,011 |
| Total | 12,483 | 559 | 0 | 57 | 13,099 |

Selection prioritized beginner family words, directions, colors, dates, counting,
daily interactions and common loanwords; intermediate explanations, work and
everyday situations; and advanced general reading and organizational vocabulary.
Examples include 父, 母, 兄, 姉, カレンダー, irregular date readings, なさる,
年代, 送料, 調節, 追加, 体制, 存続, 直面 and 提示.

Every addition has a reading, romanization, German meaning and usage note, plus
two distinct example contexts with Japanese, romanization and German translation.
Unverified pitch accents remain unknown. Reading and sense distinctions such as
一日（ついたち／いちにち）, 白／城 and 側／そば are retained.

82 previously later-level words now appear in N5 and 93 in N4. For example,
医者 moved from N2 to N5 and 乗り換える from N2 to N4. Existing source order and
all 12,483 previously visible vocabulary identities are preserved.

The merge fix restores words when the preferred version occurs in a later source,
including 一生懸命, 空気を読む and 試行錯誤. The new quiz checks prevent known
alternative readings or equivalent answers from being offered as wrong choices.
Honorific conjugation now produces forms such as なさいます and いらっしゃいます.

## Reference scope and remaining gaps

The comparison contains **17,999 reference rows** grouped into **9,215 normalized
spelling/reading forms** from Tanos, JLPT Sensei and Nihongo Master. All levels and
available pagination were considered. Public JLPT Sensei advanced lists are
partial, and the historical lists differ in vocabulary, spelling and level.
See [sources and methodology](CONTENT-SOURCES.md#jlpt-vocabulary-expansion--5-september-2026).

The [review manifest](scripts/vocabulary-review.json) records these dispositions:

| Disposition | Reference forms |
| --- | ---: |
| Existing spelling/reading match | 4,465 |
| Existing match with level corrected | 175 |
| Reviewed sense added, including spelling aliases | 627 |
| Restored by merge fix and matched in this reference set | 1 |
| Deferred: variant, reading or sense review | 1,337 |
| Deferred: further prioritized expansion | 1,849 |
| Deferred: one-publisher evidence | 750 |
| Deferred: legacy technology | 7 |
| Excluded: identified source errors | 4 |
| Total | 9,215 |

The 627 reference forms map to 559 authored entries because publishers use
different spellings and combined readings. Conversely, most of the 57 restored
idioms are outside these vocabulary references. A spelling/reading match is not a
semantic completeness check: homonymous senses can still need review.

This is a prioritized expansion, **not complete N5–N1 coverage**. The largest open
work is the 1,849 multi-publisher forms deferred for further expansion, followed
by 1,337 unresolved variant/sense cases. They are explicitly retained as open work;
they have not been classified wholesale as rare or already covered. In particular,
matching kana alone must not confuse さん with 三, そう with 僧, or いつか with 五日.
The remaining 750 one-publisher forms need stronger lexical and priority review.

There is no current exhaustive official JLPT vocabulary list. Study-list agreement
supports an estimate; it does not establish official exam requirements. No coverage
percentage against the JLPT is claimed.

## Validation and maintenance

`npm run audit:vocabulary` checks all additions after the app's normalization and
merge, reference integrity, corrected levels, restored entries, and preservation
of existing IDs. The quiz audit includes 600 focused questions about alternate
readings and equivalent answers, in addition to its 6,000-question general sample.
Smoke tests cover search, level filtering, examples, bookmarks and conjugation.

Use `node scripts/import-vocabulary-additions.cjs` to reapply the committed
authoring data without network access. Repeating the import does not append
duplicates or change the resulting files.
