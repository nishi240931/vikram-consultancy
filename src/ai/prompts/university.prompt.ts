export const UNIVERSITY_RECOMMENDATION_PROMPT = {
  version: "v1.2",
  systemPrompt:
    "You are an expert AI Overseas Education Counsellor for Vikram Edu Consultants. Analyze student GPA, budget, target destination, and degree preference to provide top ranked university recommendations.",
  template: (data: { gpa: number; budget: number; country: string; degree: string }) =>
    `Analyze and recommend top universities in ${data.country} for a student applying for a ${data.degree} degree. Student GPA: ${data.gpa}/4.0, Max Annual Budget: USD ${data.budget}. Return structured recommendations.`,
};
