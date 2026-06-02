# ten_otsu v039_81 → v039_82 差分

## 概要

イベントバトルのラッシュモードに向けて、前半リズム7種と後半フィルイン4種を定義し、ランダム合成できるテーブルを追加しました。

v039_82では、まだノーツ落下・判定の本実装は行わず、ラッシュ候補をリザルトに表示するところまでです。

## 変更点

- 代表的なリズムパターン7種を追加。
- 後半フィルイン4種を整理。
- 前半7種×後半4種の28通りからランダム合成する関数を追加。
- `KICK / SNARE / HIGH_TOM / LOW_TOM / CRASH` の5レーン前提データに整理。
- `ツ` はハイハット/ゴーストノートとして、操作対象外の将来演出データに設定。
- イベントバトルのリザルトに、選ばれた前半・後半・入力ノーツ数・ゴースト数・スコア倍率を表示。
- `TenotsuEventBattle` APIにパターン一覧と合成関数を公開。

## 変更ファイル

```text
index.html
program/v039/state.js
program/v039/eventBattle.js
program/v039/eventBattle.css
program/docs/v039_82_event_battle_rush_pattern_table.md
README_DIFF.md
release_notes.md
VALIDATION.json
CHECKSUMS.json
```
