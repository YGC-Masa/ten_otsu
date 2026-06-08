# v039_128 起動復旧＋親愛テスト設定パッチ

## 概要
v039_127以降へ上書きする軽量差分です。

## 修正内容
- `program/v039/office.js` 先頭コメント破損を修正し、`Uncaught SyntaxError: Invalid or unexpected token` を解消
- `ns.enterOffice is not a function` の原因になっていた `office.js` 実行停止を復旧
- `index.html` のキャッシュバスターを `?v=v039_128` の短い英数字版に整理
- 親愛Lvの初期値を100扱いに変更
- 設定画面に「親愛Lvを全員100へ」ボタンを追加
- 設定画面に「親愛ストーリーを全クリア」ボタンを追加

## 更新ファイル
- index.html
- VERSION.txt
- README_DIFF.md
- program/v039/version.js
- program/v039/state.js
- program/v039/office.js
- program/v039/storyProgress.js

## 確認ポイント
1. ブラックアウトせず事務所画面へ入れる
2. Consoleに `Invalid or unexpected token` が出ない
3. `ns.enterOffice is not a function` が出ない
4. 設定画面に親愛Lv100化ボタンと親愛ストーリー全クリアボタンが表示される
5. メンバー画面で親愛Lvが初期100扱いになり、Lv91〜100段まで確認できる
