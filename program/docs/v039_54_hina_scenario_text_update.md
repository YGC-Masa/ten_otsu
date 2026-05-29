# v039_54 緋奈 春の公園ストーリー微修正

## 目的

v039_53で挙動確認済みのストーリースタック・センター立ち絵・非表示処理を維持したまま、ユーザー修正版の緋奈ストーリー本文を反映する。

## 変更内容

- `scenario/v039/events/hina_spring_bento.json` を修正版へ差し替え。
- 立ち絵は全てセンター配置を維持。
- `zIndex` 指定は使わず、CSS側のストーリー固定レイヤー順を維持。
- 緋奈退場時の `clearStorySprites: true` / `spriteMode: "hide"` を維持。
- 旧形式互換用 `scenario/scenario/memory_hina_spring_bento.json` も同内容へ同期。

## 注意

貼り付けテキスト内にあった末尾カンマ、注釈行、話者のみで本文のない空ステップは実行用JSONとして整理済み。
