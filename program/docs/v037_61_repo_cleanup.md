# v037_69 GitHub整理版

## フォルダ方針

GitHub手動アップロードの100 file制限を避けるため、アップロード単位を3つに分けました。

1. `scenario/` : シナリオ、メニュー、ランダム表示データ
2. `images/` : 画像・音声などのアセット
3. `program/` : HTML/CSS/JSなどゲーム本体

## パス整理

- 旧 `旧assetsフォルダ/` は廃止し、`images/../images/assets/` に統一。
- `program/config.js` の参照先を以下に統一。
  - 背景: `../images/assets/bgev/`
  - キャラ: `../images/assets/char/`
  - BGM: `../images/assets/bgm/`
  - SE: `../images/assets/se/`
  - Voice: `../images/assets/voice/`
  - EV/CG: `../images/assets/ev/`, `../images/assets/cg/`
  - シナリオ: `../scenario/scenario/`
  - メニュー: `../scenario/listmenu/`
  - ランダム: `../scenario/random/`

## GitHubアップロード手順

リポジトリ直下に、以下3フォルダを置いてください。

- `program`
- `scenario`
- `images`

起動ファイルは `program/index.html` です。

## ファイル数

- program: 18
- scenario: 34
- images: 95

## アセット内訳

- bg: 1
- bgev: 9
- bgm: 3
- card: 1
- cg: 1
- char: 11
- character: 13
- cutin: 14
- enemy: 13
- ev: 17
- se: 4
- voice: 8

## 注意

- 過去の `v037_xx/` フォルダは削除して問題ありません。
- ルート直下に残っていた旧JSON/旧アセット/文字化けファイル/バックアップは整理版に含めていません。
- 使えそうな既存シナリオは `scenario/scenario/` に残し、`scenario/listmenu/scenario_index.json` から確認できる導線を追加しました。
