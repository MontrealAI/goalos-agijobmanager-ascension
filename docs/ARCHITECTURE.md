# Architecture

[Docs index](README.md) · [Getting started](GETTING_STARTED.md) · [Architecture](ARCHITECTURE.md) · [Demo catalog](DEMO_CATALOG.md) · [Claim boundary](CLAIM_BOUNDARY.md) · [AGIALPHA boundary](AGIALPHA_BOUNDARY.md)

GoalOS AGIJobManager Ascension is a static, proof-bound public website with browser-local demonstrations, data contracts, schemas, dependency-free tools, tests, and a GitHub Actions publisher.

## System layers

| Layer | Role | Boundary |
| --- | --- | --- |
| Public website | Human-readable institutional front door in `site/` | No user data wanted; no public wallet calls. |
| Browser-local demos | Simulate proof rooms and receipts | Local demonstration only. |
| Data contracts | JSON demo inputs and route catalogs in `data/` | Reviewable source, not private intelligence. |
| Schemas | JSON schemas in `schemas/` | Shape proof artifacts and demos. |
| Tools | Build, verify, audit, rehydrate | Dependency-free Node/Python. |
| Tests | Public-safe checks in `tests/` | Prevent regressions and unsupported claims. |
| Publisher | GitHub Actions workflow | Human-review-compatible Pages deployment. |
| Expert-only pages | separated operator surfaces | Deliberate human authority required if wallet-capable. |

## Diagrams


```mermaid
flowchart LR
  O[Objective] --> M[Mission Contract]
  M --> W[Autonomous Work]
  W --> V[Verification]
  V --> E[Evidence Docket]
  E --> G[Governed Decision State]
  G --> A[Action Graph]
  A --> C[Chronicle]
  C --> R[Reusable Capability]
```

```mermaid
flowchart LR
  Req[Request] --> Esc[Escrow]
  Esc --> Exe[Execute]
  Exe --> Proof[ProofBundle]
  Proof --> Val[Validate]
  Val --> Settle[Settle]
  Settle --> Chron[Chronicle]
  Proof -. missing .-> Stop1[No ProofBundle, no settlement]
  Val -. unreplayable .-> Stop2[No replay, no settlement]
```

```mermaid
flowchart TB
  subgraph Public["Public proof surface"]
    P1[Commitment hashes]
    P2[Evidence Docket summary]
    P3[Attestations]
    P4[Selection / settlement receipts]
    P5[Claim boundaries]
  end
  subgraph Private["Private intelligence boundary"]
    X1[Private prompts]
    X2[Raw traces]
    X3[Customer data]
    X4[Confidential workpapers]
    X5[Private evaluator notes]
  end
  X1 --> H[Hashes / commitments]
  X2 --> H
  H --> Public
```

```mermaid
flowchart LR
  Source[Proof-aligned source] --> QA[Automation checks]
  QA --> Build[Static site build]
  Build --> Review[Human review]
  Review --> Pages[GitHub Pages]
  QA -. failure .-> Fix[Fix source, do not publish]
```

```mermaid
flowchart TB
  Home[Home] --> Concierge[Experience Concierge]
  Concierge --> Trust[Trust Equation]
  Concierge --> Evidence[Evidence Docket Composer]
  Concierge --> Settlement[Proof-Settlement Lifecycle]
  Concierge --> Mission[Until-DONE Mission Control]
  Concierge --> Router[Router Observatory]
  Concierge --> Passport[Artifact Passport]
  Concierge --> Legal[Legal / Token Boundary]
```

```mermaid
flowchart TB
  Repo[Repository] --> Site[site/ public pages]
  Repo --> Data[data/ demo contracts]
  Repo --> Schemas[schemas/ JSON schemas]
  Repo --> Tools[tools/ verification + build]
  Repo --> Tests[tests/ public-safe checks]
  Repo --> Docs[docs/ documentation]
  Repo --> Workflows[.github/workflows/ publisher]
  Tools --> Dist[dist/ generated site]
  Workflows --> Pages[GitHub Pages]
```

