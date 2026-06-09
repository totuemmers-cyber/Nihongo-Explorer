// ============================================================
// Service worker for Nihongo Explorer (PWA / offline support)
// ------------------------------------------------------------
// Network-first for same-origin requests so a freshly deployed version is always
// picked up when online (no manual hard-reload), with a cache fallback for offline.
// Successful responses are cached at runtime, so lazily-loaded section data and
// stroke-order SVGs become available offline after they've been fetched once.
// Bump VERSION on a breaking change to drop old caches.
// NOTE: service workers do not run from file:// — this only activates when the app
// is served over http(s) (e.g. GitHub Pages).
// ============================================================
var VERSION = 'v9';
var CACHE = 'nihongo-' + VERSION;

// Eagerly-loaded app shell (data files are cached at runtime as they're fetched).
var SHELL = [
  './', './index.html', './styles.css', './manifest.json', './icon.svg',
  './icon-180.png', './icon-192.png', './icon-512.png', './icon-maskable-512.png',
  './kana-data.js', './app-constants.js', './conjugation.js',
  './vocab-correction-rules.js', './vocab-example-overrides.js', './vocab-corrections.js',
  './section.js', './section-configs.js', './quiz.js',
  './srs-scheduler.js', './srs-store.js', './romaji-kana.js', './answer-check.js',
  './srs-ui.js', './learning-path.js', './stats.js', './app.js'
];

self.addEventListener('install', function (event) {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(function (cache) {
    return cache.addAll(SHELL).catch(function () {}); // tolerate a missing file
  }));
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (key) {
        if (key !== CACHE) return caches.delete(key);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (event) {
  var req = event.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // let cross-origin (fonts) pass through

  event.respondWith(
    fetch(req).then(function (res) {
      if (res && res.ok) {
        var copy = res.clone();
        caches.open(CACHE).then(function (cache) { cache.put(req, copy); });
      }
      return res;
    }).catch(function () {
      return caches.match(req).then(function (cached) {
        return cached || caches.match('./index.html');
      });
    })
  );
});
