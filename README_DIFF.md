# v039_147 = 春待ち花畑背景＋夜空100イベントCG実装パッチ

## 適用前提

v039_146以降へ上書きする差分パッチです。

## 追加アセット

```text
images/assets/bg/bg_harumachi_flower_field_day.png
images/assets/cg/cg_yozora_spring_flower_field_thanks.png
```

## 実装内容

- 春待ち花畑・昼背景を正式背景として追加
- 夜空メイン100を「春の中で、ありがとう」へ更新
- 夜空メイン100で春待ち花畑背景を使用
- 夜空メイン100でイベントCG `cg_yozora_spring_flower_field_thanks.png` を表示
- storyIndex.js の90〜100帯タイトル/summaryを更新

## 更新ファイル

```text
index.html
VERSION.txt
README_DIFF.md
program/v039/version.js
program/v039/state.js
program/v039/office.js
scenario/v039/backgroundCatalog.js
scenario/v039/storyIndex.js
scenario/v039/events/yozora_affection_100_00_main.json
images/assets/bg/bg_harumachi_flower_field_day.png
images/assets/cg/cg_yozora_spring_flower_field_thanks.png
```
