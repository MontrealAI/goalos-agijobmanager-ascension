# GoalOS AGIJobManager Ascension Documentation

This documentation is the repository front door for operators, reviewers, developers, and non-technical visitors. The public site remains a browser-local demonstration surface; this directory explains how to understand, review, verify, and safely publish it.

## Reading paths

| Reader | First read | Then read | Outcome |
| --- | --- | --- | --- |
| New visitor | [Getting started](GETTING_STARTED.md) | [FAQ](FAQ.md), [Demo catalog](DEMO_CATALOG.md) | Know what to click first and what the demos do not do. |
| Non-technical operator | [Deployment Web UI](DEPLOYMENT_GITHUB_WEB_UI.md) | [Workflow autopilot](WORKFLOW_AUTOPILOT.md), [Troubleshooting](TROUBLESHOOTING.md) | Publish with GitHub Actions without uploading ZIP files or changing code manually. |
| Developer | [Architecture](ARCHITECTURE.md) | [Proof objects](PROOF_OBJECTS.md), [Release checklist](RELEASE_CHECKLIST.md) | Add routes, data contracts, schemas, and tests without weakening public-safe boundaries. |
| Reviewer / risk / legal | [Claim boundary](CLAIM_BOUNDARY.md) | [Security/privacy boundary](SECURITY_PRIVACY_BOUNDARY.md), [AGIALPHA boundary](AGIALPHA_BOUNDARY.md) | Review claims, token posture, privacy posture, and falsification criteria. |
| Researcher | [Demo catalog](DEMO_CATALOG.md) | [Proof objects](PROOF_OBJECTS.md), [Architecture](ARCHITECTURE.md) | Map demonstrations to proof objects and replay/validation concepts. |

## Best first clicks

| Need | Link |
| --- | --- |
| Production site | https://montrealai.github.io/goalos-agijobmanager-ascension/ |
| Guided first route | https://montrealai.github.io/goalos-agijobmanager-ascension/experience-concierge.html |
| Full public map | https://montrealai.github.io/goalos-agijobmanager-ascension/command-center.html |
| Boundary route | https://montrealai.github.io/goalos-agijobmanager-ascension/agialpha-token-boundary.html |

## Core repository docs

- [Getting started](GETTING_STARTED.md) — fastest path through the site and repo.
- [Architecture](ARCHITECTURE.md) — static site, data, schemas, tools, tests, workflow, and GitHub Pages.
- [Demo catalog](DEMO_CATALOG.md) — route-by-route catalog with safety posture.
- [Proof objects](PROOF_OBJECTS.md) — practical glossary for GoalOSCommit, ProofBundle-adjacent objects, receipts, and Chronicle entries.
- [Deployment Web UI](DEPLOYMENT_GITHUB_WEB_UI.md) — non-technical publication runbook.
- [Workflow autopilot](WORKFLOW_AUTOPILOT.md) — publisher inputs, safe defaults, and recovery.
- [Troubleshooting](TROUBLESHOOTING.md) — red historical runs, stale routes, browser cache, Pages permissions, and docs-link failures.
- [Release checklist](RELEASE_CHECKLIST.md) — pre-release review gates.
- [FAQ](FAQ.md) — non-technical answers.
- [GitHub settings guide](GITHUB_SETTINGS_GUIDE.md) — recommended repository settings that must be changed through GitHub UI.

## Boundary docs

- [Claim boundary](CLAIM_BOUNDARY.md) — what is claimed, not claimed, what would prove more, and what would falsify the project.
- [Security/privacy boundary](SECURITY_PRIVACY_BOUNDARY.md) — no user data wanted, no forms, no analytics, no cookies, and no public wallet calls.
- [AGIALPHA boundary](AGIALPHA_BOUNDARY.md) — official identity reference only; no offer, sale, custody, brokerage, recommendation, or availability from the site.
- [Third-party operator responsibility](THIRD_PARTY_OPERATOR_RESPONSIBILITY.md) — independent third-party surfaces remain outside the public demo authority.

## Verification

Run these dependency-free checks from the repository root:

```bash
node tools/docs-link-checker.mjs
node tests/documentation.test.mjs
python3 tools/verify.py
node tools/run-all-tests.mjs
python3 tools/build.py
```

The documentation checks intentionally fail on missing local links, unsupported affirmative claims, and unsafe sensitive-data language.
