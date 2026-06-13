# ten_otsu v039_185 差分パッチ

## 適用前提
- v039_184 適用済みの状態へ上書き。

## 修正内容
- 夜空 親愛Lv.63〜70の正式シナリオを、旧 v039_181 official_id パッチから前方マージ。
- v039_184までの修正を維持しつつ、以下4本のシナリオ本体を正式版に差し替え。

## 対象シナリオ
- 親愛Lv.63：`scenario/v039/events/yozora_affection_60_01_key.json`
  - タイトル：店長、大丈夫？
- 親愛Lv.65：`scenario/v039/events/yozora_affection_60_02_key.json`
  - タイトル：一生面倒見るって、どういう意味
- 親愛Lv.68：`scenario/v039/events/yozora_affection_60_03_key.json`
  - タイトル：店長のあったかさ
- 親愛Lv.70：`scenario/v039/events/yozora_affection_70_00_main.json`
  - タイトル：忘れて、でも忘れないで

## 同梱ファイル
- `scenario/v039/events/yozora_affection_60_01_key.json`
- `scenario/v039/events/yozora_affection_60_02_key.json`
- `scenario/v039/events/yozora_affection_60_03_key.json`
- `scenario/v039/events/yozora_affection_70_00_main.json`
- `scenario/v039/storyIndex.js`
- `index.html`
- `VERSION.txt`
- `program/v039/version.js`

## バージョン表示
- `index.html` のキャッシュバスターを `v039_185` に更新。
- `VERSION.txt` / `program/v039/version.js` を `v039_185` に更新。
- 画面左下・右メニュー上の表示更新用に `TENOTSU_BUILD_VERSION` / `TENOTSU_BUILD_LABEL` / `TENOTSU_V039.VERSION` を更新。

## 備考
- 旧 `ten_otsu_v039_181_yozora63_70_official_id_patch.zip` をそのまま適用せず、必要なシナリオ4本と `storyIndex.js` の該当versionのみを現在系へ前方マージ。
- 旧パッチ同梱の `state.js` / `storyBgPreloadTransition.js` は古い可能性があるため同梱しない。
- 新規画像なし。
