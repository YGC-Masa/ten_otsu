(() => {
  const index = window.TENOTSU_RECOLLECTION_STORY_INDEX;
  if (!Array.isArray(index)) return;

  const entries = [
    {
      id: "koharu_expression_25_test",
      title: "小春の表情テスト：消えた勝負コントローラー",
      type: "normal", category: "test", season: "other",
      placeId: "hidamari_store", placeName: "ひだまりストア",
      characters: ["ba"], characterNames: ["天神 小春"],
      scenario: "scenario/v039/events/koharu_expression_25_test.json",
      version: "v039_321", unlock: { type: "always" }, order: 9915,
      summary: "小春の採用済み正式25表情を、最新画像で順番に確認する開発用シナリオ。",
      rawTitle: "小春の表情テスト：消えた勝負コントローラー",
      locationName: "ひだまりストア", albumTab: "other", encounter: { enabled: false }
    },
    {
      id: "mafuyu_expression_25_test",
      title: "真冬の表情テスト：消えた売上予測データ",
      type: "normal", category: "test", season: "other",
      placeId: "hidamari_store", placeName: "ひだまりストア",
      characters: ["bb"], characterNames: ["霧島 真冬"],
      scenario: "scenario/v039/events/mafuyu_expression_25_test.json",
      version: "v039_321", unlock: { type: "always" }, order: 9916,
      summary: "真冬の採用済み正式25表情を、最新画像で順番に確認する開発用シナリオ。",
      rawTitle: "真冬の表情テスト：消えた売上予測データ",
      locationName: "ひだまりストア", albumTab: "other", encounter: { enabled: false }
    },
    {
      id: "natsumi_expression_25_test",
      title: "夏海の表情テスト：消えた差し入れフルーツ",
      type: "normal", category: "test", season: "other",
      placeId: "hidamari_store", placeName: "ひだまりストア",
      characters: ["bc"], characterNames: ["日向 夏海"],
      scenario: "scenario/v039/events/natsumi_expression_25_test.json",
      version: "v039_321", unlock: { type: "always" }, order: 9917,
      summary: "夏海の採用済み正式25表情を、最新画像で順番に確認する開発用シナリオ。",
      rawTitle: "夏海の表情テスト：消えた差し入れフルーツ",
      locationName: "ひだまりストア", albumTab: "other", encounter: { enabled: false }
    }
  ];

  const existing = new Set(index.map((entry) => entry && entry.id));
  entries.forEach((entry) => {
    if (!existing.has(entry.id)) index.push(entry);
  });
})();
