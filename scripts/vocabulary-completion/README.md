# Vocabulary completion — open

This work has not fulfilled the full-corpus completion request. No remaining
candidate has been silently excluded, merged by pronunciation, or declared covered.

The separate [manifest](../vocabulary-completion.json) freezes 13,099 runtime
identities, raw source prefixes, the 12,450-entry editorial queue, and all 3,936
pending candidate forms with publisher evidence. Candidate `status: open` is the
baseline state; effective decisions come from the listed authoring batches.
The historical review is preserved and its hash is checked on every import.
Seven historically deferred legacy-technology forms are outside the specified
3,936-candidate queue and retain their historical status.

Batch [001.json](001.json) contains six additions: 板, 丘, 画家, 危うい,
衣食住 and あやふや. Dictionary evidence records JMdict sequence numbers,
spellings, readings and glosses; publisher evidence supports estimated levels.
German notes, examples and translations are editorial content. New pitch values
are unknown. Ten existing entries have been reviewed and enriched, including a
second example for 空気を読む and replacement of 外's repeated sentence.
子ども and 友だち are verified search aliases for 子供 and 友達.

Current progress:

| Measure | Count |
| --- | ---: |
| Visible runtime entries | 13,105 |
| Reviewed existing entries | 10 |
| Candidate decisions: added | 6 |
| Unresolved candidate decisions | 3,930 |
| Entries still missing usage notes | 12,440 |
| Entries with fewer than two distinct contexts by normalized Japanese text | 9,804 |
| Examples missing Japanese, romanization or German | 0 |

Sentence comparison ignores punctuation and whitespace. This catches one
additional cosmetic duplicate beyond the original exact-string inventory.
Mechanical checks do not establish natural Japanese or semantic completeness;
each changed record also needs an actual editorial review.

## Authoring and replay

Add editable JSON batches to `authoringFiles` in the completion manifest. Each
update names a baseline ID, word, reading and original meaning. Updates may change
notes, examples, meaning and aliases; source identity and existing levels are
protected. Preserve useful existing notes and examples. Additional readings need
separate entries; additional senses belong in the existing reading's teaching
content. A shared reading is never evidence of shared meaning.

Each record needs source evidence and individual editorial findings for meaning,
Japanese, romanization, translation and distinct contexts. Each candidate decision
needs a reason, evidence and surviving targets, or an evidence-backed exclusion.
Allowed dispositions are `added`, `verified-spelling-variant`, `additional-sense`,
`additional-reading` and `excluded`. New entries also need a documented level basis.

Run `npm run import:vocabulary-completion -- --dry-run` to validate without writes,
then `npm run import:vocabulary-completion`. The importer validates the entire
proposal in memory using the actual app normalization and merging before writing.
Updates reside in source-position-specific completion rules applied after older
normalization and example overrides. Additions are appended to the level sources.
All prior identities and levels must survive. Import replay needs neither research
caches nor a network connection.

`npm run report:vocabulary-completion` checks committed runtime against authoring
and reports progress. `npm run audit:vocabulary-completion` performs the same check
but fails until all editorial work, candidate decisions and runtime content gaps
are closed. It currently fails as intended; the ordinary vocabulary audit is a
regression check and must not be described as corpus completion.

`npm run test:vocabulary-completion` uses temporary copies to test offline replay,
idempotency, both historical importers, stable runtime identities, and invalid
authoring rejection before writes. Legacy additions replay preserves later
conjugation metadata. Smoke tests exercise verified alias search.

Validation performed for this batch: vocabulary, content, data, verb and quiz
audits, lint, smoke tests and completion importer tests. The strict completion
audit remains failing because the outstanding counts above are nonzero.
