# Logging guidelines

## Current architecture and recommendation

Application code uses SLF4J/Logback through Spring Boot; test resources also include a
legacy Log4j properties file. SQL DEBUG is enabled by existing application
configuration, while Hibernate 5 parameter binding remains disabled at INFO. No JSON
encoder or correlation-ID filter was found. Do not replace the logging backend as part
of a query or schema change without deployment-level validation.

Prefer JSON at the log collector/container boundary or a compatible Logback encoder
after its dependency/version is reviewed. Keep one event per line with:
`timestamp`, `level`, `logger`, `message`, `service`, `environment`, `version`,
`trace_id`/`request_id` when present, and exception class/stack trace. Use SLF4J
parameterized logging; never format secrets into message text.

## Severity and content

- `ERROR`: request/job failed and needs investigation; include safe operation context and
  exception.
- `WARN`: recoverable degradation, retry, or validation issue.
- `INFO`: lifecycle/deployment/security events without sensitive payloads.
- `DEBUG`/`TRACE`: temporary diagnostics only; disabled in routine production.

Never log passwords, bearer tokens, JWTs, session IDs, API keys, database URLs containing
credentials, payment card/security data, full request bodies, or unnecessary names,
email addresses, addresses, phone numbers, and search text. Mask or omit such fields
before logging; do not rely on downstream regex redaction alone.

## SQL diagnostics

`org.hibernate.SQL=DEBUG` prints SQL structure. For Hibernate 5, binding values use
`org.hibernate.type.descriptor.sql.BasicBinder=TRACE`. Enable parameter TRACE only in a
time-bounded, controlled environment with sanitized data; turn it off promptly and
protect/delete captured logs according to policy. SQL logs can reveal schema and
business behavior even without bind values.

## Correlation, retention, access

Propagate a validated request/correlation identifier from the ingress; do not blindly
trust arbitrary client values or use them as metric labels. Include it in logs and error
responses only where the established API permits. Restrict log access by role, encrypt
transport/storage, set retention by legal/operational policy, and record access to
security/audit logs.

## Troubleshooting

Start with request ID, route template, deployment version, exception chain, and
timestamps. Correlate with HTTP/DB/cache metrics. Enable targeted logger categories
briefly instead of raising root logger verbosity. Do not enable SQL parameter TRACE to
diagnose general latency; use PostgreSQL statistics and safe query plans.
