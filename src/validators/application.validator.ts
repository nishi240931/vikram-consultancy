import { z } from "zod";

export const createApplicationSchema = z.object({
  courseId: z.string().min(1),
  studentId: z.string().min(1),
  notes: z.string().optional(),
});

export type CreateApplicationInput = z.infer<typeof createApplicationSchema>;
