import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { locales, isLocale, defaultLocale } from '@/i18n/routing';
import { getAllPosts } from '@/lib/posts';
import WritingIndex from '@/components/writing/WritingIndex';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'writing' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: `/${locale}/writing/`,
      languages: { de: '/de/writing/', en: '/en/writing/', 'x-default': '/en/writing/' },
    },
    openGraph: {
      type: 'website',
      url: `/${locale}/writing/`,
      title: t('metaTitle'),
      description: t('metaDescription'),
    },
  };
}

export default async function WritingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = isLocale(locale) ? locale : defaultLocale;
  setRequestLocale(loc);
  const posts = getAllPosts(loc);
  return <WritingIndex posts={posts} locale={loc} />;
}
