const assert=require('assert'),fs=require('fs'),os=require('os'),path=require('path');
const {hash,project}=require('./vocabulary-correction-pipeline.cjs');
const {POLICY_ID}=require('./vocabulary-review-policy.cjs');
const {preparePackets,assemble,approve,approvalTargets,importWave,resumeJournal}=require('./vocabulary-batch.cjs');
const items=Array.from({length:80},(_,i)=>({id:'vocab-n5:'+i,word:'語'+i,reading:'ご',romaji:'go',meaning:'Wort',level:'N5',source:'vocab-n5',__sourceIndex:i,examples:[]}));
const plan={items,ledger:[],workingItems:new Map(items.map(v=>[v.id,v])),workHeads:new Map(),candidateHeads:new Map(),candidateLedger:[],manifest:{candidates:[]}};
const allocation=preparePackets(plan,{evidence:false});
assert.deepStrictEqual(allocation.packets.map(p=>p.entries.length),[25,25,25]);
assert.equal(new Set(allocation.packets.flatMap(p=>p.entries.map(e=>e.id))).size,75);
assert.equal(new Set(allocation.packets.map(p=>p.snapshotHash)).size,1);
const packet=allocation.packets[0],entry=packet.entries[0];
const record={id:entry.id,state:'accepted',revisionId:'test-0',originalHash:entry.sourceHash,predecessorHash:entry.sourceHash,predecessorRevisionHash:null,replacement:{},original:{},rationale:'Reviewed',review:{reviewer:'editor'},evidence:[{finding:'Checked'}],pitch:{status:'unknown'},policy:{id:POLICY_ID,risk:'routine',reasons:[],enrichmentRequired:false,sampled:false}};
const proposal={version:3,reviews:packet.entries.map((e,i)=>({...record,id:e.id,revisionId:'test-'+i,originalHash:e.sourceHash,predecessorHash:e.sourceHash,state:i?'researching':'accepted'})),decisions:[]};
const assembly=assemble(packet,proposal,plan);
assert.equal(assembly.batch.reviews.filter(r=>r.policy.sampled).length,1);
assert(assembly.batch.reviews.filter(r=>r.state!=='accepted').every(r=>!r.policy.sampled));
assert.equal(packet.entries[0].acceptedContentHash,hash(project(items[0])));
assert.equal(approvalTargets(assembly).length,1);
assert.throws(()=>assemble(packet,{version:3,reviews:[record]},plan),/complete fixed packet roster/);
assert(!assembly.batch.reviews[0].firstPass);
const target=approvalTargets(assembly)[0];
const first={...target,pass:'firstPass',decision:'accepted',reviewer:'editor',finding:'Inspected exact assembled content and evidence'};
const approved=approve(assembly,[first]);
assert.equal(approved.batch.reviews[0].firstPass.decision,'accepted');
assert.throws(()=>approve(assembly,[{...first,contentHash:'stale'}]),/content hash/);
assert.throws(()=>approve(assembly,[{...first,assemblyHash:'stale'}]),/different assembly/);
assert.throws(()=>approve(assembly,[{...first,decision:undefined}]),/Explicit acceptance/);
assert.throws(()=>approve(approved,[{...first,pass:'secondPass'}]),/Independent reviewer/);
const both=approve(approved,[{...first,pass:'secondPass',reviewer:'independent'}]);
assert.equal(both.batch.reviews[0].secondPass.reviewer,'independent');
const altered=JSON.parse(JSON.stringify(approved));altered.batch.reviews[0].evidence[0].finding='new';
assert.throws(()=>approve(altered,[first]),/Assembly changed/);
assert.throws(()=>assemble(packet,{...proposal,reviews:approved.batch.reviews},plan),/before approvals/);
const original=plan.workingItems.get(entry.id);plan.workingItems.set(entry.id,{...original,meaning:'Changed'});
assert.throws(()=>assemble(packet,proposal,plan),/Stale packet/);plan.workingItems.set(entry.id,original);
const base=fs.mkdtempSync(path.join(os.tmpdir(),'vocabulary-batch-'));
try {
  fs.mkdirSync(path.join(base,'scripts'),{recursive:true});
  const manifest={version:3,authoringFiles:[],batchHashes:{},activeReviewPolicy:{id:POLICY_ID,routineIndependentSamplePercent:10,sampleSeed:require('./vocabulary-review-policy.cjs').SAMPLE_SEED}};
  fs.writeFileSync(path.join(base,'scripts/vocabulary-review-workflow.json'),JSON.stringify(manifest));
  const journal=path.join(base,'journal.json'),name='scripts/vocabulary-completion/test.json';
  assert.throws(()=>importWave([both],[name],journal,{root:base,currentPlan:()=>plan,validate:()=>{throw new Error('invalid runtime');}}),/invalid runtime/);
  assert(!fs.existsSync(journal));assert(!fs.existsSync(path.join(base,name)));
  const options={root:base,currentPlan:()=>({...plan,files:{'runtime.js':'before'}}),coverageDocument:()=> 'Validated coverage'};
  fs.writeFileSync(path.join(base,'runtime.js'),'before');
  assert.throws(()=>importWave([both],[name],journal,{...options,validate:()=>{
    fs.writeFileSync(path.join(base,'runtime.js'),'edited while validating');return {files:{'runtime.js':'validated'}};
  }}),/changed during validation/);
  assert(!fs.existsSync(journal));assert.equal(fs.readFileSync(path.join(base,'runtime.js'),'utf8'),'edited while validating');
  fs.unlinkSync(path.join(base,'runtime.js'));
  assert.throws(()=>importWave([both],[name],journal,{...options,validate:()=>({files:{'surprise.js':'invalid'}})}),/unanticipated output/);
  assert(!fs.existsSync(path.join(base,'surprise.js')));
  assert.throws(()=>importWave([both],[name],path.join(base,'runtime.js'),{...options,validate:()=>({files:{'runtime.js':'validated'}})}),/Journal path collides/);
  assert(!fs.existsSync(path.join(base,'runtime.js')));
  const lock=path.join(base,'.content-cache/vocabulary-import.lock');
  fs.writeFileSync(lock,JSON.stringify({pid:process.pid,token:'live-owner'}));
  assert.throws(()=>importWave([both],[name],journal,options),/Another import/);
  assert.throws(()=>resumeJournal(journal,base),/Another import/);
  fs.unlinkSync(lock);
  // A reaped child PID models an owner killed by interruption; recovery is automatic.
  const child=require('child_process').spawnSync(process.execPath,['-e',''],{windowsHide:true});
  fs.writeFileSync(lock,JSON.stringify({pid:child.pid,token:'dead-owner'}));
  let validations=0;
  importWave([both],[name],journal,{...options,validate:()=>{
    validations++;
    // A second process must fail before reading or writing an in-progress import.
    const concurrent=require('child_process').spawnSync(process.execPath,['-e',
      'require('+JSON.stringify(path.join(__dirname,'vocabulary-batch.cjs'))+').resumeJournal('+JSON.stringify(journal)+','+JSON.stringify(base)+')'],{windowsHide:true,encoding:'utf8'});
    assert.notEqual(concurrent.status,0);assert.match(concurrent.stderr,/Another import/);
    return {files:{'runtime.js':'validated'}};
  }});
  assert(!fs.existsSync(lock));
  assert.equal(validations,1);assert.equal(fs.readFileSync(path.join(base,'runtime.js'),'utf8'),'validated');
  assert.equal(resumeJournal(journal,base).complete,true);
  // Simulate interruption with one target restored to its pre-import state.
  fs.unlinkSync(path.join(base,'runtime.js'));resumeJournal(journal,base);
  assert.equal(fs.readFileSync(path.join(base,'runtime.js'),'utf8'),'validated');
  fs.writeFileSync(path.join(base,'runtime.js'),'unexpected external edit');
  assert.throws(()=>resumeJournal(journal,base),/changed since validation/);
} finally {fs.rmSync(base,{recursive:true,force:true});}
console.log('Vocabulary batch workflow tests passed');
// Explicit additions use an immutable allocated candidate roster and two exact approvals.
const {prepareCandidatePackets,prepareDefectPacket}=require('./vocabulary-batch.cjs');
const ref={word:'synthetic',reading:'synthetic',level:'N5'},ck='synthetic-candidate',aid='vocab-n5:correction:batch-test';
const cp={...plan,manifest:{candidates:[{key:ck,references:[ref],possibleTargets:[]}]},candidateLedger:[{key:ck,references:[{index:0,referenceHash:hash(ref),state:'pending'}]}]};
const candidatePacket=prepareCandidatePackets(cp,[{key:ck,index:0,additionIds:[aid]}],{evidence:false}).packets[0];
const newEntry={...project(items[0]),senseKey:'batch-test'};
const addition={...record,id:aid,entry:newEntry,revisionId:'addition-1',predecessorHash:null,predecessorRevisionHash:null,
 reason:'Synthetic regression',levelBasis:'Synthetic N5',policy:{id:POLICY_ID,risk:'consequential',reasons:['addition'],enrichmentRequired:true,sampled:false}};
delete addition.originalHash;
const decision={key:ck,referenceIndex:0,referenceHash:hash(ref),revisionId:'candidate-1',predecessorRevisionHash:null,state:'accepted',
 disposition:'added',targets:[aid],targetHashes:{[aid]:hash(project(newEntry))},reason:'Explicit candidate finding',evidence:[{finding:'Synthetic'}],
 policy:{id:POLICY_ID,risk:'consequential',reasons:['candidate-decision'],enrichmentRequired:false,sampled:false}};
const addProposal={version:3,reviews:[],additions:[addition],decisions:[decision]};
const aa=assemble(candidatePacket,addProposal,cp);
assert.equal(approvalTargets(aa).length,2);assert.deepStrictEqual(aa.finalContent[aid],project(newEntry));
assert.deepStrictEqual(aa.batch.additions[0].policy.candidateReference,{key:ck,referenceIndex:0,referenceHash:hash(ref)});
const af=approve(aa,approvalTargets(aa).map(t=>({...t,pass:'firstPass',decision:'accepted',reviewer:'editor',finding:'Synthetic explicit acceptance'})));
const ab=approve(af,approvalTargets(af).map(t=>({...t,pass:'secondPass',decision:'accepted',reviewer:'independent',finding:'Synthetic independent acceptance'})));
assert(ab.batch.additions[0].secondPass);assert(ab.batch.decisions[0].secondPass);
const copy=v=>JSON.parse(JSON.stringify(v));
const badAddition=copy(addProposal);badAddition.additions[0].id='vocab-n5:correction:unallocated';
assert.throws(()=>assemble(candidatePacket,badAddition,cp),/fixed addition roster/);
const badTarget=copy(addProposal);badTarget.decisions[0].targetHashes[aid]='stale';
assert.throws(()=>assemble(candidatePacket,badTarget,cp),/target snapshot differs/);
const unsupportedAddition=copy(addProposal);unsupportedAddition.decisions[0].disposition='excluded';
assert.throws(()=>assemble(candidatePacket,unsupportedAddition,cp),/accepted addition decision/);
assert.throws(()=>assemble(candidatePacket,addProposal,{...cp,items:[...cp.items,{...newEntry,id:aid}]}),/addition ID now exists/);
assert.throws(()=>assemble(candidatePacket,addProposal,{...cp,manifest:{candidates:[{key:ck,references:[{...ref,meaning:'changed'}]}]}}),/Candidate source changed/);
const staleAddition=copy(aa);staleAddition.batch.additions[0].policy.candidateReference.referenceHash='changed';
assert.throws(()=>approve(staleAddition,[]),/Assembly changed/);
// Defect records preserve their explicit findings and current chain. Full affected-batch
// coverage and clearance approvals remain validated by the workflow before import writes.
const defect={id:'batch-defect',state:'open',predecessorDefectHash:null,sampledRevisionId:'historic-sample',batchRevisionIds:['historic-sample'],finding:'Synthetic substantive finding',sharedRuleRefs:[]};
const dp=prepareDefectPacket(plan,[defect]);
const da=assemble(dp,{version:3,sampleDefects:[defect]},plan);
assert.deepStrictEqual(da.batch.sampleDefects,[defect]);assert.deepStrictEqual(approvalTargets(da),[]);
assert.throws(()=>assemble(dp,{version:3,sampleDefects:[]},plan),/fixed sample-defect roster/);
assert.throws(()=>assemble(dp,{version:3,sampleDefects:[defect]},{...plan,sampleDefects:[{id:defect.id,revisionHash:'new'}]}),/Stale sample-defect/);
const changedDefect=copy(da);changedDefect.batch.sampleDefects[0].finding='changed';
assert.throws(()=>approvalTargets(changedDefect),/Assembly changed/);
const clear={id:defect.id,state:'cleared',predecessorDefectHash:hash(defect),approvals:{[entry.id]:{revisionHash:'reviewed',contentHash:entry.sourceHash}}};
const clearPlan={...plan,sampleDefects:[{id:defect.id,revisionHash:hash(defect)}]};
assert.equal(assemble(prepareDefectPacket(clearPlan,[clear]),{version:3,sampleDefects:[clear]},clearPlan).batch.sampleDefects[0].state,'cleared');
console.log('Candidate addition and sample-defect packaging regressions passed');
// Exercise the actual full workflow validator through grouped import, not just packaging.
{
 const {levels,loadVocabulary}=require('./vocabulary-tools.cjs');
 const {prepareCorrections}=require('./vocabulary-correction-pipeline.cjs');
 const fixture=require('./fixtures/vocabulary-completion-complete.json');
 const files=Object.fromEntries(levels.map(l=>['vocab-'+l.toLowerCase()+'.js','window.VOCAB_'+l+' = '+JSON.stringify(l==='N5'?fixture.entries:[])+';']));
 Object.assign(files,{'yojijukugo-data.js':'window.YOJIJUKUGO_DATA = [];','idioms-data.js':'window.IDIOMS_DATA = [];','vocab-correction-rules.js':'window.VOCAB_CORRECTION_RULES = {};'});
 const initialItems=loadVocabulary(files).items,baseline={version:2,entries:initialItems.map(v=>({id:v.id,source:v.source,index:v.__sourceIndex,hash:hash(project(v))}))};
 const source={key:ck,word:ref.word,reading:ref.reading,references:[ref]};
 const legacy={files,items:initialItems,patches:new Map(),additions:[],decisions:new Map(),manifest:{work:initialItems,candidates:[source]}};
 const historical={version:2,reviews:copy(fixture.reviews)},manifest={version:3,baselineHash:hash(baseline),authoringFiles:['scripts/vocabulary-completion/history.json'],batchHashes:{'scripts/vocabulary-completion/history.json':hash(historical)},activeReviewPolicy:{id:POLICY_ID,routineIndependentSamplePercent:10,sampleSeed:require('./vocabulary-review-policy.cjs').SAMPLE_SEED}};
 const current=prepareCorrections(legacy,{manifest,baseline,batches:[historical]});
 const packet=prepareCandidatePackets(current,[{key:ck,index:0,additionIds:[aid]}],{evidence:false}).packets[0];
 const add={...copy(fixture.reviews[0]),id:aid,entry:{...copy(fixture.entries[0]),senseKey:'batch-integration'},revisionId:'add-integration',state:'accepted',predecessorHash:null,predecessorRevisionHash:null,reason:'Synthetic regression addition',levelBasis:'Synthetic N5 estimate',policy:copy(addition.policy)};
 delete add.firstPass;delete add.secondPass;
 const d={...copy(decision),revisionId:'decision-integration',predecessorHash:null,targetHashes:{[aid]:hash(project(add.entry))},evidence:copy(fixture.reviews[0].evidence)};
 const a=assemble(packet,{version:3,additions:[add],decisions:[d]},current);
 const first=approve(a,approvalTargets(a).map(t=>({...t,pass:'firstPass',decision:'accepted',reviewer:add.review.reviewer,finding:'Synthetic reviewed entry and candidate'})));
 const final=approve(first,approvalTargets(first).map(t=>({...t,pass:'secondPass',decision:'accepted',reviewer:'Synthetic independent reviewer',finding:'Synthetic independently verified entry and candidate'})));
 const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'vocabulary-addition-import-'));
 try {
  fs.mkdirSync(path.join(tmp,'scripts/vocabulary-completion'),{recursive:true});
  fs.writeFileSync(path.join(tmp,'scripts/vocabulary-review-workflow.json'),JSON.stringify(manifest));
  fs.writeFileSync(path.join(tmp,'scripts/vocabulary-completion/history.json'),JSON.stringify(historical));
  const opts={root:tmp,currentPlan:()=>current,coverageDocument:()=> 'Synthetic coverage',validate:(m,b)=>prepareCorrections(legacy,{manifest:m,baseline,batches:b})};
  const name='scripts/vocabulary-completion/addition.json',journal=path.join(tmp,'journal.json');
  assert.throws(()=>importWave([first],[name],journal,opts),/second-pass acceptance/);
  assert(!fs.existsSync(journal));assert(!fs.existsSync(path.join(tmp,name)));
  importWave([final],[name],journal,opts);
  const saved=JSON.parse(fs.readFileSync(path.join(tmp,name),'utf8'));assert.equal(saved.additions[0].id,aid);assert(saved.decisions[0].secondPass);
  // A real sampled batch is reopened and cleared through packaged defect records.
  const batches=[historical,final.batch],run=()=>prepareCorrections(legacy,{manifest,baseline,batches});
  function reviewed(plan,revisionId,risk) {
    const id=initialItems[0].id,p=preparePackets(plan,{ids:[id],evidence:false}).packets[0],e=p.entries[0];
    const r={...copy(fixture.reviews[0]),id,revisionId,state:'accepted',predecessorHash:e.sourceHash,originalHash:e.sourceHash,
      predecessorRevisionHash:e.predecessorRevisionHash,original:{},replacement:{},rationale:'Synthetic sample/remediation',
      policy:{id:POLICY_ID,risk,reasons:risk==='routine'?[]:['sample-defect'],enrichmentRequired:false,sampled:false}};
    delete r.firstPass;delete r.secondPass;
    const a=assemble(p,{version:3,reviews:[r]},plan),f=approve(a,approvalTargets(a).map(t=>({...t,pass:'firstPass',decision:'accepted',reviewer:r.review.reviewer,finding:'Synthetic editorial acceptance'})));
    return approve(f,approvalTargets(f).map(t=>({...t,pass:'secondPass',decision:'accepted',reviewer:'Independent fixture editor',finding:'Synthetic independent acceptance'})));
  }
  const sampled=reviewed(run(),'integration-sample','routine');batches.push(sampled.batch);
  const opening={id:'integration-defect',state:'open',predecessorDefectHash:null,sampledRevisionId:'integration-sample',batchRevisionIds:['integration-sample'],finding:'Synthetic substantive sampled defect',sharedRuleRefs:[]};
  const beforeOpen=run(),notice=assemble(prepareDefectPacket(beforeOpen,[opening]),{version:3,sampleDefects:[opening]},beforeOpen);
  batches.push(notice.batch);assert.equal(run().openSampleDefects,1);assert.equal(run().ledger.find(r=>r.id===initialItems[0].id).state,'needs revision');
  const remediation=reviewed(run(),'integration-remediation','consequential');batches.push(remediation.batch);
  const beforeClear=run(),head=beforeClear.workHeads.get(initialItems[0].id);
  const closing={id:opening.id,state:'cleared',predecessorDefectHash:hash(opening),approvals:{[initialItems[0].id]:{revisionHash:head.revisionHash,contentHash:head.contentHash}}};
  const clearance=assemble(prepareDefectPacket(beforeClear,[closing]),{version:3,sampleDefects:[closing]},beforeClear);
  batches.push(clearance.batch);assert.equal(run().openSampleDefects,0);
  batches[batches.length-1]=copy(clearance.batch);batches.at(-1).sampleDefects[0].approvals[initialItems[0].id].contentHash='stale';
  assert.throws(run,/clearance content is stale/);
 } finally {fs.rmSync(tmp,{recursive:true,force:true});}
}
console.log('Full-validator candidate addition import regression passed');
// Correction-driven additions use an explicit fixed ID roster without candidate decisions.
{
  const {prepareAdditionPacket}=require('./vocabulary-batch.cjs');
  const did='vocab-n5:correction:direct-test',dEntry={...project(items[1]),senseKey:'direct-test'};
  const dp=prepareAdditionPacket(plan,[did]);
  assert.equal(dp.kind,'addition');assert.deepStrictEqual(dp.additionIds,[did]);
  const direct={...record,id:did,entry:dEntry,revisionId:'direct-1',predecessorHash:null,predecessorRevisionHash:null,
    reason:'Reported missing word',levelBasis:'Synthetic N5 basis',policy:{id:POLICY_ID,risk:'consequential',reasons:['addition'],enrichmentRequired:true,sampled:false}};
  delete direct.originalHash;
  const da=assemble(dp,{version:3,reviews:[],additions:[direct],decisions:[]},plan);
  assert(!da.batch.additions[0].policy.candidateReference);assert.equal(approvalTargets(da).length,1);
  assert.throws(()=>assemble(dp,{version:3,reviews:[],additions:[{...direct,id:'vocab-n5:correction:other'}]},plan),/fixed addition roster/);
  assert.throws(()=>assemble(dp,{version:3,reviews:[],additions:[{...direct,levelBasis:''}]},plan),/reason and level basis/);
  assert.throws(()=>prepareAdditionPacket(plan,[items[0].id]),/Invalid or existing/);
  assert.throws(()=>prepareAdditionPacket(plan,[did,did]),/Invalid correction-driven/);
  assert.throws(()=>assemble(dp,{version:3,reviews:[],additions:[direct]},{...plan,items:[...plan.items,{...dEntry,id:did}]}),/addition ID now exists/);
  console.log('Correction-driven addition packet regression passed');
}
// Merges and documented retirements are assembled, bound and approved like other targets.
{
  const {mergeHash}=require('./vocabulary-review-workflow.cjs');
  const mp=preparePackets(plan,{ids:[items[2].id,items[3].id],evidence:false}).packets[0];
  const rev=(e,i)=>({...record,id:e.id,revisionId:'merge-review-'+i,originalHash:e.sourceHash,predecessorHash:e.sourceHash,
    policy:{id:POLICY_ID,risk:'consequential',reasons:['merge'],enrichmentRequired:false,sampled:false}});
  const merge={from:items[2].id,to:items[3].id,state:'accepted',predecessorMergeHash:null,equivalentSense:'Synthetic variant',preservedContent:'Survivor keeps content',
    evidence:[{source:'Fixture',version:'1',locator:'fixture',finding:'Synthetic'}],retirement:{reason:'Invented form',relationship:'Closest surviving entry'},
    policy:{id:POLICY_ID,risk:'consequential',reasons:['merge'],enrichmentRequired:false,sampled:false}};
  const ma=assemble(mp,{version:3,reviews:mp.entries.map(rev),merges:[merge]},plan);
  const mt=approvalTargets(ma).find(t=>t.target==='merge:'+items[2].id);
  assert(mt&&mt.contentHash===mergeHash(ma.batch.merges[0]));
  assert.equal(ma.batch.merges[0].fromHash,hash(ma.finalContent[items[2].id]));
  const mf=approve(ma,approvalTargets(ma).map(t=>({...t,pass:'firstPass',decision:'accepted',reviewer:'editor',finding:'Synthetic'})));
  assert(mf.batch.merges[0].firstPass);
  assert.throws(()=>assemble(mp,{version:3,reviews:mp.entries.map(rev),merges:[{...merge,from:items[9].id}]},plan),/Merge source outside/);
  assert.throws(()=>assemble(mp,{version:3,reviews:mp.entries.map(rev),merges:[{...merge,retirement:{reason:''}}]},plan),/Retirement needs/);
  const changed=copy(ma);changed.batch.merges[0].retirement.reason='other';assert.throws(()=>approve(changed,[]),/Assembly changed/);
  console.log('Merge and retirement assembly regression passed');
}
