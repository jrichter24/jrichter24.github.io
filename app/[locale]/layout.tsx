import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { locales, isLocale, type Locale } from '@/i18n/routing';
import { siteConfig } from '@/site.config';
import { personLd } from '@/lib/structured-data';
import { JsonLd } from '@/components/JsonLd';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConsoleEasterEgg from '@/components/ConsoleEasterEgg';
import { fontVariables } from '@/app/fonts';
import '../globals.css';

// Static export: enumerate locales; reject anything else.
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: t('titleDefault'), template: t('titleTemplate') },
    description: t('description'),
    alternates: {
      canonical: `/${locale}/`,
      languages: { de: '/de/', en: '/en/', 'x-default': '/en/' },
    },
    openGraph: {
      type: 'website',
      locale,
      alternateLocale: locale === 'de' ? 'en' : 'de',
      url: `/${locale}/`,
      siteName: siteConfig.name,
      title: t('titleDefault'),
      description: t('description'),
      images: [
        {
          url: `${siteConfig.url}/og/home-${locale}.png`,
          width: 1200,
          height: 630,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('titleDefault'),
      description: t('description'),
      images: [`${siteConfig.url}/og/home-${locale}.png`],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale as Locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={fontVariables}>
      <body className="min-h-screen">
        {/* For whoever hits View Source. A real HTML comment survives to the static export. */}
        <div
          hidden
          dangerouslySetInnerHTML={{
            __html:
              '<!--\n  200 OK. You hit View Source. Respect.\n  Hand-built: Next.js (static export), Tailwind v4, next-intl. Squares only, no blur.\n  The whole map, curl-able: /llms.txt · say hi: github.com/jrichter24\n-->',
          }}
        />
        <JsonLd data={personLd(locale)} />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main id="content">{children}</main>
          <Footer />
        </NextIntlClientProvider>
        <ConsoleEasterEgg />
      </body>
    </html>
  );
}
