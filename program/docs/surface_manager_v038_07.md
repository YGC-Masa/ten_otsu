# v038_21 Surface Manager 関係整理

## 目的
差分適用を重ねた結果、`script.js` / `style.css` 内に複数世代の事務所モード、ショップモード、z-index補正が残っていたため、最終権限を後読みの小さな管理ファイルへ分離する。

## 追加ファイル

- `program/surfaceManager.css`
- `program/surfaceManager.js`

## 読み込み順

`index.html` では以下の順に読み込む。

1. `program/style.css`
2. `program/chardispsetting.css`
3. `program/surfaceManager.css`
4. 既存JS群
5. `program/script.js`
6. `program/surfaceManager.js`

最後に読み込む `surfaceManager.js` が、既存の診断用関数を中和し、画面モード・背景・事務所キャラ・ショップ挨拶・バトル入力優先を管理する。

## z-index

| 対象 | z-index |
|---|---:|
| 背景 | 0 |
| タイトル/ランダム | 20 |
| 通常キャラ | 120 |
| EV/CG | 180 |
| クリック | 240 |
| 会話欄 | 420 |
| 選択肢 | 440 |
| 事務所キャラ | 520 |
| メニュー | 800 |
| コメント | 900 |
| バトル | 30000 |
| フェード | 50000 |
| システム | 70000 |
| 起動表示 | 200000 |

## 事務所モード

- 背景：`images/assets/bgev/bg_office_hidamari.png`
- キャラ：`#tenotsu-surface-office-layer`
- コメント：`#tenotsu-surface-comment`
- 右メニュー：`#list-panel` を6大メニューへ再構築

## ショップモード

- 背景：`images/assets/bgev/bg_exchange_item_counter.png`
- 初回：`shop_exchange_intro_sakuya.json`
- 2回目以降：朔夜のランダム挨拶

## 注意
過去の検証用レイヤーはCSS/JSで中和する。

- `#tenotsu-office-force-layer`
- `#tenotsu-office-force-comment`
- `#tenotsu-office-character-overlay`
- `#office-character-layer`

## v038_21 追記

v038_21の `MutationObserver` は、メニュー表示後にDOM再構築を繰り返してハングアップする可能性があったため廃止。以後は起動時・メニュークリック時・API呼び出し時だけ必要な補正を行う。

## v038_21 追記

操作判定系サーフェスを `#tenotsu-operation-surface` として追加。`#click-layer` はストーリー送り専用に戻し、ショップや事務所では operation surface と右メニューが入力を受け取る。

## v038_21 追記

ショップ操作・右メニュー操作は surfaceManager が捕捉した時点で `stopImmediatePropagation()` し、旧ハンドラとの二重実行を防止。バトルUI内のボタンは除外して battle.js に任せる。

## v038_21 追記

ショップ画面では旧左メニュー/旧サブメニューを非表示にし、朔夜立ち絵専用の `#tenotsu-shop-character-layer` を追加。ADV用 `#dialogue-box` はoffice/shopでは非表示にして、surface commentだけを使う。

## v038_21 追記

人物表示切り分けとして `#tenotsu-front-character-layer` を追加。これは `#tenotsu-operation-surface` のすぐ下に置く。office/shopのコメントは `#tenotsu-surface-comment` ではなく既存の `#dialogue-box` を下部共用欄として使用する。ブラックフェードは `#tenotsu-safe-fade` で非ブロッキング化。

## v038_21 追記

最良実装として、旧 `#list-panel` / `#menu-panel` を非表示化し、新規 `#tenotsu-main-menu` に完全移行。非ADV画面は surfaceManager が単一責任者として管理する。office/shop人物は `#tenotsu-front-character-layer`、操作は `#tenotsu-operation-surface`、コメントは既存 `#dialogue-box` に統一。

## v038_21 追記

起動中に旧bootフローが停止しても `surfaceManager` が非再帰のタイマーでofficeへ入る。MutationObserverは使わない。検証ではブラウザ上で初期化・office・shop・戻る・battle-root表示の確認を行う。

## v038_21 追記

`script.js` 実行後では間に合わない初期化停止対策として `bootRescue.js` を `script.js` の前に読み込む。旧MutationObserver系を無効化し、旧エンジンガードのfallback発火を非表示プレースホルダで防ぐ。

## v038_21 追記

起動時の表示キャラ/コメントと通常ADVのキャラスロット/テキスト欄が別系統になっていたため、コメントは `#dialogue-box` に統一。旧上部コメント欄は明示的に非表示。ショップではキャラ表示を消し、交換所背景とパネルを優先する。

## v038_21 追記

`randomShows.js` が起動時/タイトル用に別キャラ・別コメントサーフェスを作っていたため、surfaceManager takeover中はno-op化。表示は `#tenotsu-front-character-layer` と `#dialogue-box` に統一。背景は `#background` に加えて `#game-container` CSS背景でもフォールバック表示する。

## v038_21 追記

バトル終了時は、先に事務所を描画してから黒を被せるのではなく、黒フェードアウト完了後に事務所へ切り替え、その後フェードインする。`battle.js` の即時office復帰は抑止し、`surfaceManager.safeFade()` が画面切替タイミングを管理する。

## v038_21 追記

起動時と通常事務所突入時の二重描画を避けるため、officeキャラ描画を `#tenotsu-front-character-layer` の単一レンダリングに固定。`randomShows.js` はsurface takeover中は表示しない。背景は `#background` と `#game-container` fallbackの両方で保持。hold動作用に `#tenotsu-hold-surface` を追加。

## v038_21 追記

非ADV画面はsurfaceManager単一管理に固定。旧random/title/office表示DOMは削除、背景は `#background` と `#game-container` の二重指定、メンバー/設定は仮パネルへ接続。`#dialogue-box` を最前面寄りにし、右メニュー操作のエラー停止を避ける。

## v038_21 追記

`randomImagesOn()` はsurface takeover中に `[]` を返し、旧DOMと `__TENOTSU_TITLE_RANDOM_SELECTED` を破棄する。事務所では右6大メニューを常時表示し、ショップクリック時は `#tenotsu-main-menu` を隠して `#tenotsu-shop-menu` に入れ替える。ショップ操作は右ショップメニューに集約。
