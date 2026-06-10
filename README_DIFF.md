# v039_149 = 夜空90代ストーリー索引リンク修正パッチ

## 内容

メンバー > 夜空 > ストーリー選択で表示される内部シナリオリスト `storyIndex.js` を確認し、90代ストーリーのタイトル表示不整合を修正しました。

## 確認結果

- `yozora_affection_90_03_key` のリンク先パス自体は `scenario/v039/events/yozora_affection_90_03_key.json` で正しい
- ただし一覧タイトルが旧/別シナリオ由来の「二人だから、少し素直になる」になっていた
- 実シナリオに合わせて、キー9-3の一覧タイトルを「行きたいのは誰なの」へ修正

## 更新した内部シナリオリスト

```text
夜空キー9-1：静かな夜のブックカフェ企画
夜空キー9-2：デートみたいだな
夜空キー9-3：行きたいのは誰なの
夜空メイン10：春の中で、ありがとう
```

## 更新ファイル

```text
index.html
VERSION.txt
README_DIFF.md
program/v039/version.js
program/v039/state.js
program/v039/office.js
scenario/v039/storyIndex.js
```

## 適用前提

```text
v039_148以降へ上書き
```

画像アセットは同梱していません。
