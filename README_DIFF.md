# ten_otsu v039_262 差分パッチ

## 適用前提
- **v039_261適用済みへ上書き**

## 修正内容
### 彩愛：親愛Lv.98「本気にしてしまいますよ」
- ステップ71：夜の廊下背景へ変更、彩愛立ち絵を表示
- ステップ111：イベントCGを追加
- ステップ140：イベントCGを追加
- ステップ146：イベントCGを追加
- ステップ176：ステップ132と同じ和室背景へ戻し、イベントCGを終了
- ステップ188：お父様立ち絵を表示
- ステップ196：お父様を非表示にし、ばあや立ち絵を表示
- ステップ199：ばあや立ち絵を非表示

## 追加ファイル
- `images/assets/bg/bg_ayame98_estate_corridor_night.webp`
- `images/assets/cg/cg_ayame98_step111_corridor_close.webp`
- `images/assets/cg/cg_ayame98_step140_yukata_recline.webp`
- `images/assets/cg/cg_ayame98_step146_yukata_close.webp`

## 更新ファイル
- `scenario/v039/events/ayame_affection_90_03_key.json`
- `program/v039/version.js`
- `VERSION.txt`
- `index.html`
- `README_DIFF.md`

## 確認
- JSON読み込み確認済み
- ステップ数：232
- バージョン表示：v039_262
