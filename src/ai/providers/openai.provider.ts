import { AIProvider, AIGenerateOptions, AIProviderResponse } from "./ai.provider.interface";
import { logger } from "@/lib/logger";

export class OpenAIProvider implements AIProvider {
  name = "openai";

  async generate(prompt: string, options?: AIGenerateOptions): Promise<AIProviderResponse> {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      logger.warn("OpenAI API Key not set, utilizing fallback simulator provider");
      return {
        content: `[OpenAI Simulated Response]: Prompt processed successfully for query: "${prompt.slice(0, 50)}..."`,
        model: options?.model || "gpt-4o",
        provider: "fallback",
        tokensUsed: 120,
      };
    }

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: options?.model || "gpt-4o",
          messages: [
            ...(options?.systemPrompt ? [{ role: "system", content: options.systemPrompt }] : []),
            { role: "user", content: prompt },
          ],
          temperature: options?.temperature ?? 0.7,
          max_tokens: options?.maxTokens ?? 1000,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error HTTP status ${response.status}`);
      }

      const data = await response.json();
      return {
        content: data.choices?.[0]?.message?.content || "",
        model: data.model || "gpt-4o",
        provider: "openai",
        tokensUsed: data.usage?.total_tokens || 150,
      };
    } catch (error) {
      logger.error("OpenAIProvider API call failed", { error });
      throw error;
    }
  }
}

export const openAIProvider = new OpenAIProvider();
