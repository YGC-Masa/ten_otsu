# v038_11 Surface Manager 関係整理

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

## v038_11 追記

v038_11の `MutationObserver` は、メニュー表示後にDOM再構築を繰り返してハングアップする可能性があったため廃止。以後は起動時・メニュークリック時・API呼び出し時だけ必要な補正を行う。

## v038_11 追記

操作判定系サーフェスを `#tenotsu-operation-surface` として追加。`#click-layer` はストーリー送り専用に戻し、ショップや事務所では operation surface と右メニューが入力を受け取る。

## v038_11 追記

ショップ操作・右メニュー操作は surfaceManager が捕捉した時点で `stopImmediatePropagation()` し、旧ハンドラとの二重実行を防止。バトルUI内のボタンは除外して battle.js に任せる。

## v038_11 追記

ショップ画面では旧左メニュー/旧サブメニューを非表示にし、朔夜立ち絵専用の `#tenotsu-shop-character-layer` を追加。ADV用 `#dialogue-box` はoffice/shopでは非表示にして、surface commentだけを使う。
