/* Kana tab: extended katakana and the small-character table render and play their examples. */
const assert = require('node:assert/strict');
const { until, installStubs, openPage } = require('./dom-harness.cjs');

async function run() {
  const spoken = [];
  // These checks cover the German interface (installStubs stores it; English is the default).
  const { w, d, errors } = openPage({ hash: '#kana', beforeParse: w => installStubs(w, { spoken }) });
  try {
    await until(() => w.app && w.app.workspace && d.querySelector('.kana-special-table'), 'kana ready');
    const data = w.KANA_DATA;
    const headers = () => [...d.querySelectorAll('.kana-section-header')].map(h => h.textContent);

    // Hiragana mode: the syllable grids keep their 107 cells; loanword sounds stay hidden.
    assert.equal(d.querySelectorAll('button.kana-cell-inner').length, 107);
    assert(!headers().some(h => h.includes('Erweiterte Katakana')));
    const rows = d.querySelectorAll('.kana-special-table tbody tr');
    assert.equal(rows.length, data.special.length);
    assert.equal(rows[0].querySelector('.kana-special-char').textContent, 'っ');
    const examples = d.querySelectorAll('.kana-special-example');
    assert.equal(examples.length, data.special.reduce((n, s) => n + s.examples.length, 0));
    examples[0].click();
    await until(() => spoken.includes('きって'), 'example playback');

    // Katakana mode adds the extended grid, and every special row switches script.
    d.querySelector('[data-kana="katakana"]').click();
    await until(() => headers().some(h => h.includes('Erweiterte Katakana')), 'extended katakana');
    const extendedCells = data.extended.reduce((n, r) => n + r.chars.filter(Boolean).length, 0);
    assert.equal(d.querySelectorAll('button.kana-cell-inner').length, 107 + extendedCells);
    assert.equal(d.querySelector('.kana-special-table .kana-special-char').textContent, 'ッ');
    const fa = [...d.querySelectorAll('.kana-char')].find(el => el.textContent === 'ファ');
    assert(fa, 'ファ cell');
    fa.closest('button').click();
    await until(() => spoken.includes('ふぁ'), 'extended playback');

    // The last jump reaches the special table in both modes.
    const jump = [...d.querySelectorAll('.kana-jumps button')].find(b => b.textContent === 'Sonderzeichen');
    jump.click();
    assert.equal(d.activeElement, d.querySelector('.kana-special-table').closest('.kana-section'));

    // Every extended cell has a hiragana spelling for playback and a romanization.
    for (const row of data.extended) for (const ch of row.chars.filter(Boolean)) {
      assert(ch.h && ch.k && ch.r, row.label);
      assert(!/[ァ-ヶ]/.test(ch.h), 'Playback spelling must be hiragana: ' + ch.k);
    }
    assert.deepEqual(errors, []);
    console.log('Kana test passed: ' + extendedCells + ' extended katakana, ' + data.special.length + ' special signs.');
  } finally {
    w.close();
  }
}
run().catch(e => { console.error(e); process.exitCode = 1; });
