# ten_otsu v039_257 差分パッチ

## 適用前提
- **v039_256適用済みへ上書き**

## 修正内容
### 双沢 美空 親愛3〜10 JSON実装
`misora_affection_03_10_txt.zip` から、以下4本を `v039_steps` 形式に変換して実装。

- 親愛Lv.3 キー1：`上手なこと言えないかも`
- 親愛Lv.5 キー2：`なんかパリっとしてる`
- 親愛Lv.8 キー3：`それ、たぶんこっち`
- 親愛Lv.10 メイン：`どれでもいい`

## 追加ファイル
- `scenario/v039/events/misora_affection_00_01_key.json`
- `scenario/v039/events/misora_affection_00_02_key.json`
- `scenario/v039/events/misora_affection_00_03_key.json`
- `scenario/v039/events/misora_affection_10_00_main.json`

## 更新ファイル
- `scenario/v039/storyIndex.js`
- `scenario/v039/keyStoryConfig.js`
- `program/v039/version.js`
- `VERSION.txt`
- `index.html`
- `README_DIFF.md`
