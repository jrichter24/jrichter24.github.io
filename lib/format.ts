import type { Locale } from '@/i18n/routing';

export function formatDate(iso: string, locale: Locale): string {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString(locale === 'de' ? 'de-DE' : 'en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return iso;
  }
}
