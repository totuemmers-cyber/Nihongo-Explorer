const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM, ResourceLoader, VirtualConsole } = require('jsdom');
const root = path.resolve(__dirname, '..');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
async function until(predicate, label) {
  for (let i = 0; i < 400; i++) { if (predicate()) return; await delay(20); }
  throw new Error('Timed out: ' + label);
}
class LocalResources extends ResourceLoader {
  fetch(url) {
    if (!url.startsWith('http://nihongo.test/')) return null;
    return Promise.resolve(fs.readFileSync(path.join(root, decodeURIComponent(new URL(url).pathname))));
  }
}
async function boot(options = {}) {
  const errors = [], log = new VirtualConsole();
  log.on('jsdomError', error => errors.push(error.message));
  const dom = new JSDOM(fs.readFileSync(path.join(root, 'index.html'), 'utf8'), {
    url: 'http://nihongo.test/#vocab', resources: new LocalResources(), runScripts: 'dangerously',
    pretendToBeVisual: true, virtualConsole: log,
    beforeParse(w) {
      w.matchMedia = () => ({ matches: false });
      w.scrollTo = () => {}; w.HTMLElement.prototype.scrollIntoView = () => {};
      w.IntersectionObserver = function () { this.observe = () => {}; this.disconnect = () => {}; };
      w.HTMLMediaElement.prototype.pause = () => {}; w.HTMLMediaElement.prototype.load = () => {};
      for (const [key, value] of Object.entries(options.local || {})) w.localStorage.setItem(key, value);
      if (options.session) w.sessionStorage.setItem('nihongo-workspace', options.session);
      if (options.block === 'getter') {
        for (const area of ['localStorage', 'sessionStorage']) Object.defineProperty(w, area, {
          get() { throw new w.DOMException('Storage blocked', 'SecurityError'); }
        });
      } else if (options.block === 'read') {
        w.Storage.prototype.getItem = () => { throw new w.DOMException('Read blocked', 'SecurityError'); };
      }
    }
  });
  const w = dom.window, d = w.document;
  try {
    await until(() => w.app?.workspace && w.history.state?.workspace && d.querySelector('#vocab-grid .entry-open'), 'startup');
    return { w, d, errors };
  } catch (e) { w.close(); throw e; }
}
function clean(fixture) {
  try { assert.deepEqual(fixture.errors, [], 'Uncaught browser errors'); }
  finally { fixture.w.close(); }
}
async function run() {
  // Existing keys and IDs remain usable across reloads.
  const saved = { 'kanji-theme': 'dark', 'kanji-sound': 'on', 'bookmarks-vocab': '["vocab-n5:0"]' };
  const normal = await boot({ local: saved });
  try {
    assert.equal(normal.d.documentElement.dataset.theme, 'dark');
    assert.equal(normal.d.querySelector('#sound-toggle').getAttribute('aria-pressed'), 'true');
    assert(normal.w.isBookmarked('vocab', 'vocab-n5:0'));
    assert.equal(normal.d.querySelector('#storage-notice').hidden, true);
    normal.w.toggleBookmark('vocab', 'vocab-n5:1');
    assert.deepEqual(JSON.parse(normal.w.localStorage.getItem('bookmarks-vocab')), ['vocab-n5:0', 'vocab-n5:1']);
    const reloaded = await boot({ local: { ...saved, 'bookmarks-vocab': normal.w.localStorage.getItem('bookmarks-vocab') }, session: normal.w.sessionStorage.getItem('nihongo-workspace') });
    try { assert(reloaded.w.isBookmarked('vocab', 'vocab-n5:1')); } finally { clean(reloaded); }
  } finally { clean(normal); }

  for (const block of ['getter', 'read']) {
    const f = await boot({ block });
    try {
      for (const name of Object.keys(f.w.app.sections)) {
        await f.w.app.ensureSectionLoaded(name);
        const sec = f.w.app.sections[name];
        assert(sec.allItems.length > 0, name + ' failed to load');
        const star = sec.dom.grid.querySelector('.bookmark-btn'), id = star.dataset.bookmarkId;
        star.click(); sec.applyFilters();
        assert(f.w.isBookmarked(name, id), name + ' lost in-memory bookmark');
        assert.equal(sec.dom.grid.querySelector('.bookmark-btn').getAttribute('aria-pressed'), 'true');
        sec.filters.bookmarks = 'starred'; sec.applyFilters();
        assert.equal(sec.filteredItems.length, 1, name + ' bookmark filter');
      }
      f.d.getElementById('theme-toggle').click();
      assert.equal(f.d.documentElement.dataset.theme, 'dark');
      f.d.getElementById('sound-toggle').click();
      assert.equal(f.d.getElementById('sound-toggle').getAttribute('aria-pressed'), 'true');
      assert.equal(f.d.querySelector('#storage-notice').hidden, false);
      assert.match(f.d.querySelector('#storage-notice').textContent, /Neuladen/);
      f.w.app.switchTab('reading');
      await until(() => f.d.querySelector('#reading-tab [data-unit]'), 'reading list');
      f.d.querySelector('#reading-tab [data-unit]').click();
      const answer = f.d.querySelector('#reading-tab input');
      answer.click();
      f.w.app.switchTab('vocab'); f.w.app.switchTab('reading');
      await until(() => f.d.querySelector('#reading-tab input:checked'), 'retained draft');
      assert.equal(f.d.querySelector('#reading-tab input:checked').name, answer.name);
    } finally { clean(f); }
  }

  const quota = await boot();
  try {
    const { w, d } = quota, sec = w.app.sections.vocab;
    const star = sec.dom.grid.querySelector('.bookmark-btn'), id = star.dataset.bookmarkId;
    star.click(); // A persisted bookmark exists before storage fills up.
    const setItem = w.Storage.prototype.setItem;
    w.Storage.prototype.setItem = () => { throw new w.DOMException('Storage full', 'QuotaExceededError'); };
    sec.dom.grid.querySelector('.bookmark-btn').click();
    sec.applyFilters();
    assert.equal(w.isBookmarked('vocab', id), false, 'Failed removal resurrected the stale saved bookmark');
    assert(JSON.parse(w.localStorage.getItem('bookmarks-vocab')).includes(id), 'Fixture must retain the old disk value');
    sec.dom.grid.querySelector('.bookmark-btn').click(); sec.applyFilters();
    assert(w.isBookmarked('vocab', id), 'Failed addition lost from memory');
    assert.equal(d.querySelector('#storage-notice').hidden, false);
    w.Storage.prototype.setItem = setItem;
    sec.dom.grid.querySelector('.bookmark-btn').click();
    assert.deepEqual(JSON.parse(w.localStorage.getItem('bookmarks-vocab')), [], 'Saving did not recover');
    // Healthy reads still observe changes made outside this page's wrapper.
    w.localStorage.setItem('bookmarks-vocab', JSON.stringify([id]));
    assert(w.isBookmarked('vocab', id));
  } finally { clean(quota); }

  const corrupt = await boot({ local: { 'bookmarks-vocab': '{}' }, session: '{}' });
  try {
    assert.equal(corrupt.d.querySelector('#storage-notice').hidden, false);
    for (const name of Object.keys(corrupt.w.app.sections)) {
      for (const invalid of ['{', '{}', 'null', '17', '"wrong"']) {
        corrupt.w.localStorage.setItem('bookmarks-' + name, invalid);
        await corrupt.w.app.ensureSectionLoaded(name);
        corrupt.w.app.sections[name].applyFilters();
        assert.equal(corrupt.w.getBookmarks(name).length, 0, name + ': ' + invalid);
        assert(corrupt.w.app.sections[name].dom.grid.querySelector('.entry-open'));
      }
    }
    corrupt.w.localStorage.setItem('bookmarks-vocab', '[null, 42, {}, "", "vocab-n5:0"]');
    assert.deepEqual(Array.from(corrupt.w.getBookmarks('vocab')), ['vocab-n5:0'], 'Valid IDs should survive mixed data');
    corrupt.w.toggleBookmark('vocab', 'vocab-n5:1');
    assert.deepEqual(JSON.parse(corrupt.w.localStorage.getItem('bookmarks-vocab')), ['vocab-n5:0', 'vocab-n5:1']);
  } finally { clean(corrupt); }
  console.log('Storage regressions passed: denied getters/reads, quota failures, in-memory changes, recovery, corrupt bookmarks/session, preserved IDs/preferences and comprehension drafts.');
}
run().catch(error => { console.error(error); process.exitCode = 1; });
