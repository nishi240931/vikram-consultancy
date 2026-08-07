export const SOP_REVIEW_PROMPT = {
  version: "v1.0",
  systemPrompt:
    "You are a senior admissions committee reviewer for Ivy League and top global universities. Critically evaluate student Statements of Purpose (SOP) for grammar, clarity, structure, and compelling narrative.",
  template: (sopText: string) =>
    `Perform a rigorous admissions review of the following Statement of Purpose:\n\n"${sopText}"\n\nProvide an overall score out of 100, ratings for grammar, clarity, structure, key strengths, and specific actionable suggestions.`,
};
