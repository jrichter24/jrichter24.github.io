---
name: mdx-post
description: The recipe for authoring a post (tutorial, essay, or project case study) as MDX in the /misc section — file layout, front-matter schema, components, image/alt, code blocks, OG images and RSS. Use when creating or editing a post.
allowed-tools: Read, Grep, Glob, Edit, Write
---

How posts are structured on this site. Follow the `design-system`, `brand-voice`,
and `i18n-conventions` skills for look, tone, and translation.

## Files

- One folder per post: `content/writing/<slug>/`.
- One MDX file per locale: `content/writing/<slug>/en.mdx`, `.../de.mdx`.
- Locale files are **parallel**: same headings, same image slots, same
  front-matter keys; only prose/captions differ.

## Front-matter (identical keys across locales)

```yaml
---
title: '…'
slug: '…' # same across locales
date: 2026-01-31 # ISO, same across locales
lang: en # matches the file
type: tutorial # tutorial | essay | case-study
tags: [next.js, i18n]
summary: '…' # 1–2 sentences, used in the index + meta description
cover: './cover.png' # optional; drives the OG image
draft: false
---
```

## Structure by type

- **tutorial:** promise → prerequisites → numbered steps (goal + code + expected
  result) → pitfalls → "what you built" → next steps.
- **essay:** concrete hook → turn → reflection → a landing that earns its point.
- **case-study:** problem/context → constraints → what I built → key decisions &
  trade-offs (the meat) → outcome (real numbers only) → links → what I'd change.

## Rules

- One `#` H1 = the title; headings in order; short paragraphs.
- **Every meaningful image** gets real descriptive `alt`; decorative → `alt=""`.
  Store images in the post folder; reference relatively.
- **Code blocks:** correct language tag, runnable, minimal, commented only where
  non-obvious. Verify versions/flags before publishing — don't trust memory.
- Use the site's MDX components (callout, figure, code) — never inline styles,
  never a rounded/shadowed card (design-system laws apply inside posts too).
- **Never fabricate** output, benchmarks, or metrics. Real or omitted.

## Per-post extras

- OG image generated per post/locale from `title` + `cover`.
- RSS feed per locale at `/<locale>/misc/rss.xml`, newest first, includes
  `title`, `summary`, `date`, canonical link.
- Index page lists posts newest-first with title + date + summary.
