# v039_96 共通オープニング 背景切替タイミング調整

## 目的

`(ぷりっ。)……これ、どうぞ。` の表示タイミングで背景が切り替わらないようにする。

## 対応

- `scenario/v039/events/common_opening_kadenseijin_raid_002_all_cast.json` の対象ステップから `bg` / `bgMode` を削除。
- これにより、対象台詞表示時は直前の倉庫背景を維持する。
- `scenario/data/common_opening_kadenseijin_raid_002_all_cast.source.json` では、`change_background: metal_closeup` を対象台詞の後へ移動。

## 継続仕様

- 家電星人の中央枠表示は維持。
- v039_95で追加した倉庫背景と指定セリフ変更は維持。
