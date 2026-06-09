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

  // Drive the whole session. Lessons must be JUST-IN-TIME: every lesson step is
  // immediately followed by a grammar question, and none is front-loaded at the
  // start detached from the day's grammar. New vocab/kanji are introduced by an
  // ungraded intro step immediately before their own first question.
  let sawLesson = false;
  let sawIntro = false;
  let expectGrammarNext = false;
  let expectItemNext = null;
  let guard = 0;
  while (document.querySelector('#review-content .review-card-wrap') && guard < 100) {
    guard++;
    const wrap = document.querySelector('#review-content .review-card-wrap');
    if (wrap.classList.contains('review-lesson-step')) {
      sawLesson = true;
      assert(wrap.querySelector('.review-lesson-content .gl-intro'), 'lesson step renders the lesson body inline');
      assert(!wrap.querySelector('.review-grade-row'), 'a lesson step is not graded like a card');
      const before = wrap.textContent;
      click(findButton(document.getElementById('review-content'), 'Verstanden'), window);
      expectGrammarNext = true;
      await waitFor(function () {
        const w = document.querySelector('#review-content .review-card-wrap');
        return !w || w.textContent !== before;
      }, 'lesson advances after continue', 6000);
      continue;
    }
    if (wrap.classList.contains('review-intro-step')) {
      sawIntro = true;
      assert(!wrap.querySelector('.review-grade-row'), 'an intro step is not graded like a card');
      const introMain = (wrap.querySelector('.quiz-prompt-main') || {}).textContent || '';
      assert(introMain, 'intro step presents the item');
      const before = wrap.textContent;
      click(findButton(document.getElementById('review-content'), 'Verstanden'), window);
      expectItemNext = introMain;
      await waitFor(function () {
        const w = document.querySelector('#review-content .review-card-wrap');
        return !w || w.textContent !== before;
      }, 'intro advances after continue', 6000);
      continue;
    }
    // A normal flashcard.
    if (expectGrammarNext) {
      assert(/Grammatik/.test(wrap.textContent),
        'a lesson is immediately followed by its grammar question (just-in-time, not front-loaded)');
      expectGrammarNext = false;
    }
    if (expectItemNext) {
      assert(wrap.textContent.indexOf(expectItemNext) !== -1,
        'an intro is immediately followed by a question about the same item');
      expectItemNext = null;
    }
    const revealBtn = Array.from(wrap.querySelectorAll('button')).find(function (b) { return b.textContent === 'Antwort anzeigen'; });
    if (revealBtn) click(revealBtn, window);
    const before = (wrap.querySelector('.quiz-prompt-main') || {}).textContent;
    const good = wrap.querySelector('.review-grade-btn.grade-good');
    assert(good, 'flashcard exposes a grade button');
    click(good, window);
    await waitFor(function () {
      const w = document.querySelector('#review-content .review-card-wrap');
      return !w || w.classList.contains('review-lesson-step') || w.classList.contains('review-intro-step')
        || (w.querySelector('.quiz-prompt-main') || {}).textContent !== before;
    }, 'card advances after grading', 6000);
  }

  assert(sawLesson, 'a new grammar pattern was taught with a lesson during the session');
  assert(sawIntro, 'new vocab/kanji were introduced with an intro step during the session');

  // The lesson(s) were marked read (so they are not re-taught tomorrow).
  let readMarked = false;
  await waitFor(function () {
    window.SRSStore.getPathState().then(function (p) { readMarked = !!(p && (p.readLessons || []).length > 0); });
    return readMarked;
  }, 'lesson marked read');

  dom.window.close();
  console.log('Lernpfad lesson-first test passed (just-in-time, no front-loading).');
}

run().then(function () { process.exit(0); }).catch(function (err) { console.error(err); process.exit(1); });
