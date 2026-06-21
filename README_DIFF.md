# ten_otsu v039_250 差分パッチ

## 適用前提
- **v039_249適用済みへ上書き**

## 修正内容
### 彩愛：ストーリー93「田舎では普通ですわ」
- ステップ55で彩愛イベントCGを終了
- ステップ55・56の背景を `images/assets/bg/bg_ayame93_station_exterior_day.webp` に維持
- ステップ55のCG終了時に旧背景 `bg_hiyorizaka_station_day.png` が一瞬見える問題を防ぐため、ステップ54で同背景を事前セット
  - イベントCG表示中に背景だけ先に差し替え、CGを消した瞬間に旧背景が見えないよう調整

## 更新ファイル
- `scenario/v039/events/ayame_affection_90_01_key.json`
- `program/v039/version.js`
- `VERSION.txt`
- `index.html`
- `README_DIFF.md`
