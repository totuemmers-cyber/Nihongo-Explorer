// ============================================================
// Optional cloud sync (Supabase) for Nihongo Explorer
// ------------------------------------------------------------
// Offline-first: IndexedDB (SRSStore) stays the single source of truth; the
// server holds one JSON blob per user — the exact exportData() payload — and
// acts as a replica for cross-device sync. Conflict resolution reuses the
// existing backup merge (cards: last-write-wins per updatedAt, events:
// append-only deduped by eventId); pathState/bookmarks are merged field-wise
// here before handing the payload to importData.
//
// Strictly opt-in: without a stored session this module makes ZERO network
// requests, and without window.supabase / SRSStore (e.g. in the jsdom smoke
// tests) every entry point is a safe no-op.
// ============================================================
(function () {
  'use strict';

  // From the Supabase dashboard (Settings → API). The anon key is public by
  // design — Row Level Security on the server is the actual security boundary.
  var SUPABASE_URL = '';
  var SUPABASE_ANON_KEY = '';

  var TABLE = 'sync_state';
  var PUSH_DEBOUNCE_MS = 8000;
  var LS_LAST_SYNC = 'nihongo-sync-last';
  var LS_LAST_ERROR = 'nihongo-sync-error';
  var LS_REMOTE_STAMP = 'nihongo-sync-remote-stamp';
  var LS_DEVICE = 'nihongo-sync-device';
  var BOOKMARK_SECTIONS = ['kanji', 'grammar', 'vocab', 'counters', 'radicals', 'onomatopoeia'];

  var client = null;
  var session = null;
  var pushTimer = null;
  var syncing = false;
  var dirty = false; // a local change arrived while a sync was already running

  function lsGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function lsSet(key, value) {
    try {
      if (value === null) localStorage.removeItem(key);
      else localStorage.setItem(key, value);
    } catch (e) {}
  }

  function deviceId() {
    var id = lsGet(LS_DEVICE);
    if (!id) {
      id = 'dev-' + Math.random().toString(36).slice(2, 10);
      lsSet(LS_DEVICE, id);
    }
    return id;
  }

  function isConfigured() {
    return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
  }

  function isAvailable() {
    return Boolean(window.supabase && window.SRSStore && isConfigured());
  }

  // Map raw Supabase/network errors to short German messages. A failed sync is
  // never fatal — the app keeps working on local data, and the message says so.
  function friendlyError(err) {
    var msg = (err && err.message) || '';
    if ((typeof navigator !== 'undefined' && navigator.onLine === false)
      || /failed to fetch|networkerror|load failed/i.test(msg)) {
      return 'Sync-Server gerade nicht erreichbar — deine Daten bleiben lokal gespeichert.';
    }
    if (/rate limit/i.test(msg)) {
      return 'Zu viele Anfragen in kurzer Zeit. Bitte in ein paar Minuten erneut versuchen.';
    }
    if (/invalid|expired/i.test(msg) && /token|otp/i.test(msg)) {
      return 'Der Code ist ungültig oder abgelaufen. Bitte einen neuen Code anfordern.';
    }
    return msg || 'Synchronisierung fehlgeschlagen — deine Daten bleiben lokal gespeichert.';
  }

  function setError(err) {
    lsSet(LS_LAST_ERROR, err ? friendlyError(err) : null);
    notifyStatus();
  }

  function notifyStatus() {
    try { window.dispatchEvent(new CustomEvent('srs-sync-status')); } catch (e) {}
  }

  function notifyApplied() {
    try { window.dispatchEvent(new CustomEvent('srs-sync-applied')); } catch (e) {}
  }

  // Synchronous snapshot for the settings panel (shape mirrors getBackupStatus).
  function getStatus() {
    return {
      available: isAvailable(),
      signedIn: Boolean(session),
      email: (session && session.user && session.user.email) || null,
      lastSyncAt: lsGet(LS_LAST_SYNC),
      lastError: lsGet(LS_LAST_ERROR),
      pending: Boolean(pushTimer) || syncing
    };
  }

  // --- Auth -------------------------------------------------

  // Request a 6-digit email code. OTP instead of a magic-link redirect: in an
  // installed PWA (especially iOS) the link would open in the browser's storage
  // partition, not the app's — the code keeps the whole flow inside the app.
  function requestCode(email) {
    if (!client) return Promise.reject(new Error('Cloud-Sync ist nicht verfügbar.'));
    return client.auth.signInWithOtp({ email: email, options: { shouldCreateUser: true } })
      .then(function (res) {
        if (res.error) throw new Error(friendlyError(res.error));
      });
  }

  function verifyCode(email, token) {
    if (!client) return Promise.reject(new Error('Cloud-Sync ist nicht verfügbar.'));
    return client.auth.verifyOtp({ email: email, token: token, type: 'email' })
      .then(function (res) {
        if (res.error) throw new Error(friendlyError(res.error));
        session = res.data.session;
        notifyStatus();
        // First sync of this device: merge whatever the account already has,
        // then push the merged state back.
        return syncNow();
      });
  }

  function signOut() {
    var work = client ? client.auth.signOut().catch(function () {}) : Promise.resolve();
    return work.then(function () {
      session = null;
      if (pushTimer) { clearTimeout(pushTimer); pushTimer = null; }
      lsSet(LS_LAST_SYNC, null);
      lsSet(LS_LAST_ERROR, null);
      lsSet(LS_REMOTE_STAMP, null);
      notifyStatus();
    });
  }

  // DSGVO self-service: delete the auth user (the sync row follows via ON
  // DELETE CASCADE). Local data intentionally survives — that's offline-first.
  function deleteAccount() {
    if (!client || !session) return Promise.reject(new Error('Nicht angemeldet.'));
    return client.rpc('delete_account').then(function (res) {
      if (res.error) throw new Error(friendlyError(res.error));
      return signOut();
    });
  }

  // --- Merge helpers ----------------------------------------

  function unionArrays(a, b) {
    var seen = {};
    var out = [];
    (a || []).concat(b || []).forEach(function (item) {
      var key = typeof item === 'string' ? item : JSON.stringify(item);
      if (!seen[key]) { seen[key] = true; out.push(item); }
    });
    return out;
  }

  function unionBookmarks(local, remote) {
    var out = {};
    BOOKMARK_SECTIONS.forEach(function (section) {
      out[section] = unionArrays(
        local && local[section],
        remote && remote[section]
      );
    });
    return out;
  }

  function laterDay(a, b) {
    if (!a) return b;
    if (!b) return a;
    return a >= b ? a : b;
  }

  function laterIso(a, b) {
    if (!a) return b;
    if (!b) return a;
    return new Date(a).getTime() >= new Date(b).getTime() ? a : b;
  }

  // Field-wise pathState merge. Progress fields (read lessons, streak) are
  // unioned/maxed so no device loses progress; preference fields (target level,
  // pace snooze) follow whichever blob is newer. normalizePath() re-sanitizes
  // the result on next load, so this only has to be sensible, not perfect.
  function mergePathState(local, remote, remoteIsNewer) {
    if (!local) return remote || null;
    if (!remote) return local;
    var newer = remoteIsNewer ? remote : local;
    var localDaily = local.newDaily || null;
    var remoteDaily = remote.newDaily || null;
    var daily;
    if (!localDaily) daily = remoteDaily;
    else if (!remoteDaily) daily = localDaily;
    else if (localDaily.date === remoteDaily.date) {
      daily = { date: localDaily.date, count: Math.max(localDaily.count || 0, remoteDaily.count || 0) };
    } else {
      daily = laterDay(localDaily.date, remoteDaily.date) === localDaily.date ? localDaily : remoteDaily;
    }
    return Object.assign({}, newer, {
      kanaDone: Boolean(local.kanaDone || remote.kanaDone),
      skippedItems: unionArrays(local.skippedItems, remote.skippedItems),
      readLessons: unionArrays(local.readLessons, remote.readLessons),
      readPassages: unionArrays(local.readPassages, remote.readPassages),
      newDaily: daily,
      lastSessionAt: laterIso(local.lastSessionAt, remote.lastSessionAt),
      streakCount: Math.max(local.streakCount || 0, remote.streakCount || 0),
      streakLastDay: laterDay(local.streakLastDay, remote.streakLastDay),
      streakShields: Math.max(local.streakShields || 0, remote.streakShields || 0)
    });
  }

  // --- Sync core --------------------------------------------

  function fetchRemote(columns) {
    return client.from(TABLE).select(columns).maybeSingle().then(function (res) {
      if (res.error) throw res.error;
      return res.data || null;
    });
  }

  // Pull the remote blob and merge it into local state via the existing
  // importData('merge'). Skipped cheaply when the remote row hasn't moved
  // since we last saw it (unless force).
  function pullAndMerge(force) {
    return fetchRemote('data, updated_at').then(function (row) {
      if (!row || !row.data) return false;
      if (!force && row.updated_at === lsGet(LS_REMOTE_STAMP)) return false;
      var remote = row.data;
      var lastSync = lsGet(LS_LAST_SYNC);
      var remoteIsNewer = !lastSync || new Date(row.updated_at).getTime() > new Date(lastSync).getTime();
      return window.SRSStore.exportData().then(function (local) {
        var payload = {
          schemaVersion: remote.schemaVersion || 1,
          app: 'Nihongo Explorer',
          kind: 'srs-backup',
          cards: remote.cards || [],
          events: remote.events || [],
          // importData applies settings/pathState only when present, so
          // stripping a field here means "keep the local value".
          settings: remoteIsNewer ? remote.settings : null,
          pathState: mergePathState(local.pathState, remote.pathState, remoteIsNewer),
          bookmarks: unionBookmarks(local.bookmarks, remote.bookmarks)
        };
        return window.SRSStore.importData(payload, 'merge');
      }).then(function () {
        lsSet(LS_REMOTE_STAMP, row.updated_at);
        notifyApplied();
        return true;
      });
    });
  }

  // Upload the full local state. If the remote row moved since our last pull
  // (another device pushed), pull-merge first so nothing gets overwritten —
  // a poor man's optimistic concurrency, good enough for one user's devices.
  function pushNow() {
    if (!client || !session) return Promise.resolve(false);
    if (syncing) { dirty = true; return Promise.resolve(false); }
    if (pushTimer) { clearTimeout(pushTimer); pushTimer = null; }
    syncing = true;
    notifyStatus();
    return fetchRemote('updated_at').then(function (row) {
      if (row && row.updated_at !== lsGet(LS_REMOTE_STAMP)) return pullAndMerge(true);
    }).then(function () {
      return window.SRSStore.exportData();
    }).then(function (data) {
      return client.from(TABLE).upsert({
        user_id: session.user.id,
        data: data,
        schema_version: data.schemaVersion || 1,
        device_id: deviceId()
      }).select('updated_at').maybeSingle();
    }).then(function (res) {
      if (res.error) throw res.error;
      if (res.data) lsSet(LS_REMOTE_STAMP, res.data.updated_at);
      lsSet(LS_LAST_SYNC, new Date().toISOString());
      lsSet(LS_LAST_ERROR, null);
      return true;
    }).catch(function (err) {
      setError(err);
      return false;
    }).then(function (ok) {
      syncing = false;
      notifyStatus();
      if (dirty) { dirty = false; schedulePush(); }
      return ok;
    });
  }

  function schedulePush() {
    if (!session) return;
    if (typeof navigator !== 'undefined' && navigator.onLine === false) return; // 'online' listener catches up
    if (pushTimer) clearTimeout(pushTimer);
    pushTimer = setTimeout(function () {
      pushTimer = null;
      pushNow();
    }, PUSH_DEBOUNCE_MS);
    notifyStatus();
  }

  // Hook target, called from SRSStore.scheduleBackup() after every local
  // mutation. Debounced so a review session becomes one upload, not thirty.
  function notifyLocalChange() {
    schedulePush();
  }

  // Manual "Jetzt synchronisieren" + post-login flow: full round trip.
  function syncNow() {
    if (!client || !session) return Promise.reject(new Error('Nicht angemeldet.'));
    return pullAndMerge(true).then(function () {
      return pushNow();
    }).then(function (ok) {
      if (!ok) {
        var stored = lsGet(LS_LAST_ERROR);
        if (stored) throw new Error(stored);
      }
      return true;
    }).catch(function (err) {
      setError(err);
      throw new Error(friendlyError(err));
    });
  }

  // --- Lifecycle --------------------------------------------

  function init() {
    if (!isAvailable()) return;
    client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false }
    });

    client.auth.onAuthStateChange(function (event, s) {
      session = s;
      notifyStatus();
    });

    // Resume a stored session: merge remote changes made on other devices,
    // then push so this device's offline progress reaches the server.
    client.auth.getSession().then(function (res) {
      session = (res.data && res.data.session) || null;
      notifyStatus();
      if (session) {
        pullAndMerge(false).catch(function (err) { setError(err); }).then(function () {
          schedulePush();
        });
      }
    });

    window.addEventListener('online', function () {
      if (session) pushNow();
    });

    // hidden → flush a pending upload immediately (more reliable than
    // beforeunload on mobile); visible → cheap check for remote changes.
    document.addEventListener('visibilitychange', function () {
      if (!session) return;
      if (document.visibilityState === 'hidden') {
        if (pushTimer) pushNow();
      } else if (document.visibilityState === 'visible') {
        pullAndMerge(false).catch(function () {});
      }
    });
  }

  window.SRSSync = {
    init: init,
    isAvailable: isAvailable,
    isConfigured: isConfigured,
    getStatus: getStatus,
    requestCode: requestCode,
    verifyCode: verifyCode,
    signOut: signOut,
    deleteAccount: deleteAccount,
    notifyLocalChange: notifyLocalChange,
    syncNow: syncNow
  };

  init();
})();
