# v039_36 モバイルストーリーCSS・立ち絵レイヤー修正

## 前提

PCでは黒フラッシュしないため、モバイル向けCSS/viewport/z-index/display制御が主原因と判断。

## 修正点

- モバイル/タッチ端末向けに story mode の fade/blackout 系を強制非表示。
- `100vh` 由来の揺れを避けるため、モバイル側で `100dvh` を優先。
- `tenotsu-story-character-layer` をモバイルでも `display:block` / `visibility:visible` / `opacity:1` に強制。
- `hidden` 属性が残っていてもモバイルでは表示されるようにCSSとJS両方で上書き。
- 立ち絵を背景より上、テキストより下の `z-index:4500` 帯へ固定。
- `forceMobileStoryVisibility()` を追加し、背景/立ち絵/テキスト更新後に表示状態を再固定。

## 注意

v039_34 の story v2 フォーマットは維持。
