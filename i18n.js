/* Interface language. German is the source language: every interface string is written in
   German in the code and in index.html, and i18n-en.js maps it to English. Content data has
   generated English copies under en/ (scripts/build-english.cjs); en/manifest.js lists them.
   Switching the language stores the choice and reloads; the session restore keeps the place. */
(function () {
  'use strict';
  var KEY = 'nihongo-lang';
  var LANGS = { de: 'Deutsch', en: 'English' };
  var store = window.NIHONGO_STORAGE && window.NIHONGO_STORAGE.local;
  var stored = store ? store.get(KEY, null) : null;
  var lang = LANGS[stored] ? stored : 'de';
  var dictionaries = {};
  var missing = Object.create(null);

  function format(text, vars) {
    if (!vars) return text;
    return text.replace(/\{(\w+)\}/g, function (match, name) {
      return Object.prototype.hasOwnProperty.call(vars, name) ? String(vars[name]) : match;
    });
  }

  // tr('Lade Kanji-Daten...') or tr('{count} von {total} Ergebnissen', { count: 5, total: 9 }).
  // Unknown keys fall back to the German text and are recorded for the coverage test.
  function tr(text, vars) {
    var key = String(text);
    if (lang !== 'de' && key) {
      var dict = dictionaries[lang] || {};
      if (Object.prototype.hasOwnProperty.call(dict, key)) key = dict[key];
      else missing[key] = true;
    }
    return format(key, vars);
  }

  function has(text) {
    var dict = dictionaries[lang];
    return lang === 'de' || !!(dict && Object.prototype.hasOwnProperty.call(dict, text));
  }

  var ATTRIBUTES = ['title', 'placeholder', 'aria-label', 'data-label', 'alt'];

  // Static markup (index.html) stays German; in another language its text nodes and
  // labelling attributes are replaced from the dictionary.
  function localizeDocument(root) {
    if (lang === 'de') return;
    root = root || document.body;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
      acceptNode: function (node) {
        if (node.nodeType === 1) {
          // Elements with their own lang (Japanese text, the language switch) stay as written.
          if (/^(SCRIPT|STYLE)$/.test(node.tagName) || node.hasAttribute('lang')) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
        return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      }
    });
    var node = root;
    do {
      if (node.nodeType === 3) {
        var value = node.nodeValue, trimmed = value.trim();
        if (/[A-Za-zÄÖÜäöüß]/.test(trimmed)) {
          var translated = tr(trimmed);
          if (translated !== trimmed) node.nodeValue = value.replace(trimmed, function () { return translated; });
        }
      } else if (node.nodeType === 1) {
        for (var i = 0; i < ATTRIBUTES.length; i++) {
          var attr = node.getAttribute(ATTRIBUTES[i]);
          if (attr && /[A-Za-zÄÖÜäöüß]/.test(attr)) node.setAttribute(ATTRIBUTES[i], tr(attr));
        }
      }
      node = walker.nextNode();
    } while (node);
  }

  // Path of a content data file in the active language. '' means the file is part of a
  // bundle that another entry already loads. Untranslated files keep their German source.
  function contentSrc(src) {
    if (lang === 'de') return src;
    var manifest = window.NIHONGO_CONTENT_FILES && window.NIHONGO_CONTENT_FILES[lang];
    return manifest && Object.prototype.hasOwnProperty.call(manifest, src) ? manifest[src] : src;
  }

  function setLanguage(next) {
    if (!LANGS[next] || next === lang) return;
    if (store) store.set(KEY, next);
    // Keep the current view: workspace.js restores from the session on reload.
    if (window.app && window.app.workspace && window.app.workspace.save) window.app.workspace.save();
    api.reload();
  }

  document.documentElement.lang = lang;
  document.documentElement.setAttribute('data-lang', lang);

  window.tr = tr;
  var api = window.NIHONGO_I18N = {
    lang: lang,
    languages: LANGS,
    // Locale for sorting and case folding of the content language.
    locale: lang === 'de' ? 'de' : 'en',
    tr: tr,
    has: has,
    format: format,
    localizeDocument: localizeDocument,
    contentSrc: contentSrc,
    setLanguage: setLanguage,
    register: function (code, dict) { dictionaries[code] = dict; },
    reload: function () { window.location.reload(); },
    missing: function () { return Object.keys(missing); }
  };
})();
