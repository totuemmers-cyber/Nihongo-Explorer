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

  function statCard(label, value) {
    var card = el('div', 'review-stat');
    card.appendChild(el('span', 'review-stat-value', value));
    card.appendChild(el('span', 'review-stat-label', label));
    return card;
  }

  // A stat that doubles as a goal gauge: "8 / 20" plus a slim fill bar.
  function progressStatCard(label, done, total) {
    var card = el('div', 'review-stat');
    card.appendChild(el('span', 'review-stat-value', done + ' / ' + total));
    card.appendChild(el('span', 'review-stat-label', label));
    var bar = el('div', 'path-stat-bar');
    var fill = el('div', 'path-stat-bar-fill');
    fill.style.width = (total > 0 ? Math.min(100, Math.round(done / total * 100)) : 0) + '%';
    bar.appendChild(fill);
    card.appendChild(bar);
    return card;
  }

  // Rough session-length estimate. New cards take longer to digest than reviews;
  // these per-card seconds are deliberately coarse — it only sets expectations.
  function estimateMinutes(newCount, dueCount) {
    return Math.max(1, Math.round((newCount * 12 + dueCount * 7) / 60));
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
  function dayStr(d) {
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  }
  function todayStr() { return dayStr(new Date()); }
  function yesterdayStr() {
    var d = new Date();
    d.setDate(d.getDate() - 1);
    return dayStr(d);
  }

  function normalizePath(p) {
    p = p || {};
    var daily = (p.newDaily && p.newDaily.date === todayStr()) ? p.newDaily : { date: todayStr(), count: 0 };
    return {
      schemaV: 1,
      kanaDone: !!p.kanaDone,
      targetLevel: LEVELS.indexOf(p.targetLevel) !== -1 ? p.targetLevel : 'N1',
      startLevel: LEVELS.indexOf(p.startLevel) !== -1 ? p.startLevel : 'N5',
      skippedItems: Array.isArray(p.skippedItems) ? p.skippedItems : [],
      readLessons: Array.isArray(p.readLessons) ? p.readLessons : [],
      newDaily: daily,
      lastSessionAt: p.lastSessionAt || null,
      // Motivation tracking: a daily streak and the highest level already announced.
      streakCount: typeof p.streakCount === 'number' ? p.streakCount : 0,
      streakLastDay: p.streakLastDay || null,
      seenLevel: LEVELS.indexOf(p.seenLevel) !== -1 ? p.seenLevel : null
    };
  }

  // The streak the learner can currently see. Alive if they studied today or
  // yesterday (yesterday = not yet extended today); otherwise it has lapsed to 0.
  function currentStreak(path) {
    var last = path.streakLastDay;
    if (!last) return 0;
    if (last === todayStr() || last === yesterdayStr()) return path.streakCount || 0;
    return 0;
  }

  // Record that the learner studied today, extending or restarting the streak.
  // Mutates path; caller persists. No-op if today was already counted.
  function markStudyDay(path) {
    var today = todayStr();
    if (path.streakLastDay === today) return;
    path.streakCount = (path.streakLastDay === yesterdayStr()) ? (path.streakCount || 0) + 1 : 1;
    path.streakLastDay = today;
  }

  // Mark + persist a study day for review/practice launches that bypass startToday.
  function recordStudyStart(path) {
    markStudyDay(path);
    path.lastSessionAt = new Date().toISOString();
    window.SRSStore.savePathState(path).catch(function () {});
  }

  // --- Mastery derivation ---
  function ladderFromClassName(className) {
    if (className === 'mastered') return 'mastered';
    if (className === 'familiar') return 'familiar';
    if (className === 'not-in-review') return 'new';
    // 'suspended' falls through to 'learning' so suspended items count as in-progress
    // and are NOT re-recommended as new by pickNewItems (which selects status 'new').
    return 'learning'; // due | weak | learning | suspended
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
    // Everything below the chosen starting level counts as already known, so the
    // path skips those levels and their kanji don't gate higher-level vocab.
    var startIdx = LEVELS.indexOf(path.startLevel || 'N5');
    if (startIdx > 0 && window.app && window.app.sections) {
      SECTIONS.forEach(function (s) {
        var items = (window.app.sections[s] && window.app.sections[s].allItems) || [];
        items.forEach(function (it) {
          if (LEVELS.indexOf(levelOf(s, it)) < startIdx) {
            var key = itemKeyOf(s, it);
            if (map[key] !== 'mastered') map[key] = 'familiar';
          }
        });
      });
    }
    return map;
  }

  function levelOf(section, item) {
    return section === 'kanji' ? item.jlpt : item.level;
  }

  function itemKeyOf(section, item) {
    if (item && item.__lpKey) return item.__lpKey;
    var key = window.SRSUI.getItemKey(section, item);
    if (item) item.__lpKey = key;
    return key;
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

  // Decide whether a level-up is worth celebrating. Only a rise ABOVE a stored
  // baseline counts; a null baseline (first run, or after a Startniveau change that
  // resets it) is adopted silently, so settings tweaks never trigger a false banner.
  function decideLevelUp(prevSeenLevel, currentLevel) {
    var seenIdx = LEVELS.indexOf(prevSeenLevel);
    var curIdx = LEVELS.indexOf(currentLevel);
    return {
      leveledUp: (seenIdx >= 0 && curIdx > seenIdx) ? currentLevel : null,
      seenLevel: currentLevel
    };
  }

  // --- Kanji -> vocab prerequisite gate ---
  // The kanji (still 'new') inside a word that keep it gated. Empty => unlocked.
  function blockingKanji(v, kanjiIndex, map) {
    var w = v.word || '', out = [];
    for (var i = 0; i < w.length; i++) {
      var code = w.charCodeAt(i);
      if (code >= 0x3400 && code <= 0x9FFF) { // CJK Unified + Ext-A
        var k = kanjiIndex[w[i]];
        if (!k) continue; // kanji absent from dataset -> can't gate on it
        if (itemStatus('kanji', k, map) === 'new') out.push(w[i]);
      }
    }
    return out;
  }

  function vocabUnlocked(v, kanjiIndex, map) {
    return blockingKanji(v, kanjiIndex, map).length === 0;
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

    return { newKanji: newKanji, newGrammar: newGrammar, gatedVocab: gatedVocab, waitVocab: waitVocab, kanjiIndex: kanjiIndex };
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

  // `queues` is optional: pass a pre-computed frontierQueues(level, map) to avoid
  // recomputing it (loadModel already needs the queues for the waiting preview).
  function pickNewItems(level, map, budget, queues) {
    if (budget <= 0) return [];
    var q = queues || frontierQueues(level, map);
    var items = interleave(
      [q.newKanji.slice(), q.gatedVocab.slice(), q.newGrammar.slice()],
      [MIX_WEIGHTS.kanji, MIX_WEIGHTS.vocab, MIX_WEIGHTS.grammar],
      budget
    );
    // Relax the gate only once there are no more new kanji to introduce at this
    // level. Grammar is already fully consumed in the first pass (interleave only
    // stops early when every queue is empty), so re-adding it here would duplicate
    // picks — only the kanji-gated vocab (waitVocab) remains to offer.
    if (items.length < budget && !q.newKanji.length) {
      items = items.concat(interleave(
        [q.waitVocab.slice()],
        [MIX_WEIGHTS.vocab],
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
        window.SRSStore.getPathState(),
        window.SRSStore.getBackupStatus().catch(function () { return null; })
      ]);
    }).then(function (parts) {
      var cards = parts[0] || [];
      var settings = parts[1];
      var path = normalizePath(parts[2]);
      var backup = parts[3];
      var map = mapFromCards(cards, path);
      var progress = computeProgress(map, path);
      // Level-up detection. Persist the re-based seenLevel only when a baseline
      // already existed or a real level-up fired — never write a phantom pathState
      // just because a brand-new user opened the tab (a null baseline adopts the
      // current level in memory and gets persisted on their first real action).
      var prevSeen = parts[2] ? parts[2].seenLevel : null;
      var lv = decideLevelUp(path.seenLevel, progress.currentLevel);
      var leveledUp = lv.leveledUp;
      path.seenLevel = lv.seenLevel;
      if (path.seenLevel !== prevSeen && (prevSeen != null || leveledUp)) {
        window.SRSStore.savePathState(path).catch(function () {});
      }
      var due = dueSorted(cards, settings.dailyReviewLimit);
      // The daily "new" budget is measured in cards: each introduction is a single
      // card (a primary, or a sibling unlocked on a later day). Already-created New
      // cards that are ready (staggered siblings whose day has come, or manually
      // added items) form a backlog that is consumed before brand-new items start.
      var budget = newBudget({ settings: settings, path: path }, due.length);
      var newReady = window.SRSScheduler.sortQueue(
        cards.filter(function (c) { return window.SRSScheduler.isNewReady(c); })
      );
      var itemsToStart = Math.max(0, budget - newReady.length);
      // Compute the frontier once and reuse it for both picks and the waiting preview
      // (pickNewItems only reads slices of the queues, so they stay intact here).
      var queues = frontierQueues(progress.currentLevel, map);
      var picks = pickNewItems(progress.currentLevel, map, itemsToStart, queues);
      // A short preview of vocab still gated by not-yet-learned kanji, so the path
      // explains *why* it isn't suggesting these yet instead of silently hiding them.
      var suppressedNew = due.length >= settings.dailyReviewLimit;
      var waiting = suppressedNew ? [] : queues.waitVocab.slice(0, 4).map(function (p) {
        return { section: 'vocab', item: p.item, blocking: blockingKanji(p.item, queues.kanjiIndex, map) };
      });
      return {
        cards: cards, settings: settings, path: path, map: map,
        progress: progress, due: due, picks: picks, waiting: waiting,
        newReady: newReady, budget: budget, backup: backup,
        suppressedNew: suppressedNew, leveledUp: leveledUp
      };
    });
  }

  // --- Session launch ("Heute lernen") ---
  var launching = false;
  function startToday(model, btn) {
    if (launching) return Promise.resolve(); // guard against double-clicks
    launching = true;
    if (btn) btn.disabled = true;
    var picks = model.picks;
    return Promise.all(picks.map(function (p) { return window.SRSUI.addItem(p.section, p.item); }))
      .then(function (cardLists) {
        // Of the freshly created cards, only the ready-now ones (primaries) join
        // today's session; staggered siblings wait for their day.
        var newlyReady = [];
        cardLists.forEach(function (cs) {
          (cs || []).forEach(function (c) {
            if (window.SRSScheduler.isNewReady(c)) newlyReady.push(c);
          });
        });
        // Today's new cards = ready backlog + new primaries, capped by the budget.
        var newCardsToday = (model.newReady || []).concat(newlyReady).slice(0, Math.max(0, model.budget));
        var session = model.due.concat(newCardsToday);
        // Only count the day toward the streak once there is a real session to run —
        // an empty/stale launch must not pad the streak or the daily counter.
        if (!session.length) { render(); return null; }
        if (newCardsToday.length) model.path.newDaily.count += newCardsToday.length;
        model.path.lastSessionAt = new Date().toISOString();
        markStudyDay(model.path);
        return window.SRSStore.savePathState(model.path).then(
          function () { return session; },
          function () { return session; }
        );
      })
      .then(function (session) {
        if (session) window.SRSUI.startSession(session, true);
      })
      .catch(function () {
        if (btn) { btn.disabled = false; btn.textContent = 'Fehler — bitte erneut versuchen'; }
      })
      .then(function () { launching = false; });
  }

  // Mark a single suggested item as already known. The granular, low-stakes
  // counterpart to skipPicks — no dialog, just remove this one and re-render.
  function skipOne(model, section, item) {
    var key = itemKeyOf(section, item);
    if (model.path.skippedItems.indexOf(key) === -1) model.path.skippedItems.push(key);
    window.SRSStore.savePathState(model.path).then(render).catch(render);
    if (window.app) window.app.playTick();
  }

  // Mark every current suggestion as already known. This is the broad stroke, so
  // it keeps a confirmation (there is no un-skip UI); the per-item ✓ is the safe
  // default for "I know this one".
  function skipPicks(model) {
    if (!model.picks.length) return;
    if (!window.confirm('Alle ' + model.picks.length + ' Vorschläge als „kenne ich schon“ markieren?')) return;
    model.picks.forEach(function (p) {
      var key = itemKeyOf(p.section, p.item);
      if (model.path.skippedItems.indexOf(key) === -1) model.path.skippedItems.push(key);
    });
    window.SRSStore.savePathState(model.path).then(render).catch(render);
    if (window.app) window.app.playTick();
  }

  // Open a to-learn item's detail overlay IN PLACE (no tab switch). The overlays are
  // top-level, so they render over the Lernpfad and closing them returns here directly.
  function openItemDetail(section, item) {
    var sec = window.app.sections[section];
    if (!sec) return;
    window.app.ensureSectionLoaded(section).then(function () {
      sec.showItem(item);
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

      var warning = buildBackupWarning(model);
      if (warning) shell.appendChild(warning);

      if (model.leveledUp) {
        shell.appendChild(buildLevelUp(model));
        if (window.app && window.app.playPop) window.app.playPop();
      }

      shell.appendChild(buildFocus(model));
      shell.appendChild(buildNextUp(model));

      // Progress, lessons and target level share one flush, equal-height row.
      var overview = el('div', 'path-overview');
      overview.appendChild(buildProgress(model));
      overview.appendChild(buildLessons(model));
      overview.appendChild(buildAdjust(model));
      shell.appendChild(overview);

      panel.appendChild(shell);
    }).catch(function () {
      panel.innerHTML = '';
      var shell = el('div', 'review-shell');
      shell.appendChild(el('div', 'review-title', 'Lernpfad'));
      shell.appendChild(el('div', 'review-subtitle', 'Lernpfad konnte nicht geladen werden.'));
      panel.appendChild(shell);
    });
  }

  // Prominent banner when there is progress worth protecting but it is not
  // safely backed up. IndexedDB can be wiped by "clear site data" (and is
  // auto-evicted on iOS/Safari), so a connected backup file is the only thing
  // that survives — nudge for it here instead of hiding it in settings.
  function buildBackupWarning(model) {
    var backup = model.backup || {};
    var hasProgress = !!(model.cards && model.cards.length);
    if (!hasProgress) return null;                          // nothing to lose yet
    if (backup.mode === 'file' && !backup.lastError) return null; // connected & healthy

    var box = el('div', 'path-backup-warning');
    var head = el('div', 'path-backup-warning-head');

    if (backup.mode === 'file' && backup.lastError) {
      box.className += ' is-error';
      head.textContent = '⚠️ Automatische Sicherung fehlgeschlagen';
      box.appendChild(head);
      box.appendChild(el('div', 'path-backup-warning-text',
        'Die letzte Sicherung schlug fehl (' + backup.lastError + '). Dein Fortschritt liegt nur im Browser — bitte erneut verbinden oder exportieren.'));
    } else if (backup.mode === 'manual') {
      head.textContent = '⚠️ Kein automatisches Backup möglich';
      box.appendChild(head);
      box.appendChild(el('div', 'path-backup-warning-text',
        'Dieser Browser unterstützt keine automatische Sicherungsdatei. Exportiere regelmäßig eine Sicherung — sonst geht dein Fortschritt beim Löschen der Websitedaten verloren.'));
    } else {
      head.textContent = '⚠️ Kein Backup verbunden';
      box.appendChild(head);
      box.appendChild(el('div', 'path-backup-warning-text',
        'Dein Fortschritt liegt nur im Browser und geht beim Löschen der Websitedaten (oder automatisch auf iOS/Safari) verloren. Verbinde eine Sicherungsdatei — danach wird automatisch gesichert.'));
    }

    var actions = el('div', 'path-backup-warning-actions');
    if (backup.mode !== 'manual' && window.SRSStore.canUseFileBackup && window.SRSStore.canUseFileBackup()) {
      var connectBtn = el('button', 'quiz-btn quiz-btn-next', 'Sicherung verbinden');
      connectBtn.addEventListener('click', function () {
        connectBtn.disabled = true;
        window.SRSStore.connectBackupFile().then(function () {
          if (window.app) window.app.playPop();
          render();
        }).catch(function (err) {
          connectBtn.disabled = false;
          head.textContent = '⚠️ ' + ((err && err.message) || 'Verbinden fehlgeschlagen');
        });
      });
      actions.appendChild(connectBtn);
    }
    var exportBtn = el('button', 'quiz-btn quiz-btn-reveal', 'Jetzt exportieren');
    exportBtn.addEventListener('click', function () {
      window.SRSStore.downloadBackup();
      if (window.app) window.app.playTick();
    });
    actions.appendChild(exportBtn);
    box.appendChild(actions);
    return box;
  }

  function buildLevelUp(model) {
    var box = el('div', 'path-levelup');
    box.appendChild(el('div', 'path-levelup-head', '🎉 Stufe ' + model.leveledUp + ' erreicht!'));
    box.appendChild(el('div', 'path-levelup-text',
      'Du hast genug der vorherigen Stufe gemeistert — neue Inhalte auf ' + model.leveledUp + ' sind jetzt freigeschaltet.'));
    return box;
  }

  function buildDoneCard(model) {
    var box = el('div', 'path-done');
    box.appendChild(el('div', 'path-done-head', '✓ Tagesziel erreicht'));
    var streak = currentStreak(model.path);
    box.appendChild(el('div', 'path-done-text', streak > 1
      ? 'Stark — ' + streak + ' Tage in Folge. Komm morgen wieder, um die Serie zu halten.'
      : 'Für heute ist alles erledigt. Morgen geht es weiter.'));
    return box;
  }

  function buildFocus(model) {
    var box = el('div', 'path-focus');
    box.appendChild(el('div', 'path-focus-label', 'Aktuelle Stufe'));
    box.appendChild(el('div', 'path-focus-level', model.progress.currentLevel));

    var streak = currentStreak(model.path);
    if (streak > 0) {
      box.appendChild(el('div', 'path-streak',
        '🔥 ' + streak + (streak === 1 ? ' Tag' : ' Tage') + ' in Folge'));
    }

    var dueCount = model.due.length;
    // New cards introduced today = ready backlog + freshly started items, capped
    // by the daily card budget. This is what the session will actually contain,
    // so the label matches reality (no more "20 Einträge" turning into 61 cards).
    var newToday = Math.min(Math.max(0, model.budget), (model.newReady || []).length + model.picks.length);

    // Review status, folded in from the former Wiederholen home screen.
    // "Active" = cards actually in your rotation. Staggered New siblings whose day
    // hasn't come yet are upcoming, not active, so they don't inflate the count
    // (adding 20 items creates ~61 cards, but only the introduced ones are active).
    var nowMs = Date.now();
    var cards = model.cards || [];
    var activeCards = cards.filter(function (c) {
      if (c.suspended) return false;
      if (c.state === 'New' && new Date(c.dueAt || 0).getTime() > nowMs) return false;
      return true;
    });
    var weakCards = activeCards.filter(function (c) { return (c.lapses || 0) > 0 || c.state === 'Relearning'; });

    var stats = el('div', 'review-stats');
    stats.appendChild(statCard('Fällig', dueCount));
    // Daily goal gauge: new cards introduced today vs. the daily target. Labelled
    // "Tagesziel" (not "Neu heute") so it doesn't clash with the button's
    // this-session new-card count.
    stats.appendChild(progressStatCard('Tagesziel', model.path.newDaily.count, model.settings.dailyNewLimit));
    stats.appendChild(statCard('Aktive Karten', activeCards.length));
    stats.appendChild(statCard('Schwach', weakCards.length));
    box.appendChild(stats);

    var actions = el('div', 'review-actions');
    var learnLabel = 'Heute lernen — ' + newToday + ' neue Karten · ' + dueCount + ' Wiederholungen';
    if (newToday + dueCount > 0) learnLabel += ' · ~' + estimateMinutes(newToday, dueCount) + ' Min';
    var learnBtn = el('button', 'quiz-btn quiz-btn-next', learnLabel);
    learnBtn.disabled = (newToday + dueCount) === 0;
    learnBtn.addEventListener('click', function () {
      if (window.app) window.app.playPop();
      startToday(model, learnBtn);
    });
    actions.appendChild(learnBtn);

    var reviewBtn = el('button', 'quiz-btn quiz-btn-reveal', 'Nur Wiederholen (' + dueCount + ')');
    reviewBtn.disabled = dueCount === 0;
    reviewBtn.addEventListener('click', function () {
      recordStudyStart(model.path);
      window.SRSUI.startSession(model.due, true);
    });
    actions.appendChild(reviewBtn);

    var practiceBtn = el('button', 'quiz-btn quiz-btn-back', 'Alle aktiven Karten üben (' + activeCards.length + ')');
    practiceBtn.disabled = activeCards.length === 0;
    practiceBtn.addEventListener('click', function () {
      recordStudyStart(model.path);
      window.SRSUI.startSession(activeCards, true);
    });
    actions.appendChild(practiceBtn);

    // Focused drill over the weak cards (lapsed or relearning) — the items most at
    // risk of becoming leeches.
    if (weakCards.length) {
      var weakBtn = el('button', 'quiz-btn quiz-btn-back', 'Schwache Karten üben (' + weakCards.length + ')');
      weakBtn.addEventListener('click', function () {
        recordStudyStart(model.path);
        window.SRSUI.startSession(weakCards, true);
      });
      actions.appendChild(weakBtn);
    }
    box.appendChild(actions);

    if (model.suppressedNew) {
      box.appendChild(el('div', 'review-empty-hint',
        'Viele Karten fällig — erst Wiederholungen aufholen, dann gibt es wieder neue Inhalte.'));
    } else if (dueCount === 0 && newToday === 0 && model.path.newDaily.count > 0) {
      // Nothing left for today and work was done — celebrate instead of a flat line.
      box.appendChild(buildDoneCard(model));
    } else if (newToday === 0 && model.path.newDaily.count > 0) {
      box.appendChild(el('div', 'review-empty-hint',
        'Tagesziel für neue Karten erreicht (' + model.path.newDaily.count + '). Es bleiben noch Wiederholungen.'));
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
      // Count items that are at least in progress (matches the filled bar), so the
      // number moves the moment you start learning — even before an item's
      // staggered sibling cards are all introduced and it counts as "familiar".
      var started = lv.mastered + lv.familiar + lv.learning;
      head.appendChild(el('span', 'path-level-count', started + ' / ' + lv.total));
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

  var TYPE_LABEL = { kanji: 'Kanji', vocab: 'Vokabel', grammar: 'Grammatik' };

  // One card in the "Tägliches Lernpensum" grid. opts.lockedNote (string) renders a
  // greyed-out, non-skippable preview that explains why the item is still waiting.
  function nextItemCard(p, model, opts) {
    opts = opts || {};
    var it = p.item;
    var card = el('div', 'path-next-item' + (opts.lockedNote ? ' is-locked' : ''));

    var open = el('button', 'path-next-open');
    open.appendChild(el('span', 'path-chip path-chip-' + p.section, TYPE_LABEL[p.section] || p.section));
    var main = p.section === 'kanji' ? it.kanji : (it.word || it.pattern || '');
    open.appendChild(el('span', 'path-next-main' + (isJp(main) ? ' jp' : ''), main));
    var sub = p.section === 'kanji' ? (it.meanings || []).join(', ') : (it.meaning || '');
    if (sub) open.appendChild(el('span', 'path-next-sub', sub));
    if (opts.lockedNote) open.appendChild(el('span', 'path-next-wait', opts.lockedNote));
    open.addEventListener('click', function () { openItemDetail(p.section, it); });
    card.appendChild(open);

    if (!opts.lockedNote) {
      var known = el('button', 'path-next-known', '✓');
      known.title = 'Kenne ich schon';
      known.setAttribute('aria-label', 'Kenne ich schon');
      known.addEventListener('click', function (e) {
        e.stopPropagation();
        skipOne(model, p.section, it);
      });
      card.appendChild(known);
    }
    return card;
  }

  function buildNextUp(model) {
    var box = el('div', 'path-next');
    box.appendChild(el('div', 'path-section-title', 'Tägliches Lernpensum'));

    var waiting = model.waiting || [];

    if (!model.picks.length && !waiting.length) {
      box.appendChild(el('div', 'review-empty-hint',
        model.suppressedNew ? 'Neue Inhalte pausiert, bis die Wiederholungen aufgeholt sind.'
          : 'Aktuell keine neuen Inhalte vorgeschlagen.'));
      return box;
    }

    if (model.picks.length) {
      var list = el('div', 'path-next-list');
      model.picks.forEach(function (p) { list.appendChild(nextItemCard(p, model)); });
      box.appendChild(list);

      var skip = el('button', 'srs-small-btn', 'Alle als bekannt');
      skip.addEventListener('click', function () { skipPicks(model); });
      box.appendChild(skip);
    }

    // "Bald verfügbar" — vocab whose kanji you still need to learn first.
    if (waiting.length) {
      box.appendChild(el('div', 'path-next-subtitle', 'Bald verfügbar'));
      var wlist = el('div', 'path-next-list');
      waiting.forEach(function (w) {
        var note = (w.blocking && w.blocking.length)
          ? 'Wartet auf Kanji ' + w.blocking.join(' ')
          : 'Wartet auf Voraussetzungen';
        wlist.appendChild(nextItemCard({ section: w.section, item: w.item }, model, { lockedNote: note }));
      });
      box.appendChild(wlist);
    }
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

  function openAllLessons() {
    if (window.app) window.app.switchTab('grammar');
    if (window.app && window.app.ensureGrammarLessonsLoaded) {
      window.app.ensureGrammarLessonsLoaded().then(function () {
        if (window.GrammarLessons && window.GrammarLessons.openLessonsView) window.GrammarLessons.openLessonsView();
      }).catch(function () {});
    }
  }

  var LESSONS_SHOWN = 3;

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

    // Show only the next few unread lessons (already in didactic order).
    var unread = lessons.filter(function (l) { return read.indexOf(l.id) === -1; });
    var readCount = lessons.length - unread.length;

    if (!unread.length) {
      body.appendChild(el('div', 'review-empty-hint', 'Alle Lektionen für ' + level + ' gelesen ✓'));
    } else {
      var shown = unread.slice(0, LESSONS_SHOWN);
      var list = el('div', 'path-lessons-list');
      shown.forEach(function (l, idx) {
        var isNext = idx === 0;
        var row = el('div', 'path-lesson-item' + (isNext ? ' is-next' : ''));

        var openBtn = el('button', 'path-lesson-open');
        openBtn.appendChild(el('span', 'path-lesson-num', String(l.number)));
        var titles = el('div', 'path-lesson-titles');
        var titleRow = el('div', 'path-lesson-title-row');
        if (isNext) titleRow.appendChild(el('span', 'path-lesson-next-tag', 'Nächste'));
        titleRow.appendChild(el('span', 'path-lesson-title', l.title));
        titles.appendChild(titleRow);
        if (l.subtitle) titles.appendChild(el('span', 'path-lesson-sub', l.subtitle));
        openBtn.appendChild(titles);
        openBtn.appendChild(el('span', 'path-chip path-chip-grammar', l.level));
        openBtn.addEventListener('click', function () { openLessonFromPath(l.id, model); });
        row.appendChild(openBtn);

        var toggle = el('button', 'srs-small-btn path-lesson-toggle', 'Gelesen');
        toggle.addEventListener('click', function (e) {
          e.stopPropagation();
          toggleLessonRead(model, l.id);
        });
        row.appendChild(toggle);

        list.appendChild(row);
      });
      body.appendChild(list);
    }

    // Footer: link to the full Lektionen view + a small progress summary.
    var more = el('div', 'path-lessons-more');
    var link = el('button', 'path-lessons-more-link', 'Alle Lektionen ansehen');
    link.addEventListener('click', openAllLessons);
    more.appendChild(link);
    more.appendChild(el('span', 'path-lessons-more-count',
      ' (' + readCount + ' gelesen · ' + lessons.length + ' gesamt)'));
    body.appendChild(more);
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

  var NEW_PER_DAY_OPTIONS = [5, 10, 15, 20, 30, 40, 50];
  var REVIEWS_PER_DAY_OPTIONS = [50, 100, 120, 150, 200, 300, 9999];

  function makeSelectRow(labelText, id, options, currentValue, formatOption, onChange) {
    var row = el('div', 'path-adjust-row');
    var label = el('label', 'path-adjust-label', labelText);
    label.setAttribute('for', id);
    row.appendChild(label);
    var select = el('select', 'path-target-select');
    select.id = id;
    options.forEach(function (val) {
      var opt = el('option', null, formatOption ? formatOption(val) : String(val));
      opt.value = String(val);
      if (String(val) === String(currentValue)) opt.selected = true;
      select.appendChild(opt);
    });
    select.addEventListener('change', function () { onChange(select.value); });
    row.appendChild(select);
    return row;
  }

  function buildAdjust(model) {
    var box = el('div', 'path-adjust');
    box.appendChild(el('div', 'path-section-title', 'So lerne ich'));

    // Pace: how many new cards to introduce per day (the daily new-card budget).
    box.appendChild(makeSelectRow('Neue Karten pro Tag', 'path-new-per-day',
      NEW_PER_DAY_OPTIONS, model.settings.dailyNewLimit, null, function (value) {
        model.settings.dailyNewLimit = parseInt(value, 10) || 20;
        window.SRSStore.saveSettings(model.settings).then(render).catch(render);
      }));

    // Pace: cap on reviews per day; above it, new cards pause until you catch up.
    box.appendChild(makeSelectRow('Wiederholungen pro Tag (max.)', 'path-reviews-per-day',
      REVIEWS_PER_DAY_OPTIONS, model.settings.dailyReviewLimit,
      function (v) { return v >= 9999 ? 'Unbegrenzt' : String(v); },
      function (value) {
        model.settings.dailyReviewLimit = parseInt(value, 10) || 120;
        window.SRSStore.saveSettings(model.settings).then(render).catch(render);
      }));

    // Starting level: treat everything below as already known and begin here.
    // Confirm first — it reclassifies every lower level as "vertraut" and visibly
    // shifts the progress bars, and there is no per-item undo for that sweep.
    box.appendChild(makeSelectRow('Startniveau', 'path-start-level',
      LEVELS, model.path.startLevel || 'N5', null, function (value) {
        var prev = model.path.startLevel || 'N5';
        if (value === prev) return;
        var raising = LEVELS.indexOf(value) > LEVELS.indexOf(prev);
        var msg = raising
          ? 'Startniveau auf ' + value + ' setzen?\n\nAlle Stufen unter ' + value
            + ' gelten dann als „vertraut“ und die Fortschrittsanzeige ändert sich entsprechend. '
            + 'Höhere Stufen folgen automatisch.'
          : 'Startniveau auf ' + value + ' senken?\n\nStufen ab ' + value
            + ' werden wieder als Lernstoff behandelt.';
        if (!window.confirm(msg)) { render(); return; } // re-render restores the saved value
        model.path.startLevel = value;
        // Reset the level-up baseline: the resulting currentLevel jump is a settings
        // effect, not learning, so the next render adopts it silently (no false banner).
        model.path.seenLevel = null;
        window.SRSStore.savePathState(model.path).then(render).catch(render);
      }));
    box.appendChild(el('div', 'path-adjust-hint',
      'Stufen unter dem Startniveau gelten als bekannt — neue Inhalte starten ab hier. Höhere Stufen folgen automatisch.'));

    var actions = el('div', 'review-actions');

    var dailyBtn = el('button', 'quiz-btn quiz-btn-back',
      'Tagesfortschritt zurücksetzen (' + model.path.newDaily.count + ' neue Karten heute)');
    dailyBtn.disabled = model.path.newDaily.count === 0;
    dailyBtn.addEventListener('click', function () {
      model.path.newDaily = { date: todayStr(), count: 0 };
      window.SRSStore.savePathState(model.path).then(render).catch(render);
      if (window.app) window.app.playTick();
    });
    actions.appendChild(dailyBtn);

    var settingsBtn = el('button', 'quiz-btn quiz-btn-back', 'Sicherung & Einstellungen');
    settingsBtn.addEventListener('click', function () {
      if (window.SRSUI && window.SRSUI.openSettings) window.SRSUI.openSettings();
      else if (window.app) window.app.switchTab('review');
    });
    actions.appendChild(settingsBtn);
    box.appendChild(actions);
    return box;
  }

  // --- First-run onboarding (2C) ---
  var onboardingShown = false;

  // Show a one-time setup modal for brand-new users (no cards, no pathState):
  // pick a start level + daily pace and explain the learn -> review -> progress loop.
  function maybeShowOnboarding() {
    if (onboardingShown || !window.SRSStore) return Promise.resolve();
    return init().then(function () {
      return Promise.all([
        window.SRSStore.getAllCards().catch(function () { return []; }),
        window.SRSStore.getPathState().catch(function () { return null; })
      ]);
    }).then(function (parts) {
      var cards = parts[0] || [];
      if ((cards && cards.length) || parts[1]) return; // returning user -> skip
      onboardingShown = true;
      showOnboarding();
    }).catch(function () {});
  }

  function showOnboarding() {
    var overlay = el('div', 'onboarding-overlay');
    var box = el('div', 'onboarding-panel');
    box.appendChild(el('div', 'onboarding-title', 'Willkommen bei Nihongo Explorer'));
    box.appendChild(el('div', 'onboarding-text',
      'So funktioniert dein Lernpfad: Jeden Tag schlägt er dir neue Karten vor (Kanji, Vokabeln, '
      + 'Grammatik). Du lernst sie, wiederholst sie im optimalen Abstand (SRS) und verfolgst deinen '
      + 'Fortschritt. Du kannst alles jederzeit in „So lerne ich“ anpassen.'));

    var form = el('div', 'onboarding-form');
    var levelSel = el('select', 'path-target-select');
    LEVELS.forEach(function (lv) {
      var o = el('option', null, lv);
      o.value = lv;
      if (lv === 'N5') o.selected = true;
      levelSel.appendChild(o);
    });
    var levelRow = el('div', 'path-adjust-row');
    var levelLabel = el('label', 'path-adjust-label', 'Startniveau');
    levelRow.appendChild(levelLabel);
    levelRow.appendChild(levelSel);
    form.appendChild(levelRow);

    var paceSel = el('select', 'path-target-select');
    NEW_PER_DAY_OPTIONS.forEach(function (val) {
      var o = el('option', null, String(val));
      o.value = String(val);
      if (val === 20) o.selected = true;
      paceSel.appendChild(o);
    });
    var paceRow = el('div', 'path-adjust-row');
    paceRow.appendChild(el('label', 'path-adjust-label', 'Neue Karten pro Tag'));
    paceRow.appendChild(paceSel);
    form.appendChild(paceRow);
    box.appendChild(form);

    box.appendChild(el('div', 'path-adjust-hint',
      'Stufen unter dem Startniveau gelten als bekannt. Alles lässt sich später ändern.'));

    function finish() {
      var path = normalizePath(null);
      path.startLevel = levelSel.value;
      path.seenLevel = null; // baseline adopted silently on first render
      var pace = parseInt(paceSel.value, 10) || 20;
      var savePath = window.SRSStore.savePathState(path);
      var saveSettings = window.SRSStore.getSettings().then(function (s) {
        s.dailyNewLimit = pace;
        return window.SRSStore.saveSettings(s);
      });
      Promise.all([savePath, saveSettings]).then(function () {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        render();
      }).catch(function () {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        render();
      });
      if (window.app) window.app.playPop();
    }

    var actions = el('div', 'review-actions');
    var startBtn = el('button', 'quiz-btn quiz-btn-next', 'Lernpfad starten');
    startBtn.addEventListener('click', finish);
    actions.appendChild(startBtn);
    box.appendChild(actions);

    overlay.appendChild(box);
    document.body.appendChild(overlay);
    setTimeout(function () { startBtn.focus(); }, 0);
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

  // --- Data-hygiene self-check ---
  var SRS_SECTIONS = ['vocab', 'kanji', 'grammar', 'counters', 'onomatopoeia'];

  function ensureAllSrsSections() {
    if (!window.app || !window.app.ensureSectionLoaded) return Promise.resolve();
    return Promise.all(SRS_SECTIONS.map(function (s) {
      return window.app.ensureSectionLoaded(s).catch(function () {});
    }));
  }

  // Set of all currently-valid itemKeys, only for sections that are actually loaded.
  function validItemKeySet() {
    var set = {};
    SRS_SECTIONS.forEach(function (s) {
      var sec = window.app && window.app.sections[s];
      if (!sec || !sec.allItems || !sec.allItems.length) return;
      sec.allItems.forEach(function (it) { set[itemKeyOf(s, it)] = true; });
    });
    return set;
  }

  function runDiagnostics() {
    return ensureAllSrsSections().then(function () {
      return window.SRSStore.getAllCards();
    }).then(function (cards) {
      var valid = validItemKeySet();
      var loaded = {};
      SRS_SECTIONS.forEach(function (s) {
        var sec = window.app && window.app.sections[s];
        loaded[s] = !!(sec && sec.allItems && sec.allItems.length);
      });
      var active = 0, suspended = 0, mastered = 0, orphanSet = {};
      (cards || []).forEach(function (c) {
        if (!c) return;
        if (c.suspended) suspended++; else active++;
        if (c.state === 'Mastered') mastered++;
        // Only flag as orphan if its section is loaded (so the universe is known).
        if (loaded[c.section] && !valid[c.itemKey]) orphanSet[c.itemKey] = true;
      });
      return {
        active: active, suspended: suspended, mastered: mastered,
        orphaned: Object.keys(orphanSet).length, orphanKeys: Object.keys(orphanSet)
      };
    });
  }

  function pruneOrphans() {
    return runDiagnostics().then(function (diag) {
      if (!diag.orphanKeys.length) return 0;
      return Promise.all(diag.orphanKeys.map(function (key) {
        return window.SRSStore.deleteCardsByItem(key);
      })).then(function () { return diag.orphanKeys.length; });
    });
  }

  window.LearningPath = {
    onTabActivate: onTabActivate,
    shouldLandHere: shouldLandHere,
    maybeShowOnboarding: maybeShowOnboarding,
    runDiagnostics: runDiagnostics,
    pruneOrphans: pruneOrphans,
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
      blockingKanji: blockingKanji,
      interleave: interleave,
      itemKeyOf: itemKeyOf,
      itemStatus: itemStatus,
      lessonMatchesLevel: lessonMatchesLevel,
      currentStreak: currentStreak,
      markStudyDay: markStudyDay,
      decideLevelUp: decideLevelUp
    }
  };
})();
