const assert=require('assert');
const {read,levels,loadVocabulary}=require('./vocabulary-tools.cjs');
const {prepareCorrections,hash,project}=require('./vocabulary-correction-pipeline.cjs');
const {entryApprovalHash,decisionHash,mergeHash}=require('./vocabulary-review-workflow.cjs');
const {requirements:policyRequirements,selectedForBatch}=require('./vocabulary-review-policy.cjs');
const {report}=require('./import-vocabulary-completion.cjs');
const complete=JSON.parse(read('scripts/fixtures/vocabulary-completion-complete.json'));
const copy=v=>JSON.parse(JSON.stringify(v));
function fixture(candidates=[]) {
  const files=Object.fromEntries(levels.map(l=>['vocab-'+l.toLowerCase()+'.js','window.VOCAB_'+l+' = '+JSON.stringify(l==='N5'?complete.entries:[])+';']));
  Object.assign(files,{'yojijukugo-data.js':'window.YOJIJUKUGO_DATA = [];','idioms-data.js':'window.IDIOMS_DATA = [];','vocab-correction-rules.js':'window.VOCAB_CORRECTION_RULES = {};'});
  const items=loadVocabulary(files).items;
  const baseline={version:2,entries:items.map(v=>({id:v.id,source:v.source,index:v.__sourceIndex,hash:hash(project(v))}))};
  return {legacy:{files,items,patches:new Map(),additions:[],decisions:new Map(),manifest:{work:items,candidates}},
    options:{manifest:{version:3,baselineHash:hash(baseline)},baseline,batches:[{version:2,reviews:copy(complete.reviews)}]}};
}
let serial=0;
function revision(plan,id,patch,state='accepted') {
  const old=plan.workingItems.get(id),head=plan.workHeads.get(id);
  const record={...copy(complete.reviews[0]),id,revisionId:'test-'+(++serial),state,
    predecessorHash:hash(project(old)),predecessorRevisionHash:head?.revisionHash ?? null,originalHash:hash(project(old)),
    original:Object.fromEntries(Object.keys(patch).map(f=>[f,Object.hasOwn(old,f)?copy(old[f]):null])),replacement:patch,
    rationale:'Synthetic regression: a documented revision.'};
  if (state==='accepted') {
    const next={...old,...patch};
    Object.assign(record.secondPass,{decision:'accepted',contentHash:hash(project(next)),approvalHash:entryApprovalHash(record,next)});
  } else delete record.secondPass;
  return record;
}
function approveRisk(record,content,independentReviewer='Fixture independent reviewer') {
  const approvalHash=entryApprovalHash(record,content),contentHash=hash(project(content));
  record.firstPass={decision:'accepted',reviewer:record.review.reviewer,finding:'Synthetic first-pass review completed.',contentHash,approvalHash};
  if (record.policy.risk==='consequential' || record.policy.sampled) {
    record.secondPass={decision:'accepted',reviewer:independentReviewer,finding:'Synthetic independent review completed.',contentHash,approvalHash};
  } else delete record.secondPass;
  return record;
}
const f=fixture();
const run=()=>prepareCorrections(f.legacy,f.options);
const initial=run(),id=initial.items[0].id;
const changed=revision(initial,id,{notes:'Bei 椅子に座る gibt に den Sitzplatz an. Diese Notiz ist ein Regressionstest.'},'drafted');
f.options.batches.push({version:3,reviews:[changed]});
const draft=run();
assert.equal(draft.items[0].notes,initial.items[0].notes,'Draft leaked into runtime');
assert.equal(draft.ledger[0].state,'drafted');
assert.equal(report(draft).complete,false,'Draft inherited acceptance');
const accepted=revision(draft,id,{});
f.options.batches.push({version:3,reviews:[accepted]});
const final=run();
assert.equal(final.items[0].notes,changed.replacement.notes);
assert.equal(report(final).complete,true);
assert.equal(JSON.parse(final.files['scripts/vocabulary-completion/ledger.json']).revisions.length,2);
const mutations=[
 r=>{r.predecessorHash='stale';},
 r=>{r.predecessorRevisionHash='fork';},
 r=>{r.secondPass.contentHash='stale';},
 r=>{r.secondPass.approvalHash='stale';},
 r=>{r.evidence[0].finding+=' changed after approval';},
 r=>{r.review.contexts[0]+=' changed after approval';},
 r=>{r.pitch.rationale+=' changed after approval';},
 r=>{delete r.secondPass.decision;},
 r=>{r.openQuestions=['An unresolved lexical question'];}
];
for (const mutate of mutations) {
  const saved=copy(f.options.batches[2]);
  mutate(f.options.batches[2].reviews[0]);
  assert.throws(run);
  f.options.batches[2]=saved;
}
const research=revision(final,id,{},'researching');
research.research=[{source:'Synthetic dictionary',version:'1',locator:'fixture:research',finding:'Competing sense retained for investigation.'}];
research.openQuestions=['Which sense applies?'];
f.options.batches.push({version:3,reviews:[research]});
assert.equal(run().ledger[0].state,'researching');
delete research.openQuestions;
assert.throws(run,/Unresolved findings/);
f.options.batches.pop();

// An addition starts as a draft and can be reviewed/revised in later batches.
const entry=copy(complete.entries[0]); entry.senseKey='workflow-fixture';
const addId='vocab-n5:correction:workflow-fixture';
const add={id:addId,entry,state:'drafted',revisionId:'add-draft',predecessorHash:null,predecessorRevisionHash:null,
  reason:'Synthetic addition.',levelBasis:'Synthetic N5 estimate.'};
f.options.batches.push({version:3,additions:[add]});
const ad=run();
assert.equal(ad.items.length,initial.items.length);
assert.equal(report(ad).pendingAdditions,1);
assert.equal(report(ad).complete,false);
// A later draft may be accepted before this one: preserve its allocated position.
const earlierAccepted={...copy(complete.reviews[0]),id:'vocab-n5:correction:accepted-first',entry:{...copy(entry),senseKey:'accepted-first'},
  state:'accepted',revisionId:'accepted-before-old-draft',predecessorHash:null,predecessorRevisionHash:null,
  reason:'Synthetic accepted before the pending draft.',levelBasis:'Synthetic estimate.'};
earlierAccepted.secondPass={...earlierAccepted.secondPass,decision:'accepted',contentHash:hash(project(earlierAccepted.entry)),approvalHash:entryApprovalHash(earlierAccepted,earlierAccepted.entry)};
f.options.batches.push({version:3,additions:[earlierAccepted]});
const allocatedIndex=run().items.find(v=>v.id===earlierAccepted.id).__sourceIndex;
const acceptAdd=revision(ad,addId,{});
f.options.batches.push({version:3,reviews:[acceptAdd]});
const aa=run();
assert(aa.items.some(v=>v.id===addId));
assert.equal(report(aa).pendingAdditions,0);
assert.equal(aa.items.find(v=>v.id===earlierAccepted.id).__sourceIndex,allocatedIndex,'Later acceptance moved an existing raw source position');
const reviseAdd=revision(aa,addId,{notes:'Die Präposition に bezeichnet bei 椅子に座る den Sitzplatz. Zweite akzeptierte Revision.'});
f.options.batches.push({version:3,reviews:[reviseAdd]});
assert.equal(run().items.find(v=>v.id===addId).notes,reviseAdd.replacement.notes);
const changedLevel=revision(run(),addId,{level:'N4'});
changedLevel.levelBasis='Synthetic evidence for changed level.';
changedLevel.secondPass.approvalHash=entryApprovalHash(changedLevel,{...run().workingItems.get(addId),level:'N4'});
f.options.batches.push({version:3,reviews:[changedLevel]});
assert.equal(run().items.find(v=>v.id===addId).source,'vocab-n5','Level change moved raw source');
assert.equal(run().items.find(v=>v.id===addId).level,'N4');
const afterLevel=revision(run(),addId,{notes:'Bei 椅子に座る bezeichnet に den Sitzplatz. Neue Notiz bei unveränderter N4-Schätzung.'});
f.options.batches.push({version:3,reviews:[afterLevel]});
assert.equal(run().items.find(v=>v.id===addId).level,'N4','Unrelated revision lost the earlier level evidence');

// One normalized group can contain independently accepted, different actions.
const c={key:'いくら|いくら',word:'いくら',reading:'いくら',references:[
  {word:'いくら',reading:'いくら',gloss:'how much',url:'fixture:price'},
  {word:'イクラ',reading:'いくら',gloss:'salmon roe',url:'fixture:roe'}]};
const mix=fixture([c]);
const mixRun=()=>prepareCorrections(mix.legacy,mix.options);
function decision(index,disposition,targets,plan) {
  const d={key:c.key,referenceIndex:index,referenceHash:hash(c.references[index]),revisionId:'decision-'+(++serial),
    state:'accepted',predecessorHash:null,predecessorRevisionHash:null,disposition,targets,
    targetHashes:Object.fromEntries(targets.map(id=>[id,hash(project(plan.items.find(v=>v.id===id)))])),
    reason:'Synthetic per-reference action; not a real lexical claim.',evidence:copy(complete.reviews[0].evidence)};
  d.secondPass={decision:'accepted',reviewer:'Fixture second pass',finding:'Synthetic independently checked source reference.',contentHash:decisionHash(d),approvalHash:decisionHash(d)};
  return d;
}
const d0=decision(0,'excluded',[],mixRun());
mix.options.batches.push({version:3,decisions:[d0]});
assert.equal(report(mixRun()).unresolvedCandidates,1);
assert.equal(report(mixRun()).unresolvedCandidateReferences,1);
// A synthetic sense addition supplies the second reference's separate target.
const ma=copy(add);ma.state='accepted';ma.revisionId='mixed-add';
Object.assign(ma,{...copy(complete.reviews[0]),...ma});
ma.secondPass={...ma.secondPass,decision:'accepted',contentHash:hash(project(ma.entry)),approvalHash:entryApprovalHash(ma,ma.entry)};
mix.options.batches.push({version:3,additions:[ma]});
const d1=decision(1,'added',[ma.id],mixRun());
mix.options.batches.push({version:3,decisions:[d1]});
const closed=mixRun();
assert.equal(report(closed).unresolvedCandidates,0);
assert.equal(report(closed).unresolvedCandidateReferences,0);
assert.equal(closed.decisions.get(c.key).disposition,'mixed');
const staleTarget=revision(closed,ma.id,{meaning:'Test einer späteren Bedeutungsänderung'});
mix.options.batches.push({version:3,reviews:[staleTarget]});
assert.equal(report(mixRun()).unresolvedCandidateReferences,1,'Changed target did not invalidate decision');
const previousHash=hash(d1),previousContentHash=decisionHash(d1);
const revisedDecision=decision(1,'added',[ma.id],mixRun());
revisedDecision.predecessorRevisionHash=previousHash;
revisedDecision.predecessorHash=previousContentHash;
mix.options.batches.push({version:3,decisions:[revisedDecision]});
assert.equal(report(mixRun()).unresolvedCandidateReferences,0);
revisedDecision.referenceHash='changed';
assert.throws(mixRun,/Candidate reference changed/);

// A surviving merge target can be revised, but its equivalence approval must
// follow the new content rather than silently inheriting the earlier merge.
const mf=fixture();
mf.options.batches.push({version:3,additions:[copy(earlierAccepted)]});
const mrun=()=>prepareCorrections(mf.legacy,mf.options);
const mp=mrun(),fromId=earlierAccepted.id,toId=mp.items[0].id;
function mergeRecord(previous=null) {
  const p=mrun(),r={from:fromId,to:toId,fromHash:hash(project(p.workingItems.get(fromId))),toHash:hash(project(p.workingItems.get(toId))),
    predecessorMergeHash:previous?hash(previous):null,equivalentSense:'Synthetic equivalent chair senses.',preservedContent:'Target retains the shared examples and usage note.',evidence:copy(complete.reviews[0].evidence)};
  r.secondPass={decision:'accepted',reviewer:'Fixture separate merge review',finding:'Equivalent reading and sense confirmed.',contentHash:mergeHash(r),approvalHash:mergeHash(r)};
  return r;
}
const mr=mergeRecord();mf.options.batches.push({version:3,merges:[mr]});
const merged=mrun();assert.equal(merged.items.length,1);
const mt=revision(merged,toId,{notes:'Bei 椅子に座る bezeichnet に den Sitzplatz. Überarbeiteter Testtext.'});
mf.options.batches.push({version:3,reviews:[mt]});
assert.throws(mrun,/Merge target changed/);
const updated={...copy(mr),predecessorMergeHash:hash(mr),toHash:mt.secondPass.contentHash};
updated.secondPass={...updated.secondPass,contentHash:mergeHash(updated),approvalHash:mergeHash(updated)};
mf.options.batches.push({version:3,merges:[updated]});
assert.equal(mrun().items[0].notes,mt.replacement.notes);

// Risk-based records keep a first-pass approval on every entry. Routine records
// need an independent pass only when the deterministic ten-percent sample selects them.
const rf=fixture(),rrun=()=>prepareCorrections(rf.legacy,rf.options),r0=rrun(),rid=r0.items[0].id;
const routine={...copy(complete.reviews[0]),id:rid,revisionId:'risk-routine',state:'accepted',
  predecessorHash:hash(project(r0.workingItems.get(rid))),predecessorRevisionHash:r0.workHeads.get(rid)?.revisionHash??null,
  originalHash:hash(project(r0.workingItems.get(rid))),original:{},replacement:{},
  policy:{id:'risk-based-v1',risk:'routine',reasons:[],enrichmentRequired:false,sampled:true}};
const routineContent=r0.workingItems.get(rid),routineApproval=entryApprovalHash(routine,routineContent);
routine.firstPass={decision:'accepted',reviewer:routine.review.reviewer,finding:'Routine lexical and retained-example review completed.',
  contentHash:hash(project(routineContent)),approvalHash:routineApproval};
routine.secondPass={decision:'accepted',reviewer:'Fixture sampled reviewer',finding:'Deterministic sample independently checked.',
  contentHash:hash(project(routineContent)),approvalHash:routineApproval};
rf.options.batches.push({version:3,reviews:[routine]});
const routinePlan=rrun();
assert.equal(routinePlan.ledger[0].reviewPolicy,'risk-based-v1');
assert.equal(routinePlan.ledger[0].independentReviewRequired,true);
assert.equal(report(routinePlan).complete,true);
const savedFirstPass=routine.firstPass.approvalHash;routine.firstPass.approvalHash='stale';
assert.throws(rrun,/First-pass evidence\/review approval is stale/);routine.firstPass.approvalHash=savedFirstPass;

// Targeted enrichment permits adequate retained material with one reviewed
// example, while a content change remains consequential and independently checked.
const ef=fixture(),erun=()=>prepareCorrections(ef.legacy,ef.options),e0=erun(),eid=e0.items[0].id;
const patch={notes:'',examples:[copy(e0.workingItems.get(eid).examples[0])]};
const targeted={...copy(complete.reviews[0]),id:eid,revisionId:'risk-targeted',state:'accepted',
  predecessorHash:hash(project(e0.workingItems.get(eid))),predecessorRevisionHash:e0.workHeads.get(eid)?.revisionHash??null,
  originalHash:hash(project(e0.workingItems.get(eid))),original:{notes:e0.workingItems.get(eid).notes,examples:copy(e0.workingItems.get(eid).examples)},replacement:patch,
  rationale:'Synthetic targeted-enrichment regression.',policy:{id:'risk-based-v1',risk:'consequential',reasons:['translation-change'],enrichmentRequired:false,sampled:false}};
targeted.review.contexts=targeted.review.contexts.slice(0,1);
const targetedContent={...e0.workingItems.get(eid),...patch},targetedApproval=entryApprovalHash(targeted,targetedContent);
targeted.firstPass={decision:'accepted',reviewer:targeted.review.reviewer,finding:'First-pass targeted review completed.',contentHash:hash(project(targetedContent)),approvalHash:targetedApproval};
targeted.secondPass={decision:'accepted',reviewer:'Fixture independent reviewer',finding:'Consequential change independently checked.',contentHash:hash(project(targetedContent)),approvalHash:targetedApproval};
ef.options.batches.push({version:3,reviews:[targeted]});
const targetedReport=report(erun());
assert.equal(targetedReport.complete,true);
assert.equal(targetedReport.enrichmentComplete,false);
assert.equal(targetedReport.optionalEnrichmentMissingNotes,1);
assert.equal(targetedReport.optionalEnrichmentFewerThanTwo,1);
targeted.secondPass.reviewer=targeted.review.reviewer;
assert.throws(erun,/Independent reviewer must differ/);

// An unchanged record may still be consequential when ambiguity requires a
// deliberate second review; risk is a floor imposed by changes, not a claim
// that every unchanged record is routine.
const uf=fixture(),urun=()=>prepareCorrections(uf.legacy,uf.options),u0=urun(),uid=u0.items[0].id;
const ambiguous={...copy(complete.reviews[0]),id:uid,revisionId:'risk-ambiguous-unchanged',state:'accepted',
  predecessorHash:hash(project(u0.workingItems.get(uid))),predecessorRevisionHash:u0.workHeads.get(uid)?.revisionHash??null,
  originalHash:hash(project(u0.workingItems.get(uid))),original:{},replacement:{},rationale:'Unchanged ambiguity review.',
  policy:{id:'risk-based-v1',risk:'consequential',reasons:['ambiguous-sense'],enrichmentRequired:true,sampled:false}};
approveRisk(ambiguous,u0.workingItems.get(uid));
uf.options.batches.push({version:3,reviews:[ambiguous]});
assert.equal(urun().ledger[0].risk,'consequential');

// A consequential draft cannot be accepted through an empty routine revision.
// Its risk is computed from the last accepted content, not the immediate draft.
const bf=fixture(),brun=()=>prepareCorrections(bf.legacy,bf.options),b0=brun(),bid=b0.items[0].id;
const changedDraft=revision(b0,bid,{meaning:'Geänderte synthetische Bedeutung'},'drafted');
changedDraft.policy={id:'risk-based-v1',risk:'consequential',reasons:['translation-change'],enrichmentRequired:false,sampled:false};
bf.options.batches.push({version:3,reviews:[changedDraft]});
const afterDraft=brun(),emptyAcceptance=revision(afterDraft,bid,{});
emptyAcceptance.policy={id:'risk-based-v1',risk:'routine',reasons:[],enrichmentRequired:false,sampled:true};
approveRisk(emptyAcceptance,afterDraft.workingItems.get(bid));
bf.options.batches.push({version:3,reviews:[emptyAcceptance]});
assert.throws(brun,/Changed content requires consequential review/);
emptyAcceptance.policy={id:'risk-based-v1',risk:'consequential',reasons:['translation-change'],enrichmentRequired:false,sampled:false};
approveRisk(emptyAcceptance,afterDraft.workingItems.get(bid));
const corrected=brun();
assert.equal(corrected.items[0].meaning,changedDraft.replacement.meaning);

// Re-reviewing the now-accepted changed entry with no new content is routine.
// Flattening against the historical baseline must not falsely reclassify it.
const routineAfterChange=revision(corrected,bid,{});
routineAfterChange.policy={id:'risk-based-v1',risk:'routine',reasons:[],enrichmentRequired:false,sampled:true};
approveRisk(routineAfterChange,corrected.workingItems.get(bid));
bf.options.batches.push({version:3,reviews:[routineAfterChange]});
assert.equal(brun().ledger[0].risk,'routine');

// An addition keeps its enrichment obligation when a later review accepts it.
const af=fixture(),arun=()=>prepareCorrections(af.legacy,af.options);
const riskEntry={...copy(complete.entries[0]),senseKey:'risk-addition'};
const riskAdd={...copy(complete.reviews[0]),id:'vocab-n5:correction:risk-addition',entry:riskEntry,
  state:'drafted',revisionId:'risk-addition-draft',predecessorHash:null,predecessorRevisionHash:null,
  reason:'Synthetic risk-based addition.',levelBasis:'Synthetic N5 estimate.',
  policy:{id:'risk-based-v1',risk:'consequential',reasons:['addition'],enrichmentRequired:true,sampled:false}};
delete riskAdd.firstPass;delete riskAdd.secondPass;
af.options.batches.push({version:3,additions:[riskAdd]});
const riskDraft=arun(),acceptRiskAdd=revision(riskDraft,riskAdd.id,{});
acceptRiskAdd.policy={id:'risk-based-v1',risk:'consequential',reasons:['addition'],enrichmentRequired:false,sampled:false};
approveRisk(acceptRiskAdd,riskDraft.workingItems.get(riskAdd.id));
af.options.batches.push({version:3,reviews:[acceptRiskAdd]});
assert.throws(arun,/requires teaching enrichment/);
acceptRiskAdd.policy.enrichmentRequired=true;
approveRisk(acceptRiskAdd,riskDraft.workingItems.get(riskAdd.id));
assert.equal(arun().ledger.find(v=>v.id===riskAdd.id).enrichmentRequired,true);

// The risk-based completion gate permits a routine one-context review, while
// the strict enrichment gate still records that two distinct contexts were not reviewed.
const sf=fixture(),srun=()=>prepareCorrections(sf.legacy,sf.options),s0=srun(),sid=s0.items[0].id;
const oneContext={...copy(complete.reviews[0]),id:sid,revisionId:'risk-one-context',state:'accepted',
  predecessorHash:hash(project(s0.workingItems.get(sid))),predecessorRevisionHash:s0.workHeads.get(sid)?.revisionHash??null,
  originalHash:hash(project(s0.workingItems.get(sid))),original:{},replacement:{},rationale:'Synthetic retained-context review.',
  policy:{id:'risk-based-v1',risk:'routine',reasons:[],enrichmentRequired:false,sampled:true}};
oneContext.review.contexts=oneContext.review.contexts.map(()=>oneContext.review.contexts[0]);
approveRisk(oneContext,s0.workingItems.get(sid));
sf.options.batches.push({version:3,reviews:[oneContext]});
const contextReport=report(srun());
assert.equal(contextReport.complete,true);
assert.equal(contextReport.lackingReviewedDistinctContexts,1);
assert.equal(contextReport.strictComplete,false);

// A sampled defect persists affected batch and shared-rule references. It
// reopens review coverage until every affected entry has a later exact,
// independently approved revision and the defect is explicitly cleared.
const df=fixture(),drun=()=>prepareCorrections(df.legacy,df.options),dstart=drun(),defectId=dstart.items[0].id;
const sampledReview={...copy(complete.reviews[0]),id:defectId,revisionId:'defect-sampled-review',state:'accepted',
  predecessorHash:hash(project(dstart.workingItems.get(defectId))),predecessorRevisionHash:dstart.workHeads.get(defectId)?.revisionHash??null,
  originalHash:hash(project(dstart.workingItems.get(defectId))),original:{},replacement:{},rationale:'Synthetic sampled review.',
  policy:{id:'risk-based-v1',risk:'routine',reasons:[],enrichmentRequired:false,sampled:true}};
approveRisk(sampledReview,dstart.workingItems.get(defectId));
const defectAdditionId='vocab-n5:correction:defect-addition',defectAdditionEntry={...copy(complete.entries[0]),senseKey:'defect-addition'};
const defectAddition={...copy(complete.reviews[0]),id:defectAdditionId,entry:defectAdditionEntry,
  revisionId:'defect-batch-addition',state:'accepted',predecessorHash:null,predecessorRevisionHash:null,
  reason:'Synthetic entry in the affected batch.',levelBasis:'Synthetic N5 estimate.',
  policy:{id:'risk-based-v1',risk:'consequential',reasons:['addition'],enrichmentRequired:true,sampled:false}};
approveRisk(defectAddition,defectAdditionEntry);
const opened={id:'sample-defect-1',state:'open',predecessorDefectHash:null,sampledRevisionId:sampledReview.revisionId,
  finding:'The deterministic sample found a substantive shared-rule error.',batchRevisionIds:[sampledReview.revisionId,defectAddition.revisionId],
  sharedRuleRefs:[{rule:'synthetic-shared-translation-rule',entryIds:[defectId]}]};
df.options.batches.push({version:3,reviews:[sampledReview],additions:[defectAddition]});
df.options.batches.push({version:3,sampleDefects:[opened]});
opened.batchRevisionIds=[sampledReview.revisionId];
assert.throws(drun,/cover the full affected batch/);
opened.batchRevisionIds=[sampledReview.revisionId,defectAddition.revisionId];
const openPlan=drun(),openReport=report(openPlan);
assert.equal(openPlan.ledger[0].state,'needs revision');
assert.equal(openPlan.ledger.find(v=>v.id===defectAdditionId).state,'needs revision');
assert.equal(openReport.openSampleDefects,1);
assert.equal(openReport.complete,false);
const remediated=revision(openPlan,defectId,{});
remediated.policy={id:'risk-based-v1',risk:'consequential',reasons:['sample-defect'],enrichmentRequired:false,sampled:false};
approveRisk(remediated,openPlan.workingItems.get(defectId));
const remediatedAddition=revision(openPlan,defectAdditionId,{});
remediatedAddition.policy={id:'risk-based-v1',risk:'consequential',reasons:['sample-defect'],enrichmentRequired:true,sampled:false};
approveRisk(remediatedAddition,openPlan.workingItems.get(defectAdditionId));
df.options.batches.push({version:3,reviews:[remediated,remediatedAddition]});
const remediatedPlan=drun(),clearance={id:opened.id,state:'cleared',predecessorDefectHash:hash(opened),approvals:{
  [defectId]:{revisionHash:remediatedPlan.workHeads.get(defectId).revisionHash,contentHash:remediatedPlan.workHeads.get(defectId).contentHash},
  [defectAdditionId]:{revisionHash:remediatedPlan.workHeads.get(defectAdditionId).revisionHash,contentHash:remediatedPlan.workHeads.get(defectAdditionId).contentHash}
}};
df.options.batches.push({version:3,sampleDefects:[clearance]});
assert.equal(report(drun()).openSampleDefects,0);
assert.equal(report(drun()).complete,true);
const exact=clearance.approvals[defectId].contentHash;clearance.approvals[defectId].contentHash='stale';
assert.throws(drun,/clearance content is stale/);clearance.approvals[defectId].contentHash=exact;

// Sampling is enforced whenever risk records appear, even if a synthetic or
// historical manifest omits activeReviewPolicy.
const sampledFlag=oneContext.policy.sampled;oneContext.policy.sampled=false;
assert.throws(srun,/Routine sample selection differs/);oneContext.policy.sampled=sampledFlag;

const sampleIds=Array.from({length:11},(_,i)=>'vocab-n5:'+i),sample=selectedForBatch(sampleIds);
assert.equal(sample.size,2,'Ten-percent batch sample was not rounded up');
const sampledId=[...sample][0];
assert.equal(policyRequirements({id:sampledId,policy:{id:'risk-based-v1',risk:'routine',reasons:[],enrichmentRequired:false,sampled:true}},
  {id:sampledId,patch:{}}).independentReviewRequired,true,'Deterministic sample did not require an independent review');
assert.throws(()=>policyRequirements({id:'new',policy:{id:'risk-based-v1',risk:'consequential',reasons:['addition'],enrichmentRequired:false,sampled:false}},
  {id:'new',addition:true}),/requires teaching enrichment/);
for (const reason of ['additional-sense','ambiguous-grammar']) assert.throws(()=>policyRequirements({id:'existing',
  policy:{id:'risk-based-v1',risk:'consequential',reasons:[reason],enrichmentRequired:false,sampled:false}},
  {id:'existing',patch:{}}),/requires teaching enrichment/,reason+' did not require teaching enrichment');

console.log('Workflow regressions passed: revision chains, draft isolation, content-bound approvals, risk-based sampling and enrichment, persistent research, later addition reviews, stable source positions, mixed reference actions and stale target decisions.');

// V2 permits only explicitly attested German edits and preserves v1 replay.
const vf=fixture(),vrun=()=>prepareCorrections(vf.legacy,vf.options),v0=vrun(),vid=v0.items[0].id;
const vbefore=project(v0.workingItems.get(vid));
function germanRecord(patch) {
  const record=revision(v0,vid,patch),after=project({...vbefore,...patch});
  record.policy={id:'risk-based-v2',approvalBinding:'entry-identity-v1',risk:'routine',reasons:[],enrichmentRequired:false,sampled:true,
    germanEdit:{preservesMeaning:true,reviewer:record.review.reviewer,
      finding:'Fixture: punctuation and German wording preserve the existing sense.',beforeHash:hash(vbefore),afterHash:hash(after)}};
  approveRisk(record,after);
  return {record,after};
}
const vp={meaning:vbefore.meaning+'.',notes:vbefore.notes+' ',
  examples:vbefore.examples.map((example,i)=>({...example,german:example.german+(i===0?' ':'')}))};
const vg=germanRecord(vp);
vf.options.batches.push({version:3,reviews:[vg.record]});
assert.equal(vrun().ledger[0].reviewPolicy,'risk-based-v2');
assert.equal(vrun().ledger[0].risk,'routine');
assert.equal(policyRequirements({...vg.record,policy:{...vg.record.policy,sampled:false}},
  {before:vbefore,after:vg.after,patch:vp}).independentReviewRequired,false);
for (const mutate of [
  r=>{delete r.policy.germanEdit;},
  r=>{r.policy.germanEdit.preservesMeaning=false;},
  r=>{r.policy.germanEdit.beforeHash='stale';},
  r=>{r.policy.germanEdit.afterHash='stale';},
  r=>{r.policy.germanEdit.reviewer='Another editor';},
  r=>{r.policy.germanEdit.finding+=' changed';},
  r=>{r.evidence[0].finding+=' changed';},
  r=>{delete r.firstPass;},
  r=>{delete r.secondPass;}
]) {
  const saved=copy(vg.record);mutate(vg.record);assert.throws(vrun);
  Object.keys(vg.record).forEach(k=>delete vg.record[k]);Object.assign(vg.record,saved);
}
const forbidden=[
  {word:vbefore.word+'X'}, {reading:vbefore.reading+'X'}, {romaji:vbefore.romaji+'X'},
  {aliases:[...(vbefore.aliases||[]),'test']}, {pitch:9}, {pitchVariants:[1]},
  {type:'Adverb'}, {level:'N4'}, {senseKey:'new-sense'},
  {notes:''}, {notes:vbefore.notes+' \u65b0'},
  {examples:vbefore.examples.slice(1)}, {examples:[...vbefore.examples].reverse()},
  {examples:vbefore.examples.map((x,i)=>i?x:{...x,japanese:x.japanese+'\u65b0'})},
  {examples:vbefore.examples.map((x,i)=>i?x:{...x,romaji:x.romaji+'x'})}
];
for (const patch of forbidden) {
  const {record,after}=germanRecord(patch);
  assert.throws(()=>policyRequirements(record,{before:vbefore,after,patch}),/protected content/,JSON.stringify(patch));
}
const noNote={...vbefore};delete noNote.notes;
assert.throws(()=>policyRequirements(vg.record,{before:noNote,after:{...noNote,notes:'New teaching note'},patch:{notes:'New teaching note'}}),/protected content/);
assert.throws(()=>policyRequirements({...vg.record,policy:{...vg.record.policy,id:'risk-based-v1'}},
  {before:vbefore,after:vg.after,patch:vp}),/consequential review/);
assert.throws(()=>policyRequirements(vg.record,{before:vbefore,after:vg.after,patch:vp,kind:'candidate'}),/consequential review/);
assert.equal(selectedForBatch(Array.from({length:25},(_,i)=>'mixed-routine-'+i)).size,3);
const vdefect={id:'v2-sample-defect',state:'open',predecessorDefectHash:null,
  sampledRevisionId:vg.record.revisionId,batchRevisionIds:[vg.record.revisionId],
  finding:'Synthetic substantive defect in sampled German edit.',sharedRuleRefs:[]};
vf.options.batches.push({version:3,sampleDefects:[vdefect]});
assert.equal(vrun().ledger[0].state,'needs revision');
assert.equal(report(vrun()).complete,false);
console.log('V2 regressions passed: narrow German edits, protected fields, exact findings and approvals, legacy replay, sample rounding and escalation.');


// Hydrated provenance remains evidence bookkeeping; actual pitch stays protected.
const provenancePatch={pitchProvenance:[{source:'Fixture hydrated evidence'}]};
assert.equal(policyRequirements({...vg.record,policy:{...vg.record.policy,germanEdit:undefined,sampled:false}},
  {before:vbefore,after:{...vbefore,...provenancePatch},patch:provenancePatch}).independentReviewRequired,false);
const combined=germanRecord({...vp,...provenancePatch});
assert.equal(policyRequirements(combined.record,{before:vbefore,after:combined.after,patch:{...vp,...provenancePatch}}).risk,'routine');

// V2 identity binding cannot be transplanted across entries or revision chains.
const identityRecord=copy(vg.record);
for(const field of ['id','revisionId','originalHash','predecessorHash','predecessorRevisionHash']) {
  const altered={...identityRecord,[field]:'different'};
  assert.notEqual(entryApprovalHash(altered,vg.after),entryApprovalHash(identityRecord,vg.after),field+' not bound');
}
const noBinding=copy(vg.record);delete noBinding.policy.approvalBinding;approveRisk(noBinding,vg.after);
const bindFixture=fixture();bindFixture.options.batches.push({version:3,reviews:[noBinding]});
assert.throws(()=>prepareCorrections(bindFixture.legacy,bindFixture.options),/identity approval binding/);
bindFixture.options.manifest.legacyV2ApprovalBatchHashes=[hash(bindFixture.options.batches.at(-1))];
assert.throws(()=>prepareCorrections(bindFixture.legacy,bindFixture.options),/allowlist is frozen/);

// A draft may not absorb the batch sample while accepted entries escape review.
const poolFixture=fixture();poolFixture.options.batches.push({version:3,additions:[copy(earlierAccepted)]});
const poolRun=()=>prepareCorrections(poolFixture.legacy,poolFixture.options),poolInitial=poolRun();
const poolIds=poolInitial.items.map(v=>v.id),draftSample=[...selectedForBatch(poolIds)][0],acceptedSample=poolIds.find(id=>id!==draftSample);
const poolDraft=revision(poolInitial,draftSample,{},'drafted');
poolDraft.policy={id:'risk-based-v2',risk:'routine',reasons:[],enrichmentRequired:true,sampled:false};
const poolAcceptance=revision(poolInitial,acceptedSample,{});
poolAcceptance.policy={id:'risk-based-v2',approvalBinding:'entry-identity-v1',risk:'routine',reasons:[],enrichmentRequired:true,sampled:false};
approveRisk(poolAcceptance,poolInitial.workingItems.get(acceptedSample));
poolFixture.options.batches.push({version:3,reviews:[poolDraft,poolAcceptance]});
assert.throws(poolRun,/Routine sample selection differs/);
poolAcceptance.policy.sampled=true;approveRisk(poolAcceptance,poolInitial.workingItems.get(acceptedSample));
assert.equal(poolRun().ledger.find(r=>r.id===acceptedSample).independentReviewRequired,true);

// Hydration must attest the last accepted source, not the intermediate draft.
const {hydrate}=require('./vocabulary-editorial-record.cjs');
const hf=fixture(),hrun=()=>prepareCorrections(hf.legacy,hf.options),h0=hrun(),hid=h0.items[0].id;
const hd=revision(h0,hid,{meaning:h0.items[0].meaning+'.'},'drafted');
hd.policy={id:'risk-based-v2',risk:'consequential',reasons:['translation-change'],enrichmentRequired:false,sampled:false};
hf.options.batches.push({version:3,reviews:[hd]});const h1=hrun();
const acceptedBaseline=project(h0.items[0]),workingDraft=project(h1.workingItems.get(hid));
const hp={entries:[{id:hid,state:'drafted',content:workingDraft,sourceHash:hash(workingDraft),predecessorRevisionHash:h1.workHeads.get(hid).revisionHash,
  acceptedContent:acceptedBaseline,acceptedContentHash:hash(acceptedBaseline),researchPacket:{pitch:{}}}]};
const hfind={entries:[{id:hid,revisionId:'hydrate-draft-acceptance',state:'accepted',rationale:'Punctuation preserves meaning since accepted baseline.',
  risk:'routine',review:copy(complete.reviews[0].review),evidence:copy(complete.reviews[0].evidence),pitch:copy(complete.reviews[0].pitch),
  germanEdit:{preservesMeaning:true,reviewer:complete.reviews[0].review.reviewer,finding:'Added terminal punctuation only.'}}]};
const hydrated=hydrate(hp,hfind),ha=hydrated.reviews[0];ha.policy.approvalBinding='entry-identity-v1';ha.policy.sampled=true;
const hfinal={...workingDraft,...ha.replacement};approveRisk(ha,hfinal);hf.options.batches.push(hydrated);
assert.equal(hrun().ledger[0].reviewPolicy,'risk-based-v2');
assert.equal(ha.policy.germanEdit.beforeHash,hash(acceptedBaseline));
const savedBaseline=hp.entries[0].acceptedContentHash;hp.entries[0].acceptedContentHash='stale';
assert.throws(()=>hydrate(hp,hfind),/Accepted baseline hash differs/);hp.entries[0].acceptedContentHash=savedBaseline;
delete hp.entries[0].acceptedContent;delete hp.entries[0].acceptedContentHash;
assert.throws(()=>hydrate(hp,hfind),/prior draft requires the accepted baseline/);
const {germanEditEligible}=require('./vocabulary-review-policy.cjs');
assert.equal(germanEditEligible({notes:'\u300c\u884c\u304f\u300d means go.'},{notes:'\u300c\u884c\u304f?\u300d means go.'}),false);
assert.equal(germanEditEligible({notes:'\u300c\u884c\u304f\u300d means go.'},{notes:'\u300c\u884c\u304f\uff1f\u300d means go.'}),false);
assert.equal(germanEditEligible({notes:'\u304b\u3099 means ga.'},{notes:'\u304b\u309a means ga.'}),false);
console.log('V2 hardening regressions passed: identity approvals, frozen history, accepted-only sampling, draft source attestations, Japanese punctuation/combining marks.');

// Publisher-format corrections remain distinct from exact spelling variants.
// The frozen source, lexical review and both approvals still bind the result.
const {validateSourceNotation,validateSourceNotationTargets}=require('./vocabulary-source-notation.cjs');
const notationCases=[
  [{word:'散歩',reading:'さんぽする'}, {word:'散歩する',reading:'さんぽする'}, {kind:'nominal-verb',word:'散歩する',reading:'さんぽする'}],
  [{word:'暖かい',reading:'あたたか(い)'}, {word:'暖かい',reading:'あたたかい'}, {kind:'parenthetical-reading',word:'暖かい',reading:'あたたかい'}],
  [{word:'急に',reading:'急に',gloss:'きゅうに'}, {word:'急に',reading:'きゅうに'}, {kind:'misplaced-reading',word:'急に',reading:'きゅうに'}],
  [{word:'塵',reading:'ごみ'}, {word:'ゴミ',reading:'ゴミ',aliases:['塵']}, {kind:'kana-script',word:'塵',reading:'ゴミ'}],
  [{word:'川/河',reading:'かわ'}, {word:'川',reading:'かわ',aliases:['河']}, {kind:'combined-spellings',word:'川',reading:'かわ'}]
];
for(const [ref,target,notation] of notationCases) {
  validateSourceNotation(ref,target,notation);
  assert.throws(()=>validateSourceNotation(ref,{...target,reading:'むし'},notation),'Unrelated pronunciation accepted');
  assert.throws(()=>validateSourceNotation(ref,{...target,word:'虫',aliases:[]},notation),'Unrelated spelling accepted');
  assert.throws(()=>validateSourceNotation(ref,target,{...notation,kind:'unchecked'}));
}
validateSourceNotation({word:'散歩',reading:'さんぽ・する'},notationCases[0][1],notationCases[0][2]);
assert.throws(()=>validateSourceNotation({word:'散歩',reading:'さん・ぽする'},notationCases[0][1],notationCases[0][2]),/Source suru reading differs/);
assert.throws(()=>validateSourceNotation({word:'散歩',reading:'さんぽ・・する'},notationCases[0][1],notationCases[0][2]),/Source suru reading differs/);
assert.throws(()=>validateSourceNotation({word:'散歩',reading:'さんぽ'},notationCases[0][1],notationCases[0][2]),/complete suru reading/);
assert.throws(()=>validateSourceNotation({word:'暖かい',reading:'あたたか(かった)'},notationCases[1][1],notationCases[1][2]),/changed source reading/);
assert.throws(()=>validateSourceNotation({word:'急に',reading:'急に',gloss:'suddenly'},notationCases[2][1],notationCases[2][2]),/contain this reading/);
assert.throws(()=>validateSourceNotation({word:'塵',reading:'ちり'},notationCases[3][1],notationCases[3][2]),/changed pronunciation/);
assert.throws(()=>validateSourceNotation(notationCases[4][0],{word:'川',reading:'かわ'},notationCases[4][2]),/not fully covered/);

for(const ref of [
  {word:'椅子',reading:'い(す)',gloss:'chair',url:'fixture:parentheses'},
  {word:'椅子',reading:'椅子',gloss:'いす',url:'fixture:columns'},
  {word:'椅子',reading:'イス',gloss:'chair',url:'fixture:kana'},
  {word:'椅子/いす',reading:'いす',gloss:'chair',url:'fixture:combined'}
]) {
  const kinds=['parenthetical-reading','misplaced-reading','kana-script','combined-spellings'];
  const kind=kinds[['fixture:parentheses','fixture:columns','fixture:kana','fixture:combined'].indexOf(ref.url)];
  const candidate={key:'notation-fixture',word:ref.word,reading:ref.reading,references:[ref]},nf=fixture([candidate]),nrun=()=>prepareCorrections(nf.legacy,nf.options),np=nrun(),v=np.items[0];
  const d={key:candidate.key,referenceIndex:0,referenceHash:hash(ref),revisionId:'notation-'+(++serial),state:'accepted',predecessorHash:null,predecessorRevisionHash:null,
    disposition:'verified-source-notation',targets:[v.id],targetHashes:{[v.id]:hash(project(v))},sourceNormalization:{kind,word:'椅子',reading:'いす'},
    reason:'Synthetic source-format review, not a production lexical claim.',evidence:copy(complete.reviews[0].evidence),
    policy:{id:'risk-based-v2',risk:'consequential',reasons:['source-notation'],enrichmentRequired:false,sampled:false}};
  function sealNotation() {const h=decisionHash(d);d.firstPass={decision:'accepted',reviewer:'Fixture notation author',finding:'Synthetic exact source review.',contentHash:h,approvalHash:h};d.secondPass={...d.firstPass,reviewer:'Fixture independent notation reviewer'};}
  sealNotation();nf.options.batches.push({version:3,decisions:[d]});assert.equal(report(nrun()).unresolvedCandidateReferences,0);
  const saved=copy(d);
  delete d.secondPass;assert.throws(nrun,/second-pass acceptance/);Object.assign(d,copy(saved));
  d.secondPass.reviewer=d.firstPass.reviewer;assert.throws(nrun,/Independent reviewer/);Object.assign(d,copy(saved));
  if(kind==='combined-spellings') {
    // Both aliases are covered, but changing the chosen spelling invalidates
    // the exact approval even though the mechanical normalization is valid.
    d.sourceNormalization.word='いす';assert.throws(nrun,/First pass is stale/);Object.assign(d,copy(saved));
  }
  d.disposition='verified-spelling-variant';delete d.sourceNormalization;sealNotation();assert.throws(nrun,/Variant reading differs|Missing variant alias/);
}
console.log('Source-notation regressions passed: five bounded formats, unrelated forms rejected, exact/independent approvals enforced, strict spelling checks preserved.');

const multiNotationCases=[
  [{word:'毎年',reading:'まいとし / まいねん'},[{word:'毎年',reading:'まいとし'},{word:'毎年',reading:'まいねん'}],{kind:'alternative-readings',word:'毎年',reading:'まいとし / まいねん'}],
  [{word:'堅/硬/固い',reading:'かたい'},[{word:'堅い',reading:'かたい'},{word:'硬い',reading:'かたい'},{word:'固い',reading:'かたい'}],{kind:'shared-okurigana',word:'堅い/硬い/固い',reading:'かたい'}]
];
for(const[ref,targets,notation]of multiNotationCases) {
  validateSourceNotationTargets(ref,targets,notation);
  validateSourceNotationTargets(ref,[...targets].reverse(),notation);
  assert.throws(()=>validateSourceNotationTargets(ref,targets.slice(1),notation));
  assert.throws(()=>validateSourceNotationTargets(ref,[...targets,{word:'虫',reading:'むし'}],notation));
  assert.throws(()=>validateSourceNotationTargets(ref,[{...targets[0],reading:'むし'},...targets.slice(1)],notation));
  assert.throws(()=>validateSourceNotationTargets(ref,[{...targets[0],word:'虫'},...targets.slice(1)],notation));
  assert.throws(()=>validateSourceNotationTargets(ref,targets,{...notation,reading:'むし'}));
  assert.throws(()=>validateSourceNotationTargets(ref,targets,{...notation,word:'虫'}));
  assert.throws(()=>validateSourceNotationTargets(ref,targets,{...notation,extra:'unchecked'}));
  assert.throws(()=>validateSourceNotationTargets(ref,targets,{...notation,kind:'unchecked'}));
}
const[yearRef,yearTargets,yearNotation]=multiNotationCases[0];
for(const reading of ['まいとし/まいとし','まいとし/マイトシ','まいとし/','まいとし/毎年','まいとし、まいねん'])assert.throws(()=>validateSourceNotationTargets({...yearRef,reading},yearTargets,{...yearNotation,reading}));
const[hardRef,hardTargets,hardNotation]=multiNotationCases[1];
for(const word of ['堅/硬/固','堅い/硬/固い','堅/固/固い','堅//固い'])assert.throws(()=>validateSourceNotationTargets({...hardRef,word},hardTargets,hardNotation));
assert.throws(()=>validateSourceNotationTargets(hardRef,[{word:'固い',reading:'かたい',aliases:['堅い','硬い']},...hardTargets.slice(1)],hardNotation),'Overlapping target coverage accepted');
for(const[ref,target,notation]of notationCases) {
  validateSourceNotationTargets(ref,[target],notation);
  assert.throws(()=>validateSourceNotationTargets(ref,[target,{word:'虫',reading:'むし'}],notation),'Legacy single-target format was broadened');
}

// These are structural fixtures, not production lexical claims. Verify that
// all independently accepted cards and the full source normalization are bound.
for(const[ref,specs,notation]of multiNotationCases) {
  const source={...ref,gloss:'Synthetic multi-form reference.',url:'fixture:multi-source'},candidate={key:'multi-notation-fixture',word:source.word,reading:source.reading,references:[source]},mf=fixture([candidate]),mrun=()=>prepareCorrections(mf.legacy,mf.options);
  const additions=specs.map((spec,index)=>{
    const entry={...copy(complete.entries[0]),word:spec.word,reading:spec.reading,aliases:[],pitch:null};delete entry.pitchVariants;delete entry.pitchProvenance;
    const record={...copy(complete.reviews[0]),id:'vocab-n5:correction:multi-'+index,entry,state:'accepted',revisionId:'multi-add-'+(++serial),predecessorHash:null,predecessorRevisionHash:null,
      reason:'Synthetic structural regression addition.',levelBasis:'Synthetic fixture level.',policy:{id:'risk-based-v2',approvalBinding:'entry-identity-v1',risk:'consequential',reasons:['addition'],enrichmentRequired:true,sampled:false},
      pitch:{status:'unknown',rationale:'Synthetic fixture makes no accent claim.',evidence:[{source:'Synthetic fixture',version:'1',locator:'fixture:multi-source',attribution:'Structural test fixture; no dictionary attribution.',finding:'Structural regression only; no production lexical claim.'}]}};
    return approveRisk(record,entry);
  });
  mf.options.batches.push({version:3,additions});const mp=mrun(),targetIds=additions.map(r=>r.id);
  const d={key:candidate.key,referenceIndex:0,referenceHash:hash(source),revisionId:'multi-source-'+(++serial),state:'accepted',predecessorHash:null,predecessorRevisionHash:null,
    disposition:'verified-source-notation',targets:targetIds,targetHashes:Object.fromEntries(targetIds.map(id=>[id,hash(project(mp.items.find(v=>v.id===id)))])),sourceNormalization:copy(notation),
    reason:'Synthetic exact multi-form source review.',evidence:copy(additions[0].pitch.evidence),policy:{id:'risk-based-v2',risk:'consequential',reasons:['source-notation'],enrichmentRequired:false,sampled:false}};
  const seal=()=>{const h=decisionHash(d);d.firstPass={decision:'accepted',reviewer:'Fixture multi-form author',finding:'Synthetic structural first pass.',contentHash:h,approvalHash:h};d.secondPass={...d.firstPass,reviewer:'Fixture independent multi-form reviewer'};};
  seal();mf.options.batches.push({version:3,decisions:[d]});assert.equal(report(mrun()).unresolvedCandidateReferences,0);const saved=copy(d);
  d.sourceNormalization.reading+=' ';assert.throws(mrun,/First pass is stale|changed source notation|changed reading/);Object.assign(d,copy(saved));
  d.targetHashes[targetIds[1]]='stale';seal();assert.throws(mrun,/Candidate target approval is stale/);Object.assign(d,copy(saved));
  d.targets.pop();delete d.targetHashes[targetIds.at(-1)];seal();assert.throws(mrun,/cover every distinct form/);Object.assign(d,copy(saved));
  delete d.secondPass;assert.throws(mrun,/second-pass acceptance/);Object.assign(d,copy(saved));
  d.secondPass.reviewer=d.firstPass.reviewer;assert.throws(mrun,/Independent reviewer/);Object.assign(d,copy(saved));
  const savedAddition=copy(additions[1]);delete additions[1].secondPass;assert.throws(mrun,/second-pass acceptance/);Object.assign(additions[1],savedAddition);
}
console.log('Multi-form source regressions passed: every reading/spelling bound to a distinct accepted card; missing, unrelated, ambiguous and stale forms rejected.');
