# ten_otsu v039_261 差分パッチ

## 適用前提
- **v039_260適用済みへ上書き**

## 修正内容
### 彩愛：親愛Lv.98「本気にしてしまいますよ」
- 貼り付け本文をJSONとして整形
- `scenario/v039/events/ayame_affection_90_03_key.json` をリライト版へ差し替え
- 不正な全角空白インデントを通常スペースへ正規化し、JSONとして読み込める形に整形
- 既存の背景・立ち絵アセットを同梱

## 確認
- JSON読み込み確認済み
- ステップ数：232
- バージョン表示：v039_261

## 更新ファイル
- `scenario/v039/events/ayame_affection_90_03_key.json`
- `images/assets/bg/bg_ayame98_father_room_dusk.webp`
- `images/assets/bg/bg_ayame98_washitsu_dinner.webp`
- `images/assets/bg/bg_ayame98_guestroom_night.webp`
- `images/assets/char/ayame93_otousama_sprite.webp`
- `images/assets/char/ayame_93_trip_sprite.webp`
- `images/assets/char/ayame93_baaya_sprite.webp`
- `program/v039/version.js`
- `VERSION.txt`
- `index.html`
- `README_DIFF.md`
