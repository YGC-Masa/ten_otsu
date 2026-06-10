# v039_153 夜空40帯シナリオ復旧パッチ

## 内容

- v039_152適用後に参照先から抜けていた夜空40帯シナリオを復旧。
- `yozora_affection_40_00_main.json` = 「嬉しいのに、苦しい」を再同梱。
- `yozora_affection_40_01_key.json` / `40_02_key.json` / `40_03_key.json` も再同梱。
- 夜空メイン40演武用の専用立ち絵・イベントCG素材を同梱。
- `scenario/v039/storyIndex.js` は40帯参照を含む状態で再同梱。
- v039_152の50〜100正式JSON再同期内容は維持。

## 復旧対象

```text
scenario/v039/events/yozora_affection_40_00_main.json
scenario/v039/events/yozora_affection_40_01_key.json
scenario/v039/events/yozora_affection_40_02_key.json
scenario/v039/events/yozora_affection_40_03_key.json
```

## 同梱アセット

```text
images/assets/char/misora_budo_gi_main40.png
images/assets/char/yozora_budo_gi_main40.png
images/assets/cg/cg_yozora_main40_misora_enbu.png
images/assets/cg/cg_yozora_main40_yozora_kyudo_enbu.png
```

## 適用前提

```text
v039_152以降へ上書き
```
