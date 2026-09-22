// Reproducible, idempotent editorial import. Source rows are original teaching content.
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const root = path.resolve(__dirname,'..');
const read = name => fs.readFileSync(path.join(root,name),'utf8');
// Stage all output so an invalid grammar review cannot leave a partial import.
const pendingWrites = new Map();
const write = (name,s) => pendingWrites.set(name,s);
const { applyReview } = require('./build-quiz-review.cjs');
const tsv = name => read('scripts/'+name).split(/\r?\n/).filter(s=>s.trim()&&!s.startsWith('#')).map(s=>s.split('|'));
const normalize = s => s.normalize('NFKC').replace(/[ァ-ヶ]/g,c=>String.fromCharCode(c.charCodeAt(0)-96));
function load(name,key) {const c={GRAMMAR_DATA:[]};c.window=c;vm.runInNewContext(read(name),c);return c[key];}
function save(name,key,items,push=false){write(name,(key==='GRAMMAR_DATA'?'// Teaching data; editorial sources in scripts/.\n':'// Teaching data; editorial additions tracked in scripts/*.tsv.\n')+(push?'window.'+key+'.push.apply(window.'+key+', ':'window.'+key+' = ')+JSON.stringify(items,null,2)+(push?');':';')+'\n');}

const ono = load('onomatopoeia-data.js','ONOMATOPOEIA_DATA');
ono.forEach((o,i)=>{o.id=o.id||'onomatopoeia:'+i;});
const originalCount=ono.length;
const byWord = new Map();
const merged=[];
for(const o of ono){
  const key=normalize(o.word), previous=byWord.get(key);
  if(previous){
    previous.aliases=[...new Set([...(previous.aliases||[]),o.word,...(o.aliases||[])])];
    previous.legacyIds=[...new Set([...(previous.legacyIds||[]),o.id])];
    for(const ex of o.examples||[])if(!previous.examples.some(e=>e.japanese===ex.japanese))previous.examples.push(ex);
    previous.related=[...new Set([...(previous.related||[]),...(o.related||[])])];
  }else{merged.push(o);byWord.set(key,o);}
}
for(const row of tsv('onomatopoeia-additions.tsv')){
  if(row.length!==13)throw new Error('Invalid onomatopoeia row: '+row[0]);
  const [word,romaji,meaning,category,level,notes,jp,r,de,jp2,r2,de2,related]=row;
  if(byWord.has(normalize(word)))continue;
  const o={id:'onomatopoeia:word:'+word,word,reading:word,romaji,pitch:null,meaning,category,
    categoryJP:({'Zustände':'擬態語','Gefühle':'擬情語','Bewegung':'擬容語','Geräusche':'擬音語'})[category],
    pattern:word.length===4&&word.slice(0,2)===word.slice(2)?'ABAB':'Sonstige',level,
    usage:notes.split('。')[0],explanation:meaning+'。 '+notes,notes,
    examples:[{japanese:jp,romaji:r,german:de},{japanese:jp2,romaji:r2,german:de2}],related:related.split(','),
    editorialBatch:'2026-09-content',tags:[],levelSource:'Redaktionelle Lernstufe; keine offizielle JLPT-Liste'};
  merged.push(o);byWord.set(normalize(word),o);
}
const relationAliases={'ハーハー':'はあはあ','モウモウ':'もうもう'};
for(const [word,japanese,romaji,german,notes] of tsv('onomatopoeia-enrichment.tsv')){
  const o=byWord.get(normalize(word));
  if(!o)throw new Error('Missing enrichment target '+word);
  if(!o.examples.some(e=>e.japanese===japanese))o.examples.push({japanese,romaji,german});
  o.notes=notes;o.enrichedBatch='2026-09-content';
}
const replacements={'ハッキリ':'クッキリ','あいまい':'ぼんやり','がさつ':'ガサガサ','乱暴':'ガサガサ','ヒューヒュー':'ピューピュー','モワモワ':'モクモク'};
const missing=[];
for(const o of merged){
  const tags=new Set(o.tags||[]);
  if(/食|ケーキ|パン|米|芋|ゼリー|卵|エビ|海老|クッキー|麺/.test(JSON.stringify(o.examples)))tags.add('Essen & Textur');
  if(/痛|汗|頭|胃|体|息|震/.test(JSON.stringify(o.examples)))tags.add('Körper & Empfindungen');
  o.tags=[...tags];
  o.related=[...new Set((o.related||[]).map(w=>{
    const target=byWord.get(normalize(relationAliases[w]||w))||byWord.get(normalize(replacements[w]||w));
    if(!target){missing.push([o.word,w]);return w;}
    return target.word;
  }).filter(w=>normalize(w)!==normalize(o.word)))];
}
if(missing.length)throw new Error('Missing onomatopoeia references: '+JSON.stringify(missing));
save('onomatopoeia-data.js','ONOMATOPOEIA_DATA',merged);

const vocabByLevel=Object.fromEntries(['N3','N2','N1'].map(l=>[l,load('vocab-'+l.toLowerCase()+'.js','VOCAB_'+l)]));
let enriched=0;
for(const row of tsv('vocabulary-enrichment.tsv')){
  const [level,word,japanese,romaji,german,notes]=row;
  if(row.length!==6)throw new Error('Invalid vocabulary row '+word);
  const candidates=vocabByLevel[level].filter(v=>v.word===word);
  if(candidates.length!==1)throw new Error('Ambiguous vocabulary target '+level+': '+word);
  const v=candidates[0];
  if(!v.examples.some(ex=>ex.japanese===japanese))v.examples.push({kind:'natural',japanese,romaji,german});
  v.notes=notes;v.editorialBatch='2026-09-content';enriched++;
}
for(const [level,items] of Object.entries(vocabByLevel))save('vocab-'+level.toLowerCase()+'.js','VOCAB_'+level,items);

const grammarFiles=['grammar-data.js','grammar-n2.js','grammar-n1.js','keigo-data.js'];
const grammar=grammarFiles.map(file=>({file,items:load(file,'GRAMMAR_DATA')}));
const all=grammar.flatMap(f=>f.items);
const ids=new Map(all.map(g=>[g.id,g]));
const answers=new Map(tsv('grammar-cloze-answers.tsv'));
const okoshi=ids.get('keigo-sonkeigo-okoshininaru');
okoshi.examples[0]={japanese:'先生は何時にお越しになりましたか。',romaji:'Sensei wa nanji ni okoshi ni narimashita ka.',german:'Um wie viel Uhr ist die Lehrperson gekommen?'};
const exclusions={
  'keigo-sonkeigo-nijukeigo':'Fehlervergleich: doppelte Ehrung nicht als korrekte Lückenantwort üben.',
  'keigo-bikago-prefix-rules':'Metasprachliche Präfixübersicht; kein eigenständiger Satz für einen Lückentext.'
};
for(const g of all){
  if(exclusions[g.id]){g.clozeExcludedReason=exclusions[g.id];continue;}
  if(answers.has(g.id)){
    const answer=answers.get(g.id),ex=g.examples[0],start=ex.japanese.indexOf(answer);
    if(start<0)throw new Error('Absent cloze surface '+g.id+': '+answer);
    ex.cloze={start,answer};
  }
}
const clean=s=>normalize(s).replace(/[～〜~\s]/g,'').replace(/[（(][^）)]*[）)]/g,'');
const patternMap=new Map();
for(const g of all){
  for(const p of [g.pattern,...g.pattern.split(/\s*[/／]\s*/)]){
    const key=clean(p);if(!patternMap.has(key))patternMap.set(key,[]);
    if(!patternMap.get(key).includes(g))patternMap.get(key).push(g);
  }
}
const manualPath=path.join(__dirname,'grammar-related-aliases.json');
const manual=fs.existsSync(manualPath)?JSON.parse(fs.readFileSync(manualPath,'utf8')):{};
const idStem=s=>s.replace(/^n[1-5]-/,'').replace(/[-_\s]/g,'');
const unresolved=[];
for(const g of all){
  g.related=[...new Set((g.related||[]).map(target=>{
    if(ids.has(target))return target;
    if(manual[target])return manual[target];
    const matches=patternMap.get(clean(target))||all.filter(x=>idStem(x.id)===idStem(target));
    const same=matches.filter(x=>x.level===g.level);
    const choices=same.length===1?same:matches;
    if(choices.length===1)return choices[0].id;
    unresolved.push({from:g.id,target,matches:matches.map(x=>x.id)});return target;
  }).filter(id=>id!==g.id))];
}
// Rebind reviewed choices after the span import, including replaced examples.
applyReview(grammar);
write('.content-cache/grammar-unresolved.json',JSON.stringify(unresolved,null,2));
// Save resolved links now; a second run applies reviewed remaining aliases.
for(const f of grammar)save(f.file,'GRAMMAR_DATA',f.items,f.file!=='grammar-data.js');
for(const [name,contents] of pendingWrites)fs.writeFileSync(path.join(root,name),contents);
console.log(JSON.stringify({onomatopoeia:merged.length,originalCount,vocabularyEnriched:enriched,clozeAnnotated:answers.size,unresolvedGrammarLinks:unresolved.length}));
