# v039_164 = 夜空20-30背景・CG指定修正パッチ

## 内容

- 「夜空らしいって何」の背景を `images/assets/bg/bg_hidamari_warehouse.png` に変更
- 「白と黒の飲み物」の「ひだまりストア休憩スペース前」を「事務所内休憩スペース」へ変更
  - 背景：`images/assets/bgev/bg_office_hidamari.png`
- 「白黒ツインルーム」
  - 最初の背景：`images/assets/bg/bg_sugosawa_house_night.png`
  - ステップ31：`images/assets/bg/bg_sugosawa_room_night_light_on.png`
  - ステップ187：イベントCG `images/assets/cg/cg_yozora_main30_cocoa_room.png` を表示

## 更新ファイル

- scenario/v039/events/yozora_affection_20_02_key.json
- scenario/v039/events/yozora_affection_20_03_key.json
- scenario/v039/events/yozora_affection_30_00_main.json
- index.html
- VERSION.txt
- README_DIFF.md
- program/v039/version.js
- program/v039/state.js
- program/v039/office.js

## 適用前提

v039_163以降へ上書き。

※画像アセット本体は既存正式アセットを参照する前提で、今回のZIPには同梱していません。
