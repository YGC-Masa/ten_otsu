# v039_129 アントステラ＋羽白湖正式背景追加パッチ

## 概要
BOOKCAFE「アントステラ」と羽白湖の正式背景アセットを追加し、夜空Lv80〜100周辺シナリオの暫定背景参照を正式背景へ差し替えました。

## 新規追加背景

### BOOKCAFE アントステラ
- images/assets/bg/bg_bookcafe_antostella_exterior_night.png
- images/assets/bg/bg_bookcafe_antostella_1f_night.png
- images/assets/bg/bg_bookcafe_antostella_2f_night.png

### 羽白湖
- images/assets/bg/bg_hashiro_lake_night.png
- images/assets/bg/bg_hashiro_lake_day.png
- images/assets/bg/bg_hashiro_lake_evening.png
- images/assets/bg/bg_hashiro_lake_morning.png
- images/assets/bg/bg_hashiro_lake_early_morning.png

## 更新内容
- scenario/v039/backgroundCatalog.js に正式背景を登録
- yozora_affection_90_00_main.json の羽白湖背景を正式背景へ差し替え
- yozora_affection_100_00_main.json のブックカフェ背景を正式背景へ差し替え
- yozora_affection_90_03_key.json の双沢姉妹部屋背景を正式背景へ差し替え
- バージョン表示を v039_129 に更新

## 注意
今回は新規背景アセット追加のため画像を同梱しています。次回以降、この背景画像は再同梱しない運用です。
