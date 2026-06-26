# ten_otsu v039_265 差分パッチ

## 適用前提
- **v039_264適用済みへ上書き**

## 修正内容
### 双沢 美空 親愛23〜30 JSON実装
`misora_affection_23_30_txt.zip` から4本を `v039_steps` 形式に変換しました。

- 親愛Lv.23 キー1：`同じココアを買ってみる`
- 親愛Lv.25 キー2：`ココア、飲む？`
- 親愛Lv.28 キー3：`同じものを選ぶ日`
- 親愛Lv.30 メイン：`同じでも、同じじゃない`

## 追加ファイル
- `scenario/v039/events/misora_affection_20_01_key.json`
- `scenario/v039/events/misora_affection_20_02_key.json`
- `scenario/v039/events/misora_affection_20_03_key.json`
- `scenario/v039/events/misora_affection_30_00_main.json`

## 更新ファイル
- `scenario/v039/storyIndex.js`
- `scenario/v039/keyStoryConfig.js`
- `program/v039/version.js`
- `VERSION.txt`
- `index.html`
- `README_DIFF.md`

## 確認
- ZIP破損チェック済み
- JSON読み込み確認済み
- バージョン表示：v039_265
