# v039_01_version_cache

`index.html` は v039 新コア専用です。旧フレームワークはファイルとして残しますが、indexからは読み込みません。

## v039_01で使う新規ファイル

- program/v039/core.css
- program/v039/state.js
- program/v039/assets.js
- program/v039/layers.js
- program/v039/office.js
- program/v039/app.js


## v039_01

- 右6大メニュー上にバージョン表示を追加。
- 設定メニューにキャッシュクリアして再読み込みを追加。
- Service Worker登録解除、Cache Storage削除、cachebust付きリロードを実行。
