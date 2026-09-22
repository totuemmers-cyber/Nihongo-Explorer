const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { createHash } = require('node:crypto');
const root = path.resolve(__dirname, '..'), sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'comprehension-data.js'), 'utf8'), sandbox);
const units = sandbox.window.COMPREHENSION_UNITS;
const ids = new Set(), distribution = [0, 0, 0, 0];
function unique(id) { assert(!ids.has(id), 'Duplicate ID: ' + id); ids.add(id); }
assert.equal(units.length, 100);
for (const level of ['N5', 'N4', 'N3', 'N2', 'N1']) for (const skill of ['reading', 'listening']) {
  const group = units.filter(u => u.level === level && u.skill === skill);
  assert.equal(group.length, 10, level + '/' + skill);
  assert.equal(group.map(u => u.order).join(','), '1,2,3,4,5,6,7,8,9,10');
  assert(group.every(u => u.id === `${skill}-${level.toLowerCase()}-${u.order}`));
}
let totalSeconds = 0;
for (const u of units) {
  unique(u.id);
  for (const key of ['title', 'objective', 'introduction', 'translation', 'note']) assert(typeof u[key] === 'string' && u[key].trim().length > 0, `${u.id}: ${key}`);
  assert(Number.isInteger(u.minutes) && u.minutes >= 7 && u.minutes <= 19, u.id + ': practice time');
  assert(u.glossary.length >= 2);
  assert.equal(u.questions.length, 3);
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
    assert.equal(q.choices.length, 4); assert.equal(new Set(q.choices.map(c => c.text)).size, 4);
    assert(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 4); distribution[q.answer]++;
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
assert.equal(receipt.files.length, 50);
assert.equal(new Set(receipt.files.map(f => f.id)).size, 50, 'Duplicate receipt entry');
for (const file of receipt.files) assert.equal(file.sha256, sha(file.src), file.id + ': audio differs from generation receipt');
assert.equal(manifest.length, 50);
assert.equal(new Set(manifest.map(m => m.id)).size, 50, 'Duplicate audio specification');
for (const m of manifest) {
  assert(m.segments.every(s => s.text && !/[{}|]|[AB]:/.test(s.text)));
  // 十分 as "ten minutes" is read じゅうぶん ("enough") unless the speech text spells it out.
  assert(m.segments.every(s => !/十分(?=の|前|後|間|ほど|くらい|ぐらい|以内|おき|ごと)/.test(s.text)), m.id + ': ambiguous 十分 in speech text');
  const u = units.find(u => u.id === m.id);
  assert(u && u.skill === 'listening' && u.audio.src === m.src, m.id + ': audio specification mismatch');
  assert(receipt.files.some(f => f.id === m.id && f.src === m.src), m.id + ': missing generation receipt');
  if (u.passages.some(p => p.speaker)) assert.equal(new Set(m.segments.map(s => s.voice)).size, 2, m.id + ': dialogue voices');
}
assert.equal(units.reduce((n, u) => n + u.questions.length, 0), 300);
assert(Math.max(...distribution) - Math.min(...distribution) <= 2, 'Unbalanced answer positions');
console.log(`Comprehension audit passed: 100 units, 300 questions, unique IDs and evidence, beginner ruby, 50 PCM WAVs (${(totalSeconds / 60).toFixed(1)} minutes). Answer positions: ${distribution.join('/')}. Audio checks cover signal integrity, not perceptual pronunciation review.`);
