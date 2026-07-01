import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { siteConfig } from '@/site.config';

export default function Footer() {
  const t = useTranslations('footer');
  const tc = useTranslations('contact');
  const locale = useLocale();
  const year = new Date().getFullYear(); // resolved at build time

  return (
    <footer className="mt-24 border-t border-ink bg-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6">
        <p className="label-mono text-ink/70">{t('sourceNote')}</p>

        <p className="max-w-[60ch] text-lg">{t('joke')}</p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-wider">
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={tc('linkedinAria')}
            className="text-blue hover:underline"
          >
            {tc('linkedin')} ↗
          </a>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={tc('githubAria')}
            className="text-red hover:underline"
          >
            {tc('github')} ↗
          </a>
          <a href="/humans.txt" className="hover:underline">
            {t('humansLink')}
          </a>
          <a href="#top" className="ml-auto hover:underline">
            {t('backToTop')} ↑
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-ink pt-4 font-mono text-xs text-ink/60">
          <span>{t('rights', { year })}</span>
          <span>{t('meta', { year })}</span>
        </div>
      </div>
    </footer>
  );
}
