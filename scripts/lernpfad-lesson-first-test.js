// E2E (jsdom): the "Heute lernen" session teaches a new grammar pattern with an
// inline lesson step *before* its flashcard, and marks the lesson read on continue.
// Drives the real srs-ui session runner + real GrammarLessons rendering.
// Run: node scripts/lernpfad-lesson-first-test.js
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const ROOT = path.resolve(__dirname, '..');
const INDEX_PATH = path.join(ROOT, 'index.html');

function assert(cond, msg) { if (!cond) throw new Error(msg); }
function waitFor(pred, desc, timeoutMs) {
  timeoutMs = timeoutMs || 15000;
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

  await waitFor(function () { return window.app && window.SRSUI && typeof window.SRSUI.startSession === 'function'; }, 'app + SRSUI ready');

  // Load the real grammar lessons and pick a lesson that teaches a grammar pattern.
  await window.app.ensureGrammarLessonsLoaded();
  assert(window.GrammarLessons && window.GrammarLessons.getLessons, 'GrammarLessons available');
  const lessons = window.GrammarLessons.getLessons();
  const lesson = lessons.find(function (l) { return l.grammarIds && l.grammarIds.length; });
  assert(lesson, 'a lesson with linked grammar exists');
  const grammarId = lesson.grammarIds[0];
  const grammarKey = 'grammar:' + grammarId;

  const renderedHtml = window.GrammarLessons.renderContent(lesson.id);
  assert(renderedHtml && renderedHtml.indexOf('gl-intro') !== -1, 'renderContent returns the lesson body');

  // A minimal-but-real grammar flashcard, and the lesson-first step that precedes it
  // (exactly the shape learning-path.startToday builds).
  const now = new Date().toISOString();
  const grammarCard = {
    cardKey: grammarKey + '#meaning', itemKey: grammarKey, section: 'grammar',
    promptType: 'meaning', label: 'Bedeutung', level: lesson.level || 'N5',
    state: 'New', ease: 2.5, intervalDays: 0, reps: 0, lapses: 0,
    dueAt: now, suspended: false, orphaned: false,
    question: { prompt: 'Was bedeutet dieses Grammatikmuster?', promptMain: 'パターン', answer: 'Bedeutung' }
  };
  const lessonStep = {
    kind: 'lesson', lessonId: lesson.id, title: lesson.title, subtitle: lesson.subtitle || '',
    level: lesson.level || 'N5', precedesItemKey: grammarKey, itemKey: 'lesson:' + lesson.id
  };

  // Run the session (lesson step listed first or last — weaving decides the order).
  window.SRSUI.startSession([lessonStep, grammarCard], true);

  // 1) The lesson step renders first, with the real lesson content inline.
  await waitFor(function () { return document.querySelector('#review-content .review-lesson-step'); }, 'lesson step rendered first');
  const stepEl = document.querySelector('#review-content .review-lesson-step');
  assert(stepEl.querySelector('.review-lesson-content .gl-intro'), 'lesson step shows the inline lesson body');
  assert(stepEl.textContent.indexOf(lesson.title) !== -1, 'lesson step shows the lesson title');
  assert(!document.querySelector('#review-content .review-grade-row'), 'a lesson step has no grade buttons (taught, not graded)');

  // 2) Continue → the grammar flashcard is shown next.
  const contBtn = Array.from(document.querySelectorAll('#review-content button')).find(function (b) { return b.textContent.indexOf('Verstanden') !== -1; });
  assert(contBtn, '"Verstanden — weiter" button present');
  contBtn.click();
  await waitFor(function () {
    const wrap = document.querySelector('#review-content .review-card-wrap');
    return wrap && !wrap.classList.contains('review-lesson-step') && /Grammatikmuster/.test(wrap.textContent);
  }, 'grammar flashcard shown after the lesson');
  assert(!document.querySelector('#review-content .review-lesson-step'), 'lesson step is gone once the card is shown');

  // 3) Advancing past the lesson marked it read (so it is not re-taught).
  let readMarked = false;
  await waitFor(function () {
    window.SRSStore.getPathState().then(function (p) { readMarked = !!(p && (p.readLessons || []).indexOf(lesson.id) !== -1); });
    return readMarked;
  }, 'lesson marked read after continue');

  dom.window.close();
  console.log('Lernpfad lesson-first test passed.');
}

run().then(function () { process.exit(0); }).catch(function (err) { console.error(err); process.exit(1); });
