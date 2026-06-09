# v039_144 = 若葉中央公園冬背景＋夜空70-80帯リライト反映パッチ

## 適用前提

v039_143以降へ上書き。

## 追加背景

```text
images/assets/bg/bg_wakaba_central_park_winter_night.png
images/assets/bg/bg_wakaba_central_park_winter_day.png
images/assets/bg/bg_wakaba_central_park_winter_evening.png
images/assets/bg/bg_wakaba_central_park_winter_morning.png
```

## backgroundCatalog 追加

```text
wakaba_central_park_winter_night
wakaba_central_park_winter_day
wakaba_central_park_winter_evening
wakaba_central_park_winter_morning
wakaba_central_park_winter
```

## リライト反映シナリオ

```text
scenario/v039/events/yozora_affection_70_01_key.json
scenario/v039/events/yozora_affection_70_02_key.json
scenario/v039/events/yozora_affection_70_03_key.json
scenario/v039/events/yozora_affection_80_00_main.json
```

## 整備内容

- 夜空キー7-1「ちゃんと謝りたい」を反映
- 夜空キー7-2「言えなかったこと」を反映
- 夜空キー7-3「帰ったら、好きなものの話をしよう」を反映
- 夜空メイン8「一緒だね」を反映
- 若葉中央公園・夕方指定を冬・雪なし夕方背景へ差し替え
- セリフ内の `\n――` 地の文を `speaker: ""` の独立ステップへ分離
- office.js の先頭コメント破損が出ない形式を維持
