# V47 Repository Excellence and Trust Stabilization

## Summary

V47 stabilizes the repository around stable production entry points instead of brittle release-specific chains. It preserves all public pages and the public-safe proof doctrine: a model can answer, an agent can act, and an institution must prove.

## Files changed

- `tools/reference-integrity-auditor.mjs` adds a stable audit for local command file references in workflows, package scripts, and test runners.
- Stable compatibility aliases were added for bootstrap, root cleanup, public-trust metadata, public-trust checking, and release compatibility harmonization.
- `data/canonical-route-manifest.json` and `dist/canonical-route-manifest.json` are canonical aliases for the current route manifest.
- `package.json` now exposes concise stable scripts for preflight, verification, docs, reference checks, public trust, tests, build, and kernels.
- `.github/workflows/goalos-agijobmanager-ascension-production-url-autopilot.yml` now runs stable tools and audits references before deeper checks.
- Historical root README hotfix notes were moved under `docs/releases/`.

## Documentation improved

The README and documentation suite identify the production URL, route count, public/private proof boundary, AGIALPHA boundary, GitHub Web UI deployment posture, and stable local verification commands.

## Reference-integrity audit added

The new audit scans workflow commands, `package.json` scripts, and documentation/test runner manifests for local file references such as `node tools/...`, `node tests/...`, `python3 tools/...`, and `bash scripts/...`. Missing local files fail the check; documented optional fallback references may warn.

## Workflow stabilized

The canonical publisher uses official GitHub Actions, avoids package registry installs, avoids `npm install` and `npm ci`, runs `node tools/reference-integrity-auditor.mjs` early, builds deterministically, and uploads the Pages artifact only after source, docs, claim-boundary, public-trust, and kernel checks pass.

## Scripts simplified

Stable scripts now prefer canonical names:

```bash
npm run preflight
npm run verify
npm run docs:check
npm run test:docs
npm run reference:check
npm run public-trust
npm test
npm run build
npm run kernels
```

## Claim boundaries preserved

V47 does not claim achieved AGI, achieved ASI, empirical SOTA, external audit completion, production certification, investment opportunity, legal advice, financial advice, token availability from MontrealAI, or production authority from public demos.

## No pages removed

No public demos, proof rooms, expert pages, legal boundary pages, schemas, tests, or workflows were intentionally removed. Compatibility aliases remain thin wrappers around stable tools.

## Verification commands

```bash
node --version
npm run preflight
npm run verify
npm run docs:check
npm run test:docs
npm run reference:check
npm run public-trust
npm test
npm run build
npm run kernels
python3 tools/verify.py
node tools/no-registry-preflight.mjs
node tools/pathspec-proof-kernel.mjs
node tools/workflow-reference-auditor.mjs
node tools/reference-integrity-auditor.mjs
node tools/docs-link-checker.mjs
node tools/claim-boundary-checker.mjs
node tools/run-documentation-tests.mjs
node tools/run-all-tests.mjs
python3 tools/build.py
node tools/run-existing-kernels.mjs
```

## Known non-goals

- No new repository.
- No new public demo.
- No package dependencies.
- No analytics, cookies, forms, or browser storage.
- No public wallet connection, token approval, network switching, transaction broadcast, or funds movement.
- No token sale, offer, custody, brokerage, routing, redemption, market-making, price support, liquidity support, or recommendation.
