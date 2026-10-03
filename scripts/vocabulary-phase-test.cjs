const assert = require('assert');
const {phaseReport, candidateLevel, needsEnrichment} = require('./vocabulary-phase-report.cjs');
const {queue} = require('./vocabulary-review-queue.cjs');
function fixture() {
  const item = {id:'vocab-n5:0',source:'vocab-n5',level:'N5',word:'水',reading:'みず',notes:'水を飲む; Wasser als Getränk und zum Waschen.',
    examples:[{japanese:'水を飲みます。',romaji:'Mizu o nomimasu.',german:'Ich trinke Wasser.'},
      {japanese:'水で手を洗います。',romaji:'Mizu de te o araimasu.',german:'Ich wasche meine Hände mit Wasser.'}]};
  return {items:[item],ledger:[{id:item.id,editorial:'reviewed',pitch:'verified'}],reviewedDistinctContextIds:new Set([item.id]),
    manifest:{candidates:[]},candidateLedger:[],workHeads:new Map(),sampleDefects:[]};
}
let plan=fixture();
assert(phaseReport(plan,'N5').complete);
assert(!phaseReport(plan,'N1').complete,'Empty level cannot be certified');
assert.throws(()=>phaseReport(plan,'N0'),/Unknown vocabulary level/);
plan.items[0].notes='';
assert.equal(phaseReport(plan,'N5').missingNotes,1);
assert(!phaseReport(plan,'N5').complete);
assert(needsEnrichment(plan,plan.items[0]));
assert.equal(queue(plan,25).entries.length,0,'Maintenance retains accepted-entry behavior');
assert.equal(queue(plan,25,{level:'N5',enrichment:true}).entries[0].id,'vocab-n5:0','Accepted entry with missing notes must be queued');
assert.equal(queue(plan,25,{level:'N4',enrichment:true}).entries.length,0);
plan=fixture();plan.items[0].examples[1].japanese='水を飲みます！';
assert.equal(phaseReport(plan,'N5').fewerThanTwo,1,'Punctuation changes are not a second example');
plan=fixture();plan.items[0].examples[1].german='';
assert.equal(phaseReport(plan,'N5').incompleteExamples,1);
plan=fixture();plan.reviewedDistinctContextIds.clear();
assert(!phaseReport(plan,'N5').complete,'Two strings without editorial context review cannot pass');
assert(needsEnrichment(plan,plan.items[0]));
plan=fixture();plan.ledger[0].pitch='pending';
assert.equal(phaseReport(plan,'N5').pitchUninvestigated,1);
plan.ledger[0].pitch='unknown';assert(phaseReport(plan,'N5').complete,'Investigated uncertainty is allowed');
plan=fixture();
const candidate={key:'water',references:[{level:'N3'},{level:'N2'}],possibleTargets:[{id:'vocab-n5:0',level:'N5'}]};
assert.equal(candidateLevel(candidate),'N5','Shared group belongs to earliest affected level');
assert.equal(candidateLevel({...candidate,possibleTargets:[{id:'vocab-n5:0',level:'N4'}]},plan),'N5','Current relevelled target determines ownership');
assert.equal(candidateLevel({references:[{level:'N3'}],possibleTargets:[{id:'vocab-n5:0',level:'N5'}]},
  {...plan,items:[{...plan.items[0],level:'N4'}]}),'N4','Historical target level cannot retain earlier ownership');
plan.manifest.candidates=[candidate];plan.candidateLedger=[{key:'water',references:[{state:'accepted'},{state:'needs revision'}]}];
assert.equal(phaseReport(plan,'N5').unresolvedCandidateReferences,1);
assert(!phaseReport(plan,'N5').complete);
plan.candidateLedger[0].references[1].state='accepted';assert(phaseReport(plan,'N5').complete);
plan.candidateLedger[0].references.pop();
assert.equal(phaseReport(plan,'N5').missingCandidateReferences,1,'A missing reference cannot certify a phase');
assert(!phaseReport(plan,'N5').complete);
plan.candidateLedger=[];
assert.equal(phaseReport(plan,'N5').missingCandidateReferences,2,'A missing candidate ledger row must remain visible');
plan=fixture();
const allocated={key:'allocated',references:[{level:'N1'}],possibleTargets:[]};
plan.manifest.candidates=[allocated];
plan.candidateHeads=new Map([['allocated#0',{record:{key:'allocated',targets:['vocab-n5:0']}}]]);
plan.candidateLedger=[{key:'allocated',references:[{state:'needs revision'}]}];
assert.equal(candidateLevel(allocated,plan),'N5','Actual decision targets after manifest freeze participate in ownership');
assert.equal(phaseReport(plan,'N5').unresolvedCandidateReferences,1,'Reopened allocated target references block the actual level');
const {prepareCandidatePackets,preparePackets}=require('./vocabulary-batch.cjs');
plan=fixture();plan.items.push({...plan.items[0],id:'vocab-n1:0',level:'N1'});
assert.throws(()=>preparePackets(plan,{ids:['vocab-n1:0'],level:'N5',evidence:false}),/out-of-level/,'Explicit entry roster must respect supplied phase');
plan=fixture();plan.candidateHeads=new Map();
plan.manifest.candidates=[{key:'advanced',references:[{level:'N1',word:'advanced'}],possibleTargets:[]},
  {key:'beginner',references:[{level:'N5',word:'beginner'},{level:'N2',word:'beginner'}],possibleTargets:[]}];
plan.candidateLedger=plan.manifest.candidates.map(c=>({key:c.key,references:c.references.map((r,index)=>({index,referenceHash:'test',state:'pending'}))}));
const wave=prepareCandidatePackets(plan,undefined,{level:'N5',evidence:false});
assert.deepEqual(wave.packets.flatMap(p=>p.candidates.map(c=>c.key)),['beginner','beginner'],'Candidate allocation must stay in its owned phase');
assert.throws(()=>prepareCandidatePackets(plan,[{key:'advanced',index:0}],{level:'N5',evidence:false}),/out-of-level/);
plan=fixture();plan.workHeads.set('vocab-n5:correction:test',{state:'drafted',record:{entry:{level:'N5'}}});
assert.equal(phaseReport(plan,'N5').pendingAdditions,1);
plan.workHeads.get('vocab-n5:correction:test').record={replacement:{notes:'Draft revision'}};
plan.workingItems=new Map([['vocab-n5:correction:test',{level:'N5'}]]);
assert.equal(phaseReport(plan,'N5').pendingAdditions,1,'A revised addition draft cannot disappear from its gate');
plan=fixture();plan.sampleDefects=[{state:'open'}];assert(!phaseReport(plan,'N5').complete);
const {advanceCampaign}=require('./vocabulary-campaign.cjs');
const status={activeCampaign:{status:'active',activeLevel:'N5',levelOrder:['N5','N4','N3','N2','N1'],
  phases:Object.fromEntries(['N5','N4','N3','N2','N1'].map(level=>[level,{status:level==='N5'?'active':'pending'}]))}};
assert.throws(()=>advanceCampaign(status,plan),/N5 phase remains open/);
plan=fixture();const advanced=advanceCampaign(status,plan,'2026-10-03T00:00:00Z');
assert.equal(advanced.activeCampaign.activeLevel,'N4');assert.equal(advanced.activeCampaign.phases.N5.status,'complete');
assert.equal(status.activeCampaign.activeLevel,'N5','Advancement must not mutate its input');
plan.items[0].notes='';assert.throws(()=>advanceCampaign(advanced,plan),/N5 phase remains open/,'Earlier phase must be revalidated');
console.log('Vocabulary phase gates passed: accepted enrichment, distinct contexts, shared candidates, pitch uncertainty and unresolved work.');
