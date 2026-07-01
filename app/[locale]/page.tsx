import { setRequestLocale } from 'next-intl/server';
import { isLocale, defaultLocale } from '@/i18n/routing';
import { JsonLd } from '@/components/JsonLd';
import { websiteLd } from '@/lib/structured-data';
import Hero from '@/components/Hero';
import HomeSections from '@/components/HomeSections';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = isLocale(locale) ? locale : defaultLocale;
  setRequestLocale(loc);

  return (
    <>
      <JsonLd data={websiteLd(loc)} />
      <Hero />
      <HomeSections />
    </>
  );
}
