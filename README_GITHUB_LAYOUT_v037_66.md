# v037_66 GitHub配置 / 初期シナリオ修正

## 修正内容

GitHub上に既に存在している `scenario/scenario/000start.json` を使うため、プログラム側の初期シナリオ指定を戻しました。

```js
let currentScenario = "000start.json";
```

## 理由

`start000.json` がGitHub側に未配置の場合、以下の404が出るためです。

```text
scenario/scenario/start000.json 404
```

## 配置

```text
repo-root/
├─ index.html
├─ serviceWorker.js
├─ program/
├─ scenario/
└─ images/
```

この差分ではシナリオファイル追加は不要です。
