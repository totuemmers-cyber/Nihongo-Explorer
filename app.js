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
  let activeGrammarLevel = 'all';
  let grammarSort = 'category';

  // Vocab state
  let allVocab = [];
  let filteredVocab = [];
  let currentVocabDetailIndex = -1;
  let activeVocabLevel = 'all';
  let activeVocabType = 'all';
  let vocabSort = 'level';
  let vocabRenderedCount = 0;
  let vocabBatchSize = 100;
  let isVocabRendering = false;

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
  const vocabControls = document.getElementById('vocab-controls');
  const kanjiTab = document.getElementById('kanji-tab');
  const grammarTab = document.getElementById('grammar-tab');
  const vocabTab = document.getElementById('vocab-tab');
  const hiraganaTab = document.getElementById('hiragana-tab');
  const katakanaTab = document.getElementById('katakana-tab');

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

  // Vocab DOM
  const vocabGrid = document.getElementById('vocab-grid');
  const vocabSearchInput = document.getElementById('vocab-search-input');
  const vocabClearSearchBtn = document.getElementById('vocab-clear-search');
  const vocabSortSelect = document.getElementById('vocab-sort-select');
  const vocabNoResults = document.getElementById('vocab-no-results');
  const vocabOverlay = document.getElementById('vocab-detail-overlay');

  // === TAB SYSTEM ===
  function switchTab(tab) {
    activeTab = tab;
    playSwoosh();

    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tab);
    });

    // Toggle controls (kana tabs have no controls)
    kanjiControls.classList.toggle('hidden', tab !== 'kanji');
    grammarControls.classList.toggle('hidden', tab !== 'grammar');
    vocabControls.classList.toggle('hidden', tab !== 'vocab');

    // Toggle content
    kanjiTab.classList.toggle('hidden', tab !== 'kanji');
    grammarTab.classList.toggle('hidden', tab !== 'grammar');
    vocabTab.classList.toggle('hidden', tab !== 'vocab');
    hiraganaTab.classList.toggle('hidden', tab !== 'hiragana');
    katakanaTab.classList.toggle('hidden', tab !== 'katakana');

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

    // Vocab data - combine from multiple files
    var vocabSources = [
      window.VOCAB_N5 || [],
      window.VOCAB_N4 || [],
      window.VOCAB_N3 || []
    ];
    allVocab = [].concat.apply([], vocabSources);
    if (allVocab.length > 0) {
      applyVocabFilters();
    }

    updateCount();
  }

  // === COUNT UPDATE ===
  function updateCount() {
    if (activeTab === 'kanji') {
      itemCountEl.textContent = filteredKanji.length + ' Kanji';
    } else if (activeTab === 'grammar') {
      itemCountEl.textContent = filteredGrammar.length + ' Grammatik';
    } else if (activeTab === 'hiragana') {
      itemCountEl.textContent = 'Hiragana';
    } else if (activeTab === 'katakana') {
      itemCountEl.textContent = 'Katakana';
    } else {
      itemCountEl.textContent = filteredVocab.length + ' Vokabeln';
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
    var levelOrder = { 'N5': 0, 'N4': 1, 'N3': 2, 'N2': 3 };
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
      // Level filter
      if (activeGrammarLevel !== 'all' && g.level !== activeGrammarLevel) return false;
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
    var levelOrder = { 'N5': 0, 'N4': 1, 'N3': 2, 'N2': 3 };
    filteredGrammar.sort(function (a, b) {
      if (grammarSort === 'category') {
        var ca = catOrder[a.category] !== undefined ? catOrder[a.category] : 9;
        var cb = catOrder[b.category] !== undefined ? catOrder[b.category] : 9;
        if (ca !== cb) return ca - cb;
        return a.pattern.localeCompare(b.pattern, 'ja');
      }
      if (grammarSort === 'level') {
        var la = levelOrder[a.level] !== undefined ? levelOrder[a.level] : 9;
        var lb = levelOrder[b.level] !== undefined ? levelOrder[b.level] : 9;
        if (la !== lb) return la - lb;
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
        '<div class="grammar-card-badges">' +
          '<span class="card-level ' + g.level + '">' + g.level + '</span>' +
          '<span class="grammar-card-category ' + g.category + '">' + g.category + '</span>' +
        '</div>' +
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
    var levelBadge = document.getElementById('grammar-detail-level');
    levelBadge.textContent = g.level;
    levelBadge.className = 'detail-jlpt-badge ' + g.level;
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

  // ==========================================
  // === VOCAB SECTION ===
  // ==========================================

  function applyVocabFilters() {
    var query = vocabSearchInput.value.trim().toLowerCase();
    filteredVocab = allVocab.filter(function (v) {
      if (activeVocabLevel !== 'all' && v.level !== activeVocabLevel) return false;
      if (activeVocabType !== 'all' && v.type !== activeVocabType) return false;
      if (query) {
        var matchWord = v.word.indexOf(query) !== -1;
        var matchReading = v.reading && v.reading.indexOf(query) !== -1;
        var matchRomaji = v.romaji && v.romaji.toLowerCase().indexOf(query) !== -1;
        var matchMeaning = v.meaning.toLowerCase().indexOf(query) !== -1;
        var matchCategory = v.category && v.category.toLowerCase().indexOf(query) !== -1;
        if (!matchWord && !matchReading && !matchRomaji && !matchMeaning && !matchCategory) return false;
      }
      return true;
    });

    sortVocab();
    vocabRenderedCount = 0;
    vocabGrid.innerHTML = '';
    renderVocabBatch();
    updateCount();
  }

  function sortVocab() {
    var levelOrder = { 'N5': 0, 'N4': 1, 'N3': 2, 'N2': 3 };
    var typeOrder = { 'Nomen': 0, 'Verb': 1, 'Adjektiv': 2, 'Adverb': 3, 'Partikel': 4, 'Ausdruck': 5 };
    filteredVocab.sort(function (a, b) {
      if (vocabSort === 'level') {
        var la = levelOrder[a.level] !== undefined ? levelOrder[a.level] : 9;
        var lb = levelOrder[b.level] !== undefined ? levelOrder[b.level] : 9;
        if (la !== lb) return la - lb;
        return a.word.localeCompare(b.word, 'ja');
      }
      if (vocabSort === 'type') {
        var ta = typeOrder[a.type] !== undefined ? typeOrder[a.type] : 9;
        var tb = typeOrder[b.type] !== undefined ? typeOrder[b.type] : 9;
        if (ta !== tb) return ta - tb;
        return a.word.localeCompare(b.word, 'ja');
      }
      if (vocabSort === 'category') {
        var ca = (a.category || '').localeCompare(b.category || '', 'de');
        if (ca !== 0) return ca;
        return a.word.localeCompare(b.word, 'ja');
      }
      if (vocabSort === 'alpha') {
        return a.meaning.localeCompare(b.meaning, 'de');
      }
      return 0;
    });
  }

  var vocabScrollObserver = null;

  function renderVocabBatch() {
    if (isVocabRendering) return;
    isVocabRendering = true;

    var end = Math.min(vocabRenderedCount + vocabBatchSize, filteredVocab.length);
    var fragment = document.createDocumentFragment();

    for (var i = vocabRenderedCount; i < end; i++) {
      fragment.appendChild(createVocabCard(filteredVocab[i], i));
    }

    vocabGrid.appendChild(fragment);
    vocabRenderedCount = end;
    isVocabRendering = false;

    vocabNoResults.classList.toggle('hidden', filteredVocab.length > 0);

    if (vocabRenderedCount < filteredVocab.length) {
      setupVocabScrollObserver();
    }
  }

  function setupVocabScrollObserver() {
    if (vocabScrollObserver) vocabScrollObserver.disconnect();

    var sentinel = document.createElement('div');
    sentinel.className = 'scroll-sentinel';
    vocabGrid.appendChild(sentinel);

    vocabScrollObserver = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        vocabScrollObserver.disconnect();
        sentinel.remove();
        renderVocabBatch();
      }
    }, { rootMargin: '200px' });

    vocabScrollObserver.observe(sentinel);
  }

  function createVocabCard(v, index) {
    var card = document.createElement('div');
    card.className = 'vocab-card';
    card.setAttribute('data-index', index);

    card.innerHTML =
      '<div class="vocab-card-header">' +
        '<span class="vocab-card-word">' + v.word + '</span>' +
        '<div class="vocab-card-badges">' +
          '<span class="card-level ' + v.level + '">' + v.level + '</span>' +
          '<span class="vocab-type-badge ' + v.type + '">' + v.type + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="vocab-card-reading">' + (v.reading || '') + '</div>' +
      '<div class="vocab-card-meaning">' + v.meaning + '</div>';

    card.addEventListener('click', function () {
      playTick();
      openVocabDetail(index);
    });
    return card;
  }

  function openVocabDetail(index) {
    if (index < 0 || index >= filteredVocab.length) return;
    currentVocabDetailIndex = index;
    var v = filteredVocab[index];

    document.getElementById('vocab-detail-word').textContent = v.word;
    var levelBadge = document.getElementById('vocab-detail-level');
    levelBadge.textContent = v.level;
    levelBadge.className = 'detail-jlpt-badge ' + v.level;
    var typeBadge = document.getElementById('vocab-detail-type');
    typeBadge.textContent = v.type;
    typeBadge.className = 'vocab-type-badge ' + v.type;

    document.getElementById('vocab-detail-reading').textContent = v.reading || '';
    document.getElementById('vocab-detail-romaji').textContent = v.romaji || '';
    document.getElementById('vocab-detail-meaning').textContent = v.meaning;
    document.getElementById('vocab-detail-category-line').textContent =
      'Kategorie: ' + (v.category || '—');

    // Examples
    var examplesEl = document.getElementById('vocab-detail-examples');
    if (v.examples && v.examples.length > 0) {
      examplesEl.innerHTML = v.examples.map(function (ex) {
        return '<div class="grammar-example-item">' +
          '<div class="grammar-example-jp">' + ex.japanese + '</div>' +
          '<div class="grammar-example-romaji">' + ex.romaji + '</div>' +
          '<div class="grammar-example-german">' + ex.german + '</div>' +
        '</div>';
      }).join('');
    } else {
      examplesEl.innerHTML = '<div class="no-reading">Keine Beispiele</div>';
    }

    // Kanji links
    var kanjiSection = document.getElementById('vocab-detail-kanji-section');
    var kanjiLinksEl = document.getElementById('vocab-detail-kanji-links');
    var kanjiChars = [];
    for (var i = 0; i < v.word.length; i++) {
      var ch = v.word[i];
      // Check if character is a kanji (CJK Unified Ideographs range)
      if (ch.charCodeAt(0) >= 0x4E00 && ch.charCodeAt(0) <= 0x9FFF) {
        var found = allKanji.find(function (k) { return k.kanji === ch; });
        if (found) kanjiChars.push(found);
      }
    }

    if (kanjiChars.length > 0) {
      kanjiLinksEl.innerHTML = kanjiChars.map(function (k) {
        return '<span class="component-tag" data-kanji="' + k.kanji + '">' +
          '<span class="comp-radical">' + k.kanji + '</span>' +
          '<span class="comp-meaning">' + k.meanings[0] + '</span></span>';
      }).join('');

      kanjiLinksEl.querySelectorAll('.component-tag').forEach(function (tag) {
        tag.addEventListener('click', function () {
          var targetKanji = this.getAttribute('data-kanji');
          closeVocabDetail();
          switchTab('kanji');
          searchInput.value = targetKanji;
          clearSearchBtn.classList.add('visible');
          applyFilters();
          if (filteredKanji.length > 0) openDetail(0);
        });
      });

      kanjiSection.classList.remove('hidden');
    } else {
      kanjiSection.classList.add('hidden');
    }

    vocabOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    playPop();
  }

  function closeVocabDetail() {
    vocabOverlay.classList.add('hidden');
    document.body.style.overflow = '';
    currentVocabDetailIndex = -1;
  }

  function navigateVocabDetail(direction) {
    var newIndex = currentVocabDetailIndex + direction;
    if (newIndex >= 0 && newIndex < filteredVocab.length) {
      openVocabDetail(newIndex);
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
    if (typeof updateKanaDarkMode === 'function') {
      setTimeout(updateKanaDarkMode, 50);
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

  // Grammar level filters
  grammarControls.querySelectorAll('.grammar-level').forEach(function (btn) {
    btn.addEventListener('click', function () {
      grammarControls.querySelectorAll('.grammar-level').forEach(function (b) {
        b.classList.remove('active');
      });
      this.classList.add('active');
      activeGrammarLevel = this.getAttribute('data-glevel');
      playSwoosh();
      applyGrammarFilters();
    });
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

  // Vocab search
  var vocabSearchTimeout;
  vocabSearchInput.addEventListener('input', function () {
    clearTimeout(vocabSearchTimeout);
    vocabClearSearchBtn.classList.toggle('visible', vocabSearchInput.value.length > 0);
    vocabSearchTimeout = setTimeout(function () {
      applyVocabFilters();
    }, 200);
  });

  vocabClearSearchBtn.addEventListener('click', function () {
    vocabSearchInput.value = '';
    vocabClearSearchBtn.classList.remove('visible');
    applyVocabFilters();
    vocabSearchInput.focus();
  });

  vocabSortSelect.addEventListener('change', function () {
    vocabSort = this.value;
    applyVocabFilters();
  });

  // Vocab level filters
  vocabControls.querySelectorAll('.vocab-level').forEach(function (btn) {
    btn.addEventListener('click', function () {
      vocabControls.querySelectorAll('.vocab-level').forEach(function (b) {
        b.classList.remove('active');
      });
      this.classList.add('active');
      activeVocabLevel = this.getAttribute('data-vlevel');
      playSwoosh();
      applyVocabFilters();
    });
  });

  // Vocab type filters
  vocabControls.querySelectorAll('.vocab-type').forEach(function (btn) {
    btn.addEventListener('click', function () {
      vocabControls.querySelectorAll('.vocab-type').forEach(function (b) {
        b.classList.remove('active');
      });
      this.classList.add('active');
      activeVocabType = this.getAttribute('data-vtype');
      playSwoosh();
      applyVocabFilters();
    });
  });

  // Vocab detail overlay
  document.getElementById('vocab-close-detail').addEventListener('click', closeVocabDetail);
  vocabOverlay.addEventListener('click', function (e) {
    if (e.target === vocabOverlay) closeVocabDetail();
  });
  document.getElementById('prev-vocab').addEventListener('click', function () {
    navigateVocabDetail(-1);
  });
  document.getElementById('next-vocab').addEventListener('click', function () {
    navigateVocabDetail(1);
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
    } else if (activeTab === 'grammar') {
      if (filteredGrammar.length === 0) return;
      var gIdx = Math.floor(Math.random() * filteredGrammar.length);
      openGrammarDetail(gIdx);
    } else {
      if (filteredVocab.length === 0) return;
      var vIdx = Math.floor(Math.random() * filteredVocab.length);
      openVocabDetail(vIdx);
    }
  });

  // Keyboard navigation - context-aware
  document.addEventListener('keydown', function (e) {
    var kanjiOverlayOpen = !overlay.classList.contains('hidden');
    var grammarOverlayOpen = !grammarOverlay.classList.contains('hidden');
    var vocabOverlayOpen = !vocabOverlay.classList.contains('hidden');

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

    if (vocabOverlayOpen) {
      if (e.key === 'Escape') closeVocabDetail();
      if (e.key === 'ArrowLeft') navigateVocabDetail(-1);
      if (e.key === 'ArrowRight') navigateVocabDetail(1);
      return;
    }

    // No overlay open
    if (e.key === '/') {
      if (activeTab === 'hiragana' || activeTab === 'katakana') return;
      var activeInput = activeTab === 'kanji' ? searchInput :
        activeTab === 'grammar' ? grammarSearchInput : vocabSearchInput;
      if (document.activeElement !== activeInput) {
        e.preventDefault();
        activeInput.focus();
      }
    }
  });

  // ==========================================
  // === KANA SECTION (Hiragana & Katakana) ===
  // ==========================================

  function buildKanaTable(rows, type, colHeaders, isYoon) {
    var table = document.createElement('table');
    table.className = 'kana-table' + (isYoon ? ' yoon-table' : '');

    // Header
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

    // Body
    var tbody = document.createElement('tbody');
    var colors = window.KANA_DATA.rowColors;

    rows.forEach(function (rowData) {
      var tr = document.createElement('tr');
      var rowColor = colors[rowData.row] || colors['vowel'];

      // Row label
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
          var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
          inner.style.background = isDark ? rowColor.darkBg : rowColor.bg;
          inner.style.borderColor = isDark ? rowColor.darkBorder : rowColor.border;

          var charSpan = document.createElement('span');
          charSpan.className = 'kana-char';
          charSpan.textContent = type === 'hiragana' ? ch.h : ch.k;

          var romajiSpan = document.createElement('span');
          romajiSpan.className = 'kana-romaji';
          romajiSpan.textContent = ch.r;
          romajiSpan.style.color = rowColor.color;

          inner.appendChild(charSpan);
          inner.appendChild(romajiSpan);

          inner.addEventListener('click', function () {
            playTick();
            speakKana(type === 'hiragana' ? ch.h : ch.k);
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

  function speakKana(char) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      var utterance = new SpeechSynthesisUtterance(char);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.8;
      utterance.volume = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  }

  function createKanaSection(title, icon, rows, type, colHeaders, isYoon) {
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
    wrapper.appendChild(buildKanaTable(rows, type, colHeaders, isYoon));
    section.appendChild(wrapper);

    return section;
  }

  function renderKanaTab(type) {
    var container = document.getElementById(type + '-content');
    if (!container || container.children.length > 0) return;

    var data = window.KANA_DATA;
    if (!data) return;

    var vowelHeaders = ['a', 'i', 'u', 'e', 'o'];
    var yoonHeaders = ['ya', 'yu', 'yo'];

    var basisTitle = type === 'hiragana' ? 'Basis (Gojūon)' : 'Basis (Gojūon)';
    var basisIcon = type === 'hiragana' ? 'あ' : 'ア';
    container.appendChild(createKanaSection(basisTitle, basisIcon, data.gojuon, type, vowelHeaders, false));

    var dakutenTitle = 'Dakuten / Handakuten';
    var dakutenIcon = type === 'hiragana' ? 'が' : 'ガ';
    container.appendChild(createKanaSection(dakutenTitle, dakutenIcon, data.dakuten, type, vowelHeaders, false));

    var yoonTitle = 'Kombinationen (Yōon)';
    var yoonIcon = type === 'hiragana' ? 'きゃ' : 'キャ';
    container.appendChild(createKanaSection(yoonTitle, yoonIcon, data.yoon, type, yoonHeaders, true));
  }

  // Apply dark mode colors to kana cells
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

  // === INIT ===
  initTheme();
  loadData();

  // Render kana tabs (lazy - on first switch)
  var originalSwitchTab = switchTab;
  switchTab = function (tab) {
    originalSwitchTab(tab);
    if (tab === 'hiragana') {
      renderKanaTab('hiragana');
      updateKanaDarkMode();
    } else if (tab === 'katakana') {
      renderKanaTab('katakana');
      updateKanaDarkMode();
    }
  };
})();
