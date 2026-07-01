import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { locales, isLocale, defaultLocale } from '@/i18n/routing';
import { getAllPosts } from '@/lib/posts';
import WritingIndex from '@/components/writing/WritingIndex';
import { siteConfig } from '@/site.config';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'misc' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: `/${locale}/misc/`,
      languages: { de: '/de/misc/', en: '/en/misc/', 'x-default': '/en/misc/' },
    },
    openGraph: {
      type: 'website',
      url: `/${locale}/misc/`,
      title: t('metaTitle'),
      description: t('metaDescription'),
      images: [
        {
          url: `${siteConfig.url}/og/home-${locale}.png`,
          width: 1200,
          height: 630,
          type: 'image/png',
        },
      ],
    },
  };
}

export default async function MiscPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = isLocale(locale) ? locale : defaultLocale;
  setRequestLocale(loc);
  const posts = getAllPosts(loc);
  return <WritingIndex posts={posts} locale={loc} />;
}
