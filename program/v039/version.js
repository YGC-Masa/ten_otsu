/* v039_136 夜空シナリオ全体整備＋メイン20イベントCG実装 */
(function(){
  "use strict";
  window.TENOTSU_BUILD_VERSION = "v039_136";
  window.TENOTSU_BUILD_LABEL = "v039_136 夜空シナリオ全体整備＋メイン20イベントCG実装";
  window.TENOTSU_BUILD_NOTES = [
    "夜空全親愛ストーリーで、話者付きセリフ内に混在していた「\\n――」以降の地の文を speaker:\"\" の独立ステップへ分離",
    "ストーリーモードの複数キャラ表示で、表示人数に応じた n+1 論理スロット配置が効くように修正",
    "夜空メイン20のステップ181以降を上半身立ち絵へ差し替え",
    "夜空メイン20のステップ220〜247に夕方海辺イベントCGを表示し、248で解除"
];
  window.TENOTSU_V039 = window.TENOTSU_V039 || {};
  window.TENOTSU_V039.VERSION = "v039_136";
  window.TENOTSU_V039.BUILD_LABEL = window.TENOTSU_BUILD_LABEL;
})();
