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
    ensureQuizDataLoaded: ensureQuizDataLoaded,
    isQuizDataLoaded: isQuizDataLoaded,
    ensureGrammarLessonsLoaded: ensureGrammarLessonsLoaded,
    renderBasicNumbers: renderBasicNumbers,
    speakJP: speakJP,
    speakJPSequence: speakJPSequence,
    cancelSpeech: cancelSpeech,
    canSpeakJP: canSpeakJP
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
    reading: document.getElementById('reading-loading'),
    quiz: document.getElementById('quiz-loading')
  };
  var sectionErrorState = {};
  var scriptState = { loaded: {}, pending: {} };
  var quizDataLoaded = false;
  var quizDataPromise = null;
  var grammarLessonsPromise = null;
  var jpSpeechVoice = null;
  var jpSpeechInitStarted = false;
  var jpSpeechSpeakTimer = null;
  var jpSpeechRequestId = 0;
  var jpSpeechQueueId = 0;
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

  function getNormalizedVocabSourcesFromGlobals(sourceNames) {
    var allSources = {
      'vocab-n5': { name: 'vocab-n5', items: window.VOCAB_N5 || [] },
      'vocab-n4': { name: 'vocab-n4', items: window.VOCAB_N4 || [] },
      'vocab-n3': { name: 'vocab-n3', items: window.VOCAB_N3 || [] },
      'vocab-n2': { name: 'vocab-n2', items: window.VOCAB_N2 || [] },
      'vocab-n1': { name: 'vocab-n1', items: window.VOCAB_N1 || [] },
      yojijukugo: { name: 'yojijukugo', items: dedupeSpecialistItems(window.YOJIJUKUGO_DATA || [], getEntryKey) },
      idioms: { name: 'idioms', items: window.IDIOMS_DATA || [] }
    };
    var rawSources = [];
    for (var i = 0; i < sourceNames.length; i++) {
      rawSources.push(allSources[sourceNames[i]]);
    }
    return window.getNormalizedVocabSources
      ? window.getNormalizedVocabSources(rawSources)
      : rawSources;
  }

  function buildMergedVocabForSources(sourceNames) {
    return mergeVocabSources(getNormalizedVocabSourcesFromGlobals(sourceNames));
  }

  var sectionLoaders = {
    kanji: {
      initialScripts: ['kangxi-radicals-data.js', 'kanji-data.js'],
      backgroundScripts: ['kanji-n1.js'],
      message: 'Lade Kanji-Daten...',
      hydrateInitial: function () {
        if (window.resetSectionLookups) window.resetSectionLookups();
        app.sections.kanji.setItems(window.KANJI_DATA ? window.KANJI_DATA.slice() : []);
        if (!app.sections.radicals.isLoaded && window.KANGXI_RADICALS) {
          app.sections.radicals.setItems(window.KANGXI_RADICALS);
        }
      },
      hydrateBackground: function () {
        if (window.KANJI_N1_DATA) {
          app.sections.kanji.appendItems(window.KANJI_N1_DATA, { preserveGrid: true });
          if (window.resetSectionLookups) window.resetSectionLookups();
        }
      }
    },
    grammar: {
      initialScripts: ['grammar-data.js'],
      backgroundScripts: ['grammar-n2.js', 'grammar-n1.js', 'keigo-data.js'],
      message: 'Lade Grammatik-Daten...',
      hydrateInitial: function () {
        app.sections.grammar.setItems(window.GRAMMAR_DATA || []);
      },
      hydrateBackground: function () {
        app.sections.grammar.setItems(window.GRAMMAR_DATA || [], { preserveGrid: true });
      }
    },
    vocab: {
      initialScripts: ['vocab-n5.js'],
      backgroundScripts: ['vocab-n4.js', 'vocab-n3.js', 'vocab-n2.js', 'vocab-n1.js', 'yojijukugo-data.js', 'idioms-data.js'],
      message: 'Lade Vokabel-Daten...',
      hydrateInitial: function () {
        app.sections.vocab.setItems(buildMergedVocabForSources(['vocab-n5']));
      },
      hydrateBackground: function () {
        app.sections.vocab.setItems(buildMergedVocabForSources([
          'vocab-n5', 'vocab-n4', 'vocab-n3', 'vocab-n2', 'vocab-n1', 'yojijukugo', 'idioms'
        ]), { preserveGrid: true });
      }
    },
    onomatopoeia: {
      initialScripts: ['onomatopoeia-data.js'],
      message: 'Lade Lautmalerei-Daten...',
      hydrateInitial: function () {
        var items = dedupeSpecialistItems(window.ONOMATOPOEIA_DATA || [], function (item) {
          return item.word || '';
        });
        app.sections.onomatopoeia.setItems(createSourceScopedItems('onomatopoeia', items));
      }
    },
    counters: {
      initialScripts: ['counters-data.js'],
      message: 'Lade Zählwort-Daten...',
      hydrateInitial: function () {
        var counters = window.COUNTERS_DATA && window.COUNTERS_DATA.counters ? window.COUNTERS_DATA.counters : [];
        app.sections.counters.setItems(counters);
      }
    },
    radicals: {
      initialScripts: ['kangxi-radicals-data.js'],
      message: 'Lade Radikal-Daten...',
      hydrateInitial: function () {
        if (window.resetSectionLookups) window.resetSectionLookups();
        app.sections.radicals.setItems(window.KANGXI_RADICALS || []);
      }
    },
    reading: {
      initialScripts: ['reading-data.js', 'reading-questions.js'],
      message: 'Lade Lesestücke...',
      hydrateInitial: function () {
        app.sections.reading.setItems(window.READING_DATA ? window.READING_DATA.slice() : []);
      }
    }
  };

  // Tab panels and controls that are not section-managed (kana, quiz)
  var kanaTab = document.getElementById('kana-tab');
  var quizTab = document.getElementById('quiz-tab');
  var reviewTab = document.getElementById('review-tab');
  var pathTab = document.getElementById('path-tab');
  var activeKanaMode = 'hiragana';

  // Section names that have controls + tab panels
  var sectionNames = ['kanji', 'grammar', 'vocab', 'onomatopoeia', 'counters', 'radicals', 'reading'];

  // === INSTANTIATE SECTIONS ===
  sectionNames.forEach(function (name) {
    app.sections[name] = new Section(SECTION_CONFIGS[name]);
  });

  function getSectionHost(name) {
    if (typeof document === 'undefined') return null;
    if (name === 'kana') return kanaTab;
    if (name === 'quiz') return quizTab;
    if (name === 'review') return reviewTab;
    if (name === 'path') return pathTab;
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

  function loadScriptGroup(sources) {
    if (!sources || sources.length === 0) return Promise.resolve();
    return Promise.all(sources.map(function (src) {
      return loadScript(src);
    }));
  }

  function ensureSectionLoaded(name) {
    if (name === 'quiz') return ensureQuizDataLoaded();

    var section = app.sections[name];
    var loader = sectionLoaders[name];
    if (!section || !loader) return Promise.resolve();
    if (section.isComplete) return Promise.resolve();
    if (section._loadPromise) return section._loadPromise;

    clearSectionError(name);
    section.isLoading = true;
    setLoadingVisible(name, true, loader.message);

    section._initialLoadPromise = loadScripts(loader.initialScripts || loader.scripts || [])
      .then(function () {
        if (loader.hydrateInitial) loader.hydrateInitial();
        else if (loader.hydrate) loader.hydrate();
        clearSectionError(name);
        setLoadingVisible(name, false);
      });

    section._loadPromise = section._initialLoadPromise
      .then(function () {
        if (loader.backgroundScripts && loader.backgroundScripts.length) {
          return loadScriptGroup(loader.backgroundScripts).then(function () {
            if (loader.hydrateBackground) loader.hydrateBackground();
            section.isComplete = true;
          });
        }
        section.isComplete = true;
      })
      .catch(function (err) {
        section._initialLoadPromise = null;
        section._loadPromise = null;
        if (typeof window === 'undefined' || window.closed) return;
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
        if (typeof window === 'undefined' || window.closed) return;
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
      if (typeof window === 'undefined' || window.closed) return;
      throw err;
    }).finally(function () {
      if (typeof window === 'undefined' || window.closed) return;
      setLoadingVisible('quiz', false);
    });

    return quizDataPromise;
  }

  function isQuizDataLoaded() {
    return quizDataLoaded;
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
        if (typeof window === 'undefined' || window.closed) return;
        clearSectionError('grammar');
      })
      .catch(function (err) {
        grammarLessonsPromise = null;
        if (typeof window === 'undefined' || window.closed) return;
        console.error(err);
        showSectionError('grammar', 'Grammatik-Lektionen konnten nicht geladen werden. Bitte erneut versuchen.', function () {
          ensureGrammarLessonsLoaded().catch(function () {});
        });
        throw err;
      })
      .finally(function () {
        if (typeof window === 'undefined' || window.closed) return;
        setLoadingVisible('grammar', false);
      });

    return grammarLessonsPromise;
  }

  // === TAB SYSTEM ===
  function setTabVisibility(tab) {
    sectionNames.forEach(function (name) {
      var sec = app.sections[name];
      if (sec.dom.controls) sec.dom.controls.classList.toggle('hidden', tab !== name);
      if (tabPanels[name]) tabPanels[name].classList.toggle('hidden', tab !== name);
    });
    kanaTab.classList.toggle('hidden', tab !== 'kana');
    if (quizTab) quizTab.classList.toggle('hidden', tab !== 'quiz');
    if (reviewTab) reviewTab.classList.toggle('hidden', tab !== 'review');
    if (pathTab) pathTab.classList.toggle('hidden', tab !== 'path');
  }

  function showSectionTabWhenReady(tab) {
    var section = app.sections[tab];
    if (!section) return;

    ensureSectionLoaded(tab).then(function () {
      if (app.activeTab !== tab) return;
      setTabVisibility(tab);
      if (section.config.onTabActivate) {
        section.config.onTabActivate(section);
      }
      updateCount();
    }).catch(function () {
      if (app.activeTab === tab) setTabVisibility(tab);
      updateCount();
    });
  }

  // Two-level navigation: some top tabs are groups that hold several sections.
  // The sections themselves are unchanged — this only governs the nav chrome.
  var TAB_GROUPS = { schrift: ['kana', 'radicals', 'kanji'], wortschatz: ['vocab', 'onomatopoeia', 'counters'] };
  var SECTION_GROUP = {};
  Object.keys(TAB_GROUPS).forEach(function (g) {
    TAB_GROUPS[g].forEach(function (s) { SECTION_GROUP[s] = g; });
  });
  var lastInGroup = { schrift: 'kana', wortschatz: 'vocab' };

  function switchTab(tab) {
    var pendingSection = app.sections[tab] && !app.sections[tab].isLoaded;
    app.activeTab = tab;
    playSwoosh();

    var group = SECTION_GROUP[tab] || null;
    if (group) lastInGroup[group] = tab;
    tabBtns.forEach(function (btn) {
      var active = btn.getAttribute('data-tab') === tab ||
        (group !== null && btn.getAttribute('data-group') === group);
      btn.classList.toggle('active', active);
    });
    updateSubnav(group, tab);
    moveTabIndicator();

    if (!pendingSection) {
      setTabVisibility(tab);
    }

    // Tab activate hooks
    if (tab === 'kana') {
      renderKana();
      updateKanaDarkMode();
      updateCount();
      return;
    }

    if (tab === 'quiz') {
      if (window.QuizModule) window.QuizModule.onTabActivate();
      updateCount();
      return;
    }

    if (tab === 'review') {
      if (window.SRSUI) window.SRSUI.onTabActivate();
      updateCount();
      return;
    }

    if (tab === 'path') {
      if (window.LearningPath) window.LearningPath.onTabActivate();
      updateCount();
      return;
    }

    if (app.sections[tab]) {
      if (pendingSection) {
        showSectionTabWhenReady(tab);
      } else {
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
    }
    updateCount();
  }

  // Cache static DOM collections
  var tabBtns = document.querySelectorAll('.tab-btn');
  var tabIndicator = document.querySelector('.tab-indicator');
  var subtabBar = document.getElementById('subtab-bar');
  var subtabAside = document.getElementById('subtab-aside');
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

  // Show the secondary bar for the active group and mark the active member.
  function updateSubnav(group, tab) {
    if (!subtabBar) return;
    if (!group) { subtabBar.classList.add('hidden'); return; }
    subtabBar.classList.remove('hidden');
    subtabBar.querySelectorAll('.subtab-btn').forEach(function (b) {
      var inGroup = b.getAttribute('data-group') === group;
      b.classList.toggle('hidden', !inGroup);
      b.classList.toggle('active', inGroup && b.getAttribute('data-tab') === tab);
    });
    // Per-section secondary controls (e.g. Kana's Hiragana/Katakana) shown at the
    // right of the bar — only the one for the active section, if any.
    if (subtabAside) {
      subtabAside.querySelectorAll('.subtab-aside-item').forEach(function (item) {
        item.classList.toggle('active', item.getAttribute('data-for') === tab);
      });
    }
  }

  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var group = this.getAttribute('data-group');
      if (group) switchTab(lastInGroup[group] || TAB_GROUPS[group][0]);
      else switchTab(this.getAttribute('data-tab'));
    });
  });

  // Secondary (group member) navigation.
  document.querySelectorAll('.subtab-btn').forEach(function (btn) {
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
    } else if (tab === 'path') {
      itemCountEl.textContent = 'Lernpfad';
    } else if (tab === 'quiz') {
      itemCountEl.textContent = 'Quiz';
    } else if (tab === 'review') {
      itemCountEl.textContent = 'Wiederholen';
      if (window.SRSUI && window.SRSUI.getDueCount) {
        window.SRSUI.getDueCount().then(function (due) {
          if (app.activeTab === 'review') itemCountEl.textContent = due + ' f\u00e4llig';
        }).catch(function () {});
      }
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
  // Each theme defines its mode (drives the shared dark/light layer in CSS) plus
  // swatch colours used to render the live preview cards in the picker. The full
  // palette lives in styles.css under "MULTI-THEME SYSTEM".
  var THEMES = [
    { id: 'mitternacht', name: 'Mitternacht', jp: '真夜中', mode: 'dark',  bg: '#0d1524', card: '#152033', accent: '#275df4', grad: 'linear-gradient(135deg,#275df4,#7c3aed)' },
    { id: 'sora',        name: 'Sora',        jp: '空',     mode: 'dark',  bg: '#061a26', card: '#0c2836', accent: '#22b8d8', grad: 'linear-gradient(135deg,#22d3ee,#2563eb)' },
    { id: 'matcha',      name: 'Matcha',      jp: '抹茶',   mode: 'dark',  bg: '#0d1a12', card: '#16271c', accent: '#46b06a', grad: 'linear-gradient(135deg,#6ee7a8,#0f9d6b)' },
    { id: 'sakura',      name: 'Sakura',      jp: '桜',     mode: 'dark',  bg: '#1a1019', card: '#271826', accent: '#ec6f9e', grad: 'linear-gradient(135deg,#f9a8d4,#db2777)' },
    { id: 'momiji',      name: 'Momiji',      jp: '紅葉',   mode: 'dark',  bg: '#1a1109', card: '#281a0f', accent: '#f0883e', grad: 'linear-gradient(135deg,#fcd34d,#ea580c)' },
    { id: 'budo',        name: 'Budō',        jp: '葡萄',   mode: 'dark',  bg: '#140f20', card: '#1f1733', accent: '#a78bfa', grad: 'linear-gradient(135deg,#c4b5fd,#7c3aed)' },
    { id: 'sumi',        name: 'Sumi',        jp: '墨',     mode: 'dark',  bg: '#131416', card: '#1e2023', accent: '#b8bcc4', grad: 'linear-gradient(135deg,#d4d7dd,#7c8089)' },
    { id: 'shinkai',     name: 'Shinkai',     jp: '深海',   mode: 'dark',  bg: '#06181c', card: '#0c2a30', accent: '#2dd4bf', grad: 'linear-gradient(135deg,#5eead4,#0d9488)' },
    { id: 'kurenai',     name: 'Kurenai',     jp: '紅',     mode: 'dark',  bg: '#190b0d', card: '#271215', accent: '#f2415a', grad: 'linear-gradient(135deg,#fb7185,#be123c)' },
    { id: 'yamabuki',    name: 'Yamabuki',    jp: '山吹',   mode: 'dark',  bg: '#181405', card: '#26200c', accent: '#eab308', grad: 'linear-gradient(135deg,#fde047,#ca8a04)' },
    { id: 'ume',         name: 'Ume',         jp: '梅',     mode: 'dark',  bg: '#170b18', card: '#251128', accent: '#d946ef', grad: 'linear-gradient(135deg,#f0abfc,#a21caf)' },
    { id: 'yoru',        name: 'Yoru',        jp: '夜',     mode: 'dark',  bg: '#050505', card: '#121214', accent: '#38bdf8', grad: 'linear-gradient(135deg,#7dd3fc,#0284c7)' },
    { id: 'yuki',        name: 'Yuki',        jp: '雪',     mode: 'light', bg: '#f5f7fb', card: '#ffffff', accent: '#275df4', grad: 'linear-gradient(135deg,#275df4,#7c3aed)' },
    { id: 'washi',       name: 'Washi',       jp: '和紙',   mode: 'light', bg: '#f3ece0', card: '#fdf9f2', accent: '#bf5a2e', grad: 'linear-gradient(135deg,#e8a44c,#bf5a2e)' },
    { id: 'hinode',      name: 'Hinode',      jp: '日の出', mode: 'light', bg: '#fff3ee', card: '#fffdfc', accent: '#f43f5e', grad: 'linear-gradient(135deg,#fb923c,#ec4899)' },
    { id: 'wakaba',      name: 'Wakaba',      jp: '若葉',   mode: 'light', bg: '#eff7ee', card: '#ffffff', accent: '#16a34a', grad: 'linear-gradient(135deg,#4ade80,#15803d)' },
    { id: 'mizu',        name: 'Mizu',        jp: '水',     mode: 'light', bg: '#edf6fa', card: '#ffffff', accent: '#0891b2', grad: 'linear-gradient(135deg,#67e8f9,#0891b2)' },
    { id: 'fuji',        name: 'Fuji',        jp: '藤',     mode: 'light', bg: '#f3f1fb', card: '#ffffff', accent: '#7c5cdb', grad: 'linear-gradient(135deg,#c4b5fd,#7c3aed)' },
    { id: 'kinari',      name: 'Kinari',      jp: '生成り', mode: 'light', bg: '#f6f1e7', card: '#fffdf8', accent: '#a08a5e', grad: 'linear-gradient(135deg,#d4c08a,#8a7349)' },
    { id: 'momo',        name: 'Momo',        jp: '桃',     mode: 'light', bg: '#fdf0f4', card: '#fffcfd', accent: '#ec4899', grad: 'linear-gradient(135deg,#f9a8d4,#db2777)' }
  ];
  var DEFAULT_THEME = 'mitternacht';
  var THEME_KEY = 'nihongo-theme';

  function getTheme(id) {
    for (var i = 0; i < THEMES.length; i++) if (THEMES[i].id === id) return THEMES[i];
    return null;
  }

  function currentThemeId() {
    return document.documentElement.getAttribute('data-theme') || DEFAULT_THEME;
  }

  function applyTheme(id) {
    var theme = getTheme(id) || getTheme(DEFAULT_THEME);
    var root = document.documentElement;
    root.setAttribute('data-theme', theme.id);
    root.setAttribute('data-mode', theme.mode);
    localStorage.setItem(THEME_KEY, theme.id);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme.bg);
    setTimeout(updateKanaDarkMode, 50);
    markActiveThemeCard();
  }

  function initTheme() {
    var saved = localStorage.getItem(THEME_KEY);
    if (!saved) {
      // Migrate the old binary light/dark preference; default stays dark.
      var legacy = localStorage.getItem('kanji-theme');
      saved = legacy === 'light' ? 'yuki' : DEFAULT_THEME;
    }
    if (!getTheme(saved)) saved = DEFAULT_THEME;
    applyTheme(saved);
  }

  // === THEME PICKER ===
  var themeOverlay = document.getElementById('theme-overlay');
  var themeGrid = document.getElementById('theme-grid');

  function buildThemeGrid() {
    if (!themeGrid || themeGrid.childElementCount) return;
    THEMES.forEach(function (t) {
      var card = document.createElement('button');
      card.className = 'theme-card';
      card.type = 'button';
      card.setAttribute('data-theme-id', t.id);
      card.setAttribute('aria-label', t.name + ' (' + (t.mode === 'dark' ? 'Dunkel' : 'Hell') + ')');
      card.style.setProperty('--sw-bg', t.bg);
      card.style.setProperty('--sw-card', t.card);
      card.style.setProperty('--sw-accent', t.accent);
      card.style.setProperty('--sw-grad', t.grad);
      card.innerHTML =
        '<span class="theme-card-preview">' +
          '<span class="theme-card-chip"></span>' +
          '<span class="theme-card-dot"></span>' +
          '<span class="theme-card-grad"></span>' +
        '</span>' +
        '<span class="theme-card-meta">' +
          '<span class="theme-card-name">' + t.name + '</span>' +
          '<span class="theme-card-row2">' +
            '<span class="theme-card-jp">' + t.jp + '</span>' +
            '<span class="theme-card-mode">' + (t.mode === 'dark' ? 'Dunkel' : 'Hell') + '</span>' +
          '</span>' +
        '</span>';
      card.addEventListener('click', function () {
        playTick();
        applyTheme(t.id);
      });
      themeGrid.appendChild(card);
    });
  }

  function markActiveThemeCard() {
    if (!themeGrid) return;
    var active = currentThemeId();
    var cards = themeGrid.querySelectorAll('.theme-card');
    cards.forEach(function (c) {
      c.classList.toggle('active', c.getAttribute('data-theme-id') === active);
    });
  }

  function openThemePicker() {
    if (!themeOverlay) return;
    buildThemeGrid();
    markActiveThemeCard();
    themeOverlay.classList.remove('hidden');
  }

  function closeThemePicker() {
    if (themeOverlay) themeOverlay.classList.add('hidden');
  }

  themeToggle.addEventListener('click', function () {
    playTick();
    openThemePicker();
  });

  if (themeOverlay) {
    themeOverlay.addEventListener('click', function (e) {
      if (e.target === themeOverlay) closeThemePicker();
    });
    var themeCloseBtn = document.getElementById('theme-close');
    if (themeCloseBtn) themeCloseBtn.addEventListener('click', closeThemePicker);
  }

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

    if (themeOverlay && !themeOverlay.classList.contains('hidden')) {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeThemePicker();
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

    // Tab switching: 1-9
    var tabKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    var tabNames = ['kana', 'radicals', 'kanji', 'vocab', 'onomatopoeia', 'grammar', 'counters', 'quiz', 'review'];
    var keyIdx = tabKeys.indexOf(e.key);
    if (keyIdx !== -1) {
      e.preventDefault();
      switchTab(tabNames[keyIdx]);
      return;
    }

    // Lernpfad: p
    if (e.key === 'p') {
      e.preventDefault();
      switchTab('path');
      return;
    }

    // Statistik ist Teil des Lernpfads — 's' öffnet ihn.
    if (e.key === 's') {
      e.preventDefault();
      switchTab('path');
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
    var isDark = document.documentElement.getAttribute('data-mode') === 'dark';

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
    if (!('speechSynthesis' in window) || !text) return;

    var clean = text.replace(/[.\-]/g, '').trim();
    if (!clean) return;

    ensureJpSpeechInitialized();

    jpSpeechRequestId += 1;
    jpSpeechQueueId += 1; // a single utterance request supersedes any running sequence
    var requestId = jpSpeechRequestId;
    var synth = window.speechSynthesis;

    if (jpSpeechSpeakTimer) {
      clearTimeout(jpSpeechSpeakTimer);
      jpSpeechSpeakTimer = null;
    }

    try {
      synth.cancel();
    } catch (e) {}

    jpSpeechSpeakTimer = setTimeout(function () {
      if (requestId !== jpSpeechRequestId) return;

      var utterance = new SpeechSynthesisUtterance(clean);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.8;
      utterance.volume = 0.8;

      var selectedVoice = jpSpeechVoice || pickJapaneseVoice(synth.getVoices ? synth.getVoices() : []);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
        if (selectedVoice.lang) utterance.lang = selectedVoice.lang;
      }

      try {
        if (typeof synth.resume === 'function') synth.resume();
      } catch (e) {}

      try {
        synth.speak(utterance);
      } catch (e) {}
    }, 60);
  }

  // Stop any in-flight single utterance or sentence sequence and invalidate their ids.
  function cancelSpeech() {
    jpSpeechRequestId += 1;
    jpSpeechQueueId += 1;
    if (jpSpeechSpeakTimer) {
      clearTimeout(jpSpeechSpeakTimer);
      jpSpeechSpeakTimer = null;
    }
    if (!('speechSynthesis' in window)) return;
    try { window.speechSynthesis.cancel(); } catch (e) {}
  }

  // Speak an array of strings one after another, chaining via each utterance's
  // onend so the next sentence starts when the previous finishes. Callbacks:
  //   onStart()          -> before the first sentence
  //   onSentence(index)  -> when sentence `index` begins speaking
  //   onEnd()            -> after the last sentence (or if cancelled/aborted)
  // Powers the reading section's "whole text" and per-sentence playback.
  function speakJPSequence(texts, opts) {
    opts = opts || {};
    if (!('speechSynthesis' in window) || !texts || !texts.length) {
      if (opts.onEnd) opts.onEnd();
      return;
    }

    ensureJpSpeechInitialized();
    cancelSpeech();

    var synth = window.speechSynthesis;
    jpSpeechQueueId += 1;
    var queueId = jpSpeechQueueId;
    var list = texts.slice();
    var idx = 0;

    function speakNext() {
      if (queueId !== jpSpeechQueueId) return;
      if (idx >= list.length) {
        if (opts.onEnd) opts.onEnd();
        return;
      }
      var i = idx;
      var clean = String(list[i] || '').replace(/[.\-]/g, '').trim();
      if (!clean) { idx += 1; speakNext(); return; }

      var utterance = new SpeechSynthesisUtterance(clean);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.85;
      utterance.volume = 0.9;

      var voice = jpSpeechVoice || pickJapaneseVoice(synth.getVoices ? synth.getVoices() : []);
      if (voice) {
        utterance.voice = voice;
        if (voice.lang) utterance.lang = voice.lang;
      }

      utterance.onstart = function () {
        if (queueId === jpSpeechQueueId && opts.onSentence) opts.onSentence(i);
      };
      utterance.onend = function () {
        if (queueId !== jpSpeechQueueId) return;
        idx += 1;
        speakNext();
      };
      utterance.onerror = function () {
        if (queueId !== jpSpeechQueueId) return;
        idx += 1;
        speakNext();
      };

      try { if (typeof synth.resume === 'function') synth.resume(); } catch (e) {}
      try { synth.speak(utterance); } catch (e) {}
    }

    if (opts.onStart) opts.onStart();
    jpSpeechSpeakTimer = setTimeout(function () {
      jpSpeechSpeakTimer = null;
      speakNext();
    }, 80);
  }

  function pickJapaneseVoice(voices) {
    if (!voices || !voices.length) return null;
    var exactMatch = null;
    var genericMatch = null;
    for (var i = 0; i < voices.length; i++) {
      var voice = voices[i];
      if (!voice || !voice.lang) continue;
      var lang = String(voice.lang).toLowerCase();
      if (!exactMatch && lang === 'ja-jp') exactMatch = voice;
      if (!genericMatch && lang.indexOf('ja') === 0) genericMatch = voice;
    }
    return exactMatch || genericMatch || null;
  }

  function cacheJapaneseVoice() {
    if (!('speechSynthesis' in window) || typeof window.speechSynthesis.getVoices !== 'function') return;
    var voices = window.speechSynthesis.getVoices();
    var selected = pickJapaneseVoice(voices);
    if (selected) jpSpeechVoice = selected;
  }

  // Whether audio-fronted cards (Hören) may be offered: speech synthesis must
  // exist and, once the voice list has loaded, contain a Japanese voice. An empty
  // list means voices haven't loaded yet — assume yes rather than withhold the
  // variant on every first render.
  function canSpeakJP() {
    if (!('speechSynthesis' in window)) return false;
    ensureJpSpeechInitialized();
    if (jpSpeechVoice) return true;
    var voices = [];
    try { voices = window.speechSynthesis.getVoices() || []; } catch (e) {}
    if (!voices.length) return true;
    return !!pickJapaneseVoice(voices);
  }

  function ensureJpSpeechInitialized() {
    if (!('speechSynthesis' in window)) return;
    var synth = window.speechSynthesis;

    if (!jpSpeechInitStarted) {
      jpSpeechInitStarted = true;
      cacheJapaneseVoice();
      if ('onvoiceschanged' in synth) {
        synth.onvoiceschanged = cacheJapaneseVoice;
      }
    }

    try {
      if (typeof synth.resume === 'function') synth.resume();
    } catch (e) {}
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
    var isDark = document.documentElement.getAttribute('data-mode') === 'dark';
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
  if (window.SRSUI && window.SRSUI.updateReviewBadge) window.SRSUI.updateReviewBadge();

  // Default landing: always open the Lernpfad; brand-new users get a setup modal.
  switchTab('path');
  if (window.LearningPath && window.LearningPath.maybeShowOnboarding) {
    window.LearningPath.maybeShowOnboarding();
  }

  // Register the service worker for offline/installable PWA support. Guarded so it
  // is skipped on file:// (where SWs don't run) and where the API is unavailable.
  if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () {});
    });
  }
})();
