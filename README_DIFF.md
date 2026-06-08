# v039_131 セリフ内地の文分離パッチ

## 概要
夜空メイン100「二人だから、少し素直になる」内で、話者付きセリフの末尾に `\n――` で続いていた地の文を、`speaker: ""` の独立ステップへ分離しました。

## 方針

修正前のような形式は避けます。

```json
{
  "speaker": "美空",
  "text": "何回でも言うよ。\n――美空は夜空のマフラーを少し直す。"
}
```

修正後は、セリフと地の文を分けます。

```json
{
  "speaker": "美空",
  "text": "何回でも言うよ。"
},
{
  "speaker": "",
  "text": "――美空は夜空のマフラーを少し直す。"
}
```

## 更新ファイル
- `index.html`
- `VERSION.txt`
- `README_DIFF.md`
- `program/v039/version.js`
- `program/v039/state.js`
- `program/v039/office.js`
- `scenario/v039/events/yozora_affection_100_00_main.json`

## 注意
画像アセットは同梱していません。v039_130以降へ上書きする軽量差分です。
