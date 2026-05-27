# v039_36 → v039_37 story sprite body overlay fix 差分

## 修正内容
- ストーリー立ち絵が表示されない問題の切り分けとして、body直下に #tenotsu-story-body-sprite-layer を直接生成。
- showStoryCharacters() は既存レイヤーではなくbody直下オーバーレイへ立ち絵を挿入。
- 親要素のoverflow/hidden/z-index/displayの影響を避ける。
- consoleに [tenotsu storySprites] を出し、storySpritesが読まれているか確認可能にした。

リポジトリ直下へ展開して上書きしてください。
