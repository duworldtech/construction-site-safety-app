import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { HealthController } from './health.controller.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [AuthModule],
  controllers: [AppController, HealthController],
  providers: [],
})
export class AppModule {}