# v039_34 ストーリーフォーマットv2化・同一画像スキップ

## 修正点

- 緋奈/藍シナリオを v039 専用の `format: tenotsu-v039-story-v2` へリライト。
- `characters` ではなく `storySprites` を明示フィールドとして使用。
- ストーリーエンジンは `storySprites` を優先して直接表示。
- 次ステップで同じ背景なら背景差し替えをスキップ。
- 次ステップで同じ立ち絵なら立ち絵差し替えをスキップ。
- `after applyStoryStep` 直前/直後のデバッグフラッシュ処理を削除。
- v039_33 の BG SWAP スロープローブ/1.2秒待機を削除。
- デバッグプローブ表示をCSSで非表示化。

## 使用立ち絵

- 緋奈: images/assets/char/a10501.webp
- 藍: images/assets/char/b10501.webp
