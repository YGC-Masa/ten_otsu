# ten_otsu v039_194 差分パッチ

## 適用前提
- v039_193 適用済みの状態へ上書き。

## 修正内容
### ストーリー：ちゃんと謝りたい
- `yozora_affection_70_01_key.json`
- ステップ227の `――` 4個分を、4ステップに分解。

### ストーリー：言えなかったこと
- `yozora_affection_70_02_key.json`
- 美空立ち絵を全体で変更。
  - `images/assets/char/misora_coat_muffler_main50.png`
- 夜空立ち絵を全体で変更。
  - `images/assets/char/yozora_coat_main50.png`
- ステップ26を「若葉中央公園・夜」へ変更。
- ステップ26背景を変更。
  - `images/assets/bg/bg_wakaba_central_park_winter_night.png`
- ステップ197テキストを指定文へ変更。
- ステップ227の `――` 4個分を、4ステップに分解。

## バージョン更新
- `index.html`
- `VERSION.txt`
- `program/v039/version.js`
- `scenario/v039/storyIndex.js` の対象2本 version を `v039_194` に更新。

## 分解結果
- ちゃんと謝りたい step227: 4ステップ
- 言えなかったこと step227: 4ステップ
