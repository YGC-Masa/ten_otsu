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

## v037 integrated battle layout

店舗営業プロトタイプをv037に統合。

- 上部：状態、残り時間、成約、離脱、コンボ、売上Pt
- 中央：家電星人 最大3体
- 下部：メンバー5人固定
- 操作：メンバータップのみ
- ターゲット：選択メンバーに最適な家電星人を自動Fix
- 営業中：開始/終了/おまかせなどのメニューUIは非表示
- 残り10秒：ラッシュ状態
- 必殺：必殺ゲージ100%時にメンバータップで発動

GitHub Pages / PWAで画面が変わらない場合は、メニューの「キャッシュクリア・再読み込み」を実行。


## v037 integrated doubletap

- 店舗営業バトルの操作を変更。
- シングルタップ：通常接客。
- ダブルタップ：必殺技発動。
- 必殺ゲージ100%未満のダブルタップは不発メッセージ表示。
- 通常接客と必殺技の暴発を分離。


## v037_integrated_hpdamage 変更点

- 家電星人のHPを低数値化しました。
  - 通常敵：HP2
  - レア敵：HP3
- メンバーのダメージを固定値化しました。
  - 通常接客：1ダメージ
  - 必殺接客：2ダメージ
  - 特攻キャラ通常接客：2ダメージ
  - 特攻キャラ必殺接客：3ダメージ
- シングルタップは通常接客、ダブルタップは必殺接客のままです。
- 敵の枠色は弱点属性カラー表示を維持しています。

## v037 integrated enemy change update

- 敵カードのダブルタップで家電星人をチェンジできるようにしました。
- チェンジには2秒かかり、その間は「今回は別スタッフへ案内」「少々お待ちください」「別のお客様を先に対応」のいずれかをランダム表示します。
- チェンジ回数は1営業につき3回です。
- チェンジ中の敵はターゲット対象外です。
- RARE家電星人はチェンジ不可です。
- チェンジ時はコンボが0に戻ります。


## v037 integrated enemy double-change update

- 敵チェンジ操作を左右フリックから敵カードのダブルタップに変更。
- 交換時間を1秒から2秒に変更。
- チェンジ回数制限を撤廃。交換中は「今回は別スタッフへ案内」「少々お待ちください」「別のお客様を先に対応」をランダム表示。
- チェンジ時はコンボを0にする。


## v037_autohelp 変更点

- 「おまかせ1手」をオート営業に変更。
- 営業中右上にオートON/OFFボタンを追加。
- 成約10件ごとに「店長ヘルプ」を1つ獲得。最大3個までストック。
- 店長ヘルプ使用時、全メンバーのリキャストをクリアし、画面上の家電星人を一掃成約してオールチェンジ。
- 店長ヘルプボタンは営業中の右上に最大3個表示。


## v037_integrated_autoct 追加修正

- オート営業のペナルティとして、自動操作で発生するメンバーCTを1.5倍に変更。
- 手動操作時のCTは従来通り。
- オート営業開始時・オートON時に「CT1.5倍」の案内を表示。
- Service Worker のキャッシュ名を更新。


## v037 HELP/CUTIN統合版
- 右上に縦3個の HELP! 店長ヘルプボタンを配置。
- 必殺ゲージ100%のキャラカードを白反転表示。
- 必殺技・店長HELP使用時にカットイン演出を表示。
- 残り10秒のラッシュ突入時に「タイムセール開始！」演出を表示。


## v037_integrated_portraitdescfix

- 縦画面でバトル画面が短く潰れる問題を、最終CSS上書きで補正。
- 縦画面ではスクロールを許可し、敵・メンバー領域の最小高さを確保。
- 必殺技カットインに、技名の下へ効果説明文を表示。
- 店長HELP、タイムセール開始にも説明文付きカットインを追加。


## v037_integrated_helpinlinefix
- 店長HELPボタンを右側縦並びから撤去し、全画面で上部HUD内の横並び表示に統一。
- 縦画面でHELPボタンが画面を圧迫しないようCSSを最終上書き。


## v037_integrated_openannounce 更新

- 営業開始時に最前面サーフェイスで「3・2・1・開店！」を表示。
- 営業終了時に最前面サーフェイスで「営業終了！」を表示。
- 店舗営業の世界観に合わせ、開始演出をSTART表記ではなく「開店！」に統一。


## v037_01 version badge update

- 店舗営業：デッキ接客バトルのタイトル横に `v037_01` を表示。
- 次版は `v037_03` に進める運用。
- Service Workerキャッシュ名を `tenotsu-v037-01` に更新。


## v037_03 更新メモ
- 全13キャラ分の弱点属性・属性色・敵マスターを追加。
- 店長HELPボタンをステータスと敵エリアの間に大型横並びで配置。
- HELP表示は右側固定ではなく、バトル中央導線に統一。


## v037_04 更新メモ

- 場の敵と弱点属性が一致するメンバーの枠を発光表示。
- 発光色は敵弱点/キャラクター属性カラーに連動。
- 対応敵数を小バッジで表示。
- Service Worker キャッシュ名を v037_04 に更新。


## v037_05 更新メモ

- オート営業の稼ぎすぎ対策を追加。
- オート中はCT2倍、売上Pt70%、必殺技は使用しない仕様に変更。
- 店長HELPゲージへのペナルティは採用しない。
- メンバータップを pointerdown 処理へ変更して反応を改善。
- シングル/ダブルタップ判定を 300ms から 220ms に短縮。
- メンバーカードのタップ領域と touch-action を補強。
- Service Worker キャッシュ名を v037_05 に更新。
