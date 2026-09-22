const fs = require('fs');
const path = require('path');
const assert = require('node:assert/strict');
const css = fs.readFileSync(path.join(__dirname, '..', 'styles.css'), 'utf8');
function tokens(block) {
  return Object.fromEntries(Array.from(block.matchAll(/--([\w-]+):\s*(#[\da-f]{3,8})\s*;/gi), match => [match[1], match[2]]));
}
function luminance(hex) {
  let value = hex.slice(1);
  if (value.length === 3) value = value.split('').map(ch => ch + ch).join('');
  const rgb = [0, 2, 4].map(i => parseInt(value.slice(i, i + 2), 16) / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
  return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
}
function ratio(a, b) { const x = luminance(a), y = luminance(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); }
const light = tokens(css.match(/:root\s*\{([^}]+)\}/)[1]);
const dark = Object.assign({}, light, tokens(css.match(/\[data-theme='dark'\]\s*\{([^}]+)\}/)[1]));
const rows = [];
for (const [name, theme] of Object.entries({ light, dark })) {
  for (const [fg, bg] of [['text', 'bg'], ['text', 'bg-card'], ['text-secondary', 'bg'], ['text-secondary', 'bg-card'], ['text-secondary', 'bg-subtle'], ['accent', 'accent-bg'], ['accent', 'bg-card'], ['bg-card', 'accent'], ...[1, 2, 3, 4, 5].map(n => ['n' + n, 'n' + n + '-bg'])]) {
    const contrast = ratio(theme[fg], theme[bg]);
    assert(contrast >= 4.5, `${name}: ${fg}/${bg} fails at ${contrast.toFixed(2)}:1`);
    rows.push({ theme: name, pair: fg + '/' + bg, ratio: contrast.toFixed(2) + ':1' });
  }
}
console.table(rows);
console.log('All 26 text/background pairs meet 4.5:1. This checks declared colors, not rendered screenshots.');
