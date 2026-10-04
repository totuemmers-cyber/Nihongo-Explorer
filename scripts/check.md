# Verification commands

`npm run check:full` runs the complete suite with up to three parallel workers.
It retains all 21 original check groups and adds a short regression test for the
runner itself, for 22 groups total. Each group reports its elapsed time and the
runner reports the total. A failed group returns a nonzero exit code and prints
its diagnostics; other groups finish so all failures can be addressed together.

The long vocabulary workflow group starts first. Commands chained within a
group still run sequentially and stop at their first failure. Import, build and
review commands are excluded. Workflow tests write only to their own temporary
directories. The default falls back to one worker if less than 4 GiB of free
memory is available.

For a small change, select the checks relevant to the files and behavior changed:

```sh
npm run check -- --only=lint,test:vocabulary-triage
npm run check -- --only=lint,test:ui,test:storage
```

The first example suits a queue-selection change; the second suits a UI change
that affects saved progress. Changes to import, approval or campaign gating
also require `test:vocabulary-completion`. These are examples, not automatic
dependency detection. Select additional checks when the change reaches other
features. Focused verification cannot substitute for a checkpoint's full suite.

Use `npm run check` for the 19 regular groups, or set concurrency explicitly:

```sh
npm run check:full -- --jobs=1
npm run check -- --only=lint,test:audio --jobs=2
```

`--jobs=1` preserves serial execution for resource constraints or diagnosis.
Worker counts must be integers from 1 to 16. Unknown names, duplicate options
and writing commands are rejected. Combining `--full` with `--only` is rejected
so the checkpoint command always runs the entire suite.

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

The global completion audits are separate from `check:full`: their required
content gaps remain open during enrichment. Certification still requires those
audits and all applicable level gates to pass.
