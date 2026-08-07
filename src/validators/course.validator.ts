import { z } from "zod";

export const courseSearchSchema = z.object({
  query: z.string().optional(),
  countrySlug: z.string().optional(),
  universitySlug: z.string().optional(),
  degreeLevel: z.enum(["BACHELORS", "MASTERS", "DOCTORATE", "DIPLOMA", "POSTGRADUATE_CERTIFICATE"]).optional(),
  majorCategory: z.string().optional(),
  maxTuitionTotal: z.coerce.number().optional(),
  durationYears: z.coerce.number().optional(),
  maxIeltsScore: z.coerce.number().optional(),
  intakeMonth: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(12),
  sortBy: z.enum(["tuitionTotal", "name", "durationMonths", "createdAt"]).default("name"),
  sortOrder: z.enum(["asc", "desc"]).default("asc"),
});

export const courseSlugSchema = z.object({
  slug: z.string().min(1, "Course slug is required"),
});

export type CourseSearchInput = z.infer<typeof courseSearchSchema>;
export type CourseSlugInput = z.infer<typeof courseSlugSchema>;
