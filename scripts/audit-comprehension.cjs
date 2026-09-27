const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { createHash } = require('node:crypto');
const root = path.resolve(__dirname, '..'), sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'comprehension-data.js'), 'utf8'), sandbox);
const units = sandbox.window.COMPREHENSION_UNITS;
const ids = new Set(), distribution = [0, 0, 0, 0], distribution3 = [0, 0, 0];
// Additional task formats: skill, question count range, choices per question, minimum passages.
const FORMATS = {
  'quick-response': { skill: 'listening', questions: [3, 6], choices: 3, passages: 3 },
  utterance: { skill: 'listening', questions: [3, 6], choices: 3, passages: 3 },
  'info-search': { skill: 'reading', questions: [2, 3], choices: 4, passages: 1 },
  integrated: { skill: 'reading', questions: [2, 3], choices: 4, passages: 2 },
  long: { skill: 'reading', questions: [3, 4], choices: 4, passages: 3, minChars: { N2: 600, N1: 900 } }
};
function unique(id) { assert(!ids.has(id), 'Duplicate ID: ' + id); ids.add(id); }
assert.equal(units.filter(u => !u.format).length, 100);
for (const level of ['N5', 'N4', 'N3', 'N2', 'N1']) for (const skill of ['reading', 'listening']) {
  const group = units.filter(u => u.level === level && u.skill === skill);
  const standard = group.filter(u => !u.format);
  assert.equal(standard.length, 10, level + '/' + skill);
  assert.equal(standard.map(u => u.order).join(','), '1,2,3,4,5,6,7,8,9,10');
  // Format units continue the per-skill numbering after the ten standard units.
  assert.equal(group.map(u => u.order).join(','), group.map((_, i) => i + 1).join(','), level + '/' + skill + ' order');
  assert(group.every(u => u.id === `${skill}-${level.toLowerCase()}-${u.order}`));
}
let totalSeconds = 0;
for (const u of units) {
  unique(u.id);
  for (const key of ['title', 'objective', 'introduction', 'translation', 'note']) assert(typeof u[key] === 'string' && u[key].trim().length > 0, `${u.id}: ${key}`);
  const spec = u.format && FORMATS[u.format];
  assert(!u.format || spec, u.id + ': unknown format');
  assert(Number.isInteger(u.minutes) && u.minutes >= (spec ? 5 : 7) && u.minutes <= (spec ? 25 : 19), u.id + ': practice time');
  assert(u.glossary.length >= 2);
  if (!spec) assert.equal(u.questions.length, 3);
  else {
    assert.equal(u.skill, spec.skill, u.id + ': format skill');
    assert(u.questions.length >= spec.questions[0] && u.questions.length <= spec.questions[1], u.id + ': question count');
    assert(u.passages.length >= spec.passages, u.id + ': passages');
    if (u.format === 'integrated') assert.equal(u.passages.map(p => p.label).filter(Boolean).join('|'), 'Text A|Text B', u.id + ': Text A/B labels');
    const chars = u.passages.reduce((n, p) => n + p.text.replace(/\{([^|{}]+)\|([^{}]+)\}/g, '$1').length, 0);
    if (spec.minChars && spec.minChars[u.level]) assert(chars >= spec.minChars[u.level], u.id + ': long text too short (' + chars + ')');
  }
  for (const p of u.passages) {
    unique(p.id); assert(p.text.length > 10);
    assert(!p.text.replace(/\{([^|{}]+)\|([^{}]+)\}/g, '$1').match(/[{}|]/), 'Malformed ruby: ' + p.id);
    if (/^N[45]$/.test(u.level)) {
      const unannotated = p.text.replace(/\{([^|{}]+)\|([^{}]+)\}/g, '$2');
      assert(!/[一-龯]/.test(unannotated), 'Beginner kanji without authored ruby: ' + p.id);
    }
  }
  assert(u.passages.some(p => /\{.+\|.+\}/.test(p.text)), 'No reading support: ' + u.id);
  for (const q of u.questions) {
    unique(q.id); assert(u.passages.some(p => p.id === q.evidence));
    const choices = spec ? spec.choices : 4;
    assert.equal(q.choices.length, choices, q.id + ': choices'); assert.equal(new Set(q.choices.map(c => c.text)).size, choices);
    assert(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < choices); (choices === 4 ? distribution : distribution3)[q.answer]++;
    for (const c of q.choices) { assert(c.text.length > 0); assert(u.passages.some(p => p.id === c.evidence), q.id + ': missing choice evidence'); assert(c.explanation.length > 10, q.id + ': missing rationale'); }
  }
  if (u.skill === 'listening') {
    assert(u.audio.synthetic); const bytes = fs.readFileSync(path.join(root, u.audio.src));
    assert.equal(bytes.toString('ascii', 0, 4), 'RIFF'); assert.equal(bytes.toString('ascii', 8, 12), 'WAVE');
    let offset = 12, pcm, sampleRate;
    while (offset + 8 <= bytes.length) {
      const type = bytes.toString('ascii', offset, offset + 4), size = bytes.readUInt32LE(offset + 4);
      if (type === 'fmt ') { assert.equal(bytes.readUInt16LE(offset + 8), 1); assert.equal(bytes.readUInt16LE(offset + 10), 1); sampleRate = bytes.readUInt32LE(offset + 12); assert.equal(bytes.readUInt16LE(offset + 22), 16); }
      if (type === 'data') pcm = bytes.subarray(offset + 8, offset + 8 + size);
      offset += 8 + size + (size % 2);
    }
    assert(pcm && pcm.length > 48000); assert.equal(sampleRate, 16000);
    const seconds = pcm.length / 2 / sampleRate; assert(seconds > 10 && seconds < 240, `${u.id}: implausible duration ${seconds}`);
    let energy = 0, clipped = 0, peak = 0;
    for (let i = 0; i < pcm.length; i += 2) { const v = pcm.readInt16LE(i); energy += v * v; peak = Math.max(peak, Math.abs(v)); if (Math.abs(v) >= 32760) clipped++; }
    assert(peak <= 26213, `${u.id}: missing playback headroom`);
    const rms = Math.sqrt(energy / (pcm.length / 2)); assert(rms > 50, `${u.id}: near-silent recording`);
    assert(clipped / (pcm.length / 2) < .001, `${u.id}: clipping`); totalSeconds += seconds;
  } else assert(!u.audio);
}
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'audio-manifest.json')));
const receipt = JSON.parse(fs.readFileSync(path.join(root, 'audio/comprehension/generation.json'), 'utf8').replace(/^\uFEFF/, ''));
assert.equal(receipt.engine, 'Windows.Media.SpeechSynthesis');
assert.equal(receipt.resampling, false);
const sha = file => createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex');
// Line endings follow Git's checkout settings; the receipt hashes the LF text.
const manifestText = fs.readFileSync(path.join(root, 'audio-manifest.json'), 'utf8').replace(/\r\n/g, '\n');
assert.equal(receipt.manifestSha256, createHash('sha256').update(manifestText).digest('hex'), 'Audio settings changed: regenerate WAVs');
const listeningUnits = units.filter(u => u.skill === 'listening').length;
assert.equal(receipt.files.length, listeningUnits);
assert.equal(new Set(receipt.files.map(f => f.id)).size, listeningUnits, 'Duplicate receipt entry');
for (const file of receipt.files) assert.equal(file.sha256, sha(file.src), file.id + ': audio differs from generation receipt');
assert.equal(manifest.length, listeningUnits);
assert.equal(new Set(manifest.map(m => m.id)).size, listeningUnits, 'Duplicate audio specification');
for (const m of manifest) {
  assert(m.segments.every(s => s.text && !/[{}|]|[AB]:/.test(s.text)));
  // 十分 as "ten minutes" is read じゅうぶん ("enough") unless the speech text spells it out.
  assert(m.segments.every(s => !/十分(?=の|前|後|間|ほど|くらい|ぐらい|以内|おき|ごと)/.test(s.text)), m.id + ': ambiguous 十分 in speech text');
  const u = units.find(u => u.id === m.id);
  assert(u && u.skill === 'listening' && u.audio.src === m.src, m.id + ': audio specification mismatch');
  assert(receipt.files.some(f => f.id === m.id && f.src === m.src), m.id + ': missing generation receipt');
  if (u.passages.some(p => p.speaker)) assert.equal(new Set(m.segments.map(s => s.voice)).size, 2, m.id + ': dialogue voices');
}
assert.equal(units.filter(u => !u.format).reduce((n, u) => n + u.questions.length, 0), 300);
assert(Math.max(...distribution) - Math.min(...distribution) <= 2, 'Unbalanced answer positions');
if (distribution3.some(Boolean)) assert(Math.max(...distribution3) - Math.min(...distribution3) <= 2, 'Unbalanced three-choice answer positions');
const questionTotal = units.reduce((n, u) => n + u.questions.length, 0);
console.log(`Comprehension audit passed: ${units.length} units (${units.filter(u => u.format).length} in additional task formats), ${questionTotal} questions, unique IDs and evidence, beginner ruby, ${listeningUnits} PCM WAVs (${(totalSeconds / 60).toFixed(1)} minutes). Answer positions: ${distribution.join('/')}${distribution3.some(Boolean) ? ' (3-choice: ' + distribution3.join('/') + ')' : ''}. Audio checks cover signal integrity, not perceptual pronunciation review.`);
