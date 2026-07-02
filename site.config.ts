// Centralized, non-secret site facts. Keep in sync with the brand-voice skill.
export const siteConfig = {
  // Production origin — GitHub Pages user site, served at root. Used for canonical
  // URLs, OG images, sitemap and JSON-LD. Override at build with NEXT_PUBLIC_SITE_URL.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jrichter24.github.io').replace(/\/$/, ''),
  name: 'Dr. Jens Richter',
  shortName: 'Jens Richter',
  github: 'https://github.com/jrichter24',
  githubUser: 'jrichter24',
  gitlab: 'https://gitlab.com/jrichter24',
  linkedin: 'https://www.linkedin.com/in/li-jens-richter/',
  researchgate: 'https://www.researchgate.net/profile/Jens-Richter-3',
  employer: 'DNA Evolutions GmbH',
  employerUrl: 'https://www.dna-evolutions.com/',
  employerGithub: 'https://github.com/DNA-Evolutions',
  university: 'RWTH Aachen University',
  thesisRecord: 'https://publications.rwth-aachen.de/record/749969',
  projects: {
    toppt: 'https://github.com/jrichter24/toPPT',
    topptFileExchange: 'https://de.mathworks.com/matlabcentral/fileexchange/44851-jrichter24-toppt',
    jonasBarney: 'https://www.jonas-barney.com/',
    jonasBarneyPaint: 'https://paint.jonas-barney.com/',
    jonasBarneyPaintSource: 'https://github.com/jrichter24/miniPaint',
    moldqueen: 'https://github.com/jrichter24/moldqueen',
    moldqueenSite: 'https://jrichter24.github.io/moldqueen/',
    siteRepo: 'https://github.com/jrichter24/jrichter24.github.io',
  },
} as const;
