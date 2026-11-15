// In an isolated copy of the repository: a synthetic correction-driven addition, appended as a new
// sealed version 3 batch, is imported without research files. Two parts, run as separate checks:
//   import  a dry run writes nothing, and the import is idempotent
//   replay  a legacy additions replay after the import leaves the addition intact
const assert = require('assert');
const fs = require('fs');
const { createFixture } = require('./vocabulary-completion-fixture.cjs');

const part = process.argv[2];
assert(['import', 'replay'].includes(part), 'Usage: vocabulary-completion-addition-test.cjs import|replay');
const fixture = createFixture('nihongo-vocabulary-addition-');
try {
  const committed = fixture.snapshot();
  const { prepare, importCompletion } = fixture.require('import-vocabulary-completion.cjs');
  const { hash, project } = fixture.require('vocabulary-correction-pipeline.cjs');
  const { entryApprovalHash } = fixture.require('vocabulary-review-workflow.cjs');

  const completed = JSON.parse(fs.readFileSync(fixture.file('scripts/fixtures/vocabulary-completion-complete.json'), 'utf8'));
  const entry = { ...completed.entries[0], senseKey: 'test-import-only' };
  const addition = { ...completed.reviews[0], id: 'vocab-n5:correction:offline-fixture', entry,
    levelBasis: 'Synthetic importer fixture, not production editorial work.', reason: 'Exercise correction-driven additions outside the historical queue.' };
  delete addition.original; delete addition.originalHash; delete addition.replacement;
  addition.secondPass = { ...addition.secondPass, contentHash: hash(project(entry)) };
  Object.assign(addition, { state: 'accepted', revisionId: 'offline-addition', predecessorHash: null, predecessorRevisionHash: null });
  Object.assign(addition.secondPass, { decision: 'accepted', approvalHash: entryApprovalHash(addition, entry) });
  const batch = { version: 3, additions: [addition] };
  const batchFile = 'scripts/vocabulary-completion/offline-fixture.json';
  fs.writeFileSync(fixture.file(batchFile), JSON.stringify(batch));
  const workflowPath = fixture.file('scripts/vocabulary-review-workflow.json');
  const workflow = JSON.parse(fs.readFileSync(workflowPath, 'utf8'));
  workflow.authoringFiles.push(batchFile); workflow.batchHashes[batchFile] = hash(batch);
  fs.writeFileSync(workflowPath, JSON.stringify(workflow));

  // The dry run validates the same plan the import then writes.
  const plan = prepare();
  assert(plan.items.some(v => v.id === addition.id), 'Synthetic addition missing from the plan');
  if (part === 'import') {
    importCompletion({ plan, dryRun: true });
    fixture.assertSnapshot(committed, 'Dry run wrote data');
  }
  importCompletion({ plan });
  const withAddition = fixture.snapshot();
  assert.notDeepStrictEqual(withAddition, committed, 'The import did not write the addition');
  if (part === 'import') {
    importCompletion();
    fixture.assertSnapshot(withAddition, 'Correction addition is not idempotent');
    console.log('Completion addition import passed: sealed version 3 addition imported offline, dry run without writes, idempotent import.');
  } else {
    fs.mkdirSync(fixture.file('.content-cache'));
    fixture.run('scripts/import-vocabulary-additions.cjs');
    importCompletion();
    fixture.assertSnapshot(withAddition, 'Legacy replay changes correction addition');
    console.log('Completion addition replay passed: a legacy additions replay keeps the imported addition.');
  }
} finally {
  fixture.remove();
}
