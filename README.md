Visual Studio Code で Markdown のプレビューを保存する
=====================================================

## 概要

Visual Studio Code の Markdown プレビューは
なかなか見栄えが良くて気に入ってる。
そのまま保存してドキュメントとして使いたいが、
今のところ (2017/01/14、バージョン1.8.1) プレビューを保存する機能は
ないようなので、同等のものを生成するスクリプトを作成した。

ネットを検索するといくつか同様のことを行うものが見つかったが、
Markdown エンジンの違いにより VSCode と出力結果が異なる
(リスト内のテーブルなど)
ものばかりだった。
このスクリプトは VSCode と同じ
[markdown-it](https://github.com/markdown-it/markdown-it)
を使用し、出力結果が同じになるようにしている。

## 動作に必要なもの

[Node.js](https://nodejs.org/ja/) が必要

## 使い方

1.  このリポジトリをローカルにクローンする
1.  `npm install` する
1.  同じフォルダにHTML化したい Markdown ファイルを入れる
1.  フォルダを Visual Studio Code で開く
1.  gulpfile.js を編集し、HTML のタイトルなどを設定する
1.  `Ctrl + Shift + B` を押してビルドする
1.  ビルドが終わるとできる dest フォルダに markdown.css を入れる

    ※ markdown.css は
    VS Codeをインストールしたフォルダの
    resources\app\extensions\markdown\media\markdown.css
    にあります。
