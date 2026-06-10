# v039_152 夜空50-100正式JSON再同期＋50帯背景修正パッチ

## 内容

- ユーザー提供の `yozora_affection_50_100_official_all_json_set_v039_108.zip` を基準に、夜空50〜100帯シナリオを正式版へ再同期。
- 50-1「少し一人にして」を正式版へ復旧し、背景を添付のひだまりストア店内売り場へ変更。
- 50-2「夜空の行きそうな場所」を正式版へ復旧し、序盤の美空を通話ではなく店内にいる扱いへ修正。
- 50-2の運動公園シーンを `images/assets/bg/bg_hiyorizaka_sports_park_midnight.png` へ差し替え。
- 100「春の中で、ありがとう」は専用白ワンピース立ち絵と春待ち花畑イベントCG指定を維持。
- `scenario/v039/storyIndex.js` を公式リストに合わせて再構築。
- セリフ内の `\n――` 地の文を `speaker:""` の独立ステップへ分離。

## 追加アセット

```text
images/assets/bg/bg_hidamari_store_salesfloor_night.png
images/assets/char/yozora_story100_special.png
```

## 更新ファイル

```text
index.html
VERSION.txt
README_DIFF.md
program/v039/version.js
program/v039/state.js
program/v039/office.js
scenario/v039/backgroundCatalog.js
scenario/v039/storyIndex.js
scenario/v039/events/yozora_affection_50_01_key.json
scenario/v039/events/yozora_affection_50_02_key.json
scenario/v039/events/yozora_affection_50_03_key.json
scenario/v039/events/yozora_affection_60_00_main.json
scenario/v039/events/yozora_affection_60_01_key.json
scenario/v039/events/yozora_affection_60_02_key.json
scenario/v039/events/yozora_affection_60_03_key.json
scenario/v039/events/yozora_affection_70_00_main.json
scenario/v039/events/yozora_affection_70_01_key.json
scenario/v039/events/yozora_affection_70_02_key.json
scenario/v039/events/yozora_affection_70_03_key.json
scenario/v039/events/yozora_affection_80_00_main.json
scenario/v039/events/yozora_affection_80_01_key.json
scenario/v039/events/yozora_affection_80_02_key.json
scenario/v039/events/yozora_affection_80_03_key.json
scenario/v039/events/yozora_affection_90_00_main.json
scenario/v039/events/yozora_affection_90_01_key.json
scenario/v039/events/yozora_affection_90_02_key.json
scenario/v039/events/yozora_affection_90_03_key.json
scenario/v039/events/yozora_affection_100_00_main.json
```

## 適用前提

v039_151以降へ上書き。
