# 雪乃の表情テスト：消えた贈りもの

- シナリオID: `yukino_expression_25_test`
- バージョン: `v039_301`
- 登場人物: 氷神 雪乃（`ag`）
- 表情素材: `images/assets/char/ag_yukino/standing`
- 背景: `images/assets/bgev/bg_office_hidamari.png`
- 導線: 回想アルバム → その他
- 終了後: 回想アルバムの「その他」へ戻る

## 目的

雪乃の採用済み正式25表情について、最新manifestの画像パスで表示、切替、透過、位置、トリミングを一巡確認する。

シナリオ本文の各表情行には `［番号/25 表情名］` を表示し、`expressionId`、`expressionLabel`、画像パスをmanifestと一致させています。

## 再生上の注意

- 背景は冒頭で強制置換します。
- 立ち絵は中央固定で、各表情ごとに明示的に差し替えます。
- 未対応の `BGM`、`SE`、`auto`、`wait` は使用しません。
- 最後に空クリックを置かず、確認完了メッセージで終了します。
