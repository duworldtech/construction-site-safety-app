import 'dotenv/config';
import { z } from 'zod';

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  MODE: z.enum(['mock', 'live']).default('mock'),
  APP_NAME: z.string().default('construction-safety-app'),
  APP_PORT: z.coerce.number().int().positive().default(3000),
  HMAC_SECRET: z.string().min(16, 'HMAC_SECRET must be at least 16 chars').default('change-me-please-very-secret')
});

export type AppConfig = z.infer<typeof EnvSchema>;

let cached: AppConfig | null = null;

export function loadConfig(): AppConfig {
  if (cached) return cached;
  const parsed = EnvSchema.safeParse(process.env);
  if (!parsed.success) {
    const issues = parsed.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; ');
    throw new Error(`Invalid environment configuration: ${issues}`);
  }
  cached = parsed.data;
  return cached;
}

export function isMock() {
  return loadConfig().MODE === 'mock';
}

export function isLive() {
  return loadConfig().MODE === 'live';
}