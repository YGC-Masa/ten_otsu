# v039_52 story bg force and layer order fix

## 修正内容

- `scenario/v039/events/ai_spring_book_bread.json` の `bg: images/assets/bgev/bg_park_spring.png` をストーリー開始時に強制反映するため、`setStoryBackgroundDirect()` を追加。
- `bgMode: forceReplace` / `forceBackgroundReplace: true` を優先し、同じ背景扱いでスキップされないように修正。
- ストーリー中の背景変更では、事務所背景へのフォールバックを行わず、指定された背景を直接 `tenotsu-bg-layer` に入れる。
- `forceMobileStoryVisibility()` が人物レイヤーを `z-index:7000` に戻していた問題を修正し、人物レイヤーを `z-index:200` に固定。
- 人物画像のシナリオ内 `zIndex:2500` 等がテキストより前に見える原因になるため、表示時のインライン `z-index` を廃止。
- 最終表示順を `背景100 → 人物200 → テキスト300 → 透明クリック400` に固定。
- テキスト本文は白、話者名は話者カラーまたは薄金色で表示。

## 対象シナリオ

- `scenario/v039/events/ai_spring_book_bread.json`

## 確認ポイント

1. 外回りの藍 春イベントを開始する。
2. 背景が `bg_park_spring.png` に切り替わる。
3. 藍の立ち絵がテキストボックスの後ろに表示される。
4. テキストが白文字で読める。
