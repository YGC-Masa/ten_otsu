# v038_12 → v038_13 差分

## 方針
旧メニュー・旧サブメニューを中和して継ぎ足すのではなく、非ADV画面を surfaceManager に一本化。

## 修正内容
- 新規右メニュー `#tenotsu-main-menu` を追加し、旧 `#list-panel` / `#menu-panel` は非表示。
- office/shop人物は `#tenotsu-front-character-layer` に表示。
- 操作は `#tenotsu-operation-surface` と新メニューに集約。
- コメント欄は既存 `#dialogue-box` に統一。
- story/battle終了は安全フェード経由で復帰。
- 起動後にtitle状態が残る場合はofficeへ遷移。

リポジトリ直下へ展開して上書きしてください。
