// === Section Config Objects ===
// Each config defines section-specific behavior for the generic Section class.

var SECTION_CONFIGS = {};

// === Shared Constants & Helpers ===

var LEVEL_ORDER = { 'N5': 0, 'N4': 1, 'N3': 2, 'N2': 3, 'N1': 4 };

// Lazy-built lookup indexes for O(1) access (built once on first use)
var _kanjiByChar = null;
var _radicalSet = null;
var _kanjiByRadical = null;

function getKanjiByChar() {
  if (!_kanjiByChar) {
    _kanjiByChar = {};
    var items = window.app && window.app.sections.kanji ? window.app.sections.kanji.allItems : [];
    for (var i = 0; i < items.length; i++) _kanjiByChar[items[i].kanji] = items[i];
  }
  return _kanjiByChar;
}

function getRadicalSet() {
  if (!_radicalSet) {
    _radicalSet = {};
    var items = window.app && window.app.sections.radicals ? window.app.sections.radicals.allItems : [];
    for (var i = 0; i < items.length; i++) _radicalSet[items[i].radical] = true;
  }
  return _radicalSet;
}

function getKanjiByRadical() {
  if (!_kanjiByRadical) {
    _kanjiByRadical = {};
    var items = window.app && window.app.sections.kanji ? window.app.sections.kanji.allItems : [];
    for (var i = 0; i < items.length; i++) {
      var k = items[i];
      if (k.components) {
        for (var j = 0; j < k.components.length; j++) {
          var rad = k.components[j].radical;
          if (!_kanjiByRadical[rad]) _kanjiByRadical[rad] = [];
          _kanjiByRadical[rad].push(k);
        }
      }
    }
  }
  return _kanjiByRadical;
}

function renderExamplesOrEmpty(elementId, examples) {
  var el = document.getElementById(elementId);
  if (examples && examples.length > 0) {
    el.innerHTML = examples.map(function (ex) {
      return '<div class="grammar-example-item">' +
        '<div class="grammar-example-jp">' + ex.japanese + '</div>' +
        '<div class="grammar-example-romaji">' + ex.romaji + '</div>' +
        '<div class="grammar-example-german">' + ex.german + '</div>' +
      '</div>';
    }).join('');
  } else {
    el.innerHTML = '<div class="no-reading">Keine Beispiele</div>';
  }
}

function toggleNotes(sectionId, notesId, text) {
  var sectionEl = document.getElementById(sectionId);
  var el = document.getElementById(notesId);
  if (text && text.length > 0) {
    el.textContent = text;
    sectionEl.classList.remove('hidden');
  } else {
    sectionEl.classList.add('hidden');
  }
}

function renderKanjiTags(kanjiItems) {
  return kanjiItems.map(function (k) {
    return '<span class="component-tag" data-kanji="' + k.kanji + '">' +
      '<span class="comp-radical">' + k.kanji + '</span>' +
      '<span class="comp-meaning">' + k.meanings[0] + '</span></span>';
  }).join('');
}

function navigateToKanji(targetKanji, currentSection) {
  currentSection.closeDetail();
  var kanjiSec = window.app.sections.kanji;
  window.app.switchTab('kanji');
  kanjiSec.dom.search.value = targetKanji;
  kanjiSec.dom.clearSearch.classList.add('visible');
  kanjiSec.applyFilters();
  for (var i = 0; i < kanjiSec.filteredItems.length; i++) {
    if (kanjiSec.filteredItems[i].kanji === targetKanji) {
      kanjiSec.openDetail(i);
      return;
    }
  }
}

function attachKanjiNavigation(container, section) {
  container.querySelectorAll('.component-tag').forEach(function (tag) {
    tag.addEventListener('click', function () {
      navigateToKanji(this.getAttribute('data-kanji'), section);
    });
  });
}

// ==========================================
// === KANJI CONFIG ===
// ==========================================
SECTION_CONFIGS.kanji = {
  name: 'kanji',
  dom: {
    controls: 'kanji-controls',
    grid: 'kanji-grid',
    search: 'search-input',
    clearSearch: 'clear-search',
    sort: 'sort-select',
    noResults: 'no-results',
    overlay: 'detail-overlay',
    closeBtn: 'close-detail',
    prevBtn: 'prev-kanji',
    nextBtn: 'next-kanji'
  },
  filterGroups: [
    {
      stateKey: 'level',
      selector: '.filter-btn[data-level]',
      dataAttr: 'data-level',
      defaultValue: 'all'
    }
  ],
  countLabel: ' Kanji',
  defaultSort: 'jlpt',
  batchSize: 80,

  filterFn: function (k, query, filters, section) {
    if (filters.level !== 'all' && k.jlpt !== filters.level) return false;
    if (window.app && window.app.activeRadical) {
      var hasRadical = k.components && k.components.some(function (c) {
        return c.radical === window.app.activeRadical;
      });
      if (!hasRadical) return false;
    }
    if (query) {
      var matchKanji = k.kanji === query;
      var matchMeaning = k.meanings.some(function (m) {
        return m.toLowerCase().indexOf(query) !== -1;
      });
      var matchKun = k.kun && k.kun.some(function (r) {
        return r.kana.indexOf(query) !== -1 || r.romaji.toLowerCase().indexOf(query) !== -1;
      });
      var matchOn = k.on && k.on.some(function (r) {
        return r.kana.indexOf(query) !== -1 || r.romaji.toLowerCase().indexOf(query) !== -1;
      });
      var matchExample = k.examples && k.examples.some(function (ex) {
        return ex.word.indexOf(query) !== -1 || ex.reading.indexOf(query) !== -1 ||
          ex.meaning.toLowerCase().indexOf(query) !== -1;
      });
      if (!matchKanji && !matchMeaning && !matchKun && !matchOn && !matchExample) return false;
    }
    return true;
  },

  sortFn: function (items, sortKey) {
    items.sort(function (a, b) {
      if (sortKey === 'jlpt') {
        var la = LEVEL_ORDER[a.jlpt] || 9;
        var lb = LEVEL_ORDER[b.jlpt] || 9;
        if (la !== lb) return la - lb;
        return a.strokes - b.strokes;
      }
      if (sortKey === 'strokes') {
        return a.strokes - b.strokes;
      }
      if (sortKey === 'alpha') {
        return a.meanings[0].toLowerCase().localeCompare(b.meanings[0].toLowerCase(), 'de');
      }
      return 0;
    });
  },

  createCard: function (k, index, section) {
    var card = document.createElement('div');
    card.className = 'kanji-card';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.innerHTML =
      '<span class="card-level ' + k.jlpt + '">' + k.jlpt + '</span>' +
      '<span class="card-kanji">' + k.kanji + '</span>' +
      '<span class="card-meaning">' + k.meanings[0] + '</span>';
    function activate() {
      if (window.app) window.app.playTick();
      section.openDetail(index);
    }
    card.addEventListener('click', activate);
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
    });
    return card;
  },

  openDetail: function (k, dom, section) {
    document.getElementById('detail-kanji').textContent = k.kanji;
    var jlptEl = document.getElementById('detail-jlpt');
    jlptEl.textContent = k.jlpt;
    jlptEl.className = 'detail-jlpt-badge ' + k.jlpt;

    document.getElementById('detail-meanings').textContent = k.meanings.join(', ');
    document.getElementById('detail-strokes').textContent = k.strokes + ' Striche';

    // Speak button SVG (reused for readings)
    var speakSvg = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>';

    function buildReadingItems(container, readings, cls) {
      container.innerHTML = readings.map(function (r) {
        return '<div class="reading-item ' + cls + '">' +
          '<div class="reading-text"><span class="kana">' + r.kana +
          '</span><span class="romaji">' + r.romaji + '</span></div>' +
          '<button class="btn btn-icon btn-speak btn-speak-sm" title="Aussprache" data-kana="' + r.kana + '">' + speakSvg + '</button></div>';
      }).join('');
      container.querySelectorAll('.btn-speak').forEach(function (btn) {
        btn.addEventListener('click', function () {
          if (window.app) window.app.speakJP(this.getAttribute('data-kana'));
        });
      });
    }

    // Kun readings
    var detailKun = document.getElementById('detail-kun');
    if (k.kun && k.kun.length > 0) {
      buildReadingItems(detailKun, k.kun, 'kun');
    } else {
      detailKun.innerHTML = '<div class="no-reading">Keine Kun-Lesung</div>';
    }

    // On readings
    var detailOn = document.getElementById('detail-on');
    if (k.on && k.on.length > 0) {
      buildReadingItems(detailOn, k.on, 'on');
    } else {
      detailOn.innerHTML = '<div class="no-reading">Keine On-Lesung</div>';
    }

    // Components / Radicals
    var detailComponents = document.getElementById('detail-components');
    if (k.components && k.components.length > 0) {
      var radicals = getRadicalSet();
      detailComponents.innerHTML = k.components.map(function (c) {
        var isKangxi = radicals[c.radical];
        var cls = isKangxi ? 'component-tag radical-link' : 'component-tag';
        return '<span class="' + cls + '" data-radical="' + c.radical + '">' +
          '<span class="comp-radical">' + c.radical + '</span>' +
          '<span class="comp-meaning">' + c.meaning + '</span></span>';
      }).join('');

      detailComponents.querySelectorAll('.component-tag').forEach(function (tag) {
        tag.addEventListener('click', function () {
          var radical = this.getAttribute('data-radical');
          var isKangxi = radicals[radical];
          section.closeDetail();
          if (isKangxi) {
            if (window.app) window.app.openRadicalInTab(radical);
          } else {
            if (window.app) window.app.setRadicalFilter(radical,
              tag.querySelector('.comp-meaning').textContent);
          }
        });
      });
    } else {
      detailComponents.innerHTML = '<div class="no-reading">Keine Komponenten</div>';
    }

    // Examples
    var detailExamples = document.getElementById('detail-examples');
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

    // Stroke order — reset to collapsed, clear previous SVG
    var soHeader = document.getElementById('stroke-order-header');
    var soBody = document.getElementById('stroke-order-body');
    var soContainer = document.getElementById('stroke-order-container');
    var soIcon = soHeader.querySelector('.toggle-icon');
    soBody.classList.add('collapsed');
    soIcon.classList.add('collapsed');
    soContainer.innerHTML = '';

    var codepoint = k.kanji.codePointAt(0);

    // Remove old listener by replacing node
    var newHeader = soHeader.cloneNode(true);
    soHeader.parentNode.replaceChild(newHeader, soHeader);
    soIcon = newHeader.querySelector('.toggle-icon');

    newHeader.addEventListener('click', function () {
      if (window.app) window.app.playTick();
      soBody.classList.toggle('collapsed');
      soIcon.classList.toggle('collapsed');

      // Load SVG on first expand via <object> (works with file:// protocol)
      if (!soBody.classList.contains('collapsed') && soContainer.children.length === 0) {
        var obj = document.createElement('object');
        obj.data = 'stroke-order/' + codepoint + '.svg';
        obj.type = 'image/svg+xml';
        obj.className = 'stroke-order-svg';
        soContainer.appendChild(obj);
      }
    });
  }
};

// ==========================================
// === GRAMMAR CONFIG ===
// ==========================================
SECTION_CONFIGS.grammar = {
  name: 'grammar',
  dom: {
    controls: 'grammar-controls',
    grid: 'grammar-grid',
    search: 'grammar-search-input',
    clearSearch: 'grammar-clear-search',
    sort: 'grammar-sort-select',
    noResults: 'grammar-no-results',
    overlay: 'grammar-detail-overlay',
    closeBtn: 'grammar-close-detail',
    prevBtn: 'prev-grammar',
    nextBtn: 'next-grammar'
  },
  filterGroups: [
    {
      stateKey: 'level',
      selector: '.grammar-level',
      dataAttr: 'data-glevel',
      defaultValue: 'all'
    },
    {
      stateKey: 'category',
      selector: '.grammar-cat',
      dataAttr: 'data-category',
      defaultValue: 'all'
    }
  ],
  countLabel: ' Grammatik',
  defaultSort: 'category',
  batchSize: 0,

  filterFn: function (g, query, filters) {
    if (filters.level !== 'all' && g.level !== filters.level) return false;
    if (filters.category !== 'all' && g.category !== filters.category) return false;
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
  },

  sortFn: function (items, sortKey) {
    var catOrder = { 'Partikel': 0, 'Verben': 1, 'Adjektive': 2, 'Satzstrukturen': 3 };
    items.sort(function (a, b) {
      if (sortKey === 'category') {
        var ca = catOrder[a.category] !== undefined ? catOrder[a.category] : 9;
        var cb = catOrder[b.category] !== undefined ? catOrder[b.category] : 9;
        if (ca !== cb) return ca - cb;
        return a.pattern.localeCompare(b.pattern, 'ja');
      }
      if (sortKey === 'level') {
        var la = LEVEL_ORDER[a.level] !== undefined ? LEVEL_ORDER[a.level] : 9;
        var lb = LEVEL_ORDER[b.level] !== undefined ? LEVEL_ORDER[b.level] : 9;
        if (la !== lb) return la - lb;
        return a.pattern.localeCompare(b.pattern, 'ja');
      }
      if (sortKey === 'alpha') {
        return a.pattern.localeCompare(b.pattern, 'ja');
      }
      return 0;
    });
  },

  createCard: function (g, index, section) {
    var card = document.createElement('div');
    card.className = 'grammar-card';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');

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

    function activate() {
      if (window.app) window.app.playTick();
      section.openDetail(index);
    }
    card.addEventListener('click', activate);
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
    });
    return card;
  },

  openDetail: function (g, dom, section) {
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

    renderExamplesOrEmpty('grammar-detail-examples', g.examples);
    toggleNotes('grammar-detail-notes-section', 'grammar-detail-notes', g.notes);

    // Related grammar
    var relatedSection = document.getElementById('grammar-detail-related-section');
    var relatedEl = document.getElementById('grammar-detail-related');
    if (g.related && g.related.length > 0) {
      relatedEl.innerHTML = g.related.map(function (relId) {
        var relGrammar = section.allItems.find(function (item) { return item.id === relId; });
        if (!relGrammar) return '';
        return '<span class="grammar-related-tag" data-id="' + relId + '">' + relGrammar.pattern + '</span>';
      }).filter(function (s) { return s.length > 0; }).join('');

      relatedEl.querySelectorAll('.grammar-related-tag').forEach(function (tag) {
        tag.addEventListener('click', function () {
          var targetId = this.getAttribute('data-id');
          var targetIndex = section.filteredItems.findIndex(function (item) { return item.id === targetId; });
          if (targetIndex !== -1) {
            section.openDetail(targetIndex);
          } else {
            // Item might be filtered out — reset filters and find it
            if (section.allItems.some(function (item) { return item.id === targetId; })) {
              section.resetFilterGroup('category');
              section.dom.search.value = '';
              section.applyFilters();
              var newIndex = section.filteredItems.findIndex(function (item) { return item.id === targetId; });
              if (newIndex !== -1) section.openDetail(newIndex);
            }
          }
        });
      });

      relatedSection.classList.remove('hidden');
    } else {
      relatedSection.classList.add('hidden');
    }
  }
};

// ==========================================
// === VOCAB CONFIG ===
// ==========================================
SECTION_CONFIGS.vocab = {
  name: 'vocab',
  dom: {
    controls: 'vocab-controls',
    grid: 'vocab-grid',
    search: 'vocab-search-input',
    clearSearch: 'vocab-clear-search',
    sort: 'vocab-sort-select',
    noResults: 'vocab-no-results',
    overlay: 'vocab-detail-overlay',
    closeBtn: 'vocab-close-detail',
    prevBtn: 'prev-vocab',
    nextBtn: 'next-vocab'
  },
  filterGroups: [
    {
      stateKey: 'level',
      selector: '.vocab-level',
      dataAttr: 'data-vlevel',
      defaultValue: 'all'
    },
    {
      stateKey: 'type',
      selector: '.vocab-type',
      dataAttr: 'data-vtype',
      defaultValue: 'all'
    }
  ],
  countLabel: ' Vokabeln',
  defaultSort: 'level',
  batchSize: 100,

  filterFn: function (v, query, filters) {
    if (filters.level !== 'all' && v.level !== filters.level) return false;
    if (filters.type !== 'all' && v.type !== filters.type) return false;
    if (query) {
      var matchWord = v.word.indexOf(query) !== -1;
      var matchReading = v.reading && v.reading.indexOf(query) !== -1;
      var matchRomaji = v.romaji && v.romaji.toLowerCase().indexOf(query) !== -1;
      var matchMeaning = v.meaning.toLowerCase().indexOf(query) !== -1;
      var matchCategory = v.category && v.category.toLowerCase().indexOf(query) !== -1;
      if (!matchWord && !matchReading && !matchRomaji && !matchMeaning && !matchCategory) return false;
    }
    return true;
  },

  sortFn: function (items, sortKey) {
    var typeOrder = { 'Nomen': 0, 'Verb': 1, 'Adjektiv': 2, 'Adverb': 3, 'Partikel': 4, 'Ausdruck': 5 };
    items.sort(function (a, b) {
      if (sortKey === 'level') {
        var la = LEVEL_ORDER[a.level] !== undefined ? LEVEL_ORDER[a.level] : 9;
        var lb = LEVEL_ORDER[b.level] !== undefined ? LEVEL_ORDER[b.level] : 9;
        if (la !== lb) return la - lb;
        return a.word.localeCompare(b.word, 'ja');
      }
      if (sortKey === 'type') {
        var ta = typeOrder[a.type] !== undefined ? typeOrder[a.type] : 9;
        var tb = typeOrder[b.type] !== undefined ? typeOrder[b.type] : 9;
        if (ta !== tb) return ta - tb;
        return a.word.localeCompare(b.word, 'ja');
      }
      if (sortKey === 'category') {
        var ca = (a.category || '').localeCompare(b.category || '', 'de');
        if (ca !== 0) return ca;
        return a.word.localeCompare(b.word, 'ja');
      }
      if (sortKey === 'alpha') {
        return a.meaning.localeCompare(b.meaning, 'de');
      }
      return 0;
    });
  },

  createCard: function (v, index, section) {
    var card = document.createElement('div');
    card.className = 'vocab-card';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');

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

    function activate() {
      if (window.app) window.app.playTick();
      section.openDetail(index);
    }
    card.addEventListener('click', activate);
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
    });
    return card;
  },

  openDetail: function (v, dom, section) {
    document.getElementById('vocab-detail-word').textContent = v.word;
    var levelBadge = document.getElementById('vocab-detail-level');
    levelBadge.textContent = v.level;
    levelBadge.className = 'detail-jlpt-badge ' + v.level;
    var typeBadge = document.getElementById('vocab-detail-type');
    typeBadge.textContent = v.type;
    typeBadge.className = 'vocab-type-badge ' + v.type;

    // Speak button
    var header = document.querySelector('.vocab-detail-header');
    var oldBtn = header.querySelector('.btn-speak');
    if (oldBtn) oldBtn.remove();
    var speakBtn = document.createElement('button');
    speakBtn.className = 'btn btn-icon btn-speak';
    speakBtn.title = 'Aussprache';
    speakBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>';
    speakBtn.addEventListener('click', function () {
      if (window.app) window.app.speakJP(v.word);
    });
    header.appendChild(speakBtn);

    document.getElementById('vocab-detail-reading').textContent = v.reading || '';
    document.getElementById('vocab-detail-romaji').textContent = v.romaji || '';
    document.getElementById('vocab-detail-meaning').textContent = v.meaning;
    document.getElementById('vocab-detail-category-line').textContent =
      'Kategorie: ' + (v.category || '\u2014');

    renderExamplesOrEmpty('vocab-detail-examples', v.examples);

    // Kanji links (O(1) lookup via index)
    var kanjiSection = document.getElementById('vocab-detail-kanji-section');
    var kanjiLinksEl = document.getElementById('vocab-detail-kanji-links');
    var kanjiChars = [];
    var kanjiIndex = getKanjiByChar();

    for (var i = 0; i < v.word.length; i++) {
      var ch = v.word[i];
      if (ch.charCodeAt(0) >= 0x4E00 && ch.charCodeAt(0) <= 0x9FFF) {
        var found = kanjiIndex[ch];
        if (found) kanjiChars.push(found);
      }
    }

    if (kanjiChars.length > 0) {
      kanjiLinksEl.innerHTML = renderKanjiTags(kanjiChars);
      attachKanjiNavigation(kanjiLinksEl, section);
      kanjiSection.classList.remove('hidden');
    } else {
      kanjiSection.classList.add('hidden');
    }
  }
};

// ==========================================
// === COUNTERS CONFIG ===
// ==========================================
SECTION_CONFIGS.counters = {
  name: 'counters',
  dom: {
    controls: 'counters-controls',
    grid: 'counters-grid',
    search: 'counters-search-input',
    clearSearch: 'counters-clear-search',
    noResults: 'counters-no-results',
    overlay: 'counter-detail-overlay',
    closeBtn: 'counter-close-detail',
    prevBtn: 'prev-counter',
    nextBtn: 'next-counter'
  },
  filterGroups: [
    {
      stateKey: 'category',
      selector: '.counter-cat',
      dataAttr: 'data-ccat',
      defaultValue: 'all'
    }
  ],
  countLabel: ' Z\u00e4hlw\u00f6rter',
  defaultSort: null,
  batchSize: 0,

  onTabActivate: function (section) {
    if (!section.initialized) {
      if (window.app && typeof window.app.renderBasicNumbers === 'function') {
        window.app.renderBasicNumbers();
      }
      section.initialized = true;
    }
  },

  filterFn: function (c, query, filters) {
    if (filters.category !== 'all' && c.category !== filters.category) return false;
    if (query) {
      var matchKanji = c.kanji.indexOf(query) !== -1;
      var matchReading = c.reading.indexOf(query) !== -1;
      var matchRomaji = c.romaji.toLowerCase().indexOf(query) !== -1;
      var matchMeaning = c.meaning.toLowerCase().indexOf(query) !== -1;
      var matchUsage = c.usage.toLowerCase().indexOf(query) !== -1;
      var matchCounts = c.counts && c.counts.some(function (ct) {
        return ct.reading.indexOf(query) !== -1 || ct.romaji.toLowerCase().indexOf(query) !== -1 || ct.kanji.indexOf(query) !== -1;
      });
      if (!matchKanji && !matchReading && !matchRomaji && !matchMeaning && !matchUsage && !matchCounts) return false;
    }
    return true;
  },

  sortFn: null,

  createCard: function (c, index, section) {
    var card = document.createElement('div');
    card.className = 'counter-card';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');

    var previewHtml = '';
    if (c.counts) {
      var previews = c.counts.slice(0, 5).map(function (ct) {
        var cls = ct.shift ? 'counter-card-preview-item has-shift' : 'counter-card-preview-item';
        return '<span class="' + cls + '">' + ct.kanji + '</span>';
      });
      previewHtml = '<div class="counter-card-preview">' + previews.join('') + '</div>';
    }

    card.innerHTML =
      '<div class="counter-card-header">' +
        '<span class="counter-card-kanji">' + c.kanji + '</span>' +
        '<span class="counter-card-badge ' + c.category + '">' + c.category + '</span>' +
      '</div>' +
      '<div class="counter-card-reading">' + c.reading + ' (' + c.romaji + ')</div>' +
      '<div class="counter-card-meaning">' + c.meaning + '</div>' +
      previewHtml;

    function activate() {
      if (window.app) window.app.playTick();
      section.openDetail(index);
    }
    card.addEventListener('click', activate);
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
    });
    return card;
  },

  openDetail: function (c, dom, section) {
    document.getElementById('counter-detail-kanji').textContent = c.kanji;
    var catBadge = document.getElementById('counter-detail-cat');
    catBadge.textContent = c.category;
    catBadge.className = 'counter-category-badge ' + c.category;

    document.getElementById('counter-detail-reading').textContent = c.reading + ' (' + c.romaji + ')';
    document.getElementById('counter-detail-meaning').textContent = c.meaning;
    document.getElementById('counter-detail-usage').textContent = c.usage;

    // Question word
    var questionEl = document.getElementById('counter-detail-question');
    if (c.questionWord) {
      questionEl.innerHTML =
        '<span class="counter-question-kanji">' + c.questionWord.kanji + '</span>' +
        '<span class="counter-question-reading">' + c.questionWord.reading + '</span>' +
        '<span class="counter-question-romaji">' + c.questionWord.romaji + '</span>';
    } else {
      questionEl.innerHTML = '';
    }

    // Count table
    var tableEl = document.getElementById('counter-detail-table');
    if (c.counts && c.counts.length > 0) {
      var tableHtml = '<table class="counter-table">' +
        '<thead><tr><th>#</th><th>Kanji</th><th>Lesung</th><th>Romaji</th></tr></thead><tbody>';
      c.counts.forEach(function (ct) {
        var rowClass = ct.shift ? ' class="shift-row"' : '';
        var readingHtml = ct.shift
          ? '<span class="shift-highlight">' + ct.reading + '</span>'
          : ct.reading;
        tableHtml += '<tr' + rowClass + '>' +
          '<td class="ct-num">' + ct.num + '</td>' +
          '<td class="ct-kanji">' + ct.kanji + '</td>' +
          '<td class="ct-reading">' + readingHtml + '</td>' +
          '<td class="ct-romaji">' + ct.romaji + '</td>' +
        '</tr>';
      });
      tableHtml += '</tbody></table>';
      tableEl.innerHTML = tableHtml;
    } else {
      tableEl.innerHTML = '';
    }

    // Special counts
    var specialSection = document.getElementById('counter-detail-special-section');
    var specialEl = document.getElementById('counter-detail-special');
    if (c.specialCounts && c.specialCounts.length > 0) {
      specialEl.innerHTML = c.specialCounts.map(function (sc) {
        return '<div class="counter-special-item">' +
          '<span class="cs-kanji">' + sc.kanji + '</span>' +
          '<span class="cs-reading">' + sc.reading + '</span>' +
          '<span class="cs-romaji">' + sc.romaji + '</span>' +
          (sc.note ? '<span class="cs-note">' + sc.note + '</span>' : '') +
        '</div>';
      }).join('');
      specialSection.classList.remove('hidden');
    } else {
      specialSection.classList.add('hidden');
    }

    renderExamplesOrEmpty('counter-detail-examples', c.examples);
    toggleNotes('counter-detail-notes-section', 'counter-detail-notes', c.notes);
  }
};

// ==========================================
// === RADICALS CONFIG ===
// ==========================================
SECTION_CONFIGS.radicals = {
  name: 'radicals',
  dom: {
    controls: 'radicals-controls',
    grid: 'radicals-grid',
    search: 'radicals-search-input',
    clearSearch: 'radicals-clear-search',
    noResults: 'radicals-no-results',
    overlay: 'radical-detail-overlay',
    closeBtn: 'radical-close-detail',
    prevBtn: 'prev-radical',
    nextBtn: 'next-radical'
  },
  filterGroups: [
    {
      stateKey: 'strokes',
      selector: '.radical-stroke',
      dataAttr: 'data-rstrokes',
      defaultValue: 'all'
    }
  ],
  countLabel: ' Radikale',
  defaultSort: null,
  batchSize: 0,

  filterFn: function (r, query, filters) {
    if (filters.strokes !== 'all') {
      if (filters.strokes === '9') {
        if (r.strokes < 9) return false;
      } else {
        if (r.strokes !== parseInt(filters.strokes)) return false;
      }
    }
    if (query) {
      var matchRadical = r.radical.indexOf(query) !== -1;
      var matchMeaning = r.meaning.toLowerCase().indexOf(query) !== -1;
      var matchReading = r.reading.indexOf(query) !== -1;
      var matchRomaji = r.romaji.toLowerCase().indexOf(query) !== -1;
      var matchNumber = ('' + r.number) === query;
      var matchExplanation = r.explanation && r.explanation.toLowerCase().indexOf(query) !== -1;
      if (!matchRadical && !matchMeaning && !matchReading && !matchRomaji && !matchNumber && !matchExplanation) return false;
    }
    return true;
  },

  sortFn: null,

  createCard: function (r, index, section) {
    var card = document.createElement('div');
    card.className = 'radical-card';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');

    card.innerHTML =
      '<span class="radical-card-number">#' + r.number + '</span>' +
      '<span class="radical-card-strokes">' + r.strokes + '\u753B</span>' +
      '<span class="radical-card-char">' + r.radical + '</span>' +
      '<span class="radical-card-meaning">' + r.meaning + '</span>' +
      '<span class="radical-card-reading">' + r.reading + '</span>';

    function activate() {
      if (window.app) window.app.playTick();
      section.openDetail(index);
    }
    card.addEventListener('click', activate);
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
    });
    return card;
  },

  openDetail: function (r, dom, section) {
    document.getElementById('radical-detail-char').textContent = r.radical;
    document.getElementById('radical-detail-number').textContent = '#' + r.number + ' von 214';
    document.getElementById('radical-detail-meaning').textContent = r.meaning;
    document.getElementById('radical-detail-reading').innerHTML =
      r.reading + '<span class="romaji"> (' + r.romaji + ')</span>';
    document.getElementById('radical-detail-strokes').textContent = r.strokes + ' Striche';

    // Explanation
    var explanationEl = document.getElementById('radical-detail-explanation');
    if (r.explanation) {
      explanationEl.textContent = r.explanation;
      explanationEl.style.display = '';
    } else {
      explanationEl.style.display = 'none';
    }

    // Find kanji that use this radical (O(1) lookup via index)
    var kanjiList = document.getElementById('radical-detail-kanji-list');
    var matchingKanji = getKanjiByRadical()[r.radical] || [];

    if (matchingKanji.length > 0) {
      kanjiList.innerHTML = renderKanjiTags(matchingKanji);
      attachKanjiNavigation(kanjiList, section);
    } else {
      kanjiList.innerHTML = '<span style="color:var(--text-secondary);font-size:0.9rem;">Keine Kanji mit diesem Radikal in der Datenbank gefunden.</span>';
    }
  }
};
