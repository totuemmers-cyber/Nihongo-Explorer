/* Global search (global-search.js): opening and closing, results per section, "show all" with the
   same entries as the section, opening entries and lessons, loading without the vocabulary
   details, and a failed load with retry. */
const assert = require('node:assert/strict');
const { delay, until, installStubs, openPage, LocalResources } = require('./dom-harness.cjs');

const SECTIONS = ['vocab', 'kanji', 'grammar', 'onomatopoeia', 'counters', 'radicals'];

function helpers(w, d) {
  const overlay = d.getElementById('search-overlay');
  const input = d.getElementById('global-search-input');
  const key = (target, k, options = {}) =>
    target.dispatchEvent(new w.KeyboardEvent('keydown', Object.assign({ key: k, bubbles: true, cancelable: true }, options)));
  const isOpen = () => !overlay.classList.contains('hidden');
  const loaded = () => SECTIONS.every(n => w.app.sections[n].isLoaded) && w.__grammarLessonsInitialized;
  async function search(text) {
    input.value = text;
    input.dispatchEvent(new w.Event('input', { bubbles: true }));
    await delay(160);
  }
  const group = name => d.querySelector('.gs-group[data-source="' + name + '"]');
  const count = name => Number(group(name).querySelector('.gs-group-count').textContent);
  const mains = name => [...group(name).querySelectorAll('.gs-main')].map(el => el.textContent);
  const status = () => d.getElementById('global-search-status').textContent;
  return { overlay, input, key, isOpen, loaded, search, group, count, mains, status };
}

async function english() {
  const requested = [];
  const resources = new LocalResources({ intercept: name => { requested.push(name); return null; } });
  const { w, d, errors } = openPage({ hash: '#kana', resources, beforeParse: w => installStubs(w, { lang: 'en' }) });
  try {
    await until(() => w.app && w.app.workspace && w.app.globalSearch && w.history.state, 'boot');
    const s = helpers(w, d);

    // "/" on a tab without its own search opens the dialog; the data loads in the background.
    d.getElementById('page-title').focus();
    s.key(d.activeElement, '/');
    assert(s.isOpen(), '/ on the kana tab opens the global search');
    assert.equal(d.activeElement, s.input);
    assert.match(s.status(), /^Searches vocabulary, kanji, grammar, lessons, onomatopoeia, counters and radicals\./);
    await until(s.loaded, 'all sections and the lessons load', 30000);
    await until(() => !/Loading content/.test(s.status()), 'loading note clears');
    // The list is enough; the 18 MB of vocabulary details stay for a card or the tab.
    assert.equal(w.app.vocabDetailsLoaded, false);
    assert(!requested.some(name => /vocab-runtime-details/.test(name)), 'vocabulary details were not requested');
    assert.equal(w.app.activeTab, 'kana', 'Loading does not change the view');

    // One query, every section: the exact matches come first.
    await s.search('水');
    assert.equal(d.querySelector('.gs-group').dataset.source, 'vocab', 'Ties keep the section order');
    assert.equal(s.mains('vocab')[0], '水');
    assert.equal(s.mains('kanji')[0], '水');
    assert.equal(s.mains('radicals')[0], '水');
    assert(d.querySelectorAll('.gs-group .gs-result').length <= 5 * 7);
    for (const g of d.querySelectorAll('.gs-group')) assert(g.querySelectorAll('.gs-result').length <= 5);
    assert.match(s.status(), /^\d+ results$/);
    assert.equal(d.querySelector('.gs-group-title').firstChild.textContent.trim(), 'Vocabulary');

    // Arrow keys move from the field through the results and back.
    s.key(s.input, 'ArrowDown');
    assert.equal(d.activeElement, d.querySelector('.gs-result'));
    s.key(d.activeElement, 'ArrowUp');
    assert.equal(d.activeElement, s.input);
    // Page shortcuts stay out of the dialog: a digit does not switch the section.
    s.key(s.input, '3');
    assert.equal(w.app.activeTab, 'kana');

    // Meanings rank by words: "to eat" before "treatment" or "Seattle".
    await s.search('eat');
    assert.equal(d.querySelector('.gs-group').dataset.source, 'vocab');
    assert.equal(s.mains('vocab')[0], '食べる');
    assert.equal(s.mains('kanji')[0], '食');
    // One Latin letter is no query; one kanji is.
    await s.search('a');
    assert.equal(d.querySelectorAll('.gs-group').length, 0);
    assert.equal(s.status(), 'Please type at least two letters.');
    await s.search('水');

    // "Show all" opens the section with the query and the filters reset: the same entries.
    const kanjiTotal = s.count('kanji');
    assert(kanjiTotal > 5, 'Enough kanji contain 水 for "show all": ' + kanjiTotal);
    s.group('kanji').querySelector('.gs-more').click();
    assert(!s.isOpen());
    await until(() => w.app.activeTab === 'kanji', 'kanji tab');
    assert.equal(w.app.sections.kanji.dom.search.value, '水');
    assert.equal(w.app.sections.kanji.filteredItems.length, kanjiTotal);
    assert.equal(w.location.hash, '#kanji');

    // A section that filters by substring: grammar, with a level filter set beforehand.
    d.querySelector('.tab-btn[data-tab="grammar"]').click();
    d.querySelector('.grammar-level[data-glevel="N1"]').click();
    assert.equal(w.app.sections.grammar.filters.level, 'N1');
    s.key(d.body, 'k', { ctrlKey: true });
    assert(s.isOpen(), 'Ctrl+K opens the search');
    await s.search('から');
    assert.equal(s.mains('grammar')[0], 'から', 'The pattern itself ranks first');
    const grammarTotal = s.count('grammar');
    s.group('grammar').querySelector('.gs-more').click();
    await until(() => w.app.sections.grammar.dom.search.value === 'から', 'grammar query');
    assert.equal(w.app.sections.grammar.filters.level, 'all', 'The level filter was reset');
    assert.equal(w.app.sections.grammar.filteredItems.length, grammarTotal);

    // Enter opens the best match like a cross-reference; "← Back" returns to the search's origin.
    s.key(d.body, 'k', { ctrlKey: true });
    await s.search('taberu');
    assert.equal(d.querySelector('.gs-group').dataset.source, 'vocab');
    assert.equal(s.mains('vocab')[0], '食べる');
    s.key(s.input, 'Enter');
    await until(() => w.app.activeTab === 'vocab' && !w.app.sections.vocab.dom.overlay.classList.contains('hidden'), 'vocab detail');
    assert(!s.isOpen());
    assert.equal(d.getElementById('vocab-detail-word').textContent, '食べる');
    await until(() => w.app.vocabDetailsLoaded && d.querySelector('#vocab-detail-examples .grammar-example, #vocab-detail-examples div'), 'details load for the card', 30000);
    const back = w.app.sections.vocab.dom.overlay.querySelector('.detail-back');
    assert(!back.hidden, 'The detail offers the way back');
    back.click();
    await until(() => w.app.activeTab === 'grammar', 'back to grammar');
    assert.equal(w.app.sections.grammar.dom.search.value, 'から');

    // Lessons: a title finds its lesson, which opens in the lesson reader.
    const lesson = w.GRAMMAR_LESSONS[12];
    s.key(d.body, 'k', { ctrlKey: true });
    await s.search(lesson.title);
    const result = [...s.group('lessons').querySelectorAll('.gs-result')].find(b => b.querySelector('.gs-title').textContent === lesson.title);
    assert(result, 'Lesson result for ' + lesson.title);
    assert.equal(s.group('lessons').querySelector('.gs-title').textContent, lesson.title, 'The exact title ranks first');
    result.click();
    await until(() => d.querySelector('#lesson-reader h2') && d.querySelector('#lesson-reader h2').textContent === lesson.title, 'lesson reader');
    assert.equal(w.Lessons.view, 'lessons');
    assert.equal(w.location.hash, '#grammar/lesson/' + lesson.id);

    // "Show all" lessons: the lesson index with the same query and count.
    s.key(d.body, 'k', { ctrlKey: true });
    await s.search('verb');
    const lessonTotal = s.count('lessons');
    assert(lessonTotal > 5, 'Enough lessons mention verbs: ' + lessonTotal);
    s.group('lessons').querySelector('.gs-more').click();
    await until(() => !d.getElementById('grammar-lessons').classList.contains('hidden'), 'lesson index');
    assert.equal(d.getElementById('gl-search').value, 'verb');
    assert.equal(w.Lessons.count, lessonTotal);
    assert.equal(d.getElementById('gl-count').textContent, lessonTotal + ' lessons');
    // In the lesson view, / goes to the lesson search, not to the dialog.
    d.getElementById('page-title').focus();
    s.key(d.activeElement, '/');
    assert(!s.isOpen());
    assert.equal(d.activeElement, d.getElementById('gl-search'));

    // No results, and Escape returns the focus to the button that opened the dialog.
    const opener = d.getElementById('global-search-open');
    opener.focus();
    opener.click();
    await s.search('zzzqqq');
    assert.equal(d.querySelectorAll('.gs-group').length, 0);
    assert.equal(s.status(), 'No results for “zzzqqq”.');
    s.key(s.input, 'Escape');
    assert(!s.isOpen());
    assert.equal(d.activeElement, opener);
    assert.equal(w.document.body.style.overflow, '');

    const missing = Array.from(w.NIHONGO_I18N.missing()).filter(k => /[A-Za-zÄÖÜäöüß]/.test(k) && !/^N[1-5]$/.test(k));
    assert.deepEqual(missing, [], 'tr() keys without English');
    assert.deepEqual(errors.map(e => e.message), []);
  } finally {
    w.close();
  }
}

async function failedLoad() {
  const { w, d, errors } = openPage({ hash: '#reading', beforeParse: w => installStubs(w, { lang: 'de' }) });
  try {
    await until(() => w.app && w.app.workspace && w.app.globalSearch && w.history.state, 'boot');
    const s = helpers(w, d);
    w.__NIHONGO_TEST_BLOCK_SCRIPTS = ['counters-data.js'];
    d.querySelector('.compact-header .global-search-trigger').click();
    assert(s.isOpen(), 'The compact header button opens the search');
    await until(() => d.querySelector('.gs-failed'), 'failure note', 30000);
    assert.match(d.querySelector('.gs-failed').textContent, /Konnte nicht geladen werden: Zählwörter\./);
    await until(() => SECTIONS.filter(n => n !== 'counters').every(n => w.app.sections[n].isLoaded), 'other sections');
    // The other sections are searchable meanwhile.
    await s.search('個');
    assert(s.group('kanji'), 'Kanji results while counters failed');
    assert(!s.group('counters'));
    delete w.__NIHONGO_TEST_BLOCK_SCRIPTS;
    d.querySelector('.gs-failed button').click();
    await until(() => w.app.sections.counters.isLoaded && s.group('counters'), 'counters after retry');
    assert(!d.querySelector('.gs-failed'));
    assert.equal(s.mains('counters')[0], '個');
    assert.equal(d.querySelector('.gs-group[data-source="counters"] .gs-group-title').firstChild.textContent.trim(), 'Zählwörter');
    // From the reading tab, an entry opens and the dialog leaves the page usable.
    s.group('counters').querySelector('.gs-result').click();
    await until(() => w.app.activeTab === 'counters' && !w.app.sections.counters.dom.overlay.classList.contains('hidden'), 'counter detail');
    assert.equal(d.getElementById('counter-detail-kanji').textContent, '個');
    assert.equal(d.querySelector('.workspace').inert, false);
    assert.deepEqual(errors.map(e => e.message), []);
  } finally {
    w.close();
  }
}

async function run() {
  await english();
  await failedLoad();
  console.log('Global search test passed: keyboard, results per section, show all, entries, lessons, deferred details, retry.');
}
run().catch(e => { console.error(e); process.exitCode = 1; });
