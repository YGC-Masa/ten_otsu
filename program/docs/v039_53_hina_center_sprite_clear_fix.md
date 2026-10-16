# v039_53 Hina center sprite + clear fix

## 変更内容
- `scenario/v039/events/hina_spring_bento.json` をユーザー更新版へ差し替え。
- 緋奈ストーリー内の明示立ち絵をすべてセンター配置へ統一。
- 緋奈が公園を出ていく行で `clearStorySprites: true` / `spriteMode: "hide"` を付与し、以降は立ち絵を非表示。
- `renderPolicy.forceCenterSprites` を追加し、当該シナリオではJS側でも中央寄せを保証。
- `storyPlayer.js` で `hideStorySprites` / `spriteMode: hide|clear|cg-clear` をクリア扱いに対応。
- `layers.js` で中央配置のデフォルトを `left: 50%` に変更し、インラインzIndexを廃止。
- `core.css` 末尾で人物200・テキスト300・クリック層400の順序を再固定。

## 表示順
1. 背景 / イベントCG: z-index 100
2. 人物立ち絵: z-index 200
3. テキストUI: z-index 300
4. 透明クリック層: z-index 400
