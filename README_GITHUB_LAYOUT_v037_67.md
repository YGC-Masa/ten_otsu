# v037_67 タイトルタイル画像修正

## 修正内容

タイトルのランダムタイル画像が出ない問題を修正。

原因は `scenario/random/imageset01.json` の `picpath` が `../images/assets/ev/` のままで、`repo-root/index.html` 起動時にリポジトリ外を参照していたことです。

## 修正後

```json
{
  "fixed": "../bgev/logofusen.png",
  "picpath": "images/assets/ev/"
}
```

固定画像は `images/assets/ev/../bgev/logofusen.png` として解決され、実体の `images/assets/bgev/logofusen.png` を参照します。

また `program/randomShows.js` に簡易パス解決関数と画像読み込み失敗ログを追加しました。
