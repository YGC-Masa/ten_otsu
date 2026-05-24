# v038_24 → v038_25 office slot guard 差分

## 修正内容
- 事務所メンバースロット表示後に、旧後方スロットが2〜3回表示される問題を抑止。
- office/shop/members/settings中は #char-layer を非表示。
- #tenotsu-front-character-layer 以外の旧ランダム/旧office表示DOMを削除。
- officeSlotGuard を短時間走らせ、遅延して復活する旧DOMを掃除。
- randomImagesOn/randomTextsOn/buildRandomImagesをsurface takeover中はno-opへ上書き。
- storyモード時のみ #char-layer を復帰。

リポジトリ直下へ展開して上書きしてください。
