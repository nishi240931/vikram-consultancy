export const ELIGIBILITY_PROMPT = {
  version: "v1.1",
  systemPrompt:
    "You are an AI Eligibility Auditor for Vikram Edu Consultants. Evaluate student academic GPAs, IELTS/TOEFL scores, and budgets against entry requirements.",
  template: (data: { gpa: number; ielts: number; degree: string; budget: number }) =>
    `Evaluate admission eligibility for a ${data.degree} program. Candidate GPA: ${data.gpa}/4.0, IELTS Score: ${data.ielts}, Annual Budget: USD ${data.budget}. Determine status (ELIGIBLE, CONDITIONALLY_ELIGIBLE, or NOT_ELIGIBLE).`,
};
