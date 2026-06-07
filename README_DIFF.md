# v039_118 塩見浜時間帯背景アセット追加パッチ

## 基準

- v039_117 までを含む上書き差分です。

## 追加内容

塩見浜の時間帯別背景を `images/assets/bg/` に追加しました。

```text
images/assets/bg/bg_shiomi_beach_early_morning.png
images/assets/bg/bg_shiomi_beach_morning.png
images/assets/bg/bg_shiomi_beach_day.png
images/assets/bg/bg_shiomi_beach_evening.png
images/assets/bg/bg_shiomi_beach_night.png
images/assets/bg/bg_shiomi_beach_midnight.png
```

## 背景カタログ

`scenario/v039/backgroundCatalog.js` に以下を追加しました。

```text
shiomi_beach_early_morning
shiomi_beach_morning
shiomi_beach_day
shiomi_beach_evening
shiomi_beach_night
shiomi_beach_midnight
```

## シナリオ調整

`yozora_affection_20_00_main.json` のバージョンを `v039_118` に更新し、
潮見浜・夕方背景を正式アセットとして使用します。

## バージョン表示

`index.html` / `program/v039/version.js` / `program/v039/state.js` / `program/v039/office.js` を v039_118 に更新しました。

## 確認ポイント

1. 起動画面・右メニュー・画面右下が v039_118 になっている。
2. `backgroundCatalog.js` に塩見浜6背景が登録されている。
3. `images/assets/bg/` 配下の塩見浜6背景が404にならない。
4. 夜空メイン2「一歩後ろの夜空」で潮見浜・夕方背景が表示される。
