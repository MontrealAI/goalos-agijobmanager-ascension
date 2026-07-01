# GoalOS Loop Operating Room v47

The Loop Operating Room is a browser-local public demonstration of the GoalOS long-running agent pattern. It turns the idea of an agent loop into a proof-governed institution:

```text
objective -> loop contract -> separated roles -> bounded artifact -> evaluator score -> verifier gate -> restart / revise -> Evidence Docket -> Chronicle-ready state
```

## Why it exists

Long-running agent systems fail when state lives only inside a model context. GoalOS makes the loop a first-class object: contract, roles, traces, restarts, scores, gates, and receipts are written as inspectable state.

## What users can do

- choose a mission preset;
- run or advance the loop;
- inspect role separation;
- watch proof score and bottleneck change;
- read the append-only trace;
- download a local `LoopReceipt`;
- copy a review brief.

## Public-safe boundary

The page is a local demonstration. It does not collect user data, connect a wallet, approve tokens, switch networks, broadcast transactions, certify factual correctness, complete an external audit, move funds, or grant production authority.

## Protocol objects

| Object | Purpose |
|---|---|
| `LoopContract` | Objective, done criteria, budget, risk, rollback, and stop rule. |
| `RoleCharter` | Planner, generator, evaluator, verifier, and archivist obligations. |
| `TraceLedger` | Append-only cycle events and restarts. |
| `EvaluatorScore` | Function, craft, originality, safety, replay, evidence, and proof debt. |
| `RestartRecord` | A readable record of discarded branches and why the loop restarted. |
| `LoopReceipt` | Public-safe receipt for human review. |

## Claim boundary

This page demonstrates architecture and user experience. Strong empirical claims require real tasks, baselines, ProofBundles, replay logs, validator reports, cost/risk ledgers, delayed outcomes, and independent review.
