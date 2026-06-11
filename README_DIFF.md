# v039_162 = メンバー個別ストーリー表示ラベル修正パッチ

## 内容

メンバー＞個別＞ストーリー表示で、左側ラベルが「キー1」「キー2」「メイン」等のまま表示されていた問題を修正。

- 赤枠相当：`親愛Lv.xx` を表示
- 黄色枠相当：ストーリータイトルのみを表示
- storyIndex.js 側の `affectionLabel` / `rawTitle` を使用
- v039_159 以降の親愛Lv.xx / タイトル分離方針を、後段補正ではなく memberStorySlots.js 本体側で反映

## 更新ファイル

- index.html
- VERSION.txt
- README_DIFF.md
- program/v039/memberStorySlots.js
- program/v039/version.js
- program/v039/state.js
- program/v039/office.js

## 適用前提

v039_161以降へ上書き。
