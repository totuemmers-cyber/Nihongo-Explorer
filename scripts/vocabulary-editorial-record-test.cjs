const assert=require('assert');
const {hydrate}=require('./vocabulary-editorial-record.cjs');
const {hash,project}=require('./vocabulary-correction-pipeline.cjs');
const content={word:'語',reading:'ご',romaji:'go',meaning:'Wort',pitch:1};
const packet={entries:[{id:'test',content,sourceHash:hash(project(content)),predecessorRevisionHash:null,researchPacket:{
  dictionary:{source:'test-dictionary',sha256:'version',matches:[{sequence:'1',spelling:'語',reading:'ご',senses:[{sense:1,gloss:['word']}]}]},
  pitch:{source:'test-pitch',version:'1',sha256:'version',attribution:'test',matches:[{locator:'row1',pos:['noun'],cType:'*',cForm:'*',aType:'1'}]}
}}]};
const finding={id:'test',revisionId:'test-r1',rationale:'Explicit word sense selected',dictionary:[{sequence:'1',senses:[1],finding:'Word sense checked'}],
  risk:'routine',review:{reviewer:'editor'},pitch:{status:'verified',rationale:'Exact noun row checked',selections:[{locators:['row1'],patterns:[1],finding:'Noun accent1',sense:'word'}]}};
const result=hydrate(packet,{entries:[finding]}).reviews[0];
assert(!result.firstPass&&!result.secondPass,'Hydration must not manufacture editorial acceptance');
assert.deepStrictEqual(result.replacement.pitchProvenance,result.pitch.evidence);
assert.equal(result.evidence[0].selected.senses[0].sense,1);
assert.throws(()=>hydrate(packet,{entries:[{...finding,dictionary:[{sequence:'1',senses:[2],finding:'invalid'}]}]}),/sense absent/);
assert.throws(()=>hydrate(packet,{entries:[{...finding,pitch:{...finding.pitch,selections:[{locators:['missing'],patterns:[1]}]}}]}),/row absent/);
assert.throws(()=>hydrate(packet,{entries:[{...finding,pitch:{...finding.pitch,selections:[{locators:['row1'],patterns:[0],finding:'invalid',sense:'word'}]}}]}),/pattern absent/);
console.log('Editorial hydration tests passed: explicit sense and pitch selections, provenance before approval, no generated approvals.');
