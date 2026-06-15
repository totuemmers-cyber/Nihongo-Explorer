// ============================================================
// Statistik & Forecast — analytics dashboard for Nihongo Explorer
// ------------------------------------------------------------
// Reads the existing SRS event log + card store (no new tracking) and surfaces
// review activity, accuracy/retention, the upcoming-review forecast and the deck
// status breakdown. All aggregation is in small pure functions (exposed on
// window.Stats._engine for audit-stats.js); rendering is one-shot innerHTML.
// ============================================================
(function () {
  'use strict';

  var DAY_MS = 24 * 60 * 60 * 1000;
  var HEATMAP_WEEKS = 26;
  var panel = null;
  // When embedded (e.g. inside the Lernpfad's collapsible Statistik section) the
  // host already provides a heading, so we skip our own big title.
  var embedded = false;

  // --- DOM helper (mirrors learning-path.js / srs-ui.js) ---
  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  // --- date helpers (local calendar days, consistent with learning-path.js) ---
  function dayStr(d) { return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); }
  function startOfDay(ms) { var x = new Date(ms); x.setHours(0, 0, 0, 0); return x.getTime(); }
  function todayStr() { return dayStr(new Date()); }
  function yesterdayStr() { var d = new Date(); d.setDate(d.getDate() - 1); return dayStr(d); }

  // ====================================================================
  // Pure aggregation functions (unit-tested via audit-stats.js)
  // ====================================================================

  // Reviews per calendar day from the event log.
  // -> { counts: { 'YYYY-M-D': n }, total }
  function activityByDay(events) {
    var counts = {}, total = 0;
    (events || []).forEach(function (e) {
      if (!e || !e.reviewedAt) return;
      var d = new Date(e.reviewedAt);
      if (isNaN(d.getTime())) return;
      var key = dayStr(d);
      counts[key] = (counts[key] || 0) + 1;
      total++;
    });
    return { counts: counts, total: total };
  }

  // Longest run of consecutive calendar days with at least one review.
  function longestStreak(counts) {
    var keys = Object.keys(counts || {});
    if (!keys.length) return 0;
    var times = keys.map(function (k) {
      var p = k.split('-');
      return new Date(+p[0], +p[1] - 1, +p[2]).getTime();
    }).sort(function (a, b) { return a - b; });
    var best = 1, cur = 1;
    for (var i = 1; i < times.length; i++) {
      var gap = Math.round((times[i] - times[i - 1]) / DAY_MS);
      if (gap === 1) { cur++; if (cur > best) best = cur; }
      else if (gap > 1) { cur = 1; }
    }
    return best;
  }

  // Accuracy over an optional trailing window. Correct = graded anything but "Again".
  // -> { total, correct, rate, bySection: { section: { total, correct } } }
  function accuracy(events, sinceDays, now) {
    now = now || Date.now();
    var cutoff = sinceDays ? now - sinceDays * DAY_MS : 0;
    var total = 0, correct = 0, bySection = {};
    (events || []).forEach(function (e) {
      if (!e || !e.reviewedAt) return;
      if (!e.grade) return; // skip non-review activity (e.g. lesson reads)
      var t = new Date(e.reviewedAt).getTime();
      if (isNaN(t) || t < cutoff) return;
      total++;
      var ok = e.grade !== 'Again';
      if (ok) correct++;
      var s = e.section || 'unbekannt';
      var b = bySection[s] || (bySection[s] = { total: 0, correct: 0 });
      b.total++;
      if (ok) b.correct++;
    });
    return { total: total, correct: correct, rate: total ? correct / total : 0, bySection: bySection };
  }

  // Upcoming scheduled reviews (cards already in rotation, i.e. not New, not suspended),
  // bucketed by calendar day for the next `days` days. -> { overdue, buckets: [n…] }
  function forecast(cards, now, days) {
    now = now || Date.now();
    days = days || 7;
    var buckets = [], overdue = 0;
    for (var i = 0; i < days; i++) buckets.push(0);
    var today0 = startOfDay(now);
    (cards || []).forEach(function (c) {
      if (!c || c.suspended || c.state === 'New') return;
      var due = new Date(c.dueAt || 0).getTime();
      if (isNaN(due)) return;
      var diff = Math.round((startOfDay(due) - today0) / DAY_MS);
      if (diff < 0) overdue++;             // strictly before today = overdue
      else if (diff < days) buckets[diff]++; // diff 0 = today, 1 = tomorrow, …
    });
    return { overdue: overdue, buckets: buckets };
  }

  // Deck composition by mastery ladder, grouped per item. `statusOf` defaults to the
  // real scheduler; injectable for tests. -> { new, learning, familiar, mastered, suspended }
  function statusBreakdown(cards, statusOf) {
    statusOf = statusOf || (window.SRSScheduler && window.SRSScheduler.getStatus);
    var out = { new: 0, learning: 0, familiar: 0, mastered: 0, suspended: 0 };
    if (!statusOf) return out;
    var byItem = {};
    (cards || []).forEach(function (c) {
      if (!c || !c.itemKey) return;
      (byItem[c.itemKey] = byItem[c.itemKey] || []).push(c);
    });
    Object.keys(byItem).forEach(function (key) {
      var cn = (statusOf(byItem[key]) || {}).className;
      if (cn === 'mastered') out.mastered++;
      else if (cn === 'familiar') out.familiar++;
      else if (cn === 'suspended') out.suspended++;
      else if (cn === 'not-in-review') out.new++;
      else out.learning++; // due | weak | learning | relearning
    });
    return out;
  }

  // Current streak from pathState (alive if studied today or yesterday). Mirrors
  // learning-path.js so both surfaces agree.
  function currentStreak(path) {
    if (!path || !path.streakLastDay) return 0;
    if (path.streakLastDay === todayStr() || path.streakLastDay === yesterdayStr()) {
      return path.streakCount || 0;
    }
    return 0;
  }

  // ====================================================================
  // Rendering
  // ====================================================================

  function ensurePanel() {
    if (typeof document === 'undefined') return null;
    // Don't clobber a container set explicitly via renderInto().
    if (!panel) panel = document.getElementById('stats-content');
    return panel;
  }

  function onTabActivate() {
    embedded = false;
    if (!ensurePanel()) return;
    renderLoading();
    (window.SRSStore ? window.SRSStore.init().catch(function () {}) : Promise.resolve()).then(render);
  }

  // Render the dashboard into an arbitrary container (used by the Lernpfad's
  // collapsible Statistik section so the standalone tab can be retired).
  function renderInto(container) {
    if (!container) return;
    embedded = true;
    panel = container;
    renderLoading();
    (window.SRSStore ? window.SRSStore.init().catch(function () {}) : Promise.resolve()).then(render);
  }

  function renderLoading() {
    panel.innerHTML = '';
    var shell = el('div', 'review-shell');
    if (!embedded) shell.appendChild(el('div', 'review-title', 'Statistik'));
    shell.appendChild(el('div', 'review-subtitle', 'Auswertung wird geladen…'));
    panel.appendChild(shell);
  }

  function loadModel() {
    return Promise.all([
      window.SRSStore.getAllEvents().catch(function () { return []; }),
      window.SRSStore.getAllCards().catch(function () { return []; }),
      window.SRSStore.getPathState().catch(function () { return null; })
    ]).then(function (parts) {
      return { events: parts[0] || [], cards: parts[1] || [], path: parts[2] || {} };
    });
  }

  function render() {
    if (!ensurePanel()) return;
    loadModel().then(function (model) {
      panel.innerHTML = '';
      var shell = el('div', 'review-shell');

      var header = el('div', 'review-header');
      if (!embedded) header.appendChild(el('div', 'review-title', 'Statistik'));
      header.appendChild(el('div', 'review-subtitle', 'Dein Lernverlauf — aus deinem Wiederholungs-Log berechnet.'));
      shell.appendChild(header);

      if (!model.events.length && !model.cards.length) {
        shell.appendChild(el('div', 'review-empty-hint',
          'Noch keine Daten. Sobald du Karten lernst und wiederholst, erscheint hier dein Verlauf.'));
        panel.appendChild(shell);
        return;
      }

      shell.appendChild(buildSummary(model));
      shell.appendChild(buildHeatmap(model));

      var row = el('div', 'path-overview');
      row.appendChild(buildForecast(model));
      row.appendChild(buildStatus(model));
      row.appendChild(buildAccuracyBySection(model));
      shell.appendChild(row);

      panel.appendChild(shell);
    }).catch(function () {
      if (typeof window === 'undefined' || window.closed || typeof document === 'undefined') return;
      panel.innerHTML = '';
      var shell = el('div', 'review-shell');
      shell.appendChild(el('div', 'review-title', 'Statistik'));
      shell.appendChild(el('div', 'review-subtitle', 'Statistik konnte nicht geladen werden.'));
      panel.appendChild(shell);
    });
  }

  function pct(rate) { return Math.round(rate * 100) + '%'; }

  function statCard(label, value) {
    var card = el('div', 'review-stat');
    card.appendChild(el('span', 'review-stat-value', value));
    card.appendChild(el('span', 'review-stat-label', label));
    return card;
  }

  function buildSummary(model) {
    var box = el('div', 'path-focus');
    var act = activityByDay(model.events);
    var acc30 = accuracy(model.events, 30);
    var accAll = accuracy(model.events, 0);
    var streak = currentStreak(model.path);
    var best = longestStreak(act.counts);

    var stats = el('div', 'review-stats');
    stats.appendChild(statCard('Reviews gesamt', act.total));
    stats.appendChild(statCard('Genauigkeit (30 T.)', acc30.total ? pct(acc30.rate) : '–'));
    stats.appendChild(statCard('Genauigkeit gesamt', accAll.total ? pct(accAll.rate) : '–'));
    stats.appendChild(statCard('🔥 Streak', streak + (streak === 1 ? ' Tag' : ' Tage')));
    stats.appendChild(statCard('Längste Serie', best + (best === 1 ? ' Tag' : ' Tage')));
    box.appendChild(stats);
    return box;
  }

  function heatLevel(count) {
    if (!count) return 0;
    if (count < 5) return 1;
    if (count < 15) return 2;
    if (count < 30) return 3;
    return 4;
  }

  function buildHeatmap(model) {
    var box = el('div', 'path-progress');
    box.appendChild(el('div', 'path-section-title', 'Aktivität (letzte ' + HEATMAP_WEEKS + ' Wochen)'));
    var counts = activityByDay(model.events).counts;

    // Build columns of 7 days, ending today; align the last column's weekday.
    var grid = el('div', 'stats-heatmap');
    var today = new Date();
    var todayMid = startOfDay(today.getTime());
    var totalDays = HEATMAP_WEEKS * 7;
    // Start so that the grid ends on today; pad the first column to a Sunday start.
    var startMid = todayMid - (totalDays - 1) * DAY_MS;
    var startDow = new Date(startMid).getDay(); // 0=Sun
    startMid -= startDow * DAY_MS;

    for (var col = 0; col * 7 + 0 < totalDays + startDow + 6; col++) {
      var weeksColumn = el('div', 'stats-heat-col');
      var any = false;
      for (var r = 0; r < 7; r++) {
        var ms = startMid + (col * 7 + r) * DAY_MS;
        if (ms > todayMid) break;
        any = true;
        var key = dayStr(new Date(ms));
        var n = counts[key] || 0;
        var cell = el('div', 'stats-heat-cell heat-' + heatLevel(n));
        cell.title = key + ': ' + n + (n === 1 ? ' Review' : ' Reviews');
        weeksColumn.appendChild(cell);
      }
      if (any) grid.appendChild(weeksColumn);
    }
    box.appendChild(grid);

    var legend = el('div', 'stats-heat-legend');
    legend.appendChild(el('span', null, 'weniger'));
    [0, 1, 2, 3, 4].forEach(function (lvl) {
      legend.appendChild(el('span', 'stats-heat-cell heat-' + lvl));
    });
    legend.appendChild(el('span', null, 'mehr'));
    box.appendChild(legend);
    return box;
  }

  function buildForecast(model) {
    var box = el('div', 'path-progress');
    box.appendChild(el('div', 'path-section-title', 'Anstehende Wiederholungen'));
    var fc = forecast(model.cards, Date.now(), 7);

    if (fc.overdue) {
      box.appendChild(el('div', 'review-empty-hint', fc.overdue + ' jetzt fällig'));
    }

    var max = Math.max(1, fc.overdue, Math.max.apply(null, fc.buckets));
    var labels = ['Heute', 'Morgen', '+2', '+3', '+4', '+5', '+6'];
    var chart = el('div', 'stats-forecast');
    fc.buckets.forEach(function (n, i) {
      var rowEl = el('div', 'stats-forecast-row');
      rowEl.appendChild(el('span', 'stats-forecast-label', labels[i] || ('+' + i)));
      var track = el('div', 'stats-forecast-track');
      var fill = el('div', 'stats-forecast-fill');
      fill.style.width = Math.round(n / max * 100) + '%';
      track.appendChild(fill);
      rowEl.appendChild(track);
      rowEl.appendChild(el('span', 'stats-forecast-count', String(n)));
      chart.appendChild(rowEl);
    });
    box.appendChild(chart);
    return box;
  }

  function buildStatus(model) {
    var box = el('div', 'path-progress');
    box.appendChild(el('div', 'path-section-title', 'Kartenbestand'));
    var s = statusBreakdown(model.cards);
    var rows = [
      ['Neu', s.new, 'seg-new'],
      ['Lernen', s.learning, 'seg-learning'],
      ['Vertraut', s.familiar, 'seg-familiar'],
      ['Gemeistert', s.mastered, 'seg-mastered']
    ];
    if (s.suspended) rows.push(['Ausgesetzt', s.suspended, 'seg-suspended']);
    var total = rows.reduce(function (a, r) { return a + r[1]; }, 0);

    var bar = el('div', 'path-bar');
    rows.forEach(function (r) {
      if (!total || !r[1]) return;
      var seg = el('div', 'path-bar-seg ' + r[2]);
      seg.style.width = (r[1] / total * 100) + '%';
      bar.appendChild(seg);
    });
    box.appendChild(bar);

    var legend = el('div', 'path-legend');
    rows.forEach(function (r) {
      var item = el('div', 'path-legend-item');
      item.appendChild(el('span', 'path-legend-dot ' + r[2]));
      item.appendChild(el('span', null, r[0] + ' (' + r[1] + ')'));
      legend.appendChild(item);
    });
    box.appendChild(legend);
    return box;
  }

  var SECTION_LABEL = { vocab: 'Vokabeln', kanji: 'Kanji', grammar: 'Grammatik', counters: 'Zahlen', onomatopoeia: 'Lautmalerei' };

  function buildAccuracyBySection(model) {
    var box = el('div', 'path-progress');
    box.appendChild(el('div', 'path-section-title', 'Genauigkeit nach Bereich'));
    var acc = accuracy(model.events, 0).bySection;
    var keys = Object.keys(acc).sort(function (a, b) { return acc[b].total - acc[a].total; });
    if (!keys.length) {
      box.appendChild(el('div', 'review-empty-hint', 'Noch keine Wiederholungen.'));
      return box;
    }
    keys.forEach(function (k) {
      var b = acc[k];
      var row = el('div', 'path-level-row');
      var head = el('div', 'path-level-head');
      head.appendChild(el('span', null, SECTION_LABEL[k] || k));
      head.appendChild(el('span', 'path-level-count', pct(b.correct / b.total) + ' · ' + b.total));
      row.appendChild(head);
      var bar = el('div', 'path-bar');
      var fill = el('div', 'path-bar-seg seg-familiar');
      fill.style.width = (b.correct / b.total * 100) + '%';
      bar.appendChild(fill);
      row.appendChild(bar);
      box.appendChild(row);
    });
    return box;
  }

  window.Stats = {
    onTabActivate: onTabActivate,
    renderInto: renderInto,
    forecast: forecast, // consumed by the Lernpfad's 7-day mini forecast

    _engine: {
      activityByDay: activityByDay,
      longestStreak: longestStreak,
      accuracy: accuracy,
      forecast: forecast,
      statusBreakdown: statusBreakdown,
      currentStreak: currentStreak
    }
  };
})();
