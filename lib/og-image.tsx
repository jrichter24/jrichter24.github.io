import { ImageResponse } from 'next/og';
import fs from 'node:fs';
import path from 'node:path';

// Fonts read once at build time (static export renders OG images at build).
// Static instances only — Satori chokes on variable fonts.
const fontsDir = path.join(process.cwd(), 'assets/fonts');
const groteskBold = fs.readFileSync(path.join(fontsDir, 'SpaceGrotesk-Bold.woff'));
const groteskRegular = fs.readFileSync(path.join(fontsDir, 'SpaceGrotesk-Regular.woff'));
const mono = fs.readFileSync(path.join(fontsDir, 'JetBrainsMono-Regular.ttf'));

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

// On-brand OG: paper (#F5F6F6) ground, thick ink frame, mono eyebrow, oversized
// title, the red+blue accent pair. No blur, no rounding — the laws hold here too.
export function renderOgImage({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#f5f6f6',
        color: '#000000',
        padding: 64,
        border: '16px solid #000000',
        fontFamily: 'Grotesk',
      }}
    >
      <div
        style={{
          display: 'flex',
          fontFamily: 'Mono',
          fontSize: 28,
          letterSpacing: 2,
          textTransform: 'uppercase',
        }}
      >
        {eyebrow}
      </div>

      <div
        style={{
          display: 'flex',
          fontSize: 82,
          fontWeight: 700,
          lineHeight: 1.02,
          textTransform: 'uppercase',
          maxWidth: 1000,
        }}
      >
        {title}
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', fontSize: 30, fontWeight: 400, maxWidth: 820 }}>
          {subtitle}
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ width: 28, height: 28, background: '#e0001b' }} />
          <div style={{ width: 28, height: 28, background: '#1d2eff', marginLeft: 8 }} />
        </div>
      </div>
    </div>,
    {
      ...OG_SIZE,
      fonts: [
        { name: 'Grotesk', data: groteskRegular, weight: 400, style: 'normal' },
        { name: 'Grotesk', data: groteskBold, weight: 700, style: 'normal' },
        { name: 'Mono', data: mono, weight: 400, style: 'normal' },
      ],
    },
  );
}
