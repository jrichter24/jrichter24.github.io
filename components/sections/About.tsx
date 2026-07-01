import { useTranslations } from 'next-intl';
import Section from '@/components/Section';

export default function About() {
  const t = useTranslations('about');

  return (
    <Section id="about" eyebrow={t('eyebrow')} title={t('title')}>
      <div className="max-w-[68ch] space-y-6 text-lg leading-relaxed">
        <p className="sm:text-xl">{t('p1')}</p>
        <div>
          <p className="label-mono mb-1 text-ink/60">{t('nowLabel')}</p>
          <p>{t('now')}</p>
        </div>
        <div>
          <p className="label-mono mb-1 text-ink/60">{t('goalLabel')}</p>
          <p>{t('goal')}</p>
        </div>
      </div>
    </Section>
  );
}
