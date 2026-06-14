# ten_otsu v039_220 差分パッチ

## 適用前提
- **v039_218適用済みへ上書き**

## 修正内容

### 人物ちらつき対策
- 同じ人物・同じ立ち絵が次ステップでも続く場合、人物のフェードアウト / 再表示を行わない
- すでに画面上に同じ立ち絵が出ている場合、人物DOMの再生成を抑制
- `storyCurrentSpriteKey` だけでなく、実表示管理用の `__storySpriteLastKey` を追加
- 背景変更処理側で、人物キーを不要に空にしていた処理を抑制
- 人物画像ロード済みキャッシュは維持しつつ、同一表示の再読込・再描画を避ける

## 更新ファイル
- `README_DIFF.md`
- `VERSION.txt`
- `index.html`
- `program/v039/version.js`
- `program/v039/storyBgPreloadTransition.js`
- `program/v039/storySpriteLoadTransition.js`
