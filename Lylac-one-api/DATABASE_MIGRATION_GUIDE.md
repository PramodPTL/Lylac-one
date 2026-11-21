# Database migration guide

## Current state and ownership

The backend is Spring Boot 2.5.12 / Hibernate 5 with PostgreSQL 16. Flyway is now
included in `sm-shop`; migrations are discovered from
`sm-shop/src/main/resources/db/migration` when the `postgres` profile is active.
`V1__create_application_schemas.sql` only creates the `salesmanager` and
`lylac_storefront` schemas if absent. It does **not** create or alter application tables.

Production schema changes must be added as reviewed Flyway migrations. The Hibernate
`validate` policy in non-development profiles remains a verification step, not a schema
authoring mechanism. The `dev` profile still uses Hibernate `update` for local
experimentation and is not an approved source of production schema changes.

## Configuration

- `spring.flyway.enabled=true` in the PostgreSQL profile.
- Location: `classpath:db/migration`.
- Schemas: `salesmanager,lylac_storefront`; Flyway history table defaults to
  `salesmanager.flyway_schema_history`.
- `validate-on-migrate=true`; `clean-disabled=true`.
- Existing PostgreSQL databases without Flyway history must be deliberately baselined:
  `FLYWAY_BASELINE_ON_MIGRATE=true` enables the one-time baseline at version `0`.
  Keep it false in normal operation. Confirm database URL, identity, schema ownership,
  backups, and current schema before this first startup.
- The database role must be able to create the two schemas on a fresh database and
  create/update Flyway's history table. Use a least-privilege role and grant the
  required schema privileges deliberately.

The baseline setting is an adoption mechanism, not evidence that the current schema
matches entity mappings. The initial V1 migration is idempotent schema provisioning;
it does not baseline or reconcile existing application tables.

## Naming and authoring

Use immutable, ordered names:

```text
V<major>_<minor>__<short_description>.sql
V1_1__add_product_search_column.sql
V1_2__add_order_lookup_index.sql
```

Never edit a migration already applied in a shared environment. Add a forward migration
instead. Keep schema changes separate from bulk/reference data updates when they have
different validation and rollback needs. Prefer explicit schema qualification,
constraints, and indexes. Avoid environment-specific dynamic behavior in versioned SQL.

Review each migration for locks, table rewrites, backfill duration, nullability, default
semantics, permissions, and deployment compatibility with both old and new application
versions. Large changes may require an expand/backfill/contract sequence.

## First adoption and workflows

### Fresh local database

1. Start PostgreSQL using `docker compose up -d postgres` from `lylac-one-api`.
2. Start the application using the `postgres,dev` profiles.
3. Flyway creates the schemas and history record; Hibernate `update` remains a local-only
   convenience for entity development.

### Existing database adoption

1. Stop application deployments from changing schema during the adoption window.
2. Take and verify a restorable backup; record database identity, schema owners, current
   migration scripts, and a catalog snapshot.
3. Compare live schema to the entity mappings and historical SQL. Resolve discrepancies
   before treating Flyway as owner.
4. Set `FLYWAY_BASELINE_ON_MIGRATE=true` for exactly one controlled startup after
   confirming that V1's schema-creation-only statements are safe for that database.
5. Verify `salesmanager.flyway_schema_history`, checksums, Hibernate validation, and
   representative application operations. Return baseline-on-migrate to false.

### Test, staging, and production

- CI: apply migrations to a clean PostgreSQL 16 database, then run schema validation and
  integration tests. Test upgrades from each supported prior schema as well.
- Staging: take a restorable snapshot, run Flyway before app readiness, validate
  migration duration/locks and application compatibility.
- Production: use a controlled migration job or single application instance so
  concurrent startup does not become an uncontrolled schema deployment. Require a
  reviewed backup and rollback plan.

## Validation and failure recovery

Inspect Flyway's startup output and `salesmanager.flyway_schema_history`; use Flyway
`validate` via the configured application path or the version-matched Flyway Maven
plugin in a controlled environment. Do not use `repair` to hide checksum changes:
investigate the exact failed migration first. A failed migration may leave DDL effects
depending on PostgreSQL transactional behavior and statement type; inspect catalog and
history before retrying.

Flyway does not provide automatic down-migrations. Prefer a forward corrective migration.
For a failed uncommitted rollout, stop writers, inspect migration state, restore from a
tested backup when data integrity is uncertain, or apply a reviewed forward repair.
Never drop schemas or run `clean` against important data.

## Rollback and recovery

- Application rollback is safe only when the schema remains compatible with the prior
  application. Use expand/contract migrations to preserve compatibility across rolling
  deployments.
- For destructive or data-transforming migrations, use a tested backup/PITR recovery
  plan. Do not assume reversing DDL restores transformed data.
- Keep migration SQL, backup timestamps, Flyway history, and deployed application
  versions together in the change record.

## Known gaps

The only versioned migration currently provisions schemas. Existing historical table
creation is not represented in Flyway. Production adoption needs a reviewed baseline
and schema snapshot, then future schema deltas must be migrated. No production database
was available to validate drift or migration behavior in this work.
