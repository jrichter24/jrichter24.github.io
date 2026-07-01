import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/routing';
import { siteConfig } from '@/site.config';
import { getPostSlugs, getPostMeta } from '@/lib/posts';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  const push = (pathFor: (l: string) => string, lastModified: Date, priority: number) => {
    const languages = Object.fromEntries(locales.map((l) => [l, `${siteConfig.url}${pathFor(l)}`]));
    for (const locale of locales) {
      entries.push({
        url: `${siteConfig.url}${pathFor(locale)}`,
        lastModified,
        changeFrequency: 'monthly',
        priority,
        alternates: { languages },
      });
    }
  };

  push((l) => `/${l}/`, now, 1);
  push((l) => `/${l}/misc/`, now, 0.7);

  for (const slug of getPostSlugs()) {
    const meta = getPostMeta(slug, locales[0]) ?? getPostMeta(slug, locales[1]);
    const date = meta?.date ? new Date(meta.date) : now;
    push((l) => `/${l}/misc/${slug}/`, date, 0.6);
  }

  return entries;
}
