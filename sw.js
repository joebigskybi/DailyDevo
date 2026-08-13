// DailyDevo service worker: precache everything so the app works fully
// offline after the first visit. Bump CACHE_VERSION whenever app files or
// content change so installed phones pick up the update.
var CACHE_VERSION = "dailydevo-v4";
var ASSETS = [
  "./",
  "./index.html",
  "./content.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-512-maskable.png",
  "./icons/apple-touch-icon.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE_VERSION).then(function (c) { return c.addAll(ASSETS); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k !== CACHE_VERSION) return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

// Network-first for navigations (so updates arrive when online),
// cache-first for everything else (instant + offline).
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  if (e.request.mode === "navigate") {
    e.respondWith(
      fetch(e.request).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE_VERSION).then(function (c) { c.put(e.request, copy); });
        return res;
      }).catch(function () {
        return caches.match(e.request).then(function (m) { return m || caches.match("./index.html"); });
      })
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then(function (m) {
      return m || fetch(e.request).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE_VERSION).then(function (c) { c.put(e.request, copy); });
        return res;
      });
    })
  );
});
