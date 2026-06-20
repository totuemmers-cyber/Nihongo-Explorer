// Verifies Suggestion 3 (hardening):
//  - escapeHtml neutralizes markup/attribute-breaking characters
//  - safeLocalSet swallows a throwing localStorage instead of propagating
//  - every detail/help overlay is a labelled modal dialog for screen readers
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const failures = [];
function check(cond, msg) { if (!cond) failures.push(msg); }

// Load the shared helpers from section-configs.js in an isolated context.
const ctx = { window: {}, document: undefined, console };
ctx.window = ctx;
vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'section-configs.js'), 'utf8'), ctx, { filename: 'section-configs.js' });

// --- escapeHtml ---
check(ctx.escapeHtml('a&b') === 'a&amp;b', 'escapeHtml should escape &');
check(ctx.escapeHtml('<x>') === '&lt;x&gt;', 'escapeHtml should escape < >');
check(ctx.escapeHtml('he said "hi"') === 'he said &quot;hi&quot;', 'escapeHtml should escape double quotes');
check(ctx.escapeHtml("it's") === 'it&#39;s', 'escapeHtml should escape single quotes');
check(ctx.escapeHtml(null) === '' && ctx.escapeHtml(undefined) === '', 'escapeHtml should treat null/undefined as empty');
// An attribute-breaking payload must not be able to close the attribute/inject markup.
var payload = '" onerror="alert(1)';
check(ctx.escapeHtml(payload).indexOf('"') === -1, 'escapeHtml output must contain no raw double quote');

// --- safeLocalSet ---
ctx.localStorage = { setItem: function () { throw new Error('QuotaExceeded'); } };
var threw = false, ret;
try { ret = ctx.safeLocalSet('k', 'v'); } catch (e) { threw = true; }
check(!threw, 'safeLocalSet must not propagate a throwing localStorage');
check(ret === false, 'safeLocalSet should return false on failure');
ctx.localStorage = { _s: {}, setItem: function (k, v) { this._s[k] = v; } };
check(ctx.safeLocalSet('k', 'v') === true, 'safeLocalSet should return true on success');

// --- overlay dialog semantics ---
var html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
var overlayIds = [
  'detail-overlay', 'grammar-detail-overlay', 'vocab-detail-overlay',
  'ono-detail-overlay', 'counter-detail-overlay', 'radical-detail-overlay',
  'reading-detail-overlay', 'help-overlay', 'theme-overlay'
];
overlayIds.forEach(function (id) {
  var re = new RegExp('<div id="' + id + '"[^>]*>');
  var m = html.match(re);
  check(!!m, 'overlay #' + id + ' not found');
  if (m) {
    var tag = m[0];
    check(/role="dialog"/.test(tag), 'overlay #' + id + ' missing role="dialog"');
    check(/aria-modal="true"/.test(tag), 'overlay #' + id + ' missing aria-modal="true"');
    check(/aria-label="/.test(tag) || /aria-labelledby="/.test(tag), 'overlay #' + id + ' missing an accessible label');
  }
});

if (failures.length) {
  console.error('FAIL: hardening test (' + failures.length + ')');
  failures.forEach(function (f) { console.error('  - ' + f); });
  process.exit(1);
}
console.log('Hardening test passed (escapeHtml, safeLocalSet, ' + overlayIds.length + ' modal dialogs).');
