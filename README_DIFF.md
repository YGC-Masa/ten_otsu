# v038_20 → v038_21 shop menu takeover 差分

## 修正内容
- randomImagesOn() をsurface takeover中は完全no-op化。
- buildRandomImages() にもtakeover guardを追加。
- 事務所モードでは右6大メニューを常時表示。
- ショップクリック時はshopモードへ切替え、右6大メニューをショップ専用メニューへ入れ替え。
- ショップ中は #tenotsu-main-menu 非表示、#tenotsu-shop-menu 表示。
- 中央ショップパネルの重複ボタンを廃止。

リポジトリ直下へ展開して上書きしてください。
