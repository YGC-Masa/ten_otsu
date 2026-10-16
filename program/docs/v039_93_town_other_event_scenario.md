# v039_93 外回り「その他・イベント」メニュー追加

## 実装

- 外回りトップに「その他」「イベント」カテゴリを追加。
- 「その他」に、共通オープニング「家電星人襲来・全員登場版」を登録。
- `common_opening_kadenseijin_raid_002_all_cast.json` を既存 storyPlayer が読める `steps` 形式へ変換。
- 変換済みシナリオを `scenario/v039/events/common_opening_kadenseijin_raid_002_all_cast.json` に配置。
- 元JSONを `scenario/data/common_opening_kadenseijin_raid_002_all_cast.source.json` に保存。

## メニュー

```text
外回り
├ 春
├ 夏
├ 秋
├ 冬
├ その他
└ イベント
```

## その他

```text
共通オープニング：家電星人襲来・全員登場版
```

## イベント

```text
月間イベント：汚れた家電星人清掃
```

現時点では確認用導線。イベントバトル本体は店舗営業のイベント営業側から接続。
