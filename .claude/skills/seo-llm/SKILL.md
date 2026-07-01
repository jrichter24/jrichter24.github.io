---
name: seo-llm
description: The SEO and LLM/GEO optimization recipe for the site — JSON-LD structured data, llms.txt, sitemap/robots, hreflang, per-page metadata, and content structured for AI extraction. Use when setting up head metadata, adding a page or post, or auditing discoverability.
allowed-tools: Read, Grep, Glob, Edit, Write
---

Make the site legible to Google, answer engines (Claude, Perplexity, ChatGPT,
AI Overviews), and autonomous agents — without changing how it looks. Static
export already ships full content + JSON-LD in the initial HTML, which is exactly
what AI crawlers need. Facts come from the `brand-voice` skill — never invent.

## JSON-LD structured data (highest-value signal)

Emit JSON-LD in `<head>` as a single clean block per page.

- **Site-wide `Person`** (in the root layout), the anchor entity:
  ```json
  {
    "@context": "https://schema.org", "@type": "Person",
    "name": "Dr. Jens Richter", "jobTitle": "CEO",
    "worksFor": {"@type":"Organization","name":"DNA Evolutions GmbH"},
    "alumniOf": {"@type":"CollegeOrUniversity","name":"RWTH Aachen University"},
    "knowsAbout": ["route optimization","silicon photonics","Java","operations research"],
    "sameAs": [
      "https://www.linkedin.com/in/li-jens-richter/",
      "https://github.com/jrichter24",
      "https://www.researchgate.net/profile/Jens-Richter-3"
    ]
  }
  ```
  Use `sameAs` to connect to authoritative profiles (LinkedIn, GitHub,
  ResearchGate) — entity linking is what AI uses to trust facts. On the Research
  page/thesis, add a `sameAs`/`citation` to the official record
  (https://publications.rwth-aachen.de/record/749969).
- **`WebSite`** on the home page.
- **`SoftwareSourceCode`** per project (toPPT, moldqueen) with `codeRepository`.
- **`TechArticle`** (tutorials) or **`Article`** (essays/case studies) per post,
  with `headline`, `description`, `datePublished`, `dateModified`, `author`
  (→ the Person), `inLanguage`, `keywords`. Add **`BreadcrumbList`** on post pages.
- Localize per locale; keep JSON-LD facts identical to visible content (schema
  drift erodes trust).

## Metadata (Next.js App Router Metadata API)

- Per-page `generateMetadata`: unique `title`, `description` (the post/section
  summary), `openGraph`, `twitter`.
- **hreflang:** `alternates.languages` mapping `de` and `en` (+ `x-default`).
- **Canonical:** set `alternates.canonical` per page.
- **OG images:** `opengraph-image.tsx` per route/post, on-brand (black/white +
  the accent), title text baked in.

## Crawl files (Next.js built-ins + root files)

- `app/sitemap.ts` — every locale URL, `lastModified`, sensible `priority`.
- `app/robots.ts` — allow the AI bots explicitly: `GPTBot`, `OAI-SearchBot`,
  `ClaudeBot`, `PerplexityBot`, `Google-Extended` (plus `*`). Reference the
  sitemap; add `llms.txt` as a second Sitemap line.
- **`public/llms.txt`** — curated markdown map: `# Dr. Jens Richter` → one-line
  summary → `## About` (2–3 sentences) → links to Work / Projects / Research /
  Writing → publisher + contact. Keep it lean (context-window friendly), don't
  dump everything. **`public/llms-full.txt`** — the fuller markdown (bio + each
  project + post summaries). Honest note: llms.txt is not a Google ranking
  factor, but it's cheap, favored by answer engines, and doubles as the
  `curl`-able version of the site.

## Content structured for extraction

- Discrete, scannable `H2`/`H3` sections; headings meaningful out of context.
- Strong first 2–3 sentences per page/post (read first by humans and models).
- Consistent tags; `dateModified` kept current; internal links between related
  posts (shared tags) + breadcrumbs.
- HTTPS, fast, mobile — covered by the 100-Lighthouse target.

## Boundaries

Don't fabricate schema fields, dates, or ratings. If a fact is missing, omit the
field or flag it — never guess. Keep JSON-LD in sync with on-page content.