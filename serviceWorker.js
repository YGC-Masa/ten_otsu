// serviceWorker.js - v039_35 force update / cache clear
const CACHE_NAME = "tenotsu-v039-35-force-update";
self.addEventListener("install", (event) => {
  self.skipWaiting();
});
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "CLEAR_CACHE") {
    event.waitUntil(
      caches.keys()
        .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
        .then(() => self.clients.matchAll({ type: "window", includeUncontrolled: true }))
        .then((clients) => clients.forEach((client) => client.postMessage({ type: "CACHE_CLEARED" })))
    );
  }
});
