# ten_otsu diff v039_90 -> v039_91

イベントバトル画面の表示効率と操作導線を調整しました。

## 変更内容

- 「事務所に帰る」ボタンをイベントバトル上部HUDに追加。
- ひだまりメンバー表示を 5x3 固定表示から、1列5人表示＋横スワイプのローリングスクロールへ変更。
- メンバー欄に総合清掃力、即応清掃力、特攻人数を表示。
- 各メンバーカードにも選択中の敵に対する総合清掃力を表示。
- 敵カード画像の使用パスは v039_90 の `images/assets/event/dirty_alien_01.png` 〜 `dirty_alien_13.png` を維持。

## 主な更新ファイル

```text
index.html
program/v039/eventBattle.js
program/v039/eventBattle.css
program/docs/v039_91_event_battle_member_scroll_power.md
release_notes.md
VALIDATION.json
CHECKSUMS.json
```
