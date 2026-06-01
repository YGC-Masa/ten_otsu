# ten_otsu v039_70 → v039_71 差分

## 目的

ビリビリバトル中に「ひだまりメンバーが1人しかクリックできない」ように見える入力不具合を修正し、バトル中の誤ピンチ・ダブルタップ拡大を抑止する。

## 変更内容

- `program/v039/rivalBattle.js`
  - `click` 依存の入力処理を `pointerup` / `touchend` / `click` の委譲処理へ変更。
  - ひだまりメンバー、家電星人、操作ボタンを共通の入力経路で処理。
  - 短時間の同一入力を無視して二重発火を防止。
  - ビリビリバトル中の `setMode` を `rivalBattle` へ変更。

- `program/v039/rivalBattle.css`
  - ひだまりメンバー列の `z-index` / `pointer-events` を明示。
  - `touch-action: none` を追加。

- `program/v039/inputGuard.js`
  - バトル中の複数指タッチ、iOS gestureイベント、ダブルタップ拡大、Ctrl+Wheelズームを抑止。

- `program/v039/battle.css`
  - 通常バトル側にも `touch-action: none` を適用。

- `index.html`
  - `inputGuard.js` を読み込み。
  - viewportをゲーム向けに強化。
  - 表記を v039_71 へ更新。

## 注意

OSやブラウザのアクセシビリティ拡大は完全には止められない場合があります。今回の修正は、Webアプリとして制御可能な範囲で、ゲーム操作面の誤ピンチ・誤ダブルタップを防ぐものです。
