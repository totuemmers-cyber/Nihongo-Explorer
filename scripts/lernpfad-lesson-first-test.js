// E2E (jsdom): drives the REAL "Heute lernen" flow and asserts a new grammar
// pattern is taught with an inline lesson step BEFORE its flashcard — including at
// N3, where no per-pattern lesson links exist and the level-fallback must kick in.
// Run: node scripts/lernpfad-lesson-first-test.js
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const ROOT = path.resolve(__dirname, '..');
const INDEX_PATH = path.join(ROOT, 'index.html');

function assert(cond, msg) { if (!cond) throw new Error(msg); }
function waitFor(pred, desc, timeoutMs) {
  timeoutMs = timeoutMs || 20000;
  return new Promise(function (resolve, reject) {
    const start = Date.now();
    (function tick() {
      let ok = false;
      try { ok = pred(); } catch (e) { return reject(e); }
      if (ok) return resolve();
      if (Date.now() - start >= timeoutMs) return reject(new Error('Timed out waiting for ' + desc));
      setTimeout(tick, 25);
    })();
  });
}
function click(el, window) {
  if (typeof el.click === 'function') el.click();
  else el.dispatchEvent(new window.MouseEvent('click', { bubbles: true, cancelable: true }));
}
function findButton(root, text) {
  return Array.from(root.querySelectorAll('button')).find(function (b) { return b.textContent.indexOf(text) !== -1; });
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
      window.requestAnimationFrame = function (cb) { return setTimeout(function () { cb(Date.now()); }, 0); };
      window.cancelAnimationFrame = function (id) { clearTimeout(id); };
      window.SpeechSynthesisUtterance = function (t) { this.text = t; };
      window.speechSynthesis = { getVoices: function () { return []; }, speak: function () {}, cancel: function () {}, resume: function () {} };
      window.IntersectionObserver = function () { this.observe = function () {}; this.disconnect = function () {}; };
    }
  });

  const window = dom.window;
  const document = window.document;
  window.addEventListener('error', function (e) { throw e.error || new Error(e.message); });

  await waitFor(function () { return window.app && window.SRSUI && window.LearningPath && window.SRSStore; }, 'app modules ready');

  // Complete first-run onboarding if it appears.
  await waitFor(function () {
    return document.querySelector('.onboarding-overlay') || document.querySelector('#path-content .path-next-item');
  }, 'path or onboarding shown', 25000);
  const onbStart = document.querySelector('.onboarding-overlay') && findButton(document.querySelector('.onboarding-overlay'), 'Lernpfad starten');
  if (onbStart) {
    click(onbStart, window);
    await waitFor(function () { return !document.querySelector('.onboarding-overlay'); }, 'onboarding closed');
  }

  // Force the probe scenario: start level N3 (no per-pattern lesson links exist there).
  const existing = (await window.SRSStore.getPathState()) || {};
  existing.schemaV = 1;
  existing.startLevel = 'N3';
  existing.readLessons = [];
  await window.SRSStore.savePathState(existing);
  await window.app.ensureGrammarLessonsLoaded();

  // Re-render the Lernpfad with the new level and wait for the daily plan.
  window.LearningPath.onTabActivate();
  await waitFor(function () {
    const btn = findButton(document.getElementById('path-content'), 'Heute lernen');
    return btn && !btn.disabled && /neue Karten/.test(btn.textContent);
  }, 'N3 Lernpfad offers "Heute lernen" with new cards', 25000);

  // Launch the session.
  click(findButton(document.getElementById('path-content'), 'Heute lernen'), window);
  await waitFor(function () {
    return window.app.activeTab === 'review' && document.querySelector('#review-content .review-card-wrap');
  }, 'session launches into the review runner');

  // The very first item must be a taught lesson step (fallback lessons are front-placed),
  // NOT a grammar question — this is the regression the user hit at N3.
  const first = document.querySelector('#review-content .review-card-wrap');
  assert(first.classList.contains('review-lesson-step'),
    'session opens with a lesson step, not an untaught question (got: ' + (first.textContent || '').slice(0, 80) + ')');
  assert(first.querySelector('.review-lesson-content .gl-intro'), 'the lesson body is rendered inline');
  const lessonTitle = (first.querySelector('.quiz-prompt-main') || {}).textContent;
  assert(lessonTitle, 'the lesson step shows a title');
  assert(!document.querySelector('#review-content .review-grade-row'), 'a lesson step is not graded like a card');

  // Continue → the lesson is marked read so it is not re-taught.
  click(findButton(document.getElementById('review-content'), 'Verstanden'), window);
  let readMarked = false;
  await waitFor(function () {
    window.SRSStore.getPathState().then(function (p) { readMarked = !!(p && (p.readLessons || []).length > 0); });
    return readMarked;
  }, 'lesson marked read after continue');

  // And the session continues into real cards afterwards.
  await waitFor(function () {
    return document.querySelector('#review-content .review-card-wrap') || document.querySelector('#review-content .review-title');
  }, 'session proceeds after the lesson');

  dom.window.close();
  console.log('Lernpfad lesson-first test passed (real N3 flow).');
}

run().then(function () { process.exit(0); }).catch(function (err) { console.error(err); process.exit(1); });
