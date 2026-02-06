(function () {
  'use strict';

  // === STATE ===
  let activeTab = 'kanji';

  // Kanji state
  let allKanji = [];
  let filteredKanji = [];
  let currentDetailIndex = -1;
  let activeLevel = 'all';
  let activeRadical = null;
  let currentSort = 'jlpt';
  let renderBatchSize = 80;
  let renderedCount = 0;
  let isRendering = false;

  // Grammar state
  let allGrammar = [];
  let filteredGrammar = [];
  let currentGrammarDetailIndex = -1;
  let activeCategory = 'all';
  let grammarSort = 'category';

  let soundEnabled = localStorage.getItem('kanji-sound') !== 'off';

  // === WEB AUDIO API - Sound Engine ===
  var audioCtx = null;
  function getAudioCtx() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
  }

  function playTick() {
    if (!soundEnabled) return;
    try {
      var ctx = getAudioCtx();
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.06);
    } catch (e) {}
  }

  function playPop() {
    if (!soundEnabled) return;
    try {
      var ctx = getAudioCtx();
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);
      osc.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {}
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

  // === DOM ELEMENTS ===
  // Shared
  const itemCountEl = document.getElementById('item-count');
  const themeToggle = document.getElementById('theme-toggle');
  const randomBtn = document.getElementById('random-btn');
  const soundToggle = document.getElementById('sound-toggle');

  // Tab elements
  const kanjiControls = document.getElementById('kanji-controls');
  const grammarControls = document.getElementById('grammar-controls');
  const kanjiTab = document.getElementById('kanji-tab');
  const grammarTab = document.getElementById('grammar-tab');

  // Kanji DOM
  const grid = document.getElementById('kanji-grid');
  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('clear-search');
  const sortSelect = document.getElementById('sort-select');
  const noResults = document.getElementById('no-results');
  const loadingEl = document.getElementById('loading');
  const overlay = document.getElementById('detail-overlay');
  const detailKanji = document.getElementById('detail-kanji');
  const detailJlpt = document.getElementById('detail-jlpt');
  const detailMeanings = document.getElementById('detail-meanings');
  const detailStrokes = document.getElementById('detail-strokes');
  const detailKun = document.getElementById('detail-kun');
  const detailOn = document.getElementById('detail-on');
  const detailComponents = document.getElementById('detail-components');
  const detailExamples = document.getElementById('detail-examples');
  const radicalFilter = document.getElementById('radical-filter');
  const radicalFilterName = document.getElementById('radical-filter-name');

  // Grammar DOM
  const grammarGrid = document.getElementById('grammar-grid');
  const grammarSearchInput = document.getElementById('grammar-search-input');
  const grammarClearSearchBtn = document.getElementById('grammar-clear-search');
  const grammarSortSelect = document.getElementById('grammar-sort-select');
  const grammarNoResults = document.getElementById('grammar-no-results');
  const grammarOverlay = document.getElementById('grammar-detail-overlay');

  // === TAB SYSTEM ===
  function switchTab(tab) {
    activeTab = tab;
    playSwoosh();

    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tab);
    });

    // Toggle controls
    kanjiControls.classList.toggle('hidden', tab !== 'kanji');
    grammarControls.classList.toggle('hidden', tab !== 'grammar');

    // Toggle content
    kanjiTab.classList.toggle('hidden', tab !== 'kanji');
    grammarTab.classList.toggle('hidden', tab !== 'grammar');

    // Update count badge
    updateCount();
  }

  document.querySelectorAll('.tab-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      switchTab(this.getAttribute('data-tab'));
    });
  });

  // === LOAD DATA ===
  async function loadData() {
    // Kanji data
    if (window.KANJI_DATA) {
      allKanji = window.KANJI_DATA;
      loadingEl.classList.add('hidden');
      applyFilters();
    } else {
      try {
        const resp = await fetch('kanji-data.json');
        if (!resp.ok) throw new Error('Failed to load');
        allKanji = await resp.json();
        loadingEl.classList.add('hidden');
        applyFilters();
      } catch (e) {
        loadingEl.textContent = 'Fehler beim Laden der Kanji-Daten.';
        console.error(e);
      }
    }

    // Grammar data
    if (window.GRAMMAR_DATA) {
      allGrammar = window.GRAMMAR_DATA;
      applyGrammarFilters();
    }

    updateCount();
  }

  // === COUNT UPDATE ===
  function updateCount() {
    if (activeTab === 'kanji') {
      itemCountEl.textContent = filteredKanji.length + ' Kanji';
    } else {
      itemCountEl.textContent = filteredGrammar.length + ' Grammatik';
    }
  }

  // ==========================================
  // === KANJI SECTION (existing, preserved) ===
  // ==========================================

  function applyFilters() {
    const query = searchInput.value.trim().toLowerCase();
    filteredKanji = allKanji.filter(function (k) {
      if (activeLevel !== 'all' && k.jlpt !== activeLevel) return false;
      if (activeRadical) {
        const hasRadical = k.components && k.components.some(function (c) {
          return c.radical === activeRadical;
        });
        if (!hasRadical) return false;
      }
      if (query) {
        const matchKanji = k.kanji === query;
        const matchMeaning = k.meanings.some(function (m) {
          return m.toLowerCase().indexOf(query) !== -1;
        });
        const matchKun = k.kun && k.kun.some(function (r) {
          return r.kana.indexOf(query) !== -1 || r.romaji.toLowerCase().indexOf(query) !== -1;
        });
        const matchOn = k.on && k.on.some(function (r) {
          return r.kana.indexOf(query) !== -1 || r.romaji.toLowerCase().indexOf(query) !== -1;
        });
        const matchExample = k.examples && k.examples.some(function (ex) {
          return ex.word.indexOf(query) !== -1 || ex.reading.indexOf(query) !== -1 ||
            ex.meaning.toLowerCase().indexOf(query) !== -1;
        });
        if (!matchKanji && !matchMeaning && !matchKun && !matchOn && !matchExample) return false;
      }
      return true;
    });

    sortKanji();
    renderedCount = 0;
    grid.innerHTML = '';
    renderBatch();
    updateCount();
  }

  function sortKanji() {
    var levelOrder = { 'N5': 0, 'N4': 1, 'N3': 2 };
    filteredKanji.sort(function (a, b) {
      if (currentSort === 'jlpt') {
        var la = levelOrder[a.jlpt] || 9;
        var lb = levelOrder[b.jlpt] || 9;
        if (la !== lb) return la - lb;
        return a.strokes - b.strokes;
      }
      if (currentSort === 'strokes') {
        return a.strokes - b.strokes;
      }
      if (currentSort === 'alpha') {
        var ma = a.meanings[0].toLowerCase();
        var mb = b.meanings[0].toLowerCase();
        return ma.localeCompare(mb, 'de');
      }
      return 0;
    });
  }

  function renderBatch() {
    if (isRendering) return;
    isRendering = true;

    var end = Math.min(renderedCount + renderBatchSize, filteredKanji.length);
    var fragment = document.createDocumentFragment();

    for (var i = renderedCount; i < end; i++) {
      fragment.appendChild(createCard(filteredKanji[i], i));
    }

    grid.appendChild(fragment);
    renderedCount = end;
    isRendering = false;

    noResults.classList.toggle('hidden', filteredKanji.length > 0);

    if (renderedCount < filteredKanji.length) {
      setupScrollObserver();
    }
  }

  var scrollObserver = null;

  function setupScrollObserver() {
    if (scrollObserver) scrollObserver.disconnect();

    var sentinel = document.createElement('div');
    sentinel.className = 'scroll-sentinel';
    grid.appendChild(sentinel);

    scrollObserver = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        scrollObserver.disconnect();
        sentinel.remove();
        renderBatch();
      }
    }, { rootMargin: '200px' });

    scrollObserver.observe(sentinel);
  }

  function createCard(k, index) {
    var card = document.createElement('div');
    card.className = 'kanji-card';
    card.setAttribute('data-index', index);
    card.innerHTML =
      '<span class="card-level ' + k.jlpt + '">' + k.jlpt + '</span>' +
      '<span class="card-kanji">' + k.kanji + '</span>' +
      '<span class="card-meaning">' + k.meanings[0] + '</span>';
    card.addEventListener('click', function () {
      playTick();
      openDetail(index);
    });
    return card;
  }

  // Kanji Detail View
  function openDetail(index) {
    if (index < 0 || index >= filteredKanji.length) return;
    currentDetailIndex = index;
    var k = filteredKanji[index];

    detailKanji.textContent = k.kanji;
    detailJlpt.textContent = k.jlpt;
    detailJlpt.className = 'detail-jlpt-badge ' + k.jlpt;
    detailMeanings.textContent = k.meanings.join(', ');
    detailStrokes.textContent = k.strokes + ' Striche';

    if (k.kun && k.kun.length > 0) {
      detailKun.innerHTML = k.kun.map(function (r) {
        return '<div class="reading-item kun"><span class="kana">' + r.kana +
          '</span><span class="romaji">' + r.romaji + '</span></div>';
      }).join('');
    } else {
      detailKun.innerHTML = '<div class="no-reading">Keine Kun-Lesung</div>';
    }

    if (k.on && k.on.length > 0) {
      detailOn.innerHTML = k.on.map(function (r) {
        return '<div class="reading-item on"><span class="kana">' + r.kana +
          '</span><span class="romaji">' + r.romaji + '</span></div>';
      }).join('');
    } else {
      detailOn.innerHTML = '<div class="no-reading">Keine On-Lesung</div>';
    }

    if (k.components && k.components.length > 0) {
      detailComponents.innerHTML = k.components.map(function (c) {
        return '<span class="component-tag" data-radical="' + c.radical + '">' +
          '<span class="comp-radical">' + c.radical + '</span>' +
          '<span class="comp-meaning">' + c.meaning + '</span></span>';
      }).join('');

      detailComponents.querySelectorAll('.component-tag').forEach(function (tag) {
        tag.addEventListener('click', function () {
          var radical = this.getAttribute('data-radical');
          setRadicalFilter(radical, this.querySelector('.comp-meaning').textContent);
          closeDetail();
        });
      });
    } else {
      detailComponents.innerHTML = '<div class="no-reading">Keine Komponenten</div>';
    }

    if (k.examples && k.examples.length > 0) {
      detailExamples.innerHTML = k.examples.map(function (ex) {
        return '<div class="example-item">' +
          '<span class="example-word">' + ex.word + '</span> ' +
          '<span class="example-reading">' + ex.reading + '</span>' +
          '<div class="example-meaning">' + ex.meaning + '</div></div>';
      }).join('');
    } else {
      detailExamples.innerHTML = '<div class="no-reading">Keine Beispiele</div>';
    }

    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    playPop();
  }

  function closeDetail() {
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
    currentDetailIndex = -1;
  }

  function navigateDetail(direction) {
    var newIndex = currentDetailIndex + direction;
    if (newIndex >= 0 && newIndex < filteredKanji.length) {
      openDetail(newIndex);
    }
  }

  function setRadicalFilter(radical, meaning) {
    activeRadical = radical;
    radicalFilterName.textContent = radical + ' (' + meaning + ')';
    radicalFilter.classList.remove('hidden');
    applyFilters();
  }

  function clearRadicalFilter() {
    activeRadical = null;
    radicalFilter.classList.add('hidden');
    applyFilters();
  }

  // ==========================================
  // === GRAMMAR SECTION (new) ===
  // ==========================================

  function applyGrammarFilters() {
    var query = grammarSearchInput.value.trim().toLowerCase();
    filteredGrammar = allGrammar.filter(function (g) {
      // Category filter
      if (activeCategory !== 'all' && g.category !== activeCategory) return false;
      // Search
      if (query) {
        var matchPattern = g.pattern.toLowerCase().indexOf(query) !== -1;
        var matchMeaning = g.meaning.toLowerCase().indexOf(query) !== -1;
        var matchExplanation = g.explanation.toLowerCase().indexOf(query) !== -1;
        var matchFormation = g.formation.toLowerCase().indexOf(query) !== -1;
        var matchExample = g.examples && g.examples.some(function (ex) {
          return ex.japanese.toLowerCase().indexOf(query) !== -1 ||
            ex.german.toLowerCase().indexOf(query) !== -1 ||
            ex.romaji.toLowerCase().indexOf(query) !== -1;
        });
        if (!matchPattern && !matchMeaning && !matchExplanation && !matchFormation && !matchExample) return false;
      }
      return true;
    });

    sortGrammar();
    renderGrammar();
    updateCount();
  }

  function sortGrammar() {
    var catOrder = { 'Partikel': 0, 'Verben': 1, 'Adjektive': 2, 'Satzstrukturen': 3 };
    filteredGrammar.sort(function (a, b) {
      if (grammarSort === 'category') {
        var ca = catOrder[a.category] !== undefined ? catOrder[a.category] : 9;
        var cb = catOrder[b.category] !== undefined ? catOrder[b.category] : 9;
        if (ca !== cb) return ca - cb;
        return a.pattern.localeCompare(b.pattern, 'ja');
      }
      if (grammarSort === 'alpha') {
        return a.pattern.localeCompare(b.pattern, 'ja');
      }
      return 0;
    });
  }

  function renderGrammar() {
    grammarGrid.innerHTML = '';
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < filteredGrammar.length; i++) {
      fragment.appendChild(createGrammarCard(filteredGrammar[i], i));
    }

    grammarGrid.appendChild(fragment);
    grammarNoResults.classList.toggle('hidden', filteredGrammar.length > 0);
  }

  function createGrammarCard(g, index) {
    var card = document.createElement('div');
    card.className = 'grammar-card';
    card.setAttribute('data-index', index);

    var exampleText = '';
    if (g.examples && g.examples.length > 0) {
      exampleText = g.examples[0].japanese;
    }

    card.innerHTML =
      '<div class="grammar-card-header">' +
        '<span class="grammar-card-pattern">' + g.pattern + '</span>' +
        '<span class="grammar-card-category ' + g.category + '">' + g.category + '</span>' +
      '</div>' +
      '<div class="grammar-card-meaning">' + g.meaning + '</div>' +
      (exampleText ? '<div class="grammar-card-example">' + exampleText + '</div>' : '');

    card.addEventListener('click', function () {
      playTick();
      openGrammarDetail(index);
    });
    return card;
  }

  function openGrammarDetail(index) {
    if (index < 0 || index >= filteredGrammar.length) return;
    currentGrammarDetailIndex = index;
    var g = filteredGrammar[index];

    document.getElementById('grammar-detail-pattern').textContent = g.pattern;
    var catBadge = document.getElementById('grammar-detail-category');
    catBadge.textContent = g.category;
    catBadge.className = 'grammar-category-badge ' + g.category;
    document.getElementById('grammar-detail-meaning').textContent = g.meaning;
    document.getElementById('grammar-detail-formation').textContent = g.formation;
    document.getElementById('grammar-detail-explanation').textContent = g.explanation;

    // Examples
    var examplesEl = document.getElementById('grammar-detail-examples');
    if (g.examples && g.examples.length > 0) {
      examplesEl.innerHTML = g.examples.map(function (ex) {
        return '<div class="grammar-example-item">' +
          '<div class="grammar-example-jp">' + ex.japanese + '</div>' +
          '<div class="grammar-example-romaji">' + ex.romaji + '</div>' +
          '<div class="grammar-example-german">' + ex.german + '</div>' +
        '</div>';
      }).join('');
    } else {
      examplesEl.innerHTML = '<div class="no-reading">Keine Beispiele</div>';
    }

    // Notes
    var notesSection = document.getElementById('grammar-detail-notes-section');
    var notesEl = document.getElementById('grammar-detail-notes');
    if (g.notes && g.notes.length > 0) {
      notesEl.textContent = g.notes;
      notesSection.classList.remove('hidden');
    } else {
      notesSection.classList.add('hidden');
    }

    // Related grammar
    var relatedSection = document.getElementById('grammar-detail-related-section');
    var relatedEl = document.getElementById('grammar-detail-related');
    if (g.related && g.related.length > 0) {
      relatedEl.innerHTML = g.related.map(function (relId) {
        var relGrammar = allGrammar.find(function (item) { return item.id === relId; });
        if (!relGrammar) return '';
        return '<span class="grammar-related-tag" data-id="' + relId + '">' + relGrammar.pattern + '</span>';
      }).filter(function (s) { return s.length > 0; }).join('');

      // Add click handlers for related grammar links
      relatedEl.querySelectorAll('.grammar-related-tag').forEach(function (tag) {
        tag.addEventListener('click', function () {
          var targetId = this.getAttribute('data-id');
          var targetIndex = filteredGrammar.findIndex(function (item) { return item.id === targetId; });
          if (targetIndex !== -1) {
            openGrammarDetail(targetIndex);
          } else {
            // Item might be filtered out, search in allGrammar
            var allIndex = allGrammar.findIndex(function (item) { return item.id === targetId; });
            if (allIndex !== -1) {
              // Reset filters and find it
              activeCategory = 'all';
              grammarSearchInput.value = '';
              document.querySelectorAll('.grammar-cat').forEach(function (b) { b.classList.remove('active'); });
              document.querySelector('.grammar-cat[data-category="all"]').classList.add('active');
              applyGrammarFilters();
              var newIndex = filteredGrammar.findIndex(function (item) { return item.id === targetId; });
              if (newIndex !== -1) openGrammarDetail(newIndex);
            }
          }
        });
      });

      relatedSection.classList.remove('hidden');
    } else {
      relatedSection.classList.add('hidden');
    }

    grammarOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    playPop();
  }

  function closeGrammarDetail() {
    grammarOverlay.classList.add('hidden');
    document.body.style.overflow = '';
    currentGrammarDetailIndex = -1;
  }

  function navigateGrammarDetail(direction) {
    var newIndex = currentGrammarDetailIndex + direction;
    if (newIndex >= 0 && newIndex < filteredGrammar.length) {
      openGrammarDetail(newIndex);
    }
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
  }

  // === EVENT LISTENERS ===

  // Kanji search
  var searchTimeout;
  searchInput.addEventListener('input', function () {
    clearTimeout(searchTimeout);
    clearSearchBtn.classList.toggle('visible', searchInput.value.length > 0);
    searchTimeout = setTimeout(function () {
      applyFilters();
    }, 200);
  });

  clearSearchBtn.addEventListener('click', function () {
    searchInput.value = '';
    clearSearchBtn.classList.remove('visible');
    applyFilters();
    searchInput.focus();
  });

  sortSelect.addEventListener('change', function () {
    currentSort = this.value;
    applyFilters();
  });

  // Kanji level filters (only the ones inside kanji-controls)
  kanjiControls.querySelectorAll('.filter-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      kanjiControls.querySelectorAll('.filter-btn').forEach(function (b) {
        b.classList.remove('active');
      });
      this.classList.add('active');
      activeLevel = this.getAttribute('data-level');
      playSwoosh();
      applyFilters();
    });
  });

  // Kanji detail overlay
  document.getElementById('close-detail').addEventListener('click', closeDetail);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeDetail();
  });
  document.getElementById('prev-kanji').addEventListener('click', function () {
    navigateDetail(-1);
  });
  document.getElementById('next-kanji').addEventListener('click', function () {
    navigateDetail(1);
  });

  // Radical filter
  document.getElementById('clear-radical-filter').addEventListener('click', clearRadicalFilter);

  // Grammar search
  var grammarSearchTimeout;
  grammarSearchInput.addEventListener('input', function () {
    clearTimeout(grammarSearchTimeout);
    grammarClearSearchBtn.classList.toggle('visible', grammarSearchInput.value.length > 0);
    grammarSearchTimeout = setTimeout(function () {
      applyGrammarFilters();
    }, 200);
  });

  grammarClearSearchBtn.addEventListener('click', function () {
    grammarSearchInput.value = '';
    grammarClearSearchBtn.classList.remove('visible');
    applyGrammarFilters();
    grammarSearchInput.focus();
  });

  grammarSortSelect.addEventListener('change', function () {
    grammarSort = this.value;
    applyGrammarFilters();
  });

  // Grammar category filters
  grammarControls.querySelectorAll('.grammar-cat').forEach(function (btn) {
    btn.addEventListener('click', function () {
      grammarControls.querySelectorAll('.grammar-cat').forEach(function (b) {
        b.classList.remove('active');
      });
      this.classList.add('active');
      activeCategory = this.getAttribute('data-category');
      playSwoosh();
      applyGrammarFilters();
    });
  });

  // Grammar detail overlay
  document.getElementById('grammar-close-detail').addEventListener('click', closeGrammarDetail);
  grammarOverlay.addEventListener('click', function (e) {
    if (e.target === grammarOverlay) closeGrammarDetail();
  });
  document.getElementById('prev-grammar').addEventListener('click', function () {
    navigateGrammarDetail(-1);
  });
  document.getElementById('next-grammar').addEventListener('click', function () {
    navigateGrammarDetail(1);
  });

  // Theme
  themeToggle.addEventListener('click', function () {
    playTick();
    toggleTheme();
  });

  // Sound toggle
  if (soundToggle) {
    soundToggle.classList.toggle('active', soundEnabled);
    soundToggle.addEventListener('click', function () {
      soundEnabled = !soundEnabled;
      localStorage.setItem('kanji-sound', soundEnabled ? 'on' : 'off');
      soundToggle.classList.toggle('active', soundEnabled);
      if (soundEnabled) playPop();
    });
  }

  // Random - context-aware
  randomBtn.addEventListener('click', function () {
    playPop();
    if (activeTab === 'kanji') {
      if (filteredKanji.length === 0) return;
      var idx = Math.floor(Math.random() * filteredKanji.length);
      openDetail(idx);
    } else {
      if (filteredGrammar.length === 0) return;
      var gIdx = Math.floor(Math.random() * filteredGrammar.length);
      openGrammarDetail(gIdx);
    }
  });

  // Keyboard navigation - context-aware
  document.addEventListener('keydown', function (e) {
    var kanjiOverlayOpen = !overlay.classList.contains('hidden');
    var grammarOverlayOpen = !grammarOverlay.classList.contains('hidden');

    if (kanjiOverlayOpen) {
      if (e.key === 'Escape') closeDetail();
      if (e.key === 'ArrowLeft') navigateDetail(-1);
      if (e.key === 'ArrowRight') navigateDetail(1);
      return;
    }

    if (grammarOverlayOpen) {
      if (e.key === 'Escape') closeGrammarDetail();
      if (e.key === 'ArrowLeft') navigateGrammarDetail(-1);
      if (e.key === 'ArrowRight') navigateGrammarDetail(1);
      return;
    }

    // No overlay open
    if (e.key === '/') {
      var activeInput = activeTab === 'kanji' ? searchInput : grammarSearchInput;
      if (document.activeElement !== activeInput) {
        e.preventDefault();
        activeInput.focus();
      }
    }
  });

  // === INIT ===
  initTheme();
  loadData();
})();
