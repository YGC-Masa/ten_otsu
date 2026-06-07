# v039_120 ひだまりストア外観時間帯背景アセット追加

## 目的

ひだまりストア外観の時間帯差分背景を、シナリオや外回りで参照できるように追加します。

## 追加アセット

```text
images/assets/bg/bg_hidamari_store_front_early_morning.png
images/assets/bg/bg_hidamari_store_front_morning.png
images/assets/bg/bg_hidamari_store_front_day.png
images/assets/bg/bg_hidamari_store_front_evening.png
images/assets/bg/bg_hidamari_store_front_night_open.png
images/assets/bg/bg_hidamari_store_front_closed.png
```

## backgroundCatalog 登録名

```text
hidamari_store_front_early_morning
hidamari_store_front_morning
hidamari_store_front_day
hidamari_store_front_evening
hidamari_store_front_night_open
hidamari_store_front_closed
```

## 外回り追加

```text
ひだまりストア前
```

初期背景は昼版です。

```text
images/assets/bg/bg_hidamari_store_front_day.png
```

## パッチ方針

このZIPは v039_119 以降へ上書きする差分です。
今回は新規背景アセット追加なので画像を同梱していますが、既存の重い背景アセットは再同梱していません。
