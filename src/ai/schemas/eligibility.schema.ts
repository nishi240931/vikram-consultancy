import { z } from "zod";

export const eligibilityCheckSchema = z.object({
  status: z.enum(["ELIGIBLE", "CONDITIONALLY_ELIGIBLE", "NOT_ELIGIBLE"]),
  overallConfidencePercentage: z.number().min(0).max(100),
  gpaAssessment: z.string(),
  englishScoreAssessment: z.string(),
  budgetAssessment: z.string(),
  recommendations: z.array(z.string()),
});

export type EligibilityCheckResult = z.infer<typeof eligibilityCheckSchema>;
