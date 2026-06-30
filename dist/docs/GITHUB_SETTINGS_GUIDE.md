# GitHub Settings Guide

Codex cannot reliably change repository settings through code. This guide lists recommended GitHub UI settings for maintainers to review manually.

## About panel

Recommended description:

> GoalOS-native AGIJobManager Ascension: public-safe proof-settlement demos, Evidence Dockets, settlement lifecycle, claim boundaries, and autonomous GitHub Pages publication.

Recommended website:

<https://montrealai.github.io/goalos-agijobmanager-ascension/>

Recommended topics:

- `goalos`
- `agialpha`
- `agijobmanager`
- `proof-of-evolution`
- `evidence-docket`
- `proof-settlement`
- `governed-agents`
- `multi-agent-systems`
- `github-pages`
- `browser-local`
- `public-safe`
- `validator-gated`
- `proof-carrying-artifacts`
- `machine-work`

## Pages

- Source: GitHub Actions.
- Production URL: <https://montrealai.github.io/goalos-agijobmanager-ascension/>.
- Keep the publisher workflow name aligned with [docs/WORKFLOW_AUTOPILOT.md](WORKFLOW_AUTOPILOT.md).

## Actions permissions

- Allow GitHub Actions to run for this repository.
- Permit the publisher workflow to write generated source and deploy Pages when maintainers intentionally run it.
- Keep `ETHEREUM_RPC_URL` unset unless live factual checks are intentionally configured.

## Collaboration settings

- Enable Issues.
- Enable Discussions if maintainers want public Q&A separate from bug reports.
- Use the issue templates in `.github/ISSUE_TEMPLATE/`.
- Use the pull request template in `.github/PULL_REQUEST_TEMPLATE.md`.

## Security settings

- Enable Dependabot alerts if dependencies are introduced in the future.
- Enable code scanning if available.
- Require branch protection for `main` if compatible with the publisher workflow.
- Prefer human review before publication-affecting changes.

## Boundary reminder

These settings recommendations do not mean the settings have been changed. They also do not create production authority, legal advice, financial advice, token availability, external audit completion, production certification, or achieved AGI/ASI claims.
