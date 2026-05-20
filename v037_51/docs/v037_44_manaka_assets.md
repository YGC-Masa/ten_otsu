# v037_44 真花 カード/カットイン画像追加メモ

| キャラ | 用途 | パス |
|---|---|---|
| 大道寺 真花 | バトルキャラカード | `assets2/character/card_manaka_test.png` |
| 大道寺 真花 | 必殺技カットイン | `assets2/cutin/cutin_manaka_test.png` |

## 実装メモ

- `staffMaster` の真花（`id: "af"`）に `cardImage` を追加。
- `staffMaster` の真花（`id: "af"`）に `cutinImage` と `skillCutin` を追加。
- 既存の必殺技処理 `staff.skillCutin` で表示されるよう設定。
