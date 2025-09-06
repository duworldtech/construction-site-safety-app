import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { loadConfig } from '@construction/shared-config';

async function bootstrap() {
  const cfg = loadConfig();
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.PORT ?? cfg.APP_PORT);
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`API listening on ${process.env.API_URL ?? `http://localhost:${port}`} (env=${cfg.NODE_ENV}, mode=${cfg.MODE})`);
}
bootstrap();