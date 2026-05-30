// ============================================================
// answer-check — validates typed review answers
// ------------------------------------------------------------
// Decides which review cards can be auto-checked by typing and grades the input.
// reading/cloze -> Japanese kana (romaji accepted via RomajiKana); meaning ->
// free German text with synonym splitting and a small typo ("near") tolerance.
// Pure; exposed as window.AnswerCheck and, under Node, module.exports.
// ============================================================
(function (root) {
  'use strict';

  // Prompt types that have a single, checkable answer, and how to normalise them.
  // Everything else (reverse/formation/radical/conjugation/…) stays self-graded.
  var CHECKABLE = { reading: 'kana', meaning: 'text', cloze: 'kana' };

  function isCheckable(card) {
    return !!(card && CHECKABLE[card.promptType]);
  }

  // Katakana -> hiragana + drop spaces, so kana comparison is script-insensitive.
  function normKana(s) {
    return String(s == null ? '' : s).replace(/\s+/g, '').replace(/[ァ-ヶ]/g, function (c) {
      return String.fromCharCode(c.charCodeAt(0) - 0x60);
    });
  }

  // German/meaning text: lowercase, drop parentheticals & punctuation, collapse spaces.
  function normText(s) {
    return String(s == null ? '' : s)
      .toLowerCase()
      .replace(/\([^)]*\)/g, '')
      .replace(/[.!?,;。、]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function splitMeanings(s) {
    return String(s == null ? '' : s).split(/[,;\/、]/).map(normText).filter(Boolean);
  }

  function splitPatternVariants(s) {
    return String(s == null ? '' : s).split(/[\/／]/).map(function (v) {
      return normKana(v.replace(/[～〜~\s]/g, '')); // strip both wave dashes (FF5E, 301C) + tilde
    }).filter(Boolean);
  }

  // -> { kind: 'kana'|'text', answers: [normalised] } or null when not checkable.
  function acceptedAnswers(card) {
    if (!isCheckable(card)) return null;
    var q = (card && card.question) || {};
    if (card.promptType === 'reading') return { kind: 'kana', answers: [normKana(q.answer)].filter(Boolean) };
    if (card.promptType === 'cloze') return { kind: 'kana', answers: splitPatternVariants(q.answer) };
    return { kind: 'text', answers: splitMeanings(q.answer) }; // meaning
  }

  function levenshtein(a, b) {
    a = a || ''; b = b || '';
    if (a === b) return 0;
    if (!a.length) return b.length;
    if (!b.length) return a.length;
    var prev = [], i, j;
    for (j = 0; j <= b.length; j++) prev[j] = j;
    for (i = 1; i <= a.length; i++) {
      var cur = [i];
      for (j = 1; j <= b.length; j++) {
        var cost = a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1;
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      }
      prev = cur;
    }
    return prev[b.length];
  }

  // Grade typed input against a card. -> { correct, near } or null if not checkable.
  // "near" = within a small edit distance (a likely typo) so the UI can ask for a fix
  // instead of marking it wrong outright.
  function checkAnswer(input, card) {
    var acc = acceptedAnswers(card);
    if (!acc || !acc.answers.length) return null;
    var raw = String(input == null ? '' : input).trim();
    if (!raw) return { correct: false, near: false };

    var norm;
    if (acc.kind === 'kana') {
      var rk = root.RomajiKana;
      norm = normKana(rk ? rk.romajiToKana(raw) : raw);
    } else {
      norm = normText(raw);
    }

    var best = Infinity;
    for (var i = 0; i < acc.answers.length; i++) {
      var a = acc.answers[i];
      if (norm === a) return { correct: true, near: false };
      var d = levenshtein(norm, a);
      if (d < best) best = d;
    }
    var tolerance = norm.length >= 6 ? 2 : 1;
    return { correct: false, near: best <= tolerance };
  }

  root.AnswerCheck = {
    isCheckable: isCheckable,
    acceptedAnswers: acceptedAnswers,
    checkAnswer: checkAnswer,
    _normKana: normKana,
    _normText: normText
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = root.AnswerCheck;
})(typeof window !== 'undefined' ? window : this);
