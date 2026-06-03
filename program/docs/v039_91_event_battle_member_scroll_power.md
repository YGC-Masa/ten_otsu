# v039_91 イベントバトル：メンバー清掃力表示・事務所帰還・横スクロールメンバー列

## 変更概要

- イベントバトル画面に「事務所に帰る」ボタンを追加。
- ひだまりメンバー表示を 5x3 の全枠固定表示から、1列5人表示＋横スワイプのローリングスクロール方式へ変更。
- メンバー欄のヘッダーに総合清掃力、即応清掃力、特攻人数を表示。
- 各メンバーカードにも「総合清掃力」を表示し、攻撃力として把握しやすくした。
- 敵カード画像とメンバー画像の参照は v039_90 のパスを維持し、添付済み敵カード13枚を引き続き使用する。

## UI方針

イベントバトルでは敵4体を上段に表示し、ひだまりメンバーは下段に一列表示する。
画面には最大5人分を見せ、横スワイプで全13人を確認できる。
これにより、横画面での表示密度を下げつつ全メンバーを出撃対象として扱える。

## 清掃力表示

- 総合清掃力：選択中の敵に対する全13人分の清掃力合計。
- 即応：リキャストが明けているメンバーだけの清掃力合計。
- 特攻：選択中の敵と属性一致しているメンバー数。

各メンバーの個別カードにも、現在選択中の敵に対する清掃力を表示する。
属性一致時は「特攻」表記を出す。

## 事務所に帰る

上部HUD内に「事務所に帰る」ボタンを追加。
押下時はイベントバトル画面を閉じ、事務所モードへ戻す。

## 画像パス

敵カード画像は以下を使用する。

```text
images/assets/event/dirty_alien_01.png
images/assets/event/dirty_alien_02.png
images/assets/event/dirty_alien_03.png
images/assets/event/dirty_alien_04.png
images/assets/event/dirty_alien_05.png
images/assets/event/dirty_alien_06.png
images/assets/event/dirty_alien_07.png
images/assets/event/dirty_alien_08.png
images/assets/event/dirty_alien_09.png
images/assets/event/dirty_alien_10.png
images/assets/event/dirty_alien_11.png
images/assets/event/dirty_alien_12.png
images/assets/event/dirty_alien_13.png
```

メンバー画像は既存の以下のパスを使用する。

```text
images/assets/char/a10501.webp
images/assets/char/b10501.webp
images/assets/char/c10501.webp
images/assets/char/d10501.webp
images/assets/char/e10501.webp
images/assets/char/f10501.webp
images/assets/char/g10501.webp
images/assets/char/h10501.webp
images/assets/char/i10501.webp
images/assets/char/j10501.webp
images/assets/char/k10501.webp
images/assets/char/l10501.webp
images/assets/char/m10501.webp
```
