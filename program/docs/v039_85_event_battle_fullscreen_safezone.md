# v039_85 イベントバトル表示エリア全域化 / SAFEZONE対応

## 目的

v039_84で追加したイベントバトル通常モードのTAP / FLICK / HOLD操作は動作自体は良好だったため、表示・操作エリアを小さなパネル内から画面全域へ拡張する。

ただし、スマホ横画面では画面端のOSジェスチャーや誤タップが起きやすいため、画面端にはSAFEZONEを設ける。

## 変更内容

- 通常モードの操作フィールドを画面全域ベースに変更
- 画面端にSAFEZONEを追加
- TAPサークルの出現範囲を拡大
- FLICK矢印の出現範囲を拡大
- HOLD左右ボタンを端に寄せすぎないよう調整
- RUSH MODEの5レーンパネルもSAFEZONE内で横幅を広く使用
- HUDとボス情報はコンパクトなオーバーレイ表示へ変更

## SAFEZONE

CSS変数として以下を追加。

```css
--event-safe-x
--event-safe-y
--event-safe-top
--event-safe-right
--event-safe-bottom
--event-safe-left
```

端末の `env(safe-area-inset-*)` と独自余白を合成し、ノッチ・ホームバー・OSジェスチャー領域を避ける。

## 操作範囲

通常モードでは以下を画面全域で扱う。

- 青サークルTAP
- 緑矢印FLICK
- ピンク左右HOLD

ただし、各ターゲットの生成範囲はSAFEZONE内に制限する。

## ラッシュモード

RUSH MODEも5レーンがSAFEZONE内で大きく表示されるように調整。

- KICK
- SNARE
- HIGH TOM
- LOW TOM
- CRASH

## 備考

今回の変更は表示領域と操作領域の改善のみ。判定ロジック、ノーツパターン、ラッシュ報酬処理はv039_84から維持。
