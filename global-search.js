/* Global search: one dialog over all reference sections and the grammar lessons. It opens with
   Ctrl+K (⌘K), with / where a section has no search of its own, and from the sidebar or the
   compact header. Each section keeps its own matching: kanji and vocabulary use their ranked
   search, the other sections their filter (with every filter at "all"), and lessons the lesson
   search. "Show all" therefore finds exactly the same entries in the section. The data loads
   the first time the dialog opens; the vocabulary details stay for later (listOnly).
   Japanese input goes through japanese-lookup.js: an inflected form finds its dictionary form
   (in the vocabulary section's own ranking, so "show all" agrees), and a phrase or sentence
   is split into its words, each linked to its card. #search/<text> opens the dialog with a
   query, for bookmarks and the browser's address bar.
   A result found outside the fields its row shows says where the query is (REASONS). Without
   a query the dialog lists the entries opened last (workspace.js: recent). */
(function () {
  'use strict';
  var app = window.app;
  var LIMIT = 5;
  var SOURCES = [
    { name: 'vocab', label: 'Vokabeln' },
    { name: 'kanji', label: 'Kanji' },
    { name: 'grammar', label: 'Grammatik' },
    { name: 'lessons', label: 'Lektionen' },
    { name: 'onomatopoeia', label: 'Lautmalerei' },
    { name: 'counters', label: 'Zählwörter' },
    { name: 'radicals', label: 'Radikale' }
  ];
  var overlay = document.getElementById('search-overlay');
  var panel = overlay.querySelector('.search-panel');
  var input = document.getElementById('global-search-input');
  var statusEl = document.getElementById('global-search-status');
  var resultsEl = document.getElementById('global-search-results');
  var loadState = {};
  var timer = null;
  var trigger = null;

  // --- Matching for the sections without a ranked search ---
  // Weights as in the kanji and vocabulary search: exact, prefix, contained.
  var MAIN = [1000, 800, 680], READING = [950, 760, 640], ROMAJI = [930, 740, 580], MEANING = [900, 720, 600];
  var ELSEWHERE = 300; // matched only in an explanation, an example or another field

  function weigh(rank, weights) { return rank ? weights[3 - rank] : 0; }
  function score(fields) {
    var best = 0;
    fields.forEach(function (field) { best = Math.max(best, weigh(field[0], field[1])); });
    return best || ELSEWHERE;
  }
  function bestRank(values, q) {
    var best = null;
    values.forEach(function (value) {
      var rank = getTextMatchRank(value, q);
      if (rank !== null && (best === null || rank > best)) best = rank;
    });
    return best;
  }
  // "direction / point in time; place" matches each part exactly as well as the whole text.
  function parts(text) {
    text = String(text || '');
    return [text].concat(text.split(/\s*[;,/、・]\s*/));
  }
  function bare(pattern) { return String(pattern || '').replace(/[〜～~]/g, '').trim(); }

  // Meanings rank by words: "eat" is exact for "to eat", starts "eating", and is only contained
  // in "treatment". Applied on top of every section's own score, so a short English or German
  // query finds the word itself before longer texts that happen to contain it.
  var LEADING = /^(?:to|a|an|the|sich|etw\.|etwas|jdn\.|jdm\.)\s+/;
  function escapeRegExp(text) { return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  function meaningScore(values, q, weights) {
    var wordStart = new RegExp('(^|[^a-z0-9äöüß])' + escapeRegExp(q));
    var best = 0;
    (Array.isArray(values) ? values : [values]).forEach(function (value) {
      parts(value).forEach(function (part) {
        part = String(part || '').trim().toLowerCase();
        if (!part) return;
        // "to eat (polite)" is exact for "eat"; the bracket still counts as text below.
        var stripped = part.replace(/\s*\([^)]*\)\s*/g, ' ').trim(), core = stripped.replace(LEADING, '');
        if (core === q || stripped === q) best = Math.max(best, weights[0]);
        else if (core.indexOf(q) === 0) best = Math.max(best, weights[1]);
        else if (wordStart.test(part)) best = Math.max(best, weights[1] - 60);
        else if (part.indexOf(q) !== -1) best = Math.max(best, weights[2]);
      });
    });
    return best;
  }

  var RANKERS = {
    grammar: function (g, q) {
      return Math.max(score([[bestRank(parts(bare(g.pattern)), q), MAIN]]), meaningScore(g.meaning, q, MEANING));
    },
    onomatopoeia: function (o, q) {
      var words = [o.word].concat(o.aliases || []);
      var folded = bestRank(words.map(normalizeOnomatopoeia), normalizeOnomatopoeia(q));
      return Math.max(score([[bestRank(words, q), MAIN], [folded, MAIN], [bestRank(parts(o.reading), q), READING],
        [getRomajiMatchRank(o.romaji, q), ROMAJI]]), meaningScore(o.meaning, q, MEANING));
    },
    counters: function (c, q) {
      return Math.max(score([[bestRank([c.kanji], q), MAIN], [bestRank(parts(c.reading), q), READING],
        [getRomajiMatchRank(c.romaji, q), ROMAJI]]), meaningScore(c.meaning, q, MEANING));
    },
    radicals: function (r, q) {
      return Math.max(score([[bestRank([r.radical], q), MAIN], [String(r.number) === q ? 3 : null, READING],
        [bestRank(parts(r.reading), q), READING], [getRomajiMatchRank(r.romaji, q), ROMAJI]]), meaningScore(r.meaning, q, MEANING));
    },
    lessons: function (lesson, q) {
      return Math.max(ELSEWHERE, meaningScore(lesson.title, q, MAIN), meaningScore(lesson.subtitle, q, MEANING));
    }
  };
  // Word-aware meaning scores for the two sections with their own ranked search.
  var MEANINGS = {
    vocab: function (v) { return v.meaning; },
    kanji: function (k) { return k.meanings; }
  };

  // --- Why an entry matched ---
  // A match in none of the fields the row shows: { label, text, ja } names the place, an
  // example, an explanation or a spelling variant. null when the row shows the match itself.
  function contains(text, q) { return String(text || '').toLowerCase().indexOf(q) !== -1; }
  function plainText(html) { return String(html || '').replace(/<[^>]+>/g, ''); }
  // keys: the Japanese sentence, its translation and its romaji.
  function exampleReason(examples, q, keys) {
    keys = keys || ['japanese', 'german', 'romaji'];
    for (var i = 0; i < (examples || []).length; i++) {
      var ex = examples[i];
      if (contains(ex[keys[0]], q)) return { label: tr('Beispiel'), text: ex[keys[0]], ja: true };
      if (contains(ex[keys[1]], q)) return { label: tr('Beispiel'), text: ex[keys[1]] };
      if (matchesRomaji(ex[keys[2]], q)) return { label: tr('Beispiel'), text: ex[keys[2]] };
    }
    return null;
  }
  var REASONS = {
    vocab: function (v, q) {
      if (getTextMatchRank(v.word, q) !== null || getTextMatchRank(v.reading, q) !== null ||
        getRomajiMatchRank(v.romaji, q) !== null || getTextMatchRank(v.meaning, q) !== null) return null;
      var alias = (v.aliases || []).find(function (a) { return getTextMatchRank(a, q) !== null; });
      if (alias) return { label: tr('Schreibvariante'), text: alias, ja: true };
      return getTextMatchRank(tr(v.category || ''), q) !== null ? { label: tr('Kategorie'), text: tr(v.category) } : null;
    },
    kanji: function (k, q) {
      if (getTextMatchRank(k.kanji, q) !== null || getBestArrayMatchRank(k.meanings, q) !== null ||
        getReadingFieldMatchRank(k.kun, q) !== null || getReadingFieldMatchRank(k.on, q) !== null) return null;
      var best = null, bestRank = 0;
      (k.examples || []).forEach(function (ex) {
        var rank = getBestArrayMatchRank([ex.word, ex.reading, ex.meaning], q);
        if (rank !== null && rank > bestRank) { best = ex; bestRank = rank; }
      });
      return best ? { label: tr('Beispielwort'), text: best.word + '（' + best.reading + '）' + best.meaning, ja: true } : null;
    },
    grammar: function (g, q) {
      if (contains(g.pattern, q) || contains(g.meaning, q)) return null;
      if (contains(g.formation, q)) return { label: tr('Bildung'), text: g.formation };
      return exampleReason(g.examples, q) || (contains(g.explanation, q) ? { label: tr('Erklärung'), text: g.explanation } : null);
    },
    onomatopoeia: function (o, q) {
      var folded = normalizeOnomatopoeia(q);
      var shown = [o.word, o.reading].concat(o.aliases || []).some(function (word) {
        return word && (word.indexOf(q) !== -1 || normalizeOnomatopoeia(word).indexOf(folded) !== -1);
      });
      if (shown || matchesRomaji(o.romaji, q) || contains(o.meaning, q)) return null;
      return exampleReason(o.examples, q) || (contains(o.explanation, q) ? { label: tr('Erklärung'), text: o.explanation } : null);
    },
    counters: function (c, q) {
      if (c.kanji.indexOf(q) !== -1 || c.reading.indexOf(q) !== -1 || matchesRomaji(c.romaji, q) || contains(c.meaning, q)) return null;
      var form = (c.counts || []).find(function (ct) { return ct.reading.indexOf(q) !== -1 || ct.kanji.indexOf(q) !== -1 || matchesRomaji(ct.romaji, q); });
      if (form) return { label: tr('Zählform'), text: form.kanji + '（' + form.reading + '）', ja: true };
      return contains(c.usage, q) ? { label: tr('Verwendung'), text: c.usage } : null;
    },
    radicals: function (r, q) {
      if (r.radical.indexOf(q) !== -1 || contains(r.meaning, q) || r.reading.indexOf(q) !== -1 || matchesRomaji(r.romaji, q) || String(r.number) === q) return null;
      return contains(r.explanation, q) ? { label: tr('Erklärung'), text: r.explanation } : null;
    },
    lessons: function (lesson, q) {
      if (contains(lesson.title, q) || contains(lesson.subtitle, q)) return null;
      var found = null;
      function prose(value) {
        var text = plainText(value);
        if (!found && contains(text, q)) found = { label: tr('Erklärung'), text: text };
      }
      prose(lesson.intro);
      lesson.sections.forEach(function (section) {
        if (found) return;
        prose(section.heading); prose(section.text); prose(section.tip);
        if (!found) found = exampleReason(section.examples, q, ['jp', 'de', 'romaji']);
      });
      return found;
    }
  };

  function levelRank(item) {
    var level = String(item.level || item.jlpt || '').split('/')[0];
    return LEVEL_ORDER[level] !== undefined ? LEVEL_ORDER[level] : 9;
  }

  function isReady(name) {
    if (name === 'lessons') return !!(window.__grammarLessonsInitialized && Array.isArray(window.GRAMMAR_LESSONS));
    return app.sections[name].isLoaded;
  }

  // Matches of one source: the total and the best LIMIT entries. Only the top entries are
  // ordered, so a one-letter query over 16,000 words stays cheap.
  function collect(source, q) {
    var name = source.name, items, match, compare = null;
    if (name === 'lessons') {
      items = window.GRAMMAR_LESSONS;
      // The lesson search (grammar-lessons.js) matches the lowercased lesson text.
      match = function (lesson) { return lesson._searchText.indexOf(q) !== -1 ? RANKERS.lessons(lesson, q) : null; };
    } else {
      var sec = app.sections[name], config = sec.config;
      items = sec.allItems;
      if (config.searchScoreFn) {
        // With every filter at "all", the filter only narrows by the kanji radical filter,
        // which "show all" clears.
        var meaningOf = MEANINGS[name];
        match = function (item) {
          var m = config.searchScoreFn(item, q, sec);
          return m ? Math.max(m.score, meaningOf ? meaningScore(meaningOf(item), q, MEANING) : 0) : null;
        };
        if (config.searchCompareFn) compare = function (a, b) { return config.searchCompareFn(a, b, sec.currentSort); };
      } else {
        var neutral = {};
        Object.keys(sec.filters).forEach(function (key) { neutral[key] = 'all'; });
        match = function (item) { return config.filterFn(item, q, neutral, sec) ? RANKERS[name](item, q) : null; };
      }
    }
    function order(a, b) {
      return (b.score - a.score) || (compare ? compare(a.item, b.item) : levelRank(a.item) - levelRank(b.item)) || (a.index - b.index);
    }
    var top = [], total = 0;
    for (var i = 0; i < items.length; i++) {
      var value = match(items[i]);
      if (value === null) continue;
      total++;
      var entry = { item: items[i], index: i, score: value };
      if (top.length === LIMIT && order(entry, top[LIMIT - 1]) >= 0) continue;
      var at = top.length;
      while (at > 0 && order(entry, top[at - 1]) < 0) at--;
      top.splice(at, 0, entry);
      if (top.length > LIMIT) top.pop();
    }
    return { source: source, total: total, top: top };
  }

  // --- Rendering ---
  function rowOf(name, item, q) {
    var readings = function (list) { return (list || []).map(function (r) { return r.kana; }); };
    switch (name) {
      case 'vocab': return { main: item.word, title: item.meaning, detail: item.reading !== item.word ? item.reading : '', level: item.level,
        inflection: q ? inflectionOf(item, q) : null };
      case 'kanji': return { main: item.kanji, title: (item.meanings || []).slice(0, 3).join(', '),
        detail: readings(item.on).concat(readings(item.kun)).slice(0, 4).join('、'), level: item.jlpt };
      case 'grammar': return { main: item.pattern, title: item.meaning, detail: '', level: item.level };
      case 'lessons': return { main: String(item.number), latin: true, title: item.title, detail: item.subtitle, detailLatin: true, level: item.level };
      case 'onomatopoeia': return { main: item.word, title: item.meaning, detail: item.reading && item.reading !== item.word ? item.reading : '', level: item.level };
      case 'counters': return { main: item.kanji, title: item.meaning, detail: item.reading, level: item.level };
      case 'radicals': return { main: item.radical, title: item.meaning, detail: item.reading, badge: '#' + item.number };
    }
    return null;
  }

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }

  // An inflected query: the form as typed and what was undone (食べられなかった ← potential …).
  function inflectionOf(item, q) {
    var lookup = window.NIHONGO_LOOKUP, sec = app.sections.vocab;
    var found = lookup && sec.isLoaded ? lookup.inflection(item, q, sec.allItems) : null;
    return found ? { form: q, reasons: found.reasons } : null;
  }

  function resultButton(name, entry, q) {
    var row = rowOf(name, entry.item, q);
    // An inflected form already says how it was found.
    var reason = row.inflection ? null : REASONS[name](entry.item, q);
    if (reason) row.reason = { label: reason.label, text: reason.text, ja: reason.ja, query: q };
    return rowButton(name, entry.item, name + ':' + entry.index, row);
  }

  // The text around the first match, with the match marked. A match by romaji that ignores
  // vowel length has no literal position: the text then starts at its beginning.
  function appendSnippet(host, text, q, ja) {
    text = String(text).replace(/\s+/g, ' ').trim();
    var at = text.toLowerCase().indexOf(q), lead = ja ? 12 : 28, tail = ja ? 36 : 90;
    if (at === -1) {
      host.appendChild(document.createTextNode(text.length > lead + tail ? text.slice(0, lead + tail).trim() + '…' : text));
      return;
    }
    var from = Math.max(0, at - lead), to = Math.min(text.length, at + q.length + tail);
    if (!ja && from > 0) {
      // Start at a word, not inside one.
      var space = text.indexOf(' ', from);
      if (space !== -1 && space < at) from = space + 1;
    }
    host.appendChild(document.createTextNode((from > 0 ? '…' : '') + text.slice(from, at)));
    host.appendChild(el('mark', '', text.slice(at, at + q.length)));
    host.appendChild(document.createTextNode(text.slice(at + q.length, to) + (to < text.length ? '…' : '')));
  }

  function rowButton(name, item, key, row) {
    var btn = el('button', 'gs-result');
    btn.type = 'button';
    btn.dataset.key = key;
    var main = btn.appendChild(el('span', 'gs-main' + (row.latin ? ' gs-number' : ''), row.main));
    if (!row.latin) main.lang = 'ja';
    var text = btn.appendChild(el('span', 'gs-text'));
    text.appendChild(el('span', 'gs-title', row.title));
    if (row.detail) {
      var detail = text.appendChild(el('span', 'gs-detail', row.detail));
      if (!row.detailLatin) detail.lang = 'ja';
    }
    if (row.inflection) {
      var note = text.appendChild(el('span', 'gs-inflection'));
      note.appendChild(el('span', '', row.inflection.form)).lang = 'ja';
      var reasons = window.NIHONGO_LOOKUP.describe(row.inflection.reasons);
      if (reasons) note.appendChild(document.createTextNode(' ← ' + reasons));
    }
    if (row.reason) {
      var why = text.appendChild(el('span', 'gs-reason'));
      why.appendChild(el('span', 'gs-reason-label', row.reason.label + ': '));
      var where = why.appendChild(el('span'));
      if (row.reason.ja) where.lang = 'ja';
      appendSnippet(where, row.reason.text, row.reason.query, row.reason.ja);
    }
    var level = row.level ? String(row.level) : '';
    btn.appendChild(el('span', 'card-level ' + (level.split('/')[0] || ''), row.badge || level));
    btn.addEventListener('click', function () { openEntry(name, item); });
    return btn;
  }

  // --- Sentence breakdown ---
  // Japanese text of two or more parts: the text with each part as a button, and one row per
  // part below it (more than one when a kana word has several equally likely readings).
  function breakdown(raw) {
    var lookup = window.NIHONGO_LOOKUP;
    if (!lookup || !lookup.hasJapanese(raw) || !isReady('vocab')) return null;
    var tokens = lookup.segment(raw, {
      vocab: app.sections.vocab.allItems,
      grammar: isReady('grammar') ? app.sections.grammar.allItems : null,
      kanji: isReady('kanji') ? app.sections.kanji.allItems : null
    });
    var parts = tokens.filter(function (token) { return token.kind !== 'text'; }).length;
    return parts >= 2 ? { tokens: tokens, parts: parts, truncated: raw.length > lookup.MAX_TEXT } : null;
  }

  // The entries a part links to: [{ name, item, inflection }]; its button opens the first.
  function tokenEntries(token) {
    if (token.kind === 'grammar') return [{ name: 'grammar', item: token.item }];
    if (token.kind === 'kanji') return [{ name: 'kanji', item: token.item }];
    return token.matches.map(function (match) {
      return { name: 'vocab', item: match.item, inflection: match.reasons.length ? { form: token.text, reasons: match.reasons } : null };
    });
  }

  function renderBreakdown(result) {
    var section = el('section', 'gs-group gs-breakdown');
    section.dataset.source = 'breakdown';
    var heading = section.appendChild(el('h3', 'gs-group-title', tr('Satz zerlegt') + ' '));
    heading.id = 'gs-group-breakdown';
    heading.appendChild(el('span', 'gs-group-count', String(result.parts)));
    section.setAttribute('aria-labelledby', heading.id);
    var sentence = section.appendChild(el('p', 'gs-sentence'));
    sentence.lang = 'ja';
    var list = el('ul', 'gs-list'), seen = new Set(), rows = 0;
    result.tokens.forEach(function (token, n) {
      if (token.kind === 'text') { sentence.appendChild(document.createTextNode(token.text)); return; }
      var entries = tokenEntries(token), first = entries[0], firstRow = rowOf(first.name, first.item);
      // The rows below carry the same links for the keyboard; the text is for pointing at.
      var button = sentence.appendChild(el('button', 'gs-token gs-token-' + token.kind, token.text));
      button.type = 'button';
      button.tabIndex = -1;
      button.dataset.key = 'token:' + n;
      button.title = firstRow.main + (firstRow.title ? ' – ' + firstRow.title : '');
      button.addEventListener('click', function () { openEntry(first.name, first.item); });
      entries.forEach(function (entry) {
        if (seen.has(entry.item)) return;
        seen.add(entry.item);
        var row = rowOf(entry.name, entry.item);
        row.inflection = entry.inflection;
        list.appendChild(el('li')).appendChild(rowButton(entry.name, entry.item, 'part:' + rows++, row));
      });
    });
    section.appendChild(list);
    if (result.truncated) {
      section.appendChild(el('p', 'gs-note', tr('Nur die ersten {count} Zeichen wurden zerlegt.', { count: window.NIHONGO_LOOKUP.MAX_TEXT })));
    }
    return section;
  }

  // --- Recently opened entries ---
  // Shown while the field is empty: what was looked up once is often looked up again.
  function renderRecent() {
    var entries = app.workspace.recent();
    if (!entries.length) return;
    var section = resultsEl.appendChild(el('section', 'gs-group gs-recent'));
    section.dataset.source = 'recent';
    var heading = section.appendChild(el('h3', 'gs-group-title', tr('Zuletzt angesehen')));
    heading.id = 'gs-group-recent';
    section.setAttribute('aria-labelledby', heading.id);
    var list = section.appendChild(el('ul', 'gs-list'));
    entries.forEach(function (entry, n) {
      list.appendChild(el('li')).appendChild(rowButton(entry.name, entry.item, 'recent:' + n, rowOf(entry.name, entry.item)));
    });
    var clear = section.appendChild(el('button', 'gs-more', tr('Verlauf löschen')));
    clear.type = 'button';
    clear.dataset.key = 'recent-clear';
    clear.addEventListener('click', function () { app.workspace.forgetRecent(); render(); input.focus(); });
  }

  function render() {
    clearTimeout(timer);
    timer = null;
    var raw = input.value.trim(), q = raw.toLowerCase();
    var focusedKey = resultsEl.contains(document.activeElement) ? document.activeElement.dataset.key : null;
    resultsEl.textContent = '';
    var loading = SOURCES.some(function (s) { return loadState[s.name] === 'loading'; });
    var failed = SOURCES.filter(function (s) { return loadState[s.name] === 'failed'; });
    var status = [];

    if (failed.length) {
      var note = resultsEl.appendChild(el('div', 'gs-failed route-message'));
      note.setAttribute('role', 'alert');
      note.appendChild(el('span', '', tr('Konnte nicht geladen werden: {sections}.', {
        sections: failed.map(function (s) { return tr(s.label); }).join(', ')
      }) + ' '));
      var retry = note.appendChild(el('button', 'btn btn-pill', tr('Erneut versuchen')));
      retry.type = 'button';
      retry.dataset.key = 'retry';
      retry.addEventListener('click', function () { failed.forEach(function (s) { delete loadState[s.name]; }); load(); render(); input.focus(); });
    }

    if (!q) {
      status.push(tr('Durchsucht Vokabeln, Kanji, Grammatik, Lektionen, Lautmalerei, Zählwörter und Radikale.'));
      renderRecent();
    } else if (/^[a-zäöüß]$/.test(q)) {
      // One Latin letter matches nearly everything; one kana or kanji is a real query.
      status.push(tr('Bitte mindestens zwei Buchstaben eingeben.'));
    } else {
      var parts = breakdown(raw);
      if (parts) {
        resultsEl.appendChild(renderBreakdown(parts));
        status.push(tr('In {count} Teile zerlegt.', { count: parts.parts }));
      }
      var groups = SOURCES.filter(function (s) { return isReady(s.name); })
        .map(function (s) { return collect(s, q); })
        .filter(function (g) { return g.total > 0; });
      // The section with the best match comes first; ties keep the order of SOURCES.
      groups.sort(function (a, b) { return (b.top[0].score - a.top[0].score) || (SOURCES.indexOf(a.source) - SOURCES.indexOf(b.source)); });
      var total = 0;
      groups.forEach(function (group) {
        total += group.total;
        var name = group.source.name, label = tr(group.source.label);
        var section = resultsEl.appendChild(el('section', 'gs-group'));
        section.dataset.source = name;
        var heading = section.appendChild(el('h3', 'gs-group-title', label + ' '));
        heading.id = 'gs-group-' + name;
        heading.appendChild(el('span', 'gs-group-count', String(group.total)));
        section.setAttribute('aria-labelledby', heading.id);
        var list = section.appendChild(el('ul', 'gs-list'));
        group.top.forEach(function (entry) { list.appendChild(el('li')).appendChild(resultButton(name, entry, q)); });
        if (group.total > group.top.length) {
          var more = section.appendChild(el('button', 'gs-more', tr('Alle {count} in {section} anzeigen →', { count: group.total, section: label })));
          more.type = 'button';
          more.dataset.key = 'more:' + name;
          more.addEventListener('click', function () { showAll(name, raw); });
        }
      });
      if (total) status.push(total === 1 ? tr('1 Treffer') : tr('{count} Treffer', { count: total }));
      else if (!parts) status.push(tr('Keine Treffer für „{query}“.', { query: raw }));
    }
    if (loading) status.push(tr('Inhalte werden geladen …'));
    statusEl.textContent = status.join(' ');

    // A background update keeps the keyboard position.
    if (focusedKey) {
      var same = resultsEl.querySelector('[data-key="' + focusedKey + '"]');
      (same || input).focus({ preventScroll: !!same });
    }
  }

  function schedule(delay) {
    clearTimeout(timer);
    timer = setTimeout(render, delay);
  }

  // --- Loading ---
  function load() {
    SOURCES.forEach(function (source) {
      var name = source.name;
      if (isReady(name) || loadState[name] === 'loading') return;
      loadState[name] = 'loading';
      var pending = name === 'lessons'
        ? app.ensureSectionLoaded('grammar', { listOnly: true }).then(function () { return app.ensureGrammarLessonsLoaded(); })
        : app.ensureSectionLoaded(name, { listOnly: true });
      pending.then(function () { loadState[name] = 'ready'; }, function () { loadState[name] = 'failed'; })
        .then(function () { if (isOpen()) schedule(0); });
    });
  }

  // --- Navigation ---
  // openRelated switches tabs without the quiz's exit question, so it is asked here, before the
  // dialog closes (a cancelled exit keeps the dialog). switchTab then finds no active test.
  function mayLeaveQuiz() {
    return app.activeTab !== 'quiz' || !window.QuizModule || !window.QuizModule.isTestActive() || window.QuizModule.requestExit();
  }

  // Opens the entry like a cross-reference: its detail has "← Back" to where the search started.
  function openEntry(name, item) {
    if (!mayLeaveQuiz()) return;
    close(false);
    if (name === 'lessons') { openLesson(item.id); return; }
    app.workspace.openRelated(name, function (candidate) { return candidate === item; });
  }

  // Switches to a tab for a list view, without reopening the entry that tab last showed.
  function enterTab(name) {
    if (app.activeTab === name) { app.workspace.dismiss(); return true; }
    var sec = app.sections[name], previous = sec && sec.selectedItem;
    if (sec) sec.selectedItem = null;
    if (app.switchTab(name) === false) {
      if (sec) sec.selectedItem = previous;
      return false;
    }
    return true;
  }

  function openLesson(id) {
    if (!enterTab('grammar')) return;
    app.ensureGrammarLessonsLoaded().then(function () {
      window.Lessons.setView('lessons', true);
      window.Lessons.open(id);
    }).catch(function () {});
  }

  // The section with this query and its filters reset: the same entries the search counted.
  function showAll(name, raw) {
    if (!mayLeaveQuiz()) return;
    close(false);
    if (name === 'lessons') {
      if (!enterTab('grammar')) return;
      app.ensureGrammarLessonsLoaded().then(function () {
        var state = window.Lessons.snapshot();
        state.query = raw; state.level = 'all'; state.selected = null; state.indexScroll = 0;
        window.Lessons.restore(state);
        var clear = document.getElementById('gl-clear-search');
        if (clear) clear.classList.toggle('visible', !!raw);
        finishList();
      }).catch(function () {});
      return;
    }
    if (!enterTab(name)) return;
    if (name === 'grammar' && window.Lessons && window.Lessons.view === 'lessons') window.Lessons.setView('reference', true);
    if (name === 'counters') app.workspace.showCounterList();
    var sec = app.sections[name];
    clearTimeout(sec.searchTimeout);
    Object.keys(sec.filters).forEach(function (key) { sec.filters[key] = 'all'; });
    sec.dom.search.value = raw;
    if (name === 'kanji' && app.activeRadical) app.clearRadicalFilter();
    else sec.applyFilters();
    finishList();
  }

  function finishList() {
    app.workspace.commit();
    app.updateCount();
    window.scrollTo(0, 0);
    document.getElementById('page-title').focus({ preventScroll: true });
  }

  // --- Dialog ---
  function isOpen() { return !overlay.classList.contains('hidden'); }

  // open(text) starts with that query; open() keeps the last one.
  function open(query) {
    if (typeof query === 'string') input.value = query;
    if (isOpen()) {
      input.focus();
      input.select();
      if (typeof query === 'string') render();
      return;
    }
    if (!document.getElementById('help-overlay').classList.contains('hidden')) return;
    trigger = document.activeElement;
    if (document.getElementById('sidebar').classList.contains('open')) {
      // On narrow screens the drawer closes; focus returns to its toggle.
      app.workspace.closeDrawer();
      if (window.innerWidth < 1024) trigger = document.getElementById('nav-toggle');
    }
    overlay.classList.remove('hidden');
    app.workspace.refreshInert();
    load();
    render();
    input.focus();
    input.select();
  }

  // restoreFocus false: a navigation follows and places the focus itself.
  function close(restoreFocus) {
    if (!isOpen()) return;
    clearTimeout(timer);
    timer = null;
    overlay.classList.add('hidden');
    app.workspace.refreshInert();
    var target = trigger;
    trigger = null;
    if (restoreFocus === false) return;
    if (!target || !target.isConnected || target === document.body || target.closest('.hidden, [hidden]')) target = document.getElementById('page-title');
    target.focus({ preventScroll: true });
  }

  function focusables() {
    return [input].concat(Array.from(resultsEl.querySelectorAll('button')));
  }

  overlay.addEventListener('keydown', function (e) {
    // The page's own shortcuts (digits, r, ?, arrows in a detail) stay out of the dialog.
    e.stopPropagation();
    if (e.isComposing || e.keyCode === 229) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key === 'Tab') { app.workspace.trap(e, panel); return; }
    if ((e.ctrlKey || e.metaKey) && !e.altKey && (e.key === 'k' || e.key === 'K')) { e.preventDefault(); input.focus(); input.select(); return; }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      var list = focusables(), index = list.indexOf(document.activeElement);
      if (index === -1) return;
      var next = list[index + (e.key === 'ArrowDown' ? 1 : -1)];
      e.preventDefault();
      if (next) next.focus();
      return;
    }
    if (e.key === 'Enter' && e.target === input) {
      e.preventDefault();
      if (timer) render();
      // Enter opens the best match of a query, not the first of the recent entries.
      var first = input.value.trim() ? resultsEl.querySelector('.gs-result') : null;
      if (first) first.click();
    }
  });
  overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
  document.getElementById('global-search-close').addEventListener('click', function () { close(); });
  input.addEventListener('input', function () { schedule(120); });

  document.addEventListener('keydown', function (e) {
    if (e.defaultPrevented || e.isComposing) return;
    if ((e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      open();
      return;
    }
    // Focus outside the dialog (a click on its text) still closes it with Escape.
    if (isOpen() && e.key === 'Escape') { e.preventDefault(); close(); }
  });
  // Back/Forward replaces the view under the dialog. #search/<text> typed into the address bar
  // keeps the view, puts its address back and opens the dialog with the text.
  window.addEventListener('popstate', function () {
    var query = app.workspace.searchRoute(location.hash);
    if (query === null) { close(false); return; }
    app.workspace.leaveSearchRoute();
    open(query);
  });

  document.querySelectorAll('.global-search-trigger').forEach(function (btn) {
    btn.addEventListener('click', function () { if (app.playTick) app.playTick(); open(); });
  });
  var mac = /Mac|iPhone|iPad|iPod/.test(navigator.platform || '');
  document.querySelectorAll('.kbd-search').forEach(function (kbd) { if (mac) kbd.textContent = '⌘ K'; });
  document.querySelectorAll('.global-search-trigger').forEach(function (btn) { btn.setAttribute('aria-keyshortcuts', mac ? 'Meta+K' : 'Control+K'); });

  var linkTemplate = document.getElementById('search-link-template');
  if (linkTemplate) linkTemplate.textContent = location.href.split('#')[0] + '#search/%s';

  app.globalSearch = { open: open, close: close, isOpen: isOpen };
  // The page was opened at #search/<text>: search once the view behind it is restored.
  if (typeof app.pendingSearch === 'string') {
    var pending = app.pendingSearch;
    app.pendingSearch = null;
    Promise.resolve(app.workspace.restored).then(function () { open(pending); });
  }
})();
