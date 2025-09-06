import { Controller, Get, UseGuards } from '@nestjs/common';
import { loadConfig } from '@construction/shared-config';
import { JwtAuthGuard } from './auth/jwt.guard.js';

const startedAt = Date.now();

@Controller('health')
export class HealthController {
  @Get()
  getHealth() {
    const cfg = loadConfig();
    const uptime = (Date.now() - startedAt) / 1000;
    return { status: 'ok', uptime, env: cfg.NODE_ENV, mode: cfg.MODE };
  }

  @Get('secure')
  @UseGuards(new JwtAuthGuard((null as any), ['site-manager', 'admin'] as any))
  // Note: guard injected properly via module/ref in real routes; here we use a new instance for simplicity.
  getSecure() {
    return { status: 'ok-secure' };
  }
}