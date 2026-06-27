# Pathspec-Proof Final Publisher v15

This release removes the last observed GitHub Actions failure class: fragile explicit `git add` pathspecs.

The publisher now commits generated source with `git add -A`, so deleted or absent optional files such as `npm-shrinkwrap.json`, `yarn.lock`, or `pnpm-lock.yaml` cannot fail the run.

The production workflow remains dependency-zero: no `npm ci`, no `npm install`, no registry fetch, no CDN fetch, and no runtime package installation. The Expert Console uses the committed `site/vendor/ethers.umd.min.js` file.

## Required posture

- public pages remain wallet-free;
- Expert Console is the only wallet-capable page;
- AGIALPHA token boundary remains explicit;
- Data-Zero / no-investment / no-advice / third-party responsibility pages remain published;
- Final Assurance, Legal Shield, Token Boundary, and Pathspec-Proof kernels pass before deployment.
