# Radical examples

All 214 radicals now have a nonempty authored example list and a visible example
in the detail view. Thirteen records supply curated Japanese readings, German
meanings and the distinction between a dictionary's primary radical and a visible
component. This includes eight previously empty authoring lists and five pages
whose examples were hidden by the primary-radical index.

Rare examples without a kanji card remain readable inline; existing kanji entries
open through keyboard-accessible buttons. This does not add kanji cards or stroke
assets. The canonical library remains 214 radicals and 2,474 kanji.

[Evidence](scripts/radical-example-evidence.json) records the independently checked
KANJIDIC2 readings/classifications, KanjiVG component locators, cached source
hashes, and Japanese dictionary citations. Katakana readings are kanji on-readings;
they are not inflected standalone-word pronunciations. Historical forms such as
鹽 are distinguished from modern spellings such as 塩.

`npm run audit:content` and `npm run audit:radicals` check completeness and evidence
agreement. `npm run test:ui` covers linked and inline examples and navigation.
Headless Edge inspection verified all 214 detail views, mobile and desktop widths,
both themes, and no horizontal overflow.
