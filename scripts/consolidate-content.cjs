// Idempotent editorial consolidation of duplicate grammar points and a misspelled onomatopoeia headword.
// Retired IDs stay reachable through `legacyIds` (bookmarks, deep links, restored sessions).
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { applyReview } = require('./build-quiz-review.cjs');
const derivePattern = require('./onomatopoeia-pattern.cjs');

const root = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const pendingWrites = new Map();

function load(name, key) {
  const c = { GRAMMAR_DATA: [] };
  c.window = c;
  vm.runInNewContext(read(name), c);
  return c[key];
}
function save(name, key, items, header, push) {
  pendingWrites.set(name, header + (push ? 'window.' + key + '.push.apply(window.' + key + ', ' : 'window.' + key + ' = ') +
    JSON.stringify(items, null, 2) + (push ? ');' : ';') + '\n');
}

const grammarFiles = ['grammar-data.js', 'grammar-n2.js', 'grammar-n1.js', 'keigo-data.js'];
const grammar = grammarFiles.map(file => ({ file, items: load(file, 'GRAMMAR_DATA') }));
const all = () => grammar.flatMap(f => f.items);
const byId = id => all().find(g => g.id === id);
const reviewPath = 'scripts/grammar-quiz-review.json';
const review = JSON.parse(read(reviewPath));

// Two N1 entries taught 極まりない. The kept entry has the correct formation (na-adjective/noun only);
// the retired one listed い-adjective stems. Its distinct example sentences move to the kept entry.
// The September 2026 review found the same pattern taught twice across N3/N2/N1 or within N1.
// The richer entry survives at the level JLPT Sensei's N3/N2 lists give (retrieved 2026-09-23);
// patterns absent from both lists stay N1. `level`/`pattern` set the survivor's final values.
const MERGES = [
  { keep: 'n1-kiwamarinai', retire: 'n1-kiwamari-nai' },
  { keep: 'n3-o-tsujite', retire: 'n2-wo-tsujite' },
  { keep: 'n3-o-tsujite', retire: 'n2-wo-toshite' },
  { keep: 'n2-kaneru', retire: 'n3-kaneru' },
  { keep: 'n2-kaneru', retire: 'n3-kanenai' },
  { keep: 'n2-uru-enai', retire: 'n3-uru-enai' },
  { keep: 'n2-mono-dakara', retire: 'n3-mono-dakara', pattern: '～ものだから / ～もんだから' },
  { keep: 'n3-you-ga-nai', retire: 'n2-you-ga-nai' },
  { keep: 'n3-sai-ni', retire: 'n2-sai-ni' },
  { keep: 'n3-tabi-ni', retire: 'n2-tabi-ni' },
  { keep: 'n2-ijou-wa', retire: 'n3-ijou-wa', pattern: '～以上(は)' },
  { keep: 'n2-mono-ka', retire: 'n3-mono-ka', pattern: '～ものか / ～もんか' },
  { keep: 'n2-ippou-de', retire: 'n3-ippou-de' },
  { keep: 'n3-ni-kawatte', retire: 'n2-ni-kawatte' },
  { keep: 'n1-ge', retire: 'n3-ge', level: 'N2' },
  { keep: 'n1-gatai', retire: 'n3-gatai', level: 'N3' },
  { keep: 'n1-ni-sakidatte', retire: 'n2-ni-sakidatte', level: 'N2' },
  { keep: 'n1-kara-suru-to', retire: 'n2-kara-suru-to', level: 'N2' },
  { keep: 'n2-dake-atte', retire: 'n1-dakeatte' },
  { keep: 'n2-mamire', retire: 'n1-mamire', level: 'N1' },
  { keep: 'n2-zukume', retire: 'n1-zukume', level: 'N1' },
  { keep: 'n2-meku', retire: 'n1-meku', level: 'N1' },
  { keep: 'n1-wo-kawakiri-ni', retire: 'n1-wokawakiritoshite', pattern: '～を皮切りに / ～を皮切りとして' },
  { keep: 'n1-ni-taru', retire: 'n1-nitaru' },
  { keep: 'n1-te-yamanai', retire: 'n1-te-yamanu' },
  { keep: 'n1-shimatsu-da', retire: 'n1-shimatsuda' },
  { keep: 'n1-tomonaku-tomonashini', retire: 'n1-tomonaku2' },
  { keep: 'n1-nagara-no', retire: 'n1-nagarani-nagarano', pattern: '～ながらに / ～ながらの' },
  { keep: 'n1-gotoki', retire: 'n1-gotoku-gotoki' },
  { keep: 'n1-ga-saigo-tara-saigo', retire: 'n1-ta-ga-saigo' },
  { keep: 'n1-n-bakari-ni', retire: 'n1-nbakari', pattern: '～んばかり(に)' },
  { keep: 'n1-te-shikaru-beki', retire: 'n1-teshikarubeki', pattern: '～て然るべき / ～てしかるべき' },
  { keep: 'n3-koto-ni-natte-iru', retire: 'n4-koto-ni-natteiru', pattern: '～ことになっている' },
  { keep: 'n2-kiru', retire: 'n4-kiru', level: 'N3' },
  { keep: 'n2-te-hajimete', retire: 'n3-te-hajimete', level: 'N3', pattern: '～て初めて / ～てはじめて' },
  { keep: 'n2-ni-suginai', retire: 'n3-ni-suginai', pattern: '～に過ぎない / ～にすぎない' },
  { keep: 'n1-mononara', retire: 'n2-mono-nara', level: 'N2', pattern: '～ものなら' },
  { keep: 'n2-nai-mono-ka', retire: 'n1-naimonoka2' },
  { keep: 'tsumori', retire: 'n4-tsumori' },
  { keep: 'ichiban', retire: 'n4-ichiban' }
];
// Field corrections from the September 2026 content review.
const FIELDS = {
  // Level tags inside a pattern evade the duplicate check and repeat the level badge.
  'n3-koto-ni-suru-2': { pattern: '～ことにしている' },
  // 査証 means "visa"; the entry only ever taught ご笑納.
  'keigo-business-ohikikaenitsukaesai': { pattern: 'ご笑納ください' },
  // ございません is polite language, お待たせいたす is humble, and ご遠慮 honours the listener's restraint.
  'keigo-bikago-moushiwake': { subcategory: '丁寧語' },
  'keigo-bikago-omataseitashimashita': { subcategory: '謙譲語' },
  'keigo-bikago-goenryonaku': { subcategory: '尊敬語' },
  // A usage contrast between two workplace greetings, not an honorific form.
  'keigo-sonkeigo-gokurou': { subcategory: 'ビジネス敬語' },
  // 配膳する is a neutral technical verb, not a humble form; the card teaches お持ちする.
  'keigo-kenjougo-haizensuru': {
    pattern: 'お持ちする / お持ちいたす',
    meaning: 'Bescheiden bringen / servieren (Gastronomie)',
    explanation: 'お持ちする ist die Kenjōgo-Form von 持っていく / 持ってくる: Man bringt dem Gast etwas und stellt die eigene Handlung bescheiden dar. お持ちいたします ist noch eine Stufe förmlicher. In Restaurants und Hotels gehören beide Formen zum Standard. 配膳する („Speisen auftragen“) ist dagegen kein Keigo, sondern ein neutraler Fachbegriff; höflich wird er erst als 配膳させていただきます.',
    formation: 'お + Verb (ます-Stamm von 持つ) + する / いたす ／ お持ちしてもよろしいでしょうか'
  }
};
// Misfiled levels, checked against the same JLPT Sensei lists. IDs stay unchanged for bookmarks.
const RELEVELS = {
  N3: ['n4-wake-ni-ikanai', 'n4-beki-da', 'n4-sae', 'n4-koso', 'n4-toshite', 'n4-ni-taishite', 'n4-gachi', 'n4-kakeru'],
  N2: ['n3-zaruwoenai', 'n3-ni-watatte', 'n3-ni-tomonatte', 'n3-o-towazu', 'n3-ni-kakawarazu', 'n3-mono-no',
    'n3-dokoro-ka', 'n3-shidai', 'n3-kara-niwa', 'n3-kkonai']
};
for (const { keep, retire, level, pattern } of MERGES) {
  const target = byId(keep);
  if (!target) throw new Error('Missing surviving grammar entry ' + keep);
  if (level) target.level = level;
  if (pattern) target.pattern = pattern;
  const source = byId(retire);
  if (source) {
    for (const ex of source.examples) {
      if (target.examples.some(e => e.japanese === ex.japanese)) continue;
      // Reviewed quiz data is tied to the retired entry's example positions, so moved
      // examples become plain examples; the survivor keeps its own reviewed cloze.
      if (ex.cloze) delete ex.cloze;
      // Match the surviving entry's romanization of the pattern.
      ex.romaji = ex.romaji.replace(/kiwamari nai/g, 'kiwamarinai');
      target.examples.push(ex);
    }
    target.related = [...new Set([...(target.related || []), ...(source.related || [])])].filter(id => id !== keep && id !== retire);
    target.legacyIds = [...new Set([...(target.legacyIds || []), retire])];
    for (const f of grammar) f.items = f.items.filter(g => g.id !== retire);
    review.records = review.records.filter(r => r.grammarId !== retire);
  }
  for (const g of all()) if (g.related) g.related = [...new Set(g.related.map(id => id === retire ? keep : id))].filter(id => id !== g.id);
}

for (const [level, ids] of Object.entries(RELEVELS)) {
  for (const id of ids) {
    const g = byId(id);
    if (!g) throw new Error('Missing re-levelled grammar entry ' + id);
    g.level = level;
  }
}
for (const [id, fields] of Object.entries(FIELDS)) {
  const g = byId(id);
  if (!g) throw new Error('Missing grammar entry ' + id);
  Object.assign(g, fields);
}
// Reviewed quiz records carry the level they were written for; follow the entry's final level.
const levelById = new Map(all().map(g => [g.id, g.level]));
for (const r of review.records) if (levelById.has(r.grammarId)) r.level = levelById.get(r.grammarId);

// The keigo lens teaches the same request form; link both so neither is a dead end.
// The N3 keigo overview cards lead on to the detailed keigo entries for each form.
const LINKS = [['keigo-teinei-itadakemasenka', 'n4-te-itadakemasenka'],
  ['n3-keigo-sonkei', 'keigo-sonkeigo-oninaru'], ['n3-keigo-sonkei', 'keigo-sonkeigo-irassharu'],
  ['n3-keigo-kenjou', 'keigo-kenjougo-osuru'], ['n3-keigo-kenjou', 'keigo-kenjougo-mairu']];
for (const [a, b] of LINKS) {
  for (const [from, to] of [[a, b], [b, a]]) {
    const g = byId(from);
    if (!g) throw new Error('Missing grammar entry ' + from);
    g.related = g.related || [];
    if (!g.related.includes(to)) g.related.push(to);
  }
}

// Validate reviewed quiz data against the edited sources before anything is written.
applyReview(grammar, review.records);
for (const f of grammar) {
  save(f.file, 'GRAMMAR_DATA', f.items, '// Teaching data; editorial sources in scripts/.\n', f.file !== 'grammar-data.js');
}
pendingWrites.set(reviewPath, JSON.stringify(review, null, 2) + '\n');

const ono = load('onomatopoeia-data.js', 'ONOMATOPOEIA_DATA');
const HEADWORDS = [{ id: 'onomatopoeia:305', from: 'ちゃほや', word: 'ちやほや', romaji: 'chiyahoya',
  notes: 'Fast immer als ちやほやする verwendet; auch in Katakana (チヤホヤ) geschrieben.' }];
for (const fix of HEADWORDS) {
  const o = ono.find(x => x.id === fix.id);
  if (!o) throw new Error('Missing onomatopoeia entry ' + fix.id);
  if (o.word === fix.from) {
    o.word = fix.word;
    o.reading = fix.word;
    o.romaji = fix.romaji;
    o.notes = fix.notes;
    // The stored accent belonged to the misspelled form and was never sourced.
    o.pitch = null;
  }
}
// Adjectives and verbs that are not sound or mimetic words. Batch 021 added each to the vocabulary.
const NOT_ONOMATOPOEIA = ['ぎこちない', 'ぞんざい', 'もたつく', 'しゃちほこばる', 'たどたどしい', 'ぶっきらぼう'];
for (let i = ono.length - 1; i >= 0; i--) if (NOT_ONOMATOPOEIA.includes(ono[i].word)) ono.splice(i, 1);
for (const o of ono) if (o.related) o.related = o.related.filter(w => !NOT_ONOMATOPOEIA.includes(w));
// The September batch defaulted every non-4-kana-doubled word to Sonstige (ゆっくり, ぽちゃぽちゃ…).
for (const o of ono) if (o.editorialBatch === '2026-09-content') o.pattern = derivePattern(o.word);
save('onomatopoeia-data.js', 'ONOMATOPOEIA_DATA', ono, '// Teaching data; editorial additions tracked in scripts/*.tsv.\n', false);

for (const [name, contents] of pendingWrites) fs.writeFileSync(path.join(root, name), contents);
console.log(JSON.stringify({ merged: MERGES.length, linked: LINKS.length, headwords: HEADWORDS.length }));
