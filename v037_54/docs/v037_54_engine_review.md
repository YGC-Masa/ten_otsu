# v037_54 ゲームエンジン見直しメモ

## 対応内容

- 起動フラッシュ後に画面が止まる問題に対して、エンジン初期化ガードを追加。
- 起動後2.6秒経ってもメニュー/リスト/バトルが表示されない場合、フォールバックメニューを表示。
- `window.onerror` / `unhandledrejection` を記録し、ブラウザコンソールに原因を出すようにした。
- メニューの `battle` アクションを `BattleProto.openBattle()` 優先に変更。
- `loadMenu` / `loadList` / `loadScenario` / `clearAppCacheAndReload` を `window` に公開。
- 起動フラッシュ系レイヤーがUIを塞がないよう、CSSで `pointer-events: none` を指定。
- 古い `script.bak` とルート直下の不要txtを削除し、GitHub 100ファイル制限に対応。
- Service Workerのキャッシュ名を `tenotsu-v037-54` に更新。

## 目的

今回の修正は、バトル画面単体ではなく、起動・メニュー・画面遷移を含むゲームエンジン側の安定化です。
