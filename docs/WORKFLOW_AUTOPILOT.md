# Workflow Autopilot

The publisher builds, verifies, commits generated source when requested, and deploys GitHub Pages when requested. Inputs: `deploy_pages`, `commit_generated_source`, `run_live_factual_check`, and `strict_live_factual_check`. Safe defaults deploy generated static pages without live RPC dependency. It never installs registry packages, collects data, moves funds, or grants production authority. Live factual checks are optional because RPC availability is environment-specific. Verify `dist/production-url.json` and production pages after every run.


## Shared boundary

Public demos are browser-local and public-safe: no user data wanted, no forms, no analytics, no cookies, no localStorage/sessionStorage, no public wallet connection, no public token approval, no public network switching, no public transaction broadcast, no funds moved, and no production authority. This material is not legal, financial, investment, tax, medical, audit, safety-certification, or professional advice. It does not claim achieved AGI, achieved ASI, empirical SOTA, external audit completed, production certified, safe autonomy proven, guaranteed return, or investment opportunity.
