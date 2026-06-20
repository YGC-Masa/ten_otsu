# ten_otsu v039_245 差分パッチ

## 適用前提
- **v039_244適用済みへ上書き**

## 修正内容
### 彩愛：ストーリー93「田舎では普通ですわ」
- **ステップ9〜24**
  - 彩愛立ち絵を `images/assets/char/ayame_93_trip_sprite.webp` に変更して表示
- **ステップ25** 以降〜 **44**
  - イベントCG1 `images/assets/cg/cg_ayame93_train_window.webp` を表示
- **ステップ45** 以降〜 **49**
  - イベントCG2 `images/assets/cg/cg_ayame93_train_window_down.webp` を表示
- **ステップ50**
  - 背景を `images/assets/bg/bg_ayame93_station_exterior_day.webp` に変更
- **ステップ73**
  - 背景を `images/assets/bg/bg_ayame93_estate_gate_day.webp` に変更
- **ステップ90**
  - 背景を `images/assets/bg/bg_ayame93_estate_house_day.webp` に変更
- 追加画像は**全てWebP化して実装**

## 更新ファイル
- `scenario/v039/events/ayame_affection_90_01_key.json`
- `images/assets/char/ayame_93_trip_sprite.webp`
- `images/assets/cg/cg_ayame93_train_window.webp`
- `images/assets/cg/cg_ayame93_train_window_down.webp`
- `images/assets/bg/bg_ayame93_station_exterior_day.webp`
- `images/assets/bg/bg_ayame93_estate_gate_day.webp`
- `images/assets/bg/bg_ayame93_estate_house_day.webp`
- `program/v039/version.js`
- `VERSION.txt`
- `index.html`
- `README_DIFF.md`
