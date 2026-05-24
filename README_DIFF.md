# v038_09 → v038_10 差分

## 修正内容
- ショップ→事務所復帰時のハングアップ対策。
- surfaceManagerの操作イベントを旧ハンドラへ流さないよう `stopImmediatePropagation()` を追加。
- バトルUIのクリックはsurfaceManager対象外にしてbattle.jsへ戻す。
- バトルの「戻る」を事務所復帰へ明示接続。
- battle/story中は operation surface を完全非表示。

リポジトリ直下へ展開して上書きしてください。
