# v039_69 biribiri VS CPU battle

## 目的

v039_68 の通常デッキ接客バトルを維持しながら、店舗営業メニューの「バトル営業 / VSビリビリ」だけを専用の VS CPU バトルへ差し替える。

通常営業とイベント営業は従来の `BattleProto.openBattle()` を使用する。
バトル営業のみ `rivalBattle.js` が `BattleProto.openBattle()` をラップし、`battleType: "rival"` を検知してビリビリ専用バトルを開く。

## 追加ファイル

- `program/v039/rivalBattle.js`
- `program/v039/rivalBattle.css`
- `images/assets/rival/koharu_stand.png`
- `images/assets/rival/koharu_cutin.png`
- `images/assets/rival/mafuyu_stand.png`
- `images/assets/rival/mafuyu_cutin.png`
- `images/assets/rival/natsu_stand.png`
- `images/assets/rival/natsu_cutin.png`
- `images/assets/rival/biribiri_battle_eyecatch.jpeg`

## 実装内容

- 小春・真冬・なつを上段CPUカードとして表示。
- 家電星人をひだまり側とビリビリ側で取り合う VS CPU ルールを追加。
- ひだまり側スコアとビリビリ側スコアを別管理。
- ビリビリ側は一定間隔で家電星人を引き寄せ、横取りスコアを得る。
- `applianceAliens.js` の家電星人二重個性とビリビリ必殺技テーブルを利用。
- 小春・真冬・なつの必殺技をCPUがゲージ式でランダム発動。
- なつの魅了カウント、真冬の倍率低下・リキャスト妨害、小春のスコア強化を反映。
- 店長HELPで迷っている家電星人をひだまり側へ呼び戻せる。
- 勝敗結果で家電星人金貨、ビリビリ親愛度、メンバーEXPを付与。
- 月間イベント用の「ブラック家電星人共闘ストーリー」は設定保存済みとして、今回の実装ではバトル基盤のみ追加。

## 注意

v039_69 は最初の VS CPU 実装であり、難易度・報酬量・スキル発動頻度は今後調整前提。
イベント営業のドラムリズムボス戦は未実装。
