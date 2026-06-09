# v039_141 みなと公園背景追加＋夜空40-50帯リライト反映

## 概要

v039_140以降へ上書きする差分パッチです。

## 追加背景アセット

- images/assets/bg/bg_minato_park_night.png
- images/assets/bg/bg_minato_park_evening.png
- images/assets/bg/bg_minato_park_morning.png

## backgroundCatalog追加

- minato_park_night
- minato_park_evening
- minato_park_morning
- minato_park
- hiyorizaka_seaside_road_night

## 差し替えシナリオ

- scenario/v039/events/yozora_affection_40_01_key.json
- scenario/v039/events/yozora_affection_40_02_key.json
- scenario/v039/events/yozora_affection_40_03_key.json
- scenario/v039/events/yozora_affection_50_00_main.json

## 反映内容

- 夜空キー40-01〜40-03をリライト版へ差し替え
- 夜空メイン50をリライト版へ差し替え
- みなと公園・夜/夕/朝を正式背景として追加
- 海沿いへ向かう道・夜をみなと公園夜背景へ互換接続
- v039_140で追加したメイン50の冬コート立ち絵、帰り道イベントCG、双沢家背景/美空パジャマ指定を維持
- セリフ内に混在していた「\n――地の文」を speaker 空文字の独立ステップへ分離

## 注意

今回は新規背景アセット追加のため、みなと公園背景3枚を同梱しています。既存の重い画像は再同梱していません。
