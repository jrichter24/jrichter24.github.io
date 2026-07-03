// Copies per-post images out of each post folder (content/misc/<slug>/) into
// public/misc/<slug>/, so they are served at /misc/<slug>/<file> in dev and in
// the static export. The source of truth stays with the post (versioned next to
// the MDX); public/misc is generated + gitignored, like public/og. MDX
// references images by their post path, e.g. /misc/<slug>/diagram.webp — a
// locale-agnostic absolute path that resolves the same from /en/... and /de/....
// Runs as part of `prebuild`.
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const contentDir = path.join(root, 'content/misc');
const publicDir = path.join(root, 'public/misc');
const IMAGE_RE = /\.(webp|png|jpe?g|gif|svg|avif)$/i;

if (!fs.existsSync(contentDir)) process.exit(0);

const slugs = fs
  .readdirSync(contentDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

let copied = 0;
for (const slug of slugs) {
  const src = path.join(contentDir, slug);
  const images = fs.readdirSync(src).filter((f) => IMAGE_RE.test(f));
  if (!images.length) continue;
  const dest = path.join(publicDir, slug);
  fs.mkdirSync(dest, { recursive: true });
  for (const img of images) {
    fs.copyFileSync(path.join(src, img), path.join(dest, img));
    console.log(`copied misc/${slug}/${img}`);
    copied++;
  }
}
console.log(`sync-post-images done: ${copied} image(s)`);
