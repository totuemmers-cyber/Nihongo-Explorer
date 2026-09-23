// Runs every read-only lint, test and audit in one pass.
// Scripts that write content (build:*, import:*, review:*) are deliberately absent, and so is
// audit:vocabulary-completion, whose completion gates stay open while the vocabulary review runs.
// --full adds the vocabulary workflow tests, which create and delete folders in the OS temp dir.
const cp = require('child_process');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const scripts = require('../package.json').scripts;

const CHECKS = [
  'lint',
  'test:smoke',
  'test:ui',
  'test:kana',
  'test:storage',
  'test:contrast',
  'test:comprehension',
  'test:audio',
  'test:vocabulary-triage',
  'audit:data',
  'audit:verbs',
  'audit:quiz',
  'audit:content',
  'audit:comprehension',
  'audit:radicals',
  'audit:counters',
  'audit:beginner',
  'audit:vocabulary'
];
const FULL_CHECKS = ['test:quiz-review', 'test:vocabulary-completion'];

const names = CHECKS.concat(process.argv.includes('--full') ? FULL_CHECKS : []);
const failed = [];

for (const name of names) {
  if (!scripts[name]) throw new Error('Unknown package script: ' + name);
  // Chained scripts ("a && b") run each command in turn and stop at the first failure.
  let status = 0;
  let output = '';
  for (const command of scripts[name].split('&&')) {
    const args = command.trim().split(/\s+/).slice(1);
    const result = cp.spawnSync(process.execPath, args, { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
    output += (result.stdout || '') + (result.stderr || '');
    status = result.status === null ? 1 : result.status;
    if (status !== 0) break;
  }
  console.log((status === 0 ? 'PASS ' : 'FAIL ') + name);
  if (status !== 0) {
    failed.push(name);
    console.log(output.trim().split(/\r?\n/).slice(-20).map(function (line) { return '    ' + line; }).join('\n'));
  }
}

console.log(failed.length ? '\n' + failed.length + ' of ' + names.length + ' checks failed.' : '\nAll ' + names.length + ' checks passed.');
process.exitCode = failed.length ? 1 : 0;
