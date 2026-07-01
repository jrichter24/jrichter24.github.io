import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { isLocale, defaultLocale } from '@/i18n/routing';
import { getPost, getPostMeta, getPostSlugs } from '@/lib/posts';
import { mdxComponents } from '@/components/mdx';
import { JsonLd } from '@/components/JsonLd';
import { articleLd, breadcrumbLd } from '@/lib/structured-data';
import { formatDate } from '@/lib/format';
import { siteConfig } from '@/site.config';

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const loc = isLocale(locale) ? locale : defaultLocale;
  const meta = getPostMeta(slug, loc);
  if (!meta) return {};
  return {
    title: meta.title,
    description: meta.summary,
    alternates: {
      canonical: `/${loc}/writing/${slug}/`,
      languages: {
        de: `/de/writing/${slug}/`,
        en: `/en/writing/${slug}/`,
        'x-default': `/en/writing/${slug}/`,
      },
    },
    openGraph: {
      type: 'article',
      url: `/${loc}/writing/${slug}/`,
      title: meta.title,
      description: meta.summary,
      publishedTime: meta.date,
      images: [
        {
          url: `${siteConfig.url}/og/${slug}-${loc}.png`,
          width: 1200,
          height: 630,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.summary,
      images: [`${siteConfig.url}/og/${slug}-${loc}.png`],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const loc = isLocale(locale) ? locale : defaultLocale;
  setRequestLocale(loc);

  const post = getPost(slug, loc);
  if (!post) notFound();

  const t = await getTranslations({ locale: loc, namespace: 'writing' });
  const tnav = await getTranslations({ locale: loc, namespace: 'nav' });
  const { content } = await compileMDX({ source: post.content, components: mdxComponents });

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <JsonLd data={articleLd(post.meta, loc)} />
      <JsonLd data={breadcrumbLd(post.meta, loc, { home: tnav('home'), writing: t('title') })} />

      <Link href={`/${loc}/writing`} className="label-mono text-ink/60 hover:text-blue">
        ← {t('backToList')}
      </Link>

      <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1 font-mono text-xs uppercase tracking-wider text-ink/60">
        <time dateTime={post.meta.date}>{formatDate(post.meta.date, loc)}</time>
        <span>{t(`types.${post.meta.type}`)}</span>
      </div>

      <div className="prose prose-neutral mt-4 max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-4xl prose-h1:uppercase prose-a:text-blue prose-a:underline prose-a:underline-offset-2 sm:prose-h1:text-5xl">
        {content}
      </div>

      {post.meta.tags.length > 0 && (
        <div className="mt-10 border-t border-ink pt-6">
          <p className="label-mono mb-3 text-ink/60">{t('tagsLabel')}</p>
          <ul className="flex flex-wrap gap-2">
            {post.meta.tags.map((tag) => (
              <li
                key={tag}
                className="border border-ink px-2.5 py-1 font-mono text-xs uppercase tracking-wide"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
