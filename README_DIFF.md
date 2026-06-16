# ten_otsu v039_230 差分パッチ

## 適用前提
- **v039_229適用済みへ上書き**

## 内容

### 紫藤 彩愛 親愛3〜10をJSON実装
以下の本文ファイルを `v039_steps` 形式のシナリオJSONへ変換しました。

- 親愛Lv.3 キー1：`暮らしを見て選ぶ洗濯機`
- 親愛Lv.5 キー2：`節水性能は侮れませんわ`
- 親愛Lv.8 キー3：`春の香りは、ふきのとう`
- 親愛Lv.10 メイン：`暮らしを知っている人`

### 管理ファイル更新
- `scenario/v039/storyIndex.js` に彩愛ルート親愛0〜10の4本を追加
- `scenario/v039/keyStoryConfig.js` に彩愛のブロック1スロットを追加

## 追加ファイル
- `scenario/v039/events/ayame_affection_00_01_key.json`
- `scenario/v039/events/ayame_affection_00_02_key.json`
- `scenario/v039/events/ayame_affection_00_03_key.json`
- `scenario/v039/events/ayame_affection_10_00_main.json`

## 更新ファイル
- `scenario/v039/storyIndex.js`
- `scenario/v039/keyStoryConfig.js`
- `program/v039/version.js`
- `VERSION.txt`
- `index.html`
- `README_DIFF.md`
