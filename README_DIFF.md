# v039_117 差分

## 目的
夜空ルートの親愛Lv.11〜20帯を試作実装します。

## 追加シナリオ
- `scenario/v039/events/yozora_affection_10_01_key.json`
  - 「そういうの、気づかなくていい」
- `scenario/v039/events/yozora_affection_10_02_key.json`
  - 「美空だけでいいでしょ」
- `scenario/v039/events/yozora_affection_10_03_key.json`
  - 「気づかなくていい疲れ」
- `scenario/v039/events/yozora_affection_20_00_main.json`
  - 「一歩後ろの夜空」

## 登録
- Lv.11: キー4
- Lv.14: キー5
- Lv.17: キー6
- Lv.20: メイン2

## 変更
- `scenario/v039/storyIndex.js`
- `scenario/v039/keyStoryConfig.js`
- `scenario/v039/affectionStoryPlan.js`
- `scenario/v039/backgroundCatalog.js`
- `program/v039/version.js`
- `program/v039/state.js`
- `program/v039/office.js`
- `program/v039/storyProgress.js`
- `index.html`

## 追加暫定背景
- `images/assets/bg/bg_minato_park_event_plaza_day.png`
- `images/assets/bg/bg_hidamari_store_front_night.png`
- `images/assets/bg/bg_shiomi_beach_evening.png`

これらはシナリオ再生時の404回避用の暫定背景です。正式背景ができたら差し替えてください。
