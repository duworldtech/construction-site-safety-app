import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { HealthController } from './health.controller.js';

@Module({
  imports: [],
  controllers: [AppController, HealthController],
  providers: [],
})
export class AppModule {}