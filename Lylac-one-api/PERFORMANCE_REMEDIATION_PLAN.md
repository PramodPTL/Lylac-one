# Performance remediation plan

## Evidence boundary

No representative PostgreSQL dataset, production telemetry, query plans, load profile,
or deployment pool limit was available. Findings below are source-based risks, not
measured bottlenecks. See `POSTGRES_PERFORMANCE_REPORT.md` and
`FETCH_STRATEGY_REPORT.md` for query and association evidence.

| Priority | Area/evidence | Root cause / potential impact | Remediation | Validation and expected impact |
| --- | --- | --- | --- | --- |
| P0 | Customer/order dynamic search OR predicates in `CustomerRepositoryImpl` and `OrderRepositoryImpl` | OR precedence allowed an alternative name/phone predicate to escape tenant scope; malformed Customer path also failed query construction. | Parenthesized alternatives under store predicates, corrected the path, and added query construction tests. | Targeted tests pass. Run PostgreSQL tests with two stores to prove no cross-tenant results. Correctness/security impact is confirmed by query semantics; performance not measured. |
| P1 | Customer and Order repository dynamic list methods | Fetch several collections and apply offsets/max results afterward; result multiplication/in-memory pagination can increase memory and latency. | Use ID-page then association fetch pattern after specifying exact page/count/order contracts. | Compare rows, plans, query count, heap and p95 on representative fixtures; anticipated less row transfer for complex entities, not measured. |
| P1 | Product detail query in `ProductRepositoryImpl` | Fetches several plural associations in one query with DISTINCT; potential cross-product and hydration overhead. | Test narrower fetch plan/batched secondary queries. | Compare SQL rows, statements, hydration time, response graph and heap. |
| P1 | Manufacturer eager descriptions and store | Eager associations add work for all call sites; localized pages may need only one description. | Evaluate lazy/query-specific fetching, preserving detached mapper behavior. | Measure query count per page and test every consumer. |
| P1 | Hibernate pool configuration in `DataConfiguration` | Fixed min/max defaults may under/over-allocate across replicas; no actual pool wait telemetry baseline. | Derive per-instance pool size from PostgreSQL connection budget; monitor Hikari active/idle/pending/timeouts. | Load test saturation/failover and calculate replicas × maximum pool against database limit. |
| P2 | Contains searches on descriptions/email/phone | Leading wildcard and lower-case functions often prevent B-tree index use. | Profile common search paths; consider trigram only after plan/selectivity validation. | `EXPLAIN (ANALYZE, BUFFERS)` on safe representative data; report index storage/write cost. |
| P2 | Existing custom offset pagination and count queries | Deep offsets/counts can become expensive; joined collections complicate totals. | Preserve contracts; optimize count and consider keyset only for internal/new interfaces. | Compare shallow/deep pages, row estimates, totals, and stable ordering. |
| P2 | Cache/observability | Existing Ehcache is active but invalidation and hit-rate coverage are not established. | Instrument current provider and map invalidation before considering Redis. | Measure hit/miss, stale-data incidents, heap and eviction under workload. |

## Execution sequence

1. Establish PostgreSQL 16 baseline with sanitized production-like data and workload.
2. Collect normalized query latency/call counts, pool utilization, and HTTP route
   percentiles.
3. Fix correctness and tenant-isolation tests before optimizing search.
4. Change one query/fetch strategy at a time; compare plans and responses.
5. Adopt an index or cache only after quantified benefit exceeds write/storage/ops cost.
6. Publish measured before/after values with dataset size, concurrency and environment.

No measured improvement is claimed and no benchmark or production schema operation was
performed.
