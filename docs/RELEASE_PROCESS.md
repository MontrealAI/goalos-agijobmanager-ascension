# Release Process

1. Update source pages, docs, data contracts, schemas, tests, and route manifest.
2. Run `npm test`.
3. Run `npm run build`.
4. Commit source and generated artifacts when intentional.
5. Use the GitHub Actions publisher with `deploy_pages=true` and `commit_generated_source=true`.
6. Verify the production URL contract.
