# v039_138 = 夜空メイン30背景調整＋ココアCG追加パッチ

## 適用前提

v039_137以降へ上書きする差分パッチです。

## 修正内容

### 夜空メイン30「白黒ツインルーム」

対象ファイル：

```text
scenario/v039/events/yozora_affection_30_00_main.json
```

- ステップ1〜30の背景を、双沢家前・夜へ変更
- ステップ233以降に「ココアと夜空」イベントCGを表示

## 背景変更

```text
images/assets/bg/bg_sugosawa_room_night_light_on.png
→ images/assets/bg/bg_sugosawa_house_night.png
```

※ GitHub Pages 配下での404回避のため、実装パスは先頭スラッシュなしの相対パスにしています。

## 追加イベントCG

```text
images/assets/cg/cg_yozora_main30_cocoa_room.png
```

ステップ233から表示開始し、シナリオ末尾まで表示します。

## 更新ファイル

```text
index.html
VERSION.txt
README_DIFF.md
program/v039/version.js
program/v039/state.js
program/v039/office.js
scenario/v039/events/yozora_affection_30_00_main.json
images/assets/cg/cg_yozora_main30_cocoa_room.png
```
