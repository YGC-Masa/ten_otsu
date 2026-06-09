# v039_143 夜空キー6-1〜6-3＋メイン6リライト反映パッチ

## 内容

夜空の追加リライトシナリオを反映しました。

- `yozora_affection_50_01_key.json`：店長、大丈夫？
- `yozora_affection_50_02_key.json`：一生面倒見るって、どういう意味
- `yozora_affection_50_03_key.json`：店長のあったかさ
- `yozora_affection_60_00_main.json`：忘れて、でも忘れないで

## 整備

- セリフ内の `
――` 地の文を `speaker:""` の独立ステップへ分離。
- 未制作背景の直接参照を既存正式背景へ接続。
  - `bg_hidamari_store_closed_night.png` → `battle_store_lv1.png`
  - `bg_hidamari_store_backyard_morning.png` → `bg_hidamari_warehouse.png`
  - `bg_hidamari_store_breakroom_day.png` → `battle_store_lv1.png`
  - `bg_wakaba_central_park_night.png` → `bg_minato_park_night.png`

## 更新ファイル

```text
index.html
VERSION.txt
README_DIFF.md
program/v039/version.js
program/v039/state.js
program/v039/office.js
scenario/v039/backgroundCatalog.js
scenario/v039/events/yozora_affection_50_01_key.json
scenario/v039/events/yozora_affection_50_02_key.json
scenario/v039/events/yozora_affection_50_03_key.json
scenario/v039/events/yozora_affection_60_00_main.json
```

これは **v039_142以降へ上書きする軽量差分ZIP** です。画像アセットは同梱していません。
