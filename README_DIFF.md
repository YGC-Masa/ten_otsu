# v039_121 双沢姉妹部屋＋みなと公園正式背景差し替え

## 目的

アップロード済み画像を使い、双沢姉妹の共有部屋背景と、みなと公園関連の正式背景を追加します。

## 追加アセット

- images/assets/bg/bg_sugosawa_room_day.png
- images/assets/bg/bg_sugosawa_room_night_indirect.png
- images/assets/bg/bg_sugosawa_room_night_light_on.png
- images/assets/bg/bg_minato_event_plaza.png
- images/assets/bg/bg_minato_event_plaza_festival.png
- images/assets/bg/bg_minato_seaside_fence_day.png

## 変更

- backgroundCatalog.js に上記6背景を登録
- 美空の部屋/夜空の部屋の旧カタログは双沢姉妹共有部屋への互換参照に変更
- townEncounterConfig.js に「みなと公園・イベント広場」「みなと公園・海の見える柵」を追加
- 夜空キー2-2「美空だけでいいでしょ」の暫定背景を正式背景へ差し替え
- version.js / state.js / office.js / index.html を v039_121 に更新

## 注意

このZIPは v039_120 以降への上書き差分です。
今回は新規背景アセットのため画像を同梱しています。以後のパッチではこれらの重い画像は再同梱しない運用です。
