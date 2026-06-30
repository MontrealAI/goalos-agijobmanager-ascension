# Troubleshooting

[Docs index](README.md)

## Red historical workflow runs remain visible

GitHub Actions logs are historical records. A red run cannot be edited into a green run. Fix source, rerun the current publisher workflow, and judge the latest run by its own logs.

## Missing route files

If a public route is referenced by a catalog but no matching file exists in `site/`, inspect `data/site-navigation-v41.json`, `data/site-navigation-catalog.json`, and `tools/site-rehydrate.mjs`. Restore the route from source when possible; do not delete catalog entries blindly.

## Missing kernel files

If a script references a missing kernel, inspect `package.json`, `tools/run-existing-kernels.mjs`, and the matching `tests/*.test.mjs` file. Repair only dependency-free repository-local files; do not add package registry dependencies.

## Stale workflow names

The current publisher workflow file is `.github/workflows/goalos-agijobmanager-ascension-production-url-autopilot.yml`. The human-readable workflow name is defined inside that YAML file and may be longer than the filename.

## GitHub Pages delay

A green workflow can still take a short time to appear on GitHub Pages. Verify the deployment URL from the workflow summary, then refresh the production route after the Pages deployment completes.

## Pages environment permissions

If deployment fails with a permissions or environment error, check repository Settings → Pages and Actions permissions. Recommended settings are documented in [GitHub settings guide](GITHUB_SETTINGS_GUIDE.md).

## Upload overlay contents, not ZIP

When using GitHub Web UI, open the overlay folder and upload the contained files/folders. Do not upload the ZIP archive itself unless the repository explicitly expects that archive.

## Browser cache

If production appears stale after a successful deploy, hard-refresh the route or open a private browsing window. Static assets may be cached by the browser.

## production-url.json inspection

After publication, inspect `production-url.json` in the generated site if present. It should point to `https://montrealai.github.io/goalos-agijobmanager-ascension/`.

## Menu stacking diagnosis

If two menus appear stacked, inspect shared shell assets before adding new navigation. Prefer updating the existing Site Command / Command Center catalog rather than adding another header.

## Docs link checker failures

Run `node tools/docs-link-checker.mjs`. Missing local links must be fixed. External links are warned but not fetched. Anchor warnings mean the target file exists but the exact heading was not deeply verified.
