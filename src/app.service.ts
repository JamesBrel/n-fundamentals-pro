import { Injectable } from '@nestjs/common';
import { DevConfigService } from './core/shared/providers/devConfig.service.js';

@Injectable()
export class AppService {
  constructor(private devConfigService: DevConfigService) {}
  getHello(): string {
    return `Hello my dev we will learn the nest js Fundamentals ${this.devConfigService.getDBHOST()}`;
  }
}
