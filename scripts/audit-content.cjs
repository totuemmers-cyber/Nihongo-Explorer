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
  // The stated count must match the strokes the diagram animates (KanjiVG -sN or AnimCJK dN ids).
  const drawn=new Set(Array.from(svg.matchAll(svg.includes('kvg:')?/id="kvg:[0-9a-f]+-s(\d+)"/g:/id="z\d+d(\d+)[a-z]?"/g),m=>m[1])).size;
  assert.equal(k.strokes,drawn,'Stroke count differs from its diagram: '+k.kanji);
  for(const e of k.examples)assert(e.word.includes(k.kanji),'Example word lacks its kanji: '+k.kanji+' '+e.word);
}
// Radical examples are Japanese kanji: either in the kanji data or a known Japanese character
// without its own entry (never simplified or traditional Chinese forms such as 军 or 體).
const kanjiChars=new Set(kanji.map(k=>k.kanji));
const RADICAL_EXAMPLES_WITHOUT_ENTRY=new Set([...'函尖尤尨巳巴辰鞍麹']);
for(const r of c.KANGXI_RADICALS)for(const ex of r.examples)assert(kanjiChars.has(ex)||RADICAL_EXAMPLES_WITHOUT_ENTRY.has(ex),'Radical example is not a Japanese kanji entry: '+r.radical+' '+ex);
// Jōyō coverage against KANJIDIC2 (scripts/joyo-kanji.json). The 2010 table permits these
// tolerated forms (許容字体); the data uses them for the listed official glyphs.
const joyo=JSON.parse(fs.readFileSync(path.join(__dirname,'joyo-kanji.json'),'utf8'));
const TOLERATED_FORMS={'剝':'剥','𠮟':'叱','頰':'頬'};
const kanjiByChar=new Map(kanji.map(k=>[k.kanji,k]));
assert.equal(joyo.kanji.length,2136,'Jōyō reference must list 2,136 kanji');
const missingJoyo=joyo.kanji.filter(j=>!kanjiByChar.has(j.kanji)&&!kanjiByChar.has(TOLERATED_FORMS[j.kanji])).map(j=>j.kanji);
assert.deepEqual(missingJoyo,[],'Missing Jōyō kanji: '+missingJoyo.join(''));
// KANJIDIC2 counts the official glyph, so tolerated forms rely on the diagram check above.
for(const j of joyo.kanji){
  const k=kanjiByChar.get(j.kanji);
  if(k)assert(j.strokeCounts.includes(k.strokes),'Unattested Jōyō stroke count: '+k.kanji+' '+k.strokes);
}
const joyoChars=new Set(joyo.kanji.map(j=>TOLERATED_FORMS[j.kanji]||j.kanji));
const nonJoyo=kanji.filter(k=>!joyoChars.has(k.kanji)).length;
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
// A variant taught by two entries (at any level) is a duplicate unless it is one of these deliberate
// contrasts: particle vs. verb form, comparison cards, the keigo lens, or unrelated patterns (つつ vs. ～つ～つ).
const SHARED_VARIANTS={'で':'de,te-form','や':'n1-ya,ya','後で':'ato-de,n4-ato-de','てから':'n4-ato-de,te-kara','ないで':'n4-zu-ni,naide',
  'でしょう':'deshou,n4-daroo','られる':'n4-potential,n4-rareru','なら':'n4-adj-ba,n4-nara','ていただけませんか':'keigo-teinei-itadakemasenka,n4-te-itadakemasenka',
  'つつ':'n1-tsu-tsu,n3-tsutsu','お':'keigo-bikago-obi,keigo-bikago-prefix-rules,keigo-teinei-goitadaku'};
const variantOwners=new Map();
for(const g of c.GRAMMAR_DATA)for(const v of norm(g.pattern).replace(/[～〜~\s()（）]/g,'').split(/[/／]/).filter(Boolean)){
  if(!variantOwners.has(v))variantOwners.set(v,new Set());
  variantOwners.get(v).add(g.id);
}
for(const [v,owners] of variantOwners)if(owners.size>1)assert.equal([...owners].sort().join(','),SHARED_VARIANTS[v],'Grammar variant '+v+' taught twice: '+[...owners].join(', '));
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
for(const v of vocab)if(v.type==='Yojijukugo')assert.equal([...v.word].length,4,'Yojijukugo must have four characters: '+v.word);
// Two examples must show two contexts, not one sentence with a reworded translation.
for(const v of vocab){const seen=(v.examples||[]).map(e=>e.japanese.normalize('NFKC').replace(/\s/g,''));assert.equal(new Set(seen).size,seen.length,'Repeated example sentence: '+v.id+' '+v.word);}
for(const v of enriched){assert(v.notes,'Missing usage notes '+v.word);assert(v.examples.length>=2,'Enrichment lost '+v.word);assert.equal(new Set(v.examples.map(e=>e.japanese)).size,v.examples.length,'Repeated example '+v.word);}
const newLessons=c.GRAMMAR_LESSONS.filter(l=>l.id.startsWith('lesson-n1-'));
assert.equal(newLessons.length,6);
for(const lesson of c.GRAMMAR_LESSONS){for(const id of lesson.grammarIds||[])assert(grammarIds.has(id),'Lesson target missing: '+id);}
for(const l of newLessons){assert(l.sections.length>=2&&l.grammarIds.length>=2,'Thin lesson '+l.id);for(const s of l.sections)assert(s.examples.length>=2,'Missing lesson contrast '+l.id);}
console.log(JSON.stringify({kanji:kanji.length,missingStrokeAssets:0,missingPrimaryRadicals:0,strokeCountMismatches:0,joyo:joyo.kanji.length,missingJoyo:missingJoyo.length,nonJoyo,grammarPatterns:c.GRAMMAR_DATA.length,clozePatterns,explainedClozeExclusions:excluded,grammarLinks:related,brokenGrammarLinks:0,onomatopoeia:ono.length,newOnomatopoeia:ono.filter(o=>o.editorialBatch).length,brokenOnomatopoeiaLinks:0,enrichedVocabulary:enriched.length,enrichedByLevel:Object.fromEntries(['N3','N2','N1'].map(l=>[l,enriched.filter(v=>v.level===l).length])),newN1Lessons:newLessons.length},null,2));
