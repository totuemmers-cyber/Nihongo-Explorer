// Mechanical source-format checks supplement the separately approved lexical
// evidence. They cannot turn an unrelated spelling or reading into a match.
const assert=require('assert');
const normalized=s=>s.normalize('NFKC');
const kana=s=>normalized(s).replace(/[ァ-ヶ]/g,c=>String.fromCharCode(c.charCodeAt(0)-0x60));
function validateSourceNotation(ref,target,notation) {
  assert(notation&&typeof notation==='object'&&!Array.isArray(notation),'Missing source notation');
  assert.deepStrictEqual(Object.keys(notation).sort(),['kind','reading','word'],'Invalid source notation fields');
  for(const field of ['kind','word','reading'])assert(typeof notation[field]==='string'&&notation[field].trim(),'Incomplete source notation');
  assert(target.word===notation.word||(target.aliases||[]).includes(notation.word),'Source notation spelling is not covered');
  assert.equal(normalized(notation.reading),normalized(target.reading),'Source notation reading differs');
  switch(notation.kind) {
    case 'nominal-verb':
      assert.equal(notation.word,ref.word+'する','Source does not indicate this suru verb');
      assert(ref.reading.endsWith('する'),'Source lacks complete suru reading');
      assert.equal(normalized(notation.reading),normalized(ref.reading),'Source suru reading differs');
      break;
    case 'parenthetical-reading': {
      const match=ref.reading.match(/^(.+)[(（]([ぁ-ゖァ-ヺー]+)[)）]$/u);
      assert(match&&!/[()（）]/u.test(match[1]),'Unsupported reading parentheses');
      assert.equal(notation.word,ref.word,'Parentheses changed source spelling');
      assert.equal(normalized(notation.reading),normalized(match[1]+match[2]),'Parentheses changed source reading');
      break;
    }
    case 'misplaced-reading':
      assert.equal(ref.reading,ref.word,'Source reading was not repeated spelling');
      assert.equal(notation.word,ref.word,'Misplaced reading changed source spelling');
      assert.equal(normalized(notation.reading),normalized(ref.gloss.trim()),'Source gloss does not contain this reading');
      break;
    case 'kana-script':
      assert(/^[ぁ-ゖァ-ヺー]+$/u.test(normalized(ref.reading))&&/^[ぁ-ゖァ-ヺー]+$/u.test(normalized(notation.reading)),'Source reading is not kana');
      assert.equal(notation.word,ref.word,'Kana conversion changed source spelling');
      assert.equal(kana(notation.reading),kana(ref.reading),'Kana conversion changed pronunciation');
      break;
    case 'combined-spellings': {
      const words=ref.word.split(/[/／]/u);
      assert(words.length>=2&&words.length<=3&&new Set(words).size===words.length&&words.every(Boolean),'Unsupported combined spellings');
      assert(words.includes(notation.word),'Normalized spelling absent from source');
      assert(words.every(word=>target.word===word||(target.aliases||[]).includes(word)),'Combined spelling not fully covered');
      assert.equal(normalized(notation.reading),normalized(ref.reading),'Combined spellings changed reading');
      break;
    }
    default: assert.fail('Unsupported source notation kind');
  }
}
module.exports={validateSourceNotation};
