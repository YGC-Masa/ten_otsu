# ten_otsu diff v039_99 to v039_100

## 内容
- イベントバトルのメンバーカード表示を再調整。
- メンバー画像を右寄せ背面にし、テキストを前面にオーバーレイするが、テキスト表示幅を広げて縦細長化を抑制。
- ブラック家電星人イベント解放シナリオで、家電星人・人物がセンターに重なり続ける問題を修正。
- 店長・システム・ナレーションでは立ち絵を非表示、登場人物は発話者ごとに交代表示。
- story sprite renderer側にも最大5体までのスロット正規化を追加。

## 変更ファイル
- program/v039/eventBattle.css
- program/v039/layers.js
- scenario/v039/events/event_black_kadenseijin_battle_unlock_003_ayame_line_fix.json
- scenario/data/event_black_kadenseijin_battle_unlock_003_ayame_line_fix.source.json
- program/docs/v039_100_event_ui_story_sprite_fix.md
