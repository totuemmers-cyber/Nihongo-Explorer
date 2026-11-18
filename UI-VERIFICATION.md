# UI modernization verification

22 September 2026 vocabulary correction checkpoint: rendered in headless Microsoft
Edge at 1440, 390 and 320px, both themes, for 宥す, 明るい and 幾つ (18 states).
No page/detail horizontal overflow occurred. Screenshots in
`../review-output/vocabulary-corrections/` include long notes and examples;
representative desktop/mobile images were visually inspected. The 明るい alternative
accent label was moved onto its own line after inspection. 幾つ hides unknown pitch.
This verifies the correction checkpoint only, not the entire older browser matrix.
UI regressions cover corrected readings, conjugation, aliases, level filters,
unknown/alternative pitch, redirected bookmarks and direct links.

Reading/listening implementation, audio reproduction and additional acceptance checks are documented in [COMPREHENSION.md](COMPREHENSION.md). Collection search fields now have independent flexible wrappers, and vocabulary, grammar reference, onomatopoeia and counter cards have 12px vertical gaps. The user subsequently reviewed and approved the visuals; the automated browser viewport matrix below was not independently performed.

After the 2026-09-05 content expansion, the library provides ten reading and ten listening units per level (100 total). Lint, smoke, UI and declared-color contrast checks were rerun successfully. The comprehension tests additionally cover dynamic totals, unit-ten routes and retained legacy progress. Browser selection was retried but still returned “No browser is available”, with no discovered connections. The expanded lists and new long choices/ruby therefore still need rendered review; the earlier visual approval does not cover these additions.

Implementation date: 2026-09-05.

The static application now uses a grouped sidebar, section toolbars, character grids and reference rows. `workspace.js` owns hash navigation, history/session restoration, detail presentation, drawer/Help focus, and shared filter feedback. `Section` retains data loading, ranked filtering, sorting, and pagination. Content schemas and existing bookmark keys remain unchanged.

`styles.css` is a consolidated stylesheet organized into tokens, shared controls, shell, collections, readers, study screens, and responsive layouts. There is no appended legacy override layer.

## Automated checks

- `npm run test:storage`: startup with blocked storage getters/reads; all six bookmark collections and filters using an in-memory fallback; failed additions/removals with stale saved data; saving after quota recovery; malformed JSON and bookmark/session values; preserved bookmark IDs, preferences and reading drafts. `storage.js` shares this handling across bookmarks, theme, sound, workspace state and comprehension progress. A visible status message explains that affected changes last only until the page is reloaded. Existing storage keys remain compatible.
- `npm run lint`: syntax and encoding checks pass.
- `npm run test:smoke`: passes using local `file:` resources, including search ranking, bounded batches, all-results pagination, retry after failed loads, speech, conjugation, related vocabulary, lessons and the full 80-question N5 score calculation.
- `npm run test:ui`: passes using local resources under an HTTP origin. Covers native button activation, bookmark propagation, the original focus target after next/close, related-entry Back, section query/count/selection/scroll restoration, refresh, invalid links, lesson/article return, dialog versus pane semantics at 1920/1440/1024/768/390/320px, modal focus containment, drawer and Help dismissal, IME/modifier handling, changeable practice answers, explicit timed start, declined and confirmed exits via button/navigation/history, and timer cleanup.
- `npm run test:search`: the global search (`global-search.js`; Ctrl+K / ⌘K, `/` on tabs without their own search, the sidebar and compact-header buttons). Covers loading every section and the lessons without the vocabulary details, results per section with exact matches first and word-aware meaning ranking, the one-letter minimum, arrow keys and Enter, page shortcuts kept out of the dialog, "show all" giving the section the same query and count with its filters reset (kanji, grammar, lessons), opening an entry as a cross-reference with Back, opening a lesson, Escape returning focus, a failed section load with retry, and English strings. It also covers Japanese as it is written: an inflected form (食べられなかった) finding 食べる with what was undone, in the dialog and in the vocabulary tab's own ranking; a sentence split into linked parts, with a particle opening its grammar point; and `#search/<text>` addresses, at start-up (the dialog opens over the restored view) and typed into the address bar (the view and its address stay). It covers the reason a result gives when the query is in none of the fields its row shows (an example sentence with the match marked, a spelling variant, a category, an example word of a kanji, an explanation cut around the match) and the entries opened last: listed newest first while the field is empty, without the entries reached by paging or by a restored view, reopened from the list, and cleared.
- `npm run test:vocab-relations`: the links on a vocabulary card (`renderVocabRelations` in `section-configs.js`). Checks `vocab-verb-pairs.js` against the vocabulary (every verb is exactly one verb entry, no pair twice, no verb on both sides), then on the card of 開ける: the intransitive partner 開く and, on its card, 開ける as the transitive partner with Back; the words with the same reading; the reading and listening units the word appears in, a unit opening with "← Back" to the card and without it from the unit list; a word without any of these; and a reading shared by more than twelve words, with "show all".
- `npm run test:lookup`: `japanese-lookup.js` on the real data, without a browser. Fixed inflected forms with their reasons, guards against false matches (さかな is not 坂 + な), the search score, every form the conjugation tables show on a verb card leading back to that card (at least 99.8%; the remaining gaps are ない/なかった, which have their own entry, and rare classical forms), sentence splits (particles after kanji, kana-only text, suffixes after numbers, unknown loanwords, Latin text) and the time to split the 300-character maximum.

The search accepts Japanese as it is written. `japanese-lookup.js` reduces an inflected form step by step with ending rules (about 250, generated from the godan table plus ichidan, する, 来る, い- and な-adjective and auxiliary rules) and accepts a result only when a vocabulary entry of the matching kind carries it, so 食べられなかった → 食べる (potential or passive · negative · past). Over the inflected verb and adjective forms that MeCab finds in the app's 184 reading and listening units, it finds the right card for 95.6% (the plain substring search found 6.6%). A pasted sentence is split by the cheapest path through the text: headwords cost least, then inflected headwords, then words found by their kana reading; after a kanji or katakana word, は, が, を, に … are particles, and particles and the copula link to their grammar points. A single kanji without a word links to its kanji card. Splitting takes at most the first 300 characters. `#search/<text>` (spaces may be written as `+`) opens the dialog with that text; the help shows the full address with `%s` for the browser's search-engine setting.
- `npm run test:contrast`: all 26 declared text/background combinations exceed 4.5:1 in both themes. N5/N4 are 6.22:1/6.19:1 in light mode and 7.42:1/7.34:1 in dark mode. The minimum tested combination is 5.22:1.

The DOM tests simulate native button default activation because jsdom does not generate it. They verify responsive state and semantics, not rendered layout or browser Tab order. Contrast tests verify declared colors, not screenshots.

## Browser acceptance gate — pending

The Browser runtime initialized, but selection reported “No browser is available” and discovery returned an empty list. No connected-browser screenshots or visual acceptance claim have been produced.

Once a browser is connected, serve this directory locally (`python -m http.server 8765 --bind 127.0.0.1`) and open `http://127.0.0.1:8765/`.

Capture and inspect these states:

| Viewport | Required review |
| --- | --- |
| 1440px | Every section in light and dark themes; vocabulary and Kanji with the 440px nonmodal reader; grammar index and lesson article; both number subviews; practice and timed quiz |
| 1920px | Dense Kanji/radical grids, long vocabulary rows, long reference and lesson content |
| 1024px | Sidebar and centered modal details; labeled filters; long tables |
| 768px | Navigation drawer and centered modal details; long German and Japanese content |
| 390px, 320px | Navigation drawer, fullscreen details, Kana tables, reference rows, lesson tables, counters and quiz choices |

For every viewport check visible keyboard focus, actual Tab order, 44px targets, no page-level horizontal overflow, locally scrolling labeled tables, selected-result visibility, scroll preservation, and theme readability. Repeat with reduced motion. Inspect the empty-bookmark state, no matches, failed lazy loading and retry, and next/previous at collection boundaries. Save actual screenshots before declaring the visual gate complete.

## Link examples

- `#kana`, `#vocab`, `#kanji`
- `#kanji/水` (the address bar may percent-encode Japanese characters)
- `#grammar/lesson`, `#grammar/lesson/lesson-n1-pretext`
- `#counters/numbers`

Entry routes use the existing data IDs, including source-scoped vocabulary IDs. Invalid entry routes return to the collection with a visible explanation. Filters and browsing state are retained in session storage where available; the application still works when session storage is unavailable.

## Vocabulary revision checkpoint — 22 September 2026

The vocabulary-specific browser checks ran in a dedicated headless Edge profile
against the local application. Thirty detail states covered 宥す, お父さん, 幾ら,
the new イクラ entry, and unknown-pitch 幾つ at 1440/390/320px, in light and dark
themes. All loaded their exact deep-link IDs, with no page or reader horizontal
overflow. The checks found one pitch diagram for 宥す/お父さん, two attested
alternatives for each いくら sense, and a hidden diagram for 幾つ.

Screenshots and layout findings are saved in
`../review-output/vocabulary-workflow/`. The 320px dark family examples/note,
1440px light food detail, and 390px light price/concessive detail were visually
inspected for wrapping, readable spacing and sense separation. Long notes and
examples remain accessible through the existing reader scrolling.

The UI regression suite also checks that searching いくら finds both entries,
the N5 filter includes the food entry while preserving the price entry's N3
estimate, its explicit addition ID opens directly, and bookmarking the food does
not bookmark the price question. Storage, smoke, UI and declared-color contrast
tests passed. This is vocabulary checkpoint verification; it does not close the
broader all-section browser gate or the incomplete vocabulary editorial gate.
