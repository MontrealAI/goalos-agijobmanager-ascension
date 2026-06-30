# Proof Objects

[Docs index](README.md)

GoalOS proof objects make autonomous work reviewable. They are not claims of production authority by themselves; they are structured artifacts that help reviewers ask whether a task was specified, executed, evaluated, replayed, selected, settled, rolled back, and chronicled.

## Object map

| Object | Practical meaning | Typical evidence | Boundary |
| --- | --- | --- | --- |
| GoalOSCommit | A source or mission-state commitment tied to a repository or objective. | commit hash, objective id, route/data/schema pointers | Does not prove task quality without evaluation. |
| RunCommitment | A commitment to one run configuration before results are known. | objective, budget, evaluator, seed/config summary | Avoids after-the-fact result selection. |
| ProofPacket | A compact package of evidence for one step or claim. | input summary, output summary, checks, hashes | Public packet should omit private prompts and customer data. |
| EvidenceDocket | A review room containing proof packets, attestations, receipts, and boundaries. | docket id, artifacts, validator notes, replay status | No Evidence Docket should include secrets. |
| EvalAttestation | A signed or structured evaluator statement about a result. | evaluator id, rubric, score, failure modes | Attestation is evidence, not an external audit claim. |
| SelectionCertificate | A record explaining why one artifact/version was selected. | candidates, criteria, selected id, rejected alternatives | Should remain reproducible and budget-aware. |
| RolloutReceipt | A record that a change was released under gates. | build id, checks, reviewer, production URL | Does not create production authority beyond the release process. |
| RollbackReceipt | A record that a release can be or was reverted. | prior state, trigger, rollback path, verification | Rollback must be tested, not merely asserted. |
| SettlementReceipt | A record that proof conditions were satisfied for settlement logic. | ProofBundle hash, validation result, settlement state | No ProofBundle, no settlement; no replay, no settlement. |
| ChronicleEntry | A durable learning record for future capability. | decision, evidence, result, follow-up | Chronicle entries should preserve claim boundaries. |
| ProofCarryingArtifactPassport | A portable card describing an artifact's proof status. | artifact id, provenance, checks, warnings | Passport is a review aid, not a certification. |

## Minimal examples

### EvidenceDocket

```json
{
  "type": "EvidenceDocket",
  "docketId": "public-demo-docket-001",
  "objective": "Demonstrate proof-settlement lifecycle in a browser-local route.",
  "proofPackets": ["proof-packet-001"],
  "boundaries": ["no wallet", "no user data wanted", "no analytics", "no cookies"],
  "replayStatus": "demo-replayable-from-repository-files"
}
```

### SettlementReceipt

```json
{
  "type": "SettlementReceipt",
  "receiptId": "settlement-demo-001",
  "proofBundleHash": "sha256:example-public-demo-hash",
  "validated": true,
  "settlementState": "demonstrated-not-executed-on-chain",
  "rule": "No ProofBundle, no settlement. No replay, no settlement."
}
```

### Proof-Carrying Artifact Passport

```json
{
  "type": "ProofCarryingArtifactPassport",
  "artifact": "site/proof-carrying-artifact-passport.html",
  "provenance": ["repository source", "static build", "documentation checks"],
  "publicSafe": true,
  "warnings": ["not an external audit", "not production certification"]
}
```

## Related schemas and data

- [`../schemas/evidence-docket.schema.json`](../schemas/evidence-docket.schema.json)
- [`../schemas/evidence-docket-composer.schema.json`](../schemas/evidence-docket-composer.schema.json)
- [`../schemas/proof-carrying-artifact-passport.schema.json`](../schemas/proof-carrying-artifact-passport.schema.json)
- [`../schemas/proof-settlement-lifecycle.schema.json`](../schemas/proof-settlement-lifecycle.schema.json)
- [`../data/evidence-docket-composer-demo.json`](../data/evidence-docket-composer-demo.json)
- [`../data/proof-settlement-lifecycle-demo.json`](../data/proof-settlement-lifecycle-demo.json)
- [`../data/proof-carrying-artifact-passport-demo.json`](../data/proof-carrying-artifact-passport-demo.json)

## Review rule

A proof object should answer: what was the objective, what evidence supports the result, how can it be replayed, what boundaries apply, what would trigger rollback, and what should be chronicled for future use?
