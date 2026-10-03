# Guided reading and listening

Current library (2026-10-03): **118 reading units and 66 listening units**, **184 units and 540 questions in total**. The September 5 expansion established 50 standard units per skill, with three questions each (300 questions). Subsequent format units and the October reading expansion are documented below. All passages, transcripts, German translations, questions, distractor explanations and teaching notes are original material authored for this project. These are guided learning units, not official JLPT questions or full mock exams. Existing timed tests remain separate.

The curriculum uses the official [JLPT competence descriptions](https://www.jlpt.jp/e/about/levelsummary.html) and [task categories](https://www.jlpt.jp/e/guideline/testsections.html), consulted on 2026-09-05 and again for the reading expansion on 2026-10-03. No official examination passages were copied. Level assignment considers discourse structure, sentence complexity, contextual demands and inference, independently of existing vocabulary tags. The earlier standard units are compact practice passages; the October additions use the longer editorial ranges below.

| Level | Reading units in order | Listening units in order |
| --- | --- | --- |
| N5 | Nachricht; Speisekarte; Öffnungszeiten; Zimmer; Kursvorbereitung | Treffpunkt; Bestellung; Kinoverabredung; Taschenbesitz; Kochen |
| N4 | Terminänderung; Paketabholung; Arbeitstag; Waschmaschine; Kursvergleich | Kopierauftrag; Regenplan; Buchrückgabe; Zimmerbuchung; Festvorbereitung |
| N3 | Büchertausch; Busfahrplan; Heimarbeit; Kursbedingungen; Verpackung | Ausstellung; Zugverspätung; Praktikumsfeedback; Museumsdurchsage; Gruppenreise |
| N2 | Antwortqualität; Bibliotheksvergleich; Kennzahlen; Arbeitsraumtarife; Reparaturlernen | Softwarefreigabe; Betriebsstörung; Werbekritik; Befragungsgrenzen; Veranstaltungsort |
| N1 | Archivneutralität; Übersetzungsvergleich; Kulturförderung; Regeln und Ausnahmen; Stadtplanung | Indirekter Vorbehalt; Unsicherheit; Beteiligung; Ausstellungskonzept; Versuchsdesign |

The table above lists the original units 1–5. The second sequence adds units 6–10 in this order:

| Level | Additional reading units | Additional listening units |
| --- | --- | --- |
| N5 | Familienpostkarte; Einkaufsliste; Katzenversorgung; Stundenplan; Weg zum Blumenladen | Vorstellung; Jackenwahl; Stift ausleihen; Morgenroutine; Geburtstagsgeschenk |
| N4 | Umzugs-E-Mail; Papierabgabe; Schlüsselfund; Fotoclub; Reisetagebuch | Fahrradabholung; Schichttausch; Liefernachricht; Hemdumtausch; Hausarbeit |
| N3 | Werkzeugverleih; bargeldlose Kasse; Helferbericht; Wohnungsvergleich; Essensreste | Verlorenes Telefon; Präsentationsplanung; Terminüberschneidung; Lokalradio; Gruppenprojekt |
| N2 | Erfahrungsbewertungen; Besuchersteuerung; Anleitung neuer Kollegen; digitale Eintrittskarten; Langlebigkeit | Liefertermin; Schulungsrevision; Wintertourismus; Abholservice-Test; Redaktionsentscheidung |
| N1 | Fachwissen und Vertrauen; Dialekte; Instandhaltung; Voreinstellungen und Autonomie; gemeinsames Wissen | Kausale Behauptungen; Standardisierung; Beitragszuordnung; Organisationsgedächtnis; strategische Offenheit |

Within each level, each five-unit sequence moves from explicit orientation to independent synthesis. Units 6–10 repeat that guidance progression and the existing time-estimate range rather than increasing estimates with their absolute unit number. The additions match the established level lengths: new reading passages range from 80–113 characters at N5 to 415–470 at N1; new listening transcripts range from 102–124 at N5 to 353–388 at N1 (excluding ruby annotations). These are editorial practice lengths, not official exam specifications.

N5/N4 passages provide authored ruby on all written kanji. Higher levels offer optional ruby on authored glossary key terms. Vocabulary, translation and listening transcript hints start closed on a new attempt. Opening a hint, enabling higher-level ruby, or slowing audio marks that attempt assisted. Default beginner ruby and ordinary replay do not. Revealing help after submission does not retroactively alter the saved result. A new attempt resets answers and hints while preserving previous completion records.

## Additional JLPT task formats (27 September 2026)

Since 27 September 2026 the library also contains **34 units in five additional JLPT task formats**. They follow the ten standard units of each level and skill and continue their numbering: reading-n4-11, listening-n5-11 and so on. Standard units keep their original schema, IDs and answer keys; only format units carry a `format` field.

| Format | JLPT section | Skill | Levels | Units | Shape |
| --- | --- | --- | --- | ---: | --- |
| `quick-response` | 即時応答 | Hören | N5–N1 | 10 | four short lines, pick the most natural reply (3 choices) |
| `utterance` | 発話表現 | Hören | N5–N3 | 6 | situation description, pick what one says (3 choices) |
| `info-search` | 情報検索 | Lesen | N4–N1 | 8 | notice, timetable or rules page; combine conditions (2–3 questions) |
| `integrated` | 統合理解 | Lesen | N2–N1 | 4 | Text A and Text B on one topic; compare positions |
| `long` | 長文 | Lesen | N2–N1 | 6 | 3+ paragraphs, at least 600 (N2) / 900 (N1) characters, 3–4 questions |

Sources are `scripts/comprehension/formats-reading.cjs` and `formats-listening.cjs` (merged by `formats.cjs`). The build derives each format's introduction, practice time and question kind; answer positions are distributed per choice count. The UI shows a format label on list cards and unit headers, "Text A/B" labels on compared texts, and scores out of the unit's own question count. `npm run audit:comprehension` enforces per-format rules (skill, question and choice counts, Text A/B labels, minimum long-text length). All 34 units were checked by an independent review. The 16 new recordings were generated with the same native pipeline, as a partial run: `./scripts/generate-comprehension-audio.ps1 -Only id1,id2,…` now accepts a comma-separated list and adds receipt entries for new units. Like the earlier recordings, they still need a perceptual listening review.

## Fifty JLPT-focused reading additions (3 October 2026)

Ten original units per level add **120 questions**, growing reading from 68 to 118 units and the combined library from 134/420 to 184/540. Japanese passages have complete German translations, four distinct German choices per question, an explanation for every choice, passage evidence, glossary help and a reading-strategy note. N5/N4 annotate every written kanji with authored ruby; N3–N1 use optional glossary-based readings. Existing assistance controls and localStorage progress are retained without migration.

| Level | IDs | Short | Medium | Long | Paired | Information search |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| N5 | `reading-n5-11`–`20` | 4 | 4 | 0 | 0 | 2 |
| N4 | `reading-n4-13`–`22` | 3 | 5 | 0 | 0 | 2 |
| N3 | `reading-n3-13`–`22` | 2 | 4 | 2 | 0 | 2 |
| N2 | `reading-n2-18`–`27` | 2 | 2 | 2 | 2 | 2 |
| N1 | `reading-n1-18`–`27` | 2 | 2 | 2 | 2 | 2 |

`short` and `medium` introduce the German badges **Kurzer Text** and **Mittellanger Text**; `long`, `integrated` and `info-search` retain the existing labels. New units contain respectively 1, 3, 4, 3 and 2 questions. New estimates are five minutes for short units, eight for N5/N4 medium units and twelve for N3–N1 medium units, eight for information search, twelve for paired texts, and fifteen/eighteen/twenty for N3/N2/N1 long units. Earlier units retain their estimates and full payloads.

Editorial passage lengths count visible Japanese text after removing ruby markup; Text A/B labels are excluded. These ranges follow the approximate lengths and purposes in official level guidance: [N5](https://jlpt.jp/e/guideline/pdf/n5_e_revised.pdf), [N4](https://www.jlpt.jp/e/guideline/pdf/n4_e_revised.pdf), [N3](https://www.jlpt.jp/e/guideline/pdf/n3_e.pdf), [N2](https://www.jlpt.jp/e/guideline/pdf/n2_e.pdf), [N1](https://www.jlpt.jp/e/guideline/pdf/n1_e.pdf). They are editorial targets rather than official length limits or certified JLPT difficulty assignments. N2 long units practise thematic comprehension; N3 and N1 also include long-passage comprehension.

| Level | Short | Medium | Long | Paired, combined | Information search |
| --- | --- | --- | --- | --- | --- |
| N5 | 60–100 | 220–280 | — | — | 220–280 |
| N4 | 100–200 | 400–500 | — | — | 350–450 |
| N3 | 150–200 | 300–400 | 500–600 | — | 550–650 |
| N2 | 180–240 | 450–550 | 850–1,000 | 550–650 | 650–750 |
| N1 | 180–240 | 450–550 | 900–1,100 | 550–650 | 650–750 |

The new sequence progresses from concrete messages, daily experiences and timetables at N5/N4 to reference tracking and changes in perspective at N3, qualified claims and synthesis at N2, and interpretive limits, implied stance and tightly constrained conditions at N1. Authoring review compared every passage, translation, answer and distractor; this is not independent native-speaker certification.

## Files and reproduction

- `scripts/comprehension/n5.cjs` through `n1.cjs`: editable authored sources for the original units; each includes its matching `n*-expansion.cjs` source for units 6–10. Each question lists its defensible answer first; packaging deterministically distributes answers across all four positions (76/75/74/75).
- `scripts/comprehension/reading-additions.cjs`: 50 October reading additions, grouped by level and appended after each level's existing standard and format units. Each authored question places the defensible choice first; a separate counter distributes only the new answer keys, exactly 30/30/30/30.
- `scripts/comprehension/legacy-payload-hashes.json`: SHA-256 checks for all 134 pre-October unit payloads and the unchanged audio manifest (normalized to LF). The audit rejects changes to existing IDs, choices, answer keys or any other payload field.
- `scripts/build-comprehension.cjs`: packages the shared stable-ID schema into lazy-loaded `comprehension-data.js` and creates `audio-manifest.json` from the same transcripts.
- `comprehension.js`: shared rendering, draft answers, submission, assistance and player lifecycle. Its read-only `counts(skill)` returns the loaded skill total and counts by level, or `null` before loading. The shared header, list introduction and card denominators derive their counts from loaded content, including uneven future groups.
- `audio/comprehension/*.wav`: 66 bundled recordings, approximately 47.3 minutes total. Audio is synthetic Japanese, native 16 kHz mono 16-bit PCM. No speech service or network synthesis is required by the application. The October reading expansion changes neither the recordings nor their manifest and needs no audio generation.
- `scripts/generate-comprehension-audio.ps1`: Native Windows.Media.SpeechSynthesis synthesis using installed **Microsoft Haruka** (speaker A / narration) and **Microsoft Ichiro** (speaker B). Embedded speaker changes within transcript blocks are split into separate speech segments.
- `audio/comprehension/generation.json`: generation time, engine, format, manifest checksum and each WAV checksum. The audit rejects assets that no longer match the current manifest.

For reading-only edits, run `npm run build:comprehension`; the unchanged audio manifest is retained byte for byte. When changing listening material, also run `./scripts/generate-comprehension-audio.ps1` in PowerShell for the affected recordings. Windows speech synthesis required execution outside the sandbox in the earlier environment; the project-local generator was approved. Generation changes no installed voices or system settings. Native speaking-rate settings for N5 through N1 are 0.75, 0.83, 0.91, 1.00, 1.08, with 850, 700, 550, 450, 350 ms pauses between turns/segments. Authored ruby and a reviewed substitution table specify readings of numbers, counters and selected ambiguous forms in the reproducible spoken-text manifest. Engine versions can change synthesized waveforms; checksums identify this build rather than promising identical bytes on every Windows installation.

`#reading`, `#listening`, `#reading/reading-n5-1` and `#listening/listening-n1-10` support direct navigation, refresh and Back/Forward. Filters default to N5. Workspace history/session state retains each skill's selection, level and return scroll position. Drafts and completion records use localStorage key `nihongo-comprehension-v1`. No progress is sent to a server. Storage failure leaves the current session usable and displays a notice.

The September 5 expansion preserved all 50 then-existing unit payloads, including passage/question IDs, choice order, answer keys and time estimates, except for the audio cache revision. A before/after comparison against that pre-expansion generated content passed. At that time all 50 recordings were regenerated through the existing native pipeline with cache revision `native16-v3`. The October reading expansion preserves all 134 preceding unit payloads without exceptions, including audio revisions. No progress migration is required. Both generation and packing accept positive multi-digit unit numbers while retaining safe unit IDs and exact manifest/output-path matching.

On 2026-09-22 `listening-n3-7` was re-recorded alone (`./scripts/generate-comprehension-audio.ps1 -Only listening-n3-7`): its speech text had left 十分 ("ten minutes") in kanji, which the voice can read as じゅうぶん. The substitution table now spells it じっぷん, the unit's cache revision is `native16-v4`, and the generation receipt lists the run under `partialRegenerations`. `npm run audit:comprehension` rejects time-context 十分 in speech text. This recording is also not yet perceptually reviewed.

## Verification completed

- `npm run audit:comprehension`: 184 units, 540 questions, sequential IDs, the exact new format mix and question counts, all 50 editorial length ranges and time estimates, 30/30/30/30 new answer positions, unchanged payload hashes for 134 earlier units, unchanged audio manifest, unique IDs, choice and passage evidence, complete metadata, beginner ruby coverage and higher-level reading support. All 66 WAVs match their receipts; audio checks cover PCM headers, duration, non-silence and clipping.
- `npm run test:comprehension`: all 184 units render and score against their authored answer keys; exact format labels; final-reading-unit deep links on all five levels, refresh and history; one-question 0/1 and 1/1 scoring, saved draft, help and result restoration, repeat attempts; older completion and unfinished-draft restoration; dynamic counts with an uneven extra unit; unit-wide feedback; rejected incomplete submission; hints; filters/scroll; invalid URLs; lazy-load retry; audio controls and lifecycle; corrupt/unavailable storage. Native media calls are mocked, not acoustically evaluated.
- `npm run test:audio`: native format, preserved speech duration, exact pauses, zero endpoints, headroom and malformed-input rejection.
- `npm run check:full`: all 21 declared lint, regression and read-only content checks passed, including the vocabulary workflow tests. A repeated October build produced byte-identical `comprehension-data.js` and `audio-manifest.json` outputs.
- Authoring review checked the new passages, translations, questions, distractor explanations and teaching notes against each other. This is not independent native-speaker certification.

## Browser and listening review

The October reading additions were rendered in headless Chrome at **320 and 1440 px in both themes**, for a short unit (`reading-n5-11`), long unit (`reading-n1-22`), information-search unit (`reading-n4-21`) and paired-text unit (`reading-n2-24`). The 16-route matrix produced 32 screenshots covering passage and question views; representative screenshots from every format/width/theme combination were visually inspected. Browser checks found no horizontal document overflow or JavaScript exceptions. Artifacts are in the workspace's `review-output/reading-expansion-*` files. This scoped review does not cover the earlier, broader six-width matrix with hover, keyboard focus and 200% text zoom.

Every WAV passed signal-integrity checks, but **perceptual listening review of the existing recordings remains pending**. The October work adds reading content only. Signal analysis cannot establish natural prosody, speaker distinction by ear or correct pronunciation. Review recordings against their transcripts, especially numbers, place names and N1 pacing; revise speech substitutions and regenerate as necessary. The reading expansion does not claim to complete that earlier listening gate.


## Earlier crackling report and native16-v2 revision

After visual approval, the user reported crackling in the recordings. The original files showed no hard clipping or abrupt transitions into long digital silence. A local comparison probe established that both installed Japanese voices emit native **16 kHz** PCM through [Windows.Media.SpeechSynthesis](https://learn.microsoft.com/en-us/uwp/api/windows.media.speechsynthesis.speechsynthesizer), whereas the original System.Speech generator forced **24 kHz** output. This makes the legacy generation/conversion path a plausible cause, not a confirmed acoustic diagnosis.

At that time, all 25 files were regenerated through the native API, one speaker turn at a time, without resampling. `scripts/pack-comprehension-audio.cjs` preserves the speech samples except for downward-only gain when required to keep peaks below 80% of full scale, and 5 ms boundary fades. It inserts exact silent pauses, validates every selected recording before replacing files, and retains the originals under `.content-cache/audio-before-native/`. That fix used revision `native16-v2` to avoid replaying cached old files; the expanded library now uses `native16-v3`. No content or visual layout was changed in the earlier fix.

The native generator runs in Windows PowerShell for WinRT support, with a process-local execution-policy override; machine policy remains unchanged. Reproduction remains `npm run build:comprehension` followed by `./scripts/generate-comprehension-audio.ps1`. `npm run test:audio` checks output format, preserved speech length, headroom, zero endpoints, pauses and malformed-input rejection. Audio audits, guided-flow tests and lint pass for this revision. Whether the reported crackling is eliminated still requires listening confirmation; the agent cannot establish that from waveform checks alone.
