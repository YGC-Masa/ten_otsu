# v039_161 = 夜空21〜40シナリオ段落・同時表示補正パッチ

## 適用前提

v039_160以降へ上書き。

## 修正内容

- ストーリー21〜40帯のシナリオをチェック
- セリフ内に混在していた「――」段落を `speaker:""` の独立ステップへ分離
- 夜空＋美空など2人表示が必要な場面で、片方ずつ交互表示されないよう `storySprites` を同時表示指定へ補正
- v039_159 の「親愛Lv.xx / タイトル分離」UI補正を維持

## 対象シナリオ

- scenario/v039/events/yozora_affection_20_01_key.json
- scenario/v039/events/yozora_affection_20_02_key.json
- scenario/v039/events/yozora_affection_20_03_key.json
- scenario/v039/events/yozora_affection_30_00_main.json
- scenario/v039/events/yozora_affection_30_01_key.json
- scenario/v039/events/yozora_affection_30_02_key.json
- scenario/v039/events/yozora_affection_30_03_key.json
- scenario/v039/events/yozora_affection_40_00_main.json
- scenario/v039/storyIndex.js

## 確認

対象シナリオ内のセリフ中 `\n――` 混在は 0 件に補正済み。
