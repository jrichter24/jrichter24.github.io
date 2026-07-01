import { getRequestConfig } from 'next-intl/server';
import { defaultLocale, isLocale } from './routing';

// Static-export friendly: no middleware. The locale comes from the [locale]
// path segment; we validate it and load the matching catalog at build time.
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = isLocale(requested) ? requested : defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
