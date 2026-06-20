# ten_otsu v039_246 差分パッチ

## 適用前提
- **v039_245適用済みへ上書き**

## 修正内容
### 彩愛：ストーリー93「田舎では普通ですわ」
- ステップ4を `白いブラウスに、薄紫のロングスカート。` に変更
- ステップ9〜24で使っていた彩愛立ち絵を、同ストーリー内の以後の彩愛立ち絵にも適用
  - `images/assets/char/ayame_93_trip_sprite.webp`
- `……わたくしは、親不孝者かもしれませんね` 直後のシナリオを指定文へ差し替え・増設
- 駅到着後の地の文順を指定順へ調整
- ストーリー末尾に指定の締め文を追加

## 更新ファイル
- `scenario/v039/events/ayame_affection_90_01_key.json`
- `program/v039/version.js`
- `VERSION.txt`
- `index.html`
- `README_DIFF.md`
