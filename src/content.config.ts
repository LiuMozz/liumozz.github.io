import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    lastmod: z.coerce.date().optional(),
    author: z.string().optional().default('LiuMozz'),
    tags: z.array(z.string()).optional().default([]),
    categories: z.array(z.string()).optional().default([]),
    description: z.string().optional(),
    weight: z.number().optional().default(999),
    draft: z.boolean().optional().default(false)
  })
});

export const collections = { posts };
