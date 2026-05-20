# v037_46 美空 カード/カットイン画像追加メモ

| キャラ | 用途 | パス |
|---|---|---|
| 双沢 美空 | バトルキャラカード | `assets2/character/card_misora_test.png` |
| 双沢 美空 | 必殺技カットイン | `assets2/cutin/cutin_misora_test.png` |

## 実装メモ

- `staffMaster` の美空（`id: "ah"`）に `cardImage` を追加。
- `staffMaster` の美空（`id: "ah"`）に `cutinImage` と `skillCutin` を追加。
- 既存の必殺技処理 `staff.skillCutin` で表示されるよう設定。
