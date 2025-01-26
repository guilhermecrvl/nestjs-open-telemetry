import { Injectable } from '@nestjs/common';
import { createLogger, format, transports } from 'winston';
import { ILogger, ILogMetadata } from './logger.interface';
import { context as otelContext, trace } from '@opentelemetry/api';

@Injectable()
export class WinstonLoggerService implements ILogger {
  private readonly logger = createLogger({
    level: 'info',
    format: format.combine(format.timestamp(), format.json()),
    transports: [new transports.Console()],
  });

  log(context: ILogMetadata): void {
    this.logger.info(this.enrichContext(context));
  }

  error(context: ILogMetadata): void {
    this.logger.error(this.enrichContext(context));
  }

  warn(context: ILogMetadata): void {
    this.logger.warn(this.enrichContext(context));
  }

  debug(context: ILogMetadata): void {
    this.logger.debug(this.enrichContext(context));
  }

  verbose(context: ILogMetadata): void {
    this.logger.verbose(this.enrichContext(context));
  }

  private enrichContext(ctx: ILogMetadata): Record<string, unknown> {
    const span = trace.getSpan(otelContext.active());
    const spanContext = span?.spanContext();

    if (spanContext) {
      // Adding traceId and spanId to the log context
      ctx.traceId = spanContext.traceId;
      ctx.spanId = spanContext.spanId;
    }

    return {
      timestamp: new Date().toISOString(),
      context: ctx.context,
      method: ctx.method,
      traceId: ctx.traceId || 'N/A',
      spanId: ctx.spanId || 'N/A',
      message: ctx.message,
    };
  }
}
