# v037_42 こがね カード/カットイン画像追加メモ

| キャラ | 用途 | パス |
|---|---|---|
| 小麦沢 こがね | バトルキャラカード | `assets2/character/card_kogane_test.png` |
| 小麦沢 こがね | 必殺技カットイン | `assets2/cutin/cutin_kogane_test.png` |

## 実装メモ

- `staffMaster` のこがね（`id: "ad"`）に `cardImage` を追加。
- `staffMaster` のこがね（`id: "ad"`）に `cutinImage` と `skillCutin` を追加。
- 既存の必殺技処理 `staff.skillCutin` で表示されるよう設定。
