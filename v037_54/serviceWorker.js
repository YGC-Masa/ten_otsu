// serviceWorker.js - v037 battle prototype cache clear対応版
const CACHE_NAME = "tenotsu-v037-54";
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
  "./assets2/cutin/cutin_hina_test.png",
  "./assets2/character/card_hina_test.png",
  "./assets2/cutin/cutin_moe_test.png",
  "./assets2/character/card_moe_test.png",
  "./assets2/cutin/cutin_satomi_test.png",
  "./assets2/character/card_satomi_test.png",
  "./assets2/cutin/cutin_ayame_test.png",
  "./assets2/character/card_ayame_test.png",
  "./assets2/cutin/cutin_momo_test.png",
  "./assets2/character/card_momo_test.png",
  "./assets2/cutin/cutin_yozora_test.png",
  "./assets2/character/card_yozora_test.png",
  "./assets2/cutin/cutin_misora_test.png",
  "./assets2/character/card_misora_test.png",
  "./assets2/cutin/cutin_yukino_test.png",
  "./assets2/character/card_yukino_test.png",
  "./assets2/cutin/cutin_manaka_test.png",
  "./assets2/character/card_manaka_test.png",
  "./assets2/cutin/cutin_kohaku_test.png",
  "./assets2/character/card_kohaku_test.png",
  "./assets2/cutin/cutin_kogane_test.png",
  "./assets2/character/card_kogane_test.png",
  "./assets2/cutin/cutin_midori_test.png",
  "./assets2/character/card_midori_test.png",
  "./assets2/cutin/cutin_ai_test.png",
  "./assets2/character/card_ai_test.png",
  "./assets2/enemy/enemy_marshmallow_massage_test.png",
  "./assets2/enemy/enemy_donut_washer_test.png",
  "./assets2/enemy/enemy_mochimochi_register_test.png",
  "./assets2/enemy/enemy_game_potato_test.png",
  "./assets2/enemy/enemy_jelly_humidifier_test.png",
  "./assets2/enemy/enemy_kakigori_aircon_test.png",
  "./assets2/enemy/enemy_pudding_oven_test.png",
  "./assets2/enemy/enemy_beauty_macaron_test.png",
  "./assets2/enemy/enemy_earphone_gummy_test.png",
  "./assets2/enemy/enemy_smartphone_candy_test.png",
  "./assets2/enemy/enemy_pc_pizza_test.png",
  "./assets2/enemy/enemy_choco_dryer_test.png",
  "./assets2/enemy/enemy_tv_popcorn_test.png",
  "./assets2/bg/battle_store_lv1.png",
  "./assets2/cutin/aa_hina_skill_cutin_test.png",
  "./assets2/card/aa_hina_card_test.png",
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

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "CLEAR_CACHE") {
    event.waitUntil(
      caches.keys().then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
    );
  }
});

function isCoreFile(url) {
  return /\.(html|css|js|json|webmanifest)$/i.test(url.pathname) || url.pathname.endsWith("/");
}

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // HTML/CSS/JS/JSONは更新確認しやすいようにネットワーク優先。
  // オフライン時だけキャッシュを返す。
  if (isCoreFile(url)) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // 画像・音声などはキャッシュ優先。
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
