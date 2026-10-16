# v039_103 story bg blackfade / rival kneeshot

## 変更内容

- 共通オープニング「家電星人襲来」のステップ59〜80から `bg` / `bgMode` を削除し、桃の危ない発言から金塊確認の流れで背景が切り替わらないようにした。
- ストーリー中に背景が変わる場合、黒フェードでブラックアウト→背景差し替え→ブラックインする処理を追加した。
- 既存のモバイル用フェード抑止CSSに対し、意図的な背景変更フェード中だけ `.tenotsu-story-bg-blackfade` を例外として表示可能にした。
- ビリビリメンバーのストーリー立ち絵をさらに拡大し、膝下が画面外へ出るニーショット寄せにした。

## 対象

- `scenario/v039/events/common_opening_kadenseijin_raid_002_all_cast.json`
- `scenario/data/common_opening_kadenseijin_raid_002_all_cast.source.json`
- `program/v039/storyPlayer.js`
- `program/v039/core.css`
