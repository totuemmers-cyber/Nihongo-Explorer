# Verb review — 2026-09-05

All 2,389 baseline entries have an explicit disposition in
`scripts/verb-review.json`. `scripts/verb-baseline.json` freezes their source
positions, spelling, reading, teaching meaning and previous classification
metadata. Existing vocabulary IDs and source order are preserved.

| Disposition / class | Entries |
| --- | ---: |
| Godan | 918 |
| Ichidan | 462 |
| Suru | 969 |
| Kuru | 1 |
| Zuru | 1 |
| Aru | 2 |
| Corrected nonverbs | 27 |
| Explicitly excluded pending further evidence | 9 |

Of the 2,353 conjugatable entries, 465 require appending する to the displayed
noun. The others already supply a dictionary-form reading. Comparing canonical
forms with the previous reading-based resolver identifies 348 entries with at
least one changed available answer, separately from exclusions and added
variants. Examples include nominal 発表 → はっぴょうします, godan 揺する →
ゆすります, 問う → とうて, 愛する → あいせる, and 演ずる → えんじます.

## Reference and method

The review uses [JMdict](https://www.edrdg.org/jmdict/j_jmdict.html), copyright
James William Breen and the Electronic Dictionary Research and Development
Group. The downloaded English XML was created and retrieved on 2026-09-05.
Compressed-source SHA-256:
`19990edcbac569575e9a555ce1d2e900c95c81bdb7096e3cc44c1b3970d7b6b5`.

JMdict evidence and derived classification metadata are distributed under
[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), subject to the
[EDRDG licence statement](https://www.edrdg.org/edrdg/licence.html).
The manifest records entry/sense IDs, POS, glosses, spelling/reading sense
restrictions, reading restrictions, selected evidence and rejected homophones.
It is an extract with editorial classifications and inflection metadata, not an
unmodified dictionary distribution. No dictionary lookup runs in the application.

`scripts/review-verbs.py` matches spelling and reading together, observes
`re_restr`, `re_nokanji`, `stagk` and `stagr`, and inherits POS across senses.
Nominal compounds ending in する can match the corresponding noun's `vs` sense.
Explicit sense selections resolve する, いる, かける, できる, くれる, 駆ける and
伏せる against their German teaching meanings. 左右 selects the directional noun
sense, not the separate “influence” verb sense. Conflicting classes without a
defensible selection are excluded. This is a morphological teaching review;
generated paradigms do not imply that every form is equally natural in every
semantic context.

Lexical overrides include JMdict's special godan endings, くれる's imperative,
the ずる paradigm, and unavailable forms of ある/できる. Single-morpheme `vs-s`
verbs do not receive an invented noun + できる potential; uncertain potentials
are unavailable. The 愛する alternatives are additionally checked against
[the dictionary entry hosted by Kotobank](https://kotobank.jp/word/愛する-421431).
Accepted alternatives remain displayable, and quizzes exclude any target's
accepted alternatives from wrong answers.

## Explicit exclusions

These remain searchable with their original IDs and wording:

| Entry | Reason |
| --- | --- |
| 文句する | Matched noun lacks a supporting する verb sense |
| 前提とする | Full expression not matched by this dictionary review |
| 有効にする | Full expression not matched by this dictionary review |
| 即〜 | Affix spelling not matched as a dictionary-form verb |
| 翔る | Both godan and ichidan classes; teaching sense does not disambiguate |
| 恤む | No matching spelling/reading pair |
| 躍起になる | Full expression not matched by this dictionary review |
| 慣行する | Matched noun lacks a supporting する verb sense |
| 宥す / なだめる | No matching spelling/reading pair |

An exclusion means that this review cannot safely supply quiz answers, not that
the expression necessarily cannot occur in Japanese.

## Curriculum and validation

Levels remain the project's study estimates. N5 targets are polite, negative,
past and て. Its distractors are dictionary, plain/polite affirmative, negative
and past forms, て and polite volitional. N4–N1 retain the previous target list
and can use every available reviewed form. Source-entry IDs, target form and
choice-form IDs accompany every conjugation question. Beginner form labels use
German; scored-prompt restrictions and post-answer explanation conversion are
tested separately.

Offline checks require no downloaded dictionary:

```
node scripts/apply-verb-review.cjs
node audit-verb-conjugation.js
node audit-quiz-quality.js
node scripts/ui-test.js
npm run check
```

The last command runs every read-only lint, test and audit listed in
`scripts/check.cjs`.
On 2026-09-05 it ran all 13 package scripts configured at that time. Full baseline coverage, metadata drift, source order/IDs,
independently authored regular and lexical fixtures, unavailable forms, accepted
variants, four choices, answer keys, N5 rules, explanation fallback and DOM
tables/feedback are covered. All 13 passed on 2026-09-05.

To reproduce the dictionary extraction, place the exact compressed source in
`.content-cache/JMdict_e.gz`, verify its hash above, then run
`python scripts/review-verbs.py`. To update, download a new dated publisher
snapshot, update the recorded retrieval date, inspect the manifest diff and
review all changed or excluded senses before applying metadata and rerunning
the checks. Keep reference refreshes outside the runtime.
