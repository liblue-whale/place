```md
# my-blog 開発引き継ぎメモ

## プロジェクト概要

Astro + React + TypeScript で作っている個人サイト。

記事・作品・自己紹介などを載せる予定。
`Articles` の一覧と個別記事ページの基礎実装が完了し、現在は個別記事ページの見た目と読みやすさを調整中。

デザイン方針：

- シンプル
- 余白を広く取る
- 情報を詰め込みすぎない
- 規則正しいカード一覧にはしない
- 縦に潜っていくようなスクロール感
- 黒〜暗い青緑の背景
- ネオン・サイバー系にはしない
- 紙のカードが暗い空間に浮いている感じ
- 写真や手描きイラストを積極的に使う
- カードは中央レーン内で少し左右にずらす
- PC・スマホともにカードを少し傾ける
- 将来、留学中にスマホで撮影した写真を多く使う予定

ホームページは暗い写真背景＋cadetblue系の文字。
記事ページも大きく雰囲気を変えない。


## 技術構成

- Astro
- React
- TypeScript
- CSS
- Git / GitHub

Reactコンポーネントは `.tsx`。

AstroページからReactコンポーネントを呼び出す。

単純な表示用Reactコンポーネントについては、
`client:load` などは基本不要。
Astro側で静的HTMLとしてレンダリングする。


## 現在のおおよそのフォルダ構成

    src/
    ├── assets/
    │   └── home_background.png
    │
    ├── components/
    │   ├── Header.tsx
    │   ├── Footer.tsx
    │   ├── Mail.tsx
    │   ├── ArticleCard.tsx
    │   └── ArticleList.tsx
    │
    ├── layouts/
    │   └── Layout.tsx
    │
    ├── data/
    │   └── articles.ts
    │
    ├── css/
    │   ├── style.css
    │   └── Article.css
    │
    └── pages/
        ├── index.astro
        ├── About_me.astro
        ├── Articles.astro
        ├── Contact.astro
        └── Works.astro

    public/
    └── images/
        └── articles/

実際のリポジトリ構成と異なる場合は、
リポジトリ側を優先すること。


# Layout

共通部分を `Layout.tsx` にまとめている。

構造：

    Layout
    ├── Header
    ├── main
    │   └── children
    └── Footer

想定コード：

    import type { ReactNode } from "react"
    import Header from "../components/Header"
    import Footer from "../components/Footer"

    type LayoutProps = {
      children: ReactNode
    }

    export default function Layout({ children }: LayoutProps) {
      return (
        <>
          <Header />

          <main>
            {children}
          </main>

          <Footer />
        </>
      )
    }

各 `.astro` ページでは、

    ---
    import Layout from "../layouts/Layout"
    ---

    <Layout>
      <!-- ページ固有内容 -->
    </Layout>

とする。

各ページにHeader/Footerを直接書かない。


# Header

Reactコンポーネント。

ナビゲーション：

- Home
- About me
- Contact
- Works
- Articles

Astroサイトなので、ページ移動は基本的に `<a href="">` を使う。

`<nav>` はルーティング機能のためではなく、
ナビゲーションであることをHTML的に意味付けするため。

Headerは固定表示。

    header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 10;
    }

過去にHomeページの背景要素がHeaderを覆っていたので、
`z-index` を設定して解決済み。


# Footer

Reactコンポーネント。

役割：

- サイト情報
- Navigation
- 外部リンク
- Copyright

現在は優先度低め。


# Articlesページの構造

現在もっとも作業中。

    Articles.astro
        ↓
    ArticleList.tsx
        ↓
    ArticleCard.tsx
        ↓
    articles.ts

責務を混ぜない。


# Articles.astro

ページそのもの。

想定：

    ---
    import Layout from "../layouts/Layout"
    import ArticleList from "../components/ArticleList"
    import "../css/Article.css"
    ---

    <Layout>
      <section class="articles-page">

        <h1 class="articles-title">
          Articles
        </h1>

        <p class="articles-introduction">
          You can read my articles here.
        </p>

        <ArticleList />

      </section>
    </Layout>


# articles.ts

記事情報だけを持つ。

現在の型：

    export type Article = {
      title: string
      description: string
      date: string
      image: string
      href: string
      ratio: "3-4" | "4-3" | "1-1"
    }

記事例：

    export const articles: Article[] = [
      {
        title: "WHY DID I OPEN HERE?",
        description: "telling about myself and circumstance",
        date: "2026-09-22",
        image: "/images/articles/first.jpg",
        href: "/articles/first",
        ratio: "3-4"
      },

      {
        title: "La pesanteur et la grâce",
        description: "It's too exotic!!",
        date: "2026-09-22",
        image: "/images/articles/second.jpg",
        href: "/articles/second",
        ratio: "4-3"
      }
    ]

記事ごとの自由な `width` 指定はしない。

カードサイズは `ratio` ごとにCSSで決める。


# ArticleList.tsx

記事データを読み込み、
`.map()` でArticleCardへ渡す。

    import ArticleCard from "./ArticleCard"
    import { articles } from "../data/articles"

    export default function ArticleList() {
      return (
        <div className="article-list">

          {articles.map((article) => (
            <ArticleCard
              key={article.href}
              {...article}
            />
          ))}

        </div>
      )
    }

`key` はReact内部の識別用。

現在は一意な `href` を利用。

    key={article.href}

`key` は通常のpropsとしてArticleCard内部からは取得しない。


# ArticleCard.tsx

記事一件の表示担当。

想定：

    import type { Article } from "../data/articles"

    export default function ArticleCard({
      title,
      description,
      date,
      image,
      href,
      ratio
    }: Article) {

      return (
        <article
          className={`article-card ratio-${ratio}`}
        >

          <img
            src={image}
            alt=""
          />

          <h2>
            <a href={href}>
              {title}
            </a>
          </h2>

          <p className="description">
            {description}
          </p>

          <time>
            {date}
          </time>

        </article>
      )
    }

画像が記事内容を説明する重要な写真なら、
適切な `alt` を付ける。

単なる装飾なら `alt=""` でもよい。


# 画像ファイル

記事画像は、

    public/images/articles/

に置く。

例：

    public/images/articles/germany-station.jpg

データ側：

    image: "/images/articles/germany-station.jpg"

で参照できる。


# 写真比率

将来スマホ写真を多く使う予定。

比率は現在3種類。

    3:4
    4:3
    1:1

用途：

    3:4
    縦写真。
    人物、建物、街角など。

    4:3
    横写真。
    風景、部屋、街並みなど。

    1:1
    イラスト。
    正方形写真。
    小さな挿話的記事。

16:9は今のところ使わない。


# Articleページの背景

真っ黒 `#000` は少し硬すぎた。

ホームの暗い青緑系の雰囲気に合わせて、

    #081012

あたりを候補としている。

例：

    html,
    body {
      background-color: #081012;
    }

真っ黒ではなく、
わずかに青緑を含む暗色にする。


# カードデザインの思想

ネオン・サイバー系は禁止。

方向性：

> 暗い空間の中に、
> 少し物理的な紙のカードが浮いている。

カードは、

- クリーム色
- 細い境界線
- 物理的な影
- 少し傾く
- 写真が紙の上に貼られている感じ

にする。

カード色：

    background-color: #f2eee4;
    color: #222;

影：

    box-shadow:
      8px 10px 0 rgba(0, 0, 0, 0.5),
      0 18px 32px rgba(0, 0, 0, 0.28);

青や緑の発光は使わない。


# Article.css 現在の方向

    .articles-page {
      width: min(1000px, 90vw);
      margin: 0 auto;
      padding: 7rem 0 14rem;

      color: cadetblue;
    }


    .articles-title {
      margin: 0;

      font-size: clamp(5rem, 10vw, 9rem);
      line-height: 0.9;
      letter-spacing: -0.04em;

      color: cadetblue;
      text-align: left;
    }


    .articles-introduction {
      max-width: 40rem;

      margin: 2rem 0 10rem;

      font-size: 1.3rem;
      line-height: 1.8;

      color: cadetblue;
      text-align: left;

      opacity: 0.8;
    }


    .article-list {
      width: 100%;

      display: flex;
      flex-direction: column;
      align-items: center;

      gap: 11rem;
    }


    .article-card {
      width: min(580px, 100%);
      max-width: 100%;

      box-sizing: border-box;

      padding: 2rem 2rem 1.8rem;

      background-color: #f2eee4;
      color: #222;

      border: 1px solid rgba(25, 25, 25, 0.75);
      border-radius: 3px;

      box-shadow:
        8px 10px 0 rgba(0, 0, 0, 0.5),
        0 18px 32px rgba(0, 0, 0, 0.28);

      text-align: left;

      transition:
        transform 180ms ease,
        box-shadow 180ms ease;
    }


    .article-card.ratio-3-4 {
      width: min(540px, 100%);
    }


    .article-card.ratio-4-3 {
      width: min(740px, 100%);
    }


    .article-card.ratio-1-1 {
      width: min(480px, 100%);
    }


    .article-card:nth-child(odd) {
      transform:
        translateX(-24px)
        rotate(-0.35deg);
    }


    .article-card:nth-child(even) {
      transform:
        translateX(24px)
        rotate(0.35deg);
    }


    .article-card.ratio-4-3:nth-child(odd) {
      transform:
        translateX(-10px)
        rotate(-0.2deg);
    }


    .article-card.ratio-4-3:nth-child(even) {
      transform:
        translateX(10px)
        rotate(0.2deg);
    }


    .article-card:nth-child(odd):hover {
      transform:
        translateX(-27px)
        translateY(-5px)
        rotate(-0.35deg);
    }


    .article-card:nth-child(even):hover {
      transform:
        translateX(27px)
        translateY(-5px)
        rotate(0.35deg);
    }


    .article-card.ratio-4-3:nth-child(odd):hover {
      transform:
        translateX(-12px)
        translateY(-5px)
        rotate(-0.2deg);
    }


    .article-card.ratio-4-3:nth-child(even):hover {
      transform:
        translateX(12px)
        translateY(-5px)
        rotate(0.2deg);
    }


    .article-card:hover {
      box-shadow:
        11px 14px 0 rgba(0, 0, 0, 0.55),
        0 24px 40px rgba(0, 0, 0, 0.32);
    }


    .article-card img {
      display: block;

      width: 86%;
      max-width: 100%;

      margin:
        0
        auto
        2.4rem;

      object-fit: cover;

      background-color: white;

      border: 1px solid rgba(25, 25, 25, 0.45);

      box-shadow:
        0 5px 12px rgba(0, 0, 0, 0.12);
    }


    .article-card.ratio-3-4 img {
      width: 82%;
      aspect-ratio: 3 / 4;
    }


    .article-card.ratio-4-3 img {
      width: 90%;
      aspect-ratio: 4 / 3;
    }


    .article-card.ratio-1-1 img {
      width: 78%;
      aspect-ratio: 1 / 1;
    }


    .article-card h2 {
      margin: 0;

      font-size: clamp(2.8rem, 4.5vw, 4.5rem);
      line-height: 0.98;

      font-weight: 700;
      letter-spacing: -0.035em;

      overflow-wrap: anywhere;
    }


    .article-card a {
      color: #202020;
      text-decoration: none;
    }


    .article-card a:hover {
      text-decoration: underline;
      text-decoration-thickness: 2px;
      text-underline-offset: 6px;
    }


    .article-card .description {
      max-width: 36rem;

      margin: 1.5rem 0 0;

      font-size: 1.2rem;
      line-height: 1.7;

      color: #474747;
    }


    .article-card time {
      display: block;

      margin-top: 2.5rem;

      font-size: 0.9rem;
      line-height: 1;

      letter-spacing: 0.08em;

      color: #666;

      text-align: right;
    }


    @media (max-width: 900px) {

      .articles-page {
        width: 90vw;
      }


      .article-card.ratio-3-4 {
        width: min(520px, 100%);
      }


      .article-card.ratio-4-3 {
        width: min(680px, 100%);
      }


      .article-card.ratio-1-1 {
        width: min(460px, 100%);
      }


      .article-card:nth-child(odd) {
        transform:
          translateX(-14px)
          rotate(-0.3deg);
      }


      .article-card:nth-child(even) {
        transform:
          translateX(14px)
          rotate(0.3deg);
      }

    }


    @media (max-width: 650px) {

      .articles-page {
        width: 90vw;

        padding-top: 5rem;
        padding-bottom: 9rem;
      }


      .articles-title {
        font-size: clamp(4rem, 18vw, 6.5rem);
      }


      .articles-introduction {
        margin-bottom: 7rem;

        font-size: 1.05rem;
      }


      .article-list {
        gap: 7rem;
      }


      .article-card,
      .article-card.ratio-3-4,
      .article-card.ratio-4-3,
      .article-card.ratio-1-1 {
        width: 94%;
      }


      .article-card:nth-child(odd) {
        transform:
          translateX(-4px)
          rotate(-0.45deg);
      }


      .article-card:nth-child(even) {
        transform:
          translateX(4px)
          rotate(0.45deg);
      }


      .article-card.ratio-4-3:nth-child(odd) {
        transform:
          translateX(-3px)
          rotate(-0.25deg);
      }


      .article-card.ratio-4-3:nth-child(even) {
        transform:
          translateX(3px)
          rotate(0.25deg);
      }


      .article-card:nth-child(odd):hover {
        transform:
          translateX(-4px)
          translateY(-3px)
          rotate(-0.45deg);
      }


      .article-card:nth-child(even):hover {
        transform:
          translateX(4px)
          translateY(-3px)
          rotate(0.45deg);
      }


      .article-card {
        padding: 1.4rem 1.2rem 1.5rem;

        box-shadow:
          5px 7px 0 rgba(0, 0, 0, 0.5),
          0 13px 24px rgba(0, 0, 0, 0.25);
      }


      .article-card img {
        margin-bottom: 1.8rem;
      }


      .article-card.ratio-3-4 img {
        width: 86%;
      }


      .article-card.ratio-4-3 img {
        width: 94%;
      }


      .article-card.ratio-1-1 img {
        width: 82%;
      }


      .article-card h2 {
        font-size: clamp(2.4rem, 10vw, 3.8rem);
      }


      .article-card .description {
        font-size: 1.05rem;
      }


      .article-card time {
        margin-top: 2rem;
      }

    }


# カードサイズの考え方

現在：

    3:4
    width: 540px

    4:3
    width: 740px

    1:1
    width: 480px

意図：

    3:4
    標準。
    縦に深い。

    4:3
    横に大きく広がる。
    風景写真などを見せる。

    1:1
    少し小さい。
    挿話・イラスト感。

カード全体には `aspect-ratio` を指定しない。

文章量に応じて高さが自然に変わる。


# 画像サイズの考え方

画像はカード全体より小さくする。

現在：

    3:4
    画像幅 82%

    4:3
    画像幅 90%

    1:1
    画像幅 78%

意図：

    カード
    ┌─────────────────┐
    │                 │
    │    ┌────────┐   │
    │    │ PHOTO  │   │
    │    └────────┘   │
    │                 │
    │ TITLE           │
    │ description     │
    │            date │
    └─────────────────┘

「写真＝カード全面」にはしない。

カード内部に写真が置かれている感じを出す。


# デザイン上の注意

避けるもの：

- ネオン
- 発光
- サイバーUI
- ガラスUI
- きっちりしたカードグリッド
- 2列3列に整然と並ぶ構成
- 過度に細かい情報
- 年ごとのアーカイブ表示を前面に出す
- 2020 / 2021 / 2022 のような棚構造
- 横幅いっぱいにカードを振る
- スマホで完全に真っ直ぐ揃える
- 画像をカード全面に広げる

目標：

> 整っているが、並びすぎていない。

> 写真と記事が、
> 暗い空間の中をゆっくり縦に流れていく。

> デジタルUIというより、
> 少し紙やZINEに近い。


# 留学中の運用を想定

将来的にドイツ留学中の記事を多く書く予定。

スマホで写真を撮って、

    縦なら 3-4
    横なら 4-3
    イラストや正方形なら 1-1

とするだけで記事一覧へ追加できる設計を目指す。

毎回画像加工しない。

記事追加の作業量を小さくする。


# CSS競合について

以前 `style.css` に記事関連CSSが存在していた。

以下が `style.css` と `Article.css` の両方に存在すると
反映がおかしくなる可能性がある。

確認：

    .articles
    .articles-page
    .articles-title
    .article-list
    .article-card

記事ページ関連CSSはできるだけ
`Article.css` にまとめる。

CSS変更が反映されない場合は、
まず重複定義を疑う。


# CSSデバッグ

変更が反映されない場合：

1. React側のclass名確認

    className={`article-card ratio-${ratio}`}

2. 実際のHTML確認

    <article class="article-card ratio-4-3">

になっているか。

3. DevToolsのComputedでwidth確認

4. style.cssとの競合確認

5. 単位を確認

誤：

    width: min(620, 100%);

正：

    width: min(620px, 100%);

6. ブラウザキャッシュやdev server再読み込みも確認


# 現在の最優先タスク

現在の目標：

> 個別記事ページを、PC・スマホの両方で読みやすい一枚の紙面として成立させる。

## TODO（2026-09-22 追加）

- [x] スマホ版の外側・内側・カード間の余白を広げ、ゆとりのある見え方に調整する
- [x] 固定ヘッダーに暗い青緑の不透明な背景を付け、本文が透けないようにする

## Home「作品ステージ」TODO

- [x] 背景画像を、ぼかした背景層と原画全体を見せる前景層に分ける
- [x] Home専用の文字配置とレスポンシブ表示を整える
- [x] Heroの上下をヘッダー・フッターの暗色へ自然につなげる
- [x] Astroの画像最適化を使い、背景画像の配信サイズを抑える

## Home追加セクション比較 TODO

- [x] `/home-zine` にZINEの見開き案を実装する
- [x] `/home-paper` に紙の断片案を実装する
- [x] `/home-index` に静かな索引案を実装する（比較後に不採用、削除）
- [x] 比較案で共通の仮テキストと比較ナビゲーションを使う
- [x] 現在のHomeを変更せず、比較後に採用案だけを統合できる構造にする

### 初回比較後の調整

- [x] 単調だったZINE案に原画の切り抜きと紫・青・紙色を加える
- [x] Paper案のHero文字色とカード色をクリーム・青緑系でつなげる
- [x] 不採用のIndex案をルートと比較ナビゲーションから削除する

次にやること：

1. 個別記事ページをPC幅で目視確認
2. 個別記事ページをスマホ幅で目視確認
3. 長い本文、見出し、引用、本文画像、コードブロックを含む記事で確認
4. 紙面の余白、本文幅、表紙画像、前後記事ナビゲーションを調整
5. Git commit
6. Git push


# Articlesの記事管理と詳細ページ

Astro Content Collectionsを使用して実装済み。

基本構成：

    src/
    ├── content.config.ts
    ├── content/
    │   └── articles/
    │       └── article-slug/
    │           ├── index.md
    │           ├── cover.jpg
    │           └── photo-01.jpg
    ├── pages/
    │   └── articles/
    │       ├── index.astro
    │       └── [slug].astro
    ├── layouts/
    │   └── ArticleLayout.astro
    └── components/
        └── articles/

記事本文と画像は同じフォルダへ置く。
フォルダ名がURLのslugになる。

    src/content/articles/germany-day-1/index.md
        ↓
    /articles/germany-day-1

スマホから記事を書く場合に触る場所は、
原則として `src/content/articles/` のみ。

記事追加手順：

1. slug名のフォルダを作る
2. `index.md`を作る
3. 同じフォルダへ表紙・本文画像を追加する
4. Markdownから `./photo.jpg` のような相対パスで参照する
5. 執筆中は `draft: true` にする
6. 公開時に `draft: false` にする

一覧と詳細ページは同じContent Collectionから生成する。
`src/data/articles.ts`へ記事を重複登録しない。

記事URLは小文字の `/articles` に統一する。
旧 `/Articles` はリダイレクトする。


## 個別記事ページ進捗（2026-09-23）

- [x] `ArticleLayout.astro` で表紙・本文・前後記事ナビゲーションをまとめる
- [x] 表紙カードと本文カードを分離せず、一枚の紙面として表示する
- [x] 記事一覧へ戻るリンクを紙面上部へ配置する
- [x] 公開日と更新日を表紙上部のメタ情報へまとめる
- [x] 前後記事リンクを独立カードから紙面末尾の罫線付きナビゲーションへ変更する
- [x] 補助文字の最小サイズを `0.9rem` まで引き上げる
- [x] 本文文字をPCで `1.16rem` 以上、スマホで `1.1rem` にする
- [x] スマホでは紙面外側と内側に十分な余白を確保する
- [x] スマホの前後記事リンクを縦積みにする
- [x] 表紙画像を通常の `<img>` で表示し、`width: 100%` と `height: auto` で元の比率を維持する
- [x] Astroの画像コンポーネントによる `srcset`・`sizes`・自動寸法指定を記事画像から外す
- [x] `npm run build` を通し、全記事詳細ページが静的生成されることを確認する
- [x] `git diff --check` を通す
- [ ] 実機またはブラウザでPC幅・スマホ幅を目視確認する
- [ ] 実際の長い記事本文を入れ、見出し・引用・本文画像・コードブロックのバランスを確認する

現在の個別記事ページ構成：

    ArticleLayout
    ├── 一覧へ戻るリンク / Reading journal
    └── article-detail-sheet（一枚の紙面）
        ├── ArticleHeader
        │   ├── 種別 / 公開日 / 更新日
        │   ├── タイトル
        │   ├── description
        │   └── 表紙画像
        ├── Markdown本文
        └── ArticleNavigation

個別記事ページのスタイルは `src/css/ArticleDetail.css` にまとめる。


# 将来追加候補

記事カテゴリ：

- Essay
- Technology
- Literature
- Study
- Travel
- Making

記事が増えてから実装。

今は不要。


# Git運用

個人開発でも変更単位ごとにcommit。

基本：

    git status
    git add .
    git commit -m "Improve article card layout"
    git push

Articles一覧完成時：

    git commit -m "Build article list layout"

程度でよい。


# CLIエージェントへの指示

このプロジェクトでは、
勝手な大規模リファクタリングをしない。

既存構造を確認してから変更する。

特に：

- サイバー・ネオン系デザインにしない
- カードを規則正しいGridにしない
- 余白を削りすぎない
- 写真をカード全面にしない
- PCで左右に振りすぎない
- スマホでもカードに微妙な傾きを残す
- ratioは現在 `3-4 / 4-3 / 1-1`
- 記事ごとの自由なwidth入力機能は作らない
- UI変更は小さく試す
- CSSの競合を確認してから新しいCSSを足す
- ユーザーの既存コードを必要以上に書き換えない

基本思想：

> 整っているが、並びすぎていない。

> 暗い青緑の空間の中を、
> 写真と紙のカードが縦に流れていく。

> UIというより、
> 少しZINEや個人雑誌に近い。


# 次回開始時

まず：

    git status
    npx astro dev --background

その後：

    src/layouts/ArticleLayout.astro
    src/components/articles/ArticleHeader.astro
    src/components/articles/ArticleNavigation.astro
    src/css/ArticleDetail.css
    src/content/articles/

を確認。

最初の具体的作業：

> 個別記事ページをPC幅とスマホ幅で目視し、
> 一枚の紙面としての余白、本文幅、文字サイズ、
> 表紙画像と前後記事ナビゲーションのバランスを調整する。

ここから再開する。
```
