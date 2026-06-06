/* v039_109 story index: normal encounter / member key-main slots / recollection */
(function(){
  "use strict";
  window.TENOTSU_STORY_INDEX = [
    {
      id: "kogane_natsu_marinpia",
      title: "マリンピアの海中トンネル",
      type: "normal",
      category: "town_encounter",
      season: "summer",
      placeId: "marinpia_aqua_tunnel",
      placeName: "マリンピア・海中トンネル",
      characters: ["ad", "bc"],
      characterNames: ["小麦沢 こがね", "日向 なつ"],
      scenario: "scenario/v039/events/kogane_natsu_marinpia.json",
      version: "v039_105",
      unlock: { type: "always" },
      encounter: { enabled: true, staminaCost: 10, revealItem: "visitor_scope", seasonItem: "season_ticket" },
      order: 105,
      summary: "こがねとなつと一緒に、マリンピアの海中トンネルを見に行く夏の外回りイベント。"
    },
    {
      id: "sample_hina_kogane_new_juice_002",
      title: "事務所にて緋奈＆こがね：新作ジュースは何の味？",
      type: "normal",
      category: "office",
      placeId: "hidamari_office",
      placeName: "ひだまりストア・事務所",
      characters: ["aa", "ad", "ac"],
      characterNames: ["星野 緋奈", "小麦沢 こがね", "草壁 翠"],
      scenario: "scenario/v039/events/sample_hina_kogane_new_juice_002.json",
      version: "v039_106",
      unlock: { type: "always" },
      encounter: { enabled: false },
      order: 106,
      summary: "事務所の新作ジュースをきっかけに、緋奈が照れて、こがねが無邪気にかき回し、翠が締める日常会話。"
    },
    {
      id: "yozora_affection_00_01_key",
      title: "美空なら休憩室",
      type: "key",
      category: "character_key",
      character: "ai",
      route: "yozora",
      affectionBlock: 1,
      affectionSlot: "key1",
      unlockLevel: 1,
      characters: ["ai", "ah"],
      characterNames: ["双沢 夜空", "双沢 美空"],
      scenario: "scenario/v039/events/yozora_affection_00_01_key.json",
      version: "v039_112",
      unlock: { type: "affection_level", character: "ai", level: 1 },
      order: 3001,
      summary: "夜空がまだ店長に距離を置き、自分ではなく美空を見てほしいと示す序盤キーストーリー。"
    }
  ];
})();
