# V41 Documentation Upgrade

## Summary

Upgrades the repository front door, documentation suite, diagrams, docs tests, issue templates, and contributor guidance.

## Docs added

Institutional onboarding, architecture, demo catalog, proof objects, deployment, workflow autopilot, security/privacy, claim, AGIALPHA, troubleshooting, release, contributing, support, FAQ, and release notes.

## README improved

The README now includes badges, production URL, route catalog, canonical identities, diagrams, local commands, Web UI deployment guidance, boundaries, and falsification criteria.

## Badges added

Production, publisher workflow, last commit, language, public-safe demos, no wallet, no analytics/cookies, claim-bounded, Evidence Docket discipline, and dependency-zero publisher badges. License badges should only be added when a repository `LICENSE` file exists.

## Diagrams added

Proof-to-action, proof-settlement, public/private boundary, publication pipeline, and repository architecture Mermaid diagrams.

## Repository inspection summary

- Current publisher workflow: `.github/workflows/goalos-agijobmanager-ascension-production-url-autopilot.yml`, named **GoalOS AGIJobManager Ascension Navigation Source Polish Publisher v41**.
- Current npm scripts include dependency-free build, verification, documentation, route, kernel, legal, token-boundary, and navigation-polish runners in `package.json`.
- Current route and navigation catalogs include `data/site-navigation-v41.json`, `data/site-navigation-v39.json`, `data/site-navigation-v38.json`, `data/site-navigation-v37.json`, `data/site-navigation-catalog.json`, `data/site-navigation-map.json`, `data/site-experience-atlas.json`, and `data/experience-hub-catalog.json`.
- Existing documentation was upgraded in place rather than duplicated; historical vXX reports remain as release evidence and are not treated as current onboarding entry points.
- Existing public-safe runners remain dependency-free and are exercised by `tools/run-all-tests.mjs`, `tools/run-existing-kernels.mjs`, and the documentation QA tools.

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
