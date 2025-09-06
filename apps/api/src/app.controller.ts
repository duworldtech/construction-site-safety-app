import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  getRoot() {
    return { name: 'construction-safety-api', version: '0.1.0' };
  }
}