# v037_51 萌 カード/カットイン画像追加メモ

| キャラ | 用途 | パス |
|---|---|---|
| 草壁 萌 | バトルキャラカード | `assets2/character/card_moe_test.png` |
| 草壁 萌 | 必殺技カットイン | `assets2/cutin/cutin_moe_test.png` |

## 実装メモ

- `staffMaster` の萌（`id: "am"`）に `cardImage` を追加。
- `staffMaster` の萌（`id: "am"`）に `cutinImage` と `skillCutin` を追加。
- 既存の必殺技処理 `staff.skillCutin` で表示されるよう設定。
