// Import the OTEL SDK before any other modules
import { otelSDK } from './otel-tracing';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  // Start SDK before the application starts
  await otelSDK.start();
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000, () => {
    Logger.log(
      `Server running on http://localhost:${process.env.PORT ?? 3000}`,
    );
  });
}
bootstrap();
