# ten_otsu v039_71 → v039_72 差分

## 目的

ビリビリバトルの画面操作感と演出位置を調整し、通常バトルのタイムセールに相当する「ラッシュタイム」を追加します。

## 変更内容

- ビリビリバトル中の必殺技カットイン表示範囲を、メンバー枠に被らないよう敵枠エリア内へ制限。
- 店長HELPボタンを通常バトルと同じく、ひだまりメンバー枠の直上に配置。
- ラッシュタイムを追加。残り18秒で発動し、家電星人の最大出現数を4体から6体へ増加。
- ラッシュタイム中はHUDに状態表示し、敵枠レイアウトを6枠対応へ変更。
- スマホ幅ではラッシュ中の敵枠を3列表示へ調整。

## 更新ファイル

- index.html
- release_notes.md
- CHECKSUMS.json
- VALIDATION.json
- program/v039/state.js
- program/v039/rivalBattle.js
- program/v039/rivalBattle.css
- program/docs/v039_72_rival_cutin_help_rush.md
