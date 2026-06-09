# Nihongo Explorer

A Japanese learning PWA covering JLPT N5–N1: kanji, vocabulary, grammar, reading passages, keigo, counters, idioms, and more — with a spaced-repetition system (SRS), a guided learning path (Lernpfad), quizzes, and statistics. UI language is German.

**No build step, no framework, no backend.** Plain HTML/CSS/JS served as static files (e.g. GitHub Pages). All progress is stored locally in the browser (IndexedDB, with a localStorage fallback) and can be exported/imported as a JSON backup.

## Content

| Area | Size |
|---|---|
| Vocabulary | ~12,600 entries (N5–N1), each with pitch accent, romaji and example sentences |
| Kanji | ~5,000 (incl. N1 set), with kun/on readings, components and examples |
| Grammar | ~690 patterns plus guided lessons |
| Extras | Reading passages, keigo, counters, onomatopoeia, idioms, yojijukugo, Kangxi radicals |

Large data files are **lazy-loaded per section** (see `loadScript` in `app.js`); only the app shell loads up front. The service worker (`sw.js`) is network-first and caches visited sections for offline use.

## Development

There is no build — open the project with any static file server (service worker requires http(s), not `file://`):

```sh
npx serve .
```

### Tests

```sh
npm install
npm test
```

`npm test` runs the lint pass (syntax + mojibake detection), all data audits (`audit-*.js`: schema, duplicates, quiz quality, learning path, answer checking, …) and the SRS/smoke tests. CI runs the same suite on every push via GitHub Actions (`.github/workflows/test.yml`).

## Conventions worth knowing

- **Data correction layers:** `vocab-correction-rules.js`, `vocab-corrections.js` and `vocab-example-overrides.js` patch the vocab source data at runtime (type/reading fixes, curated example sentences). New fixes go there rather than editing the multi-MB source files by hand.
- **Service worker versioning:** bump `VERSION` in `sw.js` whenever app-shell files change, so installed clients drop the old cache.
- **Icons:** `icon.svg` is the source design; the PNG variants (`icon-180/192/512`, maskable) are rasterized from it for iOS home screens and Android install prompts.
