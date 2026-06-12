# ten_otsu v039_181 背景・ランドマーク追加パッチ

## 適用前提

- v039_179 以降に上書き適用してください。
- このZIPは、背景画像2枚と背景カタログ追加用の補助JSを同梱しています。
- 既存の重い背景アセットは同梱していません。
- 画像生成は行っていません。アップロード済み画像をゲーム背景用に 1920x1080 へ整えています。

## 追加ファイル

- `images/assets/bg/bg_akari_dori_night.png`
- `images/assets/bg/bg_residential_area_night.png`
- `program/v039/backgroundCatalog_v039_181_additions.js`
- `program/v039/version.js`
- `VERSION.txt`

## 追加背景ID案

| 背景ID | 表示名 | 画像パス |
|---|---|---|
| `akari_dori_night` | 駅前あかり通り：夜 | `images/assets/bg/bg_akari_dori_night.png` |
| `residential_area_night` | 住宅街：夜 | `images/assets/bg/bg_residential_area_night.png` |

## index.html への読み込み追加が必要な場合

既存の `backgroundCatalog.js` 読み込み後、または `storyPlayer.js` より前後どちらか実動する位置に、次を追加してください。

```html
<script src="program/v039/backgroundCatalog_v039_181_additions.js"></script>
```

※現在このチャットには既存の `index.html` 本体がないため、index.html の自動差し替え版は同梱していません。
既存 index をアップロードしてもらえれば、読み込み行を挿入した完全版パッチにできます。

## Google Drive / 02_ランドマーク 追記用

- 駅前あかり通り：夜 / `akari_dori_night` / `images/assets/bg/bg_akari_dori_night.png`
- 住宅街：夜 / `residential_area_night` / `images/assets/bg/bg_residential_area_night.png`

