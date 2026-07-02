import Link from 'next/link';
import type { CSSProperties } from 'react';
import { useLocale, useTranslations } from 'next-intl';

// Style toggle for the door ornament (preview): DENSE = full reference look
// (broken frame + ink corner ticks + dot marker + halftone dot-grid). Set to
// false for the lighter variant (frame + one corner tick only, no dots).
const DENSE = true;

// One schematic "door": an aria-hidden inline SVG draws the accent frame with
// broken corners plus sparse technical-drawing ornaments; the real localized
// label sits on top as text. Frame + dots use currentColor, ink ticks use
// --door-tick, so the single hover/focus rule in globals.css inverts every part.
function HeroDoor({
  href,
  ariaLabel,
  label,
  accent,
  position,
}: {
  href: string;
  ariaLabel: string;
  label: string;
  accent: string; // e.g. 'var(--color-red)'
  position: string; // lg absolute-anchor classes
}) {
  const grid = [];
  if (DENSE) {
    // small halftone dot-grid cluster, bottom-right, clear of the centered label
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 4; c++) {
        grid.push(
          <circle key={`g${r}-${c}`} cx={178 + c * 7} cy={46 + r * 7} r={1.3} fill="currentColor" />,
        );
      }
    }
  }

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      style={{ '--door-accent': accent } as CSSProperties}
      className={`hero-door w-[12rem] shrink-0 aspect-3/1 ${position}`}
    >
      <svg viewBox="0 0 216 72" fill="none" aria-hidden="true">
        {/* accent frame — four edges with broken/offset corners */}
        <g stroke="currentColor" strokeWidth={1} vectorEffect="non-scaling-stroke">
          <path d="M22 5 H188" />
          <path d="M211 12 V60" />
          <path d="M12 67 H200" />
          <path d="M5 22 V60" />
        </g>
        {/* ink L-bracket tick at the top-left corner */}
        <path
          d="M4 20 V4 H20"
          stroke="var(--door-tick)"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
        {DENSE && (
          <>
            {/* accent dot marker near the top-left */}
            <circle cx={34} cy={5} r={2} fill="currentColor" />
            {/* small filled ink square at the top-right corner */}
            <rect x={198} y={3} width={6} height={6} fill="var(--door-tick)" />
            {/* halftone dot-grid, bottom-right (opposite the marker) */}
            <g>{grid}</g>
          </>
        )}
      </svg>
      <span className="hero-door__label w-full whitespace-nowrap text-center font-mono text-sm font-bold uppercase tracking-[0.32em] indent-[0.32em]">
        {label}
      </span>
    </Link>
  );
}

// Positioning context is max-w-6xl — the SAME column every section uses — so the
// name/tagline left edge lines up with the content inset (not shifted further
// left). The portrait is centered at max-w-4xl inside it; the doors flank the
// image's left/right edges (calc(50% - half-image)). Below lg it all collapses
// to a stack: image, then name caption, then the door row.
export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const base = `/${locale}`;

  return (
    <section id="top" className="border-b border-ink bg-paper">
      <div className="relative mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:pb-36 lg:pt-16">
        {/* Whole image, uncropped, borderless, centered */}
        {/* eslint-disable-next-line @next/next/no-img-element -- single canonical asset (also OG/JSON-LD) */}
        <img
          src="/me_abstract_areas.webp"
          width={1448}
          height={1086}
          alt={t('imageAlt')}
          fetchPriority="high"
          decoding="async"
          className="mx-auto block h-auto w-full max-w-4xl"
        />

        {/* Name — caption below on mobile; overlay at the content inset on lg */}
        <div className="mt-6 lg:absolute lg:left-6 lg:top-[7%] lg:mt-0 lg:max-w-[20rem]">
          <p
            className="label-mono mb-3 inline-flex items-center gap-2 border border-ink px-2 py-1"
            aria-label={t('statusAria')}
          >
            <span aria-hidden className="inline-block h-2 w-2 bg-blue" />
            {t('status')}
          </p>
          <h1 className="text-[clamp(1.9rem,5vw,3.5rem)] font-bold uppercase leading-[0.9] tracking-tight">
            Dr. Jens
            <br />
            Richter
          </h1>
          <p className="mt-3 max-w-[24ch] text-[clamp(0.85rem,1.4vw,1.05rem)] leading-snug">
            {t('tagline')}
          </p>
        </div>

        {/* Doors — schematic frames. Row/stack beneath on mobile; flanking on lg.
            Positions unchanged: Projects left, Work right, About bottom-center. */}
        <nav
          aria-label={t('doorsNavAria')}
          className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center lg:mt-0 lg:block"
        >
          <HeroDoor
            href={`${base}/#projects`}
            ariaLabel={t('doors.projectsAria')}
            label={t('doors.projectsLabel')}
            accent="var(--color-red)"
            position="lg:absolute lg:left-[calc(50%_-_28rem)] lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2"
          />
          <HeroDoor
            href={`${base}/#work`}
            ariaLabel={t('doors.workAria')}
            label={t('doors.workLabel')}
            accent="var(--color-blue)"
            position="lg:absolute lg:right-[calc(50%_-_28rem)] lg:top-1/2 lg:translate-x-1/2 lg:-translate-y-1/2"
          />
          <HeroDoor
            href={`${base}/#about`}
            ariaLabel={t('doors.aboutAria')}
            label={t('doors.aboutLabel')}
            accent="var(--color-ink)"
            position="lg:absolute lg:bottom-6 lg:left-1/2 lg:-translate-x-1/2"
          />
        </nav>
      </div>
    </section>
  );
}
