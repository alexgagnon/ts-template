import { z } from 'zod';

export const BookIdSchema = z.string().uuid();

export const BookSchema = z.object({
  author: z.string(),
  title: z.string(),
  yearPublished: z.number().int().lte(2025).gte(-2500),
  id: BookIdSchema.optional()
});

export type Book = z.infer<typeof BookSchema>;


