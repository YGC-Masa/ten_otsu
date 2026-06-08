# v039_139 = 夜空メイン40CG範囲調整＋イベントCG終了時クリアパッチ

## 適用前提

v039_138 以降へ上書きする軽量差分です。
画像アセットは同梱していません。

## 修正内容

### 夜空メイン40「嬉しいのに、苦しい」

対象:

```text
scenario/v039/events/yozora_affection_40_00_main.json
```

- ステップ28〜34は通常背景に戻し、美空演武CGを表示しないよう調整
- ステップ35〜44で美空演武イベントCGを表示
- ステップ69から夜空弓道演武イベントCGを表示
- 夜空演武の退場描写後にイベントCGを解除
- 旧ステップ69内の複数の「――」地の文を3ステップへ分割
- 旧ステップ78内の複数の「――」地の文を2ステップへ分割

使用CG:

```text
images/assets/cg/cg_yozora_main40_misora_enbu.png
images/assets/cg/cg_yozora_main40_yozora_kyudo_enbu.png
```

### イベントCG残留対策

対象:

```text
program/v039/storyPlayer.js
```

- シナリオ開始時に古いイベントCG状態をクリア
- `hideEventCg` 実行時にイベントCG直前の背景へ復帰
- シナリオ終了時に `hideEventCgSurface()` を必ず呼び、回想メニューやメンバー画面へ戻った後にイベントCGが残らないよう修正

## 更新ファイル

```text
index.html
VERSION.txt
README_DIFF.md
program/v039/version.js
program/v039/state.js
program/v039/office.js
program/v039/storyPlayer.js
scenario/v039/events/yozora_affection_40_00_main.json
```
