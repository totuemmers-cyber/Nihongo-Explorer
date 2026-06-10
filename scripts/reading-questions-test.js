// Reading comprehension questions test: a passage with READING_QUESTIONS shows
// the collapsed "Verständnis prüfen" block; answering locks each question,
// reveals the correct option, and a score line appears after the last answer.
// Runs the real app in jsdom like smoke-test.
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
        speak() {}
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
    return window.app && window.QuizModule && window.LearningPath;
  }, { description: 'initial app boot' });

  await waitFor(function () {
    return window.app.activeTab === 'path' &&
      document.querySelector('#path-content .path-next-item');
  }, { description: 'app lands on the Lernpfad', timeoutMs: 20000 });

  await waitFor(function () {
    return document.querySelector('.onboarding-overlay');
  }, { description: 'onboarding modal appears' });
  click(Array.from(document.querySelectorAll('.onboarding-overlay button')).find(function (b) {
    return b.textContent.indexOf('Lernpfad starten') !== -1;
  }), window);
  await waitFor(function () {
    return !document.querySelector('.onboarding-overlay');
  }, { description: 'onboarding closes' });

  // Open the reading section and the "Mein Morgen" passage (has questions).
  click(document.querySelector('[data-tab="reading"]'), window);
  await waitFor(function () {
    return document.getElementById('reading-grid').children.length > 0;
  }, { description: 'reading section load' });
  const search = document.getElementById('reading-search-input');
  search.value = 'Mein Morgen';
  search.dispatchEvent(new window.Event('input', { bubbles: true }));
  await waitFor(function () {
    const card = document.querySelector('#reading-grid .reading-card');
    return card && card.textContent.indexOf('Mein Morgen') !== -1;
  }, { description: 'reading search result' });
  click(document.querySelector('#reading-grid .reading-card'), window);
  await waitFor(function () {
    return !document.getElementById('reading-detail-overlay').classList.contains('hidden') &&
      document.querySelector('#reading-detail-questions .reading-quiz');
  }, { description: 'passage opens with the question block' });

  // Collapsed by default; the header expands it.
  const body = document.querySelector('#reading-detail-questions .reading-quiz-body');
  assert(body.classList.contains('collapsed'), 'question block starts collapsed');
  click(document.querySelector('#reading-detail-questions .reading-quiz-header'), window);
  assert(!body.classList.contains('collapsed'), 'header click expands the question block');

  const qBoxes = Array.from(document.querySelectorAll('#reading-detail-questions .reading-quiz-q'));
  assert(qBoxes.length === 3, 'Mein Morgen has 3 questions, got ' + qBoxes.length);

  // Q1: answer correctly ("Um 6 Uhr").
  const q1Right = Array.from(qBoxes[0].querySelectorAll('.reading-quiz-opt')).find(function (b) {
    return b.textContent === 'Um 6 Uhr';
  });
  click(q1Right, window);
  assert(qBoxes[0].classList.contains('locked'), 'answered question locks');
  assert(q1Right.classList.contains('is-correct'), 'correct choice is marked correct');
  // A second click must not change anything.
  const q1Other = qBoxes[0].querySelector('.reading-quiz-opt:not(.is-correct)');
  click(q1Other, window);
  assert(!q1Other.classList.contains('is-wrong'), 'locked question ignores further clicks');

  // Q2: answer wrongly — wrong choice marked, correct one revealed.
  const q2Opts = Array.from(qBoxes[1].querySelectorAll('.reading-quiz-opt'));
  const q2Wrong = q2Opts.find(function (b) { return b.textContent === 'Sie schläft'; });
  const q2Right = q2Opts.find(function (b) { return b.textContent === 'Sie liest ein Buch'; });
  click(q2Wrong, window);
  assert(q2Wrong.classList.contains('is-wrong'), 'wrong choice is marked wrong');
  assert(q2Right.classList.contains('is-correct'), 'correct option is revealed after a wrong answer');

  // Q3: answer correctly -> score line appears (2 of 3).
  const scoreLine = document.querySelector('#reading-detail-questions .reading-quiz-score');
  assert(scoreLine.classList.contains('hidden'), 'score stays hidden until all questions are answered');
  click(Array.from(qBoxes[2].querySelectorAll('.reading-quiz-opt')).find(function (b) {
    return b.textContent === 'Mit Freunden reden';
  }), window);
  assert(!scoreLine.classList.contains('hidden'), 'score line appears after the last answer');
  assert(scoreLine.textContent.indexOf('2 von 3 richtig') !== -1,
    'score reads "2 von 3 richtig", got: ' + scoreLine.textContent);

  // Reset rebuilds the block unanswered and expanded.
  click(document.querySelector('#reading-detail-questions .reading-quiz-reset'), window);
  const freshBody = document.querySelector('#reading-detail-questions .reading-quiz-body');
  assert(freshBody && !freshBody.classList.contains('collapsed'), 'reset re-renders expanded');
  assert(!document.querySelector('#reading-detail-questions .reading-quiz-q.locked'),
    'reset clears all answers');

  // A passage without questions (N4+) shows no block.
  document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  await waitFor(function () {
    return document.getElementById('reading-detail-overlay').classList.contains('hidden');
  }, { description: 'passage overlay closes' });
  search.value = 'Bibliothek';
  search.dispatchEvent(new window.Event('input', { bubbles: true }));
  await waitFor(function () {
    const card = document.querySelector('#reading-grid .reading-card');
    return card && card.textContent.indexOf('Bibliothek') !== -1;
  }, { description: 'N4 passage search result' });
  click(document.querySelector('#reading-grid .reading-card'), window);
  await waitFor(function () {
    return !document.getElementById('reading-detail-overlay').classList.contains('hidden');
  }, { description: 'N4 passage opens' });
  assert(!document.querySelector('#reading-detail-questions .reading-quiz'),
    'passage without questions shows no block');

  dom.window.close();
  console.log('Reading questions test passed.');
}

run().catch(function (error) {
  console.error(error.stack || String(error));
  process.exit(1);
});
