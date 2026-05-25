# v039_11 → v039_12 story re-entry fix 差分

## 修正内容
- 2回目以降のストーリーでクリック進行が止まる問題を修正。
- 終了時に残る .ending クラスを次回開始時に確実に削除。
- showStoryLayer / hideStoryLayer で pointer-events と ending 状態を初期化。
- startStory 開始時にストーリー状態・fade状態・カウンター状態を完全リセット。
- クリック処理を onclick 代入にして古いイベントリスナー残留を防止。

リポジトリ直下へ展開して上書きしてください。
