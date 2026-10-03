// Retire display-only vowel overrides when reviewed authoring replaces their text.
const vm=require('vm'),assert=require('assert');
function reconcileLayer(source,items,reviewedIds,romajiHash) {
  const context={window:{}};
  vm.runInNewContext(source,context,{filename:'vocab-romaji-hepburn.js'});
  const layer=context.window.VOCAB_ROMAJI_HEPBURN;
  assert(layer&&typeof layer==='object','Missing vocabulary romaji layer');
  const bySource=new Map(items.map(item=>[item.source+':'+item.__sourceIndex,item]));
  let removed=0;
  for(const [name,entries] of Object.entries(layer))for(const [index,fields] of Object.entries(entries)){
    const item=bySource.get(name+':'+index);
    assert(item,'Romaji layer refers to missing source entry: '+name+':'+index);
    const retained=fields.filter(([field,expectedHash])=>{
      const value=field==='r'?item.romaji:item.examples?.[field]?.romaji;
      if(typeof value==='string'&&romajiHash(value)===expectedHash)return true;
      assert(reviewedIds.has(item.id),'Unreviewed romaji layer mismatch: '+item.id+'#'+field);
      removed++;return false;
    });
    if(retained.length)entries[index]=retained;else delete entries[index];
  }
  if(!removed)return {text:source,removed};
  const lines=['// Reviewed text replacements reconciled by scripts/vocabulary-romaji-layer.cjs.',
    '// Display-only Modified Hepburn vowel spans: source → entry index → [field, text hash, spans].',
    'window.VOCAB_ROMAJI_HEPBURN = {'];
  const sources=Object.entries(layer);
  sources.forEach(([name,entries],i)=>{
    lines.push('  '+JSON.stringify(name)+': {');
    const rows=Object.entries(entries);
    rows.forEach(([index,fields],j)=>lines.push('    '+JSON.stringify(index)+': '+JSON.stringify(fields)+(j<rows.length-1?',':'')));
    lines.push('  }'+(i<sources.length-1?',':''));
  });
  lines.push('};','');return {text:lines.join('\n'),removed};
}
module.exports={reconcileLayer};
