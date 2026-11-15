// Every invalid authoring change must be rejected by the completion validator, each for its own
// reason. Runs in-process on the committed data and writes nothing. The on-disk batch seal and the
// command-line exit path (a rejected import writes nothing) are covered by
// vocabulary-completion-replay-test.cjs.
const assert = require('assert');
const { read } = require('./vocabulary-tools.cjs');
const { prepare, authoring, manifest } = require('./import-vocabulary-completion.cjs');
const { hash } = require('./vocabulary-correction-pipeline.cjs');

const expectRejection = (label, run, reason) => {
  assert.throws(run, error => {
    assert(reason.test(error.message), label + ': rejected for the wrong reason: ' + error.message.split('\n')[0]);
    return true;
  }, label + ': invalid authoring was accepted');
};

// Version 1 completion batch (scripts/vocabulary-completion/001.json), validated before the workflow.
const v1Manifest = manifest(), v1Batches = authoring(v1Manifest);
const v1File = 'scripts/vocabulary-completion/001.json', v1Index = v1Manifest.authoringFiles.indexOf(v1File);
assert(v1Index >= 0, v1File + ' is no longer a version 1 authoring file');
const v1Cases = [
  [b => { b.additions[0].entry.examples[1].japanese = b.additions[0].entry.examples[0].japanese; }, /^Repeated Japanese example/],
  [b => { b.additions[0].entry.examples[0].romaji = ''; }, /^Incomplete example/],
  [b => { b.updates[0].id = 'vocab-n5:999999'; }, /^Unknown or changed target vocab-n5:999999/],
  [b => { b.updates[0].originalMeaning = 'unrelated sense'; }, /^Update sense mismatch/],
  [b => { b.updates[0].patch.level = 'N1'; }, /^Protected update field/],
  [b => { b.decisions[0].targets = ['nonexistent|むこう']; }, /^Addition lacks candidate decision/],
  [b => { b.decisions.push(b.decisions[0]); }, /^Unknown or repeated candidate decision/],
  [b => { b.additions[0].evidence = []; }, /^Missing evidence/],
  [b => { delete b.updates[0].review.contexts; }, /^Missing editorial check: contexts/],
  [b => { b.updates[0].patch.aliases = 'not-an-array'; }, /^Invalid aliases/]
];
v1Cases.forEach(([mutate, reason], i) => {
  const batches = structuredClone(v1Batches);
  mutate(batches[v1Index]);
  expectRejection(v1File + ' case ' + (i + 1), () => prepare(batches, v1Manifest), reason);
});

// Version 2 and 3 workflow batches. Each mutated batch is passed in re-sealed, as an author would
// commit it, so the case reaches the validation it names instead of stopping at the seal.
const workflow = JSON.parse(read('scripts/vocabulary-review-workflow.json'));
assert.equal(workflow.version, 3, 'The review workflow manifest changed version');
const workflowBatches = workflow.authoringFiles.map(file => JSON.parse(read(file)));
function workflowCases(file, cases) {
  const index = workflow.authoringFiles.indexOf(file);
  assert(index >= 0, file + ' is no longer a workflow authoring file');
  cases.forEach(([mutate, reason], i) => {
    const batches = workflowBatches.slice(), m = structuredClone(workflow);
    batches[index] = structuredClone(workflowBatches[index]);
    mutate(batches[index]);
    m.batchHashes[file] = hash(batches[index]);
    expectRejection(file + ' case ' + (i + 1), () => prepare(undefined, undefined, { manifest: m, batches }), reason);
  });
}
// The sealed historical correction batch (version 2).
workflowCases('scripts/vocabulary-completion/002.json', [
  [b => { b.reviews[0].original.reading = 'unrelated'; }, /^Original correction values mismatch/],
  [b => { b.reviews[0].replacement.reading = 'なだめる'; }, /^Second pass is stale/],
  [b => { b.reviews[0].secondPass.contentHash = 'stale'; }, /^Second pass is stale/],
  [b => { b.reviews[0].pitch.evidence = []; }, /^Missing evidence/]
]);
// An accepted revision batch (version 3).
workflowCases('scripts/vocabulary-completion/006-accepted.json', [
  [b => { b.reviews[0].predecessorHash = 'stale'; }, /^Predecessor content changed/],
  [b => { b.reviews[0].predecessorRevisionHash = 'fork'; }, /^Revision chain is stale or forked/],
  [b => { b.reviews[0].secondPass.contentHash = 'stale'; }, /^Second pass is stale/],
  [b => { b.reviews[0].evidence[0].finding += ' changed after approval'; }, /^Evidence\/review approval is stale/],
  [b => { delete b.reviews[0].secondPass.decision; }, /^Explicit second-pass acceptance required/],
  [b => { b.decisions[0].referenceHash = 'unrelated'; }, /^Candidate reference changed/],
  [b => { b.decisions[0].targetHashes[b.decisions[0].targets[0]] = 'stale'; }, /^Candidate target approval is stale/],
  [b => { b.decisions[0].targets = ['missing-id']; }, /^Missing exact target approvals/]
]);
console.log('Completion rejections passed: ' + (v1Cases.length + 12) + ' invalid authoring changes, each rejected for its own reason.');
