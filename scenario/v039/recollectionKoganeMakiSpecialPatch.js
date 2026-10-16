(() => {
  const index = window.TENOTSU_RECOLLECTION_STORY_INDEX;
  if (!Array.isArray(index)) return;

  const entry = {
    id: "kogane_maki_cheer_special_20260916",
    title: "こがねから麻希ちゃんへ：今日は自分にも甘くしよ💛",
    type: "normal",
    category: "special",
    season: "other",
    placeId: "hidamari_office",
    placeName: "ひだまりストア事務所",
    characters: ["ad"],
    characterNames: ["小麦沢 こがね"],
    scenario: "scenario/v039/events/kogane_maki_cheer_special_20260916.json",
    version: "v039_325",
    unlock: { type: "always" },
    order: 9923,
    summary: "2026年9月16日。仕事をたくさん抱えて頑張る麻希ちゃんへ、こがねが休息と労いを届ける特別シナリオ。",
    rawTitle: "こがねから麻希ちゃんへ：今日は自分にも甘くしよ💛",
    locationName: "ひだまりストア事務所",
    albumTab: "other",
    encounter: { enabled: false }
  };

  if (!index.some((item) => item && item.id === entry.id)) index.push(entry);
})();
