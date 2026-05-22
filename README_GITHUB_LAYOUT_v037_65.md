# v037_65 GitHub配置

## 推奨配置

```text
repo-root/
├─ index.html
├─ serviceWorker.js
├─ program/
├─ scenario/
└─ images/
```

## 起動

GitHub Pagesでは `repo-root/index.html` が起動ファイルです。

## 分割アップロード

- `ten_otsu_program_v037_65.zip` → `program/` に展開
- `ten_otsu_scenario_v037_65.zip` → `scenario/` に展開
- `ten_otsu_images_v037_65.zip` → `images/` に展開
- `index.html` と `serviceWorker.js` はリポジトリ直下に配置

## パス方針

- プログラム：`program/`
- シナリオ：`scenario/scenario/`
- メニュー：`scenario/listmenu/`
- ランダム表示：`scenario/random/`
- 画像/音声：`images/assets/`

旧 `images/assets/` 参照は廃止し、`images/assets/` に統一しています。


## v037_65 start000 修正

- 初期シナリオを `start000.json` に統一。
- 互換用に `000start.json` も同内容で配置。
- `program/script.js` の `currentScenario` を `start000.json` に修正。
- Service Worker に `start000.json` / `000start.json` を追加。


## v037_65 パス修正

`repo-root/index.html` 起動時、`fetch()` や `img.src` は `program/` ではなく `index.html` の位置を基準に解決されます。

そのため、`program/config.js` を以下のように修正しました。

- `scenarioPath: "scenario/scenario/"`
- `menuPath: "scenario/listmenu/"`
- `randomPath: "scenario/random/"`
- `assetPath: "images/assets/"`
- 画像/音声系も `images/assets/...`

これにより GitHub Pages 上で `../scenario/...` を読みに行って404になる問題を修正しています。


## v037_65 背景パス修正

ADVシナリオの背景ファイルは `images/assets/bgev/` にあります。

v037_64では `program/config.js` の `bgPath` が `images/assets/bg/` になっていたため、`title.jpg` や `bg_school.jpg` などが404になっていました。

修正後：

```js
bgPath: "images/assets/bgev/"
```

バトル背景 `battle_store_lv1.png` は `program/battle.js` で `images/assets/bg/battle_store_lv1.png` を直接参照しているため、バトル背景には影響しません。
