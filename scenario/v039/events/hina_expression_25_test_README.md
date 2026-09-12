# 緋奈 25表情テスト

## 成果物

- シナリオ: `hina_expression_25_test.json`
- 対象キャラID: `aa`
- 使用アセット: `images/assets/char/aa_hina/standing/aa_hina_expression_01.webp` ～ `25.webp`
- 背景: `images/assets/bgev/bg_office_hidamari.png`
- 回想アルバム: 「その他」タブへ常設登録

既存の25表情リファレンスシートに合わせ、01から25までを一度ずつ順番に表示する。
各緋奈ステップには機械確認用の `expressionId` と `expressionLabel` を付与し、本文にも手動確認用の番号と名称を表示する。

## 表情対応表

| ID | 表情 | アセット |
|---:|---|---|
| 01 | 澄まし | `aa_hina_expression_01.webp` |
| 02 | やさしい微笑み | `aa_hina_expression_02.webp` |
| 03 | 笑顔 | `aa_hina_expression_03.webp` |
| 04 | 怒り | `aa_hina_expression_04.webp` |
| 05 | 軽い嫌悪 | `aa_hina_expression_05.webp` |
| 06 | 悲しみ | `aa_hina_expression_06.webp` |
| 07 | 心配 | `aa_hina_expression_07.webp` |
| 08 | 動揺 | `aa_hina_expression_08.webp` |
| 09 | 驚き | `aa_hina_expression_09.webp` |
| 10 | 照れ | `aa_hina_expression_10.webp` |
| 11 | 期待 | `aa_hina_expression_11.webp` |
| 12 | 得意げ | `aa_hina_expression_12.webp` |
| 13 | 舌出しウィンク | `aa_hina_expression_13.webp` |
| 14 | 歯見せウィンク | `aa_hina_expression_14.webp` |
| 15 | 困り笑い | `aa_hina_expression_15.webp` |
| 16 | 決意 | `aa_hina_expression_16.webp` |
| 17 | 伏し目の余韻 | `aa_hina_expression_17.webp` |
| 18 | 拗ね | `aa_hina_expression_18.webp` |
| 19 | 涙笑い | `aa_hina_expression_19.webp` |
| 20 | 無言の圧 | `aa_hina_expression_20.webp` |
| 21 | 黒い微笑み | `aa_hina_expression_21.webp` |
| 22 | 安堵 | `aa_hina_expression_22.webp` |
| 23 | 見惚れ／ときめき | `aa_hina_expression_23.webp` |
| 24 | 眠い | `aa_hina_expression_24.webp` |
| 25 | 照れ隠し怒り | `aa_hina_expression_25.webp` |

## 回想アルバム登録

`scenario/v039/recollectionIndex.js` に `hina_expression_25_test` として登録済み。
「その他」タブから起動でき、終了後は同じ回想メニューへ戻る。

通常の遭遇イベントには出現しないよう `encounter.enabled: false` を指定している。

## QA項目

- JSONとして読み込めること
- 表情IDが01～25で重複・欠番なしであること
- 各 `expressionId` とファイル末尾番号が一致すること
- 25アセットがすべて存在すること
- 透過縁、顔の位置、足元の切れ方、拡大率に不自然な差がないこと
- 04、18、25など姿勢が大きく異なる素材で表示位置が跳ねないこと
- 最終行に「確認完了」が表示され、回想メニューへ戻れること

## 演出上の注意

現行の `v039` ストーリープレイヤーは、背景切替と立ち絵切替を処理するが、ステップ単位の `bgm`、`se`、`auto`、`wait` は処理しない。
そのため本シナリオでは未対応タグを使用せず、背景フェードと25枚の立ち絵切替のみで確実に再生できる構成にしている。

## 既知の確認ポイント

リポジトリ内の25アセットは全て存在するが、画像ピクセル寸法は統一されていない。
シナリオ側は `side: center`、`left: 50%` で統一しているため、実機では表情切替時の見かけの大きさと重心を重点確認する。
