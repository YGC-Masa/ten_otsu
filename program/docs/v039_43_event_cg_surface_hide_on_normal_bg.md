# v039_47 イベントCGサーフェス明示非表示

- 通常背景へ戻すステップへ `hideEventCg: true` を付与。
- イベントCGステップへ `showEventCg: true` と `eventCg` を付与。
- `hideEventCgSurface()` を追加し、前面に残ったイベントCGサーフェスを display:none / opacity:0 にする。
- `showEventCgSurface()` を追加し、イベントCG表示を明示化。
