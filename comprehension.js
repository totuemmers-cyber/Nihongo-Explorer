/* Guided comprehension. Content and audio are loaded only when requested. */
(function () {
  'use strict';
  var units, pending, active = null, host, generation = 0;
  var views = { reading: { level: 'N5', selected: null, scroll: 0 }, listening: { level: 'N5', selected: null, scroll: 0 } };
  var progress = {};
  try { progress = JSON.parse(window.NihongoStorage.local.getItem('nihongo-comprehension-v1')) || {}; } catch (e) { /* Optional storage. */ }
  if (typeof progress !== 'object' || Array.isArray(progress)) progress = {};
  function persist() {
    if (!window.NihongoStorage.local.setItem('nihongo-comprehension-v1', JSON.stringify(progress))) {
      var status = host && host.querySelector('.comprehension-storage');
      if (status) status.textContent = 'Speichern ist nicht verfügbar. Dein Fortschritt bleibt nur bis zum Neuladen oder Schließen erhalten.';
    }
  }
  function el(tag, text, cls) { var n = document.createElement(tag); if (text != null) n.textContent = text; if (cls) n.className = cls; return n; }
  function button(text, fn) { var b = el('button', text); b.type = 'button'; b.onclick = fn; return b; }
  function japanese(text) {
    var p = el('p', null, 'comprehension-japanese'); p.lang = 'ja';
    text.split(/(\{[^{}]+\|[^{}]+\})/g).forEach(function (part) {
      var m = /^\{([^|]+)\|([^}]+)\}$/.exec(part);
      if (!m) p.appendChild(document.createTextNode(part));
      else { var ruby = el('ruby', m[1]); ruby.appendChild(el('rt', m[2])); p.appendChild(ruby); }
    }); return p;
  }
  function plain(text) { return text.replace(/\{([^|]+)\|([^}]+)\}/g, '$1'); }
  function counts(skill) {
    if (!units) return null;
    var result = { total: 0, byLevel: { N5: 0, N4: 0, N3: 0, N2: 0, N1: 0 } };
    units.forEach(function (u) { if (u.skill === skill) { result.total++; result.byLevel[u.level]++; } });
    return result;
  }
  function load() {
    if (units) return Promise.resolve(units);
    if (pending) return pending;
    pending = new Promise(function (resolve, reject) {
      var script = document.createElement('script'); script.src = 'comprehension-data.js';
      script.onload = function () { units = window.COMPREHENSION_UNITS; if (Array.isArray(units)) resolve(units); else { pending = null; script.remove(); reject(new Error('Missing units')); } };
      script.onerror = function () { pending = null; script.remove(); reject(new Error('Content load failed')); };
      document.head.appendChild(script);
    }); return pending;
  }
  function stop() { generation++; if (host) host.querySelectorAll('audio').forEach(function (a) { a.pause(); a.removeAttribute('src'); a.load(); }); active = null; }
  function attempt(u) {
    var p = progress[u.id];
    if (!p || typeof p !== 'object' || !p.answers || typeof p.answers !== 'object' || !p.hints || typeof p.hints !== 'object' || !Array.isArray(p.attempts)) p = progress[u.id] = { answers: {}, submitted: false, assisted: false, hints: {}, attempts: [] };
    p.attempts = p.attempts.filter(function (a) { return a && Number.isInteger(a.score) && a.score >= 0 && a.score <= 3 && typeof a.assisted === 'boolean'; });
    u.questions.forEach(function (q) { if (!Number.isInteger(p.answers[q.id]) || p.answers[q.id] < 0 || p.answers[q.id] > 3) delete p.answers[q.id]; });
    if (p.submitted && (!p.attempts.length || !u.questions.every(function (q) { return Number.isInteger(p.answers[q.id]); }))) p.submitted = false;
    return p;
  }
  function saveView() { window.app.workspace.save(); }
  function open(id) {
    var v = views[active]; saveView(); v.scroll = window.scrollY; v.selected = id;
    render(); window.app.workspace.commit(); window.scrollTo(0, 0); focusHeading();
  }
  function back() {
    var v = views[active], id = v.selected; saveView(); v.selected = null; render(); window.app.workspace.commit();
    window.scrollTo(0, v.scroll); var b = host.querySelector('[data-unit="' + id + '"]'); if (b) b.focus({ preventScroll: true });
  }
  function focusHeading() { var h = host.querySelector('h2'); if (h) { h.tabIndex = -1; h.focus({ preventScroll: true }); } }
  async function activate(skill, state, id) {
    stop(); active = skill; host = document.getElementById(skill + '-tab'); var token = generation;
    if (state) ['reading', 'listening'].forEach(function (key) {
      if (state[key]) views[key] = { level: /^N[1-5]$/.test(state[key].level) ? state[key].level : 'N5', selected: state[key].selected || null, scroll: Number(state[key].scroll) || 0 };
    });
    if (id !== undefined) views[skill].selected = id || null;
    host.replaceChildren(el('p', 'Lerneinheiten werden geladen …', 'loading'));
    try { await load(); if (token !== generation || active !== skill) return; render(); }
    catch (e) {
      if (token !== generation) return;
      host.replaceChildren(el('p', 'Die Lerneinheiten konnten nicht geladen werden.'), button('Erneut versuchen', function () { activate(skill).catch(function () {}); }));
      throw e;
    }
  }
  function render() {
    if (!active || !units) return;
    host.querySelectorAll('audio').forEach(function (a) { a.pause(); a.removeAttribute('src'); a.load(); });
    host.replaceChildren(); var storageStatus = el('p', '', 'comprehension-storage'); storageStatus.setAttribute('role', 'status'); host.appendChild(storageStatus);
    var v = views[active], u = units.find(function (entry) { return entry.skill === active && entry.id === v.selected; });
    if (v.selected && !u) { host.appendChild(el('p', 'Diese Einheit wurde nicht gefunden. Wähle eine Einheit aus der Liste.', 'route-message')); v.selected = null; }
    if (u) { v.level = u.level; renderUnit(u); } else renderList();
    window.app.updateCount();
  }
  function renderList() {
    var skill = active, v = views[skill];
    var group = units.filter(function (u) { return u.skill === skill && u.level === v.level; });
    host.appendChild(el('h2', skill === 'reading' ? 'Schritt für Schritt lesen' : 'Schritt für Schritt hören'));
    host.appendChild(el('p', group.length + ' Einheiten auf Niveau ' + v.level + ': von gezielter Orientierung bis zum selbstständigen Verstehen.'));
    var filters = el('div', null, 'level-filters comprehension-levels'); filters.setAttribute('aria-label', 'JLPT-Niveau');
    ['N5', 'N4', 'N3', 'N2', 'N1'].forEach(function (level) {
      var b = button(level, function () { v.level = level; v.scroll = 0; render(); saveView(); }); b.setAttribute('aria-pressed', String(level === v.level)); filters.appendChild(b);
    }); host.appendChild(filters);
    var list = el('ol', null, 'comprehension-list');
    group.forEach(function (u) {
      var li = el('li', null, 'comprehension-card');
      li.appendChild(el('span', u.level + ' · ' + u.order + '/' + group.length + ' · ca. ' + u.minutes + ' Min.', 'comprehension-meta'));
      var b = button(u.title, function () { open(u.id); }); b.dataset.unit = u.id; li.appendChild(b);
      li.appendChild(el('p', u.objective));
      list.appendChild(li);
    }); host.appendChild(list);
  }
  function renderUnit(u) {
    var p = attempt(u); persist();
    host.appendChild(button('← Zurück zu ' + (active === 'reading' ? 'Lesen' : 'Hören'), back));
    var article = el('article', null, 'comprehension-unit'); host.appendChild(article);
    article.appendChild(el('p', u.level + ' · Einheit ' + u.order + ' · ca. ' + u.minutes + ' Min.', 'comprehension-meta'));
    article.appendChild(el('h2', u.title)); article.appendChild(el('p', 'Lernziel: ' + u.objective)); article.appendChild(el('p', u.introduction));
    var aidStatus = el('p', p.assisted ? 'Dieser Versuch: mit Hilfe' : 'Dieser Versuch: ohne Hilfe', 'comprehension-meta'); aidStatus.setAttribute('role', 'status'); article.appendChild(aidStatus);
    function markHint(key) { if (!p.submitted) { p.assisted = true; p.hints[key] = true; persist(); aidStatus.textContent = 'Dieser Versuch: mit Hilfe'; } }
    var supports = el('div', null, 'comprehension-supports');
    var furigana = /^N[45]$/.test(u.level) || !!p.hints.furigana;
    article.classList.toggle('without-furigana', !furigana);
    var rubyButton = button(/^N[45]$/.test(u.level) ? 'Furigana' : 'Furigana für Schlüsselwörter', function () { furigana = !furigana; article.classList.toggle('without-furigana', !furigana); rubyButton.setAttribute('aria-pressed', String(furigana)); if (furigana && !/^N[45]$/.test(u.level)) markHint('furigana'); });
    rubyButton.setAttribute('aria-pressed', String(furigana)); supports.appendChild(rubyButton);
    function passages(target) { u.passages.forEach(function (block) { var row = el('div', null, 'comprehension-passage'); row.id = block.id; if (block.speaker) row.appendChild(el('span', block.speaker, 'comprehension-meta')); row.appendChild(japanese(block.text)); target.appendChild(row); }); }
    if (u.skill === 'listening') {
      article.appendChild(el('p', 'Synthetisches japanisches Audio · ohne automatischen Start', 'comprehension-meta'));
      var audio = document.createElement('audio'); audio.controls = true; audio.preload = 'none'; audio.src = u.audio.src + '?v=' + encodeURIComponent(u.audio.revision || '1'); audio.setAttribute('aria-label', u.title + ' anhören'); article.appendChild(audio);
      var controls = el('div', null, 'comprehension-supports');
      var err = el('div', null, 'route-message'); err.hidden = true; err.setAttribute('role', 'alert');
      function failed() { err.hidden = false; }
      function play() { var promise = audio.play(); if (promise) promise.catch(failed); }
      controls.appendChild(button('Abspielen / Fortsetzen', play)); controls.appendChild(button('Pause', function () { audio.pause(); }));
      controls.appendChild(button('Von vorn abspielen', function () { audio.currentTime = 0; play(); }));
      var speedLabel = el('label', 'Tempo '), speed = document.createElement('select'); speed.setAttribute('aria-label', 'Wiedergabegeschwindigkeit');
      [1, 0.8].forEach(function (rate) { var o = el('option', rate + '×'); o.value = rate; speed.appendChild(o); });
      speed.onchange = function () { audio.playbackRate = Number(speed.value); if (Number(speed.value) < 1) markHint('slow'); }; speedLabel.appendChild(speed); controls.appendChild(speedLabel);
      audio.addEventListener('ratechange', function () { if (audio.playbackRate < 1) markHint('slow'); }); audio.addEventListener('error', failed);
      err.appendChild(el('p', 'Audio konnte nicht abgespielt werden.'));
      err.appendChild(button('Audio erneut laden', function () { err.hidden = true; audio.load(); play(); })); article.append(controls, err);
      hint('Transkript anzeigen', 'transcript', passages);
    } else passages(article);
    article.appendChild(supports);
    function hint(label, key, fill) {
      var content = el('div', null, 'comprehension-hint'); content.hidden = !p.hints[key]; content.id = u.id + '-' + key; fill(content);
      var b = button(label, function () { content.hidden = !content.hidden; b.setAttribute('aria-expanded', String(!content.hidden)); if (!content.hidden) markHint(key); });
      b.setAttribute('aria-expanded', String(!content.hidden)); b.setAttribute('aria-controls', content.id); supports.appendChild(b); article.appendChild(content);
    }
    hint('Deutsche Übersetzung', 'translation', function (target) { target.appendChild(el('p', u.translation)); });
    hint('Wortschatzhilfe', 'glossary', function (target) { var dl = el('dl'); u.glossary.forEach(function (g) { dl.append(el('dt', g[0]), el('dd', g[1])); }); target.appendChild(dl); });
    var form = document.createElement('form'); article.appendChild(form);
    u.questions.forEach(function (q, qi) {
      var field = el('fieldset', null, 'comprehension-question'); field.appendChild(el('legend', (qi + 1) + '. ' + q.prompt));
      q.choices.forEach(function (c, ci) {
        var label = el('label', null, 'comprehension-choice'), input = document.createElement('input'); input.type = 'radio'; input.name = q.id; input.value = ci; input.required = true; input.checked = p.answers[q.id] === ci; input.disabled = p.submitted;
        input.onchange = function () { p.answers[q.id] = ci; persist(); }; label.append(input, el('span', c.text)); field.appendChild(label);
        if (p.submitted) field.appendChild(el('p', (ci === q.answer ? 'Richtig: ' : 'Nicht richtig: ') + c.explanation + ' (Beleg: Abschnitt ' + (u.passages.findIndex(function (b) { return b.id === c.evidence; }) + 1) + '.)', 'comprehension-feedback'));
      });
      if (p.submitted) {
        var evidence = u.passages.find(function (b) { return b.id === q.evidence; }); field.appendChild(el('p', 'Beleg – Abschnitt ' + (u.passages.indexOf(evidence) + 1) + ': „' + plain(evidence.text) + '“', 'comprehension-evidence'));
      } form.appendChild(field);
    });
    if (!p.submitted) { var submit = el('button', 'Einheit auswerten', 'btn-gradient'); submit.type = 'submit'; form.appendChild(submit); }
    form.onsubmit = function (event) {
      event.preventDefault(); if (p.submitted || !u.questions.every(function (q) { return Number.isInteger(p.answers[q.id]); })) return;
      p.submitted = true; p.attempts.push({ score: u.questions.filter(function (q) { return p.answers[q.id] === q.answer; }).length, assisted: p.assisted, at: new Date().toISOString() }); persist(); render();
      var result = host.querySelector('.comprehension-result'); if (result) result.focus();
    };
    if (p.submitted) {
      var last = p.attempts[p.attempts.length - 1]; var result = el('p', last.score + ' von 3 richtig · ' + (last.assisted ? 'mit Hilfe' : 'ohne Hilfe'), 'comprehension-result'); result.tabIndex = -1; result.setAttribute('role', 'status'); article.appendChild(result);
      article.appendChild(el('p', 'Lernhinweis: ' + u.note));
      article.appendChild(button('Neuer Versuch', function () { progress[u.id] = { answers: {}, submitted: false, assisted: false, hints: {}, attempts: p.attempts }; persist(); render(); focusHeading(); }));
    }
  }
  window.Comprehension = { load: load, counts: counts, activate: activate, stop: stop, snapshot: function () { return JSON.parse(JSON.stringify(views)); }, route: function (skill) { return views[skill].selected ? '/' + encodeURIComponent(views[skill].selected) : ''; } };
})();
