# v039_124 夜空キー5段目＋メイン5追加パッチ

## 目的

夜空ルートの親愛Lv.41〜50帯を追加する。

## 追加シナリオ

- Lv.41 キー13：美空のところに行けば
- Lv.44 キー14：あんたが追ってくるだけ
- Lv.47 キー15：美空の大事なものなのに
- Lv.50 メイン5：探さないで、の前兆

## 更新ファイル

- index.html
- VERSION.txt
- README_DIFF.md
- program/v039/version.js
- program/v039/state.js
- program/v039/office.js
- scenario/v039/storyIndex.js
- scenario/v039/keyStoryConfig.js
- scenario/v039/affectionStoryPlan.js
- scenario/v039/events/yozora_affection_40_01_key.json
- scenario/v039/events/yozora_affection_40_02_key.json
- scenario/v039/events/yozora_affection_40_03_key.json
- scenario/v039/events/yozora_affection_50_00_main.json

## 背景パス調整

- `yozora_affection_40_03_key`: `bg_sugosawa_twin_room_night_lights.png` → `bg_sugosawa_room_night_light_on.png`
- `yozora_affection_50_00_main`: `bg_hidamari_store_front_night.png` → `bg_hidamari_store_front_closed.png`

## 注意

画像アセットは同梱していない軽量差分です。v039_121以降の双沢姉妹部屋背景、v039_120以降のひだまりストア前背景が入っている前提です。
