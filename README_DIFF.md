# ten_otsu v039_68 → v039_69 diff

## 内容

ビリビリ電機との VS CPU バトルを追加する差分です。
通常営業は既存のデッキ接客バトルを維持し、店舗営業メニューの「バトル営業 / VSビリビリ」のみ専用バトルへ分岐します。

## 主な追加

- `program/v039/rivalBattle.js`
- `program/v039/rivalBattle.css`
- `images/assets/rival/` の小春・真冬・なつ立ち絵 / カットイン / アイキャッチ
- `BattleProto.openBattle()` のラップによる `battleType: "rival"` 分岐
- CPU小春・真冬・なつのスキル発動
- 家電星人取り合いスコア、勝敗判定、家電星人ポイント、ビリビリ親愛度

## 注意

v039_69 はVS CPU初期実装です。難易度、報酬量、カットイン演出、なつのポーズ差は後続調整対象です。
