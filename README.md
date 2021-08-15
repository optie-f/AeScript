# After Effects Scripts by Optie

## Setup

```
$ yarn
```

## 開発

`.src/` 以下に、適宜階層化しながら TypeScript で書いていく。

以下では、`src` 直下に `<NAME>.ts` として実装していると仮定する。

```
$ yarn watch src/<NAME>.ts
```

とすると、`.dist/` に最新の `<NAME>.ts` が常に反映された `app.jsx` が生成されるようになるので、これを AfterEffects から実行してテストする。（`.vscode/tasks.json`に、このレポジトリがWSLのホームディレクトリ上にある前提のもとで、コマンドラインから `dist/app.jsx` を Ae 2021 で実行するタスクの作成を試みているが、現時点で成功していない。）

完成したと思ったタイミングで、以下を実行する。

```
$ yarn build src/<NAME>.ts
```

これにより、`dist/build/` 以下に、`<NAME>.js` が生成される。これは複数ファイルを指定して同時に行うことも可能。
