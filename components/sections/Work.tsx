import { useTranslations } from 'next-intl';
import Section from '@/components/Section';
import TopicsColumns from '@/components/TopicsColumns';
import { siteConfig } from '@/site.config';

export default function Work() {
  const t = useTranslations('work');
  const capabilities = t.raw('capabilities') as string[];

  return (
    <Section id="work" eyebrow={t('eyebrow')} title={t('title')} accent="blue">
      <TopicsColumns label={t('capabilitiesLabel')} topics={capabilities}>
        <div className="max-w-[68ch] space-y-5 text-lg leading-relaxed">
          <p className="text-xl">{t('lead')}</p>
          <p>{t('body')}</p>
          <p className="border-l-2 border-blue pl-4 text-ink/80">{t('aside')}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={siteConfig.employerUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('companyAria')}
              className="label-mono inline-block border-2 border-blue px-4 py-2 text-blue hover:bg-blue hover:text-paper"
            >
              {t('companyLink')} ↗
            </a>
            <a
              href={siteConfig.employerGithub}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('githubAria')}
              className="label-mono inline-block border-2 border-blue px-4 py-2 text-blue hover:bg-blue hover:text-paper"
            >
              {t('githubLabel')} ↗
            </a>
          </div>
        </div>
      </TopicsColumns>
    </Section>
  );
}
