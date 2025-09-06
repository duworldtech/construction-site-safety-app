import { Controller, Get } from '@nestjs/common';
import { loadConfig } from '@construction/shared-config';

const startedAt = Date.now();

@Controller('health')
export class HealthController {
  @Get()
  getHealth() {
    const cfg = loadConfig();
    const uptime = (Date.now() - startedAt) / 1000;
    return { status: 'ok', uptime, env: cfg.NODE_ENV, mode: cfg.MODE };
  }
}