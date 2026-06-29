# Proof Objects

[Docs index](README.md)

| Object | Plain-language meaning | Typical fields |
| --- | --- | --- |
| GoalOSCommit | A commitment to an objective, boundary, and proof path. | `objective`, `claimBoundary`, `createdAt` |
| RunCommitment | A run-specific promise to execute under stated gates. | `runId`, `inputsHash`, `evaluatorSet` |
| ProofPacket | Evidence attached to one verification step. | `claim`, `method`, `result`, `artifactHash` |
| EvidenceDocket | Review-ready bundle of claims, evidence, limits, and receipts. | `claims`, `proofPackets`, `boundary` |
| SelectionCertificate | Why a route/model/action was selected. | `selection`, `alternatives`, `reason` |
| RolloutReceipt | What changed, why it passed, and how it can be watched. | `change`, `proofBundle`, `monitoring` |
| RollbackReceipt | How a failed change returned to safety. | `trigger`, `restoredState`, `evidence` |
| SettlementReceipt | Request → escrow → execute → proof → validate → settle summary. | `requestId`, `ProofBundle`, `validatorResult` |
| ChronicleEntry | Durable memory for future reuse. | `event`, `hash`, `lessons` |
| ProofCarryingArtifactPassport | Portable artifact identity plus proof summary. | `artifact`, `issuer`, `proofs` |

## Example

```json
{
  "type": "EvidenceDocket",
  "claim": "The demo produced a public-safe receipt.",
  "ProofBundle": { "replayable": true, "artifacts": [] },
  "boundary": "browser-local demonstration only"
}
```
