import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const articles = defineCollection({
    loader: glob({
        base: './src/content/articles',
        pattern: '**/index.md',
    }),
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        publishedAt: z.coerce.date(),
        updatedAt: z.coerce.date().optional(),
        cover: image(),
        coverAlt: z.string(),
        draft: z.boolean().default(true),
        lang: z.enum(['en', 'ja']).default('en'),
    }),
})

export const collections = { articles }
