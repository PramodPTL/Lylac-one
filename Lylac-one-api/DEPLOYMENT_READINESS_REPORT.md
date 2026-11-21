# Deployment readiness report

## Implemented in this worktree

- Added Flyway dependency and one safe schema-creation migration; PostgreSQL profile
  controls baseline adoption and validation.
- Removed the Docker Compose PostgreSQL init-script mount so the app migration is the
  schema bootstrap owner. Existing named volumes are not changed.
- Added the Prometheus Micrometer registry.
- Restricted Actuator web exposure to health, info, and Prometheus; health details are
  hidden and liveness/readiness groups enabled.
- Existing Dockerfile packages a jar and filesystem assets; it has no explicit HEALTHCHECK,
  non-root user, JVM resource limits, or graceful-shutdown policy in the reviewed source.

## Readiness findings

| Priority | Area | Status / blocker | Recommended action |
| --- | --- | --- | --- |
| High | Database migration | Only the two schemas are represented in Flyway; app tables have no migration history. | Baseline reviewed existing DBs and add forward migrations; validate against schema dump before production. |
| High | Secrets | Development PostgreSQL defaults exist; authentication properties include a weak JWT secret. | Use secret manager, rotate any deployed/committed secret, confirm property consumption, fail startup if production secret is absent. |
| High | Management endpoints | Limited endpoints exposed; network/auth protection is not configured in Compose/repository deployment. | Private management network, Prometheus allowlist/auth, TLS and runtime filter-chain verification. |
| High | Schema drift | No production schema/catalog supplied. | Complete `SCHEMA_DRIFT_REPORT.md` inspection against staging/production replica before migration adoption. |
| Medium | Redis | No Redis dependency/service; intentionally not introduced due invalidation and topology unknown. | Add only after consistency/ops decision; Redis outage should not impair current operation. |
| Medium | Container hardening | Base image is legacy AdoptOpenJDK OpenJ9 Alpine; runtime is not explicitly non-root and no healthcheck. | Select supported JRE base, pin image digest, run non-root, add resource-aware JVM flags and image scan. |
| Medium | Readiness/liveness | Actuator probes enabled in application config, but no container/orchestrator probes are present here. | Wire orchestrator probes to `/actuator/health/liveness` and `/actuator/health/readiness`; do not expose management publicly. |
| Medium | Graceful shutdown | No explicit server shutdown/drain configuration found. | Configure bounded graceful shutdown after ingress/termination timing is agreed; test in-flight transaction drain. |
| Medium | Backup/restore | No PostgreSQL backup policy or restore verification in repo. | Define encrypted backups/PITR, retention, RPO/RTO, and recurring restore drills. |
| Medium | Monitoring | Prometheus endpoint/registry added; no dashboard/provisioning/config or alert rules committed. | Configure scrape ACLs, dashboards and alert routes per monitoring requirements. |
| Review | Kubernetes | No deployment manifest or explicit Kubernetes target was supplied. | Do not add Kubernetes resources until deployment platform/ownership is confirmed. |

## Release checklist

1. Build immutable image from tested artifact, scan dependencies and container.
2. Verify secret injection and database user grants in staging.
3. Take restorable backup and snapshot schema/catalog.
4. Run Flyway migration job and inspect history/checksums.
5. Wait for readiness, verify probes/metrics from private network, and smoke-test tenant
   boundaries.
6. Monitor errors, DB pool, latency and migration duration during rollout.
7. Confirm rollback compatibility; restore data only under the tested recovery plan.

The worktree is not certified production-ready. PostgreSQL, Prometheus, deployment
ingress, backups, and staging rollout were unavailable for validation.
