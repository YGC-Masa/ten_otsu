# v037_50 里美 カード/カットイン画像追加メモ

| キャラ | 用途 | パス |
|---|---|---|
| 餅月 里美 | バトルキャラカード | `assets2/character/card_satomi_test.png` |
| 餅月 里美 | 必殺技カットイン | `assets2/cutin/cutin_satomi_test.png` |

## 実装メモ

- `staffMaster` の里美（`id: "al"`）に `cardImage` を追加。
- `staffMaster` の里美（`id: "al"`）に `cutinImage` と `skillCutin` を追加。
- 既存の必殺技処理 `staff.skillCutin` で表示されるよう設定。
- v037_49 が未作成環境だった場合に備え、彩愛のカード/カットイン設定も保持する処理を含めています。
