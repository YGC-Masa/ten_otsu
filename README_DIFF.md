# v039_107 差分

## 目的
通常ストーリー、キャラごとのキーストーリー、キーストーリーコンプ後のメインストーリー、回想モードを同じ基盤で管理するための試作実装です。

## 追加
- `scenario/v039/storyIndex.js`
- `scenario/v039/keyStoryConfig.js`
- `program/v039/storyProgress.js`
- `program/v039/storyMenu.js`
- `program/v039/storyMenu.css`

## 変更
- `index.html`
  - タイトルと `?v=` を `v039_107` に更新
  - storyIndex / keyStoryConfig / storyProgress / storyMenu を読み込み
- `program/v039/version.js`
  - v039_107 表記へ更新
- `program/v039/state.js`
  - `ns.VERSION` を `v039_107_story_menu_trial` に更新
  - `storyMenu` モード追加
- `program/v039/office.js`
  - 右メニューに「ストーリー」を追加
  - ストーリーメニュー起動処理を追加
- `program/v039/storyPlayer.js`
  - `returnInfo.storyId` を読了保存
  - `returnInfo.mode === "storyMenu"` でストーリー一覧へ戻る

## 同梱継続
- `scenario/v039/events/kogane_natsu_marinpia.json`
- `scenario/v039/events/sample_hina_kogane_new_juice_002.json`
- `program/v039/eventData.js`

## 試作仕様
- `window.TENOTSU_DEBUG_ALL_STORIES = true` により、回想モードでも全ストーリーを表示します。
- 本番運用時は `false` にすると、読了済みのみ回想表示になります。
- キーストーリーとメインストーリーの枠は実装済みですが、v039_107時点では実ストーリー登録はまだありません。

## 注意
このZIPは上書き差分です。`program/v039/office.js`, `program/v039/storyPlayer.js`, `program/v039/state.js`, `program/v039/eventData.js`, `index.html` を別作業で編集済みの場合はマージ確認してください。
