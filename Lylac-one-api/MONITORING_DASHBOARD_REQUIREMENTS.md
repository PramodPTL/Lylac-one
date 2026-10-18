# Monitoring dashboard requirements

Thresholds below are intentionally not numeric: representative traffic, availability
targets, database capacity, and baseline latency were not supplied. Establish SLOs and
alert thresholds from production-like load tests and observed service data before paging.

| Signal | Purpose / source | Visualization | Alert consideration / response |
| --- | --- | --- | --- |
| HTTP request rate | Micrometer `http.server.requests` | Requests/s by method, route template, status class | Alert on sustained traffic loss only when expected; investigate ingress, deployment and dependencies. Avoid raw paths/IDs as labels. |
| HTTP latency | Request timer histogram | p50/p95/p99 by bounded route template | Compare to route-specific SLO; inspect DB/external dependency saturation and recent releases. |
| HTTP errors | `http.server.requests` 4xx/5xx | Error ratio and absolute counts | Alert on sustained 5xx SLO breach; separate client errors. Check logs with trace/correlation ID. |
| Database pool active/idle/pending | Hikari metrics | Active vs max, pending borrowers, timeout count | Alert for persistent saturation or connection timeouts; inspect PostgreSQL capacity, slow queries, and connection leaks. |
| Database acquisition/response latency | Hikari and PostgreSQL exporter if deployed | Latency distribution and active sessions | Correlate query latency, locks, CPU/IO, and pool wait; do not infer query cause from pool usage alone. |
| Cache hits/misses/evictions | Micrometer cache meters for active provider | Hit ratio by bounded cache name | Alert on sharp hit-ratio regression or capacity evictions; inspect key cardinality and invalidation. Redis metrics only after Redis implementation. |
| JVM heap/non-heap and GC | JVM Micrometer meters | Used/committed/max, pause duration/rate | Alert on sustained heap near limit or GC pause SLO; capture heap only via controlled secure procedure. |
| Threads / executor queues | JVM and application executor meters | Live/peak threads; active/queued tasks | Alert on sustained queue growth/rejections; inspect blocked threads and downstream latency. |
| Health/readiness/liveness | Actuator health probes | State over time and restart counts | Readiness failure removes instance from traffic; liveness failure restarts; never include private health detail publicly. |
| Slow SQL / DB saturation | PostgreSQL `pg_stat_statements` and query logs, separately secured | Top normalized query time/calls; locks; waits | Trigger review after sustained DB SLO impact; run `EXPLAIN (ANALYZE, BUFFERS)` only in safe environment. |
| Migration status | Flyway history and deploy pipeline | Applied version/checksum by environment | Block rollout on validation failure; page only according to deployment process. |

## Dashboard layout

1. Service health: request rate, error ratio, p95/p99, readiness.
2. Runtime: JVM heap/GC, threads, executor saturation.
3. Database: Hikari utilization/wait, PostgreSQL activity/locks/replication if exporter
   is deployed.
4. Cache: active provider hit/miss/eviction; omit Redis panels until Redis is deployed.
5. Deployments: release version, migration version, restart and error annotations.

Do not put tokens, customer data, raw query strings, or unbounded exception labels into
Prometheus. Restrict dashboard access to authorized operators.
