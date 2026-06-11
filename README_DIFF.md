# v039_163 boot surface guard patch

## 内容
- 起動直後の黒背景中に、右上ST/BP HUD、テキストボックス、右メニュー断片、バージョン表示が先に見えてしまう問題を補正。
- 表示サーフェス順の問題として、初期化完了まで専用の黒いガード面を最前面に置く。
- `enterOffice()` 完了後に `data-tenotsu-boot-ready="1"` を立て、通常UIを表示する。

## 追加ファイル
- `program/v039/bootSurfaceGuard.css`
- `program/v039/bootSurfaceGuard.js`

## 更新ファイル
- `index.html`
- `VERSION.txt`
- `program/v039/version.js`
- `program/v039/state.js`
- `program/v039/office.js`

## 適用前提
- v039_162以降へ上書き
