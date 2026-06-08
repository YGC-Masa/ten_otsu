# v039_136 夜空シナリオ全体整備＋メイン20イベントCG実装

## 内容

- 夜空全親愛ストーリーのシナリオメンテナンス。
  - 話者付きセリフ内に混在していた `\n――` 以降の地の文を、`speaker: ""` の独立ステップへ分離。
  - `speaker: ""` の地の文ステップ内に複数の `――` 回想・状況説明が連結していた箇所も独立ステップ化。
- ストーリーモードの複数キャラ表示で、表示人数に対して n+1 分割の論理スロットを優先するように `storyLayout.js` / `storyPlayer.js` を修正。
- 夜空メイン20「一歩後ろの夜空」のステップ181以降を、専用上半身立ち絵へ差し替え。
- 夜空メイン20のステップ220〜247に夕方海辺イベントCGを表示し、ステップ248で解除。

## 追加アセット

```text
images/assets/char/yozora_main20_upper.png
images/assets/char/misora_main20_upper.png
images/assets/cg/cg_yozora_main20_sunset_beach.png
```

## 更新ファイル

```text
index.html
VERSION.txt
README_DIFF.md
program/v039/version.js
program/v039/state.js
program/v039/office.js
program/v039/storyLayout.js
program/v039/storyPlayer.js
scenario/v039/events/yozora_affection_*.json
```

## 適用前提

`v039_135` 以降へ上書きする差分パッチです。今回は新規キャラ上半身素材とイベントCGを同梱しています。
