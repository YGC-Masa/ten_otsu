# v037_41a 藍・翠 カード/カットイン画像追加メモ

| キャラ | 用途 | パス |
|---|---|---|
| 速水川 藍 | バトルキャラカード | `assets2/character/card_ai_test.png` |
| 速水川 藍 | 必殺技カットイン | `assets2/cutin/cutin_ai_test.png` |
| 草壁 翠 | バトルキャラカード | `assets2/character/card_midori_test.png` |
| 草壁 翠 | 必殺技カットイン | `assets2/cutin/cutin_midori_test.png` |

## 実装メモ

- `staffMaster` の藍/翠に `cardImage` を追加。
- `staffMaster` の藍/翠に `cutinImage` と `skillCutin` を追加。
- 既存の必殺技処理が `staff.skillCutin` を参照しているため、`skillCutin` を正式に設定。
