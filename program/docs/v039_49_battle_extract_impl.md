# v039_49 battle extract implementation

`ten_otsu-main (6).zip` に入っていた既存バトルプロトタイプを、v039_47 系の新コアへ接続した差分。

## 追加/変更

- `program/v039/battle.js` を追加
  - 元: `program/battle.js`
  - `BATTLE_VERSION` を `v039_49` に更新
  - close 時に `tenotsu:battle:closed` を dispatch して、v039 側の店舗営業画面へ戻す
- `program/v039/battle.css` を追加
  - 元: `program/style.css` の `#battle-root` スコープ中心のバトルCSS
  - v039 core/story レイヤーと競合しにくいよう、別CSSとして読み込み
- `index.html`
  - `battle.css` と `battle.js` を読み込み
- `program/v039/sales.js`
  - 店舗営業の「営業開始」から `BattleProto.openBattle()` / `startDeckBattlePrototype()` を起動
  - バトルJSが読めない場合のみ従来の簡易デッキ接客へフォールバック

## 実装されたバトル要素

- 30秒制限のデッキ接客バトル
- 家電星人3枠
- メンバー5人デッキ
- 通常接客/ダブルタップ必殺
- サポートプレイ
- 店長HELP
- 敵チェンジ
- デッキ編成
- 売上/成約/コンボ/離脱の表示
- カード・敵・カットイン画像の既存アセット参照

## 注意

`program/battle.js` は元ZIPにも存在していたが、v039_47 の `index.html` からは読み込まれていなかったため、店舗営業から実バトルへ到達できない状態だった。v039_49 では v039 名前空間の店舗営業導線から起動できるようにした。
