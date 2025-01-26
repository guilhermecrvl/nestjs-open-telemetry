import {
  BatchSpanProcessor,
  SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-base';
import { api, NodeSDK } from '@opentelemetry/sdk-node';
import * as process from 'process';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import * as dotenv from 'dotenv';
import { B3Propagator } from '@opentelemetry/propagator-b3';

dotenv.config();

const collectorOptions = {
  url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT, // url is optional and can be omitted - default is http://localhost:4318/v1/traces
  headers: {},
  concurrencyLimit: 10,
};

const traceExporter = new OTLPTraceExporter(collectorOptions);

const spanProcessor =
  process.env.ENVIRONMENT === `development`
    ? new SimpleSpanProcessor(traceExporter)
    : new BatchSpanProcessor(traceExporter);

// It's responsible for configuring the B3 context propagator for the propagation of trace IDs
// and other context data between services or components in your distributed system.
api.propagation.setGlobalPropagator(new B3Propagator());

export const otelSDK = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: process.env.SERVICE_NAME,
  }),
  spanProcessor,
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
    new NestInstrumentation(),
  ],
});
