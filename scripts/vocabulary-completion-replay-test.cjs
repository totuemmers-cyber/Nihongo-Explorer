// In an isolated copy of the repository: rerunning a legacy content importer followed by the
// completion import restores the committed files exactly. Two parts, run as separate checks:
//   additions  scripts/import-vocabulary-additions.cjs
//   content    scripts/edit-content.cjs, after a batch edited without re-sealing has stopped the
//              command-line import before any write
// That the committed files already equal what the importer produces is checked by
// vocabulary-correction-test.cjs and audit:vocabulary.
const assert = require('assert');
const fs = require('fs');
const { createFixture } = require('./vocabulary-completion-fixture.cjs');

const legacy = { additions: 'scripts/import-vocabulary-additions.cjs', content: 'scripts/edit-content.cjs' }[process.argv[2]];
assert(legacy, 'Usage: vocabulary-completion-replay-test.cjs additions|content');
const fixture = createFixture('nihongo-vocabulary-replay-');
try {
  const committed = fixture.snapshot();

  if (process.argv[2] === 'content') {
    // A sealed batch changed on disk without a new seal: the real command fails and writes nothing.
    const sealedFile = fixture.file('scripts/vocabulary-completion/002.json');
    const sealedText = fs.readFileSync(sealedFile, 'utf8');
    const tampered = JSON.parse(sealedText);
    tampered.reviews[0].secondPass.contentHash = 'stale';
    fs.writeFileSync(sealedFile, JSON.stringify(tampered));
    const rejected = fixture.run('scripts/import-vocabulary-completion.cjs', [], false);
    assert.match(rejected.stderr, /Sealed authoring batch changed: scripts\/vocabulary-completion\/002\.json/, 'Rejected for the wrong reason');
    fixture.assertSnapshot(committed, 'Rejected import wrote data');
    fs.writeFileSync(sealedFile, sealedText);
  }

  // The legacy content editors write diagnostics here; no reference inputs.
  fs.mkdirSync(fixture.file('.content-cache'));
  const { prepare, importCompletion } = fixture.require('import-vocabulary-completion.cjs');
  const { auditCompletion } = fixture.require('audit-vocabulary-completion.cjs');
  fixture.run(legacy);
  // One validation run serves the progress audit and the import.
  const plan = prepare();
  auditCompletion(plan);
  importCompletion({ plan });
  fixture.assertSnapshot(committed, legacy + ' replay changes the committed files');
  console.log('Completion replay passed: ' + legacy + ' replay restores the committed files' +
    (process.argv[2] === 'content' ? '; an unsealed batch is rejected before any write.' : '.'));
} finally {
  fixture.remove();
}
