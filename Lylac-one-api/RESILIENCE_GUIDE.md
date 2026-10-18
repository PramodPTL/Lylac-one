# Resilience guide

## Current evidence

The application has a Hikari datasource and external payment/shipping/search integrations.
No Resilience4j/circuit-breaker framework or explicit shared timeout/retry policy was
identified in the scanned configuration. Do not add generic retries: payment/order
operations may not be idempotent.

## Dependency policies

| Dependency/failure | Behavior to require | Retry/fallback guidance |
| --- | --- | --- |
| PostgreSQL unavailable | Fail readiness when database is required; bound connection acquisition and statement execution; stop accepting work if transaction persistence cannot proceed. | Avoid retrying business transactions at controller level. Retry only idempotent connection establishment with bounded backoff if supported by pool/driver configuration. Recover by restoring DB, then readiness. |
| Redis (not currently integrated) | Future cache outage should degrade to database reads only after protecting DB capacity; writes must not claim strong invalidation if it failed. | Do not retry writes indefinitely. Circuit-break optional cache operations and emit metrics; Redis is not a startup dependency until architecture approval. |
| Payment provider | Surface a clear pending/failed outcome and preserve transaction identifiers/idempotency keys. | Retry only provider operations proven idempotent and using provider idempotency keys. Never blindly retry charge/capture/refund. |
| Shipping/search/external APIs | Bound connect/read timeouts; map provider failure to established error behavior. | Retry safe GET/idempotent requests only, small attempt count with jittered exponential backoff. Circuit breaker only with measured outage patterns and a safe fallback. |
| Flyway migration | Fail startup/deployment on validation/migration errors; do not send traffic before schema readiness. | No automatic repeated deployment loop; inspect history and schema, then repair/restore under migration runbook. |

## Operational controls

- Set HTTP connect/read timeouts for each provider based on measured latency and caller
  deadlines. No universal numeric timeout is declared without service SLOs.
- Bound thread pools, queue length, and connection pools. Monitor saturation before
  raising capacity.
- Use graceful shutdown and readiness removal before terminating an instance; allow
  in-flight transactions a bounded drain window.
- Define idempotency for order creation/payment callbacks; protect webhook replay and
  duplicate delivery at the domain boundary.
- Log dependency state transitions with correlation IDs and redacted context.
- Test connection loss, slow dependency, pool exhaustion, provider timeout, duplicate
  callback, migration failure, shutdown and recovery in staging.

## Implementation status

No retries/circuit breakers were added because dependency idempotency and timeout
contracts are not established. PostgreSQL readiness probes and migration failure
behavior are configured/documented; database outage behavior still requires deployment
fault testing.
