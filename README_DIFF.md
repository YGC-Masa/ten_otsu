# ten_otsu v039_233 差分パッチ

## 適用前提
- **v039_232適用済みへ上書き**

## 修正内容

### 紫藤 彩愛 親愛21〜40 JSON実装
アップロードいただいた以下2つの本文ZIPから、8本を `v039_steps` 形式に変換しました。

- `ayame_affection_021_030_fulltexts_v001.zip`
- `ayame_affection_031_040_fulltexts_v001.zip`

### 追加シナリオ
- 親愛Lv.23 キー  `おやつは自然の恵みですわ`  → `scenario/v039/events/ayame_affection_20_01_key.json`
- 親愛Lv.25 キー  `川魚の焼き方`  → `scenario/v039/events/ayame_affection_20_02_key.json`
- 親愛Lv.28 キー  `普通ですわよ？`  → `scenario/v039/events/ayame_affection_20_03_key.json`
- 親愛Lv.30 メイン  `彩愛さんの普通`  → `scenario/v039/events/ayame_affection_30_00_main.json`
- 親愛Lv.33 キー  `それはプロポーズですか？`  → `scenario/v039/events/ayame_affection_30_01_key.json`
- 親愛Lv.35 キー  `親戚の集まりというものは`  → `scenario/v039/events/ayame_affection_30_02_key.json`
- 親愛Lv.38 キー  `ビールは淑女の嗜みですわ`  → `scenario/v039/events/ayame_affection_30_03_key.json`
- 親愛Lv.40 メイン  `少しだけ、焦っています`  → `scenario/v039/events/ayame_affection_40_00_main.json`

### 更新ファイル
- `scenario/v039/storyIndex.js`
- `scenario/v039/keyStoryConfig.js`
- `program/v039/version.js`
- `VERSION.txt`
- `index.html`
- `README_DIFF.md`
