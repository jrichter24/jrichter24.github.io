import { getTranslations } from 'next-intl/server';
import { locales } from '@/i18n/routing';
import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const dynamic = 'force-static';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Dr. Jens Richter';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });
  return renderOgImage({
    eyebrow: '200 OK',
    title: 'Dr. Jens Richter',
    subtitle: t('tagline'),
  });
}
