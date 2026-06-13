# ten_otsu v039_188 差分パッチ

## 適用前提
- v039_187 適用済みの状態へ上書き。

## 修正内容
- 対象ストーリー：Lv.70「忘れて、でも忘れないで」
- 対象ファイル：`scenario/v039/events/yozora_affection_70_00_main.json`

### イベントCG追加
- ステップ46：1枚目
- ステップ109：2枚目
- ステップ125：3枚目
- ステップ145：4枚目
- ステップ160相当：3枚目と同じ
- ステップ168相当：6枚目
- ステップ180相当：4枚目と同じ
- ステップ189相当：5枚目と同じ
- ステップ198相当：イベントCG終了

### 追加画像
- `images/assets/cg/cg_yozora_main70_winter_park_01.png`
- `images/assets/cg/cg_yozora_main70_winter_park_02.png`
- `images/assets/cg/cg_yozora_main70_winter_park_03.png`
- `images/assets/cg/cg_yozora_main70_winter_park_04.png`
- `images/assets/cg/cg_yozora_main70_winter_park_05.png`
- `images/assets/cg/cg_yozora_main70_winter_park_06.png`

### ステップ削除
- 旧ステップ153〜159を削除。

### バージョン表示更新
- `index.html`
- `VERSION.txt`
- `program/v039/version.js`
- `scenario/v039/storyIndex.js` の Lv.70 version を `v039_188` に更新。
