import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { PostMeta } from '@/lib/posts';
import type { Locale } from '@/i18n/routing';
import { formatDate } from '@/lib/format';
import AccentMarker from '@/components/misc/AccentMarker';

export default function MiscIndex({ posts, locale }: { posts: PostMeta[]; locale: Locale }) {
  const t = useTranslations('misc');

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <p className="label-mono mb-3 text-ink/60">{t('eyebrow')}</p>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-4xl font-bold uppercase tracking-tight sm:text-5xl">{t('title')}</h1>
        <a
          href={`/${locale}/misc/rss.xml`}
          className="label-mono border-2 border-ink px-3 py-2 hover:bg-ink hover:text-paper"
        >
          {t('rss')} ↗
        </a>
      </div>
      <p className="mt-6 max-w-[68ch] text-lg text-ink/80">{t('intro')}</p>

      {posts.length === 0 ? (
        <p className="label-mono mt-12 text-ink/60">{t('empty')}</p>
      ) : (
        <ul className="mt-12 divide-y divide-ink border-y border-ink">
          {posts.map((p) => (
            <li key={p.slug} className="py-6">
              <Link href={`/${locale}/misc/${p.slug}`} className="group block">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 font-mono text-xs uppercase tracking-wider text-ink/60">
                  <time dateTime={p.date}>{formatDate(p.date, locale)}</time>
                  <span>{t(`types.${p.type}`)}</span>
                </div>
                <h2 className="mt-2 text-2xl font-bold group-hover:text-blue">
                  <AccentMarker accent={p.accent} className="mr-2.5 h-3 w-3 align-middle" />
                  {p.title}
                </h2>
                <p className="mt-2 max-w-[68ch] text-ink/80">{p.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
