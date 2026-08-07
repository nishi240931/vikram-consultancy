import { z } from "zod";

export const studentProfileUpdateSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  targetCountry: z.string().min(1, "Target country is required"),
  gpa: z.coerce.number().min(0).max(4.0, "GPA must be between 0.0 and 4.0"),
  budgetMax: z.coerce.number().min(1000, "Please enter a valid budget"),
});

export type StudentProfileUpdateInput = z.infer<typeof studentProfileUpdateSchema>;
