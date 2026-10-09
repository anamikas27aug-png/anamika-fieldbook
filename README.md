# Anamika Singh · analyst fieldbook

Responsive portfolio with ScrollCraft, a transforming sample-data notebook, three project stories, locally saved fieldnotes and conversation exports. Photography and profile-based copy are preserved; project diagrams are explanatory sketches.

## Publish

This public repository uses free GitHub Pages. Under **Settings → Pages → Build and deployment**, select **GitHub Actions**. Push to `main`, or run **Publish portfolio to GitHub Pages** manually from Actions. The workflow publishes only `dist/`.

The website uses relative URLs and supports a GitHub project subpath without changing assets or routes. No backend, contact form, external fonts or telemetry is required. The source and Pages website are public.

## Edit and verify

Edit `dist/`. Run `node scripts/check-static.mjs` and `node --check dist/assets/fieldbook.js`. Serve `dist/` with a static server for visual checks. See BUILD-NOTES.md, SCROLL-DIRECTION.md, FINGERPRINT-COMPARISON.md and VERIFICATION.md for implementation and evidence limits.

No physical iPhone/Android verification is claimed. The no-index `device-diag.html` provides local-only device motion evidence.
