# Cache strategy

## Current state

Spring caching is enabled in `DataConfiguration`. Hibernate second-level and query
caches are also enabled and use Ehcache. Ehcache has finite defaults, but several named
caches define no explicit TTL and existing Spring cache annotations do not show
domain-write invalidation in the reviewed service paths. Reference data services cache
country, language, and zone lookups. No Redis dependency or cache cluster is configured.

## Recommendation

Do not introduce distributed Redis caching for mutable catalog, customer, order, or
store data until all write paths, invalidation boundaries, tenant-aware keys, cache
serialization, and multi-instance consistency requirements are mapped. A stale catalog
entry can be externally visible; caching customer or authorization data is not justified
by current evidence. Keep current public behavior unchanged.

For a future Redis design, use cache-aside behind existing service boundaries, explicit
tenant-scoped keys, bounded TTLs, a versioned JSON serializer with an allow-listed DTO
type model (not polymorphic Java object deserialization), and Redis failure behavior
that falls back to the database for reads. Writes must commit first and then evict/update
all affected keys; use an outbox or durable invalidation event if cross-instance
reliability is required.

## Candidate policy (proposal)

| Data | Candidate / key boundary | Suggested initial TTL | Invalidation and decision |
| --- | --- | ---: | --- |
| Products | `catalog:product:v1:{tenantId}:{productId}:{locale}` | 1-5 minutes after measured traffic | Evict on product, price, inventory/availability, description, category, or manufacturer changes. Do not cache inventory as authoritative stock. |
| Categories | `catalog:category:v1:{tenantId}:{categoryId}:{locale}` | 5 minutes | Evict on category hierarchy, description, or product-category changes. |
| Manufacturers | `catalog:manufacturer:v1:{tenantId}:{manufacturerId}:{locale}` | 5 minutes | Evict on manufacturer or localized description changes. |
| Store configuration | `store:config:v1:{tenantId}:{configKey}` | 1-5 minutes | Evict on config update; do not cache secrets or credentials. |
| Search metadata | `search:metadata:v1:{tenantId}:{locale}` | 1-5 minutes | Evict on catalog metadata change; do not cache result pages before workload/correctness validation. |
| Customer/security decisions | None | N/A | Do not cache by default; identity/authorization revocation must take effect promptly. |

TTL values are starting hypotheses, not measured SLOs. Establish cache size limits,
maximum value size, eviction policy, and Redis memory alerts before enabling writes.
Avoid indefinite TTLs, unbounded key cardinality, and raw request values in keys.

## Operations and failure behavior

- Cache metrics: hit/miss/put/eviction by bounded cache name only; never label with
  tenant IDs, customer identifiers, SKU, or search text.
- Cache warming: start empty and warm only after the service is healthy; do not create
  startup coupling to Redis.
- Redis outage: business reads should fall back to the database; write success must not
  falsely claim an invalidation occurred if strict consistency is required. Document
  and alert any bounded stale-read window.
- Version cache key namespaces when payload/schema changes. Define maxmemory and
  eviction behavior in deployment configuration.
- Redis access must be private-networked, authenticated, encrypted in transit where
  supported, and secret-managed. Do not expose Redis publicly.

## Implementation status

No Redis code or dependency was added: adding a distributed cache before invalidation and
deployment topology are known risks stale data and operational cost. Existing Ehcache
behavior remains as-is. Instrument its current metrics before evaluating a cutover.
