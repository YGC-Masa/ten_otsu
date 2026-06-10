# v039_156 = 親愛Lv.xxストーリー索引表記パッチ

## 内容

メンバー＞夜空＞ストーリー一覧の表示名を、従来の「キー1」「キー2」「キー3」ベースではなく、親愛度解放レベルが直接わかる形式へ変更しました。

例：

```text
親愛Lv.91：静かな夜のブックカフェ企画
親愛Lv.94：デートみたいだな
親愛Lv.97：二人だから、少し素直になる
親愛Lv.100：春の中で、ありがとう
```

## 実装方針

- storyIndex.js の夜空ルート各項目に `affectionLabel` / `menuTitle` / `rawTitle` を追加
- メニュー表示用の `title` は `親愛Lv.xx：タイトル` に変更
- 内部制御用の `affectionSlot: key1/key2/key3/main` は維持
- unlockLevel / unlock / order / scenario のリンク先は変更なし

## 適用前提

```text
v039_155以降へ上書き
```

## 更新ファイル

```text
index.html
VERSION.txt
README_DIFF.md
program/v039/version.js
program/v039/state.js
program/v039/office.js
scenario/v039/storyIndex.js
```
