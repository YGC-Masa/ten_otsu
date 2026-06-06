# v039_113 双沢家・美空部屋・夜空部屋背景追加パッチ

## 基準
- v039_112 までを含む上書き差分です。

## 追加背景
- `images/assets/bg/bg_sugosawa_house_day.png`
- `images/assets/bg/bg_sugosawa_house_night.png`
- `images/assets/bg/bg_misora_room_day.png`
- `images/assets/bg/bg_misora_room_night.png`
- `images/assets/bg/bg_yozora_room_day.png`
- `images/assets/bg/bg_yozora_room_night.png`

## 更新
- `index.html` を v039_113 に更新
- `program/v039/version.js` を v039_113 に更新
- `scenario/v039/backgroundCatalog.js` に背景IDを追加
- `scenario/v039/townEncounterConfig.js` に「双沢家前」を追加

## 背景ID
- `sugosawa_house_day`
- `sugosawa_house_night`
- `misora_room_day`
- `misora_room_night`
- `yozora_room_day`
- `yozora_room_night`

## 確認ポイント
1. 起動画面のバージョンが v039_113 になっていること。
2. 追加画像が 404 にならないこと。
3. `TENOTSU_BACKGROUND_CATALOG` に6背景が登録されていること。
4. 外回りの場所候補に「双沢家前」が追加されていること。
