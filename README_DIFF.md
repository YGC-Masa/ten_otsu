# ten_otsu v039_76 差分

## 概要

v039_75 から v039_76 では、VSビリビリの強さを少し戻し、ビリビリ側のカード画像とカットイン画像を差し替えました。

- v039_75で強めたビリビリ側を約10%だけ弱める
- 小春・真冬・なつのキャラカード画像を採用版へ差し替え
- 小春・真冬・なつの必殺技カットイン画像を採用版へ差し替え
- 既存の必殺可能演出とデッキ編成は維持

## 主な変更

### ビリビリ側の強さを微調整

v039_75の強化状態を基準に、ビリビリ側の横取り・スコア・必殺ゲージ増加を約10%抑えました。
手動操作なら勝ちやすく、放置気味だと押されるバランスを狙っています。

### 採用画像へ差し替え

以下を `images/assets/rival/` に反映しました。

- koharu_stand.png
- koharu_cutin.png
- mafuyu_stand.png
- mafuyu_cutin.png
- natsu_stand.png
- natsu_cutin.png

## 変更ファイル

- index.html
- program/v039/rivalBattle.js
- program/v039/state.js
- images/assets/rival/koharu_stand.png
- images/assets/rival/koharu_cutin.png
- images/assets/rival/mafuyu_stand.png
- images/assets/rival/mafuyu_cutin.png
- images/assets/rival/natsu_stand.png
- images/assets/rival/natsu_cutin.png
- program/docs/v039_76_rival_balance_assets.md
- release_notes.md
- README_DIFF.md
- VALIDATION.json
- CHECKSUMS.json
