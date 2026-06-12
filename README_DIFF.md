# ten_otsu v039_167 夜空親愛Lv進行ルール全修正パッチ

## 目的
夜空ルートの親愛ストーリー表示・解放Lvを、各10Lv帯で「x0 / x3 / x5 / x8 / 次x0」進行へ統一。

## 変更内容
- `scenario/v039/storyIndex.js` の夜空親愛ストーリー全件の `unlockLevel` / `unlock.level` を更新
- `affectionLabel` を `親愛Lv.X` 形式へ更新
- `menuTitle` を `親愛Lv.X：タイトル` 形式へ更新
- `title` / `rawTitle` はタイトル単体を維持

## 進行ルール
- 初期キー：Lv.3 / Lv.5 / Lv.8
- メイン：Lv.10 / 20 / 30 ... / 100
- 各帯キー：x3 / x5 / x8

## 適用前提
- v039_166以降へ上書き
