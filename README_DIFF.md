# v039_112 ニーショット下揃え＋背景追加＋夜空キーストーリー表情調整

## 基準
- v039_111までを含む上書き差分です。

## 変更内容
1. ストーリーモードのキャラ立ち絵をニーショット前提にし、画面下端へボトム揃え。
2. `scenario/v039/events/yozora_affection_00_01_key.json` を表情てこ入れ版へ差し替え。
3. ひだまりストア倉庫背景を追加。
4. プラネタリウム背景4種を追加。
5. `scenario/v039/backgroundCatalog.js` を追加し、背景パスを参照しやすく整理。
6. `townEncounterConfig.js` に星見ヶ丘プラネタリウムの場所データを追加。

## 追加背景
- `images/assets/bg/bg_hidamari_warehouse.png`
- `images/assets/bg/bg_planetarium_exterior_twilight.png`
- `images/assets/bg/bg_planetarium_lobby.png`
- `images/assets/bg/bg_planetarium_hall_before_show.png`
- `images/assets/bg/bg_planetarium_hall_showing.png`

## 注意
- `storyLayout.js` と `storyMenu.css` を更新しています。キャラ立ち絵はテキストボックスの裏に回り込む場合がありますが、ニーショット素材の足元を画面下に合わせる方針を優先しています。
- 夜空キーストーリーの開始背景は、追加した倉庫背景へ差し替えています。
