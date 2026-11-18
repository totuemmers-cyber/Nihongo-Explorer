/* Global search (global-search.js): opening and closing, results per section, "show all" with the
   same entries as the section, opening entries and lessons, loading without the vocabulary
   details, a failed load with retry, the reason a result outside its row matched, and the
   entries opened last. */
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

// Japanese as it is written (japanese-lookup.js): an inflected form, a sentence, and the
// #search/<text> address at start-up and typed into the address bar.
async function lookup() {
  const { w, d, errors } = openPage({ hash: '#search/' + encodeURIComponent('食べられなかった'), beforeParse: w => installStubs(w, { lang: 'en' }) });
  try {
    await until(() => w.app && w.app.workspace && w.app.globalSearch && w.history.state, 'boot');
    const s = helpers(w, d);
    // The address opens the dialog with its text over the restored view, and returns to the view's address.
    await until(() => s.isOpen(), 'dialog from #search/…');
    assert.equal(s.input.value, '食べられなかった');
    assert.equal(d.activeElement, s.input);
    assert.equal(w.app.activeTab, 'kana');
    assert.equal(w.location.hash, '#kana');
    await until(s.loaded, 'all sections and the lessons load', 30000);
    await until(() => s.group('vocab'), 'vocabulary results');
    assert.equal(d.querySelector('.gs-group').dataset.source, 'vocab');
    assert.equal(s.mains('vocab')[0], '食べる');
    assert.equal(s.group('vocab').querySelector('.gs-inflection').textContent, '食べられなかった ← Potential or passive · Negative · Past');
    assert(!s.group('breakdown'), 'One inflected word is no sentence');
    const total = s.count('vocab');
    s.key(s.input, 'Enter');
    await until(() => w.app.activeTab === 'vocab' && d.getElementById('vocab-detail-word').textContent === '食べる', 'vocab detail');
    // The vocabulary tab's own search ranks the same way, so "show all" agrees.
    const vocab = w.app.sections.vocab;
    vocab.dom.search.value = '食べられなかった';
    vocab.applyFilters();
    assert.equal(vocab.filteredItems[0].word, '食べる');
    assert.equal(vocab.filteredItems.length, total);

    // A sentence: its parts in order, each a link, with one row per part.
    s.key(d.body, 'k', { ctrlKey: true });
    await s.search('昨日は雨が降っていました。');
    const parts = s.group('breakdown');
    assert(parts, 'Sentence breakdown');
    assert.equal(d.querySelector('.gs-group').dataset.source, 'breakdown', 'The breakdown comes first');
    assert.equal(parts.querySelector('.gs-sentence').textContent, '昨日は雨が降っていました。');
    assert.deepEqual([...parts.querySelectorAll('.gs-token')].map(b => b.textContent), ['昨日', 'は', '雨', 'が', '降っていました']);
    assert.equal(s.status(), 'Split into 5 parts.');
    const rows = [...parts.querySelectorAll('.gs-result')];
    assert.deepEqual(rows.map(r => r.querySelector('.gs-main').textContent), ['昨日', 'は', '雨', 'が', '降る']);
    assert.equal(rows[4].querySelector('.gs-inflection').textContent, '降っていました ← ～ている · Polite · Past');
    // The words in the text are for pointing; the keyboard uses the rows (arrows reach both).
    assert(parts.querySelectorAll('.gs-token').length && [...parts.querySelectorAll('.gs-token')].every(b => b.tabIndex === -1));
    s.key(s.input, 'ArrowDown');
    assert.equal(d.activeElement, parts.querySelector('.gs-token'));
    s.key(s.input, 'Escape');
    assert(!s.isOpen());
    s.key(d.body, 'k', { ctrlKey: true });
    // Reopened, the dialog shows the same breakdown. A particle opens its grammar point.
    assert.equal(s.input.value, '昨日は雨が降っていました。');
    assert(s.group('breakdown') && s.group('breakdown') !== parts, 'Rendered again on opening');
    s.group('breakdown').querySelectorAll('.gs-token')[1].click();
    await until(() => w.app.activeTab === 'grammar' && !w.app.sections.grammar.dom.overlay.classList.contains('hidden'), 'grammar detail');
    assert.equal(d.getElementById('grammar-detail-pattern').textContent, 'は');
    const grammarHash = w.location.hash;

    // #search/<text> typed into the address bar while the page is open: the view stays.
    w.location.hash = '#search/' + encodeURIComponent('見せて');
    await until(() => s.isOpen() && s.input.value === '見せて', 'dialog from a typed address');
    assert.equal(w.app.activeTab, 'grammar');
    assert.equal(w.location.hash, grammarHash);
    await until(() => s.group('vocab') && s.mains('vocab')[0] === '見せる', '見せる for 見せて');
    // Browsers that fill in %s may write spaces as +.
    assert.equal(w.app.workspace.searchRoute('#search/to+eat'), 'to eat');
    assert.equal(w.app.workspace.searchRoute('#search/%E9%A3%9F'), '食');
    assert.equal(w.app.workspace.searchRoute('#searching'), null);
    // The help names the address to register as a search engine.
    assert.match(d.getElementById('search-link-template').textContent, /\/index\.html#search\/%s$/);

    const missing = Array.from(w.NIHONGO_I18N.missing()).filter(k => /[A-Za-zÄÖÜäöüß]/.test(k) && !/^N[1-5]$/.test(k));
    assert.deepEqual(missing, [], 'tr() keys without English');
    assert.deepEqual(errors.map(e => e.message), []);
  } finally {
    w.close();
  }
}

// A result found outside the fields its row shows says where, and the empty dialog lists the
// entries opened last (workspace.js: recent).
async function reasonsAndRecent() {
  const { w, d, errors } = openPage({ hash: '#kana', beforeParse: w => installStubs(w, { lang: 'en' }) });
  try {
    await until(() => w.app && w.app.workspace && w.app.globalSearch && w.history.state, 'boot');
    const s = helpers(w, d);
    const stored = () => JSON.parse(w.localStorage.getItem('nihongo-recent') || '[]');
    const reason = row => row.querySelector('.gs-reason');
    const row = (name, main) => [...s.group(name).querySelectorAll('.gs-result')].find(r => r.querySelector('.gs-main').textContent === main);
    s.key(d.body, 'k', { ctrlKey: true });
    await until(s.loaded, 'all sections and the lessons load', 30000);
    assert(!s.group('recent'), 'Nothing was opened yet');

    // An inflected form: the vocabulary row says how it was found; the grammar points only
    // contain the form in an example and show that sentence with the match marked.
    await s.search('食べました');
    assert(s.group('vocab').querySelector('.gs-inflection'));
    assert(!reason(s.group('vocab').querySelector('.gs-result')), 'The inflection note is the reason');
    const grammarRows = [...s.group('grammar').querySelectorAll('.gs-result')];
    assert(grammarRows.length > 0, 'Grammar points with 食べました in an example');
    for (const r of grammarRows) {
      assert(reason(r), 'Reason for ' + r.querySelector('.gs-main').textContent);
      assert.match(reason(r).textContent, /^Example: .*食べました/);
      assert.equal(reason(r).querySelector('mark').textContent, '食べました');
      assert.equal(reason(r).querySelector('[lang="ja"]').contains(reason(r).querySelector('mark')), true);
    }
    for (const r of s.group('lessons').querySelectorAll('.gs-result')) assert(reason(r), 'Lesson reason');

    // A match the row shows needs no reason.
    await s.search('から');
    assert(!reason(row('grammar', 'から')));
    await s.search('eat');
    assert(!reason(row('vocab', '食べる')));
    assert(!reason(row('kanji', '食')));

    // A spelling variant finds the headword and names the variant.
    await s.search('子ども');
    assert.equal(reason(row('vocab', '子供')).textContent, 'Spelling variant: 子ども');
    // A category finds its words.
    await s.search('everyday life');
    const byCategory = [...s.group('vocab').querySelectorAll('.gs-result')].filter(r => !r.querySelector('.gs-title').textContent.toLowerCase().includes('everyday life'));
    assert(byCategory.length > 0, 'Words found by their category only');
    for (const r of byCategory) assert.equal(reason(r).textContent, 'Category: Everyday life');
    // A kanji found through one of its example words names the word.
    await s.search('きもち');
    assert.match(reason(row('kanji', '持')).textContent, /^Example word: 気持ち（きもち）/);
    assert.equal(reason(row('kanji', '持')).querySelector('mark').textContent, 'きもち');
    // A long explanation is cut around the match.
    await s.search('nicht-vorhandenes-wort');
    assert.equal(d.querySelectorAll('.gs-reason').length, 0);
    const longText = w.app.sections.grammar.allItems.find(g => g.explanation.length > 300 && !/[\u3040-\u30ff\u4e00-\u9fff]/.test(g.explanation.slice(-30)));
    if (longText) {
      const tail = longText.explanation.slice(-24).trim().toLowerCase();
      await s.search(tail);
      const hit = [...d.querySelectorAll('.gs-result')].map(reason).find(node => node && /^Explanation: …/.test(node.textContent));
      assert(hit, 'A match at the end of a long explanation starts with an ellipsis');
      assert(hit.textContent.length < 200);
    }

    // Recent entries: opened from the search, newest first.
    await s.search('taberu');
    s.key(s.input, 'Enter');
    await until(() => w.app.activeTab === 'vocab' && d.getElementById('vocab-detail-word').textContent === '食べる', 'vocab detail');
    s.key(d.body, 'k', { ctrlKey: true });
    await s.search('水');
    row('kanji', '水').click();
    await until(() => w.app.activeTab === 'kanji' && !w.app.sections.kanji.dom.overlay.classList.contains('hidden'), 'kanji detail');
    assert.deepEqual(stored().map(e => e[0]), ['kanji', 'vocab']);
    // Paging through the list with the arrows is browsing, not a lookup.
    w.app.sections.kanji.navigateDetail(1);
    assert.notEqual(w.app.sections.kanji.selectedItem.kanji, '水');
    assert.equal(stored().length, 2);

    s.key(d.body, 'k', { ctrlKey: true });
    await s.search('');
    assert.deepEqual(s.mains('recent'), ['水', '食べる']);
    assert.equal(s.group('recent').querySelector('.gs-group-title').textContent, 'Recently viewed');
    assert.match(s.status(), /^Searches vocabulary/);
    // Enter in the empty field opens nothing; the arrows reach the list.
    s.key(s.input, 'Enter');
    assert(s.isOpen());
    s.key(s.input, 'ArrowDown');
    assert.equal(d.activeElement, s.group('recent').querySelector('.gs-result'));
    // A recent entry opens like a result and moves to the front.
    s.group('recent').querySelectorAll('.gs-result')[1].click();
    await until(() => w.app.activeTab === 'vocab' && d.getElementById('vocab-detail-word').textContent === '食べる', 'recent entry opens');
    assert(!s.isOpen());
    s.key(d.body, 'k', { ctrlKey: true });
    assert.deepEqual(s.mains('recent'), ['食べる', '水']);
    // A reload restores the view without counting it again, and keeps the list.
    assert.equal(stored().length, 2);
    // An entry that no longer exists is left out.
    w.localStorage.setItem('nihongo-recent', JSON.stringify([['grammar', 'no-such-entry'], ['nowhere', 'x'], 7].concat(stored())));
    await s.search('x1');
    await s.search('');
    assert.deepEqual(s.mains('recent'), ['食べる', '水']);
    // Typing replaces the list; clearing the history removes it and keeps the dialog.
    await s.search('水');
    assert(!s.group('recent'));
    await s.search('');
    s.group('recent').querySelector('.gs-more').click();
    assert(!s.group('recent'));
    assert(s.isOpen());
    assert.equal(d.activeElement, s.input);
    assert.deepEqual(stored(), []);

    const missing = Array.from(w.NIHONGO_I18N.missing()).filter(k => /[A-Za-zÄÖÜäöüß]/.test(k) && !/^N[1-5]$/.test(k));
    assert.deepEqual(missing, [], 'tr() keys without English');
    assert.deepEqual(errors.map(e => e.message), []);
  } finally {
    w.close();
  }
}

async function run() {
  await english();
  await failedLoad();
  await lookup();
  await reasonsAndRecent();
  console.log('Global search test passed: keyboard, results per section, show all, entries, lessons, deferred details, retry, ' +
    'inflected forms, sentences, #search/ addresses, match reasons, recent entries.');
}
run().catch(e => { console.error(e); process.exitCode = 1; });
