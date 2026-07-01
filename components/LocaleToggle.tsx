'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { locales, type Locale } from '@/i18n/routing';

// Swaps the locale segment of the current path and remembers the choice so the
// root splash (public/index.html) can honor it next time. Works without JS
// (it's a plain link); the onClick is progressive enhancement for persistence.
export default function LocaleToggle() {
  const pathname = usePathname();
  const current = useLocale();
  const t = useTranslations('nav');

  function pathFor(locale: Locale) {
    const segments = pathname.split('/'); // e.g. ['', 'en', 'misc', '']
    if (segments.length > 1) segments[1] = locale;
    return segments.join('/') || '/';
  }

  function remember(locale: Locale) {
    try {
      localStorage.setItem('locale', locale);
      document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=31536000;samesite=lax`;
    } catch {
      /* storage may be unavailable; the link still navigates */
    }
  }

  return (
    <div
      role="group"
      aria-label={t('languageGroupAria')}
      className="flex items-center border border-ink font-mono text-xs"
    >
      {locales.map((locale, i) => {
        const active = locale === current;
        return (
          <Link
            key={locale}
            href={pathFor(locale)}
            hrefLang={locale}
            aria-label={locale === 'de' ? t('toDeAria') : t('toEnAria')}
            aria-current={active ? 'true' : undefined}
            onClick={() => remember(locale)}
            className={`px-2 py-1 uppercase tracking-wider transition-colors ${
              i > 0 ? 'border-l border-ink' : ''
            } ${active ? 'bg-ink text-paper' : 'hover:bg-ink hover:text-paper'}`}
          >
            {locale}
          </Link>
        );
      })}
    </div>
  );
}
