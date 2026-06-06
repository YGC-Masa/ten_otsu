# v039_116 差分

## 概要

v039_115 までを含む上書き差分です。
右メニュー/画面右下のバージョン表示、メンバー画面への復帰状態、夜空メイン1「余計なところまで見ないで」のプラネタリウム演出を修正しました。

## 主な変更

### バージョン表示

- `index.html` の title と `?v=` を `v039_116` に更新。
- `program/v039/version.js` を `v039_116` に更新。
- `program/v039/state.js` が古い `v039_110_story_flow_ui_fix` で `ns.VERSION` を上書きしていた問題を修正。
- `program/v039/office.js` の右メニュー下部表示を `ns.BUILD_LABEL` 参照に変更。

### メンバー復帰状態保持

- メンバー画面で選択した `memberId` を `ns.state.lastSelectedMemberId` に保存。
- メンバー個別画面からストーリー再生後、`ret.memberId` を使って同じメンバーを再選択した状態で戻る。
- 夜空ストーリー再生後、再びメンバー一覧だけの初期状態へ戻る問題を改善。

### 夜空メイン1「余計なところまで見ないで」

- 投影ホール突入時の背景を `bg_planetarium_hall_before_show.png` に修正。
- 「やがて照明がさらに落ち、ドームいっぱいに星が広がる。」のステップで `bg_planetarium_hall_showing.png` へ切替。
- 「上映が進む。」のステップからイベントCG `cg_yozora_planetarium_star_show.png` を表示。
- 美空「二人とも、静かに。」のステップでイベントCGをOFFにし、通常の投影ホール背景へ戻す。

## 追加ファイル

- `images/assets/cg/cg_yozora_planetarium_star_show.png`

## 変更ファイル

- `index.html`
- `VERSION.txt`
- `README_DIFF.md`
- `program/v039/version.js`
- `program/v039/state.js`
- `program/v039/office.js`
- `program/v039/members.js`
- `program/v039/storyPlayer.js`
- `program/v039/town.js`
- `scenario/v039/events/yozora_affection_10_00_main.json`

