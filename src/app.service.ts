import { Inject, Injectable } from '@nestjs/common';
import { ILogger } from './logger/logger.interface';

@Injectable()
export class AppService {
  constructor(@Inject('ILogger') private readonly logger: ILogger) {}

  getHello(): string {
    this.logger.log({
      message: 'Hello World!',
      context: AppService.name,
      method: this.getHello.name,
    });

    return 'Hello World!';
  }
}
