const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const cp = require('child_process');
const { CHECKS, FULL_CHECKS, parseOptions, checkNames, runChecks } = require('./check.cjs');

const EXPECTED = ['lint', 'test:smoke', 'test:ui', 'test:kana', 'test:storage', 'test:contrast', 'test:comprehension', 'test:audio', 'test:vocabulary-triage', 'test:romaji', 'audit:data', 'audit:verbs', 'audit:quiz', 'audit:content', 'audit:comprehension', 'audit:radicals', 'audit:counters', 'audit:beginner', 'audit:vocabulary', 'audit:vocab-runtime', 'test:quiz-review', 'test:vocabulary-completion'];
assert.deepEqual(CHECKS, EXPECTED.slice(0, 20));
assert(EXPECTED.every(name => checkNames({ full: true }).includes(name)), 'All existing checks must remain in the full suite');
assert(FULL_CHECKS.includes('test:check-runner'));
assert.deepEqual(checkNames(parseOptions(['--only=lint,test:audio', '--jobs=1'])), ['lint', 'test:audio']);
for (const args of [['--jobs=0'], ['--jobs=1.5'], ['--jobs=17'], ['--jobs=NaN'], ['--full', '--only=lint'], ['--jobs=1', '--jobs=2'], ['--unknown']]) assert.throws(() => parseOptions(args));
for (const only of [[''], ['import:vocabulary-completion'], ['lint', 'lint']]) assert.throws(() => checkNames({ only }));

const base = fs.mkdtempSync(path.join(os.tmpdir(), 'nihongo-check-runner-'));
const fixture = `const fs = require('fs');
const mode = process.argv[2];
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
(async () => {
  if (mode === 'fail') { console.error('Deliberate fixture failure'); process.exitCode = 7; return; }
  if (mode === 'sentinel') { fs.writeFileSync('should-not-run', 'bad'); return; }
  if (mode === 'loud') { console.log('x'.repeat(2048)); return; }
  console.log(JSON.stringify({ type: 'start', name: mode, time: Date.now() }));
  fs.writeFileSync(mode + '.started', 'yes');
  if (mode === 'a' || mode === 'b') {
    const deadline = Date.now() + 10000;
    while (!fs.existsSync('a.started') || !fs.existsSync('b.started')) {
      if (Date.now() > deadline) throw Error('Workers did not run in parallel');
      await wait(10);
    }
  }
  await wait(100);
  console.log(JSON.stringify({ type: 'end', name: mode, time: Date.now() }));
})().catch(error => { console.error(error); process.exitCode = 1; });
`;

async function run() {
  try {
    fs.writeFileSync(path.join(base, 'fixture.cjs'), fixture);
    const messages = [];
    const result = await runChecks({ names: ['a', 'b', 'c'], scripts: { a: 'node fixture.cjs a', b: 'node fixture.cjs b', c: 'node fixture.cjs c' }, cwd: base, jobs: 2, log: message => messages.push(message) });
    assert.deepEqual(result.failed, []);
    assert.deepEqual(result.results.map(item => item.name), ['a', 'b', 'c']);
    const events = result.results.flatMap(item => item.output.trim().split(/\r?\n/).map(line => JSON.parse(line))).sort((a, b) => a.time - b.time || (a.type === 'end' ? -1 : 1));
    let active = 0, peak = 0;
    for (const event of events) { active += event.type === 'start' ? 1 : -1; peak = Math.max(peak, active); }
    assert.equal(active, 0);
    assert.equal(peak, 2, 'Concurrency must overlap work and respect the configured bound');
    assert(messages.every(line => /^PASS /.test(line)));
    assert(result.results.every(item => item.durationMs >= 0));

    const serial = await runChecks({ names: ['d', 'e'], scripts: { d: 'node fixture.cjs d', e: 'node fixture.cjs e' }, cwd: base, jobs: 1, log: () => {} });
    const starts = serial.results.map(item => JSON.parse(item.output.trim().split(/\r?\n/)[0]).time);
    const ends = serial.results.map(item => JSON.parse(item.output.trim().split(/\r?\n/).at(-1)).time);
    assert(starts[1] >= ends[0], '--jobs=1 must preserve sequential execution');

    const failures = [];
    const failed = await runChecks({ names: ['chain', 'good'], scripts: { chain: 'node fixture.cjs fail && node fixture.cjs sentinel', good: 'node fixture.cjs good' }, cwd: base, jobs: 2, log: line => failures.push(line) });
    assert.deepEqual(failed.failed, ['chain']);
    assert.equal(failed.results[0].status, 7);
    assert.equal(failed.results[1].status, 0);
    assert(!fs.existsSync(path.join(base, 'should-not-run')), 'A failed chained command must stop the group');
    assert(failures.some(line => line.includes('Deliberate fixture failure')), 'Failure diagnostics must survive');

    const loud = await runChecks({ names: ['loud'], scripts: { loud: 'node fixture.cjs loud' }, cwd: base, jobs: 1, maxOutputBytes: 1024, log: () => {} });
    assert.deepEqual(loud.failed, ['loud']);
    assert(loud.results[0].output.includes('output exceeded'));
    await assert.rejects(runChecks({ names: ['missing', 'good'], scripts: { good: 'node fixture.cjs good' }, cwd: base, jobs: 2, log: () => {} }), /Unknown package script/);
    for (const args of [['--only=import:vocabulary-completion'], ['--full', '--only=lint'], ['--jobs=0']]) {
      const rejected = cp.spawnSync(process.execPath, [path.join(__dirname, 'check.cjs'), ...args], { encoding: 'utf8', windowsHide: true });
      assert.notEqual(rejected.status, 0);
      assert(!rejected.stdout.includes('PASS '));
    }
    console.log('Check runner passed: all original checks retained, bounded parallelism, serial mode, focused selection, full-suite protection, chain failures, diagnostics and output limits.');
  } finally {
    const resolved = fs.realpathSync(base);
    assert.equal(path.dirname(resolved), fs.realpathSync(os.tmpdir()));
    assert(path.basename(resolved).startsWith('nihongo-check-runner-'));
    fs.rmSync(resolved, { recursive: true, force: true });
  }
}
run().catch(error => { console.error(error); process.exitCode = 1; });
