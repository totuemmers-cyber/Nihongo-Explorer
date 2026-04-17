// === Section Config Objects ===
// Each config defines section-specific behavior for the generic Section class.

var SECTION_CONFIGS = {};

// === Shared Constants & Helpers ===

var LEVEL_ORDER = { 'N5': 0, 'N4': 1, 'N3': 2, 'N2': 3, 'N1': 4 };

// Lazy-built lookup indexes for O(1) access (built once on first use)
var _kanjiByChar = null;
var _radicalSet = null;
var _kanjiByRadical = null;

function getAppConstants() {
  return window.NIHONGO_CONSTANTS || {
    VOCAB_TYPES: ['Nomen', 'Verb', 'Adjektiv', 'Adverb', 'Ausdruck', 'Partikel', 'Yojijukugo', 'Redewendung', 'Sprichwort'],
    COUNTER_CATEGORIES: ['Menschen', 'Objekte', 'Tiere', 'Zeit', 'Essen & Trinken', 'Gebäude & Räume', 'Transport', 'Sprache & Schrift', 'Gruppen & Mengen', 'Ereignisse', 'Natur', 'Medizin'],
    CANONICAL_RADICAL_COUNT: 214
  };
}

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
      var primary = window.getPrimaryKanjiRadical ? window.getPrimaryKanjiRadical(k) : null;
      if (!primary) continue;
      if (!_kanjiByRadical[primary.radical]) _kanjiByRadical[primary.radical] = [];
      _kanjiByRadical[primary.radical].push(k);
    }
  }
  return _kanjiByRadical;
}

window.resetSectionLookups = function () {
  _kanjiByChar = null;
  _radicalSet = null;
  _kanjiByRadical = null;
};

// === Bookmark Utilities ===

function getBookmarks(sectionName) {
  try { return JSON.parse(localStorage.getItem('bookmarks-' + sectionName) || '[]'); }
  catch (e) { return []; }
}

function isBookmarked(sectionName, itemId) {
  return getBookmarks(sectionName).indexOf(itemId) !== -1;
}

function toggleBookmark(sectionName, itemId) {
  var bk = getBookmarks(sectionName);
  var idx = bk.indexOf(itemId);
  if (idx === -1) bk.push(itemId);
  else bk.splice(idx, 1);
  localStorage.setItem('bookmarks-' + sectionName, JSON.stringify(bk));
  return idx === -1;
}

function getItemId(item, fallback) {
  if (item && item.id) return item.id;
  return fallback;
}

function normalizeSearchText(text) {
  return String(text || '').trim().toLowerCase();
}

function getTextMatchRank(text, query) {
  var value = normalizeSearchText(text);
  if (!value || !query) return null;
  if (value === query) return 3;
  if (value.indexOf(query) === 0) return 2;
  if (value.indexOf(query) !== -1) return 1;
  return null;
}

function getBestArrayMatchRank(values, query) {
  if (!values || !values.length) return null;
  var best = null;
  for (var i = 0; i < values.length; i++) {
    var rank = getTextMatchRank(values[i], query);
    if (rank !== null && (best === null || rank > best)) best = rank;
  }
  return best;
}

function getReadingFieldMatchRank(readings, query) {
  if (!readings || !readings.length) return null;
  var best = null;
  for (var i = 0; i < readings.length; i++) {
    var reading = readings[i];
    var kanaRank = getTextMatchRank(reading.kana, query);
    var romajiRank = getTextMatchRank(reading.romaji, query);
    var rank = kanaRank;
    if (romajiRank !== null && (rank === null || romajiRank > rank)) rank = romajiRank;
    if (rank !== null && (best === null || rank > best)) best = rank;
  }
  return best;
}

function getKanjiExampleMatchRank(examples, query) {
  if (!examples || !examples.length) return null;
  var best = null;
  for (var i = 0; i < examples.length; i++) {
    var ex = examples[i];
    var rank = getBestArrayMatchRank([ex.word, ex.reading, ex.meaning], query);
    if (rank !== null && (best === null || rank > best)) best = rank;
  }
  return best;
}

function compareKanjiSearchItems(a, b) {
  var la = LEVEL_ORDER[a.jlpt] !== undefined ? LEVEL_ORDER[a.jlpt] : 9;
  var lb = LEVEL_ORDER[b.jlpt] !== undefined ? LEVEL_ORDER[b.jlpt] : 9;
  if (la !== lb) return la - lb;
  if (a.strokes !== b.strokes) return a.strokes - b.strokes;
  return a.kanji.localeCompare(b.kanji, 'ja');
}

function compareVocabSearchItems(a, b) {
  var la = LEVEL_ORDER[a.level] !== undefined ? LEVEL_ORDER[a.level] : 9;
  var lb = LEVEL_ORDER[b.level] !== undefined ? LEVEL_ORDER[b.level] : 9;
  if (la !== lb) return la - lb;
  return a.word.localeCompare(b.word, 'ja');
}

function appendElement(parent, tagName, className, text) {
  var el = document.createElement(tagName);
  if (className) el.className = className;
  if (text !== undefined && text !== null) el.textContent = text;
  parent.appendChild(el);
  return el;
}

// === Shared Card & Detail Utilities ===

function createBaseCard(className, content, index, section, itemId) {
  var card = document.createElement('div');
  card.className = className;
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  if (typeof content === 'function') {
    content(card);
  } else if (content) {
    card.innerHTML = content;
  }
  function activate() {
    if (window.app) window.app.playTick();
    section.openDetail(index);
  }
  card.addEventListener('click', activate);
  card.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
  });

  if (itemId) {
    var starred = isBookmarked(section.name, itemId);
    var star = document.createElement('button');
    star.className = 'bookmark-btn' + (starred ? ' active' : '');
    star.innerHTML = starred ? '&#9733;' : '&#9734;';
    star.title = 'Lesezeichen';
    star.setAttribute('aria-label', 'Lesezeichen');
    star.addEventListener('click', function (e) {
      e.stopPropagation();
      var nowStarred = toggleBookmark(section.name, itemId);
      star.innerHTML = nowStarred ? '&#9733;' : '&#9734;';
      star.classList.toggle('active', nowStarred);
      if (window.app) window.app.playTick();
    });
    card.appendChild(star);
  }

  return card;
}

function getSpeakSvgHtml(size) {
  var iconSize = size || 18;
  return '<svg class="icon-speaker" width="' + iconSize + '" height="' + iconSize + '" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M11 5L6 9H2v6h4l5 4V5z"/>' +
    '<path d="M15.5 8.5a5 5 0 0 1 0 7"/>' +
    '<path d="M19 5a10 10 0 0 1 0 14"/>' +
  '</svg>';
}

function resolveSpeakText(config) {
  if (typeof config === 'string') return config;
  if (!config || typeof config !== 'object') return '';
  if (config.speechText) return config.speechText;

  var item = config.item || config;
  return item.reading || item.kana || item.word || '';
}

function createSpeakButton(headerSelector, config) {
  var header = document.querySelector(headerSelector);
  var oldBtn = header.querySelector('.btn-speak');
  if (oldBtn) oldBtn.remove();
  var speechText = resolveSpeakText(config);
  var speakBtn = document.createElement('button');
  speakBtn.className = 'btn btn-icon btn-speak';
  speakBtn.title = 'Aussprache';
  speakBtn.innerHTML = getSpeakSvgHtml(18);
  speakBtn.addEventListener('click', function () {
    if (window.app) window.app.speakJP(speechText);
  });
  header.appendChild(speakBtn);
}

// === Pitch Accent Utilities ===

// Split reading into morae (compound kana like きゃ = 1 mora)
var SMALL_KANA = 'ゃゅょャュョァィゥェォぁぃぅぇぉ';
function getPitchMorae(reading) {
  var morae = [];
  for (var i = 0; i < reading.length; i++) {
    if (i > 0 && SMALL_KANA.indexOf(reading[i]) !== -1) {
      morae[morae.length - 1] += reading[i];
    } else {
      morae.push(reading[i]);
    }
  }
  return morae;
}

// Get pitch pattern as array of 1 (high) / 0 (low) per mora
function getPitchPattern(moraCount, pitchNum) {
  var pattern = [];
  for (var i = 0; i < moraCount; i++) {
    if (pitchNum === 0) {
      // Heiban: low first mora, rest high
      pattern.push(i === 0 ? 0 : 1);
    } else if (pitchNum === 1) {
      // Atamadaka: first mora high, rest low
      pattern.push(i === 0 ? 1 : 0);
    } else {
      // Nakadaka/Odaka: low first, high until drop at pitchNum
      if (i === 0) pattern.push(0);
      else if (i < pitchNum) pattern.push(1);
      else pattern.push(0);
    }
  }
  return pattern;
}

// Get pitch type label
function getPitchLabel(pitchNum, moraCount) {
  if (pitchNum === 0) return '平';
  if (pitchNum === 1) return '頭';
  if (pitchNum === moraCount) return '尾';
  return '中';
}

// Render pitch SVG for detail view
function renderPitchSVG(reading, pitchNum) {
  if (pitchNum === undefined || pitchNum === null || pitchNum < 0) return '';
  var morae = getPitchMorae(reading);
  var n = morae.length;
  if (n === 0) return '';
  var pattern = getPitchPattern(n, pitchNum);

  var dotR = 5;
  var spacing = 32;
  var highY = 8;
  var lowY = 28;
  var w = (n - 1) * spacing + dotR * 4;
  var h = 52;

  var points = [];
  var dots = '';
  for (var i = 0; i < n; i++) {
    var x = dotR * 2 + i * spacing;
    var y = pattern[i] ? highY : lowY;
    points.push(x + ',' + y);
    var color = pattern[i] ? 'var(--accent)' : 'var(--text-secondary)';
    dots += '<circle cx="' + x + '" cy="' + y + '" r="' + dotR + '" fill="' + color + '"/>';
  }

  var labels = '';
  for (var j = 0; j < n; j++) {
    var lx = dotR * 2 + j * spacing;
    labels += '<text x="' + lx + '" y="' + (h - 1) + '" text-anchor="middle" font-size="11" font-family="var(--font-jp)" fill="var(--text-secondary)">' + morae[j] + '</text>';
  }

  return '<svg class="pitch-svg" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '">' +
    '<polyline points="' + points.join(' ') + '" fill="none" stroke="var(--border)" stroke-width="2"/>' +
    dots + labels + '</svg>';
}

// Render compact pitch badge for cards
function renderPitchBadge(reading, pitchNum) {
  if (pitchNum === undefined || pitchNum === null || pitchNum < 0) return '';
  var morae = getPitchMorae(reading);
  var label = getPitchLabel(pitchNum, morae.length);
  return ' <span class="pitch-badge">' + label + '</span>';
}

function createDetailBookmark(headerSelector, sectionName, itemId) {
  var header = document.querySelector(headerSelector);
  var oldBtn = header.querySelector('.detail-bookmark-btn');
  if (oldBtn) oldBtn.remove();
  var starred = isBookmarked(sectionName, itemId);
  var btn = document.createElement('button');
  btn.className = 'btn btn-icon detail-bookmark-btn' + (starred ? ' active' : '');
  btn.innerHTML = starred ? '&#9733;' : '&#9734;';
  btn.title = 'Lesezeichen';
  btn.setAttribute('aria-label', 'Lesezeichen');
  btn.addEventListener('click', function () {
    var nowStarred = toggleBookmark(sectionName, itemId);
    btn.innerHTML = nowStarred ? '&#9733;' : '&#9734;';
    btn.classList.toggle('active', nowStarred);
    if (window.app) window.app.playTick();
  });
  header.appendChild(btn);
}

// Wire bookmark toggle buttons (single button that toggles between 'all' and 'starred')
function initBookmarkToggles() {
  document.querySelectorAll('.bm-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var isActive = btn.getAttribute('data-bm') === 'starred';
      btn.setAttribute('data-bm', isActive ? 'all' : 'starred');
      btn.innerHTML = isActive ? '&#9734;' : '&#9733;';
      btn.classList.toggle('active', !isActive);
      // Find which section this belongs to and update
      var classes = btn.className.split(' ');
      for (var i = 0; i < classes.length; i++) {
        var cls = classes[i];
        if (cls.indexOf('-bm') !== -1 && cls !== 'bm-toggle') {
          // Trigger the filter system
          var sectionMap = {
            'kanji-bm': 'kanji', 'grammar-bm': 'grammar', 'vocab-bm': 'vocab',
            'counter-bm': 'counters', 'radical-bm': 'radicals', 'ono-bm': 'onomatopoeia'
          };
          var secName = sectionMap[cls];
          if (secName && window.app && window.app.sections[secName]) {
            var sec = window.app.sections[secName];
            sec.filters.bookmarks = isActive ? 'all' : 'starred';
            sec.applyFilters();
          }
          break;
        }
      }
      if (window.app) window.app.playTick();
    });
  });
}

// Wire select-based filters (vocab type dropdown, counter category dropdown)
function populateManagedSelect(select, values, allLabel) {
  if (!select) return;

  var currentValue = select.value || 'all';
  select.innerHTML = '';

  var allOption = document.createElement('option');
  allOption.value = 'all';
  allOption.textContent = allLabel;
  select.appendChild(allOption);

  for (var i = 0; i < values.length; i++) {
    var option = document.createElement('option');
    option.value = values[i];
    option.textContent = values[i];
    select.appendChild(option);
  }

  select.value = values.indexOf(currentValue) !== -1 ? currentValue : 'all';
}

function initSelectFilters() {
  var constants = getAppConstants();
  var vocabTypeSelect = document.getElementById('vocab-type-select');
  populateManagedSelect(vocabTypeSelect, constants.VOCAB_TYPES, 'Alle Wortarten');
  if (vocabTypeSelect) {
    vocabTypeSelect.addEventListener('change', function () {
      if (window.app && window.app.sections.vocab) {
        window.app.sections.vocab.filters.type = this.value;
        window.app.sections.vocab.applyFilters();
      }
    });
  }
  var counterCatSelect = document.getElementById('counter-cat-select');
  populateManagedSelect(counterCatSelect, constants.COUNTER_CATEGORIES, 'Alle Kategorien');
  if (counterCatSelect) {
    counterCatSelect.addEventListener('change', function () {
      if (window.app && window.app.sections.counters) {
        window.app.sections.counters.filters.category = this.value;
        window.app.sections.counters.applyFilters();
      }
    });
  }
}

function renderExamplesOrEmpty(elementId, examples) {
  var el = document.getElementById(elementId);
  el.textContent = '';
  if (examples && examples.length > 0) {
    for (var i = 0; i < examples.length; i++) {
      var ex = examples[i];
      var item = appendElement(el, 'div', 'grammar-example-item');
      if (ex.kind === 'teaching' || ex.kind === 'natural') {
        appendElement(item, 'div', 'grammar-example-kind', ex.kind === 'teaching' ? 'Lernbeispiel' : 'Natürlicher Gebrauch');
      }
      appendElement(item, 'div', 'grammar-example-jp', ex.japanese);
      appendElement(item, 'div', 'grammar-example-romaji', ex.romaji);
      appendElement(item, 'div', 'grammar-example-german', ex.german);
    }
  } else {
    appendElement(el, 'div', 'no-reading', 'Keine Beispiele');
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

function renderKanjiTags(container, kanjiItems) {
  container.textContent = '';
  for (var i = 0; i < kanjiItems.length; i++) {
    var k = kanjiItems[i];
    var tag = appendElement(container, 'span', 'component-tag');
    tag.setAttribute('data-kanji', k.kanji);
    appendElement(tag, 'span', 'comp-radical', k.kanji);
    appendElement(tag, 'span', 'comp-meaning', k.meanings[0]);
  }
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
      stateKey: 'bookmarks',
      selector: '.bm-noop',
      dataAttr: 'data-bm',
      defaultValue: 'all'
    },
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
  searchResultLimit: 24,

  filterFn: function (k, query, filters, section) {
    if (filters.bookmarks === 'starred' && !isBookmarked('kanji', k.kanji)) return false;
    if (filters.level !== 'all' && k.jlpt !== filters.level) return false;
    if (window.app && window.app.activeRadical) {
      var hasRadical = k.components && k.components.some(function (c) {
        return c.radical === window.app.activeRadical;
      });
      if (!hasRadical) return false;
    }
    return true;
  },

  searchScoreFn: function (k, query) {
    var kanjiRank = getTextMatchRank(k.kanji, query);
    var meaningRank = getBestArrayMatchRank(k.meanings, query);
    var kunRank = getReadingFieldMatchRank(k.kun, query);
    var onRank = getReadingFieldMatchRank(k.on, query);
    var readingRank = kunRank;
    if (onRank !== null && (readingRank === null || onRank > readingRank)) readingRank = onRank;
    var exampleRank = getKanjiExampleMatchRank(k.examples, query);

    if (kanjiRank === null && meaningRank === null && readingRank === null && exampleRank === null) {
      return null;
    }

    var best = 0;
    if (kanjiRank === 3) best = Math.max(best, 1000);
    else if (kanjiRank === 2) best = Math.max(best, 800);
    else if (kanjiRank === 1) best = Math.max(best, 680);

    if (readingRank === 3) best = Math.max(best, 950);
    else if (readingRank === 2) best = Math.max(best, 760);
    else if (readingRank === 1) best = Math.max(best, 640);

    if (meaningRank === 3) best = Math.max(best, 900);
    else if (meaningRank === 2) best = Math.max(best, 720);
    else if (meaningRank === 1) best = Math.max(best, 600);

    if (exampleRank === 3) best = Math.max(best, 850);
    else if (exampleRank === 2) best = Math.max(best, 540);
    else if (exampleRank === 1) best = Math.max(best, 500);

    return {
      score: best,
      isExact: best >= 850
    };
  },

  searchCompareFn: compareKanjiSearchItems,

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
    return createBaseCard('kanji-card', function (card) {
      appendElement(card, 'span', 'card-level ' + k.jlpt, k.jlpt);
      appendElement(card, 'span', 'card-kanji', k.kanji);
      appendElement(card, 'span', 'card-meaning', k.meanings[0]);
    }, index, section, k.kanji);
  },

  openDetail: function (k, dom, section) {
    document.getElementById('detail-kanji').textContent = k.kanji;
    var jlptEl = document.getElementById('detail-jlpt');
    jlptEl.textContent = k.jlpt;
    jlptEl.className = 'detail-jlpt-badge ' + k.jlpt;
    createDetailBookmark('.detail-kanji-display', 'kanji', k.kanji);

    document.getElementById('detail-meanings').textContent = k.meanings.join(', ');
    document.getElementById('detail-strokes').textContent = k.strokes + ' Striche';

    // Speak button SVG (reused for readings)
    var speakSvg = getSpeakSvgHtml(14);

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
      if (!soBody.classList.contains('collapsed') && !soContainer.querySelector('.stroke-order-svg')) {
        var obj = document.createElement('object');
        obj.data = 'stroke-order/' + codepoint + '.svg';
        obj.type = 'image/svg+xml';
        obj.className = 'stroke-order-svg';

        var replayBtn = document.createElement('button');
        replayBtn.className = 'btn btn-pill stroke-order-replay';
        replayBtn.textContent = 'Nochmal abspielen';
        replayBtn.addEventListener('click', function () {
          if (window.app) window.app.playTick();
          obj.data = 'stroke-order/' + codepoint + '.svg';
        });

        soContainer.appendChild(obj);
        soContainer.appendChild(replayBtn);
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
      stateKey: 'bookmarks',
      selector: '.bm-noop',
      dataAttr: 'data-bm',
      defaultValue: 'all'
    },
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
    if (filters.bookmarks === 'starred' && !isBookmarked('grammar', g.id)) return false;
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
    var catOrder = { 'Partikel': 0, 'Verben': 1, 'Adjektive': 2, 'Satzstrukturen': 3, 'Keigo': 4 };
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
    var exampleText = '';
    if (g.examples && g.examples.length > 0) {
      exampleText = g.examples[0].japanese;
    }

    var card = createBaseCard('grammar-card', function (root) {
      var header = appendElement(root, 'div', 'grammar-card-header');
      appendElement(header, 'span', 'grammar-card-pattern', g.pattern);
      var badges = appendElement(header, 'div', 'grammar-card-badges');
      appendElement(badges, 'span', 'card-level ' + g.level, g.level);
      appendElement(badges, 'span', 'grammar-card-category ' + g.category, g.category);
      appendElement(root, 'div', 'grammar-card-meaning', g.meaning);
      if (exampleText) appendElement(root, 'div', 'grammar-card-example', exampleText);
    }, index, section, g.id);
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
      stateKey: 'bookmarks',
      selector: '.bm-noop',
      dataAttr: 'data-bm',
      defaultValue: 'all'
    },
    {
      stateKey: 'level',
      selector: '.vocab-level',
      dataAttr: 'data-vlevel',
      defaultValue: 'all'
    },
    {
      stateKey: 'type',
      selector: '.vtype-noop',
      dataAttr: 'data-vtype',
      defaultValue: 'all'
    }
  ],
  countLabel: ' Vokabeln',
  defaultSort: 'level',
  batchSize: 100,
  searchResultLimit: 32,

  filterFn: function (v, query, filters) {
    if (filters.bookmarks === 'starred' && !isBookmarked('vocab', getItemId(v, v.word + '|' + (v.reading || '')))) return false;
    if (filters.level !== 'all' && v.level !== filters.level) return false;
    if (filters.type !== 'all' && v.type !== filters.type) return false;
    return true;
  },

  searchScoreFn: function (v, query) {
    var wordRank = getTextMatchRank(v.word, query);
    var readingRank = getTextMatchRank(v.reading, query);
    var romajiRank = getTextMatchRank(v.romaji, query);
    var meaningRank = getTextMatchRank(v.meaning, query);
    var categoryRank = getTextMatchRank(v.category, query);

    if (wordRank === null && readingRank === null && romajiRank === null && meaningRank === null && categoryRank === null) {
      return null;
    }

    var best = 0;
    if (wordRank === 3) best = Math.max(best, 1000);
    else if (wordRank === 2) best = Math.max(best, 800);
    else if (wordRank === 1) best = Math.max(best, 620);

    if (readingRank === 3) best = Math.max(best, 950);
    else if (readingRank === 2) best = Math.max(best, 760);
    else if (readingRank === 1) best = Math.max(best, 600);

    if (romajiRank === 3) best = Math.max(best, 930);
    else if (romajiRank === 2) best = Math.max(best, 740);
    else if (romajiRank === 1) best = Math.max(best, 580);

    if (meaningRank === 3) best = Math.max(best, 900);
    else if (meaningRank === 2) best = Math.max(best, 700);
    else if (meaningRank === 1) best = Math.max(best, 560);

    if (categoryRank === 3) best = Math.max(best, 500);
    else if (categoryRank === 2) best = Math.max(best, 460);
    else if (categoryRank === 1) best = Math.max(best, 420);

    return {
      score: best,
      isExact: best >= 900
    };
  },

  searchCompareFn: compareVocabSearchItems,

  sortFn: function (items, sortKey) {
    var types = getAppConstants().VOCAB_TYPES;
    var typeOrder = {};
    for (var i = 0; i < types.length; i++) typeOrder[types[i]] = i;
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
    return createBaseCard('vocab-card', function (root) {
      var header = appendElement(root, 'div', 'vocab-card-header');
      appendElement(header, 'span', 'vocab-card-word', v.word);
      var badges = appendElement(header, 'div', 'vocab-card-badges');
      appendElement(badges, 'span', 'card-level ' + v.level, v.level);
      appendElement(badges, 'span', 'vocab-type-badge ' + v.type, v.type);

      var reading = appendElement(root, 'div', 'vocab-card-reading', v.reading || '');
      if (v.pitch !== undefined && v.pitch !== null && v.pitch >= 0) {
        appendElement(reading, 'span', 'pitch-badge', getPitchLabel(v.pitch, getPitchMorae(v.reading || '').length));
      }

      appendElement(root, 'div', 'vocab-card-meaning', v.meaning);
    }, index, section, getItemId(v, v.word + '|' + (v.reading || '')));
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
    createSpeakButton('.vocab-detail-header', v);
    createDetailBookmark('.vocab-detail-header', 'vocab', getItemId(v, v.word + '|' + (v.reading || '')));

    document.getElementById('vocab-detail-reading').textContent = v.reading || '';
    var pitchEl = document.getElementById('vocab-detail-pitch');
    if (v.pitch !== undefined && v.pitch !== null && v.pitch >= 0) {
      pitchEl.innerHTML = renderPitchSVG(v.reading || '', v.pitch);
      pitchEl.classList.remove('hidden');
    } else {
      pitchEl.innerHTML = '';
      pitchEl.classList.add('hidden');
    }
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
      renderKanjiTags(kanjiLinksEl, kanjiChars);
      attachKanjiNavigation(kanjiLinksEl, section);
      kanjiSection.classList.remove('hidden');
    } else if (window.app && window.app.sections.kanji && !window.app.sections.kanji.isLoaded) {
      kanjiSection.classList.remove('hidden');
      kanjiLinksEl.innerHTML = '<span style="color:var(--text-secondary);font-size:0.9rem;">Kanji-Links werden geladen...</span>';
      window.app.ensureSectionLoaded('kanji').then(function () {
        if (section.currentDetailIndex === -1) return;
        var current = section.filteredItems[section.currentDetailIndex];
        if (!current || current.word !== v.word || current.reading !== v.reading) return;
        section.config.openDetail(current, dom, section);
      });
    } else {
      kanjiSection.classList.add('hidden');
    }

    // --- Conjugation section (verbs only) ---
    var conjSection = document.getElementById('vocab-conjugation-section');
    var conjHeader = document.getElementById('conjugation-header');
    var conjBody = document.getElementById('conjugation-body');
    var conjContainer = document.getElementById('conjugation-container');
    var conjGroupBadge = document.getElementById('conjugation-group-badge');

    if (window.resolveVocabVerbConjugation) {
      var resolved = window.resolveVocabVerbConjugation(v);
      var result = resolved && resolved.result;
      if (result && result.forms) {
        conjSection.classList.remove('hidden');

        // Reset to collapsed state
        conjBody.classList.add('collapsed');
        var conjIcon = conjHeader.querySelector('.toggle-icon');
        conjIcon.classList.add('collapsed');
        conjContainer.innerHTML = '';

        // Show verb group badge
        conjGroupBadge.textContent = result.groupLabel;
        conjGroupBadge.className = 'conjugation-group-badge ' + result.group;

        // Clone header to remove old listeners (same pattern as stroke order)
        var newConjHeader = conjHeader.cloneNode(true);
        conjHeader.parentNode.replaceChild(newConjHeader, conjHeader);
        var newConjIcon = newConjHeader.querySelector('.toggle-icon');

        newConjHeader.addEventListener('click', function () {
          if (window.app) window.app.playTick();
          conjBody.classList.toggle('collapsed');
          newConjIcon.classList.toggle('collapsed');

          // Lazy-load conjugation table on first expand
          if (!conjBody.classList.contains('collapsed') && !conjContainer.querySelector('.conjugation-table')) {
            var speakSvg = getSpeakSvgHtml(14);

            var forms = result.forms;
            var basicKeys = ['dictionary','polite','negative','negPolite','past','pastPolite','pastNeg','pastNegPolite','te'];
            var advancedKeys = ['potential','passive','causative','causPas','conditional','conditionalTara','volitional','volPolite','imperative','prohibitive'];

            function buildConjGroup(title, keys) {
              var html = '<div class="conjugation-group">';
              html += '<h4 class="conjugation-group-title">' + title + '</h4>';
              html += '<table class="conjugation-table"><tbody>';
              for (var i = 0; i < keys.length; i++) {
                var f = forms[keys[i]];
                if (!f) continue;
                html += '<tr>' +
                  '<td class="conj-label">' + f.label + '</td>' +
                  '<td class="conj-form">' + f.japanese + '</td>' +
                  '<td class="conj-speak"><button class="btn btn-icon btn-speak btn-speak-sm" title="Aussprache" data-text="' + f.japanese + '">' + speakSvg + '</button></td>' +
                '</tr>';
              }
              html += '</tbody></table></div>';
              return html;
            }

            conjContainer.innerHTML = buildConjGroup('Grundformen', basicKeys) + buildConjGroup('Erweiterte Formen', advancedKeys);

            // Wire up speak buttons
            conjContainer.querySelectorAll('.btn-speak').forEach(function (btn) {
              btn.addEventListener('click', function (e) {
                e.stopPropagation();
                if (window.app) window.app.speakJP(this.getAttribute('data-text'));
              });
            });
          }
        });
      } else {
        conjSection.classList.add('hidden');
      }
    } else {
      conjSection.classList.add('hidden');
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
      stateKey: 'bookmarks',
      selector: '.bm-noop',
      dataAttr: 'data-bm',
      defaultValue: 'all'
    },
    {
      stateKey: 'level',
      selector: '.counter-level',
      dataAttr: 'data-clevel',
      defaultValue: 'all'
    },
    {
      stateKey: 'category',
      selector: '.ccat-noop',
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
    if (filters.bookmarks === 'starred' && !isBookmarked('counters', c.id)) return false;
    if (filters.level !== 'all' && c.level !== filters.level) return false;
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
    var previewHtml = '';
    if (c.counts) {
      var previews = c.counts.slice(0, 5).map(function (ct) {
        var cls = ct.shift ? 'counter-card-preview-item has-shift' : 'counter-card-preview-item';
        return '<span class="' + cls + '">' + ct.kanji + '</span>';
      });
      previewHtml = '<div class="counter-card-preview">' + previews.join('') + '</div>';
    }

    return createBaseCard('counter-card', function (root) {
      var header = appendElement(root, 'div', 'counter-card-header');
      appendElement(header, 'span', 'counter-card-kanji', c.kanji);
      appendElement(header, 'span', 'counter-card-badge ' + c.category, c.category);
      appendElement(root, 'div', 'counter-card-reading', c.reading + ' (' + c.romaji + ')');
      appendElement(root, 'div', 'counter-card-meaning', c.meaning);

      if (c.counts) {
        var preview = appendElement(root, 'div', 'counter-card-preview');
        var previews = c.counts.slice(0, 5);
        for (var i = 0; i < previews.length; i++) {
          var cls = previews[i].shift ? 'counter-card-preview-item has-shift' : 'counter-card-preview-item';
          appendElement(preview, 'span', cls, previews[i].kanji);
        }
      }
    }, index, section, c.id);
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
      stateKey: 'bookmarks',
      selector: '.bm-noop',
      dataAttr: 'data-bm',
      defaultValue: 'all'
    },
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
    if (filters.bookmarks === 'starred' && !isBookmarked('radicals', '' + r.number)) return false;
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
    return createBaseCard('radical-card', function (card) {
      appendElement(card, 'span', 'radical-card-number', '#' + r.number);
      appendElement(card, 'span', 'radical-card-strokes', r.strokes + '\u753B');
      appendElement(card, 'span', 'radical-card-char', r.radical);
      appendElement(card, 'span', 'radical-card-meaning', r.meaning);
      appendElement(card, 'span', 'radical-card-reading', r.reading);
    }, index, section, '' + r.number);
  },

  openDetail: function (r, dom, section) {
    document.getElementById('radical-detail-char').textContent = r.radical;
    document.getElementById('radical-detail-number').textContent = '#' + r.number + ' von ' + getAppConstants().CANONICAL_RADICAL_COUNT;
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
      renderKanjiTags(kanjiList, matchingKanji);
      attachKanjiNavigation(kanjiList, section);
    } else if (window.app && window.app.sections.kanji && !window.app.sections.kanji.isLoaded) {
      kanjiList.innerHTML = '<span style="color:var(--text-secondary);font-size:0.9rem;">Kanji werden geladen...</span>';
      window.app.ensureSectionLoaded('kanji').then(function () {
        if (section.currentDetailIndex === -1) return;
        var current = section.filteredItems[section.currentDetailIndex];
        if (!current || current.number !== r.number) return;
        section.config.openDetail(current, dom, section);
      });
    } else {
      kanjiList.innerHTML = '<span style="color:var(--text-secondary);font-size:0.9rem;">Keine Kanji mit diesem Radikal in der Datenbank gefunden.</span>';
    }
  }
};

// ==========================================
// === ONOMATOPOEIA CONFIG ===
// ==========================================
SECTION_CONFIGS.onomatopoeia = {
  name: 'onomatopoeia',
  dom: {
    controls: 'ono-controls',
    grid: 'ono-grid',
    search: 'ono-search-input',
    clearSearch: 'ono-clear-search',
    sort: 'ono-sort-select',
    noResults: 'ono-no-results',
    overlay: 'ono-detail-overlay',
    closeBtn: 'ono-close-detail',
    prevBtn: 'prev-ono',
    nextBtn: 'next-ono'
  },
  filterGroups: [
    {
      stateKey: 'bookmarks',
      selector: '.bm-noop',
      dataAttr: 'data-bm',
      defaultValue: 'all'
    },
    {
      stateKey: 'level',
      selector: '.ono-level',
      dataAttr: 'data-olevel',
      defaultValue: 'all'
    },
    {
      stateKey: 'category',
      selector: '.ono-cat',
      dataAttr: 'data-ocat',
      defaultValue: 'all'
    },
  ],
  countLabel: ' Lautmalerei',
  defaultSort: 'category',
  batchSize: 0,

  filterFn: function (o, query, filters) {
    if (filters.bookmarks === 'starred' && !isBookmarked('onomatopoeia', getItemId(o, o.word))) return false;
    if (filters.level !== 'all' && o.level !== filters.level) return false;
    if (filters.category !== 'all' && o.category !== filters.category) return false;
    if (query) {
      var matchWord = o.word.indexOf(query) !== -1;
      var matchReading = o.reading && o.reading.indexOf(query) !== -1;
      var matchRomaji = o.romaji && o.romaji.toLowerCase().indexOf(query) !== -1;
      var matchMeaning = o.meaning.toLowerCase().indexOf(query) !== -1;
      var matchExplanation = o.explanation && o.explanation.toLowerCase().indexOf(query) !== -1;
      var matchExample = o.examples && o.examples.some(function (ex) {
        return ex.japanese.indexOf(query) !== -1 ||
          ex.german.toLowerCase().indexOf(query) !== -1 ||
          ex.romaji.toLowerCase().indexOf(query) !== -1;
      });
      if (!matchWord && !matchReading && !matchRomaji && !matchMeaning && !matchExplanation && !matchExample) return false;
    }
    return true;
  },

  sortFn: function (items, sortKey) {
    var catOrder = { 'Geräusche': 0, 'Zustände': 1, 'Gefühle': 2, 'Bewegung': 3 };
    var patOrder = { 'ABAB': 0, 'ABっと': 1, 'Andere': 2 };
    items.sort(function (a, b) {
      if (sortKey === 'category') {
        var ca = catOrder[a.category] !== undefined ? catOrder[a.category] : 9;
        var cb = catOrder[b.category] !== undefined ? catOrder[b.category] : 9;
        if (ca !== cb) return ca - cb;
        return a.word.localeCompare(b.word, 'ja');
      }
      if (sortKey === 'alpha') {
        return a.meaning.localeCompare(b.meaning, 'de');
      }
      if (sortKey === 'pattern') {
        var pa = patOrder[a.pattern] !== undefined ? patOrder[a.pattern] : 9;
        var pb = patOrder[b.pattern] !== undefined ? patOrder[b.pattern] : 9;
        if (pa !== pb) return pa - pb;
        return a.word.localeCompare(b.word, 'ja');
      }
      return 0;
    });
  },

  createCard: function (o, index, section) {
    return createBaseCard('ono-card', function (root) {
      var header = appendElement(root, 'div', 'ono-card-header');
      appendElement(header, 'span', 'ono-card-word', o.word);
      var badges = appendElement(header, 'div', 'ono-card-badges');
      appendElement(badges, 'span', 'ono-category-badge ' + o.category, o.category);
      if (o.pattern) appendElement(badges, 'span', 'ono-pattern-badge-sm', o.pattern);

      var reading = appendElement(root, 'div', 'ono-card-reading', o.reading || '');
      if (o.pitch !== undefined && o.pitch !== null && o.pitch >= 0) {
        appendElement(reading, 'span', 'pitch-badge', getPitchLabel(o.pitch, getPitchMorae(o.reading || '').length));
      }

      appendElement(root, 'div', 'ono-card-meaning', o.meaning);
    }, index, section, getItemId(o, o.word));
  },

  openDetail: function (o, dom, section) {
    document.getElementById('ono-detail-word').textContent = o.word;
    var catBadge = document.getElementById('ono-detail-category');
    catBadge.textContent = o.category;
    catBadge.className = 'ono-category-badge ' + o.category;
    var patBadge = document.getElementById('ono-detail-pattern');
    patBadge.textContent = o.pattern;
    patBadge.className = 'ono-pattern-badge';

    // Speak button
    createSpeakButton('.ono-detail-header', o);
    createDetailBookmark('.ono-detail-header', 'onomatopoeia', getItemId(o, o.word));

    document.getElementById('ono-detail-reading').textContent = o.reading || '';
    var onoPitchEl = document.getElementById('ono-detail-pitch');
    if (o.pitch !== undefined && o.pitch !== null && o.pitch >= 0) {
      onoPitchEl.innerHTML = renderPitchSVG(o.reading || '', o.pitch);
      onoPitchEl.classList.remove('hidden');
    } else {
      onoPitchEl.innerHTML = '';
      onoPitchEl.classList.add('hidden');
    }
    document.getElementById('ono-detail-romaji').textContent = o.romaji || '';
    document.getElementById('ono-detail-meaning').textContent = o.meaning;
    document.getElementById('ono-detail-usage-line').textContent =
      'Verwendung: ' + (o.usage || '\u2014');
    document.getElementById('ono-detail-explanation').textContent = o.explanation || '';

    renderExamplesOrEmpty('ono-detail-examples', o.examples);
    toggleNotes('ono-detail-notes-section', 'ono-detail-notes', o.notes);

    // Related onomatopoeia
    var relatedSection = document.getElementById('ono-detail-related-section');
    var relatedEl = document.getElementById('ono-detail-related');
    if (o.related && o.related.length > 0) {
      relatedEl.innerHTML = o.related.map(function (relWord) {
        var found = section.allItems.some(function (item) { return item.word === relWord; });
        if (!found) return '<span class="ono-related-tag disabled">' + relWord + '</span>';
        return '<span class="ono-related-tag" data-word="' + relWord + '">' + relWord + '</span>';
      }).join('');

      relatedEl.querySelectorAll('.ono-related-tag:not(.disabled)').forEach(function (tag) {
        tag.addEventListener('click', function () {
          var targetWord = this.getAttribute('data-word');
          var targetIndex = section.filteredItems.findIndex(function (item) { return item.word === targetWord; });
          if (targetIndex !== -1) {
            section.openDetail(targetIndex);
          } else {
            // Item might be filtered out — reset filters and find it
            if (section.allItems.some(function (item) { return item.word === targetWord; })) {
              section.resetFilterGroup('category');
              section.dom.search.value = '';
              section.applyFilters();
              var newIndex = section.filteredItems.findIndex(function (item) { return item.word === targetWord; });
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
