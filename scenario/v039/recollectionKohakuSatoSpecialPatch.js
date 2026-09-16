(() => {
  const index = window.TENOTSU_RECOLLECTION_STORY_INDEX;
  if (!Array.isArray(index)) return;

  const entry = {
    id: "kohaku_sato_earphone_special_20260916",
    title: "琥珀から佐藤さんへ：いい音を届けてくれよな！",
    type: "normal",
    category: "special",
    season: "other",
    placeId: "hidamari_office",
    placeName: "ひだまりストア事務所",
    characters: ["ae"],
    characterNames: ["春日原 琥珀"],
    scenario: "scenario/v039/events/kohaku_sato_earphone_special_20260916.json",
    version: "v039_324",
    unlock: { type: "always" },
    order: 9922,
    summary: "2026年9月16日。イヤホンを扱う佐藤さんへ、琥珀が親近感と応援を届ける特別シナリオ。",
    rawTitle: "琥珀から佐藤さんへ：いい音を届けてくれよな！",
    locationName: "ひだまりストア事務所",
    albumTab: "other",
    encounter: { enabled: false }
  };

  if (!index.some((item) => item && item.id === entry.id)) index.push(entry);
})();
