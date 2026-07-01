import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getPostMeta, getPostSlugs } from '@/lib/posts';
import { locales, isLocale, defaultLocale } from '@/i18n/routing';
import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const dynamic = 'force-static';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
// Static export const (can't be per-locale) — keep it locale-neutral (brand).
export const alt = 'Dr. Jens Richter';

// Metadata image routes don't inherit the parent [locale] enumeration, so we
// enumerate the full locale × slug matrix here.
export function generateStaticParams() {
  const out: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const slug of getPostSlugs()) out.push({ locale, slug });
  }
  return out;
}

export default async function PostOpengraphImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const loc = isLocale(locale) ? locale : defaultLocale;
  const meta = getPostMeta(slug, loc);
  if (!meta) notFound();
  const t = await getTranslations({ locale: loc, namespace: 'writing' });
  return renderOgImage({
    eyebrow: `${t('title')} · Dr. Jens Richter`,
    title: meta.title,
    subtitle: meta.summary,
  });
}
