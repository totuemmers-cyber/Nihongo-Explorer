const assert=require('assert'),fs=require('fs'),os=require('os'),path=require('path');
const {levels,loadVocabulary}=require('./vocabulary-tools.cjs');
const {hash,project,prepareCorrections}=require('./vocabulary-correction-pipeline.cjs');
const {AUTHOR_ONLY_POLICY_ID,POLICY_ID,requirements}=require('./vocabulary-review-policy.cjs');
const {entryApprovalHash}=require('./vocabulary-review-workflow.cjs');
const {preparePackets,prepareCandidatePackets,checkPacket,assemble,approve,approvalTargets,importWave}=require('./vocabulary-batch.cjs');
const {phaseReport}=require('./vocabulary-phase-report.cjs');
const {queue}=require('./vocabulary-review-queue.cjs');
const complete=require('./fixtures/vocabulary-completion-complete.json'),copy=v=>JSON.parse(JSON.stringify(v));
const files=Object.fromEntries(levels.map(level=>['vocab-'+level.toLowerCase()+'.js','window.VOCAB_'+level+' = '+JSON.stringify(level==='N5'?complete.entries:[])+';']));
Object.assign(files,{'yojijukugo-data.js':'window.YOJIJUKUGO_DATA = [];','idioms-data.js':'window.IDIOMS_DATA = [];','vocab-correction-rules.js':'window.VOCAB_CORRECTION_RULES = {};'});
const items=loadVocabulary(files).items,id=items[0].id;
const ref={word:items[0].word,reading:items[0].reading,level:'N5',gloss:'Synthetic chair reference.',publisher:'fixture',url:'fixture:source'};
const candidate={key:'author-review-source',references:[ref],possibleTargets:[]};
const legacy={files,items,patches:new Map(),additions:[],decisions:new Map(),manifest:{work:items,candidates:[candidate]}};
const baseline={version:2,entries:items.map(v=>({id:v.id,source:v.source,index:v.__sourceIndex,hash:hash(project(v))}))};
const historical={version:2,reviews:copy(complete.reviews)},historyFile='scripts/vocabulary-completion/author-test-history.json';
const manifest={version:3,baselineHash:hash(baseline),authoringFiles:[historyFile],batchHashes:{[historyFile]:hash(historical)},
  activeReviewPolicy:{id:AUTHOR_ONLY_POLICY_ID,independentReviewRequired:false,routineIndependentSamplePercent:0,minimumReviewedExamples:2}};
const options={manifest,baseline,batches:[historical]},run=()=>prepareCorrections(legacy,options);
const policy=(reasons=[],enrichmentRequired=true)=>({id:AUTHOR_ONLY_POLICY_ID,risk:reasons.length?'consequential':'routine',reasons,enrichmentRequired,sampled:false});
let serial=0;
function revision(plan,target,patch={}) {
  const old=plan.workingItems.get(target),r={...copy(complete.reviews[0]),id:target,revisionId:'author-test-'+(++serial),state:'accepted',
    originalHash:hash(project(old)),predecessorHash:hash(project(old)),predecessorRevisionHash:plan.workHeads.get(target)?.revisionHash??null,
    original:Object.fromEntries(Object.keys(patch).map(k=>[k,Object.hasOwn(old,k)?copy(old[k]):null])),replacement:patch,
    rationale:'Synthetic reviewed teaching change.',policy:policy(Object.keys(patch).length?['teaching']:[])};
  delete r.secondPass;r.review.reviewedDistinctContexts=true;return r;
}
const firstOnly=a=>approve(a,approvalTargets(a).map(target=>({...target,pass:'firstPass',decision:'accepted',reviewer:complete.reviews[0].review.reviewer,finding:'Synthetic exact authored content and source inspection.'})));
function reseal(r,content) {r.firstPass.contentHash=hash(project(content));r.firstPass.approvalHash=entryApprovalHash(r,content);}
const initial=run(),packet=preparePackets(initial,{ids:[id],evidence:false,enrichment:false}).packets[0];
assert.equal(packet.policy,AUTHOR_ONLY_POLICY_ID);
assert.equal(queue(initial,25,{evidence:false}).policy,AUTHOR_ONLY_POLICY_ID);
const authored=firstOnly(assemble(packet,{version:3,reviews:[revision(initial,id,{notes:items[0].notes+' Synthetic reviewed fixture extension.'})]},initial));
assert(!authored.batch.reviews[0].secondPass);assert(!authored.batch.reviews[0].policy.sampled);
options.batches.push(authored.batch);
const accepted=run();assert.equal(accepted.ledger[0].editorial,'reviewed');assert.equal(accepted.ledger[0].independentReviewRequired,false);
assert(accepted.reviewedDistinctContextIds.has(id));
assert.equal(accepted.items[0].notes,authored.finalContent[id].notes);
const record=authored.batch.reviews[0],saved=copy(record);
for(const [mutate,pattern,seal] of [
  [r=>{delete r.firstPass;},/first-pass acceptance/],
  [r=>{r.firstPass.contentHash='stale';},/First pass is stale/],
  [r=>{r.firstPass.approvalHash='stale';},/approval is stale/],
  [r=>{r.evidence=[];},/Missing evidence/,true],
  [r=>{r.pitch.evidence=[];},/Missing evidence/,true],
  [r=>{r.review.reviewedDistinctContexts=false;},/explicit author review/,true],
  [r=>{r.policy.enrichmentRequired=false;},/requires teaching enrichment/,true],
  [r=>{r.policy.sampled=true;},/sample/,true],
  [r=>{delete r.policy.approvalBinding;},/identity approval binding/,true],
  [r=>{r.review.contexts[1]=r.review.contexts[0];r.review.contexts[2]=r.review.contexts[0];},/distinct editorial contexts/,true],
  [r=>{r.secondPass={...r.firstPass,reviewer:'Optional separate reviewer',contentHash:'stale'};},/Second pass is stale/]
]) {
  mutate(record);if(seal)reseal(record,authored.finalContent[id]);assert.throws(run,pattern);for(const key of Object.keys(record))delete record[key];Object.assign(record,copy(saved));
}
// The active preference cannot relax validation of sealed historical approvals.
const oldSecond=historical.reviews[0].secondPass;delete historical.reviews[0].secondPass;
assert.throws(run,/independent editorial pass/);historical.reviews[0].secondPass=oldSecond;
const oldPacket=preparePackets({...initial,reviewPolicyId:POLICY_ID},{ids:[id],evidence:false,enrichment:false}).packets[0];
assert.throws(()=>checkPacket(oldPacket,initial),/Review policy changed/);
const badConfig=copy(manifest);badConfig.activeReviewPolicy.routineIndependentSamplePercent=10;
assert.throws(()=>prepareCorrections(legacy,{...options,manifest:badConfig}),/independent sample/);
const strictConfig={version:3,baselineHash:hash(baseline),activeReviewPolicy:{id:POLICY_ID,routineIndependentSamplePercent:10,sampleSeed:require('./vocabulary-review-policy.cjs').SAMPLE_SEED}};
const strictInitial=prepareCorrections(legacy,{...options,manifest:strictConfig,batches:[historical]});
const strictRecord=revision(strictInitial,id,{notes:items[0].notes+' Synthetic strict fixture.'});strictRecord.policy={...strictRecord.policy,id:POLICY_ID};
const strictPacket=preparePackets(strictInitial,{ids:[id],evidence:false,enrichment:false}).packets[0];
const strictAssembly=firstOnly(assemble(strictPacket,{version:3,reviews:[strictRecord]},strictInitial));
assert.throws(()=>prepareCorrections(legacy,{...options,manifest:strictConfig,batches:[historical,strictAssembly.batch]}),/second-pass acceptance/);
// New additions and exact publisher decisions work with first approval only.
const additionId='vocab-n5:correction:author-review-fixture',entry={...project(items[0]),senseKey:'author-review-fixture'};
const candidatePacket=prepareCandidatePackets(accepted,[{key:candidate.key,index:0,additionIds:[additionId]}],{evidence:false}).packets[0];
const addition={...copy(complete.reviews[0]),id:additionId,entry,revisionId:'author-addition',state:'accepted',predecessorHash:null,predecessorRevisionHash:null,
  reason:'Synthetic complete addition.',levelBasis:'Synthetic level basis.',policy:policy(['addition'])};
delete addition.originalHash;delete addition.original;delete addition.replacement;delete addition.secondPass;addition.review.reviewedDistinctContexts=true;
const decision={key:candidate.key,referenceIndex:0,referenceHash:hash(ref),revisionId:'author-source',state:'accepted',predecessorHash:null,predecessorRevisionHash:null,
  disposition:'added',targets:[additionId],targetHashes:{[additionId]:hash(entry)},reason:'Synthetic full source match.',evidence:copy(addition.evidence),policy:policy(['candidate-decision'],false)};
const additionAssembly=firstOnly(assemble(candidatePacket,{version:3,reviews:[],additions:[addition],decisions:[decision]},accepted));
assert(additionAssembly.batch.additions[0].firstPass);assert(additionAssembly.batch.decisions[0].firstPass);
assert(!additionAssembly.batch.additions[0].secondPass);assert(!additionAssembly.batch.decisions[0].secondPass);
for(const [mutate,pattern] of [
  [d=>{d.referenceHash='unrelated';},/Candidate reference changed/],
  [d=>{d.targetHashes[additionId]='stale';},/Candidate target approval is stale/],
  [d=>{d.evidence=[];},/Missing research evidence/],
  [d=>{d.firstPass.approvalHash='stale';},/approval is stale/]
]) {
  const changed=copy(additionAssembly.batch);mutate(changed.decisions[0]);
  assert.throws(()=>prepareCorrections(legacy,{...options,batches:[...options.batches,changed]}),pattern);
}
const base=fs.mkdtempSync(path.join(os.tmpdir(),'vocabulary-author-review-'));
try {
  fs.mkdirSync(path.join(base,'scripts/vocabulary-completion'),{recursive:true});
  const currentManifest=copy(manifest),authoredFile='scripts/vocabulary-completion/author-test-revision.json';
  currentManifest.authoringFiles.push(authoredFile);currentManifest.batchHashes[authoredFile]=hash(authored.batch);
  const manifestPath=path.join(base,'scripts/vocabulary-review-workflow.json');
  fs.writeFileSync(manifestPath,JSON.stringify(currentManifest));
  fs.writeFileSync(path.join(base,historyFile),JSON.stringify(historical));fs.writeFileSync(path.join(base,authoredFile),JSON.stringify(authored.batch));
  for(const [file,value] of Object.entries(accepted.files))fs.writeFileSync(path.join(base,file),value);
  const snapshot=()=>Object.fromEntries(Object.keys(accepted.files).map(file=>[file,fs.readFileSync(path.join(base,file),'utf8')]));
  const before=snapshot(),importOptions={root:base,currentPlan:()=>accepted,validate:(m,b)=>prepareCorrections(legacy,{manifest:m,baseline,batches:b})};
  const missing=copy(additionAssembly);delete missing.batch.decisions[0].firstPass;
  const name='scripts/vocabulary-completion/author-test-new.json',badJournal=path.join(base,'bad-journal.json');
  assert.throws(()=>importWave([missing],[name],badJournal,importOptions),/first-pass acceptance/);
  assert(!fs.existsSync(badJournal));assert(!fs.existsSync(path.join(base,name)));assert.deepEqual(snapshot(),before);
  importWave([additionAssembly],[name],path.join(base,'journal.json'),importOptions);
  const importedManifest=JSON.parse(fs.readFileSync(manifestPath,'utf8'));
  assert.equal(importedManifest.activeReviewPolicy.id,AUTHOR_ONLY_POLICY_ID);
  const imported=JSON.parse(fs.readFileSync(path.join(base,name),'utf8'));assert(!imported.additions[0].secondPass);
  const proposed=prepareCorrections(legacy,{manifest:importedManifest,baseline,batches:[historical,authored.batch,imported]});
  for(const [file,value] of Object.entries(proposed.files))assert.equal(fs.readFileSync(path.join(base,file),'utf8'),value,'Replay changed '+file);
  assert.equal(phaseReport(proposed,'N5').complete,true,'Author-reviewed teaching and source evidence must satisfy the phase gate');
  assert.equal(proposed.candidateLedger[0].references[0].state,'accepted');
  assert.equal(proposed.items[0].id,id);assert.equal(proposed.items[0].reading,items[0].reading);
  // First-only merge approvals survive flatten/replay and retain redirects.
  const mergePacket=preparePackets(proposed,{ids:[id],evidence:false,enrichment:false}).packets[0];
  const merge={from:id,to:additionId,state:'accepted',predecessorMergeHash:null,equivalentSense:'Synthetic equivalent chair senses.',
    preservedContent:'Both complete sets of teaching remain in the revision history.',evidence:copy(addition.evidence),policy:policy(['merge'],false)};
  const mergedAssembly=firstOnly(assemble(mergePacket,{version:3,reviews:[revision(proposed,id)],merges:[merge]},proposed));
  assert(!mergedAssembly.batch.merges[0].secondPass);
  const merged=prepareCorrections(legacy,{manifest:importedManifest,baseline,batches:[historical,authored.batch,imported,mergedAssembly.batch]});
  assert.equal(merged.items.length,1);assert.equal(merged.items[0].id,additionId);
  assert.equal(JSON.parse(merged.files['scripts/vocabulary-completion/ledger.json']).redirects[id],additionId);
  assert.equal(phaseReport(merged,'N5').complete,true);
  mergedAssembly.batch.merges[0].firstPass.contentHash='stale';
  assert.throws(()=>prepareCorrections(legacy,{manifest:importedManifest,baseline,batches:[historical,authored.batch,imported,mergedAssembly.batch]}),/First pass is stale/);
} finally {fs.rmSync(base,{recursive:true,force:true});}
assert.equal(requirements({policy:policy(['merge'],false)},{kind:'merge'}).independentReviewRequired,false);
// Old sampled defects remain actionable under the new policy: every affected
// identity still needs a later exact author approval before clearance.
const sampledPacket=preparePackets(strictInitial,{ids:[id],evidence:false,enrichment:false}).packets[0];
const sampledRecord=revision(strictInitial,id);sampledRecord.policy={...sampledRecord.policy,id:POLICY_ID};
const sampledFirst=firstOnly(assemble(sampledPacket,{version:3,reviews:[sampledRecord]},strictInitial));
const sampled=approve(sampledFirst,approvalTargets(sampledFirst).map(t=>({...t,pass:'secondPass',decision:'accepted',reviewer:'Historical sample reviewer',finding:'Synthetic historical sample inspection.'})));
const defect={id:'author-clearance-defect',state:'open',predecessorDefectHash:null,sampledRevisionId:sampledRecord.revisionId,
  batchRevisionIds:[sampledRecord.revisionId],sharedRuleIds:[],finding:'Synthetic sampled teaching defect.'};
const defectBatches=[historical,sampled.batch,{version:3,sampleDefects:[defect]}];
const escalated=prepareCorrections(legacy,{manifest,baseline,batches:defectBatches});
assert.equal(escalated.openSampleDefects,1);assert.equal(escalated.ledger[0].editorial,'pending');
const correctedPacket=preparePackets(escalated,{ids:[id],evidence:false,enrichment:false}).packets[0];
const corrected=firstOnly(assemble(correctedPacket,{version:3,reviews:[revision(escalated,id,{notes:items[0].notes+' Synthetic source-checked defect repair.'})]},escalated));
const clearance={id:defect.id,state:'cleared',predecessorDefectHash:hash(defect),approvals:{[id]:{revisionHash:hash(corrected.batch.reviews[0]),contentHash:hash(corrected.finalContent[id])}}};
const clearedBatches=[...defectBatches,corrected.batch,{version:3,sampleDefects:[clearance]}];
const cleared=prepareCorrections(legacy,{manifest,baseline,batches:clearedBatches});
assert.equal(cleared.openSampleDefects,0);assert.equal(cleared.ledger[0].editorial,'reviewed');
assert.equal(cleared.ledger[0].independentReviewRequired,false);
clearance.approvals[id].contentHash='stale';
assert.throws(()=>prepareCorrections(legacy,{manifest,baseline,batches:clearedBatches}),/clearance content is stale/);
console.log('Author-only workflow passed: entry/addition/source/merge first-only approvals, phase gate, exact offline replay, historical independent rules, stale/missing evidence rejection and validation before writes.');
