# ten_otsu v039_267 差分パッチ

## 適用前提
- **v039_266適用済みへ上書き**

## 修正内容
### 日向 なつ → 日向 夏海 への名称更新
- ビリビリ電機関連の実装JSONで、表示名・セリフ・summary・title内の「夏美」表記を**夏海**へ統一しました。
- 対象イベント:
  - `kogane_natsumi_marinpia.json`
  - `event_black_kadenseijin_battle_unlock_003_ayame_line_fix.json`
  - `biribiri_intro_rival_battle_unlock_003_flow_fix.json`

### ビリビリメンバー立ち絵のカウボーイショット化
- 以下の立ち絵アセットを、ユーザー添付のカウボーイショット素材へ差し替えました。
  - `images/assets/rival/story_koharu_stand.png`
  - `images/assets/rival/story_mafuyu_stand.png`
  - `images/assets/rival/story_natsu_stand.png`
- 既存のJSON参照先はそのままなので、これらのアセットを使用する既存イベントにも反映されます。

## 更新ファイル
- `scenario/v039/events/kogane_natsumi_marinpia.json`
- `scenario/v039/events/event_black_kadenseijin_battle_unlock_003_ayame_line_fix.json`
- `scenario/v039/events/biribiri_intro_rival_battle_unlock_003_flow_fix.json`
- `images/assets/rival/story_koharu_stand.png`
- `images/assets/rival/story_mafuyu_stand.png`
- `images/assets/rival/story_natsu_stand.png`
- `program/v039/version.js`
- `VERSION.txt`
- `index.html`
- `README_DIFF.md`

## 確認
- JSON構文チェック済み
- PNG出力確認済み
- バージョン表示: v039_267
