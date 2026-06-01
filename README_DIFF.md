# ten_otsu v039_69 → v039_70 差分

## 概要

設定画面にスタミナ / バトルPの検証用リセット機能を追加し、ビリビリバトル報酬の「金」表記を「金貨」に変更しました。

## 主な変更

- `program/v039/office.js`
  - 設定画面にST/BPリセットボタンを追加。
- `program/v039/core.css`
  - 設定画面のリセット説明欄を追加。
- `program/v039/rivalBattle.js`
  - 報酬表記を「家電星人金貨」に変更。
  - 旧 `applianceGold` から `applianceCoins` へ互換移行。
- `program/v039/state.js` / `index.html`
  - v039_70 表記へ更新。

## 確認

- JS構文チェック済み。
- ZIP整合性確認済み。
