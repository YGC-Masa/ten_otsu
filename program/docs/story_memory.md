# Story / Memory Management

## v037_85

追加ストーリー：

| 項目 | 内容 |
|---|---|
| キャラ | 星野 緋奈 |
| Story ID | `aa_memory_spring_bento_001` |
| シナリオ | `memory_hina_spring_bento.json` |
| CG | `aa_memory_spring_bento_cg.png` |
| カラーサムネ | `aa_memory_spring_bento_thumb_color.png` |
| モノクロサムネ | `aa_memory_spring_bento_thumb_mono.png` |

## v037_93

- 緋奈「春の公園でのお弁当タイム」のシナリオを立ち絵演出込みで再構成。
- `a10501.webp` を遭遇時の笑顔、`a10701.webp` を照れ、`a11201.webp` を動揺/強い照れとして使用。
- `bg_memory_hina_spring_bento.png` のイベントCG場面は `hideCharacters: true` で立ち絵非表示。


## v037_93 office mode

タイトル→事務所モード→各種パート→事務所モードのフローに変更。事務所モードでは右6大メニューを完全表示し、通常ストーリー中は右メニューを非表示にする。

## v038_10 メニュー・タイトル表示運用

- 右6大メニューの表示名は番号なしで統一する。
- `index.html` の `<title>` と起動カード内 `.boot-version` は毎版更新する。
- `TENOTSU_ENGINE_VERSION` / `TENOTSU_BOOT_FLOW_VERSION` / `BATTLE_VERSION` / Service Worker cache name も毎版更新対象。
- タイトル画面のランダム立ち絵と下部コメントは連動させる。表示された2〜3名のうち、前面代表キャラのコメントを優先表示する。
