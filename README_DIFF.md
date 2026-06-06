# v039_114 夜空キーシナリオ更新・1-2追加パッチ

## 基準
v039_113 双沢家・美空部屋・夜空部屋背景追加パッチ

## 追加
- `scenario/v039/events/yozora_affection_00_02_key.json`
  - 夜空キーシナリオ1-2「見てるだけ」
  - 親愛Lv.4 / 第1段キー2スロット想定

## 更新
- `scenario/v039/events/yozora_affection_00_01_key.json`
  - 「美空なら休憩室」をユーザー更新版へ差し替え
  - v039_steps形式へ変換
  - 背景は `images/assets/bg/bg_hidamari_warehouse.png`
- `scenario/v039/storyIndex.js`
  - 夜空キー1を v039_114 へ更新
  - 夜空キー2を追加
- `scenario/v039/keyStoryConfig.js`
  - 夜空 `requiredStories` にキー2を追加
  - `b1_key2` に `yozora_affection_00_02_key` を登録
- `scenario/v039/affectionStoryPlan.js`
  - バージョン表記を v039_114 へ更新
- `program/v039/version.js`
- `index.html`
- `VERSION.txt`

## 確認ポイント
1. 起動画面の表示が `v039_114` になっている。
2. メンバー > 双沢 夜空 の親愛ストーリー欄で、キー1「美空なら休憩室」とキー2「見てるだけ」が確認できる。
3. 親愛Lv.1でキー1、親愛Lv.4でキー2が再生可能になる。
4. キー1の背景がひだまりストア倉庫になっている。
5. キー2が店内売り場背景で再生できる。
