// Listening variant (Hören) test: a graduated vocab meaning card with odd reps
// hides the word, plays it via TTS and offers "Wort anzeigen"; non-graduated
// cards keep the normal text front. Runs the real app in jsdom like smoke-test.
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
    return window.app && window.QuizModule && window.LearningPath;
  }, { description: 'initial app boot' });

  await waitFor(function () {
    return window.app.activeTab === 'path' &&
      document.querySelector('#path-content .path-next-item');
  }, { description: 'app lands on the Lernpfad', timeoutMs: 20000 });

  // Complete the first-run onboarding so it does not block interactions.
  await waitFor(function () {
    return document.querySelector('.onboarding-overlay');
  }, { description: 'onboarding modal appears' });
  click(Array.from(document.querySelectorAll('.onboarding-overlay button')).find(function (b) {
    return b.textContent.indexOf('Lernpfad starten') !== -1;
  }), window);
  await waitFor(function () {
    return !document.querySelector('.onboarding-overlay');
  }, { description: 'onboarding closes' });

  // Add 大丈夫 to the review deck via its detail page (creates all card specs).
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
  }, { description: 'vocab search result' });
  click(document.querySelector('#vocab-grid .vocab-card'), window);
  await waitFor(function () {
    return document.querySelector('.vocab-detail-header .srs-detail-control');
  }, { description: 'vocab SRS detail control' });
  click(document.querySelector('.vocab-detail-header .srs-detail-control'), window);
  await waitFor(function () {
    var btn = document.querySelector('.vocab-detail-header .srs-detail-control');
    return btn && btn.textContent.indexOf('Wiederholung:') !== -1;
  }, { description: 'vocab item added to review' });
  document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));

  // Promote the meaning card to a graduated state with odd reps: exactly the
  // combination that must produce the listening front. All sibling cards stay
  // New, which must keep the normal text front.
  const cards = await window.SRSStore.getAllCards();
  const meaningCard = cards.find(function (c) {
    return c.section === 'vocab' && c.promptType === 'meaning' && c.itemLabel === '大丈夫';
  });
  assert(meaningCard, 'meaning card exists for 大丈夫');
  meaningCard.state = 'Review';
  meaningCard.reps = 1;
  meaningCard.intervalDays = 3;
  meaningCard.dueAt = new Date().toISOString();
  // Sibling cards are staggered into future days on add; pull them into today so
  // the drill queue contains them (the Lernpfad's activeCards excludes New cards
  // whose dueAt hasn't come).
  cards.forEach(function (c) {
    if (c !== meaningCard) c.dueAt = new Date().toISOString();
  });
  await window.SRSStore.putCards(cards);

  // Run the all-active cram drill; the Review-state card sorts ahead of New ones.
  click(document.querySelector('[data-tab="path"]'), window);
  await waitFor(function () {
    return Array.from(document.querySelectorAll('#path-content button')).some(function (b) {
      return b.textContent.indexOf('Alle aktiven Karten üben') !== -1;
    });
  }, { description: 'Lernpfad shows the all-active drill' });
  spokenTexts.length = 0;
  click(Array.from(document.querySelectorAll('#path-content button')).find(function (b) {
    return b.textContent.indexOf('Alle aktiven Karten üben') !== -1;
  }), window);
  await waitFor(function () {
    return document.querySelector('#review-content .review-card-wrap');
  }, { description: 'review card renders' });

  const wrap = document.querySelector('#review-content .review-card-wrap');
  const badge = wrap.querySelector('.quiz-type-badge');
  assert(badge && badge.textContent === 'Hören', 'graduated meaning card shows the Hören badge, got: ' + (badge && badge.textContent));
  const promptMain = wrap.querySelector('.quiz-prompt-main');
  assert(promptMain && promptMain.classList.contains('hidden'), 'word is hidden on the listening front');
  assert(wrap.querySelector('.review-listen-row'), 'listening front offers the play row');
  await waitFor(function () {
    return spokenTexts.indexOf('だいじょうぶ') !== -1;
  }, { description: 'listening card auto-plays the word' });

  // "Wort anzeigen" converts it back to a visual meaning card.
  click(Array.from(wrap.querySelectorAll('button')).find(function (b) {
    return b.textContent === 'Wort anzeigen';
  }), window);
  assert(!promptMain.classList.contains('hidden'), 'Wort anzeigen reveals the word');

  // Reveal + grade; the following card is New and must use the text front again.
  click(Array.from(wrap.querySelectorAll('button')).find(function (b) {
    return b.textContent === 'Antwort anzeigen';
  }), window);
  await waitFor(function () {
    return !wrap.querySelector('.review-grade-row').classList.contains('hidden');
  }, { description: 'listening card reveals grades' });
  click(wrap.querySelector('.review-grade-btn.grade-good'), window);
  await waitFor(function () {
    const w = document.querySelector('#review-content .review-card-wrap');
    return w && w !== wrap;
  }, { description: 'next card renders' });
  const nextWrap = document.querySelector('#review-content .review-card-wrap');
  const nextBadge = nextWrap.querySelector('.quiz-type-badge');
  assert(nextBadge && nextBadge.textContent !== 'Hören', 'New sibling card keeps the text front');
  const nextMain = nextWrap.querySelector('.quiz-prompt-main');
  assert(!nextMain || !nextMain.classList.contains('hidden'), 'New sibling card shows its prompt text');

  dom.window.close();
  console.log('Listening variant test passed.');
}

run().catch(function (error) {
  console.error(error.stack || String(error));
  process.exit(1);
});
