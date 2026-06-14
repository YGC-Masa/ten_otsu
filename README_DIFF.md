# ten_otsu v039_211 差分パッチ

## 適用前提
- **v039_210適用済みへ上書き**

## 修正内容
### ストーリー：探さないで、の前兆
- ステップ281
  - 背景変更：`images/assets/bg/bg_sugosawa_room_night_light_on.png`
- ステップ282以降
  - 美空立ち絵：`images/assets/char/misora_pajama_generic.png`
- ステップ283以降
  - 夜空立ち絵：`images/assets/char/yozora_pajama_generic.png`
- 上記修正後、`―― / ーー` で始まる地の文が同一ステップ内に混在している箇所を別ステップへ分離
  - 分離追加数：12ステップ

## 更新ファイル
- `README_DIFF.md`
- `VERSION.txt`
- `index.html`
- `program/v039/version.js`
- `scenario/v039/storyIndex.js`
- `scenario/v039/events/yozora_affection_50_00_main.json`
