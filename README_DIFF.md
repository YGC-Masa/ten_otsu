# v039_115 差分

## 目的

夜空ルートの親愛Lv.1〜10段を一通り接続します。

- キー1: 美空なら休憩室
- キー2: 見てるだけ
- キー3: 特別公演のチケット
- メイン1: 余計なところまで見ないで

## 追加ファイル

- `scenario/v039/events/yozora_affection_00_03_key.json`
- `scenario/v039/events/yozora_affection_10_00_main.json`

## 更新ファイル

- `index.html`
- `VERSION.txt`
- `program/v039/version.js`
- `program/v039/storyPlayer.js`
- `program/v039/storyProgress.js`
- `scenario/v039/storyIndex.js`
- `scenario/v039/keyStoryConfig.js`
- `scenario/v039/affectionStoryPlan.js`

## ストーリー突入演出

ストーリーモード突入時は、

1. 画面暗転
2. テキストボックスクリア
3. 背景差し替え
4. 初回ステップ準備
5. フェードイン

の順に処理するように調整しています。

## 注意

上書き差分です。`storyPlayer.js` / `storyIndex.js` / `keyStoryConfig.js` を別途編集している場合はマージ確認してください。
