# ten_otsu v039_240 差分パッチ

## 適用前提
- **v039_239適用済みへ上書き**

## 修正内容

### 背景アセット追加
- 添付画像を `images/assets/bg/bg_hidamari_store_salesfloor_day.png` として追加

### シナリオ整理
- 全シナリオを走査し、ステップ本文に `締めモノローグ` を含む場合、そのステップ以降を削除
- 対象シナリオ数：32

## 注意
- `bg_hidamari_store_salesfloor_day.png` の既存参照は今回の最新状態では見つからなかったため、参照置換は発生していません。
- 既存の `bg_hidamari_store_salesfloor_night.png` は夜シーン用として残しています。

## 締めモノローグ削除対象
- `ayame_affection_00_01_key.json`: step 92 以降削除（98 → 91 steps）
- `ayame_affection_00_02_key.json`: step 135 以降削除（141 → 134 steps）
- `ayame_affection_00_03_key.json`: step 186 以降削除（192 → 185 steps）
- `ayame_affection_10_00_main.json`: step 199 以降削除（208 → 198 steps）
- `ayame_affection_10_01_key.json`: step 138 以降削除（145 → 137 steps）
- `ayame_affection_10_02_key.json`: step 158 以降削除（164 → 157 steps）
- `ayame_affection_10_03_key.json`: step 150 以降削除（160 → 149 steps）
- `ayame_affection_20_00_main.json`: step 156 以降削除（164 → 155 steps）
- `ayame_affection_20_01_key.json`: step 163 以降削除（170 → 162 steps）
- `ayame_affection_20_02_key.json`: step 188 以降削除（195 → 187 steps）
- `ayame_affection_20_03_key.json`: step 186 以降削除（195 → 185 steps）
- `ayame_affection_30_00_main.json`: step 125 以降削除（136 → 124 steps）
- `ayame_affection_30_01_key.json`: step 162 以降削除（175 → 161 steps）
- `ayame_affection_30_02_key.json`: step 118 以降削除（126 → 117 steps）
- `ayame_affection_30_03_key.json`: step 150 以降削除（157 → 149 steps）
- `ayame_affection_40_00_main.json`: step 192 以降削除（206 → 191 steps）
- `ayame_affection_40_01_key.json`: step 181 以降削除（192 → 180 steps）
- `ayame_affection_40_02_key.json`: step 153 以降削除（165 → 152 steps）
- `ayame_affection_40_03_key.json`: step 186 以降削除（199 → 185 steps）
- `ayame_affection_50_00_main.json`: step 197 以降削除（207 → 196 steps）
- `ayame_affection_50_01_key.json`: step 236 以降削除（247 → 235 steps）
- `ayame_affection_50_02_key.json`: step 241 以降削除（250 → 240 steps）
- `ayame_affection_50_03_key.json`: step 198 以降削除（208 → 197 steps）
- `ayame_affection_60_00_main.json`: step 274 以降削除（286 → 273 steps）
- `ayame_affection_60_01_key.json`: step 190 以降削除（201 → 189 steps）
- `ayame_affection_60_02_key.json`: step 185 以降削除（199 → 184 steps）
- `ayame_affection_60_03_key.json`: step 210 以降削除（227 → 209 steps）
- `ayame_affection_70_00_main.json`: step 266 以降削除（288 → 265 steps）
- `ayame_affection_70_01_key.json`: step 194 以降削除（213 → 193 steps）
- `ayame_affection_70_02_key.json`: step 180 以降削除（195 → 179 steps）
- `ayame_affection_70_03_key.json`: step 222 以降削除（239 → 221 steps）
- `ayame_affection_80_00_main.json`: step 186 以降削除（206 → 185 steps）

## 更新ファイル
- `README_DIFF.md`
- `VERSION.txt`
- `images/assets/bg/bg_hidamari_store_salesfloor_day.png`
- `index.html`
- `program/v039/version.js`
- `scenario/v039/events/ayame_affection_00_01_key.json`
- `scenario/v039/events/ayame_affection_00_02_key.json`
- `scenario/v039/events/ayame_affection_00_03_key.json`
- `scenario/v039/events/ayame_affection_10_00_main.json`
- `scenario/v039/events/ayame_affection_10_01_key.json`
- `scenario/v039/events/ayame_affection_10_02_key.json`
- `scenario/v039/events/ayame_affection_10_03_key.json`
- `scenario/v039/events/ayame_affection_20_00_main.json`
- `scenario/v039/events/ayame_affection_20_01_key.json`
- `scenario/v039/events/ayame_affection_20_02_key.json`
- `scenario/v039/events/ayame_affection_20_03_key.json`
- `scenario/v039/events/ayame_affection_30_00_main.json`
- `scenario/v039/events/ayame_affection_30_01_key.json`
- `scenario/v039/events/ayame_affection_30_02_key.json`
- `scenario/v039/events/ayame_affection_30_03_key.json`
- `scenario/v039/events/ayame_affection_40_00_main.json`
- `scenario/v039/events/ayame_affection_40_01_key.json`
- `scenario/v039/events/ayame_affection_40_02_key.json`
- `scenario/v039/events/ayame_affection_40_03_key.json`
- `scenario/v039/events/ayame_affection_50_00_main.json`
- `scenario/v039/events/ayame_affection_50_01_key.json`
- `scenario/v039/events/ayame_affection_50_02_key.json`
- `scenario/v039/events/ayame_affection_50_03_key.json`
- `scenario/v039/events/ayame_affection_60_00_main.json`
- `scenario/v039/events/ayame_affection_60_01_key.json`
- `scenario/v039/events/ayame_affection_60_02_key.json`
- `scenario/v039/events/ayame_affection_60_03_key.json`
- `scenario/v039/events/ayame_affection_70_00_main.json`
- `scenario/v039/events/ayame_affection_70_01_key.json`
- `scenario/v039/events/ayame_affection_70_02_key.json`
- `scenario/v039/events/ayame_affection_70_03_key.json`
- `scenario/v039/events/ayame_affection_80_00_main.json`
- `scenario/v039/storyIndex.js`
