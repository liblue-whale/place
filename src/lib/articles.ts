import type { CollectionEntry } from 'astro:content'

export type ArticleEntry = CollectionEntry<'articles'>

export function getArticleSlug(article: ArticleEntry) {
    return article.id.replace(/\/index$/, '')
}

export function getArticleHref(article: ArticleEntry) {
    return `/articles/${getArticleSlug(article)}`
}

export function formatArticleDate(date: Date) {
    return date.toISOString().slice(0, 10)
}

export function getArticleRatio(article: ArticleEntry) {
    const ratio = article.data.cover.width / article.data.cover.height

    if (ratio > 1.15) return '4-3'
    if (ratio < 0.88) return '3-4'
    return '1-1'
}

export function sortArticles(articles: ArticleEntry[]) {
    return [...articles].sort((a, b) => {
        const dateDifference = b.data.publishedAt.getTime() - a.data.publishedAt.getTime()
        return dateDifference || a.id.localeCompare(b.id)
    })
}
