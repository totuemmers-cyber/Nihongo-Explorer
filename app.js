(function () {
  'use strict';

  // === APP OBJECT (shared across sections) ===
  var app = window.app = {
    activeTab: 'kana',
    activeRadical: null,
    sections: {},
    playTick: playTick,
    playPop: playPop,
    playSwoosh: playSwoosh,
    switchTab: switchTab,
    updateCount: updateCount,
    setRadicalFilter: setRadicalFilter,
    clearRadicalFilter: clearRadicalFilter,
    openRadicalInTab: openRadicalInTab,
    ensureSectionLoaded: ensureSectionLoaded,
    ensureGrammarLessonsLoaded: ensureGrammarLessonsLoaded,
    renderBasicNumbers: renderBasicNumbers,
    speakJP: speakJP
  };

  // === SOUND ENGINE (Web Audio API) ===
  var soundEnabled = localStorage.getItem('kanji-sound') !== 'off';
  var audioCtx = null;

  function getAudioCtx() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
  }

  function playOscSound(configureFn) {
    if (!soundEnabled) return;
    try {
      var ctx = getAudioCtx();
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      configureFn(ctx, osc, gain);
      osc.start(ctx.currentTime);
    } catch (e) {}
  }

  function playTick() {
    playOscSound(function (ctx, osc, gain) {
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
      osc.stop(ctx.currentTime + 0.06);
    });
  }

  function playPop() {
    playOscSound(function (ctx, osc, gain) {
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);
      osc.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.stop(ctx.currentTime + 0.15);
    });
  }

  function playSwoosh() {
    if (!soundEnabled) return;
    try {
      var ctx = getAudioCtx();
      var bufferSize = ctx.sampleRate * 0.08;
      var buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      var data = buffer.getChannelData(0);
      for (var i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
      }
      var noise = ctx.createBufferSource();
      noise.buffer = buffer;
      var filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2000, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.08);
      filter.Q.value = 2;
      var gain = ctx.createGain();
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start(ctx.currentTime);
    } catch (e) {}
  }

  // === DOM REFS ===
  var itemCountEl = document.getElementById('item-count');
  var themeToggle = document.getElementById('theme-toggle');
  var randomBtn = document.getElementById('random-btn');
  var soundToggle = document.getElementById('sound-toggle');
  var radicalFilter = document.getElementById('radical-filter');
  var radicalFilterName = document.getElementById('radical-filter-name');
  var loadingEls = {
    kanji: document.getElementById('kanji-loading'),
    grammar: document.getElementById('grammar-loading'),
    vocab: document.getElementById('vocab-loading'),
    onomatopoeia: document.getElementById('ono-loading'),
    counters: document.getElementById('counters-loading'),
    radicals: document.getElementById('radicals-loading'),
    quiz: document.getElementById('quiz-loading')
  };
  var sectionErrorState = {};
  var scriptState = { loaded: {}, pending: {} };
  var quizDataLoaded = false;
  var quizDataPromise = null;
  var grammarLessonsPromise = null;
  var INTENTIONAL_VOCAB_OVERLAP_KEYS = {
    '一期一会|いちごいちえ': 1,
    '一石二鳥|いっせきにちょう': 1,
    '自業自得|じごうじとく': 1,
    '以心伝心|いしんでんしん': 1
  };
  var CORE_VOCAB_PREFERRED_KEYS = {
    '大丈夫|だいじょうぶ': 1,
    '自己紹介|じこしょうかい': 1,
    '一人暮らし|ひとりぐらし': 1,
    '役に立つ|やくにたつ': 1,
    '間に合う|まにあう': 1,
    '我慢する|がまんする': 1,
    '気にする|きにする': 1,
    '寝坊する|ねぼうする': 1,
    '道に迷う|みちにまよう': 1,
    '首になる|くびになる': 1,
    '口にする|くちにする': 1,
    'お世話になる|おせわになる': 1
  };

  function getEntryKey(item) {
    return (item.word || '') + '|' + (item.reading || '');
  }

  function createSourceScopedItems(source, items) {
    var scoped = [];
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (!item) continue;
      var next = {};
      for (var key in item) {
        if (item.hasOwnProperty(key)) next[key] = item[key];
      }
      next.id = source + ':' + i;
      next.source = source;
      next.studyLens = source === 'idioms' ? 'idiom' : (source === 'yojijukugo' ? 'yojijukugo' : 'vocab');
      next.mergeKey = getEntryKey(next);
      scoped.push(next);
    }
    return scoped;
  }

  function getSourcePriority(item) {
    var key = item.mergeKey || getEntryKey(item);
    var source = item.source || '';
    var isCore = source.indexOf('vocab-') === 0;
    if (CORE_VOCAB_PREFERRED_KEYS[key]) {
      if (isCore) return 40;
      if (source === 'idioms') return 20;
      if (source === 'yojijukugo') return 10;
      return 0;
    }
    if (source === 'idioms') return 40;
    if (source === 'yojijukugo') return 30;
    if (isCore) return 20;
    return 10;
  }

  function getEntryRichness(item) {
    var score = 0;
    if (item.meaning) score += item.meaning.length;
    if (item.notes) score += item.notes.length;
    if (item.explanation) score += item.explanation.length;
    if (item.examples && item.examples.length) score += item.examples.length * 25;
    if (item.type === 'Redewendung' || item.type === 'Sprichwort' || item.type === 'Yojijukugo') score += 20;
    return score;
  }

  function dedupeSpecialistItems(items, keyFn) {
    var byKey = {};
    var result = [];
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var key = keyFn(item);
      if (!key) {
        result.push(item);
        continue;
      }
      var existing = byKey[key];
      if (!existing || getEntryRichness(item) > getEntryRichness(existing)) {
        byKey[key] = item;
      }
    }
    for (var j = 0; j < items.length; j++) {
      var current = items[j];
      var currentKey = keyFn(current);
      if (!currentKey || byKey[currentKey] === current) {
        result.push(current);
      }
    }
    return result;
  }

  function mergeVocabSources(sources) {
    var groups = {};
    var merged = [];
    var ordered = [];
    for (var i = 0; i < sources.length; i++) {
      var source = sources[i];
      var scopedItems = createSourceScopedItems(source.name, source.items);
      for (var j = 0; j < scopedItems.length; j++) {
        var item = scopedItems[j];
        ordered.push(item);
        if (!groups[item.mergeKey]) groups[item.mergeKey] = [];
        groups[item.mergeKey].push(item);
      }
    }

    for (var k = 0; k < ordered.length; k++) {
      var candidate = ordered[k];
      var key = candidate.mergeKey;
      var grouped = groups[key];
      if (!grouped) continue;

      if (INTENTIONAL_VOCAB_OVERLAP_KEYS[key]) {
        merged.push(candidate);
        continue;
      }

      var best = grouped[0];
      for (var n = 1; n < grouped.length; n++) {
        var contender = grouped[n];
        var contenderPriority = getSourcePriority(contender);
        var bestPriority = getSourcePriority(best);
        if (contenderPriority > bestPriority ||
            (contenderPriority === bestPriority && getEntryRichness(contender) > getEntryRichness(best))) {
          best = contender;
        }
      }

      if (best === candidate) {
        merged.push(candidate);
      }

      delete groups[key];
    }

    return merged;
  }

  var sectionLoaders = {
    kanji: {
      scripts: ['kangxi-radicals-data.js', 'kanji-data.js', 'kanji-n1.js'],
      message: 'Lade Kanji-Daten...',
      hydrate: function () {
        var items = [];
        if (window.KANJI_DATA) {
          items = window.KANJI_DATA.slice();
          if (window.KANJI_N1_DATA) items = items.concat(window.KANJI_N1_DATA);
        }
        if (window.resetSectionLookups) window.resetSectionLookups();
        app.sections.kanji.setItems(items);
        if (!app.sections.radicals.isLoaded && window.KANGXI_RADICALS) {
          app.sections.radicals.setItems(window.KANGXI_RADICALS);
        }
      }
    },
    grammar: {
      scripts: ['grammar-data.js', 'grammar-n2.js', 'grammar-n1.js', 'keigo-data.js'],
      message: 'Lade Grammatik-Daten...',
      hydrate: function () {
        app.sections.grammar.setItems(window.GRAMMAR_DATA || []);
      }
    },
    vocab: {
      scripts: ['vocab-n5.js', 'vocab-n4.js', 'vocab-n3.js', 'vocab-n2.js', 'vocab-n1.js', 'yojijukugo-data.js', 'idioms-data.js'],
      message: 'Lade Vokabel-Daten...',
      hydrate: function () {
        var vocabSources = [
          { name: 'vocab-n5', items: window.VOCAB_N5 || [] },
          { name: 'vocab-n4', items: window.VOCAB_N4 || [] },
          { name: 'vocab-n3', items: window.VOCAB_N3 || [] },
          { name: 'vocab-n2', items: window.VOCAB_N2 || [] },
          { name: 'vocab-n1', items: window.VOCAB_N1 || [] },
          { name: 'yojijukugo', items: dedupeSpecialistItems(window.YOJIJUKUGO_DATA || [], getEntryKey) },
          { name: 'idioms', items: window.IDIOMS_DATA || [] }
        ];
        if (window.applyVocabCorrections) window.applyVocabCorrections();
        app.sections.vocab.setItems(mergeVocabSources(vocabSources));
      }
    },
    onomatopoeia: {
      scripts: ['onomatopoeia-data.js'],
      message: 'Lade Lautmalerei-Daten...',
      hydrate: function () {
        var items = dedupeSpecialistItems(window.ONOMATOPOEIA_DATA || [], function (item) {
          return item.word || '';
        });
        app.sections.onomatopoeia.setItems(createSourceScopedItems('onomatopoeia', items));
      }
    },
    counters: {
      scripts: ['counters-data.js'],
      message: 'Lade Zählwort-Daten...',
      hydrate: function () {
        var counters = window.COUNTERS_DATA && window.COUNTERS_DATA.counters ? window.COUNTERS_DATA.counters : [];
        app.sections.counters.setItems(counters);
      }
    },
    radicals: {
      scripts: ['kangxi-radicals-data.js'],
      message: 'Lade Radikal-Daten...',
      hydrate: function () {
        if (window.resetSectionLookups) window.resetSectionLookups();
        app.sections.radicals.setItems(window.KANGXI_RADICALS || []);
      }
    }
  };

  // Tab panels and controls that are not section-managed (kana, quiz)
  var kanaTab = document.getElementById('kana-tab');
  var quizTab = document.getElementById('quiz-tab');
  var activeKanaMode = 'hiragana';

  // Section names that have controls + tab panels
  var sectionNames = ['kanji', 'grammar', 'vocab', 'onomatopoeia', 'counters', 'radicals'];

  // === INSTANTIATE SECTIONS ===
  sectionNames.forEach(function (name) {
    app.sections[name] = new Section(SECTION_CONFIGS[name]);
  });

  function getSectionHost(name) {
    if (name === 'kana') return kanaTab;
    if (name === 'quiz') return quizTab;
    return tabPanels[name] || null;
  }

  function getSectionErrorEl(name) {
    var host = getSectionHost(name);
    if (!host) return null;

    var existing = host.querySelector('.section-error');
    if (existing) return existing;

    var errorEl = document.createElement('div');
    errorEl.className = 'section-error hidden';

    var textEl = document.createElement('div');
    textEl.className = 'section-error-text';
    errorEl.appendChild(textEl);

    var retryBtn = document.createElement('button');
    retryBtn.className = 'btn btn-pill section-error-retry';
    retryBtn.type = 'button';
    retryBtn.textContent = 'Erneut versuchen';
    errorEl.appendChild(retryBtn);

    host.insertBefore(errorEl, host.firstChild);
    return errorEl;
  }

  function clearSectionError(name) {
    sectionErrorState[name] = null;
    var errorEl = getSectionErrorEl(name);
    if (!errorEl) return;
    errorEl.classList.add('hidden');
    var retryBtn = errorEl.querySelector('.section-error-retry');
    if (retryBtn) retryBtn.onclick = null;
  }

  function showSectionError(name, message, retryFn) {
    sectionErrorState[name] = { message: message, retry: retryFn };
    var errorEl = getSectionErrorEl(name);
    if (!errorEl) return;

    var textEl = errorEl.querySelector('.section-error-text');
    if (textEl) textEl.textContent = message;

    var retryBtn = errorEl.querySelector('.section-error-retry');
    if (retryBtn) {
      retryBtn.onclick = function () {
        clearSectionError(name);
        retryFn();
      };
    }

    errorEl.classList.remove('hidden');
  }

  function shouldBlockScriptLoad(src) {
    var blocklist = window.__NIHONGO_TEST_BLOCK_SCRIPTS;
    return Array.isArray(blocklist) && blocklist.indexOf(src) !== -1;
  }

  function setLoadingVisible(name, visible, message) {
    var loadingEl = loadingEls[name];
    if (!loadingEl) return;
    if (message) {
      var label = loadingEl.querySelector('span');
      if (label) label.textContent = message;
    }
    loadingEl.classList.toggle('hidden', !visible);
  }

  function loadScript(src) {
    if (scriptState.loaded[src]) {
      return Promise.resolve();
    }
    if (scriptState.pending[src]) {
      return scriptState.pending[src];
    }
    if (shouldBlockScriptLoad(src)) {
      return Promise.reject(new Error('Script wurde absichtlich blockiert: ' + src));
    }

    scriptState.pending[src] = new Promise(function (resolve, reject) {
      var script = document.createElement('script');
      script.src = src;
      script.async = false;
      script.onload = function () {
        scriptState.loaded[src] = true;
        delete scriptState.pending[src];
        resolve();
      };
      script.onerror = function () {
        delete scriptState.pending[src];
        reject(new Error('Script konnte nicht geladen werden: ' + src));
      };
      document.body.appendChild(script);
    });

    return scriptState.pending[src];
  }

  function loadScripts(sources) {
    var promise = Promise.resolve();
    sources.forEach(function (src) {
      promise = promise.then(function () {
        return loadScript(src);
      });
    });
    return promise;
  }

  function ensureSectionLoaded(name) {
    if (name === 'quiz') return ensureQuizDataLoaded();

    var section = app.sections[name];
    var loader = sectionLoaders[name];
    if (!section || !loader) return Promise.resolve();
    if (section.isLoaded) return Promise.resolve();
    if (section._loadPromise) return section._loadPromise;

    clearSectionError(name);
    section.isLoading = true;
    setLoadingVisible(name, true, loader.message);

    section._loadPromise = loadScripts(loader.scripts)
      .then(function () {
        loader.hydrate();
        clearSectionError(name);
      })
      .catch(function (err) {
        section._loadPromise = null;
        console.error(err);
        showSectionError(name, loader.message.replace('Lade', 'Fehler beim Laden von').replace('...', '.') + ' Bitte erneut versuchen.', function () {
          ensureSectionLoaded(name).then(function () {
            if (app.activeTab === name && app.sections[name] && app.sections[name].config.onTabActivate) {
              app.sections[name].config.onTabActivate(app.sections[name]);
            }
          }).catch(function () {});
        });
        throw err;
      })
      .finally(function () {
        section.isLoading = false;
        setLoadingVisible(name, false);
      });

    return section._loadPromise;
  }

  function ensureQuizDataLoaded() {
    if (quizDataLoaded) return Promise.resolve();
    if (quizDataPromise) return quizDataPromise;

    setLoadingVisible('quiz', true, 'Lade Quiz-Daten...');
    quizDataPromise = Promise.all([
      ensureSectionLoaded('kanji'),
      ensureSectionLoaded('grammar'),
      ensureSectionLoaded('vocab')
    ]).then(function () {
      quizDataLoaded = true;
    }).catch(function (err) {
      quizDataPromise = null;
      throw err;
    }).finally(function () {
      setLoadingVisible('quiz', false);
    });

    return quizDataPromise;
  }

  function ensureGrammarLessonsLoaded() {
    if (window.__grammarLessonsInitialized) {
      return Promise.resolve();
    }
    if (grammarLessonsPromise) {
      return grammarLessonsPromise;
    }

    clearSectionError('grammar');
    setLoadingVisible('grammar', true, 'Lade Grammatik-Lektionen...');
    grammarLessonsPromise = loadScript('grammar-lessons.js')
      .then(function () {
        clearSectionError('grammar');
      })
      .catch(function (err) {
        grammarLessonsPromise = null;
        console.error(err);
        showSectionError('grammar', 'Grammatik-Lektionen konnten nicht geladen werden. Bitte erneut versuchen.', function () {
          ensureGrammarLessonsLoaded().catch(function () {});
        });
        throw err;
      })
      .finally(function () {
        setLoadingVisible('grammar', false);
      });

    return grammarLessonsPromise;
  }

  // === TAB SYSTEM ===
  function switchTab(tab) {
    app.activeTab = tab;
    playSwoosh();

    tabBtns.forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tab);
    });
    moveTabIndicator();

    // Toggle controls and tab panels for sections
    sectionNames.forEach(function (name) {
      var sec = app.sections[name];
      if (sec.dom.controls) sec.dom.controls.classList.toggle('hidden', tab !== name);
      if (tabPanels[name]) tabPanels[name].classList.toggle('hidden', tab !== name);
    });

    // Kana tab (no Section instance)
    kanaTab.classList.toggle('hidden', tab !== 'kana');

    // Quiz tab (no Section instance)
    if (quizTab) quizTab.classList.toggle('hidden', tab !== 'quiz');

    // Tab activate hooks
    if (tab === 'kana') {
      renderKana();
      updateKanaDarkMode();
      updateCount();
      return;
    }

    if (tab === 'quiz') {
      ensureQuizDataLoaded().then(function () {
        if (app.activeTab !== 'quiz') return;
        if (window.QuizModule) window.QuizModule.onTabActivate();
        updateCount();
      }).catch(function () {
        updateCount();
      });
      updateCount();
      return;
    }

    if (app.sections[tab]) {
      ensureSectionLoaded(tab).then(function () {
        if (app.activeTab !== tab) return;
        if (app.sections[tab].config.onTabActivate) {
          app.sections[tab].config.onTabActivate(app.sections[tab]);
        }
        updateCount();
      }).catch(function () {
        updateCount();
      });
    }
    updateCount();
  }

  // Cache static DOM collections
  var tabBtns = document.querySelectorAll('.tab-btn');
  var tabIndicator = document.querySelector('.tab-indicator');
  var tabPanels = {};
  sectionNames.forEach(function (name) {
    tabPanels[name] = document.getElementById(name + '-tab');
  });

  function moveTabIndicator() {
    var activeBtn = document.querySelector('.tab-btn.active');
    if (activeBtn && tabIndicator) {
      var bar = activeBtn.parentElement;
      var barRect = bar.getBoundingClientRect();
      var btnRect = activeBtn.getBoundingClientRect();
      tabIndicator.style.left = (btnRect.left - barRect.left + bar.scrollLeft) + 'px';
      tabIndicator.style.width = btnRect.width + 'px';
    }
  }

  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      switchTab(this.getAttribute('data-tab'));
    });
  });

  // Position indicator on load & resize
  moveTabIndicator();
  window.addEventListener('resize', moveTabIndicator);

  // === COUNT UPDATE ===
  function updateCount() {
    var tab = app.activeTab;
    if (tab === 'kana') {
      var kanaLabels = { hiragana: 'Hiragana', katakana: 'Katakana' };
      itemCountEl.textContent = kanaLabels[activeKanaMode] || 'Kana';
    } else if (tab === 'quiz') {
      itemCountEl.textContent = quizDataLoaded ? 'Quiz' : 'Lädt…';
    } else if (app.sections[tab]) {
      var sec = app.sections[tab];
      itemCountEl.textContent = sec.isLoaded ? (sec.filteredItems.length + sec.config.countLabel) : 'Lädt…';
    }
  }

  // === RADICAL FILTER (kanji-specific, managed in app) ===
  function setRadicalFilter(radical, meaning) {
    app.activeRadical = radical;
    radicalFilterName.textContent = radical + ' (' + meaning + ')';
    radicalFilter.classList.remove('hidden');
    app.sections.kanji.applyFilters();
  }

  function clearRadicalFilter() {
    app.activeRadical = null;
    radicalFilter.classList.add('hidden');
    app.sections.kanji.applyFilters();
  }

  document.getElementById('clear-radical-filter').addEventListener('click', clearRadicalFilter);

  // === OPEN RADICAL IN TAB (cross-section) ===
  function openRadicalInTab(radicalChar) {
    switchTab('radicals');
    ensureSectionLoaded('radicals').then(function () {
      var radSec = app.sections.radicals;
      radSec.resetFilterGroup('strokes');
      radSec.dom.search.value = '';
      radSec.applyFilters();
      for (var i = 0; i < radSec.filteredItems.length; i++) {
        if (radSec.filteredItems[i].radical === radicalChar) {
          radSec.openDetail(i);
          break;
        }
      }
    }).catch(function () {});
  }

  // === BASIC NUMBERS (counters section) ===
  function renderBasicNumbers() {
    var container = document.getElementById('counters-numbers-section');
    if (!container || container.children.length > 0) return;
    var data = window.COUNTERS_DATA;
    if (!data || !data.basicNumbers) return;

    var section = document.createElement('div');
    section.className = 'counters-numbers-section';

    var header = document.createElement('div');
    header.className = 'counters-numbers-header';
    header.innerHTML = '<span class="tab-icon-kana" style="font-family:var(--font-jp)">\u6570</span> Grundzahlen' +
      '<svg class="toggle-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>';

    var body = document.createElement('div');
    body.className = 'counters-numbers-body';

    var wrapper = document.createElement('div');
    wrapper.className = 'numbers-table-wrapper';

    var table = document.createElement('table');
    table.className = 'numbers-table';
    table.innerHTML = '<thead><tr><th>Zahl</th><th>Kanji</th><th>Hiragana</th><th>Romaji</th><th>Hinweis</th></tr></thead>';

    var tbody = document.createElement('tbody');
    data.basicNumbers.forEach(function (n) {
      var tr = document.createElement('tr');
      tr.innerHTML =
        '<td><strong>' + n.number + '</strong></td>' +
        '<td class="num-kanji">' + n.kanji + '</td>' +
        '<td class="num-hiragana">' + n.hiragana + '</td>' +
        '<td class="num-romaji">' + n.romaji + '</td>' +
        '<td class="num-notes">' + (n.notes || '\u2014') + '</td>';
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    wrapper.appendChild(table);
    body.appendChild(wrapper);

    header.addEventListener('click', function () {
      playTick();
      var icon = header.querySelector('.toggle-icon');
      body.classList.toggle('collapsed');
      icon.classList.toggle('collapsed');
    });

    section.appendChild(header);
    section.appendChild(body);
    container.appendChild(section);
  }

  // === THEME ===
  function initTheme() {
    var saved = localStorage.getItem('kanji-theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }

  function toggleTheme() {
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('kanji-theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('kanji-theme', 'dark');
    }
    setTimeout(updateKanaDarkMode, 50);
  }

  themeToggle.addEventListener('click', function () {
    playTick();
    toggleTheme();
  });

  // === SOUND TOGGLE ===
  if (soundToggle) {
    soundToggle.classList.toggle('active', soundEnabled);
    soundToggle.addEventListener('click', function () {
      soundEnabled = !soundEnabled;
      localStorage.setItem('kanji-sound', soundEnabled ? 'on' : 'off');
      soundToggle.classList.toggle('active', soundEnabled);
      if (soundEnabled) playPop();
    });
  }

  // === RANDOM BUTTON (data-driven) ===
  randomBtn.addEventListener('click', function () {
    playPop();
    var tab = app.activeTab;
    if (app.sections[tab]) {
      var sec = app.sections[tab];
      ensureSectionLoaded(tab).then(function () {
        if (sec.filteredItems.length === 0) return;
        var idx = Math.floor(Math.random() * sec.filteredItems.length);
        sec.openDetail(idx);
      }).catch(function () {});
    }
  });

  // === KEYBOARD NAVIGATION (data-driven) ===
  document.addEventListener('keydown', function (e) {
    // Quiz keyboard handling
    if (window.QuizModule && window.QuizModule.handleKey(e)) return;

    // Check if any overlay is open
    for (var i = 0; i < sectionNames.length; i++) {
      var sec = app.sections[sectionNames[i]];
      if (sec.isOverlayOpen()) {
        if (e.key === 'Escape') sec.closeDetail();
        if (e.key === 'ArrowLeft') sec.navigateDetail(-1);
        if (e.key === 'ArrowRight') sec.navigateDetail(1);
        return;
      }
    }

    var helpOverlay = document.getElementById('help-overlay');
    if (helpOverlay && !helpOverlay.classList.contains('hidden')) {
      if (e.key === 'Escape' || e.key === '?') {
        e.preventDefault();
        toggleHelpOverlay();
      }
      return;
    }

    // Skip shortcuts when typing in an input
    var ae = document.activeElement;
    if (ae && (ae.tagName === 'INPUT' || ae.tagName === 'SELECT' || ae.tagName === 'TEXTAREA')) {
      if (e.key === 'Escape') { ae.blur(); return; }
      return;
    }

    // Help overlay toggle
    if (e.key === '?') {
      e.preventDefault();
      toggleHelpOverlay();
      return;
    }

    // Tab switching: 1-8
    var tabKeys = ['1', '2', '3', '4', '5', '6', '7', '8'];
    var tabNames = ['kana', 'radicals', 'kanji', 'vocab', 'onomatopoeia', 'grammar', 'counters', 'quiz'];
    var keyIdx = tabKeys.indexOf(e.key);
    if (keyIdx !== -1) {
      e.preventDefault();
      switchTab(tabNames[keyIdx]);
      return;
    }

    // Random entry: r
    if (e.key === 'r') {
      randomBtn.click();
      return;
    }

    // Focus search: /
    if (e.key === '/') {
      var tab = app.activeTab;
      if (tab === 'kana') return;
      if (app.sections[tab] && app.sections[tab].dom.search) {
        e.preventDefault();
        app.sections[tab].dom.search.focus();
      }
    }
  });

  // ==========================================
  // === KANA SECTION (unchanged) ===
  // ==========================================
  function buildKanaTable(rows, mode, colHeaders, isYoon) {
    var table = document.createElement('table');
    table.className = 'kana-table' + (isYoon ? ' yoon-table' : '');

    var thead = document.createElement('thead');
    var headerRow = document.createElement('tr');
    var thLabel = document.createElement('th');
    thLabel.textContent = '';
    headerRow.appendChild(thLabel);
    colHeaders.forEach(function (h) {
      var th = document.createElement('th');
      th.textContent = h;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    var tbody = document.createElement('tbody');
    var colors = window.KANA_DATA.rowColors;
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    rows.forEach(function (rowData) {
      var tr = document.createElement('tr');
      var rowColor = colors[rowData.row] || colors['vowel'];

      var tdLabel = document.createElement('td');
      tdLabel.className = 'kana-row-label';
      tdLabel.textContent = rowData.label;
      tdLabel.style.borderLeft = '3px solid ' + rowColor.color;
      tr.appendChild(tdLabel);

      rowData.chars.forEach(function (ch) {
        var td = document.createElement('td');
        td.className = 'kana-cell';

        if (ch) {
          var inner = document.createElement('div');
          inner.className = 'kana-cell-inner';
          inner.setAttribute('data-row', rowData.row);
          inner.style.background = isDark ? rowColor.darkBg : rowColor.bg;
          inner.style.borderColor = isDark ? rowColor.darkBorder : rowColor.border;

          var charSpan = document.createElement('span');
          charSpan.className = 'kana-char';
          charSpan.textContent = mode === 'hiragana' ? ch.h : ch.k;
          inner.appendChild(charSpan);

          var romajiSpan = document.createElement('span');
          romajiSpan.className = 'kana-romaji';
          romajiSpan.textContent = ch.r;
          romajiSpan.style.color = rowColor.color;
          inner.appendChild(romajiSpan);

          inner.addEventListener('click', function () {
            playTick();
            speakJP(ch.h);
          });

          td.appendChild(inner);
        } else {
          var empty = document.createElement('div');
          empty.className = 'kana-cell-empty';
          td.appendChild(empty);
        }

        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    return table;
  }

  function speakJP(text) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      var clean = text.replace(/[.\-]/g, '');
      var utterance = new SpeechSynthesisUtterance(clean);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.8;
      utterance.volume = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  }

  function createKanaSection(title, icon, rows, mode, colHeaders, isYoon) {
    var section = document.createElement('div');
    section.className = 'kana-section';

    var header = document.createElement('div');
    header.className = 'kana-section-header';
    var iconSpan = document.createElement('span');
    iconSpan.className = 'kana-section-icon';
    iconSpan.textContent = icon;
    header.appendChild(iconSpan);
    var titleSpan = document.createElement('span');
    titleSpan.textContent = title;
    header.appendChild(titleSpan);
    section.appendChild(header);

    var wrapper = document.createElement('div');
    wrapper.className = 'kana-table-wrapper';
    wrapper.appendChild(buildKanaTable(rows, mode, colHeaders, isYoon));
    section.appendChild(wrapper);

    return section;
  }

  var _lastKanaMode = null;

  function renderKana() {
    var container = document.getElementById('kana-content');
    if (!container) return;
    if (_lastKanaMode === activeKanaMode) return;
    _lastKanaMode = activeKanaMode;
    container.innerHTML = '';

    var data = window.KANA_DATA;
    if (!data) return;

    var mode = activeKanaMode;
    var vowelHeaders = ['a', 'i', 'u', 'e', 'o'];
    var yoonHeaders = ['ya', 'yu', 'yo'];

    var basisIcon = mode === 'katakana' ? '\u30A2' : '\u3042';
    container.appendChild(createKanaSection('Basis (Goj\u016bon)', basisIcon, data.gojuon, mode, vowelHeaders, false));

    var dakutenIcon = mode === 'katakana' ? '\u30AC' : '\u304C';
    container.appendChild(createKanaSection('Dakuten / Handakuten', dakutenIcon, data.dakuten, mode, vowelHeaders, false));

    var yoonIcon = mode === 'katakana' ? '\u30AD\u30E3' : '\u304D\u3083';
    container.appendChild(createKanaSection('Kombinationen (Y\u014don)', yoonIcon, data.yoon, mode, yoonHeaders, true));
  }

  // Kana toggle buttons
  document.querySelectorAll('.kana-toggle-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var mode = this.getAttribute('data-kana');
      playSwoosh();
      if (activeKanaMode === mode) return;
      activeKanaMode = mode;
      _lastKanaMode = null;
      document.querySelectorAll('.kana-toggle-btn').forEach(function (b) {
        b.classList.toggle('active', b.getAttribute('data-kana') === mode);
      });
      renderKana();
      updateKanaDarkMode();
      updateCount();
    });
  });

  function updateKanaDarkMode() {
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    var colors = window.KANA_DATA ? window.KANA_DATA.rowColors : null;
    if (!colors) return;

    document.querySelectorAll('.kana-cell-inner').forEach(function (cell) {
      var rowKey = cell.getAttribute('data-row');
      if (rowKey && colors[rowKey]) {
        cell.style.background = isDark ? colors[rowKey].darkBg : colors[rowKey].bg;
        cell.style.borderColor = isDark ? colors[rowKey].darkBorder : colors[rowKey].border;
      }
    });
  }

  // === HELP OVERLAY ===
  function toggleHelpOverlay() {
    var overlay = document.getElementById('help-overlay');
    if (!overlay) return;
    var isHidden = overlay.classList.contains('hidden');
    overlay.classList.toggle('hidden', !isHidden);
    document.body.style.overflow = isHidden ? 'hidden' : '';
  }

  var helpOverlay = document.getElementById('help-overlay');
  if (helpOverlay) {
    helpOverlay.addEventListener('click', function (e) {
      if (e.target === helpOverlay) toggleHelpOverlay();
    });
    var helpCloseBtn = document.getElementById('help-close');
    if (helpCloseBtn) helpCloseBtn.addEventListener('click', toggleHelpOverlay);
  }

  var grammarViewToggle = document.getElementById('grammar-view-toggle');
  if (grammarViewToggle) {
    grammarViewToggle.addEventListener('click', function (e) {
      var btn = e.target.closest('.gl-view-btn');
      if (!btn || btn.getAttribute('data-view') !== 'lessons' || window.__grammarLessonsInitialized) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();
      if (btn.disabled) return;

      btn.disabled = true;
      ensureGrammarLessonsLoaded().then(function () {
        btn.disabled = false;
        if (window.__grammarLessonsInitialized) btn.click();
      }).catch(function () {
        btn.disabled = false;
      });
    });
  }

  // === INIT ===
  initTheme();
  renderKana();
  updateKanaDarkMode();
  if (typeof initBookmarkToggles === 'function') initBookmarkToggles();
  if (typeof initSelectFilters === 'function') initSelectFilters();
  updateCount();
})();
