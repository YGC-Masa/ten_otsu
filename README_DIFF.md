# v038_23 → v038_24 randomShows preflight 差分

## 修正内容
- indexでrandomShows.jsより前にtakeover preflightを追加。
- bootRescue.jsをrandomShows.jsより前に移動。
- randomShows.jsはtakeover中、表示DOMを生成せず、既存DOMも削除。
- randomImagesOn/randomTextsOn/buildRandomImagesをno-op化。

リポジトリ直下へ展開して上書きしてください。
