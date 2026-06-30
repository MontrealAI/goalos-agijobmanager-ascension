# Deployment with the GitHub Web UI

1. If you receive an overlay, unzip it first. Upload contents, not the ZIP.
2. Commit to `main`.
3. Open Actions.
4. Run **GoalOS AGIJobManager Ascension Institutional Website Publisher v42**.
5. Set `deploy_pages=true` and `commit_generated_source=true`.
6. Keep live factual checks false unless `ETHEREUM_RPC_URL` is configured.
7. After completion, inspect `dist/production-url.json` and the production URL.
8. Red historical workflow runs are immutable; fix source and rerun the current workflow.


## Shared boundary

Public demos are browser-local and public-safe: no user data wanted, no forms, no analytics, no cookies, no localStorage/sessionStorage, no public wallet connection, no public token approval, no public network switching, no public transaction broadcast, no funds moved, and no production authority. This material is not legal, financial, investment, tax, medical, audit, safety-certification, or professional advice. It does not claim achieved AGI, achieved ASI, empirical SOTA, external audit completed, production certified, safe autonomy proven, guaranteed return, or investment opportunity.
