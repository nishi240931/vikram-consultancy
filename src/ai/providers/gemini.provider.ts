import { AIProvider, AIGenerateOptions, AIProviderResponse } from "./ai.provider.interface";
import { logger } from "@/lib/logger";

export class GeminiProvider implements AIProvider {
  name = "gemini";

  async generate(prompt: string, options?: AIGenerateOptions): Promise<AIProviderResponse> {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      logger.warn("Google Gemini API Key not set, utilizing fallback simulator provider");
      return {
        content: `[Gemini Simulated Response]: Prompt processed successfully for query: "${prompt.slice(0, 50)}..."`,
        model: options?.model || "gemini-1.5-pro",
        provider: "fallback",
        tokensUsed: 110,
      };
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${options?.model || "gemini-1.5-pro"}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini API error HTTP status ${response.status}`);
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      return {
        content: text,
        model: options?.model || "gemini-1.5-pro",
        provider: "gemini",
        tokensUsed: 140,
      };
    } catch (error) {
      logger.error("GeminiProvider API call failed", { error });
      throw error;
    }
  }
}

export const geminiProvider = new GeminiProvider();
