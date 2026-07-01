---
name: design-system
description: The canonical visual spec for jens.dev — colors, the no-radius/no-shadow laws, type scale, spacing, and fonts. Use when building or reviewing any UI, component, CSS, Tailwind config, or embedded markup.
allowed-tools: Read, Grep, Glob
---

Single source of truth for the site's look. Brutalist, monochrome + one blue,
hard squares, near-zero shadow. If a choice isn't covered here, prefer the
plainer option.

## Color — four tokens (two meaning-bearing accents)

Tailwind v4, CSS-first. Tokens live in `@theme` in your global CSS — they become
both utilities (`bg-paper`, `text-blue`, `border-red`) and plain `:root` vars.

```css
@import 'tailwindcss';
@plugin "@tailwindcss/typography";

@theme {
  --color-paper: #f5f6f6; /* backgrounds — matches the hero art's own backdrop */
  --color-ink: #000000; /* text, borders, dividers */
  --color-blue: #1d2eff; /* ACCENT — work / professional */
  --color-red: #e0001b; /* ACCENT — personal / creative projects (AA on #F5F6F6) */

  /* kill rounding: every --radius-* utility resolves to 0 */
  --radius-xs: 0;
  --radius-sm: 0;
  --radius-md: 0;
  --radius-lg: 0;
  --radius-xl: 0;
  --radius-2xl: 0;
  --radius-3xl: 0;
}
```

- Blue and red are **semantic accents**: blue marks work (DNA Evolutions, JOpt,
  research), red marks personal/creative projects (toPPT, moldqueen). Don't use
  them interchangeably or decoratively.
- Accents are for links, one emphasized word, small markers, section keylines —
  never a large blue or red background fill. Black + white carry the page.
- No fifth color. Warm/family tones exist only inside raster imagery (the hero
  art), never as a UI token. No gradients on UI, no glass, no color tints.

## The laws (non-negotiable)

1. **Squares only.** `border-radius: 0` everywhere. The `--radius-*: 0` tokens
   above neutralize Tailwind's `rounded-*` utilities; also ship a hard reset for
   anything that sets radius directly:
   ```css
   *,
   *::before,
   *::after {
     border-radius: 0 !important;
   }
   ```
   Never use `rounded-*` classes; if one appears it's a violation.
2. **No blur.** No `box-shadow`/`filter: drop-shadow` with a blur radius, no
   glows. The only allowed "depth" is a hard, non-blurred offset:
   `box-shadow: 3px 3px 0 var(--ink);` — offset, blur 0, solid ink. (Raster
   images — the hero art, photos — are exempt; they may be rich and shaded. This
   rule binds CSS/UI only.)
3. **Borders do the structural work.** 1px `--ink` hairlines for dividers; 2px
   `--ink` for emphasized blocks. Thick, crisp, no softness.

## Type

- **Display:** a strong grotesk, bold, UPPERCASE, oversized hero word-stack.
  (System stack `Helvetica Neue, Arial, sans-serif` is fine; if self-hosting,
  something like Space Grotesk / Archivo.) Tight line-height (~0.95) on huge
  headings.
- **Body:** same sans, regular weight, ~1.5 line-height, plain.
- **Mono:** for the developer-flavored accents — labels, the `200 OK` flourish,
  code, `// TODO:` bits. (`ui-monospace, "SF Mono", "JetBrains Mono", monospace`.)
- Scale (rem): hero clamp(3, 10vw, 8); h2 2; h3 1.375; body 1; small 0.8125.
- Self-host or use system fonts — no render-blocking font CDNs.

## Layout & spacing

- Generous whitespace; let big type breathe. Content max-width ~72ch for prose.
- Spacing scale (rem): 0.5 / 1 / 2 / 4 / 8. Use consistently.
- Section dividers: 1px `--ink` full-bleed hairlines.
- No cards with rounded corners or shadows — separate blocks with borders and space.

## Do / don't

- DO: flat fills, hard edges, thick borders, mono accents, lots of air.
- DON'T: rounded anything, blur shadows, gradients, drop-shadow cards, a fourth
  color, tiny cramped type, decorative animation. Illustration = 1px black
  line-art only, if any.
