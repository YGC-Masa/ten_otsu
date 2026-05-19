// serviceWorker.js - v037 修正版
const CACHE_NAME = "tenotsu-v037-battle-iospwa-20260519";
const URLS_TO_CACHE = [
  "./",
  "./index.html",
  "./style.css",
  "./chardispsetting.css",
  "./config.js",
  "./characterStyles.js",
  "./effect.js",
  "./menuList.js",
  "./randomShows.js",
  "./utils.js",
  "./script.js",
  "./battle.js",
  "./manifest.json",
  "./favicon.ico",
  "./favicon.png",
  "./icon-192.png",
  "./icon-512.png",
  "./random/imageset01.json",
  "./random/textset01.json",
  "./scenario/000start.json",
  "./scenario/gamestart.json",
  "./listmenu/title.json",
  "./listmenu/menu01.json",
  "./listmenu/list01.json",
  "./listmenu/mainmenu.json",
  "./listmenu/home.json",
  "./listmenu/members.json",
  "./listmenu/shop.json",
  "./scenario/town_placeholder.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(URLS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      });
    })
  );
});
