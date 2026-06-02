# ten_otsu v039_84 → v039_85 差分

## 概要

イベントバトル通常モードの操作表示エリアを、パネル内から画面全域ベースへ拡張しました。

画面端にはSAFEZONEを設け、スマホ横画面のOSジェスチャー・誤タップ領域を避けるように調整しています。

## 主な変更

- イベントバトル通常モードのTAP / FLICK / HOLD表示範囲を拡大
- 画面端SAFEZONEを追加
- 青サークル、緑矢印、ピンクHOLDの出現位置を画面全域寄りへ調整
- RUSH MODEの5レーン表示もSAFEZONE内で広く表示
- HUDとボス情報をコンパクトなオーバーレイに変更

## 変更ファイル

- index.html
- program/v039/state.js
- program/v039/eventBattle.js
- program/v039/eventBattle.css
- program/docs/v039_85_event_battle_fullscreen_safezone.md
- release_notes.md
- VALIDATION.json
- CHECKSUMS.json
