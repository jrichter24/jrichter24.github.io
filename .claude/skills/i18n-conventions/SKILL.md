---
name: i18n-conventions
description: How localization works on this site — next-intl, path-based /de and /en locales, messages file structure, key naming, and native-not-literal translation. Use when adding or translating any user-facing text, or reviewing locale parity.
allowed-tools: Read, Grep, Glob, Edit, Write
---

The site is bilingual (DE + EN) and built to add more locales cheaply.

## Stack & routing

- **next-intl** with the App Router. Locale is a path segment: `app/[locale]/…`
  → `/de/...` and `/en/...`. No locale is "default-hidden"; both are explicit paths.
- Static-export compatible: enumerate locales in `generateStaticParams`.
- Set `<html lang={locale}>` per locale. Localize `<title>` and meta per page.
- Language toggle in the header swaps the locale segment of the current path and
  persists the choice (cookie or localStorage) for next visit.

## Message files

- One catalog per locale: `messages/de.json`, `messages/en.json`.
- **No hard-coded user-facing text in components** — every string is a key.
  This includes `alt`, `aria-label`, `placeholder`, `title`.
- Keys are dot-namespaced by area: `hero.tagline`, `about.body`,
  `projects.toppt.summary`, `writing.index.title`.
- **Parity is mandatory:** both catalogs hold the exact same key set. Missing key
  in one locale = bug.
- Interpolation/ICU: same variables and plural categories must exist in both
  locales, e.g. `{count, plural, one {# post} other {# posts}}`.

## Translation philosophy

- Write each language **native-first**, not word-for-word. German should read as
  if a German wrote it.
- **Re-land jokes and idioms**, don't translate them flat. If a pun only works
  in one language, write a different line of equal spirit in the other.
- Keep code, commands, and proper nouns identical across locales; translate only
  prose and captions.
- Tone register: friendly-professional, consistent. Prefer neutral,
  non-addressing phrasing; if addressing the reader is unavoidable, keep one
  consistent form throughout.

## Adding a locale later

Add the locale code to the locale list + `generateStaticParams`, create
`messages/<code>.json` with the full key set, add it to the toggle. Nothing else
should need to change.
