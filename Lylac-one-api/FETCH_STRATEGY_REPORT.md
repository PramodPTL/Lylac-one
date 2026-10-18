# Entity fetch-strategy review

## Scope and limitations

Static review of mapped associations and repository fetch joins; no SQL statement
counts, PostgreSQL plans, or runtime measurements were available. No entity mapping was
changed. Line references are source-level evidence and should be verified against the
deployed schema.

## Findings

| Priority | Entity / mapping and affected queries | Risk | Recommendation | Required regression validation |
| --- | --- | --- | --- | --- |
| High | `Manufacturer.descriptions` is `FetchType.EAGER`; `Manufacturer.merchantStore` is also EAGER. Affected by pageable `PageableManufacturerRepository` methods and other manufacturer list/detail repository methods. | The description collection is loaded for every selected manufacturer, even where a caller needs one locale. Pageable entity queries can cause eager secondary selects or repeated association loading. | Prefer lazy collection loading and explicit query-specific fetch plans, but only after identifying every mapper and transaction boundary. Do not fetch-join the collection on a paged query. | Test each facade/service caller, detached mapping, selected locale, query counts, duplicate row behavior, and count/page totals. |
| High | `CustomerRepository.findOne`, `findByName`, `findByNick`, and `findByStore` fetch attributes, option/value descriptions, and groups; `CustomerRepositoryImpl.listByStore` fetches attributes/options/groups and applies manual pagination afterward. `Customer` maps these collections LAZY. | Several plural joins multiply rows. In the dynamic paged list, collection fetch plus `setFirstResult`/`setMaxResults` can force in-memory pagination or split/deduplicate entities unexpectedly. | For a page, first select ordered customer IDs and total count, then fetch associations for only those IDs. For detail calls, fetch only associations used by the response or use controlled batch loading. | Test customers with multiple attributes/groups/descriptions, stable page membership, total count, duplicate handling, and serialization outside transaction. |
| High | `OrderRepository.findOne` fetches order products, totals, history, attributes, downloads, prices and addresses; `OrderRepositoryImpl.listOrders`/`listByStore` fetch multiple collections and then manually paginates. `Order` collection mappings are LAZY. | Collection cross-products can produce many joined rows. Pageable queries may use in-memory pagination; root duplicates and count/content mismatch are risks. | Page order IDs first using the existing tenant filter and stable ID ordering, then fetch the needed graph in a bounded second query. Avoid fetching multiple independent collections in one paged query. | PostgreSQL integration tests for page totals, order cardinality, large orders, tenant visibility, and default ascending/descending order. |
| Medium | `ProductRepositoryImpl.getByCode` fetches availabilities/prices/descriptions, categories/descriptions, images, attributes/options/descriptions, relationships, manufacturer/descriptions and other to-one associations. Product collections otherwise map LAZY. | Multiple collection fetches can form a cartesian product, inflate transfer/hydration cost, and interact with `distinct`. Not paginated, so the main concern is row multiplication. | Measure before changing. Consider a narrow detail fetch plus batched association loads or a named entity graph for only required relations. | Compare row counts, SQL count, hydration time, product fields and nested response contract. |
| Medium | `Order.orderProducts`, `orderTotal`, `orderHistory`, and `orderAttributes` use default LAZY collection behavior, while `OrderRepository.findOne` explicitly fetches them. | Non-fetch code paths may trigger N+1 loads if collections are accessed in loops; the broad detail query may over-fetch. | Use targeted fetch plans at known read boundaries; use batch fetching only when query measurements support it. | Count SQL statements for representative order list/detail requests. |
| Low/Medium | `Product` collections (`descriptions`, `availabilities`, `attributes`, `images`, `relationships`, `variants`) are LAZY, as are Customer attributes/groups/reviews. | Lazy loading avoids broad default reads but can produce N+1 queries or lazy initialization failures if mapping occurs outside the transaction. | Keep default lazy mapping; inspect each consumer and fetch only required paths. Do not globally switch these relationships to EAGER. | Service/facade tests including transaction and serialization boundaries. |

## Pagination and collection fetches

Spring Data `Pageable` is already used by Manufacturer service methods. The Manufacturer
Specification migration does not use a collection fetch join. `CustomerRepositoryImpl`
and `OrderRepositoryImpl` instead use custom `GenericEntityList`/criteria offsets and
fetch collections before applying offsets. Replacing those with Spring Data pages is not
behavior-neutral until the existing zero-based `startIndex`, max-count rules, total
count, sorting, and payload shape are covered by tests.

Hibernate can apply pagination in memory when a query fetch-joins a collection. Inspect
runtime warnings and generated SQL; do not infer correct database-level limiting merely
because a page-like API returns the requested number of entities.

## Evidence and next steps

- `sm-core-model/src/main/java/com/salesmanager/core/model/catalog/product/manufacturer/Manufacturer.java`
- `sm-core-model/src/main/java/com/salesmanager/core/model/catalog/product/Product.java`
- `sm-core-model/src/main/java/com/salesmanager/core/model/customer/Customer.java`
- `sm-core-model/src/main/java/com/salesmanager/core/model/order/Order.java`
- `sm-core/src/main/java/com/salesmanager/core/business/repositories/customer/CustomerRepository.java`
- `sm-core/src/main/java/com/salesmanager/core/business/repositories/customer/CustomerRepositoryImpl.java`
- `sm-core/src/main/java/com/salesmanager/core/business/repositories/order/OrderRepository.java`
- `sm-core/src/main/java/com/salesmanager/core/business/repositories/order/OrderRepositoryImpl.java`
- `sm-core/src/main/java/com/salesmanager/core/business/repositories/catalog/product/ProductRepositoryImpl.java`

Enable Hibernate SQL logging only for a controlled test window, compare query counts, and
validate plans with representative data before changing mappings or repository fetch
plans.
