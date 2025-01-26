import { Module } from '@nestjs/common';
import { WinstonLoggerService } from './winston-logger.service';

@Module({
  imports: [],
  providers: [
    {
      provide: 'ILogger',
      useClass: WinstonLoggerService,
    },
  ],
  exports: ['ILogger'],
})
export class LoggerModule {}
