# v039_50 battle menu trim

## 目的

v039_49で実バトル導線は確認できたため、バトル開始前の店舗営業メニューを整理する。

## 変更内容

- `program/v039/sales.js` の店舗営業パネル下部にあった「事務所に戻る」ボタンを削除。
- 対応する `data-sales-action="back-office"` のイベント登録処理も削除。
- 店舗営業画面では「営業モード選択 → この営業を開始」の導線に集中させる。
- `index.html` と `state.js` のビルド表記を `v039_50` に更新。

## 残すもの

- バトル本体側の「戻る」や「営業終了」は今回は変更しない。
- 店舗営業以外の事務所復帰導線は既存仕様を維持する。

## 確認項目

```json
{
  "salesBackOfficeButtonRemoved": true,
  "salesBackOfficeHandlerRemoved": true,
  "salesStartButtonKept": true,
  "battleImplementationKept": true,
  "buildLabelUpdated": true
}
```
