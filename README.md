# jens.dev

Personal site for **Dr. Jens Richter** — _A Physicist in Mind, Developer by
Heart, Engineer by Passion._

Concept: **deliberately plain, secretly over-engineered.** A page that looks like
a busy person threw a document online, that quietly signals a real engineer built
it — perfect semantic HTML, bilingual, statically exported, ~100 Lighthouse.

## Stack

- **Next.js** (App Router) + **TypeScript**, statically exported (`output: 'export'`) — no server runtime.
- **Tailwind CSS v4**, CSS-first (design system in [`app/globals.css`](app/globals.css) via `@theme`; no `tailwind.config.js`).
- **next-intl** — path-based locales (`/de`, `/en`), full DE + EN parity.
- **MDX** posts (`next-mdx-remote`) for `/writing`, with per-locale RSS and per-post OG images.
- Structured data (JSON-LD), `sitemap.ts`, `robots.ts`, `llms.txt` for SEO + answer engines.

Requires **Node 20+**.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000/en  (and /de)
```

The root `/` is a language splash; in dev, open `/en` or `/de` directly.

## Build (static export)

```bash
npm run build      # emits ./out — fully static
```

Preview the export with any static server, e.g.:

```bash
npx serve out
```

## Deploy

This repo auto-deploys to **GitHub Pages** as a user site served at the root —
`https://jrichter24.github.io/` — via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
on every push to `main` (it builds, `touch out/.nojekyll`, and publishes `./out`).

`./out` is also plain static files — drop it on any bucket, Vercel (static), or
Netlify. A `.nojekyll` file is included so hosts serve `_next/`.

> OG images are emitted by Next as extension-less files (e.g. `out/en/opengraph-image`,
> valid PNG bytes). Vercel/Next and most CDNs serve these as `image/png`; on a bare
> bucket you may need a MIME rule mapping those paths to `image/png`.

Two build-time environment variables:

| Variable                | When to set it                                                    | Example            |
| ----------------------- | ----------------------------------------------------------------- | ------------------ |
| `NEXT_PUBLIC_SITE_URL`  | Production origin (canonical URLs, OG, sitemap, JSON-LD).         | `https://jrichter24.github.io` |
| `NEXT_PUBLIC_BASE_PATH` | Only for a GitHub Pages **project** site served under a sub-path. | `/my-repo`         |

```bash
# GitHub Pages project site example:
NEXT_PUBLIC_SITE_URL=https://user.github.io/my-repo NEXT_PUBLIC_BASE_PATH=/my-repo npm run build
```

> The default site URL is `https://jrichter24.github.io` (the Pages workflow sets `NEXT_PUBLIC_SITE_URL` explicitly). Override it only to deploy under a different origin.

## Project structure

```
app/[locale]/            # localized routes (layout owns <html lang>, header, footer, JSON-LD)
  page.tsx               # home: hero + all sections
  writing/               # posts index, [slug] post, rss.xml, per-post OG image
  opengraph-image.tsx    # default OG image
app/not-found.tsx        # bilingual custom 404  → out/404.html
app/sitemap.ts, robots.ts
components/               # Header, Footer, Hero, Section, sections/*, mdx/*, writing/*
content/writing/<slug>/  # en.mdx + de.mdx per post
messages/{de,en}.json    # every user-facing string; 1:1 key parity
i18n/                    # locale list + next-intl request config
lib/                     # posts, structured-data, og-image, format
public/                  # hero assets, PDFs, humans.txt, llms.txt, cv.txt, index.html splash
```

## Conventions (see `CLAUDE.md` and the `.claude/skills`)

- **Design laws:** square corners only, no blur shadows on UI, four color tokens
  (`--paper`, `--ink`, `--blue` = work, `--red` = personal projects).
- **i18n:** every user-facing string is a next-intl key; DE + EN keep 1:1 parity.
- **Facts:** never invented — sourced from the `brand-voice` skill or flagged `TODO`.

## Add a blog post

1. `content/writing/<slug>/en.mdx` and `.../de.mdx` (parallel front-matter — see the `mdx-post` skill).
2. Set `draft: false`. It appears in the index, RSS, sitemap, and gets an OG image automatically.

## Add a locale

Add the code to [`i18n/routing.ts`](i18n/routing.ts), create `messages/<code>.json`
with the full key set, and add it to the language toggle. Nothing else changes.

## Regenerate hero assets

```bash
node scripts/optimize-hero.mjs temp_assets/me_abstract_areas.png
```
