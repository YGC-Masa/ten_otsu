# ten_otsu v039_242 差分パッチ

## 適用前提
- **v039_241適用済みへ上書き**

## 修正内容

### ストーリー：彩愛 親愛Lv.100「あの日と変わらぬこの場所で」
- ステップ13
  - 彩愛立ち絵を添付1枚目へ変更
  - `images/assets/char/ayame_100_step013_sprite.webp`
- イベントCG差し替え
  - ステップ65：添付2枚目
  - ステップ109：添付3枚目
  - ステップ119：添付4枚目
  - ステップ133〜144：添付5枚目を継続表示
  - ステップ145：添付4枚目
  - ステップ160：添付6枚目
  - ステップ200：添付7枚目
  - ステップ210：添付8枚目
- 旧指定の以下を整理
  - ステップ136 のイベントCG差し替えを削除
  - ステップ194 のイベントCG差し替えを削除

## 更新ファイル
- `scenario/v039/events/ayame_affection_100_00_main.json`
- `images/assets/char/ayame_100_step013_sprite.webp`
- `images/assets/cg/cg_ayame100_step065.webp`
- `images/assets/cg/cg_ayame100_step109.png`
- `images/assets/cg/cg_ayame100_step119.png`
- `images/assets/cg/cg_ayame100_step133_144.png`
- `images/assets/cg/cg_ayame100_step160.png`
- `images/assets/cg/cg_ayame100_step200.png`
- `images/assets/cg/cg_ayame100_step210.png`
- `program/v039/version.js`
- `VERSION.txt`
- `index.html`
- `README_DIFF.md`
