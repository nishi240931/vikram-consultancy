import { logger } from "@/lib/logger";

export interface LogEvent {
  level: "info" | "warn" | "error";
  message: string;
  context?: Record<string, any>;
  timestamp?: string;
}

export class MonitoringService {
  log(event: LogEvent) {
    const payload = {
      timestamp: event.timestamp || new Date().toISOString(),
      ...event.context,
    };

    if (event.level === "error") {
      logger.error(event.message, payload);
    } else if (event.level === "warn") {
      logger.warn(event.message, payload);
    } else {
      logger.info(event.message, payload);
    }
  }

  traceAIQuery(provider: string, model: string, durationMs: number, tokens?: number) {
    this.log({
      level: "info",
      message: `AI Telemetry: Query executed via ${provider}/${model}`,
      context: { provider, model, durationMs, tokens },
    });
  }
}

export const monitoring = new MonitoringService();
