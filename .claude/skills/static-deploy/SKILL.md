---
name: static-deploy
description: Build the static export and deploy the site to GitHub Pages. Explicitly invoked only — run when the user asks to build or deploy.
disable-model-invocation: true
allowed-tools: Read, Bash
---

Build and ship the static site. Only runs when explicitly invoked. Confirm the
target and branch before pushing.

## next.config

```js
const nextConfig = {
  output: 'export',
  images: { unoptimized: true }, // required for static export
  // GitHub Pages *project* site (user.github.io/repo): set the repo path.
  // For a user/custom-domain site, leave basePath/assetPrefix unset.
  basePath: process.env.PAGES_BASE ?? '',
  assetPrefix: process.env.PAGES_BASE ?? '',
  trailingSlash: true, // stable static routing on Pages
};
```

## Build

```bash
npm ci
npm run build          # produces ./out (static)
touch out/.nojekyll    # stop GitHub stripping _next/*
```

## Checks before deploy

- `./out` exists and contains `de/` and `en/` trees + `404.html`.
- No `server`-only code slipped in (build would have failed on export).
- Internal links resolve under the chosen `basePath`.
- Defer the full a11y/perf/link audit to the `shipping-inspector` agent — run it
  first; deploy is the last step, not the gate.

## Deploy — GitHub Pages via Actions (preferred)

Commit a workflow that builds and publishes `./out` with
`actions/upload-pages-artifact` + `actions/deploy-pages` on push to `main`.
Set `PAGES_BASE` in the workflow if this is a project site.

## Deploy — manual fallback

```bash
npx gh-pages -d out -t   # -t includes dotfiles (.nojekyll)
```

## Custom domain

If a custom domain is used, add `out/CNAME` with the domain and leave
`basePath` empty.
