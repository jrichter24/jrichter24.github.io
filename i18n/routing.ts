// Single source of truth for locales. Adding a locale = add its code here,
// create messages/<code>.json with the full key set, done. (See i18n-conventions.)
export const locales = ['de', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}
