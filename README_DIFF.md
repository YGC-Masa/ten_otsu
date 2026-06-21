# ten_otsu v039_254 差分パッチ

## 適用前提
- **v039_251以降へ上書き可能**
- v039_252 / v039_253 を適用して index.html が壊れた状態にも上書き可能

## 修正内容
### 重要修正
- v039_252 / v039_253 に入っていた仮の `index.html` を、ゲーム本体用の正しい `index.html` に戻しました。
- そのため、GitHub Pagesで `ten_otsu_v039_252_...` だけが表示される状態を復旧します。
- favicon 404のノイズを避けるため、今回の index.html では favicon 行を外しています。

### 彩愛：ストーリー93「お父様、これは何でしょう」
- v039_252 相当の背景・父CG・ばあや立ち絵を同梱
- v039_253 相当のステップ1イベントCGを同梱
- `scenario/v039/events/ayame_affection_90_02_key.json` は v039_253 時点の内容を採用

## 収録ファイル
- `index.html`
- `VERSION.txt`
- `program/v039/version.js`
- `scenario/v039/events/ayame_affection_90_02_key.json`
- `images/assets/bg/bg_ayame93_estate_corridor_day.webp`
- `images/assets/cg/cg_ayame93_step1_corridor_run.webp`
- `images/assets/cg/cg_ayame93_father_vr_room.webp`
- `images/assets/cg/cg_ayame93_shiden_issen_thrust.webp`
- `images/assets/cg/cg_ayame93_father_bed_smile.webp`
- `images/assets/cg/cg_ayame93_father_bed_laugh.webp`
- `images/assets/cg/cg_ayame93_father_bed_shock.webp`
- `images/assets/char/ayame_93_trip_sprite.webp`
- `images/assets/char/ayame93_baaya_sprite.webp`
