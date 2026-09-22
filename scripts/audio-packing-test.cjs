const assert = require('node:assert/strict');
const { pack, readPcm } = require('./pack-comprehension-audio.cjs');
function fixture(samples, rate = 16000) {
  const header = Buffer.alloc(44), pcm = Buffer.alloc(samples.length * 2);
  samples.forEach((s, i) => pcm.writeInt16LE(s, i * 2));
  header.write('RIFF'); header.writeUInt32LE(pcm.length + 36, 4); header.write('WAVEfmt ', 8);
  header.writeUInt32LE(16, 16); header.writeUInt16LE(1, 20); header.writeUInt16LE(1, 22);
  header.writeUInt32LE(rate, 24); header.writeUInt32LE(rate * 2, 28); header.writeUInt16LE(2, 32); header.writeUInt16LE(16, 34);
  header.write('data', 36); header.writeUInt32LE(pcm.length, 40); return Buffer.concat([header, pcm]);
}
const input = fixture(Array.from({ length: 1600 }, (_, i) => Math.round(30000 * Math.cos(i / 13))));
const result = readPcm(pack([input, input], 100));
assert.equal(result.length, (1600 + 1600) * 2 * 2, 'Speech length and exact pauses are preserved');
for (let part = 0; part < 2; part++) {
  const start = part * 3200;
  assert.equal(result.readInt16LE(start * 2), 0); assert.equal(result.readInt16LE((start + 1599) * 2), 0);
  assert(result.subarray((start + 1600) * 2, (start + 3200) * 2).every(v => v === 0));
}
for (let i = 0; i < result.length; i += 2) assert(Math.abs(result.readInt16LE(i)) <= 26213, 'Playback headroom');
const quiet = fixture(Array.from({ length: 1600 }, (_, i) => i % 2 ? 1000 : -1000));
assert.equal(readPcm(pack([quiet], 0)).readInt16LE(400), -1000, 'Quiet speech is not boosted or filtered');
assert.throws(() => readPcm(fixture([100, 200], 24000)), /native/);
assert.throws(() => readPcm(input.subarray(0, input.length - 2)), /Truncated/);
assert.throws(() => pack([fixture([0, 0])], 100), /Silent/);
console.log('Audio packaging passed: native format, unchanged speech length, headroom, zero joins, exact silence and malformed-input rejection.');
