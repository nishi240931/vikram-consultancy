import { z } from "zod";

export const studyBudgetSchema = z.object({
  countryName: z.string(),
  currency: z.string(),
  tuitionFeeAnnual: z.number(),
  livingCostAnnual: z.number(),
  healthInsuranceAnnual: z.number(),
  visaAndFlightCost: z.number(),
  totalEstimatedAnnualCost: z.number(),
  savingsTips: z.array(z.string()),
});

export type StudyBudgetPlan = z.infer<typeof studyBudgetSchema>;
