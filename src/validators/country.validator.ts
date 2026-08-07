import { z } from "zod";

export const countryFilterSchema = z.object({
  code: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
  query: z.string().optional(),
});

export const countrySlugSchema = z.object({
  slug: z.string().min(1, "Slug parameter is required"),
});

export const countrySearchSchema = z.object({
  query: z.string().min(1, "Search query cannot be empty"),
});

export type CountryFilterInput = z.infer<typeof countryFilterSchema>;
export type CountrySlugInput = z.infer<typeof countrySlugSchema>;
export type CountrySearchInput = z.infer<typeof countrySearchSchema>;
