# v039_33 背景差し替えスロープローブ・実シナリオ立ち絵追加

## 修正点

- 背景差し替え前に `BG SWAP BEFORE` を表示し、1.2秒待機。
- 背景差し替え実行直前に `BG SWAP APPLY` を表示し、1.2秒待機。
- 背景差し替え後に `BG SWAP AFTER` を表示し、1.2秒待機。
- `setBackground()` の内部クリアを避けるため、可能なら背景img要素の `src` を直接差し替える。
- 藍シナリオ全ステップへ明示的に藍立ち絵 characters を追加。
- 緋奈シナリオ全ステップへ明示的に緋奈立ち絵 characters を追加。

## 使用立ち絵

- 緋奈: images/assets/char/a10501.webp
- 藍: images/assets/char/b10501.webp

## 見方

黒くなるタイミングが `BG SWAP BEFORE` / `BG SWAP APPLY` / `BG SWAP AFTER` のどこかを見てください。

- BEFORE中に黒くなる: クリック直後/次ステップ処理開始が原因
- APPLY中に黒くなる: 背景差し替え処理そのものが原因
- AFTER中に黒くなる: 差し替え後のレイヤー/テキスト更新が原因
