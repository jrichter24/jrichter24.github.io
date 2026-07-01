import { getTranslations } from 'next-intl/server';
import { locales, isLocale, defaultLocale } from '@/i18n/routing';
import { siteConfig } from '@/site.config';
import { getAllPosts } from '@/lib/posts';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function GET(_req: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = isLocale(locale) ? locale : defaultLocale;
  const t = await getTranslations({ locale: loc, namespace: 'misc' });
  const posts = getAllPosts(loc);
  const base = `${siteConfig.url}/${loc}/misc`;

  const items = posts
    .map((p) => {
      const link = `${base}/${p.slug}/`;
      const pubDate = p.date ? new Date(p.date).toUTCString() : '';
      return [
        '    <item>',
        `      <title>${esc(p.title)}</title>`,
        `      <link>${link}</link>`,
        `      <guid isPermaLink="true">${link}</guid>`,
        pubDate ? `      <pubDate>${pubDate}</pubDate>` : '',
        `      <description>${esc(p.summary)}</description>`,
        '    </item>',
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${esc(t('rssTitle'))}</title>
    <link>${base}/</link>
    <description>${esc(t('rssDescription'))}</description>
    <language>${loc}</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
