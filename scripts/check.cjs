// Read-only checks run in bounded parallel processes. Writing workflows stay
// excluded; full import tests use their own OS temporary directories.
const assert = require('assert');
const cp = require('child_process');
const os = require('os');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CHECKS = Object.freeze([
  'lint',
  'test:smoke',
  'test:ui',
  'test:kana',
  'test:storage',
  'test:contrast',
  'test:comprehension',
  'test:audio',
  'test:vocabulary-triage',
  'test:romaji',
  'audit:data',
  'audit:verbs',
  'audit:quiz',
  'audit:content',
  'audit:comprehension',
  'audit:radicals',
  'audit:counters',
  'audit:beginner',
  'audit:vocabulary',
  'audit:vocab-runtime'
]);
const FULL_CHECKS = Object.freeze(['test:quiz-review', 'test:vocabulary-completion', 'test:check-runner']);
const defaultJobs = () => Math.min(3, os.availableParallelism(), os.freemem() < 4 * 1024 ** 3 ? 1 : 3);

function parseOptions(args) {
  const options = { full: false, jobs: defaultJobs(), only: null }, seen = new Set();
  for (const arg of args) {
    const name = arg.split('=')[0];
    assert(!seen.has(name), 'Repeated option ' + name);
    seen.add(name);
    if (arg === '--full') options.full = true;
    else if (arg.startsWith('--jobs=')) options.jobs = Number(arg.slice(7));
    else if (arg.startsWith('--only=')) options.only = arg.slice(7).split(',');
    else throw new Error('Unknown option ' + arg);
  }
  assert(Number.isInteger(options.jobs) && options.jobs >= 1 && options.jobs <= 16, '--jobs must be an integer from 1 to 16');
  assert(!(options.full && options.only), 'A full check cannot be narrowed; use check --only=... for focused verification');
  return options;
}

function checkNames({ full = false, only = null } = {}) {
  if (!only) return [...CHECKS, ...(full ? FULL_CHECKS : [])];
  const known = new Set([...CHECKS, ...FULL_CHECKS]);
  assert(only.length && only.every(name => known.has(name)), 'Unknown or empty --only check; build/import commands are not allowed');
  assert.equal(new Set(only).size, only.length, 'Repeated --only check');
  return [...only];
}

function commands(script) {
  assert(typeof script === 'string' && script.trim(), 'Unknown package script');
  return script.split('&&').map(command => {
    const words = command.trim().split(/\s+/);
    assert(words[0] === 'node' && words.length > 1, 'Checks must use direct Node commands');
    return words.slice(1);
  });
}

function execute(args, cwd, maxOutputBytes) {
  return new Promise(resolve => {
    const child = cp.spawn(process.execPath, args, { cwd, windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] });
    const chunks = [];
    let bytes = 0, error = null;
    const capture = chunk => {
      bytes += Buffer.byteLength(chunk);
      if (bytes <= maxOutputBytes) chunks.push(chunk);
      else if (!error) { error = 'Check output exceeded ' + maxOutputBytes + ' bytes'; child.kill(); }
    };
    child.stdout.setEncoding('utf8');
    child.stderr.setEncoding('utf8');
    child.stdout.on('data', capture);
    child.stderr.on('data', capture);
    child.on('error', err => { error = err.message; });
    child.on('close', code => resolve({ status: error ? 1 : code ?? 1, output: chunks.join('') + (error ? '\n' + error : '') }));
  });
}

async function runChecks({ names, scripts, cwd = ROOT, jobs = defaultJobs(), log = console.log, maxOutputBytes = 64 * 1024 * 1024 }) {
  assert(Array.isArray(names) && names.length && new Set(names).size === names.length, 'Checks must be a nonempty unique list');
  assert(Number.isInteger(jobs) && jobs >= 1 && jobs <= 16, 'Invalid check concurrency');
  const prepared = new Map(names.map(name => [name, commands(scripts[name])]));
  // Start the long workflow group early; commands within each group stay sequential.
  const scheduled = [...names.filter(name => name === 'test:vocabulary-completion'), ...names.filter(name => name !== 'test:vocabulary-completion')];
  const started = performance.now(), results = new Map();
  let next = 0;
  async function worker() {
    while (next < scheduled.length) {
      const name = scheduled[next++], start = performance.now();
      let output = '', status = 0;
      for (const args of prepared.get(name)) {
        const result = await execute(args, cwd, maxOutputBytes);
        status = result.status;
        output += result.output;
        if (status !== 0) break;
      }
      const durationMs = performance.now() - start;
      results.set(name, { name, status, output, durationMs });
      log((status === 0 ? 'PASS ' : 'FAIL ') + name + ' (' + (durationMs / 1000).toFixed(1) + 's)');
      if (status !== 0) log(output.trim().split(/\r?\n/).slice(-20).map(line => '    ' + line).join('\n'));
    }
  }
  await Promise.all(Array.from({ length: Math.min(jobs, names.length) }, worker));
  const ordered = names.map(name => results.get(name));
  return { results: ordered, failed: ordered.filter(result => result.status !== 0).map(result => result.name), durationMs: performance.now() - started, jobs: Math.min(jobs, names.length) };
}

async function main(args = process.argv.slice(2)) {
  const options = parseOptions(args), names = checkNames(options);
  console.log('Running ' + names.length + ' checks with ' + options.jobs + ' worker' + (options.jobs === 1 ? '' : 's') + (options.only ? ' (focused selection).' : '.'));
  const result = await runChecks({ names, scripts: require('../package.json').scripts, jobs: options.jobs });
  console.log(result.failed.length ? '\n' + result.failed.length + ' of ' + names.length + ' checks failed.' : '\nAll ' + names.length + ' checks passed.');
  console.log('Elapsed ' + (result.durationMs / 1000).toFixed(1) + 's.');
  return result;
}

module.exports = { CHECKS, FULL_CHECKS, parseOptions, checkNames, runChecks, main };
if (require.main === module) {
  main().then(result => { process.exitCode = result.failed.length ? 1 : 0; }).catch(error => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
