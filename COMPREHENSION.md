# Guided reading and listening

Expanded on 2026-09-05: **50 reading units and 50 listening units**, ten of each per level N5–N1, with three questions per unit (**300 total**). All passages, transcripts, German translations, questions, distractor explanations and teaching notes are original material authored for this project. These are guided learning units, not official JLPT questions or full mock exams. Existing timed tests remain separate.

The curriculum uses the official [JLPT competence descriptions](https://www.jlpt.jp/e/about/levelsummary.html) and [task categories](https://www.jlpt.jp/e/guideline/testsections.html), consulted on 2026-09-05. No official examination passages were copied. Level assignment considers discourse structure, sentence complexity, contextual demands and inference, independently of existing vocabulary tags. Advanced units are compact practice passages, not simulations of full exam passage length.

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

## Files and reproduction

- `scripts/comprehension/n5.cjs` through `n1.cjs`: editable authored sources for the original units; each includes its matching `n*-expansion.cjs` source for units 6–10. Each question lists its defensible answer first; packaging deterministically distributes answers across all four positions (76/75/74/75).
- `scripts/build-comprehension.cjs`: packages the shared stable-ID schema into lazy-loaded `comprehension-data.js` and creates `audio-manifest.json` from the same transcripts.
- `comprehension.js`: shared rendering, draft answers, submission, assistance and player lifecycle. Its read-only `counts(skill)` returns the loaded skill total and counts by level, or `null` before loading. The shared header, list introduction and card denominators derive their counts from loaded content, including uneven future groups.
- `audio/comprehension/*.wav`: 50 bundled recordings, approximately 41.3 minutes total. Audio is synthetic Japanese, native 16 kHz mono 16-bit PCM. No speech service or network synthesis is required by the application.
- `scripts/generate-comprehension-audio.ps1`: Native Windows.Media.SpeechSynthesis synthesis using installed **Microsoft Haruka** (speaker A / narration) and **Microsoft Ichiro** (speaker B). Embedded speaker changes within transcript blocks are split into separate speech segments.
- `audio/comprehension/generation.json`: generation time, engine, format, manifest checksum and each WAV checksum. The audit rejects assets that no longer match the current manifest.

Run `npm run build:comprehension`, then `./scripts/generate-comprehension-audio.ps1` in PowerShell. Windows speech synthesis required execution outside the sandbox in this environment; the project-local generator was approved. Generation changes no installed voices or system settings. Native speaking-rate settings for N5 through N1 are 0.75, 0.83, 0.91, 1.00, 1.08, with 850, 700, 550, 450, 350 ms pauses between turns/segments. Authored ruby and a reviewed substitution table specify readings of numbers, counters and selected ambiguous forms in the reproducible spoken-text manifest. Engine versions can change synthesized waveforms; checksums identify this build rather than promising identical bytes on every Windows installation.

`#reading`, `#listening`, `#reading/reading-n5-1` and `#listening/listening-n1-10` support direct navigation, refresh and Back/Forward. Filters default to N5. Workspace history/session state retains each skill's selection, level and return scroll position. Drafts and completion records use localStorage key `nihongo-comprehension-v1`. No progress is sent to a server. Storage failure leaves the current session usable and displays a notice.

The expansion preserves all 50 original unit payloads, including passage/question IDs, choice order, answer keys and time estimates, except for the audio cache revision. A before/after comparison against the pre-expansion generated content passed. No progress migration is required. All 50 recordings were regenerated through the existing native pipeline, and the cache revision is now `native16-v3`. Both generation and packing accept positive multi-digit unit numbers while retaining safe unit IDs and exact manifest/output-path matching.

## Verification completed

- `npm run audit:comprehension`: 100 units, ten per skill/level, sequential IDs, 300 questions, unique unit/passage/question IDs, four distinct choices, near-balanced answer positions, evidence references, complete metadata, beginner ruby coverage, higher-level reading support, and 50 distinct matching manifest/receipt entries. WAV checks cover checksums, PCM headers, duration, non-silence and clipping.
- `npm run test:comprehension`: all 100 units render and return 3/3 for their authored answer keys; unit-ten deep links, refresh and history; pre-expansion completion and unfinished-draft restoration; dynamic counts with an uneven extra unit; unit-wide feedback; revisable drafts; rejected incomplete submission; hints; filters/scroll; invalid URLs; lazy-load retry; audio controls and lifecycle; corrupt/unavailable storage. Native media calls are mocked, not acoustically evaluated.
- `npm run test:audio`: native format, preserved speech duration, exact pauses, zero endpoints, headroom and malformed-input rejection.
- Lint, smoke, UI and contrast checks pass for the expansion. All 26 declared text/background color pairs meet 4.5:1 in both themes. The earlier implementation also passed quiz-quality and content checks; those unrelated audits were not rerun for this expansion.
- Authoring review checked the new passages, translations, questions, distractor explanations and teaching notes against each other. This is not independent native-speaker certification.

## Required acceptance checks still pending

The user reviewed and approved the visuals before this expansion. The Browser connection was retried for the expansion: selection again returned **“No browser is available”** and discovery returned `[]`. New screenshots and the complete viewport matrix therefore remain unverified. The original matrix covers **320, 390, 768, 1024, 1440 and 1920 px**, in **both themes**, with **hover, keyboard focus, 200% text zoom and open detail panels**. Pay particular attention to the ten-unit lists, long German choices and ruby, alongside the earlier search/clear/bookmark alignment and card-spacing checks. Passing DOM and declared-color tests is not a rendered-layout review.

Every WAV passed signal-integrity checks, but **perceptual listening review of all 50 regenerated recordings is pending**. No acoustic review capability was available in this session. Signal analysis cannot establish natural prosody, speaker distinction by ear or correct pronunciation. Review each recording against its transcript, especially numbers, place names and N1 pacing; revise speech substitutions and regenerate as necessary. The full browser and listening acceptance gate must not be described as complete until those checks have actually been performed.


## Earlier crackling report and native16-v2 revision

After visual approval, the user reported crackling in the recordings. The original files showed no hard clipping or abrupt transitions into long digital silence. A local comparison probe established that both installed Japanese voices emit native **16 kHz** PCM through [Windows.Media.SpeechSynthesis](https://learn.microsoft.com/en-us/uwp/api/windows.media.speechsynthesis.speechsynthesizer), whereas the original System.Speech generator forced **24 kHz** output. This makes the legacy generation/conversion path a plausible cause, not a confirmed acoustic diagnosis.

At that time, all 25 files were regenerated through the native API, one speaker turn at a time, without resampling. `scripts/pack-comprehension-audio.cjs` preserves the speech samples except for downward-only gain when required to keep peaks below 80% of full scale, and 5 ms boundary fades. It inserts exact silent pauses, validates every selected recording before replacing files, and retains the originals under `.content-cache/audio-before-native/`. That fix used revision `native16-v2` to avoid replaying cached old files; the expanded library now uses `native16-v3`. No content or visual layout was changed in the earlier fix.

The native generator runs in Windows PowerShell for WinRT support, with a process-local execution-policy override; machine policy remains unchanged. Reproduction remains `npm run build:comprehension` followed by `./scripts/generate-comprehension-audio.ps1`. `npm run test:audio` checks output format, preserved speech length, headroom, zero endpoints, pauses and malformed-input rejection. Audio audits, guided-flow tests and lint pass for this revision. Whether the reported crackling is eliminated still requires listening confirmation; the agent cannot establish that from waveform checks alone.
