// Verifies that every kanji's stroke count matches its bundled stroke-order
// SVG (stroke-order/<codepoint>.svg, AnimCJK format), so the displayed
// animation and the shown stroke number never diverge.
//
// Counting rules:
//  - Standard AnimCJK files animate each stroke with a <path clip-path=...>;
//    the number of those paths is the stroke count.
//  - A few files (e.g. 贄, 頸) use a plain one-path-per-stroke format with
//    no clip-path attributes; there the total <path> count is the stroke count.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const ctx = { window: {} };
ctx.window = ctx;
['kanji-data.js', 'kanji-n1.js'].forEach(function (file) {
  vm.runInNewContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), ctx, { filename: file });
});

const allKanji = [].concat(ctx.KANJI_DATA || [], ctx.KANJI_N1_DATA || []);
if (allKanji.length === 0) throw new Error('No kanji data loaded');

function svgStrokeCount(svgText) {
  const animated = (svgText.match(/<path [^>]*clip-path/g) || []).length;
  if (animated > 0) return animated;
  return (svgText.match(/<path /g) || []).length;
}

const missingSvg = [];
const mismatches = [];

allKanji.forEach(function (item) {
  const file = path.join(ROOT, 'stroke-order', item.kanji.codePointAt(0) + '.svg');
  if (!fs.existsSync(file)) {
    missingSvg.push(item.kanji);
    return;
  }
  const svgStrokes = svgStrokeCount(fs.readFileSync(file, 'utf8'));
  if (svgStrokes > 0 && svgStrokes !== item.strokes) {
    mismatches.push(item.kanji + ': data says ' + item.strokes + ', SVG draws ' + svgStrokes);
  }
});

if (missingSvg.length > 0 || mismatches.length > 0) {
  if (missingSvg.length) console.error('Kanji without stroke-order SVG: ' + missingSvg.join(' '));
  if (mismatches.length) console.error('Stroke count mismatches:\n' + mismatches.join('\n'));
  process.exit(1);
}

console.log('Stroke count test passed (' + allKanji.length + ' kanji match their stroke-order SVGs).');
