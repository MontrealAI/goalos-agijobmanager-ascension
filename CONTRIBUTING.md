# Contributing

Thank you for helping improve GoalOS AGIJobManager Ascension. This repository is a public-safe static site and documentation system. Contributions should make the evidence room clearer without adding user-data collection, wallet behavior, analytics, cookies, forms, token routing, or unsupported claims.

## Start here

1. Read [docs/README.md](docs/README.md).
2. Review [docs/SECURITY_PRIVACY_BOUNDARY.md](docs/SECURITY_PRIVACY_BOUNDARY.md), [docs/CLAIM_BOUNDARY.md](docs/CLAIM_BOUNDARY.md), and [docs/AGIALPHA_BOUNDARY.md](docs/AGIALPHA_BOUNDARY.md).
3. Run the dependency-free checks listed below before opening a pull request.

## How to add a demo

1. Add the static page under `site/`.
2. Add browser-local JavaScript/CSS under `site/assets/` only if needed.
3. Keep the demo read-only and browser-local.
4. Do not add forms, analytics, cookies, localStorage, sessionStorage, wallet connection, token approval, network switching, transaction broadcasting, or production authority.
5. Add a data contract in `data/` and a matching JSON schema in `schemas/` when the demo has structured content.
6. Add a dependency-free test in `tests/`.
7. Update the current navigation catalog only when the route should be visible; avoid adding another top navigation bar.
8. Update [docs/DEMO_CATALOG.md](docs/DEMO_CATALOG.md) and README route references if the route is a major public surface.

## How to add a data contract

- Place public-safe JSON in `data/`.
- Use explicit safety fields for data-zero posture, public-safe status, no wallet, no external action, and no production authority where applicable.
- Do not include secrets, personal data, customer data, private prompts, raw traces, or confidential workpapers.

## How to add a schema

- Place JSON schemas in `schemas/`.
- Keep schema names aligned with the related data contract.
- Add or update a test so the data contract remains structurally reviewable.

## How to add a test

- Prefer Node.js or Python standard-library checks.
- Do not introduce package registry dependencies.
- Keep tests deterministic and public-safe.
- Add documentation checks when changing public-facing claims or boundaries.

## Verification

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

## Pull request checklist

Use [.github/PULL_REQUEST_TEMPLATE.md](.github/PULL_REQUEST_TEMPLATE.md). The most important checks are: no user-data collection, no public wallet behavior, no token offer, no unsupported AGI/ASI/audit/certification claims, route catalog updated if needed, and no menu stacking.
