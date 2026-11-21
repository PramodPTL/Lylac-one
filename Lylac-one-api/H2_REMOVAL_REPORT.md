# H2 removal and compatibility inventory

Scope: project source and configuration outside generated `target` output. H2 dependencies remain only for tests; binary database artifacts are noted separately.

## Source/configuration findings

| Classification | File and line | Finding | Recommended action / status |
| --- | --- | --- | --- |
| Test-only configuration | `sm-core/pom.xml:238` | `<groupId>com.h2database</groupId>` | H2 dependency is test scoped; retain only if tests require it. |
| Test-only configuration | `sm-core/pom.xml:239` | `<artifactId>h2</artifactId>` | H2 dependency is test scoped; retain only if tests require it. |
| Test-only configuration | `sm-shop/pom.xml:90` | `<groupId>com.h2database</groupId>` | H2 dependency is test scoped; no longer present on runtime classpath. |
| Test-only configuration | `sm-shop/pom.xml:91` | `<artifactId>h2</artifactId>` | H2 dependency is test scoped; no longer present on runtime classpath. |
| Test-only configuration | `sm-core/src/test/resources/database.properties:6` | `db.jdbcUrl=jdbc\:h2\:mem\:SALESMANAGER-TEST;AUTOCOMMIT=OFF;mv_store=false;INIT\=RUNSCRIPT FROM 'src/test/resources/sql/create_schema.sql'` | Keep isolated to tests; do not reuse H2 URL options or dialect in PostgreSQL runtime config. |
| Test-only configuration | `sm-core/src/test/resources/database.properties:9` | `db.driverClass=org.h2.Driver` | Keep isolated to tests; do not reuse H2 URL options or dialect in PostgreSQL runtime config. |
| Test-only configuration | `sm-core/src/test/resources/database.properties:10` | `hibernate.dialect=org.hibernate.dialect.H2Dialect` | Keep isolated to tests; do not reuse H2 URL options or dialect in PostgreSQL runtime config. |
| Requiring manual review | `sm-shop/src/main/resources/database.properties:6` | Commented legacy setting `# db.jdbcUrl=jdbc\:h2\:file\:./SALESMANAGER;...;INIT\=CREATE SCHEMA...` | Comment is inert and not read by the active PostgreSQL profile; remove or clearly retain as historical reference after confirming no external config loader consumes it. |
| Test-only SQL / compatibility concern | `sm-core/src/test/resources/sql/create_schema.sql:1` | `create schema IF NOT EXISTS SALESMANAGER;` | Portable CREATE SCHEMA IF NOT EXISTS syntax; test setup only. PostgreSQL runtime schema creation is handled by Flyway V1, not this script. |
| Runtime configuration (resolved) | `sm-shop/Dockerfile:5` (before this phase) | Previously copied `SALESMANAGER.h2.db` into the application image. | Removed in this phase so the image connects to PostgreSQL rather than bundling an H2 database. |
| Requiring manual review | `SALESMANAGER.h2.db` | Local H2 database/trace artifact (1732608 bytes). | Do not delete or migrate automatically; review data/sensitivity locally and keep it out of commits. |
| Requiring manual review | `sm-shop/SALESMANAGER.h2.db` | Local H2 database/trace artifact (1957888 bytes). | Do not delete or migrate automatically; review data/sensitivity locally and keep it out of commits. |
| Requiring manual review | `SALESMANAGER.trace.db` | Local H2 database/trace artifact (259980 bytes). | Do not delete or migrate automatically; review data/sensitivity locally and keep it out of commits. |

## Search results and compatibility status

- No `MODE=MYSQL` setting was found in project source/configuration.
- No active runtime `jdbc:h2:` URL or H2 dialect was found; the remaining H2 URL in main resources is commented out. Active H2 URL, driver, and dialect settings are test-only.
- No other targeted H2-specific SQL (`AUTO_INCREMENT`, H2 `IDENTITY(...)`, `MERGE INTO`, H2 `SET MODE`, `SCRIPT TO`, or `SHUTDOWN`) was found.
- `RUNSCRIPT` remains only in the test datasource URL. PostgreSQL does not support H2 URL initialization options; translate required setup to PostgreSQL SQL or the approved migration mechanism.
- Generated output and binary database contents were excluded from source scanning. Existing local H2 files were not modified.
