import type { Metadata } from 'next';
import Link from 'next/link';
import en from '@/messages/en.json';
import de from '@/messages/de.json';
import { fontVariables } from '@/app/fonts';
import './globals.css';

// Global 404 → out/404.html. It lives outside the [locale] tree, so the locale
// shell can't apply (no locale matched) — it renders its own <html>/<body>. The
// pass-through root layout (app/layout.tsx) exists only to satisfy Next's rule
// that a root not-found has a root layout. Critical styles are inlined so the
// page holds up even if the stylesheet link is dropped, and copy comes from the
// message catalogs so DE/EN parity holds.
export const metadata: Metadata = {
  title: '404 · Nicht gefunden / Not Found · Dr. Jens Richter',
  robots: { index: false, follow: false },
};

const css = `
  .nf-wrap {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2.5rem;
    max-width: 48rem;
    margin: 0 auto;
    padding: 4rem 1.5rem;
    background: #f5f6f6;
    color: #000;
    font-family: var(--font-space-grotesk, ui-sans-serif), system-ui, "Helvetica Neue", Arial, sans-serif;
  }
  .nf-eyebrow {
    font-family: var(--font-jetbrains-mono, ui-monospace), monospace;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 0.8125rem;
    color: #e0001b;
    margin: 0;
  }
  .nf-h { font-weight: 700; text-transform: uppercase; line-height: 1.05; margin: 0; letter-spacing: -0.01em; }
  .nf-h1 { font-size: clamp(1.75rem, 5vw, 2.5rem); }
  .nf-h2 { font-size: clamp(1.5rem, 4vw, 2rem); }
  .nf-p { font-size: 1.125rem; max-width: 55ch; margin: 0.75rem 0 0; }
  .nf-hr { border: 0; border-top: 1px solid #000; width: 100%; }
  .nf-link {
    display: inline-block;
    margin-top: 1.25rem;
    border: 2px solid #000;
    padding: 0.5rem 1rem;
    font-family: var(--font-jetbrains-mono, ui-monospace), monospace;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-size: 0.8125rem;
    color: #000;
    text-decoration: none;
  }
  .nf-link:hover { background: #000; color: #f5f6f6; }
`;

export default function NotFound() {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <style dangerouslySetInnerHTML={{ __html: css }} />
        <main className="nf-wrap">
          <p className="nf-eyebrow">{en.notFound.status}</p>

          <section lang="en">
            <h1 className="nf-h nf-h1">{en.notFound.title}</h1>
            <p className="nf-p">{en.notFound.body}</p>
            <Link className="nf-link" href="/en/">
              {en.notFound.homeLink} →
            </Link>
          </section>

          <hr className="nf-hr" />

          <section lang="de">
            <h2 className="nf-h nf-h2">{de.notFound.title}</h2>
            <p className="nf-p">{de.notFound.body}</p>
            <Link className="nf-link" href="/de/">
              {de.notFound.homeLink} →
            </Link>
          </section>
        </main>
      </body>
    </html>
  );
}
