# v038_26 → v038_27 script cleanup 差分

## 修正内容
- script.jsの旧フレームワーク処理をsurface takeover前提で直接クリーンアップ。
- 000start/start000/uploaded_000start の旧起動シナリオをloadScenarioでスキップ。
- randomimageson/randomtexts/showlist office6 をshowSceneで旧DOM描画させずsurfaceManagerへ委譲。
- loadList/showListをtakeover中はno-op化。
- 旧MutationObserverをtakeover中は開始しないようガード。
- tenotsuForceShowMenuFallbackを旧メニュー表示ではなくoffice委譲に変更。

リポジトリ直下へ展開して上書きしてください。
