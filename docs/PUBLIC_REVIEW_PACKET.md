# Public Review Packet

This packet gives reviewers one stable, plain-language path through the public proof institution before publication or public review.

## One-minute reviewer path

1. Start at the production homepage and confirm the front door explains the public-safe proof-settlement story: <https://montrealai.github.io/goalos-agijobmanager-ascension/>.
2. Open `goalos-care-command.html` for the guided plain-language command surface.
3. Open `complete-route-index.html` to confirm every public page remains discoverable.
4. Open `legal.html`, `privacy.html`, and `agialpha-token-boundary.html` before interpreting any Mainnet or token identity reference.
5. Open `evidence-docket-composer.html` before relying on any strong empirical or capability claim.

## Machine-readable readiness packet

The release-readiness matrix is also captured in `data/public-proof-institution-readiness.json` and validated by `tools/public-proof-readiness-checker.mjs`.

The packet binds six institutional promises:

- visitor clarity;
- route continuity;
- public-safe default-deny posture;
- claim discipline;
- legal, privacy, and token boundaries;
- repeatable release checks.

## Required checks

Run these before public release handoff:

```bash
node tools/public-proof-readiness-checker.mjs
npm test
npm run build
```

The readiness checker confirms that every evidence file named in the packet exists, the canonical route count matches the canonical manifest, and the default public posture remains explicitly true.
