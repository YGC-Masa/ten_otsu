/* v039_109 town encounter config */
(function(){
  "use strict";
  window.TENOTSU_TOWN_ENCOUNTER_CONFIG = {
    version: "v039_121",
    staminaCost: 10,
    defaultSeason: "summer",
    seasons: [
      { id: "spring", label: "春", bg: "images/assets/bgev/bg_park_spring.webp" },
      { id: "summer", label: "夏", bg: "images/assets/bgev/bg_beach.webp" },
      { id: "autumn", label: "秋", bg: "images/assets/bgev/bg_park_spring.webp" },
      { id: "winter", label: "冬", bg: "images/assets/bgev/bg_park_spring.webp" }
    ],
    items: {
      reveal: { id: "visitor_scope", name: "来客メモ", label: "キャラがいるか確認", note: "試作では消費なし。正式版では外回り用アイテムを消費予定。" },
      season: { id: "season_raisin", name: "シーズンレーズン", label: "季節を変更", note: "所持数・消費は未接続の無料試用です。" },
      time: { id: "time_thymus", name: "タイムタイム", label: "朝・昼・夜を変更", note: "所持数・消費は未接続の無料試用です。自動失効は未接続です。" }
    },
    places: [
      { id: "hidamari_store_front", name: "ひだまりストア前", type: "自店", seasons: ["spring", "summer", "autumn", "winter"], description: "ひだまりストアの外観。開店前・営業中・夕方・夜・閉店後など時間帯別イベント向き。", bg: "images/assets/bg/bg_hidamari_store_front_day.webp" },
      { id: "marinpia_aqua_tunnel", name: "マリンピア・海中トンネル", type: "水族館", seasons: ["summer"], description: "夏の外回りで、涼しげな水槽を眺めながらキャラと出会える場所。" },
      { id: "hidamari_shopping_street", name: "ひだまり商店街", type: "街エリア", seasons: ["spring", "summer", "autumn", "winter"], description: "買い物や地域イベントの中心。通常ストーリーの増産先。" },
      { id: "wakaba_central_park", name: "若葉中央公園", type: "公園", seasons: ["spring", "summer", "autumn"], description: "季節イベントや休憩会話向きの公園。" },
      { id: "techlab_tsukumo", name: "テックラボつくも周辺", type: "協力店", seasons: ["spring", "summer", "autumn", "winter"], description: "つくも関連・交換所・VIP導線向き。" },
      { id: "sugosawa_house", name: "双沢家前", type: "住宅街", seasons: ["spring", "summer", "autumn", "winter"], description: "双沢美空・双沢夜空の家。家族・帰宅・個別ストーリー向き。", bg: "images/assets/bg/bg_sugosawa_house_day.webp" },
      { id: "hoshimigaoka_planetarium", name: "星見ヶ丘プラネタリウム", type: "プラネタリウム", seasons: ["spring", "summer", "autumn", "winter"], description: "外観・ロビー・投影ホール・開演中ホールの背景を追加済み。星空や夜のイベント向き。", bg: "images/assets/bg/bg_planetarium_exterior_twilight.webp" },
      { id: "hiyorizaka_station_front", name: "日和坂駅前", type: "駅前", seasons: ["spring", "summer", "autumn", "winter"], description: "日和坂駅の駅前。待ち合わせ・帰り道・街イベント向き。時間帯別背景を追加済み。", bg: "images/assets/bg/bg_hiyorizaka_station_day.webp" },
      { id: "minato_event_plaza", name: "みなと公園・イベント広場", type: "公園", seasons: ["spring", "summer", "autumn"], description: "みなと公園のイベント広場。通常イベント・地域フェス・ステージイベント向き。", bg: "images/assets/bg/bg_minato_event_plaza.webp" },
      { id: "minato_seaside_fence", name: "みなと公園・海の見える柵", type: "公園", seasons: ["spring", "summer", "autumn"], description: "海が見える柵沿いの散策ポイント。写真・会話・海辺イベント向き。", bg: "images/assets/bg/bg_minato_seaside_fence_day.webp" },
    ]
  };
})();
