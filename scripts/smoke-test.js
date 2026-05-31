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

  // Default landing is the Lernpfad (which loads its sections to compute progress).
  await waitFor(function () {
    return window.app.activeTab === 'path' &&
      document.querySelector('#path-content .path-next-item');
  }, { description: 'app lands on the Lernpfad with recommendations', timeoutMs: 20000 });

  // === 2C: a brand-new user gets a first-run onboarding modal; complete it ===
  await waitFor(function () {
    return document.querySelector('.onboarding-overlay');
  }, { description: 'first-run onboarding modal appears' });
  const onbStart = Array.from(document.querySelectorAll('.onboarding-overlay button')).find(function (b) {
    return b.textContent.indexOf('Lernpfad starten') !== -1;
  });
  assert(onbStart, 'onboarding offers a start button');
  click(onbStart, window);
  await waitFor(function () {
    return !document.querySelector('.onboarding-overlay');
  }, { description: 'onboarding closes after starting' });
  const onbPath = await window.SRSStore.getPathState();
  assert(onbPath && onbPath.startLevel, 'onboarding writes a pathState (so it does not reappear)');

  // Clicking a to-learn item opens its detail overlay IN PLACE (no tab switch),
  // and closing returns straight to the Lernpfad. The card's main area is the
  // .path-next-open button (the ✓ "kenne ich" control sits beside it).
  click(document.querySelector('#path-content .path-next-item .path-next-open'), window);
  await waitFor(function () {
    return document.querySelector('.detail-overlay:not(.hidden)');
  }, { description: 'to-learn item opens a detail overlay' });
  assert(window.app.activeTab === 'path', 'opening a to-learn item stays on the Lernpfad');
  document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  await waitFor(function () {
    return !document.querySelector('.detail-overlay:not(.hidden)');
  }, { description: 'closing the overlay returns to the Lernpfad' });
  assert(window.app.activeTab === 'path', 'still on the Lernpfad after closing the overlay');

  // Two-level navigation: reference sections live under group tabs (Schrift/Wortschatz).
  assert(document.querySelector('[data-group="schrift"]'), 'top nav has the Schrift group');
  assert(document.getElementById('subtab-bar').classList.contains('hidden'),
    'subnav is hidden on the Lernpfad');
  click(document.querySelector('[data-group="schrift"]'), window);
  await waitFor(function () {
    return !document.getElementById('subtab-bar').classList.contains('hidden') &&
      window.app.activeTab === 'kana';
  }, { description: 'Schrift group opens its subnav and its default section' });
  assert(document.querySelector('.subtab-btn[data-tab="kanji"]'), 'Schrift subnav offers Kanji');

  click(document.querySelector('[data-tab="quiz"]'), window);
  await waitFor(function () {
    return document.querySelector('#quiz-content .quiz-home-card.browse');
  }, { description: 'quiz home renders' });

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

  // The review home is now folded into the Lernpfad dashboard: its stats and the
  // "Alle aktiven Karten üben" action live in #path-content, while the review
  // session itself still runs on the (nav-less) #review-content surface.
  click(document.querySelector('[data-tab="path"]'), window);
  await waitFor(function () {
    return document.querySelector('#path-content .review-stat') &&
      document.getElementById('path-content').textContent.indexOf('Aktive Karten') !== -1;
  }, { description: 'learning path shows review stats' });
  click(Array.from(document.querySelectorAll('#path-content button')).find(function (btn) {
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
      (document.querySelector('#path-content .review-stat') &&
        document.getElementById('path-content').textContent.indexOf('Aktive Karten') !== -1);
  }, { description: 'review grade saved' });
  if (document.querySelector('#review-content .review-card-wrap')) {
    click(Array.from(document.querySelectorAll('#review-content button')).find(function (btn) {
      return btn.textContent.indexOf('Aus Wiederholung entfernen') !== -1;
    }), window);
    // Emptying the queue returns to the Lernpfad, where the stats now read 0.
    await waitFor(function () {
      var stats = Array.from(document.querySelectorAll('#path-content .review-stat'));
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

  // Grammar lessons are already initialized — the Lernpfad landing loads them for the
  // Grammatiklektionen block. Verify the Lektionen view renders lesson cards.
  assert(window.__grammarLessonsInitialized === true,
    'grammar lessons are initialized via the Lernpfad landing');
  click(document.querySelector('#grammar-view-toggle [data-view="lessons"]'), window);
  await waitFor(function () {
    return document.querySelector('#grammar-tab .gl-card[data-lesson]');
  }, { description: 'grammar lessons view renders lesson cards' });

  // === Lernpfad (Learning Path) ===
  click(document.querySelector('[data-tab="path"]'), window);
  await waitFor(function () {
    return document.querySelector('#path-content .path-focus') &&
      document.querySelector('#path-content .path-level-row') &&
      document.querySelector('#path-content .path-next-item');
  }, { description: 'Lernpfad page renders with progress and recommendations' });
  assert(document.querySelector('#path-content .path-focus-level').textContent.length > 0,
    'Lernpfad shows a current level');

  // Each recommendation carries a per-item "kenne ich" (✓) control, and the focus
  // block shows the daily new-card goal as a gauge bar.
  assert(document.querySelector('#path-content .path-next-item .path-next-known'),
    'recommendations have a per-item "kenne ich" control');
  assert(document.querySelector('#path-content .path-focus .path-stat-bar'),
    'focus block shows the daily new-card goal as a gauge');

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
  assert(learnBtn.textContent.indexOf('neue Karten') !== -1 && learnBtn.textContent.indexOf('Wiederholungen') !== -1,
    'focus CTA labels new cards + reviews ("… neue Karten · … Wiederholungen")');

  click(learnBtn, window);
  await waitFor(function () {
    return window.app.activeTab === 'review' &&
      document.querySelector('#review-content .review-card-wrap');
  }, { description: 'Lernpfad launches a study session into the review runner' });

  // === 1C: drive the self-grade session to completion -> end-of-session summary ===
  async function advanceCard() {
    const wrap = document.querySelector('#review-content .review-card-wrap');
    if (!wrap) return false;
    const revealBtn = Array.from(wrap.querySelectorAll('button')).find(function (b) { return b.textContent === 'Antwort anzeigen'; });
    if (revealBtn && !revealBtn.classList.contains('hidden')) click(revealBtn, window);
    const before = (wrap.querySelector('.quiz-prompt-main') || {}).textContent;
    const goodBtn = wrap.querySelector('.review-grade-btn.grade-good');
    assert(goodBtn, 'review card exposes a grade button');
    click(goodBtn, window);
    await waitFor(function () {
      const w = document.querySelector('#review-content .review-card-wrap');
      return !w || (w.querySelector('.quiz-prompt-main') || {}).textContent !== before;
    }, { description: 'review advances after grading', timeoutMs: 5000 });
    return true;
  }
  let drainGuard = 0;
  while (document.querySelector('#review-content .review-card-wrap') && drainGuard < 120) {
    drainGuard++;
    await advanceCard();
  }
  await waitFor(function () {
    const t = document.querySelector('#review-content .review-title');
    return t && t.textContent.indexOf('Session abgeschlossen') !== -1;
  }, { description: 'finished session shows an end-of-session summary' });
  assert(document.querySelector('#review-content .review-stats'), 'summary shows result stats');
  const contBtn = Array.from(document.querySelectorAll('#review-content button')).find(function (b) {
    return b.textContent.indexOf('Weiter zum Lernpfad') !== -1;
  });
  assert(contBtn, 'summary offers a "Weiter zum Lernpfad" button');
  click(contBtn, window);
  await waitFor(function () {
    return window.app.activeTab === 'path' &&
      Array.from(document.querySelectorAll('#path-content button')).some(function (b) { return b.textContent.indexOf('Alle aktiven Karten üben') !== -1; });
  }, { description: 'summary returns to the Lernpfad' });

  // === 1A: typed answer mode shows an input for checkable cards ===
  const typeSettings = await window.SRSStore.getSettings();
  typeSettings.answerMode = 'type';
  await window.SRSStore.saveSettings(typeSettings);
  const drillBtn = Array.from(document.querySelectorAll('#path-content button')).find(function (b) {
    return b.textContent.indexOf('Alle aktiven Karten üben') !== -1;
  });
  assert(drillBtn && !drillBtn.disabled, 'Lernpfad offers a drill over all active cards');
  click(drillBtn, window);
  await waitFor(function () { return document.querySelector('#review-content .review-card-wrap'); }, { description: 'typed drill starts' });
  let sawInput = false, typeGuard = 0;
  while (typeGuard < 80) {
    typeGuard++;
    const w = document.querySelector('#review-content .review-card-wrap');
    if (!w) break;
    if (w.querySelector('.review-answer-input')) { sawInput = true; break; }
    if (!(await advanceCard())) break; // non-checkable card -> grade past it
  }
  assert(sawInput, 'typed answer mode shows an input field for a checkable card');
  click(document.querySelector('[data-tab="path"]'), window); // abandon the drill
  await waitFor(function () { return document.querySelector('#path-content .path-adjust'); }, { description: 'back on the Lernpfad after the typed drill' });
  // Restore self-grade mode so later steps are unaffected.
  typeSettings.answerMode = 'reveal';
  await window.SRSStore.saveSettings(typeSettings);

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

  // Now that progress exists but no backup is connected (jsdom = "manual" mode),
  // the Lernpfad surfaces a prominent data-loss warning with an export action.
  const backupWarning = document.querySelector('#path-content .path-backup-warning');
  assert(backupWarning, 'Lernpfad warns when progress is not backed up');
  assert(Array.from(backupWarning.querySelectorAll('button')).some(function (b) {
    return b.textContent.indexOf('exportieren') !== -1;
  }), 'backup warning offers an export action');

  // The "So lerne ich" block exposes pace (new cards/day) and start-level controls.
  assert(document.getElementById('path-new-per-day'), 'Lernpfad has a daily new-card pace control');
  assert(document.getElementById('path-start-level'), 'Lernpfad has a start-level control');

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
  // Settings are reached from the Lernpfad's "Sicherung & Einstellungen" button,
  // which opens the settings screen on the #review-content surface.
  const settingsBtn = Array.from(document.querySelectorAll('#path-content button')).find(function (btn) {
    return btn.textContent.indexOf('Sicherung & Einstellungen') !== -1;
  });
  assert(settingsBtn, 'learning path has a settings button');
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

  // === Statistik dashboard is folded into the Lernpfad as a collapsible section ===
  click(document.querySelector('[data-tab="path"]'), window);
  let statsHeader;
  await waitFor(function () {
    statsHeader = document.querySelector('#path-content .path-stats-header');
    return !!statsHeader;
  }, { description: 'Lernpfad shows a collapsible Statistik section' });
  click(statsHeader, window); // expand → renders lazily
  await waitFor(function () {
    return document.querySelector('#path-content .review-stats') &&
      document.querySelector('#path-content .stats-heatmap') &&
      document.querySelector('#path-content .stats-forecast');
  }, { description: 'Lernpfad Statistik section renders summary, activity heatmap and forecast' });
  // The settings DOM lives in #review-content (just hidden), so its reset button
  // is still queryable below — no need to re-open settings.

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
