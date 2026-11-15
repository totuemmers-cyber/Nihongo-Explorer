// Browser data files evaluated into one VM context, as index.html loads them with <script> tags.
// Shared by the audits and the vocabulary tools, so they all read the data the same way.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const readRepo = file => fs.readFileSync(path.join(ROOT, file), 'utf8');
// The vocabulary sources in the app's merge order, with the global each data file defines.
const VOCAB_SOURCES = Object.freeze([['vocab-n5', 'VOCAB_N5'], ['vocab-n4', 'VOCAB_N4'], ['vocab-n3', 'VOCAB_N3'],
  ['vocab-n2', 'VOCAB_N2'], ['vocab-n1', 'VOCAB_N1'], ['yojijukugo', 'YOJIJUKUGO_DATA'], ['idioms', 'IDIOMS_DATA']]);

// Evaluate `files` into `context` (window is the context itself unless given). `read` may
// supply proposed contents instead of the files on disk.
function loadData(files, context = {}, read = readRepo) {
  if (!Object.hasOwn(context, 'console')) context.console = console;
  if (!Object.hasOwn(context, 'window')) context.window = context;
  for (const file of files) vm.runInNewContext(read(file), context, { filename: file });
  return context;
}

// The raw vocabulary sources defined by the loaded data files.
const vocabSources = context => VOCAB_SOURCES.map(([name, global]) => ({ name, items: context[global] || [] }));

// Define the app's vocabulary merge (mergeVocabSources and its helpers) in the context: the part
// of app.js between the two markers, so audits merge exactly as learners see it.
function loadVocabMerge(context, read = readRepo) {
  const app = read('app.js');
  const start = app.indexOf('  var INTENTIONAL_VOCAB_OVERLAP_KEYS'), end = app.indexOf('  var sectionLoaders');
  if (start < 0 || end < start) throw new Error('The vocabulary merge markers moved in app.js');
  vm.runInNewContext(app.slice(start, end), context, { filename: 'app.js' });
  return context;
}

module.exports = { ROOT, readRepo, VOCAB_SOURCES, loadData, vocabSources, loadVocabMerge };
