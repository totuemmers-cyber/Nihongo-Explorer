// Shared jsdom setup for the browser tests: the page served from local files, the browser
// features jsdom lacks, and polling. Each test keeps its own boot options on top of these.
const fs = require('fs');
const path = require('path');
const { JSDOM, ResourceLoader, VirtualConsole } = require('jsdom');

const ROOT = path.resolve(__dirname, '..');
const ORIGIN = 'http://nihongo.test/';
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Poll until the predicate holds. A predicate that throws fails at once.
async function until(predicate, label, timeoutMs = 15000) {
  const end = Date.now() + timeoutMs;
  for (;;) {
    if (predicate()) return;
    if (Date.now() >= end) throw new Error('Timed out: ' + label);
    await delay(20);
  }
}

// Serves the test origin from the working tree, without fonts or CDNs. `intercept(name)` may
// return a promise to replace a file (for failure tests); `allowFile` also serves file: URLs.
class LocalResources extends ResourceLoader {
  constructor({ intercept = null, allowFile = false } = {}) {
    super();
    this.intercept = intercept;
    this.allowFile = allowFile;
  }
  fetch(url, options) {
    if (url.startsWith(ORIGIN)) {
      const name = decodeURIComponent(new URL(url).pathname.slice(1));
      return (this.intercept && this.intercept(name)) || Promise.resolve(fs.readFileSync(path.join(ROOT, name)));
    }
    return this.allowFile && url.startsWith('file:') ? super.fetch(url, options) : null;
  }
}

// Browser features jsdom lacks. Spoken texts are collected in `spoken`; scrollTo records scrollY.
// `lang` stores an interface language before boot (the page defaults to English).
function installStubs(w, { lang = 'de', width = 1440, dark = false, spoken = [] } = {}) {
  if (lang) w.localStorage.setItem('nihongo-lang', lang);
  w.innerWidth = width;
  w.matchMedia = query => ({ matches: dark && query.includes('prefers-color-scheme'), media: query,
    addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} });
  w.scrollTo = (x, y) => { w.scrollY = typeof x === 'object' ? x.top || 0 : y; };
  w.HTMLElement.prototype.scrollIntoView = function () {};
  w.IntersectionObserver = function () { this.observe = function () {}; this.disconnect = function () {}; };
  w.confirm = () => true;
  w.SpeechSynthesisUtterance = function (text) { this.text = text; };
  w.speechSynthesis = { getVoices: () => [], cancel() {}, resume() {}, speak: utterance => spoken.push(utterance && utterance.text) };
  return w;
}

// Load index.html at `hash` (or `url`). Errors jsdom reports are collected in `errors`, except
// those `ignoreError` accepts (such as scripts a test blocks on purpose). With `consoleErrors`,
// the page's own console.error calls are collected too; with `forwardConsole`, the page console
// prints to this process, as jsdom does by default.
function openPage({ hash = '#kana', url = ORIGIN + 'index.html' + hash, resources = new LocalResources(), beforeParse = () => {},
  errors = [], ignoreError = () => false, consoleErrors = false, forwardConsole = false } = {}) {
  const virtualConsole = new VirtualConsole();
  if (forwardConsole) virtualConsole.sendTo(console);
  const record = error => { if (!ignoreError(error)) errors.push(error); };
  virtualConsole.on('jsdomError', record);
  if (consoleErrors) virtualConsole.on('error', (...args) => record(new Error(args.map(String).join(' '))));
  const dom = new JSDOM(fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8'), {
    url, resources, runScripts: 'dangerously', pretendToBeVisual: true, virtualConsole, beforeParse
  });
  return { dom, w: dom.window, d: dom.window.document, errors, virtualConsole };
}

module.exports = { ROOT, ORIGIN, delay, until, LocalResources, installStubs, openPage };
