# PostgreSQL local development

The `sm-shop` application uses PostgreSQL by default. The default Spring profiles are
`postgres,dev`; H2 remains available only on test classpaths. This repository uses
Spring Boot 2.5.12, Maven, Java 11, Hibernate 5, and PostgreSQL 16 for local development.

## Prerequisites

- Java 11 (the Maven project targets Java 11)
- Docker Desktop with Docker Compose
- Git checkout of this repository

## Start and stop PostgreSQL

From the `lylac-one-api` directory (the backend Maven and Compose root):

```powershell
docker compose up -d postgres
docker compose ps
docker compose logs -f postgres
```

Wait until the `postgres` service reports healthy before starting the application.
Stop the container without removing its database:

```powershell
docker compose stop postgres
```

To remove the container but retain data, use `docker compose down`. The named
`postgres-data` volume persists PostgreSQL data across container restarts and rebuilds.
The first container initialization creates the `shopizer` database. On application
startup, Flyway migration `V1__create_application_schemas.sql` creates the `salesmanager`
and `lylac_storefront` schemas if they do not exist. PostgreSQL folds the legacy unquoted
`SALESMANAGER` identifier to lowercase (`salesmanager`). Existing volumes are not changed.
Removing the stored database is intentionally separate and destructive:
`docker compose down -v` deletes the persistent volume.

The Compose file uses development-only defaults (`shopizer` / `shopizer_dev_password`).
Override them before first startup; do not use these defaults in shared or production
environments:

```powershell
$env:POSTGRES_USER = "shopizer"
$env:POSTGRES_PASSWORD = "choose-a-local-password"
docker compose up -d postgres
```

If you override credentials, keep the matching `DB_USER` / `DB_PASSWORD` values aligned,
or use the same `POSTGRES_USER` / `POSTGRES_PASSWORD` environment variables when starting
the application.

## Local connection settings

| Setting | Default |
| --- | --- |
| Host / port | `localhost:5432` |
| Database | `shopizer` |
| Username | `shopizer` |
| Password | `shopizer_dev_password` (local development only) |
| JDBC URL | `jdbc:postgresql://localhost:5432/shopizer?currentSchema=salesmanager,lylac_storefront` |
| Default schema | `salesmanager` (unquoted `SALESMANAGER`) |
| Storefront schema | `lylac_storefront` |

The application connects through the existing Shopizer `DataConfiguration`, so both
standard Spring datasource properties and its `db.*` compatibility properties are set by
`application-postgres.yml`.

## Activate profiles and run the application

The defaults in `sm-shop/src/main/resources/application.properties` select
`postgres,dev` when no active profile is specified. To explicitly activate them in
PowerShell:

```powershell
$env:SPRING_PROFILES_ACTIVE = "postgres,dev"
```

Build the application from the `lylac-one-api` directory:

```powershell
.\mvnw.cmd -pl sm-shop -am -DskipTests package
```

Start the packaged application:

```powershell
java -Dspring.profiles.active=postgres,dev -jar .\sm-shop\target\shopizer.jar
```

The jar command explicitly activates the PostgreSQL and development profiles. For a
non-development PostgreSQL run, activate `postgres` with the environment's migration
managed schema already provisioned; Hibernate validates it rather than changing it.

## Environment variables

| Variable | Purpose | Default |
| --- | --- | --- |
| `SPRING_PROFILES_ACTIVE` | Active Spring profiles | `postgres,dev` (Spring default profiles) |
| `DB_URL` | Application JDBC URL | `jdbc:postgresql://localhost:5432/shopizer?currentSchema=salesmanager,lylac_storefront` |
| `DB_USER` | Application database user | `POSTGRES_USER`, then `shopizer` |
| `DB_PASSWORD` | Application database password | `POSTGRES_PASSWORD`, then local-only `shopizer_dev_password` |
| `POSTGRES_USER` | Compose database owner | `shopizer` |
| `POSTGRES_PASSWORD` | Compose database password | local-only `shopizer_dev_password` |
| `DB_MIN_POOL_SIZE` | Hikari minimum idle connections | `1` |
| `DB_MAX_POOL_SIZE` | Hikari maximum pool size | `10` |
| `HIBERNATE_DDL_AUTO` | PostgreSQL default schema policy | `validate`; `dev` profile overrides to `update` |
| `FLYWAY_BASELINE_ON_MIGRATE` | One-time adoption of an existing schema without Flyway history | `false`; use `true` only during an approved, verified adoption |
| `LOGGING_LEVEL_ORG_HIBERNATE_TYPE_DESCRIPTOR_SQL_BASICBINDER` | Hibernate 5 bound-parameter diagnostics | `INFO`; set to `TRACE` only for controlled troubleshooting |

## Troubleshooting

### Connection refused or timeout

- Check `docker compose ps` and wait for the PostgreSQL health check to pass.
- Confirm port `5432` is available and `DB_URL` points to the local host, not the
  container service name.
- Inspect `docker compose logs postgres` for startup or volume errors.

### Authentication failed

- Confirm the user/password match between the Compose service and application variables.
- PostgreSQL only applies `POSTGRES_USER` and `POSTGRES_PASSWORD` when initializing an
  empty data directory. Changing environment values later does not change an existing
  database user's password; update that role in PostgreSQL or recreate the local database
  volume only if its data can safely be discarded.

### Schema validation failed

- The `dev` profile uses `ddl-auto=update` for local schema evolution. Check that both
  required schemas exist and the configured PostgreSQL user can create/use objects there.
- Other profiles use `ddl-auto=validate`; deploy the matching schema through the approved
  migration process before startup. Do not turn on automatic updates outside development.
- Flyway V1 creates schemas only; Hibernate `update` creates/updates application tables
  in development. It does not represent an approved production table migration.

### PostgreSQL-specific SQL errors

- H2 may accept syntax or behavior that PostgreSQL rejects. Review the generated
  `H2_REMOVAL_REPORT.md` and `POSTGRES_MIGRATION_REPORT.md`, reproduce against PostgreSQL,
  and address compatibility findings in a separately approved change.
- The JDBC URL sets the PostgreSQL search path to `salesmanager,lylac_storefront` to
  support the legacy unqualified table reference in a native repository query. Verify
  native-query behavior against PostgreSQL when testing the migration.
- SQL troubleshooting is enabled with `org.hibernate.SQL=DEBUG`. Hibernate 5 parameter
  binding uses `org.hibernate.type.descriptor.sql.BasicBinder`; enable it only when needed:

  ```powershell
  $env:LOGGING_LEVEL_ORG_HIBERNATE_TYPE_DESCRIPTOR_SQL_BASICBINDER = "TRACE"
  ```

  Bound parameter values can contain credentials or customer data. Disable TRACE after
  troubleshooting and do not collect these logs in routine environments.

### H2 `RUNSCRIPT` statements

The existing test datasource uses an H2 `INIT=RUNSCRIPT` URL. This is test-only and is
not used by the PostgreSQL runtime profile. Review each H2-specific script and syntax
before reusing it: do not copy H2 `RUNSCRIPT` URL options into PostgreSQL configuration.
Translate any required database setup into PostgreSQL-compatible SQL or the project's
approved migration mechanism, validate it against PostgreSQL, and keep test-only setup
separate from production migrations. Schema creation for the PostgreSQL profile is
currently handled by Flyway V1; that migration intentionally does not translate or run
the test script.
