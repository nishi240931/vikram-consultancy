import { z } from "zod";

export const universityRecommendationSchema = z.object({
  id: z.string(),
  name: z.string(),
  country: z.string(),
  globalRank: z.number(),
  matchScorePercentage: z.number().min(0).max(100),
  reason: z.string(),
});

export const courseRecommendationSchema = z.object({
  id: z.string(),
  title: z.string(),
  universityName: z.string(),
  degreeLevel: z.string(),
  tuitionFee: z.number(),
  currency: z.string(),
  matchReason: z.string(),
});

export const scholarshipRecommendationSchema = z.object({
  id: z.string(),
  title: z.string(),
  amount: z.number(),
  currency: z.string(),
  coverageType: z.string(),
  eligibilityNote: z.string(),
});

export type UniversityRecommendation = z.infer<typeof universityRecommendationSchema>;
export type CourseRecommendation = z.infer<typeof courseRecommendationSchema>;
export type ScholarshipRecommendation = z.infer<typeof scholarshipRecommendationSchema>;
