# Audit architecture

## Existing metadata

The shared `AuditSection` embeddable maps `DATE_CREATED`, `DATE_MODIFIED`, and
`UPDT_ID` (`modifiedBy`). `AuditListener` sets both timestamps using JVM `new Date()` at
pre-persist/pre-update. It does not establish `createdBy`, does not populate `modifiedBy`
from an authenticated identity, and records no historical field-level changes.
`modifiedBy` is truncated to 20 characters although the mapped column length is 60;
review this legacy behavior before changing schema.

Product and Manufacturer, among other audited entities, use `AuditSection`. Customer
implements `Auditable` and embeds `AuditSection`, but does not visibly declare the same
`AuditListener` entity listener as Product; Order does not visibly expose the
`Auditable`/`AuditSection` pattern. This is metadata auditing, not a complete history of
Products, Customers, Orders, Inventory, Security, or Store configuration.

## Recommendation

Do not enable Spring Data JPA auditing globally yet. The application does not show a
verified `AuditorAware` identity source or common actor propagation path across web
requests, scheduled jobs, and integrations. Adding `createdBy` also requires a schema
migration and a data/backfill policy.

Before implementation:

1. Define stable actor identifiers and precedence from authenticated principal,
   background/system job, and integration service identities.
2. Use UTC `Instant` or an explicitly compatible timestamp convention; compare existing
   database types, JVM timezone, serialization and Shopizer compatibility first.
3. Cover audited aggregate writes and all mutation paths, including bulk JPQL/native SQL
   that bypass entity lifecycle listeners.
4. Define retention, read authorization, PII redaction, and immutability requirements.
5. Add additive schema migrations and tests for create/update/background operations.

## Metadata versus history

Creation/modification metadata answers who/when at the latest write (subject to reliable
identity and clock source). A full audit trail records before/after changes over time,
actor, action, reason, tenant, and correlation, and needs stronger integrity,
retention/access controls, and possibly an append-only event store. Do not present the
current AuditSection as a historical audit trail.

## Scope-specific coverage

| Domain | Current assessment | Next step |
| --- | --- | --- |
| Product/catalog | Some entities use embedded AuditSection; actor population unverified. | Inventory all write paths and bulk updates. |
| Customer | Customer implements `Auditable` and embeds AuditSection but has no visible `@EntityListeners(AuditListener.class)` declaration. | Verify lifecycle listener registration, creation/update mapping, and user identity availability. |
| Orders | `Order` does not visibly use `Auditable`/AuditSection. | Determine legal/business history requirements; do not add fields without schema plan. |
| Inventory | Product availability/inventory entities require a targeted mapping/write-path audit. | Audit stock movements rather than relying only on last-modified metadata. |
| Security | No immutable security-event trail was established. | Define authentication/authorization event logging separate from entity audit. |
| Store configuration | Some shared entities may use metadata but comprehensive coverage is unverified. | Map updates and secret redaction/access requirements. |

No auditing code or entity mapping was changed because identity source, schema and
historical requirements need product/security approval.
