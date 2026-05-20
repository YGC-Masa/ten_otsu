# v037_48 桃 カード/カットイン画像追加メモ

| キャラ | 用途 | パス |
|---|---|---|
| 芝桜 桃 | バトルキャラカード | `assets2/character/card_momo_test.png` |
| 芝桜 桃 | 必殺技カットイン | `assets2/cutin/cutin_momo_test.png` |

## 実装メモ

- `staffMaster` の桃（`id: "aj"`）に `cardImage` を追加。
- `staffMaster` の桃（`id: "aj"`）に `cutinImage` と `skillCutin` を追加。
- 既存の必殺技処理 `staff.skillCutin` で表示されるよう設定。
