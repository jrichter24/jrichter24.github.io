import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

// For GitHub Pages *project* sites (user.github.io/repo), set
// NEXT_PUBLIC_BASE_PATH=/repo at build time. Root domains / Vercel: leave unset.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig: NextConfig = {
  // Fully static export — no server runtime. Deploys to any bucket / Pages.
  output: 'export',
  // Emit /path/index.html so static hosts resolve clean URLs reliably.
  trailingSlash: true,
  // next/image has no optimizer in a static export.
  images: { unoptimized: true },
  // ESLint 9 defaults to flat config; eslint-config-next is mid-migration.
  // Type-checking still runs on every build; a flat lint config can be added later.
  eslint: { ignoreDuringBuilds: true },
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
};

export default withNextIntl(nextConfig);
