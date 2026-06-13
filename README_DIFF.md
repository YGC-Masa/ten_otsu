# ten_otsu v039_192 差分パッチ

## 適用前提
- v039_191 適用済みの状態へ上書き。

## 修正内容
- 親愛70代のメニューは現行の正しい並びを維持。
- 添付シナリオ4本を対応する本体シナリオへ差し替え。
- 添付シナリオを人物複数表示に対応。

## 差し替え対象
- `scenario/v039/events/yozora_affection_70_01_key.json`
  - タイトル：ちゃんと謝りたい
- `scenario/v039/events/yozora_affection_70_02_key.json`
  - タイトル：言えなかったこと
- `scenario/v039/events/yozora_affection_70_03_key.json`
  - タイトル：帰ったら、好きなものの話をしよう
- `scenario/v039/events/yozora_affection_80_00_main.json`
  - タイトル：一緒だね

## 表示調整
- 美空・夜空の会話ステップは、原則として2人同時表示へ変換。
- 添付シナリオ内の旧背景パスのうち、現行アセットに無いものは既存背景へ置換。

## バージョン表示更新
- `index.html`
- `VERSION.txt`
- `program/v039/version.js`
- `scenario/v039/storyIndex.js` の対象4本 version を `v039_192` に更新。

## 備考
- 新規画像なし。
- メニュータイトルは変更しない。
