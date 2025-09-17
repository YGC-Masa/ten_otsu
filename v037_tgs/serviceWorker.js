// serviceWorker.js - v037 (GitHub Pages 対応版)
const CACHE_NAME = "tenotsu-v037";
const URLS_TO_CACHE = [
  "./",
  "./index.html",
  "./script.js",
  "./manifest.json",
  "./icon/icon-192.png",
  "./icon/icon-512.png",
  "./characterStyles.js",
  "./random/textset01.json",
  "./random/image.json",
  "./scenarios/000start.json",
  "./css/style.css"
];

// インストール時にキャッシュ
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // 存在しない URL は警告表示して無視
      return Promise.allSettled(URLS_TO_CACHE.map(url =>
        fetch(url).then(res => {
          if (!res.ok) throw new Error(`Fetch failed: ${url}`);
          return cache.put(url, res);
        })
      )).then((results) => {
        results.forEach(r => {
          if (r.status === "rejected") {
            console.warn("Cache failed:", r.reason);
          }
        });
      });
    })
  );
});

// フェッチ時にキャッシュ優先
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// アップデート時に古いキャッシュ削除
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});
