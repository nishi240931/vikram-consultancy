import { z } from "zod";

export const adminCountrySchema = z.object({
  name: z.string().min(2, "Country name is required"),
  code: z.string().min(2).max(3, "Country code must be 2-3 letters"),
  slug: z.string().min(2, "Slug is required"),
  flagUrl: z.string().url("Valid flag URL is required"),
  heroImage: z.string().url("Valid hero image URL is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  isFeatured: z.boolean().default(false),
});

export const adminUniversitySchema = z.object({
  name: z.string().min(2, "University name is required"),
  slug: z.string().min(2, "Slug is required"),
  countryId: z.string().min(1, "Country selection is required"),
  city: z.string().min(2, "City is required"),
  rankingGlobal: z.coerce.number().min(1, "Valid global rank required"),
  acceptanceRate: z.coerce.number().min(1).max(100, "Acceptance rate must be 1-100%"),
  isFeatured: z.boolean().default(false),
});

export const adminBlogSchema = z.object({
  title: z.string().min(5, "Blog title is required"),
  slug: z.string().min(5, "Slug is required"),
  category: z.string().min(2, "Category is required"),
  content: z.string().min(20, "Blog content is required"),
  excerpt: z.string().min(10, "Excerpt is required"),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
});

export type AdminCountryInput = z.infer<typeof adminCountrySchema>;
export type AdminUniversityInput = z.infer<typeof adminUniversitySchema>;
export type AdminBlogInput = z.infer<typeof adminBlogSchema>;
