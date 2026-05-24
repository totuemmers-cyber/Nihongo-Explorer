// ============================================================
// SRS Storage and Backup for Nihongo Explorer
// ============================================================
(function () {
  'use strict';

  var DB_NAME = 'nihongo-explorer-srs';
  var DB_VERSION = 1;
  var CARD_STORE = 'cards';
  var EVENT_STORE = 'events';
  var META_STORE = 'meta';
  var FALLBACK_KEY = 'nihongo-srs-fallback-v1';
  var BACKUP_SCHEMA_VERSION = 1;
  var dbPromise = null;
  var pendingBackupTimer = null;
  var fallbackState = null;

  function hasIndexedDb() {
    return typeof indexedDB !== 'undefined' && indexedDB.open;
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function openDb() {
    if (!hasIndexedDb()) return Promise.resolve(null);
    if (dbPromise) return dbPromise;

    dbPromise = new Promise(function (resolve, reject) {
      var request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = function () {
        var db = request.result;
        if (!db.objectStoreNames.contains(CARD_STORE)) {
          var cards = db.createObjectStore(CARD_STORE, { keyPath: 'cardKey' });
          cards.createIndex('itemKey', 'itemKey', { unique: false });
          cards.createIndex('dueAt', 'dueAt', { unique: false });
        }
        if (!db.objectStoreNames.contains(EVENT_STORE)) {
          var events = db.createObjectStore(EVENT_STORE, { keyPath: 'eventId' });
          events.createIndex('cardKey', 'cardKey', { unique: false });
          events.createIndex('reviewedAt', 'reviewedAt', { unique: false });
        }
        if (!db.objectStoreNames.contains(META_STORE)) {
          db.createObjectStore(META_STORE, { keyPath: 'key' });
        }
      };
      request.onsuccess = function () { resolve(request.result); };
      request.onerror = function () { reject(request.error); };
    });

    return dbPromise;
  }

  function getStore(db, name, mode) {
    return db.transaction(name, mode || 'readonly').objectStore(name);
  }

  function reqToPromise(request) {
    return new Promise(function (resolve, reject) {
      request.onsuccess = function () { resolve(request.result); };
      request.onerror = function () { reject(request.error); };
    });
  }

  function txComplete(tx) {
    return new Promise(function (resolve, reject) {
      tx.oncomplete = resolve;
      tx.onerror = function () { reject(tx.error); };
      tx.onabort = function () { reject(tx.error || new Error('Transaction aborted')); };
    });
  }

  function loadFallback() {
    if (fallbackState) return fallbackState;
    var empty = { cards: {}, events: {}, meta: {} };
    try {
      fallbackState = JSON.parse(localStorage.getItem(FALLBACK_KEY) || 'null') || empty;
    } catch (e) {
      fallbackState = empty;
    }
    return fallbackState;
  }

  function saveFallback() {
    if (!fallbackState) return;
    try {
      localStorage.setItem(FALLBACK_KEY, JSON.stringify(fallbackState));
    } catch (e) {}
  }

  function getMeta(key) {
    return openDb().then(function (db) {
      if (!db) {
        var value = loadFallback().meta[key];
        return value ? value.value : null;
      }
      return reqToPromise(getStore(db, META_STORE).get(key)).then(function (row) {
        return row ? row.value : null;
      });
    });
  }

  function setMeta(key, value) {
    return openDb().then(function (db) {
      if (!db) {
        loadFallback().meta[key] = { key: key, value: value };
        saveFallback();
        return;
      }
      return reqToPromise(getStore(db, META_STORE, 'readwrite').put({ key: key, value: value }));
    });
  }

  function getAllCards() {
    return openDb().then(function (db) {
      if (!db) {
        var cards = loadFallback().cards;
        return Object.keys(cards).map(function (key) { return clone(cards[key]); });
      }
      return reqToPromise(getStore(db, CARD_STORE).getAll());
    });
  }

  function getCardsByItem(itemKey) {
    return openDb().then(function (db) {
      if (!db) {
        return getAllCards().then(function (cards) {
          return cards.filter(function (card) { return card.itemKey === itemKey; });
        });
      }
      var index = getStore(db, CARD_STORE).index('itemKey');
      return reqToPromise(index.getAll(itemKey));
    });
  }

  function putCards(cards, options) {
    options = options || {};
    return openDb().then(function (db) {
      if (!db) {
        var state = loadFallback();
        cards.forEach(function (card) { state.cards[card.cardKey] = clone(card); });
        saveFallback();
        if (!options.skipBackup) scheduleBackup();
        return;
      }
      var tx = db.transaction(CARD_STORE, 'readwrite');
      var store = tx.objectStore(CARD_STORE);
      cards.forEach(function (card) { store.put(card); });
      return txComplete(tx).then(function () {
        if (!options.skipBackup) scheduleBackup();
      });
    });
  }

  function addEvent(event, options) {
    options = options || {};
    return openDb().then(function (db) {
      if (!db) {
        loadFallback().events[event.eventId] = clone(event);
        saveFallback();
        if (!options.skipBackup) scheduleBackup();
        return;
      }
      return reqToPromise(getStore(db, EVENT_STORE, 'readwrite').put(event)).then(function () {
        if (!options.skipBackup) scheduleBackup();
      });
    });
  }

  function getAllEvents() {
    return openDb().then(function (db) {
      if (!db) {
        var events = loadFallback().events;
        return Object.keys(events).map(function (key) { return clone(events[key]); });
      }
      return reqToPromise(getStore(db, EVENT_STORE).getAll());
    });
  }

  function getSettings() {
    return getMeta('settings').then(function (settings) {
      return Object.assign({}, window.SRSScheduler.getDefaultSettings(), settings || {});
    });
  }

  function saveSettings(settings) {
    return setMeta('settings', settings).then(scheduleBackup);
  }

  function clearAll() {
    return openDb().then(function (db) {
      if (!db) {
        fallbackState = { cards: {}, events: {}, meta: {} };
        saveFallback();
        return;
      }
      var tx = db.transaction([CARD_STORE, EVENT_STORE], 'readwrite');
      tx.objectStore(CARD_STORE).clear();
      tx.objectStore(EVENT_STORE).clear();
      return txComplete(tx);
    });
  }

  function exportData() {
    return Promise.all([getAllCards(), getAllEvents(), getSettings()]).then(function (parts) {
      return {
        schemaVersion: BACKUP_SCHEMA_VERSION,
        app: 'Nihongo Explorer',
        kind: 'srs-backup',
        exportedAt: new Date().toISOString(),
        settings: parts[2],
        cards: parts[0],
        events: parts[1],
        bookmarks: collectBookmarks()
      };
    });
  }

  function collectBookmarks() {
    var sections = ['kanji', 'grammar', 'vocab', 'counters', 'radicals', 'onomatopoeia'];
    var out = {};
    for (var i = 0; i < sections.length; i++) {
      try {
        out[sections[i]] = JSON.parse(localStorage.getItem('bookmarks-' + sections[i]) || '[]');
      } catch (e) {
        out[sections[i]] = [];
      }
    }
    return out;
  }

  function validateBackup(data) {
    if (!data || data.kind !== 'srs-backup' || !Array.isArray(data.cards) || !Array.isArray(data.events)) {
      throw new Error('Die Datei ist kein gueltiges Nihongo Explorer SRS-Backup.');
    }
    if (!data.schemaVersion || data.schemaVersion > BACKUP_SCHEMA_VERSION) {
      throw new Error('Diese Backup-Version wird von dieser App-Version nicht unterstuetzt.');
    }
    return data;
  }

  function importData(data, mode) {
    data = validateBackup(data);
    mode = mode || 'merge';

    var work = mode === 'replace' ? clearAll() : Promise.resolve();
    return work.then(function () {
      if (mode === 'replace') {
        return putCards(data.cards || [], { skipBackup: true }).then(function () {
          return importEvents(data.events || [], true);
        });
      }
      return mergeCards(data.cards || []).then(function () {
        return importEvents(data.events || [], true);
      });
    }).then(function () {
      if (data.settings) return saveSettings(Object.assign({}, window.SRSScheduler.getDefaultSettings(), data.settings));
    }).then(function () {
      restoreBookmarks(data.bookmarks);
      scheduleBackup();
    });
  }

  function mergeCards(incoming) {
    return getAllCards().then(function (existing) {
      var byKey = {};
      existing.forEach(function (card) { byKey[card.cardKey] = card; });
      incoming.forEach(function (card) {
        var prev = byKey[card.cardKey];
        if (!prev || new Date(card.updatedAt || 0).getTime() >= new Date(prev.updatedAt || 0).getTime()) {
          byKey[card.cardKey] = card;
        }
      });
      return putCards(Object.keys(byKey).map(function (key) { return byKey[key]; }), { skipBackup: true });
    });
  }

  function importEvents(events, skipBackup) {
    return getAllEvents().then(function (existing) {
      var seen = {};
      existing.forEach(function (event) { seen[event.eventId] = true; });
      var fresh = events.filter(function (event) {
        if (!event || !event.eventId || seen[event.eventId]) return false;
        seen[event.eventId] = true;
        return true;
      });
      return openDb().then(function (db) {
        if (!db) {
          var state = loadFallback();
          fresh.forEach(function (event) { state.events[event.eventId] = clone(event); });
          saveFallback();
          if (!skipBackup) scheduleBackup();
          return;
        }
        var tx = db.transaction(EVENT_STORE, 'readwrite');
        var store = tx.objectStore(EVENT_STORE);
        fresh.forEach(function (event) { store.put(event); });
        return txComplete(tx).then(function () {
          if (!skipBackup) scheduleBackup();
        });
      });
    });
  }

  function restoreBookmarks(bookmarks) {
    if (!bookmarks) return;
    Object.keys(bookmarks).forEach(function (section) {
      if (!Array.isArray(bookmarks[section])) return;
      try {
        localStorage.setItem('bookmarks-' + section, JSON.stringify(bookmarks[section]));
      } catch (e) {}
    });
  }

  function downloadBackup() {
    return exportData().then(function (data) {
      var text = JSON.stringify(data, null, 2);
      var blob = new Blob([text], { type: 'application/json' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'nihongo-explorer-srs-backup.json';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
      return data;
    });
  }

  function canUseFileBackup() {
    return typeof window.showSaveFilePicker === 'function';
  }

  function connectBackupFile() {
    if (!canUseFileBackup()) {
      return Promise.reject(new Error('Automatische Datei-Backups werden von diesem Browser nicht unterstuetzt.'));
    }

    return window.showSaveFilePicker({
      suggestedName: 'nihongo-explorer-srs-backup.json',
      types: [{ description: 'JSON backup', accept: { 'application/json': ['.json'] } }]
    }).then(function (handle) {
      return setMeta('backupHandle', handle).then(function () {
        return writeBackupNow();
      });
    });
  }

  function getBackupStatus() {
    return getMeta('backupHandle').then(function (handle) {
      if (handle) return { mode: 'file', label: 'Auto-backup verbunden' };
      if (canUseFileBackup()) return { mode: 'available', label: 'Auto-backup nicht verbunden' };
      return { mode: 'manual', label: 'Manueller Export erforderlich' };
    });
  }

  function scheduleBackup() {
    if (pendingBackupTimer) clearTimeout(pendingBackupTimer);
    pendingBackupTimer = setTimeout(function () {
      pendingBackupTimer = null;
      writeBackupNow().catch(function () {});
    }, 800);
  }

  function writeBackupNow() {
    return getMeta('backupHandle').then(function (handle) {
      if (!handle || typeof handle.createWritable !== 'function') return null;
      return requestHandlePermission(handle).then(function (allowed) {
        if (!allowed) throw new Error('Backup-Datei braucht erneut Berechtigung.');
        return exportData().then(function (data) {
          return handle.createWritable().then(function (writable) {
            return writable.write(JSON.stringify(data, null, 2)).then(function () {
              return writable.close();
            }).then(function () {
              return setMeta('lastBackupAt', new Date().toISOString());
            });
          });
        });
      });
    });
  }

  function requestHandlePermission(handle) {
    if (!handle.queryPermission || !handle.requestPermission) return Promise.resolve(true);
    return handle.queryPermission({ mode: 'readwrite' }).then(function (state) {
      if (state === 'granted') return true;
      return handle.requestPermission({ mode: 'readwrite' }).then(function (nextState) {
        return nextState === 'granted';
      });
    });
  }

  function readBackupFile(file) {
    return file.text().then(function (text) {
      return validateBackup(JSON.parse(text));
    });
  }

  window.SRSStore = {
    init: openDb,
    getAllCards: getAllCards,
    getCardsByItem: getCardsByItem,
    putCards: putCards,
    addEvent: addEvent,
    getAllEvents: getAllEvents,
    getSettings: getSettings,
    saveSettings: saveSettings,
    exportData: exportData,
    importData: importData,
    downloadBackup: downloadBackup,
    connectBackupFile: connectBackupFile,
    getBackupStatus: getBackupStatus,
    writeBackupNow: writeBackupNow,
    readBackupFile: readBackupFile,
    validateBackup: validateBackup,
    canUseFileBackup: canUseFileBackup
  };
})();
