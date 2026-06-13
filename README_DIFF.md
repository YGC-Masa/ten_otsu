# ten_otsu v039_186 差分パッチ

## 適用前提
- v039_185 適用済みの状態へ上書き。

## 修正内容
### 対象シナリオ
- Lv.63：`yozora_affection_60_01_key.json`「店長、大丈夫？」
- Lv.65：`yozora_affection_60_02_key.json`「一生面倒見るって、どういう意味」
- Lv.68：`yozora_affection_60_03_key.json`「店長のあったかさ」
- Lv.70：`yozora_affection_70_00_main.json`「忘れて、でも忘れないで」

### 個別修正
- **一生面倒見るって、どういう意味**
  - ステップ1背景を `images/assets/bgev/bg_office_hidamari.png` に変更。

- **店長のあったかさ**
  - ステップ1背景を `images/assets/bgev/bg_office_hidamari.png` に変更。
  - ステップ158背景を `images/assets/bg/bg_hidamari_store_salesfloor_night.png` に変更。
  - ステップ158以降の双子立ち絵を冬服に切替。
    - 美空：`images/assets/char/misora_coat_muffler_main50.png`
    - 夜空：`images/assets/char/yozora_coat_main50.png`
  - ステップ198で夜空を非表示に調整。

### 同時表示対応
- 上記4本について、双沢美空・双沢夜空の同席場面を同時表示に調整。

### バージョン表示更新
- `index.html`
- `VERSION.txt`
- `program/v039/version.js`
- `scenario/v039/storyIndex.js` の対象4本 version を `v039_186` に更新。

## 備考
- 新規画像なし。
- シナリオファイル本体修正。
