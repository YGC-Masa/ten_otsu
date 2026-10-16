(() => {
  const index = window.TENOTSU_RECOLLECTION_STORY_INDEX;
  if (!Array.isArray(index)) return;

  const entry = {
    id: "manaka_yoshino_greeting_20260924",
    title: "真花から吉野さんへ：はじめまして",
    type: "normal",
    category: "special",
    season: "other",
    placeId: "hidamari_office",
    placeName: "ひだまりストア事務所",
    characters: ["af"],
    characterNames: ["大道寺 真花"],
    scenario: "scenario/v039/events/manaka_yoshino_greeting_20260924.json",
    version: "v039_333",
    unlock: { type: "always" },
    order: 9928,
    summary: "大道寺真花から吉野さんへ、はじめましてのご挨拶を届ける特別シナリオ。",
    rawTitle: "真花から吉野さんへ：はじめまして",
    locationName: "ひだまりストア事務所",
    albumTab: "other",
    encounter: { enabled: false }
  };

  if (!index.some((item) => item && item.id === entry.id)) index.push(entry);
})();
