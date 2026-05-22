# GitHub配置 / 運用メモ

## 基本配置

```text
repo-root/
├─ index.html
├─ serviceWorker.js
├─ program/
├─ scenario/
└─ images/
```

## 起動

GitHub Pagesでは `repo-root/index.html` を起動します。

## フォルダ

- `program/` : HTMLから読み込むJS/CSS/manifestなど
- `scenario/scenario/` : ストーリーJSON
- `scenario/listmenu/` : メニューJSON
- `scenario/random/` : タイトルタイル等のランダム表示JSON
- `images/assets/` : 画像・音声アセット

## ドキュメント運用

版数付きMDを増やさず、以下の固定ファイルを上書き更新します。

- `README_GITHUB_LAYOUT.md`
- `program/docs/release_notes.md`
- `program/docs/menu_layout.md`
- `program/docs/story_memory.md`
