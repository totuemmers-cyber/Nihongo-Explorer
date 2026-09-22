// Bounded observations are deliberately separate from accepted editorial records.
const fs=require('fs'),path=require('path'),assert=require('assert'),crypto=require('crypto');
const {root,levels,loadVocabulary}=require('./vocabulary-tools.cjs');
const {hash,project}=require('./vocabulary-correction-pipeline.cjs');
const {researchPackets,packet}=require('./vocabulary-review-queue.cjs');
const importer=require('./import-vocabulary-completion.cjs');
const SEED='bounded-quality-sweep-2026-09-22-v1';
const intentionalOverlaps=new Set(['一期一会|いちごいちえ','一石二鳥|いっせきにちょう','自業自得|じごうじとく','以心伝心|いしんでんしん']);
const clone=x=>JSON.parse(JSON.stringify(x));
const nonempty=x=>typeof x==='string'&&x.trim().length>0;
const bytes=file=>crypto.createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex');
function audit(items) {
  const findings=[],identities=new Map(),ids=new Map();
  const add=(item,kind,detail,severity)=>findings.push({id:item.id,level:item.level,kind,detail,severity});
  for(const v of items) {
    for(const f of ['word','reading','romaji','meaning','type','category','level'])
      if(!nonempty(v[f]))add(v,'malformed-field',f+' must be nonempty text',100);
    if(!levels.includes(v.level))add(v,'malformed-field','Unknown JLPT level',100);
    if(!['Nomen','Verb','Adjektiv','Adverb','Ausdruck','Partikel','Yojijukugo','Redewendung','Sprichwort'].includes(v.type))add(v,'malformed-field','Invalid part of speech',100);
    if(v.notes!=null&&typeof v.notes!=='string')add(v,'malformed-field','notes must be text',100);
    if(!Array.isArray(v.examples))add(v,'malformed-field','examples must be an array',100);
    else {
      if(!v.examples.length)add(v,'malformed-field','No examples',95);
      const seen=new Set();
      v.examples.forEach((e,i)=>{
        if(!e||typeof e!=='object'||['japanese','romaji','german'].some(f=>!nonempty(e[f])))add(v,'malformed-field','Incomplete example '+i,95);
        const k=hash(e);if(seen.has(k))add(v,'exact-duplicate-example','Repeated complete example '+i,50);seen.add(k);
      });
    }
    if(v.verbGroup!=null&&!['godan','ichidan','suru','kuru','zuru','aru'].includes(v.verbGroup))add(v,'invalid-conjugation-metadata','Unknown verbGroup '+v.verbGroup,90);
    if(v.type==='Verb'&&v.conjugationKind==='excluded'&&!nonempty(v.conjugationReason))add(v,'invalid-conjugation-metadata','Excluded verb conjugation has no reason (research lead)',85);
    for(const f of ['conjugationReading','verbReading'])if(v[f]!=null&&!nonempty(v[f]))add(v,'invalid-conjugation-metadata','Invalid '+f,90);
    if(v.type==='Verb'&&v.conjugationKind!=='excluded'&&(!nonempty(v.verbGroup)||!nonempty(v.conjugationReading)))add(v,'invalid-conjugation-metadata','Active verb lacks group or reading',90);
    if(v.conjugation&&typeof v.conjugation==='object')for(const f of ['verbGroup','conjugationReading','conjugationKind'])if(Object.hasOwn(v.conjugation,f)&&Object.hasOwn(v,f)&&v.conjugation[f]!==v[f])add(v,'invalid-conjugation-metadata','Nested metadata conflicts with '+f,90);
    if(v.pitchVariants!=null&&!Array.isArray(v.pitchVariants))add(v,'impossible-pitch','pitchVariants is not an array',80);
    const morae=typeof v.reading==='string'?[...v.reading.replace(/[ゃゅょャュョぁぃぅぇぉァィゥェォ]/g,'')].length:0;
    for(const p of [v.pitch,...(Array.isArray(v.pitchVariants)?v.pitchVariants:[])])if(p!==undefined&&p!==null&&(!Number.isInteger(p)||p<0||p>morae))add(v,'impossible-pitch','Pitch '+JSON.stringify(p)+' outside 0..'+morae,80);
    const identity=JSON.stringify([v.word,v.reading,v.senseKey||'']);
    if(identities.has(identity)&&!intentionalOverlaps.has(v.word+'|'+v.reading)){add(v,'identity-collision','Same word/reading/sense as '+identities.get(identity),70);}
    else identities.set(identity,v.id);
    if(ids.has(v.id))add(v,'identity-collision','Duplicate runtime ID',100);ids.set(v.id,true);
  }
  return findings.sort((a,b)=>b.severity-a.severity||a.id.localeCompare(b.id)||a.detail.localeCompare(b.detail));
}
function select(items,acceptedIds,findings,snapshotHash) {
  const scores=new Map();for(const f of findings)scores.set(f.id,Math.max(scores.get(f.id)||0,f.severity));
  const rank=id=>hash([SEED,snapshotHash,id]);
  return levels.flatMap(level=>{
    const available=items.filter(v=>v.level===level&&!acceptedIds.has(v.id));
    assert(available.length>=20,'Fewer than 20 unreviewed entries at '+level);
    const strong=available.filter(v=>scores.has(v.id)).sort((a,b)=>scores.get(b.id)-scores.get(a.id)||rank(a.id).localeCompare(rank(b.id))).slice(0,10);
    const chosen=new Set(strong.map(v=>v.id));
    const fill=available.filter(v=>!chosen.has(v.id)).sort((a,b)=>rank(a.id).localeCompare(rank(b.id))).slice(0,20-strong.length);
    return [...strong,...fill].map(v=>({id:v.id,level,selection:chosen.has(v.id)?'mechanical':'deterministic-sample'}));
  }).map((v,index)=>({...v,worker:index%3+1}));
}
function preservationFiles() {
  const files=new Set(['scripts/vocabulary-completion/ledger.json']);
  for(const name of ['scripts/vocabulary-completion.json','scripts/vocabulary-correction-review.json','scripts/vocabulary-review-workflow.json']) {
    const m=JSON.parse(fs.readFileSync(path.join(root,name),'utf8'));
    for(const file of m.authoringFiles||[])files.add(file);
  }
  return Object.fromEntries([...files].sort().map(file=>[file,bytes(file)]));
}
function prepare(plan=importer.prepare(),options={}) {
  const runtime=options.items||loadVocabulary().items;
  assert.equal(hash(runtime.map(v=>({id:v.id,content:project(v)}))),hash(plan.items.map(v=>({id:v.id,content:project(v)}))),'Runtime differs from validated importer');
  const runtimeSnapshot=runtime.map(v=>({id:v.id,content:project(v)}));
  const runtimeSnapshotHash=hash(runtimeSnapshot),findings=audit(runtime);
  const acceptedIds=plan.ledger.filter(v=>v.editorial==='reviewed').map(v=>v.id);
  const cache=options.evidence===false?null:researchPackets();
  const roster=select(runtime,new Set(acceptedIds),findings,runtimeSnapshotHash).map(row=>{
    const v=runtime.find(x=>x.id===row.id);
    return {...row,content:project(v),contentHash:hash(project(v)),findings:findings.filter(f=>f.id===v.id),...(cache?{researchPacket:packet(v.id,v,cache)}:{})};
  });
  const immutable={version:1,seed:SEED,runtimeSnapshotHash,runtimeSnapshot,acceptedIds,baselineLedger:clone(plan.ledger),preservedFiles:options.preservedFiles||preservationFiles(),findings,roster};
  return {...immutable,snapshotHash:hash(immutable),createdAt:new Date().toISOString(),observations:[],fixes:[],deferred:[],outcome:'in-progress',scope:'One bounded sweep; observations are not accepted reviews; exhaustive completion remains unmet.'};
}
function verify(document,options={}) {
  const keys=['version','seed','runtimeSnapshotHash','runtimeSnapshot','acceptedIds','baselineLedger','preservedFiles','findings','roster'];
  assert.equal(hash(Object.fromEntries(keys.map(k=>[k,document[k]]))),document.snapshotHash,'Triage snapshot modified');
  assert.equal(hash(document.runtimeSnapshot),document.runtimeSnapshotHash,'Runtime snapshot binding mismatch');
  const items=document.runtimeSnapshot.map(v=>({id:v.id,...v.content}));
  assert.equal(hash(audit(items)),hash(document.findings),'Mechanical findings differ from bound snapshot');
  const selected=select(items,new Set(document.acceptedIds),document.findings,document.runtimeSnapshotHash);
  assert.deepStrictEqual(document.roster.map(({id,level,selection,worker})=>({id,level,selection,worker})),selected,'Non-deterministic or overlapping allocation');
  assert.equal(new Set(document.roster.map(v=>v.id)).size,100,'Roster must contain 100 unique IDs');
  for(const row of document.roster){assert.equal(hash(row.content),row.contentHash,'Content binding mismatch '+row.id);assert.equal(hash(document.runtimeSnapshot.find(v=>v.id===row.id)?.content),row.contentHash,'Roster differs from runtime snapshot '+row.id);}
  const seen=new Set();
  for(const o of document.observations) {
    const row=document.roster.find(r=>r.id===o.id);assert(row&&!seen.has(o.id),'Unknown or repeated observation');seen.add(o.id);
    assert.equal(o.contentHash,row.contentHash,'Observation has stale content hash');
    assert.equal(o.worker,row.worker,'Observation assigned to wrong worker');
    assert(['no issue observed','confirmed defect','uncertain'].includes(o.status),'Invalid observation status');
    assert(nonempty(o.finding)&&nonempty(o.reviewer),'Observation needs finding and reviewer');
    assert(!o.firstPass&&!o.secondPass&&!o.editorial,'Observations must not carry editorial acceptance');
  }
  assert(Array.isArray(document.fixes)&&document.fixes.length<=25&&new Set(document.fixes.map(f=>f.id)).size===document.fixes.length,'Correction cap exceeded or repeated fix');
  for(const fix of document.fixes) {
    const baseline=document.runtimeSnapshot.find(r=>r.id===fix.id);assert(baseline,'Correction added an out-of-scope identity');
    assert.equal(fix.beforeHash,hash(baseline.content),'Fix has stale inspected baseline');
    assert(nonempty(fix.afterHash)&&nonempty(fix.authoringFile)&&nonempty(fix.revisionId),'Fix needs final hash and imported authoring revision');
  }
  if(options.checkFiles!==false) {
    for(const [file,digest] of Object.entries(document.preservedFiles))if(file!=='scripts/vocabulary-completion/ledger.json'||!document.fixes.length)assert.equal(bytes(file),digest,'Preserved file changed '+file);
    const plan=options.plan||importer.prepare(),runtime=options.items||loadVocabulary().items;
    assert.equal(hash(runtime.map(v=>({id:v.id,content:project(v)}))),hash(plan.items.map(v=>({id:v.id,content:project(v)}))),'Runtime differs from validated authoring');
    assert.equal(hash(JSON.parse(fs.readFileSync(path.join(root,'scripts/vocabulary-completion/ledger.json'),'utf8')).entries),hash(plan.ledger),'Committed ledger differs from validated authoring');
    assert.equal(runtime.length,document.runtimeSnapshot.length,'Sweep must not add or remove runtime entries');
    for(const old of document.runtimeSnapshot) {
      const current=runtime.find(v=>v.id===old.id),fix=document.fixes.find(f=>f.id===old.id);
      assert(current,'Lost runtime identity');
      assert.equal(hash(project(current)),fix?fix.afterHash:hash(old.content),'Unreported runtime change '+old.id);
      if(fix) {
        const head=plan.workHeads.get(old.id);assert(head?.state==='accepted'&&head.record.revisionId===fix.revisionId,'Correction is not accepted at declared revision');
        assert(head.record.firstPass?.decision==='accepted','Correction missing first approval');
        assert(head.record.secondPass?.decision==='accepted'&&head.record.firstPass.reviewer!==head.record.secondPass.reviewer,'Correction missing independent approval');
        const authoring=JSON.parse(fs.readFileSync(path.join(root,fix.authoringFile),'utf8'));
        assert(authoring.reviews?.some(r=>r.id===fix.id&&r.revisionId===fix.revisionId),'Fix not present in declared authoring file');
      }
    }
    for(const old of document.baselineLedger.filter(r=>document.acceptedIds.includes(r.id)))assert.equal(hash(plan.ledger.find(r=>r.id===old.id)),hash(old),'Previously accepted review altered '+old.id);
  }
  return {valid:true,sampled:document.roster.length,inspected:seen.size,unfinished:100-seen.size,fixed:document.fixes.length,retainedAcceptedReviews:document.acceptedIds.length,runtimeSnapshotHash:document.runtimeSnapshotHash};
}
module.exports={audit,select,prepare,verify,SEED};
if(require.main===module) {
  const get=name=>process.argv.find(a=>a.startsWith('--'+name+'='))?.slice(name.length+3);
  const command=process.argv[2];
  if(command==='prepare') {const out=get('out');assert(out,'--out required');assert(!fs.existsSync(out),'Refusing to overwrite fixed snapshot');const doc=prepare();fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out,JSON.stringify(doc,null,2)+'\n');console.log(JSON.stringify({file:out,...verify(doc)}));}
  else if(command==='verify'){assert(get('file'),'--file required');console.log(JSON.stringify(verify(JSON.parse(fs.readFileSync(get('file'),'utf8')))));}
  else throw new Error('Use prepare --out=FILE or verify --file=FILE');
}
