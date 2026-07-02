import { useLocale, useTranslations } from 'next-intl';
import Section from '@/components/Section';
import TopicsColumns from '@/components/TopicsColumns';
import { JsonLd } from '@/components/JsonLd';
import { thesisLd } from '@/lib/structured-data';
import { siteConfig } from '@/site.config';
import type { Locale } from '@/i18n/routing';

export default function Research() {
  const t = useTranslations('research');
  const locale = useLocale() as Locale;
  const keywords = t.raw('keywords') as string[];

  return (
    <Section id="research" eyebrow={t('eyebrow')} title={t('title')} accent="blue">
      <JsonLd data={thesisLd(locale)} />
      <TopicsColumns label={t('keywordsLabel')} topics={keywords}>
        <div className="max-w-[68ch] space-y-6 text-lg leading-relaxed">
          <p className="font-mono text-sm uppercase tracking-wider text-ink/70">{t('lead')}</p>
          <p>{t('plain')}</p>

          <figure className="border-l-2 border-ink pl-4">
            <p className="label-mono mb-2 text-ink/60">{t('thesisLabelText')}</p>
            <blockquote className="text-base italic text-ink/90">
              &ldquo;{t('thesisTitle')}&rdquo;
            </blockquote>
          </figure>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={siteConfig.thesisRecord}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('recordAria')}
              className="label-mono inline-block border-2 border-blue px-4 py-2 text-blue hover:bg-blue hover:text-paper"
            >
              {t('recordLink')} ↗
            </a>
            <a
              href="/thesis.pdf"
              className="label-mono text-ink/70 underline decoration-1 underline-offset-4 hover:text-blue"
            >
              {t('thesisLink')} ↓
            </a>
          </div>
        </div>
      </TopicsColumns>
    </Section>
  );
}
