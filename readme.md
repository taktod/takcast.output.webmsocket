# takcast.output.webmsocket

# 作者

taktod

https://twitter.com/taktod
poepoemix@hotmail.com

# 概要

electronで作ってみた配信ソフトtakcastで利用できる。webmデータをwebsocketで配信するプラグイン

# 使い方

takcastのプロジェクトで

```
$ npm install taktod/takcast.output.webmsocket --save
$ npm run setup
```

これでプラグインが有効になり、必要な情報がセットアップされます。

# takcastとは

electronを使って作ってみた、映像と音声を合成して配信するツール
元ネタは、勤めている会社にopenGLで映像合成をしたらどのようになるか提示するのに作ってみたプログラムです。
せっかくなので公開してみようと思いました。

# このプログラムについて

このプログラムはgoで適当に動作するサーバーをつくってので、それに向かって配信できるようにしてみようと思いつくってみました。

ツイキャスのAPIがwebmでの配信に対応してるみたいですので、そっちに流せると面白そうですね。
