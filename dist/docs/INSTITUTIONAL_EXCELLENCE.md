# Institutional Excellence Checklist

This checklist is the final public-readiness contract for the repository and GitHub Pages site. It is intentionally concise so reviewers can apply it before releases, route additions, and public communications.

## Public proof institution standard

Every public change should preserve these properties:

- **Coherent first impression:** the homepage, Care Command, Concierge, Command Center, Complete Route Index, legal boundary, privacy boundary, and route manifest should tell the same story.
- **Route continuity:** do not delete public pages, demos, archives, evidence rooms, or legal boundaries unless correctness, security, safety, or build integrity requires it. Deprecated surfaces must keep an archive path and catalog reference.
- **Proof before claims:** empirical, capability, AGI, ASI, audit, certification, market, ROI, legal, tax, financial, medical, or production claims must be bounded by an Evidence Docket, replay/falsification path, review status, and explicit public/private proof boundary.
- **Default-deny public web:** public pages must remain browser-local unless clearly documented otherwise. They must not add analytics, cookies, submitted forms, wallet connection, token approval, network switching, transaction broadcast, funds movement, private-key handling, user-data collection, or production authority.
- **Human authority:** public demos can explain, simulate, route, and export local receipts; they must not self-grant operational authority.
- **Accessibility and previews:** each new public page needs a meaningful title, description, canonical URL, social preview metadata, keyboard-readable structure, visible boundary language, and a non-blank initial state.
- **Release repeatability:** dependency-zero checks should remain runnable in GitHub Actions and locally with `npm test` and `npm run build`.

## Required review before publishing

1. Confirm the changed route appears in `data/canonical-route-manifest.json` or document why the manifest is unchanged.
2. Confirm the route is discoverable from the homepage, Command Center, Complete Route Index, Concierge, or a preserved archive/catalog path.
3. Confirm docs and release notes describe the user-facing change, safety boundary, and compatibility impact.
4. Run the relevant dependency-zero checks:

   ```bash
   npm test
   npm run build
   ```

5. Inspect generated `dist/` output for public pages, route manifests, metadata, and legal/privacy links before deployment.

## Communication standard

Public language should be understandable to non-technical visitors and rigorous for reviewers. Prefer concrete nouns: Mission Contract, Evidence Docket, ProofBundle, governed decision state, Action Graph, Chronicle entry, route manifest, and settlement receipt. Avoid implying investment advice, token availability, production certification, external audit, achieved AGI, or achieved ASI.

## Final docket

For release-level public readiness, use the [Final Institutional Excellence Docket](FINAL_INSTITUTIONAL_EXCELLENCE_DOCKET.md) as the consolidated reviewer assurance matrix and communication standard.
