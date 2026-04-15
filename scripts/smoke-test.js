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

  dom.window.close();
  console.log('Smoke test passed.');
}

run().catch(function (error) {
  console.error(error.stack || String(error));
  process.exit(1);
});
