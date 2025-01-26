export interface ILogger {
  log(context?: ILogMetadata): void;
  error(context?: ILogMetadata): void;
  warn(context?: ILogMetadata): void;
  debug?(context?: ILogMetadata): void;
  verbose?(context?: ILogMetadata): void;
}

export interface ILogMetadata {
  message: string;
  context?: string;
  method?: string;
  additionalInfo?: Record<string, unknown>;
  traceId?: string;
  spanId?: string;
}
