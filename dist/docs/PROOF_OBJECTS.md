# Proof Objects

- GoalOSCommit: objective, scope, evaluator set, and authority boundary.
- RunCommitment: immutable run identity and inputs hash.
- ProofPacket: minimal local evidence unit.
- ProofBundle: replayable package required before settlement.
- EvidenceDocket: public-safe evidence room for a claim.
- EvalAttestation: evaluator statement with method and result.
- SelectionCertificate: gate result for propagation.
- RolloutReceipt: bounded release record.
- RollbackReceipt: recovery path record.
- SettlementReceipt: request, proof, validation, and settlement summary.
- ChronicleEntry: reusable institutional memory.
- ProofCarryingArtifactPassport: reusable capability identity and proof history.
- GovernedDecisionState: decision plus evidence, authority, rollback, and claim boundaries.
- ActionGraph: human-review-ready action structure.
- CapabilityPackage: reusable capability plus scope and validation metadata.

```json
{ "object": "EvidenceDocket", "claim": "public-safe demonstration", "proofBoundary": "hashes and summaries only" }
```


## Shared boundary

Public demos are browser-local and public-safe: no user data wanted, no forms, no analytics, no cookies, no localStorage/sessionStorage, no public wallet connection, no public token approval, no public network switching, no public transaction broadcast, no funds moved, and no production authority. This material is not legal, financial, investment, tax, medical, audit, safety-certification, or professional advice. It does not claim achieved AGI, achieved ASI, empirical SOTA, external audit completed, production certified, safe autonomy proven, guaranteed return, or investment opportunity.
