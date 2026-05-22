// serviceWorker.js - v037 battle prototype cache clear対応版
const CACHE_NAME = "tenotsu-v037-69-root-root";
const URLS_TO_CACHE = [
  "./",
  "./index.html",
  "./scenario/listmenu/title_return_archive.json",
  "./scenario/listmenu/members.json",
  "./scenario/listmenu/member_list.json",
  "./images/assets/ev/ev_rooftop.png",
  "./images/assets/ev/ev01.png",
  "./images/assets/ev/a01ev05.png",
  "./images/assets/ev/a01ev04.png",
  "./images/assets/ev/a01ev03.png",
  "./images/assets/ev/a01ev02.png",
  "./scenario/random/imageset01.json",
  "./images/assets/bgev/logofusen.png",
  "./images/assets/bgev/bg_school.jpg",
  "./images/assets/bgev/bg_rooftop.jpg",
  "./images/assets/bgev/bg_library.jpg",
  "./images/assets/bgev/bg_field.jpg",
  "./images/assets/bgev/bg_beach.jpg",
  "./images/assets/bgev/bg020.jpg",
  "./images/assets/bgev/bg011.jpg",
  "./images/assets/bgev/title.jpg",
  "./scenario/listmenu/mainmenu.json",
  "./scenario/listmenu/office6.json",
  "./scenario/scenario/000start.json",
  "./program/style.css",
  "./program/chardispsetting.css",
  "./program/config.js",
  "./program/characterStyles.js",
  "./program/effect.js",
  "./program/menuList.js",
  "./program/randomShows.js",
  "./program/utils.js",
  "./program/script.js",
  "./program/battle.js",
  "./scenario/scenario/listmenu/office6.json",
  "./scenario/scenario/listmenu/office5.json",
  "./images/assets/cutin/cutin_hina_test.png",
  "./images/assets/character/card_hina_test.png",
  "./images/assets/cutin/cutin_moe_test.png",
  "./images/assets/character/card_moe_test.png",
  "./images/assets/cutin/cutin_satomi_test.png",
  "./images/assets/character/card_satomi_test.png",
  "./images/assets/cutin/cutin_ayame_test.png",
  "./images/assets/character/card_ayame_test.png",
  "./images/assets/cutin/cutin_momo_test.png",
  "./images/assets/character/card_momo_test.png",
  "./images/assets/cutin/cutin_yozora_test.png",
  "./images/assets/character/card_yozora_test.png",
  "./images/assets/cutin/cutin_misora_test.png",
  "./images/assets/character/card_misora_test.png",
  "./images/assets/cutin/cutin_yukino_test.png",
  "./images/assets/character/card_yukino_test.png",
  "./images/assets/cutin/cutin_manaka_test.png",
  "./images/assets/character/card_manaka_test.png",
  "./images/assets/cutin/cutin_kohaku_test.png",
  "./images/assets/character/card_kohaku_test.png",
  "./images/assets/cutin/cutin_kogane_test.png",
  "./images/assets/character/card_kogane_test.png",
  "./images/assets/cutin/cutin_midori_test.png",
  "./images/assets/character/card_midori_test.png",
  "./images/assets/cutin/cutin_ai_test.png",
  "./images/assets/character/card_ai_test.png",
  "./images/assets/enemy/enemy_marshmallow_massage_test.png",
  "./images/assets/enemy/enemy_donut_washer_test.png",
  "./images/assets/enemy/enemy_mochimochi_register_test.png",
  "./images/assets/enemy/enemy_game_potato_test.png",
  "./images/assets/enemy/enemy_jelly_humidifier_test.png",
  "./images/assets/enemy/enemy_kakigori_aircon_test.png",
  "./images/assets/enemy/enemy_pudding_oven_test.png",
  "./images/assets/enemy/enemy_beauty_macaron_test.png",
  "./images/assets/enemy/enemy_earphone_gummy_test.png",
  "./images/assets/enemy/enemy_smartphone_candy_test.png",
  "./images/assets/enemy/enemy_pc_pizza_test.png",
  "./images/assets/enemy/enemy_choco_dryer_test.png",
  "./images/assets/enemy/enemy_tv_popcorn_test.png",
  "./images/assets/bg/battle_store_lv1.png",
  "./images/assets/cutin/aa_hina_skill_cutin_test.png",
  "./images/assets/card/aa_hina_card_test.png",
  "./program/manifest.json",
  "./program/favicon.ico",
  "./program/favicon.png",
  "./program/icon-192.png",
  "./program/icon-512.png",
  "./scenario/scenario/random/imageset01.json",
  "./scenario/scenario/random/textset01.json",
  "./scenario/scenario/scenario/000start.json",
  "./scenario/scenario/scenario/gamestart.json",
  "./scenario/scenario/listmenu/title.json",
  "./scenario/scenario/listmenu/menu01.json",
  "./scenario/scenario/listmenu/list01.json",
  "./scenario/scenario/listmenu/mainmenu.json",
  "./scenario/scenario/listmenu/home.json",
  "./scenario/scenario/listmenu/members.json",
  "./scenario/scenario/listmenu/shop.json",
  "./scenario/scenario/scenario/town_placeholder.json",
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
