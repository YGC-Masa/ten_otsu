# ten_otsu diff v039_91 -> v039_92

イベントバトル画面のひだまりメンバー表示について、スワイプ操作が効かずループ確認ができない問題を修正しました。
ファーストビューでは必ず5人が見えるようにし、全13人を5人ずつローリング表示します。

## 変更内容

- ひだまりメンバー表示をネイティブ横スクロール依存から、5人固定表示のローリング方式へ変更。
- 左右スワイプで表示開始位置を変更。
- 左右ボタンでも同じループ切り替えが可能。
- ファーストビューで5人が必ず収まるようにCSSを再整理。
- スワイプ操作時にメンバークリックが誤発火しないように入力ガードを追加。
- 表示中の範囲を「何番目から5人 / 全13人」として表示。

## 主な更新ファイル

```text
index.html
program/v039/state.js
program/v039/eventBattle.js
program/v039/eventBattle.css
program/docs/v039_92_event_member_loop_swipe_fix.md
release_notes.md
VALIDATION.json
CHECKSUMS.json
```
