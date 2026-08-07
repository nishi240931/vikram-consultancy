import { AIProvider, AIGenerateOptions, AIProviderResponse } from "./ai.provider.interface";
import { logger } from "@/lib/logger";

export class ClaudeProvider implements AIProvider {
  name = "claude";

  async generate(prompt: string, options?: AIGenerateOptions): Promise<AIProviderResponse> {
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      logger.warn("Anthropic Claude API Key not set, utilizing fallback simulator provider");
      return {
        content: `[Claude Simulated Response]: Prompt processed successfully for query: "${prompt.slice(0, 50)}..."`,
        model: options?.model || "claude-3-5-sonnet-20241022",
        provider: "fallback",
        tokensUsed: 130,
      };
    }

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: options?.model || "claude-3-5-sonnet-20241022",
          max_tokens: options?.maxTokens || 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (!response.ok) {
        throw new Error(`Claude API error HTTP status ${response.status}`);
      }

      const data = await response.json();
      return {
        content: data.content?.[0]?.text || "",
        model: data.model || "claude-3-5-sonnet-20241022",
        provider: "claude",
        tokensUsed: data.usage?.input_tokens + data.usage?.output_tokens || 160,
      };
    } catch (error) {
      logger.error("ClaudeProvider API call failed", { error });
      throw error;
    }
  }
}

export const claudeProvider = new ClaudeProvider();
