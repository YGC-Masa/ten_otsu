# ten_otsu v039_228 差分パッチ

## 適用前提
- **v039_227適用済みへ上書き**

## 修正内容

### 回想アルバムを別管理化
- 回想アルバム用の管理ファイルを新設
  - `scenario/v039/recollectionIndex.js`
- メンバー親愛ストーリー管理の `scenario/v039/storyIndex.js` とは分離
- `storyMenu.js` は、回想アルバムでは `TENOTSU_RECOLLECTION_STORY_INDEX` を優先参照

### 春夏秋冬分類の修正
- 季節情報があるストーリーは、イベント系でも春夏秋冬へ優先分類
- 春：緋奈・藍の春イベント
- 夏：マリンピア等
- イベント：家電星人・ビリビリ電機・交換所解放などの非季節イベント
- その他：日常・事務所系

### 回想アルバムの縦スクロール修正
- パネル全体ではなく、リスト領域を内部スクロール化
- 下部テキストボックスに重なって見切れにくいよう、下余白を確保

## 主な管理ファイル
- メンバー親愛/全体索引：`scenario/v039/storyIndex.js`
- 回想アルバム専用索引：`scenario/v039/recollectionIndex.js`
- 回想アルバム表示制御：`program/v039/storyMenu.js`
- 回想アルバム見た目：`program/v039/storyMenu.css`
