// Reusable packaging; editorial decisions must be supplied explicitly by reviewers.
const fs=require('fs'),path=require('path'),assert=require('assert');
const crypto=require('crypto');
const {root}=require('./vocabulary-tools.cjs');
const {hash,project}=require('./vocabulary-correction-pipeline.cjs');
const {entryApprovalHash,decisionHash}=require('./vocabulary-review-workflow.cjs');
const {selectedForBatch,POLICY_ID}=require('./vocabulary-review-policy.cjs');
const importer=require('./import-vocabulary-completion.cjs');
const {queue,researchPackets,packet:researchPacket}=require('./vocabulary-review-queue.cjs');
const clone=v=>JSON.parse(JSON.stringify(v));
const read=file=>JSON.parse(fs.readFileSync(file,'utf8'));
const json=value=>JSON.stringify(value,null,2)+'\n';
const nonempty=v=>typeof v==='string'&&v.trim();
function content(plan,id){return plan.workingItems?.get(id)||plan.items.find(v=>v.id===id);}
function binding(plan,id){const v=content(plan,id);assert(v,'Missing entry '+id);return {sourceHash:hash(project(v)),predecessorRevisionHash:plan.workHeads?.get(id)?.revisionHash??null};}
function preparePackets(plan,options={}) {
  const started=Date.now();
  let selected=queue(plan,75,{evidence:options.evidence!==false});
  if(options.ids) {
    assert(Array.isArray(options.ids)&&options.ids.length>0&&options.ids.length<=75&&new Set(options.ids).size===options.ids.length,'Invalid revision roster');
    const cache=options.evidence===false?null:researchPackets();
    selected={...selected,entries:options.ids.map(id=>{
      const item=content(plan,id);assert(item,'Unknown explicit revision target');
      return {id,content:clone(item),...(cache?{researchPacket:researchPacket(id,item,cache)}:{})};
    }),candidates:[]};
  }
  const entries=selected.entries.map(e=>{const accepted=plan.items.find(v=>v.id===e.id);const acceptedContent=accepted?project(accepted):null;
    return {...e,content:clone(content(plan,e.id)),...binding(plan,e.id),acceptedContent,acceptedContentHash:accepted?hash(acceptedContent):null};});
  const candidates=selected.candidates.flatMap(c=>c.references.filter(r=>r.state!=='accepted').map(r=>({key:c.key,...r,
    predecessorRevisionHash:plan.candidateHeads?.get(c.key+'#'+r.index)?.revisionHash??null})));
  const snapshotHash=hash({entries,candidates});
  return {version:1,snapshotHash,createdAt:new Date().toISOString(),preparationMs:Date.now()-started,remainingEntries:selected.remainingEntries,
    packets:[0,1,2].map(i=>{const packet={version:1,policy:POLICY_ID,snapshotHash,slot:i+1,entries:entries.slice(i*25,i*25+25),
      candidates:candidates.filter((_,index)=>index%3===i)};return {...packet,packetHash:hash(packet)};})};
}
function prepareCandidatePackets(plan,requested,options={}) {
  const cache=options.evidence===false?null:researchPackets();
  const available=plan.candidateLedger.flatMap(c=>c.references.filter(r=>r.state!=='accepted').map(r=>({key:c.key,...r})));
  const selected=requested?requested.map(ref=>{
    const row=available.find(r=>r.key===ref.key&&r.index===(ref.index??ref.referenceIndex));
    assert(row,'Unknown or accepted candidate reference');return {...row,additionIds:clone(ref.additionIds||[])};
  }):available.slice(0,75);
  assert(selected.length<=75,'Candidate wave exceeds 75 references');
  assert.equal(new Set(selected.map(r=>r.key+'#'+r.index)).size,selected.length,'Repeated candidate allocation');
  const candidates=selected.map(row=>{
    const candidate=plan.manifest.candidates.find(c=>c.key===row.key),reference=candidate.references[row.index];
    return {...row,reference:clone(reference),possibleTargets:clone(candidate.possibleTargets||[]),
      ...(cache?{researchPacket:researchPacket(row.key+'#'+row.index,reference,cache)}:{}),
      predecessorRevisionHash:plan.candidateHeads.get(row.key+'#'+row.index)?.revisionHash??null};
  });
  const additionIds=candidates.flatMap(c=>c.additionIds||[]);
  assert.equal(new Set(additionIds).size,additionIds.length,'Repeated allocated addition ID');
  for(const id of additionIds)assert(/^vocab-n[1-5]:correction:[a-z0-9-]+$/.test(id)&&!content(plan,id),'Invalid or existing allocated addition ID');
  const snapshotHash=hash(candidates);
  return {version:1,snapshotHash,createdAt:new Date().toISOString(),packets:[0,1,2].map(i=>{
    const p={version:1,policy:POLICY_ID,kind:'candidate',snapshotHash,slot:i+1,entries:[],candidates:candidates.slice(i*25,i*25+25)};
    assert(p.candidates.flatMap(c=>c.additionIds||[]).length<=25,'Candidate packet exceeds 25 additions');
    return {...p,packetHash:hash(p)};
  })};
}
function prepareDefectPacket(plan,defects) {
  assert(Array.isArray(defects)&&defects.length,'Explicit sample-defect records required');
  assert.equal(new Set(defects.map(d=>d.id)).size,defects.length,'Repeated sample-defect ID');
  const defectHeads=defects.map(d=>{assert(nonempty(d.id),'Missing sample-defect ID');return {id:d.id,predecessorDefectHash:plan.sampleDefects?.find(v=>v.id===d.id)?.revisionHash??null};});
  const p={version:1,policy:POLICY_ID,kind:'sample-defect',snapshotHash:hash(defectHeads),slot:1,entries:[],candidates:[],defectHeads};
  return {...p,packetHash:hash(p)};
}
function checkPacket(packet,plan) {
  const {packetHash,...body}=packet;assert.equal(hash(body),packetHash,'Packet was modified');
  assert(packet.entries.length<=25,'Packet exceeds 25 entries');
  for(const row of packet.entries) {
    assert.deepStrictEqual(binding(plan,row.id),{sourceHash:row.sourceHash,predecessorRevisionHash:row.predecessorRevisionHash},'Stale packet '+row.id);
    if(Object.hasOwn(row,'acceptedContentHash')) {
      const accepted=plan.items.find(v=>v.id===row.id),snapshot=accepted?project(accepted):null;
      assert.equal(row.acceptedContent===null?null:hash(row.acceptedContent),row.acceptedContentHash,'Accepted snapshot binding changed');
      assert.equal(snapshot===null?null:hash(snapshot),row.acceptedContentHash,'Accepted baseline changed since packet preparation');
    }
  }
  for(const row of packet.candidates) {
    assert.equal(plan.candidateHeads?.get(row.key+'#'+row.index)?.revisionHash??null,row.predecessorRevisionHash,'Stale candidate packet');
    const reference=plan.manifest.candidates.find(c=>c.key===row.key)?.references[row.index];
    assert(reference&&hash(reference)===row.referenceHash,'Candidate source changed since preparation');
  }
  for(const row of packet.candidates)for(const id of row.additionIds||[])assert(!content(plan,id),'Allocated addition ID now exists');
  for(const row of packet.defectHeads||[])assert.equal(plan.sampleDefects?.find(d=>d.id===row.id)?.revisionHash??null,row.predecessorDefectHash,'Stale sample-defect packet');
}
function rows(batch){return [...(batch.reviews||[]),...(batch.additions||[]),...(batch.decisions||[])];}
function recordKey(r){return r.id||r.key+'#'+r.referenceIndex;}
function unsigned(assembly){const value=clone(assembly);delete value.assemblyHash;for(const r of rows(value.batch)){delete r.firstPass;delete r.secondPass;}return value;}
function assemble(packet,proposal,plan) {
  checkPacket(packet,plan);
  const batch=clone(proposal);assert.equal(batch.version,3,'Version 3 required');
  if(packet.kind==='candidate') assert.deepStrictEqual((batch.decisions||[]).map(r=>r.key+'#'+r.referenceIndex).sort(),
    packet.candidates.map(r=>r.key+'#'+r.index).sort(),'Proposal must preserve the complete fixed candidate roster');
  assert(!(batch.merges||[]).length,'Use dedicated revision authoring for merges');
  assert.deepStrictEqual((batch.sampleDefects||[]).map(d=>d.id).sort(),(packet.defectHeads||[]).map(d=>d.id).sort(),'Preserve fixed sample-defect roster');
  for(const d of batch.sampleDefects||[]) {
    assert.equal(d.predecessorDefectHash,packet.defectHeads.find(h=>h.id===d.id).predecessorDefectHash,'Sample-defect predecessor mismatch');
    assert(['open','cleared'].includes(d.state),'Invalid sample-defect state');
    assert(d.state==='cleared'||nonempty(d.finding),'Explicit sampled defect finding required');
  }
  const additions=new Map((batch.additions||[]).map(r=>[r.id,r]));
  assert.deepStrictEqual([...additions.keys()].sort(),packet.candidates.flatMap(c=>c.additionIds||[]).sort(),'Preserve complete fixed addition roster');
  const allocated=new Map(packet.entries.map(r=>[r.id,r]));
  assert((batch.reviews||[]).length+(batch.additions||[]).length<=25,'Batch exceeds packet');
  assert.deepStrictEqual((batch.reviews||[]).map(r=>r.id).sort(),packet.entries.map(r=>r.id).sort(),'Preserve complete fixed packet roster; save unresolved entries as research or drafts');
  const keys=new Set();
  for(const r of rows(batch)) {
    assert(!r.firstPass&&!r.secondPass,'Assemble before approvals');
    assert(!keys.has(recordKey(r)),'Repeated proposal target');keys.add(recordKey(r));
    assert(['accepted','pending','researching','drafted','needs revision'].includes(r.state),'Invalid work state');
    if(additions.get(r.id)===r) {
      const c=packet.candidates.find(c=>(c.additionIds||[]).includes(r.id));assert(c,'Addition outside fixed packet');
      assert(!content(plan,r.id),'Addition identity already exists');
      assert.equal(r.predecessorHash,null,'New addition cannot have a content predecessor');
      assert.equal(r.predecessorRevisionHash,null,'New addition cannot have a revision predecessor');
      assert(r.entry&&r.id.startsWith('vocab-'+r.entry.level?.toLowerCase()+':'),'Addition source/level mismatch');
      assert(r.policy,'Addition requires explicit policy');
      r.policy.candidateReference={key:c.key,referenceIndex:c.index,referenceHash:c.referenceHash};
      const d=(batch.decisions||[]).find(d=>d.key===c.key&&d.referenceIndex===c.index);
      assert(d&&(d.targets||[]).includes(r.id),'Addition requires allocated candidate decision target');
      if(r.state==='accepted')assert(d.state==='accepted'&&['added','additional-sense','additional-reading'].includes(d.disposition),'Accepted addition needs an accepted addition decision');
    }
    else if(r.id){const e=allocated.get(r.id);assert(e,'Entry outside fixed packet');assert.equal(r.predecessorHash,e.sourceHash,'Content predecessor mismatch');assert.equal(r.originalHash,e.sourceHash,'Original hash mismatch');assert.equal(r.predecessorRevisionHash,e.predecessorRevisionHash,'Revision predecessor mismatch');}
    else {
      const candidate=packet.candidates.find(c=>c.key===r.key&&c.index===r.referenceIndex);assert(candidate,'Candidate outside fixed packet');
      assert.equal(r.referenceHash,candidate.referenceHash,'Candidate reference differs from packet');
      assert.equal(r.predecessorRevisionHash,candidate.predecessorRevisionHash,'Candidate predecessor differs from packet');
      for(const id of r.targets||[]) {
        const edit=(batch.reviews||[]).find(v=>v.id===id&&v.state==='accepted');
        const value=additions.get(id)?.entry||content(plan,id);assert(value,'Candidate target missing');
        assert.equal(r.targetHashes?.[id],hash(project({...value,...edit?.replacement})),'Candidate target snapshot differs');
      }
    }
    if(r.state==='accepted'||r.policy) assert.equal(r.policy?.id,POLICY_ID,'New acceptances require current policy');
    if(r.id&&r.state==='accepted')r.policy.approvalBinding='entry-identity-v1';
  }
  const sampled=selectedForBatch((batch.reviews||[]).filter(r=>r.state==='accepted'&&r.policy?.risk==='routine').map(r=>r.id));
  for(const r of batch.reviews||[]) if(r.policy) r.policy.sampled=sampled.has(r.id);
  const value={version:1,packet:clone(packet),batch,finalContent:Object.fromEntries([...(batch.reviews||[]).map(r=>[r.id,project({...content(plan,r.id),...r.replacement})]),...(batch.additions||[]).map(r=>[r.id,project(r.entry)])])};
  value.assemblyHash=hash(unsigned(value));return value;
}
function verifyAssembly(a){assert.equal(hash(unsigned(a)),a.assemblyHash,'Assembly changed; approvals invalidated');}
function approve(assembly,decisions) {
  verifyAssembly(assembly);const result=clone(assembly);
  assert(Array.isArray(decisions)&&decisions.length,'Explicit decisions required');
  for(const d of decisions) {
    assert.equal(d.assemblyHash,result.assemblyHash,'Reviewer inspected a different assembly');
    assert(['firstPass','secondPass'].includes(d.pass),'Invalid approval pass');
    assert(['accepted','rejected'].includes(d.decision),'Explicit acceptance or rejection required');
    assert(nonempty(d.reviewer)&&nonempty(d.finding),'Reviewer and finding required');
    const r=rows(result.batch).find(r=>recordKey(r)===d.target);assert(r,'Unknown approval target');
    assert.equal(r.state,'accepted','Unresolved work cannot be approved');
    const next=r.id?result.finalContent[r.id]:null;
    const contentHash=r.id?hash(next):decisionHash(r);
    const approvalHash=r.id?entryApprovalHash(r,next):contentHash;
    assert.equal(d.contentHash,contentHash,'Reviewer content hash differs');
    assert.equal(d.approvalHash,approvalHash,'Reviewer evidence hash differs');
    if(d.pass==='secondPass') assert(r.firstPass?.decision==='accepted'&&r.firstPass.reviewer!==d.reviewer,'Independent reviewer required after first acceptance');
    assert(!r[d.pass],'Approval already recorded; reassemble to revise');
    r[d.pass]={decision:d.decision,reviewer:d.reviewer,finding:d.finding,contentHash,approvalHash};
  }
  return result;
}
function approvalTargets(a){verifyAssembly(a);return rows(a.batch).filter(r=>r.state==='accepted').map(r=>({target:recordKey(r),assemblyHash:a.assemblyHash,
  contentHash:r.id?hash(a.finalContent[r.id]):decisionHash(r),approvalHash:r.id?entryApprovalHash(r,a.finalContent[r.id]):decisionHash(r)}));}
function writeAtomic(file,value){
  fs.mkdirSync(path.dirname(file),{recursive:true});
  const temporary=file+'.'+process.pid+'.'+crypto.randomUUID()+'.tmp';
  try{fs.writeFileSync(temporary,value,{flag:'wx'});fs.renameSync(temporary,file);}
  finally{if(fs.existsSync(temporary))fs.unlinkSync(temporary);}
}
function withImportLock(base,action) {
  const directory=path.join(base,'.content-cache');fs.mkdirSync(directory,{recursive:true});
  return withOwnerLock(path.join(directory,'vocabulary-import.lock'),action);
}
function withOwnerLock(lock,action,depth=0) {
  assert(depth<8,'Too many interrupted lock recoveries');
  const token=crypto.randomUUID();
  const owner={pid:process.pid,token,createdAt:new Date().toISOString()};
  const staging=lock+'.'+token+'.owner';
  fs.writeFileSync(staging,json(owner),{flag:'wx'});
  let acquired=false;
  try {
    // Linking a fully written owner file avoids publishing a half-written lock.
    for(let attempt=0;attempt<3&&!acquired;attempt++) {
      try{fs.linkSync(staging,lock);acquired=true;}
      catch(error){
        if(error.code!=='EEXIST')throw error;
        let previous,bytes;try{bytes=fs.readFileSync(lock,'utf8');previous=JSON.parse(bytes);}catch(e){if(e.code==='ENOENT')continue;throw new Error('Invalid import lock; refusing concurrent import');}
        assert(Number.isInteger(previous.pid)&&previous.pid>0&&nonempty(previous.token),'Invalid import lock owner');
        let alive=true;try{process.kill(previous.pid,0);}catch(e){if(e.code==='ESRCH')alive=false;else if(e.code!=='EPERM')throw e;}
        assert(!alive,'Another import or recovery is active (PID '+previous.pid+')');
        // Serialize reclaimers by the dead owner's generation. A delayed reclaimer
        // cannot unlink the next owner after another process has recovered it.
        withOwnerLock(lock+'.reap-'+previous.token,()=>{
          if(fs.existsSync(lock)&&fs.readFileSync(lock,'utf8')===bytes)fs.unlinkSync(lock);
        },depth+1);
      }
    }
    assert(acquired,'Import lock acquisition raced; retry import');
    return action();
  } finally {
    if(acquired&&fs.existsSync(lock)&&read(lock).token===token)fs.unlinkSync(lock);
    if(fs.existsSync(staging))fs.unlinkSync(staging);
  }
}
function resumeJournalUnlocked(journalFile,base) {
  const journal=read(journalFile);assert.equal(hash(journal.writes),journal.writesHash,'Import journal changed');
  for(const [relative,text] of Object.entries(journal.writes)) {
    const file=path.resolve(base,relative);assert(file.startsWith(path.resolve(base)+path.sep),'Unsafe import path');
    const actual=fs.existsSync(file)?fs.readFileSync(file,'utf8'):null;
    assert(actual===text||hash(actual)===journal.before[relative],'Import target changed since validation: '+relative);
  }
  for(const [relative,text] of Object.entries(journal.writes)) writeAtomic(path.join(base,relative),text);
  journal.complete=true;writeAtomic(journalFile,json(journal));return {complete:true,files:Object.keys(journal.writes).length};
}
function resumeJournal(journalFile,base=root){return withImportLock(base,()=>resumeJournalUnlocked(journalFile,base));}
function importWave(assemblies,names,journalFile,options={}) {
  const base=options.root||root;
  return withImportLock(base,()=>importWaveUnlocked(assemblies,names,journalFile,options));
}
function importWaveUnlocked(assemblies,names,journalFile,options={}) {
  const base=options.root||root;
  assert(!fs.existsSync(journalFile),'Journal exists; use import --resume to finish or inspect it');
  assert(assemblies.length>0&&assemblies.length<=3,'Import one to three batches');
  assert.equal(names.length,assemblies.length,'One filename per batch required');
  assert.equal(new Set(names).size,names.length,'Repeated batch path');
  const current=(options.currentPlan||importer.prepare)();const ids=new Set();
  for(const a of assemblies){verifyAssembly(a);checkPacket(a.packet,current);for(const r of rows(a.batch)){assert(!ids.has(recordKey(r)),'Overlapping import packets');ids.add(recordKey(r));}}
  assert(assemblies.reduce((n,a)=>n+(a.batch.reviews||[]).length+(a.batch.additions||[]).length,0)<=75,'Wave exceeds 75 entries');
  const manifestPath='scripts/vocabulary-review-workflow.json';const manifest=read(path.join(base,manifestPath));
  const batches=manifest.authoringFiles.map(file=>{const batch=read(path.join(base,file));assert.equal(hash(batch),manifest.batchHashes[file],'Historical batch changed');return batch;});
  const writes={};
  assemblies.forEach((a,i)=>{const name=names[i];assert(/^scripts\/vocabulary-completion\/[\w-]+\.json$/.test(name),'Invalid batch path');assert(!manifest.authoringFiles.includes(name)&&!fs.existsSync(path.join(base,name)),'Batch already exists');manifest.authoringFiles.push(name);manifest.batchHashes[name]=hash(a.batch);batches.push(a.batch);writes[name]=json(a.batch);});
  manifest.activeReviewPolicy.id=POLICY_ID;
  const expected=new Set([...Object.keys(current.files||{}),...names,manifestPath,'scripts/vocabulary-completion/COVERAGE.md',...(options.expectedFiles||[])]);
  const fileHash=file=>hash(fs.existsSync(path.join(base,file))?fs.readFileSync(path.join(base,file),'utf8'):null);
  const before=Object.fromEntries([...expected].map(file=>[file,fileHash(file)]));
  // Include immutable authoring inputs as well as every anticipated output.
  const inputs=Object.fromEntries(manifest.authoringFiles.filter(file=>!names.includes(file)).map(file=>[file,fileHash(file)]));
  // Entire proposed runtime and ledger are validated once before creating any write journal.
  const proposed=(options.validate||((m,b)=>importer.prepare(undefined,undefined,{manifest:m,batches:b})))(manifest,batches);
  Object.assign(writes,proposed.files);writes[manifestPath]=json(manifest);
  writes['scripts/vocabulary-completion/COVERAGE.md']=(options.coverageDocument||require('./vocabulary-coverage-document.cjs').coverageDocument)(proposed);
  for(const file of Object.keys(writes))assert(expected.has(file),'Validation introduced an unanticipated output path: '+file);
  assert(!Object.keys({...before,...inputs}).some(file=>path.resolve(base,file)===path.resolve(journalFile)),'Journal path collides with an import target or input');
  for(const [file,expectedHash] of Object.entries({...before,...inputs}))assert.equal(fileHash(file),expectedHash,'File changed during validation: '+file);
  writeAtomic(journalFile,json({version:1,complete:false,writes,writesHash:hash(writes),before}));
  return resumeJournalUnlocked(journalFile,base);
}
module.exports={preparePackets,prepareCandidatePackets,prepareDefectPacket,checkPacket,assemble,approve,approvalTargets,verifyAssembly,importWave,resumeJournal};
if(require.main===module){
  const [command,...args]=process.argv.slice(2),get=name=>args.find(a=>a.startsWith('--'+name+'='))?.slice(name.length+3);
  const required=name=>{const value=get(name);assert(value,'Missing --'+name);return value;};
  let result;
  if(command==='prepare') result=get('defects')?prepareDefectPacket(importer.prepare(),read(get('defects'))):args.includes('--candidates')?prepareCandidatePackets(importer.prepare(),get('references')?read(get('references')):undefined):preparePackets(importer.prepare(),{ids:get('ids')?read(get('ids')):undefined});
  else if(command==='assemble') {
    const packet=read(required('packet'));
    const proposal=get('findings')?require('./vocabulary-editorial-record.cjs').hydrate(packet,read(get('findings'))):read(required('proposal'));
    result=assemble(packet,proposal,importer.prepare());
  }
  else if(command==='approve') result=approve(read(required('assembly')),read(required('decisions')));
  else if(command==='targets') result=approvalTargets(read(required('assembly')));
  else if(command==='import') result=get('resume')?resumeJournal(get('resume')):importWave(required('assemblies').split(',').map(read),required('names').split(','),required('journal'));
  else throw new Error('Use prepare, assemble, targets, approve or import');
  if(get('out'))writeAtomic(get('out'),json(result));else console.log(json(result));
}
