# jens.dev — project memory

Personal site for Dr. Jens Richter. Static **Next.js** (App Router, `output: 'export'`),
**TypeScript**, **Tailwind v4** (CSS-first, no `tailwind.config.js`), **next-intl** (DE + EN).
Concept: _deliberately plain, secretly over-engineered._

## Design laws (never break)

- **Square corners only** — `border-radius: 0` everywhere. Never use `rounded-*`.
- **No blur** — no blur shadows/glows on UI. The only depth is a hard offset:
  `box-shadow: 3px 3px 0 var(--ink)`. (Raster images may be rich/shaded — CSS/UI only.)
- **Four tokens only:** `--paper` `#FFFFFF`, `--ink` `#000000`, `--blue` = **work /
  professional**, `--red` = **personal / creative projects**. Blue & red are
  _meaning-bearing accents_ (links, one emphasized word, small markers, keylines) —
  never large fills, no gradients, no fifth color.

## Copy & i18n

- Every user-facing string (incl. `alt`, `aria-label`, `title`, `placeholder`) is a
  next-intl key in `messages/de.json` + `messages/en.json`. **No hard-coded copy.**
- DE + EN keep **1:1 key parity**. German is written native-first, not translated flat.

## Facts

- **Never invent facts about Jens.** The `brand-voice` skill is the source of truth;
  if a fact is missing, write `TODO` and flag it — do not guess.

## Skills & agents

- Skills: `design-system`, `brand-voice`, `i18n-conventions`, `seo-llm`, `mdx-post`,
  `static-deploy`. Agents: `design-guardian`, `i18n-sync`, `voice-writer`,
  `post-composer`, `shipping-inspector`, `site-auditor`.
- Load the relevant skill before working an area; run the matching agent before
  committing changes that touch its domain.
