const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { JSDOM, ResourceLoader, VirtualConsole } = require('jsdom');
const root = path.resolve(__dirname, '..');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
async function until(predicate, label) {
  for (let i = 0; i < 500; i++) { if (predicate()) return; await delay(10); }
  throw new Error('Timeout: ' + label);
}
class Local extends ResourceLoader {
  fetch(url) {
    if (!url.startsWith('http://nihongo.test/')) return null;
    return Promise.resolve(fs.readFileSync(path.join(root, new URL(url).pathname.slice(1))));
  }
}
async function check(mode) {
  const errors = [];
  const log = new VirtualConsole();
  log.on('jsdomError', error => errors.push(error.message));
  let nativeLocal;
  const dom = new JSDOM(fs.readFileSync(path.join(root, 'index.html'), 'utf8'), {
    url: 'http://nihongo.test/', resources: new Local(), runScripts: 'dangerously',
    pretendToBeVisual: true, virtualConsole: log,
    beforeParse(w) {
      w.matchMedia = () => ({ matches: false });
      w.scrollTo = () => {};
      w.HTMLElement.prototype.scrollIntoView = function () {};
      w.IntersectionObserver = function () { this.observe = () => {}; this.disconnect = () => {}; };
      nativeLocal = w.localStorage;
      nativeLocal.setItem('kanji-theme', 'dark');
      nativeLocal.setItem('bookmarks-kanji', '[]');
      const fail = () => { throw new w.DOMException('Storage unavailable', 'SecurityError'); };
      if (mode === 'getter') {
        for (const name of ['localStorage', 'sessionStorage']) Object.defineProperty(w, name, { get: fail });
      } else if (mode === 'read') w.Storage.prototype.getItem = fail;
      else if (mode === 'write') w.Storage.prototype.setItem = fail;
    }
  });
  const w = dom.window, d = w.document;
  try {
    await until(() => w.app && w.app.workspace && w.history.state, mode + ' startup');
    assert.equal(d.querySelectorAll('.kana-cell-inner').length, 107);
    if (mode === 'normal' || mode === 'write') assert.equal(d.documentElement.dataset.theme, 'dark');
    const oldTheme = d.documentElement.dataset.theme;
    d.getElementById('theme-toggle').click();
    assert.notEqual(d.documentElement.dataset.theme, oldTheme);
    assert.equal(w.NihongoStorage.local.getItem('kanji-theme'), oldTheme === 'dark' ? 'light' : 'dark');
    d.getElementById('sound-toggle').click();
    assert(d.getElementById('sound-toggle').classList.contains('active'));
    d.getElementById('sound-toggle').click();
    assert(!d.getElementById('sound-toggle').classList.contains('active'));

    w.app.switchTab('kanji'); await w.app.ensureSectionLoaded('kanji');
    const sec = w.app.sections.kanji;
    const first = sec.filteredItems[0].kanji;
    let star = sec.dom.grid.querySelector('.bookmark-btn');
    star.click();
    assert.equal(star.getAttribute('aria-pressed'), 'true');
    assert(w.isBookmarked('kanji', first));
    sec.applyFilters();
    star = sec.dom.grid.querySelector('.bookmark-btn');
    assert.equal(star.getAttribute('aria-pressed'), 'true', 'Rerender lost unsaved bookmark');
    star.click();
    assert(!w.isBookmarked('kanji', first), 'Stale persisted value replaced the unsaved toggle');
    for (const value of ['null', '{}', 'broken json']) {
      w.NihongoStorage.local.setItem('bookmarks-kanji', value);
      sec.applyFilters();
      sec.dom.grid.querySelector('.bookmark-btn').click();
      assert(w.isBookmarked('kanji', first), 'Malformed saved bookmarks broke toggling');
    }

    w.app.switchTab('reading');
    await w.Comprehension.activate('reading', null, 'reading-n5-1');
    const input = d.querySelector('#reading-tab input[type="radio"]');
    const question = input.name, choice = input.value;
    input.click();
    const saved = JSON.parse(w.NihongoStorage.local.getItem('nihongo-comprehension-v1'));
    assert.equal(saved['reading-n5-1'].answers[question], Number(choice));
    w.app.switchTab('kana'); w.app.switchTab('reading');
    await until(() => d.querySelector('#reading-tab input:checked'), 'retained answer');
    assert.equal(d.querySelector('#reading-tab input:checked').value, choice);
    assert.equal(d.getElementById('storage-status').hidden, mode === 'normal');
    if (mode === 'normal') {
      assert.equal(nativeLocal.getItem('nihongo-comprehension-v1'), JSON.stringify(saved));
      assert(w.sessionStorage.getItem('nihongo-workspace'));
    }
    assert.deepEqual(errors, [], mode);
  } finally { w.close(); }
}
async function run() {
  for (const mode of ['getter', 'read', 'write', 'normal']) await check(mode);
  // If storage becomes unavailable after a successful read, retain that value.
  const dom = new JSDOM('<p id="storage-status" hidden></p>', { url: 'http://nihongo.test/', runScripts: 'outside-only' });
  try {
    const w = dom.window;
    w.localStorage.setItem('saved', 'original');
    w.eval(fs.readFileSync(path.join(root, 'storage.js'), 'utf8'));
    assert.equal(w.NihongoStorage.local.getItem('saved'), 'original');
    Object.defineProperty(w, 'localStorage', { get() { throw new Error('Denied'); } });
    assert.equal(w.NihongoStorage.local.getItem('saved'), 'original');
    assert.equal(w.NihongoStorage.local.setItem('saved', 'updated'), false);
    assert.equal(w.NihongoStorage.local.getItem('saved'), 'updated');
  } finally { dom.window.close(); }
  console.log('Storage tests passed: denied getters/reads/writes, startup, preferences, bookmarks, learning progress, persistence and fallback.');
}
run().catch(error => { console.error(error); process.exitCode = 1; });
