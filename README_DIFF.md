# ten_otsu v039_269 差分パッチ

## 適用前提
- **v039_268適用済みへ上書き**

## 修正内容
### メンバー画面レイアウト復旧
- 大きい透過立ち絵でメンバー画面が崩れないよう、`memberLayoutGuard.css/js` を追加しました。
- メンバー/キャラ画面内の立ち絵は `object-fit: contain` / `max-height` / `max-width` で表示枠内に収めます。

### ビリビリメンバー立ち絵の互換対応
- 透過WebP版を正式採用しつつ、既存の `.png` 参照が残っていても壊れないよう、PNG互換ファイルも同梱しました。
- JSON内のビリビリ立ち絵参照は `.webp` に更新しました。
  - `images/assets/rival/story_koharu_stand.webp`
  - `images/assets/rival/story_mafuyu_stand.webp`
  - `images/assets/rival/story_natsu_stand.webp`
  - 互換用: `.png` 版も同梱

### 日向夏海 表記確認・追加修正
- `storyIndex.js` / `keyStoryConfig.js` / `recollectionIndex.js` と同梱JSONを再確認し、旧表記を追加修正しました。
- `なつとの縁` → `夏海との縁`
- summary内の `小春・真冬・なつ` / `こがねとなつ` も修正済み。

## 更新ファイル
- `index.html`
- `program/v039/version.js`
- `program/v039/memberLayoutGuard.css`
- `program/v039/memberLayoutGuard.js`
- `scenario/v039/storyIndex.js`
- `scenario/v039/keyStoryConfig.js`
- `scenario/v039/recollectionIndex.js`
- `scenario/v039/events/*.json`
- `images/assets/rival/story_koharu_stand.webp` / `.png`
- `images/assets/rival/story_mafuyu_stand.webp` / `.png`
- `images/assets/rival/story_natsu_stand.webp` / `.png`

## 確認
- JSON構文チェック済み
- 透過WebP / PNG互換ファイル出力済み
- 旧表記 `日向 なつ` / `日向なつ` / `夏美` の残存チェック済み
- バージョン表示: v039_269
