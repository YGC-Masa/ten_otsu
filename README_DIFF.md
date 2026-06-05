# v039_106 シナリオ増産・事務所イベント追加

## バージョン運用
- `index.html` の `<title>` を `店長お疲れ様です v039_106` に更新。
- `index.html` 内の CSS/JS キャッシュ用クエリ `?v=` を `v039_106` に更新。
- `program/v039/version.js` を追加し、`window.TENOTSU_BUILD_VERSION = "v039_106"` を設定。
- 今後の差分では、シナリオだけでなく `index.html` とバージョン情報も合わせて更新する。

## v039_105 から引き継ぐ内容
- `scenario/v039/events/kogane_natsu_marinpia.json` を追加。
- 夏イベント「マリンピアの海中トンネル」を `program/v039/eventData.js` に接続。

## v039_106 追加内容
- `scenario/v039/events/sample_hina_kogane_new_juice_002.json` を追加。
- 「事務所にて緋奈＆こがね：新作ジュースは何の味？」を `program/v039/eventData.js` の「その他」カテゴリに接続。
- ユーザー提供の `sample_hina_kogane_new_juice_002_title_text_fix.json` を、現行 `storyPlayer` 用の `v039_steps` 形式へ変換。

## 追加シナリオ
- こがねとなつ：マリンピアの海中トンネル
- 事務所にて緋奈＆こがね：新作ジュースは何の味？

## 注意
- `program/v039/eventData.js` は上書き対象。別ブランチで同ファイルを編集している場合はマージ確認が必要。
- 新作ジュースイベントは、元JSONの `cmd` 形式を現行 `steps` 形式へ変換しているため、BGM/SFX/小物コマンドは一部ナレーションへ折りたたんでいる。
- 回想モードは未実装。次版以降で `recollectionIndex` 方式を検討する。
