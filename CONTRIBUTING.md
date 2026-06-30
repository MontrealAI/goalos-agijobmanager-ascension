# Contributing

Thank you for improving GoalOS AGIJobManager Ascension. The repository is public-facing, so every contribution must preserve the proof institution posture: public-safe by default, claim-bounded, browser-local, and reviewable.

## Best first contribution paths

| Contribution | Start here | Required checks |
|---|---|---|
| Fix documentation | `docs/` | `npm run verify:docs` |
| Add a demo | `site/`, `data/`, `schemas/`, `tests/` | `npm test && npm run build` |
| Improve navigation | `data/canonical-route-manifest-v43.json` and route docs | `node tools/public-trust-checker-v43.mjs` |
| Improve boundaries | `docs/CLAIM_BOUNDARY.md`, `docs/AGIALPHA_BOUNDARY.md`, boundary pages | `node tools/claim-boundary-checker.mjs` |

## Adding a new public demo

1. Add a static page under `site/`.
2. Add public-safe demo data under `data/`.
3. Add a JSON schema under `schemas/` when the output object is structured.
4. Add a dependency-free test under `tests/`.
5. Add or update a kernel under `tools/` only if it checks production artifacts.
6. Add the route to the canonical route manifest.
7. Update `docs/DEMO_CATALOG.md` and relevant docs.

## Non-negotiable public-safe rules

Public demos must not collect user data, submit forms, use analytics, set cookies, use `localStorage` / `sessionStorage`, connect wallets, approve tokens, switch networks, broadcast transactions, move funds, or grant production authority.

## Claim discipline

Do not add claims of achieved AGI, achieved ASI, empirical SOTA, external audit completion, production certification, guaranteed returns, legal advice, financial advice, investment opportunity, safe autonomy, or real-world certification unless an explicit claim-bound Evidence Docket supports the exact statement.

## Before opening a pull request

```bash
python3 tools/verify.py
node tools/no-registry-preflight.mjs
node tools/pathspec-proof-kernel.mjs
node tools/workflow-reference-auditor.mjs
node tools/docs-link-checker.mjs
node tools/claim-boundary-checker.mjs
node tests/documentation.test.mjs
node tools/run-all-tests.mjs
node tools/apply-public-trust-metadata-v43.mjs
python3 tools/build.py
node tools/run-existing-kernels.mjs
node tools/public-trust-checker-v43.mjs
```
