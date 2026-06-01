# ten_otsu v039_79 → v039_80 差分

## 概要

ST/BPの自動回復仕様を追加しました。

## 変更点

- スタミナを6分に1回復。
- バトルPを60分に1回復。
- オフライン経過分も次回読み込み時に反映。
- ST/BP HUDに次回回復目安を表示。
- 店舗営業のリソース表示にも回復間隔と次回回復目安を表示。

## 変更ファイル

```text
index.html
program/v039/state.js
program/v039/stamina.js
program/v039/battlePoint.js
program/v039/core.css
program/v039/rivalBattle.js
program/docs/v039_80_resource_auto_recovery.md
README_DIFF.md
release_notes.md
VALIDATION.json
CHECKSUMS.json
```
