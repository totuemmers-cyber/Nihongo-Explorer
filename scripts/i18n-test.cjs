// Interface language: dictionary coverage, the English content pipeline, and the app in English.
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm'), assert = require('node:assert/strict');
const { JSDOM, ResourceLoader, VirtualConsole } = require('jsdom');
const { requiredKeys, dictionary } = require('./i18n-keys.cjs');
const english = require('./build-english.cjs');

const root = path.resolve(__dirname, '..');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
async function until(fn, label, ms = 15000) {
  const end = Date.now() + ms;
  while (Date.now() < end) { if (fn()) return; await delay(20); }
  throw new Error('Timeout: ' + label);
}
const placeholders = text => (text.match(/\{\w+\}/g) || []).sort().join(',');

// --- 1. Every interface string has an English entry with the same placeholders ---
const en = dictionary('en');
const keys = requiredKeys();
const missing = keys.filter(k => !Object.prototype.hasOwnProperty.call(en, k));
assert.deepEqual(missing, [], 'Interface strings without English (add them to i18n-en.js)');
for (const [key, value] of Object.entries(en)) {
  assert(typeof value === 'string' && value.trim(), 'Empty English entry: ' + key);
  assert.equal(placeholders(value), placeholders(key), 'Placeholders differ: ' + key);
}

// --- 2. The content pipeline ---
// Paths read and write the same places.
const sample = { a: 'x', list: [{ t: 'p', q: { r: [{ s: '1' }] } }, { t: 'q' }], map: { k: { m: 'v' } }, pairs: [['jp', 'de']] };
for (const [spec, value] of [['a', 'X'], ['list[].t', ['P', 'Q']], ['list[].q.r[].s', [['S'], null]], ['map{}.m', ['V']], ['pairs[][1]', ['EN']]]) {
  assert(english.sameShape(english.getPath(sample, spec), value), 'Shape check: ' + spec);
  english.setPath(sample, spec, value);
  assert.deepEqual(english.getPath(sample, spec), JSON.parse(JSON.stringify(value).replace('null', 'null')), 'Round trip: ' + spec);
}
assert(!english.sameShape(['a', 'b'], ['a']), 'Array lengths must match');
assert(!english.sameShape('Text', ''), 'A German text needs an English text');
assert.equal(english.englishLevelNote('Lehrbuch: Genki I, Lektion 3'), 'Textbook: Genki I, lesson 3');
assert.equal(english.englishLevelNote('JLPT-Wortliste (J. Waller): N4 (Quelle: N2; Änderung auf zwei Stufen begrenzt)'),
  'JLPT word list (J. Waller): N4 (source: N2; change limited to two levels)');
assert.throws(() => english.englishLevelNote('Unbekannte Vorlage'), /Unknown level note/);

// Identity translations (English = German) must rebuild data equal to the German. This covers
// every dataset's paths and serialization; stale records must fall back to the German.
function identityOverlays(mutate) {
  const overlays = {};
  for (const [name, dataset] of Object.entries(english.DATASETS)) {
    const overlay = {};
    for (const [key, record] of dataset.records(dataset.load())) {
      const fields = typeof dataset.fields === 'function' ? dataset.fields(key) : dataset.fields;
      const de = {};
      for (const field of fields) de[field] = english.getPath(record, field);
      overlay[key] = { src: english.hash(de), en: de };
    }
    overlays[name] = mutate ? mutate(name, overlay) : overlay;
  }
  return overlays;
}
function buildWith(overlays) {
  return english.build(file => {
    const m = /^i18n\/en\/(\w+)\.json$/.exec(file);
    if (m) { if (!overlays[m[1]]) { const e = new Error('none'); e.code = 'ENOENT'; throw e; } return JSON.stringify(overlays[m[1]]); }
    return fs.readFileSync(path.join(root, file), 'utf8');
  });
}
function globalsOf(files, texts) {
  const c = { console, document: { readyState: 'loading', addEventListener() {} } }; c.window = c;
  for (const file of files) vm.runInNewContext(texts[file] || fs.readFileSync(path.join(root, file), 'utf8'), c, { filename: file });
  return c;
}
const plain = value => JSON.parse(JSON.stringify(value));

const identity = buildWith(identityOverlays());
for (const [name, report] of Object.entries(identity.reports)) {
  assert.deepEqual([report.stale.length, report.orphan.length, report.invalid.length], [0, 0, 0], name + ': identity overlay rejected');
  assert(report.applied >= report.total, name + ': every record applies');
}
const out = identity.files;
const manifest = globalsOf(['en/manifest.js'], out).NIHONGO_CONTENT_FILES.en;
assert.deepEqual(plain(manifest['grammar-lessons.js']), ['en/grammar-lessons-text.js', 'grammar-lessons.js']);
assert.equal(manifest['grammar-n2.js'], '', 'The grammar bundle replaces all four German files');
const same = (germanFiles, englishFiles, names, label) => {
  const de = globalsOf(germanFiles, {}), copy = globalsOf(englishFiles, out);
  for (const g of names) assert.deepEqual(plain(copy[g]), plain(de[g]), label + ': ' + g + ' differs from the German');
};
same(['kana-data.js'], ['en/kana-data.js'], ['KANA_DATA'], 'kana');
same(['kangxi-radicals-data.js'], ['en/kangxi-radicals-data.js'], ['KANGXI_RADICALS'], 'radicals');
same(['counters-data.js'], ['en/counters-data.js'], ['COUNTERS_DATA'], 'counters');
same(['kanji-data.js', 'kanji-n1.js'], ['en/kanji-data.js', 'en/kanji-n1.js'], ['KANJI_DATA', 'KANJI_N1_DATA'], 'kanji');
same(['grammar-data.js', 'grammar-n2.js', 'grammar-n1.js', 'keigo-data.js'], ['en/grammar.js'], ['GRAMMAR_DATA'], 'grammar');
same(['onomatopoeia-data.js'], ['en/onomatopoeia-data.js'], ['ONOMATOPOEIA_DATA'], 'onomatopoeia');
same(['comprehension-data.js'], ['en/comprehension-data.js'], ['COMPREHENSION_UNITS'], 'comprehension');
same(['comprehension-links.js'], ['en/comprehension-links.js'], ['COMPREHENSION_LINKS'], 'links');
same(['vocab-runtime.js'], ['en/vocab-runtime.js'], ['VOCAB_RUNTIME'], 'vocab');
{
  const de = globalsOf(['vocab-runtime-details.js'], {}).VOCAB_RUNTIME_DETAILS;
  const copy = globalsOf(['en/vocab-runtime-details.js'], out).VOCAB_RUNTIME_DETAILS;
  assert.equal(copy.length, de.length);
  for (let i = 0; i < de.length; i++) {
    assert.deepEqual(plain(copy[i].examples), plain(de[i].examples), 'vocab details examples ' + i);
    assert.equal(copy[i].notes, de[i].notes);
    assert.equal(copy[i].levelNote, english.englishLevelNote(de[i].levelNote));
  }
}
{
  // The lesson patch, applied by the lesson module, reproduces the lessons.
  const seed = { document: { readyState: 'loading', addEventListener() {} } };
  const files = ['grammar-data.js', 'grammar-n2.js', 'grammar-n1.js', 'keigo-data.js', 'grammar-lessons.js'];
  const de = globalsOf(files, {}).GRAMMAR_LESSONS;
  const c = Object.assign({ console }, seed); c.window = c;
  vm.runInNewContext(out['en/grammar-lessons-text.js'], c);
  for (const file of files) vm.runInNewContext(fs.readFileSync(path.join(root, file), 'utf8'), c, { filename: file });
  assert.deepEqual(plain(c.GRAMMAR_LESSONS), plain(de), 'Lesson patch changes the lessons');
}

// A translated text appears; a record whose German changed stays German; derived fields follow.
{
  const overlays = identityOverlays((name, overlay) => {
    if (name === 'counters') overlay.nin.en.meaning = 'people';
    if (name === 'radicals') { overlay['1'].en.meaning = 'one'; overlay['1'].src = 'outdated0000000'; }
    if (name === 'grammar') {
      const key = Object.keys(overlay).find(k => overlay[k].en['examples[].german'].length);
      overlay[key].en['examples[].german'] = overlay[key].en['examples[].german'].map((t, i) => 'Sentence ' + i);
      overlay.__key = key;
    }
    return overlay;
  });
  const grammarKey = overlays.grammar.__key; delete overlays.grammar.__key;
  const built = buildWith(overlays);
  const counters = globalsOf(['en/counters-data.js'], built.files).COUNTERS_DATA.counters;
  assert.equal(counters.find(c => c.id === 'nin').meaning, 'people');
  assert.deepEqual(built.reports.radicals.stale, ['1']);
  assert.equal(globalsOf(['en/kangxi-radicals-data.js'], built.files).KANGXI_RADICALS[0].meaning, 'eins', 'Stale record keeps the German');
  const g = globalsOf(['en/grammar.js'], built.files).GRAMMAR_DATA.find(item => item.id === grammarKey);
  g.examples.forEach((e, i) => { if (e.cloze && e.cloze.quiz) assert.equal(e.cloze.quiz.german, 'Sentence ' + i, 'Cloze quiz follows its example'); });
}

// The checked-in English layer is what the overlays give.
{
  const built = english.build();
  for (const [file, text] of Object.entries(built.files)) {
    assert.equal(fs.readFileSync(path.join(root, file), 'utf8').replace(/\r\n/g, '\n'), text, file + ' is stale; run npm run build:english');
  }
}

// --- 3. The app in English ---
async function boot(lang, hash = '#kana') {
  const errors = [];
  class Local extends ResourceLoader {
    fetch(url) {
      if (!url.startsWith('http://nihongo.test/')) return null;
      return Promise.resolve(fs.readFileSync(path.join(root, decodeURIComponent(new URL(url).pathname.slice(1)))));
    }
  }
  const log = new VirtualConsole();
  log.on('jsdomError', e => errors.push(e.message));
  log.on('error', e => errors.push(String(e)));
  const dom = new JSDOM(fs.readFileSync(path.join(root, 'index.html'), 'utf8'), {
    url: 'http://nihongo.test/index.html' + hash, resources: new Local(), runScripts: 'dangerously', pretendToBeVisual: true, virtualConsole: log,
    beforeParse(w) {
      w.innerWidth = 1440; w.matchMedia = () => ({ matches: false, addEventListener() {} });
      w.scrollTo = () => {}; w.HTMLElement.prototype.scrollIntoView = function () {};
      w.IntersectionObserver = function () { this.observe = () => {}; this.disconnect = () => {}; };
      w.speechSynthesis = { getVoices: () => [], speak() {}, cancel() {}, resume() {} }; w.SpeechSynthesisUtterance = function () {};
      if (lang) w.localStorage.setItem('nihongo-lang', lang);
    }
  });
  const w = dom.window;
  await until(() => w.app && w.app.workspace && w.history.state, 'boot');
  return { dom, w, d: w.document, errors };
}

// German interface words that must not remain in the English page frame and controls.
const GERMAN = /[äöüÄÖÜß]|\b(und|oder|nicht|mit|Alle|Suche|Lade|Zurück|Lesezeichen|Einträge|Grundlagen|Nachschlagen|Wortart|Kategorie|Sortierung|Vokabeln|Radikale|Zahlen|Lesen|Hören|Design|Hilfe)\b/;
function germanIn(d, selectors) {
  const found = [];
  for (const selector of selectors) {
    d.querySelectorAll(selector).forEach(el => {
      const copy = el.cloneNode(true);
      copy.querySelectorAll('[lang]').forEach(x => x.remove());
      const text = copy.textContent.replace(/\s+/g, ' ').trim();
      if (GERMAN.test(text)) found.push(selector + ': ' + text.slice(0, 120));
      for (const attr of ['title', 'placeholder', 'aria-label']) {
        copy.querySelectorAll('[' + attr + ']').forEach(x => { if (GERMAN.test(x.getAttribute(attr))) found.push(selector + ' [' + attr + ']: ' + x.getAttribute(attr)); });
      }
    });
  }
  return found;
}

async function run() {
  // German stays the default, unchanged.
  {
    const { w, d, dom } = await boot(null);
    assert.equal(d.documentElement.lang, 'de');
    assert.equal(d.querySelector('.tab-btn[data-tab="vocab"]').textContent.trim(), '語Vokabeln');
    assert.equal(d.querySelector('#lang-toggle .lang-name').textContent, 'English');
    assert.equal(w.NIHONGO_I18N.contentSrc('kanji-data.js'), 'kanji-data.js');
    dom.window.close();
  }

  const { w, d, dom, errors } = await boot('en');
  assert.equal(d.documentElement.lang, 'en');
  assert.equal(d.getElementById('page-title').textContent, 'Kana');
  assert.equal(d.getElementById('page-description').textContent, 'Discover and listen to the Japanese syllabaries.');
  assert.equal(d.querySelector('.tab-btn[data-tab="vocab"]').textContent.trim(), '語Vocabulary');
  assert.equal(d.querySelector('#lang-toggle .lang-name').textContent, 'Deutsch');
  assert.equal(d.querySelector('#lang-toggle .lang-name').lang, 'de');
  // The kana notes come from en/kana-data.js once it has loaded.
  await until(() => /Small tsu/.test(d.querySelector('.kana-special-table').textContent), 'English kana notes');
  assert.match(d.getElementById('item-count').textContent, /^\d+ characters · Hiragana$/);

  const sections = ['radicals', 'counters', 'kanji', 'vocab', 'onomatopoeia', 'grammar'];
  for (const tab of sections) {
    d.querySelector('.tab-btn[data-tab="' + tab + '"]').click();
    await until(() => w.app.sections[tab].isLoaded && d.querySelector('#' + tab + '-tab .entry-open'), tab + ' loads', 30000);
    d.querySelector('#' + tab + '-tab .entry-open').click();
    await until(() => !w.app.sections[tab].dom.overlay.classList.contains('hidden'), tab + ' detail');
    const count = d.getElementById('item-count').textContent;
    assert(!GERMAN.test(count), tab + ': count still German: ' + count);
  }
  // Translated content: radicals and counters have English data when their overlays exist.
  if (w.NIHONGO_I18N.contentSrc('counters-data.js') !== 'counters-data.js') {
    assert.equal(w.app.sections.counters.allItems.find(c => c.id === 'nin').meaning.indexOf('Menschen'), -1);
  }
  d.querySelector('.tab-btn[data-tab="grammar"]').click();
  d.querySelector('#grammar-view-toggle [data-view="lessons"]').click();
  await until(() => w.__grammarLessonsInitialized && d.getElementById('gl-count').textContent, 'lessons');
  assert.match(d.getElementById('gl-count').textContent, /^\d+ lessons$/);
  d.querySelector('.gl-card-header').click();
  await until(() => d.querySelector('#lesson-reader h2'), 'lesson reader');
  assert(d.querySelector('#lesson-reader header button').textContent === '← All lessons');

  d.querySelector('.tab-btn[data-tab="reading"]').click();
  await until(() => d.querySelector('#reading-tab .comprehension-card button'), 'reading list', 30000);
  assert.equal(d.querySelector('#reading-tab h2').textContent, 'Read step by step');
  d.querySelector('#reading-tab .comprehension-card button').click();
  await until(() => d.querySelector('#reading-tab .comprehension-unit'), 'reading unit');
  const supports = [...d.querySelectorAll('#reading-tab .comprehension-supports button')].map(b => b.textContent);
  assert(supports.includes(w.NIHONGO_I18N.contentSrc('comprehension-data.js') === 'comprehension-data.js' ? 'Translation (German)' : 'English translation'),
    'The translation button names the language of the translation: ' + supports.join(' | '));

  d.querySelector('.tab-btn[data-tab="quiz"]').click();
  await until(() => d.querySelector('.quiz-home-title'), 'quiz home', 30000);
  assert.equal(d.querySelector('.quiz-home-title').textContent, 'Quiz & test');
  d.querySelector('.quiz-home-card.browse').click();
  await until(() => d.querySelector('.quiz-prompt'), 'quiz question', 30000);
  assert(!GERMAN.test(d.querySelector('.quiz-prompt').textContent), 'Quiz prompt still German');
  d.querySelector('.quiz-btn-reveal').click();
  assert.match(d.querySelector('.quiz-feedback').textContent, /^Answer revealed\. Correct answer: /);

  const leftovers = germanIn(d, ['.sidebar', '.page-header', '.toolbars', '#help-overlay', '.selection-context', '.detail-nav', '.reader-actions']);
  assert.deepEqual(leftovers, [], 'German interface text in English mode');
  const runtimeMissing = Array.from(w.NIHONGO_I18N.missing()).filter(k => /[A-Za-zÄÖÜäöüß]/.test(k) && !/^N[1-5]$/.test(k));
  assert.deepEqual(runtimeMissing, [], 'tr() keys without English at runtime: ' + JSON.stringify(runtimeMissing));
  assert.deepEqual(errors.filter(e => !/Could not load script|Not implemented/.test(e)), [], 'Errors in English mode');

  // The switch stores the language and reloads in it.
  let reloaded = 0;
  w.NIHONGO_I18N.reload = () => { reloaded++; };
  d.getElementById('lang-toggle').click();
  assert.equal(reloaded, 1);
  assert.equal(w.localStorage.getItem('nihongo-lang'), 'de');
  dom.window.close();
  console.log('i18n: ' + keys.length + ' interface strings, ' + Object.keys(english.DATASETS).length + ' content datasets checked; English mode renders.');
}

run().catch(error => { console.error(error); process.exitCode = 1; });
