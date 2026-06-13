# ten_otsu v039_197 差分パッチ

## 適用前提
- **v039_196適用済みへ上書き**

## 修正内容
- 対象：夜空 親愛Lv.83〜100の8本
- 人物複数表示対応
  - 美空・夜空の会話ステップは、原則 `storySprites` に2人を同時指定
  - 表示順は **左：美空 / 右：夜空**
- `――` / `ーー` で始まる地の文段落を別ステップ化
- シナリオJSON内タイトルをメニュー正タイトルに同期
- `scenario/v039/storyIndex.js` の対象8本 version を `v039_197` に更新
- `index.html` / `VERSION.txt` / `program/v039/version.js` を `v039_197` に更新

## 対象と処理結果
- `yozora_affection_80_01_key.json`（星は、見えなくても）：154→154ステップ、分離追加 0、残存混在 0
- `yozora_affection_80_02_key.json`（行きたいって言ったら）：161→161ステップ、分離追加 0、残存混在 0
- `yozora_affection_80_03_key.json`（怖いけど、見たい）：165→165ステップ、分離追加 0、残存混在 0
- `yozora_affection_90_00_main.json`（本物の星を見る夜）：206→206ステップ、分離追加 0、残存混在 0
- `yozora_affection_90_01_key.json`（夜のブックカフェ企画）：54→54ステップ、分離追加 0、残存混在 0
- `yozora_affection_90_02_key.json`（アントステラへ行こう）：62→62ステップ、分離追加 0、残存混在 0
- `yozora_affection_90_03_key.json`（二人だから、少し素直になる）：298→298ステップ、分離追加 0、残存混在 0
- `yozora_affection_100_00_main.json`（春の中で、ありがとう）：226→226ステップ、分離追加 0、残存混在 0
