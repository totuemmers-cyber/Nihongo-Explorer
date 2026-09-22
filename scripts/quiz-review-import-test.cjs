const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const vm = require('node:vm');
const { spawnSync } = require('node:child_process');
const root = path.resolve(__dirname,'..');
const tempRoot = fs.realpathSync(os.tmpdir());
const fixture = fs.mkdtempSync(path.join(tempRoot,'nihongo-quiz-review-'));
const grammarFiles = ['grammar-data.js','grammar-n2.js','grammar-n1.js','keigo-data.js'];
const dataFiles = [...grammarFiles,'onomatopoeia-data.js','vocab-n3.js','vocab-n2.js','vocab-n1.js'];
const scriptFiles = ['edit-content.cjs','build-quiz-review.cjs','grammar-quiz-review.json',
  'onomatopoeia-additions.tsv','onomatopoeia-enrichment.tsv','vocabulary-enrichment.tsv',
  'grammar-cloze-answers.tsv','grammar-related-aliases.json'];
const snapshot = () => dataFiles.map(f=>fs.readFileSync(path.join(fixture,f),'utf8'));
function sources() {
  return grammarFiles.map(f=>{
    const c = {GRAMMAR_DATA:[]}; c.window = c;
    vm.runInNewContext(fs.readFileSync(path.join(fixture,f),'utf8'),c);
    for(const g of c.GRAMMAR_DATA) for(const e of g.examples) if(e.cloze) delete e.cloze.quiz;
    return JSON.stringify(c.GRAMMAR_DATA);
  });
}
function run(script, succeeds=true) {
  const result = spawnSync(process.execPath,['scripts/'+script],{cwd:fixture,encoding:'utf8'});
  assert(!result.error,result.error?.message);
  if(succeeds)assert.equal(result.status,0,result.stderr||result.stdout);
  else assert.notEqual(result.status,0,'Invalid review unexpectedly accepted');
}
try {
  fs.mkdirSync(path.join(fixture,'scripts'));
  fs.mkdirSync(path.join(fixture,'.content-cache'));
  for(const f of dataFiles)fs.copyFileSync(path.join(root,f),path.join(fixture,f));
  for(const f of scriptFiles)fs.copyFileSync(path.join(__dirname,f),path.join(fixture,'scripts',f));
  const originalSources = sources(), originalFiles = snapshot();
  run('build-quiz-review.cjs');
  assert.deepEqual(snapshot(),originalFiles,'Rebuilding committed data changes files');
  run('build-quiz-review.cjs');
  assert.deepEqual(snapshot(),originalFiles,'Review build is not idempotent');
  run('edit-content.cjs');
  assert.deepEqual(sources(),originalSources,'Import changed reference content or ordering');
  const imported = snapshot();
  for(let i=0;i<grammarFiles.length;i++)assert.equal(imported[i],originalFiles[i],'Import lost compiled review');
  run('edit-content.cjs');
  assert.deepEqual(snapshot(),imported,'Editorial import is not idempotent');
  const reviewPath = path.join(fixture,'scripts','grammar-quiz-review.json');
  const review = JSON.parse(fs.readFileSync(reviewPath,'utf8'));
  review.records[0].german += ' stale review';
  fs.writeFileSync(reviewPath,JSON.stringify(review));
  run('build-quiz-review.cjs',false);
  assert.deepEqual(snapshot(),imported,'Rejected build partially wrote data');
  run('edit-content.cjs',false);
  assert.deepEqual(snapshot(),imported,'Rejected editorial import partially wrote data');
  console.log('Quiz review import passed: source preservation, rebuild/import idempotence, failure before writes.');
} finally {
  // Only remove the exact temporary directory allocated above.
  const resolved = fs.realpathSync(fixture);
  assert.equal(path.dirname(resolved),tempRoot);
  assert(path.basename(resolved).startsWith('nihongo-quiz-review-'));
  fs.rmSync(resolved,{recursive:true});
}
