# v039_71 rival input and pinch guard

## 目的

ビリビリバトル中に、ひだまりメンバーが1人しかクリックできないように見える問題を修正し、バトル中の誤ピンチ・ダブルタップ拡大を抑止する。

## 修正内容

- `rivalBattle.js` の入力処理を `click` 依存から、`pointerup` / `touchend` / `click` の委譲処理へ変更。
- 同一入力の二重発火を防ぐため、短時間の同一キーを無視するガードを追加。
- ひだまりメンバー、家電星人、操作ボタンを同じ入力経路で処理。
- `rivalBattle.css` でスタッフ列の `z-index` と `pointer-events` を明示。
- バトル画面全体に `touch-action: none` とタップハイライト抑止を追加。
- `inputGuard.js` を追加し、バトル中の複数指タッチ、iOS gesture イベント、ダブルタップ拡大、Ctrl+Wheel ズームを抑止。
- `index.html` の viewport をゲーム向けに強化。

## 注意

OSのアクセシビリティ拡大やブラウザ側が強制する一部ズームまでは完全に抑止できない。Webアプリとして制御できる範囲で、ゲーム画面上の誤操作を抑える。
