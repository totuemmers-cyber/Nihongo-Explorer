const { ROOT: root, readRepo: read, loadData, vocabSources, loadVocabMerge } = require('./data-context.cjs');
const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];
const norm = text => (text || '').normalize('NFKC').replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 96)).replace(/\s/g, '');
const key = item => norm(item.word) + '|' + norm(item.reading);
function loadVocabulary(proposedFiles = {}) {
  const readProposed = file => Object.hasOwn(proposedFiles, file) ? proposedFiles[file] : read(file);
  const c = loadData(['app-constants.js', 'conjugation.js', ...levels.map(l => 'vocab-' + l.toLowerCase() + '.js'),
    'yojijukugo-data.js', 'idioms-data.js', 'vocab-correction-rules.js', 'vocab-example-overrides.js', 'vocab-corrections.js'], {}, readProposed);
  loadVocabMerge(c);
  const sources = vocabSources(c);
  return { c, sources, items: c.mergeVocabSources(c.getNormalizedVocabSources(sources)) };
}
module.exports = { root, levels, read, norm, key, loadVocabulary };
