export interface AIGenerateOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
}

export interface AIProviderResponse {
  content: string;
  model: string;
  provider: "openai" | "gemini" | "claude" | "fallback";
  tokensUsed?: number;
}

export interface AIProvider {
  name: string;
  generate(prompt: string, options?: AIGenerateOptions): Promise<AIProviderResponse>;
}
