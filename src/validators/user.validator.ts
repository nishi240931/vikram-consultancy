import { z } from "zod";

export const createUserSchema = z.object({
  clerkUserId: z.string().min(1, "Clerk User ID is required"),
  email: z.string().email("Invalid email address"),
  firstName: z.string().nullable().optional(),
  lastName: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  avatarUrl: z.string().nullable().optional(),
  role: z.enum(["STUDENT", "COUNSELLOR", "ADMIN", "SUPER_ADMIN"]).optional(),
});

export const syncUserSchema = z.object({
  clerkUserId: z.string().min(1),
  email: z.string().email(),
  firstName: z.string().nullable().optional(),
  lastName: z.string().nullable().optional(),
  avatarUrl: z.string().nullable().optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type SyncUserInput = z.infer<typeof syncUserSchema>;
