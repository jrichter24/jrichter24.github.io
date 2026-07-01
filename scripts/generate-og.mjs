// Generate OG images as real .png files into public/og/ (runs as `prebuild`, so
// `next build` copies them into ./out). GitHub Pages infers content-type from the
// extension, so extensionless file-based OG routes serve as octet-stream — a real
// .png fixes that. On-brand card: paper #F5F6F6, ink frame, red+blue accents.
// Uses satori + resvg (the same stack next/og wraps) so it runs as a plain script.
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import React from 'react';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const root = process.cwd();
const fontsDir = path.join(root, 'assets/fonts');
const groteskRegular = fs.readFileSync(path.join(fontsDir, 'SpaceGrotesk-Regular.woff'));
const groteskBold = fs.readFileSync(path.join(fontsDir, 'SpaceGrotesk-Bold.woff'));
const mono = fs.readFileSync(path.join(fontsDir, 'JetBrainsMono-Regular.ttf'));

const fonts = [
  { name: 'Grotesk', data: groteskRegular, weight: 400, style: 'normal' },
  { name: 'Grotesk', data: groteskBold, weight: 700, style: 'normal' },
  { name: 'Mono', data: mono, weight: 400, style: 'normal' },
];

const h = React.createElement;

function Card({ eyebrow, title, subtitle }) {
  return h(
    'div',
    {
      style: {
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
      },
    },
    h(
      'div',
      {
        style: {
          display: 'flex',
          fontFamily: 'Mono',
          fontSize: 28,
          letterSpacing: 2,
          textTransform: 'uppercase',
        },
      },
      eyebrow,
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          fontSize: 82,
          fontWeight: 700,
          lineHeight: 1.02,
          textTransform: 'uppercase',
          maxWidth: 1000,
        },
      },
      title,
    ),
    h(
      'div',
      { style: { display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' } },
      h(
        'div',
        { style: { display: 'flex', fontSize: 30, fontWeight: 400, maxWidth: 820 } },
        subtitle,
      ),
      h(
        'div',
        { style: { display: 'flex' } },
        h('div', { style: { width: 28, height: 28, background: '#e0001b' } }),
        h('div', { style: { width: 28, height: 28, background: '#1d2eff', marginLeft: 8 } }),
      ),
    ),
  );
}

async function toPng(el) {
  const svg = await satori(el, { width: 1200, height: 630, fonts });
  return new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
}

const locales = ['en', 'de'];
const messages = Object.fromEntries(
  locales.map((l) => [
    l,
    JSON.parse(fs.readFileSync(path.join(root, 'messages', `${l}.json`), 'utf8')),
  ]),
);

const outDir = path.join(root, 'public/og');
fs.mkdirSync(outDir, { recursive: true });

const jobs = [];

// Home (per locale — tagline is the same English line in both today, but keep it per-locale)
for (const l of locales) {
  jobs.push({
    file: `home-${l}.png`,
    el: Card({ eyebrow: '200 OK', title: 'Dr. Jens Richter', subtitle: messages[l].hero.tagline }),
  });
}

// One image per post per locale
const contentDir = path.join(root, 'content/writing');
const slugs = fs.existsSync(contentDir)
  ? fs
      .readdirSync(contentDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
  : [];
for (const slug of slugs) {
  for (const l of locales) {
    const fp = path.join(contentDir, slug, `${l}.mdx`);
    if (!fs.existsSync(fp)) continue;
    const { data } = matter(fs.readFileSync(fp, 'utf8'));
    jobs.push({
      file: `${slug}-${l}.png`,
      el: Card({
        eyebrow: `${messages[l].misc.title} · Dr. Jens Richter`,
        title: String(data.title ?? slug),
        subtitle: String(data.summary ?? ''),
      }),
    });
  }
}

for (const job of jobs) {
  const buf = await toPng(job.el);
  fs.writeFileSync(path.join(outDir, job.file), buf);
  console.log(`wrote og/${job.file}  ${buf.length} bytes`);
}
console.log(`OG generation done: ${jobs.length} images`);
