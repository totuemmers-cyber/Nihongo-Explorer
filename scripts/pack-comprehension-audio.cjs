/* Preserve native PCM: no legacy speech conversion or resampling. */
const fs = require('node:fs'), path = require('node:path'), crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const SAMPLE_RATE = 16000, PEAK_LIMIT = Math.floor(32767 * .8), EDGE_FRAMES = 80;
function readPcm(bytes) {
  if (bytes.toString('ascii', 0, 4) !== 'RIFF' || bytes.toString('ascii', 8, 12) !== 'WAVE') throw new Error('Not a WAV');
  let pcm, validFormat = false;
  for (let pos = 12; pos + 8 <= bytes.length;) {
    const kind = bytes.toString('ascii', pos, pos + 4), size = bytes.readUInt32LE(pos + 4);
    if (pos + 8 + size > bytes.length) throw new Error('Truncated WAV');
    if (kind === 'fmt ') {
      validFormat = size >= 16 && bytes.readUInt16LE(pos + 8) === 1 && bytes.readUInt16LE(pos + 10) === 1 && bytes.readUInt32LE(pos + 12) === SAMPLE_RATE && bytes.readUInt16LE(pos + 22) === 16;
    }
    if (kind === 'data') pcm = Buffer.from(bytes.subarray(pos + 8, pos + 8 + size));
    pos += 8 + size + size % 2;
  }
  if (!validFormat || !pcm || !pcm.length || pcm.length % 2) throw new Error('Expected native mono 16 kHz 16-bit PCM');
  return pcm;
}
function pack(parts, pauseMs) {
  const pcmParts = parts.map(readPcm);
  let peak = 0;
  for (const pcm of pcmParts) for (let i = 0; i < pcm.length; i += 2) peak = Math.max(peak, Math.abs(pcm.readInt16LE(i)));
  if (peak < 50) throw new Error('Silent synthesis');
  const gain = Math.min(1, PEAK_LIMIT / peak);
  const silence = Buffer.alloc(Math.round(SAMPLE_RATE * pauseMs / 1000) * 2);
  const output = [];
  for (const pcm of pcmParts) {
    const frames = pcm.length / 2;
    for (let i = 0; i < frames; i++) {
      // Short tapers guard joins without filtering consonants inside the utterance.
      const edgeGain = Math.min(1, i / EDGE_FRAMES, (frames - 1 - i) / EDGE_FRAMES);
      pcm.writeInt16LE(Math.round(pcm.readInt16LE(i * 2) * gain * edgeGain), i * 2);
    }
    output.push(pcm, silence);
  }
  const pcm = Buffer.concat(output), header = Buffer.alloc(44);
  header.write('RIFF'); header.writeUInt32LE(pcm.length + 36, 4); header.write('WAVEfmt ', 8);
  header.writeUInt32LE(16, 16); header.writeUInt16LE(1, 20); header.writeUInt16LE(1, 22);
  header.writeUInt32LE(SAMPLE_RATE, 24); header.writeUInt32LE(SAMPLE_RATE * 2, 28); header.writeUInt16LE(2, 32); header.writeUInt16LE(16, 34);
  header.write('data', 36); header.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([header, pcm]);
}
function main() {
  const only = process.argv[2], manifestBytes = fs.readFileSync(path.join(root, 'audio-manifest.json'));
  const manifest = JSON.parse(manifestBytes), selected = manifest.filter(u => !only || u.id === only);
  if (!selected.length) throw new Error('No matching audio unit');
  const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
  const prepared = selected.map(u => {
    if (!/^listening-n[1-5]-[1-9][0-9]*$/.test(u.id) || u.src !== `audio/comprehension/${u.id}.wav`) throw new Error('Unexpected output path');
    const parts = u.segments.map((_, i) => fs.readFileSync(path.join(root, '.content-cache/native-audio', `${u.id}-${i}.wav`)));
    return { u, wav: pack(parts, u.pauseMs) };
  });
  const backup = path.join(root, '.content-cache/audio-before-native'); fs.mkdirSync(backup, { recursive: true });
  for (const { u, wav } of prepared) {
    const file = path.join(root, u.src), previous = path.join(backup, u.id + '.wav');
    if (fs.existsSync(file) && !fs.existsSync(previous)) fs.copyFileSync(file, previous);
    fs.writeFileSync(file + '.tmp', wav); fs.renameSync(file + '.tmp', file);
  }
  if (!only) {
    const receipt = { manifestSha256: sha(manifestBytes), engine: 'Windows.Media.SpeechSynthesis', format: 'Native PCM mono, 16000 Hz, 16 bit', resampling: false, peakLimit: .8, edgeFadeMs: 5, generatedAt: new Date().toISOString(), files: prepared.map(({ u, wav }) => ({ id: u.id, src: u.src, sha256: sha(wav) })) };
    fs.writeFileSync(path.join(root, 'audio/comprehension/generation.json'), JSON.stringify(receipt, null, 2) + '\n');
  }
  console.log(`Packaged ${prepared.length} native recordings without sample-rate conversion.`);
}
if (require.main === module) main();
module.exports = { readPcm, pack };
