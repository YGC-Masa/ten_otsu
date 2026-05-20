# v037_41 藍・翠 カード/カットイン画像追加メモ

| キャラ | 用途 | パス |
|---|---|---|
| 速水川 藍 | バトルキャラカード | `assets2/character/card_ai_test.png` |
| 速水川 藍 | 必殺技カットイン | `assets2/cutin/cutin_ai_test.png` |
| 草壁 翠 | バトルキャラカード | `assets2/character/card_midori_test.png` |
| 草壁 翠 | 必殺技カットイン | `assets2/cutin/cutin_midori_test.png` |

- `staffMaster` の藍/翠に `cardImage` と `cutinImage` を追加。
- メンバーカード表示に `member-card-image` を追加。
- 必殺技カットイン呼び出し時に `staff.cutinImage` を渡すよう調整。
