# OpenTelemetry Logging Integration with NestJS

## Overview

This project demonstrates how to integrate **OpenTelemetry** with **NestJS** for distributed tracing, logging, and service observability. OpenTelemetry is an open-source framework that allows developers to collect metrics, logs, and traces from their applications in a standardized way. This setup uses **Jaeger** for distributed tracing visualization and **Winston** for logging.

## Key Features

- **Distributed Tracing**: Using OpenTelemetry, trace data such as `traceId` and `spanId` is collected and propagated through your services, making it easier to trace requests across distributed systems.
- **Logging with Winston**: Logs are generated with Winston and enhanced with contextual information like the `traceId`, `spanId`, `method`, and `context`.
- **Separation of Concerns**: The logging service is decoupled from other parts of the system, following good design principles that allow easier future updates and replacements of logging mechanisms.

## Benefits

1. **Distributed Tracing**: Allows tracking of requests across microservices.
2. **Improved Debugging**: With trace data included in logs, debugging and monitoring are significantly simplified.
3. **Decoupling of Log Service**: By separating the logging service, it allows for better flexibility and scalability (e.g., switching logging providers or adjusting log formats).

## How to Install

### Prerequisites

Make sure you have the following installed:

- **Node.js** (version 16 or higher)
- **Docker** (for running Jaeger)

### Step 1: Install NPM Packages

Run the following command to install all the necessary dependencies:

```bash
npm install
```

### Step 2: Build the Project

Build the project by running:

```bash
npm run build
```

### Step 3: Run the Application

To run the NestJS application locally, use the following command:

```bash
npm run start:dev
```

This will start the application, and you should be able to access it at `http://localhost:3000`.

### Step 4: Run Jaeger with Docker

To start Jaeger in Docker for trace visualization, run the following command:

```bash
docker-compose up -d
```

This will start Jaeger's UI, which can be accessed at [http://localhost:16686](http://localhost:16686). You can view the traces of your application here.

## Code Overview

### Logging Service

- **WinstonLoggerService**: This service uses the `winston` package to log messages with trace information (i.e., `traceId` and `spanId`). It enriches the logs with contextual data such as the current method name and service name.
  
- **Context Enrichment**: The `WinstonLoggerService` enriches logs by attaching tracing data and contextual information, allowing for better observability.

### OpenTelemetry Integration

- **OpenTelemetry SDK**: The OpenTelemetry SDK collects trace data and propagates it across services. The `B3Propagator` is used to ensure the trace context is propagated between requests.

- **Jaeger Exporter**: Trace data is sent to Jaeger for visualization. The `OTLPTraceExporter` exports the trace data in a format that Jaeger can process.

### Why Decouple the Logging Service?

By decoupling the logging service, the application becomes more flexible and maintainable. If you need to replace the logging system (e.g., switching from `winston` to another logging provider), you can easily do so by simply replacing the logging service class in the `LoggerModule`, and it's done! This separation of concerns improves modularity and code reuse, allowing you to swap logging implementations with minimal impact on the rest of the application.


## Conclusion

This setup demonstrates how to combine OpenTelemetry's distributed tracing capabilities with Winston logging in a NestJS application. By adopting this approach, you will be able to track requests across microservices while logging critical contextual data such as trace and span IDs, making debugging and monitoring much more efficient.
