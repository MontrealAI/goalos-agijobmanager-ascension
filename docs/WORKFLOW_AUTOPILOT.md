# Workflow Autopilot

[Docs index](README.md)

## What it does

The publisher rehydrates missing public routes, runs verification, builds `dist/`, optionally commits generated source, and deploys GitHub Pages.

## What it never does

It does not install registry packages, collect user data, connect wallets, approve tokens, broadcast transactions, or move funds.

## Inputs

| Input | Safe default | Use |
| --- | --- | --- |
| `deploy_pages` | `true` | Publish to GitHub Pages. |
| `commit_generated_source` | `true` | Commit generated artifacts. |
| `run_live_factual_check` | `false` | Only enable with `ETHEREUM_RPC_URL`. |
| `strict_live_factual_check` | `false` | Only for configured operators. |

## Troubleshooting

Run `node tools/workflow-reference-auditor.mjs`, check Pages permissions, then rerun the workflow.
