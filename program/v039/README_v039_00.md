# v039_05_shop_bg_path_fix

`index.html` は v039 新コア専用です。旧フレームワークはファイルとして残しますが、indexからは読み込みません。

## v039_05で使う新規ファイル

- program/v039/core.css
- program/v039/state.js
- program/v039/assets.js
- program/v039/layers.js
- program/v039/office.js
- program/v039/app.js


## v039_05

- 右6大メニュー上にバージョン表示を追加。
- 設定メニューにキャッシュクリアして再読み込みを追加。
- Service Worker登録解除、Cache Storage削除、cachebust付きリロードを実行。


## v039_05

- 左下バージョンバッジを非表示化。
- ショップ画面を新コアで実装。
- 事務所の「ショップ」クリックでショップ背景・ショップ専用メニューへ遷移。
- ショップ中は事務所キャラと事務所右6大メニューを非表示。
- 「事務所に戻る」で事務所画面へ復帰。


## v039_05

- ショップ背景パスを `images/assets/bgev/bg_item_exchange_counter.png` に修正。
- v039_04のレイヤー修正と404ループ防止は維持。
