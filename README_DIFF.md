# ten_otsu v039_251 差分パッチ

## 適用前提
- **v039_250適用済みへ上書き**

## 修正内容
### 彩愛：ストーリー93「田舎では普通ですわ」
- ステップ54から背景変更指定を外し、イベントCG表示を維持
- ステップ55で彩愛イベントCGを表示したまま、裏側背景を `images/assets/bg/bg_ayame93_station_exterior_day.webp` に切替
- ステップ56で彩愛イベントCGを終了し、背景表示へ移行

### ゲーム側：背景切替時のイベントCG維持対応
- `showEventCg: true` と `eventCg` がある背景変更ステップでは、背景更新時にイベントCGを強制非表示にしないよう調整
- 背景更新の一瞬だけ旧背景が見える問題を軽減

## 更新ファイル
- `scenario/v039/events/ayame_affection_90_01_key.json`
- `program/v039/storyBgPreloadTransition.js`
- `program/v039/version.js`
- `VERSION.txt`
- `index.html`
- `README_DIFF.md`
