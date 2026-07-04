import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import Section from '@/components/Section';

// Homepage doorway to the Misc. index: a teaser, not the post list. Tri-color
// keyline (red/blue/ink) because Misc. holds all three post kinds rather than one
// accent. Reuses the index eyebrow/title/intro so the two stay consistent.
export default function Misc() {
  const t = useTranslations('misc');
  const locale = useLocale();

  return (
    <Section id="misc" eyebrow={t('eyebrow')} title={t('title')} bars={['red', 'blue', 'ink']}>
      <p className="mb-6 max-w-[68ch] text-lg text-ink/80">{t('intro')}</p>
      <Link
        href={`/${locale}/misc/`}
        className="label-mono inline-block border-2 border-ink px-4 py-2 hover:bg-ink hover:text-paper"
      >
        {t('backToList')}
      </Link>
    </Section>
  );
}
