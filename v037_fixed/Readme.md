# ノベルゲームエンジン v037

ブラウザベースのノベルゲームエンジンです。PC・スマホ両対応、PWA対応、GitHub Pages上での動作を想定しています。

## v037 修正版メモ

この版では以下を修正しています。

- `manifest.json` のアイコンパスを実ファイル構成に合わせて修正
- `serviceWorker.js` のキャッシュ名とキャッシュ対象パスを v037 用に修正
- `index.html` のタイトル表記を v037 に更新
- `effect.js` の各エフェクトを Promise 同期・`duration` 対応に修正
- `effectTime` を `applyEffect()` に反映
- `wait` をシーン単位のオート進行待機時間として反映
- `effect` パラメータでも白/黒フラッシュなどを呼べるように対応
- `data.forEach is not a function` 対策として、配列形式と `{ "items": [] }` 形式の両方に対応
- menu/list/scenario の読み込み失敗時に画面へエラー表示
- 未作成のジャンプ先に仮シナリオを追加
- `listmenu/list01.json` を追加

## 主要構成

```text
v037/
├─ index.html
├─ style.css
├─ chardispsetting.css
├─ config.js
├─ script.js
├─ effect.js
├─ menuList.js
├─ randomShows.js
├─ utils.js
├─ characterStyles.js
├─ serviceWorker.js
├─ manifest.json
├─ scenario/
├─ listmenu/
├─ random/
└─ icon-192.png / icon-512.png
```

## 読み込み順

```html
<script src="config.js"></script>
<script src="characterStyles.js"></script>
<script src="effect.js"></script>
<script src="menuList.js"></script>
<script src="randomShows.js"></script>
<script src="utils.js"></script>
<script src="script.js"></script>
```

## 注意

GitHub PagesではService Workerのキャッシュが残りやすいため、更新後に反映されない場合はDevToolsのApplication > Service WorkersからUnregisterしてください。
