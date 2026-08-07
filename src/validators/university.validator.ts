import { z } from "zod";

export const universitySearchSchema = z.object({
  query: z.string().optional(),
  countrySlug: z.string().optional(),
  countryId: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
  maxRankingGlobal: z.coerce.number().optional(),
  maxTuitionFee: z.coerce.number().optional(),
  city: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(12),
  sortBy: z.enum(["rankingGlobal", "name", "avgTuitionFeeYear"]).default("rankingGlobal"),
  sortOrder: z.enum(["asc", "desc"]).default("asc"),
});

export const universitySlugSchema = z.object({
  slug: z.string().min(1, "University slug is required"),
});

export type UniversitySearchInput = z.infer<typeof universitySearchSchema>;
export type UniversitySlugInput = z.infer<typeof universitySlugSchema>;
