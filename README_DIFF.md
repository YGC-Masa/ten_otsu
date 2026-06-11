# v039_160 = 夜空Lv41-50段落分離＋複数人物同時表示補正パッチ

## 内容
- 夜空Lv41 / Lv44 / Lv47 / Lv50 のシナリオを補正
- セリフ内に混在していた「――」地の文段落を speaker:"" の独立ステップへ分離
- 夜空・美空など2人表示が必要な場面で、片方ずつ交互表示にならないよう storySprites を同時表示指定へ補正
- v039_159 のストーリー一覧UI「親愛Lv.xx / タイトル分離」補正を維持

## 更新対象
- scenario/v039/events/yozora_affection_40_01_key.json
- scenario/v039/events/yozora_affection_40_02_key.json
- scenario/v039/events/yozora_affection_40_03_key.json
- scenario/v039/events/yozora_affection_50_00_main.json
- index.html
- VERSION.txt
- program/v039/version.js
- program/v039/state.js
- program/v039/office.js
- scenario/v039/storyIndex.js
- program/v039/storyMenuLvTitlePatch.js

## 適用前提
- v039_159以降へ上書き
