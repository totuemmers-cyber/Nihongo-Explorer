// Append-only authoring workflow. Research/drafts never become runtime patches.
const assert = require('assert');
const {read, levels, key} = require('./vocabulary-tools.cjs');
const {hash, project, prepareCorrections, validateReviewRecord, validatePitch} = require('./vocabulary-correction-pipeline.cjs');
const {requirements:reviewRequirements,selectedForBatch,POLICY_ID,SUPPORTED_POLICY_IDS,SAMPLE_SEED} = require('./vocabulary-review-policy.cjs');
const copy = v => JSON.parse(JSON.stringify(v));
const text = v => typeof v === 'string' && v.trim().length > 0;
const states = ['pending','researching','drafted','needs revision','accepted'];
const actions = ['added','verified-spelling-variant','additional-sense','additional-reading','excluded'];
const LEGACY_V2_APPROVAL_BATCH_HASHES=Object.freeze([
  'f00dc1a2b3c80ae50a4f2699482028f33ff6da1b3515eec8383c69464c0cf54c',
  '16ac9b9eec4f60500c2212a33d03abc906e0399aa3c7b380c4dfa79560206150',
  '4b5f6f5d3c0ee573fb906cf8b8d2075a3de912431ac4c7b088fe61e5b83598c5'
]);
const entryApprovalHash = (record, content) => hash({content:project(content),evidence:record.evidence,
  review:record.review,pitch:record.pitch,rationale:record.rationale,levelBasis:record.levelBasis,reason:record.reason,
  policy:record.policy,...(record.policy?.approvalBinding==='entry-identity-v1'?{
    identity:{id:record.id,revisionId:record.revisionId,originalHash:record.originalHash,
      predecessorHash:record.predecessorHash,predecessorRevisionHash:record.predecessorRevisionHash}
  }:{})});
const decisionContent = d => ({key:d.key,referenceIndex:d.referenceIndex,referenceHash:d.referenceHash,
  disposition:d.disposition,targets:d.targets,targetHashes:d.targetHashes,reason:d.reason,evidence:d.evidence,policy:d.policy});
const decisionHash = d => hash(decisionContent(d));
const mergeHash = m => hash({from:m.from,to:m.to,fromHash:m.fromHash,toHash:m.toHash,
  equivalentSense:m.equivalentSense,preservedContent:m.preservedContent,evidence:m.evidence,policy:m.policy,
  ...(m.retirement?{retirement:m.retirement}:{})});
function evidence(rows) {
  assert(Array.isArray(rows) && rows.length,'Missing research evidence');
  for (const r of rows) for (const f of ['source','version','locator','finding']) assert(text(r[f]),'Missing research '+f);
}
function approval(record, requirements, contentHash, approvalHash=contentHash) {
  if (SUPPORTED_POLICY_IDS.has(requirements.id)) {
    assert(record.firstPass?.decision==='accepted','Explicit first-pass acceptance required');
    assert(text(record.firstPass.reviewer) && text(record.firstPass.finding),'Missing first-pass finding');
    assert.equal(record.firstPass.contentHash,contentHash,'First pass is stale');
    assert.equal(record.firstPass.approvalHash,approvalHash,'First-pass evidence/review approval is stale');
  }
  if (requirements.independentReviewRequired) {
    const secondPass=record.secondPass;
    assert(secondPass?.decision==='accepted','Explicit second-pass acceptance required');
    assert(text(secondPass.reviewer) && text(secondPass.finding),'Missing critical second pass');
    assert.equal(secondPass.contentHash,contentHash,'Second pass is stale');
    assert.equal(secondPass.approvalHash,approvalHash,'Evidence/review approval is stale');
    if (SUPPORTED_POLICY_IDS.has(requirements.id)) assert.notEqual(secondPass.reviewer,record.firstPass.reviewer,'Independent reviewer must differ from first reviewer');
  }
}
function workRecord(r, previous, revisionIds) {
  assert(states.includes(r.state),'Invalid persistent work state');
  assert(text(r.revisionId) && !revisionIds.has(r.revisionId),'Missing or repeated revision ID');
  revisionIds.add(r.revisionId);
  assert.equal(r.predecessorRevisionHash,previous?.revisionHash ?? null,'Revision chain is stale or forked');
  assert(Object.hasOwn(r,'predecessorRevisionHash'),'Missing predecessor revision hash');
  if (r.research?.length) evidence(r.research);
  if (['researching','needs revision'].includes(r.state)) {
    evidence(r.research);
    assert(Array.isArray(r.openQuestions) && r.openQuestions.length && r.openQuestions.every(text),'Unresolved findings must be saved');
  }
  if (r.state==='accepted') assert(!r.openQuestions?.length,'Cannot accept unresolved research');
  else {
    assert(r.firstPass?.decision!=='accepted','Draft cannot carry a first-pass acceptance');
    assert(r.secondPass?.decision!=='accepted','Draft cannot carry an acceptance');
  }
}
function prepareWorkflow(legacy, options) {
  const m=options.manifest;
  if(m.legacyV2ApprovalBatchHashes) assert.deepStrictEqual([...m.legacyV2ApprovalBatchHashes].sort(),
    [...LEGACY_V2_APPROVAL_BATCH_HASHES].sort(),'Legacy v2 approval allowlist is frozen');
  if (m.activeReviewPolicy) {
    assert(SUPPORTED_POLICY_IDS.has(m.activeReviewPolicy.id),'Configured review policy differs from validator');
    assert.equal(m.activeReviewPolicy.routineIndependentSamplePercent,10,'Unsupported routine sample rate');
    assert.equal(m.activeReviewPolicy.sampleSeed,SAMPLE_SEED,'Configured review sample seed differs from validator');
  }
  if (m.historicalManifest) {
    const historic=JSON.parse(read(m.historicalManifest));
    assert.equal(hash(historic),m.historicalManifestHash,'Historical correction manifest changed');
    assert.deepStrictEqual(m.authoringFiles.slice(0,historic.authoringFiles.length),historic.authoringFiles,'Historical batch order changed');
    assert.equal(m.baselineHash,historic.baselineHash,'Historical baseline changed');
  }
  const baseline=options.baseline || JSON.parse(read(m.baseline));
  const batches=options.batches || m.authoringFiles.map(file=>{
    assert(/^scripts\/vocabulary-completion\/[\w-]+\.json$/.test(file),'Invalid correction authoring path');
    const batch=JSON.parse(read(file));
    assert.equal(hash(batch),m.batchHashes?.[file],'Sealed authoring batch changed: '+file);
    return batch;
  });
  const firstV3=batches.findIndex(b=>b.version===3);
  const historical=firstV3<0?batches:batches.slice(0,firstV3);
  assert(historical.every(b=>b.version===2),'Unsupported historical batch');
  const modern=firstV3<0?[]:batches.slice(firstV3);
  assert(modern.every(b=>b.version===3),'Historical batches must precede revisions');
  const baseOptions={manifest:{version:2,baselineHash:m.baselineHash},baseline};
  // Validate the frozen history independently before constructing the latest view.
  const past=prepareCorrections(legacy,{...baseOptions,batches:historical});
  const originals=new Map(legacy.items.map(v=>[v.id,v]));
  const working=new Map(past.items.map(v=>[v.id,copy(v)]));
  for (const merge of past.merges) {
    const r=past.correctionReviews.get(merge.from);
    working.set(merge.from,r.entry?copy(r.entry):{...copy(originals.get(merge.from)),...copy(r.replacement||{})});
  }
  const accepted=new Map(working);
  const heads=new Map(), acceptedRecords=new Map(past.correctionReviews), revisionIds=new Set(), sampleDefects=new Map();
  const entryRecordsByRevisionId=new Map(), batchRevisionIdsByRevisionId=new Map();
  const acceptedRequirements=new Map([...past.correctionReviews].map(([id])=>[id,{id:'strict-full-v1',risk:'consequential',sampled:false,
    enrichmentRequired:true,independentReviewRequired:true}]));
  const levelBases=new Map([...past.correctionReviews].filter(([,r])=>r.levelBasis).map(([id,r])=>[id,r.levelBasis]));
  const additionSeeds=new Map(past.correctionAdditions.map(a=>[a.id,copy(a)]));
  const history=[];
  for (const batch of historical) for (const r of [...(batch.reviews||[]),...(batch.additions||[])]) {
    heads.set(r.id,{state:'accepted',revisionHash:hash(r),contentHash:r.secondPass.contentHash,record:r});
  }
  const candidateMap=new Map(legacy.manifest.candidates.map(c=>[c.key,c]));
  const refHeads=new Map();
  // Legacy group decisions retain their recorded meaning. New decisions are per reference.
  for (const [k,d] of past.decisions) {
    const c=candidateMap.get(k);
    (c.references||[]).forEach((ref,index)=>{
      const targetIds=d.targets.map(t=>past.items.find(v=>v.id===t || key(v)===t)?.id);
      assert(targetIds.every(Boolean),'Historical candidate target missing');
      const resolved={...d,targets:targetIds,referenceIndex:index,referenceHash:hash(ref),
        targetHashes:Object.fromEntries(targetIds.map(id=>[id,hash(project(accepted.get(id)))]))};
      refHeads.set(k+'#'+index,{state:'accepted',record:resolved,revisionHash:hash(d),contentHash:decisionHash(resolved),historical:true});
    });
  }
  const mergeRecords=new Map(historical.flatMap(b=>b.merges||[]).map(r=>[r.from,{...r,
    fromHash:hash(project(accepted.get(r.from))),toHash:hash(project(accepted.get(r.to)))}]));
  for (const batch of modern) {
    assert(Array.isArray(batch.reviews || []) && Array.isArray(batch.additions || []),'Invalid authoring collections');
    const batchRecords=[...(batch.additions||[]),...(batch.reviews||[])];
    for(const r of batchRecords) if(r.state==='accepted' && r.policy?.id===POLICY_ID
      && !(m.legacyV2ApprovalBatchHashes||[]).includes(hash(batch))) {
      assert.equal(r.policy.approvalBinding,'entry-identity-v1','V2 acceptance requires entry identity approval binding');
    }
    if (batchRecords.some(r=>r.policy?.id===POLICY_ID)) {
      assert(batchRecords.length<=25,'V2 review batches are limited to 25 entries');
      assert.equal(new Set(batchRecords.map(r=>r.id)).size,batchRecords.length,'V2 batch repeats an entry');
    }
    {
      for (const policyId of SUPPORTED_POLICY_IDS) {
        const routine=batchRecords.filter(r=>r.policy?.id===policyId && r.policy.risk==='routine');
        // Preserve historical v1 selection, including its draft behavior. New
        // batches must sample entries actually accepted in this import.
        const pool=policyId===POLICY_ID?routine.filter(r=>r.state==='accepted'):routine;
        const sampled=selectedForBatch(pool.map(r=>r.id));
        for (const r of routine) assert.equal(r.policy.sampled,sampled.has(r.id),'Routine sample selection differs from fixed batch sample');
      }
    }
    const batchEntryRecords=new Map(batchRecords.map(r=>[r.revisionId,r]));
    for (const r of batchRecords) {
      const isAddition=(batch.additions||[]).includes(r);
      const previous=heads.get(r.id);
      workRecord(r,previous,revisionIds);
      let old;
      if (isAddition) {
        assert(/^vocab-n[1-5]:correction:[a-z0-9-]+$/.test(r.id),'Invalid explicit addition ID');
        assert(!working.has(r.id) && !additionSeeds.has(r.id),'Duplicate addition ID');
        assert(r.entry && Object.keys(r.entry).every(f=>Object.hasOwn(project(r.entry),f)),'Unsupported addition field');
        assert(r.id.startsWith('vocab-'+r.entry.level.toLowerCase()+':'),'Addition source/level mismatch');
        assert(text(r.reason) && text(r.levelBasis),'Missing addition reason/level basis');
        old=null;
      } else {
        old=working.get(r.id);
        assert(old,'Unknown revision target '+r.id);
        assert(!mergeRecords.has(r.id),'Retired identity cannot be revised');
        assert.equal(r.originalHash,hash(project(old)),'Original snapshot mismatch');
        const patch=r.replacement || {};
        assert(Object.keys(patch).every(f=>Object.hasOwn(project(patch),f)),'Unsupported correction field');
        assert.deepStrictEqual(r.original || {},Object.fromEntries(Object.keys(patch).map(f=>[f,Object.hasOwn(old,f)?copy(old[f]):null])),'Original correction values mismatch');
        assert(text(r.rationale),'Missing revision rationale');
        if (patch.level && patch.level!==old.level) assert(text(r.levelBasis),'Level change needs evidence and rationale');
      }
      assert(Object.hasOwn(r,'predecessorHash'),'Missing predecessor content hash');
      assert.equal(r.predecessorHash,old?hash(project(old)):null,'Predecessor content changed');
      const next=isAddition?copy(r.entry):{...copy(old),...copy(r.replacement||{})};
      const additionIdentity=isAddition || additionSeeds.has(r.id);
      const firstAdditionAcceptance=additionIdentity && !accepted.has(r.id);
      const acceptedContent=accepted.get(r.id);
      const effectivePatch=acceptedContent?Object.fromEntries(Object.entries(project(next))
        .filter(([field,value])=>JSON.stringify(acceptedContent[field])!==JSON.stringify(value))):{};
      // Classify the complete change since the last accepted snapshot. Otherwise a
      // consequential draft could be accepted by appending an empty routine patch.
      const requirements=reviewRequirements(r,{id:r.id,addition:firstAdditionAcceptance,
        additionIdentity,patch:effectivePatch,before:acceptedContent?project(acceptedContent):null,after:project(next)});
      if (r.state==='accepted') {
        approval(r,requirements,hash(project(next)),entryApprovalHash(r,next));
        validateReviewRecord(r,next,requirements);
        validatePitch(r.pitch,next);
        accepted.set(r.id,next);
        acceptedRecords.set(r.id,r);
        acceptedRequirements.set(r.id,requirements);
        if (r.levelBasis) levelBases.set(r.id,r.levelBasis);
      }
      if (isAddition) additionSeeds.set(r.id,copy(r));
      working.set(r.id,next);
      const head={state:r.state,revisionHash:hash(r),contentHash:hash(project(next)),record:r};
      heads.set(r.id,head);
      history.push({id:r.id,revisionId:r.revisionId,state:r.state,revisionHash:head.revisionHash,contentHash:head.contentHash,
        predecessorHash:r.predecessorHash,predecessorRevisionHash:r.predecessorRevisionHash});
    }
    const completeBatchRevisionIds=[...batchEntryRecords.keys()];
    for (const [revisionId,record] of batchEntryRecords) {
      entryRecordsByRevisionId.set(revisionId,record);
      batchRevisionIdsByRevisionId.set(revisionId,completeBatchRevisionIds);
    }
    for (const d of batch.decisions || []) {
      const c=candidateMap.get(d.key);
      assert(c && Number.isInteger(d.referenceIndex) && c.references?.[d.referenceIndex],'Unknown candidate reference');
      assert.equal(d.referenceHash,hash(c.references[d.referenceIndex]),'Candidate reference changed');
      const k=d.key+'#'+d.referenceIndex,previous=refHeads.get(k);
      workRecord(d,previous,revisionIds);
      assert(Object.hasOwn(d,'predecessorHash'),'Missing candidate predecessor hash');
      assert.equal(d.predecessorHash,previous?.contentHash ?? null,'Candidate decision chain is stale');
      if (d.state==='accepted') {
        assert(actions.includes(d.disposition),'Invalid candidate disposition');
        evidence(d.evidence);
        assert(text(d.reason),'Missing candidate rationale');
        assert(Array.isArray(d.targets) && new Set(d.targets).size===d.targets.length && (d.disposition==='excluded'?d.targets.length===0:d.targets.length>0),'Invalid candidate targets');
        assert.deepStrictEqual(Object.keys(d.targetHashes || {}).sort(),[...d.targets].sort(),'Missing exact target approvals');
        for (const id of d.targets) {
          const v=accepted.get(id);
          assert(v && heads.get(id)?.state==='accepted','Candidate target requires accepted review');
          assert.equal(d.targetHashes[id],hash(project(v)),'Candidate target approval is stale');
          if (['added','additional-reading'].includes(d.disposition)) assert(additionSeeds.has(id),'Claimed addition absent');
          if (d.disposition==='additional-sense') assert(additionSeeds.has(id) || v.meaning!==originals.get(id)?.meaning,'Missing additional sense');
          if (d.disposition==='verified-spelling-variant') {
            const ref=c.references[d.referenceIndex];
            assert.equal(ref.reading.normalize('NFKC'),v.reading.normalize('NFKC'),'Variant reading differs');
            assert(v.word===ref.word || (v.aliases||[]).includes(ref.word),'Missing variant alias');
          }
        }
        const requirements=d.policy?reviewRequirements(d,{id:k,kind:'candidate'}):{id:'strict-full-v1',independentReviewRequired:true};
        approval(d,requirements,decisionHash(d));
      }
      refHeads.set(k,{state:d.state,record:d,revisionHash:hash(d),contentHash:decisionHash(d)});
    }
    for (const r of batch.merges || []) {
      const previous=mergeRecords.get(r.from);
      assert.equal(r.predecessorMergeHash,previous?hash(previous):null,'Merge revision chain is stale');
      assert(Object.hasOwn(r,'predecessorMergeHash'),'Missing merge predecessor hash');
      if (previous) assert.equal(r.to,previous.to,'A merge revision must preserve its surviving target');
      for (const side of ['from','to']) {
        assert(heads.get(r[side])?.state==='accepted','Merge needs accepted entries');
        assert.equal(r[side+'Hash'],hash(project(accepted.get(r[side]))),'Merge approval is stale');
      }
      const requirements=r.policy?reviewRequirements(r,{id:r.from+'->'+r.to,kind:'merge'}):{id:'strict-full-v1',independentReviewRequired:true};
      approval(r,requirements,mergeHash(r));
      mergeRecords.set(r.from,r);
    }
    assert(Array.isArray(batch.sampleDefects || []),'Invalid sample-defect collection');
    for (const defect of batch.sampleDefects || []) {
      assert(text(defect.id),'Missing sample-defect ID');
      const previous=sampleDefects.get(defect.id);
      assert.equal(defect.predecessorDefectHash,previous?hash(previous.record):null,'Sample-defect chain is stale or forked');
      assert(Object.hasOwn(defect,'predecessorDefectHash'),'Missing sample-defect predecessor hash');
      assert(['open','cleared'].includes(defect.state),'Invalid sample-defect state');
      if (defect.state==='open') {
        assert(!previous,'Open sample defect already exists');
        assert(text(defect.finding),'Missing sampled defect finding');
        assert(Array.isArray(defect.batchRevisionIds) && defect.batchRevisionIds.length
          && new Set(defect.batchRevisionIds).size===defect.batchRevisionIds.length,'Invalid affected batch revisions');
        assert(!batchEntryRecords.has(defect.sampledRevisionId),'Sample defect must be appended after the affected batch');
        const sampled=entryRecordsByRevisionId.get(defect.sampledRevisionId);
        assert(sampled && SUPPORTED_POLICY_IDS.has(sampled.policy?.id) && sampled.policy.risk==='routine' && sampled.policy.sampled,
          'Sample defect must originate from a deterministic sampled review');
        assert.deepStrictEqual([...defect.batchRevisionIds].sort(),[...batchRevisionIdsByRevisionId.get(defect.sampledRevisionId)].sort(),
          'Sample defect must cover the full affected batch');
        assert(Array.isArray(defect.sharedRuleRefs || []),'Invalid shared-rule references');
        for (const ref of defect.sharedRuleRefs || []) {
          assert(text(ref.rule),'Missing shared-rule identifier');
          assert(Array.isArray(ref.entryIds) && ref.entryIds.length && ref.entryIds.every(text),'Invalid shared-rule entry references');
        }
        const affectedIds=[...new Set([
          ...defect.batchRevisionIds.map(id=>entryRecordsByRevisionId.get(id).id),
          ...(defect.sharedRuleRefs || []).flatMap(ref=>ref.entryIds)
        ])];
        assert(affectedIds.every(id=>working.has(id)),'Sample defect references an unknown entry');
        sampleDefects.set(defect.id,{state:'open',record:defect,affectedIds,
          openedHeadHashes:Object.fromEntries(affectedIds.map(id=>[id,heads.get(id)?.revisionHash??null]))});
      } else {
        assert(previous?.state==='open','Cannot clear a sample defect that is not open');
        assert.deepStrictEqual(Object.keys(defect.approvals || {}).sort(),[...previous.affectedIds].sort(),
          'Sample-defect clearance needs every affected final approval');
        for (const id of previous.affectedIds) {
          const head=heads.get(id),requirements=acceptedRequirements.get(id),exact=defect.approvals[id];
          assert(head?.state==='accepted','Sample-defect clearance target is not accepted');
          assert.notEqual(head.revisionHash,previous.openedHeadHashes[id],'Sample-defect target was not reviewed after escalation');
          assert(requirements?.independentReviewRequired,'Sample-defect target lacks independent review');
          assert.equal(exact.revisionHash,head.revisionHash,'Sample-defect clearance revision is stale');
          assert.equal(exact.contentHash,head.contentHash,'Sample-defect clearance content is stale');
        }
        sampleDefects.set(defect.id,{...previous,state:'cleared',record:defect});
      }
    }
  }
  // Flatten only accepted snapshots to reuse the full-runtime collision, identity,
  // conjugation and pitch checks. Authoring history is never rewritten.
  const flattened={version:2,reviews:[],additions:[],decisions:[],merges:[]};
  for (const [id,r] of acceptedRecords) {
    const v=accepted.get(id),old=originals.get(id);
    if (old) {
      const patch=Object.fromEntries(Object.entries(project(v)).filter(([f,value])=>JSON.stringify(old[f])!==JSON.stringify(value)));
      flattened.reviews.push({...r,id,workflowRequirements:acceptedRequirements.get(id),originalHash:hash(project(old)),replacement:patch,
        original:Object.fromEntries(Object.keys(patch).map(f=>[f,Object.hasOwn(old,f)?copy(old[f]):null])),
        rationale:r.rationale || 'Preserved accepted historical review.',levelBasis:r.levelBasis||levelBases.get(id)});
    } else {
      const seed=additionSeeds.get(id);
      flattened.additions.push({...r,id,workflowRequirements:acceptedRequirements.get(id),entry:project(v),reason:r.reason||seed.reason,levelBasis:r.levelBasis||levelBases.get(id)||seed.levelBasis});
    }
  }
  for (const r of mergeRecords.values()) {
    assert.equal(r.fromHash,hash(project(accepted.get(r.from))),'Merged content changed; fresh merge review required');
    assert.equal(r.toHash,hash(project(accepted.get(r.to))),'Merge target changed; fresh merge review required');
    flattened.merges.push({...r,secondPass:typeof r.secondPass==='string'?r.secondPass:r.secondPass.finding});
  }
  // Map insertion order is the first acceptance order, not the first draft order.
  // A draft accepted later must not shift an addition already in the raw source.
  const plan=prepareCorrections(legacy,{...baseOptions,batches:[flattened],revisionReplay:true});
  const byId=new Map(plan.items.map(v=>[v.id,v]));
  const decisions=new Map();
  const candidateLedger=legacy.manifest.candidates.map(c=>{
    const references=(c.references||[]).map((ref,index)=>{
      const h=refHeads.get(c.key+'#'+index),d=h?.record;
      if (h?.state==='accepted') assert(d.targets.every(id=>byId.has(id)),'Missing surviving candidate target');
      const current=h?.state==='accepted' && d.targets.every(id=>byId.has(id)
        && (!heads.has(id) || heads.get(id).state==='accepted')
        && d.targetHashes[id]===hash(project(byId.get(id))));
      return {index,referenceHash:hash(ref),state:current?'accepted':h?.state==='accepted'?'needs revision':h?.state||'pending',
        ...(h?{revisionHash:h.revisionHash,decisionHash:h.contentHash}:{}),
        ...(d?.disposition?{disposition:d.disposition,targets:d.targets}:{})};
    });
    const closed=references.length>0 && references.every(r=>r.state==='accepted');
    if (closed) {
      const ds=references.map(r=>refHeads.get(c.key+'#'+r.index).record);
      decisions.set(c.key,{key:c.key,disposition:new Set(ds.map(d=>d.disposition)).size===1?ds[0].disposition:'mixed',references:ds});
    }
    return {key:c.key,state:closed?'accepted':'pending',references};
  });
  const escalatedIds=new Set([...sampleDefects.values()].filter(d=>d.state==='open').flatMap(d=>d.affectedIds));
  const reviewedDistinctContextIds=new Set();
  const ledger=plan.ledger.map(v=>{
    const h=heads.get(v.id),isAccepted=h?.state==='accepted';
    const escalated=escalatedIds.has(v.id);
    const requirements=isAccepted?acceptedRequirements.get(v.id):null;
    const reviewedDistinctContexts=requirements?.id==='strict-full-v1'
      || (requirements?.enrichmentRequired===true && acceptedRecords.get(v.id)?.review?.reviewedDistinctContexts===true);
    if (reviewedDistinctContexts) reviewedDistinctContextIds.add(v.id);
    return {...v,editorial:isAccepted&&!escalated?'reviewed':'pending',state:escalated?'needs revision':h?.state||'pending',
      pitch:isAccepted?acceptedRecords.get(v.id).pitch.status:'pending',
      ...(requirements?{reviewPolicy:requirements.id,risk:requirements.risk,sampled:requirements.sampled,
        enrichmentRequired:requirements.enrichmentRequired,independentReviewRequired:requirements.independentReviewRequired}:{}),
      ...(h?{revisionHash:h.revisionHash,workingContentHash:h.contentHash}:{})};
  });
  const pendingAdditions=[...additionSeeds.keys()].filter(id=>!accepted.has(id));
  const workStates=Object.fromEntries(states.map(state=>[state,ledger.filter(v=>v.state===state).length
    +pendingAdditions.filter(id=>heads.get(id).state===state).length]));
  const sampleDefectLedger=[...sampleDefects].map(([id,d])=>({id,state:d.state,revisionHash:hash(d.record),
    affectedIds:d.affectedIds,predecessorDefectHash:d.record.predecessorDefectHash}));
  plan.files['scripts/vocabulary-completion/ledger.json']=JSON.stringify({version:3,entries:ledger,
    pendingAdditions:pendingAdditions.map(id=>({id,state:heads.get(id).state,revisionHash:heads.get(id).revisionHash,contentHash:heads.get(id).contentHash})),
    candidates:candidateLedger,revisions:history,sampleDefects:sampleDefectLedger,
    redirects:JSON.parse(plan.files['scripts/vocabulary-completion/ledger.json']).redirects},null,2)+'\n';
  return {...plan,decisions,ledger,candidateLedger,workStates,pendingAdditions:pendingAdditions.length,
    sampleDefects:sampleDefectLedger,openSampleDefects:sampleDefectLedger.filter(d=>d.state==='open').length,
    reviewedDistinctContextIds,workHeads:heads,candidateHeads:refHeads,workingItems:working};
}
module.exports={prepareWorkflow,entryApprovalHash,decisionHash,mergeHash,states,LEGACY_V2_APPROVAL_BATCH_HASHES};
