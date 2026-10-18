# Query architecture guide

This guide applies to the Spring Boot 2.5 / Spring Data JPA / Hibernate 5 codebase.
Preserve existing Shopizer APIs and behavior unless a separately approved change
defines the intended contract.

## Filter construction

- Keep tenant/store scope mandatory and derive it from the authorized server-side
  `MerchantStore`; never accept an unvalidated tenant ID as the only access check.
- For optional fields, add a predicate only when the supplied value is present rather
  than writing `:value IS NULL OR ...`. This avoids untyped nullable parameters and can
  give PostgreSQL a clearer predicate.
- Decide per API whether null, empty string, and whitespace-only input are equivalent.
  Document that choice. Do not trim, lowercase, escape SQL wildcard characters, or turn
  `LIKE` into `ILIKE` without checking existing behavior.
- Bind values through typed Criteria predicates or named query parameters. Do not
  concatenate user input into SQL/HQL.
- Explicitly group every mixed `AND`/`OR` expression with parentheses; verify that the
  tenant predicate applies to every branch.

Example using the existing helper:

```java
Specification<Manufacturer> filters =
    EntitySearchSpecifications.manufacturer(store.getId(), language.getId(), searchName);
Page<Manufacturer> page = pageableManufacturerRepository.findAll(filters, pageable);
```

## Specifications and CriteriaBuilder

- Keep reusable Specifications in the domain search repository package, with names tied
  to the aggregate/entity and focused optional arguments.
- Keep mandatory ownership scope inside every business search Specification. Validate
  IDs and date/range order at the application boundary.
- Use entity attribute names verified against mappings. Prefer typed paths and typed
  `greaterThan`/`lessThan`/`equal` comparisons for dates, decimals, booleans, and enums.
- Compose with `.and()`/`.or()` only when grouping matches the product contract.
- Joining plural associations may duplicate root rows. Choose `distinct` deliberately;
  it affects both result cardinality and count queries.
- Add regression tests for each filter's omitted/present cases, matching semantics,
  tenant scope, duplicate associations, and page totals.

## String and PostgreSQL behavior

- `LIKE` is case-sensitive under normal PostgreSQL collations; `LOWER(field) LIKE` is
  not the same contract as `ILIKE` for every locale/collation.
- Existing contains patterns (`%value%`) allow `%` and `_` in user input to act as SQL
  wildcards unless code explicitly escapes them. Preserve this unless behavior is
  intentionally changed and tested.
- B-tree indexes usually cannot accelerate a leading-wildcard search. Consider
  `pg_trgm` only after measuring the workload and verifying expression/pattern match.
- Compare boolean attributes with boolean values, not integer literals.
- Every selected non-aggregated expression must satisfy PostgreSQL grouping rules.
  Review `DISTINCT`, `ORDER BY`, grouping and native SQL against the PostgreSQL version.

## Query choice and repository conventions

- Prefer derived methods for simple equality/relationship predicates whose names remain
  readable.
- Use JPQL for focused entity queries and named parameters; declare explicit count
  queries when a paged query's joins make count derivation ambiguous or expensive.
- Use Specifications/CriteriaBuilder for composable optional filters, but do not replace
  an existing query until null/empty/wildcard/case/duplicate and count semantics are
  tested.
- Use native SQL only when database-specific behavior or measured performance justifies
  it. Schema-qualify carefully or validate search-path assumptions.
- Keep persistence entities behind existing service/facade mapping boundaries; do not
  change DTO/API contracts as a query optimization shortcut.

## Pagination and sorting

- Prefer `Pageable` for new paged repositories; preserve any existing zero-based
  page/offset interpretation and response totals.
- Define deterministic ordering for new pagination, including a unique tie-breaker.
  Preserve existing default ordering on legacy APIs until contract tests establish it.
- Whitelist externally supplied sort fields at the API boundary; never pass arbitrary
  client property names to persistence sorting.
- Avoid fetch-joining collection associations in paged queries. Use page IDs followed by
  a bounded association fetch when needed.
- Measure count-query cost and consider `Slice` only when the API does not promise a
  total count.

## Fetching and N+1 prevention

- Keep associations lazy by default where behavior permits; load response-required
  relationships with query-specific fetch joins/entity graphs.
- Do not fetch multiple independent collections in one query without checking row
  multiplication.
- Inspect query counts at service/facade boundaries and watch for mapping code that
  traverses lazy relationships after transaction completion.
- Do not change entity fetch mappings without tests for every known consumer.

## Index and schema changes

- Inspect `pg_indexes`, constraints, migrations, and actual plans before proposing an
  index. JPA `@Table` constraints are not evidence of production catalog state.
- Match indexes to real predicates, join directions, ordering, selectivity, and
  parameter shape. Avoid duplicate indexes.
- Account for write cost, storage, build locks, and `CREATE INDEX CONCURRENTLY` migration
  constraints. Never run index DDL automatically from application startup.
- Validate on sanitized representative PostgreSQL 16 data with
  `EXPLAIN (ANALYZE, BUFFERS)` in an isolated environment. Do not benchmark production
  without authorization.

## Diagnostics and test rules

- `org.hibernate.SQL=DEBUG` logs SQL. For Hibernate 5, enable bound-value logging
  temporarily with
  `LOGGING_LEVEL_ORG_HIBERNATE_TYPE_DESCRIPTOR_SQL_BASICBINDER=TRACE`.
- Bound values can contain PII or secrets; do not enable parameter TRACE routinely or in
  production. Disable it promptly and protect captured logs.
- Reproduce PostgreSQL-specific errors on PostgreSQL, not only H2. Keep H2 confined to
  unit tests; use PostgreSQL 16 integration tests for query semantics and schema types.
- Capture generated SQL, parameter types, page content/count, query count, and execution
  plan for performance-sensitive changes.
