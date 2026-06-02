# ten_otsu v039_82 → v039_83 差分

イベントバトルのラッシュモードを、予定表示から実プレイ可能な5レーンノーツ判定へ進めました。

## 主な変更

- イベントバトル結果画面を横画面向けにスクロール対応
- シールド0で即リザルトではなく、RUSH MODEへ遷移
- KICK / SNARE / HIGH TOM / LOW TOM / CRASH の5レーンを実装
- 前半7種×後半4種のランダム合成パターンを実際のノーツ落下に使用
- JUST / GOOD / MISS 判定を追加
- ラッシュ中のCOMBO、JUST、FULL COMBO、ALL JUSTボーナスを追加
- ツはハイハット/ゴーストとして表示し、操作対象外に設定

## 更新ファイル

```text
index.html
program/v039/state.js
program/v039/eventBattle.js
program/v039/eventBattle.css
program/docs/v039_83_event_battle_rush_notes.md
README_DIFF.md
release_notes.md
VALIDATION.json
CHECKSUMS.json
```
