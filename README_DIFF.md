# ten_otsu v039_247 差分パッチ

## 適用前提
- **v039_246適用済みへ上書き**

## 修正内容
### 彩愛：ストーリー93「田舎では普通ですわ」
- ステップ56で、ステップ57と同じ駅前背景に切り替え
- ステップ63・65・68・69・71の運転手セリフを、本文内表記からスピーカー表示へ整理
- ステップ71・72の台詞を指定文へ変更
- ステップ75〜81を指定文へ差し替え
- ステップ75〜81の背景を新規農村背景 `bg_ayame93_country_road_day.webp` に変更
- 正門前背景の表示タイミングを到着描写に合わせて後ろへ調整
- ステップ101でばあや立ち絵を表示
- ステップ118で彩愛立ち絵を非表示（ばあやは表示継続）
- ステップ119の店長台詞を `お邪魔します。` に変更
- ステップ121で彩愛・ばあや立ち絵を非表示

## 追加・更新ファイル
- `scenario/v039/events/ayame_affection_90_01_key.json`
- `images/assets/char/ayame93_baaya_sprite.webp`
- `images/assets/bg/bg_ayame93_country_road_day.webp`
- `program/v039/version.js`
- `VERSION.txt`
- `index.html`
- `README_DIFF.md`
