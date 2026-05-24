// serviceWorker.js - v038_12 cache clear対応版
const CACHE_NAME = "tenotsu-v038-12";
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
  "scenario/listmenu/office6.json",
  "scenario/listmenu/office5.json",
  "images/assets/cutin/cutin_hina_test.png",
  "images/assets/character/card_hina_test.png",
  "images/assets/cutin/cutin_moe_test.png",
  "images/assets/character/card_moe_test.png",
  "images/assets/cutin/cutin_satomi_test.png",
  "images/assets/character/card_satomi_test.png",
  "images/assets/cutin/cutin_ayame_test.png",
  "images/assets/character/card_ayame_test.png",
  "images/assets/cutin/cutin_momo_test.png",
  "images/assets/character/card_momo_test.png",
  "images/assets/cutin/cutin_yozora_test.png",
  "images/assets/character/card_yozora_test.png",
  "images/assets/cutin/cutin_misora_test.png",
  "images/assets/character/card_misora_test.png",
  "images/assets/cutin/cutin_yukino_test.png",
  "images/assets/character/card_yukino_test.png",
  "images/assets/cutin/cutin_manaka_test.png",
  "images/assets/character/card_manaka_test.png",
  "images/assets/cutin/cutin_kohaku_test.png",
  "images/assets/character/card_kohaku_test.png",
  "images/assets/cutin/cutin_kogane_test.png",
  "images/assets/character/card_kogane_test.png",
  "images/assets/cutin/cutin_midori_test.png",
  "images/assets/character/card_midori_test.png",
  "images/assets/cutin/cutin_ai_test.png",
  "images/assets/character/card_ai_test.png",
  "images/assets/enemy/enemy_marshmallow_massage_test.png",
  "images/assets/enemy/enemy_donut_washer_test.png",
  "images/assets/enemy/enemy_mochimochi_register_test.png",
  "images/assets/enemy/enemy_game_potato_test.png",
  "images/assets/enemy/enemy_jelly_humidifier_test.png",
  "images/assets/enemy/enemy_kakigori_aircon_test.png",
  "images/assets/enemy/enemy_pudding_oven_test.png",
  "images/assets/enemy/enemy_beauty_macaron_test.png",
  "images/assets/enemy/enemy_earphone_gummy_test.png",
  "images/assets/enemy/enemy_smartphone_candy_test.png",
  "images/assets/enemy/enemy_pc_pizza_test.png",
  "images/assets/enemy/enemy_choco_dryer_test.png",
  "images/assets/enemy/enemy_tv_popcorn_test.png",
  "images/assets/bg/battle_store_lv1.png",
  "images/assets/cutin/aa_hina_skill_cutin_test.png",
  "images/assets/card/aa_hina_card_test.png",
  "./manifest.json",
  "./favicon.ico",
  "./favicon.png",
  "./icon-192.png",
  "./icon-512.png",
  "scenario/random/imageset01.json",
  "scenario/random/textset01.json",
  "images/assets/bgev/bg_exchange_item_counter.png",
  "scenario/scenario/000start.json",
  "scenario/scenario/gamestart.json",
  "scenario/listmenu/title.json",
  "scenario/listmenu/menu01.json",
  "scenario/listmenu/list01.json",
  "scenario/listmenu/mainmenu.json",
  "scenario/listmenu/home.json",
  "scenario/listmenu/members.json",
  "scenario/listmenu/shop.json",
  "scenario/scenario/town_placeholder.json",
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
