# v037_49 彩愛 カード/カットイン画像追加メモ

| キャラ | 用途 | パス |
|---|---|---|
| 紫藤 彩愛 | バトルキャラカード | `assets2/character/card_ayame_test.png` |
| 紫藤 彩愛 | 必殺技カットイン | `assets2/cutin/cutin_ayame_test.png` |

## 実装メモ

- `staffMaster` の彩愛（`id: "ak"`）に `cardImage` を追加。
- `staffMaster` の彩愛（`id: "ak"`）に `cutinImage` と `skillCutin` を追加。
- 既存の必殺技処理 `staff.skillCutin` で表示されるよう設定。
