export const ROLES = {
  STUDENT: "STUDENT",
  COUNSELLOR: "COUNSELLOR",
  ADMIN: "ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const DEGREE_LEVELS = [
  "Bachelors",
  "Masters",
  "Doctorate (PhD)",
  "Diploma",
  "Postgraduate Certificate",
] as const;

export const INTAKES = ["Fall", "Spring", "Summer"] as const;

export const APPLICATION_STATUSES = [
  "DRAFT",
  "SUBMITTED",
  "UNDER_REVIEW",
  "OFFER_ISSUED",
  "VISA_PROCESSING",
  "VISA_APPROVED",
  "ENROLLED",
  "REJECTED",
] as const;
