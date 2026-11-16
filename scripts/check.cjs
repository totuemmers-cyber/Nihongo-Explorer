// Read-only checks run in bounded parallel processes. Writing workflows stay
// excluded; import tests use their own OS temporary directories.
const assert = require('assert');
const cp = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
// The single list of checks. A check is a package.json script; `regular` checks run in
// `npm run check`, `full` checks only in `npm run check:full`. The weight is the typical
// duration in seconds and starts the longest checks first. A group names checks that
// `--group=` runs together.
const REGISTRY = Object.freeze([
  ['lint', 'regular', 1.5],
  ['test:smoke', 'regular', 12],
  ['test:ui', 'regular', 8],
  ['test:kana', 'regular', 1],
  ['test:search', 'regular', 6],
  ['test:storage', 'regular', 8],
  ['test:contrast', 'regular', 0.1],
  ['test:comprehension', 'regular', 7],
  ['test:audio', 'regular', 0.1],
  ['test:vocabulary-triage', 'regular', 0.1],
  ['test:romaji', 'regular', 1],
  ['test:furigana', 'regular', 0.3],
  ['test:i18n', 'regular', 7],
  ['test:vocabulary-workflow', 'regular', 0.7, 'vocabulary-completion'],
  ['test:vocabulary-batch', 'regular', 0.4, 'vocabulary-completion'],
  ['test:vocabulary-research-cache', 'regular', 0.1, 'vocabulary-completion'],
  ['test:vocabulary-editorial-record', 'regular', 0.1, 'vocabulary-completion'],
  ['test:vocabulary-phase', 'regular', 0.1, 'vocabulary-completion'],
  ['test:vocabulary-author-review', 'regular', 0.2, 'vocabulary-completion'],
  ['audit:data', 'regular', 1],
  ['audit:verbs', 'regular', 15],
  ['audit:quiz', 'regular', 11],
  ['audit:content', 'regular', 2],
  ['audit:comprehension', 'regular', 1],
  ['audit:comprehension-links', 'regular', 0.2],
  ['audit:radicals', 'regular', 0.1],
  ['audit:counters', 'regular', 0.1],
  ['audit:beginner', 'regular', 3],
  ['audit:vocabulary', 'regular', 16],
  ['audit:vocab-runtime', 'regular', 2.5],
  ['audit:vocabulary-levels', 'regular', 0.4],
  ['audit:english', 'regular', 1],
  ['test:quiz-review', 'full', 2.5],
  ['test:check-runner', 'full', 1],
  ['test:vocabulary-correction', 'full', 13, 'vocabulary-completion'],
  ['test:vocabulary-completion-rejections', 'full', 25, 'vocabulary-completion'],
  ['test:vocabulary-completion-replay-additions', 'full', 36, 'vocabulary-completion'],
  ['test:vocabulary-completion-replay-content', 'full', 33, 'vocabulary-completion'],
  ['test:vocabulary-completion-addition-import', 'full', 42, 'vocabulary-completion'],
  ['test:vocabulary-completion-addition-replay', 'full', 49, 'vocabulary-completion']
].map(([name, tier, weight, group = null]) => Object.freeze({ name, tier, weight, group })));
// package.json test: and audit: scripts that are deliberately not checks, with the reason.
const NOT_CHECKS = Object.freeze({
  'test:vocabulary-completion': 'alias for --group=vocabulary-completion',
  'audit:vocabulary-completion': 'campaign gate; audit:vocabulary runs its checks on the same plan',
  'audit:vocabulary-enrichment': 'strict enrichment gate for certification, not a regression check'
});
const BY_NAME = new Map(REGISTRY.map(check => [check.name, check]));
const CHECKS = Object.freeze(REGISTRY.filter(c => c.tier === 'regular').map(c => c.name));
const FULL_CHECKS = Object.freeze(REGISTRY.filter(c => c.tier === 'full').map(c => c.name));
const GROUPS = Object.freeze([...new Set(REGISTRY.map(c => c.group).filter(Boolean))]);
// Measured on 32 cores: 6 workers run `check` in 17s, more are no faster. Each worker may hold
// a full vocabulary validation (about 1.2 GiB).
const defaultJobs = () => Math.max(1, Math.min(6, os.availableParallelism() - 1, Math.floor(os.freemem() / (1.5 * 1024 ** 3))));

function parseOptions(args) {
  const options = { full: false, jobs: defaultJobs(), only: null, group: null, changed: null }, seen = new Set();
  for (const arg of args) {
    const name = arg.split('=')[0];
    assert(!seen.has(name), 'Repeated option ' + name);
    seen.add(name);
    if (arg === '--full') options.full = true;
    else if (arg.startsWith('--jobs=')) options.jobs = Number(arg.slice(7));
    else if (arg.startsWith('--only=')) options.only = arg.slice(7).split(',');
    else if (arg.startsWith('--group=')) options.group = arg.slice(8);
    else if (arg === '--changed') options.changed = 'HEAD';
    else if (arg.startsWith('--changed=')) options.changed = arg.slice(10);
    else throw new Error('Unknown option ' + arg);
  }
  assert(Number.isInteger(options.jobs) && options.jobs >= 1 && options.jobs <= 16, '--jobs must be an integer from 1 to 16');
  assert([options.full, options.only, options.group, options.changed].filter(Boolean).length <= 1,
    'Use only one of --full, --only, --group and --changed; a full check cannot be narrowed');
  assert(options.changed === null || /^[\w./@^~-]+$/.test(options.changed), 'Invalid --changed revision');
  return options;
}

function checkNames({ full = false, only = null, group = null } = {}) {
  if (group !== null) {
    assert(GROUPS.includes(group), 'Unknown group ' + group + '; use ' + GROUPS.join(', '));
    return REGISTRY.filter(c => c.group === group).map(c => c.name);
  }
  if (!only) return [...CHECKS, ...(full ? FULL_CHECKS : [])];
  assert(only.length && only.every(name => BY_NAME.has(name)), 'Unknown or empty --only check; build/import commands are not allowed');
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

// --- Selection by changed files ---------------------------------------------------------------
// A check depends on its entry scripts and on every repository file they name in a string
// literal, followed through scripts. Only changes to scripts narrow the selection: application
// and data files are loaded through index.html or by computed names (and app.js feeds the
// vocabulary pipeline), so a change to one, or to a script file that no check names (including
// a deleted file), selects every check, as check:full does. Documentation selects nothing.
const LITERAL = /['"`]([\w./-]+\.(?:cjs|js|json|tsv|css|html|md))['"`]/g;
const isScanned = file => file.startsWith('scripts/') && /\.c?js$/.test(file) || /^audit-[\w-]+\.js$/.test(file);
function dependencies(entries, cwd = ROOT) {
  const seen = new Set(), queue = [...entries];
  while (queue.length) {
    const file = queue.pop();
    if (seen.has(file)) continue;
    seen.add(file);
    if (!isScanned(file)) continue;
    const text = fs.readFileSync(path.join(cwd, file), 'utf8');
    for (const [, literal] of text.matchAll(LITERAL)) {
      for (const base of [path.posix.dirname(file), '.', 'scripts']) {
        const candidate = path.posix.normalize(path.posix.join(base, literal));
        if (candidate.startsWith('..') || seen.has(candidate)) continue;
        const absolute = path.join(cwd, candidate);
        if (fs.existsSync(absolute) && fs.statSync(absolute).isFile()) queue.push(candidate);
      }
    }
  }
  return seen;
}
function selectForChanges(changed, scripts, cwd = ROOT) {
  const reasons = new Map(), add = (name, why) => { if (!reasons.has(name)) reasons.set(name, why); };
  const closures = REGISTRY.map(c => [c.name, dependencies(commands(scripts[c.name]).map(args => args[0]), cwd)]);
  let all = null;
  for (const file of changed) {
    if (/\.(c?js|html|css)$/.test(file)) add('lint', file);
    const named = closures.filter(([, files]) => files.has(file));
    for (const [name] of named) add(name, file);
    if (/\.md$/.test(file) || file === '.gitignore') continue;
    if (!file.startsWith('scripts/') && !isScanned(file)) all ??= file + ' (application or data file)';
    else if (!named.length) all ??= file + ' (named by no check)';
  }
  if (all) for (const { name } of REGISTRY) add(name, all);
  // Registry order keeps the output stable.
  return REGISTRY.filter(c => reasons.has(c.name)).map(c => ({ name: c.name, reason: reasons.get(c.name) }));
}
function changedFiles(since, cwd = ROOT) {
  const git = args => {
    const result = cp.spawnSync('git', args, { cwd, encoding: 'utf8', windowsHide: true });
    if (result.error) throw new Error('--changed needs git on PATH: ' + result.error.message);
    assert.equal(result.status, 0, 'git ' + args.join(' ') + ' failed: ' + result.stderr.trim());
    return result.stdout.split(/\r?\n/).filter(Boolean);
  };
  return [...new Set([...git(['diff', '--name-only', since]), ...git(['ls-files', '--others', '--exclude-standard'])])];
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

// Longest first, so the slowest check does not start last; equal weights keep the given order.
function schedule(names, weights = name => BY_NAME.get(name)?.weight ?? 0) {
  return names.map((name, index) => ({ name, index, weight: weights(name) }))
    .sort((a, b) => b.weight - a.weight || a.index - b.index).map(item => item.name);
}

async function runChecks({ names, scripts, cwd = ROOT, jobs = defaultJobs(), log = console.log, maxOutputBytes = 64 * 1024 * 1024 }) {
  assert(Array.isArray(names) && names.length && new Set(names).size === names.length, 'Checks must be a nonempty unique list');
  assert(Number.isInteger(jobs) && jobs >= 1 && jobs <= 16, 'Invalid check concurrency');
  const prepared = new Map(names.map(name => [name, commands(scripts[name])]));
  const scheduled = schedule(names);
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
  const options = parseOptions(args), scripts = require('../package.json').scripts;
  let names;
  if (options.changed) {
    const changed = changedFiles(options.changed);
    const selected = selectForChanges(changed, scripts);
    console.log(changed.length + ' changed file' + (changed.length === 1 ? '' : 's') + ' since ' + options.changed + '.');
    for (const { name, reason } of selected) console.log('  ' + name + ' <- ' + reason);
    if (!selected.length) { console.log('No check depends on these changes.'); return { results: [], failed: [], durationMs: 0, jobs: 0 }; }
    names = selected.map(item => item.name);
  } else names = checkNames(options);
  const focused = options.only || options.group || options.changed;
  console.log('Running ' + names.length + ' checks with ' + options.jobs + ' worker' + (options.jobs === 1 ? '' : 's') + (focused ? ' (focused selection).' : '.'));
  const result = await runChecks({ names, scripts, jobs: options.jobs });
  console.log(result.failed.length ? '\n' + result.failed.length + ' of ' + names.length + ' checks failed.' : '\nAll ' + names.length + ' checks passed.');
  console.log('Elapsed ' + (result.durationMs / 1000).toFixed(1) + 's.');
  return result;
}

module.exports = { REGISTRY, NOT_CHECKS, CHECKS, FULL_CHECKS, GROUPS, parseOptions, checkNames, schedule, dependencies, selectForChanges, changedFiles, runChecks, main };
if (require.main === module) {
  main().then(result => { process.exitCode = result.failed.length ? 1 : 0; }).catch(error => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
