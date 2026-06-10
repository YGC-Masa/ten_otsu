# v039_150 = 夜空90代ストーリー索引タイトル再修正パッチ

## 内容

メンバー > 夜空 > ストーリー選択で表示される内部シナリオリスト `storyIndex.js` の90代タイトルを、実シナリオJSONのタイトルに再同期しました。

## 修正内容

前回 v039_149 で `yozora_affection_90_03_key` を誤って「行きたいのは誰なの」にしていましたが、正しくは「二人だから、少し素直になる」です。

## 更新した内部シナリオリスト

```text
夜空キー9-1：夜のブックカフェ企画
夜空キー9-2：アントステラへ行こう
夜空キー9-3：二人だから、少し素直になる
夜空メイン10：春の中で、ありがとう
```

## 確認済みリンク先

```text
yozora_affection_90_01_key
→ scenario/v039/events/yozora_affection_90_01_key.json

yozora_affection_90_02_key
→ scenario/v039/events/yozora_affection_90_02_key.json

yozora_affection_90_03_key
→ scenario/v039/events/yozora_affection_90_03_key.json

yozora_affection_100_00_main
→ scenario/v039/events/yozora_affection_100_00_main.json
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
v039_149以降へ上書き
```

画像アセットは同梱していません。
