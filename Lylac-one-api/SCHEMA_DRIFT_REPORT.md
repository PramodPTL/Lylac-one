# Schema drift report

## Result

**No live-schema comparison was possible.** No PostgreSQL connection, catalog dump, or
Flyway history from a deployed environment was supplied. Therefore no missing,
unexpected, or mismatched table/column/index/constraint is confirmed in this report.
Treat all deployment drift as unknown until the inspection procedure below is run.

## Available evidence

- Java mappings are in `sm-core-model/src/main/java`.
- Hibernate uses `ddl-auto=update` only in the `dev` profile and `validate` in the
  PostgreSQL profile otherwise.
- Flyway now has only `V1__create_application_schemas.sql`, which ensures two schemas;
  it does not describe entity tables.
- Existing H2 test setup is not evidence of PostgreSQL physical types or constraints.
- JPA `@Table`, unique constraints, and `@Index` annotations describe expectations but
  do not prove that deployed PostgreSQL has matching objects.

## Drift inventory

| Object / area | Expected from application | Observed | Severity/status | Recommended action |
| --- | --- | --- | --- | --- |
| `salesmanager`, `lylac_storefront` schemas | Both are created by Flyway V1. | Not inspected. | Unverified | Compare `pg_namespace`, ownership, and grants; migration if absent. |
| Entity tables and columns | Entity declarations and embedded mappings across `sm-core-model`. | Not inspected. | Unverified / high deployment risk | Export `information_schema.columns`; compare type, length, nullability, defaults, and schema to Hibernate mapping metadata. |
| Product/manufacturer/customer unique keys | Source declares tenant-scoped unique constraints. | Not inspected. | Unverified | Compare `pg_constraint`/`pg_indexes`; reconcile duplicates before adding a unique constraint. |
| Product description URL index | Entity mapping declares `SEF_URL` index. | Not inspected. | Unverified | Verify physical index definition and validity. |
| Foreign keys and join tables | Defined by relationship annotations and join columns. | Not inspected. | Unverified | Inventory constraints and referencing-column indexes; do not infer FK indexes from ORM mappings. |
| Order merchant association | `ORDERS.MERCHANTID` join column in `Order`. | Not inspected. | Manual interpretation required | Confirm physical casing/name and compatibility with native SQL/search path. |
| ID generation | Many entities use a shared table generator `SM_SEQUENCER`; description mappings define allocation settings. | Not inspected. | Manual interpretation required | Compare table contents, generator names, sequence allocation, and concurrent insert behavior. Do not replace with identity/sequence without migration tests. |
| Flyway history | New installs should contain `salesmanager.flyway_schema_history` after V1. Existing databases require controlled baseline adoption. | Not inspected. | Unverified | Check history, checksums and applied versions; baseline existing environments only after schema review. |

## Safe comparison procedure

Run read-only metadata inspection against an authorized staging/replica PostgreSQL
database and protect the resulting schema dump. Capture:

```sql
SELECT table_schema, table_name, column_name, data_type, udt_name,
       character_maximum_length, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema IN ('salesmanager', 'lylac_storefront')
ORDER BY table_schema, table_name, ordinal_position;

SELECT schemaname, tablename, indexname, indexdef
FROM pg_indexes
WHERE schemaname IN ('salesmanager', 'lylac_storefront')
ORDER BY schemaname, tablename, indexname;

SELECT n.nspname AS schema_name, c.relname AS table_name,
       con.conname, con.contype, pg_get_constraintdef(con.oid)
FROM pg_constraint con
JOIN pg_class c ON c.oid = con.conrelid
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname IN ('salesmanager', 'lylac_storefront')
ORDER BY n.nspname, c.relname, con.conname;
```

Compare against a Hibernate-generated mapping snapshot only in an isolated database
using the exact application build. Classify every difference as intentional legacy
schema, confirmed drift, or unresolved mapping ambiguity. Do not point
`ddl-auto=update` at production to discover differences.

## Remediation

For each confirmed difference, add a reviewed forward Flyway migration with data
prechecks, lock/availability analysis, rollback/recovery plan, and PostgreSQL integration
test. This report intentionally contains no speculative DDL.
