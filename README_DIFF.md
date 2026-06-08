# v039_135 店長マンション前・メゾン・ド・エトワール背景追加

## 内容

店長マンション前の帰り道 / 店長のマンション「メゾン・ド・エトワール」前の正式背景を追加しました。

## 追加背景

- images/assets/bg/bg_manager_mansion_road_early_morning.png
- images/assets/bg/bg_manager_mansion_road_morning.png
- images/assets/bg/bg_manager_mansion_road_day.png
- images/assets/bg/bg_manager_mansion_road_evening.png
- images/assets/bg/bg_manager_mansion_road_night.png

## backgroundCatalog 登録

- manager_mansion_road_early_morning
- manager_mansion_road_morning
- manager_mansion_road_day
- manager_mansion_road_evening
- manager_mansion_road_night
- manager_mansion_road

## シナリオ差し替え

- scenario/v039/events/yozora_affection_70_00_main.json
  - 「店長マンション前の帰り道」シーンを bg_manager_mansion_road_night.png へ差し替え

## 注意

今回は新規背景アセット追加のため画像を同梱しています。次回以降、この5枚は原則再同梱しません。

適用先: v039_134以降
