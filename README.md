# After Effects Scripts by Optie

以下の2つの目的を持ったリポジトリである。
- Ae 向けのスクリプト開発を TypeScript で行うための環境
- その作例として、Optie が開発したスクリプトを公開する場

## Setup

```
$ yarn
```

## 開発

`.src/` 以下に、適宜階層化しながら TypeScript で書いていく。

ES5 以上の言語機能を利用する際は、以下の import を行う。

```ts
import 'extendscript-es5-shim-ts'
```

## 動作確認方法

以下では、`src` 直下に `<NAME>.ts` という名前のファイルとして実装していると仮定する。

リポジトリのルートで、

```
$ yarn watch src/<NAME>.ts
```
を実行すると、最新の `<NAME>.ts` が常に反映された `app.jsx` が`.dist/` に生成されるようになる。

watch であれば同じファイル名で同一パスに生成されるので、初回だけ Ae 側のメニューから `Run Script File...` で `app.jsx` を実行すれば、次回以降は Ctrl+Alt+Shift+D で実行が可能になる。（ここ以外で `Run Script File...` による実行は行わない、という運用が必要）

## ビルド

完成したと思ったタイミングで、以下を実行する。

```
$ yarn build src/<NAME>.ts
```

これにより、`dist/build/` 以下に、`<NAME>.js` が生成される。複数ファイルを指定して同時に行うことも可能。

TODO: 出力を jsx にする（これでも問題はないが）
