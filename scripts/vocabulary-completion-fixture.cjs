// Isolated repository copy for tests that run the writing vocabulary importers. Modules loaded
// with fixture.require() resolve their data root to the copy, so in-process calls write only there.
const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const { root } = require('./vocabulary-tools.cjs');

// The files an import may write.
const SNAPSHOT_FILES = Object.freeze(['vocab-n5.js', 'vocab-n4.js', 'vocab-n3.js', 'vocab-n2.js', 'vocab-n1.js',
  'vocab-correction-rules.js', 'vocab-romaji-hepburn.js', 'scripts/vocabulary-completion/ledger.json']);

function createFixture(prefix) {
  assert(/^nihongo-[\w-]+-$/.test(prefix), 'Fixture prefix must start with nihongo- and end with -');
  const temp = fs.realpathSync(os.tmpdir());
  const dir = fs.mkdtempSync(path.join(temp, prefix));
  const file = name => path.join(dir, name);
  const fixture = {
    dir,
    file,
    snapshot: () => SNAPSHOT_FILES.map(name => fs.readFileSync(file(name), 'utf8')),
    // Run a repository script in the copy; the exit status must match `success`.
    run(script, args = [], success = true) {
      const result = spawnSync(process.execPath, [script, ...args], { cwd: dir, encoding: 'utf8', windowsHide: true });
      assert(!result.error, result.error?.message);
      assert.equal(result.status === 0, success, script + ' ' + (success ? 'failed' : 'unexpectedly passed') + ':\n' + (result.stderr || result.stdout));
      return result;
    },
    require: name => require(file(path.join('scripts', name))),
    // Name the first difference, so a failure says which file changed and where.
    assertSnapshot(expected, message) {
      const actual = fixture.snapshot();
      SNAPSHOT_FILES.forEach((name, i) => {
        if (actual[i] === expected[i]) return;
        let offset = 0;
        while (actual[i][offset] === expected[i][offset]) offset++;
        assert.fail(message + ': ' + name + ' differs at ' + offset + ': ' +
          JSON.stringify([expected[i].slice(offset, offset + 140), actual[i].slice(offset, offset + 140)]));
      });
    },
    remove() {
      // Only remove the exact temporary directory allocated above.
      const resolved = fs.realpathSync(dir);
      assert.equal(path.dirname(resolved).toLowerCase(), temp.toLowerCase());
      assert(path.basename(resolved).startsWith(prefix));
      fs.rmSync(resolved, { recursive: true, force: true });
    }
  };
  try {
    for (const name of fs.readdirSync(root)) if (/\.js$/.test(name)) fs.copyFileSync(path.join(root, name), file(name));
    fs.cpSync(path.join(root, 'scripts'), file('scripts'), { recursive: true });
    assert(!fs.existsSync(file('.content-cache')), 'Fixture must have no research cache');
  } catch (error) { fixture.remove(); throw error; }
  return fixture;
}

module.exports = { createFixture, SNAPSHOT_FILES };
