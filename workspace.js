/* Navigation and presentation. Section continues to own data, filtering and batching. */
(function () {
  'use strict';
  var app = window.app;
  var sections = app.sections;
  var titles = { reading: 'Lesen', listening: 'Hören', kana: 'Kana', radicals: 'Radikale', kanji: 'Kanji', vocab: 'Vokabeln', onomatopoeia: 'Lautmalerei', grammar: 'Grammatik', counters: 'Zahlen', quiz: 'Quiz' };
  var descriptions = {
    reading: 'Japanische Texte verstehen, mit gezielter Unterstützung.',
    listening: 'Zuhören, Zusammenhänge erkennen und Entscheidungen verstehen.',
    kana: 'Die japanischen Silbenschriften entdecken und anhören.',
    radicals: 'Die Bausteine der Kanji kennenlernen.',
    kanji: 'Zeichen, Lesungen und Zusammenhänge entdecken.',
    vocab: 'Das passende Wort finden. Seinen Gebrauch verstehen.',
    onomatopoeia: 'Geräusche, Gefühle und Bewegungen in Worte fassen.',
    grammar: 'Muster nachschlagen oder Schritt für Schritt lernen.',
    counters: 'Mengen ausdrücken und richtig zählen.',
    quiz: 'Wissen festigen, in deinem eigenen Tempo.'
  };
  var workspace = document.querySelector('.workspace');
  var sidebar = document.getElementById('sidebar');
  var current = null;
  var restoring = false;
  var revision = 0;
  var historyIndex = 0;
  var counterView = 'counters';
  var savedScroll = {};
  var relatedBack = false;
  var helpTrigger = null;
  var lastHash = '';
  var returnTargets = {};
  var priorSnapshot = null;
  var selectionContext = document.createElement('div');
  selectionContext.className = 'selection-context hidden';
  selectionContext.setAttribute('aria-label', 'Ausgewählter Eintrag');
  document.getElementById('main-content').prepend(selectionContext);

  function idOf(sec, item) {
    if (!item) return null;
    if (sec.name === 'kanji') return item.kanji;
    if (sec.name === 'radicals') return String(item.number);
    return String(getItemId(item, item.word + (sec.name === 'vocab' ? '|' + (item.reading || '') : '')));
  }
  function route() {
    var name = app.activeTab;
    if (name === "reading" || name === "listening") return "#" + name + window.Comprehension.route(name);
    if (current) return '#' + name + '/' + encodeURIComponent(idOf(current, current.selectedItem));
    if (name === 'grammar' && window.Lessons && window.Lessons.view === 'lessons') {
      return '#grammar/lesson' + (window.Lessons.selected ? '/' + encodeURIComponent(window.Lessons.selected) : '');
    }
    if (name === 'counters' && counterView === 'numbers') return '#counters/numbers';
    return '#' + name;
  }
  function snapshot() {
    var state = { sections: {}, tab: app.activeTab, scroll: Object.assign({}, savedScroll), counterView: counterView, back: relatedBack };
    state.scroll[app.activeTab] = window.scrollY;
    Object.keys(sections).forEach(function (name) {
      var sec = sections[name];
      state.sections[name] = {
        filters: Object.assign({}, sec.filters), query: sec.dom.search.value,
        sort: sec.currentSort, count: sec.renderedCount, selected: idOf(sec, sec.selectedItem) || sec._pendingSelectionId,
        returnId: sec._returnId || null, open: current === sec,
        detailScroll: sec.dom.overlay.querySelector('.detail-panel').scrollTop
      };
    });
    state.comprehension = window.Comprehension.snapshot();
    if (window.Lessons) state.lessons = window.Lessons.snapshot();
    return state;
  }
  function storeSession(state) {
    window.NIHONGO_STORAGE.session.setJSON('nihongo-workspace', state);
  }
  function writeHistory(replace, state, hash) {
    try {
      history[replace ? 'replaceState' : 'pushState'](state, '', hash);
    } catch (error) {
      // Some file: implementations reject even same-document History API URLs.
      // Keep the static-file workflow functional using native fragment navigation.
      if (location.protocol !== 'file:' || error.name !== 'SecurityError') throw error;
      if (location.hash !== hash) {
        if (replace) location.replace(hash);
        else location.hash = hash;
      }
      history.replaceState(state, '');
    }
  }
  function save() {
    if (restoring) return;
    var state = snapshot();
    writeHistory(true, { workspace: state, index: historyIndex }, lastHash || route());
    storeSession(state);
  }
  function commit() {
    if (restoring) return;
    var hash = route();
    var state = snapshot();
    if (hash === lastHash) writeHistory(true, { workspace: state, index: historyIndex }, hash);
    else writeHistory(false, { workspace: state, index: ++historyIndex }, hash);
    lastHash = hash;
    priorSnapshot = state;
    storeSession(state);
  }
  function message(text) {
    var el = document.getElementById('route-message');
    el.textContent = text;
    el.classList.toggle('hidden', !text);
  }
  function visibleFocusable(host) {
    return Array.from(host.querySelectorAll('button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), summary, [tabindex="0"]')).filter(function (el) {
      return !el.closest('.hidden, [hidden], [inert], .stroke-order-body.collapsed, .conjugation-body.collapsed, .counters-numbers-body.collapsed') && !el.closest('details:not([open]) > :not(summary)');
    });
  }
  function trap(event, host) {
    if (event.key !== 'Tab') return;
    var els = visibleFocusable(host);
    var first = els[0], last = els[els.length - 1];
    if (event.shiftKey && (document.activeElement === first || !els.includes(document.activeElement))) {
      event.preventDefault(); if (last) last.focus();
    } else if (!event.shiftKey && (document.activeElement === last || !els.includes(document.activeElement))) {
      event.preventDefault(); if (first) first.focus();
    }
  }
  function setInert() {
    var help = !document.getElementById('help-overlay').classList.contains('hidden');
    var drawer = sidebar.classList.contains('open') && window.innerWidth < 1024;
    var modal = current && window.innerWidth < 1280;
    workspace.inert = !!(help || drawer || modal);
    sidebar.inert = !!(help || modal);
    document.querySelector('.compact-header').inert = !!(help || drawer || modal);
    Object.keys(sections).forEach(function (name) { sections[name].dom.overlay.inert = !!help; });
    document.body.style.overflow = help || drawer || modal ? 'hidden' : '';
  }
  function adaptDetail() {
    var pane = window.innerWidth >= 1280;
    workspace.classList.toggle('with-detail', !!current && pane);
    selectionContext.classList.toggle('hidden', !current || !pane);
    if (current) {
      var panel = current.dom.overlay.querySelector('.detail-panel');
      current.dom.overlay.classList.toggle('as-pane', pane);
      panel.setAttribute('role', pane ? 'complementary' : 'dialog');
      if (pane) panel.removeAttribute('aria-modal');
      else panel.setAttribute('aria-modal', 'true');
      if (!pane && !panel.contains(document.activeElement)) current.dom.closeBtn.focus({ preventScroll: true });
    }
    setInert();
  }
  function hideDetail() {
    if (!current) return;
    current.dom.overlay.classList.add('hidden');
    current = null;
    selectionContext.classList.add('hidden');
    workspace.classList.remove('with-detail');
    setInert();
  }
  function markSelection(sec) {
    var id = idOf(sec, sec.selectedItem);
    sec.dom.grid.querySelectorAll('[data-item-id]').forEach(function (card) {
      var selected = card.dataset.itemId === id;
      card.classList.toggle('selected', selected);
      var button = card.querySelector('.entry-open');
      if (selected) button.setAttribute('aria-current', 'true');
      else button.removeAttribute('aria-current');
    });
  }
  function updateNavigation(sec) {
    var index = sec.filteredItems.indexOf(sec.selectedItem);
    sec.currentDetailIndex = index;
    sec.dom.prevBtn.disabled = index <= 0;
    sec.dom.nextBtn.disabled = index < 0 || index >= sec.filteredItems.length - 1;
    sec.dom.overlay.querySelector('.detail-position').textContent = index < 0 ? 'Verknüpfter Eintrag' : (index + 1) + ' / ' + sec.filteredItems.length;
    var back = sec.dom.overlay.querySelector('.detail-back');
    back.hidden = !relatedBack;
    back.textContent = window.Lessons && window.Lessons.view === 'lessons' ? '← Zurück zur Lektion' : '← Zurück';
    markSelection(sec);
    selectionContext.textContent = '';
    var label = document.createElement('span'); label.className = 'selection-label'; label.textContent = 'Ausgewählt';
    var word = document.createElement('span'); word.className = 'selection-word';
    word.textContent = sec.selectedItem.kanji || sec.selectedItem.radical || sec.selectedItem.word || sec.selectedItem.pattern;
    var meaning = document.createElement('span'); meaning.className = 'selection-meaning';
    meaning.textContent = sec.selectedItem.meaning || (sec.selectedItem.meanings || []).join(', ');
    var read = document.createElement('button'); read.textContent = 'Zum Detail →';
    read.onclick = function () { sec.dom.overlay.querySelector('.reader-label').focus(); };
    selectionContext.append(label, word, meaning, read);
  }
  function present(sec, item, options) {
    options = options || {};
    var wasOpen = current === sec;
    if (!wasOpen && !options.related && !restoring) {
      var trigger = sec._triggerEl;
      if (!trigger || !trigger.isConnected || trigger.closest('.detail-overlay')) trigger = document.activeElement;
      returnTargets[sec.name] = trigger;
      var card = trigger && trigger.closest('[data-item-id]');
      sec._returnId = card ? card.dataset.itemId : idOf(sec, item);
      relatedBack = false;
    }
    if (!restoring && !options.skipSave) save();
    if (options.related) relatedBack = true;
    if (current && current !== sec) hideDetail();
    sec.selectedItem = item;
    sec._pendingSelectionId = null;
    sec.currentDetailIndex = sec.filteredItems.indexOf(item);
    sec.config.openDetail(item, sec.dom, sec);
    current = sec;
    sec.dom.overlay.classList.remove('hidden');
    var panel = sec.dom.overlay.querySelector('.detail-panel');
    var title = sec.dom.overlay.querySelector('.reader-label');
    title.textContent = titles[sec.name] + ' · ' + (item.kanji || item.radical || item.word || item.pattern);
    // Every reference shares the same actions, including sections that had none.
    if (!panel.querySelector('.detail-bookmark-btn')) createDetailBookmark('#' + sec.dom.overlay.id + ' .reader-actions', sec.name, idOf(sec, item));
    var detailBookmark = panel.querySelector('.detail-bookmark-btn');
    detailBookmark.dataset.bookmarkId = idOf(sec, item);
    if (sec.name === 'grammar' || sec.name === 'counters' || sec.name === 'radicals') {
      detailBookmark.remove();
      createDetailBookmark('#' + sec.dom.overlay.id + ' .reader-actions', sec.name, idOf(sec, item));
      createSpeakButton('#' + sec.dom.overlay.id + ' .reader-actions', { reading: item.reading || item.pattern || item.kanji });
    }
    panel.scrollTop = 0;
    updateNavigation(sec);
    accessibleContent(panel);
    adaptDetail();
    if (!options.noFocus && !wasOpen) sec.dom.closeBtn.focus({ preventScroll: true });
    if (!options.noFocus && wasOpen && !panel.contains(document.activeElement)) title.focus({ preventScroll: true });
    commit();
  }
  function close(sec) {
    if (relatedBack) { history.back(); return; }
    save();
    sec.selectedItem = null;
    sec.currentDetailIndex = -1;
    hideDetail();
    markSelection(sec);
    commit();
    restoreFocus(sec);
  }
  function dismiss() {
    if (current) { current.selectedItem = null; current.currentDetailIndex = -1; markSelection(current); }
    relatedBack = false;
    hideDetail();
  }
  function restoreFocus(sec) {
    var target = returnTargets[sec.name];
    if (!target || !target.isConnected || target.closest('.hidden, [hidden]')) {
      var card = Array.from(sec.dom.grid.querySelectorAll('[data-item-id]')).find(function (el) { return el.dataset.itemId === sec._returnId; });
      target = card && card.querySelector('.entry-open');
    }
    if (!target || !target.isConnected || target.closest('.detail-overlay')) target = sec.dom.search;
    target.focus({ preventScroll: true });
  }
  function syncFilters(sec) {
    (sec.config.filterGroups || []).forEach(function (group) {
      sec.dom.controls.querySelectorAll(group.selector).forEach(function (btn) {
        var active = btn.getAttribute(group.dataAttr) === sec.filters[group.stateKey];
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-pressed', String(active));
      });
    });
    var bm = sec.dom.controls.querySelector('.bm-toggle');
    bm.dataset.bm = sec.filters.bookmarks || 'all';
    bm.textContent = 'Nur Lesezeichen';
    bm.classList.toggle('active', sec.filters.bookmarks === 'starred');
    bm.setAttribute('aria-pressed', String(sec.filters.bookmarks === 'starred'));
    if (sec.dom.sort) sec.dom.sort.value = sec.currentSort;
    if (sec.name === 'vocab') document.getElementById('vocab-type-select').value = sec.filters.type || 'all';
    if (sec.name === 'counters') document.getElementById('counter-cat-select').value = sec.filters.category || 'all';
    sec.dom.clearSearch.classList.toggle('visible', !!sec.dom.search.value);
  }
  function reset(sec) {
    clearTimeout(sec.searchTimeout);
    sec.dom.search.value = '';
    Object.keys(sec.filters).forEach(function (key) { sec.filters[key] = 'all'; });
    sec.currentSort = sec.config.defaultSort || null;
    if (sec.name === 'kanji') app.clearRadicalFilter();
    syncFilters(sec);
    sec.applyFilters();
  }
  function collectionChanged(sec) {
    if (sec._pendingSelectionId && sec.isLoaded) {
      sec.selectedItem = sec.allItems.find(function (item) { return idOf(sec, item) === sec._pendingSelectionId; }) || null;
      sec._pendingSelectionId = null;
    }
    syncFilters(sec);
    var filters = Object.keys(sec.filters).filter(function (key) { return sec.filters[key] && sec.filters[key] !== 'all'; }).map(function (key) { return key === 'bookmarks' ? 'Nur Lesezeichen' : sec.filters[key]; });
    if (sec.dom.search.value) filters.unshift('„' + sec.dom.search.value + '“');
    if (sec.name === 'kanji' && app.activeRadical) filters.push('Radikal ' + app.activeRadical);
    var summary = sec.dom.controls.querySelector('.filter-summary-text');
    if (summary) summary.textContent = filters.length ? filters.join(' · ') : 'Alle Einträge';
    var resetBtn = sec.dom.controls.querySelector('.filter-reset');
    if (resetBtn) resetBtn.hidden = !filters.length && sec.currentSort === (sec.config.defaultSort || null);
    if (sec.dom.noResults) {
      sec.dom.noResults.querySelector('p').textContent = sec.filters.bookmarks === 'starred' && !getBookmarks(sec.name).length
        ? 'Noch keine Lesezeichen. Mit dem Stern kannst du Einträge für später speichern.'
        : 'Keine passenden Einträge. Ändere deine Suche oder setze die Filter zurück.';
      sec.dom.noResults.classList.toggle('hidden', !sec.isLoaded || !!sec.filteredItems.length);
    }
    if (current === sec) updateNavigation(sec);
    if (!restoring) save();
  }
  function beforeSwitch(tab) {
    if (!titles[tab]) return false;
    if (restoring) { window.Comprehension.stop(); hideDetail(); return true; }
    revision++;
    if (app.activeTab === 'quiz' && tab !== 'quiz' && !window.QuizModule.requestExit()) return false;
    save();
    window.Comprehension.stop();
    savedScroll[app.activeTab] = window.scrollY;
    hideDetail();
    relatedBack = false;
    return true;
  }
  function afterSwitch(tab) {
    document.getElementById('page-title').textContent = titles[tab];
    document.getElementById('page-description').textContent = descriptions[tab];
    document.getElementById('page-eyebrow').textContent = (['kana', 'radicals', 'counters'].includes(tab) ? 'Grundlagen' : ['quiz', 'reading', 'listening'].includes(tab) ? 'Üben' : 'Nachschlagen') + ' · 日本語';
    document.querySelectorAll('.tab-btn').forEach(function (btn) {
      if (btn.dataset.tab === tab) btn.setAttribute('aria-current', 'page');
      else btn.removeAttribute('aria-current');
    });
    setDrawer(false);
    message('');
    ['reading', 'listening'].forEach(function (skill) { document.getElementById(skill + '-tab').classList.toggle('hidden', tab !== skill); });
    if (!restoring) {
      if (tab === 'reading' || tab === 'listening') window.Comprehension.activate(tab).catch(function () {});
      var sec = sections[tab];
      if (sec && sec.selectedItem) present(sec, sec.selectedItem, { noFocus: true, skipSave: true });
      commit();
      document.getElementById('page-title').focus({ preventScroll: true });
      window.scrollTo(0, savedScroll[tab] || 0);
    }
    app.updateCount();
  }
  async function openRelated(name, predicate) {
    save();
    var origin = current;
    var expected = ++revision;
    try {
      if (!sections[name].isLoaded) await app.ensureSectionLoaded(name);
      if (expected !== revision) return;
      var item = sections[name].allItems.find(predicate);
      if (!item) { message('Dieser verknüpfte Eintrag ist nicht verfügbar.'); return; }
      if (app.activeTab !== name) {
        restoring = true;
        app.switchTab(name);
        restoring = false;
      }
      if (origin) returnTargets[name] = returnTargets[origin.name];
      present(sections[name], item, { related: true, skipSave: true });
    } catch (e) { message('Der verknüpfte Eintrag konnte nicht geladen werden. Bitte erneut versuchen.'); }
    finally { restoring = false; }
  }
  async function restore(hash, state) {
    var version = ++revision;
    var failed = false;
    restoring = true;
    hideDetail();
    var parts;
    try { parts = hash.replace(/^#/, '').split('/').map(decodeURIComponent); } catch (e) { parts = ['kana']; }
    var tab = titles[parts[0]] ? parts[0] : 'kana';
    var invalidSection = !titles[parts[0]] && !!parts[0];
    relatedBack = !!(state && state.back);
    if (state) {
      savedScroll = Object.assign({}, state.scroll);
      counterView = state.counterView || 'counters';
      Object.keys(sections).forEach(function (name) {
        var saved = state.sections[name];
        if (!saved) return;
        var sec = sections[name];
        clearTimeout(sec.searchTimeout);
        sec.filters = Object.assign({}, saved.filters);
        sec.dom.search.value = saved.query;
        sec.currentSort = saved.sort;
        sec._returnId = saved.returnId;
        sec._pendingSelectionId = saved.selected;
        sec.selectedItem = sec.allItems.find(function (item) { return idOf(sec, item) === saved.selected; }) || null;
        syncFilters(sec);
        if (sec.isLoaded) sec.applyFilters();
      });
    }
    app.switchTab(tab);
    try {
      await app.ensureSectionLoaded(tab);
      if (version !== revision) return;
      if (tab === 'reading' || tab === 'listening') {
        await window.Comprehension.activate(tab, state && state.comprehension, parts[1] || null);
        if (version !== revision) return;
      }
      if (tab === 'grammar' && (parts[1] === 'lesson' || (state && state.back && state.tab === tab && state.lessons && state.lessons.view === 'lessons' && state.sections.grammar.selected === parts[1]))) {
        await app.ensureGrammarLessonsLoaded();
        if (version !== revision) return;
        window.Lessons.restore(state && state.lessons, parts[1] === 'lesson' ? parts[2] : null);
      } else if (window.Lessons && tab === 'grammar') window.Lessons.setView('reference', true);
      if (tab === 'counters') setCounterView(parts[1] === 'numbers' ? 'numbers' : 'counters', true);
      var sec = sections[tab];
      if (sec && parts[1] && parts[1] !== 'lesson' && !(tab === 'counters' && parts[1] === 'numbers')) {
        var item = sec.allItems.find(function (entry) { return idOf(sec, entry) === parts[1]; });
        if (item) present(sec, item, { noFocus: true, related: relatedBack });
        else { sec.selectedItem = null; message('Dieser Eintrag wurde nicht gefunden. Du bist wieder in der Sammlung.'); }
      } else if (sec) { sec.selectedItem = null; sec.currentDetailIndex = -1; markSelection(sec); }
      if (sec && state && state.sections[tab]) {
        var saved = state.sections[tab];
        while (sec.batchSize && sec.renderedCount < Math.min(saved.count, sec.filteredItems.length)) sec.renderBatch();
        sec.dom.overlay.querySelector('.detail-panel').scrollTop = saved.detailScroll || 0;
        if (!current && saved.returnId) restoreFocus(sec);
      }
      if (invalidSection) message('Dieser Bereich wurde nicht gefunden. Hier kannst du mit Kana beginnen.');
      app.updateCount();
      if (current) current.dom.closeBtn.focus({ preventScroll: true });
      window.scrollTo(0, savedScroll[tab] || 0);
    } catch (e) {
      failed = true;
      message('Der Eintrag konnte nicht geladen werden.');
      var retry = document.createElement('button');
      retry.textContent = 'Link erneut öffnen';
      retry.addEventListener('click', function () { restore(hash, state); });
      document.getElementById('route-message').appendChild(retry);
    } finally {
      if (version === revision) {
        restoring = false;
        lastHash = failed ? hash : route();
        writeHistory(true, { workspace: snapshot(), index: historyIndex }, lastHash);
        priorSnapshot = snapshot();
      }
    }
  }
  function setDrawer(open) {
    sidebar.classList.toggle('open', open);
    if (open && window.innerWidth < 1024) { sidebar.setAttribute('role', 'dialog'); sidebar.setAttribute('aria-modal', 'true'); }
    else { sidebar.removeAttribute('role'); sidebar.removeAttribute('aria-modal'); }
    document.getElementById('nav-toggle').setAttribute('aria-expanded', String(open));
    document.getElementById('nav-backdrop').classList.toggle('hidden', !open);
    if (open) sidebar.querySelector('[aria-current="page"]').focus();
    setInert();
  }
  function toggleHelp() {
    var overlay = document.getElementById('help-overlay');
    var opening = overlay.classList.contains('hidden');
    if (opening) helpTrigger = document.activeElement;
    overlay.classList.toggle('hidden', !opening);
    setInert();
    if (opening) document.getElementById('help-close').focus();
    else if (helpTrigger && helpTrigger.isConnected) helpTrigger.focus();
  }
  function accessibleContent(host) {
    host.querySelectorAll('button[title]:not([aria-label])').forEach(function (btn) { btn.setAttribute('aria-label', btn.title); });
    host.querySelectorAll('.stroke-order-header, .conjugation-header, .component-tag, .radical-link').forEach(function (el) {
      if (el.tagName === 'BUTTON' || el._keyboardReady) return;
      el._keyboardReady = true; el.tabIndex = 0; el.setAttribute('role', 'button');
      el.addEventListener('keydown', function (e) { if (e.target === el && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); el.click(); } });
      if (el.matches('.stroke-order-header, .conjugation-header')) {
        var body = el.nextElementSibling;
        el.setAttribute('aria-controls', body.id);
        el.setAttribute('aria-expanded', String(!body.classList.contains('collapsed')));
        el.addEventListener('click', function () { el.setAttribute('aria-expanded', String(!body.classList.contains('collapsed'))); });
      }
    });
    host.querySelectorAll('.counter-table-wrap, .conjugation-container, .conjugation-table-wrapper, .conjugation-table-wrap').forEach(function (el) {
      el.tabIndex = 0; el.setAttribute('role', 'region'); el.setAttribute('aria-label', 'Lesetabelle, horizontal scrollbar');
    });
  }
  function setCounterView(view, silent) {
    if (!silent) { save(); dismiss(); }
    counterView = view;
    document.getElementById('counters-tab').classList.toggle('numbers-view', view === 'numbers');
    document.getElementById('counters-controls').classList.toggle('numbers-view', view === 'numbers');
    document.querySelectorAll('[data-counter-view]').forEach(function (btn) { btn.classList.toggle('active', btn.dataset.counterView === view); btn.setAttribute('aria-pressed', String(btn.dataset.counterView === view)); });
    app.renderBasicNumbers(); app.updateCount();
    if (!silent) commit();
  }
  function isReadingView() { return (app.activeTab === 'counters' && counterView === 'numbers') || (app.activeTab === 'grammar' && window.Lessons && window.Lessons.view === 'lessons'); }
  function updateSpecialCount() {
    var count = document.getElementById('item-count');
    if (app.activeTab === 'reading' || app.activeTab === 'listening') {
      var totals = window.Comprehension.counts(app.activeTab);
      if (!totals) { count.textContent = 'Lädt…'; return true; }
      var levels = Object.values(totals.byLevel);
      count.textContent = totals.total + ' Einheiten' + (levels.every(function (n) { return n === levels[0]; }) ? ' · ' + levels[0] + ' je Niveau' : '');
      return true;
    }
    if (app.activeTab === 'grammar' && window.Lessons && window.Lessons.view === 'lessons') { count.textContent = window.Lessons.count + ' Lektionen'; return true; }
    if (app.activeTab === 'counters' && counterView === 'numbers') { count.textContent = 'Grundzahlen · Referenz'; return true; }
    return false;
  }
  app.workspace = { beforeSwitch: beforeSwitch, afterSwitch: afterSwitch, present: present, close: close, dismiss: dismiss, collectionChanged: collectionChanged, openRelated: openRelated, toggleHelp: toggleHelp, save: save, commit: commit, message: message, updateSpecialCount: updateSpecialCount, isReadingView: isReadingView, idOf: idOf, accessibleContent: accessibleContent };

  Object.keys(sections).forEach(function (name) {
    var sec = sections[name];
    var controls = sec.dom.controls;
    var searchLabel = document.createElement('label');
    searchLabel.htmlFor = sec.dom.search.id; searchLabel.className = 'field-label'; searchLabel.textContent = titles[name] + ' durchsuchen';
    controls.insertBefore(searchLabel, sec.dom.search.closest('.search-bar'));
    controls.querySelectorAll('select').forEach(function (select) {
      var label = document.createElement('label'); label.className = 'select-field';
      var text = document.createElement('span'); text.textContent = select.id.includes('sort') ? 'Sortierung' : select.id.includes('type') ? 'Wortart' : 'Kategorie';
      select.before(label); label.appendChild(text); label.appendChild(select);
    });
    var filters = controls.querySelector('.filters');
    var secondary = document.createElement('details'); secondary.className = 'secondary-filters'; secondary.open = window.innerWidth >= 768;
    var summary = document.createElement('summary'); summary.textContent = 'Weitere Filter & Sortierung'; secondary.appendChild(summary);
    Array.from(filters.children).forEach(function (el, index) {
      if (el.classList.contains('level-filters')) {
        var primary = index === 0;
        var field = document.createElement('div'); field.className = 'filter-field';
        var label = document.createElement('span'); label.className = 'filter-group-label';
        label.textContent = primary ? (name === 'radicals' ? 'Striche' : 'JLPT') : 'Kategorie';
        label.id = name + (primary ? '-primary-filter-label' : '-category-filter-label');
        el.setAttribute('role', 'group'); el.setAttribute('aria-labelledby', label.id);
        el.before(field); field.append(label, el);
        if (!primary) secondary.appendChild(field);
      } else secondary.appendChild(el);
    });
    if (secondary.children.length > 1) filters.appendChild(secondary);
    var summaryRow = document.createElement('div'); summaryRow.className = 'filter-summary';
    summaryRow.innerHTML = '<span class="filter-summary-text">Alle Einträge</span><button class="filter-reset" hidden>Filter zurücksetzen</button>';
    controls.appendChild(summaryRow);
    summaryRow.querySelector('button').onclick = function () { reset(sec); sec.dom.search.focus(); };
    var recovery = document.createElement('button'); recovery.textContent = 'Filter zurücksetzen'; recovery.onclick = function () { reset(sec); sec.dom.search.focus(); }; sec.dom.noResults.appendChild(recovery);
    sec.dom.noResults.setAttribute('role', 'status');
    var panel = sec.dom.overlay.querySelector('.detail-panel');
    var label = document.createElement('h2'); label.id = 'reader-label-' + name; label.className = 'reader-label'; label.tabIndex = -1;
    panel.prepend(label); panel.setAttribute('aria-labelledby', label.id);
    var actions = document.createElement('div'); actions.className = 'reader-actions'; panel.querySelector('.detail-content').prepend(actions);
    var nav = panel.querySelector('.detail-nav');
    var back = document.createElement('button'); back.className = 'detail-back'; back.textContent = '← Zurück'; back.hidden = true; back.onclick = function () { history.back(); }; nav.prepend(back);
    var position = document.createElement('span'); position.className = 'detail-position'; nav.appendChild(position);
    sec.dom.overlay.addEventListener('keydown', function (e) { if (window.innerWidth < 1280) trap(e, panel); });
    syncFilters(sec);
  });
  var counterToggle = document.createElement('div'); counterToggle.className = 'gl-view-toggle counter-view-toggle'; counterToggle.innerHTML = '<button class="active" data-counter-view="counters" aria-pressed="true">Zählwörter</button><button data-counter-view="numbers" aria-pressed="false">Grundzahlen</button>';
  document.getElementById('counters-controls').prepend(counterToggle);
  counterToggle.onclick = function (e) { if (e.target.dataset.counterView) setCounterView(e.target.dataset.counterView); };
  var jumps = document.createElement('nav'); jumps.className = 'kana-jumps'; jumps.setAttribute('aria-label', 'Kana-Tabellen');
  ['Basis', 'Dakuten', 'Kombinationen'].forEach(function (text, i) {
    var button = document.createElement('button'); button.textContent = text;
    button.onclick = function () { var target = document.querySelectorAll('.kana-section')[i]; target.tabIndex = -1; target.focus(); target.scrollIntoView({ block: 'start' }); };
    jumps.appendChild(button);
  });
  document.querySelector('.kana-toggle').after(jumps);
  var kanaNote = document.createElement('p'); kanaNote.className = 'kana-note'; kanaNote.textContent = 'Wähle ein Zeichen, um die Aussprache zu hören.'; jumps.after(kanaNote);
  var helpPanel = document.querySelector('.help-panel'); helpPanel.setAttribute('role', 'dialog'); helpPanel.setAttribute('aria-modal', 'true'); helpPanel.querySelector('h2').id = 'help-title'; helpPanel.setAttribute('aria-labelledby', 'help-title');
  helpPanel.addEventListener('keydown', function (e) { trap(e, helpPanel); });
  document.getElementById('help-open').onclick = toggleHelp;
  document.getElementById('nav-toggle').onclick = function () { setDrawer(!sidebar.classList.contains('open')); };
  document.getElementById('nav-backdrop').onclick = function () { setDrawer(false); document.getElementById('nav-toggle').focus(); };
  var drawerClose = document.createElement('button'); drawerClose.id = 'nav-close'; drawerClose.textContent = 'Navigation schließen ×'; drawerClose.onclick = function () { setDrawer(false); document.getElementById('nav-toggle').focus(); }; sidebar.prepend(drawerClose);
  document.querySelector('.skip-link').onclick = function (e) { e.preventDefault(); var main = document.getElementById('main-content'); main.focus(); main.scrollIntoView(); };
  document.addEventListener('keydown', function (e) {
    if (!document.getElementById('help-overlay').classList.contains('hidden') && e.key === 'Escape') {
      toggleHelp(); e.preventDefault(); e.stopImmediatePropagation(); return;
    }
    if (sidebar.classList.contains('open') && window.innerWidth < 1024) {
      if (e.key === 'Escape') { setDrawer(false); document.getElementById('nav-toggle').focus(); e.preventDefault(); e.stopImmediatePropagation(); }
      else trap(e, sidebar);
    }
  }, true);
  function preferences() {
    document.getElementById('theme-toggle').setAttribute('aria-pressed', String(document.documentElement.dataset.theme === 'dark'));
    var sound = document.getElementById('sound-toggle'); var enabled = sound.classList.contains('active');
    sound.setAttribute('aria-pressed', String(enabled)); sound.querySelector('.sound-state').textContent = enabled ? 'An' : 'Aus';
  }
  document.getElementById('theme-toggle').addEventListener('click', preferences);
  document.getElementById('sound-toggle').addEventListener('click', preferences);
  preferences(); accessibleContent(document);
  var wideFilters = window.innerWidth >= 768;
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 1024) setDrawer(false);
    if ((window.innerWidth >= 768) !== wideFilters) {
      wideFilters = window.innerWidth >= 768;
      document.querySelectorAll('.secondary-filters').forEach(function (details) { details.open = wideFilters; });
    }
    adaptDetail();
  });
  window.addEventListener('popstate', function (event) {
    if (location.hash === lastHash) return;
    if (app.activeTab === 'quiz' && window.QuizModule.isTestActive() && !window.QuizModule.requestExit()) {
      var delta = event.state && typeof event.state.index === 'number' ? historyIndex - event.state.index : 0;
      if (delta) history.go(delta);
      else writeHistory(true, { workspace: priorSnapshot, index: historyIndex }, lastHash);
      return;
    }
    historyIndex = event.state && event.state.index || 0;
    restore(location.hash, event.state && event.state.workspace);
  });
  window.addEventListener('pagehide', function () { save(); window.Comprehension.stop(); });
  var scrollTimer;
  window.addEventListener('scroll', function () { clearTimeout(scrollTimer); scrollTimer = setTimeout(save, 150); }, { passive: true });
  var session = window.NIHONGO_STORAGE.session.getJSON('nihongo-workspace', null, function (value) {
    function record(item) { return item !== null && typeof item === 'object' && !Array.isArray(item); }
    return record(value) && record(value.sections) && Object.keys(value.sections).every(function (name) {
      var saved = value.sections[name];
      return record(saved) && record(saved.filters) && typeof saved.query === 'string';
    });
  });
  restore(location.hash || '#kana', history.state && history.state.workspace || session);
})();
