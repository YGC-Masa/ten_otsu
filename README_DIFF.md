# ten_otsu v039_80 → v039_81 差分

## 概要

イベント営業を、通常接客バトルへの仮接続から **イベントバトル通常モード** へ切り替えました。
ブラック家電星人のノイズシールドを、タップ・フリック・ホールドで削る試作版です。

## 変更点

- `eventBattle.js` / `eventBattle.css` を追加。
- イベント営業 `battleType: eventBoss` を新イベントバトルへ分岐。
- ブラック家電星人のHP / SHIELD / NOISEゲージを表示。
- 通常モード操作を追加。
  - TAP：基本シールド削り
  - FLICK：指定方向へノイズを流す
  - HOLD：長押し調律
- シールド0で撃破仮リザルトへ遷移。
- フィルインノーツは将来実装用として複数パターンテーブルを追加。
- 将来的にパターンを増やし、その中からランダム選択する設計にしました。

## 変更ファイル

```text
index.html
program/v039/state.js
program/v039/sales.js
program/v039/inputGuard.js
program/v039/eventBattle.js
program/v039/eventBattle.css
program/docs/v039_81_event_battle_normal_mode.md
README_DIFF.md
release_notes.md
VALIDATION.json
CHECKSUMS.json
```
