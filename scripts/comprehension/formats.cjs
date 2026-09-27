// Additional JLPT task formats by level. Each entry: [format, skill, title, objective, texts, translation, glossary, note, questions].
// Formats: quick-response (即時応答), utterance (発話表現), info-search (情報検索), integrated (統合理解), long (長文).
// Reading formats live in formats-reading.cjs, listening formats in formats-listening.cjs.
const reading = require('./formats-reading.cjs'), listening = require('./formats-listening.cjs');
module.exports = Object.fromEntries(['N5', 'N4', 'N3', 'N2', 'N1'].map(level => [level, [...(reading[level] || []), ...(listening[level] || [])]]));
