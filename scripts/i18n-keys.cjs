// Interface strings the translation dictionaries (i18n-<lang>.js) must cover. German is the
// source language, so every key is the German text as written in the code or in index.html.
//   direct     tr('…') calls with a literal first argument in the runtime scripts
//   markup     text and labelling attributes of index.html (translated by localizeDocument)
//   indirect   strings that reach tr() through a variable: labels, titles, data categories
// Usage: node scripts/i18n-keys.cjs [--missing=en]
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { JSDOM } = require('jsdom');

const ROOT = path.resolve(__dirname, '..');
const RUNTIME_SCRIPTS = ['app.js', 'section.js', 'section-configs.js', 'quiz.js', 'workspace.js', 'comprehension.js',
  'storage.js', 'grammar-lessons.js'];
const ATTRIBUTES = ['title', 'placeholder', 'aria-label', 'data-label', 'alt'];
const LETTER = /[A-Za-zÄÖÜäöüß]/;

const read = file => fs.readFileSync(path.join(ROOT, file), 'utf8');

// String literal starting at index i (a quote); returns [value, endIndex].
function literalAt(src, i) {
  const quote = src[i];
  let j = i + 1, raw = '';
  while (j < src.length && src[j] !== quote) {
    if (src[j] === '\\') { raw += src[j] + src[j + 1]; j += 2; continue; }
    raw += src[j]; j++;
  }
  return [JSON.parse('"' + raw.replace(/\\'/g, "'").replace(/"/g, '\\"') + '"'), j + 1];
}

function directKeys(src) {
  const keys = [];
  const re = /\btr\(\s*(['"])/g;
  let match;
  while ((match = re.exec(src))) keys.push(literalAt(src, match.index + match[0].length - 1)[0]);
  return keys;
}

// Literal values of `key: '...'` pairs inside the object literal that follows marker.
function objectValues(src, marker, onlyKeys) {
  const start = src.indexOf(marker);
  if (start === -1) throw new Error('Marker not found: ' + marker);
  let i = src.indexOf('{', start), depth = 0, end = i;
  for (; end < src.length; end++) {
    if (src[end] === "'" || src[end] === '"') { end = literalAt(src, end)[1] - 1; continue; }
    if (src[end] === '{') depth++;
    else if (src[end] === '}' && --depth === 0) break;
  }
  const block = src.slice(i, end + 1), values = [];
  const re = /(\w+|'[^']*')\s*:\s*(['"])/g;
  let match;
  while ((match = re.exec(block))) {
    const key = match[1].replace(/'/g, '');
    if (!onlyKeys || onlyKeys.includes(key)) values.push(literalAt(block, match.index + match[0].length - 1)[0]);
  }
  return values;
}

function markupKeys() {
  const dom = new JSDOM(read('index.html'));
  const doc = dom.window.document, keys = [];
  const walk = node => {
    if (node.nodeType === 1) {
      if (/^(SCRIPT|STYLE)$/.test(node.tagName) || (node !== doc.body && node.hasAttribute('lang'))) return;
      for (const attr of ATTRIBUTES) {
        const value = node.getAttribute(attr);
        if (value && LETTER.test(value)) keys.push(value);
      }
    } else if (node.nodeType === 3) {
      const text = node.nodeValue.trim();
      if (text && LETTER.test(text)) keys.push(text);
    }
    node.childNodes.forEach(walk);
  };
  walk(doc.body);
  return keys;
}

function runData(files, seed = {}) {
  const c = Object.assign({ console }, seed); c.window = c;
  for (const file of files) vm.runInNewContext(read(file), c, { filename: file });
  return c;
}

function indirectKeys() {
  const keys = [];
  const app = read('app.js'), configs = read('section-configs.js'), quiz = read('quiz.js'), workspace = read('workspace.js');
  const comprehension = read('comprehension.js');
  for (const m of app.matchAll(/^\s+(?:message|error): '([^']+)'/gm)) keys.push(m[1]);
  for (const m of configs.matchAll(/countLabel: '([^']+)'/g)) keys.push(m[1]);
  keys.push(...objectValues(configs, 'var VOCAB_LEVEL_BASIS_LABELS'));
  keys.push(...objectValues(quiz, 'var QUESTION_TYPES', ['group', 'label']));
  for (const m of quiz.matchAll(/\{ name: '([^']+)'/g)) keys.push(m[1]);
  keys.push(...objectValues(workspace, 'var titles'), ...objectValues(workspace, 'var descriptions'));
  keys.push('Grundlagen', 'Üben', 'Nachschlagen', 'Sortierung', 'Wortart', 'Kategorie');
  const jumps = workspace.match(/\[('Basis'[^\]]*)\]\.forEach/);
  keys.push(...jumps[1].split(',').map(s => s.trim().replace(/^'|'$/g, '')));
  keys.push(...objectValues(comprehension, 'var FORMAT_LABELS'));
  keys.push('Lesen', 'Hören');

  // Data values shown as labels: word types, categories, patterns, conjugation forms.
  const constants = runData(['app-constants.js']).NIHONGO_CONSTANTS;
  keys.push(...constants.VOCAB_TYPES, ...constants.COUNTER_CATEGORIES);
  const grammar = runData(['grammar-data.js', 'grammar-n2.js', 'grammar-n1.js', 'keigo-data.js']).GRAMMAR_DATA;
  keys.push(...grammar.map(g => g.category));
  const vocab = runData(['vocab-runtime.js']).VOCAB_RUNTIME.items;
  keys.push(...vocab.map(v => v.category).filter(Boolean), ...vocab.map(v => v.type));
  const ono = runData(['onomatopoeia-data.js']).ONOMATOPOEIA_DATA;
  for (const o of ono) keys.push(o.category, ...(o.tags || []));
  keys.push(...ono.map(o => o.pattern).filter(p => p && LETTER.test(p)), 'Andere');
  keys.push(...runData(['counters-data.js']).COUNTERS_DATA.counters.map(c => c.category));
  const conjugation = runData(['conjugation.js']);
  for (const [reading, group] of [['かく', 'godan'], ['たべる', 'ichidan'], ['する', 'suru'], ['くる', 'kuru']]) {
    const result = conjugation.conjugateVerb(reading, group);
    keys.push(...Object.values(result.forms).map(f => f.label));
  }
  return keys;
}

function requiredKeys() {
  const keys = new Set();
  for (const file of RUNTIME_SCRIPTS) directKeys(read(file)).forEach(k => keys.add(k));
  markupKeys().forEach(k => keys.add(k));
  indirectKeys().forEach(k => keys.add(k));
  return [...keys].filter(k => k && LETTER.test(k)).sort();
}

function dictionary(lang) {
  const c = { window: {} };
  c.window.NIHONGO_I18N = { register: (code, dict) => { c.dict = dict; } };
  vm.runInNewContext(read('i18n-' + lang + '.js'), c, { filename: 'i18n-' + lang + '.js' });
  return c.dict || {};
}

module.exports = { requiredKeys, dictionary, directKeys };

if (require.main === module) {
  const missingArg = process.argv.find(a => a.startsWith('--missing='));
  const keys = requiredKeys();
  if (missingArg) {
    const dict = dictionary(missingArg.split('=')[1]);
    const missing = keys.filter(k => !Object.prototype.hasOwnProperty.call(dict, k));
    console.log(JSON.stringify(missing, null, 1));
    console.error(missing.length + ' of ' + keys.length + ' keys missing');
  } else console.log(JSON.stringify(keys, null, 1));
}
