# スマホから記事を書く

1. `_template` フォルダを複製し、記事のslugへ名前を変える
2. `index.md.example` を `index.md` へ変更する
3. 表紙と本文画像を同じフォルダへ入れる
4. 執筆中は `draft: true` のまま保存する
5. 公開準備ができたら `draft: false` へ変更する

フォルダ名には半角英小文字・数字・ハイフンを使う：

```text
germany-day-1/
├── index.md
├── cover.jpg
└── station.jpg
```

画像はMarkdownから相対パスで参照する：

```md
![Station platform](./station.jpg)
```
