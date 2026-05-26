# v039_29 テキストエリア統一レイアウト方針

下部テキストエリアの座標管理を営業/バトルだけでなくストーリーモードにも統合した。

## 追加した主なCSS変数

```text
--tenotsu-text-height-office
--tenotsu-text-height-story
--tenotsu-text-left
--tenotsu-text-right
--tenotsu-text-bottom
--tenotsu-text-reserve
```

## 方針

- story：ADV風テキスト欄を高さ可変・スクロール可能にし、CGやUIとの干渉を軽減
- battle / result：プレイ領域優先のため下部テキスト欄は非表示
- office / members / town / shop / sales：右メニューとsafe-areaを考慮
