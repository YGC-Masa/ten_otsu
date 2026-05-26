# v039_23 cleanup audit plan

## 方針

旧フレームワークを削除せず、index.htmlから読み込まないことで隔離します。GitHub上書き後のフルZIPを受け取ってから、残す/削除候補を精査します。

## v039_23で必須

- index.html
- program/v039/core.css
- program/v039/state.js
- program/v039/assets.js
- program/v039/layers.js
- program/v039/office.js
- program/v039/app.js
- images/assets/bgev/bg_office_hidamari.png
- images/assets/char/*.webp のうち office表示キャラ

## 削除候補になる可能性が高い旧表示系

- program/randomShows.js
- program/menuList.js
- program/surfaceManager.js
- program/bootRescue.js
- program/style.css の旧画面制御部分
- scenario/scenario/000start.json
- scenario/scenario/start000.json
- scenario/scenario/uploaded_000start.json
- list/office6.json 相当
- #list-panel / #menu-panel / #random-images-layer / #random-text-layer を使う処理

## まだ削除しないほうがよいもの

- program/script.js: storyPlayerへ移植するまで参照用として保持
- program/battle.js: battleAdapterへ接続するまで保持
- scenario/*.json: v039 storyPlayer移行まで保持
- images/*: 使用確認が終わるまで保持
- config系: パス/アセット参照用に保持
