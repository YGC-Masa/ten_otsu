# v039_74 差分: 店舗営業開始ボタンのファーストビュー集約

## 目的

店舗営業画面で、右上にスタミナ / BP 表示が既にあるため、選択中モードの詳細欄にあった重複リソース表示と下部の開始導線を整理する。

## 修正内容

- 営業モード選択後、詳細欄右側に開始ボタンを集約
- VSビリビリは `ポイント1を消費して開始` と表示
- 通常営業は `ST10を消費して開始` と表示
- イベント営業は `ST20 + BP1を消費して開始` と表示
- 追加確認ダイアログを挟まず、詳細欄の開始ボタンから直接バトル開始
- 詳細欄の高さを圧縮し、横画面のファーストビュー内に収まりやすく調整
- 既存の上部 ST/BP サマリーを引き続き利用

## 変更ファイル

- index.html
- program/v039/sales.js
- program/v039/core.css
- program/v039/state.js
- program/docs/v039_74_sales_start_cta_compact.md
- README_DIFF.md
- release_notes.md
- VALIDATION.json
- CHECKSUMS.json
