# Prisma tutorial

- [Prisma の導入とメリットを考える](https://qiita.com/am_765/items/5e42bd5f87b296f61fbc)

## ORM である Prisma を利用する

## はじめに

Node.js + TypeScript によるサーバーサイドの開発は、クライアントサイドとスクリプトを同じ言語で管理できるなどのメリットがあります。
その際に使用するのが、Node.js ウェブフレームワークであり、データベース連携は必要不可欠です。
ですが、普段データベースに触れる機会が少ないデータベース初心者にとって、SQL 文を書くのはハードルが高く感じます。

そういった状況で役に立つのが、「Object-Relational Mapping / オープンソースのオブジェクト関係マッピング」(以降 ORM)です。
「[Prisma](https://www.prisma.io/)」は Node.js ORM の 1 つです。
本記事では、Prisma についての理解を深めることを目的とします。

## 前提と対象読者

以下の知識や経験があり、

- Node.js の基礎知識
- Node.js ウェブフレームワークの使用経験

以下の考えをお持ちの方。

- Node.js による ORM に興味がある
- フロントエンドもバックエンドも同じ言語(JavaScript / TypeScript)で実装したい
- 型安全な開発がしたい
- データベースには不慣れだが手軽に API を実装したい

## 本記事の目的とゴール

ORM については、[オブジェクト関係マッピング - Wikipedia](https://ja.wikipedia.org/wiki/%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E9%96%A2%E4%BF%82%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0) にて以下の説明がされています。

オブジェクト関係マッピング（英: Object-relational mapping、O/RM、ORM）とは、データベースとオブジェクト指向プログラミング言語の間の非互換なデータを変換するプログラミング技法である。オブジェクト関連マッピングとも呼ぶ。実際には、オブジェクト指向言語から使える「仮想」オブジェクトデータベースを構築する手法である。

簡単に言うと、プログラミング言語のオブジェクトで定義したメソッドで、SQL を書かずにデータベースの操作が可能なツールということです。
データベースの操作や管理を仲介する役割を持っています。
また、データベースの作成やマイグレーションといった操作も可能です。

## なぜ Node.js にて ORM を利用するのか

Node.js には、リレーショナルデータベースに対する統一的なインターフェースが存在しません。
リレーショナルデータベースにアクセスするためには、npm パッケージを利用します。
アクセス方法は各データベースにより異なります。
さらに以下の点を考慮する必要があります。

- 各データベースごとに公式・非公式問わず npm パッケージが複数存在する
- 各データベースの npm パッケージは開発・保守が止まっているものもある

以上のことから、npm パッケージの選定を慎重に行わなければなりません。
そこで ORM を利用します。
ORM を利用することにより、各データベース※へのアクセスを一律に担ってくれます。
さらに、先述したとおり SQL を書かずにオブジェクトで定義されたメソッドでデータベースの操作が可能になります。そのため、JavaScript もしくは TypeScript で記述することができます。

※ [mongoose](https://mongoosejs.com/) のように 1 つのデータベースを対象にした ORM も存在します。

## Prisma 概要

Prisma は、[公式](https://www.prisma.io/)にて以下の宣言をしています。

Prisma unlocks a new level of developer experience when working with databases thanks to its intuitive data model, automated migrations, type-safety & auto-completion.

Prisma は、直感的なデータモデル、自動マイグレーション、型安全性、自動補完機能により、データベースを使用する際の新しいレベルの開発者体験を提供します。

Prisma は Node.js を対象としたオープンソース ORM です。  
型安全なデータベースアクセスが特徴で、TypeScript との相性が良いです。  
Prisma を構成するモジュールは以下の 3 つです。

- Prisma Client
- Prisma Migrate
- Prisma Studio

### Prisma Client

Node.js, TypeScript のための、データに合わせて自動生成される型安全なクエリビルダー。  
メソッドでデータベースを操作するための機能です。

### Prisma Migrate

マイグレーションシステム。設定ファイル（schema.prisma）に基づき実行されます。

### Prisma Studio

データベースを操作するための GUI ツールです。

## データベース・フレームワーク・ライブラリとの連携

下記のとおり、様々なデータベース・フレームワーク・ライブラリと連携が可能です。

### データベース

- PostgreSQL
- MySQL
- SQLite
- MongoDB
- etc...

### フレームワーク・ライブラリ

- Next.js
- Nest.js
- Apollo
- GraphQL
- Express
- Fastify
- etc...

## 他 ORM との比較

[Sequelize](https://sequelize.org/) や [TypeORM](https://typeorm.io/) が同じ Node.js の ORM として比較されることが多いです。
以下の図は過去 1 年のダウンロード数の比較です。

![](./README-img/img1.avif)

出典：npm trends
詳細な比較は以下を参照ください。

- Comparing Prisma / Sequelize
- Comparing Prisma / TypeORM
  下記は、以前 Sequelize を使用した際に不便を感じた点です。

- Sequlize + TypeScript の組み合わせで実装すると、TypeScript 対応のための追加モジュールが必要になり、記述も冗長になる
- データ取得の際の条件指定も専用の比較演算子を使用する必要があり、慣れが必要
  Prisma は上記の問題がありませんでした。
  特に、TypeScript を使用する際に特別な設定・記述をする必要がなく、強力な型サポートを受けることができます。

## Prisma の導入と利用方法

今回は React・Express・MySQL・Prisma の構成※1 で CRUD 操作ができる簡易的な書籍アプリ※2 を作成したので、こちらを例に説明します。

![](./README-img/img2.avif)

※1 React、Express、MySQL のインストールや詳細設定については省略します。  
※2 参考：React / Express で作る Web アプリケーション開発入門

手順は以下のとおりです。

- Prisma のインストール
- schema.prisma の設定
- マイグレーション
- API の実装(Express)
- Prisma studio の起動

### prisma のインストール

以下のコマンドを実行します。

```sh
npm i @prisma/client
# or
yarn add @prisma/client
```

### schema.prisma の設定

Prisma をインストールすると prisma ディレクトリ内に schema.prisma が作成されます。  
schema.prisma に必要な設定を追加します。

-> と書いてあるが、ディレクトリは作成されない。ので、自作する
-> 作成すると VSCcode のエクステンションが推奨されたのでインストールした

`.vscode/extensions.json`

```json
{
  "recommendations": ["prisma.prisma", "prisma.prisma-insider"]
}
```

`schema.prisma`

```sh
generator client {
  provider = “prisma-client-js”
}
datasource db {
  provider = “mysql”
  url      = env(“DATABASE_URL”)
}
model books {
  id Int @id @default(autoincrement())
  title String
  author String
  overview String
  created_at DateTime @default(now())
  updated_at DateTime @default(now())
}
```

-> めちゃくちゃエラーでる

```sh
Argument "provider" is missing in generator block "client".
Error validating: This line is not a valid definition within a generator.
Argument "provider" is missing in data source block "db".
Error validating: This line is not a valid definition within a datasource.
Error validating: This line is not a valid definition within a datasource.
```

-> 一旦[公式](https://www.prisma.io/docs/concepts/components/prisma-schema)を確認しよう！
-> コード自体は間違っているわけではなさそう？一旦先を確認する

-> 一応記事内容を記載

- generator client は prisma generate コマンドの対象を設定する
  - ファイルの内容を更新してマイグレーションをした際に実行される
- datasource db は使用するデータベースの情報を設定する
  - url は環境変数を使用
- model books はデータモデルを設定する。model の後にテーブル名を指定し、フィールド・データタイプ、オプションを設定
  - @default はデフォルト値を設定可能

-> 確認すると Express 側の設定がないことが原因っぽいので[記事](https://www.seplus.jp/dokushuzemi/blog/2021/12/tutorial_react_express.html)を参考に express を用意する

## Express の準備

### インストール

```sh
npm i express-generator

npm WARN deprecated mkdirp@0.5.1: Legacy versions of mkdirp are no longer supported. Please update to mkdirp 1.x. (Note that the API surface has changed to use Promises in 1.x.)

added 10 packages, and audited 13 packages in 2s

5 vulnerabilities (1 high, 4 critical)

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
```

### ejs をテンプレートエンジンにした新しいプロジェクトを作成

```sh
# 記事ではこのように直接プロジェクトルートに作成している
npx express --view=ejs .

# 念のため backend ディレクトリを用意する
npx express --view=ejs backend
```

出来上がりは以下

```sh
# ディレクトリ移動
cd backend
# 第一階層だけ表示
tree -L 1

.
├── app.js
├── bin
├── package.json
├── public
├── routes
└── views
```

### サーバのポートを 8080 に変更する

bin/www ファイルの 15 行目を編集

```diff
-var port = normalizePort(process.env.PORT || '3000');
+var port = normalizePort(process.env.PORT || '8080');
```

### 起動コマンドを確認する

`backend/package.json`をみると

```json
...
  "scripts": {
    "start": "node ./bin/www"
  },
...
```

となっているので、

`package.json`に下記を追加する

```json
...
"scripts": {
    "express": "node backend/bin/www"
  },
...
```

起動してみる

```sh
npm run express

> prisma-tutorial@1.0.0 express
> node backend/bin/www

node:internal/modules/cjs/loader:1078
  throw err;
  ^

Error: Cannot find module 'http-errors'
Require stack:
- /Users/encoolus/Desktop/Github/@ysk3da/prisma-tutorial/backend/app.js
- /Users/encoolus/Desktop/Github/@ysk3da/prisma-tutorial/backend/bin/www
    at Module._resolveFilename (node:internal/modules/cjs/loader:1075:15)
    at Module._load (node:internal/modules/cjs/loader:920:27)
    at Module.require (node:internal/modules/cjs/loader:1141:19)
    at require (node:internal/modules/cjs/helpers:110:18)
    at Object.<anonymous> (/Users/encoolus/Desktop/Github/@ysk3da/prisma-tutorial/backend/app.js:1:19)
    at Module._compile (node:internal/modules/cjs/loader:1254:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1308:10)
    at Module.load (node:internal/modules/cjs/loader:1117:32)
    at Module._load (node:internal/modules/cjs/loader:958:12)
    at Module.require (node:internal/modules/cjs/loader:1141:19) {
  code: 'MODULE_NOT_FOUND',
  requireStack: [
    '/Users/encoolus/Desktop/Github/@ysk3da/prisma-tutorial/backend/app.js',
    '/Users/encoolus/Desktop/Github/@ysk3da/prisma-tutorial/backend/bin/www'
  ]
}

Node.js v18.16.0
```

エラー。必要なファイルが足りないっぽい

```sh
cd backend
npm i
```

もっかい起動

```sh
cd ../
npm run express
```

自動で開かない^^;

http://localhost:8080/ へアクセス

動いてる!

### Prisma を設定する

ディレクトリとファイルの生成は自動ではなく init コマンドだった模様  
yarn だと init までやってくれるのかもしれないが、、、

一旦手動で作成したディレクトリを削除して、backend のなかに作る

```sh
cd backend
npm i @prisma/client .
npx prisma init
```

できた！

#### env ファイルの DATABASE の接続先を変更

接続先の DB がない、、、  
事前に用意する必要があった模様

SQLite でやろう。
[Prisma 公式](https://www.prisma.io/docs/getting-started/quickstart)にも書いてあった。

試しに tutorial に従い操作してみる

```sh
cd backend
npm install typescript ts-node @types/node --save-dev
npx tsc --init

Created a new tsconfig.json with:
                                                                                                                     TS
  target: es2016
  module: commonjs
  strict: true
  esModuleInterop: true
  skipLibCheck: true
  forceConsistentCasingInFileNames: true


npx prisma init --datasource-provider sqlite

 ERROR  A folder called prisma already exists in your project.
        Please try again in a project that is not yet using Prisma.
```

すでにあるとだめな模様
.env と prisma/ を削除して再度実行

```sh
npx prisma init --datasource-provider sqlite

✔ Your Prisma schema was created at prisma/schema.prisma
  You can now open it in your favorite editor.

warn You already have a .gitignore file. Don't forget to add `.env` in it to not commit any private information.

Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Run npx prisma db pull to turn your database schema into a Prisma schema.
3. Run npx prisma generate to generate the Prisma Client. You can then start querying your database.

More information in our documentation:
https://pris.ly/d/getting-started
```

`backend/prisma`ディレクトリに`dev.db`ファイルを作成する

VScode の推奨エクステンションが表示されたのでインストールした。

`.vscode/extensions.json`

```diff
{
  "recommendations": [
    "prisma.prisma",
    "prisma.prisma-insider",
+    "mtxr.sqltools",
+    "qwtel.sqlite-viewer"
  ]
}
```

`backend/prisma/schema.prisma`を確認すると以下のようになっている

```js
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

公式のサンプルを読むに、データモデルを定義しろ、ということの模様。  
それに伴い、CLUD の部分も記述せよ、ということのようだ。

公式では User と Post を定義しているが、Qiita の記事の方は books を定義している

ここでは books の方を書いてみよう。

`backend/prisma/schema.prisma`

```js
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model books {
  id         Int      @id @default(autoincrement())
  title      String
  author     String
  overview   String
  created_at DateTime @default(now())
  updated_at DateTime @default(now())
}

```

[こちら](https://www.seplus.jp/dokushuzemi/blog/2021/12/tutorial_react_express.html)のつづきを行う。

## マイグレーションを実行

```sh
npx prisma migrate dev --name init --preview-feature

Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Datasource "db": SQLite database "dev.db" at "file:./dev.db"

Applying migration `20230808063957_init`

The following migration(s) have been created and applied from new schema changes:

migrations/
  └─ 20230808063957_init/
    └─ migration.sql

Your database is now in sync with your schema.

✔ Generated Prisma Client (5.1.1 | library) to ./node_modules/@prisma/client in 31ms
```

### コードを自動生成

````sh
npx prisma generate

Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma

✔ Generated Prisma Client (5.1.1 | library) to ./node_modules/@prisma/client in 29ms
You can now start using Prisma Client in your code. Reference: https://pris.ly/d/client
```

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

```
````

### Prisma には GUI のデータベース操作ツール Prisma studio があるので操作してみる

```sh
npx prisma studio
```

無事に動いてる

## Express にルーティングを追加する

API を実装していく。データがないのでダミーデータを返すようにして GET を実装する

### /books をルーティングに追加する

その前にルーティングです。 users というエンドポイントはデフォルトで用意されているので、 books を追加し、ダミーデータを返すようにします。

`backend/routes/books.js`

```js
var express = require('express');
var router = express.Router();

/* GET books listing. */
router.get('/', function (req, res, next) {
  res.json({ title: '吾輩は猫である' });
});

module.exports = router;
```

次に `backend/app.js`にルートを追加する

```diff
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
+var booksRouter = require('./routes/books');

// 中略
app.use('/', indexRouter);
app.use('/users', usersRouter);
+app.use('/books', booksRouter);
```

確認してみましょう。

```sh
# express を起動
# backendなら
npm run start

# プロジェクトルートなら
npm run express
```

http://localhost:8080/books

大丈夫ですね。

記事では次に index を取得するコードですが、ここではデータがないので先に POST を実装します。

### POST 処理の追加

#### `backend/routes/books.js` に POST メソッドを追加。 create を使う

```js
// 新規データ作成
router.post('/', async (req, res, next) => {
  const prisma = new PrismaClient();
  const data = { data: req.body };
  const book = await prisma.books.create(data);
  res.json(book);
});
```

#### /test ディレクトリを追加しテストファイル bookPostTest.http (ファイル名拡張子は何でも OK ) を作成

`test/bookPostTest.http`を作成

```sh
POST http://localhost:8080/books/ HTTP/1.1
content-type: application/json

{
    "title": "星の王子さま",
    "author": "サン＝テグジュベリ",
    "overview": "王子様がいろんな星を旅したら蛇に噛まれて消えました。"
}
```

VScode で`test/bookPostTest.http`ファイルを開くと左上に「Send Request」の文字が表示されているのでクリックする。

すると Response が表示される

`Response`

```sh
HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 1323
ETag: W/"52b-j9UA7lBeYhM0pyLLHX5NgncR4YU"
Date: Tue, 08 Aug 2023 07:02:06 GMT
Connection: close

<h1>Not Found</h1>
<h2>404</h2>
<pre>NotFoundError: Not Found
    at /Users/encoolus/Desktop/Github/@ysk3da/prisma-tutorial/backend/app.js:29:8
    at Layer.handle [as handle_request] (/Users/encoolus/Desktop/Github/@ysk3da/prisma-tutorial/backend/node_modules/express/lib/router/layer.js:95:5)
    at trim_prefix (/Users/encoolus/Desktop/Github/@ysk3da/prisma-tutorial/backend/node_modules/express/lib/router/index.js:317:13)
    at /Users/encoolus/Desktop/Github/@ysk3da/prisma-tutorial/backend/node_modules/express/lib/router/index.js:284:7
    at Function.process_params (/Users/encoolus/Desktop/Github/@ysk3da/prisma-tutorial/backend/node_modules/express/lib/router/index.js:335:12)
    at next (/Users/encoolus/Desktop/Github/@ysk3da/prisma-tutorial/backend/node_modules/express/lib/router/index.js:275:10)
    at /Users/encoolus/Desktop/Github/@ysk3da/prisma-tutorial/backend/node_modules/express/lib/router/index.js:635:15
    at next (/Users/encoolus/Desktop/Github/@ysk3da/prisma-tutorial/backend/node_modules/express/lib/router/index.js:260:14)
    at Function.handle (/Users/encoolus/Desktop/Github/@ysk3da/prisma-tutorial/backend/node_modules/express/lib/router/index.js:174:3)
    at router (/Users/encoolus/Desktop/Github/@ysk3da/prisma-tutorial/backend/node_modules/express/lib/router/index.js:47:12)</pre>
```

なんかエラーになってますね、、、
見つからないとのこと

DB サーバが動いてない？？

prisma を動かしてみましょうか

```sh
npx prisma studio
```

再度、Send Request」をクリックしてみます。
ダメですね。

原因は `PrismaClient` が未定義だからでした。`backend/routes/books.js`をこうすると OK

```js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

/* GET books listing. */
router.get('/', async (req, res, next) => {
  // res.json({ title: '吾輩は猫である' });
  const prisma = new PrismaClient();
  const allBooks = await prisma.books.findMany();
  res.json(allBooks);
});

// 新規データ作成
router.post('/', async (req, res, next) => {
  const prisma = new PrismaClient();
  const data = { data: req.body };
  const book = await prisma.books.create(data);
  res.json(book);
});

module.exports = router;
```

`Response`

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 248
ETag: W/"f8-4SB90MNAIqR9PCgu6dRkRgpPEDk"
Date: Tue, 08 Aug 2023 07:13:22 GMT
Connection: close

{
  "id": 1,
  "title": "星の王子さま",
  "author": "サン＝テグジュベリ",
  "overview": "王子様がいろんな星を旅したら蛇に噛まれて消えました。",
  "created_at": "2023-08-08T07:13:22.170Z",
  "updated_at": "2023-08-08T07:13:22.170Z"
}
```

ついでに Prisma も確認しておきます

```sh
npx prisma studio
```

登録されていますね。

では index の取得も実装しましょう。
（すでに書いてしまっていますが、、、）

`backend/routes/books.js`

```js
...
/* GET books listing. */
router.get('/', async (req, res, next) => {
  // res.json({ title: '吾輩は猫である' });
  const prisma = new PrismaClient();
  const allBooks = await prisma.books.findMany();
  res.json(allBooks);
});

...
```

この部分ですね。

見てみましょう。

http://localhost:8080/books

無事に取得できています。

### PUT と DELETE の処理を追加

最後に PUT と DELETE を実装しましょう。

`backend/routes/books.js`

```js
...
// 更新
router.put('/', async(req, res, next) => {
  const prisma = new PrismaClient();
  //prismaの更新は where:とdata:で指定する。
  //{where: {条件},data:{key:value,key:value}}
  const data = {where:{id:req.body.id},data:req.body};
  const book = await prisma.books.update(data);
  res.json(book);
});

// 削除
router.delete('/', async(req, res, next) => {
  const prisma = new PrismaClient();
  //prismaの削除は{where:{条件}}で指定する。
  const data = {where:{id:req.body.id}};
  const book = await prisma.books.delete(data);
  res.json(book);
});
...
```

テストするにあたり、いくつか登録する。ダミーデータは下記

```json
[
  {
    "id": 1,
    "title": "星の王子さま",
    "author": "サン＝テグジュベリ",
    "overview": "王子様がいろんな星を旅したら蛇に噛まれて消えました。",
    "created_at": "2023-08-08T07:13:22.170Z",
    "updated_at": "2023-08-08T07:13:22.170Z"
  },
  {
    "id": 2,
    "title": "吾輩は猫である",
    "author": "夏目漱石",
    "overview": "吾輩は猫である。名前はまだない",
    "created_at": "2023-08-08T07:24:22.420Z",
    "updated_at": "2023-08-08T07:24:22.420Z"
  },
  {
    "id": 3,
    "title": "竜馬がゆく",
    "author": "司馬遼太郎",
    "overview": "竜馬の劇的な生涯を中心に、同じ時代をひたむきに生きた若者たちを描く、大歴史ロマン。",
    "created_at": "2023-08-08T07:25:52.055Z",
    "updated_at": "2023-08-08T07:25:52.055Z"
  },
  {
    "id": 4,
    "title": "銀河英雄伝説",
    "author": "田中芳樹",
    "overview": "遠未来の銀河系を舞台に、数多くの英雄たちによる攻防と権謀術数を、ラインハルト・フォン・ローエングラムとヤン・ウェンリーの2人を軸に描くスペースオペラ。",
    "created_at": "2023-08-08T07:26:50.904Z",
    "updated_at": "2023-08-08T07:26:50.904Z"
  }
]
```

#### テストファイルを追加

`test/bookPutTest.http` を追加

```sh
PUT http://localhost:8080/books/ HTTP/1.1
content-type: application/json

{
    "id": 4,
    "title": "星の王子さま２",
    "author": "サン＝テグジュベリ",
    "overview": "王子様が帰ってきましたが前回と全く同じ話でした。"
}
```

`bookDeleteTest.http`を追加

```sh
DELETE http://localhost:8080/books/ HTTP/1.1
content-type: application/json

{
    "id": 3
}
```

それぞれクリックする

NotFound になる、、、
express 再起動？
無事に動きました

`Response PUT`

```sh
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 245
ETag: W/"f5-Q8VzkgMzC3BgXKTe/bc102s6p9o"
Date: Tue, 08 Aug 2023 07:32:52 GMT
Connection: close

{
  "id": 4,
  "title": "星の王子さま２",
  "author": "サン＝テグジュベリ",
  "overview": "王子様が帰ってきましたが前回と全く同じ話でした。",
  "created_at": "2023-08-08T07:26:50.904Z",
  "updated_at": "2023-08-08T07:26:50.904Z"
}

```

`Response DELETE`

```sh
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 278
ETag: W/"116-N/D6XI6InKv3GkztFRMHErxuw5Y"
Date: Tue, 08 Aug 2023 07:34:11 GMT
Connection: close

{
  "id": 3,
  "title": "竜馬がゆく",
  "author": "司馬遼太郎",
  "overview": "竜馬の劇的な生涯を中心に、同じ時代をひたむきに生きた若者たちを描く、大歴史ロマン。",
  "created_at": "2023-08-08T07:25:52.055Z",
  "updated_at": "2023-08-08T07:25:52.055Z"
}
```

簡単な CRUD 処理なら ORM でサクサク書けますね。なお、通常ならバリデーションも書きますが、このコースでは割愛します。

これで CRUD を追加できたので、 API サーバは一旦完成です。

とのことなので、**バリデーションは別途調査**

## フロントエンドとつなぐ

Qiita の記事ではフロントエンドはなく、講座の紹介記事の方は React で受けていますね。

`frontend`ディレクトリを作成しつつ、React Vite 環境を作成します。

```sh
npm create vite@latest frontend

cd frontend
npm install
npm run dev
```

動作確認まで OK

参考記事は 2021 年のもので、class コンポーネントで記述されています。

ここでは、関数コンポーネントを用いて作成してみます。

講座の宣伝なのか、内容もイマイチ不明瞭ですね。。。

### フロントエンド部分の作成

- `frontend/src/components/books/BooksList.tsx`の作成
- `frontend/src/components/books/EditModal.tsx`の作成

## API からデータを取得する (バックエンドとフロントエンドを繋ぐ)

2023/08/09 現在では `Suspense`があるので、下記記事を参考に作成します。

- [React の Suspense 対応非同期処理を手書きするハンズオン](https://zenn.dev/uhyo/books/react-concurrent-handson)

### フックを作成する

`frontend/src/components/hooks/UseData.ts`を作成します。

```ts
let data: string | undefined;

export function useData(): string {
  // dataがまだ無ければローディングを開始する
  if (data === undefined) {
    throw fetchData1().then((d) => (data = d));
  }
  return data;
}

// sleep関数
const sleep = (waitTime: number) =>
  new Promise((resolve) => setTimeout(resolve, waitTime));

async function fetchData1(): Promise<string> {
  await sleep(1000);
  return `Hello, ${(Math.random() * 1000).toFixed(0)}`;
}
```

次にデータローダーを作成します。

### データローダーの作成

`frontend/src/components/dataLoaders/DataLoader.tsx`を作成

```ts
import { useData } from '../hooks/UseData';

export const DataLoader = () => {
  console.log(`render DataLoader`);

  const data = useData();
  return (
    <div>
      <div>Data is {data}</div>
    </div>
  );
};
```

これを `frontend/src/App.tsx`に実装して表示してみます。

```ts
import { Suspense } from 'react';
import './App.css';
import { BookList } from './components/books/BooksList';
import { DataLoader } from './components/dataLoaders/DataLoader';

function App() {
  console.log(`render App`);

  return (
    <>
      <BookList />
      <Suspense fallback={<p>Loading...</p>}>
        <DataLoader />
      </Suspense>
    </>
  );
}

export default App;
```

ちゃんと来てますね。

## Proxy を設定して CORS エラーを回避する

フロントは localhost:5173, バックエンドは localhost:8080 ですので、
フロントエンドの package.json に proxy を追加しましょう。

`frontend/package.json`

```json
...
"proxy": "http://localhost:8080",
...
```

-> これでは NG の模様なので、`frontend/vite.config.ts`に以下を追記する

```diff
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    open: true,
+   proxy: {
+      '/books': 'http://localhost:8080/',
+    }
  },
  plugins: [react()],
})

```

なぜか、公式の指示通りでなく値側の books が不要（Todo: 要調査 2023-08-10）

## fetch で作成した API からデータを受け取る

`frontend/src/components/hooks/UseData.ts`を編集して、`/books`からデータを受け取ってみましょう。

`frontend/src/components/hooks/UseData.ts`

```ts
import type { Book } from '../types/BookListType';

let data: string | Book[] | undefined;

export function useData(): string | Book[] {
  // dataがまだ無ければローディングを開始する
  if (data === undefined) {
    // throw fetchData1().then((d) => (data = d));
    throw fetchData2().then((d) => {
      console.log(`d`, d);
      data = d;
    });
  }
  return data;
}

// sleep関数
// const sleep = (waitTime:number) => new Promise( resolve => setTimeout(resolve, waitTime) );

// async function fetchData1(): Promise<string> {
//   await sleep(1000);
//   return `Hello, ${(Math.random() * 1000).toFixed(0)}`;
// }

async function fetchData2(): Promise<string | Book[]> {
  try {
    const response = await fetch('/books');
    const resJson = await response.json();
    console.log({ resJson });

    // 複数ある場合は複数書く
    // const postResponse = await fetch(
    //   'https://jsonplaceholder.typicode.com/posts?userId=' + secondUser.id
    // );
    // const posts = await postResponse.json();
    // console.log(posts);
    return resJson;
  } catch (err) {
    console.log('fetchData2: There was an error', err);
    return `fetchData2: There was an error ${err}`;
  }
}
```

次に`frontend/src/components/dataLoaders/DataLoader.tsx`を編集して JSON を受け取れるようにします。

`frontend/src/components/dataLoaders/DataLoader.tsx`

```ts
import { useData } from '../../hooks/UseData';

export const DataLoader = () => {
  console.log(`render DataLoader`);

  const data = useData();
  return (
    <div>
      <div>Data is {JSON.stringify(data)}</div>
    </div>
  );
};
```

これで無事にデータを画面に表示できました。

## データを表に反映する

`frontend/src/components/books/BooksList.tsx`を編集して、表にデータを反映します。

`frontend/src/components/books/BooksList.tsx`

```ts
import React, {
  memo,
  useState,
  // useEffect,
  Suspense,
} from 'react';
// 型を参照する
import type { Book } from '../../types/BookListType';
//Todo: css ファイル (BookList.css) などのインポートを行う。
import './BooksList.scss';
// 外部コンポーネント
import { EditModal } from './EditModal';
// hooks
import { useData } from '../../hooks/UseData';

// パーツコンポーネント
const Title = memo((props: { title: string }) => {
  console.log(`render Title`);
  return <h1>{props.title}</h1>;
});

// メインの関数コンポート
export const BookList = () => {
  console.log(`render BookList`);

  // データを取得する
  const data = useData();
  // Todo: エラーの場合の処理を追加する
  const initData = data as Book[];

  // 入力情報の状態
  const [inputData, setInputData] = useState<Book>({
    id: 0,
    title: '',
    author: '',
    overview: '',
  });

  // 保持データの状態
  // const [books, setBooks] = useState<Book[]>([
  //   {id: 1, title:"坊っちゃん", author:"夏目漱石", overview:"ぼっちゃんが先生になって頑張ったけど結局ダメでした。"}
  //   ,{id: 2,title:"吾輩は猫である", author:"夏目漱石", overview:"吾輩は猫ですが失恋してから人間の前足の使い方が不思議に思えました。"}
  //   ,{id: 3, title:"走れメロス", author:"太宰治", overview:"激怒して走ったら結構速かったので友人と殴り合いました。"}
  // ]);
  // 初期値をdataから取得する
  const [books, setBooks] = useState<Book[]>(initData);

  // モーダルウィンドウの状態
  const [showModal, setShowModal] = useState<boolean>(false);

  // モーダルの渡すData
  const [modalBook, setModalBook] = useState<Book>({
    id: 0,
    title: '',
    author: '',
    overview: '',
  });

  //モーダルウィンドウの表示切り替え
  const toggleModal = () => {
    console.log(`exe toggleModal`);
    setShowModal(!showModal);
  };

  // 入力値をsetStateで保持する
  function onInput(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    console.log(`exe onInput`);
    //Todo:setStateを利用して入力値をstateに保持
    const target = event.target;
    switch (target.name) {
      case 'title':
        setInputData({
          id: inputData.id,
          title: target.value,
          author: inputData.author,
          overview: inputData.overview,
        });
        break;
      case 'author':
        setInputData({
          id: inputData.id,
          title: inputData.title,
          author: target.value,
          overview: inputData.overview,
        });
        break;
      case 'overview':
        setInputData({
          id: inputData.id,
          title: inputData.title,
          author: inputData.author,
          overview: target.value,
        });
        break;
      default:
        break;
    }
    console.log(`inputData`, inputData);
  }

  //新規追加ボタン処理
  function addBook() {
    console.log(`exe addBook`);
    // ToDo: inputDataのそれぞれが空の場合、エラーメッセージを表示する

    //Todo:stateで保持している入力値を利用し、 state の books に 1 件追加
    const newBooks = [...books, inputData];
    setBooks(newBooks);
  }

  // 削除ボタン処理
  const deleteBook = (event: React.MouseEvent<HTMLButtonElement>): void => {
    console.log(`exe deleteBook`, event.target);
    //削除処理を追加
    const target = event.target as HTMLElement;
    const parent = target.parentNode;
    const ancestor = parent?.parentElement;
    console.log(ancestor);
    if (ancestor) {
      ancestor.style.display = 'none'; // UI上は非表示だがデータは消えていない
    }
  };

  // modal制御
  const modalBookEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    // const { books, modalTitle, modalAuthor, modalOverview } = props;
    // 値を取得してmodalBookにセットする
    const target = event.target as HTMLElement;
    const parent = target.parentNode;
    const ancestor = parent?.parentNode;
    const id = ancestor?.querySelector('.id')?.textContent as string;

    // バケツリレーする
    // Todo: ReduxかContext化するかする
    setModalBook(books[Number(id) - 1]); // 配列は0スタートなので1引く
    toggleModal();
  };

  return (
    <>
      <Title title={`React✕TypeScript✕Prisma✕Express`} />
      <div className="bookListMain">
        <div className="bookListHeader">
          <table>
            <tbody>
              <tr>
                <td>タイトル</td>
                <td>:</td>
                <td>
                  <input type="text" name="title" onChange={onInput} />
                </td>
              </tr>
              <tr>
                <td>著者</td>
                <td>:</td>
                <td>
                  <input type="text" name="author" onChange={onInput} />
                </td>
              </tr>
              <tr>
                <td>概要</td>
                <td>:</td>
                <td>
                  <textarea
                    rows={3}
                    cols={50}
                    name="overview"
                    onChange={onInput}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button onClick={addBook}>追加</button>
        </div>
        <div className="bookListBody">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>タイトル</th>
                <th>著者</th>
                <th>概要</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <Suspense
                fallback={
                  <tr>
                    <td>Loading...</td>
                  </tr>
                }
              >
                {books.map((book, index) => {
                  return (
                    <tr className="bookrow" key={index}>
                      <td className="id">{book.id}</td>
                      <td className="title">{book.title}</td>
                      <td className="author">{book.author}</td>
                      <td className="overview">{book.overview}</td>
                      <td className="action">
                        <button onClick={modalBookEdit}>編集</button>
                        <button onClick={deleteBook}>削除</button>
                      </td>
                    </tr>
                  );
                })}
              </Suspense>
            </tbody>
          </table>
        </div>
      </div>
      <EditModal
        show={showModal}
        setShow={setShowModal}
        modalBook={modalBook}
        books={books}
        setBooks={setBooks}
      />
    </>
  );
};
```

ちょっと長いですね。必要な部分は下記

```ts
...
// hooks
import { useData } from "../../hooks/UseData";

...
  // データを取得する
  const data = useData();
  // Todo: エラーの場合の処理を追加する
  const initData = data as Book[];

...
  // 初期値をdataから取得する
  const [books, setBooks] = useState<Book[]>(initData);

...//returnの中

              <Suspense fallback={<tr><td>Loading...</td></tr>}>
                {books.map((book,index) => {
                  return(
                    <tr className="bookrow" key={index}>
                      <td className="id">{book.id}</td>
                      <td className="title">{book.title}</td>
                      <td className="author">{book.author}</td>
                      <td className="overview">{book.overview}</td>
                      <td className="action">
                        <button onClick={modalBookEdit}>編集</button>
                        <button onClick={deleteBook}>削除</button>
                      </td>
                    </tr>
                  )
                })}
              </Suspense>
...
```

コメントにも書きましたが、型が string | Book[] なので、エラーコメントが表示されるように処理を追加するべきです。
本質的ではないので、ここでは一旦割愛します。

## POST を実装する

次に POST して DB を書き換える処理を実装しましょう。

例では `axios`というライブラリを利用していますので、同様に利用していきます。

`frontend`ディレクトリに移動して、インストールします。

```sh
cd frontend
npm i axios
```

次に、`frontend/src/components/books/BooksList.tsx`内の `addBook`関数を編集します。

```ts
...

// ライブラリ
import axios from "axios";

...
  //新規追加ボタン処理
  function addBook(){
    console.log(`exe addBook`);
    // ToDo: inputDataのそれぞれが空の場合、エラーメッセージを表示する

    // axios でデータベースを書き換える
    const newBook = inputData;
    axios.post("/books", newBook)
    .then(json => {
        console.log(`axios POST:`,json);
    });

    //Todo:stateで保持している入力値を利用し、 state の books に 1 件追加
    // const newBooks = [...books, inputData];
    // setBooks(newBooks);
  }
...
```

POST できていますが、画面が更新されません。
どうしたら良いでしょうか。

こうです。

```ts
//新規追加ボタン処理
function addBook() {
  console.log(`exe addBook`);
  // ToDo: inputDataのそれぞれが空の場合、エラーメッセージを表示する

  // axios でデータベースを書き換える
  const newBook = inputData;
  axios
    .post('/books', newBook)
    .then((json) => {
      console.log(`axios POST:`, json);

      // 新しい書籍情報を作成
      const newBookData = {
        ...newBook,
        id: json.data.id, // assuming the response contains the new book's ID
      };

      // books ステートを更新
      setBooks((prevBooks) => [...prevBooks, newBookData]);
    })
    .catch((error) => {
      console.error('Error adding book:', error);
    });

  // 入力値をクリアする
  setInputData({
    title: '',
    author: '',
    overview: '',
  });

  //Todo:stateで保持している入力値を利用し、 state の books に 1 件追加 -> DBなしでの確認に使用
  // const newBooks = [...books, inputData];
  // setBooks(newBooks);
}
```

以上で、無事に POST を実装できました。

記事はここで終わっています。

残りの削除と更新機能も axios で実装できます。
やってみましょう。

## 削除機能の実装

こちらも`axios`を利用していきます。

`frontend/src/components/books/BooksList.tsx` の deleteBook 関数を書き換えましょう。

```ts
...
  // 削除ボタン処理
  const deleteBook = async (event: React.MouseEvent<HTMLButtonElement>):Promise<void> => {
    console.log(`exe deleteBook`,event.target);

    //削除処理を追加
    const target = event.target as HTMLElement;
    const parent = target.parentNode;
    const ancestor = parent?.parentElement;
    // 追加
    const id = ancestor?.querySelector('.id')?.textContent as string;

    try {
      const payload = {
        data: {
          id: Number(id)
        }
      }
      // axios でデータベースから削除
      await axios.delete(`/books`,payload);
      // books ステートを更新して削除した書籍を除外
      setBooks(prevBooks => prevBooks.filter(book => book.id !== Number(id)));
    } catch (error) {
      console.error(`deleteBook Error:`,error)
    }
    //  -> DBなしでの確認に使用
    // if(ancestor) {
    //   ancestor.style.display = 'none'; // UI上は非表示だがデータは消えていない
    // }
  }
...
```

このようになります。

では最後に更新の PUT を実装しましょう。

## 更新機能の実装

こちらも`axios`を利用していきます。

`frontend/src/components/books/EditModal.tsx` の saveBook 関数を書き換えましょう。

```ts
...
// ライブラリ
import axios from 'axios';

...
 // データの更新
  const saveBook = () => {
    console.log(`exe saveBook`);
    // DBを更新する
    try {
      const payload = inputData;
      axios.put('/books',payload).then(() => {
        // 更新された書籍情報を作成
        const updatedBook = inputData;

        // books ステートを更新して更新された書籍情報を反映
        setBooks(prevBooks =>
          prevBooks.map(book =>
            book.id === updatedBook.id ? updatedBook : book
          )
        );
      })
    } catch (error) {
      console.error(`saveBook Error:`,error)

    }

    // DBなしの確認に使用
    // const updatedBook = inputData;
    // // //Todo:作成したbookをstate上のbooksに戻す。
    // setBooks(prevBooks =>
    //   prevBooks.map(book =>
    //     book.id === updatedBook.id ? updatedBook : book
    //   )
    // );

    closeModal();
  }

...

```

これで CRUD の機能一通りを実装することができました。

## まとめ

めちゃくちゃ長いですね。。。
小出しにして、資料化する必要がありそうです。

このあとは、AWS Lambda や GCP などのクラウドとつないで、ローカルとクラウド上が一致した DB を含めた開発環境を作成したい。
