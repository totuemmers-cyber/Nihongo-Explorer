// ============================================================
// Review UI and SRS Card Registry for Nihongo Explorer
// ============================================================
(function () {
  'use strict';

  var initialized = false;
  var panel = null;
  var queue = [];
  var currentCard = null;
  var revealed = false;
  var detailRefreshCallbacks = {};

  var PROMPT_LABELS = {
    meaning: 'Bedeutung',
    reading: 'Lesung',
    reverse: 'Aktive Erinnerung',
    context: 'Kontext',
    radical: 'Radikal',
    formation: 'Bildung',
    cloze: 'Lueckentext',
    conjugation: 'Konjugation',
    question: 'Fragewort',
    countForms: 'Zaehlen',
    usage: 'Verwendung'
  };

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  function escapeText(value) {
    return String(value || '');
  }

  function hasKanji(text) {
    return /[\u3400-\u9faf]/.test(text || '');
  }

  function normalizeKeyText(value) {
    return String(value || '').trim().replace(/\s+/g, ' ');
  }

  function getItemKey(sectionName, item) {
    if (!item) return sectionName + ':unknown';
    if (sectionName === 'kanji') return 'kanji:' + item.kanji;
    if (sectionName === 'vocab') return 'vocab:' + (item.source || 'vocab') + ':' + normalizeKeyText(item.word) + '|' + normalizeKeyText(item.reading);
    if (sectionName === 'grammar') return 'grammar:' + (item.id || (item.level + '|' + item.pattern));
    if (sectionName === 'counters') return 'counter:' + (item.id || (item.kanji + '|' + item.reading));
    if (sectionName === 'onomatopoeia') return 'onomatopoeia:' + normalizeKeyText(item.word) + '|' + normalizeKeyText(item.reading);
    return sectionName + ':' + normalizeKeyText(item.id || item.word || item.kanji || item.pattern || item.reading);
  }

  function makeCardSpec(sectionName, item, promptType, label, question) {
    var itemKey = getItemKey(sectionName, item);
    var level = item.level || item.jlpt || '';
    var itemLabel = item.word || item.kanji || item.pattern || item.reading || '';
    return {
      cardKey: itemKey + '#' + promptType,
      itemKey: itemKey,
      section: sectionName,
      promptType: promptType,
      label: label || PROMPT_LABELS[promptType] || promptType,
      level: level,
      itemLabel: itemLabel,
      question: question
    };
  }

  function firstExample(item) {
    if (!item || !item.examples || !item.examples.length) return null;
    for (var i = 0; i < item.examples.length; i++) {
      if (item.examples[i] && (item.examples[i].japanese || item.examples[i].jp)) return item.examples[i];
    }
    return item.examples[0];
  }

  function getVocabSpecs(item) {
    var specs = [];
    specs.push(makeCardSpec('vocab', item, 'meaning', 'Bedeutung', {
      prompt: 'Was bedeutet dieses Wort?',
      promptMain: item.word,
      promptSub: item.reading || '',
      answer: item.meaning || '',
      extra: item.romaji || '',
      typeLabel: 'Vokabel'
    }));

    if (item.reading && item.word && item.word !== item.reading && hasKanji(item.word)) {
      specs.push(makeCardSpec('vocab', item, 'reading', 'Lesung', {
        prompt: 'Wie liest man dieses Wort?',
        promptMain: item.word,
        promptSub: item.meaning || '',
        answer: item.reading,
        extra: item.romaji || '',
        speechText: item.reading,
        typeLabel: 'Vokabel'
      }));
    }

    specs.push(makeCardSpec('vocab', item, 'reverse', 'Aktive Erinnerung', {
      prompt: 'Welches japanische Wort passt?',
      promptMain: item.meaning || '',
      promptSub: '',
      answer: item.word + (item.reading && item.reading !== item.word ? ' (' + item.reading + ')' : ''),
      extra: item.romaji || '',
      speechText: item.reading || item.word,
      typeLabel: 'Vokabel'
    }));

    var ex = firstExample(item);
    if (ex && ex.japanese && item.word && ex.japanese.indexOf(item.word) !== -1) {
      specs.push(makeCardSpec('vocab', item, 'context', 'Kontext', {
        prompt: 'Welches Wort passt in die Luecke?',
        promptMain: ex.japanese.split(item.word).join('___'),
        promptSub: ex.german || '',
        answer: item.word + (item.reading ? ' (' + item.reading + ')' : ''),
        extra: item.meaning || '',
        speechText: ex.japanese,
        typeLabel: 'Kontext'
      }));
    }

    var conj = window.resolveVocabVerbConjugation ? window.resolveVocabVerbConjugation(item) : null;
    if (conj && conj.result && conj.result.forms) {
      specs.push(makeCardSpec('vocab', item, 'conjugation', 'Konjugation', {
        prompt: 'Bilde eine wichtige Verbform.',
        promptMain: item.word || item.reading,
        promptSub: item.meaning || '',
        answer: buildConjugationAnswer(conj.result.forms),
        extra: conj.result.groupLabel || '',
        speechText: item.reading || item.word,
        typeLabel: 'Konjugation'
      }));
    }

    return specs;
  }

  function buildConjugationAnswer(forms) {
    var keys = ['polite', 'negative', 'past', 'te', 'potential'];
    var lines = [];
    for (var i = 0; i < keys.length; i++) {
      var f = forms[keys[i]];
      if (f) lines.push(f.label + ': ' + f.japanese);
    }
    return lines.join('\n');
  }

  function getKanjiSpecs(item) {
    var specs = [];
    specs.push(makeCardSpec('kanji', item, 'meaning', 'Bedeutung', {
      prompt: 'Was bedeutet dieses Kanji?',
      promptMain: item.kanji,
      promptSub: (item.strokes ? item.strokes + ' Striche' : ''),
      answer: (item.meanings || []).join(', '),
      extra: 'JLPT ' + (item.jlpt || ''),
      typeLabel: 'Kanji'
    }));
    specs.push(makeCardSpec('kanji', item, 'reading', 'Lesung', {
      prompt: 'Welche wichtigen Lesungen hat dieses Kanji?',
      promptMain: item.kanji,
      promptSub: (item.meanings || []).join(', '),
      answer: formatKanjiReadings(item),
      extra: '',
      speechText: item.kanji,
      typeLabel: 'Kanji'
    }));
    if (item.components && item.components.length) {
      specs.push(makeCardSpec('kanji', item, 'radical', 'Radikal', {
        prompt: 'Welches Haupt-Radikal oder welche Komponente gehoert dazu?',
        promptMain: item.kanji,
        promptSub: (item.meanings || []).join(', '),
        answer: formatComponents(item.components),
        extra: '',
        typeLabel: 'Kanji'
      }));
    }
    return specs;
  }

  function formatKanjiReadings(item) {
    var kun = (item.kun || []).map(function (r) { return r.kana; }).filter(Boolean).join(', ');
    var on = (item.on || []).map(function (r) { return r.kana; }).filter(Boolean).join(', ');
    return 'Kun: ' + (kun || '-') + '\nOn: ' + (on || '-');
  }

  function formatComponents(components) {
    return components.map(function (c) {
      return c.radical + (c.meaning ? ' - ' + c.meaning : '');
    }).join('\n');
  }

  function getGrammarSpecs(item) {
    var specs = [];
    specs.push(makeCardSpec('grammar', item, 'meaning', 'Bedeutung', {
      prompt: 'Was bedeutet dieses Grammatikmuster?',
      promptMain: item.pattern,
      promptSub: item.category || '',
      answer: item.meaning || '',
      extra: item.explanation || '',
      typeLabel: 'Grammatik'
    }));
    if (item.formation) {
      specs.push(makeCardSpec('grammar', item, 'formation', 'Bildung', {
        prompt: 'Wie wird dieses Muster gebildet?',
        promptMain: item.pattern,
        promptSub: item.meaning || '',
        answer: item.formation,
        extra: item.notes || '',
        typeLabel: 'Grammatik'
      }));
    }
    var ex = firstExample(item);
    if (ex && ex.japanese) {
      specs.push(makeCardSpec('grammar', item, 'cloze', 'Lueckentext', {
        prompt: 'Welche Grammatikstruktur passt in die Luecke?',
        promptMain: buildGrammarCloze(ex.japanese, item.pattern),
        promptSub: ex.german || '',
        answer: item.pattern,
        extra: ex.japanese,
        speechText: ex.japanese,
        typeLabel: 'Grammatik'
      }));
    }
    return specs;
  }

  function buildGrammarCloze(sentence, pattern) {
    var variants = String(pattern || '').split(/[\/\uff0f]/).map(function (value) {
      return value.replace(/[\uff5e~]/g, '').replace(/\s+/g, '').trim();
    }).filter(Boolean);
    for (var i = 0; i < variants.length; i++) {
      if (sentence.indexOf(variants[i]) !== -1) return sentence.replace(variants[i], '___');
    }
    return sentence;
  }

  function getCounterSpecs(item) {
    var specs = [];
    specs.push(makeCardSpec('counters', item, 'meaning', 'Bedeutung', {
      prompt: 'Wofuer verwendet man dieses Zaehlwort?',
      promptMain: item.kanji,
      promptSub: item.reading || '',
      answer: item.meaning || '',
      extra: item.usage || '',
      speechText: item.reading || item.kanji,
      typeLabel: 'Zaehlwort'
    }));
    if (item.questionWord) {
      specs.push(makeCardSpec('counters', item, 'question', 'Fragewort', {
        prompt: 'Wie fragt man nach der Anzahl?',
        promptMain: item.meaning || item.usage || item.kanji,
        promptSub: item.kanji + ' (' + (item.reading || '') + ')',
        answer: item.questionWord.kanji + ' / ' + item.questionWord.reading,
        extra: item.questionWord.romaji || '',
        speechText: item.questionWord.reading,
        typeLabel: 'Zaehlwort'
      }));
    }
    if (item.counts && item.counts.length) {
      specs.push(makeCardSpec('counters', item, 'countForms', 'Zaehlen', {
        prompt: 'Nenne wichtige Formen von 1 bis 10.',
        promptMain: item.kanji,
        promptSub: item.meaning || '',
        answer: item.counts.map(function (c) { return c.num + ': ' + c.kanji + ' (' + c.reading + ')'; }).join('\n'),
        extra: item.specialCounts && item.specialCounts.length ? 'Sonderformen vorhanden' : '',
        typeLabel: 'Zaehlwort'
      }));
    }
    return specs;
  }

  function getOnomatopoeiaSpecs(item) {
    var specs = [];
    specs.push(makeCardSpec('onomatopoeia', item, 'meaning', 'Bedeutung', {
      prompt: 'Was bedeutet diese Lautmalerei?',
      promptMain: item.word,
      promptSub: item.reading || '',
      answer: item.meaning || '',
      extra: item.explanation || '',
      speechText: item.reading || item.word,
      typeLabel: 'Lautmalerei'
    }));
    specs.push(makeCardSpec('onomatopoeia', item, 'usage', 'Verwendung', {
      prompt: 'Wie wird dieser Ausdruck verwendet?',
      promptMain: item.word,
      promptSub: item.meaning || '',
      answer: item.usage || item.explanation || '',
      extra: item.notes || '',
      speechText: item.reading || item.word,
      typeLabel: 'Lautmalerei'
    }));
    return specs;
  }

  function getCardSpecs(sectionName, item) {
    if (sectionName === 'vocab') return getVocabSpecs(item);
    if (sectionName === 'kanji') return getKanjiSpecs(item);
    if (sectionName === 'grammar') return getGrammarSpecs(item);
    if (sectionName === 'counters') return getCounterSpecs(item);
    if (sectionName === 'onomatopoeia') return getOnomatopoeiaSpecs(item);
    return [];
  }

  function addItem(sectionName, item) {
    var specs = getCardSpecs(sectionName, item);
    return window.SRSStore.getCardsByItem(getItemKey(sectionName, item)).then(function (existing) {
      var byKey = {};
      existing.forEach(function (card) { byKey[card.cardKey] = card; });
      var cards = specs.map(function (spec) {
        return byKey[spec.cardKey] || window.SRSScheduler.createCard(spec);
      });
      return window.SRSStore.putCards(cards).then(function () {
        notifyDetailRefresh(getItemKey(sectionName, item));
        return cards;
      });
    });
  }

  function getItemStatus(sectionName, item) {
    return window.SRSStore.getCardsByItem(getItemKey(sectionName, item)).then(function (cards) {
      return window.SRSScheduler.getStatus(cards);
    });
  }

  function mountDetailControl(headerSelector, sectionName, item) {
    var header = document.querySelector(headerSelector);
    if (!header) return;
    var old = header.querySelector('.srs-detail-control');
    if (old) old.remove();

    var itemKey = getItemKey(sectionName, item);
    var btn = el('button', 'srs-detail-control srs-status-loading', 'Review');
    btn.type = 'button';
    header.appendChild(btn);

    detailRefreshCallbacks[itemKey] = function () {
      refreshDetailButton(btn, sectionName, item);
    };
    refreshDetailButton(btn, sectionName, item);

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (btn.getAttribute('data-in-review') === 'true') {
        showDetailPopover(btn, sectionName, item);
        return;
      }
      btn.disabled = true;
      addItem(sectionName, item).then(function () {
        btn.disabled = false;
        showDetailPopover(btn, sectionName, item);
        if (window.app) window.app.playPop();
      }).catch(function () {
        btn.disabled = false;
      });
    });
  }

  function refreshDetailButton(btn, sectionName, item) {
    getItemStatus(sectionName, item).then(function (status) {
      btn.className = 'srs-detail-control srs-status-' + status.className;
      btn.textContent = status.label === 'Not in Review' ? 'Add to Review' : 'Review: ' + status.label;
      btn.setAttribute('data-in-review', status.label === 'Not in Review' ? 'false' : 'true');
    }).catch(function () {
      btn.className = 'srs-detail-control srs-status-error';
      btn.textContent = 'Review unavailable';
    });
  }

  function notifyDetailRefresh(itemKey) {
    if (detailRefreshCallbacks[itemKey]) detailRefreshCallbacks[itemKey]();
    updateReviewBadge();
  }

  function showDetailPopover(anchor, sectionName, item) {
    var old = document.querySelector('.srs-popover');
    if (old) old.remove();
    var pop = el('div', 'srs-popover');
    pop.appendChild(el('div', 'srs-popover-title', 'Review status'));
    pop.appendChild(el('div', 'srs-popover-line', 'Loading...'));
    document.body.appendChild(pop);

    var rect = anchor.getBoundingClientRect();
    pop.style.top = Math.max(8, rect.bottom + window.scrollY + 8) + 'px';
    pop.style.left = Math.max(8, rect.left + window.scrollX - 120) + 'px';

    window.SRSStore.getCardsByItem(getItemKey(sectionName, item)).then(function (cards) {
      pop.innerHTML = '';
      pop.appendChild(el('div', 'srs-popover-title', 'Review status'));
      if (!cards.length) {
        pop.appendChild(el('div', 'srs-popover-line', 'Not in Review'));
        return;
      }
      cards.forEach(function (card) {
        var line = el('div', 'srs-popover-line');
        line.textContent = card.label + ': ' + card.state + formatDue(card);
        pop.appendChild(line);
      });
      var actions = el('div', 'srs-popover-actions');
      var reviewNow = el('button', 'srs-small-btn', 'Review now');
      reviewNow.addEventListener('click', function () {
        pop.remove();
        if (window.app) window.app.switchTab('review');
        loadQueue(cards, true);
      });
      actions.appendChild(reviewNow);
      pop.appendChild(actions);
    });

    setTimeout(function () {
      document.addEventListener('click', close, { once: true });
    }, 0);

    function close(e) {
      if (!pop.contains(e.target) && e.target !== anchor) pop.remove();
    }
  }

  function formatDue(card) {
    if (card.suspended) return ' (suspended)';
    if (!card.dueAt) return '';
    var due = new Date(card.dueAt).getTime();
    if (due <= Date.now()) return ' (due)';
    return ' (next: ' + new Date(card.dueAt).toLocaleDateString() + ')';
  }

  function onTabActivate() {
    ensurePanel();
    init().then(renderHome);
  }

  function init() {
    if (initialized) return Promise.resolve();
    initialized = true;
    return window.SRSStore.init().then(function () {
      if (navigator.storage && navigator.storage.persist) {
        navigator.storage.persist().catch(function () {});
      }
      updateReviewBadge();
    });
  }

  function ensurePanel() {
    panel = document.getElementById('review-content');
    return panel;
  }

  function renderHome() {
    if (!ensurePanel()) return;
    panel.innerHTML = '';
    var shell = el('div', 'review-shell');
    var header = el('div', 'review-header');
    header.appendChild(el('div', 'review-title', 'Review'));
    header.appendChild(el('div', 'review-subtitle', 'Spaced repetition for due, weak, and new cards.'));
    shell.appendChild(header);

    Promise.all([window.SRSStore.getAllCards(), window.SRSStore.getBackupStatus()]).then(function (parts) {
      var cards = parts[0];
      var backup = parts[1];
      var dueCards = cards.filter(function (card) { return window.SRSScheduler.isDue(card); });
      var activeCards = cards.filter(function (card) { return !card.suspended; });
      var weakCards = activeCards.filter(function (card) { return (card.lapses || 0) > 0 || card.state === 'Relearning'; });

      var stats = el('div', 'review-stats');
      stats.appendChild(statCard('Due', dueCards.length));
      stats.appendChild(statCard('Active cards', activeCards.length));
      stats.appendChild(statCard('Weak', weakCards.length));
      stats.appendChild(statCard('Backup', backup.label));
      shell.appendChild(stats);

      var actions = el('div', 'review-actions');
      var startBtn = el('button', 'quiz-btn quiz-btn-next', dueCards.length ? 'Review due cards' : 'No cards due');
      startBtn.disabled = dueCards.length === 0;
      startBtn.addEventListener('click', function () { loadQueue(dueCards); });
      actions.appendChild(startBtn);

      var allBtn = el('button', 'quiz-btn quiz-btn-reveal', 'Study all active');
      allBtn.disabled = activeCards.length === 0;
      allBtn.addEventListener('click', function () { loadQueue(activeCards, true); });
      actions.appendChild(allBtn);

      var settingsBtn = el('button', 'quiz-btn quiz-btn-back', 'Backup & settings');
      settingsBtn.addEventListener('click', renderSettings);
      actions.appendChild(settingsBtn);
      shell.appendChild(actions);

      var hint = el('div', 'review-empty-hint');
      hint.textContent = activeCards.length
        ? 'Add more cards from detail pages, or review weak/due cards here.'
        : 'Open a vocab, kanji, grammar, counter, or onomatopoeia detail page and choose Add to Review.';
      shell.appendChild(hint);
    });

    panel.appendChild(shell);
  }

  function statCard(label, value) {
    var card = el('div', 'review-stat');
    card.appendChild(el('span', 'review-stat-value', value));
    card.appendChild(el('span', 'review-stat-label', label));
    return card;
  }

  function loadQueue(cards, includeNotDue) {
    init().then(function () {
      var selected = includeNotDue ? cards.slice() : cards.filter(function (card) {
        return window.SRSScheduler.isDue(card);
      });
      queue = window.SRSScheduler.sortQueue(selected);
      currentCard = null;
      revealed = false;
      renderNextReview();
    });
  }

  function renderNextReview() {
    if (!ensurePanel()) return;
    if (!queue.length) {
      updateReviewBadge();
      renderHome();
      return;
    }
    currentCard = queue.shift();
    revealed = false;
    panel.innerHTML = '';

    var wrap = el('div', 'review-card-wrap');
    var meta = el('div', 'quiz-badges');
    meta.appendChild(el('span', 'quiz-type-badge', currentCard.label || currentCard.promptType));
    if (currentCard.level) meta.appendChild(el('span', 'quiz-level-badge ' + String(currentCard.level).toLowerCase(), currentCard.level));
    wrap.appendChild(meta);

    var q = currentCard.question || {};
    wrap.appendChild(el('p', 'quiz-prompt', q.prompt || 'Review this card'));
    if (q.promptMain) {
      var main = el('div', 'quiz-prompt-main' + (/[\u3000-\u9faf\u3040-\u30ff\uff00-\uff9f]/.test(q.promptMain) ? ' jp' : ''), q.promptMain);
      wrap.appendChild(main);
    }
    if (q.promptSub) wrap.appendChild(el('p', 'quiz-prompt-sub', q.promptSub));

    var answer = el('div', 'review-answer hidden');
    appendAnswer(answer, q);
    wrap.appendChild(answer);

    var actions = el('div', 'quiz-browse-actions');
    var revealBtn = el('button', 'quiz-btn quiz-btn-reveal', 'Show answer');
    revealBtn.addEventListener('click', function () {
      revealed = true;
      answer.classList.remove('hidden');
      revealBtn.classList.add('hidden');
      gradeRow.classList.remove('hidden');
      if (q.speechText && window.app) window.app.speakJP(q.speechText);
    });
    actions.appendChild(revealBtn);

    var gradeRow = el('div', 'review-grade-row hidden');
    ['Again', 'Hard', 'Good', 'Easy'].forEach(function (grade) {
      var btn = el('button', 'review-grade-btn grade-' + grade.toLowerCase(), grade);
      btn.addEventListener('click', function () { gradeCurrentCard(grade); });
      gradeRow.appendChild(btn);
    });
    actions.appendChild(gradeRow);

    var backBtn = el('button', 'quiz-btn quiz-btn-back', 'Back');
    backBtn.addEventListener('click', renderHome);
    actions.appendChild(backBtn);
    wrap.appendChild(actions);

    panel.appendChild(wrap);
  }

  function appendAnswer(container, q) {
    container.appendChild(el('div', 'review-answer-label', 'Answer'));
    String(q.answer || '').split('\n').forEach(function (line) {
      container.appendChild(el('div', 'review-answer-main', line));
    });
    if (q.extra) container.appendChild(el('div', 'review-answer-extra', q.extra));
    if (q.speechText) {
      var speak = el('button', 'srs-small-btn', 'Play audio');
      speak.addEventListener('click', function () {
        if (window.app) window.app.speakJP(q.speechText);
      });
      container.appendChild(speak);
    }
  }

  function gradeCurrentCard(grade) {
    if (!currentCard) return;
    var previous = currentCard;
    var next = window.SRSScheduler.applyGrade(previous, grade);
    var event = window.SRSScheduler.makeReviewEvent(next, previous, grade);
    window.SRSStore.putCards([next]).then(function () {
      return window.SRSStore.addEvent(event);
    }).then(function () {
      notifyDetailRefresh(next.itemKey);
      if (window.app) {
        if (grade === 'Again') window.app.playTick();
        else window.app.playPop();
      }
      renderNextReview();
    });
  }

  function renderSettings() {
    if (!ensurePanel()) return;
    panel.innerHTML = '';
    var shell = el('div', 'review-shell');
    shell.appendChild(el('div', 'review-title', 'Backup & settings'));

    var backupBox = el('div', 'review-settings-box');
    backupBox.appendChild(el('h3', null, 'Backup'));
    var status = el('div', 'review-backup-status', 'Checking backup status...');
    backupBox.appendChild(status);

    var connect = el('button', 'quiz-btn quiz-btn-next', 'Connect automatic backup file');
    connect.addEventListener('click', function () {
      status.textContent = 'Connecting...';
      window.SRSStore.connectBackupFile().then(function () {
        status.textContent = 'Automatic backup file connected and saved.';
      }).catch(function (err) {
        status.textContent = err.message || 'Automatic backup could not be connected.';
      });
    });
    backupBox.appendChild(connect);

    var exportBtn = el('button', 'quiz-btn quiz-btn-reveal', 'Export backup now');
    exportBtn.addEventListener('click', function () {
      window.SRSStore.downloadBackup();
    });
    backupBox.appendChild(exportBtn);

    var importLabel = el('label', 'quiz-btn quiz-btn-back', 'Import backup');
    var importInput = document.createElement('input');
    importInput.type = 'file';
    importInput.accept = 'application/json,.json';
    importInput.className = 'hidden';
    importInput.addEventListener('change', function () {
      var file = importInput.files && importInput.files[0];
      if (!file) return;
      status.textContent = 'Importing...';
      window.SRSStore.readBackupFile(file).then(function (data) {
        return window.SRSStore.importData(data, 'merge');
      }).then(function () {
        status.textContent = 'Backup imported and merged.';
        updateReviewBadge();
      }).catch(function (err) {
        status.textContent = err.message || 'Import failed.';
      });
    });
    importLabel.appendChild(importInput);
    backupBox.appendChild(importLabel);

    shell.appendChild(backupBox);

    var back = el('button', 'quiz-btn quiz-btn-back', 'Back to Review');
    back.addEventListener('click', renderHome);
    shell.appendChild(back);
    panel.appendChild(shell);

    window.SRSStore.getBackupStatus().then(function (backup) {
      status.textContent = backup.label;
      connect.disabled = backup.mode === 'manual';
    });
  }

  function updateReviewBadge() {
    var badge = document.getElementById('review-due-badge');
    if (!badge || !window.SRSStore || !window.SRSScheduler) return;
    window.SRSStore.getAllCards().then(function (cards) {
      var due = cards.filter(function (card) { return window.SRSScheduler.isDue(card); }).length;
      badge.textContent = due > 0 ? String(due) : '';
      badge.classList.toggle('hidden', due === 0);
      if (window.app && window.app.activeTab === 'review') window.app.updateCount();
    }).catch(function () {});
  }

  function getDueCount() {
    return window.SRSStore.getAllCards().then(function (cards) {
      return cards.filter(function (card) { return window.SRSScheduler.isDue(card); }).length;
    });
  }

  window.SRSUI = {
    onTabActivate: onTabActivate,
    addItem: addItem,
    getItemStatus: getItemStatus,
    mountDetailControl: mountDetailControl,
    getItemKey: getItemKey,
    getCardSpecs: getCardSpecs,
    updateReviewBadge: updateReviewBadge,
    getDueCount: getDueCount,
    _test: {
      makeCardSpec: makeCardSpec,
      buildGrammarCloze: buildGrammarCloze
    }
  };
})();
