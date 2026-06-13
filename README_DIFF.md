# ten_otsu v039_198 差分パッチ

## 適用前提
- **v039_197適用済みへ上書き**

## 修正内容
### ストーリー：本物の星を見る夜
- 背景を `images/assets/bg/bg_hidamari_store_front_closed.png` に変更

### ストーリー：行きたいって言ったら
- 美空立ち絵を `images/assets/char/misora_coat_muffler_main50.png` に変更
- 夜空立ち絵を `images/assets/char/yozora_coat_main50.png` に変更
- 背景を `images/assets/bg/bg_homecenter_outdoor_corner_day.png` に変更
- ステップ1テキストを `――ホームセンター店内――` に変更
- ステップ133の `レジ横のカゴに置く。` を `そっとカゴに置いた。` に変更

### ストーリー：怖いけど、見たい
- 背景を `images/assets/bg/bg_sugosawa_room_night_light_on.png` に変更
- ステップ1〜100の立ち絵をパジャマへ変更
  - 美空：`images/assets/char/misora_pajama_generic.png`
  - 夜空：`images/assets/char/yozora_pajama_generic.png`
- ステップ101以降の立ち絵を冬服へ変更
  - 美空：`images/assets/char/misora_coat_muffler_main50.png`
  - 夜空：`images/assets/char/yozora_coat_main50.png`

### 追加画像
- `images/assets/bg/bg_homecenter_outdoor_corner_day.png`

### 背景カタログ追加キー
- `homecenter_outdoor_corner_day`

## バージョン更新
- `index.html`
- `VERSION.txt`
- `program/v039/version.js`
- `scenario/v039/storyIndex.js` の対象3本 version を `v039_198` に更新
