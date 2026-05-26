# v039_34 ストーリークリック時ブラックアウト抑止・立ち絵強制表示

## 修正点

- シナリオ進行クリック直後に `fade` レイヤーが一瞬出る可能性を潰すため、story mode中はfade layerを強制非表示にした。
- `nextStoryStep()` と `applyStoryStep()` の前後で `suppressStoryFadeLayer()` を呼び、クリック時の一瞬ブラックアウトを抑止。
- v038シナリオの `characters` が `NULL` の場合は speaker 名から藍/緋奈の立ち絵を推定。
- `tenotsu-story-character-layer` の z-index と CSS を強制し、ストーリー中の立ち絵がテキスト欄の背後・背景の前に出るようにした。
- 右メニュー位置は v039_29 の中央寄せを維持。

## 注意

シナリオ中の立ち絵ファイルが存在しない場合は、次版でキャラIDと実ファイル名のマッピング表を追加する。
