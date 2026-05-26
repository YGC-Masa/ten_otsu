# v039_29 → v039_30 story click no-blackout and sprite force 差分

## 修正内容
- シナリオ進行クリック直後の一瞬ブラックアウト対策として、story mode中のfade layerを強制非表示化。
- nextStoryStep / applyStoryStep の前後でfade layerを抑止。
- v038シナリオの characters が NULL の場合、speaker名から藍/緋奈の立ち絵を推定。
- ストーリー立ち絵レイヤーのz-indexとCSSを強化。
- 右メニュー位置は中央寄せを維持。

リポジトリ直下へ展開して上書きしてください。
