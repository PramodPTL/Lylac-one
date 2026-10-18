# PostgreSQL performance review

## Scope and limitations

This is a static review of repository query construction and JPA mappings, not a
benchmark. There is no representative PostgreSQL database or production schema/data
available in this environment. No execution plans, timings, row counts, or measured
improvements are claimed. Paths below are relative to `lylac-one-api`; line references
refer to the current worktree and may move as code changes.

## Findings

| Priority | Module / evidence | Concern | Suggested improvement and expected impact | Validation required |
| --- | --- | --- | --- | --- |
| High | Manufacturer; `sm-core/src/main/java/com/salesmanager/core/business/repositories/catalog/product/manufacturer/PageableManufacturerRepository.java` (queries at lines 11 and 14), and `Manufacturer.java` (`descriptions`, eager at line 42) | Name predicates use contains matching (`LIKE '%term%'`), which a normal B-tree cannot efficiently seek. Manufacturer descriptions are eager and the pageable query joins descriptions without fetching them, which can cause extra loads. | Evaluate a `pg_trgm` GIN index for description name. Consider changing the collection to lazy only with transaction/populator regression coverage; alternatively explicitly fetch the one required language's description without paginating a collection fetch join. | Inspect actual plans/selectivity; count SQL statements while mapping representative pages; test duplicate rows and page totals. |
| High | Products; `sm-core/src/main/java/com/salesmanager/core/business/repositories/catalog/product/ProductRepositoryImpl.java` (dynamic product listing and `getByCode`) | Product listing uses `lower(pd.name) LIKE` and `lower(p.sku) LIKE` in dynamic HQL. `getByCode` fetches multiple plural associations, including descriptions, categories, images, attributes, and relationships, then applies `distinct`; this can multiply joined rows. | Consider trigram support for the exact lower-case expressions if contains search is frequent. For detail retrieval, compare one controlled fetch plan with batched secondary selects or entity graphs; avoid broad multi-collection fetches. | `EXPLAIN (ANALYZE, BUFFERS)` for representative listing filters; measure rows read/returned and query count for detail retrieval. Test hydration and cardinality. |
| High | Customers; `sm-core/src/main/java/com/salesmanager/core/business/repositories/customer/CustomerRepositoryImpl.java` (name/email criteria and manual offset/limit), `CustomerRepository.java` (fetch joins) | Dynamic customer list joins attributes, their option/value descriptions, and groups before applying manual pagination. This can create a large multiplied result set and Hibernate may paginate collection fetches in memory. Name OR grouping and an invalid `c..billing` path were corrected in this phase; the query-shape regression test does not substitute for PostgreSQL execution. | Page customer IDs first, then fetch required associations for only those IDs, or use a two-query page pattern. Preserve the legacy list response and total count. | Verify generated SQL and Hibernate pagination warnings; test page contents/counts, customers with multiple attributes/groups, and cross-store results. |
| High | Orders; `sm-core/src/main/java/com/salesmanager/core/business/repositories/order/OrderRepositoryImpl.java` (dynamic list methods, multi-collection fetch joins and manual pagination) | List paths fetch order totals, products, attributes, product attributes/prices, and sometimes address entities before applying offset/max results. Row multiplication risks expensive scans, in-memory pagination, and inaccurate-looking pages. Customer name/phone OR grouping was corrected to keep alternatives under the store predicate; PostgreSQL behavior remains to be tested. | Prefer a stable page of order IDs followed by a bounded fetch query. Keep count and content predicates identical and preserve current `id` ordering. Add indexes only after examining the common filters. | Compare plan/count and page results on representative tenant sizes; inspect Hibernate warnings and query count; run PostgreSQL cross-tenant regression tests. |
| Medium | Customer / orders; `CustomerRepositoryImpl.java`, `OrderRepositoryImpl.java` | Contains-pattern searches on email/name/phone do not use ordinary B-tree indexes. Several paths bind already-wildcarded strings to `LIKE`, so case and wildcard semantics are caller-defined. | Only consider trigram indexes for high-selectivity, frequent substring predicates. Do not switch to `ILIKE`, normalize case, or escape `%`/`_` without an API behavior decision. | Profile term lengths and selectivity; compare query plans with and without trigram indexes, including short patterns. |
| Medium | Orders; `OrderRepositoryImpl.java` | Existing sort defaults to order ID descending (with a supported ascending mode); manual pagination uses `startIndex` and `maxCount`. Deep offsets can become expensive. | Preserve the current response and ordering while considering keyset pagination only as a separately versioned/internal option. A composite merchant/status/order-id B-tree is a candidate only if the measured filter/sort combination is common. | Benchmark shallow/deep pages and count queries; verify stable ordering and backward compatibility. |
| Medium | Product / category joins; product query builders and association mappings | Product/category filtering joins `PRODUCT_CATEGORY`; association indexes are not established merely by declaring a JPA relationship. | Verify both join-table key indexes and observed join direction. Add only a missing index with migration review. | Inspect catalog indexes and `EXPLAIN` join plans for actual predicates. |
| Medium | Manufacturer lists; `Manufacturer.java` line 42 | `descriptions` is `FetchType.EAGER`; broad list calls may hydrate descriptions that a given consumer does not need. | Prefer query-specific fetching and lazy collection loading only after mapping/transaction behavior is tested. | Count selects and serialized fields for API/admin callers before and after any change. |
| Low | Paging/sorting in existing dynamic repositories | `CustomerRepositoryImpl` and `OrderRepositoryImpl` use `setFirstResult` / `setMaxResults`; `ManufacturerServiceImpl` uses Spring Data `Pageable` with an unspecified sort. | Preserve legacy offset semantics and default ordering. Add a stable tie-breaker only after documenting the current ordering contract. Validate or whitelist any externally supplied sort field at the API boundary. | Contract tests for page offsets, totals, ordering and permitted sort fields. |

## Confirmed mapping/index evidence

- `Product` declares unique `(MERCHANT_ID, SKU)`, so an equivalent B-tree should
  already exist if the production schema matches Hibernate mappings. Do not add a
  duplicate product SKU index without catalog inspection.
- `Manufacturer` declares unique `(MERCHANT_ID, CODE)`.
- `ManufacturerDescription` declares unique `(MANUFACTURER_ID, LANGUAGE_ID)`.
- `ProductDescription` declares unique `(PRODUCT_ID, LANGUAGE_ID)` and an index on
  `SEF_URL`.
- `Customer` declares unique `(MERCHANT_ID, CUSTOMER_NICK)`.
- `Order` maps its tenant association through `ORDERS.MERCHANTID`; its entity declaration
  does not declare an index on this column or on `(MERCHANTID, ORDER_STATUS)`.
- PostgreSQL does not automatically create indexes on referencing foreign-key columns.
  Entity declarations do not prove the live catalog state; compare these findings with
  `pg_indexes` and the deployment's migration history.

## Safe plan review procedure

1. Restore a representative sanitized dataset in an isolated PostgreSQL 16 environment.
2. Capture the exact SQL and parameter types with diagnostic logging enabled only for
   the test session.
3. Run `EXPLAIN (ANALYZE, BUFFERS)` on bounded representative queries; do not run this
   against production without explicit authorization.
4. Record row estimates/actuals, buffers, sort/hash spills, and rows removed by filters.
5. Compare alternative plans after proposed indexes are installed in the isolated
   database. Include insert/update overhead and index size.
6. Retain query-result, tenant-isolation, count, and pagination regression tests.

No schema or index change is applied by this report.
