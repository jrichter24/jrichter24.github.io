import type { MetadataRoute } from 'next';
import { siteConfig } from '@/site.config';

export const dynamic = 'force-static';

// AI answer engines are welcomed explicitly (alongside everyone else). llms.txt
// is advertised as a second Sitemap line per the seo-llm skill.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      {
        userAgent: [
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-Web',
          'PerplexityBot',
          'Google-Extended',
        ],
        allow: '/',
      },
    ],
    sitemap: [`${siteConfig.url}/sitemap.xml`, `${siteConfig.url}/llms.txt`],
    host: siteConfig.url,
  };
}
