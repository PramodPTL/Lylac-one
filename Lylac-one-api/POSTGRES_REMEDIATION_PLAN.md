# PostgreSQL remediation plan

## A. Fixed issues

| Issue | Root cause | Change | Validation |
| --- | --- | --- | --- |
| Boolean attribute compared to a numeric literal | Dynamic HQL compared `Product.available` (Java `boolean`) with integer `1`. PostgreSQL/Hibernate type checking expects a boolean expression. | Changed the count predicate in `ProductRepositoryImpl` to `p.available=true`; filter intent remains true-only. | Maven reactor package/compile passed. PostgreSQL execution could not be tested in this environment. |
| Manufacturer optional filters | Manufacturer paging used JPQL `:value IS NULL OR ...` conditions. | Manufacturer's pageable service methods now use the reusable Specification while retaining the previous left description join, name wildcard behavior, page numbering, and repository result multiplicity. | Focused Manufacturer test passed; no live PostgreSQL execution or dedicated duplicate/page-total comparison is available. |
| Customer/order OR predicate tenant scope | Dynamic name and phone filters appended `AND A OR B`, allowing the second OR branch to bypass the store condition under JPQL precedence. A customer first-name predicate also contained `c..billing`. | Grouped each OR expression and corrected the malformed customer property path. Search fields and wildcard construction were retained. Removed temporary `System.out` logging of manufacturer search text in the facade. | Added repository query-construction regression tests; these verify grouping and path text but do not execute the statements against a database. PostgreSQL cross-tenant integration tests remain required. |
| Optional search pattern guidance | Existing `@Query` methods contain optional-null and LIKE patterns; lack a reusable conditional-predicate pattern. | Added reusable Specifications for Manufacturer, Product, Customer, and Order, and enabled `JpaSpecificationExecutor` on their repositories. Manufacturer is wired into service pagination; Product, Customer, and Order Specifications remain opt-in. | Focused Manufacturer/Product and query-construction tests passed; no live PostgreSQL is available. |
| Entity mapping review visibility | Existing Hibernate text and custom Locale mappings were not inventoried against PostgreSQL risk. | Added `ENTITY_MAPPING_AUDIT.md`; no mapping changes were made because the deployed schema and stored values are unavailable. | Static source scan only. |

## B. Remaining risks

- The project has 234 explicit Spring Data `@Query` annotations, 7 unannotated Spring
  Data derived query declarations, and 46 dynamic `EntityManager` query construction call
  sites. The full inventory, category tags, and static observations are in
  `POSTGRES_COMPATIBILITY_REPORT.md`.
- `GroupRepository.findById(Long)` uses a parameter type that differs from the repository
  identifier type (`Integer`); verify caller and conversion expectations during repository
  review. No behavior change was made.
- PostgreSQL cross-tenant integration tests are still required for the corrected customer
  and order OR predicates. The added unit tests assert generated JPQL text, not database
  result isolation.
- Manufacturer pageable Specifications preserve the left join and matching pattern.
  Page totals and row multiplicity for stores with multiple matching language
  descriptions still need PostgreSQL-backed comparison.
- There are 25 optional `IS NULL` patterns and 69 LIKE/parameter source occurrences in
  repository query code. No PostgreSQL binding failure was reproduced. Their exact
  Hibernate 5 / pgJDBC behavior remains to be tested before replacing them.
- Four native `@Query` annotations depend on schema names and SQL behavior. One merchant
  query uses an unqualified `MERCHANT_STORE`; verify that the PostgreSQL `currentSchema`
  configuration resolves it as intended.
- Manually assembled Order queries combine `AND` and `OR` around customer fields. Review
  predicate grouping, tenant scope, matching/count query parity, and page boundaries.
  No change was made without tests defining current behavior.
- DISTINCT, fetch joins, and paginated count queries need PostgreSQL integration tests to
  verify cardinality and total counts.
- Search matching is case-sensitive in some paths and case-insensitive in others.
  Collation, locale, wildcard escaping, and index use need explicit contracts and runtime
  validation.
- `ENTITY_MAPPING_AUDIT.md` lists eight `TextType` strings and a custom Locale type. The
  live database column types, constraints, and existing data are unknown.
- Docker/PostgreSQL is unavailable in this environment. The full test run previously
  showed `ProductTest.testCreateProduct` ending in `UnexpectedRollbackException`; it
  needs independent diagnosis. Do not treat the previous test error as PostgreSQL
  validation.

## C. Files modified and created

### Phase 2 changes

| File | Purpose | Kind |
| --- | --- | --- |
| `sm-core/src/main/java/com/salesmanager/core/business/repositories/catalog/product/ProductRepositoryImpl.java` | Correct boolean comparison in dynamic HQL. | Code |
| `sm-core/src/main/java/com/salesmanager/core/business/repositories/catalog/product/ProductRepository.java` | Exposes Spring Data Specifications executor. | Code |
| `sm-core/src/main/java/com/salesmanager/core/business/repositories/catalog/product/manufacturer/PageableManufacturerRepository.java` | Exposes Spring Data Specifications executor for paginated Manufacturer searches. | Code |
| `sm-core/src/main/java/com/salesmanager/core/business/services/catalog/product/manufacturer/ManufacturerServiceImpl.java` | Uses Manufacturer Specifications for paginated store searches. | Code |
| `sm-core/src/main/java/com/salesmanager/core/business/repositories/customer/CustomerRepository.java` | Exposes Spring Data Specifications executor. | Code |
| `sm-core/src/main/java/com/salesmanager/core/business/repositories/order/OrderRepository.java` | Exposes Spring Data Specifications executor. | Code |
| `sm-core/src/main/java/com/salesmanager/core/business/repositories/search/EntitySearchSpecifications.java` | Type-guided optional predicates for Manufacturer, Product, Customer, and Order. | Code |
| `sm-core/src/main/java/com/salesmanager/core/business/repositories/customer/CustomerRepositoryImpl.java` | Groups name alternatives under the tenant condition and fixes invalid first-name HQL path. | Code |
| `sm-core/src/main/java/com/salesmanager/core/business/repositories/order/OrderRepositoryImpl.java` | Groups name/phone alternatives under the tenant condition. | Code |
| `sm-shop/src/main/java/com/salesmanager/shop/store/facade/manufacturer/ManufacturerFacadeImpl.java` | Removes temporary console diagnostics that printed manufacturer search input. | Code |
| `sm-core/src/test/java/com/salesmanager/test/repositories/search/TenantScopedSearchQueryTest.java` | Checks generated customer/order JPQL grouping and property path. | Test |
| `POSTGRES_COMPATIBILITY_REPORT.md` | Query inventory, risky pattern catalog, manual reviews, and module risk assessment. | Documentation/report |
| `ENTITY_MAPPING_AUDIT.md` | Entity persistence type inventory and migration cautions. | Documentation/report |
| `POSTGRES_SEARCH_SPECIFICATIONS.md` | Usage, behavior, pagination, and adoption guidance for Specifications. | Documentation |
| `POSTGRES_PERFORMANCE_REPORT.md` | Static performance risks and PostgreSQL plan-validation recommendations; no benchmark claims. | Documentation/report |
| `POSTGRES_INDEX_RECOMMENDATIONS.md` | Candidate indexes based on mappings/query patterns; no DDL applied. | Documentation/report |
| `sql/postgresql/recommended-search-indexes.sql` | Commented proposal SQL only; not run or connected to startup. | SQL proposal |
| `FETCH_STRATEGY_REPORT.md` | Static association/fetch join and pagination risk inventory. | Documentation/report |
| `QUERY_ARCHITECTURE_GUIDE.md` | Query construction, pagination, fetch, index, diagnostics, and test standards. | Documentation |
| `POSTGRES_REMEDIATION_PLAN.md` | Fixed issues, remaining risks, scope, query changes, validation, and follow-up plan. | Documentation |
| `sm-core/src/test/java/com/salesmanager/test/repositories/search/TenantScopedSearchQueryTest.java` | Verifies tenant-constrained OR grouping and the corrected Customer HQL property path. | Test |

### Phase 1 work already present in the worktree

The PostgreSQL profiles, Docker configuration, H2 test-scope adjustments, schema
initializer, setup guide, and Phase 1 reports are documented in `POSTGRESQL_SETUP.md`,
`H2_REMOVAL_REPORT.md`, and `POSTGRES_MIGRATION_REPORT.md`. They are not repeated as
Phase 2 code changes here. Pre-existing edits to Manufacturer service/facade files were
not part of Phase 2 and were left untouched.

## D. Queries refactored

Executable query/search changes:

- **Location:** `sm-core/src/main/java/com/salesmanager/core/business/repositories/catalog/product/ProductRepositoryImpl.java`
- **Original:** `p.available=1`
- **Refactored:** `p.available=true`
- **Reason:** `Product.available` is declared as Java `boolean`; a numeric comparison
  conflicts with JPQL/HQL attribute typing and PostgreSQL boolean semantics.
- **Expected PostgreSQL behavior:** Restricts count results to rows where `AVAILABLE` is
  true.
- **Behavior evidence:** The old literal `1` expressed a true-only filter; the new
  boolean literal preserves that intent. Compilation passed. Runtime equivalence against
  a real PostgreSQL schema still needs an integration test.

- **Manufacturer paging:** Three service overloads now call
  `PageableManufacturerRepository.findAll(Specification, Pageable)`. The Specification
  retains the left description join even when filters are omitted and uses the original
  case-sensitive contains pattern; `%` and `_` remain wildcard characters. Page index,
  size, and unspecified sort behavior are unchanged. PostgreSQL page/count/duplicate
  equivalence remains to be measured.
- **Tenant predicate grouping:** Customer and Order name/phone alternatives are
  explicitly parenthesized so all alternatives remain constrained by the required store
  predicate. This corrects results that could otherwise escape tenant scope. Customer's
  malformed `c..billing.firstName` path is corrected to `c.billing.firstName`.
- **Manufacturer facade diagnostics:** Temporary `System.out` statements that printed
  Manufacturer search text were removed from the supplied worktree file; no facade
  change remains in the final diff.

Product, Customer, and Order Specification factories are not yet used to replace their
existing production searches. The report files below record static risk findings and
tests required before broader adoption.

## E. Recommended future work

1. Add PostgreSQL 16 integration testing in CI using an isolated ephemeral database;
   include all active persistence tests and run the executable jar/profile.
2. Add regression tests for each optional search query covering null, empty, wildcard,
   case, tenant, ordering, and pagination semantics before migrating it to a
   Specification. Add real database tests for the corrected tenant-grouped OR queries.
3. Investigate Order query `AND`/`OR` grouping and verify tenant isolation without
   silently changing externally visible filtering.
4. Execute all four native queries against the production schema, verify schema
   qualification/search path and parameter typing, and compare `Page` count queries.
5. Collect `EXPLAIN (ANALYZE, BUFFERS)` on representative production-like data before
   adding indexes. Consider trigram indexes only if contains-search workload warrants it.
6. Compare all `TextType` and custom Locale mappings with PostgreSQL catalog metadata and
   migration history; define data conversion before any mapping changes.
7. Add static query review checks for boolean/numeric comparisons and risky
   optional-null LIKE patterns. These should be warnings until semantics and false
   positives are accounted for.
8. Check SQL/parameter diagnostic logging only in a controlled environment. SQL DEBUG is
   configured; Hibernate 5 parameter TRACE remains opt-in because bound values can be
   sensitive.

## F. Module risk assessment

| Module / domain | Risk | Evidence and blocker |
| --- | --- | --- |
| Catalog | Medium | Many JPQL queries; nullable LIKE and DISTINCT/order/paging combinations need live behavior checks. |
| Manufacturer | Medium | Optional description/name and language filters; new specs are examples only, not used by existing service methods. |
| Products | High | Dynamic HQL and native SQL; Boolean literal defect fixed; custom query behavior still lacks PostgreSQL tests. |
| Customers | Medium | Fetch-heavy query methods and customer search predicates; validate tenant scope and OR grouping. |
| Orders | High | Dynamic HQL, fetch joins, text filters and mixed AND/OR conditions; validate query/count parity and tenant filtering. |
| Inventory | Medium | Availability/stock persistence relies on schema and temporal behavior; no confirmed incompatible syntax, but no PostgreSQL integration run. |
| Security | High | Customer and Order name/phone OR branches could bypass store predicates; now parenthesized with query-shape unit coverage. PostgreSQL cross-tenant integration validation remains outstanding. |
| Store | High | Native merchant SQL and unqualified table references depend on schema/search_path. |
| Search | Medium | LIKE/case/wildcard behavior and indexing depend on locale, collation, and workload. |

Risk labels identify review priority, not confirmed exploitability or proof of runtime
failure. No Critical blocker was confirmed by static inspection alone.

## Validation performed for this worktree

- `mvn -pl sm-core -am "-Dtest=TenantScopedSearchQueryTest,ManufacturerTest,ProductNextGenTest" "-Dsurefire.failIfNoSpecifiedTests=false" test` — **BUILD SUCCESS; 5 tests, 0 failures, 0 errors, 0 skipped**.
- `mvn -pl sm-core -Dtest=TenantScopedSearchQueryTest test` — **BUILD SUCCESS; 3 tests, 0 failures, 0 errors, 0 skipped**.
- `mvn -pl sm-shop -am -DskipTests package` — **BUILD SUCCESS**. Inspected `shopizer.jar`: PostgreSQL/development profiles, V1 Flyway migration, Flyway 7.7.3, Prometheus registry 1.7.10, and PostgreSQL JDBC 42.2.18 are packaged; no H2 runtime jar was found.
- `git diff --check` — passed.
- Docker/PostgreSQL was not available; no PostgreSQL integration execution or `EXPLAIN (ANALYZE, BUFFERS)` benchmark was performed.

## Phase 4 platform foundation

- Added Flyway to `sm-shop`; the initial V1 migration provisions the two schemas only.
  Existing application tables are not represented, and adopting a pre-existing database
  requires a separately verified, one-time baseline.
- Added Micrometer's Prometheus registry and restricted HTTP Actuator exposure to
  `health`, `info`, and `prometheus`; health details/components are hidden.
- Added Phase 4 operating guidance and static reports for schema governance/drift,
  caching, observability, logging, audit, performance, security, resilience, API
  conventions, search scaling, and deployment readiness.
- Redis, broad authentication/security changes, entity audit changes, new application
  schema/index changes, and deployment-platform manifests remain unimplemented because
  cache invalidation topology, identity source, live schema, workload evidence, or target
  deployment environment were not available.
- The successful package confirms dependency/resource packaging only; it does not verify
  Flyway execution order or schema behavior against a live PostgreSQL instance.
