const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const ROOT = path.resolve(__dirname, '..');
const INDEX_PATH = path.join(ROOT, 'index.html');

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
    resources: 'usable',
    pretendToBeVisual: true,
    beforeParse(window) {
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
      window.Element.prototype.scrollIntoView = function () {};
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
        this.observe = function () {
          callback([{ isIntersecting: true }]);
        };
        this.disconnect = function () {};
      };
    }
  });

  const window = dom.window;
  const document = window.document;

  window.addEventListener('error', function (event) {
    throw event.error || new Error(event.message);
  });

  await waitFor(function () {
    return window.app && window.QuizModule && document.getElementById('kana-content').children.length > 0;
  }, { description: 'initial app boot' });

  assert(window.app.sections.vocab.isLoaded === false, 'Vocab should not be loaded during initial boot');
  assert(window.app.sections.kanji.isLoaded === false, 'Kanji should not be loaded during initial boot');
  assert(window.app.sections.grammar.isLoaded === false, 'Grammar should not be loaded during initial boot');

  click(document.querySelector('[data-tab="quiz"]'), window);
  await waitFor(function () {
    return document.querySelector('#quiz-content .quiz-home-card.browse') &&
      window.app.sections.vocab.isLoaded === false &&
      window.app.sections.kanji.isLoaded === false &&
      window.app.sections.grammar.isLoaded === false;
  }, { description: 'quiz home without data preload' });

  click(document.querySelector('#quiz-content .quiz-home-card.browse'), window);
  await waitFor(function () {
    return document.querySelector('#quiz-question-area .quiz-question-card') &&
      window.app.isQuizDataLoaded() === true;
  }, { description: 'quiz browse lazy data load' });

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

  await waitFor(function () {
    return document.querySelector('.vocab-detail-header .srs-detail-control');
  }, { description: 'vocab SRS detail control' });
  click(document.querySelector('.vocab-detail-header .srs-detail-control'), window);
  await waitFor(function () {
    var btn = document.querySelector('.vocab-detail-header .srs-detail-control');
    return btn && btn.textContent.indexOf('Wiederholung:') !== -1;
  }, { description: 'vocab item added to review' });
  await waitFor(function () {
    return Array.from(document.querySelectorAll('.srs-popover button')).some(function (btn) {
      return btn.textContent.indexOf('Aussetzen') !== -1;
    });
  }, { description: 'review popover suspend action' });
  click(Array.from(document.querySelectorAll('.srs-popover button')).find(function (btn) {
    return btn.textContent.indexOf('Aussetzen') !== -1;
  }), window);
  await waitFor(function () {
    var btn = document.querySelector('.vocab-detail-header .srs-detail-control');
    return btn && btn.textContent.indexOf('Ausgesetzt') !== -1 &&
      Array.from(document.querySelectorAll('.srs-popover button')).some(function (popBtn) {
        return popBtn.textContent.indexOf('Wieder aktivieren') !== -1;
      });
  }, { description: 'vocab item suspended from review' });
  click(Array.from(document.querySelectorAll('.srs-popover button')).find(function (btn) {
    return btn.textContent.indexOf('Wieder aktivieren') !== -1;
  }), window);
  await waitFor(function () {
    var btn = document.querySelector('.vocab-detail-header .srs-detail-control');
    return btn && btn.textContent.indexOf('Wiederholung:') !== -1 && btn.textContent.indexOf('Ausgesetzt') === -1;
  }, { description: 'vocab item reactivated for review' });
  click(document.getElementById('vocab-close-detail'), window);
  await waitFor(function () {
    return document.getElementById('vocab-detail-overlay').classList.contains('hidden');
  }, { description: 'vocab overlay close before review' });

  click(document.querySelector('[data-tab="review"]'), window);
  await waitFor(function () {
    return document.querySelector('#review-content .review-stat') &&
      document.getElementById('review-content').textContent.indexOf('Aktive Karten') !== -1;
  }, { description: 'review home renders' });
  click(Array.from(document.querySelectorAll('#review-content button')).find(function (btn) {
    return btn.textContent.indexOf('Alle aktiven Karten üben') !== -1;
  }), window);
  await waitFor(function () {
    return document.querySelector('#review-content .review-card-wrap');
  }, { description: 'review card renders' });
  click(document.querySelector('#review-content .quiz-btn-reveal'), window);
  await waitFor(function () {
    return !document.querySelector('#review-content .review-grade-row').classList.contains('hidden');
  }, { description: 'review answer revealed' });
  click(document.querySelector('#review-content .grade-good'), window);
  await waitFor(function () {
    return document.querySelector('#review-content .review-card-wrap') ||
      (document.querySelector('#review-content .review-stat') &&
        document.getElementById('review-content').textContent.indexOf('Aktive Karten') !== -1);
  }, { description: 'review grade saved' });
  if (document.querySelector('#review-content .review-card-wrap')) {
    click(Array.from(document.querySelectorAll('#review-content button')).find(function (btn) {
      return btn.textContent.indexOf('Aus Wiederholung entfernen') !== -1;
    }), window);
    await waitFor(function () {
      var stats = Array.from(document.querySelectorAll('#review-content .review-stat'));
      return stats.some(function (stat) {
        return stat.textContent.indexOf('Aktive Karten') !== -1 &&
          stat.querySelector('.review-stat-value') &&
          stat.querySelector('.review-stat-value').textContent === '0';
      });
    }, { description: 'review item removed during review' });
  }

  click(document.querySelector('[data-tab="vocab"]'), window);

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

  // === Lernpfad (Learning Path) ===
  click(document.querySelector('[data-tab="path"]'), window);
  await waitFor(function () {
    return document.querySelector('#path-content .path-focus') &&
      document.querySelector('#path-content .path-level-row') &&
      document.querySelector('#path-content .path-next-item');
  }, { description: 'Lernpfad page renders with progress and recommendations' });
  assert(document.querySelector('#path-content .path-focus-level').textContent.length > 0,
    'Lernpfad shows a current level');

  // Progress rows are labelled and a legend explains the segment colours
  const levelBadge = document.querySelector('#path-content .path-level-badge');
  assert(levelBadge && levelBadge.textContent.length > 0,
    'Lernpfad progress rows show a JLPT level label');
  assert(document.querySelector('#path-content .path-legend .path-legend-item'),
    'Lernpfad shows a segment legend');

  // Grammar lessons block renders the next few lessons (capped at 3) + a "see all" link
  await waitFor(function () {
    return document.querySelector('#path-content .path-lessons .path-lesson-item');
  }, { description: 'Lernpfad grammar-lessons block renders lessons' });
  assert(document.querySelectorAll('#path-content .path-lessons .path-lesson-item').length <= 3,
    'Lernpfad shows at most 3 grammar lessons');
  assert(Array.from(document.querySelectorAll('#path-content .path-lessons-more-link')).some(function (b) {
    return b.textContent.indexOf('Alle Lektionen ansehen') !== -1;
  }), 'Lernpfad has an "Alle Lektionen ansehen" link');

  const lessonOpen = document.querySelector('#path-content .path-lesson-open');
  assert(lessonOpen, 'Lernpfad lesson row has an open button');
  click(lessonOpen, window);
  await waitFor(function () {
    return window.app.activeTab === 'grammar' &&
      document.querySelector('.gl-card-body:not(.collapsed)');
  }, { description: 'clicking a Lernpfad lesson opens it in the Lektionen view' });
  const afterRead = await window.SRSStore.getPathState();
  assert(afterRead && Array.isArray(afterRead.readLessons) && afterRead.readLessons.length > 0,
    'opening a lesson marks it read in pathState');

  // Back to the Lernpfad for the study-session flow
  click(document.querySelector('[data-tab="path"]'), window);
  await waitFor(function () {
    return document.querySelector('#path-content .path-focus');
  }, { description: 'return to Lernpfad after opening a lesson' });

  const learnBtn = Array.from(document.querySelectorAll('#path-content button')).find(function (btn) {
    return btn.textContent.indexOf('Heute lernen') !== -1;
  });
  assert(learnBtn, 'Lernpfad has a "Heute lernen" button');
  assert(!learnBtn.disabled, 'Lernpfad "Heute lernen" is enabled when content is available');
  assert(learnBtn.textContent.indexOf('neue Einträge') !== -1 && learnBtn.textContent.indexOf('Karten') !== -1,
    'focus CTA honestly labels items + card estimate ("neue Einträge … Karten")');

  click(learnBtn, window);
  await waitFor(function () {
    return window.app.activeTab === 'review' &&
      document.querySelector('#review-content .review-card-wrap');
  }, { description: 'Lernpfad launches a study session into the review runner' });

  let pathCount = 0;
  for (let i = 0; i < 40 && pathCount === 0; i++) {
    const sp = await window.SRSStore.getPathState();
    pathCount = sp && sp.newDaily ? sp.newDaily.count : 0;
    if (pathCount === 0) await new Promise(function (r) { setTimeout(r, 25); });
  }
  assert(pathCount > 0, 'Lernpfad records new items studied in pathState');

  // === Daily reset (Lernpfad) refills today's new-item budget ===
  click(document.querySelector('[data-tab="path"]'), window);
  await waitFor(function () {
    return document.querySelector('#path-content .path-adjust');
  }, { description: 'Lernpfad adjust block renders' });
  const dailyBtn = Array.from(document.querySelectorAll('#path-content button')).find(function (btn) {
    return btn.textContent.indexOf('Tagesfortschritt zurücksetzen') !== -1;
  });
  assert(dailyBtn, 'Lernpfad has a daily-reset button');
  assert(!dailyBtn.disabled, 'daily-reset is enabled after new items were studied today');
  click(dailyBtn, window);
  let dailyCount = -1;
  for (let i = 0; i < 40 && dailyCount !== 0; i++) {
    const sp = await window.SRSStore.getPathState();
    dailyCount = sp && sp.newDaily ? sp.newDaily.count : -1;
    if (dailyCount !== 0) await new Promise(function (r) { setTimeout(r, 25); });
  }
  assert(dailyCount === 0, 'daily reset clears today\'s new-item count');

  // === Full reset (review settings) wipes learning progress ===
  click(document.querySelector('[data-tab="review"]'), window);
  await waitFor(function () {
    return document.querySelector('#review-content .review-stat');
  }, { description: 'review home renders before settings' });
  const settingsBtn = Array.from(document.querySelectorAll('#review-content button')).find(function (btn) {
    return btn.textContent.indexOf('Sicherung & Einstellungen') !== -1;
  });
  assert(settingsBtn, 'review home has a settings button');
  click(settingsBtn, window);
  await waitFor(function () {
    return Array.from(document.querySelectorAll('#review-content button')).some(function (btn) {
      return btn.textContent.indexOf('Gesamten Fortschritt zurücksetzen') !== -1;
    });
  }, { description: 'settings page shows the reset button' });

  // Diagnostics self-check shows counts for the cards added earlier
  const diagBtn = Array.from(document.querySelectorAll('#review-content button')).find(function (btn) {
    return btn.textContent === 'Fortschritt prüfen';
  });
  assert(diagBtn, 'settings page has a "Fortschritt prüfen" button');
  click(diagBtn, window);
  await waitFor(function () {
    var box = diagBtn.parentElement;
    return box && box.textContent.indexOf('Aktive Karten:') !== -1;
  }, { description: 'diagnostics reports card counts' });

  const resetBtn = Array.from(document.querySelectorAll('#review-content button')).find(function (btn) {
    return btn.textContent.indexOf('Gesamten Fortschritt zurücksetzen') !== -1;
  });
  click(resetBtn, window); // window.confirm is stubbed to true
  let resetCards = -1, resetPath = 'x';
  for (let i = 0; i < 80 && !(resetCards === 0 && resetPath === null); i++) {
    resetCards = (await window.SRSStore.getAllCards()).length;
    resetPath = await window.SRSStore.getPathState();
    if (!(resetCards === 0 && resetPath === null)) await new Promise(function (r) { setTimeout(r, 25); });
  }
  assert(resetCards === 0, 'full reset clears all SRS cards');
  assert(resetPath === null, 'full reset clears pathState');
  await waitFor(function () {
    return document.getElementById('review-due-badge').classList.contains('hidden');
  }, { description: 'due badge is cleared after a full reset' });
  await waitFor(function () {
    return document.querySelector('#review-content .review-danger-box') &&
      document.querySelector('#review-content .review-danger-box').textContent.indexOf('zurückgesetzt') !== -1;
  }, { description: 'reset reports an honest status message' });

  dom.window.close();
  console.log('Smoke test passed.');
}

run().catch(function (error) {
  console.error(error.stack || String(error));
  process.exit(1);
});
