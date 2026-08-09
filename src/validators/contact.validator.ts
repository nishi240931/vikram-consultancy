import { z } from "zod";

export const contactInquirySchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  phone: z.string().optional().nullable(),
  targetDestination: z.string().optional().nullable(),
  message: z.string().min(5, "Message must be at least 5 characters long"),
});

export type ContactInquiryInput = z.infer<typeof contactInquirySchema>;
