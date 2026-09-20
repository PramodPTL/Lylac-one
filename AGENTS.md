# AGENTS.md

## Project Overview

**Project Name:** Lylac One

Lylac One is a multi-tenant Pharmacy ERP and Omnichannel Commerce SaaS
platform.

The platform enables medical shops and pharmacies to:

-   Manage inventory and stock
-   Track medicine batches and expiry dates
-   Manage purchases and suppliers
-   Record sales and orders
-   Maintain business and accounting records
-   Manage customers
-   Launch a branded online storefront
-   Sell products online using the Lylac One commerce infrastructure

Lylac One is being built on top of the Shopizer open-source commerce
foundation.

## Product Positioning

Category:

**B2B Vertical SaaS → RetailTech / HealthTech → Pharmacy ERP &
Omnichannel Commerce**

Product positioning:

**Pharmacy Commerce OS**

Lylac One should be treated as an enterprise SaaS platform, not a basic
pharmacy management application.

## Architecture Principles

All code changes must follow these principles:

1.  Prefer modular architecture.
2.  Keep pharmacy domain logic separate from generic commerce logic.
3.  Do not tightly couple new Lylac One features to Shopizer internals.
4.  Treat Shopizer as the existing commerce foundation.
5.  Gradually isolate or replace Shopizer-specific components when
    required.
6.  Design all business features for multi-tenancy.
7.  Enforce tenant isolation at every data-access boundary.
8.  Prefer clear domain boundaries over generic utility modules.
9.  Avoid duplicated business logic.
10. Do not perform large rewrites without a migration reason and plan.

## Current Repository Structure

``` text
LYLAC-ONE/
├── lylac-one-api/
├── lylac-one-admin-web/
├── docs/
├── LICENSE.md
├── NOTICE
└── README.md
```

The backend currently contains Shopizer-derived modules such as:

``` text
sm-core
sm-core-model
sm-core-modules
sm-shop
sm-shop-model
```

Do not blindly rename these modules.

Before renaming a Shopizer module, inspect and update:

-   Maven parent and module references
-   groupId
-   artifactId
-   Java package references
-   Spring configuration
-   dependency declarations
-   build scripts
-   Docker configuration
-   CI/CD workflows

Refactor Shopizer-derived modules incrementally.

## Target Domain Architecture

The preferred long-term domain structure is:

``` text
lylac-core
├── tenant
├── identity
├── security
└── common

lylac-commerce
├── catalog
├── inventory
├── order
├── sales
└── storefront

lylac-pharmacy
├── medicine
├── batch
├── expiry
├── supplier
├── purchase
└── compliance

lylac-accounting
├── ledger
├── payment
└── reports
```

This is a target architecture, not permission to immediately rewrite the
existing project.

## Multi-Tenancy

A tenant represents a pharmacy, medical shop, or pharmacy business.

Every tenant-owned business record must be associated with a tenant.

Examples:

-   Products
-   Inventory
-   Warehouses
-   Medicine batches
-   Suppliers
-   Purchases
-   Sales
-   Orders
-   Customers
-   Storefront configuration

Never return or modify data belonging to another tenant.

Tenant context must not be trusted directly from arbitrary client input
without authorization validation.

When reviewing code, actively look for tenant data leakage.

## Pharmacy Domain Rules

Pharmacy-specific concepts must remain explicit.

Important domain concepts include:

-   Medicine
-   Batch
-   Batch number
-   Manufacturing date
-   Expiry date
-   Purchase
-   Supplier
-   Stock movement
-   Sale
-   Return
-   Prescription requirement
-   Tax information

Do not model pharmacy inventory as only a generic product quantity.

Inventory must eventually support batch-level stock and expiry tracking.

## Backend Guidelines

Expected backend technology is Java with Spring Boot and Maven.

Follow these rules:

-   Prefer constructor injection.
-   Avoid field injection.
-   Keep controllers thin.
-   Put business rules in application/domain services.
-   Do not place business logic in repositories.
-   Use DTOs at API boundaries.
-   Do not expose persistence entities directly through REST APIs.
-   Validate external input.
-   Use meaningful exceptions.
-   Use transactions deliberately.
-   Avoid unnecessary static utility classes.
-   Prefer explicit code over hidden framework magic for critical
    business logic.

## API Design

Use resource-oriented REST APIs where appropriate.

Preferred patterns:

``` text
/api/v1/products
/api/v1/inventory
/api/v1/orders
/api/v1/purchases
/api/v1/suppliers
/api/v1/tenants
```

Rules:

-   Version public APIs.
-   Use correct HTTP methods.
-   Use consistent error responses.
-   Support pagination for collection endpoints.
-   Do not expose internal database identifiers unnecessarily.
-   Validate authorization and tenant access before business operations.

## Database Guidelines

Database changes must be migration-driven.

Rules:

-   Never manually depend on production schema changes.
-   Use explicit constraints.
-   Add indexes based on real query patterns.
-   Avoid storing derived values unless there is a clear reason.
-   Use decimal types for monetary values.
-   Never use floating-point types for money.
-   Preserve auditability for stock and financial operations.

Stock should be modeled through traceable movements where possible.

Examples:

``` text
PURCHASE
SALE
SALE_RETURN
PURCHASE_RETURN
ADJUSTMENT
TRANSFER
EXPIRED
DAMAGED
```

Do not silently overwrite stock quantities without an auditable reason.

## Accounting Guidelines

Do not create a fake accounting system based only on sales totals.

Financial modules should distinguish:

-   Sales
-   Purchases
-   Payments
-   Refunds
-   Receivables
-   Payables
-   Taxes
-   Ledger entries

Any double-entry accounting implementation must preserve balanced
journal entries.

## Frontend Guidelines

The admin application should be treated as an enterprise business
application.

Rules:

-   Prefer reusable domain components.
-   Keep API access in a dedicated client/service layer.
-   Do not scatter API calls across UI components.
-   Handle loading, empty, error, and permission states.
-   Design workflows for pharmacy staff efficiency.
-   Avoid unnecessary animations.
-   Prefer information density and clarity.
-   Keep tenant/store context visible where relevant.

## Security

Never commit:

-   `.env`
-   API keys
-   Database passwords
-   JWT secrets
-   Cloud credentials
-   Private certificates

Security rules:

-   Enforce authorization on the backend.
-   Never rely only on frontend permission checks.
-   Validate tenant ownership.
-   Use least privilege.
-   Avoid logging secrets or sensitive authentication data.
-   Review dependency vulnerabilities before major releases.

## Shopizer Foundation Rules

Shopizer is the existing foundation, not the final product architecture.

When modifying Shopizer-derived code:

1.  Understand the existing behavior first.
2.  Identify whether the logic is generic commerce or Lylac One domain
    logic.
3.  Avoid inserting pharmacy-specific logic into generic Shopizer
    classes when a separate module or service is appropriate.
4.  Prefer adapters or isolated domain services where practical.
5.  Refactor incrementally.
6.  Preserve required open-source license and notice information.

Do not remove license or attribution files without legal review.

## Coding Agent Instructions

When an AI coding agent works on this repository, it must:

1.  Read this file before proposing architecture changes.
2.  Inspect relevant existing code before generating replacements.
3.  Do not assume the project is a greenfield application.
4.  Do not rewrite entire modules unless explicitly requested.
5.  Explain architectural impact before large changes.
6.  Preserve backward compatibility unless a breaking change is
    approved.
7.  Follow existing code style where it does not conflict with the
    target architecture.
8.  Identify Shopizer dependencies affected by a change.
9.  Check multi-tenant isolation for every business feature.
10. Add or update tests for changed business behavior.
11. Never invent classes, methods, tables, or APIs without verifying the
    repository.
12. Prefer the smallest correct change.

## Code Review Priorities

Review code in this order:

1.  Tenant isolation
2.  Security
3.  Data integrity
4.  Stock correctness
5.  Financial correctness
6.  Transaction boundaries
7.  Domain architecture
8.  API compatibility
9.  Performance
10. Code style

## Git Strategy

Branches:

``` text
main        -> production-ready code
develop     -> active integration
feature/*   -> new features
fix/*       -> bug fixes
refactor/*  -> structural refactoring
```

Do not directly develop on `main`.

Preferred commit format:

``` text
feat: add batch inventory tracking
fix: prevent cross-tenant product access
refactor: isolate Shopizer catalog adapter
chore: update Maven dependencies
docs: update architecture guidelines
test: add inventory movement tests
```

Keep commits focused and reviewable.

## Decision Rule

When choosing between a quick Shopizer modification and a clean Lylac
One domain design:

-   Prefer a small isolated extension if the feature is new.
-   Prefer an adapter when integrating with Shopizer behavior.
-   Refactor existing Shopizer code only when the current design blocks
    the product.
-   Never create architectural complexity only to make the code look
    modern.

## Primary Goal

Build Lylac One into a maintainable, secure, multi-tenant Pharmacy
Commerce OS that can evolve independently from its Shopizer foundation.
