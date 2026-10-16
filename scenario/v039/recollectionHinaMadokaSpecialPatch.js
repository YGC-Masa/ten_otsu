(() => {
  const index = window.TENOTSU_RECOLLECTION_STORY_INDEX;
  if (!Array.isArray(index)) return;

  const entry = {
    id: "hina_madoka_night_cheer_special_20260917",
    title: "緋奈からまどかちゃんへ：ちゃんと朝になるからね❤️",
    type: "normal",
    category: "special",
    season: "other",
    placeId: "hidamari_office",
    placeName: "ひだまりストア事務所",
    characters: ["aa"],
    characterNames: ["星野 緋奈"],
    scenario: "scenario/v039/events/hina_madoka_night_cheer_special_20260917.json",
    version: "v039_330",
    unlock: { type: "always" },
    order: 9927,
    summary: "2026年9月17日の夜。一人で眠るのが怖いまどかちゃんへ、緋奈が安心とおやすみを届ける特別シナリオ。",
    rawTitle: "緋奈からまどかちゃんへ：ちゃんと朝になるからね❤️",
    locationName: "ひだまりストア事務所",
    albumTab: "other",
    encounter: { enabled: false }
  };

  if (!index.some((item) => item && item.id === entry.id)) index.push(entry);
})();
