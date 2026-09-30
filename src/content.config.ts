import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const resources = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/resources' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    author: z.string().default('UnPoison'),
    type: z.enum(['Policy comment', 'Research report', 'Database', 'Media release', 'Practical guide']),
    topics: z.array(z.string()),
    fileUrl: z.url(),
    fileType: z.string().default('PDF'),
    featured: z.boolean().default(false),
  }),
});

export const collections = { resources };
