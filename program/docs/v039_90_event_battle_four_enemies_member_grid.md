# v039_90 イベントバトル画面修正

## 目的

イベントバトル画面で以下の問題を修正する。

- 敵枠が4体想定なのに、旧保存データ由来で6体表示される場合がある
- 一番上の情報枠に余白が多く、横画面の表示効率が悪い
- ひだまりメンバーが5人デッキ表示のままで、13人全員を使えない
- 敵カード画像の参照パスが見えづらく、画像が表示されないように見える

## 実装

### 敵表示

- `MAX_EVENT_ENEMIES = 4` を維持
- 描画時に `activeEncounter.enemies.slice(0, 4)` を使用
- 旧保存データの読み込み時にも4体へ正規化
- 敵が4体未満の場合は補充
- 画像パスは全敵で再補完

### 敵画像パス

以下のパスに統一。

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

### ひだまりメンバー表示

- イベントバトル中はデッキ5人ではなく13人全員を表示
- 5列×3行の15枠グリッド
- 13人分を表示し、残り2枠は空き枠
- 各メンバー枠の右側にキャラ画像を表示

### 上部情報枠

- パディング・ギャップ・カード内余白を縮小
- HUD、説明、準備品を上部枠内に維持しつつ圧縮

## 備考

敵画像が表示されない原因として、旧保存データ内の敵が画像パスを持っていない、または旧バージョンの6体エンカウントを保持している可能性があるため、今回の正規化で補正する。
