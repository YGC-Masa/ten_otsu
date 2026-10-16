(() => {
  const index = window.TENOTSU_RECOLLECTION_STORY_INDEX;
  if (!Array.isArray(index)) return;

  const entry = {
    id: "chako_kanai_cheer_special_20260916",
    title: "チャコから金井さんへ：今日も本当にお疲れさまです🩵",
    type: "normal",
    category: "special",
    season: "other",
    placeId: "hidamari_office",
    placeName: "ひだまりストア事務所",
    characters: ["an"],
    characterNames: ["チャコ"],
    scenario: "scenario/v039/events/chako_kanai_cheer_special_20260916.json",
    version: "v039_326",
    unlock: { type: "always" },
    order: 9924,
    summary: "2026年9月16日。会社を支え続ける金井さんへ、チャコが労いと休息のメッセージを届ける特別シナリオ。",
    rawTitle: "チャコから金井さんへ：今日も本当にお疲れさまです🩵",
    locationName: "ひだまりストア事務所",
    albumTab: "other",
    encounter: { enabled: false }
  };

  if (!index.some((item) => item && item.id === entry.id)) index.push(entry);
})();
