import { z } from "zod";

export const sopReviewSchema = z.object({
  overallScore: z.number().min(0).max(100),
  grammarRating: z.enum(["EXCELLENT", "GOOD", "NEEDS_IMPROVEMENT"]),
  clarityRating: z.enum(["EXCELLENT", "GOOD", "NEEDS_IMPROVEMENT"]),
  structureRating: z.enum(["EXCELLENT", "GOOD", "NEEDS_IMPROVEMENT"]),
  keyStrengths: z.array(z.string()),
  suggestionsForImprovement: z.array(z.string()),
  detailedFeedback: z.string(),
});

export type SOPReviewResult = z.infer<typeof sopReviewSchema>;
