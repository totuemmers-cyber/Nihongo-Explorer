# Content update — September 2026

## Guided comprehension

The 100 original reading/listening units, 300 questions and 50 bundled synthetic
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

## Vocabulary corrections — 22 September 2026

The current append-only workflow uses the versioned `risk-based-v1` review policy.
Dictionary and pitch caches prepare evidence leads but never approve content.
Every accepted entry has a content-bound first pass. Additions, corrections,
ambiguous judgments, changed teaching content, and a deterministic 10% routine
sample require a different reviewer. Adequate existing entries may retain one
reviewed example and no usage note; additions and distinctions still require a
specific German note and two different contexts. The former full-enrichment rule
remains available as a separate audit and all earlier approvals keep their stricter
historical policy.

[Batch 002](scripts/vocabulary-completion/002.json) records original/replacement
values, individual lexical findings, usage/examples review, second-pass hashes,
candidate dispositions and accent research. The historical manifests remain intact.
[Current counts and open work](scripts/vocabulary-completion/README.md) distinguish
mechanical source matches from completed editorial review.

The [Kanji Kentei Foundation's 宥す entry](https://www.kanjipedia.jp/kotoba/0006860900)
confirms ゆるす and its forgiving/pardoning sense; it separately links 宥める.
The cached JMdict XML was searched with reading and sense restrictions respected.
Its SHA256 identifies the exact local snapshot in each evidence record. German
definitions, notes and examples are editorial teaching content. JMdict attribution:
Electronic Dictionary Research and Development Group, [licensing information](https://www.edrdg.org/edrdg/licence.html).

Accent reference: National Institute for Japanese Language and Linguistics,
**現代書き言葉UniDic 2025.12**, the
[versioned archive](https://clrd.ninjal.ac.jp/unidic_archive/2512/unidic-cwj-202512.zip).
Source SHA256, byte locator in `sys.dic`, actual written/kana form, part of speech,
grammatical form, lemma and `aType` establish the recorded match. Interpretation
follows the package's `rewrite.def` and [UniDic FAQ](https://clrd.ninjal.ac.jp/unidic/faq.html).
Redistribution of the small cited feature extracts follows the package's
[modified BSD license](scripts/vocabulary-completion/UNIDIC-LICENSE.txt).
Copyright (c) 2023 National Institute for Japanese Language and Linguistics.

UniDic independently supplies exact 宥す/ユルス dictionary-form rows, godan -す
and accent 2. 明るい has attested alternatives 0 and 3, both shown in details.
For 幾つ, no exact written-form/kana row was found and an
[OJAD lookup](https://www.gavo.t.u-tokyo.ac.jp/ojad/search/index/word:幾つ) could not
be retrieved. No inspected primary accent entry resolved that gap; runtime pitch
is null, with the former 1 and the research limitations preserved in the audit.
The remaining pitch research leads do not yet certify values for other entries.

## Append-only vocabulary review — 22 September 2026

The [version 3 authoring manifest](scripts/vocabulary-review-workflow.json) pins
historical files and adds drafts, separate critical passes, corrections and
individual source-reference decisions. [Current coverage](scripts/vocabulary-completion/README.md)
is 159 accepted entries, with 12,947 entry reviews and 3,917 candidate groups still
open. The new state/approval machinery does not turn a dictionary match into an
editorial acceptance. Original evidence and rejected drafts remain in the history.

The same hashed JMdict and UniDic snapshots were researched separately for every
raw reference spelling and reading, as well as the normalized candidate key. This
matters for いくら/イクラ: JMdict **1219980** covers amount/concessive uses, while
**1021180** covers salmon roe. The exact UniDic food row is
`sys.dic@54095125`, orthography/kana イクラ, common noun, lemma `イクラ-ikra`, accents
0 and 1. The second pass rejected the proper-name row and the interrogative lemma
even though their orthography and reading matched. The
[デジタル大辞泉 entry](https://kotobank.jp/word/%E3%81%84%E3%81%8F%E3%82%89-3142893)
also supports the food sense and Russian etymology. The new food entry's estimated
N5 comes from its own frozen Nihongo Master reference alone; the level uncertainty
is explicit and is not resolved by the unrelated question-word references.

For お父さん, お母さん, お兄さん and お姉さん, the versioned UniDic scan had no exact
complete-title row. The Japan Foundation's **Irodori 初級1 ことばリスト, Nepali edition,
2021-10-01**, [PDF page 55 / printed L17-4](https://nd.jpf.go.jp/wp-content/uploads/2022/06/wordlist_Y.pdf#page=55),
prints the complete words with a downstep after the second mora; notation is
explained on PDF page 2. These are cited full-word accents, not predictions from
components or synthesized speech. Attribution: © The Japan Foundation.

The [Agency for Cultural Affairs' family-register explanation](https://www.bunka.go.jp/seisaku/kokugo_nihongo/kokugo_shisaku/keigo/chapter7/detail.html)
supports the distinction between family address/familiar reference and referring
to one's own family to outsiders. German notes and new teaching examples are
original editorial content. Existing useful sentences and romanization conventions
were retained. The separate pass corrected the overly narrow German rendering of
会社員 and the simple negative in the earlier 宥す note.

[Saved research](scripts/vocabulary-completion/007-research.json) contains open
questions and raw restricted dictionary/accent leads for ten candidate references.
Those leads remain unapproved, including the alternate readings ゆく and きたる,
human counters/suffixes and the unusual 反る/かえる source row. They are not evidence
of corpus completion or verified runtime pitch.

The risk-based pilot batches 008a–008c use those same versioned JMdict and UniDic
snapshots for 75 further entry reviews. The routine sample covers 7 of 59 routine
records; all 16 consequential records were independently reviewed. Seven rejected
records were corrected and separately reread in batch 009. The pilot preserved
attested accent alternatives and corrected Japanese/German teaching content,
including the go-to-bed sense of 寝る and distinctions between いる/要る,
易しい/優しい and 早い/速い. Saved candidate findings remain research until an
individual reference decision and its final target content are accepted.

Batch 010 resolves seven source references with five documented spelling aliases;
broader senses in よい, 為る and 曲る remain open. Batch 011 reviews another 25
entries, including independent checks of six corrections and two routine samples.
For 郵便局, 図書館, 飛行機 and 自転車, exact complete-word UniDic lookup was
inconclusive. The [OJAD word search](https://www.gavo.t.u-tokyo.ac.jp/ojad/search)
provided complete noun forms, retrieved 22 September 2026. Each accepted record
embeds its exact word URL, row identifier, retrieval timestamp, HTML SHA256 and
accent markup. These support accents 3, 2, 2 and 0 respectively; 自転車's earlier
2 was corrected to 0. OJAD attribution: University of Tokyo, Minematsu and Saito
laboratories. These are attested full-word forms, not combined component accents.

Batch 012 uses the same restricted JMdict and UniDic snapshots for 25 further
reviews. 大変's adverbial and adjectival uses have separate supporting UniDic rows.
For お茶, no exact UniDic row was available; the Japan Foundation's official
[Marugoto Elementary 2 vocabulary index](https://marugoto.jpf.go.jp/assets/docs/download/elementary2_c/MarugotoElementary2CompetencesVocabularyIndex2_PT.pdf)
supplies the complete おちゃ form with a flat accent mark (pattern 0).
