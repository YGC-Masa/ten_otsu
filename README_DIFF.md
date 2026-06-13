# ten_otsu v039_184 差分パッチ

## 適用前提
- v039_183 適用済みの状態へ上書き。

## 修正内容
- 対象ストーリー：双沢 夜空 親愛Lv.18「気づかなくていい疲れ」
- 対象ファイル：`scenario/v039/events/yozora_affection_10_03_key.json`

### 立ち絵変更
- ステップ83〜最後まで、`storySprites` が指定されている全ステップの立ち絵を以下へ統一。
  - 美空：`images/assets/char/misora_main20_upper.png`
  - 夜空：`images/assets/char/yozora_main20_upper.png`

### バージョン表示更新
- `index.html` を同梱し、タイトルおよび読み込みキャッシュバスターを `v039_184` に更新。
- `program/v039/version.js` を更新し、画面左下バージョン表示・右メニュー上のバージョン情報に `v039_184` が出るように更新。
- `VERSION.txt` を更新。

## 備考
- セリフ本文変更なし。
- 新規画像なし。
- シナリオファイル本体修正。
