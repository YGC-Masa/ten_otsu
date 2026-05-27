# v039_37 ストーリー立ち絵 body 直下オーバーレイ修正

## 修正点

- 既存の storyCharacters レイヤーに依存せず、body直下に `#tenotsu-story-body-sprite-layer` を直接生成。
- `showStoryCharacters()` は body 直下オーバーレイへ立ち絵を挿入。
- 親要素の overflow / hidden / z-index / display の影響を避ける。
- `.tenotsu-story-body-standing` を z-index 7000帯で背景より前、テキストより後ろに表示。
- console に `[tenotsu storySprites]` を出すようにし、storySprites が読まれているか確認可能にした。

## DOM確認

- #tenotsu-story-body-sprite-layer
- .tenotsu-story-body-standing
- img[src*="b10501.webp"]
- img[src*="a10501.webp"]
