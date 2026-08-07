import { openAIProvider } from "../providers/openai.provider";
import { geminiProvider } from "../providers/gemini.provider";
import { claudeProvider } from "../providers/claude.provider";
import { AIProviderResponse } from "../providers/ai.provider.interface";
import { logger } from "@/lib/logger";

export class AIOrchestrator {
  private activeProvider = process.env.AI_PROVIDER || "openai";

  /**
   * Executes a prompt request through the active AI provider with automatic fallback chain.
   */
  async executePrompt(
    prompt: string,
    options?: { systemPrompt?: string; temperature?: number; maxTokens?: number }
  ): Promise<AIProviderResponse> {
    const startTime = Date.now();
    logger.info(`AIOrchestrator initiating query via provider '${this.activeProvider}'`);

    try {
      if (this.activeProvider === "claude") {
        return await claudeProvider.generate(prompt, options);
      } else if (this.activeProvider === "gemini") {
        return await geminiProvider.generate(prompt, options);
      } else {
        return await openAIProvider.generate(prompt, options);
      }
    } catch (error) {
      logger.warn(`Primary provider '${this.activeProvider}' failed, falling back to OpenAI/Simulator`, { error });
      return await openAIProvider.generate(prompt, options);
    } finally {
      const duration = Date.now() - startTime;
      logger.info(`AIOrchestrator execution completed in ${duration}ms`);
    }
  }
}

export const aiOrchestrator = new AIOrchestrator();
