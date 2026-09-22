const assert=require('assert');
const {indexResearch,packet}=require('./vocabulary-review-queue.cjs');
const match={sequence:'1',spelling:'生',reading:'せい',readingRestrictions:['生'],spellingInfo:['restricted'],
  senses:[{sense:1,pos:['noun'],stagk:['生'],stagr:['せい'],misc:['formal'],gloss:['life'],notes:['restriction']}]};
const competing={...match,sequence:'2',senses:[{sense:1,gloss:['student']} ]};
const dictionary=indexResearch({entries:[{id:'old',word:'生',reading:'せい',matches:[match]}],
  candidates:[{references:[{reference:{word:'生',reading:'せい'},matches:[match,competing]}]}]});
const pitchRow={locator:'row-1',orth:'生',kana:'セイ',lemma:'生',pos:['noun'],cType:'*',cForm:'連用形',aType:'1'};
const pitch=indexResearch({entries:[{id:'old',word:'生',reading:'せい',matches:[pitchRow]}]});
const sources={dictionary,pitch,dictionarySource:{source:'JMdict'},pitchSource:{source:'UniDic'}};
const result=packet('new',{word:'生',reading:'せい'},sources);
assert.equal(result.dictionary.cacheStatus,'reused-form');
assert.deepStrictEqual(JSON.parse(JSON.stringify(result.dictionary.matches)),[match,competing]);
assert.deepStrictEqual(result.pitch.matches,[pitchRow],'Competing grammatical forms must remain available for editorial inspection');
const stale=packet('old',{word:'生',reading:'なま'},sources);
assert.equal(stale.dictionary.cacheStatus,'stale-form');
assert.deepStrictEqual(stale.dictionary.matches,[]);
assert.deepStrictEqual(stale.pitch.matches,[]);
console.log('Research cache regressions passed: exact form reuse, restrictions, competing senses/forms and stale evidence isolation.');
