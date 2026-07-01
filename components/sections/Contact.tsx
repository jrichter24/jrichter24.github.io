import { useTranslations } from 'next-intl';
import Section from '@/components/Section';
import { siteConfig } from '@/site.config';

export default function Contact() {
  const t = useTranslations('contact');

  return (
    <Section id="contact" eyebrow={t('eyebrow')} title={t('title')}>
      <p className="mb-6 max-w-[68ch] text-lg text-ink/80">{t('lead')}</p>
      <div className="flex flex-wrap gap-4">
        <a
          href={siteConfig.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('linkedinAria')}
          className="label-mono border-2 border-blue px-5 py-3 text-blue hover:bg-blue hover:text-paper"
        >
          {t('linkedin')} ↗
        </a>
        <a
          href={siteConfig.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('githubAria')}
          className="label-mono border-2 border-red px-5 py-3 text-red hover:bg-red hover:text-paper"
        >
          {t('github')} ↗
        </a>
        <a
          href={siteConfig.researchgate}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('researchgateAria')}
          className="label-mono border-2 border-blue px-5 py-3 text-blue hover:bg-blue hover:text-paper"
        >
          {t('researchgate')} ↗
        </a>
      </div>
    </Section>
  );
}
