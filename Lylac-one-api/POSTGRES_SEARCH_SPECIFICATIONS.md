# Reusable search Specifications

`sm-core` exposes `JpaSpecificationExecutor` from the Manufacturer, Product, Customer,
and Order repositories and provides composable helpers in
`EntitySearchSpecifications`. Manufacturer's three paginated `listByStore` service
overloads now use its Specification; Product, Customer, and Order Specifications remain
opt-in examples and are not wired into current services.

## Available examples

```java
Specification<Manufacturer> manufacturerFilter =
    EntitySearchSpecifications.manufacturer(storeId, languageId, name);

Specification<Product> productFilter =
    EntitySearchSpecifications.product(storeId, sku, available, availableFrom, availableTo);

Specification<Customer> customerFilter =
    EntitySearchSpecifications.customer(storeId, email, nickname);

Specification<Order> orderFilter =
    EntitySearchSpecifications.orders(storeId, from, to, status, confirmedAddress,
        minimumTotal, maximumTotal);
```

Every factory requires a non-null store ID and includes the tenant/store predicate.
Optional predicates are added only when their value is supplied; absent values are never
bound as untyped null parameters. `Date` comparisons and `BigDecimal` ranges use typed
Criteria expressions, booleans use boolean parameters, and Order status uses its entity
enum.

## Composition, paging, and sorting

Specifications can be composed and passed to Spring Data's existing pageable executor:

```java
Specification<Customer> search =
    EntitySearchSpecifications.customer(storeId, email, nickname)
        .and(optionalAdditionalCustomerFilter);

Page<Customer> page = customerRepository.findAll(search, pageable);
```

Build `Pageable` with the existing `PageRequest` conventions and whitelist any externally
supplied sort property before passing it to the repository. The Specification framework
does not define API sorting rules or DTO mapping.

## String semantics

- Manufacturer name preserves case-sensitive substring matching and existing SQL
  wildcard behavior (`%` and `_` in the input remain pattern characters). A `null` name
  omits the name predicate; an empty value retains the previous `LIKE '%%'` behavior.
  The specification retains the left description join even when filters are absent and
  does not request `distinct`, matching the previous query's row multiplicity.
- Product SKU uses exact matching.
- Customer email and nickname examples use case-insensitive substring matching with
  `LOWER` and `Locale.ROOT` normalization. These are examples only and are not a change to
  current customer-search behavior.
- Product SKU, email, and nickname treat null and empty strings as absent filters.
  Whitespace is not trimmed.
- Contains matching has a leading wildcard and may not use a normal B-tree index
  efficiently. Evaluate trigram or other search indexes against actual workload and
  locale requirements before changing production search.

## Ranges and booleans

Product availability dates and Order purchase dates use inclusive lower/upper bounds.
Order total uses inclusive `BigDecimal` bounds. Available and confirmed-address filters
are added only when the Boolean argument is non-null, so both true and false can be
requested explicitly.

## Adoption notes

These examples use entity attribute names verified in the current model. Only the
Manufacturer page service methods have been migrated. Product, Customer, and Order
queries were not replaced because doing so without PostgreSQL-backed regression tests
could change pagination, duplicate handling, wildcard semantics, tenant filtering, or
payload cardinality. Before further adoption, test omitted filters, empty strings, literal
wildcard characters, case behavior, tenant scope, page totals, sort order, and duplicate
rows against PostgreSQL.
