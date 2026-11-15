const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const CHECK_EXTENSIONS = new Set(['.js', '.cjs', '.html', '.css']);
const IGNORE_DIRS = new Set(['.git', 'node_modules', '.content-cache']);
const MOJIBAKE_PATTERN = /(?:\u00C3.|\u00E2.|\u00E3[\u0080-\u00BF]|\u00E6[\u0080-\u00BF]|\u00E5[\u0080-\u00BF])/;

function walk(dir, files) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (!IGNORE_DIRS.has(entry.name)) {
        walk(path.join(dir, entry.name), files);
      }
      continue;
    }

    const ext = path.extname(entry.name);
    if (CHECK_EXTENSIONS.has(ext)) {
      files.push(path.join(dir, entry.name));
    }
  }
}

function relative(file) {
  return path.relative(ROOT, file).replace(/\\/g, '/');
}

function findMojibake(text) {
  const lines = text.split(/\r?\n/);
  const hits = [];
  for (let i = 0; i < lines.length; i++) {
    if (MOJIBAKE_PATTERN.test(lines[i])) {
      hits.push({ line: i + 1, text: lines[i].trim() });
    }
  }
  return hits;
}

const files = [];
walk(ROOT, files);

const errors = [];

// Compile without running, as `node --check` does for CommonJS: wrapped in the module function.
const MODULE_PARAMETERS = ['exports', 'require', 'module', '__filename', '__dirname'];
function syntaxError(text, file) {
  try {
    vm.compileFunction(text, MODULE_PARAMETERS, { filename: file });
    return null;
  } catch (error) {
    if (!(error instanceof SyntaxError)) throw error;
    // The stack starts with "file:line", the source line and a caret under the error.
    return error.stack.split('\n').slice(0, 3).join('\n') + '\nSyntaxError: ' + error.message;
  }
}

for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  if (path.extname(file) === '.js' || path.extname(file) === '.cjs') {
    const syntax = syntaxError(text, file);
    if (syntax) errors.push('Syntax check failed for ' + relative(file) + '\n' + syntax);
  }

  const mojibakeHits = findMojibake(text);
  if (mojibakeHits.length > 0) {
    const preview = mojibakeHits.slice(0, 5).map(function (hit) {
      return '  line ' + hit.line + ': ' + hit.text;
    }).join('\n');
    errors.push('Mojibake detected in ' + relative(file) + '\n' + preview);
  }
}

if (errors.length > 0) {
  console.error(errors.join('\n\n'));
  process.exit(1);
}

console.log('Lint passed for ' + files.length + ' files.');
