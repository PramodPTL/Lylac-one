# Observability guide

## Implemented foundation

`sm-shop` already includes Spring Boot Actuator. This change adds the
`micrometer-registry-prometheus` runtime dependency and narrows the web-exposed endpoint
set to `health`, `info`, and `prometheus`. Health details and component names are no
longer returned to unauthenticated callers; liveness/readiness probes are enabled.
Scraping `/actuator/prometheus` still requires network and access-control enforcement at
the service/ingress layer.

Metrics available through Actuator include HTTP server observations, JVM/memory/GC,
process/thread, datasource/Hikari, and Spring cache metrics where their instrumentation
is active. No Grafana runtime is added to the application.

## Endpoint and security controls

- Do not expose management endpoints on the public storefront listener or public ingress.
- Allow Prometheus access only from the monitoring network/service account. Use ingress
  authentication/network policy/TLS as appropriate to deployment.
- Never expose `env`, `configprops`, `beans`, `heapdump`, `threaddump`, `loggers`, or
  `shutdown` over public networks.
- Health payloads do not include component details; provide detailed diagnostics through
  authenticated operator channels and logs.
- Keep metric labels low-cardinality. Avoid store IDs, users, email addresses, product
  codes, query strings, and exception messages as labels.

## Naming and collection

Use Micrometer's standard names (for example `http.server.requests`,
`jvm.memory.used`, `hikaricp.connections.active`, and `cache.gets`) and Prometheus
exporter naming. Custom metrics should use a `lylac_` prefix and bounded tags such as
application, environment, method, status class, and cache name.

Scrape intervals and retention are owned by the monitoring platform; begin with 15-30
seconds and tune after volume review. Do not add custom timers to all repository calls
without sampling/label design.

## Dashboard and alert setup

Use [MONITORING_DASHBOARD_REQUIREMENTS.md](./MONITORING_DASHBOARD_REQUIREMENTS.md) for
panels and operational responses. Alert thresholds should be derived from a measured
baseline and service SLOs rather than copied assumptions. Display rate/percentile/ratio
trends and current pool saturation; annotate deployment and migration events.

## Troubleshooting

1. Confirm `/actuator/health` is reachable from the application health checker.
2. Confirm `/actuator/prometheus` is reachable from the approved scrape target and the
   `prometheus` registry is present in the executable jar.
3. Verify scrape target labels do not contain tenant or user data.
4. Check application logs and Hikari metrics during DB saturation; metrics do not
   replace PostgreSQL query plans.
5. For a missing metric, inspect meter registration and scrape configuration; do not
   enable all Actuator endpoints as a workaround.

The current environment had no Prometheus or Grafana instance, so dashboard ingestion
and authentication were not integration-tested.
