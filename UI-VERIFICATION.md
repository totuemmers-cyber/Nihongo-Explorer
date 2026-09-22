# UI modernization verification

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
