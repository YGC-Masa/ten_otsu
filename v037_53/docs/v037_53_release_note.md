# v037_53 リリースメモ

## 修正内容

- メニューからバトル画面を開けない不具合を修正。
- 原因：`renderStaff(s)` 内に存在しない `staff.cardImage` 参照が混入していたため。
- 対応：カード表示は `s.cardImage` / `member-card-art` に統一。
- 緋奈のカード/カットイン画像は `assets2/character/card_hina_test.png` と `assets2/cutin/cutin_hina_test.png` に統一済み。
- ZIP内ファイル数を GitHub の100ファイル制限に合わせて100個以内へ整理。

## 画像運用

- バトルカード：`assets2/character/card_xxx_test.png`
- 必殺カットイン：`assets2/cutin/cutin_xxx_test.png`
- 家電星人：`assets2/enemy/enemy_xxx_test.png`

## 注意

- 過去版の細かいdocsは削除し、このリリースメモに統合。
- 実行に必要なHTML/CSS/JS/画像/JSONは保持。
