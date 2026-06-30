# GitHub Web UI Deployment

1. Open the repository.
2. Click **Add file → Upload files**.
3. Upload the contents of the overlay, not the ZIP itself.
4. Commit to `main`.
5. Open **Actions**.
6. Run **GoalOS AGIJobManager Ascension Institutional Website Publisher v42**.
7. Keep `deploy_pages = true`.
8. Keep `commit_generated_source = true`.
9. Keep live factual checks false unless `ETHEREUM_RPC_URL` is configured.
10. Verify `dist/production-url.json` and the production pages.
11. Old red workflow runs are historical and cannot be edited.

