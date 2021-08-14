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

とすると、`.dist/` に最新の `<NAME>.ts` が常に反映された `app.js` が生成されるようになるので、これを AfterEffects から実行する。

