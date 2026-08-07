import { z } from "zod";

export const paginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
});

export const countryQuerySchema = paginationSchema.extend({
  query: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
  minWorkPermitYears: z.coerce.number().optional(),
});

export const universityQuerySchema = paginationSchema.extend({
  query: z.string().optional(),
  countrySlug: z.string().optional(),
  countryId: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
  maxRankingGlobal: z.coerce.number().optional(),
  maxTuitionFee: z.coerce.number().optional(),
  city: z.string().optional(),
});

export const courseQuerySchema = paginationSchema.extend({
  query: z.string().optional(),
  universitySlug: z.string().optional(),
  universityId: z.string().optional(),
  degreeLevel: z.enum(["BACHELORS", "MASTERS", "DOCTORATE", "DIPLOMA", "POSTGRADUATE_CERTIFICATE"]).optional(),
  majorCategory: z.string().optional(),
  maxTuitionTotal: z.coerce.number().optional(),
  greRequired: z.coerce.boolean().optional(),
  maxIeltsScore: z.coerce.number().optional(),
});

export const scholarshipQuerySchema = paginationSchema.extend({
  query: z.string().optional(),
  countrySlug: z.string().optional(),
  universitySlug: z.string().optional(),
  type: z.enum(["FULL_TUITION", "PARTIAL_TUITION", "STIPEND", "ONE_TIME_GRANT"]).optional(),
  minAmount: z.coerce.number().optional(),
});

export type CountryQueryInput = z.infer<typeof countryQuerySchema>;
export type UniversityQueryInput = z.infer<typeof universityQuerySchema>;
export type CourseQueryInput = z.infer<typeof courseQuerySchema>;
export type ScholarshipQueryInput = z.infer<typeof scholarshipQuerySchema>;
