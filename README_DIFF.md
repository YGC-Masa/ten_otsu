# ten_otsu v039_207 差分パッチ

## 適用前提
- **v039_205以降へ上書き**

## 修正内容
### ストーリー：春の中で、ありがとう
- **ステップ65以降、美空は登場しない**ように修正
  - ステップ65以降の `storySprites` から美空（`ah`）を完全除外
  - 夜空表示が必要な箇所は夜空のみ表示に整理

## 更新ファイル
- `scenario/v039/events/yozora_affection_100_00_main.json`
- `scenario/v039/storyIndex.js`
- `index.html`
- `VERSION.txt`
- `program/v039/version.js`

## 確認
- 美空立ち絵除外数：58
