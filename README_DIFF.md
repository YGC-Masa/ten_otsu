# v039_126 夜空Lv61〜90ストーリー一括追加パッチ

## 概要
v039_125以降へ上書きする軽量差分です。
夜空ルートの親愛Lv61〜90帯をまとめて追加しました。

## 追加ストーリー

### Lv61〜70
- Lv.61 キー19：昨日のことは見ないで
- Lv.64 キー20：謝りたいけど言えない
- Lv.67 キー21：ありがとう、の手前
- Lv.70 メイン7：忘れて、でも忘れないで

### Lv71〜80
- Lv.71 キー22：呼んだだけ
- Lv.74 キー23：少し歩いて
- Lv.77 キー24：褒められる練習
- Lv.80 メイン8：今日は、逃げない練習

### Lv81〜90
- Lv.81 キー25：本物の星の話
- Lv.84 キー26：自分のための準備
- Lv.87 キー27：楽しみなのが、少し怖い
- Lv.90 メイン9：羽白湖・本物の星を見る夜

## 更新ファイル
- index.html
- VERSION.txt
- program/v039/version.js
- program/v039/state.js
- program/v039/office.js
- scenario/v039/storyIndex.js
- scenario/v039/keyStoryConfig.js
- scenario/v039/affectionStoryPlan.js
- scenario/v039/events/yozora_affection_60_01_key.json
- scenario/v039/events/yozora_affection_60_02_key.json
- scenario/v039/events/yozora_affection_60_03_key.json
- scenario/v039/events/yozora_affection_70_00_main.json
- scenario/v039/events/yozora_affection_70_01_key.json
- scenario/v039/events/yozora_affection_70_02_key.json
- scenario/v039/events/yozora_affection_70_03_key.json
- scenario/v039/events/yozora_affection_80_00_main.json
- scenario/v039/events/yozora_affection_80_01_key.json
- scenario/v039/events/yozora_affection_80_02_key.json
- scenario/v039/events/yozora_affection_80_03_key.json
- scenario/v039/events/yozora_affection_90_00_main.json

## 背景パス調整
新規背景アセットは同梱していません。
未実装の背景は既存正式背景または暫定背景へ接続しています。

- bg_hidamari_store_closed_night.png → battle_store_lv1.png
- bg_manager_mansion_road_night.png → bg_hiyorizaka_station_night.png
- bg_sugosawa_twin_room_night_lights.png → bg_sugosawa_room_night_light_on.png
- bg_hashiro_lake_* → bg_shiomi_beach_night.png
- bg_wakaba_central_park_* → bg_minato_event_plaza.png

## 確認ポイント
1. バージョン表示が v039_126 になっている
2. メンバー > 双沢 夜空 のストーリー段切替で Lv61〜90 帯が確認できる
3. Lv61/64/67/70、Lv71/74/77/80、Lv81/84/87/90 の各枠が表示される
4. 各ストーリーが404なしで再生できる
