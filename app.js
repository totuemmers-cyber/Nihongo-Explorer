(function () {
  'use strict';

  // State
  let allKanji = [];
  let filteredKanji = [];
  let currentDetailIndex = -1;
  let activeLevel = 'all';
  let activeRadical = null;
  let currentSort = 'jlpt';
  let renderBatchSize = 80;
  let renderedCount = 0;
  let isRendering = false;

  // DOM Elements
  const grid = document.getElementById('kanji-grid');
  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('clear-search');
  const sortSelect = document.getElementById('sort-select');
  const kanjiCountEl = document.getElementById('kanji-count');
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
  const themeToggle = document.getElementById('theme-toggle');
  const randomBtn = document.getElementById('random-btn');

  // Load data
  async function loadData() {
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

  // Filtering & Sorting
  function applyFilters() {
    const query = searchInput.value.trim().toLowerCase();
    filteredKanji = allKanji.filter(function (k) {
      // Level filter
      if (activeLevel !== 'all' && k.jlpt !== activeLevel) return false;
      // Radical filter
      if (activeRadical) {
        const hasRadical = k.components && k.components.some(function (c) {
          return c.radical === activeRadical;
        });
        if (!hasRadical) return false;
      }
      // Search
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

  // Rendering with batching for performance
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

    // If there are more items, set up intersection observer for lazy loading
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
      openDetail(index);
    });
    return card;
  }

  function updateCount() {
    kanjiCountEl.textContent = filteredKanji.length + ' Kanji';
  }

  // Detail View
  function openDetail(index) {
    if (index < 0 || index >= filteredKanji.length) return;
    currentDetailIndex = index;
    var k = filteredKanji[index];

    detailKanji.textContent = k.kanji;
    detailJlpt.textContent = k.jlpt;
    detailJlpt.className = 'detail-jlpt-badge ' + k.jlpt;
    detailMeanings.textContent = k.meanings.join(', ');
    detailStrokes.textContent = k.strokes + ' Striche';

    // Kun readings
    if (k.kun && k.kun.length > 0) {
      detailKun.innerHTML = k.kun.map(function (r) {
        return '<div class="reading-item kun"><span class="kana">' + r.kana +
          '</span><span class="romaji">' + r.romaji + '</span></div>';
      }).join('');
    } else {
      detailKun.innerHTML = '<div class="no-reading">Keine Kun-Lesung</div>';
    }

    // On readings
    if (k.on && k.on.length > 0) {
      detailOn.innerHTML = k.on.map(function (r) {
        return '<div class="reading-item on"><span class="kana">' + r.kana +
          '</span><span class="romaji">' + r.romaji + '</span></div>';
      }).join('');
    } else {
      detailOn.innerHTML = '<div class="no-reading">Keine On-Lesung</div>';
    }

    // Components
    if (k.components && k.components.length > 0) {
      detailComponents.innerHTML = k.components.map(function (c) {
        return '<span class="component-tag" data-radical="' + c.radical + '">' +
          '<span class="comp-radical">' + c.radical + '</span>' +
          '<span class="comp-meaning">' + c.meaning + '</span></span>';
      }).join('');

      // Add click handlers for radical filtering
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

    // Examples
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

  // Radical filter
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

  // Theme
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

  // Debounce for search
  var searchTimeout;
  function onSearchInput() {
    clearTimeout(searchTimeout);
    clearSearchBtn.classList.toggle('visible', searchInput.value.length > 0);
    searchTimeout = setTimeout(function () {
      applyFilters();
    }, 200);
  }

  // Event Listeners
  searchInput.addEventListener('input', onSearchInput);

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

  // Level filters
  document.querySelectorAll('.filter-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filter-btn').forEach(function (b) {
        b.classList.remove('active');
      });
      this.classList.add('active');
      activeLevel = this.getAttribute('data-level');
      applyFilters();
    });
  });

  // Detail overlay
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

  // Theme
  themeToggle.addEventListener('click', toggleTheme);

  // Random
  randomBtn.addEventListener('click', function () {
    if (filteredKanji.length === 0) return;
    var idx = Math.floor(Math.random() * filteredKanji.length);
    openDetail(idx);
  });

  // Keyboard navigation
  document.addEventListener('keydown', function (e) {
    if (overlay.classList.contains('hidden')) {
      if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
      }
      return;
    }
    if (e.key === 'Escape') closeDetail();
    if (e.key === 'ArrowLeft') navigateDetail(-1);
    if (e.key === 'ArrowRight') navigateDetail(1);
  });

  // Init
  initTheme();
  loadData();
})();
