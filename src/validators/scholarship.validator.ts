import { z } from "zod";

export const scholarshipSearchSchema = z.object({
  query: z.string().optional(),
  countrySlug: z.string().optional(),
  universitySlug: z.string().optional(),
  type: z.enum(["FULL_TUITION", "PARTIAL_TUITION", "STIPEND", "ONE_TIME_GRANT"]).optional(),
  minAmount: z.coerce.number().optional(),
  maxAmount: z.coerce.number().optional(),
  upcomingOnly: z.coerce.boolean().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(12),
  sortBy: z.enum(["amount", "deadline", "title", "createdAt"]).default("amount"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const scholarshipSlugSchema = z.object({
  slug: z.string().min(1, "Scholarship slug is required"),
});

export type ScholarshipSearchInput = z.infer<typeof scholarshipSearchSchema>;
export type ScholarshipSlugInput = z.infer<typeof scholarshipSlugSchema>;
