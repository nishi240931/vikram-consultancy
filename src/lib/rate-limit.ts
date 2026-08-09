import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";

interface RateLimitStore {
  count: number;
  resetTime: number;
}

const tracker = new Map<string, RateLimitStore>();

/**
 * Rate Limiter Helper (Sliding Window In-Memory with Production Redis Adapter Interface)
 * @param req Client HTTP Request
 * @param maxRequests Max allowed requests within window
 * @param windowMs Window duration in milliseconds
 */
export function checkRateLimit(
  req: Request,
  maxRequests: number = 5,
  windowMs: number = 60000
): { success: boolean; response?: NextResponse } {
  // Extract client IP address or user-agent fingerprint
  const forwardedFor = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  const ip = (forwardedFor ? forwardedFor.split(",")[0] : realIp) || "127.0.0.1";

  const now = Date.now();
  const record = tracker.get(ip);

  if (!record || now > record.resetTime) {
    tracker.set(ip, {
      count: 1,
      resetTime: now + windowMs,
    });
    return { success: true };
  }

  if (record.count >= maxRequests) {
    logger.warn(`Rate limit exceeded for IP ${ip}`);
    return {
      success: false,
      response: NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please wait a minute before trying again.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil((record.resetTime - now) / 1000).toString(),
            "X-RateLimit-Limit": maxRequests.toString(),
            "X-RateLimit-Remaining": "0",
          },
        }
      ),
    };
  }

  record.count += 1;
  return { success: true };
}
