// ============================================================
// Lernpfad (Learning Path) — dynamic progression engine for Nihongo Explorer
// ------------------------------------------------------------
// Recommends what to study next based on already-completed content. All learning
// state is derived from the existing SRS store (no separate progress DB); only a
// tiny pathState (target level, daily-new counter, skipped items) is persisted.
// ============================================================
(function () {
  'use strict';

  // --- Configuration ---
  var LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'];
  var SECTIONS = ['kanji', 'vocab', 'grammar'];
  var UNIT_SIZE = { kanji: 15, vocab: 20, grammar: 8 };
  var LEVEL_ADVANCE_RATIO = 0.9; // familiar-or-better ratio to move past a level
  // Weighted round-robin mix when assembling a batch of new items.
  var MIX_WEIGHTS = { kanji: 1, vocab: 1.3, grammar: 0.6 };

  var initialized = false;
  var panel = null;

  // --- Small DOM helper (mirrors srs-ui.js) ---
  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  function isJp(text) {
    return /[　-龯぀-ヿ＀-ﾟ]/.test(text || '');
  }

  // --- Data loading ---
  function ensureData() {
    if (!window.app || !window.app.ensureSectionLoaded) return Promise.resolve();
    return Promise.all([
      window.app.ensureSectionLoaded('kanji'),
      window.app.ensureSectionLoaded('vocab'),
      window.app.ensureSectionLoaded('grammar')
    ]);
  }

  function init() {
    if (initialized) return Promise.resolve();
    initialized = true;
    return window.SRSStore.init().catch(function () {});
  }

  // --- pathState helpers ---
  function todayStr() {
    var d = new Date();
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  }

  function normalizePath(p) {
    p = p || {};
    var daily = (p.newDaily && p.newDaily.date === todayStr()) ? p.newDaily : { date: todayStr(), count: 0 };
    return {
      schemaV: 1,
      kanaDone: !!p.kanaDone,
      targetLevel: LEVELS.indexOf(p.targetLevel) !== -1 ? p.targetLevel : 'N1',
      skippedItems: Array.isArray(p.skippedItems) ? p.skippedItems : [],
      readLessons: Array.isArray(p.readLessons) ? p.readLessons : [],
      newDaily: daily,
      lastSessionAt: p.lastSessionAt || null
    };
  }

  // --- Mastery derivation ---
  function ladderFromClassName(className) {
    if (className === 'mastered') return 'mastered';
    if (className === 'familiar') return 'familiar';
    if (className === 'not-in-review' || className === 'suspended') return 'new';
    return 'learning'; // due | weak | learning
  }

  function mapFromCards(cards, path) {
    var byItem = {};
    cards.forEach(function (c) {
      if (!c || !c.itemKey) return;
      (byItem[c.itemKey] = byItem[c.itemKey] || []).push(c);
    });
    var map = {};
    Object.keys(byItem).forEach(function (key) {
      var status = window.SRSScheduler.getStatus(byItem[key]);
      map[key] = ladderFromClassName(status.className);
    });
    // Items the user explicitly marked as already-known count as familiar.
    (path.skippedItems || []).forEach(function (key) {
      if (map[key] !== 'mastered') map[key] = 'familiar';
    });
    return map;
  }

  function levelOf(section, item) {
    return section === 'kanji' ? item.jlpt : item.level;
  }

  function itemKeyOf(section, item) {
    return window.SRSUI.getItemKey(section, item);
  }

  function itemStatus(section, item, map) {
    return map[itemKeyOf(section, item)] || 'new';
  }

  // --- Progress per level (single pass over all items) ---
  function computeProgress(map, path) {
    var byLevel = {};
    LEVELS.forEach(function (L) {
      byLevel[L] = { level: L, total: 0, mastered: 0, familiar: 0, learning: 0 };
    });
    SECTIONS.forEach(function (s) {
      var sec = window.app.sections[s];
      var items = (sec && sec.allItems) || [];
      for (var i = 0; i < items.length; i++) {
        var b = byLevel[levelOf(s, items[i])];
        if (!b) continue;
        b.total++;
        var st = itemStatus(s, items[i], map);
        if (st === 'mastered') b.mastered++;
        else if (st === 'familiar') b.familiar++;
        else if (st === 'learning') b.learning++;
      }
    });
    var levels = LEVELS.map(function (L) {
      var b = byLevel[L];
      b.done = b.mastered + b.familiar;
      b.ratio = b.total ? b.done / b.total : 0;
      return b;
    });

    var target = path.targetLevel || 'N1';
    var targetIdx = LEVELS.indexOf(target);
    if (targetIdx < 0) targetIdx = LEVELS.length - 1;
    var current = LEVELS[targetIdx];
    for (var i = 0; i <= targetIdx; i++) {
      if (levels[i].ratio < LEVEL_ADVANCE_RATIO) { current = LEVELS[i]; break; }
    }
    return { levels: levels, currentLevel: current, targetLevel: target };
  }

  // --- Kanji -> vocab prerequisite gate ---
  function vocabUnlocked(v, kanjiIndex, map) {
    var w = v.word || '';
    for (var i = 0; i < w.length; i++) {
      var code = w.charCodeAt(i);
      if (code >= 0x4E00 && code <= 0x9FFF) {
        var k = kanjiIndex[w[i]];
        if (!k) continue; // kanji absent from dataset -> can't gate on it
        if (itemStatus('kanji', k, map) === 'new') return false;
      }
    }
    return true;
  }

  function grammarCompare(a, b) {
    var order = { 'Partikel': 0, 'Verben': 1, 'Adjektive': 2, 'Satzstrukturen': 3, 'Keigo': 4 };
    var ca = order[a.category] !== undefined ? order[a.category] : 9;
    var cb = order[b.category] !== undefined ? order[b.category] : 9;
    if (ca !== cb) return ca - cb;
    return String(a.pattern).localeCompare(String(b.pattern), 'ja');
  }

  // Ordered queues of not-yet-started items for a level, wrapped as {section,item}.
  function frontierQueues(level, map) {
    var sec = window.app.sections;
    var wrap = function (s) { return function (it) { return { section: s, item: it }; }; };

    var kanji = ((sec.kanji && sec.kanji.allItems) || []).filter(function (k) { return k.jlpt === level; });
    kanji.sort(function (a, b) {
      return (a.strokes || 99) - (b.strokes || 99) || String(a.kanji).localeCompare(String(b.kanji), 'ja');
    });
    var newKanji = kanji.filter(function (k) { return itemStatus('kanji', k, map) === 'new'; }).map(wrap('kanji'));

    var grammar = ((sec.grammar && sec.grammar.allItems) || []).filter(function (g) { return g.level === level; });
    grammar.sort(grammarCompare);
    var newGrammar = grammar.filter(function (g) { return itemStatus('grammar', g, map) === 'new'; }).map(wrap('grammar'));

    var kanjiIndex = (typeof getKanjiByChar === 'function') ? getKanjiByChar() : {};
    var vocab = ((sec.vocab && sec.vocab.allItems) || []).filter(function (v) { return v.level === level; });
    var gatedVocab = [], waitVocab = [];
    vocab.forEach(function (v) {
      if (itemStatus('vocab', v, map) !== 'new') return;
      (vocabUnlocked(v, kanjiIndex, map) ? gatedVocab : waitVocab).push({ section: 'vocab', item: v });
    });

    return { newKanji: newKanji, newGrammar: newGrammar, gatedVocab: gatedVocab, waitVocab: waitVocab };
  }

  // Weighted round-robin: pull up to `budget` items across queues by weight.
  function interleave(queues, weights, budget) {
    var result = [];
    var acc = weights.map(function () { return 0; });
    while (result.length < budget) {
      var pick = -1, best = -Infinity;
      for (var i = 0; i < queues.length; i++) {
        if (!queues[i].length) continue;
        acc[i] += weights[i];
        if (acc[i] > best) { best = acc[i]; pick = i; }
      }
      if (pick === -1) break;
      result.push(queues[pick].shift());
      acc[pick] -= 1;
    }
    return result;
  }

  function pickNewItems(level, map, budget) {
    if (budget <= 0) return [];
    var q = frontierQueues(level, map);
    var items = interleave(
      [q.newKanji.slice(), q.gatedVocab.slice(), q.newGrammar.slice()],
      [MIX_WEIGHTS.kanji, MIX_WEIGHTS.vocab, MIX_WEIGHTS.grammar],
      budget
    );
    // Relax the gate only once there are no more new kanji to introduce at this level.
    if (items.length < budget && !q.newKanji.length) {
      items = items.concat(interleave(
        [q.waitVocab.slice(), q.newGrammar.slice()],
        [MIX_WEIGHTS.vocab, MIX_WEIGHTS.grammar],
        budget - items.length
      ));
    }
    return items;
  }

  function newBudget(model, dueCount) {
    if (dueCount >= model.settings.dailyReviewLimit) return 0;
    return Math.max(0, model.settings.dailyNewLimit - model.path.newDaily.count);
  }

  function dueSorted(cards, limit) {
    var due = cards.filter(function (c) { return window.SRSScheduler.isDue(c); });
    return window.SRSScheduler.sortQueue(due).slice(0, limit);
  }

  // --- Model assembly ---
  function loadModel() {
    return ensureData().then(function () {
      return Promise.all([
        window.SRSStore.getAllCards(),
        window.SRSStore.getSettings(),
        window.SRSStore.getPathState()
      ]);
    }).then(function (parts) {
      var cards = parts[0] || [];
      var settings = parts[1];
      var path = normalizePath(parts[2]);
      var map = mapFromCards(cards, path);
      var progress = computeProgress(map, path);
      var due = dueSorted(cards, settings.dailyReviewLimit);
      var budget = newBudget({ settings: settings, path: path }, due.length);
      var picks = pickNewItems(progress.currentLevel, map, budget);
      return {
        cards: cards, settings: settings, path: path, map: map,
        progress: progress, due: due, picks: picks,
        suppressedNew: due.length >= settings.dailyReviewLimit
      };
    });
  }

  // --- Session launch ("Heute lernen") ---
  function startToday(model) {
    var picks = model.picks;
    var adds = picks.map(function (p) { return window.SRSUI.addItem(p.section, p.item); });
    Promise.all(adds).then(function (cardLists) {
      var newCards = [];
      cardLists.forEach(function (cs) { if (cs) newCards = newCards.concat(cs); });
      if (picks.length) {
        model.path.newDaily.count += picks.length;
        model.path.lastSessionAt = new Date().toISOString();
        window.SRSStore.savePathState(model.path).catch(function () {});
      }
      var session = model.due.concat(newCards);
      if (!session.length) { render(); return; }
      window.SRSUI.startSession(session, true);
    }).catch(function () {});
  }

  function skipPicks(model) {
    if (!model.picks.length) return;
    if (!window.confirm('Diese ' + model.picks.length + ' Einträge als „kann ich schon“ markieren und überspringen?')) return;
    model.picks.forEach(function (p) {
      var key = itemKeyOf(p.section, p.item);
      if (model.path.skippedItems.indexOf(key) === -1) model.path.skippedItems.push(key);
    });
    window.SRSStore.savePathState(model.path).then(render).catch(render);
    if (window.app) window.app.playTick();
  }

  // Best-effort: jump to an item's detail overlay in its own section.
  function openItemDetail(section, item) {
    var sec = window.app.sections[section];
    if (!sec) return;
    window.app.switchTab(section);
    window.app.ensureSectionLoaded(section).then(function () {
      if (sec.dom.search) {
        sec.dom.search.value = section === 'kanji' ? item.kanji : (item.word || item.pattern || '');
        if (sec.dom.clearSearch) sec.dom.clearSearch.classList.add('visible');
      }
      sec.applyFilters();
      for (var i = 0; i < sec.filteredItems.length; i++) {
        var it = sec.filteredItems[i];
        var hit = (section === 'kanji' && it.kanji === item.kanji) ||
          (section === 'grammar' && it.id === item.id) ||
          (section === 'vocab' && it.word === item.word && it.reading === item.reading);
        if (hit) { sec.openDetail(i); return; }
      }
    }).catch(function () {});
  }

  // --- Rendering ---
  function ensurePanel() {
    panel = document.getElementById('path-content');
    return panel;
  }

  function onTabActivate() {
    if (!ensurePanel()) return;
    renderLoading();
    init().then(render);
  }

  function renderLoading() {
    panel.innerHTML = '';
    var shell = el('div', 'review-shell');
    shell.appendChild(el('div', 'review-title', 'Lernpfad'));
    shell.appendChild(el('div', 'review-subtitle', 'Dein Fortschritt wird berechnet…'));
    panel.appendChild(shell);
  }

  function render() {
    if (!ensurePanel()) return;
    loadModel().then(function (model) {
      panel.innerHTML = '';
      var shell = el('div', 'review-shell');

      var header = el('div', 'review-header');
      header.appendChild(el('div', 'review-title', 'Lernpfad'));
      header.appendChild(el('div', 'review-subtitle', 'Dein nächster Schritt — dynamisch aus deinem Fortschritt berechnet.'));
      shell.appendChild(header);

      shell.appendChild(buildFocus(model));
      shell.appendChild(buildProgress(model));
      shell.appendChild(buildNextUp(model));
      shell.appendChild(buildLessons(model));
      shell.appendChild(buildAdjust(model));

      panel.appendChild(shell);
    }).catch(function () {
      panel.innerHTML = '';
      var shell = el('div', 'review-shell');
      shell.appendChild(el('div', 'review-title', 'Lernpfad'));
      shell.appendChild(el('div', 'review-subtitle', 'Lernpfad konnte nicht geladen werden.'));
      panel.appendChild(shell);
    });
  }

  function buildFocus(model) {
    var box = el('div', 'path-focus');
    box.appendChild(el('div', 'path-focus-label', 'Aktuelle Stufe'));
    box.appendChild(el('div', 'path-focus-level', model.progress.currentLevel));

    var dueCount = model.due.length;
    var newCount = model.picks.length;

    var actions = el('div', 'review-actions');
    var learnBtn = el('button', 'quiz-btn quiz-btn-next',
      'Heute lernen — ' + newCount + ' neu · ' + dueCount + ' Wiederholungen');
    learnBtn.disabled = (newCount + dueCount) === 0;
    learnBtn.addEventListener('click', function () {
      if (window.app) window.app.playPop();
      startToday(model);
    });
    actions.appendChild(learnBtn);

    var reviewBtn = el('button', 'quiz-btn quiz-btn-reveal', 'Nur Wiederholen (' + dueCount + ')');
    reviewBtn.disabled = dueCount === 0;
    reviewBtn.addEventListener('click', function () {
      window.SRSUI.startSession(model.due, true);
    });
    actions.appendChild(reviewBtn);
    box.appendChild(actions);

    if (model.suppressedNew) {
      box.appendChild(el('div', 'review-empty-hint',
        'Viele Karten fällig — erst Wiederholungen aufholen, dann gibt es wieder neue Inhalte.'));
    } else if (newCount === 0 && model.path.newDaily.count > 0) {
      box.appendChild(el('div', 'review-empty-hint',
        'Tagesziel für neue Karten erreicht (' + model.path.newDaily.count + '). Morgen geht es weiter.'));
    }
    return box;
  }

  function buildProgress(model) {
    var box = el('div', 'path-progress');
    box.appendChild(el('div', 'path-section-title', 'Fortschritt nach JLPT-Stufe'));

    var legend = el('div', 'path-legend');
    [['seg-mastered', 'Gemeistert'], ['seg-familiar', 'Vertraut'], ['seg-learning', 'Lernen']].forEach(function (pair) {
      var item = el('div', 'path-legend-item');
      item.appendChild(el('span', 'path-legend-dot ' + pair[0]));
      item.appendChild(el('span', null, pair[1]));
      legend.appendChild(item);
    });
    box.appendChild(legend);

    model.progress.levels.forEach(function (lv) {
      var row = el('div', 'path-level-row');
      var head = el('div', 'path-level-head');
      head.appendChild(el('span', 'path-level-badge ' + lv.level, lv.level));
      head.appendChild(el('span', 'path-level-count', lv.done + ' / ' + lv.total));
      row.appendChild(head);

      var bar = el('div', 'path-bar');
      function seg(cls, n) {
        if (!lv.total || !n) return;
        var s = el('div', 'path-bar-seg ' + cls);
        s.style.width = (n / lv.total * 100) + '%';
        bar.appendChild(s);
      }
      seg('seg-mastered', lv.mastered);
      seg('seg-familiar', lv.familiar);
      seg('seg-learning', lv.learning);
      row.appendChild(bar);
      box.appendChild(row);
    });
    return box;
  }

  function buildNextUp(model) {
    var box = el('div', 'path-next');
    var title = el('div', 'path-section-title', 'Als Nächstes');
    box.appendChild(title);

    if (!model.picks.length) {
      box.appendChild(el('div', 'review-empty-hint',
        model.suppressedNew ? 'Neue Inhalte pausiert, bis die Wiederholungen aufgeholt sind.'
          : 'Aktuell keine neuen Inhalte vorgeschlagen.'));
      return box;
    }

    var list = el('div', 'path-next-list');
    var typeLabel = { kanji: 'Kanji', vocab: 'Vokabel', grammar: 'Grammatik' };
    model.picks.forEach(function (p) {
      var it = p.item;
      var card = el('button', 'path-next-item');
      card.appendChild(el('span', 'path-chip path-chip-' + p.section, typeLabel[p.section] || p.section));
      var main = p.section === 'kanji' ? it.kanji : (it.word || it.pattern || '');
      card.appendChild(el('span', 'path-next-main' + (isJp(main) ? ' jp' : ''), main));
      var sub = p.section === 'kanji' ? (it.meanings || []).join(', ') : (it.meaning || '');
      if (sub) card.appendChild(el('span', 'path-next-sub', sub));
      card.addEventListener('click', function () { openItemDetail(p.section, it); });
      list.appendChild(card);
    });
    box.appendChild(list);

    var skip = el('button', 'srs-small-btn', 'Das kann ich schon');
    skip.addEventListener('click', function () { skipPicks(model); });
    box.appendChild(skip);
    return box;
  }

  function lessonMatchesLevel(lesson, level) {
    return String(lesson.level || '').split('/').indexOf(level) !== -1;
  }

  function markLessonRead(model, id) {
    if (model.path.readLessons.indexOf(id) === -1) {
      model.path.readLessons.push(id);
      window.SRSStore.savePathState(model.path).catch(function () {});
    }
  }

  function openLessonFromPath(id, model) {
    markLessonRead(model, id);
    if (window.app) window.app.switchTab('grammar');
    if (window.app && window.app.ensureGrammarLessonsLoaded) {
      window.app.ensureGrammarLessonsLoaded().then(function () {
        if (window.GrammarLessons) window.GrammarLessons.openLesson(id);
      }).catch(function () {});
    }
  }

  function toggleLessonRead(model, id) {
    var i = model.path.readLessons.indexOf(id);
    if (i === -1) model.path.readLessons.push(id); else model.path.readLessons.splice(i, 1);
    window.SRSStore.savePathState(model.path).then(render).catch(render);
    if (window.app) window.app.playTick();
  }

  function populateLessons(body, model) {
    body.innerHTML = '';
    if (!window.GrammarLessons || !window.GrammarLessons.getLessons) {
      body.appendChild(el('div', 'review-empty-hint', 'Lektionen nicht verfügbar.'));
      return;
    }
    var level = model.progress.currentLevel;
    var read = model.path.readLessons || [];
    var lessons = window.GrammarLessons.getLessons().filter(function (l) {
      return lessonMatchesLevel(l, level);
    });
    if (!lessons.length) {
      body.appendChild(el('div', 'review-empty-hint', 'Keine Lektionen für ' + level + '.'));
      return;
    }

    var list = el('div', 'path-lessons-list');
    var nextMarked = false;
    lessons.forEach(function (l) {
      var isRead = read.indexOf(l.id) !== -1;
      var isNext = !isRead && !nextMarked;
      if (isNext) nextMarked = true;

      var row = el('div', 'path-lesson-item' + (isNext ? ' is-next' : '') + (isRead ? ' is-read' : ''));

      var openBtn = el('button', 'path-lesson-open');
      openBtn.appendChild(el('span', 'path-lesson-num', String(l.number)));
      var titles = el('div', 'path-lesson-titles');
      var titleRow = el('div', 'path-lesson-title-row');
      if (isNext) titleRow.appendChild(el('span', 'path-lesson-next-tag', 'Nächste'));
      if (isRead) titleRow.appendChild(el('span', 'path-lesson-check', '✓'));
      titleRow.appendChild(el('span', 'path-lesson-title', l.title));
      titles.appendChild(titleRow);
      if (l.subtitle) titles.appendChild(el('span', 'path-lesson-sub', l.subtitle));
      openBtn.appendChild(titles);
      openBtn.appendChild(el('span', 'path-chip path-chip-grammar', l.level));
      openBtn.addEventListener('click', function () { openLessonFromPath(l.id, model); });
      row.appendChild(openBtn);

      var toggle = el('button', 'srs-small-btn path-lesson-toggle', isRead ? 'Ungelesen' : 'Gelesen');
      toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleLessonRead(model, l.id);
      });
      row.appendChild(toggle);

      list.appendChild(row);
    });
    body.appendChild(list);
  }

  function buildLessons(model) {
    var box = el('div', 'path-lessons');
    box.appendChild(el('div', 'path-section-title', 'Grammatiklektionen'));
    var body = el('div', 'path-lessons-body');
    box.appendChild(body);

    if (!window.app || !window.app.ensureGrammarLessonsLoaded) {
      body.appendChild(el('div', 'review-empty-hint', 'Lektionen nicht verfügbar.'));
      return box;
    }
    body.appendChild(el('div', 'review-empty-hint', 'Lektionen werden geladen…'));
    window.app.ensureGrammarLessonsLoaded().then(function () {
      populateLessons(body, model);
    }).catch(function () {
      body.innerHTML = '';
      body.appendChild(el('div', 'review-empty-hint', 'Lektionen konnten nicht geladen werden.'));
    });
    return box;
  }

  function buildAdjust(model) {
    var box = el('div', 'path-adjust');
    var row = el('div', 'path-adjust-row');

    var label = el('label', 'path-adjust-label', 'Zielniveau');
    label.setAttribute('for', 'path-target-select');
    row.appendChild(label);

    var select = el('select', 'path-target-select');
    select.id = 'path-target-select';
    LEVELS.forEach(function (L) {
      var opt = el('option', null, L);
      opt.value = L;
      if (L === model.progress.targetLevel) opt.selected = true;
      select.appendChild(opt);
    });
    select.addEventListener('change', function () {
      model.path.targetLevel = select.value;
      window.SRSStore.savePathState(model.path).then(render).catch(render);
    });
    row.appendChild(select);
    box.appendChild(row);

    var settingsBtn = el('button', 'quiz-btn quiz-btn-back', 'Sicherung & Einstellungen');
    settingsBtn.addEventListener('click', function () { if (window.app) window.app.switchTab('review'); });
    box.appendChild(settingsBtn);
    return box;
  }

  // True if the learner has any history -> the app should land on the Lernpfad.
  function shouldLandHere() {
    if (!window.SRSStore) return Promise.resolve(false);
    return Promise.all([window.SRSStore.getAllCards(), window.SRSStore.getPathState()])
      .then(function (parts) {
        return ((parts[0] && parts[0].length > 0) || !!parts[1]);
      })
      .catch(function () { return false; });
  }

  window.LearningPath = {
    onTabActivate: onTabActivate,
    shouldLandHere: shouldLandHere,
    // exposed for audit/testing
    _engine: {
      LEVELS: LEVELS,
      normalizePath: normalizePath,
      mapFromCards: mapFromCards,
      computeProgress: computeProgress,
      frontierQueues: frontierQueues,
      pickNewItems: pickNewItems,
      newBudget: newBudget,
      vocabUnlocked: vocabUnlocked,
      interleave: interleave,
      itemKeyOf: itemKeyOf,
      itemStatus: itemStatus,
      lessonMatchesLevel: lessonMatchesLevel
    }
  };
})();
