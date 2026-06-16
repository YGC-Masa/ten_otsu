# ten_otsu v039_236 差分パッチ

## 適用前提
- **v039_235適用済みへ上書き**

## 修正内容

### 紫藤 彩愛 親愛71〜80 JSON実装
`ayame_affection_071_080_fulltexts_v001.zip` から、以下4本を `v039_steps` 形式に変換しました。

- 親愛Lv.73 キー1：`怖かったものの正体`
- 親愛Lv.75 キー2：`手を伸ばせる人`
- 親愛Lv.78 キー3：`自然体の美しさ`
- 親愛Lv.80 メイン：`アヤメの刺繍`

## 追加ファイル
- `scenario/v039/events/ayame_affection_70_01_key.json`
- `scenario/v039/events/ayame_affection_70_02_key.json`
- `scenario/v039/events/ayame_affection_70_03_key.json`
- `scenario/v039/events/ayame_affection_80_00_main.json`

## 更新ファイル
- `scenario/v039/storyIndex.js`
- `scenario/v039/keyStoryConfig.js`
- `program/v039/version.js`
- `VERSION.txt`
- `index.html`
- `README_DIFF.md`

## 変換確認
- Lv.73 `怖かったものの正体`: 214 steps
- Lv.75 `手を伸ばせる人`: 198 steps
- Lv.78 `自然体の美しさ`: 240 steps
- Lv.80 `アヤメの刺繍`: 210 steps
