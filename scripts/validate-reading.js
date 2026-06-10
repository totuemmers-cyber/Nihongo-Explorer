// Validates window.READING_DATA in reading-data.js.
// Run: node scripts/validate-reading.js
//
// Checks, for every passage:
//   - required top-level fields present and non-empty
//   - id is unique and matches r-<slug>
//   - level is one of N5..N1
//   - every sentence has tokens[], jp, romaji, de
//   - jp === concatenation of all token surfaces (token.s)
//   - every token has a gloss (g) OR is punctuation (p:true)
//   - every token whose surface contains kanji carries a reading (r)
// And across the whole set:
//   - the per-level passage count is balanced (equal for every level present)
//
// Also validates window.READING_QUESTIONS in reading-questions.js:
//   - every key refers to an existing passage id
//   - each entry is a non-empty array of {q, options, correct}
//   - options has 2-4 unique non-empty strings, correct index is in range
//   - levels are covered completely or not at all (no half-questioned level)

'use strict';

global.window = {};
require('../reading-data.js');
require('../reading-questions.js');

var data = window.READING_DATA;
var errors = [];
var seenIds = {};
var perLevel = {};
var LEVELS = { N5: 1, N4: 1, N3: 1, N2: 1, N1: 1 };

function hasKanji(s) {
  return /[一-龯々]/.test(s); // CJK ideographs + 々
}

if (!Array.isArray(data)) {
  console.error('READING_DATA is not an array.');
  process.exit(1);
}

data.forEach(function (p, pi) {
  var where = 'passage[' + pi + '] (' + (p && p.id) + ')';
  ['id', 'title', 'titleReading', 'titleDe', 'level', 'category', 'summary'].forEach(function (f) {
    if (!p[f] || typeof p[f] !== 'string') errors.push(where + ': missing/empty field "' + f + '"');
  });

  if (p.id) {
    if (seenIds[p.id]) errors.push(where + ': duplicate id "' + p.id + '"');
    seenIds[p.id] = true;
    if (!/^r-[a-z0-9-]+$/.test(p.id)) errors.push(where + ': id "' + p.id + '" must match r-<slug>');
  }

  if (!LEVELS[p.level]) {
    errors.push(where + ': invalid level "' + p.level + '"');
  } else {
    perLevel[p.level] = (perLevel[p.level] || 0) + 1;
  }

  if (!Array.isArray(p.sentences) || !p.sentences.length) {
    errors.push(where + ': sentences must be a non-empty array');
    return;
  }

  p.sentences.forEach(function (s, si) {
    var sw = where + ' sentence[' + si + ']';
    if (!Array.isArray(s.tokens) || !s.tokens.length) {
      errors.push(sw + ': tokens must be a non-empty array');
      return;
    }
    ['jp', 'romaji', 'de'].forEach(function (f) {
      if (!s[f] || typeof s[f] !== 'string') errors.push(sw + ': missing/empty "' + f + '"');
    });

    var surface = '';
    s.tokens.forEach(function (t, ti) {
      var tw = sw + ' token[' + ti + ']';
      if (typeof t.s !== 'string' || !t.s) {
        errors.push(tw + ': token surface "s" missing');
        return;
      }
      surface += t.s;
      if (!t.p && (typeof t.g !== 'string' || !t.g)) {
        errors.push(tw + ' ("' + t.s + '"): non-punctuation token needs a gloss "g"');
      }
      if (!t.p && hasKanji(t.s) && (typeof t.r !== 'string' || !t.r)) {
        errors.push(tw + ' ("' + t.s + '"): kanji token needs a reading "r"');
      }
    });

    if (s.jp && surface !== s.jp) {
      errors.push(sw + ': jp does not equal joined tokens\n      jp     = ' + s.jp + '\n      tokens = ' + surface);
    }
  });
});

// Per-level balance: every level that appears must have the same count.
var counts = Object.keys(perLevel).map(function (k) { return perLevel[k]; });
var min = Math.min.apply(null, counts);
var max = Math.max.apply(null, counts);
if (Object.keys(perLevel).length !== 5) {
  errors.push('Expected all 5 levels (N5..N1) to be present; got: ' + JSON.stringify(perLevel));
}
if (min !== max) {
  errors.push('Per-level passage counts are unbalanced: ' + JSON.stringify(perLevel));
}

// --- Comprehension questions (reading-questions.js) ---
var questions = window.READING_QUESTIONS || {};
var byId = {};
data.forEach(function (p) { byId[p.id] = p; });
var questionedPerLevel = {};
var questionCount = 0;

Object.keys(questions).forEach(function (id) {
  var where = 'questions["' + id + '"]';
  var passage = byId[id];
  if (!passage) {
    errors.push(where + ': no passage with this id exists');
    return;
  }
  questionedPerLevel[passage.level] = (questionedPerLevel[passage.level] || 0) + 1;

  var list = questions[id];
  if (!Array.isArray(list) || !list.length) {
    errors.push(where + ': must be a non-empty array');
    return;
  }
  list.forEach(function (q, qi) {
    var qw = where + '[' + qi + ']';
    questionCount++;
    if (!q || typeof q.q !== 'string' || !q.q.trim()) {
      errors.push(qw + ': missing/empty question text "q"');
    }
    if (!Array.isArray(q.options) || q.options.length < 2 || q.options.length > 4) {
      errors.push(qw + ': options must be an array of 2-4 choices');
      return;
    }
    var seen = {};
    q.options.forEach(function (opt, oi) {
      if (typeof opt !== 'string' || !opt.trim()) {
        errors.push(qw + ' option[' + oi + ']: empty option');
      } else if (seen[opt]) {
        errors.push(qw + ': duplicate option "' + opt + '"');
      }
      seen[opt] = true;
    });
    if (typeof q.correct !== 'number' || q.correct !== Math.floor(q.correct) ||
        q.correct < 0 || q.correct >= q.options.length) {
      errors.push(qw + ': "correct" must be a valid index into options');
    }
  });
});

// A level is either fully covered or not started — a half-questioned level
// would look broken in the UI (some passages with the block, some without).
Object.keys(questionedPerLevel).forEach(function (level) {
  if (questionedPerLevel[level] !== perLevel[level]) {
    errors.push('Level ' + level + ': ' + questionedPerLevel[level] + ' of ' +
      perLevel[level] + ' passages have questions — cover the level completely or not at all');
  }
});

console.log('Passages: ' + data.length + '  per level: ' + JSON.stringify(perLevel));
console.log('Questions: ' + questionCount + ' across ' + Object.keys(questions).length +
  ' passages  per level: ' + JSON.stringify(questionedPerLevel));
if (errors.length) {
  console.error('\nFAIL (' + errors.length + ' issue(s)):');
  errors.forEach(function (e) { console.error('  - ' + e); });
  process.exit(1);
}
console.log('OK: all reading passages valid.');
