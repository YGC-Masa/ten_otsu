# ten_otsu v039_165 yozora30_40_bg_sprite_cg_patch

## 概要
夜空ストーリー30〜40帯の背景、専用道着立ち絵、演武イベントCG指定を修正する差分パッチです。

## 更新内容
- 「美空の剣道の方がわかりやすい」冒頭背景を `images/assets/bg/bg_hidamari_warehouse.png` に変更。
- 「嬉しいのに、苦しい」冒頭背景を `images/assets/bg/bg_hiyorizaka_bujutsu_hounousai_stage_day.png` に変更。
- 「嬉しいのに、苦しい」の美空/夜空立ち絵を専用道着立ち絵に変更。
  - `images/assets/char/misora_budo_gi_main40.png`
  - `images/assets/char/yozora_budo_gi_main40.png`
- ステップ35〜45に美空演武CG `images/assets/cg/cg_yozora_main40_misora_enbu.png` を指定。
- ステップ63〜73に夜空弓道演武CG `images/assets/cg/cg_yozora_main40_yozora_kyudo_enbu.png` を指定。
- ステップ123に `images/assets/bg/bg_hiyorizaka_sports_park_evening.png` を指定。

## 更新ファイル
- `scenario/v039/events/yozora_affection_30_02_key.json`
- `scenario/v039/events/yozora_affection_40_00_main.json`
- `index.html`
- `VERSION.txt`
- `program/v039/version.js`
- `program/v039/state.js`
- `program/v039/office.js`
