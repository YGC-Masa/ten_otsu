# ten_otsu v039_191 差分パッチ

## 適用前提
- v039_190 適用済みの状態へ上書き。

## 修正内容
- 対象：夜空 親愛Lv.75「少し歩いて」
- 対象ファイル：`scenario/v039/events/yozora_affection_70_02_key.json`

### 変更点
- ステップ37
  - 美空を非表示（`clearStorySprites: true`）
  - 背景を `images/assets/bg/bg_hidamari_store_front_winter_day.png` に変更
    - ひだまりストア 冬・昼・雪無し（添付1枚目）
- ステップ103
  - 背景を `images/assets/bg/bg_wakaba_central_park_winter_evening.png` に変更

### 追加画像
- `images/assets/bg/bg_hidamari_store_front_winter_day.png`

### バージョン表示更新
- `index.html`
- `VERSION.txt`
- `program/v039/version.js`
- `scenario/v039/storyIndex.js` の対象 story version を `v039_191` に更新。
