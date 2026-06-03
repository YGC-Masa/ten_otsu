# v039_96 差分

## 内容

- 共通オープニング「家電星人襲来・全員登場版」で、`(ぷりっ。)……これ、どうぞ。` の台詞表示時に背景が切り替わらないよう修正。
- ランタイム用 `scenario/v039/events/common_opening_kadenseijin_raid_002_all_cast.json` では、対象ステップから `bg` / `bgMode` を削除。
- 参照元 `scenario/data/common_opening_kadenseijin_raid_002_all_cast.source.json` では、金属クローズアップ背景への切替命令を対象台詞の後へ移動。

## 変更ファイル

- `index.html`
- `scenario/v039/events/common_opening_kadenseijin_raid_002_all_cast.json`
- `scenario/data/common_opening_kadenseijin_raid_002_all_cast.source.json`
- `program/docs/v039_96_common_opening_no_bg_change_on_gold_emit.md`
- `release_notes.md`
- `VALIDATION.json`
- `CHECKSUMS.json`
