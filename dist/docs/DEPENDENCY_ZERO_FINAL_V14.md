# Dependency-Zero Final Publisher v14

This release removes the GitHub Actions failure class caused by package-manager registry access.

## Production rule

The publication workflow does not run a package manager. It does not install dependencies. It does not require a lockfile. It does not depend on any npm registry.

The Expert Mainnet Console uses the local vendored browser bundle:

```text
site/vendor/ethers.umd.min.js
```

The public website remains static, public-safe, data-zero, claim-bounded, and separated from the Expert Console.

## Required gates

- No package-lock registry lock-in.
- No `node_modules` requirement.
- No remote dependency install step.
- Vendored Expert Console library present.
- Public pages exclude wallet and transaction primitives.
- Expert Console contains gated wallet, network, approval, simulation, gas, and broadcast controls.
- AGIALPHA token boundary remains explicit: official checksum address, public-market third-party surfaces only, not available from MontrealAI or this website.
- Legal/Data-Zero posture remains explicit.

## Boundary

This release publishes a static website and verification surface. It does not custody funds, sell tokens, give investment advice, provide legal/tax/compliance advice, complete a third-party legal audit, guarantee factual correctness, or grant production authority.
