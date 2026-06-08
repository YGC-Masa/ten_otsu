# v039_130 夜空親愛100リライト反映

## 概要
夜空メイン10「二人だから、少し素直になる」を、ユーザー指定のリライト版へ差し替えます。

## 更新ファイル
- `index.html`
- `VERSION.txt`
- `README_DIFF.md`
- `program/v039/version.js`
- `program/v039/state.js`
- `program/v039/office.js`
- `scenario/v039/events/yozora_affection_100_00_main.json`

## 背景パス調整
リライト版に含まれる新規名の背景参照を、v039_129で追加済みの正式アセットへ接続しました。

- `bg_hidamari_store_closed_night.png` → `battle_store_lv1.png`
- `bg_hidamari_store_front_night.png` → `bg_hidamari_store_front_night_open.png`
- `bg_antostella_entrance_night.png` → `bg_bookcafe_antostella_exterior_night.png`
- `bg_antostella_2f_bookcafe_night.png` → `bg_bookcafe_antostella_2f_night.png`
- `bg_antostella_2f_couple_seat_night.png` → `bg_bookcafe_antostella_2f_night.png`

## 注意
新規画像アセットは同梱していません。v039_129で追加済みのアントステラ正式背景を前提にした軽量差分です。
