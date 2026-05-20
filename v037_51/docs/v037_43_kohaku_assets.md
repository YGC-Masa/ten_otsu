# v037_43 琥珀 カード/カットイン画像追加メモ

| キャラ | 用途 | パス |
|---|---|---|
| 春日原 琥珀 | バトルキャラカード | `assets2/character/card_kohaku_test.png` |
| 春日原 琥珀 | 必殺技カットイン | `assets2/cutin/cutin_kohaku_test.png` |

## 実装メモ

- `staffMaster` の琥珀（`id: "ae"`）に `cardImage` を追加。
- `staffMaster` の琥珀（`id: "ae"`）に `cutinImage` と `skillCutin` を追加。
- 既存の必殺技処理 `staff.skillCutin` で表示されるよう設定。
