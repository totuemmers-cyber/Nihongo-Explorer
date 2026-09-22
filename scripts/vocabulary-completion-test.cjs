const assert = require('assert');
const fs = require('fs');
const path = require('path');
const os = require('os');
const {spawnSync} = require('child_process');
const {root} = require('./vocabulary-tools.cjs');
const temp = fs.realpathSync(os.tmpdir());
const fixture = fs.mkdtempSync(path.join(temp,'nihongo-vocabulary-completion-'));
const files = ['vocab-n5.js','vocab-n4.js','vocab-n3.js','vocab-n2.js','vocab-n1.js','vocab-correction-rules.js','scripts/vocabulary-completion/ledger.json'];
const snapshot = () => files.map(f=>fs.readFileSync(path.join(fixture,f),'utf8'));
function run(script,args=[],success=true) {
  const result=spawnSync(process.execPath,[script,...args],{cwd:fixture,encoding:'utf8'});
  assert(!result.error,result.error?.message);
  assert.equal(result.status===0,success,result.stderr||result.stdout);
}
try {
  for (const name of fs.readdirSync(root)) if (/\.js$/.test(name)) fs.copyFileSync(path.join(root,name),path.join(fixture,name));
  fs.cpSync(path.join(root,'scripts'),path.join(fixture,'scripts'),{recursive:true});
  assert(!fs.existsSync(path.join(fixture,'.content-cache')),'Fixture must have no research cache');
  run('scripts/import-vocabulary-completion.cjs');
  const once = snapshot();
  run('scripts/import-vocabulary-completion.cjs',['--dry-run']);
  assert.deepStrictEqual(snapshot(),once,'Dry run wrote data');
  run('scripts/import-vocabulary-completion.cjs');
  assert.deepStrictEqual(snapshot(),once,'Repeated completion import changes files');
  run('scripts/audit-vocabulary-completion.cjs',['--progress']);
  run('scripts/audit-vocabulary-completion.cjs',[],false);
  // The legacy content editor writes diagnostics here; no reference inputs.
  fs.mkdirSync(path.join(fixture,'.content-cache'));
  for (const legacy of ['scripts/import-vocabulary-additions.cjs','scripts/edit-content.cjs']) {
    run(legacy);
    run('scripts/audit-vocabulary-completion.cjs',['--progress']);
    run('scripts/import-vocabulary-completion.cjs');
    const replay = snapshot();
    for (let i=0;i<files.length;i++) if(replay[i]!==once[i]) {
      let offset=0; while(replay[i][offset]===once[i][offset]) offset++;
      throw new Error(legacy+' changes '+files[i]+' at '+offset+': '+JSON.stringify([once[i].slice(offset,offset+140),replay[i].slice(offset,offset+140)]));
    }
  }
  const batchFile = path.join(fixture,'scripts/vocabulary-completion/001.json');
  const authored = JSON.parse(fs.readFileSync(batchFile,'utf8'));
  const invalid = [
    b=>{b.additions[0].entry.examples[1].japanese=b.additions[0].entry.examples[0].japanese;},
    b=>{b.additions[0].entry.examples[0].romaji='';},
    b=>{b.updates[0].id='vocab-n5:999999';},
    b=>{b.updates[0].originalMeaning='unrelated sense';},
    b=>{b.updates[0].patch.level='N1';},
    b=>{b.decisions[0].targets=['nonexistent|むこう'];},
    b=>{b.decisions.push(b.decisions[0]);},
    b=>{b.additions[0].evidence=[];},
    b=>{delete b.updates[0].review.contexts;},
    b=>{b.updates[0].patch.aliases='not-an-array';}
  ];
  for (const mutate of invalid) {
    const b=structuredClone(authored); mutate(b);
    fs.writeFileSync(batchFile,JSON.stringify(b));
    run('scripts/import-vocabulary-completion.cjs',[],false);
    assert.deepStrictEqual(snapshot(),once,'Rejected authoring wrote data');
  }
  fs.writeFileSync(batchFile,JSON.stringify(authored));
  const correctionsFile=path.join(fixture,'scripts/vocabulary-completion/002.json');
  const corrections=JSON.parse(fs.readFileSync(correctionsFile,'utf8'));
  const invalidCorrections=[
    b=>{b.reviews[0].original.reading='unrelated';},
    b=>{b.reviews[0].replacement.reading='なだめる';},
    b=>{b.reviews[0].secondPass.contentHash='stale';},
    b=>{b.reviews[0].pitch.evidence=[];}
  ];
  for(const mutate of invalidCorrections) {
    const b=structuredClone(corrections); mutate(b);
    fs.writeFileSync(correctionsFile,JSON.stringify(b));
    run('scripts/import-vocabulary-completion.cjs',[],false);
    assert.deepStrictEqual(snapshot(),once,'Rejected correction wrote data');
  }
  // Persist a synthetic correction-driven addition in the isolated copy, then
  // exercise the real historical strip/rebuild path twice without research files.
  const completed=JSON.parse(fs.readFileSync(path.join(fixture,'scripts/fixtures/vocabulary-completion-complete.json'),'utf8'));
  const entry={...completed.entries[0],senseKey:'test-import-only'};
  const {hash,project}=require('./vocabulary-correction-pipeline.cjs');
  const addition={...completed.reviews[0],id:'vocab-n5:correction:offline-fixture',entry,
    levelBasis:'Synthetic importer fixture, not production editorial work.',reason:'Exercise correction-driven additions outside the historical queue.'};
  delete addition.original; delete addition.originalHash; delete addition.replacement;
  addition.secondPass={...addition.secondPass,contentHash:hash(project(entry))};
  // Restore the sealed historical batch. New work must append a v3 batch.
  fs.writeFileSync(correctionsFile,JSON.stringify(corrections));
  const workflowPath=path.join(fixture,'scripts/vocabulary-review-workflow.json');
  if(fs.existsSync(workflowPath)) {
    const workflowText=fs.readFileSync(workflowPath,'utf8');
    const authoredFile='scripts/vocabulary-completion/006-accepted.json';
    const authoredText=fs.readFileSync(path.join(fixture,authoredFile),'utf8');
    const invalidModern=[
      b=>{b.reviews[0].predecessorHash='stale';},
      b=>{b.reviews[0].predecessorRevisionHash='fork';},
      b=>{b.reviews[0].secondPass.contentHash='stale';},
      b=>{b.reviews[0].evidence[0].finding+=' changed after approval';},
      b=>{delete b.reviews[0].secondPass.decision;},
      b=>{b.decisions[0].referenceHash='unrelated';},
      b=>{b.decisions[0].targetHashes[b.decisions[0].targets[0]]='stale';},
      b=>{b.decisions[0].targets=['missing-id'];}
    ];
    for(const mutate of invalidModern) {
      const b=JSON.parse(authoredText);mutate(b);
      fs.writeFileSync(path.join(fixture,authoredFile),JSON.stringify(b));
      const m=JSON.parse(workflowText);m.batchHashes[authoredFile]=hash(b);
      fs.writeFileSync(workflowPath,JSON.stringify(m));
      run('scripts/import-vocabulary-completion.cjs',[],false);
      assert.deepStrictEqual(snapshot(),once,'Rejected v3 authoring wrote data');
    }
    fs.writeFileSync(path.join(fixture,authoredFile),authoredText);
    fs.writeFileSync(workflowPath,workflowText);
    const {entryApprovalHash}=require('./vocabulary-review-workflow.cjs');
    Object.assign(addition,{state:'accepted',revisionId:'offline-addition',predecessorHash:null,predecessorRevisionHash:null});
    Object.assign(addition.secondPass,{decision:'accepted',approvalHash:entryApprovalHash(addition,entry)});
    const batch={version:3,additions:[addition]};
    const file='scripts/vocabulary-completion/offline-fixture.json';
    fs.writeFileSync(path.join(fixture,file),JSON.stringify(batch));
    const workflow=JSON.parse(fs.readFileSync(workflowPath,'utf8'));
    workflow.authoringFiles.push(file);workflow.batchHashes[file]=hash(batch);
    fs.writeFileSync(workflowPath,JSON.stringify(workflow));
  } else {
    corrections.additions=[addition];
    fs.writeFileSync(correctionsFile,JSON.stringify(corrections));
  }
  run('scripts/import-vocabulary-completion.cjs');
  const withAddition=snapshot();
  run('scripts/import-vocabulary-completion.cjs');
  assert.deepStrictEqual(snapshot(),withAddition,'Correction addition is not idempotent');
  run('scripts/import-vocabulary-additions.cjs');
  run('scripts/import-vocabulary-completion.cjs');
  assert.deepStrictEqual(snapshot(),withAddition,'Legacy replay changes correction addition');
  console.log('Completion import: dry run, offline/legacy replay, correction additions, stable identities, open gate, and '+(invalid.length+invalidCorrections.length+(fs.existsSync(workflowPath)?8:0))+' rejection-before-write cases passed.');
} finally {
  const resolved=fs.realpathSync(fixture);
  assert.equal(path.dirname(resolved).toLowerCase(),temp.toLowerCase());
  assert(path.basename(resolved).startsWith('nihongo-vocabulary-completion-'));
  fs.rmSync(resolved,{recursive:true,force:true});
}
