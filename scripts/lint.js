const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const CHECK_EXTENSIONS = new Set(['.js', '.html', '.css']);
const IGNORE_DIRS = new Set(['.git', 'node_modules', 'scripts']);
const MOJIBAKE_PATTERN = /(?:Ã.|â.|ã[\u0080-\u00BF]|æ[\u0080-\u00BF]|å[\u0080-\u00BF])/;

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

for (const file of files) {
  if (path.extname(file) === '.js') {
    const syntax = spawnSync(process.execPath, ['--check', file], {
      cwd: ROOT,
      encoding: 'utf8'
    });
    if (syntax.status !== 0) {
      errors.push('Syntax check failed for ' + relative(file) + '\n' + (syntax.stderr || syntax.stdout || '').trim());
    }
  }

  const text = fs.readFileSync(file, 'utf8');
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
