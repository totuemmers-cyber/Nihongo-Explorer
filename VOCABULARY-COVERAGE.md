# JLPT vocabulary coverage update

Completion work is **still open**. The current runtime contains **13,105 entries**:
N5 **1,609**, N4 **1,567**, N3 **3,390**, N2 **2,527**, N1 **4,012**.
The historical expansion below remains unchanged as a record of that work.
See [completion authoring and current gaps](scripts/vocabulary-completion/README.md).

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
