(() => {
  const index = window.TENOTSU_RECOLLECTION_STORY_INDEX;
  if (!Array.isArray(index)) return;

  const entry = {
    id: "yozora_cocoa_confession_test",
    title: "夜空との会話テスト：ココアの隣で",
    type: "normal",
    category: "test",
    season: "other",
    placeId: "hidamari_office",
    placeName: "ひだまりストア事務所",
    characters: ["ai"],
    characterNames: ["双沢 夜空"],
    scenario: "scenario/v039/events/yozora_cocoa_confession_test.json",
    version: "v039_314",
    unlock: { type: "always" },
    order: 9920,
    summary: "閉店後の事務所でココアを挟み、夜空と店長が互いの『好き』を言葉にする会話確認シナリオ。",
    rawTitle: "夜空との会話テスト：ココアの隣で",
    locationName: "ひだまりストア事務所",
    albumTab: "other",
    encounter: { enabled: false }
  };

  if (!index.some((item) => item && item.id === entry.id)) index.push(entry);
})();
