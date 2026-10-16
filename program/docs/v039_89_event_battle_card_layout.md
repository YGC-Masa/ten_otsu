# v039_89：イベントバトル画面レイアウト再整理

## 目的
イベントバトル画面を、汚れた家電星人4体＋ひだまり出撃メンバー5名のカードバトル画面として整理する。

## 変更内容

- 画面上部の囲いに、従来のボス説明・ステータス・つくも準備品・課金想定アイテムを集約。
- 敵表示を6体から4体へ変更し、1列4体のカード表示へ整理。
- 敵カード右側に、添付された汚れた家電星人画像を表示。
- ひだまりメンバー出撃枠の右側に、各メンバーのキャラクター画像を表示。
- 敵カードをダブルクリックすると、イベントBP1を消費して敵をチェンジ。
- イベントリキャストクリアとイベントBP回復クリスタルを課金想定アイテムとして追加。

## 追加素材

```text
images/assets/event/dirty_alien_01.webp
images/assets/event/dirty_alien_02.webp
images/assets/event/dirty_alien_03.webp
images/assets/event/dirty_alien_04.webp
images/assets/event/dirty_alien_05.webp
images/assets/event/dirty_alien_06.webp
images/assets/event/dirty_alien_07.webp
images/assets/event/dirty_alien_08.webp
images/assets/event/dirty_alien_09.webp
images/assets/event/dirty_alien_10.webp
images/assets/event/dirty_alien_11.webp
images/assets/event/dirty_alien_12.webp
images/assets/event/dirty_alien_13.webp
```

## 備考
課金想定アイテムは、現時点では実決済ではなく「購入(仮)」で所持数を増やすテスト実装。
