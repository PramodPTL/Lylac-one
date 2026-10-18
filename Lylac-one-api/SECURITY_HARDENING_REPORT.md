# Security hardening report

## Scope

Static review of available Java, configuration, build, and Compose sources. No
penetration test, dependency CVE scan, deployment ingress configuration, or production
secret-store configuration was available. Findings are bounded by repository evidence.

| Severity | Evidence | Finding / impact | Recommendation and validation |
| --- | --- | --- | --- |
| High | `sm-core/src/main/resources/authentication.properties` contains `jwt.secret=aSecret`. | A weak hardcoded signing secret is present in a packaged resource. Search found no direct Java reference to these `jwt.*` keys, so whether it is currently used is **unverified**; if consumed by an auth component, token forgery may be possible. | Trace all runtime property loading; remove the fallback secret, require a high-entropy secret from a secret manager/environment, rotate any deployed value, and validate token signature/expiry behavior. Never print the value. |
| High | `sm-shop/src/main/resources/application.properties` previously exposed all Actuator web endpoints and health details. | Operational/configuration endpoints can disclose sensitive internals or enable dangerous operations if reachable. | This work restricts exposure to `health,info,prometheus`, hides health details/components, and enables probes. Verify runtime Spring Security and ingress policies; make Prometheus reachable only to the monitoring network. |
| High | `sm-shop/pom.xml` includes Spring Security and JJWT, but static search found no application `SecurityFilterChain`/`WebSecurityConfigurerAdapter`, JWT parsing, CORS/CSRF configuration, or explicit authz declarations. | The effective authentication/authentication chain may come from external XML/dependencies or default Spring Boot behavior; repository-only evidence is insufficient to establish route-level protection. | Trace the full runtime filter chain and externally imported config; test anonymous/admin/tenant access for every sensitive API. Do not assume dependency presence means endpoints are protected. |
| Medium | `sm-shop/src/main/resources/application.properties` had `management.endpoint.health.show-details=always` and `show-components=always`. | Health responses may disclose DB and dependency state. | Now set both to `never`; verify actual response under anonymous and operator access. |
| Medium | Password/JWT versions and third-party dependency tree were not audited; JJWT is version 0.8.0 in the parent properties. | Known/unknown vulnerable dependencies cannot be ruled out without an SBOM/CVE scan. | Run Maven dependency analysis and an approved vulnerability scanner, triage reachable paths, and upgrade with regression tests. |
| Review required | Payment integrations store transaction data and APIs may handle customer PII. | Logging, retention, card-data handling, TLS, CORS, CSRF and ingress configuration could not be fully verified. | Review PSP integrations, log redaction, TLS termination, origin allowlists, CSRF intent, rate limits, and PCI/privacy boundaries with deployed config. |

## OWASP / API Security review areas

- **Broken access control / BOLA:** tenant scoping must be tested across all read/write IDs;
  Phase 2 found and corrected customer/order OR predicates that could bypass store
  predicates.
- **Cryptographic failures:** hardcoded JWT secret is a high-priority review item;
  inspect token algorithms, key rotation and expiry in actual runtime auth code.
- **Injection:** values are generally bound as parameters in reviewed query construction;
  review remaining native SQL and any dynamic sort/query fragment.
- **Security misconfiguration:** prior Actuator wildcard exposure was narrowed; verify
  network isolation and runtime filter-chain protection.
- **Authentication failures:** no complete auth implementation was located in scanned
  main Java sources; external/legacy wiring needs verification.
- **SSRF / external integrations:** review payment/shipping URLs and outbound HTTP
  allowlists with deployment config.
- **Logging/monitoring:** never log tokens, credentials, payment data, or unnecessary
  customer data. Parameter-binding TRACE remains opt-in.
- **Resource consumption:** add request/body/rate/page limits only after API contract
  review and measured workload.

## Required manual validation before production

1. Inspect resolved Spring Security filter chain and every API matcher.
2. Verify JWT signature algorithm, minimum key length, expiry, issuer/audience, rotation,
   and rejection of `none`/unexpected algorithms.
3. Test cross-tenant authorization using separate tenant principals.
4. Verify CORS, CSRF, cookie/session behavior, HTTPS, and security headers at the real
   ingress.
5. Confirm actuator endpoints cannot be accessed from public networks.
6. Run dependency CVE/SBOM and secret scans; rotate any real secret ever committed.
7. Review payment provider integration, PII logs, retention and access controls.

This report is not a penetration-test certification.
