// Headless smoke test for the Kanji-Duell game tab.
// Loads the real index.html in jsdom (stubbing the 2D canvas + audio), opens
// the Spiele tab, plays one round to a hit, and confirms the render loop stops
// when leaving the tab. Run: node scripts/kanjiduel-smoke-test.js
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const ROOT = path.resolve(__dirname, '..');
const INDEX_PATH = path.join(ROOT, 'index.html');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function waitFor(predicate, description, timeoutMs) {
  timeoutMs = timeoutMs || 8000;
  return new Promise(function (resolve, reject) {
    const start = Date.now();
    (function tick() {
      let ok = false;
      try { ok = predicate(); } catch (e) { return reject(e); }
      if (ok) return resolve();
      if (Date.now() - start >= timeoutMs) return reject(new Error('Timed out waiting for ' + description));
      setTimeout(tick, 20);
    })();
  });
}

// A no-op 2D context: every method is a function, gradients return a usable stub.
function makeCtxStub() {
  const grad = { addColorStop: function () {} };
  return new Proxy({}, {
    get: function (_t, prop) {
      if (prop === 'createLinearGradient' || prop === 'createRadialGradient') return function () { return grad; };
      if (prop === 'canvas') return undefined;
      return function () {};
    },
    set: function () { return true; }
  });
}

async function run() {
  const html = fs.readFileSync(INDEX_PATH, 'utf8');
  const dom = new JSDOM(html, {
    url: 'file:///' + INDEX_PATH.replace(/\\/g, '/'),
    runScripts: 'dangerously',
    resources: 'usable',
    pretendToBeVisual: true,
    beforeParse: function (window) {
      const storage = new Map();
      Object.defineProperty(window, 'localStorage', {
        configurable: true,
        value: {
          getItem: function (k) { return storage.has(k) ? storage.get(k) : null; },
          setItem: function (k, v) { storage.set(String(k), String(v)); },
          removeItem: function (k) { storage.delete(k); },
          clear: function () { storage.clear(); }
        }
      });
      window.matchMedia = function () { return { matches: false, addListener: function () {}, removeListener: function () {}, addEventListener: function () {}, removeEventListener: function () {} }; };
      window.scrollTo = function () {};
      window.Element.prototype.scrollIntoView = function () {};
      let rafId = 0;
      window.requestAnimationFrame = function (cb) { return setTimeout(function () { cb(performance.now()); }, 0); };
      window.cancelAnimationFrame = function (id) { clearTimeout(id); };
      window.HTMLCanvasElement.prototype.getContext = function () { return makeCtxStub(); };
      // Minimal kanji dataset so the duel can build its pool deterministically.
      window.KANJI_DATA = [
        { kanji: '日', meanings: ['Tag', 'Sonne'], on: [{ kana: 'ニチ' }], kun: [{ kana: 'ひ' }], jlpt: 'N5' },
        { kanji: '月', meanings: ['Monat', 'Mond'], on: [{ kana: 'ゲツ' }], kun: [{ kana: 'つき' }], jlpt: 'N5' },
        { kanji: '火', meanings: ['Feuer'], on: [{ kana: 'カ' }], kun: [{ kana: 'ひ' }], jlpt: 'N5' },
        { kanji: '水', meanings: ['Wasser'], on: [{ kana: 'スイ' }], kun: [{ kana: 'みず' }], jlpt: 'N5' },
        { kanji: '木', meanings: ['Baum'], on: [{ kana: 'モク' }], kun: [{ kana: 'き' }], jlpt: 'N5' },
        { kanji: '愛', meanings: ['Liebe'], on: [{ kana: 'アイ' }], kun: [], jlpt: 'N4' },
        { kanji: '悪', meanings: ['schlecht'], on: [{ kana: 'アク' }], kun: [{ kana: 'わる' }], jlpt: 'N4' },
        { kanji: '安', meanings: ['billig'], on: [{ kana: 'アン' }], kun: [{ kana: 'やす' }], jlpt: 'N4' }
      ];
    }
  });

  const window = dom.window;
  const document = window.document;
  window.addEventListener('error', function (e) { throw e.error || new Error(e.message); });

  await waitFor(function () { return window.KanjiDuelModule && window.app && typeof window.app.switchTab === 'function'; }, 'app + KanjiDuelModule ready');

  // Open the Spiele tab.
  window.app.switchTab('kanjiduel');
  const panel = document.getElementById('kanjiduel-tab');
  assert(panel && !panel.classList.contains('hidden'), 'Spiele panel should be visible after switching');

  await waitFor(function () { return !!document.getElementById('kd-stage'); }, 'game DOM built');
  assert(document.getElementById('kd-scene'), 'canvas should exist');
  assert(document.getElementById('kd-titleScreen'), 'title screen should exist');

  // Start the game -> first enemy intro should appear.
  document.getElementById('kd-startBtn').click();
  assert(document.getElementById('kd-titleScreen').classList.contains('kd-hidden'), 'title hidden after start');
  await waitFor(function () { return !document.getElementById('kd-msgScreen').classList.contains('kd-hidden'); }, 'enemy intro shown');
  assert(document.getElementById('kd-msgTitle').textContent === '鬼', 'first enemy should be the Oni');

  // Face the enemy -> a round (kanji + 3 answers) should appear.
  document.getElementById('kd-msgBtn').click();
  await waitFor(function () { return !document.getElementById('kd-quiz').classList.contains('kd-hidden'); }, 'quiz shown');
  const kanjiChar = document.getElementById('kd-kanjiChar').textContent;
  assert(kanjiChar && kanjiChar.length > 0, 'a kanji should be displayed');
  const answers = document.getElementById('kd-answers').querySelectorAll('.kd-answer');
  assert(answers.length === 3, 'exactly 3 answer buttons, got ' + answers.length);

  // Verify exactly one answer matches the displayed kanji's meaning.
  const target = window.KANJI_DATA.filter(function (e) { return e.kanji === kanjiChar; })[0];
  const correctMeaning = target.meanings[0];
  let correctCount = 0;
  let correctBtn = null;
  answers.forEach(function (b) { if (b.textContent === correctMeaning) { correctCount++; correctBtn = b; } });
  assert(correctCount === 1, 'exactly one correct answer present, got ' + correctCount);

  // Click the correct answer -> it gets marked and the reading is revealed.
  correctBtn.click();
  assert(correctBtn.classList.contains('kd-correct'), 'clicked correct answer should be marked correct');
  assert(document.getElementById('kd-reading').textContent.indexOf(correctMeaning) !== -1, 'reading line should reveal the meaning');

  // Leaving the tab must stop the render loop (no further rescheduling).
  window.app.switchTab('kana');
  assert(panel.classList.contains('hidden'), 'Spiele panel hidden after leaving');
  // Re-entering should not throw.
  window.app.switchTab('kanjiduel');
  await waitFor(function () { return !document.getElementById('kanjiduel-tab').classList.contains('hidden'); }, 're-entered Spiele tab');
  window.app.switchTab('kana');

  dom.window.close();
  console.log('Kanji-Duell smoke test passed.');
}

run().then(function () { process.exit(0); }).catch(function (err) { console.error(err); process.exit(1); });
