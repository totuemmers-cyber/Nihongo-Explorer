/* Vocabulary card links (section-configs.js: renderVocabRelations): the transitive or
   intransitive partner of a verb (vocab-verb-pairs.js), words with the same reading, and the
   reading and listening units a word appears in, with the way back from a unit to the card. */
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { ROOT, until, installStubs, openPage } = require('./dom-harness.cjs');

function load(file, name) {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), context, { filename: file });
  return context.window[name];
}

// The pair list against the vocabulary, without a browser.
function pairData() {
  const items = load('vocab-runtime.js', 'VOCAB_RUNTIME').items;
  const pairs = load('vocab-verb-pairs.js', 'VOCAB_VERB_PAIRS');
  assert(Array.isArray(pairs) && pairs.length >= 150, 'Verb pairs: ' + (pairs && pairs.length));
  const verbs = (word, reading) => items.filter(v => v.type === 'Verb' && v.word === word && v.reading === reading);
  const seen = new Set(), sides = new Map();
  for (const pair of pairs) {
    const label = pair.join(' ');
    assert(pair.length === 4 && pair.every(part => typeof part === 'string' && part), 'Four texts: ' + label);
    const [word, reading, partner, partnerReading] = pair;
    assert.equal(verbs(word, reading).length, 1, 'One verb entry for ' + word + ' ' + reading);
    assert.equal(verbs(partner, partnerReading).length, 1, 'One verb entry for ' + partner + ' ' + partnerReading);
    assert.notEqual(word + reading, partner + partnerReading, 'A verb is not its own partner: ' + label);
    assert(!seen.has(label), 'Listed twice: ' + label);
    seen.add(label);
    // A verb is on one side only: never transitive in one pair and intransitive in another.
    for (const [key, side] of [[word + ' ' + reading, 'transitive'], [partner + ' ' + partnerReading, 'intransitive']]) {
      assert(!sides.has(key) || sides.get(key) === side, key + ' is listed as transitive and as intransitive');
      sides.set(key, side);
    }
  }
  return { items, pairs };
}

async function card({ items }) {
  const idOf = (word, reading) => items.find(v => v.word === word && v.reading === reading).id;
  const { w, d, errors } = openPage({ hash: '#vocab/' + encodeURIComponent(idOf('開ける', 'あける')), beforeParse(w) {
    installStubs(w, { lang: 'en' });
    // A listening unit stops its audio when the view changes; jsdom has no media playback.
    w.HTMLMediaElement.prototype.pause = () => {}; w.HTMLMediaElement.prototype.load = () => {};
  } });
  try {
    const overlay = () => w.app.sections.vocab.dom.overlay;
    const shown = id => !d.getElementById(id).classList.contains('hidden');
    const chips = id => [...d.getElementById(id).querySelectorAll('.kanji-vocab-link')];
    const word = () => d.getElementById('vocab-detail-word').textContent;
    await until(() => w.app && w.app.workspace && w.history.state && word() === '開ける', 'card from the address', 30000);
    assert.equal(w.localStorage.getItem('nihongo-recent'), null, 'A restored view is no lookup');

    // The verb pair: the partner with its side.
    assert(shown('vocab-detail-pair-section'));
    assert.equal(d.querySelector('#vocab-detail-pair-section h3').textContent, 'Verb pair');
    const pair = chips('vocab-detail-pair');
    assert.equal(pair.length, 1);
    assert.equal(pair[0].querySelector('.kanji-vocab-word').textContent, '開く');
    assert.equal(pair[0].querySelector('.radical-example-reading').textContent, 'あく');
    assert.equal(pair[0].querySelector('.radical-example-relation').textContent, 'intransitive partner');
    assert.match(pair[0].getAttribute('aria-label'), /^開く, あく, .*, intransitive partner: open vocabulary card$/);

    // Words read the same, without the word itself.
    assert(shown('vocab-detail-homophones-section'));
    const same = chips('vocab-detail-homophones').map(chip => chip.querySelector('.kanji-vocab-word').textContent);
    assert(same.includes('明ける'), 'Same reading: ' + same.join(' '));
    assert(!same.includes('開ける'));

    // The units arrive after the passage links; each opens its unit.
    await until(() => shown('vocab-detail-units-section'), 'units for 開ける', 30000);
    const units = chips('vocab-detail-units');
    assert(units.length > 0);
    assert.match(units[0].querySelector('.radical-example-relation').textContent, /^(Reading|Listening) · N[1-5]$/);
    const firstTitle = units[0].querySelector('.radical-example-text span').textContent;
    const links = w.COMPREHENSION_LINKS, entry = links.entries.findIndex(e => e[0] === idOf('開ける', 'あける'));
    const unit = w.COMPREHENSION_UNITS.find(u => u.title === firstTitle);
    assert(unit.passages.some(block => links.passages[block.id].spans.some(span => span[2] === entry)), 'The unit contains the word');

    // The partner opens as a cross-reference, shows this verb as its transitive partner, and
    // counts as a lookup.
    pair[0].click();
    await until(() => word() === '開く' && d.getElementById('vocab-detail-reading').textContent === 'あく', 'partner card');
    const backPair = chips('vocab-detail-pair');
    assert.deepEqual(backPair.map(chip => chip.querySelector('.kanji-vocab-word').textContent), ['開ける']);
    assert.equal(backPair[0].querySelector('.radical-example-relation').textContent, 'transitive partner');
    assert.deepEqual(JSON.parse(w.localStorage.getItem('nihongo-recent')), [['vocab', idOf('開く', 'あく')]]);
    const back = overlay().querySelector('.detail-back');
    assert(!back.hidden);
    back.click();
    await until(() => word() === '開ける', 'back to 開ける');

    // A unit opens with the way back to the card.
    await until(() => shown('vocab-detail-units-section') && chips('vocab-detail-units').length, 'units again');
    chips('vocab-detail-units')[0].click();
    await until(() => w.app.activeTab === unit.skill && d.querySelector('#' + unit.skill + '-tab h2') &&
      d.querySelector('#' + unit.skill + '-tab h2').textContent === unit.title, 'unit opens', 30000);
    assert.equal(w.location.hash, '#' + unit.skill + '/' + unit.id);
    assert(overlay().classList.contains('hidden'));
    const buttons = [...d.querySelectorAll('#' + unit.skill + '-tab > button')];
    assert.equal(buttons[0].textContent, '← Back');
    assert.match(buttons[1].textContent, /^← Back to (Reading|Listening)$/);
    buttons[0].click();
    await until(() => w.app.activeTab === 'vocab' && !overlay().classList.contains('hidden') && word() === '開ける', 'back to the card');
    // Opened from the unit list, the unit has no such button.
    d.querySelector('.tab-btn[data-tab="' + unit.skill + '"]').click();
    await until(() => d.querySelector('#' + unit.skill + '-tab h2'), 'unit view');
    if (!d.querySelector('#' + unit.skill + '-tab [data-unit]')) [...d.querySelectorAll('#' + unit.skill + '-tab > button')].pop().click();
    await until(() => d.querySelector('#' + unit.skill + '-tab [data-unit]'), 'unit list');
    d.querySelector('#' + unit.skill + '-tab [data-unit]').click();
    await until(() => d.querySelector('#' + unit.skill + '-tab .comprehension-unit'), 'unit from the list');
    assert(![...d.querySelectorAll('#' + unit.skill + '-tab > button')].some(b => b.textContent === '← Back'));

    // A word without relations shows none of the sections.
    const vocab = w.app.sections.vocab;
    const linked = new Set(links.entries.map(e => e[0]));
    const readings = new Map();
    vocab.allItems.forEach(v => readings.set(v.reading, (readings.get(v.reading) || 0) + 1));
    const plain = vocab.allItems.find(v => v.type === 'Nomen' && readings.get(v.reading) === 1 && !linked.has(v.id));
    await w.app.workspace.openRelated('vocab', v => v === plain);
    await until(() => word() === plain.word, 'plain card');
    await w.Comprehension.loadLinks();
    await new Promise(resolve => setTimeout(resolve, 50));
    for (const id of ['vocab-detail-pair-section', 'vocab-detail-homophones-section', 'vocab-detail-units-section']) assert(!shown(id), id + ' for ' + plain.word);

    // A reading shared by many words shows the first and offers the rest.
    const crowded = vocab.allItems.find(v => readings.get(v.reading) > 12);
    await w.app.workspace.openRelated('vocab', v => v === crowded);
    await until(() => word() === crowded.word && shown('vocab-detail-homophones-section'), 'crowded card');
    assert.equal(chips('vocab-detail-homophones').length, 8);
    const more = d.querySelector('#vocab-detail-homophones .btn-pill');
    assert.equal(more.textContent, 'Show all ' + (readings.get(crowded.reading) - 1));
    more.click();
    assert.equal(chips('vocab-detail-homophones').length, readings.get(crowded.reading) - 1);
    assert.equal(d.activeElement, chips('vocab-detail-homophones')[8]);

    const missing = Array.from(w.NIHONGO_I18N.missing()).filter(k => /[A-Za-zÄÖÜäöüß]/.test(k) && !/^N[1-5]$/.test(k));
    assert.deepEqual(missing, [], 'tr() keys without English');
    assert.deepEqual(errors.map(e => e.message), []);
  } finally {
    w.close();
  }
}

async function run() {
  const data = pairData();
  await card(data);
  console.log('Vocabulary relations test passed: ' + data.pairs.length + ' verb pairs, partner, same reading, units with the way back.');
}
run().catch(e => { console.error(e); process.exitCode = 1; });
