# Search scalability plan

## Current architecture

The codebase has Spring Data/JPA and dynamic HQL searches backed by relational tables.
The parent POM also includes Elasticsearch-related versioning/dependencies and search
services, but this review did not establish a complete operational index pipeline,
volume, freshness contract, or current production latency. PostgreSQL compatibility and
index candidates are documented in `POSTGRES_COMPATIBILITY_REPORT.md`,
`POSTGRES_PERFORMANCE_REPORT.md`, and `POSTGRES_INDEX_RECOMMENDATIONS.md`.

## Technology comparison

| Option | Strengths | Costs / risks | Fit on available evidence |
| --- | --- | --- | --- |
| PostgreSQL B-tree and relational predicates | Strong consistency, simple operations, joins/tenant scope; good equality/range/sort. | Leading-wildcard matching not B-tree-friendly; relevance/facets limited without extra design. | Default choice for current commerce filtering; profile and add vetted indexes. |
| PostgreSQL full-text/trigram | Lower operational complexity than a separate cluster; supports text matching and ranked search with extensions/configuration. | Language config, write amplification, index maintenance, ranking and wildcard semantics need design. | Evaluate for observed contains/full-text workloads; trigram candidate SQL remains proposal-only. |
| Elasticsearch/OpenSearch | Rich relevance, analyzers, faceting and distributed search. | New cluster, auth/network/backup/upgrade cost, eventual consistency, reindex/sync/outbox and failure modes. | Not justified without measurable search latency/volume/relevance needs and an owner. |

## Decision gates

Before adding external search, measure search QPS, p95/p99, result cardinality, facet
needs, text-language requirements, DB CPU/IO, index size, and user relevance quality.
Set a freshness SLO and recovery-point target. If PostgreSQL cannot meet those targets
after query/index tuning, run a time-boxed OpenSearch/Elasticsearch proof with
dual-read comparison and tenant-isolation tests.

## Future migration controls

- Keep PostgreSQL authoritative for writes.
- Publish index changes through a durable outbox/CDC or equivalent replayable mechanism;
  do not rely on best-effort in-process events for correctness.
- Make indexing idempotent and versioned; support full reindex, alias cutover, lag
  monitoring and dead-letter recovery.
- Preserve current result contract while shadowing new results and measuring relevance.
- Ensure all document IDs and filters include tenant/store scope.

No search backend, indexer, or new search behavior was added in this phase.
