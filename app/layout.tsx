import type { ReactNode } from 'react';

// The real <html>/<body> shell lives in `[locale]/layout.tsx` — it needs the
// matched locale for `lang=` and the next-intl provider. A root-level
// `not-found.tsx` is rendered OUTSIDE the [locale] tree, and Next.js requires a
// root layout to exist for it. This pass-through satisfies that requirement
// without emitting a second <html>: locale pages get their shell from
// [locale]/layout, and the 404 renders its own <html>/<body>.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
