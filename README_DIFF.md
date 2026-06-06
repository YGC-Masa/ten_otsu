# v039_109 差分

## 目的

ストーリー導線を以下の役割へ分離する。

- 外回り：未読の通常ストーリーを、場所・季節・アイテム確認・スタミナ消費でキャラとエンカウントして見るモード
- 回想：読了済みストーリーを再生する右メニュー
- メンバー個別プロフィール：親愛Lvごとのキーストーリー/メインストーリー管理

## 追加/変更

### 右メニュー

- `ストーリー管理` を `回想` に縮小。
- メイン/キーの進行管理は右メニューから外し、メンバー個別プロフィールへ移動。

### 外回り

- `program/v039/town.js` を外回りエンカウント仕様へ変更。
- 場所を選ぶ。
- アイテム使用でキャラの気配を確認する。
- アイテム使用で季節を変更する。
- 未読通常ストーリーがある場合、ST10消費でエンカウント開始。
- 試作段階ではアイテム個数は未消費扱い。

### メンバー個別プロフィール

- `program/v039/memberStorySlots.js` を追加。
- メンバー詳細の右側に親愛ストーリースロットを表示。
- 親愛Lv.1〜9でキー3本、Lv.10でメイン1本。
- Lv.11〜19でキー3本、Lv.20でメイン2本。
- 同じ構造でLv.100まで予定。
- 試作用に親愛Lvを±1できる小ボタンあり。

### データ

- `scenario/v039/affectionStoryPlan.js` を追加。
- `scenario/v039/townEncounterConfig.js` を追加。
- `scenario/v039/storyIndex.js` に外回り用 placeId / encounter と、夜空キーの親愛スロット情報を追加。
- `scenario/v039/keyStoryConfig.js` に slotStories を追加。

## 注意

このZIPは上書き差分です。
特に以下は上書き対象です。

- index.html
- program/v039/office.js
- program/v039/town.js
- program/v039/members.js
- program/v039/storyMenu.js
- program/v039/storyProgress.js
- scenario/v039/storyIndex.js
- scenario/v039/keyStoryConfig.js

外回りのアイテム在庫・季節変更アイテム消費・親愛Lvの正式上昇処理は次バージョン以降で接続予定。
