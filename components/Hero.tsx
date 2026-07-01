import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

// Positioning context is max-w-6xl — the SAME column every section uses — so the
// name/tagline left edge lines up with the content inset (not shifted further
// left). The portrait is centered at max-w-4xl inside it; the square doors flank
// the image's left/right edges (calc(50% - half-image)). Below lg it all
// collapses to a stack: image, then name caption, then the door row.
export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const base = `/${locale}`;

  // Square 1:1 door on lg; in-flow button on mobile. Labels only (no arrows),
  // bigger + bold.
  const door =
    'inline-flex items-center justify-center border-2 border-ink bg-paper px-4 py-3 text-center font-mono text-sm font-bold uppercase tracking-wide transition-colors lg:h-28 lg:w-28 lg:px-2 lg:text-base';

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

        {/* Doors — row beneath on mobile; square + flanking on lg */}
        <nav
          aria-label={t('doorsNavAria')}
          className="mt-6 flex flex-wrap justify-center gap-3 lg:mt-0 lg:block"
        >
          <Link
            href={`${base}/#projects`}
            aria-label={t('doors.projectsAria')}
            className={`${door} text-red hover:bg-red hover:text-paper focus-visible:bg-red focus-visible:text-paper lg:absolute lg:left-[calc(50%_-_28rem)] lg:top-1/2 lg:-translate-x-[55%] lg:-translate-y-1/2`}
          >
            {t('doors.projectsLabel')}
          </Link>
          <Link
            href={`${base}/#work`}
            aria-label={t('doors.workAria')}
            className={`${door} text-blue hover:bg-blue hover:text-paper focus-visible:bg-blue focus-visible:text-paper lg:absolute lg:right-[calc(50%_-_28rem)] lg:top-1/2 lg:translate-x-[55%] lg:-translate-y-1/2`}
          >
            {t('doors.workLabel')}
          </Link>
          <Link
            href={`${base}/#about`}
            aria-label={t('doors.aboutAria')}
            className={`${door} hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper lg:absolute lg:bottom-6 lg:left-1/2 lg:-translate-x-1/2`}
          >
            {t('doors.aboutLabel')}
          </Link>
        </nav>
      </div>
    </section>
  );
}
