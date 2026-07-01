import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { Locale } from '@/i18n/routing';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'writing');

export type PostType = 'tutorial' | 'essay' | 'case-study';

export interface PostMeta {
  slug: string;
  title: string;
  date: string; // ISO YYYY-MM-DD
  lang: Locale;
  type: PostType;
  tags: string[];
  summary: string;
  cover?: string;
  draft: boolean;
}

function toIsoDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? '');
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

function readRaw(slug: string, locale: Locale): string | null {
  const fp = path.join(CONTENT_DIR, slug, `${locale}.mdx`);
  if (!fs.existsSync(fp)) return null;
  return fs.readFileSync(fp, 'utf8');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeMeta(slug: string, locale: Locale, data: Record<string, any>): PostMeta {
  return {
    slug: String(data.slug ?? slug),
    title: String(data.title ?? slug),
    date: toIsoDate(data.date),
    lang: (data.lang ?? locale) as Locale,
    type: (data.type ?? 'essay') as PostType,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    summary: String(data.summary ?? ''),
    cover: data.cover ? String(data.cover) : undefined,
    draft: Boolean(data.draft ?? false),
  };
}

export function getPostMeta(slug: string, locale: Locale): PostMeta | null {
  const raw = readRaw(slug, locale);
  if (!raw) return null;
  return normalizeMeta(slug, locale, matter(raw).data);
}

export function getPost(slug: string, locale: Locale): { meta: PostMeta; content: string } | null {
  const raw = readRaw(slug, locale);
  if (!raw) return null;
  const { data, content } = matter(raw);
  return { meta: normalizeMeta(slug, locale, data), content };
}

/** All non-draft posts for a locale, newest first. */
export function getAllPosts(locale: Locale): PostMeta[] {
  return getPostSlugs()
    .map((slug) => getPostMeta(slug, locale))
    .filter((m): m is PostMeta => !!m && !m.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
