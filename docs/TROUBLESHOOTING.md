# Troubleshooting

## Tests fail with a missing helper

Run `npm run bootstrap`. If a workflow fails, restore the committed helper file named in the error message.

## Route count mismatch

Run `node tools/route-manifest-integrity.mjs`. Update `data/canonical-route-manifest.json`, source pages, generated `dist/`, and any docs that intentionally include a route count.

## Pages artifact missing files

Run `npm run build` and verify every manifest route exists in `dist/`.
