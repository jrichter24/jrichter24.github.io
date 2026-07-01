import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import LocaleToggle from './LocaleToggle';

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const base = `/${locale}`;

  const links = [
    { href: `${base}/#about`, label: t('about') },
    { href: `${base}/#work`, label: t('work') },
    { href: `${base}/#research`, label: t('research') },
    { href: `${base}/#projects`, label: t('projects') },
    { href: `${base}/misc`, label: t('misc') },
    { href: `${base}/#cv`, label: t('cv') },
    { href: `${base}/#contact`, label: t('contact') },
  ];

  return (
    <header className="border-b border-ink bg-paper">
      <a href="#content" className="skip-link font-mono text-sm">
        {t('skipToContent')}
      </a>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-4 sm:px-6">
        <Link href={`${base}/`} className="text-lg font-bold tracking-tight">
          {t('brand')}
        </Link>

        <nav aria-label={t('primaryAria')} className="order-3 w-full sm:order-2 sm:w-auto">
          <ul className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs uppercase tracking-wider">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="border-b-2 border-transparent pb-0.5 hover:border-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="order-2 sm:order-3">
          <LocaleToggle />
        </div>
      </div>
    </header>
  );
}
