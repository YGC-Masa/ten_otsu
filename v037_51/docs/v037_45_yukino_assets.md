# v037_45 雪乃 カード/カットイン画像追加メモ

| キャラ | 用途 | パス |
|---|---|---|
| 氷神 雪乃 | バトルキャラカード | `assets2/character/card_yukino_test.png` |
| 氷神 雪乃 | 必殺技カットイン | `assets2/cutin/cutin_yukino_test.png` |

## 実装メモ

- `staffMaster` の雪乃（`id: "ag"`）に `cardImage` を追加。
- `staffMaster` の雪乃（`id: "ag"`）に `cutinImage` と `skillCutin` を追加。
- 既存の必殺技処理 `staff.skillCutin` で表示されるよう設定。
