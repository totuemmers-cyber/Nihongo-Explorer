// ============================================================
// Review UI and SRS Card Registry for Nihongo Explorer
// ============================================================
(function () {
  'use strict';

  var initialized = false;
  var panel = null;
  var queue = [];
  var currentCard = null;
  var lastGrade = null;        // one-level undo snapshot (cleared per session/screen flow)
  var revealed = false;
  var answerMode = 'reveal';   // 'reveal' = self-grade; 'type' = typed answer + checking
  var autoSuspendLeeches = false; // auto-suspend chronic-fail cards on "Again"
  var session = null;          // per-session tally for the end-of-session summary
  var detailRefreshCallbacks = {};

  var STATE_LABELS = {
    New: 'Neu',
    Learning: 'Lernen',
    Relearning: 'Wiederlernen',
    Review: 'Wiederholung',
    Mature: 'Gefestigt',
    Mastered: 'Gemeistert'
  };

  var GRADE_LABELS = {
    Again: 'Nochmal',
    Hard: 'Schwer',
    Good: 'Gut',
    Easy: 'Leicht'
  };

  var PROMPT_LABELS = {
    meaning: 'Bedeutung',
    reading: 'Lesung',
    reverse: 'Aktive Erinnerung',
    context: 'Kontext',
    radical: 'Radikal',
    formation: 'Bildung',
    cloze: 'Lückentext',
    conjugation: 'Konjugation',
    question: 'Fragewort',
    countForms: 'Zählen',
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
        prompt: 'Welches Wort passt in die Lücke?',
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
        prompt: 'Welches Haupt-Radikal oder welche Komponente gehört dazu?',
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
      specs.push(makeCardSpec('grammar', item, 'cloze', 'Lückentext', {
        prompt: 'Welche Grammatikstruktur passt in die Lücke?',
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
      prompt: 'Wofür verwendet man dieses Zählwort?',
      promptMain: item.kanji,
      promptSub: item.reading || '',
      answer: item.meaning || '',
      extra: item.usage || '',
      speechText: item.reading || item.kanji,
      typeLabel: 'Zählwort'
    }));
    if (item.questionWord) {
      specs.push(makeCardSpec('counters', item, 'question', 'Fragewort', {
        prompt: 'Wie fragt man nach der Anzahl?',
        promptMain: item.meaning || item.usage || item.kanji,
        promptSub: item.kanji + ' (' + (item.reading || '') + ')',
        answer: item.questionWord.kanji + ' / ' + item.questionWord.reading,
        extra: item.questionWord.romaji || '',
        speechText: item.questionWord.reading,
        typeLabel: 'Zählwort'
      }));
    }
    if (item.counts && item.counts.length) {
      specs.push(makeCardSpec('counters', item, 'countForms', 'Zählen', {
        prompt: 'Nenne wichtige Formen von 1 bis 10.',
        promptMain: item.kanji,
        promptSub: item.meaning || '',
        answer: item.counts.map(function (c) { return c.num + ': ' + c.kanji + ' (' + c.reading + ')'; }).join('\n'),
        extra: item.specialCounts && item.specialCounts.length ? 'Sonderformen vorhanden' : '',
        typeLabel: 'Zählwort'
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

  // Each new sibling card unlocks one day after the previous one, so adding a
  // single item (which expands into several cards) doesn't flood the queue. The
  // first/primary card (e.g. "Bedeutung") is always ready immediately.
  var SIBLING_STAGGER_DAYS = 1;

  function addItem(sectionName, item) {
    var specs = getCardSpecs(sectionName, item);
    return window.SRSStore.getCardsByItem(getItemKey(sectionName, item)).then(function (existing) {
      var byKey = {};
      existing.forEach(function (card) { byKey[card.cardKey] = card; });
      var dayMs = (window.SRSScheduler.constants && window.SRSScheduler.constants.DAY_MS) || 86400000;
      var now = Date.now();
      var created = 0;
      var cards = specs.map(function (spec) {
        if (byKey[spec.cardKey]) return byKey[spec.cardKey];
        var card = window.SRSScheduler.createCard(spec, now);
        if (created > 0) {
          card.dueAt = new Date(now + created * SIBLING_STAGGER_DAYS * dayMs).toISOString();
        }
        created++;
        return card;
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
    var btn = el('button', 'srs-detail-control srs-status-loading', 'Wiederholung');
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
      btn.textContent = status.className === 'not-in-review' ? 'Zur Wiederholung hinzufügen' : 'Wiederholung: ' + status.label;
      btn.setAttribute('data-in-review', status.className === 'not-in-review' ? 'false' : 'true');
    }).catch(function () {
      btn.className = 'srs-detail-control srs-status-error';
      btn.textContent = 'Wiederholung nicht verfügbar';
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
    pop.appendChild(el('div', 'srs-popover-title', 'Wiederholungsstatus'));
    pop.appendChild(el('div', 'srs-popover-line', 'Lädt...'));
    document.body.appendChild(pop);

    var rect = anchor.getBoundingClientRect();
    pop.style.top = Math.max(8, rect.bottom + window.scrollY + 8) + 'px';
    pop.style.left = Math.max(8, rect.left + window.scrollX - 120) + 'px';

    window.SRSStore.getCardsByItem(getItemKey(sectionName, item)).then(function (cards) {
      pop.innerHTML = '';
      pop.appendChild(el('div', 'srs-popover-title', 'Wiederholungsstatus'));
      if (!cards.length) {
        pop.appendChild(el('div', 'srs-popover-line', 'Nicht in Wiederholung'));
        return;
      }
      cards.forEach(function (card) {
        var line = el('div', 'srs-popover-line');
        line.textContent = card.label + ': ' + formatState(card.state) + formatDue(card);
        pop.appendChild(line);
      });
      var actions = el('div', 'srs-popover-actions');
      var activeCards = cards.filter(function (card) { return !card.suspended; });
      if (activeCards.length) {
        var reviewNow = el('button', 'srs-small-btn', 'Jetzt wiederholen');
        reviewNow.addEventListener('click', function () {
          pop.remove();
          if (window.app) window.app.switchTab('review');
          loadQueue(activeCards, true);
        });
        actions.appendChild(reviewNow);

        var suspend = el('button', 'srs-small-btn', 'Aussetzen');
        suspend.addEventListener('click', function () {
          updateItemSuspended(anchor, sectionName, item, true);
        });
        actions.appendChild(suspend);
      } else {
        var reactivate = el('button', 'srs-small-btn', 'Wieder aktivieren');
        reactivate.addEventListener('click', function () {
          updateItemSuspended(anchor, sectionName, item, false);
        });
        actions.appendChild(reactivate);
      }

      var remove = el('button', 'srs-small-btn', 'Aus Wiederholung entfernen');
      remove.addEventListener('click', function () {
        removeItemFromReview(anchor, sectionName, item);
      });
      actions.appendChild(remove);
      pop.appendChild(actions);
    });

    setTimeout(function () {
      document.addEventListener('click', close, { once: true });
    }, 0);

    function close(e) {
      if (!pop.contains(e.target) && e.target !== anchor) pop.remove();
    }
  }

  function updateItemSuspended(anchor, sectionName, item, suspended) {
    var itemKey = getItemKey(sectionName, item);
    window.SRSStore.setItemSuspended(itemKey, suspended).then(function () {
      notifyDetailRefresh(itemKey);
      showDetailPopover(anchor, sectionName, item);
      if (window.app) window.app.playPop();
    });
  }

  function removeItemFromReview(anchor, sectionName, item) {
    if (!window.confirm('Diesen Eintrag aus der Wiederholung entfernen? Der Lernfortschritt dieser Karten wird gelöscht.')) {
      return;
    }
    var itemKey = getItemKey(sectionName, item);
    window.SRSStore.deleteCardsByItem(itemKey).then(function () {
      notifyDetailRefresh(itemKey);
      showDetailPopover(anchor, sectionName, item);
      if (window.app) window.app.playTick();
    });
  }

  function formatDue(card) {
    if (card.suspended) return ' (ausgesetzt)';
    if (!card.dueAt) return '';
    var due = new Date(card.dueAt).getTime();
    if (due <= Date.now()) return ' (fällig)';
    return ' (nächste Wiederholung: ' + new Date(card.dueAt).toLocaleDateString() + ')';
  }

  function formatState(state) {
    return STATE_LABELS[state] || state || '';
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
    lastGrade = null;
    panel.innerHTML = '';
    var shell = el('div', 'review-shell');
    var header = el('div', 'review-header');
    header.appendChild(el('div', 'review-title', 'Wiederholen'));
    header.appendChild(el('div', 'review-subtitle', 'Verteilte Wiederholung für fällige, schwache und neue Karten.'));
    shell.appendChild(header);

    Promise.all([window.SRSStore.getAllCards(), window.SRSStore.getBackupStatus()]).then(function (parts) {
      var cards = parts[0];
      var backup = parts[1];
      var dueCards = cards.filter(function (card) { return window.SRSScheduler.isDue(card); });
      var activeCards = cards.filter(function (card) { return !card.suspended; });
      var weakCards = activeCards.filter(function (card) { return window.SRSScheduler.isWeak(card); });

      var stats = el('div', 'review-stats');
      stats.appendChild(statCard('Fällig', dueCards.length));
      stats.appendChild(statCard('Aktive Karten', activeCards.length));
      stats.appendChild(statCard('Schwach', weakCards.length));
      stats.appendChild(statCard('Sicherung', backup.label));
      shell.appendChild(stats);

      var actions = el('div', 'review-actions');
      var startBtn = el('button', 'quiz-btn quiz-btn-next', dueCards.length ? 'Fällige Karten wiederholen' : 'Keine Karten fällig');
      startBtn.disabled = dueCards.length === 0;
      startBtn.addEventListener('click', function () { loadQueue(dueCards); });
      actions.appendChild(startBtn);

      var allBtn = el('button', 'quiz-btn quiz-btn-reveal', 'Alle aktiven Karten üben');
      allBtn.disabled = activeCards.length === 0;
      allBtn.addEventListener('click', function () { loadQueue(activeCards, true); });
      actions.appendChild(allBtn);

      var settingsBtn = el('button', 'quiz-btn quiz-btn-back', 'Sicherung & Einstellungen');
      settingsBtn.addEventListener('click', renderSettings);
      actions.appendChild(settingsBtn);
      shell.appendChild(actions);

      var hint = el('div', 'review-empty-hint');
      hint.textContent = activeCards.length
        ? 'Füge weitere Karten aus Detailseiten hinzu oder wiederhole hier schwache und fällige Karten.'
        : 'Öffne eine Detailseite für Vokabeln, Kanji, Grammatik, Zählwörter oder Lautmalerei und wähle Zur Wiederholung hinzufügen.';
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
      return window.SRSStore.getSettings();
    }).then(function (settings) {
      answerMode = (settings && settings.answerMode) || 'reveal';
      autoSuspendLeeches = !!(settings && settings.autoSuspendLeeches);
      // The Lernpfad may mix in non-card steps (teach-before-test): grammar
      // "lesson" steps and vocab/kanji "intro" steps. They must not go through
      // isDue/sortQueue, so split them out and weave them back in directly before
      // the card each one introduces.
      var lessonSteps = [];
      var cardItems = [];
      (cards || []).forEach(function (it) {
        if (it && it.kind) lessonSteps.push(it); else cardItems.push(it);
      });
      var selected = includeNotDue ? cardItems.slice() : cardItems.filter(function (card) {
        return window.SRSScheduler.isDue(card);
      });
      queue = weaveLessonSteps(window.SRSScheduler.sortQueue(selected), lessonSteps);
      session = { reviewed: 0, correct: 0, again: 0, leeches: 0 };
      currentCard = null;
      lastGrade = null;
      revealed = false;
      renderNextReview();
    });
  }

  // Insert each lesson step immediately before the first queued card of the grammar
  // pattern it teaches (matched by itemKey). Steps whose pattern card isn't in the
  // queue still get shown, at the front, so a lesson is never silently dropped.
  function weaveLessonSteps(sortedCards, lessonSteps) {
    if (!lessonSteps || !lessonSteps.length) return sortedCards;
    var pending = {};
    var leftover = [];
    lessonSteps.forEach(function (step) {
      if (step.precedesItemKey) (pending[step.precedesItemKey] = pending[step.precedesItemKey] || []).push(step);
      else leftover.push(step);
    });
    var out = [];
    var insertedFor = {};
    sortedCards.forEach(function (card) {
      var key = card.itemKey;
      if (key && pending[key] && !insertedFor[key]) {
        pending[key].forEach(function (step) { out.push(step); });
        insertedFor[key] = true;
      }
      out.push(card);
    });
    // Any lesson whose pattern card never appeared (e.g. budget trimmed it) is shown
    // up front rather than lost.
    Object.keys(pending).forEach(function (key) {
      if (!insertedFor[key]) pending[key].forEach(function (step) { leftover.push(step); });
    });
    return leftover.concat(out);
  }

  // A lesson-first step in the session: render the grammar lesson inline, then a
  // single "Verstanden — weiter" to continue into its flashcards. Reuses the exact
  // lesson markup/styling from the Lektionen view.
  function renderLessonStep(step) {
    revealed = false;
    panel.innerHTML = '';
    var wrap = el('div', 'review-card-wrap review-lesson-step');
    var meta = el('div', 'quiz-badges');
    meta.appendChild(el('span', 'quiz-type-badge', 'Lektion'));
    if (step.level) {
      var lvl = String(step.level).split('/')[0];
      meta.appendChild(el('span', 'quiz-level-badge ' + lvl.toLowerCase(), step.level));
    }
    wrap.appendChild(meta);
    wrap.appendChild(el('p', 'quiz-prompt', 'Neue Grammatik — lies die Lektion, bevor du sie übst.'));
    wrap.appendChild(el('div', 'quiz-prompt-main', step.title));
    if (step.subtitle) wrap.appendChild(el('p', 'quiz-prompt-sub', step.subtitle));

    var content = el('div', 'review-lesson-content');
    var html = (window.GrammarLessons && window.GrammarLessons.renderContent)
      ? window.GrammarLessons.renderContent(step.lessonId) : '';
    if (html) content.innerHTML = html;
    else content.appendChild(el('div', 'review-empty-hint', 'Lektion nicht verfügbar.'));
    wrap.appendChild(content);

    var actions = el('div', 'quiz-browse-actions');
    // The full lesson is already rendered inline above, so a single "continue" is all
    // that is needed. (A former "Ganze Lektion öffnen" button was removed: it called
    // GrammarLessons.openLesson without switching to the grammar tab, so it operated on
    // hidden DOM and did nothing visible while the session ran in the review tab.)
    var contBtn = el('button', 'quiz-btn quiz-btn-reveal', 'Verstanden — weiter');
    contBtn.addEventListener('click', function () {
      if (window.LearningPath && window.LearningPath.noteLessonReadById) window.LearningPath.noteLessonReadById(step.lessonId);
      if (window.app) window.app.playPop();
      renderNextReview();
    });
    actions.appendChild(contBtn);

    var backBtn = el('button', 'quiz-btn quiz-btn-back', 'Zurück');
    backBtn.addEventListener('click', renderHome);
    actions.appendChild(backBtn);
    appendUndoButton(actions);

    wrap.appendChild(actions);
    panel.appendChild(wrap);
  }

  // Resolve a vocab card back to its dataset item (for metadata the persisted
  // question doesn't carry, e.g. pitch accent). Only works once the vocab
  // section is loaded — callers skip silently otherwise.
  var _vocabByKey = null;
  var _vocabByKeySource = null;
  function vocabItemForCard(card) {
    if (!card || card.section !== 'vocab' || !card.itemKey) return null;
    var sec = window.app && window.app.sections && window.app.sections.vocab;
    var items = sec && sec.allItems;
    if (!items || !items.length) return null;
    if (!_vocabByKey || _vocabByKeySource !== items) {
      _vocabByKey = {};
      _vocabByKeySource = items;
      for (var i = 0; i < items.length; i++) _vocabByKey[getItemKey('vocab', items[i])] = items[i];
    }
    return _vocabByKey[card.itemKey] || null;
  }

  // Pitch-accent diagram (reuses the global renderPitchSVG from section-configs).
  function pitchRow(reading, pitch) {
    if (typeof renderPitchSVG !== 'function' || pitch === undefined || pitch === null || !reading) return null;
    var svg = renderPitchSVG(reading, pitch);
    if (!svg) return null;
    var row = el('div', 'review-pitch');
    row.innerHTML = svg;
    return row;
  }

  // Small "take back the last answer" affordance, shown on the screen after a
  // grade. Appended to whichever step renders next (card, lesson or intro).
  function appendUndoButton(actions) {
    if (!lastGrade) return;
    var undoBtn = el('button', 'quiz-btn quiz-btn-back review-undo-btn', '↩ Letzte Antwort zurücknehmen');
    undoBtn.addEventListener('click', undoLastGrade);
    actions.appendChild(undoBtn);
  }

  // Teach-before-test for vocab/kanji: a compact, ungraded presentation of a
  // never-seen item (the counterpart to renderLessonStep for grammar), shown
  // directly before the item's first question.
  function renderIntroStep(step) {
    revealed = false;
    panel.innerHTML = '';
    var it = step.item || {};
    var isKanji = step.section === 'kanji';
    var wrap = el('div', 'review-card-wrap review-intro-step');

    var meta = el('div', 'quiz-badges');
    meta.appendChild(el('span', 'quiz-type-badge', 'Neu'));
    if (step.level) meta.appendChild(el('span', 'quiz-level-badge ' + String(step.level).toLowerCase(), step.level));
    wrap.appendChild(meta);

    wrap.appendChild(el('p', 'quiz-prompt', isKanji
      ? 'Neues Kanji — präg es dir ein, bevor du es übst.'
      : 'Neue Vokabel — präg sie dir ein, bevor du sie übst.'));
    wrap.appendChild(el('div', 'quiz-prompt-main jp', isKanji ? it.kanji : (it.word || '')));

    var facts = el('div', 'review-intro-facts');
    function fact(label, value, jp) {
      if (!value) return;
      var row = el('div', 'review-intro-fact');
      row.appendChild(el('span', 'review-intro-fact-label', label));
      row.appendChild(el('span', 'review-intro-fact-value' + (jp ? ' jp' : ''), value));
      facts.appendChild(row);
    }
    if (isKanji) {
      fact('Bedeutung', (it.meanings || []).join(', '));
      var kun = (it.kun || []).map(function (r) { return r.kana; }).filter(Boolean).join(', ');
      var on = (it.on || []).map(function (r) { return r.kana; }).filter(Boolean).join(', ');
      fact('Kun-Lesung', kun, true);
      fact('On-Lesung', on, true);
      fact('Komponenten', (it.components || []).map(function (c) {
        return c.radical + (c.meaning ? ' (' + c.meaning + ')' : '');
      }).join('、'), true);
      if (it.strokes) fact('Striche', String(it.strokes));
    } else {
      var reading = it.reading && it.reading !== it.word ? it.reading : '';
      fact('Lesung', reading + (it.romaji ? (reading ? ' · ' : '') + it.romaji : ''), !!reading);
      fact('Bedeutung', it.meaning || '');
      var pitch = pitchRow(it.reading, it.pitch);
      if (pitch) {
        var pitchFact = el('div', 'review-intro-fact');
        pitchFact.appendChild(el('span', 'review-intro-fact-label', 'Pitch-Akzent'));
        pitchFact.appendChild(pitch);
        facts.appendChild(pitchFact);
      }
    }
    wrap.appendChild(facts);

    // One or two examples so the item is seen in context before the question.
    var examples = (it.examples || []).slice(0, isKanji ? 2 : 1);
    examples.forEach(function (ex) {
      var box = el('div', 'review-intro-example');
      if (isKanji) {
        box.appendChild(el('div', 'review-intro-example-jp jp', (ex.word || '') + (ex.reading ? '（' + ex.reading + '）' : '')));
        if (ex.meaning) box.appendChild(el('div', 'review-intro-example-de', ex.meaning));
      } else {
        box.appendChild(el('div', 'review-intro-example-jp jp', ex.japanese || ex.jp || ''));
        if (ex.german) box.appendChild(el('div', 'review-intro-example-de', ex.german));
      }
      if (box.textContent) wrap.appendChild(box);
    });

    var actions = el('div', 'quiz-browse-actions');
    var contBtn = el('button', 'quiz-btn quiz-btn-reveal', 'Verstanden — weiter');
    contBtn.addEventListener('click', function () {
      if (window.app) window.app.playPop();
      renderNextReview();
    });
    actions.appendChild(contBtn);

    var backBtn = el('button', 'quiz-btn quiz-btn-back', 'Zurück');
    backBtn.addEventListener('click', renderHome);
    actions.appendChild(backBtn);
    appendUndoButton(actions);

    wrap.appendChild(actions);
    panel.appendChild(wrap);

    if (!isKanji && it.word && window.app && window.app.speakJP) window.app.speakJP(it.word);
  }

  function renderNextReview() {
    if (!ensurePanel()) return;
    if (!queue.length) {
      updateReviewBadge();
      if (session && session.reviewed > 0) { renderSummary(); return; }
      returnToPath();
      return;
    }
    currentCard = queue.shift();
    revealed = false;
    // Teach-before-test steps are presented inline, not graded like cards.
    if (currentCard && currentCard.kind === 'lesson') { renderLessonStep(currentCard); return; }
    if (currentCard && currentCard.kind === 'intro') { renderIntroStep(currentCard); return; }
    panel.innerHTML = '';

    var wrap = el('div', 'review-card-wrap');
    var meta = el('div', 'quiz-badges');
    meta.appendChild(el('span', 'quiz-type-badge', currentCard.label || currentCard.promptType));
    if (currentCard.level) meta.appendChild(el('span', 'quiz-level-badge ' + String(currentCard.level).toLowerCase(), currentCard.level));
    wrap.appendChild(meta);

    var q = currentCard.question || {};
    wrap.appendChild(el('p', 'quiz-prompt', q.prompt || 'Diese Karte wiederholen'));
    if (q.promptMain) {
      var main = el('div', 'quiz-prompt-main' + (/[\u3000-\u9faf\u3040-\u30ff\uff00-\uff9f]/.test(q.promptMain) ? ' jp' : ''), q.promptMain);
      wrap.appendChild(main);
    }
    if (q.promptSub) wrap.appendChild(el('p', 'quiz-prompt-sub', q.promptSub));

    var answer = el('div', 'review-answer hidden');
    appendAnswer(answer, q);
    // Pitch-accent diagram for vocab answers (looked up from the dataset, since
    // persisted card questions don't carry it).
    var vocabItem = vocabItemForCard(currentCard);
    if (vocabItem) {
      var pitch = pitchRow(vocabItem.reading, vocabItem.pitch);
      if (pitch) answer.appendChild(pitch);
    }
    wrap.appendChild(answer);

    var actions = el('div', 'quiz-browse-actions');

    var gradeRow = el('div', 'review-grade-row hidden');
    ['Again', 'Hard', 'Good', 'Easy'].forEach(function (grade) {
      var btn = el('button', 'review-grade-btn grade-' + grade.toLowerCase(), GRADE_LABELS[grade] || grade);
      btn.addEventListener('click', function () { gradeCurrentCard(grade); });
      gradeRow.appendChild(btn);
    });

    function revealAnswer(showGrades) {
      revealed = true;
      answer.classList.remove('hidden');
      if (showGrades) gradeRow.classList.remove('hidden');
      if (q.speechText && window.app) window.app.speakJP(q.speechText);
    }

    var typed = answerMode === 'type' && window.AnswerCheck && window.AnswerCheck.isCheckable(currentCard);
    if (typed) {
      var acc = window.AnswerCheck.acceptedAnswers(currentCard);
      var inputRow = el('div', 'review-input-row');
      var input = el('input', 'review-answer-input');
      input.type = 'text';
      input.setAttribute('autocomplete', 'off');
      input.setAttribute('autocapitalize', 'off');
      input.setAttribute('spellcheck', 'false');
      input.placeholder = (acc && acc.kind === 'kana') ? 'Antwort (Rōmaji oder Kana)…' : 'Antwort…';
      var feedback = el('div', 'review-input-feedback');
      var checkBtn = el('button', 'quiz-btn quiz-btn-next', 'Prüfen');
      var showBtn = el('button', 'quiz-btn quiz-btn-back', 'Antwort zeigen');

      function submitTyped() {
        if (revealed) return;
        var res = window.AnswerCheck.checkAnswer(input.value, currentCard);
        if (!res) { revealAnswer(true); inputRow.classList.add('hidden'); return; }
        if (res.correct) {
          // Confirm before moving on: show the verdict + full answer and wait for
          // an explicit "Weiter" instead of jumping straight to the next card.
          // The grade is applied on continue, so the moment of feedback costs
          // nothing in scheduling terms.
          feedback.textContent = 'Richtig ✓';
          feedback.className = 'review-input-feedback is-correct';
          input.disabled = true;
          checkBtn.classList.add('hidden');
          showBtn.classList.add('hidden');
          revealAnswer(false);
          var nextBtn = el('button', 'quiz-btn quiz-btn-next', 'Weiter');
          nextBtn.addEventListener('click', function () { gradeCurrentCard('Good'); });
          inputRow.appendChild(nextBtn);
          // Focus so Enter (the key that submitted) also continues.
          setTimeout(function () { nextBtn.focus(); }, 0);
        } else if (res.near) {
          feedback.textContent = 'Fast richtig – Tippfehler? Bitte korrigieren.';
          feedback.className = 'review-input-feedback is-near';
          input.classList.add('shake');
          setTimeout(function () { input.classList.remove('shake'); }, 400);
          input.focus();
          input.select();
        } else {
          feedback.textContent = 'Nicht ganz – sieh dir die Antwort an und bewerte selbst.';
          feedback.className = 'review-input-feedback is-wrong';
          inputRow.classList.add('hidden');
          revealAnswer(true);
        }
      }

      checkBtn.addEventListener('click', submitTyped);
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); submitTyped(); }
      });
      showBtn.addEventListener('click', function () { inputRow.classList.add('hidden'); revealAnswer(true); });

      inputRow.appendChild(input);
      inputRow.appendChild(checkBtn);
      inputRow.appendChild(showBtn);
      actions.appendChild(inputRow);
      actions.appendChild(feedback);
      actions.appendChild(gradeRow);
      setTimeout(function () { input.focus(); }, 0);
    } else {
      var revealBtn = el('button', 'quiz-btn quiz-btn-reveal', 'Antwort anzeigen');
      revealBtn.addEventListener('click', function () {
        revealBtn.classList.add('hidden');
        revealAnswer(true);
      });
      actions.appendChild(revealBtn);
      actions.appendChild(gradeRow);
    }

    appendUndoButton(actions);

    var backBtn = el('button', 'quiz-btn quiz-btn-back', 'Zurück');
    backBtn.addEventListener('click', renderHome);
    actions.appendChild(backBtn);

    var suspendBtn = el('button', 'quiz-btn quiz-btn-back', 'Eintrag aussetzen');
    suspendBtn.addEventListener('click', suspendCurrentItem);
    actions.appendChild(suspendBtn);

    var removeBtn = el('button', 'quiz-btn quiz-btn-back', 'Aus Wiederholung entfernen');
    removeBtn.addEventListener('click', removeCurrentItemFromReview);
    actions.appendChild(removeBtn);
    wrap.appendChild(actions);

    panel.appendChild(wrap);
  }

  function appendAnswer(container, q) {
    container.appendChild(el('div', 'review-answer-label', 'Antwort'));
    String(q.answer || '').split('\n').forEach(function (line) {
      container.appendChild(el('div', 'review-answer-main', line));
    });
    if (q.extra) container.appendChild(el('div', 'review-answer-extra', q.extra));
    if (q.speechText) {
      var speak = el('button', 'srs-small-btn', 'Aussprache abspielen');
      speak.addEventListener('click', function () {
        if (window.app) window.app.speakJP(q.speechText);
      });
      container.appendChild(speak);
    }
  }

  function dayStr(d) { return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); }
  function streakOf(path) {
    if (!path || !path.streakLastDay) return 0;
    var today = dayStr(new Date());
    var y = new Date(); y.setDate(y.getDate() - 1);
    if (path.streakLastDay === today || path.streakLastDay === dayStr(y)) return path.streakCount || 0;
    return 0;
  }

  // End-of-session summary shown when the queue empties (1C). Mirrors WaniKani/Bunpro:
  // accuracy + counts + the current streak, then a single button back to the Lernpfad.
  function renderSummary() {
    if (!ensurePanel()) return;
    var s = session || { reviewed: 0, correct: 0, again: 0 };
    session = null;
    lastGrade = null;
    panel.innerHTML = '';
    var shell = el('div', 'review-shell');
    var header = el('div', 'review-header');
    header.appendChild(el('div', 'review-title', 'Session abgeschlossen'));
    header.appendChild(el('div', 'review-subtitle', 'Gut gemacht — hier ist dein Ergebnis.'));
    shell.appendChild(header);

    var rate = s.reviewed ? Math.round(s.correct / s.reviewed * 100) : 0;
    var stats = el('div', 'review-stats');
    stats.appendChild(statCard('Karten', s.reviewed));
    stats.appendChild(statCard('Richtig', rate + '%'));
    stats.appendChild(statCard('Nochmal', s.again));
    shell.appendChild(stats);

    if (s.leeches) {
      shell.appendChild(el('div', 'review-empty-hint',
        s.leeches + (s.leeches === 1 ? ' hartnäckige Karte ausgesetzt' : ' hartnäckige Karten ausgesetzt')
        + ' — du kannst sie in den Details wieder aktivieren.'));
    }

    var actions = el('div', 'review-actions');
    var cont = el('button', 'quiz-btn quiz-btn-next', 'Weiter zum Lernpfad');
    cont.addEventListener('click', returnToPath);
    actions.appendChild(cont);
    shell.appendChild(actions);

    // Streak (set by the Lernpfad when the session launched) — inserted once known.
    window.SRSStore.getPathState().then(function (p) {
      var streak = streakOf(p);
      if (streak > 0) {
        shell.insertBefore(el('div', 'review-empty-hint',
          '🔥 ' + streak + (streak === 1 ? ' Tag' : ' Tage') + ' in Folge'), actions);
      }
    }).catch(function () {});

    panel.appendChild(shell);
    if (window.app && window.app.playPop) window.app.playPop();
  }

  function gradeCurrentCard(grade) {
    if (!currentCard) return;
    var previous = currentCard;
    var next = window.SRSScheduler.applyGrade(previous, grade);
    // Auto-suspend leeches: a card that keeps failing is parked so it stops
    // dominating the queue. Opt-in (off by default) to avoid surprising removals.
    var leechSuspended = false;
    if (grade === 'Again' && autoSuspendLeeches && !next.suspended && window.SRSScheduler.isLeech(next)) {
      next.suspended = true;
      leechSuspended = true;
    }
    var event = window.SRSScheduler.makeReviewEvent(next, previous, grade);
    window.SRSStore.putCards([next]).then(function () {
      return window.SRSStore.addEvent(event);
    }).then(function () {
      // A card leaving the New state is a new card actually being introduced — count
      // it toward today's Lernpfad goal now (not when the session was assembled), so
      // aborting "Heute lernen" before reviewing never inflates the Tagesziel.
      var countedNewIntro = previous.state === 'New';
      if (countedNewIntro && window.LearningPath && window.LearningPath.noteNewCardIntroduced) {
        window.LearningPath.noteNewCardIntroduced();
      }
      notifyDetailRefresh(next.itemKey);
      if (session) {
        session.reviewed++;
        if (grade === 'Again') session.again++; else session.correct++;
        if (leechSuspended) session.leeches++;
      }
      if (leechSuspended) removeQueuedItem(next.itemKey); // drop its siblings from this run
      // Short-step cards (same-day learning pass, relearning after a miss) come
      // back later in THIS session instead of silently waiting until tomorrow.
      if (!leechSuspended && (next.state === 'Learning' || next.state === 'Relearning')
        && new Date(next.dueAt || 0).getTime() - Date.now() < 30 * 60 * 1000) {
        queue.push(next);
      }
      // One-level undo snapshot for the next screen.
      lastGrade = {
        card: previous,
        grade: grade,
        eventId: event.eventId,
        countedNewIntro: countedNewIntro,
        cardKey: next.cardKey
      };
      if (window.app) {
        if (grade === 'Again') window.app.playTick();
        else window.app.playPop();
      }
      renderNextReview();
    }).catch(function () {
      // Save failed (e.g. storage quota): keep the current card, don't advance,
      // and tell the user so the grade isn't silently lost.
      if (!panel) return;
      var wrap = panel.querySelector('.review-card-wrap');
      if (wrap && !wrap.querySelector('.review-error')) {
        wrap.appendChild(el('div', 'review-error', 'Speichern fehlgeschlagen. Bitte erneut bewerten.'));
      }
    });
  }

  // Take back the most recent grade: restore the pre-grade card, drop its review
  // event, roll back the counters, and show the card again. One level deep — a
  // mis-tap is noticed immediately or not at all. (Sibling cards dropped by a
  // leech auto-suspend are not re-queued; the restored card itself is.)
  function undoLastGrade() {
    if (!lastGrade) return;
    var snap = lastGrade;
    lastGrade = null;
    window.SRSStore.putCards([snap.card]).then(function () {
      return window.SRSStore.deleteEvent ? window.SRSStore.deleteEvent(snap.eventId) : null;
    }).then(function () {
      if (snap.countedNewIntro && window.LearningPath && window.LearningPath.noteNewCardUndone) {
        window.LearningPath.noteNewCardUndone();
      }
      if (session) {
        session.reviewed = Math.max(0, session.reviewed - 1);
        if (snap.grade === 'Again') session.again = Math.max(0, session.again - 1);
        else session.correct = Math.max(0, session.correct - 1);
      }
      // Drop the re-queued short-step copy of this card, then show it again.
      queue = queue.filter(function (c) { return !c || c.cardKey !== snap.cardKey || c.kind; });
      queue.unshift(snap.card);
      notifyDetailRefresh(snap.card.itemKey);
      if (window.app) window.app.playTick();
      renderNextReview();
    }).catch(function () {});
  }

  function removeQueuedItem(itemKey) {
    queue = queue.filter(function (card) {
      return card.itemKey !== itemKey;
    });
  }

  function suspendCurrentItem() {
    if (!currentCard) return;
    var itemKey = currentCard.itemKey;
    window.SRSStore.setItemSuspended(itemKey, true).then(function () {
      removeQueuedItem(itemKey);
      notifyDetailRefresh(itemKey);
      if (window.app) window.app.playTick();
      renderNextReview();
    });
  }

  function removeCurrentItemFromReview() {
    if (!currentCard) return;
    var itemKey = currentCard.itemKey;
    if (!window.confirm('Diesen Eintrag aus der Wiederholung entfernen? Der Lernfortschritt dieser Karten wird gelöscht.')) {
      return;
    }
    window.SRSStore.deleteCardsByItem(itemKey).then(function () {
      removeQueuedItem(itemKey);
      notifyDetailRefresh(itemKey);
      if (window.app) window.app.playTick();
      renderNextReview();
    });
  }

  function renderSettings() {
    if (!ensurePanel()) return;
    panel.innerHTML = '';
    var shell = el('div', 'review-shell');
    shell.appendChild(el('div', 'review-title', 'Sicherung & Einstellungen'));

    var learnBox = el('div', 'review-settings-box');
    learnBox.appendChild(el('h3', null, 'Lernen'));
    learnBox.appendChild(el('div', 'review-backup-status',
      'Antwortmodus beim Wiederholen: selbst aufdecken und bewerten, oder die Antwort tippen und automatisch prüfen lassen.'));
    window.SRSStore.getSettings().then(function (settings) {
      var row = el('div', 'path-adjust-row');
      var label = el('label', 'path-adjust-label', 'Antwortmodus');
      label.setAttribute('for', 'srs-answer-mode');
      var sel = el('select', 'path-target-select');
      sel.id = 'srs-answer-mode';
      [['reveal', 'Selbstkontrolle (aufdecken)'], ['type', 'Tippen & prüfen']].forEach(function (opt) {
        var o = el('option', null, opt[1]);
        o.value = opt[0];
        if ((settings.answerMode || 'reveal') === opt[0]) o.selected = true;
        sel.appendChild(o);
      });
      sel.addEventListener('change', function () {
        settings.answerMode = sel.value;
        answerMode = sel.value;
        window.SRSStore.saveSettings(settings).catch(function () {});
      });
      row.appendChild(label);
      row.appendChild(sel);
      learnBox.appendChild(row);

      var leechRow = el('div', 'path-adjust-row');
      var leechLabel = el('label', 'path-adjust-label', 'Hartnäckige Karten automatisch aussetzen');
      leechLabel.setAttribute('for', 'srs-leech-toggle');
      var leechToggle = document.createElement('input');
      leechToggle.type = 'checkbox';
      leechToggle.id = 'srs-leech-toggle';
      leechToggle.checked = !!settings.autoSuspendLeeches;
      leechToggle.addEventListener('change', function () {
        settings.autoSuspendLeeches = leechToggle.checked;
        autoSuspendLeeches = leechToggle.checked;
        window.SRSStore.saveSettings(settings).catch(function () {});
      });
      leechRow.appendChild(leechLabel);
      leechRow.appendChild(leechToggle);
      learnBox.appendChild(leechRow);
    });
    shell.appendChild(learnBox);

    var backupBox = el('div', 'review-settings-box');
    backupBox.appendChild(el('h3', null, 'Sicherung'));
    var status = el('div', 'review-backup-status', 'Sicherungsstatus wird geprüft...');
    backupBox.appendChild(status);

    var connect = el('button', 'quiz-btn quiz-btn-next', 'Automatische Sicherungsdatei verbinden');
    connect.addEventListener('click', function () {
      status.textContent = 'Verbindung wird hergestellt...';
      window.SRSStore.connectBackupFile().then(function () {
        status.textContent = 'Automatische Sicherungsdatei verbunden und gespeichert.';
      }).catch(function (err) {
        status.textContent = err.message || 'Automatische Sicherung konnte nicht verbunden werden.';
      });
    });
    backupBox.appendChild(connect);

    var exportBtn = el('button', 'quiz-btn quiz-btn-reveal', 'Sicherung jetzt exportieren');
    exportBtn.addEventListener('click', function () {
      window.SRSStore.downloadBackup();
    });
    backupBox.appendChild(exportBtn);

    var importLabel = el('label', 'quiz-btn quiz-btn-back', 'Sicherung importieren');
    var importInput = document.createElement('input');
    importInput.type = 'file';
    importInput.accept = 'application/json,.json';
    importInput.className = 'hidden';
    importInput.addEventListener('change', function () {
      var file = importInput.files && importInput.files[0];
      if (!file) return;
      status.textContent = 'Import wird ausgeführt...';
      window.SRSStore.readBackupFile(file).then(function (data) {
        return window.SRSStore.importData(data, 'merge');
      }).then(function () {
        status.textContent = 'Sicherung importiert und zusammengeführt.';
        updateReviewBadge();
      }).catch(function (err) {
        status.textContent = err.message || 'Import fehlgeschlagen.';
      });
    });
    importLabel.appendChild(importInput);
    backupBox.appendChild(importLabel);

    shell.appendChild(backupBox);

    var dangerBox = el('div', 'review-settings-box review-danger-box');
    dangerBox.appendChild(el('h3', null, 'Gefahrenzone'));
    dangerBox.appendChild(el('div', 'review-backup-status',
      'Tipp: Exportiere zuerst eine Sicherung (oben). Das Zurücksetzen löscht deinen gesamten Lernfortschritt unwiderruflich.'));
    var resetStatus = el('div', 'review-backup-status');
    var resetBtn = el('button', 'quiz-btn quiz-btn-danger', 'Gesamten Fortschritt zurücksetzen');
    resetBtn.addEventListener('click', function () {
      if (!window.confirm('Gesamten Lernfortschritt zurücksetzen?\n\nAlle Wiederholungs-Karten, der Verlauf und der Lernpfad-Status (Tageszähler, gelesene Lektionen, übersprungene Einträge) werden gelöscht. Lesezeichen und Einstellungen bleiben erhalten.\n\nDies kann nicht rückgängig gemacht werden.')) {
        return;
      }
      resetBtn.disabled = true;
      resetStatus.textContent = 'Fortschritt wird zurückgesetzt...';
      window.SRSStore.resetProgress()
        .then(function () { return window.SRSStore.getBackupStatus(); })
        .then(function (backup) {
          var connected = backup.mode === 'file';
          // Flush the wipe to the connected backup file so it can't silently restore.
          var flush = connected ? window.SRSStore.writeBackupNow().catch(function () {}) : Promise.resolve();
          return flush.then(function () { return connected; });
        })
        .then(function (connected) {
          queue = [];
          currentCard = null;
          updateReviewBadge();
          if (window.app) window.app.playPop();
          resetBtn.disabled = false;
          resetStatus.textContent = connected
            ? 'Fortschritt und verbundene Sicherung zurückgesetzt.'
            : 'Fortschritt zurückgesetzt.';
          window.SRSStore.getBackupStatus().then(function (b) { status.textContent = formatBackupLabel(b); });
        })
        .catch(function (err) {
          resetBtn.disabled = false;
          resetStatus.textContent = (err && err.message) || 'Zurücksetzen fehlgeschlagen.';
        });
    });
    dangerBox.appendChild(resetBtn);
    dangerBox.appendChild(resetStatus);
    shell.appendChild(dangerBox);

    var diagBox = el('div', 'review-settings-box');
    diagBox.appendChild(el('h3', null, 'Fortschritt prüfen'));
    var diagStatus = el('div', 'review-backup-status', '');
    var diagBtn = el('button', 'quiz-btn quiz-btn-reveal', 'Fortschritt prüfen');
    var pruneBtn = el('button', 'quiz-btn quiz-btn-back hidden', 'Verwaiste Karten entfernen');
    diagBtn.addEventListener('click', function () {
      if (!window.LearningPath || !window.LearningPath.runDiagnostics) {
        diagStatus.textContent = 'Diagnose nicht verfügbar.';
        return;
      }
      diagBtn.disabled = true;
      diagStatus.textContent = 'Prüfe...';
      window.LearningPath.runDiagnostics().then(function (d) {
        diagBtn.disabled = false;
        diagStatus.textContent = 'Aktive Karten: ' + d.active + ' · Ausgesetzt: ' + d.suspended +
          ' · Gemeistert: ' + d.mastered + ' · Verwaist: ' + d.orphaned;
        if (d.orphaned > 0) {
          pruneBtn.classList.remove('hidden');
          pruneBtn.textContent = 'Verwaiste Karten entfernen (' + d.orphaned + ')';
        } else {
          pruneBtn.classList.add('hidden');
        }
      }).catch(function () {
        diagBtn.disabled = false;
        diagStatus.textContent = 'Diagnose fehlgeschlagen.';
      });
    });
    pruneBtn.addEventListener('click', function () {
      pruneBtn.disabled = true;
      window.LearningPath.pruneOrphans().then(function (n) {
        pruneBtn.disabled = false;
        pruneBtn.classList.add('hidden');
        updateReviewBadge();
        diagStatus.textContent = n + ' verwaiste Karten entfernt.';
      }).catch(function () {
        pruneBtn.disabled = false;
        diagStatus.textContent = 'Entfernen fehlgeschlagen.';
      });
    });
    diagBox.appendChild(diagBtn);
    diagBox.appendChild(pruneBtn);
    diagBox.appendChild(diagStatus);
    shell.appendChild(diagBox);

    var back = el('button', 'quiz-btn quiz-btn-back', 'Zurück zum Lernpfad');
    back.addEventListener('click', returnToPath);
    shell.appendChild(back);
    panel.appendChild(shell);

    function formatBackupLabel(b) {
      if (b.lastError) return b.label + ' — Sicherung fehlgeschlagen: ' + b.lastError;
      if (b.lastBackupAt) return b.label + ' — letzte Sicherung: ' + new Date(b.lastBackupAt).toLocaleString();
      return b.label;
    }

    window.SRSStore.getBackupStatus().then(function (backup) {
      status.textContent = formatBackupLabel(backup);
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

  // Launch a study session into the existing review runner. `cards` is an array
  // of stored SRS cards; pass includeNotDue=true to drill them all regardless of
  // due date (used by the Lernpfad for freshly introduced New cards).
  var sessionTimer = null;
  function startSession(cards, includeNotDue) {
    if (window.app && window.app.activeTab !== 'review') window.app.switchTab('review');
    // Defer to a macrotask: switchTab triggers the review tab's own renderHome
    // (gated on a separate init promise). Running loadQueue after the microtask
    // queue drains guarantees renderNextReview takes over the panel last.
    // Clear any pending launch so two rapid calls can't both clobber the queue.
    if (sessionTimer) clearTimeout(sessionTimer);
    sessionTimer = setTimeout(function () {
      sessionTimer = null;
      loadQueue(cards || [], includeNotDue);
    }, 0);
  }

  // After a session ends (or a settings flow closes), return the learner to the
  // Lernpfad dashboard — the review tab no longer has its own nav entry, so the
  // path is the single home surface for both learning and reviewing.
  function returnToPath() {
    if (window.app && window.app.switchTab) window.app.switchTab('path');
    else renderHome();
  }

  // Open the backup & settings screen directly. The settings live on the (now
  // nav-less) review tab; switchTab('review') runs the review tab's own
  // onTabActivate -> renderHome via an init promise, so we defer renderSettings
  // to a macrotask to win that race (same pattern as startSession).
  var settingsTimer = null;
  function openSettings() {
    if (window.app && window.app.activeTab !== 'review') window.app.switchTab('review');
    if (settingsTimer) clearTimeout(settingsTimer);
    settingsTimer = setTimeout(function () {
      settingsTimer = null;
      init().then(renderSettings);
    }, 0);
  }

  window.SRSUI = {
    onTabActivate: onTabActivate,
    openSettings: openSettings,
    addItem: addItem,
    getItemStatus: getItemStatus,
    mountDetailControl: mountDetailControl,
    getItemKey: getItemKey,
    getCardSpecs: getCardSpecs,
    getCardsByItem: function (sectionName, item) { return window.SRSStore.getCardsByItem(getItemKey(sectionName, item)); },
    startSession: startSession,
    updateReviewBadge: updateReviewBadge,
    getDueCount: getDueCount,
    _test: {
      makeCardSpec: makeCardSpec,
      buildGrammarCloze: buildGrammarCloze
    }
  };
})();
