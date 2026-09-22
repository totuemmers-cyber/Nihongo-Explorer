// Read-only next checkpoint. A dictionary hit never changes work state.
const {prepare}=require('./import-vocabulary-completion.cjs');
const {levels,root}=require('./vocabulary-tools.cjs');
const {selectedForBatch,POLICY_ID}=require('./vocabulary-review-policy.cjs');
const fs=require('fs'),path=require('path');
const formKey = row => JSON.stringify([row.word,row.reading]);
function indexResearch(source) {
  const rows=Object.values(source?.entries||{});
  const byForm=new Map();
  const add=row=>{
    if (!row.word || !row.reading) return;
    const key=formKey(row),matches=byForm.get(key)||new Map();
    for (const match of row.matches||[]) matches.set(JSON.stringify(match),match);
    byForm.set(key,matches);
  };
  rows.forEach(add);
  for (const candidate of source?.candidates||[]) for (const ref of candidate.references||[])
    add({...ref.reference,matches:ref.matches});
  return {byId:new Map(rows.map(row=>[row.id,row])),byForm};
}
function researchPackets() {
  const load=name=>{const file=path.join(root,'.content-cache',name);return fs.existsSync(file)?JSON.parse(fs.readFileSync(file,'utf8')):null;};
  const dictionary=load('correction-dictionary-research.json'),pitch=load('correction-pitch-research.json');
  return {dictionary:indexResearch(dictionary),pitch:indexResearch(pitch),
    dictionarySource:dictionary?{source:dictionary.source,sha256:dictionary.sha256,attribution:dictionary.attribution}:null,
    pitchSource:pitch?{source:pitch.source,version:pitch.version,sha256:pitch.sysDicSha256,attribution:pitch.attribution}:null};
}
function packet(id,item,packets) {
  const lookup=index=>{
    const own=index.byId.get(id),matches=index.byForm.get(formKey(item));
    return matches?{word:item.word,reading:item.reading,matches:[...matches.values()],reused:own?.word!==item.word||own?.reading!==item.reading}:own;
  };
  const dictionary=lookup(packets.dictionary),pitch=lookup(packets.pitch);
  const current=row=>row && row.word===item.word && row.reading===item.reading;
  const dictionaryMatches=current(dictionary)?dictionary.matches||[]:[];
  const pitchMatches=current(pitch)?pitch.matches||[]:[];
  return {dictionary:{...packets.dictionarySource,matchCount:dictionary?.matches?.length||0,
      cacheStatus:current(dictionary)?dictionary.reused?'reused-form':'current':dictionary?'stale-form':'missing',
      matches:dictionaryMatches.map(match=>({sequence:match.sequence,spelling:match.spelling,reading:match.reading,
        readingRestrictions:match.readingRestrictions,spellingInfo:match.spellingInfo,
        senses:(match.senses||[]).map(s=>({sense:s.sense,pos:s.pos,misc:s.misc,gloss:s.gloss,notes:s.notes,stagk:s.stagk,stagr:s.stagr}))}))},
    pitch:{...packets.pitchSource,matchCount:pitch?.matches?.length||0,
      cacheStatus:current(pitch)?pitch.reused?'reused-form':'current':pitch?'stale-form':'missing',
      matches:pitchMatches
        .map(match=>({locator:match.locator,orth:match.orth,kana:match.kana,lemma:match.lemma,pos:match.pos,cType:match.cType,cForm:match.cForm,aType:match.aType}))}};
}
function queue(plan,limit=25,options={}) {
  const current=plan.workingItems || new Map(plan.items.map(v=>[v.id,v]));
  const acceptedIds=new Set(plan.ledger.filter(v=>v.editorial==='reviewed').map(v=>v.id));
  const sources=[...levels.map(l=>'vocab-'+l.toLowerCase()),'yojijukugo','idioms'];
  const rows=[...current].filter(([id])=>plan.workHeads?.get(id)?.state!=='accepted'
    && !acceptedIds.has(id));
  rows.sort(([a,av],[b,bv])=>{
    const ah=plan.workHeads?.get(a),bh=plan.workHeads?.get(b);
    return Number(bh?.record.priority==='confirmed-error')-Number(ah?.record.priority==='confirmed-error')
      || levels.indexOf(av.level)-levels.indexOf(bv.level)
      || Number(Boolean(bh))-Number(Boolean(ah))
      || sources.indexOf(av.source||a.split(':')[0])-sources.indexOf(bv.source||b.split(':')[0])
      || (av.__sourceIndex??Infinity)-(bv.__sourceIndex??Infinity) || a.localeCompare(b);
  });
  const shardCount=options.shardCount||1,shardIndex=options.shardIndex||0;
  if (!Number.isInteger(shardCount)||shardCount<1||!Number.isInteger(shardIndex)||shardIndex<0||shardIndex>=shardCount) throw new Error('Invalid queue shard');
  const selected=rows.filter((_,index)=>index%shardCount===shardIndex).slice(0,limit);
  const sampled=selectedForBatch(selected.map(([id])=>id));
  const packets=options.evidence?researchPackets():null;
  const entries=selected.map(([id,v])=>({id,word:v.word,reading:v.reading,level:v.level,
    state:plan.workHeads?.get(id)?.state || 'pending',
    preliminarySample:sampled.has(id),
    ...(packets?{content:v,researchPacket:packet(id,v,packets)}:{}),
    ...(plan.workHeads?.get(id)?{revisionHash:plan.workHeads.get(id).revisionHash,
      research:plan.workHeads.get(id).record.research || [],openQuestions:plan.workHeads.get(id).record.openQuestions || []}:{})}));
  const ids=new Set(entries.map(v=>v.id));
  const unresolved=(plan.candidateLedger||[]).filter(c=>c.state!=='accepted').map(c=>({...c,references:c.references.map(r=>{
    const record=plan.candidateHeads?.get(c.key+'#'+r.index)?.record;
    return {...r,...(record?.research?{research:record.research,openQuestions:record.openQuestions||[]}:{})};
  })}));
  const candidates=unresolved.filter(c=>plan.manifest.candidates.find(v=>v.key===c.key).possibleTargets?.some(t=>ids.has(t.id)));
  return {batchSize:limit,remainingEntries:rows.length,policy:POLICY_ID,
    samplingInstruction:'After editorial classification, select ceil(routine records / 10) with selectedForBatch; queue samples are preliminary only.',
    snapshotWarning:'Allocate all worker shards from one unchanged queue snapshot before importing results.',
    shard:{index:shardIndex+1,count:shardCount},entries,
    candidates:entries.length?candidates:unresolved.slice(0,limit)};
}
module.exports={queue,researchPackets,indexResearch,packet};
if(require.main===module) {
  const statusFile=path.join(root,'scripts/vocabulary-completion/campaign-status.json');
  const status=fs.existsSync(statusFile)?JSON.parse(fs.readFileSync(statusFile,'utf8')):null;
  if(status?.exhaustiveCampaign?.status==='superseded') {
    console.log(JSON.stringify({status:'superseded',complete:false,
      message:'The exhaustive queue is frozen. Use the bounded triage report; resumption requires a new explicit scope.',
      campaign:status},null,2));
    process.exit(0);
  }
  const value=name=>process.argv.find(arg=>arg.startsWith('--'+name+'='))?.split('=').slice(1).join('=');
  const limit=Number(value('limit')||25),shard=(value('shard')||'1/1').split('/').map(Number);
  if(!Number.isInteger(limit)||limit<1) throw new Error('Invalid --limit');
  console.log(JSON.stringify(queue(prepare(),limit,{shardIndex:shard[0]-1,shardCount:shard[1],evidence:process.argv.includes('--evidence')}),null,2));
}
