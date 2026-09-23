const fs = require('fs');
const path = require('path');
const { JSDOM, ResourceLoader } = require('jsdom');

const ROOT = path.resolve(__dirname, '..');
const INDEX_PATH = path.join(ROOT, 'index.html');

// This DOM test exercises local application resources, without depending on fonts/CDNs.
class LocalResources extends ResourceLoader {
  fetch(url, options) {
    if (url.startsWith('http://nihongo.test/')) return Promise.resolve(fs.readFileSync(path.join(ROOT, decodeURIComponent(new URL(url).pathname))));
    return url.startsWith('file:') ? super.fetch(url, options) : null;
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function waitFor(predicate, options) {
  const timeoutMs = (options && options.timeoutMs) || 12000;
  const intervalMs = (options && options.intervalMs) || 25;
  const description = (options && options.description) || 'condition';

  return new Promise(function (resolve, reject) {
    const start = Date.now();

    function tick() {
      try {
        if (predicate()) {
          resolve();
          return;
        }
      } catch (error) {
        reject(error);
        return;
      }

      if (Date.now() - start >= timeoutMs) {
        reject(new Error('Timed out waiting for ' + description));
        return;
      }

      setTimeout(tick, intervalMs);
    }

    tick();
  });
}

function click(element, window) {
  assert(element, 'Missing element to click');
  if (element.matches('[data-item-id]')) element = element.querySelector('.entry-open');
  if (typeof element.click === 'function') {
    element.click();
    return;
  }
  element.dispatchEvent(new window.MouseEvent('click', { bubbles: true, cancelable: true }));
}

async function run() {
  const html = fs.readFileSync(INDEX_PATH, 'utf8');
  const spokenTexts = [];
  const dom = new JSDOM(html, {
    url: 'file:///' + INDEX_PATH.replace(/\\/g, '/'),
    runScripts: 'dangerously',
    resources: new LocalResources(),
    pretendToBeVisual: true,
    beforeParse(window) {
      window.HTMLElement.prototype.scrollIntoView = function () {};
      const originalError = console.error.bind(console);
      window.console.error = function () {
        const firstArg = arguments[0];
        const message = firstArg && firstArg.message ? firstArg.message : String(firstArg || '');
        if (message.indexOf('Script wurde absichtlich blockiert:') !== -1) {
          return;
        }
        originalError.apply(console, arguments);
      };
      const storage = new Map();
      const localStorageStub = {
        getItem(key) {
          return storage.has(key) ? storage.get(key) : null;
        },
        setItem(key, value) {
          storage.set(String(key), String(value));
        },
        removeItem(key) {
          storage.delete(key);
        },
        clear() {
          storage.clear();
        }
      };
      Object.defineProperty(window, 'localStorage', {
        configurable: true,
        value: localStorageStub
      });
      localStorageStub.setItem('kanji-sound', 'off');
      window.matchMedia = function () {
        return {
          matches: false,
          media: '',
          onchange: null,
          addListener() {},
          removeListener() {},
          addEventListener() {},
          removeEventListener() {},
          dispatchEvent() { return false; }
        };
      };
      window.confirm = function () { return true; };
      window.scrollTo = function () {};
      window.requestAnimationFrame = function (cb) { return setTimeout(cb, 0); };
      window.cancelAnimationFrame = function (id) { clearTimeout(id); };
      window.SpeechSynthesisUtterance = function (text) { this.text = text; };
      window.speechSynthesis = {
        _voices: [{ name: 'Test Japanese', lang: 'ja-JP' }],
        speaking: false,
        pending: false,
        onvoiceschanged: null,
        cancel() {},
        getVoices() {
          return this._voices.slice();
        },
        resume() {},
        speak(utterance) {
          spokenTexts.push(utterance && utterance.text ? utterance.text : '');
        }
      };
      window.IntersectionObserver = function (callback) {
        this.observe = function () {};
        this.disconnect = function () {};
      };
    }
  });

  const window = dom.window;
  const document = window.document;

  const runtimeErrors = [];
  window.addEventListener('error', function (event) {
    runtimeErrors.push(event.error || new Error(event.message));
  });

  await waitFor(function () {
    return window.app && window.QuizModule && document.getElementById('kana-content').children.length > 0;
  }, { description: 'initial app boot' });

  click(document.querySelector('[data-tab="kanji"]'), window);
  await waitFor(function () {
    return document.getElementById('kanji-grid').children.length > 0;
  }, { description: 'kanji section load' });

  click(document.querySelector('[data-tab="vocab"]'), window);
  await waitFor(function () {
    return document.getElementById('vocab-grid').children.length > 0;
  }, { description: 'vocab section load' });

  const vocabSearch = document.getElementById('vocab-search-input');
  vocabSearch.value = '大丈夫';
  vocabSearch.dispatchEvent(new window.Event('input', { bubbles: true }));
  await waitFor(function () {
    const firstCard = document.querySelector('#vocab-grid .vocab-card');
    return firstCard && firstCard.textContent.indexOf('大丈夫') !== -1;
  }, { description: 'ranked vocab search result' });

  click(document.querySelector('#vocab-grid .vocab-card'), window);
  await waitFor(function () {
    return !document.getElementById('vocab-detail-overlay').classList.contains('hidden');
  }, { description: 'vocab overlay open' });

  vocabSearch.value = '言葉つき';
  vocabSearch.dispatchEvent(new window.Event('input', { bubbles: true }));
  await waitFor(function () {
    const firstCard = document.querySelector('#vocab-grid .vocab-card');
    return firstCard && firstCard.textContent.indexOf('言葉つき') !== -1;
  }, { description: 'target vocab search result' });

  click(document.querySelector('#vocab-grid .vocab-card'), window);
  await waitFor(function () {
    return document.getElementById('vocab-detail-word').textContent.indexOf('言葉つき') !== -1;
  }, { description: 'target vocab detail open' });

  spokenTexts.length = 0;
  click(document.querySelector('.vocab-detail-header .btn-speak'), window);
  await waitFor(function () {
    return spokenTexts.length > 0;
  }, { description: 'vocab speech playback' });
  assert(spokenTexts[spokenTexts.length - 1] === 'ことばつき', 'Expected vocab speech to use reading, got: ' + spokenTexts[spokenTexts.length - 1]);

  spokenTexts.length = 0;
  window.app.speakJP('か');
  window.app.speakJP('かな');
  await waitFor(function () {
    return spokenTexts.length > 0;
  }, { description: 'latest speech request playback' });
  assert(spokenTexts[spokenTexts.length - 1] === 'かな', 'Expected latest speech request to win, got: ' + spokenTexts[spokenTexts.length - 1]);

  click(document.getElementById('vocab-close-detail'), window);
  await waitFor(function () {
    return document.getElementById('vocab-detail-overlay').classList.contains('hidden');
  }, { description: 'vocab overlay close' });

  window.__NIHONGO_TEST_BLOCK_SCRIPTS = ['counters-data.js'];
  click(document.querySelector('[data-tab="counters"]'), window);
  await waitFor(function () {
    const error = document.querySelector('#counters-tab .section-error');
    return error && error.textContent.indexOf('Erneut versuchen') !== -1;
  }, { description: 'section load failure UI' });
  await waitFor(function () {
    return window.app.sections.counters._loadPromise === null && window.app.sections.counters.isLoading === false;
  }, { description: 'section load failure cleanup' });
  delete window.__NIHONGO_TEST_BLOCK_SCRIPTS;
  await window.app.ensureSectionLoaded('counters');
  await waitFor(function () {
    var error = document.querySelector('#counters-tab .section-error');
    return document.getElementById('counters-grid').children.length > 0 &&
      (!error || error.classList.contains('hidden'));
  }, { description: 'section retry success' });

  click(document.querySelector('[data-tab="grammar"]'), window);
  await waitFor(function () {
    return document.getElementById('grammar-grid').children.length > 0;
  }, { description: 'grammar section load' });

  window.__NIHONGO_TEST_BLOCK_SCRIPTS = ['grammar-lessons.js'];
  click(document.querySelector('#grammar-view-toggle [data-view="lessons"]'), window);
  await waitFor(function () {
    const error = document.querySelector('#grammar-tab .section-error');
    return error && error.textContent.indexOf('Erneut versuchen') !== -1;
  }, { description: 'grammar lessons failure UI' });
  await waitFor(function () {
    return window.__grammarLessonsInitialized !== true;
  }, { description: 'grammar lessons failure cleanup' });
  delete window.__NIHONGO_TEST_BLOCK_SCRIPTS;
  await window.app.ensureGrammarLessonsLoaded();
  await waitFor(function () {
    return window.__grammarLessonsInitialized === true;
  }, { description: 'grammar lessons retry success' });

  // Search must retain all matches, while rendering bounded pages.
  const vocab = window.app.sections.vocab;
  for (const pair of [['子ども','子供'],['友だち','友達']]) {
    vocab.dom.search.value = pair[0];
    vocab.applyFilters();
    assert(vocab.filteredItems.some(function (v) { return v.word === pair[1]; }), 'Verified alias missing from search: '+pair[0]);
  }
  vocab.dom.search.value = 'Wasser';
  vocab.applyFilters();
  const matchingWords = vocab.allItems.filter(function (item) {
    return vocab.config.filterFn(item, '', vocab.filters, vocab) && vocab.config.searchScoreFn(item, 'wasser', vocab);
  });
  assert(matchingWords.length > 32, 'Wasser fixture must exercise multiple result pages');
  assert(vocab.filteredItems.length === matchingWords.length, 'Search discarded matching vocabulary');
  assert(vocab.dom.grid.children.length === 32, 'Search must initially render only one page');
  const pager = vocab.dom.grid.nextElementSibling;
  assert(pager.textContent.includes('32 von ' + matchingWords.length), 'Search must announce shown and total results');
  const more = pager.querySelector('button');
  click(more, window);
  assert(vocab.dom.grid.children.length === 64, 'Load more must append the next page');
  assert(document.activeElement === vocab.dom.grid.children[32].querySelector('.entry-open'), 'Load more must focus the first added result action');
  click(more, window);
  assert(vocab.dom.grid.children.length === matchingWords.length && more.hidden, 'Every result must be accessible without duplicates');
  assert(new Set(Array.from(vocab.dom.grid.children).map(function (card) { return card.textContent; })).size === matchingWords.length,
    'Pagination appended duplicate cards');

  // A new search/filter must remove old page controls and reset the page count.
  vocab.dom.search.value = '大丈夫';
  vocab.applyFilters();
  assert(!pager.isConnected, 'Previous query pagination remained connected');
  assert(vocab.dom.grid.querySelector('.vocab-card').textContent.includes('大丈夫'), 'Search ranking regressed');
  vocab.dom.search.value = 'Wasser';
  vocab.filters.level = 'N5';
  vocab.applyFilters();
  assert(vocab.filteredItems.every(function (item) { return item.level === 'N5'; }), 'Pagination lost level filtering');
  vocab.filters.level = 'all';
  vocab.dom.search.value = '';
  vocab.applyFilters();
  assert(vocab._searchPager && !vocab._usingSearchRanking && vocab.renderedCount === vocab.batchSize, 'Browsing must retain an accessible load-more action');

  const kanji = window.app.sections.kanji;
  kanji.dom.search.value = 'か';
  kanji.applyFilters();
  const kanjiMatches = kanji.allItems.filter(function (item) {
    return kanji.config.filterFn(item, '', kanji.filters, kanji) && kanji.config.searchScoreFn(item, 'か', kanji);
  });
  assert(kanji.filteredItems.length === kanjiMatches.length && kanjiMatches.length > 24, 'Kanji results were truncated');
  assert(kanji.renderedCount === 24, 'Kanji search must render a bounded first page');
  click(kanji.dom.grid.nextElementSibling.querySelector('button'), window);
  assert(kanji.renderedCount === 48, 'Kanji pagination failed');

  // Verify the actual vocabulary detail uses the corrected conjugation metadata.
  vocab.dom.search.value = '作る';
  vocab.applyFilters();
  const makeIndex = vocab.filteredItems.findIndex(function (item) { return item.word === '作る'; });
  vocab.openDetail(makeIndex);
  click(document.getElementById('conjugation-header'), window);
  assert(document.getElementById('conjugation-container').textContent.includes('つくります'), 'Detail shows an incorrect conjugation');
  assert(!document.getElementById('conjugation-container').textContent.includes('つきます'), 'Incorrect 来る classification leaked into detail');
  vocab.closeDetail();

  // Enrichment must survive runtime merging and appear in the detail view.
  vocab.dom.search.value = '条件';
  vocab.applyFilters();
  vocab.openDetail(vocab.filteredItems.findIndex(function (v) { return v.word === '条件'; }));
  assert(!document.getElementById('vocab-detail-notes-section').classList.contains('hidden'), 'Usage notes are hidden');
  assert(document.getElementById('vocab-detail-notes').textContent.includes('Voraussetzung'), 'Wrong vocabulary usage note');
  assert(document.getElementById('vocab-detail-examples').textContent.includes('家賃'), 'New vocabulary example missing');
  vocab.closeDetail();

  // New vocabulary supports search, examples, bookmarks and corrected level filters.
  vocab.filters.level = 'N5';
  vocab.dom.search.value = 'Kalender';
  vocab.applyFilters();
  const calendarIndex = vocab.filteredItems.findIndex(function (v) { return v.word === 'カレンダー'; });
  assert(calendarIndex >= 0, 'New beginner vocabulary is missing from German search');
  const calendar = vocab.filteredItems[calendarIndex];
  vocab.openDetail(calendarIndex);
  assert(document.getElementById('vocab-detail-examples').textContent.includes('休みの日'), 'Second new example missing');
  assert(document.getElementById('vocab-detail-pitch').classList.contains('hidden'), 'Unknown accent must not appear as verified');
  window.toggleBookmark('vocab', calendar.id);
  vocab.closeDetail();
  vocab.filters.bookmarks = 'starred';
  vocab.applyFilters();
  assert(vocab.filteredItems.some(function (v) { return v.id === calendar.id; }), 'New vocabulary bookmark not found');
  window.toggleBookmark('vocab', calendar.id);
  vocab.filters.bookmarks = 'all';
  vocab.dom.search.value = '医者';
  vocab.applyFilters();
  assert(vocab.filteredItems.some(function (v) { return v.word === '医者' && v.level === 'N5'; }), 'Corrected beginner level missing from filter');
  vocab.filters.level = 'N4';
  vocab.dom.search.value = 'なさる';
  vocab.applyFilters();
  vocab.openDetail(vocab.filteredItems.findIndex(function (v) { return v.word === 'なさる'; }));
  click(document.getElementById('conjugation-header'), window);
  assert(document.getElementById('conjugation-container').textContent.includes('なさいます'), 'Honorific polite conjugation is wrong');
  vocab.closeDetail();
  vocab.filters.level = 'all';
  vocab.dom.search.value = '';
  vocab.applyFilters();

  // Merged script variants retain bookmarks, and thematic filters expose secondary senses.
  window.localStorage.setItem('bookmarks-onomatopoeia', JSON.stringify(['onomatopoeia:315']));
  click(document.querySelector('[data-tab="onomatopoeia"]'), window);
  await waitFor(function () { return window.app.sections.onomatopoeia.allItems.length === 344; }, { description: 'expanded onomatopoeia' });
  const onoSection = window.app.sections.onomatopoeia;
  const mergedOno = onoSection.allItems.find(function (o) { return (o.legacyIds || []).includes('onomatopoeia:315'); });
  assert(mergedOno && window.isBookmarked('onomatopoeia', mergedOno.id), 'Merged spelling lost its bookmark');
  click(document.querySelector('[data-ocat="Essen & Textur"]'), window);
  assert(onoSection.filteredItems.some(function (o) { return o.word === 'プリプリ'; }), 'Food sense hidden by primary category');
  assert(onoSection.filteredItems.some(function (o) { return o.word === 'しっとり'; }), 'New food entry not discoverable');
  onoSection.resetFilterGroup('category');
  onoSection.dom.search.value = 'シットリ';
  onoSection.applyFilters();
  assert(onoSection.filteredItems.some(function (o) { return o.word === 'しっとり'; }), 'Kana-script search mismatch');
  onoSection.openDetail(onoSection.filteredItems.findIndex(function (o) { return o.word === 'しっとり'; }));
  onoSection.filters.level = 'N1';
  onoSection.filters.bookmarks = 'starred';
  click(document.querySelector('#ono-detail-related [data-word="パサパサ"]'), window);
  assert(document.getElementById('ono-detail-word').textContent === 'パサパサ', 'Related word failed across active filters');
  onoSection.closeDetail();

  await waitFor(function () { return document.getElementById('ono-detail-word').textContent !== 'パサパサ'; }, { description: 'related entry return' });
  onoSection.closeDetail();

  // New N1 lessons link to actual patterns, including across restrictive filters.
  click(document.querySelector('[data-tab="grammar"]'), window);
  click(document.querySelector('#grammar-view-toggle [data-view="lessons"]'), window);
  const newLessonCard = document.querySelector('[data-lesson="lesson-n1-pretext"]');
  assert(newLessonCard, 'New N1 lesson was not rendered');
  click(newLessonCard.querySelector('.gl-card-header'), window);
  const grammarSection = window.app.sections.grammar;
  grammarSection.filters.level = 'N5';
  grammarSection.dom.search.value = 'unrelated';
  click(document.querySelector('#lesson-reader [data-grammar-reference="n1-nikakotsukete"]'), window);
  assert(document.getElementById('grammar-detail-pattern').textContent.includes('にかこつけて'), 'Lesson reference failed');
  grammarSection.closeDetail();
  await waitFor(function () { return !grammarSection.isOverlayOpen(); }, { description: 'return to lesson' });

  // Run a whole timed practice test through the UI and verify its raw score.
  click(document.querySelector('[data-tab="quiz"]'), window);
  await waitFor(function () { return document.querySelector('.quiz-home-card.test'); }, { description: 'quiz home' });
  click(document.querySelector('.quiz-home-card.test'), window);
  click(document.querySelector('.quiz-test-level-card'), window);
  assert(!window.QuizModule.isTestActive(), 'Level selection must not start the timer');
  click(document.getElementById('quiz-start-test'), window);
  let answered = 0;
  let correct = 0;
  const askedQuestions = new Set();
  while (!document.querySelector('.quiz-results')) {
    const choice = document.querySelector('.quiz-choice-btn:not([disabled])');
    if (choice) {
      click(choice, window);
      // Distractors are drawn afresh, so the prompt and its correct answer identify a question.
      const question = ['.quiz-prompt', '.quiz-prompt-main', '.quiz-prompt-sub', '.quiz-choice-btn.correct'].map(function (selector) {
        const node = document.querySelector(selector);
        return node ? node.textContent : '';
      }).join('|').replace(/\|[1-4](?=[^|]*$)/, '|');
      assert(!askedQuestions.has(question), 'Timed test repeated a question: ' + question);
      askedQuestions.add(question);
      answered++;
      if (choice.classList.contains('correct')) correct++;
      click(document.getElementById('quiz-test-next-btn'), window);
    } else {
      click(document.querySelector('.quiz-interstitial button'), window);
    }
    assert(answered <= 80, 'Timed test failed to finish');
  }
  assert(answered === 80, 'N5 timed practice must contain all 80 questions');
  const result = document.querySelector('.quiz-results');
  assert(result.querySelector('.overall-status').textContent === correct + ' von 80 Fragen richtig beantwortet', 'Raw result count is incorrect');
  assert(result.querySelector('.overall-score').textContent === Math.round(correct / 80 * 100) + '% richtig', 'Result percentage is incorrect');
  assert(result.querySelectorAll('.quiz-result-row').length === 2, 'Results must include both practiced sections');
  assert(!/BESTANDEN|NICHT BESTANDEN|\/\s*180/.test(result.textContent), 'Practice result must not claim a JLPT score or pass');

  assert(runtimeErrors.length === 0, 'Browser runtime errors: ' + runtimeErrors.map(String).join('; '));
  dom.window.close();
  console.log('Smoke test passed.');
}

run().catch(function (error) {
  console.error(error.stack || String(error));
  process.exit(1);
});
