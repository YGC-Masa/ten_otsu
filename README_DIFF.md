# v039_159 夜空40代正式シナリオ＋ストーリー表示分離パッチ

## 適用前提
v039_158以降へ上書き。

## 反映内容
- 夜空40代を今回指定の正式JSONへ差し替え
  - 親愛Lv.41：美空のところに行けば
  - 親愛Lv.44：あんたが追ってくるだけ
  - 親愛Lv.47：美空の大事なものなのに
  - 親愛Lv.50：探さないで、の前兆
- storyIndex.js を更新し、40代〜60への流れを整理
- メンバー＞個別＞ストーリー一覧の表示を補正
  - 左側ラベル：親愛Lv.xx
  - 右側タイトル：ストーリータイトルのみ

## 更新ファイル
- scenario/v039/storyIndex.js
- scenario/v039/events/yozora_affection_40_01_key.json
- scenario/v039/events/yozora_affection_40_02_key.json
- scenario/v039/events/yozora_affection_40_03_key.json
- scenario/v039/events/yozora_affection_50_00_main.json
- program/v039/storyMenuLvTitlePatch.js
- program/v039/version.js
- program/v039/state.js
- program/v039/office.js
- index.html
- VERSION.txt

## 備考
既存の storyMenu.js 本体は上書きせず、後段パッチJSで表示を補正する方式です。
