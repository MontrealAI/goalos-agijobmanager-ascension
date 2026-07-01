# Loop Contract Theatre v47

Loop Contract Theatre is a browser-local demonstration of long-running agent control. It shows why a serious agent system is not a single prompt: it is a restartable loop with a written contract, separated roles, trace reading, explicit scoring, harness reduction, and a moving bottleneck register.

## What it demonstrates

- Contract first: the loop defines DONE before the first work attempt.
- Role separation: planner, builder, evaluator, and trace reader do not grade themselves.
- Virtual disk state: `contract.json`, `progress.md`, and `log.md` are rendered in memory so the state is inspectable without browser storage.
- Restart safety: the loop can restart from compact state instead of hidden context.
- Trace reading: failure and progress appear as a readable trace.
- Harness deletion: the demo measures harness drag and makes shrinking obsolete scaffolding part of the loop.
- Bottleneck tracking: the page shows how the bottleneck moves from contract to evidence to verification to review.

## Public-safe boundary

The page is local-only. It has no account, no form, no wallet, no token approval, no network request, no analytics, no cookies, no browser storage, no transaction broadcast, no funds movement, and no production authority.

## Output artifact

The page exports a `LoopReceipt` JSON object that records the selected preset, iteration count, proof readiness, proof debt, harness drag, current bottleneck, virtual files, roles, public-safe posture, and trace.

## Why it matters

GoalOS turns a long-running agent loop into an institution by requiring every cycle to emit a proof object: objective → mission contract → bounded role loop → trace → verifier decision → Evidence Docket → governed decision state → Chronicle → reusable capability.
