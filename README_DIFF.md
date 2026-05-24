# v038_14 → v038_15 boot rescue 差分

## 内容
- `program/bootRescue.js` を追加し、`script.js` より前に読み込み。
- 初期化中に固まる原因候補の旧MutationObserver/旧fallbackを事前に抑止。
- office/shop/battle突入時にboot overlayを強制非表示。
- 旧fallback関数をsurfaceManager経由に差し替え。

リポジトリ直下へ展開して上書きしてください。
