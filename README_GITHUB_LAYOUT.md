# GitHub配置 / 運用メモ

## v037_80

- 自己紹介シナリオを軽量化。
- 同じ立ち絵ファイルが続く場合、`characters` 指定を削除。
- 表情変更がある場面だけ `characters.src` を指定。
- 立ち絵指定を削除した場面では `expression` / `expressionLabel` も削除。
- 同じ背景が続く場合、`bgEffect` / `effect` を削除。
- `scenario/data/intro_scenario_slim_report.json` を追加。
