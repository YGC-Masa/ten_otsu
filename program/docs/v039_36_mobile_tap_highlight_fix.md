# v039_37 モバイルタップハイライト対策

スマホでストーリー進行時に黒フラッシュして見える原因が、背景差し替えではなくタップ中のブラウザ/ CSS press / active 表現だったため、タップハイライトとactive暗転を抑制。

- -webkit-tap-highlight-color: transparent
- story mode中の :active / :focus の opacity/filter/背景色変化を無効化
- 透明クリック面のタップ時暗転を抑制
- touch-action: manipulation
- installStoryTapHighlightGuard() によるactive/focus解除
