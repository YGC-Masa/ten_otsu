# v037_47 夜空 カード/カットイン画像追加メモ

| キャラ | 用途 | パス |
|---|---|---|
| 双沢 夜空 | バトルキャラカード | `assets2/character/card_yozora_test.png` |
| 双沢 夜空 | 必殺技カットイン | `assets2/cutin/cutin_yozora_test.png` |

## 実装メモ

- `staffMaster` の夜空（`id: "ai"`）に `cardImage` を追加。
- `staffMaster` の夜空（`id: "ai"`）に `cutinImage` と `skillCutin` を追加。
- 既存の必殺技処理 `staff.skillCutin` で表示されるよう設定。
