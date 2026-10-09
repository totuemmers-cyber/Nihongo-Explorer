// One-time move of bookmarks to Nihongo-prefixed keys.
// Nihongo and Zhongwen Explorer are served from the same origin and both used
// bookmarks-<section> keys, so shared keys may hold ids of either app. Zhongwen's
// ids (Han characters with pinyin, never kana) stay for its own migration.
(function () {
  'use strict';
  var VERSION_KEY = 'nihongo-storage-version';
  var VERSION = '1';
  var store = window.NIHONGO_STORAGE.local;
  if (store.get(VERSION_KEY, null) === VERSION) return;

  var HAN = /[㐀-鿿豈-﫿]/;
  var KANA = /[぀-ヿ]/;
  var LATIN_AFTER_BAR = /\|.*[a-zA-ZÀ-ɏ]/;

  // Mirrors isZhongwenId in Zhongwen Explorer's zhongwen-migrate.js.
  function isZhongwenId(section, id) {
    if (!HAN.test(id) || KANA.test(id)) return false;
    return section !== 'vocab' || LATIN_AFTER_BAR.test(id);
  }

  function readIds(key) {
    var raw = store.get(key, null);
    if (raw === null) return [];
    try {
      var value = JSON.parse(raw);
      return Array.isArray(value) ? value.filter(function (id) { return typeof id === 'string' && id; }) : [];
    } catch (e) {
      return [];
    }
  }

  // kanji and counters were only ever written by Nihongo; radicals share Kangxi numbers (copy only).
  var SHARED = { vocab: true, grammar: true, onomatopoeia: true };
  ['kanji', 'grammar', 'vocab', 'onomatopoeia', 'counters', 'radicals'].forEach(function (section) {
    var legacyKey = 'bookmarks-' + section;
    var ids = readIds(legacyKey);
    var mine = ids.filter(function (id) { return !(SHARED[section] && isZhongwenId(section, id)); });
    if (!mine.length) return;
    var target = 'nihongo-bookmarks-' + section;
    var existing = readIds(target);
    mine.forEach(function (id) { if (existing.indexOf(id) === -1) existing.push(id); });
    store.setJSON(target, existing);
    if (section !== 'radicals') {
      store.setJSON(legacyKey, ids.filter(function (id) { return mine.indexOf(id) === -1; }));
    }
  });

  store.set(VERSION_KEY, VERSION);
})();
