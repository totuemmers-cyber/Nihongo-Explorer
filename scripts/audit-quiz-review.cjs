const assert = require('node:assert/strict');
const { applyReview, loadGroups, normalize } = require('./build-quiz-review.cjs');
const manifest = require('./grammar-quiz-review.json');
const plain = value => JSON.parse(JSON.stringify(value));

module.exports = function auditQuizReview(ctx, audit) {
  const groups = loadGroups();
  const compiled = JSON.stringify(groups);
  assert.equal(applyReview(groups).patterns, 671);
  assert.equal(JSON.stringify(groups), compiled, 'Compiled reviews differ from editorial source');
  const byLevel = {};
  for (const record of manifest.records) {
    const question = audit.generateQuestionForSource('grammarCloze', record.level, record.grammarId, record.exampleIndex);
    assert(question, 'Missing grammar question: ' + record.grammarId);
    assert.equal(question.auditMeta.sourceEntryId, record.grammarId);
    assert.equal(question.auditMeta.sourceExampleIndex, record.exampleIndex);
    assert.equal(question.choices[question.correctIndex], record.answer, record.grammarId);
    assert.equal(new Set(question.choices.map(normalize)).size, 4, record.grammarId);
    assert.deepEqual(plain(question.choices.filter((_,i) => i !== question.correctIndex)).sort(),
      record.distractors.map(d => d.text).sort(), 'Unreviewed choice: ' + record.grammarId);
    assert.equal(question.promptSub, record.german);
    if (/^N[45]$/.test(record.level)) {
      assert.equal(question.promptMain, record.promptKana);
      assert(!/[\u3400-\u9fff]/.test(question.promptMain));
    } else {
      assert.equal(question.promptMain.replace('＿＿＿', record.answer), record.japanese);
    }
    byLevel[record.level] = (byLevel[record.level] || 0) + 1;
  }
  assert.deepEqual(byLevel, {N5:76,N4:140,N3:134,N2:131,N1:190});
  for (const record of manifest.records.filter(r => r.level === 'N5')) {
    assert(audit.generateQuestionForSource('grammarCloze','N4',record.grammarId,record.exampleIndex),
      'N4 lost prerequisite coverage: ' + record.grammarId);
  }
  // Real particle alternatives must never compete with the canonical answer.
  for (const [id,alternative] of [['wa','が'],['ga','は'],['ni','へ']]) {
    const record = manifest.records.find(r => r.grammarId === id);
    assert(record, 'Missing particle fixture: ' + id);
    assert(record.acceptedAnswers.includes(alternative), id);
    assert(!record.distractors.some(d => d.text === alternative), id);
  }

  const kanji = ctx.app.sections.kanji.allItems;
  for (const item of kanji) {
    const question = audit.generateQuestionForSource('kanjiMeaning',item.jlpt,item.kanji);
    assert(question, 'Missing Kanji question: ' + item.kanji);
    assert.equal(question.auditMeta.sourceEntryId, item.kanji);
    assert.equal(question.choices[question.correctIndex], item.meanings[0]);
    assert.equal(new Set(question.choices.map(normalize)).size, 4);
    const accepted = new Set(item.meanings.map(normalize));
    assert(question.choices.every((c,i) => i === question.correctIndex || !accepted.has(normalize(c))), item.kanji);
  }
  assert.equal(kanji.length,2447);
  // Include NFKC, case and repeated-whitespace collisions in a concentrated pool.
  const fixture = [
    {kanji:'前',jlpt:'N5',meanings:['vor','vorher','A B']},
    {kanji:'甲',jlpt:'N5',meanings:[' ＶＯＲＨＥＲ ']},
    {kanji:'乙',jlpt:'N5',meanings:['a   b']},
    {kanji:'丙',jlpt:'N5',meanings:['links']},
    {kanji:'丁',jlpt:'N5',meanings:['rechts']},
    {kanji:'戊',jlpt:'N5',meanings:['oben']}
  ];
  ctx.app.sections.kanji.allItems = fixture;
  try {
    for (let i=0;i<24;i++) {
      const q = audit.generateQuestionForSource('kanjiMeaning','N5','前');
      assert(q);
      assert.deepEqual(plain(q.choices).sort(), ['vor','links','rechts','oben'].sort());
    }
    ctx.app.sections.kanji.allItems = fixture.slice(0,5);
    assert.equal(audit.generateQuestionForSource('kanjiMeaning','N5','前'),null,
      'Insufficient valid choices must not be padded');
  } finally { ctx.app.sections.kanji.allItems = kanji; }

  assert.equal(audit.buildChoices('A',['ａ',' a ','B','C']),null);
  assert.equal(audit.buildChoices('A',['B',' b ','Ｂ','C']),null);
  assert.equal(audit.buildChoices('', ['A','B','C']),null);
  const positions = new Set();
  for (let i=0;i<100;i++) {
    const q = audit.buildChoices('A',['ａ',' B ','b','C','D']);
    assert(q);
    assert.equal(q.choices[q.correctIndex],'A');
    assert.equal(new Set(q.choices.map(normalize)).size,4);
    positions.add(q.correctIndex);
  }
  assert.equal(positions.size,4,'Shuffle must exercise every answer position');

  // Both compiler and runtime reject stale or ambiguous records.
  const mutations = [
    r => { r.japanese += '。'; },
    r => { r.german += ' changed'; },
    r => { r.start++; },
    r => { r.answer = '違う'; },
    r => { r.level = 'N1'; },
    r => { r.acceptedAnswers = []; },
    r => { r.acceptedAnswers = [r.answer,42]; },
    r => { r.distractors[0].text = r.answer; },
    r => { r.distractors[0].text = 'Ａ'; r.distractors[1].text = ' a '; },
    r => { r.distractors[0].reason = ''; },
    r => { r.distractors.pop(); },
    r => { delete r.promptKana; },
    r => { r.promptKana += '漢字'; },
    r => { r.promptKana += '＿＿＿'; }
  ];
  for (const mutate of mutations) {
    const records = plain(manifest.records);
    mutate(records[0]);
    assert.throws(() => applyReview(groups, records));
    assert.equal(JSON.stringify(groups),compiled,'Failed validation mutated teaching data');
    const record = records[0];
    const g = ctx.app.sections.grammar.allItems.find(g => g.id === record.grammarId);
    const ex = g.examples[record.exampleIndex], original = ex.cloze.quiz;
    try {
      ex.cloze.quiz = record;
      assert.equal(audit.generateQuestionForSource('grammarCloze',g.level,g.id,record.exampleIndex),null,
        'Runtime accepted invalid review: ' + record.grammarId);
    } finally { ex.cloze.quiz = original; }
  }
  assert.throws(() => applyReview(groups,manifest.records.slice(1)),/Missing grammar review/);
  assert.throws(() => applyReview(groups,[...manifest.records,manifest.records[0]]),/Duplicate review/);
  assert.equal(JSON.stringify(groups),compiled);
  return {kanji:kanji.length, grammarPatterns:manifest.records.length, grammarByLevel:byLevel};
};
