# v039_127 夜空Lv91〜100到達ストーリー追加パッチ

## 内容

夜空ルートの親愛度91〜100帯を追加しました。

- Lv.91 キー28：静かな夜のブックカフェ企画
- Lv.94 キー29：デートみたいだな
- Lv.97 キー30：行きたいのは誰なの
- Lv.100 メイン10：二人だから、少し素直になる

## 更新ファイル

- index.html
- VERSION.txt
- program/v039/version.js
- program/v039/state.js
- program/v039/office.js
- scenario/v039/storyIndex.js
- scenario/v039/keyStoryConfig.js
- scenario/v039/affectionStoryPlan.js
- scenario/v039/events/yozora_affection_90_01_key.json
- scenario/v039/events/yozora_affection_90_02_key.json
- scenario/v039/events/yozora_affection_90_03_key.json
- scenario/v039/events/yozora_affection_100_00_main.json

## 背景パス調整

新規画像アセットは同梱していません。
未実装背景は既存背景・暫定背景に接続しています。

- bg_hidamari_store_closed_night.png → battle_store_lv1.png
- bg_sugosawa_twin_room_night_lights.png → bg_sugosawa_room_night_light_on.png
- bg_hidamari_store_front_night.png → bg_hidamari_store_front_night_open.png
- bg_night_book_cafe_entrance.png → battle_store_lv1.png
- bg_night_book_cafe_interior.png → battle_store_lv1.png

## 確認ポイント

1. 起動画面・右メニュー・右下表示が v039_127 になっている
2. メンバー > 双沢 夜空 > ストーリーで Lv.91〜100 段へ切り替えできる
3. キー28〜30とメイン10が表示される
4. メイン10「二人だから、少し素直になる」がLv.100枠に表示される
5. 背景画像404が出ない

これは v039_126 以降へ上書きする軽量差分ZIPです。
