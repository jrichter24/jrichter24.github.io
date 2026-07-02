import { siteConfig } from '@/site.config';
import type { Locale } from '@/i18n/routing';
import type { PostMeta } from '@/lib/posts';

// JSON-LD builders. Facts here MUST match the visible content and the
// brand-voice skill — schema drift erodes trust. Never invent fields.

const jobTitle: Record<Locale, string> = {
  en: 'CEO',
  de: 'CEO',
};

const description: Record<Locale, string> = {
  en: 'CEO of DNA Evolutions and a hands-on engineer. Builds JOpt, a Java route-optimization engine. PhD in silicon photonics, RWTH Aachen.',
  de: 'CEO von DNA Evolutions und Ingenieur mit den Händen im Code. Baut JOpt, eine Java-Engine zur Routenoptimierung. Promotion in Silizium-Photonik, RWTH Aachen.',
};

/** The anchor entity for the whole site. Rendered in the root layout. */
export function personLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteConfig.url}/#person`,
    name: 'Dr. Jens Richter',
    givenName: 'Jens',
    familyName: 'Richter',
    honorificPrefix: 'Dr.-Ing.',
    honorificSuffix: 'PhD',
    jobTitle: jobTitle[locale],
    description: description[locale],
    url: `${siteConfig.url}/${locale}/`,
    image: `${siteConfig.url}/me_abstract_areas.jpg`,
    worksFor: {
      '@type': 'Organization',
      name: siteConfig.employer,
      url: siteConfig.employerUrl,
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: siteConfig.university,
    },
    knowsAbout: [
      'route optimization',
      'operations research',
      'vehicle routing problem',
      'Java',
      'Spring WebFlux',
      'silicon photonics',
      'ultra-high-Q microresonators',
      'optical frequency combs',
      'quantum computing',
    ],
    sameAs: [siteConfig.linkedin, siteConfig.github, siteConfig.gitlab, siteConfig.researchgate],
  };
}

/** The doctoral thesis as a citable work. Rendered in the Research section;
 *  sameAs points at the official RWTH Aachen record. */
export function thesisLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Thesis',
    name: 'Ultra-high-Q inverted silica microtoroid resonators monolithically integrated into a silicon photonics platform',
    inSupportOf: 'Dr.-Ing.',
    datePublished: '2018',
    inLanguage: 'en',
    author: { '@id': `${siteConfig.url}/#person` },
    publisher: { '@type': 'CollegeOrUniversity', name: siteConfig.university },
    url: siteConfig.thesisRecord,
    sameAs: siteConfig.thesisRecord,
    about: ['silicon photonics', 'ultra-high-Q microresonators', 'optical frequency combs'],
    isPartOf: { '@id': `${siteConfig.url}/${locale}/#research` },
  };
}

/** Projects. jonas-barney.com is a self-published book; toPPT, JonasBarneyPaint
 *  and moldqueen are code (SoftwareSourceCode). */
export function projectsLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareSourceCode',
        name: 'toPPT',
        description:
          'A MATLAB-to-PowerPoint generator: turns MATLAB figures and results into PowerPoint slides.',
        codeRepository: siteConfig.projects.toppt,
        programmingLanguage: 'MATLAB',
        author: { '@id': `${siteConfig.url}/#person` },
      },
      {
        '@type': 'Book',
        name: 'jonas-barney.com',
        description:
          "A self-published children's coloring book featuring Jonas and the dog Barney.",
        url: siteConfig.projects.jonasBarney,
        author: { '@id': `${siteConfig.url}/#person` },
      },
      {
        '@type': 'SoftwareSourceCode',
        name: 'JonasBarneyPaint',
        description:
          'A browser paint studio to bring the Jonas & Barney pages to life on screen, or paint anything.',
        url: siteConfig.projects.jonasBarneyPaint,
        codeRepository: siteConfig.projects.jonasBarneyPaintSource,
        author: { '@id': `${siteConfig.url}/#person` },
      },
      {
        '@type': 'SoftwareSourceCode',
        name: 'moldqueen',
        description: 'Control building-block RC toys through one clean API.',
        url: siteConfig.projects.moldqueenSite,
        codeRepository: siteConfig.projects.moldqueen,
        author: { '@id': `${siteConfig.url}/#person` },
      },
      {
        '@type': 'SoftwareSourceCode',
        name: 'jrichter24.github.io',
        description:
          locale === 'de' ? 'Der Quellcode dieser Seite.' : 'The source code of this site.',
        inLanguage: locale,
        codeRepository: siteConfig.projects.siteRepo,
        author: { '@id': `${siteConfig.url}/#person` },
      },
    ],
  };
}

/** WebSite entity — rendered on the home page. */
export function websiteLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: `${siteConfig.url}/${locale}/`,
    inLanguage: locale,
    author: { '@id': `${siteConfig.url}/#person` },
  };
}

/** Article / TechArticle for a post. */
export function articleLd(meta: PostMeta, locale: Locale) {
  const url = `${siteConfig.url}/${locale}/misc/${meta.slug}/`;
  return {
    '@context': 'https://schema.org',
    '@type': meta.type === 'tutorial' ? 'TechArticle' : 'Article',
    headline: meta.title,
    description: meta.summary,
    datePublished: meta.date,
    dateModified: meta.date,
    inLanguage: locale,
    keywords: meta.tags.join(', '),
    author: { '@id': `${siteConfig.url}/#person` },
    publisher: { '@id': `${siteConfig.url}/#person` },
    mainEntityOfPage: url,
    url,
  };
}

/** BreadcrumbList for a post page. */
export function breadcrumbLd(
  meta: PostMeta,
  locale: Locale,
  labels: { home: string; misc: string },
) {
  const item = (position: number, name: string, path: string) => ({
    '@type': 'ListItem',
    position,
    name,
    item: `${siteConfig.url}${path}`,
  });
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      item(1, labels.home, `/${locale}/`),
      item(2, labels.misc, `/${locale}/misc/`),
      item(3, meta.title, `/${locale}/misc/${meta.slug}/`),
    ],
  };
}
