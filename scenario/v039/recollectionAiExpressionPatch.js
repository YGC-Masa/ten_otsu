(() => {
  const index = window.TENOTSU_RECOLLECTION_STORY_INDEX;
  if (!Array.isArray(index)) return;

  const entry = index.find((item) => item && item.id === "ai_expression_25_test");
  if (!entry) return;

  entry.title = "藍の表情テスト：消えたドライヤーレビュー";
  entry.rawTitle = "藍の表情テスト：消えたドライヤーレビュー";
  entry.version = "v039_312";
  entry.summary = "藍の得意なドライヤーと苦手なパソコンを軸に、採用済み正式25表情を最新画像で順番に確認する開発用シナリオ。";
})();
