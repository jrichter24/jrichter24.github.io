# jens richter — personal website

Source for **https://jrichter24.github.io** — a bilingual (DE/EN), statically
exported personal site. Deliberately plain; secretly over-engineered.

Black, white, one blue, one red. Hard squares, almost no shadow. It looks basic
because looking basic is the hard part.

## // stack

Next.js (App Router, static export) · TypeScript · Tailwind CSS v4 · next-intl
(DE/EN). No server, no runtime — it builds to plain files and ships to GitHub
Pages.

## // .claude

This repo also carries the tooling that built it. `.claude/` holds a small set of
Claude Code **agents** and **skills**:

- `design-guardian` — enforces the visual rules (squares, no blur, four tokens).
- `i18n-sync` — keeps the German and English catalogs at exact parity.
- `voice-writer` / `post-composer` — write copy and posts in one consistent voice.
- `site-auditor` — holistic review + backlog.
- `shipping-inspector` — the release gate (a11y, performance, SEO/LLM).
- skills: `design-system`, `i18n-conventions`, `mdx-post`, `seo-llm`,
  `static-deploy`, and a `brand-voice` **template** (the real facts stay local).

They're part of what's open here. Reuse them.

## // use it as a template

The structure is MIT; the content is not. To make it yours:

1. Clone the repo.
2. Copy `.claude/skills/brand-voice/SKILL.example.md` to `SKILL.md` and fill in
   your own facts.
3. Replace the images, PDFs, and copy with your own.
4. Set `NEXT_PUBLIC_SITE_URL` to your domain.

See `NOTICE` for exactly what you may and may not reuse.

## // develop

```
npm install
npm run dev      # localhost:3000 — /en and /de
npm run build    # static export → ./out
```

Node 20+.

## // deploy

Pushing to `main` runs a GitHub Actions workflow that builds the static export
and publishes it to GitHub Pages (root user site). One-time: set the Pages source
to "GitHub Actions" in repo settings.

## // license

The website **structure** — source code, and the Claude Code agents and skill
scaffolding — is MIT. See `LICENSE`.

The **content** is not: the images, illustrations, portrait, PDFs, and
biographical copy are © Jens Richter, all rights reserved. See `NOTICE`.

Fork the structure. Bring your own everything else.

## // coffee

If this saved you an afternoon, you can put a coffee toward the next one:
https://ko-fi.com/A437HBY
