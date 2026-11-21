# PostgreSQL index recommendations

## Status

Recommendations are candidates, not approved migrations. They are based on JPA entity
mapping and repository query shapes. The live PostgreSQL catalog, data distribution,
existing indexes, and query plans were unavailable. **Do not run the proposed SQL until
the production schema and index inventory have been reviewed and the change approved.**
The optional script at `sql/postgresql/recommended-search-indexes.sql` is not wired into
application startup or Docker initialization.

## Candidate indexes

| Table / columns | Type and candidate | Query pattern | Benefit / cost / redundancy | Validation |
| --- | --- | --- | --- | --- |
| `MANUFACTURER_DESCRIPTION.NAME` | GIN trigram: `USING gin (NAME gin_trgm_ops)` | Manufacturer name contains search: `LIKE '%term%'`; joined by manufacturer and optionally language. | May accelerate sufficiently selective substring searches. Adds write and storage cost; patterns shorter than 3 characters may not benefit. Existing unique `(MANUFACTURER_ID, LANGUAGE_ID)` supports the relation/language side but not substring lookup. | Confirm `pg_trgm` availability; compare plans and index size. |
| `PRODUCT_DESCRIPTION.NAME` | GIN trigram expression: `USING gin (lower(NAME) gin_trgm_ops)` | Product listing applies `lower(pd.name) LIKE :nm`. | Expression matches the case-normalized predicate and may accelerate contains filters. Higher write/storage cost; no benefit to queries that do not use the same expression. Existing `(PRODUCT_ID, LANGUAGE_ID)` unique key supports product/language joins. | Confirm the bound pattern/expression and plan; test mixed locale/case semantics. |
| `PRODUCT.SKU` | Existing unique B-tree `(MERCHANT_ID, SKU)` | Tenant-scoped exact SKU lookup and SKU equality. | Already declared by `Product` unique constraint; redundant index would waste storage and slow writes. | Confirm the corresponding live unique constraint/index exists. |
| `PRODUCT.SKU` | Conditional GIN trigram expression: `USING gin (lower(SKU) gin_trgm_ops)` | Only if measured lower-case substring SKU search remains a hot path. | Could support `lower(SKU) LIKE '%term%'`; large index and write overhead. Does not replace or improve exact tenant/SKU uniqueness. Avoid if SKU searches are exact or infrequent. | Check real search patterns, term lengths, plans, and index size before approval. |
| `CUSTOMER.CUSTOMER_EMAIL_ADDRESS` | Conditional GIN trigram: `USING gin (CUSTOMER_EMAIL_ADDRESS gin_trgm_ops)` | Existing customer list uses `emailAddress LIKE '%term%'`. | May help frequent substring email search; substantial write/storage overhead and low value for short input. No email index is declared in the entity mapping. A normal B-tree is not useful for leading-wildcard matching. | Confirm actual query frequency/selectivity and privacy-safe test data; compare plan. |
| `ORDERS.MERCHANTID, ORDER_STATUS, ORDER_ID` | B-tree candidate `(MERCHANTID, ORDER_STATUS, ORDER_ID DESC)` | Tenant-scoped status search ordered by order ID descending. | Could support tenant/status filtering and order traversal when this combined filter is common. Adds write/storage cost. A tenant-only or tenant/order index could overlap; choose based on measured query workload, not all combinations. | Confirm physical column names, status-filter usage, existing indexes and plan. |
| `ORDERS.MERCHANTID` | No separate recommendation pending catalog review | Tenant-scoped order listing. | Several other tables already have tenant-leading unique constraints. The order mapping uses `MERCHANTID`, which has no entity-declared index; do not add both this and the composite above without evidence. | Inspect actual FK index and query plans. |

## Indexes declared by current entity mappings

The following are source-level constraints, not proof that production contains the
corresponding indexes:

- `PRODUCT (MERCHANT_ID, SKU)` unique.
- `MANUFACTURER (MERCHANT_ID, CODE)` unique.
- `MANUFACTURER_DESCRIPTION (MANUFACTURER_ID, LANGUAGE_ID)` unique.
- `PRODUCT_DESCRIPTION (PRODUCT_ID, LANGUAGE_ID)` unique and `SEF_URL` indexed.
- `CUSTOMER (MERCHANT_ID, CUSTOMER_NICK)` unique.

The `PRODUCT_CATEGORY` join table and several foreign keys are used by query joins.
Inspect both key directions in the live catalog; JPA join declarations do not ensure
both useful indexes exist.

## Proposed SQL (not approved or executed)

See `sql/postgresql/recommended-search-indexes.sql`. It contains optional trigram and
order-index statements with schema qualification for the configured `salesmanager`
schema. `CREATE EXTENSION pg_trgm` may require database privileges. `CREATE INDEX
CONCURRENTLY` cannot run inside a transaction block and must be scheduled with the
deployment's migration process. Review equivalent indexes and lock/storage impact
before execution.

## Rollout checklist

1. Record current `pg_indexes`, constraints, and query plans on PostgreSQL 16.
2. Confirm representative query frequency, tenant cardinality, parameter lengths, and
   table growth.
3. Apply candidate indexes in an isolated database; compare `EXPLAIN (ANALYZE, BUFFERS)`
   and write throughput.
4. Check for duplicate/redundant indexes and estimate disk use.
5. Obtain schema-owner approval and add the chosen DDL to the approved migration path.
6. Monitor index build duration, locks, disk capacity, and application latency.
7. Keep rollback instructions and do not remove existing indexes without evidence.
