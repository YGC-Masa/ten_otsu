# ten_otsu v039_83 → v039_84 差分

イベントバトル通常モードの入力挙動を変更し、ラッシュモード突入演出を追加しました。

## 主な変更

- 通常モードのTAPを、青い小サークル＋水色収縮リングの判定方式へ変更
- 画面上に2〜3個の青サークルを表示
- 緑の矢印FLICKを、矢印方向へのフリック判定へ変更
- ピンク左右HOLDを追加
- 左右HOLD後、ビリビリエフェクト完了で左右外側フリック判定
- シールド0後に「これよりラッシュモード」演出と3カウントを追加
- ラッシュノーツの落下速度を遅めに調整
- ラッシュ終了を、最後のノーツ/ゴーストが画面外へ抜ける余韻まで待つように変更
- ラッシュは4/4の8ビート基準のフィルインとして整理

## 更新ファイル

- index.html
- program/v039/state.js
- program/v039/eventBattle.js
- program/v039/eventBattle.css
- program/docs/v039_84_event_battle_input_rework.md
- release_notes.md
- CHECKSUMS.json
- VALIDATION.json
