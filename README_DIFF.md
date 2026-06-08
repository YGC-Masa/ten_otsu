# v039_132 正式背景整理＋総合運動公園不足メモ

## 内容

以下の背景を正式採用扱いとして整理しました。

```text
images/assets/bg/battle_store_lv1.png
images/assets/bg/bg_hidamari_warehouse.png
images/assets/bgev/bg_office_hidamari.png
```

## 追加・整理した backgroundCatalog エントリ

```text
hidamari_store_sales_floor
battle_store_lv1
hidamari_warehouse
hidamari_office
office_hidamari
```

## 未制作として残る背景

```text
日和坂総合運動公園・武道イベント会場
```

現状は旧シナリオ互換用に以下のカタログ名を追加し、みなと公園フェス背景へ暫定接続しています。

```text
hiyorizaka_sports_park_budokan_evening
hiyorizaka_sports_park_budokan
→ images/assets/bg/bg_minato_event_plaza_festival.png
```

正式な総合運動公園・武道イベント会場背景が作成されたら、この2エントリの path を正式画像へ差し替えます。

## 更新ファイル

```text
index.html
VERSION.txt
README_DIFF.md
program/v039/version.js
program/v039/state.js
program/v039/office.js
scenario/v039/backgroundCatalog.js
```

画像アセットは同梱していません。
これは v039_131 以降へ上書きする軽量差分ZIPです。
