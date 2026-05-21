# v037_63 → v037_64 差分ZIP

## 内容

このZIPは、v037_63 から v037_64 への差分ファイルのみを含みます。

## 主な修正

- `repo-root/index.html` 起動時の404対策。
- `program/config.js` のパスを、`../scenario/...` から `scenario/...` に修正。
- 画像/音声パスを `images/assets/...` 基準へ修正。
- `serviceWorker.js` のキャッシュ名とキャッシュ対象を v037_64 用に更新。
- `program/*.js` 内の実行時参照パスを `repo-root/index.html` 基準に調整。

## 上書き対象

このZIPをGitHubリポジトリ直下へ展開して、既存ファイルへ上書きしてください。

## 変更ファイル数

- 変更/追加: 12
- 削除対象: 1

## 削除対象

- `README_GITHUB_LAYOUT_v037_63.md`
