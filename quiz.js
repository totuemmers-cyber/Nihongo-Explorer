// ============================================================
// Quiz & Test System for Nihongo Explorer
// ============================================================
(function () {
  'use strict';

  // ==========================================================
  // A: CONSTANTS
  // ==========================================================

  var QUESTION_TYPES = {
    vocabMeaning:    { id: 'vocabMeaning',    group: 'Vokabeln',    label: 'Bedeutung erkennen',   icon: '意' },
    vocabReading:    { id: 'vocabReading',    group: 'Vokabeln',    label: 'Lesung erkennen',      icon: '読' },
    vocabReverse:    { id: 'vocabReverse',    group: 'Vokabeln',    label: 'Wort erkennen',        icon: '語' },
    vocabContext:    { id: 'vocabContext',    group: 'Vokabeln',    label: 'Kontextfrage',         icon: '文' },
    kanjiMeaning:    { id: 'kanjiMeaning',    group: 'Kanji',       label: 'Kanji-Bedeutung',     icon: '字' },
    kanjiReading:    { id: 'kanjiReading',    group: 'Kanji',       label: 'Kanji-Lesung',        icon: '音' },
    kanjiRadical:    { id: 'kanjiRadical',    group: 'Kanji',       label: 'Radikal erkennen',    icon: '部' },
    grammarMeaning:  { id: 'grammarMeaning',  group: 'Grammatik',   label: 'Grammatik-Bedeutung', icon: '文' },
    grammarCloze:    { id: 'grammarCloze',    group: 'Grammatik',   label: 'Lückentext',          icon: '穴' },
    grammarFormation:{ id: 'grammarFormation', group: 'Grammatik',  label: 'Satzbildung',         icon: '形' },
    conjugation:     { id: 'conjugation',     group: 'Konjugation', label: 'Konjugation',         icon: '動' }
  };

  var TYPE_IDS = Object.keys(QUESTION_TYPES);

  var TEST_CONFIGS = {
    N5: { time: 60, sections: [
      { name: 'Schriftzeichen & Vokabeln', count: 25, time: 20, types: ['vocabMeaning','vocabReading','vocabReverse','vocabContext','kanjiMeaning','kanjiReading'] },
      { name: 'Grammatik', count: 20, time: 20, types: ['grammarMeaning','grammarCloze','grammarFormation','conjugation'] },
      { name: 'Leseverständnis', count: 15, time: 20, types: ['vocabContext','grammarCloze','vocabMeaning','kanjiMeaning'] }
    ]},
    N4: { time: 75, sections: [
      { name: 'Schriftzeichen & Vokabeln', count: 30, time: 25, types: ['vocabMeaning','vocabReading','vocabReverse','vocabContext','kanjiMeaning','kanjiReading'] },
      { name: 'Grammatik', count: 25, time: 25, types: ['grammarMeaning','grammarCloze','grammarFormation','conjugation'] },
      { name: 'Leseverständnis', count: 20, time: 25, types: ['vocabContext','grammarCloze','vocabMeaning','kanjiMeaning'] }
    ]},
    N3: { time: 100, sections: [
      { name: 'Schriftzeichen & Vokabeln', count: 35, time: 30, types: ['vocabMeaning','vocabReading','vocabReverse','vocabContext','kanjiMeaning','kanjiReading','kanjiRadical'] },
      { name: 'Grammatik', count: 30, time: 35, types: ['grammarMeaning','grammarCloze','grammarFormation','conjugation'] },
      { name: 'Leseverständnis', count: 25, time: 35, types: ['vocabContext','grammarCloze','vocabMeaning','kanjiMeaning'] }
    ]},
    N2: { time: 110, sections: [
      { name: 'Schriftzeichen & Vokabeln', count: 35, time: 30, types: ['vocabMeaning','vocabReading','vocabReverse','vocabContext','kanjiMeaning','kanjiReading','kanjiRadical'] },
      { name: 'Grammatik', count: 35, time: 40, types: ['grammarMeaning','grammarCloze','grammarFormation','conjugation'] },
      { name: 'Leseverständnis', count: 30, time: 40, types: ['vocabContext','grammarCloze','vocabMeaning','kanjiMeaning'] }
    ]},
    N1: { time: 120, sections: [
      { name: 'Schriftzeichen & Vokabeln', count: 40, time: 35, types: ['vocabMeaning','vocabReading','vocabReverse','vocabContext','kanjiMeaning','kanjiReading','kanjiRadical'] },
      { name: 'Grammatik', count: 40, time: 40, types: ['grammarMeaning','grammarCloze','grammarFormation','conjugation'] },
      { name: 'Leseverständnis', count: 30, time: 45, types: ['vocabContext','grammarCloze','vocabMeaning','kanjiMeaning'] }
    ]}
  };

  var LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'];

  var MOCK_TEST_CONFIGS = {
    N5: { time: 25, totalQuestions: 25, sections: {
      vocab: { count: 10, types: ['vocabMeaning', 'vocabReading'] },
      kanji: { count: 5, types: ['kanjiMeaning'] },
      grammar: { count: 5, types: ['grammarCloze', 'grammarMeaning'] },
      conjugation: { count: 5, types: ['conjugation'] }
    }},
    N4: { time: 30, totalQuestions: 30, sections: {
      vocab: { count: 12, types: ['vocabMeaning', 'vocabReading'] },
      kanji: { count: 6, types: ['kanjiMeaning'] },
      grammar: { count: 7, types: ['grammarCloze', 'grammarMeaning'] },
      conjugation: { count: 5, types: ['conjugation'] }
    }},
    N3: { time: 40, totalQuestions: 35, sections: {
      vocab: { count: 14, types: ['vocabMeaning', 'vocabReading'] },
      kanji: { count: 7, types: ['kanjiMeaning'] },
      grammar: { count: 9, types: ['grammarCloze', 'grammarMeaning'] },
      conjugation: { count: 5, types: ['conjugation'] }
    }},
    N2: { time: 50, totalQuestions: 40, sections: {
      vocab: { count: 15, types: ['vocabMeaning', 'vocabReading'] },
      kanji: { count: 8, types: ['kanjiMeaning'] },
      grammar: { count: 12, types: ['grammarCloze', 'grammarMeaning'] },
      conjugation: { count: 5, types: ['conjugation'] }
    }},
    N1: { time: 60, totalQuestions: 45, sections: {
      vocab: { count: 16, types: ['vocabMeaning', 'vocabReading'] },
      kanji: { count: 9, types: ['kanjiMeaning'] },
      grammar: { count: 14, types: ['grammarCloze', 'grammarMeaning'] },
      conjugation: { count: 6, types: ['conjugation'] }
    }}
  };

  var CONJ_FORM_KEYS = ['polite','negative','past','te','potential','passive','causative','conditional','volitional','imperative'];

  // ==========================================================
  // B: DATA ACCESSORS
  // ==========================================================

  function getVocabByLevel(level) {
    var sec = window.app && window.app.sections.vocab;
    if (!sec) return [];
    return sec.allItems.filter(function (v) { return v.level === level; });
  }

  function getAllVocab() {
    var sec = window.app && window.app.sections.vocab;
    return sec ? sec.allItems : [];
  }

  function getKanjiByLevel(level) {
    var sec = window.app && window.app.sections.kanji;
    if (!sec) return [];
    return sec.allItems.filter(function (k) { return k.jlpt === level; });
  }

  function getAllKanji() {
    var sec = window.app && window.app.sections.kanji;
    return sec ? sec.allItems : [];
  }

  function getGrammarByLevel(level) {
    var sec = window.app && window.app.sections.grammar;
    if (!sec) return [];
    return sec.allItems.filter(function (g) { return g.level === level; });
  }

  function getAllGrammar() {
    var sec = window.app && window.app.sections.grammar;
    return sec ? sec.allItems : [];
  }

  function getVerbsForConjugation(level) {
    var vocab = level ? getVocabByLevel(level) : getAllVocab();
    return vocab.filter(function (v) {
      return v.type === 'Verb' && v.reading && window.conjugateVerb && window.conjugateVerb(v.reading);
    });
  }

  // ==========================================================
  // C: DISTRACTOR GENERATOR
  // ==========================================================

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function generateDistractors(correct, pool, count, keyFn) {
    var correctKey = keyFn(correct);
    var candidates = [];
    for (var i = 0; i < pool.length; i++) {
      var k = keyFn(pool[i]);
      if (k && k !== correctKey) {
        candidates.push(k);
      }
    }
    // Deduplicate
    var seen = {};
    var unique = [];
    for (var j = 0; j < candidates.length; j++) {
      if (!seen[candidates[j]]) {
        seen[candidates[j]] = true;
        unique.push(candidates[j]);
      }
    }
    return shuffle(unique).slice(0, count);
  }

  function buildChoices(correctAnswer, distractors) {
    var all = [correctAnswer].concat(distractors.slice(0, 3));
    // Pad if not enough distractors
    while (all.length < 4) {
      all.push('\u2014');
    }
    var shuffled = shuffle(all);
    return {
      choices: shuffled,
      correctIndex: shuffled.indexOf(correctAnswer)
    };
  }

  // ==========================================================
  // D: QUESTION GENERATORS
  // ==========================================================

  function getLevelPool(getByLevel, level) {
    var pool = getByLevel(level);
    if (pool.length < 10) {
      // Expand to adjacent levels
      var idx = LEVELS.indexOf(level);
      if (idx > 0) pool = pool.concat(getByLevel(LEVELS[idx - 1]));
      if (idx < LEVELS.length - 1) pool = pool.concat(getByLevel(LEVELS[idx + 1]));
    }
    return pool;
  }

  // 1. Vocab Meaning: word → meaning
  function genVocabMeaning(level) {
    var pool = getLevelPool(getVocabByLevel, level);
    if (pool.length < 4) return null;
    var item = pickRandom(pool);
    var distractors = generateDistractors(item, pool, 3, function (v) { return v.meaning; });
    if (distractors.length < 3) return null;
    var c = buildChoices(item.meaning, distractors);
    return {
      type: 'vocabMeaning', level: level,
      prompt: 'Was bedeutet dieses Wort?',
      promptMain: item.word,
      promptSub: item.reading,
      choices: c.choices, correctIndex: c.correctIndex,
      explanation: item.word + ' (' + item.reading + ') = ' + item.meaning
    };
  }

  // 2. Vocab Reading: kanji word → reading
  function genVocabReading(level) {
    var pool = getLevelPool(getVocabByLevel, level).filter(function (v) { return v.word !== v.reading; });
    if (pool.length < 4) return null;
    var item = pickRandom(pool);
    var distractors = generateDistractors(item, pool, 3, function (v) { return v.reading; });
    if (distractors.length < 3) return null;
    var c = buildChoices(item.reading, distractors);
    return {
      type: 'vocabReading', level: level,
      prompt: 'Wie liest man dieses Wort?',
      promptMain: item.word,
      promptSub: item.meaning,
      choices: c.choices, correctIndex: c.correctIndex,
      explanation: item.word + ' wird ' + item.reading + ' gelesen'
    };
  }

  // 3. Vocab Reverse: meaning → word
  function genVocabReverse(level) {
    var pool = getLevelPool(getVocabByLevel, level);
    if (pool.length < 4) return null;
    var item = pickRandom(pool);
    var distractors = generateDistractors(item, pool, 3, function (v) { return v.word; });
    if (distractors.length < 3) return null;
    var c = buildChoices(item.word, distractors);
    return {
      type: 'vocabReverse', level: level,
      prompt: 'Welches Wort bedeutet:',
      promptMain: item.meaning,
      promptSub: '',
      choices: c.choices, correctIndex: c.correctIndex,
      explanation: item.meaning + ' = ' + item.word + ' (' + item.reading + ')'
    };
  }

  // 4. Vocab Context: sentence with blank → word
  function genVocabContext(level) {
    var pool = getLevelPool(getVocabByLevel, level).filter(function (v) {
      if (!v.examples || v.examples.length === 0) return false;
      for (var i = 0; i < v.examples.length; i++) {
        if (v.examples[i].japanese && v.examples[i].japanese.indexOf(v.word) !== -1) return true;
      }
      return false;
    });
    if (pool.length < 4) return null;
    var item = pickRandom(pool);
    var ex = null;
    for (var i = 0; i < item.examples.length; i++) {
      if (item.examples[i].japanese.indexOf(item.word) !== -1) { ex = item.examples[i]; break; }
    }
    if (!ex) return null;
    var sentence = ex.japanese.replace(item.word, '\uFF3F\uFF3F\uFF3F');
    var distractors = generateDistractors(item, pool, 3, function (v) { return v.word; });
    if (distractors.length < 3) return null;
    var c = buildChoices(item.word, distractors);
    return {
      type: 'vocabContext', level: level,
      prompt: 'Welches Wort passt in die Lücke?',
      promptMain: sentence,
      promptSub: ex.german,
      choices: c.choices, correctIndex: c.correctIndex,
      explanation: item.word + ' (' + item.reading + ') — ' + ex.japanese
    };
  }

  // 5. Kanji Meaning: kanji → meaning
  function genKanjiMeaning(level) {
    var pool = getLevelPool(getKanjiByLevel, level);
    if (pool.length < 4) return null;
    var item = pickRandom(pool);
    var correctMeaning = item.meanings[0];
    var distractors = generateDistractors(item, pool, 3, function (k) { return k.meanings[0]; });
    if (distractors.length < 3) return null;
    var c = buildChoices(correctMeaning, distractors);
    return {
      type: 'kanjiMeaning', level: level,
      prompt: 'Was bedeutet dieses Kanji?',
      promptMain: item.kanji,
      promptSub: '',
      choices: c.choices, correctIndex: c.correctIndex,
      explanation: item.kanji + ' = ' + item.meanings.join(', ')
    };
  }

  // 6. Kanji Reading: kanji → reading
  function genKanjiReading(level) {
    var pool = getLevelPool(getKanjiByLevel, level).filter(function (k) {
      return (k.kun && k.kun.length > 0) || (k.on && k.on.length > 0);
    });
    if (pool.length < 4) return null;
    var item = pickRandom(pool);
    var readings = [];
    if (item.kun) item.kun.forEach(function (r) { readings.push(r.kana); });
    if (item.on) item.on.forEach(function (r) { readings.push(r.kana); });
    if (readings.length === 0) return null;
    var correctReading = readings[0];
    var distractors = generateDistractors(item, pool, 3, function (k) {
      var r = [];
      if (k.kun && k.kun.length) r.push(k.kun[0].kana);
      else if (k.on && k.on.length) r.push(k.on[0].kana);
      return r[0] || '';
    });
    if (distractors.length < 3) return null;
    var c = buildChoices(correctReading, distractors);
    return {
      type: 'kanjiReading', level: level,
      prompt: 'Wie kann man dieses Kanji lesen?',
      promptMain: item.kanji,
      promptSub: item.meanings[0],
      choices: c.choices, correctIndex: c.correctIndex,
      explanation: item.kanji + ': ' + readings.join(', ')
    };
  }

  // 7. Kanji Radical: kanji → radical
  function genKanjiRadical(level) {
    var pool = getLevelPool(getKanjiByLevel, level).filter(function (k) {
      return k.components && k.components.length > 0;
    });
    if (pool.length < 4) return null;
    var item = pickRandom(pool);
    var comp = item.components[0];
    var correctAnswer = comp.radical + ' (' + comp.meaning + ')';
    // Build distractor pool from all radicals
    var radicals = window.KANGXI_RADICALS || [];
    var distractorPool = radicals.filter(function (r) { return r.radical !== comp.radical; });
    var distrs = shuffle(distractorPool).slice(0, 3).map(function (r) {
      return r.radical + ' (' + r.meaning + ')';
    });
    if (distrs.length < 3) return null;
    var c = buildChoices(correctAnswer, distrs);
    return {
      type: 'kanjiRadical', level: level,
      prompt: 'Welches Radikal ist in diesem Kanji enthalten?',
      promptMain: item.kanji,
      promptSub: item.meanings[0],
      choices: c.choices, correctIndex: c.correctIndex,
      explanation: item.kanji + ' enthält ' + correctAnswer
    };
  }

  // 8. Grammar Meaning: pattern → meaning
  function genGrammarMeaning(level) {
    var pool = getLevelPool(getGrammarByLevel, level);
    if (pool.length < 4) return null;
    var item = pickRandom(pool);
    var distractors = generateDistractors(item, pool, 3, function (g) { return g.meaning; });
    if (distractors.length < 3) return null;
    var c = buildChoices(item.meaning, distractors);
    return {
      type: 'grammarMeaning', level: level,
      prompt: 'Was bedeutet dieses Grammatikmuster?',
      promptMain: item.pattern,
      promptSub: item.formation || '',
      choices: c.choices, correctIndex: c.correctIndex,
      explanation: item.pattern + ' = ' + item.meaning
    };
  }

  // 9. Grammar Cloze: sentence blank → pattern
  function genGrammarCloze(level) {
    var pool = getLevelPool(getGrammarByLevel, level).filter(function (g) {
      if (!g.examples || g.examples.length === 0) return false;
      for (var i = 0; i < g.examples.length; i++) {
        if (g.examples[i].japanese && g.examples[i].japanese.indexOf(g.pattern) !== -1) return true;
      }
      return false;
    });
    if (pool.length < 4) return null;
    var item = pickRandom(pool);
    var ex = null;
    for (var i = 0; i < item.examples.length; i++) {
      if (item.examples[i].japanese.indexOf(item.pattern) !== -1) { ex = item.examples[i]; break; }
    }
    if (!ex) return null;
    var sentence = ex.japanese.replace(item.pattern, '\uFF3F\uFF3F\uFF3F');
    var distractors = generateDistractors(item, pool, 3, function (g) { return g.pattern; });
    if (distractors.length < 3) return null;
    var c = buildChoices(item.pattern, distractors);
    return {
      type: 'grammarCloze', level: level,
      prompt: 'Welches Grammatikmuster passt in die Lücke?',
      promptMain: sentence,
      promptSub: ex.german,
      choices: c.choices, correctIndex: c.correctIndex,
      explanation: item.pattern + ' — ' + ex.japanese
    };
  }

  // 10. Grammar Formation: meaning → formation
  function genGrammarFormation(level) {
    var pool = getLevelPool(getGrammarByLevel, level).filter(function (g) { return g.formation; });
    if (pool.length < 4) return null;
    var item = pickRandom(pool);
    var distractors = generateDistractors(item, pool, 3, function (g) { return g.formation; });
    if (distractors.length < 3) return null;
    var c = buildChoices(item.formation, distractors);
    return {
      type: 'grammarFormation', level: level,
      prompt: 'Wie wird dieses Muster gebildet?',
      promptMain: item.pattern,
      promptSub: item.meaning,
      choices: c.choices, correctIndex: c.correctIndex,
      explanation: item.pattern + ': ' + item.formation
    };
  }

  // 11. Conjugation: verb + target form → conjugated
  function genConjugation(level) {
    var verbs = getVerbsForConjugation(level);
    if (verbs.length < 1) return null;
    var item = pickRandom(verbs);
    var result = window.conjugateVerb(item.reading);
    if (!result || !result.forms) return null;
    var formKey = pickRandom(CONJ_FORM_KEYS);
    var targetForm = result.forms[formKey];
    if (!targetForm) return null;
    // Distractors: other forms of the SAME verb
    var otherKeys = CONJ_FORM_KEYS.filter(function (k) { return k !== formKey && result.forms[k]; });
    var distrs = shuffle(otherKeys).slice(0, 3).map(function (k) { return result.forms[k].japanese; });
    if (distrs.length < 3) return null;
    // Ensure no duplicates with correct
    distrs = distrs.filter(function (d) { return d !== targetForm.japanese; });
    while (distrs.length < 3) {
      // Pull from remaining forms
      for (var k in result.forms) {
        if (k !== 'dictionary' && k !== formKey && result.forms[k].japanese !== targetForm.japanese) {
          var val = result.forms[k].japanese;
          if (distrs.indexOf(val) === -1) { distrs.push(val); break; }
        }
      }
      if (distrs.length < 3) distrs.push('\u2014');
      break;
    }
    var c = buildChoices(targetForm.japanese, distrs.slice(0, 3));
    return {
      type: 'conjugation', level: level,
      prompt: targetForm.label + ' von:',
      promptMain: item.word || item.reading,
      promptSub: item.meaning + ' (' + result.groupLabel + ')',
      choices: c.choices, correctIndex: c.correctIndex,
      explanation: item.reading + ' → ' + targetForm.label + ': ' + targetForm.japanese
    };
  }

  var GENERATORS = {
    vocabMeaning: genVocabMeaning,
    vocabReading: genVocabReading,
    vocabReverse: genVocabReverse,
    vocabContext: genVocabContext,
    kanjiMeaning: genKanjiMeaning,
    kanjiReading: genKanjiReading,
    kanjiRadical: genKanjiRadical,
    grammarMeaning: genGrammarMeaning,
    grammarCloze: genGrammarCloze,
    grammarFormation: genGrammarFormation,
    conjugation: genConjugation
  };

  function generateQuestion(typeId, level) {
    var gen = GENERATORS[typeId];
    if (!gen) return null;
    // Try up to 5 times for valid question
    for (var i = 0; i < 5; i++) {
      var q = gen(level);
      if (q) return q;
    }
    return null;
  }

  // ==========================================================
  // E: SHARED UI BUILDERS
  // ==========================================================

  var dom = {};

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  function formatTime(seconds) {
    var m = Math.floor(seconds / 60);
    var s = seconds % 60;
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }

  function renderChoiceButtons(question, container, onSelect) {
    container.innerHTML = '';
    var grid = el('div', 'quiz-choices-grid');
    for (var i = 0; i < question.choices.length; i++) {
      (function (idx) {
        var btn = el('button', 'quiz-choice-btn');
        var numSpan = el('span', 'quiz-choice-num', String(idx + 1));
        var textSpan = el('span', 'quiz-choice-text', question.choices[idx]);
        btn.appendChild(numSpan);
        btn.appendChild(textSpan);
        btn.addEventListener('click', function () { onSelect(idx); });
        grid.appendChild(btn);
      })(i);
    }
    container.appendChild(grid);
  }

  function showFeedback(container, selectedIdx, correctIdx) {
    var btns = container.querySelectorAll('.quiz-choice-btn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].disabled = true;
      if (i === correctIdx) btns[i].classList.add('correct');
      if (i === selectedIdx && selectedIdx !== correctIdx) btns[i].classList.add('wrong');
    }
  }

  function renderQuestionCard(question, container) {
    container.innerHTML = '';
    var card = el('div', 'quiz-question-card');

    var typeBadge = el('span', 'quiz-type-badge', QUESTION_TYPES[question.type].label);
    var levelBadge = el('span', 'quiz-level-badge ' + question.level.toLowerCase(), question.level);
    var badges = el('div', 'quiz-badges');
    badges.appendChild(typeBadge);
    badges.appendChild(levelBadge);
    card.appendChild(badges);

    var prompt = el('p', 'quiz-prompt', question.prompt);
    card.appendChild(prompt);

    if (question.promptMain) {
      var isJapanese = /[\u3000-\u9faf\u3040-\u30ff\uff00-\uff9f]/.test(question.promptMain);
      var mainEl = el('div', 'quiz-prompt-main' + (isJapanese ? ' jp' : ''), question.promptMain);
      card.appendChild(mainEl);
    }

    if (question.promptSub) {
      var sub = el('p', 'quiz-prompt-sub', question.promptSub);
      card.appendChild(sub);
    }

    var choicesDiv = el('div', 'quiz-choices');
    card.appendChild(choicesDiv);

    var explDiv = el('div', 'quiz-explanation hidden');
    card.appendChild(explDiv);

    container.appendChild(card);
    return { choicesDiv: choicesDiv, explDiv: explDiv, card: card };
  }

  // ==========================================================
  // F: BROWSE MODE CONTROLLER
  // ==========================================================

  var browseState = {
    currentType: 'vocabMeaning',
    currentLevel: 'N5',
    question: null,
    answered: false,
    revealed: false
  };

  function initBrowseMode() {
    var panel = dom.quizContent;
    panel.innerHTML = '';

    var controls = el('div', 'quiz-browse-controls');

    // Type selector (grouped)
    var typeSelect = document.createElement('select');
    typeSelect.className = 'quiz-type-select';
    var groups = {};
    TYPE_IDS.forEach(function (id) {
      var t = QUESTION_TYPES[id];
      if (!groups[t.group]) groups[t.group] = [];
      groups[t.group].push(t);
    });
    Object.keys(groups).forEach(function (grp) {
      var optgroup = document.createElement('optgroup');
      optgroup.label = grp;
      groups[grp].forEach(function (t) {
        var opt = document.createElement('option');
        opt.value = t.id;
        opt.textContent = t.icon + ' ' + t.label;
        if (t.id === browseState.currentType) opt.selected = true;
        optgroup.appendChild(opt);
      });
      typeSelect.appendChild(optgroup);
    });
    typeSelect.addEventListener('change', function () {
      browseState.currentType = this.value;
      loadBrowseQuestion();
    });
    controls.appendChild(typeSelect);

    // Level pills
    var levelBar = el('div', 'quiz-level-bar');
    LEVELS.forEach(function (lv) {
      var pill = el('button', 'quiz-level-pill' + (lv === browseState.currentLevel ? ' active' : '') + ' ' + lv.toLowerCase(), lv);
      pill.addEventListener('click', function () {
        browseState.currentLevel = lv;
        levelBar.querySelectorAll('.quiz-level-pill').forEach(function (p) {
          p.classList.toggle('active', p.textContent === lv);
        });
        loadBrowseQuestion();
      });
      levelBar.appendChild(pill);
    });
    controls.appendChild(levelBar);

    panel.appendChild(controls);

    // Question area
    var questionArea = el('div', 'quiz-question-area');
    questionArea.id = 'quiz-question-area';
    panel.appendChild(questionArea);

    // Action buttons
    var actions = el('div', 'quiz-browse-actions');
    var revealBtn = el('button', 'quiz-btn quiz-btn-reveal', 'Auflösen');
    revealBtn.id = 'quiz-reveal-btn';
    revealBtn.addEventListener('click', revealBrowseAnswer);
    actions.appendChild(revealBtn);

    var nextBtn = el('button', 'quiz-btn quiz-btn-next hidden', 'Nächste Frage');
    nextBtn.id = 'quiz-next-btn';
    nextBtn.addEventListener('click', loadBrowseQuestion);
    actions.appendChild(nextBtn);

    var backBtn = el('button', 'quiz-btn quiz-btn-back', 'Zurück');
    backBtn.addEventListener('click', showHomeScreen);
    actions.appendChild(backBtn);

    panel.appendChild(actions);

    loadBrowseQuestion();
  }

  function loadBrowseQuestion() {
    browseState.answered = false;
    browseState.revealed = false;
    var area = document.getElementById('quiz-question-area');
    if (!area) return;

    var q = generateQuestion(browseState.currentType, browseState.currentLevel);
    browseState.question = q;

    if (!q) {
      area.innerHTML = '<div class="quiz-no-data">Nicht genügend Daten für diesen Fragetyp und dieses Level verfügbar.</div>';
      return;
    }

    var parts = renderQuestionCard(q, area);

    renderChoiceButtons(q, parts.choicesDiv, function (idx) {
      if (browseState.answered) return;
      browseState.answered = true;
      browseState.selectedIdx = idx;
      // Highlight selected
      var btns = parts.choicesDiv.querySelectorAll('.quiz-choice-btn');
      btns[idx].classList.add('selected');
      if (window.app) window.app.playTick();
    });

    // Reset buttons
    var revealBtn = document.getElementById('quiz-reveal-btn');
    var nextBtn = document.getElementById('quiz-next-btn');
    if (revealBtn) { revealBtn.classList.remove('hidden'); revealBtn.disabled = false; }
    if (nextBtn) nextBtn.classList.add('hidden');
  }

  function revealBrowseAnswer() {
    if (!browseState.question || browseState.revealed) return;
    browseState.revealed = true;

    var area = document.getElementById('quiz-question-area');
    if (!area) return;
    var choicesDiv = area.querySelector('.quiz-choices');
    var explDiv = area.querySelector('.quiz-explanation');
    var selectedIdx = browseState.answered ? browseState.selectedIdx : -1;

    showFeedback(choicesDiv, selectedIdx, browseState.question.correctIndex);

    if (explDiv) {
      explDiv.textContent = browseState.question.explanation;
      explDiv.classList.remove('hidden');
    }

    if (selectedIdx === browseState.question.correctIndex) {
      if (window.app) window.app.playPop();
    }

    var revealBtn = document.getElementById('quiz-reveal-btn');
    var nextBtn = document.getElementById('quiz-next-btn');
    if (revealBtn) revealBtn.classList.add('hidden');
    if (nextBtn) nextBtn.classList.remove('hidden');
  }

  // ==========================================================
  // G: TEST MODE CONTROLLER
  // ==========================================================

  var testState = {
    active: false,
    level: null,
    config: null,
    sections: [],
    currentSection: 0,
    currentQuestion: 0,
    answers: [],
    timerInterval: null,
    sectionEndTime: 0
  };

  function showTestSetup() {
    var panel = dom.quizContent;
    panel.innerHTML = '';

    var setup = el('div', 'quiz-test-setup');
    var title = el('h2', 'quiz-setup-title', 'JLPT Prüfungsmodus');
    setup.appendChild(title);
    var desc = el('p', 'quiz-setup-desc', 'Wähle ein Level für die simulierte JLPT-Prüfung (ohne Hörverstehen). Jede Sektion muss mit mindestens 50% bestanden werden.');
    setup.appendChild(desc);

    var levelGrid = el('div', 'quiz-test-level-grid');
    LEVELS.forEach(function (lv) {
      var cfg = TEST_CONFIGS[lv];
      var total = 0;
      cfg.sections.forEach(function (s) { total += s.count; });

      var card = el('div', 'quiz-test-level-card');
      var badge = el('div', 'quiz-test-level-badge ' + lv.toLowerCase(), lv);
      card.appendChild(badge);
      var info = el('div', 'quiz-test-level-info');
      info.innerHTML = '<span>' + total + ' Fragen</span><span>' + cfg.time + ' Minuten</span><span>' + cfg.sections.length + ' Sektionen</span>';
      card.appendChild(info);
      card.addEventListener('click', function () { startTest(lv); });
      levelGrid.appendChild(card);
    });
    setup.appendChild(levelGrid);

    var backBtn = el('button', 'quiz-btn quiz-btn-back', 'Zurück');
    backBtn.addEventListener('click', showHomeScreen);
    setup.appendChild(backBtn);

    panel.appendChild(setup);
  }

  function startTest(level) {
    var cfg = TEST_CONFIGS[level];
    if (!cfg) return;

    testState.active = true;
    testState.level = level;
    testState.config = cfg;
    testState.currentSection = 0;
    testState.currentQuestion = 0;
    testState.answers = [];
    testState.sections = [];

    // Pre-generate all questions
    for (var s = 0; s < cfg.sections.length; s++) {
      var sec = cfg.sections[s];
      var questions = [];
      for (var q = 0; q < sec.count; q++) {
        var typeId = sec.types[q % sec.types.length];
        var question = generateQuestion(typeId, level);
        // Fallback: try other types
        if (!question) {
          for (var t = 0; t < sec.types.length; t++) {
            question = generateQuestion(sec.types[t], level);
            if (question) break;
          }
        }
        if (question) {
          questions.push(question);
        }
      }
      testState.sections.push({
        name: sec.name,
        time: sec.time,
        questions: questions,
        answers: [],
        score: 0
      });
    }

    startTestSection(0);
  }

  function startTestSection(sectionIdx) {
    testState.currentSection = sectionIdx;
    testState.currentQuestion = 0;

    var sec = testState.sections[sectionIdx];
    testState.sectionEndTime = Date.now() + sec.time * 60 * 1000;

    startTimer();
    renderTestQuestion();
  }

  function startTimer() {
    stopTimer();
    testState.timerInterval = setInterval(function () {
      var remaining = Math.max(0, Math.ceil((testState.sectionEndTime - Date.now()) / 1000));
      var timerEl = document.getElementById('quiz-timer');
      if (timerEl) {
        timerEl.textContent = formatTime(remaining);
        timerEl.classList.toggle('warning', remaining <= 60);
        timerEl.classList.toggle('critical', remaining <= 10);
      }
      // Update progress bar time
      var sec = testState.sections[testState.currentSection];
      if (sec) {
        var totalSec = sec.time * 60;
        var elapsed = totalSec - remaining;
        var timeBar = document.getElementById('quiz-time-bar');
        if (timeBar) timeBar.style.width = Math.min(100, (elapsed / totalSec) * 100) + '%';
      }
      if (remaining <= 0) {
        // Time's up — auto-finish remaining questions as unanswered
        finishCurrentSection();
      }
    }, 250);
  }

  function stopTimer() {
    if (testState.timerInterval) {
      clearInterval(testState.timerInterval);
      testState.timerInterval = null;
    }
  }

  function renderTestQuestion() {
    var panel = dom.quizContent;
    panel.innerHTML = '';

    var secData = testState.sections[testState.currentSection];
    var qIdx = testState.currentQuestion;

    if (qIdx >= secData.questions.length) {
      finishCurrentSection();
      return;
    }

    var question = secData.questions[qIdx];

    // Header bar
    var header = el('div', 'quiz-test-header');
    var secLabel = el('span', 'quiz-test-section-label', 'Sektion ' + (testState.currentSection + 1) + ': ' + secData.name);
    header.appendChild(secLabel);
    var progress = el('span', 'quiz-test-progress', (qIdx + 1) + ' / ' + secData.questions.length);
    header.appendChild(progress);
    var timer = el('span', 'quiz-timer');
    timer.id = 'quiz-timer';
    var remaining = Math.max(0, Math.ceil((testState.sectionEndTime - Date.now()) / 1000));
    timer.textContent = formatTime(remaining);
    header.appendChild(timer);
    panel.appendChild(header);

    // Progress bars
    var progressBars = el('div', 'quiz-progress-bars');
    var qBar = el('div', 'quiz-progress-bar');
    var qFill = el('div', 'quiz-progress-fill');
    qFill.style.width = ((qIdx + 1) / secData.questions.length * 100) + '%';
    qBar.appendChild(qFill);
    progressBars.appendChild(qBar);
    var tBar = el('div', 'quiz-progress-bar time');
    var tFill = el('div', 'quiz-progress-fill time');
    tFill.id = 'quiz-time-bar';
    tBar.appendChild(tFill);
    progressBars.appendChild(tBar);
    panel.appendChild(progressBars);

    // Question card
    var questionArea = el('div', 'quiz-question-area');
    var parts = renderQuestionCard(question, questionArea);
    panel.appendChild(questionArea);

    renderChoiceButtons(question, parts.choicesDiv, function (idx) {
      // Lock answer
      showFeedback(parts.choicesDiv, idx, question.correctIndex);
      var correct = idx === question.correctIndex;
      secData.answers.push({ questionIdx: qIdx, selected: idx, correct: correct });
      if (correct) secData.score++;

      if (correct && window.app) window.app.playPop();
      else if (window.app) window.app.playTick();

      // Show explanation briefly
      if (parts.explDiv) {
        parts.explDiv.textContent = question.explanation;
        parts.explDiv.classList.remove('hidden');
      }

      // Auto-advance after delay
      setTimeout(function () {
        testState.currentQuestion++;
        renderTestQuestion();
      }, 800);
    });
  }

  function finishCurrentSection() {
    stopTimer();

    var secData = testState.sections[testState.currentSection];
    // Mark unanswered questions
    while (secData.answers.length < secData.questions.length) {
      secData.answers.push({ questionIdx: secData.answers.length, selected: -1, correct: false });
    }

    // Show section interstitial
    var panel = dom.quizContent;
    panel.innerHTML = '';

    var inter = el('div', 'quiz-interstitial');
    var title = el('h2', 'quiz-inter-title', 'Sektion ' + (testState.currentSection + 1) + ' abgeschlossen');
    inter.appendChild(title);
    var secName = el('p', 'quiz-inter-name', secData.name);
    inter.appendChild(secName);

    var score = secData.score;
    var total = secData.questions.length;
    var pct = total > 0 ? Math.round(score / total * 100) : 0;
    var passed = pct >= 50;

    var scoreEl = el('div', 'quiz-inter-score' + (passed ? ' passed' : ' failed'));
    scoreEl.innerHTML = '<span class="score-big">' + score + ' / ' + total + '</span><span class="score-pct">' + pct + '%</span>';
    inter.appendChild(scoreEl);

    var statusEl = el('div', 'quiz-inter-status ' + (passed ? 'passed' : 'failed'), passed ? 'Bestanden' : 'Nicht bestanden');
    inter.appendChild(statusEl);

    if (testState.currentSection < testState.sections.length - 1) {
      var nextBtn = el('button', 'quiz-btn quiz-btn-next', 'Weiter zur nächsten Sektion');
      nextBtn.addEventListener('click', function () {
        startTestSection(testState.currentSection + 1);
      });
      inter.appendChild(nextBtn);
    } else {
      var resultBtn = el('button', 'quiz-btn quiz-btn-next', 'Ergebnisse anzeigen');
      resultBtn.addEventListener('click', showTestResults);
      inter.appendChild(resultBtn);
    }

    panel.appendChild(inter);
  }

  function showTestResults() {
    stopTimer();
    testState.active = false;

    var panel = dom.quizContent;
    panel.innerHTML = '';

    var results = el('div', 'quiz-results');
    var title = el('h2', 'quiz-results-title', 'Prüfungsergebnis — ' + testState.level);
    results.appendChild(title);

    var totalScore = 0, totalQuestions = 0;
    var allPassed = true;

    // Per-section breakdown
    var breakdown = el('div', 'quiz-results-breakdown');
    testState.sections.forEach(function (sec, idx) {
      var total = sec.questions.length;
      var score = sec.score;
      var pct = total > 0 ? Math.round(score / total * 100) : 0;
      var passed = pct >= 50;
      if (!passed) allPassed = false;
      totalScore += score;
      totalQuestions += total;

      var row = el('div', 'quiz-result-row');
      row.innerHTML =
        '<span class="result-section-name">Sektion ' + (idx + 1) + ': ' + sec.name + '</span>' +
        '<span class="result-score">' + score + '/' + total + '</span>' +
        '<span class="result-pct">' + pct + '%</span>' +
        '<span class="result-status ' + (passed ? 'passed' : 'failed') + '">' + (passed ? 'Bestanden' : 'Nicht best.') + '</span>';
      breakdown.appendChild(row);
    });
    results.appendChild(breakdown);

    var totalPct = totalQuestions > 0 ? Math.round(totalScore / totalQuestions * 100) : 0;

    // Overall
    var overall = el('div', 'quiz-results-overall' + (allPassed ? ' passed' : ' failed'));
    overall.innerHTML =
      '<div class="overall-score">' + totalScore + ' / ' + totalQuestions + ' (' + totalPct + '%)</div>' +
      '<div class="overall-status">' + (allPassed ? 'BESTANDEN' : 'NICHT BESTANDEN') + '</div>' +
      (allPassed ? '' : '<div class="overall-note">Mindestens 50% pro Sektion erforderlich</div>');
    results.appendChild(overall);

    // Detail review toggle
    var detailBtn = el('button', 'quiz-btn quiz-btn-reveal', 'Details ansehen');
    var detailDiv = el('div', 'quiz-review-detail hidden');
    detailBtn.addEventListener('click', function () {
      detailDiv.classList.toggle('hidden');
      detailBtn.textContent = detailDiv.classList.contains('hidden') ? 'Details ansehen' : 'Details ausblenden';
    });
    results.appendChild(detailBtn);

    // Build review
    testState.sections.forEach(function (sec, sIdx) {
      var secHeader = el('h3', 'quiz-review-section-header', 'Sektion ' + (sIdx + 1) + ': ' + sec.name);
      detailDiv.appendChild(secHeader);

      sec.questions.forEach(function (q, qIdx) {
        var ans = sec.answers[qIdx];
        var correct = ans && ans.correct;
        var item = el('div', 'quiz-review-item ' + (correct ? 'correct' : 'wrong'));
        item.innerHTML =
          '<span class="review-num">' + (qIdx + 1) + '.</span>' +
          '<span class="review-prompt">' + q.promptMain + '</span>' +
          '<span class="review-answer">' + (ans && ans.selected >= 0 ? q.choices[ans.selected] : '—') + '</span>' +
          (correct ? '' : '<span class="review-correct">' + q.choices[q.correctIndex] + '</span>');
        detailDiv.appendChild(item);
      });
    });
    results.appendChild(detailDiv);

    // Actions
    var actions = el('div', 'quiz-results-actions');
    var newBtn = el('button', 'quiz-btn quiz-btn-next', 'Neue Prüfung');
    newBtn.addEventListener('click', showTestSetup);
    actions.appendChild(newBtn);
    var homeBtn = el('button', 'quiz-btn quiz-btn-back', 'Zurück');
    homeBtn.addEventListener('click', showHomeScreen);
    actions.appendChild(homeBtn);
    results.appendChild(actions);

    panel.appendChild(results);
  }

  // ==========================================================
  // G2: MOCK TEST (JLPT PROBETEST) CONTROLLER
  // ==========================================================

  var mockState = {
    active: false,
    level: null,
    config: null,
    questions: [],          // flat array of all questions
    questionSections: [],   // parallel array: section key per question
    currentQuestion: 0,
    answers: [],            // { selected, correct } per question index
    timerInterval: null,
    endTime: 0
  };

  var MOCK_SECTION_LABELS = {
    vocab: 'Vokabeln',
    kanji: 'Kanji',
    grammar: 'Grammatik',
    conjugation: 'Konjugation'
  };

  function showMockTestSetup() {
    var panel = dom.quizContent;
    panel.innerHTML = '';

    var setup = el('div', 'quiz-test-setup');
    var title = el('h2', 'quiz-setup-title', 'JLPT Probetest');
    setup.appendChild(title);
    var desc = el('p', 'quiz-setup-desc', 'Simuliere eine JLPT-Pr\u00fcfung mit Zeitlimit. Ab 60% gilt der Test als bestanden.');
    setup.appendChild(desc);

    var levelGrid = el('div', 'quiz-test-level-grid');
    LEVELS.forEach(function (lv) {
      var cfg = MOCK_TEST_CONFIGS[lv];
      var card = el('div', 'quiz-test-level-card');
      var badge = el('div', 'quiz-test-level-badge ' + lv.toLowerCase(), lv);
      card.appendChild(badge);
      var info = el('div', 'quiz-test-level-info');
      info.innerHTML = '<span>' + cfg.totalQuestions + ' Fragen</span><span>' + cfg.time + ' Minuten</span>';
      card.appendChild(info);
      card.addEventListener('click', function () { startMockTest(lv); });
      levelGrid.appendChild(card);
    });
    setup.appendChild(levelGrid);

    var backBtn = el('button', 'quiz-btn quiz-btn-back', 'Zur\u00fcck');
    backBtn.addEventListener('click', showHomeScreen);
    setup.appendChild(backBtn);

    panel.appendChild(setup);
  }

  function startMockTest(level) {
    var cfg = MOCK_TEST_CONFIGS[level];
    if (!cfg) return;

    mockState.active = true;
    mockState.level = level;
    mockState.config = cfg;
    mockState.currentQuestion = 0;
    mockState.answers = [];
    mockState.questions = [];
    mockState.questionSections = [];

    // Generate questions per section
    var sectionKeys = ['vocab', 'kanji', 'grammar', 'conjugation'];
    for (var s = 0; s < sectionKeys.length; s++) {
      var secKey = sectionKeys[s];
      var secCfg = cfg.sections[secKey];
      for (var q = 0; q < secCfg.count; q++) {
        var typeId = secCfg.types[q % secCfg.types.length];
        var question = generateQuestion(typeId, level);
        // Fallback: try other types in the section
        if (!question) {
          for (var t = 0; t < secCfg.types.length; t++) {
            question = generateQuestion(secCfg.types[t], level);
            if (question) break;
          }
        }
        if (question) {
          mockState.questions.push(question);
          mockState.questionSections.push(secKey);
        }
      }
    }

    // Shuffle questions to mix sections
    var indices = [];
    for (var i = 0; i < mockState.questions.length; i++) indices.push(i);
    indices = shuffle(indices);
    var shuffledQ = [];
    var shuffledS = [];
    for (var j = 0; j < indices.length; j++) {
      shuffledQ.push(mockState.questions[indices[j]]);
      shuffledS.push(mockState.questionSections[indices[j]]);
    }
    mockState.questions = shuffledQ;
    mockState.questionSections = shuffledS;

    // Initialize answers
    mockState.answers = new Array(mockState.questions.length);
    for (var a = 0; a < mockState.answers.length; a++) {
      mockState.answers[a] = null;
    }

    // Start timer
    mockState.endTime = Date.now() + cfg.time * 60 * 1000;
    startMockTimer();

    renderMockQuestion();
  }

  function startMockTimer() {
    stopMockTimer();
    mockState.timerInterval = setInterval(function () {
      var remaining = Math.max(0, Math.ceil((mockState.endTime - Date.now()) / 1000));
      var timerEl = document.getElementById('mock-timer');
      if (timerEl) {
        timerEl.textContent = 'Verbleibende Zeit: ' + formatTime(remaining);
        timerEl.classList.toggle('warning', remaining <= 120 && remaining > 30);
        timerEl.classList.toggle('critical', remaining <= 30);
      }
      if (remaining <= 0) {
        finishMockTest();
      }
    }, 250);
  }

  function stopMockTimer() {
    if (mockState.timerInterval) {
      clearInterval(mockState.timerInterval);
      mockState.timerInterval = null;
    }
  }

  function renderMockQuestion() {
    var panel = dom.quizContent;
    panel.innerHTML = '';

    var qIdx = mockState.currentQuestion;

    if (qIdx >= mockState.questions.length) {
      finishMockTest();
      return;
    }

    var question = mockState.questions[qIdx];
    var secKey = mockState.questionSections[qIdx];

    // Header bar
    var header = el('div', 'quiz-test-header mock-test-header');
    var secLabel = el('span', 'quiz-test-section-label', 'JLPT Probetest \u2014 ' + mockState.level);
    header.appendChild(secLabel);
    var progress = el('span', 'quiz-test-progress', 'Frage ' + (qIdx + 1) + ' / ' + mockState.questions.length);
    header.appendChild(progress);
    var timer = el('span', 'quiz-timer mock-timer');
    timer.id = 'mock-timer';
    var remaining = Math.max(0, Math.ceil((mockState.endTime - Date.now()) / 1000));
    timer.textContent = 'Verbleibende Zeit: ' + formatTime(remaining);
    header.appendChild(timer);
    panel.appendChild(header);

    // Progress bar
    var progressBars = el('div', 'quiz-progress-bars');
    var qBar = el('div', 'quiz-progress-bar');
    var qFill = el('div', 'quiz-progress-fill');
    qFill.style.width = ((qIdx + 1) / mockState.questions.length * 100) + '%';
    qBar.appendChild(qFill);
    progressBars.appendChild(qBar);
    var tBar = el('div', 'quiz-progress-bar time');
    var tFill = el('div', 'quiz-progress-fill time');
    tFill.id = 'mock-time-bar';
    var totalSec = mockState.config.time * 60;
    var elapsed = totalSec - remaining;
    tFill.style.width = Math.min(100, (elapsed / totalSec) * 100) + '%';
    tBar.appendChild(tFill);
    progressBars.appendChild(tBar);
    panel.appendChild(progressBars);

    // Section badge
    var sectionBadge = el('div', 'mock-section-badge', MOCK_SECTION_LABELS[secKey] || secKey);
    panel.appendChild(sectionBadge);

    // Question card
    var questionArea = el('div', 'quiz-question-area');
    var parts = renderQuestionCard(question, questionArea);
    panel.appendChild(questionArea);

    renderChoiceButtons(question, parts.choicesDiv, function (idx) {
      showFeedback(parts.choicesDiv, idx, question.correctIndex);
      var correct = idx === question.correctIndex;
      mockState.answers[qIdx] = { selected: idx, correct: correct };

      if (correct && window.app) window.app.playPop();
      else if (window.app) window.app.playTick();

      if (parts.explDiv) {
        parts.explDiv.textContent = question.explanation;
        parts.explDiv.classList.remove('hidden');
      }

      // Auto-advance
      setTimeout(function () {
        mockState.currentQuestion++;
        renderMockQuestion();
      }, 800);
    });

    // Update time bar in mock timer loop
    var origInterval = mockState.timerInterval;
    // Patch timer to also update time bar
    stopMockTimer();
    mockState.timerInterval = setInterval(function () {
      var rem = Math.max(0, Math.ceil((mockState.endTime - Date.now()) / 1000));
      var timerEl = document.getElementById('mock-timer');
      if (timerEl) {
        timerEl.textContent = 'Verbleibende Zeit: ' + formatTime(rem);
        timerEl.classList.toggle('warning', rem <= 120 && rem > 30);
        timerEl.classList.toggle('critical', rem <= 30);
      }
      var timeBar = document.getElementById('mock-time-bar');
      if (timeBar) {
        var total = mockState.config.time * 60;
        var el2 = total - rem;
        timeBar.style.width = Math.min(100, (el2 / total) * 100) + '%';
      }
      if (rem <= 0) {
        finishMockTest();
      }
    }, 250);
  }

  function finishMockTest() {
    stopMockTimer();
    mockState.active = false;

    // Fill unanswered
    for (var i = 0; i < mockState.answers.length; i++) {
      if (!mockState.answers[i]) {
        mockState.answers[i] = { selected: -1, correct: false };
      }
    }

    showMockResults();
  }

  function showMockResults() {
    var panel = dom.quizContent;
    panel.innerHTML = '';

    var results = el('div', 'quiz-results mock-results');
    var title = el('h2', 'quiz-results-title', 'JLPT Probetest \u2014 ' + mockState.level);
    results.appendChild(title);

    // Calculate per-section scores
    var sectionScores = { vocab: { correct: 0, total: 0 }, kanji: { correct: 0, total: 0 }, grammar: { correct: 0, total: 0 }, conjugation: { correct: 0, total: 0 } };
    var totalCorrect = 0;
    var totalQuestions = mockState.questions.length;

    for (var i = 0; i < mockState.questions.length; i++) {
      var secKey = mockState.questionSections[i];
      var ans = mockState.answers[i];
      sectionScores[secKey].total++;
      if (ans && ans.correct) {
        sectionScores[secKey].correct++;
        totalCorrect++;
      }
    }

    var totalPct = totalQuestions > 0 ? Math.round(totalCorrect / totalQuestions * 100) : 0;
    var passed = totalPct >= 60;

    // Overall result
    var overall = el('div', 'quiz-results-overall mock-overall' + (passed ? ' passed' : ' failed'));
    overall.innerHTML =
      '<div class="overall-score">Ergebnis: ' + totalPct + '% \u2014 ' + (passed ? 'Bestanden' : 'Nicht bestanden') + '</div>' +
      '<div class="overall-status mock-status">' + totalCorrect + ' / ' + totalQuestions + ' richtig</div>';
    results.appendChild(overall);

    // Section breakdown
    var breakdown = el('div', 'quiz-results-breakdown mock-breakdown');
    var breakdownTitle = el('h3', 'mock-breakdown-title', 'Aufschl\u00fcsselung nach Bereich');
    breakdown.appendChild(breakdownTitle);

    var sectionKeys = ['vocab', 'kanji', 'grammar', 'conjugation'];
    for (var s = 0; s < sectionKeys.length; s++) {
      var key = sectionKeys[s];
      var sc = sectionScores[key];
      if (sc.total === 0) continue;
      var pct = Math.round(sc.correct / sc.total * 100);
      var row = el('div', 'quiz-result-row');
      row.innerHTML =
        '<span class="result-section-name">' + MOCK_SECTION_LABELS[key] + '</span>' +
        '<span class="result-score">' + sc.correct + ' / ' + sc.total + '</span>' +
        '<span class="result-pct">' + pct + '%</span>' +
        '<span class="result-status ' + (pct >= 60 ? 'passed' : 'failed') + '">' + (pct >= 60 ? '\u2713' : '\u2717') + '</span>';
      breakdown.appendChild(row);
    }
    results.appendChild(breakdown);

    // Summary line
    var summaryLine = el('p', 'mock-summary-line');
    var parts = [];
    for (var k = 0; k < sectionKeys.length; k++) {
      var ky = sectionKeys[k];
      var ssc = sectionScores[ky];
      if (ssc.total > 0) {
        parts.push(MOCK_SECTION_LABELS[ky] + ': ' + ssc.correct + '/' + ssc.total);
      }
    }
    summaryLine.textContent = parts.join(', ');
    results.appendChild(summaryLine);

    // Detail review
    var detailBtn = el('button', 'quiz-btn quiz-btn-reveal', 'Details ansehen');
    var detailDiv = el('div', 'quiz-review-detail hidden');
    detailBtn.addEventListener('click', function () {
      detailDiv.classList.toggle('hidden');
      detailBtn.textContent = detailDiv.classList.contains('hidden') ? 'Details ansehen' : 'Details ausblenden';
    });
    results.appendChild(detailBtn);

    mockState.questions.forEach(function (q, qIdx) {
      var ans = mockState.answers[qIdx];
      var correct = ans && ans.correct;
      var item = el('div', 'quiz-review-item ' + (correct ? 'correct' : 'wrong'));
      item.innerHTML =
        '<span class="review-num">' + (qIdx + 1) + '.</span>' +
        '<span class="review-prompt">' + q.promptMain + '</span>' +
        '<span class="review-answer">' + (ans && ans.selected >= 0 ? q.choices[ans.selected] : '\u2014') + '</span>' +
        (correct ? '' : '<span class="review-correct">' + q.choices[q.correctIndex] + '</span>');
      detailDiv.appendChild(item);
    });
    results.appendChild(detailDiv);

    // Actions
    var actions = el('div', 'quiz-results-actions');
    var newBtn = el('button', 'quiz-btn quiz-btn-next', 'Neuer Probetest');
    newBtn.addEventListener('click', showMockTestSetup);
    actions.appendChild(newBtn);
    var homeBtn = el('button', 'quiz-btn quiz-btn-back', 'Zur\u00fcck');
    homeBtn.addEventListener('click', showHomeScreen);
    actions.appendChild(homeBtn);
    results.appendChild(actions);

    panel.appendChild(results);
  }

  // ==========================================================
  // H: HOME SCREEN
  // ==========================================================

  function showHomeScreen() {
    stopTimer();
    stopMockTimer();
    testState.active = false;
    mockState.active = false;

    var panel = dom.quizContent;
    panel.innerHTML = '';

    var home = el('div', 'quiz-home');

    var title = el('h2', 'quiz-home-title', 'Quiz & Test');
    home.appendChild(title);
    var desc = el('p', 'quiz-home-desc', 'Teste dein Wissen mit über 20.000 möglichen Fragen aus allen Bereichen.');
    home.appendChild(desc);

    var cards = el('div', 'quiz-home-cards');

    // Browse card
    var browseCard = el('div', 'quiz-home-card browse');
    browseCard.innerHTML =
      '<div class="quiz-card-icon">\u7DF4</div>' +
      '<h3>Übungsmodus</h3>' +
      '<p>Frei üben nach Fragetyp und Level. Kein Timer, kein Scoring.</p>';
    browseCard.addEventListener('click', initBrowseMode);
    cards.appendChild(browseCard);

    // Test card
    var testCard = el('div', 'quiz-home-card test');
    testCard.innerHTML =
      '<div class="quiz-card-icon">\u8A66</div>' +
      '<h3>Pr\u00fcfungsmodus</h3>' +
      '<p>Simulierte JLPT-Pr\u00fcfung mit Timer, Sektionen und Auswertung.</p>';
    testCard.addEventListener('click', showTestSetup);
    cards.appendChild(testCard);

    // Mock test card (JLPT Probetest)
    var mockCard = el('div', 'quiz-home-card mock');
    mockCard.innerHTML =
      '<div class="quiz-card-icon">\u6A21</div>' +
      '<h3>JLPT Probetest</h3>' +
      '<p>Kompakter Probetest im JLPT-Format mit Zeitlimit und Bestanden/Nicht-bestanden-Wertung.</p>';
    mockCard.addEventListener('click', showMockTestSetup);
    cards.appendChild(mockCard);

    home.appendChild(cards);
    panel.appendChild(home);
  }

  // ==========================================================
  // I: KEYBOARD HANDLER
  // ==========================================================

  function handleQuizKey(e) {
    if (!dom.quizPanel || dom.quizPanel.classList.contains('hidden')) return false;

    // Number keys 1-4 select choices
    var num = parseInt(e.key);
    if (num >= 1 && num <= 4) {
      var btns = dom.quizContent.querySelectorAll('.quiz-choice-btn:not([disabled])');
      if (btns.length >= num) {
        btns[num - 1].click();
        e.preventDefault();
        return true;
      }
    }

    // Enter to reveal/advance in browse mode
    if (e.key === 'Enter') {
      if (!testState.active) {
        var revealBtn = document.getElementById('quiz-reveal-btn');
        var nextBtn = document.getElementById('quiz-next-btn');
        if (revealBtn && !revealBtn.classList.contains('hidden')) {
          revealBtn.click();
          e.preventDefault();
          return true;
        }
        if (nextBtn && !nextBtn.classList.contains('hidden')) {
          nextBtn.click();
          e.preventDefault();
          return true;
        }
      }
    }

    // Escape to go back
    if (e.key === 'Escape') {
      if (mockState.active) {
        if (confirm('Probetest wirklich abbrechen?')) {
          stopMockTimer();
          mockState.active = false;
          showHomeScreen();
        }
        e.preventDefault();
        return true;
      }
      if (testState.active) {
        if (confirm('Pr\u00fcfung wirklich abbrechen?')) {
          stopTimer();
          testState.active = false;
          showHomeScreen();
        }
        e.preventDefault();
        return true;
      }
    }

    return false;
  }

  // ==========================================================
  // J: INIT & EXPORT
  // ==========================================================

  function onTabActivate() {
    if (!dom.quizContent) {
      dom.quizPanel = document.getElementById('quiz-tab');
      dom.quizContent = document.getElementById('quiz-content');
    }
    if (!dom.quizContent) return;
    // Show home screen if not in active test
    if (!testState.active && !mockState.active) {
      showHomeScreen();
    }
  }

  window.QuizModule = {
    onTabActivate: onTabActivate,
    handleKey: handleQuizKey,
    isTestActive: function () { return testState.active || mockState.active; }
  };
})();
