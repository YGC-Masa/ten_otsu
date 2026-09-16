(() => {
  const index = window.TENOTSU_RECOLLECTION_STORY_INDEX;
  if (!Array.isArray(index)) return;

  const entry = {
    id: "misora_nozomi_cheer_special_20260916",
    title: "美空から希望ちゃんへ：一緒に頑張りましょうね💕",
    type: "normal",
    category: "special",
    season: "other",
    placeId: "hidamari_office",
    placeName: "ひだまりストア事務所",
    characters: ["ah"],
    characterNames: ["双沢 美空"],
    scenario: "scenario/v039/events/misora_nozomi_cheer_special_20260916.json",
    version: "v039_327",
    unlock: { type: "always" },
    order: 9925,
    summary: "2026年9月16日。仕事、家庭、子育てを毎日頑張る希望ちゃんへ、美空が未来の先輩として敬意と応援を届ける特別シナリオ。",
    rawTitle: "美空から希望ちゃんへ：一緒に頑張りましょうね💕",
    locationName: "ひだまりストア事務所",
    albumTab: "other",
    encounter: { enabled: false }
  };

  if (!index.some((item) => item && item.id === entry.id)) index.push(entry);
})();
