const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const ROOT = path.resolve(__dirname, '..');
const INDEX_PATH = path.join(ROOT, 'index.html');

const BUDGETS = {
  boot: 1000,
  quizHome: 300,
  kanjiFirst: 1200,
  grammarFirst: 1500,
  vocabFirst: 2500,
  vocabComplete: 10000
};

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function waitFor(predicate, description, timeoutMs) {
  const start = Date.now();
  return new Promise(function (resolve, reject) {
    function tick() {
      try {
        if (predicate()) {
          resolve(Date.now() - start);
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

      setTimeout(tick, 10);
    }
    tick();
  });
}

function click(element, window) {
  assert(element, 'Missing element to click');
  element.dispatchEvent(new window.MouseEvent('click', { bubbles: true, cancelable: true }));
}

function createDom() {
  const html = fs.readFileSync(INDEX_PATH, 'utf8');
  return new JSDOM(html, {
    url: 'file:///' + INDEX_PATH.replace(/\\/g, '/'),
    runScripts: 'dangerously',
    resources: 'usable',
    pretendToBeVisual: true,
    beforeParse(window) {
      const storage = new Map();
      Object.defineProperty(window, 'localStorage', {
        configurable: true,
        value: {
          getItem(key) { return storage.has(key) ? storage.get(key) : null; },
          setItem(key, value) { storage.set(String(key), String(value)); },
          removeItem(key) { storage.delete(key); },
          clear() { storage.clear(); }
        }
      });
      window.localStorage.setItem('kanji-sound', 'off');
      window.matchMedia = function () {
        return {
          matches: false,
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
        cancel() {},
        getVoices() { return [{ name: 'Test Japanese', lang: 'ja-JP' }]; },
        resume() {},
        speak() {}
      };
      window.IntersectionObserver = function (callback) {
        this.observe = function () {};
        this.disconnect = function () {};
      };
    }
  });
}

async function measureTab(window, document, tab, readyPredicate, label, budget) {
  const start = Date.now();
  click(document.querySelector('[data-tab="' + tab + '"]'), window);
  await waitFor(readyPredicate, label, Math.max(budget * 2, 5000));
  const elapsed = Date.now() - start;
  assert(elapsed <= budget, label + ' exceeded budget: ' + elapsed + 'ms > ' + budget + 'ms');
  return elapsed;
}

async function run() {
  const dom = createDom();
  const window = dom.window;
  const document = window.document;
  const timings = {};

  window.addEventListener('error', function (event) {
    throw event.error || new Error(event.message);
  });

  timings.boot = await waitFor(function () {
    return window.app && window.QuizModule && document.getElementById('kana-content').children.length > 0;
  }, 'boot', BUDGETS.boot * 2);
  assert(timings.boot <= BUDGETS.boot, 'boot exceeded budget: ' + timings.boot + 'ms > ' + BUDGETS.boot + 'ms');

  timings.quizHome = await measureTab(window, document, 'quiz', function () {
    return document.querySelector('#quiz-content .quiz-home-card.browse') &&
      window.app.sections.vocab.isLoaded === false;
  }, 'quiz home', BUDGETS.quizHome);

  timings.kanjiFirst = await measureTab(window, document, 'kanji', function () {
    return document.getElementById('kanji-grid').children.length > 0;
  }, 'kanji first render', BUDGETS.kanjiFirst);

  timings.grammarFirst = await measureTab(window, document, 'grammar', function () {
    return document.getElementById('grammar-grid').children.length > 0;
  }, 'grammar first render', BUDGETS.grammarFirst);

  timings.vocabFirst = await measureTab(window, document, 'vocab', function () {
    return document.getElementById('vocab-grid').children.length > 0;
  }, 'vocab first render', BUDGETS.vocabFirst);

  timings.vocabComplete = await waitFor(function () {
    return window.app.sections.vocab.isComplete === true &&
      window.app.sections.vocab.allItems.length >= 12000;
  }, 'vocab complete', BUDGETS.vocabComplete);
  assert(timings.vocabComplete <= BUDGETS.vocabComplete, 'vocab complete exceeded budget');

  dom.window.close();
  console.log(JSON.stringify({ budgets: BUDGETS, timings: timings }, null, 2));
}

run().catch(function (error) {
  console.error(error.stack || String(error));
  process.exit(1);
});
