const assert = require('assert');
const fs = require('fs');
const path = require('path');
const {root,levels,loadVocabulary,read} = require('./vocabulary-tools.cjs');
const {prepare,report} = require('./import-vocabulary-completion.cjs');
const {prepareCorrections,project,hash} = require('./vocabulary-correction-pipeline.cjs');
const copy = v=>JSON.parse(JSON.stringify(v));
const complete = JSON.parse(read('scripts/fixtures/vocabulary-completion-complete.json'));
function fixture(entries=complete.entries,records=complete.reviews,candidates=[]) {
  const files={};
  for(const l of levels) files['vocab-'+l.toLowerCase()+'.js']='window.VOCAB_'+l+' = '+JSON.stringify(l==='N5'?entries:[])+';';
  files['yojijukugo-data.js']='window.YOJIJUKUGO_DATA = [];';
  files['idioms-data.js']='window.IDIOMS_DATA = [];';
  files['vocab-correction-rules.js']='window.VOCAB_CORRECTION_RULES = {};';
  const items=loadVocabulary(files).items;
  const baseline={version:2,entries:items.map(v=>({id:v.id,source:v.source,index:v.__sourceIndex,hash:hash(project(v))}))};
  const legacy={files,items,patches:new Map(),additions:[],decisions:new Map(),manifest:{work:items,candidates}};
  const options={manifest:{version:2,baselineHash:hash(baseline)},baseline,batches:[{version:2,reviews:copy(records),additions:[],decisions:[],merges:[]}]};
  return {legacy,options};
}
function reviewFor(item,patch={}) {
  const r=copy(complete.reviews[0]);
  r.id=item.id; r.originalHash=hash(project(item));
  r.original=Object.fromEntries(Object.keys(patch).map(f=>[f,Object.hasOwn(item,f)?item[f]:null]));
  r.replacement=patch; r.rationale='Synthetic regression: documented replacement.';
  r.secondPass.contentHash=hash(project({...item,...patch}));
  return r;
}
const f=fixture();
const accepted=prepareCorrections(f.legacy,f.options);
assert.equal(report(accepted).complete,true,'Fully reviewed no-change fixture must pass completion');
assert.equal(accepted.corrections.size,0,'Reviews must not force cosmetic edits');
const open=fixture(complete.entries,[]);
assert.equal(report(prepareCorrections(open.legacy,open.options)).complete,false,'Complete fields alone cannot pass review gate');

// A corrected spelling colliding with an existing entry must not silently merge.
const first=copy(complete.entries[0]); first.word='いす'; delete first.aliases;
first.pitchProvenance=first.pitchProvenance.map(e=>({...e,match:{...e.match,word:'いす'}}));
const collision=fixture([first,complete.entries[0]],[]);
const [a,b]=collision.legacy.items;
const patch={word:b.word,pitchProvenance:b.pitchProvenance};
const from=reviewFor(a,patch),to=reviewFor(b);
collision.options.batches[0].reviews=[from,to];
assert.throws(()=>prepareCorrections(collision.legacy,collision.options),/collision|Lost identity/);
collision.options.batches[0].merges=[{from:a.id,to:b.id,equivalentSense:'Both are the chair sense in this synthetic fixture.',
  preservedContent:'Target retains all examples and notes; kana spelling is already an alias.',secondPass:'Fixture equivalent reading and sense checked.',
  evidence:[{source:'Fixture',version:'1',locator:'fixture:chairs',finding:'Same chair sense, not merely a homophone.'}]}];
const merged=prepareCorrections(collision.legacy,collision.options);
assert.equal(merged.items.length,1);
assert.equal(merged.items[0].id,b.id);
assert.equal(loadVocabulary(merged.files).c.resolveVocabularyId(a.id),b.id);
collision.options.batches[0].merges[0].equivalentSense='';
assert.throws(()=>prepareCorrections(collision.legacy,collision.options),/Unreviewed sense merge/);
// A documented retirement may redirect an invalid entry to a related entry with another reading;
// an undocumented distinct-reading merge is still rejected.
{
  const seat={...copy(complete.entries[0]),word:'腰掛',reading:'こしかけ'};delete seat.aliases;
  seat.pitchProvenance=seat.pitchProvenance.map(e=>({...e,match:{...e.match,word:'腰掛',reading:'こしかけ'}}));
  const retire=fixture([complete.entries[0],seat],[]);
  const [x,y]=retire.legacy.items;
  const ry=reviewFor(y);ry.pitch.evidence=copy(y.pitchProvenance);
  retire.options.batches[0].reviews=[ry,reviewFor(x)];
  retire.options.batches[0].merges=[{from:y.id,to:x.id,equivalentSense:'Related seat word.',preservedContent:'Survivor unchanged.',secondPass:'Fixture checked.',
    evidence:[{source:'Fixture',version:'1',locator:'fixture:retire',finding:'Invalid synthetic entry.'}]}];
  assert.throws(()=>prepareCorrections(retire.legacy,retire.options),/distinct readings/);
  retire.options.batches[0].merges[0].retirement={reason:'Synthetic invalid entry',relationship:'Closest related surviving entry'};
  const out=prepareCorrections(retire.legacy,retire.options);
  assert.equal(loadVocabulary(out.files).c.resolveVocabularyId(y.id),x.id);
}

// Separate senses with the same written form and reading remain separate.
const sense=copy(complete.entries[0]); sense.senseKey='office'; sense.meaning='Amt, Position';
const homonyms=fixture([complete.entries[0],sense],[]);
assert.equal(prepareCorrections(homonyms.legacy,homonyms.options).items.length,2);

// Correction-driven additions need an explicit reason, but no historical candidate.
const addition=fixture();
const entry=copy(complete.entries[0]); entry.word='いす'; delete entry.aliases;
entry.pitchProvenance=entry.pitchProvenance.map(e=>({...e,match:{...e.match,word:'いす'}}));
const ar=reviewFor({...entry,id:'vocab-n5:correction:chair-kana'});
ar.pitch.evidence=entry.pitchProvenance;
Object.assign(ar,{entry,levelBasis:'Fixture estimate.',reason:'Correction-driven addition fixture.'});
delete ar.original; delete ar.originalHash; delete ar.replacement;
addition.options.batches[0].additions=[ar];
const added=prepareCorrections(addition.legacy,addition.options);
assert(added.items.some(v=>v.id===ar.id));
assert.equal(report(added).complete,true);

// Notes may be replaced; stale or undocumented values and weak pitch fail.
const replace=fixture();
const old=replace.legacy.items[0];
replace.options.batches[0].reviews=[reviewFor(old,{notes:'Bei 椅子に座る bezeichnet に den Sitzplatz; 椅子を並べる heißt Stühle aufstellen.'})];
assert(prepareCorrections(replace.legacy,replace.options).items[0].notes.startsWith('Bei'));
const invalid=[
 o=>{o.batches[0].reviews[0].originalHash='bad';},
 o=>{o.batches[0].reviews[0].secondPass.contentHash='bad';},
 o=>{o.batches[0].reviews[0].review.contexts=['same','same','same'];},
 o=>{o.batches[0].reviews[0].pitch.evidence[0].match.word='unrelated';},
 o=>{o.batches[0].reviews[0].pitch.evidence[0].version='';},
 o=>{o.batches[0].reviews[0].replacement={level:'N1'};},
 o=>{o.batches[0].reviews[0].evidence=[];}
];
for(const mutate of invalid) {const g=fixture(); mutate(g.options); assert.throws(()=>prepareCorrections(g.legacy,g.options));}
const unknown=fixture();
const ur=reviewFor(unknown.legacy.items[0],{pitch:null,pitchVariants:[],pitchProvenance:[]});
ur.pitch={status:'unknown',rationale:'Synthetic unavailable-source case.',evidence:copy(complete.reviews[0].pitch.evidence)};
unknown.options.batches[0].reviews=[ur];
const unknownPlan=prepareCorrections(unknown.legacy,unknown.options);
assert.equal(report(unknownPlan).pitchUnknown,1);
assert.equal(report(unknownPlan).complete,true,'Investigated unknown is a valid completed disposition');

const actual=prepare();
const yurusu=actual.items.find(v=>v.id==='vocab-n1:2987');
const nadameru=actual.items.find(v=>v.id==='vocab-n1:2461');
assert.equal(yurusu.reading,'ゆるす'); assert.equal(nadameru.reading,'なだめる');
assert.equal(yurusu.pitch,2); assert.equal(nadameru.pitch,3);
const c=loadVocabulary(actual.files).c;
const verb=c.resolveVocabVerbConjugation(yurusu);
assert.equal(verb.result.forms.polite.japanese,'ゆるします');
assert.equal(verb.result.forms.te.japanese,'ゆるして');
assert.equal(verb.result.forms.negative.japanese,'ゆるさない');
const overrides=fixture([project(yurusu)],[]);
const vi=overrides.legacy.items[0];
const vr=copy(JSON.parse(read('scripts/vocabulary-completion/002.json')).reviews.find(v=>v.id===yurusu.id));
vr.id=vi.id; vr.originalHash=hash(project(vi));
vr.replacement={conjugation:{...vi.conjugation,conjugationOverrides:{polite:'ゆるします'}},conjugationOverrides:{polite:'ゆるします'}};
vr.original={conjugation:vi.conjugation,conjugationOverrides:null};
vr.secondPass.contentHash=hash(project({...vi,...vr.replacement}));
overrides.options.batches[0].reviews=[vr];
const overridePlan=prepareCorrections(overrides.legacy,overrides.options);
assert.equal(loadVocabulary(overridePlan.files).c.resolveVocabVerbConjugation(overridePlan.items[0]).result.forms.polite.japanese,'ゆるします');
vr.replacement.conjugation.verbGroup='ichidan'; vr.replacement.verbGroup='ichidan'; vr.original.verbGroup='godan';
vr.secondPass.contentHash=hash(project({...vi,...vr.replacement}));
assert.throws(()=>prepareCorrections(overrides.legacy,overrides.options),/Invalid reviewed conjugation behavior/);
assert.deepStrictEqual(copy(actual.items.find(v=>v.word==='明るい').pitchVariants),[3]);
assert.equal(actual.items.find(v=>v.id==='vocab-n3:2933').pitch,null);
assert.equal(actual.ledger.length,actual.items.length);
assert.equal(report(actual).complete,false);
assert(yurusu.notes.includes('宥さない') && !yurusu.notes.includes('宥せない'),'Earlier accepted note was not revised');
const mixed=actual.candidateLedger.find(c=>c.key==='いくら|いくら');
assert.equal(mixed.state,'accepted');
assert.deepStrictEqual(mixed.references.map(r=>r.disposition),['verified-spelling-variant','verified-spelling-variant','added']);
assert.notEqual(mixed.references[0].targets[0],mixed.references[2].targets[0],'Price and food senses collapsed');
// Dry-run proposals include every expected output; this test never writes them.
for(const [file,value] of Object.entries(actual.files)) assert.equal(fs.readFileSync(path.join(root,file),'utf8'),value,'Committed output differs: '+file);
console.log('Correction regressions passed: complete/incomplete gates, no-change review, collisions, explicit redirects, distinct senses, additions, replaced notes, pitch, conjugation and stale-evidence rejection.');
