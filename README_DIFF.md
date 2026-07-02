# ten_otsu v039_268 差分パッチ

## 適用前提
- **v039_267適用済みへ上書き**

## 修正内容
### 日向 夏海 表記の完全統一
- `storyIndex.js` の表示名を `日向 夏海` へ修正
- `keyStoryConfig.js` の表示名を `日向 夏海` へ修正
- `recollectionIndex.js` の表示名・回想イベントID/シナリオパスを夏海版へ修正
- 対象イベントJSON内の表示名・セリフを `日向 夏海` / `夏海` へ統一

### ビリビリメンバー立ち絵を透過WebP化
- 添付のカウボーイショット3枚を **RGBA透過WebP** として実装
- JSON参照も `.webp` へ更新
  - `images/assets/rival/story_koharu_stand.webp`
  - `images/assets/rival/story_mafuyu_stand.webp`
  - `images/assets/rival/story_natsu_stand.webp`

## 更新ファイル
- `scenario/v039/storyIndex.js`
- `scenario/v039/keyStoryConfig.js`
- `scenario/v039/recollectionIndex.js`
- `scenario/v039/events/kogane_natsumi_marinpia.json`
- `scenario/v039/events/kogane_natsu_marinpia.json`
- `scenario/v039/events/event_black_kadenseijin_battle_unlock_003_ayame_line_fix.json`
- `scenario/v039/events/biribiri_intro_rival_battle_unlock_003_flow_fix.json`
- `images/assets/rival/story_koharu_stand.webp`
- `images/assets/rival/story_mafuyu_stand.webp`
- `images/assets/rival/story_natsu_stand.webp`
- `program/v039/version.js`
- `VERSION.txt`
- `index.html`
- `README_DIFF.md`

## 確認
- JSON構文チェック済み
- 追加WebPがRGBA透過であることを確認済み
- 旧名称系の残存は同梱JSON/JS内で0件
- バージョン表示：v039_268
