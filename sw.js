// DailyDevo service worker. Network-first for EVERYTHING with cache
// fallback: online users always get matching, up-to-date files (no more
// new-shell/old-content skew), and offline users get the full cached app.
// Bump CACHE_VERSION on every release and keep the content.js ?v query in
// index.html in sync with it.
var CACHE_VERSION = "dailydevo-v14";
var ASSETS = [
  "./",
  "./index.html",
  "./content.js?v=14",
  "./spurgeon-me.js?v=10",
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

self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  // music streams use range requests that service-worker caches handle
  // badly on iOS — let the browser fetch them natively
  if (e.request.url.indexOf("/music/") !== -1) return;
  e.respondWith(
    fetch(e.request).then(function (res) {
      if (res && res.ok) {
        var copy = res.clone();
        caches.open(CACHE_VERSION).then(function (c) { c.put(e.request, copy); });
      }
      return res;
    }).catch(function () {
      return caches.match(e.request).then(function (m) {
        if (m) return m;
        if (e.request.mode === "navigate") return caches.match("./index.html");
        return Response.error();
      });
    })
  );
});
