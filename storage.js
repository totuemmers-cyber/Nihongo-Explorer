/* Optional browser storage, with a per-page fallback for unavailable persistence. */
(function () {
  'use strict';
  var unavailable = false;
  var invalid = false;

  function showNotice(kind) {
    if (kind === 'unavailable') unavailable = true;
    else invalid = true;
    var notice = document.getElementById('storage-notice');
    if (!notice) return;
    var message = [];
    if (unavailable) message.push('Speichern ist eingeschränkt. Betroffene Änderungen bleiben nur bis zum Neuladen dieser Seite erhalten.');
    if (invalid) message.push('Einige gespeicherte Daten waren ungültig. Für diese Daten werden vorübergehend die Standardwerte verwendet.');
    var text = message.join(' ');
    if (notice.textContent !== text) notice.textContent = text;
    notice.hidden = false;
  }

  function createStore(name) {
    var memory = Object.create(null);
    var unsaved = Object.create(null);
    function get(key, fallback) {
      // Never replace an unsaved change with an older value still on disk.
      if (unsaved[key]) return memory[key];
      try {
        var value = window[name].getItem(key);
        memory[key] = value;
        return value === null ? fallback : value;
      } catch (e) {
        showNotice('unavailable');
        return memory[key] == null ? fallback : memory[key];
      }
    }
    function set(key, value) {
      memory[key] = String(value);
      unsaved[key] = true;
      try {
        window[name].setItem(key, memory[key]);
        delete unsaved[key];
        return true;
      } catch (e) {
        showNotice('unavailable');
        return false;
      }
    }
    return {
      get: get,
      set: set,
      getJSON: function (key, fallback, validate) {
        var raw = get(key, null);
        if (raw === null) return fallback;
        try {
          var value = JSON.parse(raw);
          if (validate && !validate(value)) throw new Error('Invalid stored value');
          return value;
        } catch (e) {
          showNotice('invalid');
          return fallback;
        }
      },
      setJSON: function (key, value) { return set(key, JSON.stringify(value)); }
    };
  }

  window.NIHONGO_STORAGE = { local: createStore('localStorage'), session: createStore('sessionStorage') };
})();
