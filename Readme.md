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

## v037 デッキ接客バトル試作追加

店舗営業プロトタイプとして、`battle.js` を追加しました。

### 基本仕様

- 制限時間：30秒
- デッキ：5人
- 最大同時来店：家電星人3体
- 20秒経過後、残り10秒からラッシュ状態
- 店員カードをタップして選択し、家電星人をタップして接客
- 属性一致で大きく接客ゲージを減らす
- 各店員にCTと必殺ゲージあり
- 必殺技：接客力アップ、受付時間延長、PC一括対応、CT短縮、ラッシュ対応強化
- `listmenu/title.json` の「店舗営業プロトタイプ」から起動可能
- `listmenu/mainmenu.json` に6項目メニュー案を追加

### 追加ファイル

- `battle.js`
- `listmenu/mainmenu.json`
- `listmenu/home.json`
- `listmenu/members.json`
- `listmenu/shop.json`
- `scenario/town_placeholder.json`


## v037 battle tapfix

- 営業中は店員カードのタップ時点で対応を確定する方式に変更。
- 店員タップ時に、相性・受付時間・RARE・成約可能性から対象家電星人を自動選択。
- 営業開始後は、営業終了まで開始/終了/おまかせ等の操作メニューを非表示。
- 家電星人タップは営業中の主要操作から外し、店員カード操作を主操作に統一。
