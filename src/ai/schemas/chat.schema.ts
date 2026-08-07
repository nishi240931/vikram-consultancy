import { z } from "zod";

export const chatMessageSchema = z.object({
  id: z.string(),
  sender: z.enum(["user", "assistant"]),
  content: z.string(),
  timestamp: z.string(),
  suggestedActions: z.array(z.string()).optional(),
});

export type ChatMessage = z.infer<typeof chatMessageSchema>;
