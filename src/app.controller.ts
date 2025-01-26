import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ILogger } from './logger/logger.interface';

@Controller()
export class AppController {
  constructor(
    @Inject('ILogger') private readonly logger: ILogger,
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    this.logger.log({
      message: 'Hello World!',
      context: AppController.name,
      method: this.getHello.name,
    });
    return this.appService.getHello();
  }
}
