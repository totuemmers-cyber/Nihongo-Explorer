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
      // Some lists place one separator immediately before the suru ending.
      // No other punctuation or part of the reading may be discarded.
      assert.equal(normalized(notation.reading),normalized(ref.reading.replace(/・(?=する$)/u,'')),'Source suru reading differs');
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
    case 'kana-orthography': {
      // Only the modern-kana ji/zu spelling pairs have matching pronunciation.
      // Keep the complete source word; this cannot repair missing dakuten,
      // another reading, a truncated form, or an arbitrary spelling mistake.
      const source=normalized(ref.reading),reading=normalized(notation.reading);
      assert(/^[ぁ-ゖー]+$/u.test(source)&&/^[ぁ-ゖー]+$/u.test(reading),'Orthographic readings must be complete hiragana');
      assert.equal(notation.word,ref.word,'Kana orthography changed source spelling');
      assert.notEqual(source,reading,'Kana orthography requires a spelling difference');
      const sound=s=>s.replace(/ぢ/g,'じ').replace(/づ/g,'ず');
      assert.equal(sound(source),sound(reading),'Kana orthography changed pronunciation');
      break;
    }
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
// A list may abbreviate several full forms. Bind every form to its own accepted
// card rather than inventing a spelling alias or discarding an alternate reading.
function validateSourceNotationTargets(ref,targets,notation) {
  assert(Array.isArray(targets)&&targets.length,'Missing source notation targets');
  if(!['alternative-readings','spaced-readings','shared-okurigana','spaced-spellings','parallel-alternatives'].includes(notation?.kind)) {
    assert.equal(targets.length,1,'Source notation requires one exact target');
    return validateSourceNotation(ref,targets[0],notation);
  }
  assert.deepStrictEqual(Object.keys(notation).sort(),['kind','reading','word'],'Invalid source notation fields');
  for(const field of ['word','reading'])assert(typeof notation[field]==='string'&&notation[field].trim(),'Incomplete source notation');
  let forms;
  if(['alternative-readings','spaced-readings'].includes(notation.kind)) {
    assert.equal(notation.word,ref.word,'Alternative readings changed source spelling');
    assert.equal(notation.reading,ref.reading,'Alternative readings changed source notation');
    const readings=notation.kind==='spaced-readings'?ref.reading.split(' ').map(normalized):ref.reading.split(/[/／]/u).map(s=>normalized(s.trim()));
    assert(readings.length>=2&&readings.length<=3&&new Set(readings.map(kana)).size===readings.length&&readings.every(r=>/^[ぁ-ゖァ-ヺー]+$/u.test(r)),'Unsupported alternative readings');
    forms=readings.map(reading=>({word:ref.word,reading}));
  } else if(notation.kind==='parallel-alternatives') {
    // Complete kana alternatives must preserve both literal source lists.
    // Pair them by position; never transfer one reading to another spelling.
    assert.equal(notation.word,ref.word,'Parallel alternatives changed source spelling');
    assert.equal(notation.reading,ref.reading,'Parallel alternatives changed source notation');
    const words=ref.word.split(/[/／]/u).map(s=>normalized(s.trim())),readings=ref.reading.split(/[/／]/u).map(s=>normalized(s.trim()));
    assert(words.length>=2&&words.length<=3&&readings.length===words.length,'Unsupported parallel alternative lists');
    assert(words.every((w,i)=>/^[ぁ-ゖァ-ヺー]+$/u.test(w)&&/^[ぁ-ゖァ-ヺー]+$/u.test(readings[i])&&kana(w)===kana(readings[i])),'Unsupported parallel alternative forms');
    assert(new Set(words.map(kana)).size===words.length,'Repeated parallel alternative');
    forms=words.map((word,i)=>({word,reading:readings[i]}));
  } else if(notation.kind==='spaced-spellings') {
    // Preserve the frozen source space. Only complete Han+kana spellings with
    // the same written ending may be separated; incomplete stems and phrases
    // with arbitrary whitespace are not a substitute for reviewed full forms.
    const words=ref.word.split(' '),endings=words.map(word=>word.match(/^[\p{Script=Han}]+([ぁ-ゖ]+)$/u)?.[1]);
    assert(words.length>=2&&words.length<=3&&endings.every(Boolean)&&new Set(endings).size===1,'Unsupported spaced spellings');
    assert.equal(new Set(words).size,words.length,'Repeated spaced spelling');
    assert.equal(notation.word,words.join('/'),'Spaced spellings changed source spelling');
    assert.equal(normalized(notation.reading),normalized(ref.reading),'Spaced spellings changed reading');
    forms=words.map(word=>({word,reading:normalized(ref.reading)}));
  } else {
    const parts=ref.word.split(/[/／]/u),last=parts.at(-1),suffix=last.match(/^[\p{Script=Han}]+([ぁ-ゖ]+)$/u)?.[1];
    assert(parts.length>=2&&parts.length<=3&&suffix&&parts.slice(0,-1).every(s=>/^[\p{Script=Han}]+$/u.test(s)),'Unsupported shared okurigana');
    const words=[...parts.slice(0,-1).map(s=>s+suffix),last];
    assert.equal(new Set(words).size,words.length,'Repeated shared-okurigana spelling');
    assert.equal(notation.word,words.join('/'),'Shared okurigana changed source spelling');
    assert.equal(normalized(notation.reading),normalized(ref.reading),'Shared okurigana changed reading');
    forms=words.map(word=>({word,reading:normalized(ref.reading)}));
  }
  assert.equal(targets.length,forms.length,'Source notation must cover every distinct form');
  const assigned=new Set();
  for(const form of forms) {
    const matches=targets.filter(t=>normalized(t.reading)===form.reading&&(t.word===form.word||(t.aliases||[]).includes(form.word)));
    assert.equal(matches.length,1,'Source form needs one exact target');
    assert(!assigned.has(matches[0]),'Source forms must retain distinct targets');
    assigned.add(matches[0]);
  }
}
module.exports={validateSourceNotation,validateSourceNotationTargets};
