# v039_157 = 夜空50-100ストーリー索引最新マニフェスト同期パッチ

## 適用前提

v039_156以降へ上書き。

## 内容

- `yozora_affection_50_100_latest_manifest_v039_108.json` を基準に、夜空50〜100帯の `storyIndex.js` を再同期。
- 古いタイトル・途中生成タイトルが残っていた索引を修正。
- メニュー表示は `親愛Lv.xx：タイトル` 形式を維持。
- 内部リンク先 `scenario/v039/events/<story_id>.json` はマニフェストのIDに合わせて整理。

## 代表修正

- 親愛Lv.60：夜空のままで
- 親愛Lv.70：忘れて、でも忘れないで
- 親愛Lv.80：一緒だね
- 親愛Lv.90：本物の星を見る夜
- 親愛Lv.97：二人だから、少し素直になる
- 親愛Lv.100：春の中で、ありがとう

## 更新ファイル

- `scenario/v039/storyIndex.js`
- `index.html`
- `VERSION.txt`
- `program/v039/version.js`
- `program/v039/state.js`
- `program/v039/office.js`

画像・シナリオJSON本体は同梱していません。
