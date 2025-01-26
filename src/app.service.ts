import { Inject, Injectable } from '@nestjs/common';
import { ILogger } from './logger/logger.interface';

@Injectable()
export class AppService {
  constructor(@Inject('ILogger') private readonly logger: ILogger) {}

  getHello(): string {
    const methodName = this.getHello.name;

    this.logger.log({
      message: 'Hello World!',
      context: AppService.name,
      method: methodName,
    });

    return 'Hello World!';
  }
}
