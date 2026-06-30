# GoalOS AGIJobManager Ascension · Proof-Governed Institution v17 Report

Status: PASS locally.

## Added

- `site/coordination-lab.html`
- `site/assets/institution.css`
- `site/assets/institution.js`
- `data/proof-governed-institution-demo.json`
- `schemas/proof-governed-institution-demo.schema.json`
- `tools/proof-governed-institution-kernel.mjs`
- `tests/proof-governed-institution.test.mjs`
- `docs/PROOF_GOVERNED_INSTITUTION_LAB_V17.md`

## User experience

The new lab lets users run a 100% browser-local multi-agent institution simulation. It compares an unstructured swarm, a fixed crew, and a proof-governed institution. Users can run ten proof gates, inspect Chronicle entries, switch between executive and technical views, copy a briefing, and download an Evidence Docket JSON.

## Protection posture

The lab has no form tags, no analytics, no cookies, no browser storage, no network request, no wallet primitive, no token approval, no Mainnet broadcast, no fund authorization, and no production authority.

## Verification

The v17 kernel verifies:

- the coordination lab page exists;
- the lab exposes the coordination thesis;
- the lab is linked from the homepage;
- the lab emits the expected protocol objects;
- the JavaScript moves particles upward;
- the JavaScript contains no public-demo wallet, storage, cookie, or network primitives;
- the data contract enforces the browser-local Data-Zero posture;
- the build pipeline publishes the lab and conformance JSON.

## Deployment

Upload the v17 overlay to `MontrealAI/goalos-agijobmanager-ascension`, then run:

`GoalOS AGIJobManager Ascension Proof-Governed Institution Publisher v17`

Recommended workflow inputs for routine deployment:

- `deploy_pages: true`
- `commit_generated_source: true`
- `run_live_factual_check: false`
- `strict_live_factual_check: false`

Use live factual checking only after adding a reliable `ETHEREUM_RPC_URL` secret.
