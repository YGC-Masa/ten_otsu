# v039_108 差分

## 目的
右メニューの「外回り」と「ストーリー」の役割被りを整理し、夜空のキーストーリー第1話を実装します。あわせて、ストーリーモードで複数人が登場する時の立ち位置を「人数+1分割」で自動配置し、イベントCGサーフェスをキャラ立ち絵より前面に出す表示基盤を追加します。

## 追加
- `scenario/v039/events/yozora_affection_00_01_key.json`
- `program/v039/storyLayout.js`

## 変更
- `index.html`
  - タイトルと `?v=` を `v039_108` に更新
  - `program/v039/storyLayout.js` を読み込み
- `program/v039/version.js`
  - v039_108 表記へ更新
- `program/v039/state.js`
  - `ns.VERSION` を `v039_108_story_key_layout_trial` に更新
- `program/v039/office.js`
  - 右メニューの「外営業（ストーリー）」を「外回り」に変更
  - 右メニューの「ストーリー」を「ストーリー管理」に変更
- `program/v039/storyMenu.js`
  - 見出しを「ストーリー管理」に変更
  - 外回りとの役割分離説明を追加
- `program/v039/storyPlayer.js`
  - イベントCG表示を背景変更後に行うよう調整
  - CGが背景差し替えで消えないように変更
- `program/v039/storyMenu.css`
  - イベントCGサーフェスの重なり順を追加
- `scenario/v039/storyIndex.js`
  - 夜空キーストーリーを登録
- `scenario/v039/keyStoryConfig.js`
  - 夜空の `requiredStories` に `yozora_affection_00_01_key` を登録

## 表示仕様
- 外回り：移動先・季節イベント入口
- ストーリー管理：メイン、キーストーリー、通常、回想
- 立ち絵自動配置：1人=50%、2人=33.333%/66.667%、3人=25%/50%/75% のように人数+1で分割
- イベントCG：キャラ立ち絵より前面、テキストUIより背面

## 注意
このZIPは上書き差分です。`index.html`, `program/v039/office.js`, `program/v039/storyPlayer.js`, `program/v039/storyMenu.js`, `program/v039/storyMenu.css`, `program/v039/state.js`, `scenario/v039/storyIndex.js`, `scenario/v039/keyStoryConfig.js` を別作業で編集済みの場合はマージ確認してください。
