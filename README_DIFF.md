# v039_122 夜空キー3段目＋メイン3追加パッチ

## 目的
夜空ルートの親愛Lv.21〜30帯に、キーシナリオ3本とメイン3を追加する。

## 追加シナリオ
- scenario/v039/events/yozora_affection_20_01_key.json
  - Lv.21 キー7「黒いリボン」
- scenario/v039/events/yozora_affection_20_02_key.json
  - Lv.24 キー8「夜空らしいって何」
- scenario/v039/events/yozora_affection_20_03_key.json
  - Lv.27 キー9「白と黒の飲み物」
- scenario/v039/events/yozora_affection_30_00_main.json
  - Lv.30 メイン3「白黒ツインルーム」

## 更新ファイル
- index.html
- VERSION.txt
- program/v039/version.js
- program/v039/state.js
- program/v039/office.js
- scenario/v039/storyIndex.js
- scenario/v039/keyStoryConfig.js
- scenario/v039/affectionStoryPlan.js

## 背景パス調整
今回、新規背景アセットは同梱しない。
既存背景へ接続するため、以下のパス調整を行った。

- yozora_affection_20_02_key
  - bg_hidamari_warehouse_day.png → bg_hidamari_warehouse.png
- yozora_affection_20_03_key
  - bg_hidamari_store_break_space_day.png → battle_store_lv1.png
- yozora_affection_30_00_main
  - bg_sugosawa_twin_room_night_lights.png → bg_sugosawa_room_night_light_on.png

## 運用メモ
重い背景アセットは再同梱しない方針のため、このパッチはJS/JSON/HTML/TXTのみ。
