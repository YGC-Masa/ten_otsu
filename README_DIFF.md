# v038_21 → v038_22 skip start surface boot 差分

## 修正内容
- script.js の起動時 `loadScenario(currentScenario)` を surface takeover 中はスキップ。
- `000start.json` / `uploaded_000start.json` から randomimageson/randomtexts/title/showlist を除去。
- `loadScenario("000start.json")` が呼ばれても surface takeover 中は事務所モードに委譲。
- `tenotsuRunBootFlow()` の二重キャラ再選出を抑止。
- HAR確認レポートを `program/docs/v038_22_start000_check_report.json` に追加。

リポジトリ直下へ展開して上書きしてください。
