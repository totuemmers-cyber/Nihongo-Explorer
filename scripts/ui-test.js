/* Behavioral regression tests. Layout and native browser input still require visual QA. */
const fs = require('fs');
const path = require('path');
const assert = require('node:assert/strict');
const { JSDOM, ResourceLoader, VirtualConsole } = require('jsdom');
const ROOT = path.resolve(__dirname, '..');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
async function until(predicate, label) {
  for (let i = 0; i < 400; i++) { if (predicate()) return; await delay(20); }
  throw new Error('Timed out: ' + label);
}
class LocalResources extends ResourceLoader {
  fetch(url) {
    if (!url.startsWith('http://nihongo.test/')) return null;
    return Promise.resolve(fs.readFileSync(path.join(ROOT, decodeURIComponent(new URL(url).pathname))));
  }
}
async function boot(hash = '#kana', session = null, dark = false) {
  const errors = [], spoken = [], intervals = new Set();
  const console = new VirtualConsole();
  console.on('jsdomError', e => errors.push(e));
  const dom = new JSDOM(fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8'), {
    url: 'http://nihongo.test/index.html' + hash, resources: new LocalResources(), runScripts: 'dangerously', pretendToBeVisual: true, virtualConsole: console,
    beforeParse(w) {
      w.innerWidth = 1440;
      w.matchMedia = q => ({ matches: dark && q.includes('prefers-color-scheme'), addEventListener() {} });
      w.scrollTo = (x, y) => { w.scrollY = typeof x === 'object' ? x.top || 0 : y; };
      w.HTMLElement.prototype.scrollIntoView = function () {};
      w.IntersectionObserver = function () { this.observe = function () {}; this.disconnect = function () {}; };
      w.confirm = () => true;
      w.SpeechSynthesisUtterance = function (text) { this.text = text; };
      w.speechSynthesis = { getVoices: () => [], cancel() {}, resume() {}, speak: utterance => spoken.push(utterance.text) };
      const set = w.setInterval.bind(w), clear = w.clearInterval.bind(w);
      w.setInterval = (fn, ms) => { const id = set(fn, ms); intervals.add(id); return id; };
      w.clearInterval = id => { intervals.delete(id); clear(id); };
      if (session) w.sessionStorage.setItem('nihongo-workspace', session);
    }
  });
  const w = dom.window, d = w.document;
  await until(() => w.app && w.app.workspace && w.history.state && w.history.state.workspace, 'workspace ready');
  return { dom, w, d, errors, spoken, intervals };
}
function key(w, target, name, options = {}) {
  target.focus();
  const event = new w.KeyboardEvent('keydown', Object.assign({ key: name, bubbles: true, cancelable: true }, options));
  target.dispatchEvent(event);
  return event;
}
// jsdom does not implement the native button default action. Simulate it after dispatch,
// so propagation bugs (such as opening the parent from a bookmark's Enter) remain detectable.
function activate(w, target) { const e = key(w, target, 'Enter'); if (!e.defaultPrevented) target.click(); }
async function run() {
  const fixture = await boot();
  const { dom, w, d, errors, spoken, intervals } = fixture;
  try {
    const app = w.app;
    assert.equal(d.querySelectorAll('.tab-btn').length, 10);
    assert(d.getElementById('random-btn').hidden);
    assert.equal(d.getElementById('sound-toggle').getAttribute('aria-pressed'), 'false');
    assert.equal(d.querySelectorAll('button.kana-cell-inner').length, 107);
    activate(w, d.querySelector('.kana-cell-inner'));
    await until(() => spoken.length, 'keyboard Kana pronunciation');
    assert.equal(app.activeTab, 'kana');
    for (const input of d.querySelectorAll('input, select')) assert(input.labels.length || input.hasAttribute('aria-label'), 'Unlabeled control: ' + input.id);

    app.switchTab('kanji'); await app.ensureSectionLoaded('kanji');
    const sec = app.sections.kanji;
    const firstOpen = sec.dom.grid.querySelector('.entry-open');
    const firstStar = sec.dom.grid.querySelector('.bookmark-btn');
    activate(w, firstStar);
    assert(!sec.isOverlayOpen(), 'Enter on bookmark opened the entry');
    assert.equal(firstStar.getAttribute('aria-pressed'), 'true');
    activate(w, firstOpen);
    assert(sec.isOverlayOpen());
    assert.equal(sec.dom.overlay.querySelector('.detail-panel').getAttribute('role'), 'complementary');
    assert.equal(d.querySelector('.workspace').inert, false);
    const firstId = sec.selectedItem.kanji;
    assert.equal(decodeURIComponent(w.location.hash), '#kanji/' + firstId);
    d.querySelector('#detail-overlay .detail-bookmark-btn').click();
    assert.equal(firstStar.getAttribute('aria-pressed'), 'false', 'Detail bookmark did not update original result');
    sec.dom.nextBtn.focus(); sec.dom.nextBtn.click();
    assert.notEqual(sec.selectedItem.kanji, firstId);
    sec.closeDetail();
    assert.equal(d.activeElement, firstOpen, 'Next/close lost original focus target');
    for (let i = 0; i < 2; i++) {
      sec.openDetail(i);
      const stroke = d.getElementById('stroke-order-header');
      activate(w, stroke);
      assert.equal(stroke.getAttribute('aria-expanded'), 'true', 'Recreated stroke disclosure lost keyboard support');
      activate(w, stroke);
      assert.equal(stroke.getAttribute('aria-expanded'), 'false');
      sec.closeDetail();
    }

    // A real history traversal restores the entry, query, batching, and return target.
    sec.dom.search.value = 'か'; sec.applyFilters();
    const query = sec.dom.search.value;
    sec.renderBatch();
    const count = sec.renderedCount;
    const searchOpen = sec.dom.grid.querySelector('.entry-open');
    searchOpen.focus(); searchOpen.click();
    const selected = sec.selectedItem.kanji;
    w.scrollY = 240;
    app.workspace.save();
    app.switchTab('vocab'); await app.ensureSectionLoaded('vocab');
    app.sections.vocab.dom.search.value = 'Wasser'; app.sections.vocab.applyFilters();
    w.history.back();
    await until(() => app.activeTab === 'kanji' && sec.isOverlayOpen(), 'history restores Kanji');
    assert.equal(sec.dom.search.value, query);
    assert.equal(sec.selectedItem.kanji, selected);
    assert.equal(sec.renderedCount, count);
    assert.equal(w.scrollY, 240);
    w.history.forward();
    await until(() => app.activeTab === 'vocab' && app.sections.vocab.dom.search.value === 'Wasser', 'history restores vocabulary query');
    assert.equal(d.querySelectorAll('.detail-overlay:not(.hidden)').length, 0);

    const vocab = app.sections.vocab;
    const origin = vocab.dom.grid.querySelector('.entry-open');
    origin.focus(); origin.click();
    const originId = vocab.selectedItem.id;
    vocab.dom.overlay.querySelector('.detail-panel').scrollTop = 175;
    const target = sec.allItems.find(item => item.kanji === '水');
    await app.workspace.openRelated('kanji', item => item === target);
    assert.equal(sec.selectedItem.kanji, '水');
    assert.equal(sec.dom.search.value, 'か', 'Related entry reset saved filters');
    assert.equal(sec.dom.prevBtn.disabled, true, 'Out-of-filter reference navigation must be disabled');
    sec.dom.overlay.querySelector('.detail-back').click();
    await until(() => app.activeTab === 'vocab' && vocab.isOverlayOpen(), 'related reference Back');
    assert.equal(vocab.selectedItem.id, originId);
    assert.equal(vocab.dom.search.value, 'Wasser');
    assert.equal(vocab.dom.overlay.querySelector('.detail-panel').scrollTop, 175);
    vocab.closeDetail();
    assert(d.activeElement.matches('.entry-open'), 'Related return closed onto a hidden control');

    // The same selection survives all requested responsive breakpoints.
    vocab.dom.grid.querySelector('.entry-open').click();
    const resizeId = vocab.selectedItem.id;
    for (const width of [1920, 1440, 1024, 768, 390, 320, 1440]) {
      w.innerWidth = width; w.dispatchEvent(new w.Event('resize'));
      const panel = vocab.dom.overlay.querySelector('.detail-panel');
      assert.equal(vocab.selectedItem.id, resizeId);
      assert.equal(panel.getAttribute('role'), width >= 1280 ? 'complementary' : 'dialog');
      assert.equal(panel.getAttribute('aria-modal'), width >= 1280 ? null : 'true');
      assert.equal(d.querySelector('.workspace').inert, width < 1280);
    }
    w.innerWidth = 390; w.dispatchEvent(new w.Event('resize'));
    const buttons = Array.from(vocab.dom.overlay.querySelectorAll('button:not(:disabled)')).filter(el => !el.closest('.hidden, [hidden]'));
    const last = buttons[buttons.length - 1];
    const tab = key(w, last, 'Tab'); assert(tab.defaultPrevented, 'Dialog did not contain Tab focus');
    assert.equal(d.activeElement, vocab.dom.closeBtn);
    key(w, vocab.dom.closeBtn, 'Escape');
    assert(!vocab.isOverlayOpen());
    d.getElementById('nav-toggle').click(); assert(d.getElementById('sidebar').classList.contains('open'));
    key(w, d.querySelector('.tab-btn[aria-current]'), 'Escape');
    assert.equal(d.activeElement.id, 'nav-toggle');
    assert(!d.getElementById('sidebar').classList.contains('open'));
    w.innerWidth = 1440; w.dispatchEvent(new w.Event('resize'));

    vocab.dom.grid.querySelector('.entry-open').click();
    d.getElementById('help-open').click();
    key(w, d.getElementById('help-close'), 'Escape');
    assert(vocab.isOverlayOpen(), 'Closing Help also closed the reference');
    vocab.closeDetail();

    // Removing the last filtered bookmark keeps the detail valid and provides recovery.
    vocab.dom.search.value = ''; vocab.filters.bookmarks = 'all'; vocab.applyFilters();
    const item = vocab.filteredItems[0];
    w.localStorage.setItem('bookmarks-vocab', JSON.stringify([item.id]));
    vocab.filters.bookmarks = 'starred'; vocab.applyFilters();
    vocab.dom.grid.querySelector('.entry-open').click();
    vocab.dom.overlay.querySelector('.detail-bookmark-btn').click();
    assert.equal(vocab.filteredItems.length, 0);
    assert(vocab.dom.noResults.textContent.includes('Noch keine Lesezeichen'));
    assert(vocab.isOverlayOpen()); vocab.closeDetail();
    assert.equal(d.activeElement, vocab.dom.search);
    vocab.dom.controls.querySelector('.filter-reset').click();

    app.switchTab('grammar'); await app.ensureSectionLoaded('grammar'); await app.ensureGrammarLessonsLoaded();
    w.Lessons.setView('lessons');
    d.getElementById('gl-search').value = 'Vorwand';
    d.getElementById('gl-search').dispatchEvent(new w.Event('input', { bubbles: true }));
    w.Lessons.open('lesson-n1-pretext');
    assert.equal(d.getElementById('grammar-lessons').classList.contains('hidden'), true);
    assert(d.getElementById('lesson-reader').textContent.includes('Muster nachschlagen'));
    w.scrollY = 420;
    d.querySelector('#lesson-reader [data-grammar-reference]').click();
    assert(app.sections.grammar.isOverlayOpen());
    assert.equal(d.querySelector('#grammar-detail-overlay .detail-back').textContent, '← Zurück zur Lektion');
    app.sections.grammar.closeDetail();
    await until(() => !app.sections.grammar.isOverlayOpen(), 'lesson reference Back');
    assert.equal(w.Lessons.selected, 'lesson-n1-pretext');
    assert.equal(w.scrollY, 420);
    assert.equal(d.getElementById('gl-search').value, 'Vorwand');

    app.switchTab('vocab');
    const conjugationFixtures = [
      ['愛する', 'potential', 'あいせる'], ['問う', 'te', 'とうて'],
      ['発表', 'polite', 'はっぴょうします'], ['揺する', 'polite', 'ゆすります'],
      ['演ずる', 'polite', 'えんじます'], ['ある', 'negative', 'ない'],
      ['宥す', 'te', 'ゆるして'], ['宥める', 'polite', 'なだめます']
    ];
    for (const [word, form, expected] of conjugationFixtures) {
      const item = vocab.allItems.find(v => v.word === word);
      assert(item, word);
      vocab.config.openDetail(item, vocab.dom, vocab);
      d.getElementById('conjugation-header').click();
      assert.equal(d.querySelector('[data-conjugation-form="' + form + '"] .conj-form').textContent, expected);
      if (word === 'ある') assert(!d.querySelector('[data-conjugation-form="potential"]'));
      if (word === '愛する') assert(d.querySelector('[data-conjugation-form="negative"] .conj-form').textContent.includes('あいしない'));
    }
    for (const word of ['今すぐ']) {
      vocab.config.openDetail(vocab.allItems.find(v => v.word === word), vocab.dom, vocab);
      assert(d.getElementById('vocab-conjugation-section').classList.contains('hidden'));
    }
    const forgiving=vocab.allItems.find(v=>v.id==='vocab-n1:2987');
    assert.equal(forgiving.reading,'ゆるす');
    vocab.dom.search.value='ゆるす'; vocab.filters.level='N1'; vocab.applyFilters();
    assert(vocab.filteredItems.some(v=>v.id===forgiving.id),'Corrected reading missing from search');
    vocab.dom.search.value='いくつ'; vocab.filters.level='N5'; vocab.applyFilters();
    const quantity=vocab.allItems.find(v=>v.id==='vocab-n3:2933');
    assert(vocab.filteredItems.includes(quantity),'Corrected level/alias missing');
    vocab.config.openDetail(quantity,vocab.dom,vocab);
    assert(d.getElementById('vocab-detail-pitch').classList.contains('hidden'),'Unknown pitch diagram visible');
    vocab.config.openDetail(vocab.allItems.find(v=>v.word==='明るい'),vocab.dom,vocab);
    assert.equal(d.querySelectorAll('#vocab-detail-pitch .pitch-svg').length,2,'Attested alternative missing');
    assert(d.getElementById('vocab-detail-pitch').textContent.includes('Auch belegt'));
    // Old saved IDs and deep links resolve through an explicit merge redirect.
    const retired='vocab-n1:retired-fixture';
    w.VOCAB_CORRECTION_RULES.completionRedirects[retired]=forgiving.id;
    w.localStorage.setItem('bookmarks-vocab',JSON.stringify([retired]));
    assert(w.isBookmarked('vocab',forgiving.id));
    w.toggleBookmark('vocab',forgiving.id);
    assert(!w.isBookmarked('vocab',forgiving.id));
    w.location.hash='#vocab/'+encodeURIComponent(retired);
    await until(()=>vocab.selectedItem?.id===forgiving.id && vocab.isOverlayOpen(),'retired vocabulary deep link');
    delete w.VOCAB_CORRECTION_RULES.completionRedirects[retired];
    vocab.closeDetail(); vocab.filters.level='all'; vocab.dom.search.value=''; vocab.applyFilters();
    // A mixed source group must remain two independently navigable study entries.
    const roe=vocab.allItems.find(v=>v.id==='vocab-n5:correction:ikura-roe');
    const price=vocab.allItems.find(v=>v.id==='vocab-n3:2932');
    assert(roe && price && roe!==price);
    vocab.dom.search.value='いくら';vocab.applyFilters();
    assert(vocab.filteredItems.includes(roe) && vocab.filteredItems.includes(price),'Homophone search lost a distinct sense');
    vocab.filters.level='N5';vocab.applyFilters();
    assert(vocab.filteredItems.includes(roe) && !vocab.filteredItems.includes(price),'Separate level estimates were collapsed');
    w.location.hash='#vocab/'+encodeURIComponent(roe.id);
    await until(()=>vocab.selectedItem?.id===roe.id && vocab.isOverlayOpen(),'new addition deep link');
    assert.equal(d.querySelectorAll('#vocab-detail-pitch .pitch-svg').length,2);
    vocab.dom.overlay.querySelector('.detail-bookmark-btn').click();
    assert(w.isBookmarked('vocab',roe.id) && !w.isBookmarked('vocab',price.id),'Bookmark crossed homonymous senses');
    vocab.dom.overlay.querySelector('.detail-bookmark-btn').click();
    vocab.closeDetail();vocab.filters.level='all';vocab.dom.search.value='';vocab.applyFilters();

    app.switchTab('counters'); await app.ensureSectionLoaded('counters');
    assert(!d.getElementById('counters-tab').classList.contains('numbers-view'));
    d.querySelector('[data-counter-view="numbers"]').click();
    assert(d.getElementById('counters-tab').classList.contains('numbers-view'));
    assert(d.getElementById('random-btn').hidden);
    activate(w, d.querySelector('.counters-numbers-header'));
    assert.equal(d.querySelector('.counters-numbers-header').getAttribute('aria-expanded'), 'false');

    app.switchTab('quiz'); await app.ensureSectionLoaded('quiz');
    await until(() => d.querySelector('.quiz-home-card.browse'), 'quiz home');
    activate(w, d.querySelector('.quiz-home-card.browse'));
    await delay(10);
    const choices = d.querySelectorAll('.quiz-choice-btn');
    activate(w, choices[0]); activate(w, choices[1]);
    assert(!choices[0].classList.contains('selected'));
    assert(choices[1].classList.contains('selected'));
    assert(!choices[1].disabled);
    const type = d.getElementById('quiz-type-select');
    assert(!key(w, type, '1').defaultPrevented, 'Quiz stole a select key');
    assert(!key(w, type, 'Enter', { isComposing: true }).defaultPrevented);
    assert(!d.querySelector('.quiz-feedback'));
    d.getElementById('quiz-reveal-btn').click();
    assert(d.querySelector('.quiz-feedback').textContent.includes('Richtige Antwort:'));
    assert(choices[1].disabled);
    assert.equal(d.activeElement.id, 'quiz-next-btn');
    // After answering, digits still belong to the question instead of switching sections.
    assert(key(w, d.body, '1').defaultPrevented); assert.equal(app.activeTab, 'quiz');
    d.getElementById('quiz-next-btn').click(); await delay(10);
    assert(d.activeElement.matches('.quiz-prompt'), 'New question focus was not announced');
    type.value = 'conjugation'; type.dispatchEvent(new w.Event('change', { bubbles: true }));
    await delay(10);
    assert.equal(d.querySelectorAll('.quiz-choice-btn').length, 4);
    d.getElementById('quiz-reveal-btn').click();
    assert(d.querySelector('.quiz-explanation').textContent.trim());
    assert(!/[\u3400-\u9faf]/.test(d.querySelector('.quiz-explanation').textContent));
    d.querySelector('.quiz-btn-back').click();
    activate(w, d.querySelector('.quiz-home-card.test'));
    activate(w, d.querySelector('.quiz-test-level-card'));
    assert.equal(intervals.size, 0);
    assert(!w.QuizModule.isTestActive());
    activate(w, d.getElementById('quiz-start-test'));
    assert(w.QuizModule.isTestActive()); assert.equal(intervals.size, 1);
    w.confirm = () => false;
    d.querySelector('.quiz-exit').click();
    assert(w.QuizModule.isTestActive()); assert.equal(intervals.size, 1);
    app.switchTab('kana'); assert.equal(app.activeTab, 'quiz');
    w.history.back(); await delay(150);
    assert.equal(app.activeTab, 'quiz'); assert.equal(w.location.hash, '#quiz'); assert.equal(intervals.size, 1);
    w.confirm = () => true;
    app.switchTab('kana');
    assert.equal(app.activeTab, 'kana'); assert(!w.QuizModule.isTestActive()); assert.equal(intervals.size, 0);
    app.switchTab('quiz');
    d.querySelector('.quiz-home-card.test').click(); d.getElementById('quiz-start-test').click();
    w.history.back();
    await until(() => app.activeTab === 'kana', 'confirmed timed exit through history');
    assert.equal(intervals.size, 0);

    // The JLPT sort starts at N5; number keys follow the sidebar, also beside the open detail pane.
    const kanjiSection = app.sections.kanji;
    app.switchTab('kanji'); await app.ensureSectionLoaded('kanji');
    Object.keys(kanjiSection.filters).forEach(name => { kanjiSection.filters[name] = 'all'; });
    kanjiSection.dom.search.value = ''; kanjiSection.currentSort = 'jlpt'; kanjiSection.applyFilters();
    assert(kanjiSection.filteredItems.some(k => k.jlpt === 'N1'), 'Sort check needs every level');
    assert.equal(kanjiSection.filteredItems[0].jlpt, 'N5', 'JLPT sort must start with N5');
    kanjiSection.dom.grid.querySelector('.entry-open').click();
    assert(kanjiSection.isOverlayOpen() && kanjiSection.dom.overlay.classList.contains('as-pane'));
    key(w, d.body, '3'); assert.equal(app.activeTab, 'counters');
    key(w, d.body, '8'); assert.equal(app.activeTab, 'reading');
    key(w, d.body, '0'); assert.equal(app.activeTab, 'quiz');
    app.switchTab('kana');

    // Shortcut modifiers and Japanese IME composition must never change sections.
    key(w, d.body, '3', { ctrlKey: true }); key(w, d.body, '4', { isComposing: true });
    assert.equal(app.activeTab, 'kana');
    assert.equal(errors.length, 0, errors.map(String).join('\n'));

    app.switchTab('vocab'); vocab.dom.search.value = 'Wasser'; vocab.applyFilters(); vocab.dom.grid.querySelector('.entry-open').click();
    const refreshHash = w.location.hash, refreshId = vocab.selectedItem.id;
    app.workspace.save();
    const refreshed = await boot(refreshHash, w.sessionStorage.getItem('nihongo-workspace'), true);
    try {
      assert.equal(refreshed.w.app.activeTab, 'vocab');
      assert.equal(refreshed.w.app.sections.vocab.selectedItem.id, refreshId);
      assert.equal(refreshed.w.app.sections.vocab.dom.search.value, 'Wasser');
      assert.equal(refreshed.d.documentElement.dataset.theme, 'dark');
      assert.equal(refreshed.errors.length, 0);
    } finally { refreshed.dom.window.close(); }
    const invalid = await boot('#kanji/missing-entry');
    try {
      assert.equal(invalid.w.app.activeTab, 'kanji');
      assert.equal(invalid.w.location.hash, '#kanji');
      assert(!invalid.w.app.sections.kanji.isOverlayOpen());
      assert(invalid.d.getElementById('route-message').textContent.includes('nicht gefunden'));
    } finally { invalid.dom.window.close(); }
    // A consolidated grammar point still answers to its retired ID.
    const legacy = await boot('#grammar/n1-kiwamari-nai');
    try {
      await until(() => legacy.w.app.sections.grammar.selectedItem?.id === 'n1-kiwamarinai', 'retired grammar deep link');
      assert(!legacy.d.getElementById('route-message').textContent.includes('nicht gefunden'));
    } finally { legacy.dom.window.close(); }
  } finally { dom.window.close(); }
  console.log('UI regressions passed: bookmarks, native controls, focus, history, related entries, lessons, responsive semantics, timed exit and refresh.');
}
run().catch(e => { console.error(e.stack); process.exitCode = 1; });
