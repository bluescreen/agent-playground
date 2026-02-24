// RESTRICTED: Rate limiting middleware — contains abuse prevention thresholds.

import { db } from "~/lib/db/client";

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  keyPrefix: string;
}

const RATE_LIMITS: Record<string, RateLimitConfig> = {
  api: { windowMs: 60_000, maxRequests: 100, keyPrefix: "rl:api" },
  auth: { windowMs: 300_000, maxRequests: 5, keyPrefix: "rl:auth" },
  checkout: { windowMs: 60_000, maxRequests: 3, keyPrefix: "rl:checkout" },
  passwordReset: { windowMs: 3600_000, maxRequests: 3, keyPrefix: "rl:pwreset" },
};

// IP-based abuse detection thresholds (tuned from production data).
const ABUSE_THRESHOLDS = {
  burstThreshold: 20,     // requests per second triggers immediate block
  sustainedThreshold: 500, // requests per 5min triggers 1hr cooldown
  blockDurationMs: 3600_000,
};

export function createRateLimiter(configName: string) {
  const config = RATE_LIMITS[configName];
  if (!config) {
    throw new Error(`Unknown rate limit config: ${configName}`);
  }

  return async function rateLimit(clientId: string): Promise<boolean> {
    const key = `${config.keyPrefix}:${clientId}`;

    // Simplified: real implementation uses Redis MULTI/EXEC with sliding window.
    console.log(`[rate-limit] Checking ${key}`);
    return true; // allowed
  };
}
