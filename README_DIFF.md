# v039_35 → v039_36 mobile tap highlight fix 差分

## 修正内容
- スマホでストーリー進行時に黒フラッシュして見える原因がタップハイライト/active暗転だったため、CSSで抑制。
- -webkit-tap-highlight-color: transparent をストーリーUI全体へ適用。
- story mode中の :active / :focus / press表現による opacity/filter/背景色変化を無効化。
- 透明クリック面のタップ時暗転を抑制。
- installStoryTapHighlightGuard() を追加し、タップ後にactive/focus状態を解除。

リポジトリ直下へ展開して上書きしてください。
