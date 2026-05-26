# v039_32 ストーリー黒フラッシュ抑止・絶対配置立ち絵テスト

## 修正点

- ストーリー中は `fade` レイヤーを display:none / visibility:hidden / opacity:0 で強制抑止。
- シナリオ背景/CG切替は `setStoryBackgroundNoFlash()` でプリロード後に差し替え、背景クリアによる黒フラッシュを避ける。
- クリック時にも `suppressStoryFadeLayer()` を先に呼ぶ。
- 立ち絵は話者名/タイトルから強制推定し、シナリオ内charactersに依存しすぎない。
- 緋奈：z-index 1000 / left 7%
- 藍：z-index 2000 / left 27%

## 使用推定立ち絵

- 緋奈：images/assets/char/a10501.webp
- 藍：images/assets/char/b10501.webp
