const fs = require('fs');
const path = require('path');
const vm = require('vm');
const root = path.resolve(__dirname, '..');
const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const norm = text => (text || '').normalize('NFKC').replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 96)).replace(/\s/g, '');
const key = item => norm(item.word) + '|' + norm(item.reading);
function loadVocabulary(proposedFiles = {}) {
  const readProposed = file => Object.hasOwn(proposedFiles, file) ? proposedFiles[file] : read(file);
  const c = { console }; c.window = c;
  for (const file of ['app-constants.js', 'conjugation.js', ...levels.map(l => 'vocab-' + l.toLowerCase() + '.js'),
    'yojijukugo-data.js', 'idioms-data.js', 'vocab-correction-rules.js', 'vocab-example-overrides.js', 'vocab-corrections.js']) {
    vm.runInNewContext(readProposed(file), c, { filename: file });
  }
  const app = read('app.js');
  vm.runInNewContext(app.slice(app.indexOf('  var INTENTIONAL_VOCAB_OVERLAP_KEYS'), app.indexOf('  var sectionLoaders')), c);
  const sources = levels.map(l => ({ name: 'vocab-' + l.toLowerCase(), items: c['VOCAB_' + l] }));
  sources.push({ name: 'yojijukugo', items: c.YOJIJUKUGO_DATA }, { name: 'idioms', items: c.IDIOMS_DATA });
  return { c, sources, items: c.mergeVocabSources(c.getNormalizedVocabSources(sources)) };
}
module.exports = { root, levels, read, norm, key, loadVocabulary };
