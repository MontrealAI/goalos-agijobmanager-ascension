# V41 Documentation Upgrade

## Summary

Upgrades the repository front door, documentation suite, diagrams, docs tests, issue templates, and contributor guidance.

## Docs added

Institutional onboarding, architecture, demo catalog, proof objects, deployment, workflow autopilot, security/privacy, claim, AGIALPHA, troubleshooting, release, contributing, support, FAQ, and release notes.

## README improved

The README now includes badges, production URL, route catalog, canonical identities, diagrams, local commands, Web UI deployment guidance, boundaries, and falsification criteria.

## Badges added

Production, publisher workflow, license, last commit, language, repository size, public-safe demos, no wallet, no analytics/cookies, and dependency-zero publisher badges.

## Diagrams added

Proof-to-action, proof-settlement, public/private boundary, publication pipeline, demo library, and repository architecture Mermaid diagrams.

## Tests added

Dependency-free documentation link checking and documentation boundary tests.

## Boundaries preserved

No pages removed. Public demos remain browser-local, public-safe, data-zero, wallet-free, analytics-free, cookie-free, and claim-bounded.

## Verification commands

```bash
node --version
python3 tools/verify.py
node tools/no-registry-preflight.mjs
node tools/pathspec-proof-kernel.mjs
node tools/workflow-reference-auditor.mjs
node tools/docs-link-checker.mjs
node tests/documentation.test.mjs
node tools/run-all-tests.mjs
python3 tools/build.py
node tools/run-existing-kernels.mjs
```

## Migration notes

No migration is required. Existing demos, workflows, schemas, tests, and publication path remain in place.
