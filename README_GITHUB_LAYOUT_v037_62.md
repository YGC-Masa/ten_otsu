# v037_62 GitHub配置

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

- `ten_otsu_program_v037_62.zip` → `program/` に展開
- `ten_otsu_scenario_v037_62.zip` → `scenario/` に展開
- `ten_otsu_images_v037_62.zip` → `images/` に展開
- `index.html` と `serviceWorker.js` はリポジトリ直下に配置

## パス方針

- プログラム：`program/`
- シナリオ：`scenario/scenario/`
- メニュー：`scenario/listmenu/`
- ランダム表示：`scenario/random/`
- 画像/音声：`images/assets/`

旧 `assets2/` 参照は廃止し、`images/assets/` に統一しています。
