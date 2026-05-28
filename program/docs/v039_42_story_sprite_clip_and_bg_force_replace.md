# v039_46 立ち絵クリップ・背景強制戻し

- body直下立ち絵レイヤーをテキスト欄の上端までにクリップ。
- 通常背景戻しに `bgMode: forceReplace` / `forceBackgroundReplace: true` を付与。
- `forceReplaceStoryBackground()` を追加し、背景DOM内に残るイベントCG画像を通常背景へ強制置換。
