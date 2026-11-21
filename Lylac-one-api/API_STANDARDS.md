# API standards

These are incremental standards for existing Shopizer/Lylac APIs; they do not change
current routes, DTOs, response payloads, or UI behavior.

## Pagination and sorting

- Preserve each endpoint's existing page base, offset interpretation, default sort, and
  total-count contract.
- For new endpoints, use bounded Spring Data `Pageable` and define a stable order with a
  unique tie-breaker.
- Whitelist sort fields; do not pass arbitrary client strings to repository `Sort`.
- Avoid collection fetch joins on paged queries. Use ID-page plus bounded fetch if
  needed.

## Filtering and validation

- Validate external values at the request boundary and apply authorized store/tenant
  scope on the server.
- Define null, empty, whitespace, wildcard, case, and date-range semantics per field.
- Use typed query binding; never concatenate user-controlled values into SQL/HQL.
- Preserve wildcard behavior on legacy `LIKE` searches until a compatible contract is
  approved.

## Errors and HTTP status

- Preserve existing error envelope and status behavior for existing endpoints.
- New resources should use standard HTTP semantics: `400` invalid request, `401`
  unauthenticated, `403` unauthorized, `404` absent/inaccessible resource where
  disclosure is not intended, `409` state conflict, and appropriate `5xx` on server
  failure.
- Do not return stack traces, SQL, secrets, or internal exception messages to clients.
- Include a safe correlation ID where supported.

## Authentication and authorization

- Authenticate at the backend and enforce authorization/tenant ownership for every
  operation; frontend checks are supplemental only.
- Scope identifiers to authorized store context, not merely caller-supplied tenant IDs.
- Protect administrative endpoints and management surfaces separately.
- Document token/session lifecycle, CSRF/CORS rules, and revocation behavior.

## API documentation and compatibility

- Current code includes Swagger 2/Springfox dependencies. Confirm generated docs match
  actual security and DTO behavior; do not publish private admin endpoints publicly.
- Version public breaking changes. Additive fields should be backward compatible and
  tested against current clients.
- Rate limits should be introduced at gateway/application boundary only after workload
  and client behavior review.

## Existing review items

- Query scoping requires ongoing tenant regression tests; a Customer/Order OR precedence
  defect was corrected in Phase 2 work.
- Pagination varies between `Pageable` and custom `startIndex`/`maxCount`; do not
  normalize it without endpoint-specific contract tests.
- Security filter-chain and error-envelope behavior need deployment-wide verification.
