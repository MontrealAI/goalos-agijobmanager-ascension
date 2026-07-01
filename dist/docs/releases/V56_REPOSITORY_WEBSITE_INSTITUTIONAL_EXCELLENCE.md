# Repository + Website Institutional Excellence v56

Release name: **Repository + Website Institutional Excellence v56**.

## What changed

- Promoted `data/canonical-route-manifest.json` to the current v54/v56-compatible route set with 60 routes.
- Reframed README as the front door for non-technical visitors, developers, reviewers, and legal/risk readers.
- Added the v56 documentation spine and release process notes.
- Added dynamic route, metadata, accessibility, and public-safe static checkers.
- Simplified package scripts around bootstrap, verify, documentation, public-safe, metadata, dynamic tests, and build.
- Updated the Pages workflow for v56 while preserving compatibility lineage.

## Why it matters

The repository now has one front door, one canonical manifest, one documentation spine, one route discovery doctrine, and a greener publisher path that avoids brittle version-specific missing-file failures.

## Route count

Canonical route count: **60**, from `data/canonical-route-manifest.json`.

## Public-safe guarantees

No account, no forms, no analytics, no cookies, no public wallet connection, no public token approval, no public network switching, no public transaction broadcast, no funds moved, no user data wanted, and no production authority from public pages.

## Tests and kernels

Run `npm test`, `npm run build`, and the individual v56 checkers listed in `docs/RELEASE_PROCESS.md`.

## Deployment instructions

Use the GitHub Actions publisher, keep `deploy_pages=true` and `commit_generated_source=true`, and leave live factual checks disabled unless an `ETHEREUM_RPC_URL` secret is configured.

## Claim boundary

ASI / superintelligence language is a governance horizon, not an achieved-capability claim. No Evidence Docket, no strong public claim. No ProofBundle, no settlement. No replay, no settlement.
