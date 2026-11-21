-- PROPOSAL ONLY: this file is not run by the application or Docker Compose.
-- Verify pg_indexes, constraints, column names, query plans, and schema ownership
-- before scheduling any statement through the approved migration process.
-- CREATE INDEX CONCURRENTLY must not be run inside a transaction block.

-- Required only for the optional substring-search candidates below.
-- CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Manufacturer `LIKE '%term%'`; consider only if measured search cost warrants it.
-- CREATE INDEX CONCURRENTLY IF NOT EXISTS manufacturer_description_name_trgm_idx
--   ON salesmanager.manufacturer_description USING gin (name gin_trgm_ops);

-- Product query uses lower(pd.name) LIKE :pattern; expression must match the query.
-- CREATE INDEX CONCURRENTLY IF NOT EXISTS product_description_name_lower_trgm_idx
--   ON salesmanager.product_description USING gin (lower(name) gin_trgm_ops);

-- Product SKU contains-search only; keep the existing tenant/SKU unique B-tree.
-- CREATE INDEX CONCURRENTLY IF NOT EXISTS product_sku_lower_trgm_idx
--   ON salesmanager.product USING gin (lower(sku) gin_trgm_ops);

-- Customer email contains-search only; not useful for leading-wildcard-free equality.
-- CREATE INDEX CONCURRENTLY IF NOT EXISTS customer_email_trgm_idx
--   ON salesmanager.customer USING gin (customer_email_address gin_trgm_ops);

-- Candidate only if tenant + status + newest-order paging is a common measured query.
-- CREATE INDEX CONCURRENTLY IF NOT EXISTS orders_merchant_status_id_desc_idx
--   ON salesmanager.orders (merchantid, order_status, order_id DESC);
