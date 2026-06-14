# ten_otsu v039_226 差分パッチ

## 適用前提
- **v039_220 以降へ上書き可能**
- 右メニュー見切れ対策と回想アルバム再編成をまとめた統合版です。

## 統合内容

### v039_221相当：右メニュー見切れ対策
- 右側メニューを画面内に収める viewport guard を追加
- 画面高が足りない場合は上寄せ＋内部スクロールに切替
- ブラウザ倍率や画面幅が狭い場合の幅・余白・ボタン高さを補正

### v039_222相当：回想アルバム階層の見切れ対策
- 回想アルバム系の階層メニュー・サブメニューを画面内に収めるための補正を統合

### v039_223相当：回想アルバム本体サブメニュー
- 春
- 夏
- 秋
- 冬
- その他
- イベント

### v039_224 / v039_225相当：回想アルバム対象フィルタ
- `scenario/v039/events/` 内のイベント系ストーリーを対象
- 親愛系を除外
- `intro_` 系の自己紹介を除外
- 親愛系はメンバー側、自己紹介は自己紹介側で見る方針

## 更新ファイル
- `README_DIFF.md`
- `VERSION.txt`
- `index.html`
- `program/v039/version.js`
- `program/v039/rightMenuViewportGuard.css`
- `program/v039/rightMenuViewportGuard.js`
- `program/v039/storyMenu.js`
- `program/v039/storyMenu.css`
