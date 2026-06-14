# ten_otsu v039_221 差分パッチ

## 適用前提
- **v039_220適用済みへ上書き**

## 修正内容

### 右メニュー見切れ対策
- 右側メニューを画面内に収める viewport guard を追加
- 画面高が足りない場合は中央寄せを解除し、上寄せ＋内部スクロールに切替
- ブラウザ倍率や画面幅が狭い場合に、右メニューの幅・余白・ボタン高さを自動調整
- 右メニューのバージョン表示テキストがはみ出さないよう折り返しを追加

## 追加ファイル
- `program/v039/rightMenuViewportGuard.css`
- `program/v039/rightMenuViewportGuard.js`

## 更新ファイル
- `README_DIFF.md`
- `VERSION.txt`
- `index.html`
- `program/v039/version.js`
