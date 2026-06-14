# ten_otsu v039_203 差分パッチ

## 適用前提
- **v039_202 適用済みへ上書き**

## 修正内容

### ストーリー：夜のブックカフェ企画
- 背景を `images/assets/bg/bg_hidamari_store_salesfloor_night.png` に変更

### ストーリー：アントステラへ行こう
- 背景を `images/assets/bg/bg_hidamari_store_salesfloor_night.png` に変更

### ストーリー：二人だから、少し素直になる
- 背景を `images/assets/bg/bg_hidamari_store_front_closed.png` に変更
- 美空立ち絵を `images/assets/char/misora_coat_muffler_main50.png` に変更
- 夜空立ち絵を `images/assets/char/yozora_coat_main50_custom_star.png` に変更
- ステップ3文言変更
- 旧ステップ5〜9相当の導入文を削除
- ステップ43を `――住宅街・夜――` に変更し、背景を `images/assets/bg/bg_residential_area_night.png` に変更
- ステップ43で美空を非表示
- ステップ155を店員台詞に変更

### ストーリー：春の中で、ありがとう
- ステップ1〜50の夜空立ち絵を `images/assets/char/i10901.webp` に変更
- 背景を `images/assets/bgev/bg_office_hidamari.png` に変更
- ステップ51で人物非表示、背景を `images/assets/bg/bg_sugosawa_room_night_light_on.png` に変更
- ステップ53〜54の立ち絵をパジャマ差分に変更
- ステップ55〜75で人物非表示

## 更新ファイル
- `README_DIFF.md`
- `VERSION.txt`
- `index.html`
- `program/v039/version.js`
- `scenario/v039/storyIndex.js`
- `scenario/v039/events/yozora_affection_90_01_key.json`
- `scenario/v039/events/yozora_affection_90_02_key.json`
- `scenario/v039/events/yozora_affection_90_03_key.json`
- `scenario/v039/events/yozora_affection_100_00_main.json`
