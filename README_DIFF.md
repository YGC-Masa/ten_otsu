# v039_42 → v039_43 event CG surface hide on normal bg 差分

- 通常背景へ戻すステップへ hideEventCg: true を付与。
- イベントCGステップへ showEventCg: true / eventCg を付与。
- hideEventCgSurface() で前面に残ったイベントCGサーフェスを明示的に非表示化。
