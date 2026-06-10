# v039_148 = 夜空100専用立ち絵追加パッチ

## 適用前提

v039_147以降へ上書き。

## 内容

- 夜空メイン100「春の中で、ありがとう」専用の白ワンピース立ち絵を追加
- `yozora_affection_100_00_main.json` 内の夜空立ち絵を専用立ち絵へ差し替え
- 通常夜空立ち絵 `i10101.webp` は変更なし
- v039_147 の春待ち花畑背景＋夜空100イベントCG実装は維持

## 追加アセット

```text
images/assets/char/yozora_story100_special.png
```

## 更新ファイル

```text
index.html
VERSION.txt
README_DIFF.md
program/v039/version.js
program/v039/state.js
program/v039/office.js
scenario/v039/events/yozora_affection_100_00_main.json
images/assets/char/yozora_story100_special.png
```
