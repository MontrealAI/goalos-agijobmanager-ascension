# Proof Objects

| Object | Practical meaning |
|---|---|
| GoalOSCommit | Objective, constraints, and authority boundary for a mission. |
| RunCommitment | Immutable run identity and replay pointer. |
| ProofPacket | Small evidence unit. |
| ProofBundle | Replayable package of evidence, hashes, evaluator outputs, and receipts. |
| EvidenceDocket | Review-ready case file for a public claim. |
| EvalAttestation | Validator or test result statement. |
| SelectionCertificate | Why a route/model/action was selected. |
| RolloutReceipt | What changed, where, and under which gate. |
| RollbackReceipt | Recovery action and proof that rollback was available. |
| SettlementReceipt | Boundary-confirmed settlement record. |
| ChronicleEntry | Memory record for reuse and governance. |
| GovernedDecisionState | Decision, evidence, authority, rollback, and claim boundary together. |
| ActionGraph | Ordered action plan with gates. |
| ProofCarryingArtifactPassport | Artifact identity plus proof status and portability metadata. |

Example:

```json
{
  "type": "EvidenceDocket",
  "claim": "Demo route generated a public-safe receipt",
  "proofBundle": { "hash": "demo-hash", "replayable": true },
  "boundary": "public-safe browser-local demonstration"
}
```

No ProofBundle, no settlement. No replay, no settlement.

