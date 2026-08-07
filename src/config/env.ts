import { z } from "zod";

export const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  
  // Clerk Authentication Keys
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z
    .string()
    .min(1, "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is required"),
  CLERK_SECRET_KEY: z.string().min(1, "CLERK_SECRET_KEY is required"),
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().default("/sign-in"),
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().default("/sign-up"),
  CLERK_WEBHOOK_SECRET: z.string().optional(),
  
  // Database Connection
  DATABASE_URL: z.string().min(1, "PostgreSQL DATABASE_URL is required"),

  // AWS S3 Storage
  AWS_S3_BUCKET: z.string().optional(),
  AWS_REGION: z.string().optional(),
  AWS_ACCESS_KEY_ID: z.string().optional(),
  AWS_SECRET_ACCESS_KEY: z.string().optional(),

  // OpenAI Key for Independent AI Service
  OPENAI_API_KEY: z.string().optional(),

  // Resend Email Key
  RESEND_API_KEY: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

/**
 * Validates process.env variables and logs structured error messages if validation fails.
 */
export function validateEnv(): Env {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("❌ Invalid environment variables detected:");
    console.error(JSON.stringify(parsed.error.flatten().fieldErrors, null, 2));
    if (process.env.NODE_ENV === "production") {
      throw new Error("Invalid environment variables. Application cannot start.");
    }
  }

  return parsed.data || (process.env as unknown as Env);
}
