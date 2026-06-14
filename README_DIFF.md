# ten_otsu v039_227 差分パッチ

## 適用前提
- **v039_226適用済みへ上書き**

## 修正内容

### 人物フェードの個別化
- 複数人表示中に1人だけ画像ファイルが変わる場合、変更された人物だけフェードアウト/フェードイン
- 変わっていない人物はDOMを維持し、再描画・再フェードを抑制
- これにより、片方だけ差分変更した時に全員がちらつく問題を軽減

### 外回りメニューの縦スクロール対応
- 外回り画面のパネル、場所一覧、候補一覧に縦スクロールを追加
- 画面高が低い環境やブラウザ倍率変更時の下端見切れを抑制

### 回想アルバム対象の復帰
- 181時点の全体バックアップ内 `scenario/v039/events/` から、回想対象に必要な非親愛・非自己紹介イベントを `storyIndex.js` に復帰
- 復帰対象例：
  - `ai_spring_book_bread.json`
  - `hina_spring_bento.json`
  - `c10002.json`
  - `common_opening_kadenseijin_raid_002_all_cast.json`
  - `event_black_kadenseijin_battle_unlock_003_ayame_line_fix.json`
  - `biribiri_intro_rival_battle_unlock_003_flow_fix.json`
  - `shop_exchange_intro_sakuya.json`

## シナリオ管理ファイル
- 一覧・回想表示の管理は主に `scenario/v039/storyIndex.js`
- 回想アルバムの分類/除外処理は `program/v039/storyMenu.js`
- 個別シナリオ本文は `scenario/v039/events/*.json`

## 更新ファイル
- `README_DIFF.md`
- `VERSION.txt`
- `index.html`
- `program/v039/version.js`
- `program/v039/storySpriteLoadTransition.js`
- `program/v039/storyMenu.css`
- `scenario/v039/storyIndex.js`
- `scenario/v039/events/ai_spring_book_bread.json`
- `scenario/v039/events/hina_spring_bento.json`
- `scenario/v039/events/c10002.json`
- `scenario/v039/events/common_opening_kadenseijin_raid_002_all_cast.json`
- `scenario/v039/events/event_black_kadenseijin_battle_unlock_003_ayame_line_fix.json`
- `scenario/v039/events/biribiri_intro_rival_battle_unlock_003_flow_fix.json`
- `scenario/v039/events/shop_exchange_intro_sakuya.json`
