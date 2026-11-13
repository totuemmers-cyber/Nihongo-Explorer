# English interface and content

The app runs in German (default) or English. The language switch (Deutsch | English) sits at
the top of the sidebar, so it stays in place when the page reloads. The choice is stored in
`localStorage` as `nihongo-lang`. Switching reloads the page, and the session restore returns
to the same tab and entry.

German stays the source language. No German file is edited for a translation, and every German check keeps running on German data.

## Interface strings

- `i18n.js` holds the language state and `tr()`. Code calls `tr('<German text>')` or
  `tr('{count} von {total} Ergebnissen', { count, total })`. Unknown keys fall back to German.
- `i18n-en.js` maps each German interface string to English. It covers the static markup in
  `index.html`, which `localizeDocument()` translates at load. Elements with a `lang` attribute
  (Japanese text, the language switch) are left alone.
- Data values used as keys stay German: word types (`Nomen`), categories (`Partikel`,
  `Geräusche`, `Alltag`), patterns and conjugation form labels. Filters, bookmarks, saved state,
  CSS classes and quiz logic use them unchanged; only their display goes through `tr()`.
- `quiz.js` and `grammar-lessons.js` define a local fallback `tr`, because the audits run them
  without the page.
- `scripts/i18n-keys.cjs` lists every key the code and the markup need
  (`node scripts/i18n-keys.cjs --missing=en`). `npm run test:i18n` fails on a missing key, on
  placeholders that differ, and on German left in the English page frame.

When you add interface text, write it in German, wrap it in `tr()` and add the English entry
to `i18n-en.js`.

## Content

Translations are authored per record in `i18n/en/<dataset>.json`. Each record is stored as
`{ src: <hash of the German fields>, en: { <field path>: <English> } }`.
`npm run build:english` (`scripts/build-english.cjs`) bakes them into copies of the data files
under `en/`, with the same globals and the same shape. It also writes `en/manifest.js`, which
tells the loader which files to fetch in English.

- **Fallback:** a dataset without translations gets no `en/` file, so its German file loads. Untranslated records inside a translated dataset keep their German text.
- **Stale records:** a record whose German changed after translation is not applied. It shows in German until it is translated again; `status` and `--check` list it.
- **Field names:** copies keep the German field names, for example `example.german` holds the English sentence. The code reads both languages the same way.
- **Derived fields:** some fields are not translated directly. The grammar cloze quiz copies its example's translation, because the quiz compares the two. Vocabulary level notes are rendered from their templates (`englishLevelNote`). The meanings in `comprehension-links.js` come from the English vocabulary.
- **Lessons:** `grammar-lessons.js` mixes code and content. Its English is the patch `en/grammar-lessons-text.js`, which the lesson module applies before it builds its search index. A lesson whose section or example counts changed keeps its German.
- **Rebuild after German edits:** `npm run audit:english` (part of `npm run check`) fails when `en/` is out of date. Rebuild after any edit of German content and after `npm run build:vocab-runtime`.

| Dataset | Source | Records | Fields |
| --- | --- | ---: | --- |
| kana | kana-data.js | 5 | name, note, example glosses |
| radicals | kangxi-radicals-data.js | 214 | meaning, explanation, example meanings |
| counters | counters-data.js | 143 | meaning, usage, notes, examples, special forms; basic-number notes |
| kanji | kanji-data.js, kanji-n1.js | 2,474 | meanings, component meanings, example meanings |
| grammar | grammar-data.js, -n2, -n1, keigo-data.js | 745 | meaning, explanation, formation, notes, examples, cloze distractor reasons |
| onomatopoeia | onomatopoeia-data.js | 349 | meaning, usage, explanation, notes, examples |
| vocab | vocab-runtime.js + details | 16,221 | meaning, examples, notes |
| comprehension | comprehension-data.js | 184 | title, objective, introduction, translation, note, glossary, questions, choices, explanations |
| lessons | grammar-lessons.js | 157 | title, subtitle, intro, section headings, texts, tips, examples |

As of 2026-11-13, kana, radicals and counters are fully translated.

## Translation workflow

```sh
node scripts/build-english.cjs status
node scripts/build-english.cjs extract vocab --level=N5 --limit=50 --out=batch.json
#   translate: batch.json holds [{ key, context, de }]; write [{ key, en }] with the same
#   field paths and shapes (same array lengths, null where de is null)
node scripts/build-english.cjs apply vocab translated.json
npm run build:english
npm run check -- --only=audit:english,test:i18n
```

`--stale` also extracts records whose German changed. `apply` rejects a batch in which any
record has a different shape. It also lists records whose English drops Japanese text from the German, for review. A deliberate drop of a German-only remark is fine.

Translator brief (as used for kana, radicals and counters):

- Translate faithfully into natural, concise English. Keep every Japanese word, kana, kanji and romaji exactly as written.
- Translate example sentences from the Japanese in `context`, with the German as a reference.
- Write glosses dictionary-style, keeping the `, ` / `; ` sense structure.
- Where a text compares with German ("im Deutschen …", German words or grammar), adapt it for English speakers: name the English equivalent, or drop a point that only matters for German. Invent no facts.

Model split (from the 150-card pilot, 2026-11-13):

- Sonnet 5.5 at medium effort does the bulk: vocabulary, kanji, onomatopoeia and examples.
- Opus 5.5 at high effort does the explanatory content: lessons, grammar explanations, distractor reasons, comprehension questions and explanations, and the roughly 300 vocabulary notes that compare with German (`extract` output whose `de.notes` mentions *Deutsch*).

## Correcting the German source

German stays the source. Fix the German first, then refresh the English:

- Vocabulary is generated from sealed review batches, so a direct edit of `vocab-n*.js`
  fails `audit:vocabulary`. Put the edits in a correction list and run
  `scripts/vocabulary-text-corrections.cjs`
  (see [the batch workflow](scripts/vocabulary-batch.md#german-text-corrections)).
- Other datasets (kanji, grammar, onomatopoeia, …) are edited in their data files.

`node scripts/build-english.cjs status` then lists the changed records as stale. They show
in German until their English is renewed: `extract <dataset> --stale`, adjust the English,
`apply`, and `npm run build:english`.
