const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert');
const root=path.resolve(__dirname,'..');
const c={console,document:{readyState:'loading',addEventListener(){}}};c.window=c;
for(const f of ['kangxi-radicals-data.js','kanji-data.js','kanji-n1.js','app-constants.js','grammar-data.js','grammar-n2.js','grammar-n1.js','keigo-data.js','grammar-lessons.js','onomatopoeia-data.js','vocab-n5.js','vocab-n4.js','vocab-n3.js','vocab-n2.js','vocab-n1.js','yojijukugo-data.js','idioms-data.js','conjugation.js','vocab-correction-rules.js','vocab-example-overrides.js','vocab-corrections.js'])vm.runInNewContext(fs.readFileSync(path.join(root,f),'utf8'),c,{filename:f});
const norm=s=>s.normalize('NFKC').replace(/[ァ-ヶ]/g,c=>String.fromCharCode(c.charCodeAt(0)-96));
const kanji=c.KANJI_DATA.concat(c.KANJI_N1_DATA);
assert.equal(new Set(c.KANGXI_RADICALS.map(r=>r.radical)).size,214,'Radicals must be distinct');
for(const k of kanji){
  assert(c.getPrimaryKanjiRadical(k),'Primary radical missing: '+k.kanji);
  assert(k.primaryRadicalSource,'Radical source missing: '+k.kanji);
  const file=path.join(root,'stroke-order',k.kanji.codePointAt(0)+'.svg');
  assert(fs.existsSync(file),'Stroke asset missing: '+k.kanji);
  const svg=fs.readFileSync(file,'utf8');
  assert(/<svg\b/.test(svg)&&/<path\b/.test(svg),'Invalid stroke asset: '+k.kanji);
}
const grammarIds=new Set(c.GRAMMAR_DATA.map(g=>g.id));
let clozePatterns=0,excluded=0,related=0;
for(const g of c.GRAMMAR_DATA){
  for(const id of g.related||[]){assert(grammarIds.has(id),g.id+' has unresolved reference '+id);assert(id!==g.id,'Self-link '+id);related++;}
  const examples=g.examples.filter(e=>e.cloze);
  if(examples.length)clozePatterns++;
  else {assert(g.clozeExcludedReason,'Unexplained cloze gap: '+g.id);excluded++;}
  for(const e of examples){assert.equal(e.japanese.slice(e.cloze.start,e.cloze.start+e.cloze.answer.length),e.cloze.answer,'Bad cloze span '+g.id);}
}
// One entry per pattern and level; consolidated entries keep retired IDs as legacyIds.
const patternKey=g=>g.level+'|'+norm(g.pattern).replace(/[～〜~\s]/g,'').split(/[/／]/).sort().join('/');
const patternOwners=new Map();
for(const g of c.GRAMMAR_DATA){
  assert(!patternOwners.has(patternKey(g)),'Duplicate grammar pattern: '+g.id+' repeats '+patternOwners.get(patternKey(g)));
  patternOwners.set(patternKey(g),g.id);
}
const legacyGrammarIds=c.GRAMMAR_DATA.flatMap(g=>g.legacyIds||[]);
assert.equal(new Set(legacyGrammarIds).size,legacyGrammarIds.length,'Legacy grammar id claimed twice');
for(const id of legacyGrammarIds)assert(!grammarIds.has(id),'Legacy grammar id is still live: '+id);
assert.equal(excluded,2,'Only the two explanatory pages are excluded');
const ono=c.ONOMATOPOEIA_DATA;
assert.equal(new Set(ono.map(o=>norm(o.word))).size,ono.length,'Duplicate kana variants');
assert.equal(new Set(ono.map(o=>o.id)).size,ono.length,'Duplicate stable ids');
const words=new Set(ono.map(o=>o.word));
assert.equal(ono.filter(o=>o.enrichedBatch).length,30,'All 30 existing onomatopoeia enrichments must remain');
for(const o of ono){
  for(const w of o.related||[])assert(words.has(w),'Missing onomatopoeia target '+w);
  if(o.editorialBatch||o.enrichedBatch){assert(o.examples.length>=2,'Two contexts required: '+o.word);assert(o.notes&&o.usage,'Usage missing: '+o.word);}
  for(const e of o.examples){assert(e.japanese&&e.romaji&&e.german,'Incomplete example: '+o.word);}
}
const rawSources=['N5','N4','N3','N2','N1'].map(l=>({name:'vocab-'+l.toLowerCase(),items:c['VOCAB_'+l]}));
rawSources.push({name:'yojijukugo',items:c.YOJIJUKUGO_DATA},{name:'idioms',items:c.IDIOMS_DATA});
const app=fs.readFileSync(path.join(root,'app.js'),'utf8');
vm.runInNewContext(app.slice(app.indexOf('  var INTENTIONAL_VOCAB_OVERLAP_KEYS'),app.indexOf('  var sectionLoaders')),c);
const vocab=c.mergeVocabSources(c.getNormalizedVocabSources(rawSources));
const enriched=vocab.filter(v=>v.editorialBatch==='2026-09-content');
assert.equal(enriched.length,90,'All 90 editorial entries must survive runtime merging');
for(const v of enriched){assert(v.notes,'Missing usage notes '+v.word);assert(v.examples.length>=2,'Enrichment lost '+v.word);assert.equal(new Set(v.examples.map(e=>e.japanese)).size,v.examples.length,'Repeated example '+v.word);}
const newLessons=c.GRAMMAR_LESSONS.filter(l=>l.id.startsWith('lesson-n1-'));
assert.equal(newLessons.length,6);
for(const lesson of c.GRAMMAR_LESSONS){for(const id of lesson.grammarIds||[])assert(grammarIds.has(id),'Lesson target missing: '+id);}
for(const l of newLessons){assert(l.sections.length>=2&&l.grammarIds.length>=2,'Thin lesson '+l.id);for(const s of l.sections)assert(s.examples.length>=2,'Missing lesson contrast '+l.id);}
console.log(JSON.stringify({kanji:kanji.length,missingStrokeAssets:0,missingPrimaryRadicals:0,grammarPatterns:c.GRAMMAR_DATA.length,clozePatterns,explainedClozeExclusions:excluded,grammarLinks:related,brokenGrammarLinks:0,onomatopoeia:ono.length,newOnomatopoeia:ono.filter(o=>o.editorialBatch).length,brokenOnomatopoeiaLinks:0,enrichedVocabulary:enriched.length,enrichedByLevel:Object.fromEntries(['N3','N2','N1'].map(l=>[l,enriched.filter(v=>v.level===l).length])),newN1Lessons:newLessons.length},null,2));
