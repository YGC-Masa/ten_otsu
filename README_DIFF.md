# v039_137 = 夜空メイン40専用道着立ち絵＋演武イベントCG実装パッチ

## 適用前提

v039_136以降へ上書きしてください。

## 実装内容

- 夜空メイン40「嬉しいのに、苦しい」に専用道着立ち絵2種を適用
- ステップ28〜44に美空演武イベントCGを表示
- ステップ71〜84に夜空弓道演武イベントCGを表示
- イベントCG解除後は専用道着立ち絵へ復帰

## 追加アセット

```text
images/assets/char/misora_budo_gi_main40.png
images/assets/char/yozora_budo_gi_main40.png
images/assets/cg/cg_yozora_main40_misora_enbu.png
images/assets/cg/cg_yozora_main40_yozora_kyudo_enbu.png
```

## 更新ファイル

```text
index.html
VERSION.txt
README_DIFF.md
program/v039/version.js
program/v039/state.js
program/v039/office.js
scenario/v039/events/yozora_affection_40_00_main.json
```
