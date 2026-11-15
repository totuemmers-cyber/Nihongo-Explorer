# Verification commands

`npm run check` runs the regular checks: lint, the browser (jsdom) tests, the
content audits and the fast vocabulary workflow tests. `npm run check:full` adds
the full-tier checks: the importer tests that work on a copy of the repository
(completion rejections, replay and addition, the correction test), the quiz
review import and the runner's own test. Run the full suite at every checkpoint.

Each check reports its elapsed time and the runner reports the total. A failed
check returns a nonzero exit code and prints its last 20 lines; the other checks
finish so all failures can be addressed together. The longest checks start
first. Import, build and review commands are not checks. The importer tests
write only to their own temporary directories.

The default worker count is the smallest of six (more were no faster on a 32-core machine), one less than
the number of processor cores, and one worker per 1.5 GiB of free memory (a
full vocabulary validation needs about 1.2 GiB). Set it explicitly with
`--jobs=1` to `--jobs=16`; `--jobs=1` runs serially for diagnosis.

## Focused verification

```sh
npm run check -- --only=lint,test:vocabulary-triage
npm run check -- --only=lint,test:ui,test:storage
npm run check -- --group=vocabulary-completion
npm run check -- --changed
npm run check -- --changed=origin/main
```

The first example suits a queue-selection change; the second suits a UI change
that affects saved progress. `--group=vocabulary-completion` (also
`npm run test:vocabulary-completion`) runs the tests of the vocabulary import
workflow in parallel; changes to import, approval or campaign gating require it.

`--changed` selects checks from the files changed since `HEAD` (or the given
revision), including untracked files; it needs git on the PATH and prints why
each check was selected. A check depends on its entry scripts and on every
repository file they name in a string literal, followed through scripts. Only
changes to scripts narrow the selection. A change to an application or data
file, to a script that no check names, or a deleted file selects every check,
because those files are loaded through `index.html` or by computed names.
Documentation selects nothing.

Focused verification cannot substitute for a checkpoint's full suite. Unknown
names, duplicate options and writing commands are rejected, and `--full`,
`--only`, `--group` and `--changed` cannot be combined, so the checkpoint
command always runs the entire suite.

## Adding a check

Add the `package.json` script and one line to `REGISTRY` in `scripts/check.cjs`:
its tier (`regular` or `full`), a typical duration in seconds for scheduling, and
optionally a group. `test:check-runner` fails for any `test:` or `audit:` script
that is in neither `REGISTRY` nor `NOT_CHECKS` (scripts that are deliberately
not checks, with the reason).

Shared test helpers:

- `scripts/dom-harness.cjs`: the page served from local files, the browser
  features jsdom lacks, and polling, for the browser tests.
- `scripts/data-context.cjs`: data files evaluated as the page loads them, the
  vocabulary sources and the app's vocabulary merge, for the audits.
- `scripts/vocabulary-completion-fixture.cjs`: an isolated repository copy for
  the importer tests; modules loaded from it write only to the copy.

## Vocabulary campaign cadence

Authoring a card does not trigger all checks. Every import wave still validates
the complete proposed library and ledger before writing, including exact
approvals, source bindings, frozen identities and unchanged unallocated content.
Keep imports serialized; parallel test workers do not authorize concurrent
imports or changes to runtime data while checks are running.

Run the full suite at a verified checkpoint: 250 newly enriched entries, 50
newly resolved references, a level boundary or a handoff, whichever comes first.
Run focused checks for code changes during development. Representative browser
verification remains required at checkpoints. Offline replay, stable identities,
redirects and unchanged comprehension/audio payloads remain required at level
boundaries and campaign completion.

`audit:vocabulary` includes the completion audit: the committed runtime and
review ledger must match the importer's plan, and the review gate must be
closed. A new review campaign therefore fails `audit:vocabulary` until its
review is complete; use `npm run report:vocabulary-completion` for progress
meanwhile. The strict enrichment gate (`npm run audit:vocabulary-enrichment`)
and the level gates (`npm run audit:vocabulary-completion -- --level=N5`) stay
separate and are required for certification.
