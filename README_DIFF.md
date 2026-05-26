# v039_34 → v039_35 mobile story css and sprite layer fix 差分

## 修正内容
- モバイル向けstory CSSを重点修正。
- story modeのfade/blackout/transition/animationをモバイルで強制無効化。
- 100dvhを優先し、モバイル横画面のviewport揺れを軽減。
- story character layerをモバイルでも強制表示。
- hidden属性をJS/CSS両方で解除。
- forceMobileStoryVisibility() を追加し、背景/立ち絵/テキスト更新後に表示状態を再固定。

リポジトリ直下へ展開して上書きしてください。
