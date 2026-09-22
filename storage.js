/* Browser storage is optional; unsaved changes remain available in this page. */
(function () {
  'use strict';
  function createStore(name) {
    var memory = Object.create(null);
    var unsaved = Object.create(null);
    function failed() {
      if (name !== 'localStorage') return;
      var notice = document.getElementById('storage-status');
      if (notice) notice.hidden = false;
    }
    return {
      getItem: function (key) {
        if (unsaved[key]) return memory[key];
        try {
          var value = window[name].getItem(key);
          memory[key] = value;
          return value;
        } catch (e) {
          failed();
          return Object.prototype.hasOwnProperty.call(memory, key) ? memory[key] : null;
        }
      },
      // Return whether the value was saved beyond the current page lifetime.
      setItem: function (key, value) {
        memory[key] = String(value);
        unsaved[key] = true;
        try {
          window[name].setItem(key, memory[key]);
          delete unsaved[key];
          return true;
        } catch (e) {
          failed();
          return false;
        }
      }
    };
  }
  window.NihongoStorage = { local: createStore('localStorage'), session: createStore('sessionStorage') };
})();
