# Content update — September 2026

## Guided comprehension

The 50 original reading/listening units, 150 questions and 25 bundled synthetic
Japanese recordings are documented in [COMPREHENSION.md](COMPREHENSION.md),
including JLPT source links, editable authoring files, audio generation settings,
automated checks and the pending browser/perceptual listening acceptance checks.

## Editorial teaching content

The 36 onomatopoeia additions, 30 existing-entry enrichments, 90 vocabulary
enrichments and six advanced lessons are original teaching text for Nihongo
Explorer. Japanese sentences, romanization and German explanations are retained
in `scripts/onomatopoeia-additions.tsv`, `scripts/onomatopoeia-enrichment.tsv`,
`scripts/vocabulary-enrichment.tsv` and `scripts/advanced-lessons.json`.

This is a curated first batch, not an assertion that all N3–N1 vocabulary is now
fully covered. New onomatopoeia levels are editorial estimates. Unverified pitch
values are left null and are not displayed as known accent patterns.

NINJAL's teaching index was used as a coverage reference, not copied as a text
source: https://www2.ninjal.ac.jp/Onomatope/50_on.html

Grammar cloze answers are explicit surface spans in
`scripts/grammar-cloze-answers.tsv`. Two metalinguistic/error-comparison pages
have documented exclusions. `grammar-related-aliases.json` records reviewed
target rewrites: some point to a useful comparable pattern rather than an exact
synonym. The UI labels each link with the actual destination pattern.

## KanjiVG

All kanji primary-radical mappings and 238 newly supplied stroke diagrams use
KanjiVG, copyright Ulrich Apel and contributors, licensed CC BY-SA 3.0.

- Project: https://kanjivg.tagaini.net/
- Repository: https://github.com/KanjiVG/kanjivg
- License: https://creativecommons.org/licenses/by-sa/3.0/
- Full license: `stroke-order/KANJIVG-LICENSE.txt`
- Downloaded from the master archive; contemporaneous upstream commit:
  `55b5ba92a7cad78a62ef04db4be6f9562d949b7f`
- Downloaded archive SHA-256:
  `582a3dc638c7435cf8497fd659d2f53c130400f8715dad18b4cc1ab950584752`

The import preserves SVG paths and ordering, removes the external DTD, and adds
sequential SMIL stroke animation. These adapted diagrams and derived radical
mappings remain under CC BY-SA 3.0. Existing AnimCJK diagrams retain their own
embedded attribution and licensing.

Radicals use KanjiVG `general` where supplied and `tradit` otherwise; the source
choice is stored on each entry. Script variants are mapped to the app's inventory.
The inventory errors at Kangxi numbers 54, 96 and 162 were corrected to 廴, 玉 and
辵, with the corresponding stroke counts corrected where necessary.

## Reproduction and checks

Run `node scripts/edit-content.cjs` for the TSV edits, and
`node scripts/update-lessons.cjs` for the advanced lessons and explicit links.
Both are idempotent. `scripts/import-kanjivg.py` reads the cached upstream ZIP and
the app's exported radical list; it leaves existing diagram files intact.
The private `.content-cache` folder is ignored by Git and is not needed at runtime.

Run `npm run audit:content`, `npm run audit:radicals`, `npm run audit:quiz`,
`npm run audit:data`, `npm run audit:verbs`, `npm run lint`, and
`npm run test:smoke` to check content references, coverage, runtime merging,
question generation and user interactions.

## JLPT vocabulary expansion — 5 September 2026

This update adds 559 vocabulary entries with 1,118 original Japanese examples,
romanization, German translations and German usage notes. It also corrects 175
existing level assignments and restores 57 existing entries that the vocabulary
merge previously dropped. See [the coverage report](VOCABULARY-COVERAGE.md) for
counts, selection priorities and remaining work.

The current JLPT does not publish an exhaustive vocabulary specification:
[official JLPT FAQ](https://www.jlpt.jp/e/faq/). Level labels here are study
estimates, not official requirements or promises of exam coverage.

The comparison used these public study lists, retrieved 4–5 September 2026:

- [JLPT Sensei](https://jlptsensei.com/jlpt-n5-vocabulary-list/): all publicly
  available list pages for N5–N1; its public advanced lists are partial.
- [Nihongo Master](https://www.nihongomaster.com/jlpt-n5-vocabulary-list):
  all list pagination for N5–N1.
- [Tanos vocabulary lists](https://www.tanos.co.uk/jlpt/skills/vocab/): the five
  level-specific vocabulary PDFs. The review manifest records the actual PDF
  URLs and page fragments. Some historical entries and readings contain errors.

These publishers may share historical list ancestry. Agreement across them is
useful corroboration, not independent evidence of an official exam requirement.
536 additions have agreement from at least two publishers at the assigned level;
23 use an editorial resolution where references differ. The 175 corrections only
move clearly misplaced words into N5/N4, with at least two publishers supporting
the destination. This does not reclassify the entire existing vocabulary corpus.

The dictionary entries for
[重複](https://www.nihongomaster.com/japanese/dictionary/word/55778) and
[為さる](https://www.nihongomaster.com/japanese/dictionary/word/14694) were also
consulted for the alternative reading and honorific form respectively.
Unverified pitch accents remain null. External word/reading/level facts informed
selection; the new definitions, notes, examples and translations were authored
for this project rather than imported from the publishers.

The committed authoring sources are `scripts/vocabulary-additions.tsv`,
`scripts/vocabulary-everyday-additions.tsv`, and
`scripts/vocabulary-number-additions.cjs`. The TSV files use pipes as delimiters.
`scripts/vocabulary-review.json` retains source-page references, selected entries,
level corrections, restored entries and a disposition for every compared form.
Matching uses reviewed spelling aliases; a shared reading alone does not establish
that two words have the same meaning.

Reapply the committed content with `node scripts/import-vocabulary-additions.cjs`.
This command is idempotent, works without the research cache or network, and checks
the existing source positions before writing. Run `npm run audit:vocabulary` for
runtime survival, level, identity and provenance checks, alongside the existing
data, content, verb, quiz, lint and smoke checks.

The fetch/extract/compare/build scripts are research tools. Regenerating this
historical review requires its pre-import inventory and downloaded references in
`.content-cache/jlpt-vocabulary`; a fresh comparison of the current app is a new
review, not a replacement for that baseline. The app has no new external runtime
dependency and does not load the research manifest.
# Vocabulary completion evidence — 5 September 2026

The open completion work is documented in `scripts/vocabulary-completion/README.md`.
Batch 001 uses the locally cached English JMdict from the Electronic Dictionary
Research and Development Group (EDRDG), alongside the publisher references recorded
in the historical vocabulary review. Its evidence records the JMdict sequence
number, spellings, readings and relevant glosses for each lexical decision.
Project and attribution information: https://www.edrdg.org/jmdict/edict_doc.html
and https://www.edrdg.org/edrdg/licence.html.
The Japanese example sentences, German teaching notes and translations in this
batch were authored for this app. Dictionary sequence numbers locate lexical
evidence; they are not JLPT level certifications. Committed authoring contains the
evidence needed for replay, so the import does not fetch dictionaries or study lists.
