# v038_22 → v038_23 orientation warning fix 差分

## 修正内容
- 通常PC表示でも出ていた横画面警告を修正。
- PC/幅900px以上/hover+pointer fine環境では rotate-warning を強制非表示。
- 狭いportraitかつタッチ系入力時のみ回転警告を表示。
- surfaceManager.js と script.js の両方から orientation guard を適用。

リポジトリ直下へ展開して上書きしてください。
