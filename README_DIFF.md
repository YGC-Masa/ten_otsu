# v039_140 夜空メイン50専用立ち絵＋帰り道CG追加

## 内容

夜空メイン50「探さないで、の前兆」を、専用冬衣装立ち絵・正式帰り道背景・イベントCGに合わせて調整しました。

## 変更点

- ステップ20以降：美空を冬コート立ち絵、夜空を冬コート立ち絵へ切り替え
- ステップ37以降：美空をマフラー付き冬コート立ち絵へ切り替え
- ステップ125：店長マンション前の帰り道・夜背景へ変更
- ステップ199：夜空帰り道イベントCGを表示開始
- ステップ258：イベントCGを解除
- ステップ293付近：双沢家の夜背景へ変更し、美空をパジャマ立ち絵へ切り替え
- シナリオ内の「\n――」混在が出ないよう、地の文を独立ステップ化

## 追加アセット

```text
images/assets/char/misora_coat_main50.png
images/assets/char/yozora_coat_main50.png
images/assets/char/misora_coat_muffler_main50.png
images/assets/char/misora_pajama_main50.png
images/assets/cg/cg_yozora_main50_return_road.png
```

## 更新ファイル

```text
index.html
VERSION.txt
README_DIFF.md
program/v039/version.js
program/v039/state.js
program/v039/office.js
scenario/v039/events/yozora_affection_50_00_main.json
```

これは v039_139 以降へ上書きする差分パッチです。
