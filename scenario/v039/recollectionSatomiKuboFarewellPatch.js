(() => {
  const index = window.TENOTSU_RECOLLECTION_STORY_INDEX;
  if (!Array.isArray(index)) return;

  const entry = {
    id: "satomi_kubo_farewell_20260915",
    title: "里美から、くぼちゃんへ：いってらっしゃいです～",
    type: "normal",
    category: "special",
    season: "other",
    placeId: "hidamari_office",
    placeName: "ひだまりストア事務所",
    characters: ["al"],
    characterNames: ["餅月 里美"],
    scenario: "scenario/v039/events/satomi_kubo_farewell_20260915.json",
    version: "v039_323",
    unlock: { type: "always" },
    order: 9921,
    summary: "2026年9月15日。今日まで出社を続けたくぼちゃんへ、里美からお疲れ様とありがとう、そして新しい毎日への応援を届ける特別シナリオ。",
    rawTitle: "里美から、くぼちゃんへ：いってらっしゃいです～",
    locationName: "ひだまりストア事務所",
    albumTab: "other",
    encounter: { enabled: false }
  };

  if (!index.some((item) => item && item.id === entry.id)) index.push(entry);
})();
