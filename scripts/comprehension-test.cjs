const fs = require('node:fs'), path = require('node:path'), assert = require('node:assert/strict');
const { JSDOM, ResourceLoader, VirtualConsole } = require('jsdom');
const root = path.resolve(__dirname, '..');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
async function until(fn, label) { for (let i = 0; i < 500; i++) { if (fn()) return; await delay(10); } throw new Error('Timeout: ' + label); }
async function boot(hash = '#reading', options = {}) {
  const errors = [], requests = [], media = [], stored = options.progress;
  let block = !!options.block;
  class Local extends ResourceLoader {
    fetch(url) {
      if (!url.startsWith('http://nihongo.test/')) return null;
      const name = new URL(url).pathname.slice(1); requests.push(name);
      if (name === 'comprehension-data.js' && block) { block = false; return Promise.reject(new Error('Intentional content failure')); }
      return Promise.resolve(fs.readFileSync(path.join(root, name)));
    }
  }
  const log = new VirtualConsole(); log.on('jsdomError', e => { if (!e.message.includes('Could not load script')) errors.push(e); });
  const dom = new JSDOM(fs.readFileSync(path.join(root, 'index.html'), 'utf8'), {
    url: 'http://nihongo.test/index.html' + hash, resources: new Local(), runScripts: 'dangerously', pretendToBeVisual: true, virtualConsole: log,
    beforeParse(w) {
      w.innerWidth = 1440; w.matchMedia = () => ({ matches: false, addEventListener() {} });
      w.scrollTo = (x, y) => { w.scrollY = typeof x === 'object' ? x.top || 0 : y; }; w.HTMLElement.prototype.scrollIntoView = function () {};
      w.IntersectionObserver = function () { this.observe = () => {}; this.disconnect = () => {}; };
      w.speechSynthesis = { getVoices: () => [], speak() {}, cancel() {}, resume() {} }; w.SpeechSynthesisUtterance = function () {};
      w.HTMLMediaElement.prototype.play = function () { media.push(['play', this]); return options.rejectPlay ? Promise.reject(new Error('Playback unavailable')) : Promise.resolve(); };
      w.HTMLMediaElement.prototype.pause = function () { media.push(['pause', this]); };
      w.HTMLMediaElement.prototype.load = function () { media.push(['load', this]); };
      if (stored) w.localStorage.setItem('nihongo-comprehension-v1', stored);
      if (options.session) w.sessionStorage.setItem('nihongo-workspace', options.session);
      if (options.noStorage) { w.Storage.prototype.setItem = function () { throw new Error('Storage disabled'); }; }
    }
  });
  const w = dom.window, d = w.document;
  await until(() => w.app && w.app.workspace && w.history.state, 'boot');
  return { dom, w, d, errors, media, requests };
}
function clickText(d, text) { const button = [...d.querySelectorAll('button')].find(b => b.textContent === text && !b.closest('.hidden')); assert(button, text); button.click(); return button; }
async function run() {
  const first = await boot('#kana');
  assert(!first.requests.includes('comprehension-data.js'), 'Content must be lazy'); first.dom.window.close();
  const f = await boot(); const { w, d } = f;
  try {
    assert.equal(d.querySelectorAll('#reading-tab [data-unit]').length, 10);
    assert.equal(d.getElementById('item-count').textContent, '50 Einheiten · 10 je Niveau');
    assert(d.getElementById('reading-tab').textContent.includes('10 Einheiten auf Niveau N5'));
    assert(d.querySelector('[data-unit="reading-n5-10"]').closest('li').textContent.includes('10/10'));
    assert.equal(d.querySelector('#reading-tab .level-filters [aria-pressed="true"]').textContent, 'N5');
    for (const bar of d.querySelectorAll('.search-bar')) { assert(bar.querySelector('.search-field > input')); assert(bar.querySelector('.search-field > .btn-clear')); assert.equal(bar.querySelector('.bm-toggle').parentElement, bar); }
    clickText(d, 'N3'); w.scrollY = 480; d.querySelector('#reading-tab [data-unit]').click();
    assert.equal(w.location.hash, '#reading/reading-n3-1'); assert(d.querySelector('.comprehension-unit.without-furigana'));
    assert(!d.querySelector('.comprehension-feedback')); assert(d.querySelector('.comprehension-hint').hidden);
    const questions = d.querySelectorAll('#reading-tab fieldset');
    questions[0].querySelector('input[value="0"]').click(); questions[0].querySelector('input[value="2"]').click();
    assert.equal(JSON.parse(w.localStorage.getItem('nihongo-comprehension-v1'))['reading-n3-1'].answers['reading-n3-1-q1'], 2);
    d.querySelector('#reading-tab form').dispatchEvent(new w.Event('submit', { bubbles: true, cancelable: true })); assert(!d.querySelector('.comprehension-feedback'), 'Incomplete submissions do not reveal answers');
    clickText(d, 'Deutsche Übersetzung'); clickText(d, 'Deutsche Übersetzung');
    assert(JSON.parse(w.localStorage.getItem('nihongo-comprehension-v1'))['reading-n3-1'].assisted, 'Closing a hint must not clear assistance');
    questions[1].querySelector('input').click(); questions[2].querySelector('input').click();
    d.querySelector('#reading-tab form').dispatchEvent(new w.Event('submit', { bubbles: true, cancelable: true }));
    assert.equal(d.querySelectorAll('.comprehension-feedback').length, 12); assert(d.querySelector('.comprehension-result').textContent.includes('mit Hilfe'));
    assert([...d.querySelectorAll('#reading-tab input')].every(input => input.disabled));
    const stored = w.localStorage.getItem('nihongo-comprehension-v1');
    const refresh = await boot(w.location.hash, { progress: stored, session: w.sessionStorage.getItem('nihongo-workspace') });
    assert(refresh.d.querySelector('.comprehension-result')); refresh.dom.window.close();
    clickText(d, 'Neuer Versuch'); assert(!d.querySelector('.comprehension-feedback')); assert([...d.querySelectorAll('#reading-tab input')].every(input => !input.checked)); assert([...d.querySelectorAll('.comprehension-hint')].every(n => n.hidden));
    clickText(d, '← Zurück zu Lesen'); assert.equal(w.scrollY, 480); assert.equal(d.querySelector('#reading-tab .level-filters [aria-pressed="true"]').textContent, 'N3');
    w.history.back(); await until(() => d.querySelector('.comprehension-unit'), 'back to unit');
    w.history.forward(); await until(() => d.querySelector('#reading-tab [data-unit]'), 'forward to list');
    w.app.switchTab('listening'); await until(() => d.querySelector('#listening-tab [data-unit]'), 'listening list');
    d.querySelector('#listening-tab [data-unit]').click();
    const a = d.querySelector('audio'); assert(a); assert.equal(a.preload, 'none'); assert(!a.autoplay); assert(!f.media.some(e => e[0] === 'play'));
    assert(d.getElementById('listening-n5-1-transcript').hidden); assert(!d.querySelector('.comprehension-unit').classList.contains('without-furigana'));
    clickText(d, 'Abspielen / Fortsetzen'); clickText(d, 'Pause'); a.currentTime = 12; clickText(d, 'Von vorn abspielen'); assert.equal(a.currentTime, 0);
    const speed = d.querySelector('.comprehension-unit select'); speed.value = '0.8'; speed.dispatchEvent(new w.Event('change')); assert.equal(a.playbackRate, .8);
    assert(JSON.parse(w.localStorage.getItem('nihongo-comprehension-v1'))['listening-n5-1'].assisted);
    a.dispatchEvent(new w.Event('error')); assert(!d.querySelector('.comprehension-unit [role="alert"]').hidden); clickText(d, 'Audio erneut laden');
    w.history.back(); await until(() => d.querySelector('#listening-tab [data-unit]'), 'history during playback'); assert(!a.hasAttribute('src'));
    w.history.forward(); await until(() => d.querySelector('#listening-tab audio'), 'forward restores recording'); assert.equal(f.media.filter(e => e[0] === 'play').length, 3, 'History must not autoplay');
    const before = f.media.filter(e => e[0] === 'pause').length; w.app.switchTab('vocab'); assert(f.media.filter(e => e[0] === 'pause').length > before); assert(!a.hasAttribute('src'));
    await w.app.ensureSectionLoaded('vocab'); await delay(20);
    assert.equal(f.errors.length, 0, f.errors.map(e => e.message).join('\n'));
  } finally { w.close(); }
  const missing = await boot('#reading/no-such-unit'); assert(missing.d.getElementById('reading-tab').textContent.includes('nicht gefunden')); missing.w.close();
  const failure = await boot('#reading', { block: true }); clickText(failure.d, 'Erneut versuchen'); await until(() => failure.d.querySelector('[data-unit]'), 'retry data'); failure.w.close();
  const disabled = await boot('#reading/reading-n5-1', { noStorage: true }); assert(disabled.d.querySelector('.comprehension-storage').textContent.includes('Speichern')); disabled.w.close();
  const corrupt = await boot('#reading/reading-n5-1', { progress: JSON.stringify({ 'reading-n5-1': { answers: {}, submitted: true, attempts: [] } }) }); assert(corrupt.d.querySelector('.comprehension-unit')); assert(!corrupt.d.querySelector('.comprehension-result')); corrupt.w.close();
  const rejected = await boot('#listening/listening-n1-5', { rejectPlay: true }); clickText(rejected.d, 'Abspielen / Fortsetzen'); await until(() => !rejected.d.querySelector('.comprehension-unit [role="alert"]').hidden, 'rejected play'); rejected.w.close();
  // A stored completion and an unfinished draft from the original five-unit library.
  const legacyProgress = {
    'reading-n3-1': { answers: { 'reading-n3-1-q1': 0, 'reading-n3-1-q2': 1, 'reading-n3-1-q3': 2 }, submitted: true, assisted: false, hints: {}, attempts: [{ score: 3, assisted: false, at: '2026-09-05T10:00:00.000Z' }] },
    'listening-n5-5': { answers: { 'listening-n5-5-q1': 3, 'listening-n5-5-q2': 1 }, submitted: false, assisted: true, hints: { transcript: true }, attempts: [] }
  };
  const legacy = await boot('#reading/reading-n3-1', { progress: JSON.stringify(legacyProgress) });
  const oldUnit = legacy.w.COMPREHENSION_UNITS.find(u => u.id === 'reading-n3-1');
  assert.equal(oldUnit.questions.filter(q => legacyProgress[oldUnit.id].answers[q.id] === q.answer).length, 3, 'Legacy saved choices still match the original answer key');
  assert(legacy.d.querySelector('.comprehension-result').textContent.startsWith('3 von 3 richtig'));
  legacy.w.app.switchTab('listening');
  await legacy.w.Comprehension.activate('listening', null, 'listening-n5-5');
  assert.equal(legacy.d.querySelector('input[name="listening-n5-5-q1"]:checked').value, '3');
  assert.equal(legacy.d.querySelector('input[name="listening-n5-5-q2"]:checked').value, '1');
  assert(!legacy.d.querySelector('#listening-tab .comprehension-result'));
  assert(!legacy.d.getElementById('listening-n5-5-transcript').hidden);
  assert.deepEqual(JSON.parse(legacy.w.localStorage.getItem('nihongo-comprehension-v1')), legacyProgress);
  legacy.w.close();
  for (const id of ['reading-n5-10', 'listening-n1-10']) {
    const skill = id.split('-')[0], route = '#' + skill + '/' + id;
    const deep = await boot(route, { progress: JSON.stringify(legacyProgress) });
    const unit = deep.w.COMPREHENSION_UNITS.find(u => u.id === id);
    assert.equal(deep.d.querySelector('.comprehension-unit h2').textContent, unit.title);
    assert.equal(deep.d.getElementById('item-count').textContent, '50 Einheiten · 10 je Niveau');
    for (const q of unit.questions) deep.d.querySelector('input[name="' + q.id + '"][value="' + q.answer + '"]').click();
    deep.d.querySelector('.comprehension-unit form').dispatchEvent(new deep.w.Event('submit', { bubbles: true, cancelable: true }));
    const saved = deep.w.localStorage.getItem('nihongo-comprehension-v1');
    for (const oldId of Object.keys(legacyProgress)) assert.deepEqual(JSON.parse(saved)[oldId], legacyProgress[oldId]);
    const refreshed = await boot(route, { progress: saved });
    assert(refreshed.d.querySelector('.comprehension-result').textContent.startsWith('3 von 3 richtig'), id);
    refreshed.w.close();
    clickText(deep.d, '← Zurück zu ' + (skill === 'reading' ? 'Lesen' : 'Hören'));
    assert.equal(deep.d.querySelectorAll('#' + skill + '-tab [data-unit]').length, 10);
    assert.equal(deep.d.activeElement.dataset.unit, id);
    deep.w.history.back(); await until(() => deep.d.querySelector('.comprehension-unit'), 'history to unit ten');
    assert.equal(deep.w.location.hash, route);
    if (skill === 'listening') assert(!deep.media.some(e => e[0] === 'play'), 'Unit ten must not autoplay on navigation');
    deep.w.close();
  }
  const all = await boot('#reading');
  for (const unit of all.w.COMPREHENSION_UNITS) {
    all.w.app.switchTab(unit.skill);
    await all.w.Comprehension.activate(unit.skill, null, unit.id);
    const panel = all.d.getElementById(unit.skill + '-tab');
    assert.equal(panel.querySelectorAll('fieldset').length, 3, unit.id); assert.equal(panel.querySelectorAll('input[type="radio"]').length, 12, unit.id);
    assert.equal(panel.querySelectorAll('.comprehension-feedback').length, 0, unit.id);
    for (const q of unit.questions) panel.querySelector('input[name="' + q.id + '"][value="' + q.answer + '"]').click();
    panel.querySelector('form').dispatchEvent(new all.w.Event('submit', { bubbles: true, cancelable: true }));
    assert.equal(panel.querySelectorAll('.comprehension-feedback').length, 12, unit.id); assert(panel.querySelector('.comprehension-result').textContent.startsWith('3 von 3 richtig'), unit.id);
  }
  // An uneven future content group must not keep today's total or denominator.
  const extra = JSON.parse(JSON.stringify(all.w.COMPREHENSION_UNITS.find(u => u.id === 'reading-n5-10')).replace(/reading-n5-10/g, 'reading-n5-11'));
  extra.order = 11;
  all.w.COMPREHENSION_UNITS.push(extra);
  all.w.app.switchTab('reading');
  await all.w.Comprehension.activate('reading', { reading: { level: 'N5' } }, '');
  assert.equal(all.d.getElementById('item-count').textContent, '51 Einheiten');
  assert.equal(all.d.querySelectorAll('#reading-tab [data-unit]').length, 11);
  assert(all.d.getElementById('reading-tab').textContent.includes('11 Einheiten auf Niveau N5'));
  assert(all.d.querySelector('[data-unit="reading-n5-11"]').closest('li').textContent.includes('11/11'));
  assert.equal(all.w.Comprehension.counts('listening').total, 50);
  assert.equal(all.errors.length, 0, all.errors.map(e => e.message).join('\n')); all.w.close();
  console.log('Guided learning tests passed: all 100 units, dynamic counts, unit-ten deep links/history/refresh, legacy completion and draft compatibility, lazy loading, filters/scroll, submission, hints, retry, audio lifecycle and unavailable storage.');
}
run().catch(error => { console.error(error); process.exitCode = 1; });
